/**
 * Configurar a IA (desenho 2026-10-10-verificacao-previa-uo.md, Parte 0; plano 2026-10-12-configurar-ia-plano.md):
 * os passos de cada serviço, a gravação na configuração do agente (agenteIA_config) sem mexer no resto e o resumo sem
 * segredo (gelic_ia_estado) que o selo lê — a página do SEI nunca lê a chave. Puro; entra também no selo (content
 * script), então não importa o provedor do agente e não tem acento dentro de regex.
 */

export type ServicoIa = 'openrouter' | 'anthropic';
export const SERVICOS_IA: readonly ServicoIa[] = ['openrouter', 'anthropic'];
export const NOME_DO_SERVICO: Readonly<Record<ServicoIa, string>> = { openrouter: 'OpenRouter', anthropic: 'Anthropic' };
/** Os nomes de todos os serviços do painel do agente (a chave pode ter sido posta lá, com outro serviço). */
const NOMES_DO_PAINEL: Readonly<Record<string, string>> = { ...NOME_DO_SERVICO, openai: 'OpenAI', gemini: 'Google Gemini', compativel: 'outro serviço compatível' };
export const CHAVE_ESTADO_IA = 'gelic_ia_estado';
export const CHAVE_PASSOS_IA = 'gelic_ia_passos';

export interface Passo {
  id: 'conta' | 'credito' | 'limite' | 'chave' | 'modelo';
  texto: string;
  /** auto: a página confere sozinha; manual: a pessoa marca. */
  tipo: 'auto' | 'manual';
  feito: boolean;
  link?: string;
  nota?: string;
}
export interface SituacaoIa {
  /** A chave respondeu ao teste. */
  conferida: boolean;
  /** OpenRouter: o limite de gasto da chave (null = sem limite; undefined = não se sabe). */
  limite: number | null | undefined;
  modelo: string;
  /** Os passos manuais que a pessoa marcou. */
  marcados: readonly string[];
}

const ROTEIRO: Readonly<Record<ServicoIa, readonly Omit<Passo, 'feito' | 'nota'>[]>> = {
  openrouter: [
    { id: 'conta', tipo: 'manual', texto: 'Crie a conta no OpenRouter.', link: 'https://openrouter.ai/' },
    { id: 'credito', tipo: 'manual', texto: 'Ponha crédito (Settings → Credits). US$ 5 a 10 dão para muitas verificações.', link: 'https://openrouter.ai/settings/credits' },
    { id: 'limite', tipo: 'auto', texto: 'Gere a chave com limite de gasto (Keys → Create Key → Credit limit).', link: 'https://openrouter.ai/keys' },
    { id: 'chave', tipo: 'auto', texto: 'Cole a chave abaixo e clique em Testar.' },
    { id: 'modelo', tipo: 'auto', texto: 'Escolha o modelo.' },
  ],
  anthropic: [
    { id: 'conta', tipo: 'manual', texto: 'Crie a conta no console da Anthropic.', link: 'https://console.anthropic.com/' },
    { id: 'credito', tipo: 'manual', texto: 'Ponha crédito (Billing).', link: 'https://console.anthropic.com/settings/billing' },
    { id: 'limite', tipo: 'manual', texto: 'Defina o limite de gasto da organização (Limits).', link: 'https://console.anthropic.com/settings/limits' },
    { id: 'chave', tipo: 'auto', texto: 'Gere a chave (API Keys), cole abaixo e clique em Testar.', link: 'https://console.anthropic.com/settings/keys' },
    { id: 'modelo', tipo: 'auto', texto: 'Escolha o modelo.' },
  ],
};

export function passosDe(servico: ServicoIa, s: SituacaoIa): Passo[] {
  return ROTEIRO[servico].map((p): Passo => {
    if (p.tipo === 'manual') return { ...p, feito: s.marcados.includes(p.id) };
    if (p.id === 'chave') return { ...p, feito: s.conferida };
    if (p.id === 'modelo') return { ...p, feito: !!s.modelo.trim() };
    // limite, no OpenRouter: a API diz se a chave tem limite
    if (!s.conferida) return { ...p, feito: false };
    if (s.limite === null) return { ...p, feito: false, nota: 'A chave está sem limite de gasto: crie outra com "Credit limit" para não gastar além do previsto.' };
    return { ...p, feito: typeof s.limite === 'number', ...(typeof s.limite === 'number' ? { nota: `Limite de US$ ${s.limite.toFixed(2)}.` } : {}) };
  });
}

