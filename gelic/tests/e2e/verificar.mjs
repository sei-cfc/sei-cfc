// Fala CDP direto (WebSocket global do Node 22), sem dependência de Playwright.
import assert from 'node:assert/strict';
const [portaWeb, portaCdp, portaPca] = process.argv.slice(2);
// Perfil do pacote em teste (rodar.sh): gelic (padrão) ou cfc.
const PERFIL = process.env.GELIC_PERFIL ?? 'gelic';
const NOMES = { gelic: 'SEI CFC Gelic', cfc: 'SEI CFC' };
const espera = ms => new Promise(r => setTimeout(r, ms));
const alvos = async () => { try { return await (await fetch(`http://127.0.0.1:${portaCdp}/json/list`)).json(); } catch { return []; } };

let lista = [];
for (let i = 0; i < 40 && !lista.some(a => a.type === 'page'); i++) { await espera(500); lista = await alvos(); }
// a aba inicial (about:blank), nunca a que a instalação abre (G4): navegar nela tiraria a página do site da lista
const inicial = lista.find(a => a.type === 'page' && a.url === 'about:blank') ?? lista.find(a => a.type === 'page');
const ws = new WebSocket(inicial.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0;
const chamar = (method, params) => new Promise(res => {
  const meu = ++id;
  ws.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === meu) { ws.removeEventListener('message', f); res(m.result ?? m.error); } });
  ws.send(JSON.stringify({ id: meu, method, params }));
});

await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_controlar` });
const expr = `JSON.stringify({ gelic: document.documentElement.dataset.gelic ?? null, menu: document.querySelectorAll('#infraMenu li').length,
  ns: (() => { try { return JSON.parse(sessionStorage.getItem('new_extension')); } catch { return null; } })() })`;
let tela = {};
for (let i = 0; i < 30 && !(tela.gelic && tela.ns); i++) {
  await espera(500);
  const v = (await chamar('Runtime.evaluate', { expression: expr, returnByValue: true }))?.result?.value;
  if (v) tela = JSON.parse(v);
}
// G4: a instalação (o perfil do navegador é novo a cada rodada) abre a página do perfil no site, e não o seipro.app.
const paginaDoPerfil = `https://sei-cfc.github.io/${PERFIL === 'cfc' ? 'sei-cfc' : 'sei-cfc-gelic'}/`;
let abasDaInstalacao = [];
for (let i = 0; i < 20 && !abasDaInstalacao.includes(paginaDoPerfil); i++) {
  await espera(300);
  abasDaInstalacao = (await alvos()).filter(a => a.type === 'page').map(a => a.url);
}

