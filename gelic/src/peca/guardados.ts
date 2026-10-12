/**
 * O que o formulário das peças guarda no navegador (chrome.storage.local), por usuário do navegador:
 *  - os dados da UO, que voltam na próxima peça com a origem "da última vez" (só os da lista CAMPOS_DA_UO);
 *  - o rascunho de cada (processo, peça), que volta ao reabrir a janela e sai depois de gravar.
 * Nunca derruba o formulário: storage ausente ou com erro vira "nada guardado".
 */
import { temValor } from '../modelos/analise-cfc';

export interface Area {
  get(k: string): Promise<Record<string, unknown>>;
  set(o: Record<string, unknown>): Promise<void>;
  remove(k: string): Promise<void>;
}

export const CHAVE_UO = 'gelic_cfc_uo';
/** Dados da unidade e das pessoas dela: o resto (objeto, valor, justificativa...) é de cada contratação. */
export const CAMPOS_DA_UO: readonly string[] = [
  'unidade', 'area_nome', 'responsavel_nome', 'responsavel_email', 'responsavel_matricula',
  'diretor_nome', 'diretor_cargo', 'equipe_planejamento', 'pessoas', 'projetos_contas',
];
export const chaveRascunho = (processo: string, modelo: string) => `gelic_cfc_rascunho:${processo}:${modelo}`;

export function areaPadrao(): Area | null {
  const local = globalThis.chrome?.storage?.local;
  if (!local) return null;
  return {
    get: k => local.get(k) as Promise<Record<string, unknown>>,
    set: o => local.set(o),
    remove: k => local.remove(k),
  };
}

async function ler(area: Area | null, chave: string): Promise<unknown> {
  if (!area) return undefined;
  try {
    return (await area.get(chave))[chave];
  } catch {
    return undefined;
  }
}
async function tentar(f: () => Promise<void>): Promise<void> {
  try { await f(); } catch { /* sem storage: segue sem guardar */ }
}
const ehObjeto = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);

export async function lerUo(area: Area | null): Promise<Record<string, unknown>> {
  const v = await ler(area, CHAVE_UO);
  return ehObjeto(v) ? v : {};
}

/** Soma à gravação anterior só os campos de CAMPOS_DA_UO com valor. */
export async function guardarUo(area: Area | null, dados: Record<string, unknown>): Promise<void> {
  if (!area) return;
  const novos = Object.fromEntries(CAMPOS_DA_UO.filter(k => temValor(dados[k])).map(k => [k, dados[k]]));
  if (!Object.keys(novos).length) return;
  const atual = await lerUo(area);
  await tentar(() => area.set({ [CHAVE_UO]: { ...atual, ...novos } }));
}

export async function lerRascunho(area: Area | null, processo: string, modelo: string): Promise<Record<string, unknown> | null> {
  const v = await ler(area, chaveRascunho(processo, modelo));
  return ehObjeto(v) ? v : null;
}

/** `dados`: {valores, evidencias} (a janela guarda a origem de cada valor) ou só os valores. */
export async function guardarRascunho(area: Area | null, processo: string, modelo: string, dados: Record<string, unknown>): Promise<void> {
  if (area) await tentar(() => area.set({ [chaveRascunho(processo, modelo)]: dados }));
}

export async function apagarRascunho(area: Area | null, processo: string, modelo: string): Promise<void> {
  if (area) await tentar(() => area.remove(chaveRascunho(processo, modelo)));
}
