/**
 * Ferramentas de documento por modelo (gancho G2, via TOOLS_GELIC). O formulário diz o que
 * preencher; o preenchimento monta o corpo em código; a gravação monta DE NOVO a partir dos mesmos
 * dados e grava. O texto fixo do modelo nunca passa pelo modelo de IA: ele não reescreve o HTML
 * (um edital tem dezenas de milhares de caracteres, e cópia de IA erra e custa). A gravação é
 * `escrita` com prévia: o motor do agente mostra o cartão de aprovação antes de qualquer byte.
 *
 * gelic_modelo_analisar é a receita barata do DVI aplicada aos modelos (gancho G3): a extensão preenche em código
 * o que sai da árvore e das contas, lê e recorta só as peças-fonte do modelo e faz UMA chamada `ctx.completar`
 * pedindo só as variáveis que faltam (no máximo uma segunda, para corrigir o que o código recusou). Os textos dos
 * documentos nunca voltam à conversa; o resultado fica guardado para o gelic_documento_gravar.
 */
import { s } from '../../../agente-ia/src/motor/esquema';
import type { PreviaItem } from '../../../agente-ia/src/motor/tipos';
import { definirTool, type ContextoTool, type DefTool } from '../../../agente-ia/src/motor/tools';
import { DOCUMENTOS } from '../documentos/catalogo';
import type { Dados, ItemFolha, Pedida } from '../modelos/analise';
// O motor e os 20 modelos (~570 KB, os editais AGU são grandes) entram sob demanda: o esbuild do
// agente separa em pedaço próprio, e o painel só o baixa quando uma ferramenta de modelo é usada.
const motor = () => import('../modelos/motor');
const calculos = () => import('../modelos/calculos');
const analise = () => import('../modelos/analise');
const fontesMod = () => import('../modelos/fontes');
const preparar = () => import('../dvi/preparar/index');
const promptDvi = () => import('../dvi/prompt');

const MODELOS = DOCUMENTOS.filter(d => d.modelo);
const MODELO = s.texto({ enum: MODELOS.map(d => d.modelo!), descricao: 'Id do modelo (ver o botão "Gerar documento" ou gelic_etapa.modelos).' });
const doCatalogo = (modelo: string) => MODELOS.find(d => d.modelo === modelo);

interface ResultadoEscrita { alvo: string; mudancas: PreviaItem['mudancas']; resumo: string; dados?: Record<string, string> }
type Args = Record<string, unknown>;
const novoDoc = (a: Args) => ({ tipo: a.tipo, nomeArvore: a.nome_arvore, nivel: a.nivel, hipotese: a.hipotese });
/** No máximo isto de chamadas ao modelo por análise de modelo (a primeira + uma correção). */
export const MAX_CHAMADAS_MODELO = 2;

interface AnaliseModelo { dados: Dados; faltando: string[] }
/** A última análise de cada (processo, modelo) nesta sessão do painel: o gravar monta dela, sem nova chamada. */
export const ANALISES_MODELO = new Map<string, AnaliseModelo>();
const chave = (processo: unknown, modelo: unknown) => `${String(processo)}\u0000${String(modelo)}`;

/**
 * Os dados a gravar: os passados (como antes) ou, havendo análise guardada deste processo e modelo, ela mesclada
 * com os passados (chaves com ponto ou aninhadas), com as contas refeitas. Recusa se faltar valor que a análise
 * deixou para o usuário.
 */
