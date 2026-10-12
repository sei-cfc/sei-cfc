/**
 * Content script do SEI CFC nas telas do PCA (só https://pca.sistemascfc.org/*, manifest gerado): o botão
 * "Iniciar processo" na ficha do item. Bundle: saida/js/gelic/pca_site.js (gelic/build.mjs).
 */
import { areaLocal, lerConfigPca } from '../pca/config';
import { abrirConfigPca } from '../pca/selo';
import { clicarIniciar, montarBotaoPca } from './botao';

montarBotaoPca(document, p => {
  const area = globalThis.chrome?.runtime?.id ? areaLocal() : null;
  void clicarIniciar(p, {
    area,
    configurado: async () => !!(await lerConfigPca(area)),
    abrirConfig: abrirConfigPca,
    abrirSei: url => window.open(url, '_blank'),
    avisar: t => window.alert(t),
    agora: Date.now,
  });
});
