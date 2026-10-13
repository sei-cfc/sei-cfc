/**
 * O que a página "Configurar a IA" guarda além da configuração do agente: o resumo sem segredo que o selo lê
 * (gelic_ia_estado) e os passos marcados à mão (gelic_ia_passos). Storage ausente ou com erro vira "nada guardado".
 */
import type { Area } from '../peca/guardados';
import { CHAVE_ESTADO_IA, CHAVE_PASSOS_IA, resumoDaConfig, type ResumoIa } from './estado';

export async function lerResumo(area: Area | null): Promise<ResumoIa | null> {
  try {
    const r = area ? (await area.get(CHAVE_ESTADO_IA))[CHAVE_ESTADO_IA] : undefined;
    return r && typeof r === 'object' && typeof (r as ResumoIa).servico === 'string' ? (r as ResumoIa) : null;
  } catch {
    return null;
  }
}

export async function gravarResumo(area: Area | null, r: ResumoIa | null): Promise<void> {
  if (!area) return;
  if (r) await area.set({ [CHAVE_ESTADO_IA]: r });
  else await area.remove(CHAVE_ESTADO_IA);
}

/** As janelas que leem a configuração do agente mantêm o resumo do selo em dia (chave posta pelo painel, inclusive). */
export async function sincronizarResumo(area: Area | null, cfg: Record<string, unknown> | undefined, agora: Date): Promise<void> {
  try {
    const atual = await lerResumo(area);
    const novo = await resumoDaConfig(cfg, atual, agora);
    if (novo !== atual) await gravarResumo(area, novo);
  } catch {
    /* o selo só fica desatualizado */
  }
}

export async function lerPassos(area: Area | null): Promise<Record<string, string[]>> {
  try {
    const p = area ? (await area.get(CHAVE_PASSOS_IA))[CHAVE_PASSOS_IA] : undefined;
    if (!p || typeof p !== 'object') return {};
    // só listas de texto: o que vier quebrado do storage não derruba a página
    return Object.fromEntries(Object.entries(p as Record<string, unknown>).filter(([, v]) => Array.isArray(v)).map(([k, v]) => [k, (v as unknown[]).filter((x): x is string => typeof x === 'string')]));
  } catch {
    return {};
  }
}

export async function gravarPassos(area: Area | null, p: Record<string, string[]>): Promise<void> {
  if (area) await area.set({ [CHAVE_PASSOS_IA]: p });
}
