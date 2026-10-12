/**
 * "Iniciar processo" na ficha do item do PCA (pca.sistemascfc.org, telas DSGov e Tabler), só no SEI CFC. O botão
 * não grava nada no PCA nem no SEI: guarda o pedido (src/iniciar/pendente.ts) e abre o SEI, onde o Controle de
 * Processos abre o diálogo travado no item. Desenho: docs/gelic/2026-10-11-iniciar-pelo-pca-design.md.
 */
import type { Area } from '../peca/guardados';
import { guardarPendente, type PedidoPca } from '../iniciar/pendente';

export const ID_BOTAO_PCA = 'gelic-pca-iniciar';
export const URL_SEI = 'https://sei.cfc.org.br/sei/';

const inteiro = (s: string | null) => (s && /^\d+$/.test(s) && Number(s) > 0 ? Number(s) : null);

/** A ficha do item: o cabeçalho com data-item-pca e data-exercicio (postos pelo PCA para a extensão). */
export function fichaDoItem(doc: Document): (PedidoPca & { cabecalho: Element }) | null {
  const cabecalho = doc.querySelector('[data-item-pca][data-exercicio]');
  if (!cabecalho) return null;
  const item_pca = inteiro(cabecalho.getAttribute('data-item-pca'));
  const exercicio = inteiro(cabecalho.getAttribute('data-exercicio'));
  return item_pca && exercicio ? { item_pca, exercicio, cabecalho } : null;
}

/** Põe o botão ao lado de "Editar" (ou no fim do cabeçalho). Montar de novo troca o botão, nunca duplica. */
export function montarBotaoPca(doc: Document, aoClicar: (p: PedidoPca) => void): HTMLElement | null {
  doc.getElementById(ID_BOTAO_PCA)?.remove();
  const ficha = fichaDoItem(doc);
  if (!ficha) return null;
  const b = doc.createElement('button');
  b.type = 'button';
  b.id = ID_BOTAO_PCA;
  // as classes de botão secundário das duas telas do PCA (Tabler e DSGov) + a nossa
  b.className = 'gelic-pca-iniciar btn br-button secondary';
  b.setAttribute('data-gelic-acao', 'iniciar-processo');
  b.title = 'Abre o SEI com o "Iniciar processo" deste item (você confere antes de criar)';
  b.textContent = 'Iniciar processo';
  b.addEventListener('click', () => aoClicar({ item_pca: ficha.item_pca, exercicio: ficha.exercicio }));
  const editar = ficha.cabecalho.querySelector('a[href$="/editar/"], a[href*="/editar"]');
  if (editar?.parentElement) editar.parentElement.insertBefore(b, editar);
  else ficha.cabecalho.append(b);
  return b;
}

export interface DepsClique {
  area: Area | null;
  configurado: () => Promise<boolean>;
  abrirConfig: () => void;
  abrirSei: (url: string) => void;
  avisar: (texto: string) => void;
  agora: () => number;
}

/** O clique: sem o PCA configurado, a configuração; com ele, guarda o pedido e abre o SEI numa aba nova. */
export async function clicarIniciar(p: PedidoPca, deps: DepsClique): Promise<void> {
  if (!deps.area) return deps.avisar('A extensão foi atualizada: recarregue esta página do PCA (F5) e clique de novo.');
  if (!(await deps.configurado())) return deps.abrirConfig();
  await guardarPendente(deps.area, p, deps.agora());
  deps.abrirSei(URL_SEI);
}
