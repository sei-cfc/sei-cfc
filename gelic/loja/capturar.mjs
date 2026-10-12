#!/usr/bin/env node
/**
 * Gera as capturas da ficha da Chrome Web Store (SEI CFC e SEI CFC Gelic) num SEI de mentira,
 * do mesmo jeito que gelic/tests/e2e/rodar.sh + verificar.mjs sobem o ambiente para os testes de
 * ponta a ponta: servidor do SEI (porta 8765), PCA de mentira em https (porta 8766) e Chromium
 * headless com --load-extension falando CDP pelo WebSocket global do Node 22 (porta 9333).
 *
 * Script re-executável: cada perfil sobe os servidores e o Chromium num perfil temporário
 * (mktemp) e encerra tudo no fim, mesmo em erro. Não toca em nada fora de gelic/loja/.
 *
 *   node gelic/loja/capturar.mjs            # as duas extensões (gelic e cfc)
 *   node gelic/loja/capturar.mjs gelic      # só a SEI CFC Gelic
 *   node gelic/loja/capturar.mjs cfc        # só a SEI CFC
 *   CHROMIUM=/caminho/do/chrome node gelic/loja/capturar.mjs
 *
 * Rode sempre por gelic/loja/rodar-capturas.sh, que aplica o limite de memória (systemd-run).
 *
 * Saída em gelic/loja/imagens/:
 *   sei-cfc-gelic-1.png .. -3.png, sei-cfc-1.png .. -3.png   (1280×800)
 *   bloco-sei-cfc-gelic.png, bloco-sei-cfc.png               (440×280, HTML renderizado no Chromium)
 *   icone-sei-cfc-gelic.png, icone-sei-cfc.png                (cópia do ícone 128×128 de cada perfil)
 */
import { spawn, execFileSync } from 'node:child_process';
import {
  mkdtempSync, rmSync, writeFileSync, copyFileSync, readFileSync, mkdirSync,
  existsSync, readdirSync, openSync, closeSync, statSync,
} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../..');
const E2E = path.join(RAIZ, 'gelic/tests/e2e');
const SAIDA = path.join(AQUI, 'imagens');
mkdirSync(SAIDA, { recursive: true });

const PORTA_WEB = 8765;
const PORTA_PCA = 8766;
const PORTA_CDP = 9333;
const URL_SEI = `http://sei.cfc.org.br:${PORTA_WEB}`;
const urlControlar = () => `${URL_SEI}/sei/controlador.php?acao=procedimento_controlar`;
const urlArvore = () => `${URL_SEI}/sei/controlador.php?acao=procedimento_visualizar&id_procedimento=148265`;

const espera = ms => new Promise(r => setTimeout(r, ms));
const log = (...a) => console.log('[capturar]', ...a);

// ---------------------------------------------------------------------------------------------
// Chromium: mesma ordem de busca do rodar.sh (CHROMIUM do ambiente, cache do Playwright, do sistema).
function encontrarChromium() {
  if (process.env.CHROMIUM) return process.env.CHROMIUM;
  const base = path.join(os.homedir(), '.cache/ms-playwright');
  try {
    const candidatos = readdirSync(base).filter(n => n.startsWith('chromium-')).sort().reverse();
    for (const n of candidatos) {
      const p = path.join(base, n, 'chrome-linux64/chrome');
      if (existsSync(p)) return p;
    }
  } catch { /* sem cache do Playwright */ }
  try {
    const p = execFileSync('bash', ['-lc', 'command -v google-chrome chromium chromium-browser 2>/dev/null | head -1']).toString().trim();
    if (p) return p;
  } catch { /* nada no PATH */ }
  throw new Error('Chromium não encontrado: defina CHROMIUM=/caminho/do/chrome');
}
const CHROMIUM = encontrarChromium();

