/**
 * Formulário das peças do SEI CFC (src/peca/): campos a partir das perguntas do modelo, guardados no
 * navegador, contexto da janela e a janela (DOM com linkedom). Sem rede e sem chrome.*.
 *
 *   npx tsx -e "import('./tests/peca.ts').then(m=>m.verificarPeca())"
 */
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { entradasCfc } from '../src/modelos/analise-cfc';
import { camposDoFormulario, dadosDoFormulario, origemDe } from '../src/peca/formulario';
import { completarDaConfig, contextoDaJanela, escolherAba } from '../src/peca/contexto';
import { montarJanela, type DepsJanela } from '../src/peca/pagina';
import { abrirPeca, urlDaPeca } from '../src/peca/abrir';
import { apagarRascunho, guardarRascunho, guardarUo, lerRascunho, lerUo, type Area } from '../src/peca/guardados';
import { teste } from './util';

const vazio = { valores: {}, evidencias: {} };
const campos = (modelo: string, valores: Record<string, unknown> = {}) =>
  camposDoFormulario(modelo, { valores, evidencias: {} }, entradasCfc(modelo, valores, false), []);

/** chrome.storage.local de mentira (get de uma chave, set, remove). */
export function areaFalsa(): Area & { m: Map<string, unknown> } {
  const m = new Map<string, unknown>();
  return {
    m,
    get: async (k: string) => (m.has(k) ? { [k]: structuredClone(m.get(k)) } : {}),
    set: async (o: Record<string, unknown>) => { for (const [k, v] of Object.entries(o)) m.set(k, structuredClone(v)); },
    remove: async (k: string) => { m.delete(k); },
  };
}