// Quadro da árvore: o selo da Gelic com a etapa calculada pelos títulos.
await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_visualizar&id_procedimento=148265` });
const exprSelo = `(() => { const s = document.getElementById('gelic-selo'); if (!s) return null;
  return JSON.stringify({ etapa: s.dataset.etapa ?? null, tom: s.dataset.tom ?? null, texto: s.textContent, primeiro: document.getElementById('container')?.firstElementChild === s, logo: s.querySelector('img.gelic-logo')?.naturalWidth ?? 0 }); })()`;
let selo = null;
for (let i = 0; i < 30; i++) {
  await espera(500);
  const v = (await chamar('Runtime.evaluate', { expression: exprSelo, returnByValue: true }))?.result?.value;
  if (v) { selo = JSON.parse(v); if (selo.etapa && selo.logo > 0) break; }
}
await chamar('Runtime.evaluate', { expression: "document.querySelector('#gelic-selo button.gelic-cab')?.click()" });
await espera(300);
const pcaNoSelo = await (async () => { for (let i = 0; i < 10; i++) { const v = (await chamar('Runtime.evaluate', { returnByValue: true, expression: "JSON.stringify({ convite: !!document.querySelector('#gelic-selo .gelic-detalhe [data-gelic-pca-config]'), linha: document.querySelector('#gelic-selo .gelic-pca')?.textContent ?? null })" }))?.result?.value; if (v && JSON.parse(v).convite) return JSON.parse(v); await espera(300); } return null; })();
const aberto = JSON.parse((await chamar('Runtime.evaluate', { expression: "JSON.stringify({ visivel: !document.querySelector('#gelic-selo .gelic-detalhe')?.hidden, texto: document.querySelector('#gelic-selo .gelic-detalhe')?.textContent ?? '' })", returnByValue: true })).result.value);
// Cliques de verdade (eventos confiáveis): "Gerar documento" → grupo "Análise da Gelic" → DVI. O pedido
// tem de chegar ao agente pelo background (G1).
// A tela pode se mexer entre medir e clicar: na 2.9 do SEI Pro, a barra de botões do SEI (#collapseControle) ganha uma
// linha quando os botões do SEI Pro entram nela, depois da carga. Por isso o clique espera a posição parar (duas medidas
// iguais) e só vale se o mousedown cair no alvo: o mesmo elemento, ou um que case com o seletor se o alvo foi redesenhado.
// Se cair fora (ou não houver registro), mede de novo e repete.
const clicar = async seletor => {
  const sel = JSON.stringify(seletor);
  const medir = async armar => (await chamar('Runtime.evaluate', { returnByValue: true, expression: `(() => {
    const e = document.querySelector(${sel}); if (!e) return null;
    e.scrollIntoView({ block: 'center' });
    if (${armar}) {
      window.__gelicE2eAlvo = null;
      document.addEventListener('mousedown', ev => { window.__gelicE2eAlvo = e.isConnected ? e.contains(ev.target) : !!ev.target?.closest?.(${sel}); }, { capture: true, once: true });
    }
    const r = e.getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
  })()` }))?.result?.value;
  for (let tentativa = 1; tentativa <= 5; tentativa++) {
    let v = await medir(false);
    for (let i = 0; i < 10 && v; i++) { await espera(100); const w = await medir(false); if (w === v) break; v = w; }
    v = v && await medir(true);
    if (!v) throw new Error(`não achei ${seletor}`);
    const { x, y } = JSON.parse(v);
    for (const type of ['mousePressed', 'mouseReleased']) await chamar('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
    await espera(250);
    if ((await chamar('Runtime.evaluate', { returnByValue: true, expression: 'window.__gelicE2eAlvo' }))?.result?.value === true) return;
    console.error(`e2e: o clique em ${seletor} caiu fora do alvo (a tela se mexeu); de novo (${tentativa})`);
  }
  throw new Error(`o clique não acertou ${seletor} em 5 tentativas`);
};
const idExt = new URL(tela.ns.URL_SPRO).host;
const avaliar = async expression => (await chamar('Runtime.evaluate', { returnByValue: true, expression }))?.result?.value ?? null;
// Uma página da própria extensão, para ler e gravar o storage dela (a página do SEI não alcança o chrome.storage).
const abrirExtensao = async () => {
  const pag = await (await fetch(`http://127.0.0.1:${portaCdp}/json/new?chrome-extension://${idExt}/js/gelic/pca.html`, { method: 'PUT' })).json();
  const wsx = new WebSocket(pag.webSocketDebuggerUrl);
  await new Promise(r => wsx.addEventListener('open', r));
  const avaliarNela = expression => new Promise(res => {
    const meu = ++id;
    wsx.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === meu) { wsx.removeEventListener('message', f); res(m.result?.result?.value ?? null); } });
    wsx.send(JSON.stringify({ id: meu, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } }));
  });
  for (let i = 0; i < 20 && !(await avaliarNela('!!globalThis.chrome?.storage?.sync')); i++) await espera(200);
  return {
    avaliar: avaliarNela,
    lerConfig: async () => JSON.parse((await avaliarNela("chrome.storage.sync.get('dataValues').then(o => JSON.stringify(o))")) ?? '{}').dataValues,
    gravarConfig: dataValues => avaliarNela(dataValues === undefined ? "chrome.storage.sync.remove('dataValues').then(() => true)" : `chrome.storage.sync.set({ dataValues: ${JSON.stringify(dataValues)} }).then(() => true)`),
    fechar: async () => { wsx.close(); await fetch(`http://127.0.0.1:${portaCdp}/json/close/${pag.id}`); },
  };
};
/** Valor de uma opção no configGeral do SEI Pro (dataValues), e a configuração com a opção trocada. */
const opcaoNa = (dataValues, nome) => { try { return JSON.parse(dataValues).find(x => Array.isArray(x?.configGeral))?.configGeral.find(o => o?.name === nome)?.value; } catch { return undefined; } };
const comOpcao = (dataValues, nome, value) => {
  let lista; try { lista = JSON.parse(dataValues); } catch { lista = null; }
  if (!Array.isArray(lista)) lista = [];
  let g = lista.find(x => Array.isArray(x?.configGeral)); if (!g) { g = { configGeral: [] }; lista.push(g); }
  g.configGeral = g.configGeral.filter(o => o?.name !== nome).concat([{ name: nome, value }]);
  return JSON.stringify(lista);
};
// Novidades no selo: navegador novo, versão nunca vista. O clique abre a entrada da versão e grava a vista.
const versao = tela.ns?.VERSION_SPRO;
const novidades = { antes: await avaliar("document.querySelector('#gelic-selo .gelic-novidades a')?.textContent ?? null") };
if (novidades.antes) {
  await clicar('#gelic-selo .gelic-novidades a');
  novidades.escondido = await avaliar("document.querySelector('#gelic-selo .gelic-novidades')?.hidden ?? null");
  let abas = [];
  for (let i = 0; i < 20 && !abas.some(u => u.startsWith('https://sei-cfc.github.io/novidades/')); i++) { await espera(300); abas = (await alvos()).map(a => a.url); }
  novidades.aba = abas.find(u => u.startsWith('https://sei-cfc.github.io/novidades/')) ?? null;
  const ext = await abrirExtensao();
  novidades.vista = await ext.avaliar("chrome.storage.local.get('gelic_novidades_vista').then(o => o.gelic_novidades_vista ?? null)");
  await ext.fechar();
}
let pedido = null;
let motorNoPainel = null;
// cfc: só "Gerar documento" e "Próximo passo"; o seletor sem nenhuma peça da Gelic (DVI, contratos...).
let seloCfc = null;
let seloGelicBotoes = null;
if (PERFIL === 'cfc') {
  const botoes = JSON.parse(await avaliar("JSON.stringify([...document.querySelectorAll('#gelic-selo .gelic-acao')].map(b => b.dataset.acao))"));
  await clicar('#gelic-selo [data-acao=documento]');
  await clicar('#gelic-selo .gelic-docs details:first-of-type > summary');
  seloCfc = { botoes, ...JSON.parse(await avaliar("JSON.stringify({ docs: [...document.querySelectorAll('#gelic-selo [data-documento]')].map(b => b.dataset.documento), seletor: document.querySelector('#gelic-selo .gelic-docs')?.hidden === false ? document.querySelector('#gelic-selo .gelic-docs').textContent : null, acoes: document.querySelector('#gelic-selo .gelic-acoes')?.textContent ?? '', roteiro: document.querySelector('#gelic-selo .gelic-roteiro')?.textContent ?? null, passos: document.querySelectorAll('#gelic-selo .gelic-passo').length })")) };
  // A peça abre o formulário numa ABA da extensão (não o agente): clique de verdade em DFD.
  await clicar('#gelic-selo .gelic-docs [data-documento=dfd]');
  const urlPeca = `chrome-extension://${idExt}/js/gelic/peca.html?modelo=dfd&processo=`;
  let alvoPeca = null;
  for (let i = 0; i < 30 && !alvoPeca; i++) { await espera(400); alvoPeca = (await alvos()).find(a => a.type === 'page' && a.url.startsWith(urlPeca)) ?? null; }
  seloCfc.janela = alvoPeca ? { url: alvoPeca.url } : null;
  if (alvoPeca) {
    const ws4 = new WebSocket(alvoPeca.webSocketDebuggerUrl);
    await new Promise(r => ws4.addEventListener('open', r));
    for (let i = 0; i < 30; i++) {
      await espera(500);
      ws4.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { returnByValue: true, expression:
        "JSON.stringify({ campo: !!document.querySelector('[data-gelic-campo=justificativa]'), texto: document.body.innerText.slice(0, 2000) })" } }));
      const v = await new Promise(r => ws4.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === 1) { ws4.removeEventListener('message', f); r(m.result?.result?.value ?? null); } }));
      if (v) { Object.assign(seloCfc.janela, JSON.parse(v)); if (seloCfc.janela.campo || /Abra o processo/.test(seloCfc.janela.texto)) break; }
    }
    ws4.close();
    // fecha a aba da peça: a ponte atende uma página da extensão por vez
    await fetch(`http://127.0.0.1:${portaCdp}/json/close/${alvoPeca.id}`);
  }
  // "Verificar antes de enviar" abre a verificação prévia numa aba da extensão
  await clicar('#gelic-selo [data-acao=verificar]');
  const urlVer = `chrome-extension://${idExt}/js/gelic/verificar.html?processo=`;
  let alvoVer = null;
  for (let i = 0; i < 30 && !alvoVer; i++) { await espera(400); alvoVer = (await alvos()).find(a => a.type === 'page' && a.url.startsWith(urlVer)) ?? null; }
  seloCfc.verificacao = alvoVer ? { url: alvoVer.url } : null;
  if (alvoVer) {
    const ws5 = new WebSocket(alvoVer.webSocketDebuggerUrl);
    await new Promise(r => ws5.addEventListener('open', r));
    for (let i = 0; i < 30; i++) {
      await espera(500);
      ws5.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { returnByValue: true, expression: 'document.body.innerText.slice(0, 2000)' } }));
      const t = await new Promise(r => ws5.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === 1) { ws5.removeEventListener('message', f); r(m.result?.result?.value ?? ''); } }));
      seloCfc.verificacao.texto = t;
      if (/Processo \S+|Abra o processo/.test(t)) break;
    }
    ws5.close();
    await fetch(`http://127.0.0.1:${portaCdp}/json/close/${alvoVer.id}`);
  }
  // Linha da IA (opcional) no selo e a página "Configurar a IA" numa aba da extensão
  seloCfc.ia = await avaliar("document.querySelector('#gelic-selo .gelic-ia')?.textContent ?? null");
  await clicar('#gelic-selo [data-gelic-configurar-ia]');
  const urlIa = `chrome-extension://${idExt}/js/gelic/configurar-ia.html`;
  let alvoIa = null;
  for (let i = 0; i < 30 && !alvoIa; i++) { await espera(400); alvoIa = (await alvos()).find(a => a.type === 'page' && a.url.startsWith(urlIa)) ?? null; }
  seloCfc.paginaIa = null;
  if (alvoIa) {
    const ws6 = new WebSocket(alvoIa.webSocketDebuggerUrl);
    await new Promise(r => ws6.addEventListener('open', r));
    for (let i = 0; i < 30 && !(seloCfc.paginaIa?.colunas === 2); i++) {
      await espera(400);
      ws6.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { returnByValue: true, expression: "JSON.stringify({ colunas: document.querySelectorAll('[data-gelic-servico]').length, titulo: document.querySelector('h1')?.textContent ?? '' })" } }));
      const v = await new Promise(r => ws6.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === 1) { ws6.removeEventListener('message', f); r(m.result?.result?.value ?? null); } }));
      if (v) seloCfc.paginaIa = JSON.parse(v);
    }
    ws6.close();
    await fetch(`http://127.0.0.1:${portaCdp}/json/close/${alvoIa.id}`);
  }
} else {
  seloGelicBotoes = JSON.parse(await avaliar("JSON.stringify([...document.querySelectorAll('#gelic-selo .gelic-acao')].map(b => b.dataset.acao))"));
  await clicar('#gelic-selo [data-acao=documento]');
  await clicar('#gelic-selo .gelic-docs details:first-of-type > summary');
  await clicar('#gelic-selo .gelic-docs [data-documento=dvi]');
  await espera(800);
}
// O painel lateral abre (sidePanel.open com o gesto do clique), o agente consome o pedido e,
// sem chave de IA neste perfil de teste, deixa o texto na caixa de mensagem.
for (let i = 0; i < 30 && !pedido && PERFIL === 'gelic'; i++) {
  await espera(500);
  const painel = (await alvos()).find(a => a.type === 'page' && a.url === `chrome-extension://${idExt}/html/painel.html`);
  if (!painel) continue;
  const ws2 = new WebSocket(painel.webSocketDebuggerUrl);
  await new Promise(r => ws2.addEventListener('open', r));
  ws2.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { returnByValue: true, expression:
    "(() => { for (const f of document.querySelectorAll('iframe')) { const t = f.contentDocument?.querySelector('textarea[aria-label=Mensagem]'); if (t?.value) return t.value; } return null; })()" } }));
  pedido = await new Promise(r => ws2.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id === 1) r(m.result?.result?.value ?? null); }));
  if (pedido) {
    // O motor de modelos é um pedaço carregado sob demanda: carrega-o de dentro do agente, na extensão
    // de verdade (CSP e caminho relativo), e confere os 20 modelos.
    ws2.send(JSON.stringify({ id: 2, method: 'Runtime.evaluate', params: { awaitPromise: true, returnByValue: true, expression: `(async () => {
      const js = await (await fetch(chrome.runtime.getURL('js/agente/painel.js'))).text();
      const nome = js.match(/motor-[A-Z0-9]+\\.js/)[0];
      const m = await import(chrome.runtime.getURL('js/agente/' + nome));
      const lista = Object.values(m).filter(v => typeof v === 'function').map(f => { try { return f(); } catch { return null; } }).find(v => Array.isArray(v) && v.length && v[0] && 'origem' in v[0]);
      return JSON.stringify({ nome, modelos: lista ? lista.length : -1 });
    })()` } }));
    motorNoPainel = await new Promise(r => ws2.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id === 2) r(typeof m.result?.result?.value === 'string' ? m.result.result.value : JSON.stringify({ erro: JSON.stringify(m.result ?? m.error).slice(0, 600) })); }));
  }
  ws2.close();
}

