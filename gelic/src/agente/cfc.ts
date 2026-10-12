/**
 * Ferramentas das peças do demandante (perfil cfc; src/agente/perfil.ts as expõe só lá): a receita barata do
 * gelic_modelo_analisar (modelos.ts, gancho G3) sobre os modelos do app "gera" (src/modelos/cfc.ts).
 *
 * cfc_modelo_analisar: o código preenche o que sai do usuário, do PCA (gancho dadosDoPca, opcional), da tela do SEI e
 * da árvore (via, peças encaminhadas com nº SEI) e as contas do gera (extensos, vigência, equipe); lê e recorta só as
 * peças-fonte — as anteriores (DFD, ETP, mapa, TR) entram na MESMA chamada, e objeto, justificativa, itens e valor
 * são copiados delas com o SEI — e faz UMA chamada `ctx.completar` só com os campos que faltam (no máximo uma
 * segunda, para o que o código recusou; nenhuma se nada falta). Os textos dos documentos nunca voltam à conversa.
 *
 * cfc_documento_gravar: monta de novo da análise guardada mais o que o usuário informou e grava (cartão de
 * aprovação; não assina). O tipo de documento no SEI destas peças não é conhecido: o agente pergunta ao usuário.
 */
import { dadosDoPcaDaConfig } from '../pca/dfd';
import { s } from '../../../agente-ia/src/motor/esquema';
import type { PreviaItem } from '../../../agente-ia/src/motor/tipos';
import { definirTool, type ContextoTool, type DefTool } from '../../../agente-ia/src/motor/tools';
import { DOCUMENTOS_CFC, TIPO_A_CONFIRMAR } from '../documentos/catalogo';
import type { DadosDoPca, DadosPca, EntradaCfc, EstadoCfc, TelaSei } from '../modelos/analise-cfc';

const analiseCfc = () => import('../modelos/analise-cfc');
const motor = () => import('../modelos/motor');
const fontesMod = () => import('../modelos/fontes');
const preparar = () => import('../dvi/preparar/index');
const promptDvi = () => import('../dvi/prompt');

/** Os que o motor sabe preencher (o TR continua aqui pela paridade com o gera, embora seja feito no Compras.gov.br). */
const NO_MOTOR = DOCUMENTOS_CFC.filter(d => d.modelo);
/** Os que o agente oferece: os do botão "Gerar documento". */
const MODELOS = NO_MOTOR.filter(d => !d.indisponivel);
const MODELO = s.texto({ enum: MODELOS.map(d => d.modelo!), descricao: 'Id do modelo do demandante (ver o botão "Gerar documento").' });
const doCatalogo = (modelo: string) => NO_MOTOR.find(d => d.modelo === modelo);

/** Ganchos do perfil cfc. `dadosDoPca`: pré-preenchimento pela API do PCA (padrão: com a configuração do PCA, se houver). */
export interface GanchosCfc { dadosDoPca?: DadosDoPca }
export const GANCHOS_CFC: GanchosCfc = { dadosDoPca: dadosDoPcaDaConfig };

/** No máximo isto de chamadas ao modelo por análise (a primeira + uma correção). */
export const MAX_CHAMADAS_CFC = 2;
interface AnaliseCfc { estado: EstadoCfc; temPecaAnterior: boolean }
/** A última análise de cada (processo, modelo) nesta sessão do painel: o gravar monta dela, sem nova chamada. */
export const ANALISES_CFC = new Map<string, AnaliseCfc>();
const chave = (processo: unknown, modelo: unknown) => `${String(processo)}\u0000${String(modelo)}`;

type Args = Record<string, unknown>;
interface DocArvoreSei { numero: string; titulo?: string; nivel?: string; assinado?: boolean; assinaturas?: string[]; externo?: boolean; cancelado?: boolean }
interface ArvoreSei { protocolo: string; documentos: DocArvoreSei[] }
interface ResultadoEscrita { alvo: string; mudancas: PreviaItem['mudancas']; resumo: string; dados?: Record<string, string> }
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
const ehErroDeDados = (e: unknown) => e instanceof Error && (e.name === 'ErroModelo' || e.name === 'ErroCalculo');
const trecho = (texto: string) => texto.replace(/\s+/g, ' ').trim().slice(0, 300);
const descreverFaltando = (e: EntradaCfc) => ({ variavel: e.nome, tipo: e.tipo, fonte: e.fonte, descricao: e.descricao, ...(e.opcoes ? { opcoes: e.opcoes } : {}), ...(e.campos ? { campos: e.campos } : {}) });

