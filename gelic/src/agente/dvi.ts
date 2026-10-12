/**
 * DVI barato (gancho G3): a extensão faz em código tudo o que é regra (ler e recortar os autos, etapa, família,
 * checklist, checagens mecânicas, validação, formato, corpo do documento) e o modelo recebe só o raciocínio, numa
 * chamada `ctx.completar` sem ferramentas e fora do histórico (no máximo uma segunda, para corrigir o JSON).
 * O pacote com os textos dos documentos NUNCA volta para a conversa: ela recebe o resumo, os avisos e os achados.
 *
 * gelic_pendencias não chama o modelo: é o checklist que o código consegue decidir sozinho.
 * Os módulos pesados (preparação com pdf.js, montagem com o motor de modelos) entram sob demanda.
 */
import { vinculoDaConfig } from '../pca/dfd';
import type { OpcoesPreparar } from '../dvi/preparar/index';
import { s } from '../../../agente-ia/src/motor/esquema';
import type { PreviaItem } from '../../../agente-ia/src/motor/tipos';
import { definirTool, type ContextoTool, type DefTool } from '../../../agente-ia/src/motor/tools';
import type { Achados, ContextoDvi, Formato, Pedido } from '../dvi/montar/index';
import type { PedidoAnalise } from '../dvi/prompt';

/** Ganchos do DVI. `pca`: o vínculo do processo no PCA, para o A04 (padrão: com a configuração do PCA, se houver). */
export const GANCHOS_DVI: { pca?: OpcoesPreparar['pca'] } = { pca: vinculoDaConfig };
const preparar = () => import('../dvi/preparar/index');
const montar = () => import('../dvi/montar/index');
const ponte = () => import('../dvi/contexto');
const prompt = () => import('../dvi/prompt');
const pendencias = () => import('../dvi/pendencias');

/** No máximo isto de chamadas ao modelo por análise (a primeira + uma correção). */
export const MAX_CHAMADAS = 2;

interface Analise { contexto: ContextoDvi; pedido: PedidoAnalise; achados: unknown }
/** A última análise de cada processo nesta sessão do painel: o gravar monta dela, sem nova chamada ao modelo. */
export const ANALISES = new Map<string, Analise>();

interface ResultadoEscrita { alvo: string; mudancas: PreviaItem['mudancas']; resumo: string; dados?: Record<string, string> }
type Args = Record<string, unknown>;

const PEDIDOS: readonly PedidoAnalise[] = ['dvi', 'devolucao', 'gecont', 'analise'];
/** Só devolução e Gecont restringem o formato; DVI e análise seguem a regra (sem DVI anterior → DVI). */
const pedidoDoFormato = (p: PedidoAnalise): Pedido | undefined => (p === 'devolucao' || p === 'gecont' ? p : undefined);
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
const trecho = (texto: string) => texto.replace(/\s+/g, ' ').trim().slice(0, 300);
const ehObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

function paraOChat(a: unknown): string[] {
  if (!ehObj(a)) return [];
  const saida: string[] = [];
  if (a.verificacao_legal === false) {
    const f = Array.isArray(a.fontes_nao_verificadas) ? a.fontes_nao_verificadas : [];
    saida.push('Atenção: a fundamentação normativa deste documento não foi conferida na fonte oficial nesta sessão (sem acesso à rede). '
      + `Confira a redação vigente dos dispositivos citados antes de assinar.${f.length ? `\nDispositivos citados sem conferência: ${f.join('; ')}` : ''}`);
  }
  for (const l of Array.isArray(a.limitacoes) ? a.limitacoes : []) saida.push(`Limitação (não vai no documento): ${l}`);
  return saida;
}

/** Uma resposta do modelo → achados + erros (de JSON ou do validador). */
async function conferir(resposta: string, contexto: ContextoDvi, pedido?: Pedido): Promise<{ achados: unknown; json: string; erros: string[]; avisos: string[] }> {
  const { extrairJson } = await prompt();
  let achados: unknown;
  try { achados = extrairJson(resposta); } catch (e) {
    return { achados: null, json: resposta.slice(0, 4000), erros: [`resposta sem JSON válido: ${mensagem(e)}`], avisos: [] };
  }
  const m = await montar();
  const v = m.validarAchados(achados, contexto);
  // o formato também é conferido antes da correção (Gecont sem o campo gecont, Gecont com impeditivo...)
  if (!v.erros.length) {
    try {
      for (const e of m.resumirAchados(achados, contexto, pedido).validacao.erros) if (!v.erros.includes(e)) v.erros.push(e);
    } catch (e) {
      if (!(e instanceof Error) || (e.name !== 'ErroFormato' && e.name !== 'ErroMontagem')) throw e;
      v.erros.push(e.message);
    }
  }
  return { achados, json: JSON.stringify(achados), erros: v.erros, avisos: v.avisos };
}

