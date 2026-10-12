import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { manifestoGelic, MATCHES_PCA_SITE, NOME, PAGINA_PCA, paraOCfc, pastaDoPacote, SCRIPT, SCRIPT_PCA_SITE, versaoGelic, type Manifesto } from '../src/empacotamento/manifesto';
import { verificarPerfil } from './perfil';
import { verificarRegras } from './regras';
import { verificarSelo } from './selo';
import { verificarAgente } from './agente';
import { verificarControle } from './controle';
import { verificarModelos } from './modelos';
import { verificarModelosCfc } from './modelos-cfc';
import { verificarDviPreparar } from './dvi-preparar';
import { verificarDviMontar } from './dvi-montar';
import { verificarDviFluxo } from './dvi-fluxo';
import { verificarModelosFluxo } from './modelos-fluxo';
import { verificarModelosCfcFluxo } from './modelos-cfc-fluxo';
import { verificarPeca } from './peca';
import { verificarVerificacao } from './verificacao';
import { verificarPca } from './pca';
import { verificarIniciar } from './iniciar';
import { verificarFicha } from './ficha';
import { verificarPadroes } from './padroes';
import { verificarSite } from './site';
import { verificarNovidades } from './novidades';
import { CHAVE_SITE } from '../src/site';
import { teste, total } from './util';
/** Manifest real do upstream, lido a cada teste para nenhum teste contaminar outro. */
const upstream = () => JSON.parse(readFileSync(new URL('../../dist/manifest.json', import.meta.url), 'utf8')) as Manifesto;

// ---- versão ----
await teste('versão: completa até três números e acrescenta a revisão', () => {
  assert.equal(versaoGelic('2.7', 1), '2.7.0.1');
  assert.equal(versaoGelic('2.7.1', 3), '2.7.1.3');
  assert.equal(versaoGelic('3', 2), '3.0.0.2');
});
await teste('versão: recusa upstream com quatro números ou texto, e revisão inválida', () => {
  assert.throws(() => versaoGelic('2.7.1.4', 1), /até 3 números/);
  assert.throws(() => versaoGelic('2.7-beta', 1), /até 3 números/);
  assert.throws(() => versaoGelic('2.7', 0), /Revisão/);
  assert.throws(() => versaoGelic('2.7', 1.5), /Revisão/);
});

// ---- manifest ----
await teste('nome, título, ícones e versão da Gelic; short_name do upstream intacto', () => {
  const u = upstream();
  const m = manifestoGelic(u, 1);
  assert.equal(m.name, NOME);
  assert.equal(m.action?.default_title, NOME);
  assert.equal(m.short_name, u.short_name, 'short_name decide o NAMESPACE_SPRO do legado');
  assert.equal(m.version, versaoGelic(u.version, 1));
  assert.match(m.version_name!, new RegExp(`^${u.version.replaceAll('.', '\\.')} Gelic r1$`));
  assert.deepEqual(Object.keys(m.icons!), ['16', '32', '48', '128']);
  assert.ok(Object.values(m.icons!).every(c => c.startsWith('icons/gelic/')));
});
await teste('script da Gelic nas mesmas telas do anotacoes-controle, em todos os quadros', () => {
  const m = manifestoGelic(upstream(), 1);
  const gelic = m.content_scripts!.filter(c => c.js?.includes(SCRIPT));
  assert.equal(gelic.length, 1);
  const modelo = m.content_scripts!.find(c => c.js?.includes('js/init_anotacoes_controle.js'))!;
  assert.deepEqual(gelic[0].matches, modelo.matches);
  assert.deepEqual(gelic[0].exclude_matches, modelo.exclude_matches);
  assert.equal(gelic[0].all_frames, true);
  const doCfc = upstream().content_scripts!.filter(c => paraOCfc(c.matches).length);
  assert.equal(m.content_scripts!.length, doCfc.length + 1, 'acrescenta a da Gelic e só tira as entradas de outros órgãos');
});
await teste('ícones da Gelic acessíveis ao mundo da página (o legado usa manifest.icons)', () => {
  const m = manifestoGelic(upstream(), 1);
  const lista = m.web_accessible_resources!.find(r => r.resources.includes('icons/lab/icon-32.png'))!;
  for (const c of [...Object.values(m.icons!), 'icons/gelic/logo-pequeno.svg']) assert.ok(lista.resources.includes(c), c);
});
await teste('não altera o objeto de origem', () => {
  const u = upstream();
  const copia = structuredClone(u);
  manifestoGelic(u, 1);
  assert.deepEqual(u, copia);
});
await teste('recusa empacotar duas vezes o mesmo manifest', () => {
  assert.throws(() => manifestoGelic(manifestoGelic(upstream(), 1), 1), /já tem o script da Gelic/);
});
await teste('falha alto se o upstream tirar a entrada que serve de modelo', () => {
  const u = upstream();
  u.content_scripts = u.content_scripts!.filter(c => !c.js?.includes('js/init_anotacoes_controle.js'));
  assert.throws(() => manifestoGelic(u, 1), /não encontrada/);
});