/** O fluxo do cfc_modelo_analisar (exportado para os testes). Ver o cabeçalho deste arquivo. */
export async function analisarCfc(a: Args, ctx: ContextoTool, hoje: Date = new Date(), ganchos: GanchosCfc = GANCHOS_CFC, o: { ia?: boolean; estado?: boolean } = {}) {
  const modelo = String(a.modelo);
  const doc = doCatalogo(modelo);
  if (!doc) return { ok: false, erro: `modelo do demandante desconhecido: ${modelo} (com modelo: ${MODELOS.map(d => d.modelo).join(', ')}; ETP e TR são feitos no Compras.gov.br; mapa de riscos não tem modelo)` };
  const [ac, fm] = await Promise.all([analiseCfc(), fontesMod()]);
  const arv = await ctx.sei<ArvoreSei>('processo.arvore', { processo: a.processo });
  // assinado e externo vão para a regra de peça pronta (despacho de envio); o arquivo do externo a ponte não informa
  // (só o selo, que lê a página, sabe): aqui o externo conta como pronto
  const usaveis = arv.documentos.filter(d => d.titulo && d.nivel !== 'sigiloso' && !d.cancelado)
    .map(d => ({ ...d, titulo: d.titulo!, assinado: !!d.assinado || !!d.assinaturas?.length, externo: !!d.externo }));
  const naArvore = new Set(usaveis.map(d => d.numero));
  const avisos: string[] = [];
  const observacoes = typeof a.observacoes === 'string' && a.observacoes.trim() ? a.observacoes : undefined;

  // 1. sem IA: tela do SEI, árvore, PCA e o que o usuário já disse
  let tela: TelaSei = {};
  try { tela = (await ctx.sei<TelaSei>('tela')) ?? {}; } catch { /* sem a tela (ex.: painel sem aba do SEI): o usuário informa */ }
  let pca: DadosPca | undefined;
  if (ganchos.dadosDoPca) {
    const dados = (a.dados ?? {}) as Record<string, unknown>;
    try { pca = await ganchos.dadosDoPca(arv.protocolo, { item_pca: dados.item_pca, ano: dados.ano ?? dados.ano_exercicio }); } catch (e) { avisos.push(`PCA não respondeu: ${mensagem(e)}`); }
  }
  const estado = ac.prePreencherCfc({ modelo, docs: usaveis, tela, pca, dados: (a.dados ?? {}) as Record<string, unknown>, hoje });
  const { fontes, ausentes } = ac.selecionarFontesCfc(usaveis, modelo);
  const temPecaAnterior = fontes.some(f => ac.PECAS_ANTERIORES.has(f.tipo));
  const avaliar = () => {
    try { return ac.avaliarCfc(modelo, estado, temPecaAnterior); } catch (e) {
      if (!ehErroDeDados(e)) throw e;
      return e as Error;
    }
  };
  let av = avaliar();
  if (av instanceof Error) return { ok: false, erro: av.message };
  const pacoteVazio = { caracteres: 0, tokensEstimados: 0, fontes: [] as { numero: string; titulo: string; tipo: string }[], documentosNaoLidos: [] as { numero: string; titulo?: string; motivo: string }[] };
  // Sem IA (o formulário das peças, src/peca/): só o pré-preenchimento, sem ler documento nem chamar o modelo.
  if (o.ia === false) {
    ANALISES_CFC.set(chave(a.processo, modelo), { estado, temPecaAnterior });
    return resultadoCfc(modelo, doc, estado, av, avisos, 0, pacoteVazio, o.estado);
  }

  // 2. só o que falta, e só o que a IA pode tirar das fontes (ou redigir das observações), vai ao modelo, numa chamada
  const podeIa = (e: EntradaCfc) => e.fonte !== 'usuario' && (fontes.length > 0 || (e.fonte === 'agente' && !!observacoes));
  // as listas vazias (opcionais) só pegam carona numa chamada que já vai acontecer
  const obrigatorias = av.faltando.filter(podeIa);
  const pedidas = obrigatorias.length ? [...obrigatorias, ...av.listasVazias.filter(podeIa)] : [];
  let chamadas = 0;
  let pacote = pacoteVazio;
  const recusados = new Map<string, string>();
  if (pedidas.length) {
    if (!ctx.completar) return { ok: false, erro: 'Este painel não oferece a chamada única ao modelo (gancho G3, ctx.completar): atualize a extensão SEI CFC.' };
    if (ausentes.length) avisos.push(`Peças-fonte não encontradas na árvore: ${ausentes.join(', ')}.`);
    const lidos = fontes.length ? await (await preparar()).lerDocumentos(ctx, arv.protocolo, usaveis.filter(d => fontes.some(f => f.numero === d.numero))) : new Map();
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
    const req = ac.requisicaoCfc({ modelo, nome: doc.nome, protocolo: arv.protocolo, hoje, pedidas, estado, documentos: envelopados, naoLidos: pacote.documentosNaoLidos, observacoes });
    pacote = { ...pacote, caracteres: req.caracteres, tokensEstimados: req.tokensEstimados, fontes: docs.map(d => ({ numero: d.numero, titulo: d.titulo, tipo: d.tipo })) };
    const { extrairJson, pedidoDeCorrecao } = await promptDvi();
    const conferir = (resposta: string) => {
      let json: unknown;
      try { json = extrairJson(resposta); } catch (e) {
        return { c: { aceitos: {}, nulos: [], erros: [`resposta sem JSON válido: ${mensagem(e)}`], errados: pedidas.map(p => p.nome) } as ReturnType<typeof ac.conferirCfc>, json: resposta.slice(0, 4000) };
      }
      return { c: ac.conferirCfc(json, pedidas, { arvore: naArvore, textos }), json: JSON.stringify(json) };
    };
    chamadas = 1;
    let r = conferir(await ctx.completar(req.sistema, req.pedido, ctx.sinal));
    let aceitos = r.c.aceitos;
    if (r.c.erros.length && chamadas < MAX_CHAMADAS_CFC) {
      chamadas++;
      const r2 = conferir(await ctx.completar(req.sistema, pedidoDeCorrecao(req.pedido, r.json, r.c.erros), ctx.sinal));
      aceitos = { ...aceitos, ...r2.c.aceitos }; // a correção vale por cima; o que ela não trouxe fica com o da primeira
      r = r2;
    }
    for (const e of r.c.erros) { const n = e.split(':')[0]; if (!(n in aceitos)) recusados.set(n, e); }
    for (const [n, x] of Object.entries(aceitos)) { estado.valores[n] = x.valor; estado.evidencias[n] = x.evidencia; }
    ac.completar(estado, hoje, modelo);
    const depois = avaliar();
    if (depois instanceof Error) return { ok: false, erro: depois.message };
    av = depois;
  }

  // 3. o que sobrou é do usuário
  for (const e of av.faltando) if (recusados.has(e.nome)) avisos.push(`Recusado pelo código: ${recusados.get(e.nome)}`);
  for (const e of av.listasVazias) avisos.push(`${e.nome}: lista vazia (a tabela sai sem linhas); informe em dados se couber.`);
  ANALISES_CFC.set(chave(a.processo, modelo), { estado, temPecaAnterior });
  return resultadoCfc(modelo, doc, estado, av, avisos, chamadas, pacote, o.estado);
}