if (process.env.GELIC_PRINT) {
  await chamar('Emulation.setDeviceMetricsOverride', { width: 340, height: 640, deviceScaleFactor: 2, mobile: false });
  const { data } = await chamar('Page.captureScreenshot', { format: 'png' });
  (await import('node:fs')).writeFileSync(process.env.GELIC_PRINT, Buffer.from(data, 'base64'));
}
// SEI Pro 2.9: Demandas e Projetos vêm desligadas nas nossas extensões (src/padroes.ts). Depois das primeiras páginas
// do SEI, a configuração tem as duas desligadas e os painéis não aparecem. Contraprova: ligar Demandas nas Configurações
// (o mesmo storage) e recarregar faz o painel aparecer, e a extensão não volta a desligar.
const urlControle = `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_controlar`;
const paineisSeiPro = "JSON.stringify({ demandas: !!document.getElementById('demandasPro'), projetos: !!document.getElementById('projetosPro') })";
const abrirControle = async () => {
  await chamar('Page.navigate', { url: urlControle });
  for (let i = 0; i < 30 && !(await avaliar('document.documentElement.dataset.gelic ?? null')); i++) await espera(300);
};
let padroes = null;
{
  const ext = await abrirExtensao();
  const original = await ext.lerConfig();
  await abrirControle();
  await espera(2500); // tempo para os módulos do SEI Pro montarem os painéis, se fossem montar
  const paineis = JSON.parse(await avaliar(paineisSeiPro));
  await ext.gravarConfig(comOpcao(original, 'gerenciardemandas', true));
  await abrirControle();
  let religada = false;
  for (let i = 0; i < 30 && !religada; i++) { await espera(300); religada = JSON.parse(await avaliar(paineisSeiPro)).demandas; }
  const continuaLigada = opcaoNa(await ext.lerConfig(), 'gerenciardemandas');
  await ext.gravarConfig(original);
  await ext.fechar();
  padroes = { config: { demandas: opcaoNa(original, 'gerenciardemandas'), projetos: opcaoNa(original, 'gerenciarprojetos') }, paineis, religada, continuaLigada };
}
// Controle de Processos (a caixa real do SEI 4.1): barra da Gelic e "Calcular etapas" com clique de verdade.
await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_controlar` });
let controle = null;
for (let i = 0; i < 30 && !controle; i++) {
  await espera(400);
  controle = (await chamar('Runtime.evaluate', { returnByValue: true, expression: "document.getElementById('gelic-controle') ? document.querySelector('#gelic-controle .gelic-ctl-calcular').textContent : null" }))?.result?.value ?? null;
}
const antesDeCalcular = controle;
// Pesquisa rápida do SEI Pro (2.9) no navegador de verdade: a opção vem desligada; liga pelo storage (como a página de
// opções), digita no campo do SEI o número de um processo comum (não o sigiloso, P157584, nem o que já tem etapa pelo
// selo, P148265) e confere a contagem do "Calcular etapas" nas duas direções;
// depois devolve o storage como estava.
let pesquisaRapida = null;
if (PERFIL === 'gelic' && controle) {
  const ext = await abrirExtensao();
  const original = await ext.lerConfig();
  await ext.gravarConfig(comOpcao(original, 'filtrarpaginapelapesquisarapida', true));
  const rotulo = () => avaliar("document.querySelector('#gelic-controle .gelic-ctl-calcular')?.textContent ?? null");
  const esperarRotulo = async esperado => { let v = null; for (let i = 0; i < 25 && v !== esperado; i++) { await espera(200); v = await rotulo(); } return v; };
  let ligada = false;
  for (let i = 0; i < 25 && !ligada; i++) { await espera(200); ligada = !!(await avaliar("document.getElementById('txtPesquisaRapida')?.title?.startsWith('Digite para filtrar')")); }
  const numero = await avaliar(`document.querySelector('tr#P150098 a[href*="acao=procedimento_trabalhar"]')?.textContent?.trim() ?? null`);
  await avaliar("document.getElementById('txtPesquisaRapida').focus()");
  await chamar('Input.insertText', { text: numero ?? 'nada' });
  const filtrada = await esperarRotulo('Calcular etapas (1)');
  for (const type of ['keyDown', 'keyUp']) await chamar('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  const limpa = await esperarRotulo('Calcular etapas (8)');
  await ext.gravarConfig(original);
  await ext.fechar();
  for (let i = 0; i < 25 && (await avaliar("document.getElementById('txtPesquisaRapida')?.title?.startsWith('Digite para filtrar')")); i++) await espera(200);
  pesquisaRapida = { ligada, numero: !!numero, filtrada, limpa };
}
// Grade nova do SEI Pro 3.x: com ela aberta (atributo no <html>), a barra da Gelic fica só com o aviso da visão nativa,
// e o "Iniciar processo" (cfc) continua à vista. O atributo é posto à mão: a grade abre só com o clique da pessoa.
const comGrade = JSON.parse(await avaliar(`(() => {
  const h = document.documentElement; h.setAttribute('data-spro-grade', ''); h.setAttribute('data-spro-grade-pronta', '');
  const vis = s => { const e = document.querySelector(s); return e ? e.checkVisibility() : null; };
  const r = { aviso: vis('#gelic-controle .gelic-ctl-grade'), calcular: vis('#gelic-controle .gelic-ctl-calcular'), chips: vis('#gelic-controle .gelic-ctl-chips'), iniciar: vis('#gelic-iniciar') };
  h.removeAttribute('data-spro-grade'); h.removeAttribute('data-spro-grade-pronta');
  r.avisoSemGrade = vis('#gelic-controle .gelic-ctl-grade');
  return JSON.stringify(r);
})()`));
const botaoPca = await avaliar("!!document.querySelector('#gelic-controle .gelic-ctl-pca')");
// No cfc a espera acima (12 s) é o tempo que a barra teria para aparecer.
const controleCfc = PERFIL === 'cfc' ? await avaliar("!!document.getElementById('gelic-controle')") : null;
// SEI CFC: "Iniciar processo" no Controle de Processos (o SEI de mentira não tem a tela de tipos: o diálogo abre e avisa)
let iniciarCfc = null;
if (PERFIL === 'cfc') {
  const botao = await avaliar("!!document.getElementById('gelic-iniciar')");
  if (botao) await clicar('#gelic-iniciar');
  await espera(800);
  iniciarCfc = { botao, dialogo: await avaliar("!!document.querySelector('#gelic-iniciar-dialogo [name=objeto]')") };
}
// O processo 148265 foi aberto acima (selo da árvore): a etapa dele já veio guardada, sem requisição.
const doSelo = (await chamar('Runtime.evaluate', { returnByValue: true, expression: "document.querySelector('tr#P148265 .gelic-etapa-linha')?.textContent ?? null" }))?.result?.value ?? null;
if (controle) await clicar('#gelic-controle .gelic-ctl-calcular');
let etiquetas = [];
for (let i = 0; i < 100 && PERFIL === 'gelic'; i++) { // até 40 s: 10 processos, 3 por vez, Chromium headless pode estar lento
  await espera(400);
  etiquetas = JSON.parse((await chamar('Runtime.evaluate', { returnByValue: true, expression: "JSON.stringify([...document.querySelectorAll('.gelic-etapa-linha')].map(p => p.textContent))" })).result.value);
  if (etiquetas.filter(t => /aguardando a unidade/.test(t)).length >= 9) break;
}
// O agente do pacote, na extensão de verdade: o perfil que o bundle lê (manifest) e as ferramentas de escrita
// que ele oferece em "Nova regra" (lista montada de TOOLS_SEI, onde o gancho G2 põe as da Gelic já filtradas).
const nova = await (await fetch(`http://127.0.0.1:${portaCdp}/json/new?chrome-extension://${idExt}/html/agente.html`, { method: 'PUT' })).json();
const ws3 = new WebSocket(nova.webSocketDebuggerUrl);
await new Promise(r => ws3.addEventListener('open', r));
const noAgente = expression => new Promise(res => {
  const meu = ++id;
  ws3.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === meu) { ws3.removeEventListener('message', f); res(m.result?.result?.value ?? null); } });
  ws3.send(JSON.stringify({ id: meu, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } }));
});
let agente = null;
for (let i = 0; i < 20 && !agente?.escritas?.length; i++) {
  await espera(500);
  const v = await noAgente(`(async () => { const m = chrome.runtime.getManifest();
    document.querySelector('button[aria-label="Configura\\u00e7\\u00e3o"]')?.click(); await new Promise(r => setTimeout(r, 400));
    [...document.querySelectorAll('button')].find(b => b.textContent === 'Nova regra')?.click(); await new Promise(r => setTimeout(r, 300));
    return JSON.stringify({ nome: m.name, perfil: m.sei_pro_perfil ?? null, escritas: [...document.querySelectorAll('select[aria-label="A\\u00e7\\u00f5es alcan\\u00e7adas"] option')].map(o => o.value) }); })()`);
  if (v) agente = JSON.parse(v);
}
ws3.close();

