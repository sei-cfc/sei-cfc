/**
 * Uma rodada da verificação prévia: o pipeline do DVI barato (desenho, U-3). Sem IA (ctx sem completar), só as
 * pendências mecânicas: "verificação parcial, o mérito não foi analisado". Com IA, uma chamada com o pedido
 * `previa` e só os itens a reexaminar (no máximo uma correção, como no DVI). O validador do DVI confere o resultado
 * inteiro: o que a IA devolveu junto com o que ficou da rodada anterior.
 */
import type { ContextoTool } from '../../../agente-ia/src/motor/tools';
import { MAX_CHAMADAS } from '../agente/dvi';
import { contextoDoPacote } from '../dvi/contexto';
import type { Achados } from '../dvi/montar/achados';
import { validarAchados } from '../dvi/montar/index';
import { textoDePendencias } from '../dvi/pendencias';
import { prepararDvi, type OpcoesPreparar } from '../dvi/preparar/index';
import type { Dia } from '../dvi/preparar/texto';
import { extrairJson, pedidoDeCorrecao, requisicaoDvi } from '../dvi/prompt';
import { paraHtmlSei } from '../modelos/motor';
import type { Area } from '../peca/guardados';
import { blocosDoChecklist, NOME_CHECKLIST, tipoEhChecklist } from './documento';
import { aReexaminar, fechado, guardarVerificacao, juntarRodada, lerVerificacao, pendentes, type Verificacao } from './estado';

export interface DepsRodada { area: Area | null; agora: () => Date; pca?: OpcoesPreparar['pca']; hoje?: Dia }
export type ResultadoRodada =
  | { tipo: 'parcial'; pendencias: string; etapa: string }
  | { tipo: 'completa'; verificacao: Verificacao; pendencias: string; reexaminados: number; chamadas: number }
  | { tipo: 'erro'; erro: string; erros: string[]; pendencias: string };

const ehObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));

/** O resultado inteiro para o validador: o da IA e, por cima, os itens mantidos (status e achados) da rodada anterior. */
export function paraValidar(achados: unknown, ant: Verificacao | null, mantidos: readonly string[]): unknown {
  if (!ehObj(achados) || !ant || !mantidos.length) return achados;
  const a = structuredClone(achados) as unknown as Achados;
  a.blocos = Array.isArray(a.blocos) ? a.blocos : [];
  const status = { ...(ehObj(a.checklist_status) ? a.checklist_status : {}) };
  for (const i of ant.itens.filter(x => mantidos.includes(x.id))) {
    status[i.id] = { status: i.status, ...(i.sei ? { sei: i.sei } : {}), ...(i.nota ? { nota: i.nota } : {}) };
    for (const x of i.achados) {
      if (!x.sei) { (a.compatibilidade ??= []).push(x.achado); continue; }
      const bloco = a.blocos.find(b => b.sei === x.sei);
      if (bloco) bloco.achados.push(x.achado);
      else a.blocos.push({ documento: x.documento, sei: x.sei, achados: [x.achado] });
    }
  }
  a.checklist_status = status;
  return a;
}