/** O retorno do cfc_modelo_analisar; `comEstado` (só o formulário das peças) acrescenta o estado e as entradas, que não vão ao modelo. */
async function resultadoCfc(modelo: string, doc: NonNullable<ReturnType<typeof doCatalogo>>, estado: EstadoCfc, av: Exclude<ReturnType<Awaited<ReturnType<typeof analiseCfc>>['avaliarCfc']>, Error>, avisos: string[], chamadas: number, pacote: unknown, comEstado = false) {
  const ac = await analiseCfc();
  return {
    ok: !av.faltando.length,
    modelo,
    documento: doc.nome,
    tipo_sei: doc.tipoSei,
    folha: ac.folhaCfc(estado, av.entradas),
    faltando: av.faltando.map(descreverFaltando),
    avisos,
    chamadas,
    pacote,
    ...(comEstado ? { estado, entradas: av.entradas } : {}),
    aviso: av.faltando.length
      ? 'Pergunte ao usuário os valores de faltando (nunca invente) e passe-os em cfc_documento_gravar.dados; o resto já está guardado. O tipo no SEI está "a confirmar": pergunte qual tipo usar.'
      : 'Mostre a folha ao usuário, confirme o tipo de documento no SEI ("a confirmar") e espere o "ok" antes de cfc_documento_gravar (sem dados: usa esta análise).',
  };
}