async function dadosParaGravar(a: Args): Promise<Record<string, unknown>> {
  const guardada = typeof a.processo === 'string' ? ANALISES_MODELO.get(chave(a.processo, a.modelo)) : undefined;
  const passados = (a.dados ?? undefined) as Record<string, unknown> | undefined;
  if (!guardada) {
    if (passados === undefined) throw Object.assign(new Error(`Não há análise do modelo ${a.modelo} em ${a.processo} nesta conversa: rode gelic_modelo_analisar (ou passe os dados).`), { name: 'ErroModelo' });
    return passados;
  }
  const an = await analise();
  const dados = an.mesclar(guardada.dados, passados ?? {});
  an.derivar(dados, (await motor()).formulario(String(a.modelo)).variaveis);
  const faltam = guardada.faltando.filter(n => { const v = an.obter(dados, n); return v === undefined || v === null || v === ''; });
  if (faltam.length) throw Object.assign(new Error(`Faltam valores que só o usuário informa: ${faltam.join(', ')}. Pergunte e passe em dados (ex.: {"${faltam[0]}": "..."}).`), { name: 'ErroModelo' });
  return dados;
}
const montar = async (a: Args) => (await motor()).preencher(String(a.modelo), await dadosParaGravar(a));
/** Erro de dados (modelo ou conta) vira resposta para o modelo de IA corrigir; o resto sobe. */
const ehErroDeDados = (e: unknown) => e instanceof Error && (e.name === 'ErroModelo' || e.name === 'ErroCalculo');
const trecho = (texto: string) => texto.replace(/\s+/g, ' ').trim().slice(0, 300);

interface DocArvoreSei { numero: string; titulo?: string; nivel?: string; assinado?: boolean; cancelado?: boolean }
interface ArvoreSei { protocolo: string; documentos: DocArvoreSei[] }
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));