export async function rodarVerificacao(processo: string, ctx: ContextoTool, deps: DepsRodada): Promise<ResultadoRodada> {
  const pacote = await prepararDvi(processo, ctx, { pca: deps.pca, ...(deps.hoje ? { hoje: deps.hoje } : {}) });
  const pendencias = textoDePendencias(pacote);
  if (!ctx.completar) return { tipo: 'parcial', pendencias, etapa: pacote.etapa.nome };
  const anterior = await lerVerificacao(deps.area, processo);
  const ids = aReexaminar(anterior, pacote);
  if (!ids.length) {
    const v = juntarRodada(anterior, pacote, null, [], deps.agora());
    await guardarVerificacao(deps.area, v);
    return { tipo: 'completa', verificacao: v, pendencias, reexaminados: 0, chamadas: 0 };
  }
  const mantidos = pacote.checklist.map(i => i.id).filter(id => !ids.includes(id));
  const contexto = contextoDoPacote(pacote);
  const req = requisicaoDvi({ ...pacote, checklist: pacote.checklist.filter(i => ids.includes(i.id)) }, 'previa');
  const conferir = (resposta: string) => {
    let achados: unknown;
    try { achados = extrairJson(resposta); } catch (e) {
      return { achados: null, json: resposta.slice(0, 4000), erros: [`resposta sem JSON válido: ${mensagem(e)}`] };
    }
    const v = validarAchados(paraValidar(achados, anterior, mantidos), contexto);
    return { achados, json: JSON.stringify(achados), erros: v.erros };
  };
  let chamadas = 1;
  let r = conferir(await ctx.completar(req.sistema, req.pedido, ctx.sinal));
  if (r.erros.length && chamadas < MAX_CHAMADAS) {
    chamadas++;
    r = conferir(await ctx.completar(req.sistema, pedidoDeCorrecao(req.pedido, r.json, r.erros), ctx.sinal));
  }
  if (r.achados === null || r.erros.length) {
    return { tipo: 'erro', erro: 'A resposta da IA não passou na conferência. Rode de novo; se repetir, troque o modelo no painel do agente.', erros: r.erros, pendencias };
  }
  const v = juntarRodada(anterior, pacote, r.achados as Achados, ids, deps.agora());
  await guardarVerificacao(deps.area, v);
  return { tipo: 'completa', verificacao: v, pendencias, reexaminados: ids.length, chamadas };
}

const dataBr = (d: Date) => d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

/** O HTML do checklist, igual ao que vai ao SEI. */
export const previaChecklist = (v: Verificacao, o: { unidade?: string; agora: Date }) =>
  paraHtmlSei(blocosDoChecklist(v, { ...(o.unidade ? { unidade: o.unidade } : {}), data: dataBr(o.agora) }));

interface ArvoreMinima { documentos?: { numero: string; titulo?: string; nivel?: string; cancelado?: boolean }[] }

/** Grava o checklist: só fechado e sem documento novo desde a rodada. Cria, grava o corpo e não assina. */
export async function gravarChecklist(o: { processo: string; tipo: string; unidade?: string; ctx: ContextoTool; area: Area | null; agora: () => Date }): Promise<{ ok: boolean; numero?: string; erro?: string }> {
  const v = await lerVerificacao(o.area, o.processo);
  if (!v) return { ok: false, erro: 'Rode a verificação antes de gravar o checklist.' };
  if (!fechado(v)) {
    const n = pendentes(v).length;
    return { ok: false, erro: `${n} ${n > 1 ? 'itens pendentes' : 'item pendente'}: corrija nos autos e verifique de novo, ou justifique.` };
  }
  const arv = await o.ctx.sei<ArvoreMinima>('processo.arvore', { processo: o.processo });
  const conhecidos = new Set(v.documentos.map(d => d.numero));
  const novos = (arv?.documentos ?? []).filter(d => d.titulo && !d.cancelado && d.nivel !== 'sigiloso' && !conhecidos.has(d.numero));
  if (novos.length) return { ok: false, erro: `Entrou documento depois da verificação (${novos.map(d => `SEI ${d.numero}`).join(', ')}): verifique de novo antes de gravar.` };
  const novo = { tipo: o.tipo, ...(tipoEhChecklist(o.tipo) ? {} : { nomeArvore: NOME_CHECKLIST }) };
  const criado = await o.ctx.sei<{ dados?: { numero?: string } }>('documento.criar', { processo: o.processo, novo, aplicar: true });
  const numero = criado?.dados?.numero ?? '';
  if (!numero) return { ok: false, erro: 'O SEI não devolveu o número do documento criado; confira a árvore antes de tentar de novo.' };
  await o.ctx.sei('documento.editar', { numero, html: previaChecklist(v, { ...(o.unidade ? { unidade: o.unidade } : {}), agora: o.agora() }), aplicar: true });
  return { ok: true, numero };
}