/** Monta o documento da análise guardada + os dados do usuário; recusa o que ficar incompleto (salvo rascunho). */
async function montar(a: Args) {
  const guardada = ANALISES_CFC.get(chave(a.processo, a.modelo));
  if (!guardada) throw Object.assign(new Error(`Não há análise do modelo ${a.modelo} em ${a.processo} nesta conversa: rode cfc_modelo_analisar.`), { name: 'ErroModelo' });
  const ac = await analiseCfc();
  const extra = ac.prePreencherCfc({ modelo: String(a.modelo), docs: [], dados: (a.dados ?? {}) as Record<string, unknown>, hoje: new Date() });
  const estado: EstadoCfc = { valores: { ...guardada.estado.valores, ...extra.valores }, evidencias: { ...guardada.estado.evidencias, ...extra.evidencias } };
  const av = ac.avaliarCfc(String(a.modelo), estado, guardada.temPecaAnterior);
  if (av.faltando.length && a.rascunho !== true) {
    const n = av.faltando.map(e => e.nome);
    throw Object.assign(new Error(`Faltam valores que só o usuário informa: ${n.join(', ')}. Pergunte e passe em dados (ex.: {"${n[0]}": "..."}), ou rascunho: true para gravar com as marcas ⟦...⟧.`), { name: 'ErroModelo' });
  }
  return av.calc;
}
const tipoConfirmado = (a: Args) => (String(a.tipo ?? '').trim().toLowerCase() === TIPO_A_CONFIRMAR ? 'O tipo de documento no SEI está "a confirmar": pergunte ao usuário qual tipo usar (sei_opcoes tipos_documento) e passe-o em tipo.' : null);
const novoDoc = (a: Args) => ({ tipo: a.tipo, nomeArvore: a.nome_arvore, nivel: a.nivel });

/** Prévia da peça montada da análise guardada + `dados`: o mesmo HTML que a gravação manda ao SEI, com ⟦campo⟧ no que falta. */
export async function previaCfc(a: { processo: string; modelo: string; dados?: Record<string, unknown> }): Promise<{ html: string; texto: string; faltando: string[] }> {
  const calc = await montar({ ...a, rascunho: true });
  return { html: (await motor()).paraHtmlSei(calc.blocos), texto: calc.texto, faltando: [...calc.faltando] };
}

/** Cria o documento e grava o corpo (o cfc_documento_gravar e o formulário das peças). Não assina. */
export async function gravarCfc(a: Args, ctx: ContextoTool): Promise<{ ok: boolean; numero?: string; erro?: string; resumo?: string; modelo?: unknown; aviso?: string }> {
  // `documento`: a peça já existe na árvore (vazia, criada pelo "Iniciar processo"): grava o corpo nela, sem criar outra
  const existente = typeof a.documento === 'string' && /^\d+$/.test(a.documento.trim()) ? a.documento.trim() : null;
  const semTipo = existente ? null : tipoConfirmado(a);
  if (semTipo) return { ok: false, erro: semTipo };
  let calc;
  try { calc = await montar(a); } catch (e) {
    if (ehErroDeDados(e)) return { ok: false, erro: mensagem(e) };
    throw e;
  }
  if (existente) {
    // só um documento deste processo, interno e sem assinatura (a peça vazia do Iniciar processo)
    const arv = await ctx.sei<ArvoreSei>('processo.arvore', { processo: a.processo });
    const d = arv.documentos.find(x => x.numero === existente);
    if (!d) return { ok: false, erro: `O documento ${existente} não está no processo ${String(a.processo)}.` };
    if (d.externo) return { ok: false, erro: `O documento ${existente} é externo: o formulário só grava em documento do SEI.` };
    if (d.assinado || d.assinaturas?.length) return { ok: false, erro: `O documento ${existente} já foi assinado: o formulário não o altera.` };
    await ctx.sei('documento.editar', { numero: existente, html: (await motor()).paraHtmlSei(calc.blocos), aplicar: true });
    return { ok: true, numero: existente, modelo: a.modelo, aviso: `Corpo gravado no documento SEI nº ${existente}, que já estava na árvore; não foi assinado.` };
  }
  const criado = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo: novoDoc(a), aplicar: true });
  const numero = criado.dados?.numero ?? '';
  if (!numero) return { ok: false, erro: 'O SEI não devolveu o número do documento criado; confira a árvore antes de tentar de novo.', resumo: criado.resumo };
  await ctx.sei('documento.editar', { numero, html: (await motor()).paraHtmlSei(calc.blocos), aplicar: true });
  return { ok: true, numero, modelo: a.modelo, resumo: criado.resumo, aviso: 'Documento criado e com o corpo gravado; não foi assinado.' };
}

