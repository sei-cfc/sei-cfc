import assert from 'node:assert/strict';
import { entradaDoUpstream, incluirEntrada, versoesDoHistorico } from '../src/novidades-upstream';
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
  const HIST = `# Histórico\n\n## ![x](../img/i.png) Histórico de versões\n\n### Versão 3.2.3\n13/10/2026\n\nAjuste no [Novo Controle](../pages/GRADE.md) (*Lab*).\n\n- **Item A.** ![gif](../img/a.gif) texto.\n\n### Versão 3.2.2\n12/10/2026\n\nGrade só abre no clique.\n\n### Versão 3.2.1\n12/10/2026\n\nSegurança.\n`;
  await teste('novidades do upstream: as versões novas do histórico do SEI Pro, da mais nova para a base anterior (exclusive)', () => {
    assert.deepEqual(versoesDoHistorico(HIST, '3.2.1').map(v => v.versao), ['3.2.3', '3.2.2']);
    assert.deepEqual(versoesDoHistorico(HIST, '3.2.2').map(v => v.versao), ['3.2.3']);
    assert.deepEqual(versoesDoHistorico(HIST, '3.2.3'), []);
  });
  await teste('novidades do upstream: entrada com a âncora da versão, sem links nem imagens do upstream (o site é estrito) e sem a data solta', () => {
    const e = entradaDoUpstream(HIST, '3.2.1', '3.2.3', '3.2.3.23', '13/10/2026');
    assert.match(e, /^## 3\.2\.3\.23 — 13\/10\/2026 \{#v3-2-3-23\}\n/);
    assert.match(e, /Base atualizada para o \*\*SEI Pro 3\.2\.3\*\*/);
    assert.match(e, /\*\*SEI Pro 3\.2\.3\*\*\n\nAjuste no Novo Controle \(\*Lab\*\)\./);
    assert.match(e, /\*\*SEI Pro 3\.2\.2\*\*\n\nGrade só abre no clique\./);
    assert.doesNotMatch(e, /\]\(|!\[|\.\.\/pages|^### /m);
    assert.doesNotMatch(e, /^13\/10\/2026$/m, 'a data de cada versão do upstream sai');
  });
  await teste('novidades do upstream (revisão): versões comparadas como número; histórico que não chega à base é erro, não o histórico inteiro', () => {
    const h = '### Versão 3.10\nx\n\n### Versão 3.9.1\ny\n\n### Versão 3.2\nz\n';
    assert.deepEqual(versoesDoHistorico(h, '3.9').map(v => v.versao), ['3.10', '3.9.1'], 'para na primeira versão ≤ base (3.2), mesmo sem a 3.9 escrita');
    assert.deepEqual(versoesDoHistorico(h, '3.2').map(v => v.versao), ['3.10', '3.9.1']);
    assert.throws(() => versoesDoHistorico(h, '2.0'), /não está no histórico/);
  });
  await teste('novidades do upstream (revisão): base com zero (3.0) sai inteira; link com imagem dentro, link com parênteses e HTML cru saem limpos', () => {
    const h = '### Versão 3.0\n12/10/2026\n\nVeja [![gif](a.gif)](../pages/A.md), [Foo (bar)](../a_(b).md) e <script>x</script>.\n\n### Versão 2.9\nfim\n';
    const e = entradaDoUpstream(h, '2.9', '3.0', '3.0.0.23', '13/10/2026');
    assert.match(e, /Base atualizada para o \*\*SEI Pro 3\.0\*\*/);
    assert.match(e, /Veja , Foo \(bar\) e &lt;script>x&lt;\/script>\./);
    assert.doesNotMatch(e, /\]\(|!\[|<script/);
  });
  await teste('novidades do upstream: entra logo abaixo do título; se a entrada da versão já existe, não duplica', () => {
    const md = '# Novidades\n\n## 3.2.2.22 — 12/10/2026 {#v3-2-2-22}\n\nAntes.\n';
    const e = entradaDoUpstream(HIST, '3.2.2', '3.2.3', '3.2.3.23', '13/10/2026');
    const novo = incluirEntrada(md, e, '3.2.3.23');
    assert.ok(novo.startsWith(`# Novidades\n\n${e}`));
    assert.ok(novo.includes('{#v3-2-2-22}'));
    assert.equal(incluirEntrada(novo, e, '3.2.3.23'), novo);
  });

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
