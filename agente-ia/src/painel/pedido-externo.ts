/**
 * Pedido pronto para o agente, vindo de um botão na página do SEI.
 *
 * O content script manda `{ tipo: "abrirAgente", pedido }` ao background, que abre o painel
 * (o gesto do clique é exigido pelo sidePanel.open) e grava o pedido no storage.session como
 * `{ texto, janela, t }`. O painel consome: ao abrir, se o pedido já está lá; aberto, pelo
 * onChanged. Mesmo cuidado do `painelAba` (sei-comum/src/painel/shell.ts): o storage.session é
 * um só para todas as janelas, então só o painel da janela de quem pediu consome.
 *
 * Consumir = apagar a chave e entregar o texto. Pedido velho (o painel demorou ou não abriu)
 * é descartado, para um clique de ontem não virar mensagem hoje.
 *
 * Gancho Gelic G1 (docs/gelic/GANCHOS.md), escrito genérico para poder subir ao upstream.
 */

export const CHAVE_PEDIDO = "agenteIA_pedido";
export const VALIDADE_PEDIDO_MS = 2 * 60_000;
const LIMITE_TEXTO = 4000;

/** Texto do pedido, se for válido para este painel agora; null se não for. */
export function pedidoValido(v: unknown, minhaJanela: number | null, agora: number): string | null {
  if (!v || typeof v !== "object") return null;
  const p = v as { texto?: unknown; janela?: unknown; t?: unknown };
  if (typeof p.texto !== "string" || !p.texto.trim()) return null;
  if (typeof p.t !== "number" || agora - p.t > VALIDADE_PEDIDO_MS || p.t - agora > 5_000) return null;
  const janela = typeof p.janela === "number" ? p.janela : null;
  if (janela !== null && minhaJanela !== null && janela !== minhaJanela) return null;
  return p.texto.trim().slice(0, LIMITE_TEXTO);
}

interface Deps {
  sessao: Pick<chrome.storage.SessionStorageArea, "get" | "remove"> & { onChanged: chrome.storage.SessionStorageArea["onChanged"] };
  janela: () => Promise<number | null>;
  agora?: () => number;
}

function depsPadrao(): Deps | null {
  const sessao = globalThis.chrome?.storage?.session;
  if (!sessao) return null;
  return {
    sessao,
    janela: async () => (await chrome.windows?.getCurrent?.().catch(() => null))?.id ?? null,
  };
}

/** Entrega cada pedido externo a `receber`, uma vez. Sem storage.session (navegador antigo), não faz nada. */
export function ouvirPedidosExternos(receber: (texto: string) => void, deps: Deps | null = depsPadrao()): void {
  if (!deps) return;
  const agora = deps.agora ?? Date.now;
  let consumindo = false;
  const consumir = async () => {
    if (consumindo) return;
    consumindo = true;
    try {
      const v = (await deps.sessao.get(CHAVE_PEDIDO))[CHAVE_PEDIDO];
      const texto = pedidoValido(v, await deps.janela(), agora());
      if (v !== undefined && texto === null) {
        // Velho ou malformado: apaga. De outra janela: deixa para o painel dela.
        const janela = (v as { janela?: unknown } | null)?.janela;
        const minha = await deps.janela();
        if (typeof janela !== "number" || minha === null || janela === minha) await deps.sessao.remove(CHAVE_PEDIDO);
        return;
      }
      if (texto === null) return;
      await deps.sessao.remove(CHAVE_PEDIDO);
      receber(texto);
    } catch {
      /* sem sessão legível: o pedido só não chega */
    } finally {
      consumindo = false;
    }
  };
  deps.sessao.onChanged.addListener((mud) => {
    if (mud[CHAVE_PEDIDO]?.newValue !== undefined) void consumir();
  });
  void consumir();
}