export const TOOLS_CFC: DefTool[] = [
  definirTool({
    nome: 'cfc_modelo_analisar',
    descricao:
      'Prepara uma peça do demandante pelo modelo do CFC (DFD, termos de cientificação, mapa comparativo de preços, despacho de envio à Gerência de Licitações; ETP, TR e mapa de riscos são feitos no Compras.gov.br), barato: a extensão preenche em código o que sai do usuário, do PCA, da tela e da árvore (via, peças encaminhadas com nº SEI) e as contas (valor e data por extenso, vigência, equipe), lê só as peças-fonte — as anteriores (DFD, ETP, mapa, TR) dão objeto, justificativa, itens e valor, copiados com o SEI — e faz UMA chamada ao modelo, fora desta conversa, só para o que falta; confere cada valor no documento citado. Devolve a folha (campo = valor [fonte, SEI]), o que perguntar ao usuário (faltando) e os avisos; guarda o resultado para cfc_documento_gravar. Não escreve no SEI. Não leia os documentos você mesmo.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      modelo: MODELO,
      'observacoes?': s.texto({ descricao: 'O que o usuário pediu ou contou da demanda, em poucas frases (a IA redige justificativa e textos a partir disso).' }),
      'dados?': s.livre({ descricao: 'Valores que o usuário já informou, pelo nome do campo: {"unidade": "...", "via": "pregao", "valor_estimado": "12.345,67", "itens": [...]}. Entram antes da IA.' }),
    }),
    efeito: 'leitura',
    rotulo: a => `Preparar o ${String(a.modelo).toUpperCase()} em ${a.processo}`,
    executar: async (a, ctx) => analisarCfc(a, ctx),
  }),
  definirTool({
    nome: 'cfc_documento_gravar',
    descricao:
      'Cria no processo a peça do demandante montada pelo modelo do CFC e grava o corpo, sem você reescrever o HTML. Depois de cfc_modelo_analisar, passe só os valores que o usuário informou para o faltando (dados) ou nenhum dados, e o tipo de documento no SEI que o usuário confirmou. Use só depois do "ok" do usuário à folha. Abre o cartão de aprovação. Não assina.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      modelo: MODELO,
      'dados?': s.livre({ descricao: 'Só o que o usuário informou ou corrigiu ({"signatario_cargo": "..."}); omita para usar a análise como está.' }),
      tipo: s.texto({ descricao: 'Tipo de documento no SEI, confirmado com o usuário e com sei_opcoes (nunca "a confirmar").' }),
      'nome_arvore?': s.texto({ max: 50 }),
      'nivel?': s.texto({ enum: ['publico', 'restrito'] }),
      'rascunho?': s.booleano({ descricao: 'true grava mesmo com campos pendentes, que saem marcados ⟦campo⟧ para completar no editor.' }),
    }),
    efeito: 'escrita',
    rotulo: a => `Criar ${a.tipo} pelo modelo ${a.modelo}`,
    previsualizar: async (a, ctx) => {
      const semTipo = tipoConfirmado(a);
      if (semTipo) return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: semTipo }];
      let texto: string;
      try { texto = (await montar(a)).texto; } catch (e) {
        return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: mensagem(e) }];
      }
      try {
        const r = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo: novoDoc(a), aplicar: false });
        r.mudancas.push({ campo: `Conteúdo (modelo ${a.modelo})`, antes: '', depois: trecho(texto) });
        return [{ alvo: r.alvo, mudancas: r.mudancas, resumo: r.resumo }];
      } catch (e) {
        return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: mensagem(e) }];
      }
    },
    // `documento` (gravar numa peça já na árvore) é só da janela das peças: a ferramenta do agente sempre cria
    executar: (a, ctx) => gravarCfc({ ...a, documento: undefined }, ctx),
  }),
];