/** A montagem do documento a gravar: do achados passado (revalidado) ou da análise guardada. */
async function documentoDe(a: Args, ctx: ContextoTool) {
  const processo = String(a.processo);
  let analise = ANALISES.get(processo);
  if (!analise && a.achados === undefined) throw new Error(`Não há análise de ${processo} nesta conversa: rode gelic_dvi_analisar primeiro.`);
  if (!analise) {
    const pacote = await (await preparar()).prepararDvi(processo, ctx, { pca: GANCHOS_DVI.pca });
    analise = { contexto: (await ponte()).contextoDoPacote(pacote), pedido: 'dvi', achados: a.achados };
  }
  const achados = a.achados !== undefined ? a.achados : analise.achados;
  const m = await montar();
  const { formato } = m.resumirAchados(achados, analise.contexto, pedidoDoFormato(analise.pedido));
  const doc = m.montarDocumento(formato, achados, analise.contexto);
  if (a.achados !== undefined) ANALISES.set(processo, { ...analise, achados });
  const tipo = typeof a.tipo === 'string' && a.tipo.trim() ? a.tipo.trim() : doc.tipoSei?.tipo;
  if (!tipo) throw new Error(`O formato ${formato} não vai ao SEI.`);
  const nomeArvore = doc.tipoSei?.nomeArvore;
  return { doc, novo: { tipo, ...(nomeArvore ? { nomeArvore } : {}) } };
}

/** Erro de montagem (validador, formato) vira texto para a conversa; o resto sobe. */
function erroDeMontagem(e: unknown): { erro: string; erros?: string[] } | null {
  if (!(e instanceof Error)) return null;
  if (e.name === 'ErroMontagem') return { erro: 'os achados não passaram no validador', erros: (e as Error & { erros: string[] }).erros };
  if (e.name === 'ErroFormato' || /rode gelic_dvi_analisar/.test(e.message)) return { erro: e.message };
  return null;
}

// ---------------------------------------------------------------- ferramentas