// ---------------------------------------------------------------------------------------------
// PNG: confere as dimensões exatas (cabeçalho IHDR) sem depender de ferramenta externa.
function dimensoesPng(caminho) {
  const buf = readFileSync(caminho);
  if (buf.length < 24 || buf.toString('ascii', 12, 16) !== 'IHDR') throw new Error(`${caminho}: não parece um PNG`);
  return { largura: buf.readUInt32BE(16), altura: buf.readUInt32BE(20) };
}
function confirmarPng(caminho, larguraEsperada, alturaEsperada) {
  const { largura, altura } = dimensoesPng(caminho);
  if (largura !== larguraEsperada || altura !== alturaEsperada) {
    throw new Error(`${caminho}: saiu ${largura}x${altura}, esperado ${larguraEsperada}x${alturaEsperada}`);
  }
  log(`OK ${path.relative(RAIZ, caminho)}: ${largura}x${altura} (${(statSync(caminho).size / 1024).toFixed(0)} KB)`);
}

// ---------------------------------------------------------------------------------------------
// CDP: fala WebSocket direto (sem Playwright), do jeito do verificar.mjs.
async function aguardar(condicao, { tentativas = 60, intervalo = 400, mensagem = 'condição' } = {}) {
  let ultimo;
  for (let i = 0; i < tentativas; i++) {
    ultimo = await condicao();
    if (ultimo) return ultimo;
    await espera(intervalo);
  }
  throw new Error(`tempo esgotado esperando ${mensagem} (último valor: ${JSON.stringify(ultimo)})`);
}

async function conectarCdp() {
  const alvos = async () => { try { return await (await fetch(`http://127.0.0.1:${PORTA_CDP}/json/list`)).json(); } catch { return []; } };
  const lista = await aguardar(async () => (await alvos()).find(a => a.type === 'page') ?? null, { tentativas: 80, mensagem: 'o Chromium responder ao CDP' });
  return abrirAlvo(lista.webSocketDebuggerUrl);
}

function abrirAlvo(webSocketDebuggerUrl) {
  const ws = new WebSocket(webSocketDebuggerUrl);
  let id = 0;
  const pronto = new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
  const chamar = (method, params) => pronto.then(() => new Promise((res, rej) => {
    const meu = ++id;
    const vencido = setTimeout(() => rej(new Error(`CDP ${method} sem resposta em 45s`)), 45000);
    ws.addEventListener('message', function f(ev) {
      const m = JSON.parse(ev.data);
      if (m.id !== meu) return;
      clearTimeout(vencido);
      ws.removeEventListener('message', f);
      m.error ? rej(new Error(`CDP ${method}: ${JSON.stringify(m.error)}`)) : res(m.result);
    });
    ws.send(JSON.stringify({ id: meu, method, params }));
  }));
  const avaliar = async expressao => {
    const r = await chamar('Runtime.evaluate', { expression: expressao, returnByValue: true, awaitPromise: true });
    if (r?.exceptionDetails) throw new Error(`avaliar(): ${JSON.stringify(r.exceptionDetails).slice(0, 500)}`);
    return r?.result?.value ?? null;
  };
  return { chamar, avaliar, fechar: () => ws.close() };
}

/** Nova aba (página própria do Chromium, sem a extensão: usada só para o bloco promocional). */
async function novaAba() {
  const alvo = await (await fetch(`http://127.0.0.1:${PORTA_CDP}/json/new?about:blank`, { method: 'PUT' })).json();
  const api = abrirAlvo(alvo.webSocketDebuggerUrl);
  return { ...api, fechar: async () => { api.fechar(); await fetch(`http://127.0.0.1:${PORTA_CDP}/json/close/${alvo.id}`).catch(() => {}); } };
}

// ---------------------------------------------------------------------------------------------
// Passos de UI: nada de clique "de verdade" por coordenada (isso é para o e2e testar robustez de
// eventos); aqui é só preparar a tela para a foto, então .click()/.open são suficientes e mais simples.

/** Esconde painéis do SEI Pro que não são da extensão, se por algum motivo aparecerem na primeira carga. */
const LIMPAR_PAINEIS = "(() => { ['demandasPro','projetosPro'].forEach(id => document.getElementById(id)?.remove()); return true; })()";