await teste('só no SEI do CFC: nenhum padrão para *.br, *.org ou outro órgão; as telas do SEI e do SIP continuam', () => {
  assert.deepEqual(paraOCfc(['*://*.br/sei/*', '*://*.org/sei/*', '*://sip-sei.ans.gov.br/*', 'https://*.br/*/sip/*']),
    ['*://sei.cfc.org.br/sei/*', '*://sip.cfc.org.br/sei/*', 'https://sei.cfc.org.br/*/sip/*', 'https://sip.cfc.org.br/*/sip/*']);
  for (const perfil of ['gelic', 'cfc'] as const) {
    const m = manifestoGelic(upstream(), 10, perfil);
    const todos = [...m.content_scripts!.flatMap(c => [...c.matches, ...(c.exclude_matches ?? [])]), ...m.web_accessible_resources!.flatMap(r => r.matches)];
    const hosts = new Set(todos.map(p => p.split('/')[2]));
    // o cfc também entra no PCA (o botão "Iniciar processo" na ficha do item); nenhum outro site
    assert.deepEqual([...hosts].sort(), perfil === 'cfc' ? ['pca.sistemascfc.org', 'sei.cfc.org.br', 'sip.cfc.org.br'] : ['sei.cfc.org.br', 'sip.cfc.org.br'], perfil);
    const gelic = m.content_scripts!.find(c => c.js?.includes(SCRIPT))!;
    assert.ok(gelic.matches.includes('*://sei.cfc.org.br/sei/*'), 'a Gelic continua nas telas do SEI');
  }
});
await teste('PCA: só o perfil cfc entra em pca.sistemascfc.org (o botão Iniciar processo), com a configuração do PCA acessível de lá', () => {
  const cfc = manifestoGelic(upstream(), 15, 'cfc');
  const doPca = cfc.content_scripts!.filter(c => c.matches.some(m => m.includes('pca.sistemascfc.org')));
  assert.deepEqual(doPca, [{ js: [SCRIPT_PCA_SITE], matches: [...MATCHES_PCA_SITE], run_at: 'document_idle' }], 'só o nosso script, sem o legado');
  assert.deepEqual(MATCHES_PCA_SITE, ['https://pca.sistemascfc.org/*']);
  const recurso = cfc.web_accessible_resources!.find(r => r.matches.includes(MATCHES_PCA_SITE[0]))!;
  assert.deepEqual(recurso.resources, [PAGINA_PCA], 'o clique sem configuração abre a configuração do PCA');
  const gelic = manifestoGelic(upstream(), 15, 'gelic');
  assert.ok(!JSON.stringify(gelic).includes('pca.sistemascfc.org'), 'o SEI CFC Gelic não entra no PCA');
});