if (process.env.GELIC_PRINT_CONTROLE) {
  await chamar('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await chamar('Runtime.evaluate', { expression: "document.getElementById('gelic-controle').scrollIntoView()" });
  await espera(300);
  const { data } = await chamar('Page.captureScreenshot', { format: 'png' });
  (await import('node:fs')).writeFileSync(process.env.GELIC_PRINT_CONTROLE, Buffer.from(data, 'base64'));
}
// Configuração do PCA (página da extensão): sem token guardado, nada sai pela rede.
const pagPca = await (await fetch(`http://127.0.0.1:${portaCdp}/json/new?chrome-extension://${idExt}/js/gelic/pca.html`, { method: 'PUT' })).json();
const ws5 = new WebSocket(pagPca.webSocketDebuggerUrl);
await new Promise(r => ws5.addEventListener('open', r));
let configPca = null;
for (let i = 0; i < 20 && !configPca; i++) {
  await espera(300);
  ws5.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { returnByValue: true, expression: "document.querySelector('[data-gelic-pca=status]') ? JSON.stringify({ status: document.querySelector('[data-gelic-pca=status]').textContent, token: document.querySelector('[data-gelic-pca=token]')?.type ?? null }) : null" } }));
  const v = await new Promise(r => ws5.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === 1) { ws5.removeEventListener('message', f); r(m.result?.result?.value ?? null); } }));
  if (v) configPca = JSON.parse(v);
}
const naConfig = expression => new Promise(res => {
  const meu = ++id;
  ws5.addEventListener('message', function f(ev) { const m = JSON.parse(ev.data); if (m.id === meu) { ws5.removeEventListener('message', f); res(m.result?.result?.value ?? null); } });
  ws5.send(JSON.stringify({ id: meu, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } }));
});
// Liga ao PCA de mentira pela própria página (fetch com a origem da extensão): endereço, token e "Testar e guardar".
const URL_PCA = `https://pca.teste.org.br:${portaPca}`;
await naConfig(`(() => { const u = document.querySelector('[data-gelic-pca=url]'); u.value = ${JSON.stringify(URL_PCA)};
  document.querySelector('[data-gelic-pca=token]').value = 'e2e'; document.querySelector('[data-gelic-acao=salvar]').click(); })()`);
