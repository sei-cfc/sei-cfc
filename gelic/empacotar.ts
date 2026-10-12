/**
 * Monta a extensão de um perfil (src/perfil.ts) em build/sei-pro-<perfil>/:
 * cópia do dist/ (SEI Pro do upstream, com os ganchos Gelic já compilados)
 * + bundle da Gelic (o mesmo nos dois perfis) + ícones do perfil + manifest derivado
 * (src/empacotamento/manifesto.ts). Nunca escreve no dist/.
 *
 *   npx tsx empacotar.ts                      SEI CFC Gelic em build/sei-pro-gelic/ (carregar sem empacotar)
 *   npx tsx empacotar.ts --perfil cfc         SEI CFC em build/sei-pro-cfc/
 *   npx tsx empacotar.ts [--perfil p] --zip   também gera build/sei-pro-<perfil>-<versão>.zip
 */
import { execFileSync } from 'node:child_process';
import { cp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { manifestoGelic, pastaDoPacote, PERFIS_MANIFESTO, SCRIPT, TAMANHOS, type Manifesto } from './src/empacotamento/manifesto';
import { PERFIS, type Perfil } from './src/perfil';

const i = process.argv.indexOf('--perfil');
const perfil = (i >= 0 ? process.argv[i + 1] : 'gelic') as Perfil;
if (!PERFIS.includes(perfil)) throw new Error(`--perfil ${perfil ?? ''}: use ${PERFIS.join(' ou ')}.`);
const { nome: NOME_PERFIL, logoSelo } = PERFIS_MANIFESTO[perfil];

const caminho = (rel: string) => fileURLToPath(new URL(rel, import.meta.url));
const DIST = caminho('../dist');
const BUILD = caminho('../build');
const PASTA = pastaDoPacote(perfil);
const SAIDA = caminho(`../build/${PASTA}`);
const BUNDLE = caminho('saida/js/gelic');
// Gelic: icones/ (desenhar.py + rasterizar.mjs); CFC: icones/cfc/ (cfc.py).
const ICONES = caminho(perfil === 'gelic' ? 'icones' : `icones/${perfil}`);
const LOGO = logoSelo.split('/').pop()!;

const existe = (p: string) => stat(p).then(() => true, () => false);

if (!(await existe(caminho(`saida/${SCRIPT}`)))) throw new Error('Bundle da Gelic ausente: rode "npm run build" em gelic/.');
const { revisao } = JSON.parse(await readFile(caminho('versao.json'), 'utf8')) as { revisao: number };
const upstream = JSON.parse(await readFile(`${DIST}/manifest.json`, 'utf8')) as Manifesto;
const manifesto = manifestoGelic(upstream, revisao, perfil);

// Os ícones do perfil vão em icons/<perfil>/: se o upstream um dia tiver a mesma pasta (whitelabel), não sobrescreve.
if (await existe(`${DIST}/icons/${perfil}`)) throw new Error(`dist/icons/${perfil}/ já existe no upstream: escolha outra pasta de ícones para o perfil ${perfil}.`);
await rm(SAIDA, { recursive: true, force: true });
// manifest_*.json são manifests de whitelabel locais do upstream (fora do git): não vão no pacote.
await cp(DIST, SAIDA, { recursive: true, filter: origem => !/[\\/]manifest_[^\\/]*\.json$/.test(origem) });
await cp(BUNDLE, `${SAIDA}/js/gelic`, { recursive: true });
// AGPL-3.0 (a do SEI Pro): o texto da licença vai com a extensão distribuída.
await cp(caminho('../LICENSE.txt'), `${SAIDA}/LICENSE.txt`);
await cp(ICONES, `${SAIDA}/icons/${perfil}`, { recursive: true, filter: origem => origem === ICONES || /[\\/]icon-\d+\.png$/.test(origem) || origem.endsWith(`/${LOGO}`) });
const gerarIcones = perfil === 'gelic' ? 'python3 gelic/icones/desenhar.py && node gelic/icones/rasterizar.mjs' : 'python3 gelic/icones/cfc.py';
for (const t of TAMANHOS) if (!(await existe(`${SAIDA}/icons/${perfil}/icon-${t}.png`))) throw new Error(`Ícone icon-${t}.png ausente em ${ICONES} (rode ${gerarIcones}).`);
await writeFile(`${SAIDA}/manifest.json`, `${JSON.stringify(manifesto, null, 2)}\n`);

// Todo arquivo que o manifest cita tem de estar no pacote (o Chrome recusa a extensão inteira se faltar um).
const citados = [
  ...Object.values(manifesto.icons ?? {}),
  ...(manifesto.content_scripts ?? []).flatMap(c => [...(c.js ?? []), ...(c.css ?? [])]),
  ...(manifesto.web_accessible_resources ?? []).flatMap(r => r.resources).filter(r => !r.includes('*')),
  ...[(manifesto.background as { service_worker?: string } | undefined)?.service_worker,
    (manifesto.side_panel as { default_path?: string } | undefined)?.default_path,
    manifesto.options_page as string | undefined].filter((c): c is string => !!c),
];
const faltando = [];
for (const c of new Set(citados)) if (!(await existe(`${SAIDA}/${c}`))) faltando.push(c);
if (faltando.length) throw new Error(`O manifest cita arquivos que não estão no pacote:\n  ${faltando.join('\n  ')}`);

console.log(`${NOME_PERFIL} ${manifesto.version} (${manifesto.version_name}) montado em build/${PASTA}/`);
console.log(`  arquivos: ${(await readdir(SAIDA, { recursive: true })).length}`);

if (process.argv.includes('--zip')) {
  const zip = `${BUILD}/${PASTA}-${manifesto.version}.zip`;
  await rm(zip, { force: true });
  execFileSync('zip', ['-qr', zip, '.'], { cwd: SAIDA });
  console.log(`  zip: build/${PASTA}-${manifesto.version}.zip`);
}
