/**
 * Contexto da janela do formulário das peças (js/gelic/peca.html): o mesmo `ContextoTool` que o motor do agente dá
 * às ferramentas, montado fora do painel.
 *  - `sei(op)`: pela ponte do agente (agente-ia/src/ponte/cliente.ts), fixada na aba do SEI do processo. A aba
 *    atende uma página da extensão por vez: com a janela aberta, o painel fica sem SEI e reconecta (até 60 s) quando
 *    ela fecha.
 *  - `completar`: uma chamada ao serviço de IA configurado no agente (agenteIA_config), sem ferramentas, com a
 *    pseudonimização do núcleo na ida e na volta, como o gancho G3 faz no painel. A chave só é lida aqui, numa
 *    página da extensão, nunca na página do SEI.
 */
import { criarProvedor, type Ajustes, type Servico } from '../../../agente-ia/src/motor/provedor';
import type { ContextoTool } from '../../../agente-ia/src/motor/tools';
import type { Uso } from '../../../agente-ia/src/motor/tipos';
import { Pseudonimos } from '../../../sei-nucleo/src/privacidade/anonimizar';

export interface PonteMinima {
  lista(): { id: number; titulo: string; papel: string }[];
  fixar(id: number | null): void;
  executar(op: string, a: Record<string, unknown>, s?: AbortSignal): Promise<unknown>;
}

/** Fixa a aba do SEI cujo título é "SEI - <protocolo>" (igual, nunca parecido); null se não houver. */
export function escolherAba(ponte: PonteMinima, protocolo: string): number | null {
  const alvo = protocolo.trim();
  const aba = ponte.lista().find(a => a.papel === 'sei' && a.titulo.replace(/^SEI\s*-\s*/, '').trim() === alvo);
  if (!aba) return null;
  ponte.fixar(aba.id);
  return aba.id;
}

export interface OpcoesContexto {
  protocolo: string;
  ponte: PonteMinima;
  completar?: (sistema: string, pedido: string, s: AbortSignal) => Promise<string>;
  privacidade?: Pseudonimos;
  /** Pergunta ao usuário (documento restrito vai ao modelo?). */
  confirmar: (texto: string) => Promise<boolean>;
  sinal: AbortSignal;
}

export function contextoDaJanela(o: OpcoesContexto): ContextoTool {
  const ctx = {
    sinal: o.sinal,
    sei: <T>(op: string, a?: Record<string, unknown>) => o.ponte.executar(op, a ?? {}, o.sinal) as Promise<T>,
    estado: { consentimentoRestrito: null, anexos: [] },
    consentirRestrito: (detalhe: string) => o.confirmar(`Enviar ao serviço de IA o conteúdo restrito? ${detalhe}`),
    consentirConector: async () => false,
    anonimizar: (t: string) => (o.privacidade ? o.privacidade.anonimizar(t) : t),
    nonce: crypto.randomUUID(),
    registrarAchados: () => undefined,
    pessoasVistas: (nomes: string[]) => o.privacidade?.registrarPessoas(nomes),
    ui: {},
    ...(o.completar ? { completar: o.completar } : {}),
  };
  return ctx as unknown as ContextoTool;
}

export interface IaDaJanela {
  completar(sistema: string, pedido: string, s: AbortSignal): Promise<string>;
  privacidade: Pseudonimos;
  /** Gasto somado das chamadas desta janela. */
  uso(): Uso;
}
interface ConfigAgente { servico?: Servico; url?: string; chave?: string; modelo?: string; ajustes?: Ajustes; cache?: boolean; nomes?: boolean; cnpj?: boolean }

/** A IA configurada no agente (agenteIA_config); undefined sem chave. */
export async function completarDaConfig(ler: () => Promise<Record<string, unknown> | undefined>, criar = criarProvedor): Promise<IaDaJanela | undefined> {
  const cfg = ((await ler()) ?? {}) as ConfigAgente;
  if (!cfg.chave?.trim()) return undefined;
  const provedor = criar({ servico: cfg.servico, url: cfg.url, chave: cfg.chave, modelo: cfg.modelo, ajustes: cfg.ajustes, cache: cfg.cache });
  const privacidade = new Pseudonimos({ nomes: cfg.nomes, cnpj: cfg.cnpj });
  let total: Uso = { entrada: 0, saida: 0, custo: 0 };
  return {
    privacidade,
    uso: () => ({ ...total }),
    async completar(sistema, pedido, sinal) {
      const r = await provedor.conversar({ mensagens: [{ role: 'system', content: privacidade.anonimizar(sistema) }, { role: 'user', content: privacidade.anonimizar(pedido) }], tools: [] }, sinal, () => undefined);
      if (r.uso) total = { entrada: total.entrada + r.uso.entrada, saida: total.saida + r.uso.saida, custo: total.custo + r.uso.custo };
      return privacidade.reidratar(r.texto);
    },
  };
}

/** Lê agenteIA_config do chrome.storage.local (só em página da extensão). */
export const lerConfigAgente = async (): Promise<Record<string, unknown> | undefined> =>
  ((await globalThis.chrome?.storage?.local?.get('agenteIA_config'))?.agenteIA_config as Record<string, unknown> | undefined);
