import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import type { Http, Pagina } from '../../sei-nucleo/src/sessao/http';
import { ErroSei } from '../../sei-nucleo/src/sessao/erros';
import { CHAVE_ETAPAS, desatualizada, guardarEtapas, LIMITE, lerEtapas, type Area, type MapaEtapas } from '../src/controle/cache';
import { CONCORRENCIA, iniciarControle } from '../src/controle/controle';
import { ID_BARRA, linhas } from '../src/controle/view';
import { classeDaPesquisaRapida, teste } from './util';

const ler = (rel: string) => readFileSync(new URL(rel, import.meta.url), 'utf8');
const CAIXA = ler('../../sei-nucleo/tests/fixtures/sei41/caixa.html');
/** Árvore do e2e: DFD, ETP, TR e DVI, sem pastas → "Preparatória · aguardando a unidade". */
const ARVORE = ler('./e2e/www/arvore.html');
const AGORA = 1_800_000_000_000;

function areaFalsa(inicial: Record<string, unknown> = {}) {
  const dados: Record<string, unknown> = structuredClone(inicial);
  let escritas = 0;
  const area: Area = {
    get: async (k: string) => (k in dados ? { [k]: structuredClone(dados[k]) } : {}),
    set: async (o: Record<string, unknown>) => { escritas += 1; Object.assign(dados, structuredClone(o)); },
  };
  return { area, dados, escritas: () => escritas };
}

const pagina = (url: string, html: string): Pagina => {
  let doc: Document | undefined;
  return { url, status: 200, html, get doc() { return (doc ??= parseHTML(html).document as unknown as Document); } };
};

/** SEI falso: procedimento_trabalhar → página com o iframe da árvore; procedimento_visualizar → árvore. */
function httpFalso(opcoes: { falhar?: (url: string) => Error | null } = {}) {
  const urls: string[] = [];
  let ativos = 0;
  let maximo = 0;
  const http = {
    base: new URL('https://sei.teste.gov.br/sei/'),
    absoluta: (u: string) => new URL(u, 'https://sei.teste.gov.br/sei/').href,
    async obter(url: string) {
      urls.push(url);
      ativos += 1;
      maximo = Math.max(maximo, ativos);
      await new Promise(r => setTimeout(r, 5));
      ativos -= 1;
      const erro = opcoes.falhar?.(url);
      if (erro) throw erro;
      if (/procedimento_trabalhar/.test(url)) {
        const id = /id_procedimento=(\d+)/.exec(url)?.[1];
        return pagina(`https://sei.teste.gov.br/sei/${url}`, `<html><body><iframe id="ifrArvore" src="controlador.php?acao=procedimento_visualizar&amp;id_procedimento=${id}"></iframe></body></html>`);
      }
      return pagina(`https://sei.teste.gov.br/sei/${url}`, ARVORE);
    },
  } as unknown as Http;
  return { http, urls, maximo: () => maximo };
}

const docCaixa = () => parseHTML(CAIXA).document as unknown as Document;
const barra = (d: Document) => d.getElementById(ID_BARRA)!;
const pilulas = (d: Document) => [...d.querySelectorAll('.gelic-etapa-linha')].map(p => p.textContent);
const chips = (d: Document) => [...barra(d).querySelectorAll('.gelic-ctl-chip')].map(b => b.textContent);
const esperar = (ms = 120) => new Promise(r => setTimeout(r, ms));

