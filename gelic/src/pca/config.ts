/**
 * Configuração do PCA no navegador (chrome.storage.local, `gelic_pca`): endereço e token pessoal (gerado em Meu
 * perfil, no PCA). Sem ela, nada sai pela rede. A página do SEI lê esta chave (o token do PCA não é a chave de IA).
 * Também guarda o vínculo de cada processo por 12 h (`gelic_pca_vinculos`), para o selo não perguntar a cada clique.
 */
import type { Area } from '../peca/guardados';
import type { ConfigPca } from './cliente';
import { URL_PADRAO, type Enviado, type RespostaProcesso } from './contrato';

export const CHAVE_PCA = 'gelic_pca';
export const CHAVE_VINCULOS = 'gelic_pca_vinculos';
export const CHAVE_ENVIADOS = 'gelic_pca_enviados';
export const VALIDADE_VINCULO_MS = 12 * 60 * 60 * 1000;
/** No máximo isto de vínculos guardados (os mais antigos saem). */
const MAX_VINCULOS = 300;

export interface ConfigGuardada extends ConfigPca {
  /** Da última "Testar conexão" (ou da revisão periódica): quem é e se pode enviar coleta. */
  usuario?: string;
  pode_enviar?: boolean;
  /** v1.1: pode vincular processos e gravar a ficha (grupo demandante ou editor). Só informativo: o vínculo confere no /saude. */
  pode_instruir?: boolean;
  /** Quando `pode_enviar` foi conferido no PCA (ms). */
  conferido_em?: number;
}
/** De quanto em quanto tempo o SEI CFC Gelic confere de novo a permissão de enviar (`/saude`). */
export const REVER_PERMISSAO_MS = 12 * 60 * 60 * 1000;

/** O chrome.storage.local (content script e páginas da extensão), sem puxar o formulário das peças junto. */
export function areaLocal(): Area | null {
  const local = globalThis.chrome?.storage?.local;
  if (!local) return null;
  return { get: k => local.get(k) as Promise<Record<string, unknown>>, set: o => local.set(o), remove: k => local.remove(k) };
}

const ehObjeto = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);

async function ler(area: Area | null, chave: string): Promise<unknown> {
  if (!area) return undefined;
  try { return (await area.get(chave))[chave]; } catch { return undefined; }
}