/** O fluxo do gelic_modelo_analisar (exportado para os testes). Ver o cabeçalho deste arquivo. */
export async function analisarModelo(a: Args, ctx: ContextoTool, hoje: Date = new Date()) {
  const modelo = String(a.modelo);
  const doc = doCatalogo(modelo);
  if (!doc) return { ok: false, erro: `modelo desconhecido: ${modelo}` };
  const [m, an, fm] = await Promise.all([motor(), analise(), fontesMod()]);
  const info = m.listarModelos().find(x => x.id === modelo);
  const form = m.formulario(modelo).variaveis;
  const arv = await ctx.sei<ArvoreSei>('processo.arvore', { processo: a.processo });
  const usaveis = arv.documentos.filter(d => d.titulo && d.nivel !== 'sigiloso' && !d.cancelado).map(d => ({ ...d, titulo: d.titulo! }));
  const naArvore = new Set(usaveis.map(d => d.numero));

  // 1. sem IA: árvore, contas e o que o usuário já disse
  const pre = an.prePreencher({ form, requer: info?.requer, protocolo: arv.protocolo, docs: usaveis, hoje });
  let dados = an.mesclar(pre.dados, (a.dados ?? {}) as Record<string, unknown>);
  const avisos: string[] = [];
  const pedidas: Pedida[] = an.variaveisAPedir(form, dados);
  let chamadas = 0;
  let pacote = { caracteres: 0, tokensEstimados: 0, documentosNaoLidos: [] as { numero: string; titulo?: string; motivo: string }[] };
  const nulos = new Set<string>();
  const recusados = new Map<string, string>();
  /** A correção (a 2ª chamada), quando ainda não usada: também serve ao erro do motor (cálculo, @requer). */
  let corrigir: ((erros: string[]) => Promise<void>) | null = null;

  // 2. só o que falta vai ao modelo, numa chamada (mais uma, se o código recusar algo)
  if (pedidas.length) {
    if (!ctx.completar) return { ok: false, erro: 'Este painel não oferece a chamada única ao modelo (gancho G3, ctx.completar): atualize a extensão SEI CFC Gelic.' };
    const { fontes, ausentes } = fm.selecionarFontes(usaveis, modelo);
    if (ausentes.length) avisos.push(`Peças-fonte não encontradas na árvore: ${ausentes.join(', ')}.`);
    const lidos = await (await preparar()).lerDocumentos(ctx, arv.protocolo, usaveis.filter(d => fontes.some(f => f.numero === d.numero)));
    const { envelopar } = await import('../../../agente-ia/src/seguranca/envelope');
    const { varrer } = await import('../../../agente-ia/src/seguranca/injecao');
    const textos = new Map<string, string>();
    const docs = [];
    for (const f of fontes) {
      const l = lidos.get(f.numero);
      if (!l || l.motivo) { pacote.documentosNaoLidos.push({ numero: f.numero, titulo: f.titulo, motivo: l?.motivo ?? 'não lido' }); continue; }
      textos.set(f.numero, l.texto);
      docs.push({ numero: f.numero, titulo: f.titulo, tipo: f.tipo, ...fm.recortarFonte(l.texto) });
    }
    fm.caberNoOrcamentoModelo(docs);
    const envelopados = docs.map(d => {
      const v = varrer(d.texto, { ocultos: lidos.get(d.numero)?.ocultos });
      if (v.achados.length) ctx.registrarAchados(d.numero, v.achados);
      return { ...d, texto: envelopar(d.numero, v.texto, ctx.nonce) };
    });
    if (info?.requer?.regime === '14133' && docs.some(d => d.tipo === 'contrato' && /8\.666/.test(textos.get(d.numero) ?? ''))) {
      avisos.push('O contrato cita a Lei 8.666: confira se o modelo certo não é o da 8.666 (ex.: termo-aditivo-prorrogacao-8666).');
    }
    const req = an.requisicaoModelo({
      modelo, nome: doc.nome, protocolo: arv.protocolo, hoje, pedidas, dados, preenchidas: pre.preenchidas,
      documentos: envelopados, naoLidos: pacote.documentosNaoLidos, observacoes: typeof a.observacoes === 'string' ? a.observacoes : undefined,
    });
    pacote = { ...pacote, caracteres: req.caracteres, tokensEstimados: req.tokensEstimados };
    const { extrairJson, pedidoDeCorrecao } = await promptDvi();
    const conferir = (resposta: string) => {
      let json: unknown;
      try { json = extrairJson(resposta); } catch (e) {
        return { c: { aceitos: {}, nulos: [], erros: [`resposta sem JSON válido: ${mensagem(e)}`], errados: pedidas.map(p => p.nome) }, json: resposta.slice(0, 4000) };
      }
      return { c: an.conferirResposta(json, pedidas, { arvore: naArvore, textos }), json: JSON.stringify(json) };
    };
    chamadas = 1;
    let r = conferir(await ctx.completar(req.sistema, req.pedido, ctx.sinal));
    let aceitos = r.c.aceitos;
    if (r.c.erros.length && chamadas < MAX_CHAMADAS_MODELO) {
      chamadas++;
      const r2 = conferir(await ctx.completar(req.sistema, pedidoDeCorrecao(req.pedido, r.json, r.c.erros), ctx.sinal));
      // a correção vale por cima; o que ela não trouxe fica com o aceito da primeira
      aceitos = { ...aceitos, ...r2.c.aceitos };
      r = { ...r2, c: { ...r2.c, errados: r2.c.errados.filter(n => !(n in aceitos)), nulos: r2.c.nulos.filter(n => !(n in aceitos)) } };
    }
    for (const n of r.c.nulos) nulos.add(n);
    for (const e of r.c.erros) { const n = e.split(':')[0]; if (!(n in aceitos)) recusados.set(n, e); }
    dados = an.mesclar(dados, aceitos);
    if (chamadas < MAX_CHAMADAS_MODELO) {
      corrigir = async (errosMotor: string[]) => {
        chamadas++;
        const r2 = conferir(await ctx.completar!(req.sistema, pedidoDeCorrecao(req.pedido, r.json, errosMotor), ctx.sinal));
        for (const e of r2.c.erros) avisos.push(`Recusado pelo código na correção: ${e}`);
        dados = an.mesclar(dados, r2.c.aceitos);
      };
    }
  }

  // 3. contas e motor
  for (const x of an.derivar(dados, form)) avisos.push(x);
  const condicoesNulas = pedidas.filter(p => p.tipo === 'condicao' && (nulos.has(p.nome) || recusados.has(p.nome))).map(p => p.nome);
  let validacao: { variavel: string; valor: string; fonte: string; sei?: string; nota?: string }[] = [];
  let faltandoMotor: string[] = [];
  const erros: string[] = [];
  const tentar = (): Error | null => {
    try { validacao = m.preencher(modelo, dados).validacao; return null; } catch (e) {
      if (!ehErroDeDados(e)) throw e;
      return e as Error;
    }
  };
  let falha = tentar();
  if (falha && !(falha as Error & { faltando?: string[] }).faltando?.length && corrigir) {
    await (corrigir as (erros: string[]) => Promise<void>)([`o motor do modelo recusou: ${falha.message}`]);
    for (const x of an.derivar(dados, form)) if (!avisos.includes(x)) avisos.push(x);
    falha = tentar();
  }
  if (falha) {
    const em = falha as Error & { faltando?: string[] };
    if (em.faltando?.length) {
      faltandoMotor = em.faltando;
      // a folha do que já há: os buracos com marca, só para mostrar (não é guardado)
      const sonda = an.mesclar(dados, Object.fromEntries(em.faltando.map(n => [n, '⟦faltando⟧'])));
      try { validacao = m.preencher(modelo, sonda).validacao; } catch (e2) { if (!ehErroDeDados(e2)) throw e2; erros.push((e2 as Error).message); }
    } else erros.push(em.message);
  }
  const usadas = new Set(validacao.map(v => v.variavel));
  const faltando = [...new Set([...faltandoMotor, ...condicoesNulas.filter(n => usadas.has(n))])];
  for (const [n, e] of recusados) if (faltando.includes(n)) avisos.push(`Recusado pelo código: ${e}`);
  ANALISES_MODELO.set(chave(a.processo, modelo), { dados, faltando });
  const porNome = new Map([...form, ...Object.values(an.AUXILIARES)].map(v => [v.nome, v]));
  const folha = validacao.filter(v => v.valor !== '⟦faltando⟧').map(v => an.linhaDaFolha(v as ItemFolha));
  return {
    ok: !faltando.length && !erros.length,
    modelo,
    documento: doc.nome,
    tipo_sei: doc.tipoSei,
    folha,
    faltando: faltando.map(n => {
      const v = porNome.get(n);
      return { variavel: n, tipo: v?.tipo ?? 'valor', fonte: v?.fonte ?? '?', descricao: v?.descricao ?? '', ...(n === 'autoridade.nome' ? { opcoes: Object.values(an.AUTORIDADES).map(x => `${x.nome} — ${x.cargo}`) } : {}) };
    }),
    avisos,
    ...(erros.length ? { erros } : {}),
    chamadas,
    pacote,
    aviso: faltando.length
      ? 'Pergunte ao usuário os valores de faltando (nunca invente) e passe-os em gelic_documento_gravar.dados; o resto já está guardado.'
      : 'Mostre a folha ao usuário e espere o "ok" antes de gelic_documento_gravar (sem dados: usa esta análise).',
  };
}

