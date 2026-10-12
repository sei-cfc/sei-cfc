// Rasteriza logo.svg / logo-pequeno.svg nos PNGs dos ícones com o Chromium (headless, via CDP).
// O mesmo Chromium do teste de ponta a ponta: CHROMIUM=/caminho, ou o do Playwright.
//   node gelic/icones/rasterizar.mjs
import { spawn } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = fileURLToPath(new URL('.', import.meta.url));
const pw = join(homedir(), '.cache/ms-playwright');
const chromium = process.env.CHROMIUM
  ?? readdirSync(pw).filter(d => d.startsWith('chromium-')).sort().map(d => join(pw, d, 'chrome-linux64/chrome')).pop();
const ALVOS = [['logo-pequeno.svg', 16, 'icon-16.png'], ['logo-pequeno.svg', 32, 'icon-32.png'], ['logo.svg', 48, 'icon-48.png'],
  ['logo.svg', 128, 'icon-128.png'], ['logo.svg', 512, 'logo-512.png']];

const perfil = mkdtempSync(join(tmpdir(), 'gelic-icones-'));
const nav = spawn(chromium, ['--headless=new', '--no-sandbox', '--disable-gpu', `--user-data-dir=${perfil}`, '--remote-debugging-port=9334', 'about:blank'], { stdio: 'ignore' });
const espera = ms => new Promise(r => setTimeout(r, ms));
try {
  let alvo;
  for (let i = 0; i < 40 && !alvo; i++) {
    await espera(250);
    alvo = await fetch('http://127.0.0.1:9334/json/list').then(r => r.json()).then(l => l.find(a => a.type === 'page')).catch(() => undefined);
  }
  const ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0;
  const chamar = (method, params = {}) => new Promise(res => {
    const meu = ++id;
    ws.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === meu) { ws.removeEventListener('message', f); res(m.result); } });
    ws.send(JSON.stringify({ id: meu, method, params }));
  });
  await chamar('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  for (const [svg, px, png] of ALVOS) {
    await chamar('Emulation.setDeviceMetricsOverride', { width: px, height: px, deviceScaleFactor: 1, mobile: false });
    const html = `<!doctype html><html><body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${readFileSync(join(AQUI, svg)).toString('base64')}" width="${px}" height="${px}" style="display:block"></body></html>`;
    await chamar('Page.navigate', { url: `data:text/html;base64,${Buffer.from(html).toString('base64')}` });
    await espera(400);
    const { data } = await chamar('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: px, height: px, scale: 1 } });
    writeFileSync(join(AQUI, png), Buffer.from(data, 'base64'));
    console.log(`${png} (${px} px, de ${svg})`);
  }
  ws.close();
} finally {
  nav.kill();
  await espera(300);
  rmSync(perfil, { recursive: true, force: true });
}
