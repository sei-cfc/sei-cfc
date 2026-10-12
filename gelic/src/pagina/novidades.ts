/**
 * Aviso discreto de novidades no selo (desenho docs/gelic/2026-10-12-site-documentacao-design.md, seção 3). Enquanto a
 * versão instalada não foi vista, aparece uma linha "Novidades da versão X" logo abaixo do cabeçalho. O clique abre a
 * entrada da versão no site, numa aba nova, e grava a versão como vista. O detalhe ganha o link "Ajuda", para a página do
 * perfil. Desenhado depois do selo, como a linha do PCA: redesenhar não duplica.
 */
import type { Area } from '../controle/cache';
import type { Perfil } from '../perfil';
import { paginaDoPerfil, urlNovidades } from '../site';
import { ID } from './selo';

export const CHAVE_VISTA = 'gelic_novidades_vista';

function link(doc: Document, classe: string, href: string, texto: string): HTMLAnchorElement {
  const a = doc.createElement('a');
  a.className = classe;
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = texto;
  return a;
}

export function desenharNovidades(doc: Document, e: { versao: string; vista: string | null; perfil: Perfil }, aoVer: () => void): void {
  const raiz = doc.getElementById(ID);
  if (!raiz) return;
  raiz.querySelector('.gelic-novidades')?.remove();
  raiz.querySelector('[data-gelic-ajuda]')?.remove();
  const ajuda = link(doc, 'gelic-ajuda', paginaDoPerfil(e.perfil), 'Ajuda');
  ajuda.setAttribute('data-gelic-ajuda', '');
  raiz.querySelector('.gelic-detalhe')?.append(ajuda);
  if (e.vista === e.versao) return;
  const linha = doc.createElement('div');
  linha.className = 'gelic-novidades';
  const a = link(doc, 'gelic-novidades-link', urlNovidades(e.versao), `Novidades da versão ${e.versao}`);
  // Esconde (não remove): o link ainda precisa abrir a aba depois deste clique.
  a.addEventListener('click', () => { linha.hidden = true; aoVer(); });
  linha.append(a);
  const cab = raiz.querySelector('.gelic-cab');
  if (cab) cab.after(linha);
  else raiz.prepend(linha);
}

/** Lê a versão do manifest e a vista no storage.local. Sem runtime (extensão recarregada) ou sem storage, não desenha nada. */
export async function ligarNovidades(doc: Document, perfil: Perfil, deps: { versao?: () => string | undefined; area?: Area | null } = {}): Promise<void> {
  const versao = (deps.versao ?? (() => globalThis.chrome?.runtime?.getManifest?.().version))();
  const area = deps.area === undefined ? (globalThis.chrome?.storage?.local ?? null) : deps.area;
  if (!versao || !area) return;
  let vista: string | null = null;
  try {
    const v = (await area.get(CHAVE_VISTA))[CHAVE_VISTA];
    vista = typeof v === 'string' ? v : null;
  } catch {
    /* sem leitura: avisa (no pior caso, uma vez a mais) */
  }
  desenharNovidades(doc, { versao, vista, perfil }, () => {
    void area.set({ [CHAVE_VISTA]: versao }).catch(() => { /* a página seguinte avisa de novo; sem erro */ });
  });
}