export const TOOLS_DVI: DefTool[] = [
  definirTool({
    nome: 'gelic_dvi_analisar',
    descricao:
      'Análise da Gelic de um processo de contratação do CFC, barata: a extensão lê e recorta os autos, calcula etapa, checklist e checagens em código e faz UMA chamada ao modelo só com o pacote, fora desta conversa; valida os achados e decide o formato (DVI, devolução, despacho à Gecont). Devolve o resumo, os avisos, o que vai ao chat (paraOChat) e os achados em JSON (para aplicar correções do usuário). Não escreve no SEI. Use para analisar, gerar DVI/devolução/despacho à Gecont; não leia os documentos você mesmo.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      'pedido?': s.texto({ enum: [...PEDIDOS], descricao: 'dvi (padrão: o formato sai da regra), devolucao, gecont, ou analise (só no chat).' }),
      'observacoes?': s.texto({ descricao: 'O que o usuário pediu para olhar ou já informou, em uma ou duas frases.' }),
    }),
    efeito: 'leitura',
    rotulo: a => `Análise Gelic de ${a.processo}`,
    executar: async (a, ctx) => {
      const pedido = (PEDIDOS.includes(a.pedido as PedidoAnalise) ? a.pedido : 'dvi') as PedidoAnalise;
      if (!ctx.completar) return { ok: false, erro: 'Este painel não oferece a chamada única ao modelo (gancho G3, ctx.completar): atualize a extensão SEI CFC Gelic.' };
      const pacote = await (await preparar()).prepararDvi(String(a.processo), ctx, { pca: GANCHOS_DVI.pca });
      const contexto = (await ponte()).contextoDoPacote(pacote);
      const m = await montar();
      const restrito = pedidoDoFormato(pedido);
      if (restrito && !contexto.dviAnterior) {
        return { ok: false, erro: `Pedido '${pedido}' exige DVI anterior desta etapa nos autos; não há. O formato correto é DVI.`, chamadas: 0 };
      }
      const { requisicaoDvi, pedidoDeCorrecao } = await prompt();
      const req = requisicaoDvi(pacote, pedido, typeof a.observacoes === 'string' ? a.observacoes : undefined);
      let chamadas = 1;
      let r = await conferir(await ctx.completar(req.sistema, req.pedido, ctx.sinal), contexto, restrito);
      if (r.erros.length && chamadas < MAX_CHAMADAS) {
        chamadas++;
        r = await conferir(await ctx.completar(req.sistema, pedidoDeCorrecao(req.pedido, r.json, r.erros), ctx.sinal), contexto, restrito);
      }
      const base = {
        pacote: { caracteres: req.caracteres, tokensEstimados: req.tokensEstimados, documentosNaoLidos: pacote.limites.documentosNaoLidos },
        chamadas,
      };
      if (r.achados === null) return { ok: false, erro: 'O modelo não devolveu JSON válido.', erros: r.erros, ...base };
      ANALISES.set(String(a.processo), { contexto, pedido, achados: r.achados });
      let formato: Formato | null = null;
      let resumo = '';
      const avisos = [...r.avisos];
      const erros = [...r.erros];
      try {
        const x = m.resumirAchados(r.achados, contexto, restrito);
        formato = x.formato; resumo = x.resumo;
        for (const e of x.validacao.erros) if (!erros.includes(e)) erros.push(e);
      } catch (e) {
        const em = erroDeMontagem(e);
        if (!em) throw e;
        erros.push(...(em.erros ?? [em.erro]));
      }
      return {
        ok: !erros.length,
        formato,
        resumo,
        avisos,
        ...(erros.length ? { erros, aviso: 'Os achados ainda têm erros do validador: corrija-os em achados (com o usuário, se for fato) antes de gravar.' } : {}),
        paraOChat: paraOChat(r.achados),
        achados: r.achados as Achados,
        ...base,
      };
    },
  }),
  definirTool({
    nome: 'gelic_dvi_gravar',
    descricao:
      'Cria no processo o DVI, a devolução ou o despacho à Gecont montado em código a partir dos achados de gelic_dvi_analisar (ou dos `achados` corrigidos que você passar, revalidados), e grava o corpo. Use só depois do "ok" do usuário ao resumo. Abre o cartão de aprovação. Não assina.',
    parametros: s.objeto({
      processo: s.texto({ descricao: 'Número do processo (protocolo).' }),
      'tipo?': s.texto({ descricao: 'Tipo de documento no SEI, se diferente do padrão da Gelic (DVI; Despacho para devolução e Gecont).' }),
      'achados?': s.livre({ descricao: 'Os achados corrigidos (o mesmo JSON de gelic_dvi_analisar, editado). Sem ele, vale a análise guardada.' }),
    }),
    efeito: 'escrita',
    rotulo: a => `Gravar o documento da análise Gelic em ${a.processo}`,
    previsualizar: async (a, ctx) => {
      try {
        const { doc, novo } = await documentoDe(a, ctx);
        const r = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo, aplicar: false });
        r.mudancas.push({ campo: `Conteúdo (${doc.formato})`, antes: '', depois: trecho(doc.texto) });
        return [{ alvo: r.alvo, mudancas: r.mudancas, resumo: r.resumo }];
      } catch (e) {
        const em = erroDeMontagem(e);
        return [{ alvo: String(a.processo), mudancas: [], resumo: '', erro: em ? [em.erro, ...(em.erros ?? [])].join(' — ') : mensagem(e) }];
      }
    },
    executar: async (a, ctx) => {
      let montado;
      try { montado = await documentoDe(a, ctx); } catch (e) {
        const em = erroDeMontagem(e);
        if (em) return { ok: false, ...em };
        throw e;
      }
      const { doc, novo } = montado;
      const criado = await ctx.sei<ResultadoEscrita>('documento.criar', { processo: a.processo, novo, aplicar: true });
      const numero = criado.dados?.numero ?? '';
      if (!numero) return { ok: false, erro: 'O SEI não devolveu o número do documento criado; confira a árvore antes de tentar de novo.', resumo: criado.resumo };
      await ctx.sei('documento.editar', { numero, html: doc.html, aplicar: true });
      return { ok: true, numero, formato: doc.formato, tipo: novo.tipo, resumo: criado.resumo, avisos: doc.avisos, paraOChat: doc.paraOChat, aviso: 'Documento criado e com o corpo gravado; não foi assinado.' };
    },
  }),
  definirTool({
    nome: 'gelic_pendencias',
    descricao:
      'Pendências de um processo de contratação do CFC, sem chamar o modelo: a extensão lê a árvore e os documentos e devolve um checklist pronto (atende / não atende / a conferir, com nº SEI) da presença das peças da etapa, assinaturas, cronologia, número de processo, citados não localizados, valores, validades e documentos não examinados. Mostre o texto como veio; não leia documentos.',
    parametros: s.objeto({ processo: s.texto({ descricao: 'Número do processo (protocolo).' }) }),
    efeito: 'leitura',
    rotulo: a => `Pendências Gelic de ${a.processo}`,
    executar: async (a, ctx) => {
      const pacote = await (await preparar()).prepararDvi(String(a.processo), ctx, { pca: GANCHOS_DVI.pca });
      return { texto: (await pendencias()).textoDePendencias(pacote), etapa: pacote.etapa.nome, aviso: 'Checagem mecânica (sem IA): o mérito dos itens do checklist se confere na análise.' };
    },
  }),
];
