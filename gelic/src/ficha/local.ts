/**
 * Os dados da contratação deste navegador, um por processo (`gelic_cfc_ficha:<dígitos do nº SEI>`). Guardam as
 * respostas sem o PCA (não configurado, processo sem item, sem permissão, PCA fora do ar) até subirem ("sobe
 * depois"). Não é o rascunho: o rascunho é por peça e sai ao gravar; estes ficam até subir. Nunca derrubam a janela.
 */
import type { Area } from '../peca/guardados';
import { ESQUEMA } from './formato';

export const chaveLocal = (protocolo: string) => `gelic_cfc_ficha:${protocolo.replace(/\D/g, '')}`;
export interface DadosLocais {
  esquema: number;
  respostas: Record<string, unknown>;
  /** O valor de cada campo no PCA quando ficou guardado aqui (quando se sabia): a base da subida. */
  base: Record<string, unknown>;
  /** Primeira gravação (ms): o "desde" do "sobe depois". */
  desde: number;
  /** Última gravação (ms). */
  em: number;
}
const ehObjeto = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);
const numero = (x: unknown) => (typeof x === 'number' ? x : 0);

export async function lerLocal(area: Area | null, protocolo: string): Promise<DadosLocais | null> {
  if (!area) return null;
  const chave = chaveLocal(protocolo);
  try {
    const v = (await area.get(chave))[chave];
    if (!ehObjeto(v) || !ehObjeto(v.respostas)) return null;
    return { esquema: numero(v.esquema) || ESQUEMA, respostas: v.respostas, base: ehObjeto(v.base) ? v.base : {}, desde: numero(v.desde), em: numero(v.em) };
  } catch {
    return null;
  }
}

/** Grava (substitui) os dados do processo; o "desde" fica o da primeira vez. false: sem storage, nada guardado. */
export async function guardarLocal(area: Area | null, protocolo: string, respostas: Record<string, unknown>, agora: number,
  base: Record<string, unknown> = {}): Promise<boolean> {
  if (!area) return false;
  try {
    const antes = await lerLocal(area, protocolo);
    await area.set({ [chaveLocal(protocolo)]: { esquema: ESQUEMA, respostas, base, desde: antes?.desde || agora, em: agora } });
    return true;
  } catch {
    return false;
  }
}

export async function apagarLocal(area: Area | null, protocolo: string): Promise<void> {
  if (!area) return;
  try { await area.remove(chaveLocal(protocolo)); } catch { /* sem storage: nada a apagar */ }
}