/** 1ª carga: o legado ainda pode não ter lido os padrões (Demandas/Projetos desligados); a 2ª já os aplica. */
async function assentarPaginas(cdp) {
  for (let volta = 0; volta < 2; volta++) {
    await cdp.chamar('Page.navigate', { url: urlControlar() });
    await aguardar(() => cdp.avaliar("document.documentElement?.dataset?.gelic ?? null"), { mensagem: `script da Gelic injetado (carga ${volta + 1})` });
  }
}

async function aguardarSelo(cdp, perfil) {
  const expr = `(() => {
    const s = document.getElementById('gelic-selo'); if (!s) return null;
    const logo = s.querySelector('img.gelic-logo');
    const temRoteiro = ${perfil === 'cfc'} ? !!document.querySelector('#gelic-selo .gelic-roteiro') : true;
    return (s.dataset.etapa && (!logo || logo.naturalWidth > 0) && temRoteiro) ? '1' : null;
  })()`;
  await aguardar(() => cdp.avaliar(expr), { tentativas: 60, mensagem: `selo calculado (perfil ${perfil})` });
}

/** Fecha o detalhe do selo se uma navegação anterior (mesma sessão) o deixou aberto pelo sessionStorage. */
const FECHAR_DETALHE = `(() => {
  const cab = document.querySelector('#gelic-selo button.gelic-cab');
  const det = document.querySelector('#gelic-selo .gelic-detalhe');
  if (cab && det && det.hidden === false) cab.click();
  return true;
})()`;

async function abrirDetalheSelo(cdp) {
  await cdp.avaliar("document.querySelector('#gelic-selo button.gelic-cab')?.click()");
  await aguardar(() => cdp.avaliar("document.querySelector('#gelic-selo .gelic-detalhe')?.hidden === false ? '1' : null"), { mensagem: 'detalhe do selo aberto' });
}

async function abrirGerarDocumento(cdp) {
  await cdp.avaliar(FECHAR_DETALHE);
  await cdp.avaliar("document.querySelector('#gelic-selo [data-acao=documento]')?.click()");
  await aguardar(() => cdp.avaliar("document.querySelector('#gelic-selo .gelic-docs')?.hidden === false ? '1' : null"), { mensagem: 'lista de documentos aberta' });
  // Primeiro grupo (Análise da Gelic / Peças do demandante): abre o <details> direto, sem depender do clique no <summary>.
  await cdp.avaliar("(() => { const d = document.querySelector('#gelic-selo .gelic-docs details:first-of-type'); if (d) d.open = true; return !!d; })()");
  await espera(250);
}

/** Centraliza o alvo no topo do viewport (1280×larguraxaltura já fixado) e tira a foto. */
async function fotoDoAlvo(cdp, { seletor, arquivo, largura = 1280, altura = 800 }) {
  await cdp.chamar('Emulation.setDeviceMetricsOverride', { width: largura, height: altura, deviceScaleFactor: 1, mobile: false });
  await espera(150);
  await cdp.avaliar(LIMPAR_PAINEIS);
  if (seletor) await cdp.avaliar(`document.querySelector(${JSON.stringify(seletor)})?.scrollIntoView({ block: 'start' })`);
  await espera(250);
  const { data } = await comRetentativas(() => cdp.chamar('Page.captureScreenshot', { format: 'png' }));
  const destino = path.join(SAIDA, arquivo);
  writeFileSync(destino, Buffer.from(data, 'base64'));
  confirmarPng(destino, largura, altura);
  return destino;
}

/** Page.captureScreenshot pode não responder logo depois de muito trabalho síncrono na página (Calcular etapas etc.): tenta de novo. */
async function comRetentativas(fn, vezes = 3) {
  let ultimoErro;
  for (let i = 0; i < vezes; i++) {
    try { return await fn(); } catch (e) { ultimoErro = e; await espera(1500); }
  }
  throw ultimoErro;
}

