/**
 * A árvore do processo aberto, lida no próprio quadro da árvore (`procedimento_visualizar`).
 *
 * Sem pastas, a página já tem todos os nós (`infraArvoreNo`) e nada sai pela rede. Com pastas,
 * os documentos das pastas fechadas não estão na página: o `abrirArvore` do núcleo pede a mesma
 * árvore com `abrir_pastas=1` (link assinado colhido da página, nunca montado), pela sessão do
 * usuário.
 */
import { abrirArvore, lerArvore, type Arvore } from '../../../sei-nucleo/src/dominio/arvore';
import { criarHttp } from '../../../sei-nucleo/src/sessao/http';

export async function lerArvoreDaPagina(doc: Document, url: string): Promise<Arvore> {
  const html = doc.documentElement.outerHTML;
  if (!/infraArvoreNo\("PASTA"/.test(html)) return lerArvore({ url, status: 200, html, doc });
  return abrirArvore(criarHttp(url), url);
}

/** Títulos que entram na regra: documentos não cancelados, na ordem da árvore. */
export function documentosDaRegra(arvore: Arvore): { titulo: string; numero: string }[] {
  return arvore.documentos.filter(d => !d.cancelado).map(d => ({ titulo: d.titulo, numero: d.numero }));
}
