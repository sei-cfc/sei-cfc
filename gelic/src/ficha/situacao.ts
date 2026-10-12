/**
 * A situação da instrução nos dados da contratação (desenho: "Situação para o PCA"): o roteiro do selo do SEI CFC em
 * `situacao[<nº SEI>]` de cada item ligado ao processo, só quando mudou. Só o selo escreve a situação: respostas,
 * outros processos e chaves desconhecidas ficam como estão. Falha não vai para a tela; a próxima abertura tenta de
 * novo. É a parte dos dados que o PCA lê (3c). Vai no bundle do selo (ASCII): nada de regex com acento.
 */
import type { Area } from '../peca/guardados';
import type { Roteiro } from '../peca/roteiro';
import { ErroPca, type ClientePca } from '../pca/cliente';
import type { ItemDaFicha, RespostaFicha } from '../pca/contrato';
import { TEMPO_PCA_MS } from '../iniciar/pca';
import { lerDados, montarDados, TENTATIVAS } from './formato';

export const CHAVE_SITUACAO = 'gelic_pca_situacao';
/** No máximo isto de situações lembradas neste navegador (as mais antigas saem). */
const MAX_LEMBRADAS = 300;

export interface PassoSituacao { chave: string; rotulo: string; estado: 'feito' | 'em_elaboracao' | 'falta'; obrigatoria: boolean; numero?: string }
export interface SituacaoProcesso {
  /** ISO 8601, em UTC. */
  em: string;
  completa: boolean;
  /** A chave da próxima peça; null com a instrução completa. */
  proxima: string | null;
  passos: PassoSituacao[];
}

export function situacaoDoRoteiro(r: Roteiro, agora: Date): SituacaoProcesso {
  return {
    em: agora.toISOString(),
    completa: r.completa,
    proxima: r.proxima?.chave ?? null,
    passos: r.passos.map(p => ({ chave: p.chave, rotulo: p.rotulo, estado: p.estado, obrigatoria: p.obrigatoria, ...(p.numero ? { numero: p.numero } : {}) })),
  };
}

/** O que conta para "mudou": tudo menos o `em`. */
function assinatura(s: unknown): string | null {
  if (!s || typeof s !== 'object') return null;
  const x = s as Partial<SituacaoProcesso>;
  return JSON.stringify({ completa: x.completa ?? null, proxima: x.proxima ?? null, passos: x.passos ?? null });
}
const chaveLembrada = (protocolo: string, i: ItemDaFicha) => `${protocolo.replace(/\D/g, '')}:${i.item_pca}/${i.exercicio}`;
type Lembradas = Record<string, { t: number; a: string }>;

async function lembradas(area: Area | null): Promise<Lembradas> {
  if (!area) return {};
  try {
    const v = (await area.get(CHAVE_SITUACAO))[CHAVE_SITUACAO];
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Lembradas) : {};
  } catch {
    return {};
  }
}
async function lembrar(area: Area | null, chave: string, a: string, agora: number): Promise<void> {
  if (!area) return;
  try {
    const todas = { ...(await lembradas(area)), [chave]: { t: agora, a } };
    const ordem = Object.entries(todas).sort((x, y) => y[1].t - x[1].t).slice(0, MAX_LEMBRADAS);
    await area.set({ [CHAVE_SITUACAO]: Object.fromEntries(ordem) });
  } catch { /* sem storage: só não lembra */ }
}

export interface DepsSituacao {
  cliente: Pick<ClientePca, 'ficha' | 'gravarFicha'>;
  area: Area | null;
  agora: () => number;
  prazo?: () => AbortSignal;
}
export type FeitoSituacao = 'gravada' | 'em_dia' | { erro: string };

/** Grava a situação do processo em cada item ligado, se mudou desde a última vez. */
export async function gravarSituacao(protocolo: string, itens: readonly ItemDaFicha[], situacao: SituacaoProcesso, deps: DepsSituacao): Promise<FeitoSituacao[]> {
  const prazo = deps.prazo ?? (() => AbortSignal.timeout(TEMPO_PCA_MS));
  const nova = assinatura(situacao)!;
  const ja = await lembradas(deps.area);
  const feitos: FeitoSituacao[] = [];
  for (const item of itens) {
    const chave = chaveLembrada(protocolo, item);
    if (ja[chave]?.a === nova) { feitos.push('em_dia'); continue; }
    feitos.push(await gravarNoItem(protocolo, item, situacao, nova, chave, deps, prazo));
  }
  return feitos;
}

async function gravarNoItem(protocolo: string, item: ItemDaFicha, situacao: SituacaoProcesso, nova: string, chave: string, deps: DepsSituacao,
  prazo: () => AbortSignal): Promise<FeitoSituacao> {
  try {
    let f: RespostaFicha = await deps.cliente.ficha(item, prazo());
    for (let i = 0; i < TENTATIVAS; i++) {
      const lidos = lerDados(f.dados);
      if (lidos.problema) return { erro: `dados da contratação com ${lidos.problema === 'esquema_novo' ? 'formato mais novo (atualize a extensão)' : 'formato desconhecido'}` };
      if (assinatura(lidos.situacao[protocolo]) === nova) { await lembrar(deps.area, chave, nova, deps.agora()); return 'em_dia'; }
      try {
        await deps.cliente.gravarFicha({ ...item, versao: f.versao, dados: montarDados(lidos, { situacao: { ...lidos.situacao, [protocolo]: situacao } }) }, prazo());
        await lembrar(deps.area, chave, nova, deps.agora());
        return 'gravada';
      } catch (e) {
        const atual = e instanceof ErroPca && e.codigo === 'versao_desatualizada' ? (e.corpo as { ficha?: RespostaFicha } | undefined)?.ficha : undefined;
        if (!atual) throw e;
        // alguém gravou no meio: reaplica sobre o que veio no 409
        f = atual;
      }
    }
    return { erro: 'os dados da contratação estão mudando agora' };
  } catch (e) {
    return { erro: e instanceof Error ? e.message : String(e) };
  }
}