let conectado = null;
for (let i = 0; i < 20 && !/Conectado|Não guardado/.test(conectado ?? ''); i++) { await espera(300); conectado = await naConfig("document.querySelector('[data-gelic-pca=status]').textContent"); }
// O selo, de novo, agora com o PCA: o item e, no SEI CFC Gelic (pode enviar), a coleta enviada.
await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_visualizar&id_procedimento=148265` });
let linhaPca = null;
for (let i = 0; i < 40; i++) {
  await espera(400);
  linhaPca = await avaliar("document.querySelector('#gelic-selo .gelic-pca')?.textContent ?? null");
  if (linhaPca && !/consultando|enviando/.test(linhaPca)) break;
}
// SEI CFC: a situação da instrução vai aos dados da contratação do item (GET e PUT /ficha) logo depois da linha do PCA
if (PERFIL === 'cfc') {
  for (let i = 0; i < 20; i++) {
    const p = JSON.parse(await naConfig(`fetch(${JSON.stringify(URL_PCA + '/api/sei/_pedidos')}).then(r => r.text())`) ?? '[]');
    if (p.some(x => x.metodo === 'PUT' && x.caminho === '/api/sei/ficha')) break;
    await espera(300);
  }
}
const pedidosPca = JSON.parse(await naConfig(`fetch(${JSON.stringify(URL_PCA + '/api/sei/_pedidos')}).then(r => r.text())`) ?? '[]');
const historicoE2e = JSON.parse((await chamar('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `fetch('controlador.php?acao=procedimento_consultar_historico').then(r => r.text()).then(t => { const d = new DOMParser().parseFromString(t, 'text/html'); return JSON.stringify([...d.querySelectorAll('#tblHistorico tr')].filter(tr => tr.querySelector('td')).length); })` }))?.result?.value ?? 'null');
const docsArvore = await avaliar("document.querySelectorAll('a[id^=anchor]:not([id^=anchorA]):not([id^=anchorImg])').length");
ws5.close();
// Controle de Processos com o PCA ligado: "Atualizar PCA" na barra da Gelic (só quem pode enviar).
await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_controlar` });
let botaoPcaLigado = false;
for (let i = 0; i < 25 && !botaoPcaLigado; i++) { await espera(400); botaoPcaLigado = !!(await avaliar("!!document.querySelector('#gelic-controle .gelic-ctl-pca')")); }
// Marca um processo na caixa de seleção do próprio SEI (clique de verdade): o botão passa a atualizar só ele.
let rotuloMarcado = null;
if (botaoPcaLigado) {
  await clicar('#tblProcessosRecebidos input.infraCheckboxInput:not([disabled])');
  rotuloMarcado = await avaliar("document.querySelector('#gelic-controle .gelic-ctl-pca').textContent");
}