/** A chave colada é de outro serviço, ou não há chave: o aviso; senão null. */
export function formatoDaChave(servico: ServicoIa, chave: string): string | null {
  const c = chave.trim();
  if (!c) return 'Cole a chave do serviço.';
  if (servico === 'openrouter' && c.startsWith('sk-ant-')) return 'Esta chave é da Anthropic: escolha a coluna Anthropic, ou cole a chave do OpenRouter (sk-or-…).';
  if (servico === 'anthropic' && c.startsWith('sk-or-')) return 'Esta chave é do OpenRouter: escolha a coluna OpenRouter, ou cole a chave da Anthropic (sk-ant-…).';
  return null;
}

/**
 * A configuração do agente com o serviço, a chave e o modelo novos; o resto (privacidade, instruções, limites, ajustes
 * do modelo) fica como estava. Trocou de serviço, o modelo auxiliar sai: era um id do serviço antigo (o painel trata
 * serviço e modelos como um conjunto, ver agente-ia/src/painel/espelho.ts, configDoSync).
 */
export function mesclarConfig(atual: Record<string, unknown> | undefined, o: { servico: ServicoIa; chave: string; modelo: string }): Record<string, unknown> {
  const nova: Record<string, unknown> = { ...(atual ?? {}), servico: o.servico, url: '', chave: o.chave.trim(), modelo: o.modelo.trim() };
  if (atual && atual.servico !== o.servico) nova.modeloAuxiliar = '';
  return nova;
}

/** Impressão não reversível da chave (8 hex do SHA-256): o resumo percebe a chave trocada sem guardar a chave. */
export async function impressaoDaChave(chave: string): Promise<string> {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(chave.trim()));
  return [...new Uint8Array(h).slice(0, 4)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/** O que o selo pode saber (gelic_ia_estado): nada de chave. */
export interface ResumoIa { servico: string; modelo: string; testada: boolean; limite?: number | null; usado?: number; impressao?: string; em: string }

export function resumoDoEstado(o: { servico: string; modelo: string; testada: boolean; limite?: number | null; usado?: number; impressao?: string; em: Date }): ResumoIa {
  return {
    servico: o.servico, modelo: o.modelo, testada: o.testada,
    ...(o.limite !== undefined ? { limite: o.limite } : {}),
    ...(typeof o.usado === 'number' ? { usado: o.usado } : {}),
    ...(o.impressao ? { impressao: o.impressao } : {}),
    em: o.em.toISOString(),
  };
}

const nomeDe = (s: string) => (Object.hasOwn(NOMES_DO_PAINEL, s) ? NOMES_DO_PAINEL[s] : s);
const dataBr = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

/** A linha do selo do CFC. */
export function textoDoSelo(r: ResumoIa | null): string {
  if (!r || typeof r !== 'object' || !r.servico) return 'IA (opcional): não configurada neste navegador';
  const data = r.testada ? dataBr(r.em) : '';
  const partes = [`IA (opcional): ${nomeDe(r.servico)}`, data ? `testada em ${data}` : 'ainda não testada'];
  if (r.limite === null) partes.push('sem limite de gasto');
  else if (typeof r.limite === 'number') partes.push(`limite US$ ${r.limite.toFixed(2)}${typeof r.usado === 'number' ? ` (usado US$ ${r.usado.toFixed(2)})` : ''}`);
  return partes.join(', ');
}

/**
 * O resumo a partir da configuração do agente, para as janelas manterem o selo em dia mesmo quando a chave foi posta
 * pelo painel: mesmo serviço, modelo e chave (pela impressão), fica o resumo que já havia (com o "testada" e o limite);
 * mudou qualquer um, vira "ainda não testada" e perde o limite; sem chave, nenhum. Nunca leva a chave.
 */
export async function resumoDaConfig(cfg: Record<string, unknown> | undefined, atual: ResumoIa | null, agora: Date): Promise<ResumoIa | null> {
  const chave = typeof cfg?.chave === 'string' ? cfg.chave.trim() : '';
  if (!cfg || !chave) return null;
  const servico = typeof cfg.servico === 'string' && cfg.servico ? cfg.servico : 'openrouter';
  const modelo = typeof cfg.modelo === 'string' ? cfg.modelo : '';
  const impressao = await impressaoDaChave(chave);
  if (atual && atual.servico === servico && atual.modelo === modelo && atual.impressao === impressao) return atual;
  return resumoDoEstado({ servico, modelo, testada: false, impressao, em: agora });
}