export async function verificarPeca(): Promise<void> {
  await teste('peça: o formulário do DFD sai das perguntas do formulario.json, na ordem, com tipo, obrigatória e nota', () => {
    const c = camposDoFormulario('dfd', vazio, entradasCfc('dfd', {}, false), []);
    assert.equal(c[0].nome, 'justificativa');
    assert.equal(c[0].tipo, 'texto_longo');
    assert.equal(c[0].obrigatoria, true);
    assert.match(c[0].nota, /parágrafo/);
    assert.ok(c.some(x => x.nome === 'grau_prioridade' && x.tipo === 'escolha' && x.opcoes?.includes('Médio')));
    assert.ok(c.some(x => x.nome === 'unidade'), 'as entradas que não são pergunta também entram');
    assert.equal(new Set(c.map(x => x.nome)).size, c.length, 'sem campo repetido');
  });
  await teste('peça: campo condicional aparece só quando vale (fundamento só em dispensa/inexigibilidade)', () => {
    assert.ok(!campos('dfd', { via: 'pregao' }).some(x => x.nome === 'fundamento_contratacao_direta'));
    assert.ok(campos('dfd', { via: 'dispensa' }).some(x => x.nome === 'fundamento_contratacao_direta'));
  });
  await teste('peça: campo que deixou de aparecer não vai em dados', () => {
    const d = dadosDoFormulario(campos('dfd', { via: 'pregao' }), { via: 'pregao', fundamento_contratacao_direta: 'art. 75', justificativa: 'x', vazio: '' });
    assert.ok(!('fundamento_contratacao_direta' in d));
    assert.equal(d.justificativa, 'x');
    assert.ok(!('vazio' in d));
  });
  await teste('peça: o que falta e a origem de cada valor ficam no campo', () => {
    const c = camposDoFormulario('dfd', { valores: { unidade: 'GEX' }, evidencias: { unidade: { fonte: 'tela', nota: 'unidade logada no SEI (sigla): confira' } } }, entradasCfc('dfd', {}, false), ['justificativa']);
    assert.equal(c.find(x => x.nome === 'justificativa')?.falta, true);
    assert.equal(c.find(x => x.nome === 'unidade')?.valor, 'GEX');
    assert.equal(c.find(x => x.nome === 'unidade')?.origem?.rotulo, 'da tela do SEI');
  });
  await teste('peça: origem legível com nº SEI e marca de IA', () => {
    assert.deepEqual(origemDe({ fonte: 'autos', sei: '0103990', nota: 'do TR' }), { rotulo: 'do TR', sei: '0103990' });
    assert.deepEqual(origemDe({ fonte: 'agente', nota: 'redigido pela IA: valide' }), { rotulo: 'redigido pela IA: valide', ia: true });
    assert.equal(origemDe({ fonte: 'autos', sei: '1', nota: 'pela IA, conferido no documento' })?.ia, true);
    assert.equal(origemDe({ fonte: 'pca', nota: 'pelo PCA' })?.rotulo, 'do PCA');
    assert.equal(origemDe({ fonte: 'ultima_vez' })?.rotulo, 'da última vez');
    assert.equal(origemDe(undefined), null);
  });
  await teste('peça: todo modelo do cfc com modelo gera formulário sem erro', () => {
    for (const m of ['dfd', 'termos_cientificacao', 'mapa_precos', 'tr', 'despacho_delic']) assert.ok(campos(m).length > 0, m);
  });
  await teste('peça: guardados só guardam a lista permitida da UO', async () => {
    const a = areaFalsa();
    await guardarUo(a, { responsavel_nome: 'Fulana Exemplo', unidade: 'GEX', justificativa: 'não é da UO', valor_estimado: '1,00', responsavel_email: '' });
    assert.deepEqual(await lerUo(a), { responsavel_nome: 'Fulana Exemplo', unidade: 'GEX' });
    await guardarUo(a, { unidade: 'GOUTRA' });
    assert.deepEqual(await lerUo(a), { responsavel_nome: 'Fulana Exemplo', unidade: 'GOUTRA' }, 'a nova gravação soma à anterior');
  });
  await teste('peça: rascunho por processo e modelo, apagado depois de gravar', async () => {
    const a = areaFalsa();
    await guardarRascunho(a, 'P1', 'dfd', { justificativa: 'x' });
    assert.deepEqual(await lerRascunho(a, 'P1', 'dfd'), { justificativa: 'x' });
    assert.equal(await lerRascunho(a, 'P1', 'tr'), null);
    assert.equal(await lerRascunho(a, 'P2', 'dfd'), null);
    await apagarRascunho(a, 'P1', 'dfd');
    assert.equal(await lerRascunho(a, 'P1', 'dfd'), null);
  });
  await teste('peça: storage que falha não derruba o formulário', async () => {
    const quebrada: Area = { get: async () => { throw new Error('x'); }, set: async () => { throw new Error('x'); }, remove: async () => { throw new Error('x'); } };
    assert.deepEqual(await lerUo(quebrada), {});
    assert.equal(await lerRascunho(quebrada, 'P', 'dfd'), null);
    await guardarUo(quebrada, { unidade: 'G' });
    await guardarRascunho(quebrada, 'P', 'dfd', {});
    await apagarRascunho(quebrada, 'P', 'dfd');
    assert.deepEqual(await lerUo(null), {});
  });
  const ponteFalsa = (abas: { id: number; titulo: string }[]) => {
    let fixada: number | null = null;
    const ops: string[] = [];
    return {
      ops, get fixada() { return fixada; },
      lista: () => abas.map(a => ({ ...a, papel: 'sei' })),
      fixar: (id: number | null) => { fixada = id; },
      executar: async (op: string) => { ops.push(op); return { ok: true }; },
    };
  };
  await teste('peça: escolherAba fixa a aba do processo e recusa aba de outro processo', () => {
    const p = ponteFalsa([{ id: 1, titulo: 'SEI - 111' }, { id: 2, titulo: 'SEI - 12345670000048.000011/2026-01' }]);
    assert.equal(escolherAba(p, '12345670000048.000011/2026-01'), 2);
    assert.equal(p.fixada, 2);
    const outra = ponteFalsa([{ id: 1, titulo: 'SEI - 12345670000048.000011/2026-019' }]);
    assert.equal(escolherAba(outra, '12345670000048.000011/2026-01'), null);
    assert.equal(outra.fixada, null);
  });
  await teste('peça: o contexto da janela leva sei() à ponte e não tem completar sem chave', async () => {
    const p = ponteFalsa([{ id: 2, titulo: 'SEI - P' }]);
    const ctx = contextoDaJanela({ protocolo: 'P', ponte: p, confirmar: async () => true, sinal: new AbortController().signal });
    await ctx.sei('processo.arvore', { processo: 'P' });
    assert.deepEqual(p.ops, ['processo.arvore']);
    assert.equal(ctx.completar, undefined);
    assert.equal(await ctx.consentirRestrito('doc'), true);
    assert.equal(await completarDaConfig(async () => ({ servico: 'openrouter', chave: '' })), undefined);
    assert.equal(await completarDaConfig(async () => undefined), undefined);
  });
  await teste('peça: completar da janela anonimiza a ida, reidrata a volta e soma o gasto', async () => {
    let enviado = '';
    const criar = () => ({ conversar: async (pedido: { mensagens: { content: string }[] }) => {
      enviado = pedido.mensagens.map(m => m.content).join('\n');
      const rotulo = /\[PESSOA_\d+\]/.exec(enviado)?.[0] ?? '?';
      return { texto: `ok ${rotulo}`, chamadas: [], fim: 'stop', uso: { entrada: 10, saida: 2, custo: 0.01 } };
    } });
    const ia = await completarDaConfig(async () => ({ servico: 'openrouter', chave: 'sk-teste', modelo: 'x', nomes: true }), criar as never);
    assert.ok(ia);
    ia.privacidade.registrarPessoas(['Fulana de Tal Exemplo']);
    const r = await ia.completar('sistema', 'Pedido de Fulana de Tal Exemplo', new AbortController().signal);
    assert.doesNotMatch(enviado, /Fulana/);
    assert.equal(r, 'ok Fulana de Tal Exemplo');
    assert.equal(ia.uso().custo, 0.01);
  });
  const janela = () => parseHTML('<html><body><main id="gelic-peca"></main></body></html>').document as unknown as Document;
  const espera = () => new Promise(r => setTimeout(r, 0));
  const escolherTipo = (doc: Document, n: number) => doc.querySelectorAll('[data-gelic-tipo] option')[n].setAttribute('selected', '');
  const digitar = (doc: Document, campo: string, valor: string) => {
    const e = doc.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-gelic-campo=${campo}] input, [data-gelic-campo=${campo}] textarea`)!;
    e.value = valor;
    e.dispatchEvent(new (doc.defaultView as unknown as { Event: typeof Event }).Event('input'));
  };
  const depsFalsas = (o: Partial<DepsJanela> = {}) => {
    const eventos: unknown[] = [];
    const analises: { ia: boolean; dados: Record<string, unknown> }[] = [];
    const deps: DepsJanela = {
      protocolo: 'P', modelo: 'dfd', nomePeca: 'DFD — Documento de Formalização da Demanda', temIa: false,
      configurarIa: () => { eventos.push('configurar'); }, area: null,
      analisar: async a => {
        analises.push(a);
        const valores: Record<string, unknown> = { unidade: 'GEX' };
        const evidencias: Record<string, { fonte: string; nota?: string; sei?: string }> = { unidade: { fonte: 'tela', nota: 'unidade logada no SEI (sigla): confira' } };
        if (a.ia) { valores.justificativa = 'Texto da IA.'; evidencias.justificativa = { fonte: 'agente', nota: 'redigido pela IA: valide' }; }
        return { ok: false, estado: { valores, evidencias }, entradas: entradasCfc('dfd', valores, false), faltando: a.ia ? [] : [{ variavel: 'justificativa' }] };
      },
      previa: async () => ({ html: '<p>DOCUMENTO</p>', faltando: [] }),
      tipos: async () => ['Documento de Formalização de Demanda', 'Despacho'],
      gravar: async g => { eventos.push(g); return { ok: true, numero: '9999003' }; },
      ...o,
    };
    return { eventos, analises, deps };
  };
  await teste('peça: a janela desenha os campos do DFD com origem e marca o que falta', async () => {
    const doc = janela();
    await montarJanela(doc, depsFalsas().deps);
    assert.ok(doc.querySelector('[data-gelic-campo=justificativa] textarea'));
    assert.match(doc.querySelector('[data-gelic-campo=unidade] .gelic-origem')?.textContent ?? '', /tela do SEI/);
    assert.ok(doc.querySelector('[data-gelic-campo=justificativa]')?.classList.contains('gelic-falta'));
    assert.match(doc.querySelector('.gelic-faixa')?.textContent ?? '', /falta/);
    assert.match(doc.querySelector('h1')?.textContent ?? '', /DFD/);
  });
  await teste('peça: sem chave o botão de IA vira configurar', async () => {
    const doc = janela();
    const f = depsFalsas();
    await montarJanela(doc, f.deps);
    const b = doc.querySelector<HTMLButtonElement>('[data-gelic-acao=ia]')!;
    assert.match(b.textContent ?? '', /Configurar a IA/);
    b.click();
    assert.deepEqual(f.eventos, ['configurar']);
    assert.equal(f.analises.filter(a => a.ia).length, 0);
  });
  await teste('peça: com chave, a IA preenche só o vazio e marca "redigido pela IA"', async () => {
    const doc = janela();
    const f = depsFalsas({ temIa: true });
    await montarJanela(doc, f.deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=ia]')!.click();
    await espera(); await espera();
    assert.equal(f.analises.at(-1)?.ia, true);
    const just = doc.querySelector('[data-gelic-campo=justificativa]')!;
    assert.equal(just.querySelector('textarea')?.value, 'Texto da IA.');
    assert.match(just.querySelector('.gelic-origem')?.textContent ?? '', /redigido pela IA: valide/);
  });
  await teste('peça: o que a pessoa digita vence a IA e vai em dados', async () => {
    const doc = janela();
    const f = depsFalsas({ temIa: true });
    await montarJanela(doc, f.deps);
    const t = doc.querySelector<HTMLTextAreaElement>('[data-gelic-campo=justificativa] textarea')!;
    t.value = 'Escrito por mim.';
    t.dispatchEvent(new (doc.defaultView as unknown as { Event: typeof Event }).Event('input'));
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=ia]')!.click();
    await espera(); await espera();
    assert.equal(f.analises.at(-1)?.dados.justificativa, 'Escrito por mim.');
    assert.equal(doc.querySelector<HTMLTextAreaElement>('[data-gelic-campo=justificativa] textarea')!.value, 'Escrito por mim.');
  });
  await teste('peça: gravar só depois do Confirmar, com o tipo escolhido, e mostra o número', async () => {
    const doc = janela();
    const f = depsFalsas();
    await montarJanela(doc, f.deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.click();
    await espera(); await espera();
    assert.equal(f.eventos.length, 0, 'abrir o diálogo não grava');
    assert.equal(doc.querySelectorAll('[data-gelic-tipo] option').length, 3, '— escolha — e os dois tipos');
    escolherTipo(doc, 1);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=confirmar]')!.click();
    await espera(); await espera();
    assert.equal((f.eventos[0] as { tipo: string }).tipo, 'Documento de Formalização de Demanda');
    assert.match(doc.body.textContent ?? '', /SEI nº 9999003, não assinado/);
  });
  await teste('peça: a prévia abre o HTML num iframe isolado', async () => {
    const doc = janela();
    await montarJanela(doc, depsFalsas().deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=previa]')!.click();
    await espera(); await espera();
    const f = doc.querySelector('iframe.gelic-previa');
    assert.equal(f?.getAttribute('sandbox'), '');
    assert.equal(f?.getAttribute('srcdoc'), '<p>DOCUMENTO</p>');
  });
  await teste('peça: dados da UO e rascunho entram na abertura; gravar guarda a UO e apaga o rascunho', async () => {
    const area = areaFalsa();
    await guardarUo(area, { responsavel_email: 'fulana@exemplo.org' });
    await guardarRascunho(area, 'P', 'dfd', { justificativa: 'Do rascunho.' });
    const doc = janela();
    const f = depsFalsas({ area });
    await montarJanela(doc, f.deps);
    assert.match(doc.querySelector('[data-gelic-campo=responsavel_email] .gelic-origem')?.textContent ?? '', /última vez/);
    assert.equal(doc.querySelector<HTMLTextAreaElement>('[data-gelic-campo=justificativa] textarea')!.value, 'Do rascunho.');
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.click();
    await espera(); await espera();
    escolherTipo(doc, 1);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=confirmar]')!.click();
    await espera(); await espera();
    assert.equal(await lerRascunho(area, 'P', 'dfd'), null);
    assert.equal((await lerUo(area)).unidade, 'GEX');
  });
  await teste('peça: falha na gravação mostra o erro e não apaga o rascunho', async () => {
    const area = areaFalsa();
    await guardarRascunho(area, 'P', 'dfd', { justificativa: 'x' });
    const doc = janela();
    await montarJanela(doc, depsFalsas({ area, gravar: async () => ({ ok: false, erro: 'Nenhuma aba do SEI conectada.' }) }).deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.click();
    await espera(); await espera();
    escolherTipo(doc, 1);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=confirmar]')!.click();
    await espera(); await espera();
    assert.match(doc.body.textContent ?? '', /Nenhuma aba do SEI conectada/);
    assert.ok(await lerRascunho(area, 'P', 'dfd'));
  });
  await teste('final #1: a ponte real só enxerga aba da mesma janela; a peça abre como aba, não popup', async () => {
    const { PontePainel } = await import('../../agente-ia/src/ponte/cliente');
    const g = globalThis as Record<string, unknown>;
    const antes = { chrome: g.chrome, setInterval: g.setInterval, addEventListener: g.addEventListener };
    let conectar: (p: unknown) => void = () => undefined;
    g.chrome = { windows: { getCurrent: async () => ({ id: 7 }) }, runtime: { onConnect: { addListener: (f: (p: unknown) => void) => { conectar = f; } } }, storage: { local: { set: async () => undefined, remove: async () => undefined } } };
    g.setInterval = () => 0;
    g.addEventListener = () => undefined;
    try {
      const ponte = new PontePainel();
      await ponte.iniciar();
      const porta = (id: number, windowId: number, title: string) => ({ name: 'seipro-agente', sender: { tab: { id, windowId, title } }, onMessage: { addListener: () => undefined }, onDisconnect: { addListener: () => undefined }, postMessage: () => undefined });
      conectar(porta(1, 7, 'SEI - P'));
      conectar(porta(2, 9, 'SEI - P2'));
      assert.equal(escolherAba(ponte, 'P'), 1, 'aba na mesma janela');
      assert.equal(escolherAba(ponte, 'P2'), null, 'aba em outra janela não aparece: por isso a peça abre como aba');
    } finally {
      Object.assign(g, antes);
    }
    const aberturas: unknown[][] = [];
    abrirPeca((...a: unknown[]) => { aberturas.push(a); return null; }, 'dfd', 'P 1');
    assert.deepEqual(aberturas, [[urlDaPeca('dfd', 'P 1'), 'gelic-peca-dfd-1']], 'aba com nome: o segundo clique volta a ela');
    assert.equal(urlDaPeca('dfd', 'P 1'), 'js/gelic/peca.html?modelo=dfd&processo=P%201');
  });
  await teste('final #2: campo apagado (ou escondido) vai vazio ao motor, não volta da análise', async () => {
    const doc = janela();
    const enviados: Record<string, unknown>[] = [];
    await montarJanela(doc, depsFalsas({ previa: async d => { enviados.push(d); return { html: '<p/>', faltando: [] }; } }).deps);
    digitar(doc, 'unidade', '');
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=previa]')!.click();
    await espera(); await espera();
    assert.equal(enviados[0].unidade, '', 'o vazio vai explícito');
    assert.equal(enviados[0].fundamento_contratacao_direta, '', 'campo de formulário escondido vai vazio');
  });
  await teste('final #3: o rascunho guarda a origem; texto da IA continua "redigido pela IA" ao reabrir', async () => {
    const area = areaFalsa();
    const doc = janela();
    await montarJanela(doc, depsFalsas({ temIa: true, area }).deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=ia]')!.click();
    await espera(); await espera();
    digitar(doc, 'unidade', 'GEX2');
    const doc2 = janela();
    await montarJanela(doc2, depsFalsas({ temIa: true, area }).deps);
    assert.match(doc2.querySelector('[data-gelic-campo=justificativa] .gelic-origem')?.textContent ?? '', /redigido pela IA/);
    assert.match(doc2.querySelector('[data-gelic-campo=unidade] .gelic-origem')?.textContent ?? '', /informado por você/);
  });
  await teste('final #5: configurar a chave em outra aba liga o botão de IA sem recarregar', async () => {
    const doc = janela();
    let avisar: (tem: boolean) => void = () => undefined;
    await montarJanela(doc, depsFalsas({ aoMudarIa: f => { avisar = f; } }).deps);
    assert.match(doc.querySelector('[data-gelic-acao=ia]')?.textContent ?? '', /Configurar a IA/);
    avisar(true);
    assert.match(doc.querySelector('[data-gelic-acao=ia]')?.textContent ?? '', /Preencher com IA/);
  });
  await teste('final #6: sem tipo escolhido não grava', async () => {
    const doc = janela();
    const f = depsFalsas();
    await montarJanela(doc, f.deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.click();
    await espera(); await espera();
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=confirmar]')!.click();
    await espera(); await espera();
    assert.equal(f.eventos.length, 0);
    assert.match(doc.body.textContent ?? '', /Escolha o tipo de documento/);
  });
  await teste('final #7: erro de campos faltando vem em linguagem de tela, não do agente', async () => {
    const doc = janela();
    await montarJanela(doc, depsFalsas({ gravar: async () => ({ ok: false, erro: 'Faltam valores que só o usuário informa: justificativa, objeto. Pergunte e passe em dados (ex.: {"justificativa": "..."}), ou rascunho: true para gravar com as marcas ⟦...⟧.' }) }).deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.click();
    await espera(); await espera();
    escolherTipo(doc, 1);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=confirmar]')!.click();
    await espera(); await espera();
    const t = doc.body.textContent ?? '';
    assert.match(t, /Faltam campos obrigatórios: justificativa, objeto/);
    assert.match(t, /Gravar mesmo com campos faltando/);
    assert.doesNotMatch(t, /passe em dados|rascunho: true/);
  });
  await teste('final #8: Descartar rascunho apaga o rascunho guardado', async () => {
    const area = areaFalsa();
    await guardarRascunho(area, 'P', 'dfd', { justificativa: 'x' });
    const doc = janela();
    await montarJanela(doc, depsFalsas({ area }).deps);
    doc.querySelector<HTMLButtonElement>('[data-gelic-acao=descartar]')!.click();
    await espera(); await espera();
    assert.equal(await lerRascunho(area, 'P', 'dfd'), null);
  });
}