export const TOOLS_MODELOS: DefTool[] = [
  definirTool({
    nome: 'gelic_calcular',
    descricao:
      'Contas dos documentos da Gelic, pelo mesmo código dos modelos (nunca faça de cabeça): extenso (valor em reais por extenso), ordinal (1 → PRIMEIRO), data_extenso (dd/mm/aaaa por extenso) e reajuste (valor × (1 + percentual), com o extenso).',
    parametros: s.objeto({
      operacao: s.texto({ enum: ['extenso', 'ordinal', 'data_extenso', 'reajuste'] }),
      valor: s.texto({ descricao: 'Valor em reais ("150.000,00"), número (para ordinal) ou data (dd/mm/aaaa).' }),
      'percentual?': s.texto({ descricao: 'Só no reajuste, ex.: "4,83".' }),
    }),
    efeito: 'leitura',
    rotulo: a => `Calcular ${a.operacao}`,
    executar: async a => {
      const { brl, dataExtenso, extenso, fmtBrl, ordinalMasculino, pct, reajustar } = await calculos();
      try {
        switch (a.operacao) {
          case 'extenso': return { valor: fmtBrl(brl(a.valor)), extenso: extenso(brl(a.valor)) };
          case 'ordinal': return { ordinal: ordinalMasculino(a.valor) };
          case 'data_extenso': return { data_extenso: dataExtenso(a.valor) };
          default: {
            const novo = reajustar(brl(a.valor), pct(a.percentual));
            return { valor_reajustado: fmtBrl(novo), extenso: extenso(novo) };
          }
        }
      } catch (e) {
        if (ehErroDeDados(e)) return { erro: (e as Error).message };
        throw e;
      }
    },
  }),
  definirTool({
    nome: 'gelic_modelo_formulario',
    descricao:
      'Formulário de um modelo de documento da Gelic: as variáveis a preencher (valor, condição ou lista), quem preenche cada uma (autos, regra, agente, calculo, config) e o tipo de documento no SEI. Chame antes de ler os autos para o documento; constantes do CFC já vêm do modelo.',
    parametros: s.objeto({ modelo: MODELO }),
    efeito: 'leitura',
    rotulo: a => `Formulário do modelo ${a.modelo}`,
    executar: async a => {
      const doc = doCatalogo(String(a.modelo));
      const f = (await motor()).formulario(String(a.modelo));
      // Modelo que pede a autoridade sem trazê-la por padrão: o agente escolhe entre as do CFC
      // (constantes da skill), pela alçada; não inventa nome nem cargo.
      const pedeAutoridade = f.variaveis.some(v => v.nome.startsWith('autoridade.'));
      const autoridades = pedeAutoridade
        ? ((await import('../modelos/dados.gerado')).CONSTANTES_JSON as { autoridades?: unknown }).autoridades
        : undefined;
      return {
        ...f,
        documento: doc?.nome,
        tipo_sei: doc?.tipoSei,
        ...(autoridades ? { autoridades, nota_autoridade: 'Preencha autoridade.nome e autoridade.cargo com uma destas autoridades do CFC, conforme a alçada (Portaria 233) e o que os autos indicarem; na dúvida, pergunte ao usuário.' } : {}),
      };
    },
  }),
  definirTool({
    nome: 'gelic_modelo_preencher',
    descricao:
      'Monta o documento a partir do modelo e dos dados (não grava no SEI). `dados` segue o formulário: valores dos autos como {"valor": "...", "sei": "<nº SEI>"}; condições true/false; listas como arrays. Devolve a folha de validação (cada variável, valor e SEI), os avisos e o início do texto; ou o erro a corrigir (variável faltando, regime errado, cálculo divergente).',
    parametros: s.objeto({
      modelo: MODELO,
      dados: s.livre({ descricao: 'Dados do formulário.' }),
      'incluir_html?': s.booleano({ descricao: 'Só para escrever no editor aberto (editor_escrever). Para gravar, use gelic_documento_gravar.' }),
    }),
    efeito: 'leitura',
    rotulo: a => `Montar o documento (modelo ${a.modelo})`,
    executar: async a => {
      try {
        const r = await montar(a);
        // Documento inteiro não volta ao modelo de IA (um edital tem dezenas de milhares de
        // caracteres): a folha de validação diz o que foi preenchido; o texto vai em trecho.
        return {
          ok: true,
          modelo: r.id,
          validacao: r.validacao,
          avisos: r.avisos,
          tipo_sei: doCatalogo(r.id)?.tipoSei,
          tamanho: r.texto.length,
          inicio: r.texto.slice(0, 1500),
          ...(a.incluir_html === true ? { html: (await motor()).paraHtmlSei(r.blocos) } : {}),
        };
      } catch (e) {
        if (ehErroDeDados(e)) return { ok: false, erro: (e as Error).message };
        throw e;
      }
    },
  }),
  definirTool({
    nome: 'gelic_modelo_analisar',
    descricao:
      'Prepara um documento por modelo da Gelic, barato: a extensão preenche em código o que sai da árvore e das contas (processo, nº SEI das peças, ordinais, extensos, datas), lê e recorta só as peças-fonte do modelo e faz UMA chamada ao modelo, fora desta conversa, só para as variáveis que faltam; confere cada valor no documento citado e monta o documento. Devolve a folha (variável = valor [fonte, SEI]), o que falta perguntar ao usuário (faltando) e os avisos; guarda o resultado para gelic_documento_gravar. Não escreve no SEI. Não leia os documentos você mesmo.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      modelo: MODELO,
      'observacoes?': s.texto({ descricao: 'O que o usuário pediu ou já informou, em uma ou duas frases.' }),
      'dados?': s.livre({ descricao: 'Valores que o usuário já informou, com chave em ponto: {"contratacao.numero": "383500-27/2026"}. Entram antes da IA.' }),
    }),
    efeito: 'leitura',
    rotulo: a => `Preparar o modelo ${a.modelo} em ${a.processo}`,
    executar: async (a, ctx) => analisarModelo(a, ctx),
  }),
  definirTool({
    nome: 'gelic_documento_gravar',
    descricao:
      'Cria no processo o documento montado pelo modelo e grava o corpo, sem você reescrever o HTML. Depois de gelic_modelo_analisar, passe só os valores que o usuário informou para o faltando (dados com chave em ponto) ou nenhum dados; sem análise, passe os MESMOS dados validados em gelic_modelo_preencher. Use só depois do "ok" do usuário à folha. Abre o cartão de aprovação. Não assina.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      modelo: MODELO,
      'dados?': s.livre({ descricao: 'Sem análise: os dados validados. Com análise: só o que o usuário informou ou corrigiu ({"contratacao.numero": "..."}); omita para usar a análise como está.' }),
      tipo: s.texto({ descricao: 'Tipo de documento no SEI, conferido com sei_opcoes (ex.: "Autorização de Contratação Direta - Inex - NLL").' }),
      'nome_arvore?': s.texto({ max: 50 }),
      'nivel?': s.texto({ enum: ['publico', 'restrito'] }),
      'hipotese?': s.texto(),
    }),
    efeito: 'escrita',
    rotulo: a => `Criar ${a.tipo} pelo modelo ${a.modelo}`,
    previsualizar: async (a, ctx) => {
      let texto: string;
      try {
        texto = (await montar(a)).texto;
      } catch (e) {
        return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: (e as Error).message }];
      }
      try {
        const r = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo: novoDoc(a), aplicar: false });
        r.mudancas.push({ campo: `Conteúdo (modelo ${a.modelo})`, antes: '', depois: trecho(texto) });
        return [{ alvo: r.alvo, mudancas: r.mudancas, resumo: r.resumo }];
      } catch (e) {
        return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: (e as Error).message }];
      }
    },
    executar: async (a, ctx) => {
      let r;
      try { r = await montar(a); } catch (e) {
        if (ehErroDeDados(e)) return { ok: false, erro: (e as Error).message };
        throw e;
      }
      const criado = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo: novoDoc(a), aplicar: true });
      const numero = criado.dados?.numero ?? '';
      if (!numero) return { ok: false, erro: 'O SEI não devolveu o número do documento criado; confira a árvore antes de tentar de novo.', resumo: criado.resumo };
      await ctx.sei('documento.editar', { numero, html: (await motor()).paraHtmlSei(r.blocos), aplicar: true });
      return { ok: true, numero, modelo: r.id, resumo: criado.resumo, aviso: 'Documento criado e com o corpo gravado; não foi assinado.' };
    },
  }),
];