// SEI CFC com o PCA ligado: "Buscar no PCA" (fetch da página, CORS) põe objeto e via; a prévia confere a permissão
// de vincular no /saude. O SEI de mentira não tem a tela de tipos: o tipo de processo é posto à mão no select.
let iniciarPca = null;
if (PERFIL === 'cfc') {
  if (await avaliar("!!document.getElementById('gelic-iniciar')")) await clicar('#gelic-iniciar');
  await espera(800);
  await avaliar(`(() => { const c = document.getElementById('gelic-iniciar-dialogo'); c.querySelector('[name=item_pca]').value = '37'; c.querySelector('[name=exercicio]').value = '2026';
    c.querySelector('[data-gelic-acao=buscar-pca]').click(); return true; })()`);
  let via = null;
  for (let i = 0; i < 20 && via !== 'dispensa'; i++) { await espera(300); via = await avaliar("document.querySelector('#gelic-iniciar-dialogo [name=via] option[selected]')?.value ?? null"); }
  const objeto = await avaliar("document.querySelector('#gelic-iniciar-dialogo [name=objeto]').value");
  await avaliar(`(() => { const c = document.getElementById('gelic-iniciar-dialogo'); c.querySelector('[name=tipo_processo]').innerHTML = '<option value="10" selected>Contratação</option>';
    c.querySelector('[data-gelic-acao=previa]').click(); return true; })()`);
  let vinculo = null;
  for (let i = 0; i < 20 && !vinculo; i++) { await espera(300); vinculo = await avaliar("document.querySelector('#gelic-iniciar-dialogo [data-gelic-pca=vinculo]')?.textContent ?? null"); }
  iniciarPca = { via, objeto, vinculo };
}

// "Iniciar processo" pela ficha do item no PCA (pca.sistemascfc.org → PCA de mentira): o cfc põe o botão e o clique
// abre uma aba no SEI de produção (endereço fixo; aqui ela não carrega). O e2e confere a aba, leva esta aba ao Controle
// de Processos do SEI de mentira e vê o diálogo abrir sozinho, travado no item.
await chamar('Page.navigate', { url: `https://pca.sistemascfc.org:${portaPca}/pca/2026/37/` });
let botaoNoPca = false;
for (let i = 0; i < 20 && !botaoNoPca; i++) { await espera(300); botaoNoPca = !!(await avaliar("!!document.getElementById('gelic-pca-iniciar')")); }
let peloPca = null;
if (PERFIL === 'cfc' && botaoNoPca) {
  const antes = new Set((await alvos()).map(a => a.id));
  await clicar('#gelic-pca-iniciar');
  let abaSei = null;
  for (let i = 0; i < 20 && !abaSei; i++) { await espera(300); abaSei = (await alvos()).find(a => a.type === 'page' && !antes.has(a.id))?.url ?? null; }
  await chamar('Page.navigate', { url: `http://sei.cfc.org.br:${portaWeb}/sei/controlador.php?acao=procedimento_controlar` });
  let dialogo = null;
  for (let i = 0; i < 30 && !dialogo?.objeto; i++) {
    await espera(400);
    const v = await avaliar(`(() => { const c = document.getElementById('gelic-iniciar-dialogo'); if (!c) return null;
      const i = c.querySelector('[name=item_pca]'); return JSON.stringify({ item: i?.value ?? null, travado: !!i?.hasAttribute('readonly'),
      objeto: c.querySelector('[name=objeto]')?.value ?? null, status: c.querySelector('.gelic-ini-status')?.textContent ?? '' }); })()`);
    if (v) dialogo = JSON.parse(v);
  }
  peloPca = { abaSei, dialogo };
}
// O mesmo SEI noutro órgão: as extensões só rodam no SEI do CFC (manifest gerado).
await chamar('Page.navigate', { url: `http://sei.outro.gov.br:${portaWeb}/sei/controlador.php?acao=procedimento_visualizar&id_procedimento=148265` });
await espera(3000);
const foraDoCfc = JSON.parse(await avaliar("JSON.stringify({ gelic: document.documentElement.dataset.gelic ?? null, selo: !!document.getElementById('gelic-selo'), legado: !!sessionStorage.getItem('new_extension') })"));
ws.close();

