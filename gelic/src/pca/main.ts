/**
 * Entrada da página de configuração do PCA (js/gelic/pca.html), aberta pelo selo. Página da extensão: o fetch sai
 * com a origem chrome-extension://, que o CORS do PCA aceita.
 */
import { areaLocal } from './config';
import { criarClientePca } from './cliente';
import { montarPaginaPca } from './pagina';

const area = areaLocal();
if (!area) {
  document.getElementById('gelic-peca')!.textContent = 'Abra esta página pela extensão (selo do processo no SEI).';
} else {
  void montarPaginaPca(document, { area, testar: c => criarClientePca(c, (u, i) => fetch(u, i)).saude() });
}
