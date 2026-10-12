/**
 * As peças internas que o "Iniciar processo" criou EM BRANCO, por processo (`gelic_cfc_vazios`). Só nelas o "Preencher"
 * do roteiro grava o formulário (documento=): um rascunho que a unidade escreveu à mão nunca é sobrescrito. Sai da lista
 * quando o formulário grava nela.
 */
import type { Area } from '../peca/guardados';

export const CHAVE_VAZIOS = 'gelic_cfc_vazios';
export interface Vazio { chave: string; numero: string }
type Mapa = Record<string, Vazio[]>;
const chave = (protocolo: string) => protocolo.replace(/\D/g, '');

async function ler(area: Area | null): Promise<Mapa> {
  if (!area) return {};
  try {
    const v = (await area.get(CHAVE_VAZIOS))[CHAVE_VAZIOS];
    return v && typeof v === 'object' ? (v as Mapa) : {};
  } catch { return {}; }
}
export async function lerVazios(area: Area | null, protocolo: string): Promise<Vazio[]> {
  return (await ler(area))[chave(protocolo)] ?? [];
}
export async function guardarVazios(area: Area | null, protocolo: string, vazios: readonly Vazio[]): Promise<void> {
  if (!area || !vazios.length) return;
  const m = await ler(area);
  m[chave(protocolo)] = [...(m[chave(protocolo)] ?? []), ...vazios];
  try { await area.set({ [CHAVE_VAZIOS]: m }); } catch { /* sem storage: o Preencher cria documento novo */ }
}
export async function removerVazio(area: Area | null, protocolo: string, numero: string): Promise<void> {
  if (!area) return;
  const m = await ler(area);
  const k = chave(protocolo);
  if (!m[k]) return;
  m[k] = m[k].filter(v => v.numero !== numero);
  if (!m[k].length) delete m[k];
  try { await area.set({ [CHAVE_VAZIOS]: m }); } catch { /* idem */ }
}