let n = 0;
const ok = (nome, fn) => { fn(); console.log(`OK ${++n}: ${nome}`); };
ok('script da Gelic injetado na tela do SEI', () => assert.match(tela.gelic ?? '', /^r\d+$/));
ok('legado do SEI Pro rodando com o namespace do Lab', () => assert.equal(tela.ns?.NAMESPACE_SPRO, 'SEI Pro Lab'));
ok(`versão Gelic (4 números) e ícones do perfil ${PERFIL} vistos pelo legado`, () => {
  assert.match(tela.ns.VERSION_SPRO, /^\d+\.\d+\.\d+\.\d+$/);
  assert.equal(tela.ns.ICON_SPRO['32'], `icons/${PERFIL}/icon-32.png`);
});
ok(`pacote "${NOMES[PERFIL]}": nome e perfil lidos em tempo de execução (runtime.getManifest) pelo agente`, () => {
  assert.ok(agente, 'a página do agente não respondeu');
  assert.equal(agente.nome, NOMES[PERFIL]);
  assert.equal(agente.perfil, PERFIL === 'gelic' ? null : PERFIL, 'o Chrome carrega a chave sei_pro_perfil e a devolve');
});
ok('SEI Pro continua injetando o menu', () => assert.ok(tela.menu >= 1));
ok('fora do SEI do CFC (o mesmo SEI noutro órgão), nem a Gelic nem o legado entram', () => assert.deepEqual(foraDoCfc, { gelic: null, selo: false, legado: false }));
ok(`selo do perfil ${PERFIL} no topo da árvore, com a etapa pelos títulos`, () => {
  assert.ok(selo, 'selo não apareceu');
  assert.equal(selo.primeiro, true);
  assert.equal(selo.etapa, 'preparatoria_aguarda_unidade');
  assert.equal(selo.tom, 'espera');
  assert.match(selo.texto, /Preparatória · aguardando a unidade/);
  assert.ok(selo.logo > 0, 'a logo do perfil não carregou no selo');
});
ok('PCA sem configuração: nenhuma linha no selo, só o convite "Ligar ao PCA" no detalhe; a página de configuração abre', () => {
  assert.deepEqual(pcaNoSelo, { convite: true, linha: null });
  assert.match(configPca?.status ?? '', /Sem configuração: nada é enviado ao PCA/);
  assert.equal(configPca.token, 'password');
});
ok(`PCA ligado (página da extensão): "Testar e guardar" conecta ao PCA de mentira`, () => assert.match(conectado ?? '', /Conectado como e2e@cfc\.org\.br · pode enviar/));
ok(`PCA no selo: GET do vínculo pelo content script (origem do SEI, Bearer, sem cookies)${PERFIL === 'gelic' ? ' e a coleta enviada (histórico completo e todos os documentos)' : '; o CFC nunca envia'}`, () => {
  const gets = pedidosPca.filter(p => p.caminho === '/api/sei/processo');
  assert.ok(gets.length >= 1, JSON.stringify(pedidosPca));
  assert.equal(gets[0].origem, `http://sei.cfc.org.br:${portaWeb}`, 'o fetch sai do content script, com a origem do SEI');
  assert.equal(gets[0].auth, 'Bearer e2e');
  assert.equal(gets[0].cookie, null, 'nenhum cookie vai ao PCA');
  const posts = pedidosPca.filter(p => p.metodo === 'POST');
  if (PERFIL === 'cfc') {
    assert.equal(posts.length, 0);
    assert.equal(linhaPca, 'PCA: item 37/2026 · Em andamento');
    return;
  }
  assert.equal(posts.length, 1, `${JSON.stringify(pedidosPca.map(p => p.caminho))} · selo: ${linhaPca}`);
  const c = posts[0].corpo;
  assert.match(c.numero, /\d/);
  assert.equal(c.andamentos.length, historicoE2e, 'o histórico inteiro, linha a linha');
  assert.ok(c.andamentos.every(a => a.data_hora && 'unidade' in a && a.descricao));
  assert.ok(c.documentos.length >= 4, `todos os documentos da árvore (${c.documentos.length}; âncoras ${docsArvore})`);
  assert.ok(c.documentos.every(d => d.conteudo === 'nao_lido' && d.motivo === 'nao_contratual' && d.html === null), 'nenhum contratual nesta árvore: nada lido');
  assert.equal(linhaPca, 'PCA: item 37/2026 · Em andamento · atualizado: situação');
});
ok('selo abre com o próximo passo e os documentos reconhecidos (nº SEI)', () => {
  assert.equal(aberto.visivel, true);
  assert.match(aberto.texto, /Próximo passo/);
  assert.match(aberto.texto, /Despacho de Verificação Inicial - DVI \(0103991\)/);
});
ok('SEI Pro 2.9: Demandas e Projetos desligadas por padrão (sem painéis); religada nas Configurações, a escolha vale', () => {
  assert.deepEqual(padroes, { config: { demandas: false, projetos: false }, paineis: { demandas: false, projetos: false }, religada: true, continuaLigada: true });
});
if (PERFIL === 'gelic') ok('gelic: sem "Verificar antes de enviar" no selo (a verificação prévia é do SEI CFC)', () => {
  assert.deepEqual(seloGelicBotoes, ['analisar', 'pendencias', 'documento', 'proximo']);
});
ok('gancho G4: a instalação abre a página do perfil no site, e não o seipro.app', () => {
  assert.ok(abasDaInstalacao.includes(paginaDoPerfil), JSON.stringify(abasDaInstalacao));
  assert.ok(!abasDaInstalacao.some(u => u.includes('seipro.app')), JSON.stringify(abasDaInstalacao));
});
ok('Novidades no selo: aviso da versão; o clique abre a entrada dela no site, esconde o aviso e grava a versão vista', () => {
  const ancora = `#v${versao.replaceAll('.', '-')}`;
  assert.deepEqual(novidades, { antes: `Novidades da versão ${versao}`, escondido: true, aba: `https://sei-cfc.github.io/novidades/${ancora}`, vista: versao });
});
if (PERFIL === 'cfc') {
  ok('cfc: selo só com Gerar documento e Próximo passo; nada de Analisar ou Pendências', () => {
    assert.deepEqual(seloCfc.botoes, ['documento', 'verificar', 'proximo']);
    assert.doesNotMatch(seloCfc.acoes, /Pendências|Analisar/);
  });
  ok('cfc: Gerar documento abre o seletor com as peças do demandante (DFD, termos, mapa, memorando ao Delic), ETP e TR no Compras.gov.br, sem DVI, Gecont nem contratos', () => {
    assert.deepEqual(seloCfc.docs, ['dfd', 'termos_cientificacao', 'mapa_precos', 'despacho_delic']);
    assert.match(seloCfc.seletor ?? '', /Peças do demandante \(4\)/);
    assert.match(seloCfc.seletor, /ETP — Estudo Técnico Preliminar — feito no Compras\.gov\.br/);
    assert.match(seloCfc.seletor, /TR — Termo de Referência — feito no Compras\.gov\.br/);
    assert.doesNotMatch(seloCfc.seletor, /em breve|DVI|Gecont|Contrato|aditivo/i);
  });
  ok('cfc: roteiro da instrução no selo (andamento, próxima peça) e os 12 passos no detalhe', () => {
    assert.match(seloCfc.roteiro ?? '', /Instrução: \d+ de 8 peças obrigatórias/, String(seloCfc.roteiro));
    assert.match(seloCfc.roteiro, /Próxima peça: /);
    assert.equal(seloCfc.passos, 12);
  });
  // Limite do SEI de mentira: ele não responde à ponte do agente, então a janela mostra a mensagem de aba em vez do
  // formulário. A gravação e o formulário ficam com os testes de unidade (tests/peca.ts) e o teste no SEI real.
  ok('cfc: a peça abre o formulário numa aba da extensão (formulário ou a mensagem de aba do processo)', () => {
    assert.ok(seloCfc.janela, 'a aba do formulário (peca.html?modelo=dfd) não abriu');
    assert.match(seloCfc.janela.texto ?? '', /DFD — Documento de Formalização da Demanda/);
    assert.ok(seloCfc.janela.campo || /Abra o processo \S+ no SEI/.test(seloCfc.janela.texto), seloCfc.janela.texto);
  });
  ok('cfc: "Verificar antes de enviar" abre a verificação prévia numa aba da extensão (a tela ou a mensagem de aba do processo)', () => {
    assert.ok(seloCfc.verificacao, 'a aba verificar.html não abriu');
    assert.match(seloCfc.verificacao.texto ?? '', /Verificação prévia/);
    assert.ok(/Processo \S+/.test(seloCfc.verificacao.texto) || /Abra o processo \S+ no SEI/.test(seloCfc.verificacao.texto), seloCfc.verificacao.texto);
  });
  ok('cfc: linha "IA (opcional)" no selo; "Configurar" abre a página com OpenRouter e Anthropic lado a lado', () => {
    assert.match(seloCfc.ia ?? '', /^IA \(opcional\): não configurada neste navegador/, String(seloCfc.ia));
    assert.deepEqual(seloCfc.paginaIa, { colunas: 2, titulo: 'Configurar a IA (opcional)' });
  });
  ok('cfc: agente sem as ferramentas de escrita da Gelic (gelic_dvi_gravar, gelic_documento_gravar), com a do demandante', () => {
    assert.ok(agente.escritas.includes('documento_criar'), 'as do SEI Pro continuam');
    assert.deepEqual(agente.escritas.filter(n => n.startsWith('gelic_')), []);
    assert.ok(agente.escritas.includes('cfc_documento_gravar'));
  });
  ok('cfc: sem a barra de etapas da Gelic no Controle de Processos', () => assert.equal(controleCfc, false));
  ok('cfc: com a grade nova do SEI Pro 3.x aberta, o "Iniciar processo" continua à vista', () => assert.equal(comGrade.iniciar, true, JSON.stringify(comGrade)));
  ok('cfc: "Iniciar processo" no Controle de Processos abre o diálogo das perguntas', () => assert.deepEqual(iniciarCfc, { botao: true, dialogo: true }));
  ok('cfc: "Iniciar processo" busca o item no PCA (objeto e via pela modalidade) e a prévia anuncia o vínculo', () => {
    assert.equal(iniciarPca?.objeto, 'Objeto de teste', JSON.stringify(iniciarPca));
    assert.equal(iniciarPca.via, 'dispensa');
    assert.match(iniciarPca.vinculo ?? '', /^Depois de criado, o nº do processo é vinculado ao item 37\/2026 no PCA/);
  });
  ok('cfc: "Iniciar processo" na ficha do item do PCA abre o SEI e o diálogo travado no item, já preenchido', () => {
    assert.ok(botaoNoPca, 'o botão não apareceu na ficha do PCA');
    assert.match(peloPca?.abaSei ?? '', /^https:\/\/sei\.cfc\.org\.br\/sei\//, JSON.stringify(peloPca));
    assert.deepEqual({ ...peloPca.dialogo, status: undefined }, { item: '37', travado: true, objeto: 'Objeto de teste', status: undefined }, peloPca.dialogo?.status);
  });
  ok('cfc: abrir o processo grava a situação da instrução nos dados da contratação do item (PUT /ficha com a versão, do content script)', () => {
    const puts = pedidosPca.filter(p => p.metodo === 'PUT' && p.caminho === '/api/sei/ficha');
    assert.ok(puts.length >= 1, JSON.stringify(pedidosPca.map(p => `${p.metodo} ${p.caminho}`)));
    const c = puts[0].corpo;
    assert.deepEqual([c.item_pca, c.exercicio, c.versao, c.dados.esquema], [37, 2026, 0, 1]);
    const [numero, s] = Object.entries(c.dados.situacao)[0];
    assert.match(numero, /\d/);
    assert.equal(s.passos.length, 12, JSON.stringify(s));
    assert.ok(s.passos.every(p => p.chave && p.rotulo && ['feito', 'em_elaboracao', 'falta'].includes(p.estado)));
    assert.equal(puts[0].auth, 'Bearer e2e');
    assert.equal(puts[0].origem, `http://sei.cfc.org.br:${portaWeb}`);
  });
  console.log(`\n${n} verificações de ponta a ponta (perfil cfc) passaram.`);
  process.exit(0);
}
ok('agente da Gelic com as ferramentas de escrita dela (gelic_dvi_gravar, gelic_documento_gravar)', () => {
  for (const t of ['gelic_dvi_gravar', 'gelic_documento_gravar']) assert.ok(agente.escritas.includes(t), t);
  assert.ok(!agente.escritas.some(n => n.startsWith('cfc_')), 'nada do cfc no pacote da Gelic');
});
ok('Gerar documento → DVI abre o painel e o pedido chega ao agente (gancho G1), com a skill e o processo', () => {
  assert.ok(pedido, 'o pedido não chegou à caixa de mensagem do agente');
  assert.match(pedido, /skill gelic-gerar-dvi/);
  assert.match(pedido, /processo \S+/);
});
ok('Controle de Processos: com a pesquisa rápida do SEI Pro (2.9), "Calcular etapas" conta só o que está à vista e volta ao limpar', () => {
  assert.deepEqual(pesquisaRapida, { ligada: true, numero: true, filtrada: 'Calcular etapas (1)', limpa: 'Calcular etapas (8)' });
});
if (PERFIL === 'gelic') ok('Controle de Processos × grade nova do SEI Pro 3.x: com a grade aberta, a barra só mostra o aviso; sem ela, o aviso some', () => {
  assert.deepEqual({ ...comGrade, iniciar: undefined }, { aviso: true, calcular: false, chips: false, avisoSemGrade: false, iniciar: undefined }, JSON.stringify(comGrade));
});
ok('Controle de Processos: barra da Gelic sem requisição; "Calcular etapas" põe a etapa em cada processo (não no sigiloso)', () => {
  assert.equal(doSelo, 'Preparatória · aguardando a unidade', 'o processo visto pela árvore já chega com a etapa guardada pelo selo');
  assert.equal(antesDeCalcular, 'Calcular etapas (8)', '10 processos − 1 sigiloso − 1 já guardado pelo selo');
  assert.equal(etiquetas.filter(t => /Preparatória · aguardando a unidade/.test(t)).length, 9, JSON.stringify(etiquetas));
  assert.ok(etiquetas.some(t => /Sigiloso/.test(t)));
});
ok('Controle de Processos: "Atualizar PCA" só com o PCA ligado (antes, nada); com processo marcado na caixa do SEI, só ele', () => {
  assert.equal(botaoPca, false);
  assert.equal(botaoPcaLigado, true);
  assert.equal(rotuloMarcado, 'Atualizar PCA (1 marcado)');
});
if (PERFIL === 'gelic') ok('gelic: a ficha do item no PCA fica sem botão (o "Iniciar processo" é do SEI CFC)', () => assert.equal(botaoNoPca, false));
if (PERFIL === 'gelic') ok('gelic: nunca grava nos dados da contratação (a situação é do SEI CFC)', () => assert.equal(pedidosPca.filter(p => p.caminho === '/api/sei/ficha').length, 0));
ok('motor de modelos carrega sob demanda dentro do agente (20 modelos)', () => {
  const r = JSON.parse(motorNoPainel ?? '{}');
  assert.equal(r.modelos, 20, motorNoPainel);
});
console.log(`\n${n} verificações de ponta a ponta passaram.`);