/** A configuração válida (endereço https e token), ou null. */
export async function lerConfigPca(area: Area | null): Promise<ConfigGuardada | null> {
  const v = await ler(area, CHAVE_PCA);
  if (!ehObjeto(v) || typeof v.token !== 'string' || !v.token.trim()) return null;
  const url = typeof v.url === 'string' && v.url.trim() ? v.url.trim() : URL_PADRAO;
  if (!/^https:\/\//.test(url)) return null;
  return {
    url, token: v.token.trim(),
    ...(typeof v.usuario === 'string' ? { usuario: v.usuario } : {}),
    ...(typeof v.pode_enviar === 'boolean' ? { pode_enviar: v.pode_enviar } : {}),
    ...(typeof v.pode_instruir === 'boolean' ? { pode_instruir: v.pode_instruir } : {}),
    ...(typeof v.conferido_em === 'number' ? { conferido_em: v.conferido_em } : {}),
  };
}

/** Endereço: só https (o token vai no cabeçalho). */
export function validarUrl(url: string): string | null {
  const u = url.trim().replace(/\/+$/, '');
  try {
    const p = new URL(u);
    if (p.protocol !== 'https:') return null;
    return `${p.origin}${p.pathname === '/' ? '' : p.pathname}`;
  } catch {
    return null;
  }
}

export async function guardarConfigPca(area: Area, c: ConfigGuardada): Promise<void> {
  await area.set({ [CHAVE_PCA]: c });
  // outro usuário ou outro PCA: os vínculos e os envios de antes não valem
  await area.remove(CHAVE_VINCULOS);
  await area.remove(CHAVE_ENVIADOS);
}
export async function apagarConfigPca(area: Area): Promise<void> {
  await area.remove(CHAVE_PCA);
  await area.remove(CHAVE_VINCULOS);
  await area.remove(CHAVE_ENVIADOS);
}
/** Só a permissão, sem mexer no token nem nos vínculos (revisão periódica, ou o 403 do envio). */
export async function atualizarPermissao(area: Area | null, pode_enviar: boolean, agora: number): Promise<void> {
  if (!area) return;
  try {
    const v = await ler(area, CHAVE_PCA);
    if (ehObjeto(v)) await area.set({ [CHAVE_PCA]: { ...v, pode_enviar, conferido_em: agora } });
  } catch { /* sem storage: só não guarda */ }
}
/** Só `pode_instruir` (SEI CFC, revisão periódica), sem mexer no token nem nos vínculos. */
export async function atualizarPodeInstruir(area: Area | null, pode_instruir: boolean, agora: number): Promise<void> {
  if (!area) return;
  try {
    const v = await ler(area, CHAVE_PCA);
    if (ehObjeto(v)) await area.set({ [CHAVE_PCA]: { ...v, pode_instruir, conferido_em: agora } });
  } catch { /* sem storage: só não guarda */ }
}

type Vinculos = Record<string, { t: number; r: RespostaProcesso }>;
const chaveProcesso = (protocolo: string) => protocolo.replace(/\D/g, '');

export async function lerVinculo(area: Area | null, protocolo: string, agora: number): Promise<RespostaProcesso | null> {
  const v = await ler(area, CHAVE_VINCULOS);
  if (!ehObjeto(v)) return null;
  const e = (v as Vinculos)[chaveProcesso(protocolo)];
  return e && agora - e.t < VALIDADE_VINCULO_MS ? e.r : null;
}

export async function guardarVinculo(area: Area | null, protocolo: string, r: RespostaProcesso, agora: number): Promise<void> {
  // "sem vínculo" não fica guardado: a Gelic pode ligar o processo no PCA a qualquer momento
  if (!area || !r.itens.length) return;
  try {
    const v = await ler(area, CHAVE_VINCULOS);
    const todos: Vinculos = ehObjeto(v) ? (v as Vinculos) : {};
    // a última coleta muda com o envio: o guardado é só o vínculo (itens), e o atalho de pulo pergunta de novo
    todos[chaveProcesso(protocolo)] = { t: agora, r: { itens: r.itens } };
    const ordem = Object.entries(todos).filter(([, e]) => agora - e.t < VALIDADE_VINCULO_MS).sort((a, b) => b[1].t - a[1].t).slice(0, MAX_VINCULOS);
    await area.set({ [CHAVE_VINCULOS]: Object.fromEntries(ordem) });
  } catch { /* sem storage: só não guarda */ }
}

type Enviados = Record<string, Enviado>;
/** O que este navegador já enviou do processo: o PCA não devolve o total da coleta da extensão. */
export async function lerEnviado(area: Area | null, protocolo: string): Promise<Enviado | null> {
  const v = await ler(area, CHAVE_ENVIADOS);
  return ehObjeto(v) ? ((v as Enviados)[chaveProcesso(protocolo)] ?? null) : null;
}
export async function guardarEnviado(area: Area | null, protocolo: string, e: Enviado): Promise<void> {
  if (!area) return;
  try {
    const v = await ler(area, CHAVE_ENVIADOS);
    const todos: Enviados = ehObjeto(v) ? (v as Enviados) : {};
    todos[chaveProcesso(protocolo)] = e;
    const ordem = Object.entries(todos).sort((a, b) => b[1].t - a[1].t).slice(0, MAX_VINCULOS);
    await area.set({ [CHAVE_ENVIADOS]: Object.fromEntries(ordem) });
  } catch { /* sem storage: só não guarda */ }
}
