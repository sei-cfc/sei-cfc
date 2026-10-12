/**
 * O pedido do "Iniciar processo" feito na ficha do item do PCA (src/pca-site/), à espera do Controle de Processos do
 * SEI (chrome.storage.local, `gelic_iniciar_pendente`). Vale 15 min e é apagado ao ser tomado: o login no SEI pode
 * ficar no meio, e recarregar o Controle não reabre o diálogo.
 */
import type { Area } from '../peca/guardados';

export const CHAVE_PENDENTE = 'gelic_iniciar_pendente';
export const VALIDADE_PENDENTE_MS = 15 * 60 * 1000;

export interface PedidoPca { item_pca: number; exercicio: number }

const inteiro = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x) && x > 0;

export async function guardarPendente(area: Area, p: PedidoPca, agora: number): Promise<void> {
  await area.set({ [CHAVE_PENDENTE]: { item_pca: p.item_pca, exercicio: p.exercicio, t: agora } });
}

/** O pedido válido e dentro da validade, ou null. Sempre apaga o que estava guardado. */
export async function tomarPendente(area: Area | null, agora: number): Promise<PedidoPca | null> {
  if (!area) return null;
  let v: unknown;
  try {
    v = (await area.get(CHAVE_PENDENTE))[CHAVE_PENDENTE];
    if (v === undefined) return null;
    await area.remove(CHAVE_PENDENTE);
  } catch {
    return null;
  }
  if (!v || typeof v !== 'object') return null;
  const { item_pca, exercicio, t } = v as Record<string, unknown>;
  if (!inteiro(item_pca) || !inteiro(exercicio) || typeof t !== 'number') return null;
  const idade = agora - t;
  return idade >= 0 && idade < VALIDADE_PENDENTE_MS ? { item_pca, exercicio } : null;
}