// ---------------------------------------------------------------------------------------------
// Bloco promocional (440×280): HTML autossuficiente (ícone em base64), renderizado numa aba nova
// do mesmo Chromium — não depende do SEI de mentira.
const BLOCOS = {
  gelic: {
    arquivo: 'bloco-sei-cfc-gelic.png', nome: 'SEI CFC Gelic',
    frase: 'A etapa de cada contratação, no SEI do CFC',
    fundo: '#0e5c7a', faixa: '#95bf37', icone: 'gelic/icones/icon-128.png',
  },
  cfc: {
    arquivo: 'bloco-sei-cfc.png', nome: 'SEI CFC',
    frase: 'Do PCA ao envio à Gelic, no SEI do CFC',
    fundo: '#122d45', faixa: '#f2b33d', icone: 'gelic/icones/cfc/icon-128.png',
  },
};

async function capturarBlocoPromocional(perfil) {
  const info = BLOCOS[perfil];
  const b64 = readFileSync(path.join(RAIZ, info.icone)).toString('base64');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html, body { margin: 0; padding: 0; width: 440px; height: 280px; background: ${info.fundo}; }
.bloco {
  box-sizing: border-box; width: 440px; height: 280px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #ffffff; text-align: center;
}
img { width: 84px; height: 84px; }
.faixa { width: 56px; height: 4px; background: ${info.faixa}; border-radius: 2px; }
h1 { margin: 0; font-size: 26px; font-weight: 700; }
p { margin: 0; max-width: 360px; font-size: 15px; line-height: 1.4; color: rgba(255,255,255,.88); }
</style></head><body>
<div class="bloco">
  <img src="data:image/png;base64,${b64}" alt="">
  <div class="faixa"></div>
  <h1>${info.nome}</h1>
  <p>${info.frase}</p>
</div>
</body></html>`;
  const aba = await novaAba();
  try {
    await aba.chamar('Page.navigate', { url: 'data:text/html;base64,' + Buffer.from(html, 'utf8').toString('base64') });
    await espera(400);
    await aba.chamar('Emulation.setDeviceMetricsOverride', { width: 440, height: 280, deviceScaleFactor: 1, mobile: false });
    await espera(150);
    const { data } = await comRetentativas(() => aba.chamar('Page.captureScreenshot', { format: 'png' }));
    const destino = path.join(SAIDA, info.arquivo);
    writeFileSync(destino, Buffer.from(data, 'base64'));
    confirmarPng(destino, 440, 280);
    return destino;
  } finally {
    await aba.fechar();
  }
}

const ICONES = {
  gelic: { origem: 'gelic/icones/icon-128.png', destino: 'icone-sei-cfc-gelic.png' },
  cfc: { origem: 'gelic/icones/cfc/icon-128.png', destino: 'icone-sei-cfc.png' },
};
function copiarIcone(perfil) {
  const info = ICONES[perfil];
  const destino = path.join(SAIDA, info.destino);
  copyFileSync(path.join(RAIZ, info.origem), destino);
  confirmarPng(destino, 128, 128);
  return destino;
}

// ---------------------------------------------------------------------------------------------
// As 3 capturas de cada perfil (ordem igual à do pedido: árvore+selo, Controle, Gerar documento).
async function capturarPerfil(cdp, perfil) {
  const prefixo = perfil === 'gelic' ? 'sei-cfc-gelic' : 'sei-cfc';
  const arquivos = [];

  // (a) árvore do processo com o selo aberto (detalhe visível; no cfc, com o roteiro da instrução).
  await cdp.chamar('Page.navigate', { url: urlArvore() });
  await aguardarSelo(cdp, perfil);
  await abrirDetalheSelo(cdp);
  arquivos.push(await fotoDoAlvo(cdp, { seletor: '#gelic-selo', arquivo: `${prefixo}-1.png` }));

  // (b) gelic: Controle de Processos depois de "Calcular etapas". cfc: diálogo "Iniciar processo".
  await cdp.chamar('Page.navigate', { url: urlControlar() });
  if (perfil === 'gelic') {
    await aguardar(() => cdp.avaliar("document.querySelector('#gelic-controle .gelic-ctl-calcular') ? '1' : null"), { mensagem: 'barra "Calcular etapas"' });
    await cdp.avaliar("document.querySelector('#gelic-controle .gelic-ctl-calcular')?.click()");
    await aguardar(() => cdp.avaliar("document.querySelectorAll('.gelic-etapa-linha').length >= 9 ? '1' : null"), { tentativas: 150, intervalo: 400, mensagem: 'etapa calculada nas linhas (10 processos)' });
    arquivos.push(await fotoDoAlvo(cdp, { seletor: '#gelic-controle', arquivo: `${prefixo}-2.png` }));
  } else {
    await aguardar(() => cdp.avaliar("document.getElementById('gelic-iniciar') ? '1' : null"), { mensagem: 'botão "Iniciar processo"' });
    await cdp.avaliar("document.getElementById('gelic-iniciar')?.click()");
    await aguardar(() => cdp.avaliar("document.querySelector('#gelic-iniciar-dialogo [name=objeto]') ? '1' : null"), { mensagem: 'diálogo "Iniciar processo"' });
    await espera(200);
    arquivos.push(await fotoDoAlvo(cdp, { seletor: '#gelic-iniciar-dialogo', arquivo: `${prefixo}-2.png` }));
  }

  // (c) selo com "Gerar documento" aberto (lista de documentos).
  await cdp.chamar('Page.navigate', { url: urlArvore() });
  await aguardarSelo(cdp, perfil);
  await abrirGerarDocumento(cdp);
  arquivos.push(await fotoDoAlvo(cdp, { seletor: '#gelic-selo', arquivo: `${prefixo}-3.png` }));

  arquivos.push(await capturarBlocoPromocional(perfil));
  arquivos.push(copiarIcone(perfil));
  return arquivos;
}

// ---------------------------------------------------------------------------------------------
// Orquestração de processos: servidor do SEI, PCA de mentira (https) e Chromium, com tudo
// encerrado (e o perfil temporário apagado) ao sair, mesmo em erro.
async function aguardarHttp(url, tentativas = 60) {
  await aguardar(async () => { try { return (await fetch(url)).ok; } catch { return false; } }, { tentativas, intervalo: 250, mensagem: `o servidor responder em ${url}` });
}

// Processos e diretório temporário da rodada atual: módulo-level para o handler de sinal
// (SIGINT/SIGTERM) conseguir encerrar tudo mesmo se chegar no meio de uma captura.
let processosAtuais = [];
let dirAtualPerfil = null;

async function rodarPerfil(perfil) {
  const EXT = path.join(RAIZ, `build/sei-pro-${perfil}`);
  if (!existsSync(EXT)) throw new Error(`build ausente: ${EXT} (rode "cd gelic && npm run build")`);
  const PERFIL_DIR = mkdtempSync(path.join(os.tmpdir(), 'gelic-loja-'));
  dirAtualPerfil = PERFIL_DIR;
  const processos = processosAtuais;
  let logFd = -1;
  const matarTudo = async () => {
    for (const p of processos) { try { p.kill('SIGTERM'); } catch { /* já morreu */ } }
    await espera(300);
    for (const p of processos) { try { p.kill('SIGKILL'); } catch { /* já morreu */ } }
    await Promise.all(processos.map(p => new Promise(res => {
      if (p.exitCode !== null || p.signalCode) return res();
      p.once('exit', res);
      setTimeout(res, 2000);
    })));
    if (logFd !== -1) try { closeSync(logFd); } catch { /* já fechado */ }
  };
  try {
    log(`[${perfil}] perfil temporário: ${PERFIL_DIR}`);
    const web = spawn('python3', [path.join(E2E, 'servidor.py'), String(PORTA_WEB)], { stdio: 'ignore' });
    processos.push(web);
    // 127.0.0.1 direto: sei.cfc.org.br só existe via --host-resolver-rules do Chromium, não para o fetch do Node.
    await aguardarHttp(`http://127.0.0.1:${PORTA_WEB}/sei/controlador.php?acao=procedimento_controlar`);

    execFileSync('openssl', [
      'req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1', '-subj', '/CN=pca.teste.org.br',
      '-keyout', path.join(PERFIL_DIR, 'pca.key'), '-out', path.join(PERFIL_DIR, 'pca.crt'),
    ], { stdio: 'ignore' });
    const pca = spawn('python3', [path.join(E2E, 'pca_falso.py'), String(PORTA_PCA), path.join(PERFIL_DIR, 'pca.crt'), path.join(PERFIL_DIR, 'pca.key')], { stdio: 'ignore' });
    processos.push(pca);

    logFd = openSync(path.join(PERFIL_DIR, 'chrome.log'), 'a');
    const nav = spawn(CHROMIUM, [
      '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
      `--user-data-dir=${PERFIL_DIR}`, `--remote-debugging-port=${PORTA_CDP}`,
      `--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`,
      '--ignore-certificate-errors',
      '--host-resolver-rules=MAP sei.cfc.org.br 127.0.0.1, MAP sei.outro.gov.br 127.0.0.1, MAP pca.teste.org.br 127.0.0.1, MAP pca.sistemascfc.org 127.0.0.1, MAP sei-cfc.github.io 127.0.0.1',
      'about:blank',
    ], { stdio: ['ignore', logFd, logFd] });
    processos.push(nav);

    const cdp = await conectarCdp();
    await cdp.chamar('Page.enable', {});
    log(`[${perfil}] CDP conectado; preparando as páginas…`);
    await assentarPaginas(cdp);
    log(`[${perfil}] capturando…`);
    const arquivos = await capturarPerfil(cdp, perfil);
    cdp.fechar();
    return arquivos;
  } finally {
    await matarTudo();
    rmSync(PERFIL_DIR, { recursive: true, force: true });
    processosAtuais = [];
    dirAtualPerfil = null;
    log(`[${perfil}] processos encerrados, perfil temporário apagado.`);
    await espera(1000); // margem para as portas 8765/8766/9333 ficarem livres para o próximo perfil
  }
}