// ---- perfis (um pacote por perfil) ----
await teste('perfil gelic: o manifest de sempre (igual ao padrão, sem chave de perfil, ícones em icons/gelic/)', () => {
  const m = manifestoGelic(upstream(), 8, 'gelic');
  assert.deepEqual(m, manifestoGelic(upstream(), 8));
  assert.ok(!('sei_pro_perfil' in m));
  assert.equal(m.version_name, `${upstream().version} Gelic r8`);
  assert.match(m.description!, /Licitação do CFC \(Gelic\)/);
});
await teste('perfil cfc: nome, descrição, título, ícones em icons/cfc/, chave sei_pro_perfil e o mesmo script', () => {
  const u = upstream();
  const m = manifestoGelic(u, 8, 'cfc');
  assert.equal(m.name, 'SEI CFC');
  assert.equal(m.action?.default_title, 'SEI CFC');
  assert.equal(m.short_name, u.short_name);
  assert.equal(m.sei_pro_perfil, 'cfc');
  assert.equal(m.version, versaoGelic(u.version, 8), 'mesma versão da Gelic');
  assert.equal(m.version_name, `${u.version} CFC r8`);
  assert.doesNotMatch(m.description!, /Gelic|DVI|análise/i);
  assert.deepEqual(m.icons, { 16: 'icons/cfc/icon-16.png', 32: 'icons/cfc/icon-32.png', 48: 'icons/cfc/icon-48.png', 128: 'icons/cfc/icon-128.png' });
  const gelic = m.content_scripts!.filter(c => c.js?.includes(SCRIPT));
  assert.equal(gelic.length, 1);
  assert.deepEqual(gelic[0].matches, manifestoGelic(u, 8).content_scripts!.find(c => c.js?.includes(SCRIPT))!.matches);
  const lista = m.web_accessible_resources!.find(r => r.resources.includes('icons/lab/icon-32.png'))!;
  for (const c of [...Object.values(m.icons!), 'icons/cfc/logo-pequeno.png']) assert.ok(lista.resources.includes(c), c);
  assert.ok(!lista.resources.some(r => r.startsWith('icons/gelic/')), 'nada da Gelic no pacote do CFC');
  assert.ok(m.action && Object.keys(m.action).length > 1, 'o resto do action do upstream continua');
});
await teste('manifest: página do site do perfil em gelic_site (o gancho G4 abre ao instalar); o do SEI Pro não muda', () => {
  assert.equal(manifestoGelic(upstream(), 1)[CHAVE_SITE], 'https://sei-cfc.github.io/sei-cfc-gelic/');
  assert.equal(manifestoGelic(upstream(), 1, 'cfc')[CHAVE_SITE], 'https://sei-cfc.github.io/sei-cfc/');
  assert.equal(upstream()[CHAVE_SITE], undefined);
});
await teste('gancho G4 no background: com gelic_site, instalar abre a página e atualizar não abre aba (uma vez, no lugar certo)', () => {
  const bg = readFileSync(new URL('../../dist/background.js', import.meta.url), 'utf8');
  assert.equal(bg.split('GANCHO GELIC G4').length - 1, 1, 'uma vez só');
  const corpo = bg.slice(bg.indexOf('function handleInstalled'), bg.indexOf('function onError'));
  const g4 = corpo.indexOf('GANCHO GELIC G4');
  assert.ok(g4 > corpo.indexOf('details.previousVersion'), 'dentro de handleInstalled, depois dos dois return iniciais');
  assert.ok(corpo.includes('var gelicSite = browser.runtime.getManifest().gelic_site;'));
  assert.ok(corpo.includes('if (gelicSite) { if (details.reason == "install") browser.tabs.create({ url: gelicSite }); return; }'));
});
await teste('perfis: pastas de pacote diferentes (extensões sem empacotar ganham IDs diferentes) e perfil desconhecido falha', () => {
  assert.equal(pastaDoPacote('gelic'), 'sei-pro-gelic');
  assert.equal(pastaDoPacote('cfc'), 'sei-pro-cfc');
  assert.throws(() => manifestoGelic(upstream(), 1, 'outro' as never), /Perfil desconhecido/);
});

await teste('pacote cfc: a janela das peças é recurso acessível às telas do SEI; o da Gelic não a expõe', () => {
  const cfc = manifestoGelic(upstream(), 10, 'cfc');
  const r = cfc.web_accessible_resources!.find(x => x.resources.includes('js/gelic/peca.html'));
  assert.ok(r, 'peca.html acessível');
  assert.deepEqual(r.matches, ['*://sei.cfc.org.br/*'], 'só no SEI do CFC: nenhum outro site embute a janela');
  assert.deepEqual(r.resources, ['js/gelic/peca.html', 'js/gelic/verificar.html', 'js/gelic/pca.html'], 'entrada própria, fora da lista do legado');
  const gelic = manifestoGelic(upstream(), 10, 'gelic').web_accessible_resources!;
  assert.ok(!gelic.some(x => x.resources.includes('js/gelic/peca.html')));
  assert.ok(!gelic.some(x => x.resources.includes('js/gelic/verificar.html')), 'a verificação prévia é só do CFC');
  assert.deepEqual(gelic.find(x => x.resources.includes('js/gelic/pca.html'))!.matches, ['*://sei.cfc.org.br/*'], 'a configuração do PCA nos dois perfis');
});

await verificarRegras();
await verificarSelo();
await verificarAgente();
await verificarControle();
await verificarModelos();
await verificarModelosCfc();
await verificarDviPreparar();
await verificarDviMontar();
await verificarDviFluxo();
await verificarModelosFluxo();
await verificarModelosCfcFluxo();
await verificarPeca();
await verificarVerificacao();
await verificarPerfil();
await verificarPca();
await verificarIniciar();
await verificarFicha();
await verificarPadroes();
await verificarSite();
await verificarNovidades();

console.log(`\n${total()} verificações da Gelic passaram.`);
