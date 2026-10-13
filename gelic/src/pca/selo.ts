/**
 * A linha do PCA no selo (`.gelic-pca`), desenhada depois da etapa, sem atrasar o selo. Sem configuração, só o
 * botão "Ligar ao PCA" no detalhe do selo (com configuração, "Configurar o PCA"). Só nós de texto.
 */
import { ID } from '../pagina/selo';
import { linhaDoPca, type EstadoPca } from './contrato';

export const URL_CONFIG_PCA = 'js/gelic/pca.html';

/** Abre a configuração do PCA numa aba (página da extensão); extensão recarregada avisa. */
export function abrirConfigPca(): void {
  try {
    const rt = globalThis.chrome?.runtime;
    if (!rt?.id) throw new Error('sem runtime');
    window.open(rt.getURL(URL_CONFIG_PCA), 'gelic-pca');
  } catch {
    window.alert('A extensão foi atualizada: recarregue esta página do SEI (F5) e clique de novo.');
  }
}

export function desenharPca(doc: Document, estado: EstadoPca, abrirConfig: () => void = abrirConfigPca): HTMLElement | null {
  const raiz = doc.getElementById(ID);
  if (!raiz) return null;
  raiz.querySelector('.gelic-pca')?.remove();
  raiz.querySelectorAll('[data-gelic-pca-config]').forEach(b => b.remove());
  const texto = linhaDoPca(estado);
  const botao = (rotulo: string) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.className = 'gelic-pca-config';
    b.setAttribute('data-gelic-pca-config', '');
    b.textContent = rotulo;
    b.addEventListener('click', abrirConfig);
    return b;
  };
  // No detalhe, sempre: ligar (sem configuração) ou trocar o token (com). Não ocupa a linha de quem não usa o PCA.
  raiz.querySelector('.gelic-detalhe')?.append(botao(texto ? 'Configurar o PCA…' : 'Ligar ao PCA…'));
  if (!texto) return null;
  const linha = doc.createElement('div');
  linha.className = 'gelic-pca';
  linha.setAttribute('role', 'status');
  linha.setAttribute('data-gelic-pca', estado.tipo);
  // o check à vista: ✓ com item do PCA vinculado ao nº do processo, ✗ sem (pedido do usuário, 2026-10-13)
  if (estado.tipo === 'item' || estado.tipo === 'sem_vinculo') {
    const vinculado = estado.tipo === 'item';
    linha.setAttribute('data-gelic-vinculo', vinculado ? 'sim' : 'nao');
    const marca = doc.createElement('span');
    marca.className = 'gelic-pca-marca';
    marca.setAttribute('aria-hidden', 'true');
    marca.textContent = vinculado ? '✓' : '✗';
    linha.title = vinculado ? 'O número deste processo está vinculado a um item do PCA.' : 'O número deste processo não está vinculado a nenhum item do PCA.';
    linha.append(marca, ' ');
  }
  linha.append(doc.createTextNode(texto));
  if (estado.tipo === 'erro' || (estado.tipo === 'item' && typeof estado.envio === 'object' && 'erro' in estado.envio)) linha.append(' ', botao('Configurar'));
  if (estado.tipo === 'item' && typeof estado.envio === 'object' && 'pendencias' in estado.envio && estado.envio.pendencias.length) {
    linha.title = estado.envio.pendencias.map(p => p.texto).join('\n');
  }
  raiz.querySelector('.gelic-detalhe')?.before(linha);
  return linha;
}