// ---------------------------------------------------------------------------------------------
async function main() {
  const PERFIS = ['gelic', 'cfc'];
  const pedido = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const perfis = pedido.length ? pedido : PERFIS;
  for (const p of perfis) if (!PERFIS.includes(p)) { console.error(`perfil desconhecido: "${p}" (use gelic e/ou cfc)`); process.exitCode = 2; return; }

  const resultado = [];
  const erros = [];
  for (const perfil of perfis) {
    try {
      resultado.push(...await rodarPerfil(perfil));
    } catch (e) {
      console.error(`[capturar] ERRO no perfil ${perfil}:`, e.stack ?? e.message ?? e);
      erros.push({ perfil, erro: e.message ?? String(e) });
    }
  }

  log('--- arquivos gerados ---');
  for (const f of resultado) log(' ', path.relative(RAIZ, f));
  if (erros.length) {
    log('--- erros ---');
    for (const e of erros) log(` ${e.perfil}: ${e.erro}`);
    process.exitCode = 1;
  }
}

// Encerra tudo mesmo se o processo for interrompido (Ctrl+C, timeout do rodar-capturas.sh etc.):
// mata na hora os processos da rodada atual e apaga o perfil temporário, antes de sair.
let encerrando = false;
function encerrarNoSinal(sinal) {
  if (encerrando) return;
  encerrando = true;
  console.error(`\n[capturar] recebido ${sinal}: encerrando processos e apagando o perfil temporário…`);
  for (const p of processosAtuais) { try { p.kill('SIGKILL'); } catch { /* já morreu */ } }
  if (dirAtualPerfil) { try { rmSync(dirAtualPerfil, { recursive: true, force: true }); } catch { /* ignora */ } }
  process.exit(1);
}
process.on('SIGINT', () => encerrarNoSinal('SIGINT'));
process.on('SIGTERM', () => encerrarNoSinal('SIGTERM'));

await main();
