/**
 * Etapas já calculadas, por processo, em chrome.storage.local (`gelic_etapas`). Quem escreve:
 * o selo da árvore, toda vez que um processo é aberto (de graça), e o "Calcular etapas" do
 * Controle de Processos. Quem lê: o Controle de Processos, sem requisição nenhuma.
 *
 * Só guarda o resultado (etapa, nome, tom, descrição), nunca títulos de documentos: o cache
 * não vira uma cópia dos autos. Processo sigiloso entra só como "sigiloso".
 */
import type { Tom } from '../regras/rotulos';

export const CHAVE_ETAPAS = 'gelic_etapas';
/** Teto de processos guardados; os mais antigos saem primeiro. */
export const LIMITE = 3000;
/** Etapa calculada há mais que isto aparece como desatualizada. */
export const VALIDADE_MS = 7 * 24 * 3600_000;

export interface EtapaGuardada {
  /** id da etapa; null = fora do rito; 'sigiloso' = não calculada. */
  etapa: string | null;
  nome: string;
  tom: Tom | 'fora';
  descricao: string;
  /** Quando foi calculada (ms). */
  t: number;
}
export type MapaEtapas = Record<string, EtapaGuardada>;

export interface Area {
  get(chave: string): Promise<Record<string, unknown>>;
  set(itens: Record<string, unknown>): Promise<void>;
}

export const areaPadrao = (): Area | null => globalThis.chrome?.storage?.local ?? null;

export async function lerEtapas(area: Area | null = areaPadrao()): Promise<MapaEtapas> {
  if (!area) return {};
  try {
    const v = (await area.get(CHAVE_ETAPAS))[CHAVE_ETAPAS];
    return v && typeof v === 'object' ? (v as MapaEtapas) : {};
  } catch {
    return {};
  }
}

/** Grava várias de uma vez (uma escrita no storage), podando as mais antigas acima do teto. */
export async function guardarEtapas(novas: MapaEtapas, area: Area | null = areaPadrao()): Promise<void> {
  if (!area || !Object.keys(novas).length) return;
  const mapa = { ...(await lerEtapas(area)), ...novas };
  const ids = Object.keys(mapa);
  if (ids.length > LIMITE) {
    for (const id of ids.sort((a, b) => mapa[a].t - mapa[b].t).slice(0, ids.length - LIMITE)) delete mapa[id];
  }
  try {
    await area.set({ [CHAVE_ETAPAS]: mapa });
  } catch {
    /* cota ou contexto inválido: a etapa só não fica guardada */
  }
}

/** Desatualizada: velha, ou entrou documento no processo desde a última visita da unidade. */
export const desatualizada = (e: EtapaGuardada, documentoNovo: boolean, agora = Date.now()) =>
  documentoNovo || agora - e.t > VALIDADE_MS;
