import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { versaoGelic } from '../src/empacotamento/manifesto';
import { ancoraDaVersao, CHAVE_SITE, PAGINAS, paginaDoPerfil, SITE, urlNovidades } from '../src/site';
import { teste } from './util';

const SITE_DIR = new URL('../site/', import.meta.url);
const ler = (rel: string) => readFileSync(new URL(rel, SITE_DIR), 'utf8');
/** Todos os arquivos de texto do site (md, yml, txt), com o caminho relativo. */
function textos(dir = SITE_DIR, rel = ''): { rel: string; texto: string }[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? textos(new URL(`${e.name}/`, dir), `${rel}${e.name}/`)
      : /\.(md|ya?ml|txt)$/.test(e.name) ? [{ rel: `${rel}${e.name}`, texto: readFileSync(new URL(e.name, dir), 'utf8') }] : []);
}

export async function verificarSite(): Promise<void> {
  await teste('site: endereço único, página de cada perfil e link de novidades com a âncora da versão', () => {
    assert.equal(SITE, 'https://sei-cfc.github.io');
    assert.equal(CHAVE_SITE, 'gelic_site');
    assert.equal(paginaDoPerfil('gelic'), 'https://sei-cfc.github.io/sei-cfc-gelic/');
    assert.equal(paginaDoPerfil('cfc'), 'https://sei-cfc.github.io/sei-cfc/');
    assert.equal(ancoraDaVersao('2.9.0.18'), 'v2-9-0-18');
    assert.equal(urlNovidades('2.9.0.18'), 'https://sei-cfc.github.io/novidades/#v2-9-0-18');
  });

  await teste('site: a versão atual tem entrada em Novidades, com a âncora do link do selo', () => {
    const upstream = JSON.parse(readFileSync(new URL('../../dist/manifest.json', import.meta.url), 'utf8')).version as string;
    const { revisao } = JSON.parse(readFileSync(new URL('../versao.json', import.meta.url), 'utf8')) as { revisao: number };
    const versao = versaoGelic(upstream, revisao);
    assert.ok(ler('docs/novidades.md').includes(`{#${ancoraDaVersao(versao)}}`), `falta a entrada da ${versao} em gelic/site/docs/novidades.md`);
  });

  await teste('site: nada interno nos textos (número de processo, CPF, CNPJ, e-mail)', () => {
    const proibidos: [string, RegExp][] = [
      ['número de processo', /\b\d{5}\.\d{6}\/\d{4}-\d{2}\b|\b\d{14}\.\d{6}\/\d{4}-\d{2}\b/],
      ['CPF', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/],
      ['CNPJ', /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/],
      ['e-mail', /[\w.+-]+@[\w-]+\.[\w.]+/],
    ];
    const achados = textos().flatMap(({ rel, texto }) => proibidos.filter(([, re]) => re.test(texto)).map(([nome]) => `${rel}: ${nome}`));
    assert.deepEqual(achados, []);
  });

  await teste('site: toda página está na navegação, e as páginas que a extensão abre existem', () => {
    const nav = new Set([...ler('mkdocs.yml').matchAll(/^\s*-\s*[^:\n]+:\s*([\w-]+\.md)\s*$/gm)].map(m => m[1]));
    const paginas = readdirSync(new URL('docs/', SITE_DIR)).filter(f => f.endsWith('.md'));
    assert.deepEqual([...nav].sort(), paginas.sort());
    for (const p of [...Object.values(PAGINAS), 'novidades']) assert.ok(existsSync(new URL(`docs/${p}.md`, SITE_DIR)), `falta docs/${p}.md`);
  });
}
