import { build } from 'esbuild';
import { copyFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
// A Gelic nunca escreve no dist/ (que é do upstream): os bundles saem em gelic/saida/
// e o empacotar.ts os junta ao dist/ copiado em build/sei-pro-<perfil>/.
const caminho = rel => fileURLToPath(new URL(rel, import.meta.url));
const comum = { bundle: true, minify: true, format: 'iife', target: ['chrome116', 'firefox115'], charset: 'ascii', legalComments: 'none', loader: { '.css': 'text' }, banner: { js: '/* GERADO por gelic/build.mjs. NAO EDITE. Rode: npm run build */' } };
const saidas = [
  // content script: selo na árvore e etapas no Controle de Processos
  { entrada: 'src/pagina/main.ts', saida: 'saida/js/gelic/init_gelic.js', ascii: true },
  // janela do formulário das peças do CFC (página da extensão, como o painel do agente: o esbuild não escapa
  // todo caractere de regex, e a página aceita UTF-8 válido)
  { entrada: 'src/peca/main.ts', saida: 'saida/js/gelic/peca.js', ascii: false },
  // janela da verificação prévia do CFC (página da extensão, como a das peças)
  { entrada: 'src/verificacao/main.ts', saida: 'saida/js/gelic/verificar.js', ascii: false },
  // página "Configurar a IA" do CFC (página da extensão)
  { entrada: 'src/ia/main.ts', saida: 'saida/js/gelic/configurar-ia.js', ascii: false },
  // configuração do PCA (página da extensão, nos dois perfis)
  { entrada: 'src/pca/main.ts', saida: 'saida/js/gelic/pca.js', ascii: false },
  // content script do SEI CFC nas telas do PCA: o botão "Iniciar processo" na ficha do item
  { entrada: 'src/pca-site/main.ts', saida: 'saida/js/gelic/pca_site.js', ascii: true },
];
for (const { entrada, saida, ascii } of saidas) {
  const outfile = caminho(saida);
  await build({ ...comum, entryPoints: [caminho(entrada)], outfile });
  const bytes = await readFile(outfile);
  if (ascii && bytes.some(byte => byte > 127)) throw new Error(`Bundle contém bytes não ASCII: ${saida}`);
  new TextDecoder('utf-8', { fatal: true }).decode(bytes); // lança se não for UTF-8 válido
}
for (const f of ['peca.html', 'peca.css']) await copyFile(caminho(`src/peca/${f}`), caminho(`saida/js/gelic/${f}`));
await copyFile(caminho('src/pca/pca.html'), caminho('saida/js/gelic/pca.html'));
await copyFile(caminho('src/verificacao/verificar.html'), caminho('saida/js/gelic/verificar.html'));
await copyFile(caminho('src/ia/configurar-ia.html'), caminho('saida/js/gelic/configurar-ia.html'));
console.log('Gelic: bundles gerados em gelic/saida/.');