export async function verificarControle(): Promise<void> {
  await teste('Controle: ao abrir, nada sai pela rede; barra com "Calcular etapas (n)" sem contar o sigiloso', async () => {
    const d = docCaixa();
    const { area } = areaFalsa();
    const h = httpFalso();
    await iniciarControle(d, { area, http: () => h.http, agora: () => AGORA });
    assert.deepEqual(h.urls, []);
    assert.deepEqual(pilulas(d).filter(t => !/Sigiloso/.test(t!)), [], 'sem cache, só o sigiloso tem etiqueta');
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Calcular etapas (9)', '10 processos, 1 sigiloso');
    assert.ok(chips(d).includes('Sem etapa calculada (9)'));
    assert.ok(chips(d).includes('Sigiloso: etapa não calculada (1)'));
    assert.ok(d.getElementById(ID_BARRA)!.nextElementSibling, 'a barra fica acima das tabelas');
  });

  await teste('Controle: etapa guardada aparece na linha; documento novo ou 7 dias a deixam desatualizada', async () => {
    const d = docCaixa();
    const [primeira, segunda] = linhas(d).filter(l => !l.processo.sigiloso);
    const mapa: MapaEtapas = {
      [primeira.processo.idProcedimento]: { etapa: 'preparatoria_analise', nome: 'Preparatória · análise inicial (DVI)', tom: 'acao', descricao: 'x', t: AGORA - 1000 },
      [segunda.processo.idProcedimento]: { etapa: 'concluido', nome: 'Concluído pela Gelic', tom: 'fim', descricao: 'y', t: AGORA - 8 * 24 * 3600_000 },
    };
    const { area } = areaFalsa({ [CHAVE_ETAPAS]: mapa });
    await iniciarControle(d, { area, http: () => httpFalso().http, agora: () => AGORA });
    const p1 = primeira.tr.querySelector('.gelic-etapa-linha')!;
    const p2 = segunda.tr.querySelector('.gelic-etapa-linha')!;
    assert.equal(p1.textContent, 'Preparatória · análise inicial (DVI)');
    assert.equal(p1.getAttribute('data-tom'), 'acao');
    assert.equal(p1.hasAttribute('data-velha'), false);
    assert.equal(p2.hasAttribute('data-velha'), true, 'mais de 7 dias');
    assert.equal(desatualizada(mapa[primeira.processo.idProcedimento], true, AGORA), true, 'documento novo desatualiza');
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Calcular etapas (8)', 'a desatualizada conta como pendente');
  });

  await teste(`Controle: "Calcular etapas" lê só os pendentes, no máximo ${CONCORRENCIA} por vez, nunca o sigiloso, e guarda uma vez`, async () => {
    const d = docCaixa();
    const a = areaFalsa();
    const h = httpFalso();
    const c = await iniciarControle(d, { area: a.area, http: () => h.http, agora: () => AGORA });
    const sigiloso = linhas(d).find(l => l.processo.sigiloso)!;
    await c.calcular();
    await esperar();
    assert.ok(h.maximo() <= CONCORRENCIA, `concorrência ${h.maximo()}`);
    assert.ok(!h.urls.some(u => u.includes(`id_procedimento=${sigiloso.processo.idProcedimento}`)), 'sigiloso não é lido');
    const lidos = new Set(h.urls.filter(u => /procedimento_trabalhar/.test(u)).map(u => /id_procedimento=(\d+)/.exec(u)![1]));
    assert.equal(lidos.size, 9);
    assert.equal(a.escritas(), 1, 'uma escrita no storage no fim');
    const guardado = (await lerEtapas(a.area));
    assert.equal(Object.keys(guardado).length, 9);
    for (const e of Object.values(guardado)) {
      assert.equal(e.etapa, 'preparatoria_aguarda_unidade');
      assert.deepEqual(Object.keys(e).sort(), ['descricao', 'etapa', 'nome', 't', 'tom'], 'só o resultado, nunca títulos');
    }
    assert.equal(pilulas(d).filter(t => t === 'Preparatória · aguardando a unidade').length, 9);
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Recalcular etapas');
  });

  await teste('Controle: chip filtra a lista pela etapa e o segundo clique desfaz', async () => {
    const d = docCaixa();
    const [l1] = linhas(d).filter(l => !l.processo.sigiloso);
    const { area } = areaFalsa({ [CHAVE_ETAPAS]: { [l1.processo.idProcedimento]: { etapa: 'empenho', nome: 'Contrato assinado · pedir empenho', tom: 'acao', descricao: '', t: AGORA } } });
    await iniciarControle(d, { area, http: () => httpFalso().http, agora: () => AGORA });
    const chip = () => [...barra(d).querySelectorAll<HTMLButtonElement>('.gelic-ctl-chip')].find(b => b.textContent!.startsWith('Contrato assinado'))!;
    chip().click();
    const ocultas = linhas(d).filter(l => l.tr.hasAttribute('data-gelic-oculto'));
    assert.equal(ocultas.length, linhas(d).length - 1);
    assert.equal(l1.tr.hasAttribute('data-gelic-oculto'), false);
    assert.equal(chip().getAttribute('aria-pressed'), 'true');
    chip().click();
    assert.equal(linhas(d).filter(l => l.tr.hasAttribute('data-gelic-oculto')).length, 0);
  });

  await teste('Controle: linha escondida pela pesquisa rápida do SEI Pro não conta nem é lida em "Calcular etapas"', async () => {
    const d = docCaixa();
    const h = httpFalso();
    const c = await iniciarControle(d, { area: areaFalsa().area, http: () => h.http, agora: () => AGORA });
    const escondidas = linhas(d).filter(l => !l.processo.sigiloso).slice(0, 4);
    for (const l of escondidas) l.tr.classList.add(classeDaPesquisaRapida());
    await esperar();
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Calcular etapas (5)', '9 pendentes, 4 escondidas pela pesquisa');
    for (const l of escondidas) l.tr.classList.remove(classeDaPesquisaRapida());
    await esperar();
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Calcular etapas (9)', 'mostradas de novo, voltam a contar');
    for (const l of escondidas) l.tr.classList.add(classeDaPesquisaRapida());
    await esperar();
    await c.calcular();
    await esperar();
    const lidos = new Set(h.urls.filter(u => /procedimento_trabalhar/.test(u)).map(u => /id_procedimento=(\d+)/.exec(u)![1]));
    assert.equal(lidos.size, 5);
    assert.ok(!escondidas.some(l => lidos.has(l.processo.idProcedimento)), 'nenhuma escondida é lida');
  });

  await teste('Controle: com o chip de etapa ativo, "Calcular etapas" conta e lê só as linhas à vista', async () => {
    const d = docCaixa();
    const [l1] = linhas(d).filter(l => !l.processo.sigiloso);
    const { area } = areaFalsa({ [CHAVE_ETAPAS]: { [l1.processo.idProcedimento]: { etapa: 'empenho', nome: 'Contrato assinado · pedir empenho', tom: 'acao', descricao: '', t: AGORA } } });
    const h = httpFalso();
    const c = await iniciarControle(d, { area, http: () => h.http, agora: () => AGORA });
    [...barra(d).querySelectorAll<HTMLButtonElement>('.gelic-ctl-chip')].find(b => b.textContent!.startsWith('Contrato assinado'))!.click();
    assert.equal(barra(d).querySelector('.gelic-ctl-calcular')!.textContent, 'Recalcular etapas', 'a única à vista já tem etapa em dia');
    await c.calcular();
    await esperar();
    const lidos = new Set(h.urls.filter(u => /procedimento_trabalhar/.test(u)).map(u => /id_procedimento=(\d+)/.exec(u)![1]));
    assert.deepEqual([...lidos], [l1.processo.idProcedimento], 'só a linha à vista é lida');
  });

  await teste('Controle: redesenho sem mudança não reescreve a barra (cada gravação acorda os observadores dos outros módulos)', async () => {
    const d = docCaixa();
    await iniciarControle(d, { area: areaFalsa().area, http: () => httpFalso().http, agora: () => AGORA });
    const chip = barra(d).querySelector('.gelic-ctl-chip')!;
    const botao = barra(d).querySelector('.gelic-ctl-calcular')!;
    const texto = botao.firstChild;
    linhas(d)[0].tr.querySelector('td')!.append(d.createElement('span')); // mudança na tabela que não muda nada da Gelic
    await esperar();
    assert.ok(chip.isConnected, 'os chips continuam os mesmos');
    assert.ok(botao.firstChild === texto, 'o texto do botão continua o mesmo nó');
  });

  await teste('Controle: outra classe na linha (o SEI troca ao passar o mouse) não redesenha; a da pesquisa rápida, sim', async () => {
    const d = docCaixa();
    await iniciarControle(d, { area: areaFalsa().area, http: () => httpFalso().http, agora: () => AGORA });
    const [l] = linhas(d).filter(x => !x.processo.sigiloso);
    l.tr.removeAttribute('data-gelic-etapa'); // só um redesenho põe de volta
    l.tr.classList.add('infraTrSelecionada');
    await esperar();
    assert.ok(!l.tr.hasAttribute('data-gelic-etapa'), 'a classe do SEI não redesenha');
    l.tr.classList.add(classeDaPesquisaRapida());
    await esperar();
    assert.ok(l.tr.hasAttribute('data-gelic-etapa'), 'esconder pela pesquisa redesenha');
  });

  await teste('Controle: sessão do SEI expirada para o cálculo e avisa na linha', async () => {
    const d = docCaixa();
    const h = httpFalso({ falhar: () => new ErroSei('SEI_SESSAO_EXPIRADA', 'Sessão expirada') });
    const c = await iniciarControle(d, { area: areaFalsa().area, http: () => h.http, agora: () => AGORA });
    await c.calcular();
    await esperar();
    assert.ok(h.urls.length <= CONCORRENCIA, `parou cedo (${h.urls.length} requisições)`);
    assert.ok(pilulas(d).some(t => /sessão do SEI expirada/.test(t!)));
  });

  await teste('cache: poda os mais antigos acima do teto', async () => {
    const a = areaFalsa();
    const muitos: MapaEtapas = {};
    for (let i = 0; i < LIMITE + 5; i++) muitos[String(i)] = { etapa: null, nome: 'Fora do rito da Gelic', tom: 'fora', descricao: '', t: i };
    await guardarEtapas(muitos, a.area);
    const m = await lerEtapas(a.area);
    assert.equal(Object.keys(m).length, LIMITE);
    assert.ok(!('0' in m) && !('4' in m) && String(LIMITE + 4) in m);
  });
}
