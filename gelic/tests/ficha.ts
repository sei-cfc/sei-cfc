/**
 * Dados da contratação no PCA (src/ficha/): formato, junção por campo, dados do navegador, abertura e gravação, a
 * janela da peça com eles e a situação da instrução. Sem rede e sem chrome.*: o PCA e o storage são de mentira.
 * Nó do DOM nunca vai a um assert (na falha o Node o imprime e a memória estoura): compare com assert.ok(a === b).
 *
 *   npx tsx -e "import('./tests/ficha.ts').then(m=>m.verificarFicha())"
 */
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { entradasCfc } from '../src/modelos/analise-cfc';
import { daContratacao, lerDados, montarDados, TENTATIVAS } from '../src/ficha/formato';
import { abrirDados, quemSalvou, salvarDados, salvoPor, type DepsDados, type Modo } from '../src/ficha/fonte';
import { iguais, juntar } from '../src/ficha/juntar';
import { criarClientePca, ErroPca, type Buscar, type ClientePca } from '../src/pca/cliente';
import type { ItemDaFicha, RespostaFicha } from '../src/pca/contrato';
import { apagarLocal, chaveLocal, guardarLocal, lerLocal } from '../src/ficha/local';
import { montarConflito, montarSubir, resumoDoValor, type Escolhas } from '../src/peca/conflito';
import { montarJanela, type DepsJanela } from '../src/peca/pagina';
import { guardarRascunho, lerRascunho } from '../src/peca/guardados';
import { gravarSituacao, situacaoDoRoteiro } from '../src/ficha/situacao';
import { docsDaArvore, roteiro } from '../src/peca/roteiro';
import { guardarConfigPca, lerConfigPca, REVER_PERMISSAO_MS, type ConfigGuardada } from '../src/pca/config';
import { permissaoEmDia } from '../src/pca/na-pagina';
import { teste } from './util';
import { areaFalsa } from './peca';

/** fetch de mentira do PCA: responde por "MÉTODO /caminho" e guarda os pedidos. */
function buscarPca(rotas: Record<string, () => { status: number; corpo?: unknown }>) {
  const pedidos: { url: string; metodo: string; corpo: unknown }[] = [];
  const buscar: Buscar = async (url, init) => {
    const metodo = init?.method ?? 'GET';
    pedidos.push({ url, metodo, corpo: init?.body ? JSON.parse(String(init.body)) : null });
    const r = rotas[`${metodo} ${new URL(url).pathname.replace('/api/sei', '')}`];
    if (!r) throw new TypeError('Failed to fetch');
    const { status, corpo } = r();
    return { ok: status < 300, status, json: async () => { if (corpo === undefined) throw new SyntaxError('sem JSON'); return corpo; } };
  };
  return { buscar, pedidos };
}

const ITEM_37: ItemDaFicha = { item_pca: 37, exercicio: 2026 };
const respostasDe = (f: RespostaFicha) => (f.dados as { respostas: Record<string, unknown> }).respostas;
/** O PCA de mentira dos dados da contratação: uma ficha por item, com versão e 409 como o contrato v1.1. */
function pcaFalso() {
  const fichas = new Map<string, RespostaFicha>();
  const vinculos = new Map<string, ItemDaFicha[]>();
  const pedidos: string[] = [];
  const chave = (i: ItemDaFicha) => `${i.item_pca}/${i.exercicio}`;
  const ler = (i: ItemDaFicha): RespostaFicha => structuredClone(fichas.get(chave(i)) ?? { ...i, versao: 0, dados: {}, atualizado_em: null, atualizado_por: null });
  let falha: ErroPca | null = null;
  let antesDoPut: (() => void) | null = null;
  const falhar = () => { if (falha) { const e = falha; falha = null; throw e; } };
  const gravar = (i: ItemDaFicha, dados: Record<string, unknown>, por: string): RespostaFicha => {
    const nova = { item_pca: i.item_pca, exercicio: i.exercicio, versao: ler(i).versao + 1, dados: structuredClone(dados), atualizado_em: '2026-10-11T14:32:00-03:00', atualizado_por: por };
    fichas.set(chave(i), nova);
    return structuredClone(nova);
  };
  const cliente: Pick<ClientePca, 'ficha' | 'gravarFicha'> = {
    ficha: async q => {
      pedidos.push(`GET ${'sei' in q ? `sei=${q.sei}` : chave(q)}`);
      falhar();
      if (!('sei' in q)) return ler(q);
      const itens = vinculos.get(q.sei) ?? [];
      if (!itens.length) throw new ErroPca('item_inexistente', 'processo sem item do PCA', 404, { erro: 'item_inexistente' });
      if (itens.length > 1) throw new ErroPca('sei_em_varios_itens', 'o processo está ligado a mais de um item do PCA', 409, { erro: 'sei_em_varios_itens', itens });
      return ler(itens[0]);
    },
    gravarFicha: async c => {
      pedidos.push(`PUT ${chave(c)} v${c.versao}`);
      falhar();
      const f = antesDoPut;
      antesDoPut = null;
      f?.();
      const atual = ler(c);
      if (c.versao !== atual.versao) throw new ErroPca('versao_desatualizada', 'os dados da contratação mudaram no PCA', 409, { erro: 'versao_desatualizada', ficha: atual });
      return gravar(c, c.dados, 'eu@cfc.org.br');
    },
  };
  return {
    cliente, fichas, vinculos, pedidos, ler,
    /** Outra pessoa salva direto no PCA (respostas e, se vier, a situação): a versão sobe. */
    outraPessoa: (i: ItemDaFicha, respostas: Record<string, unknown>, situacao: Record<string, unknown> = {}) => gravar(i, { esquema: 1, respostas, situacao }, 'fulano@cfc.org.br'),
    /** O próximo pedido falha com este erro. */
    falharProximo: (e: ErroPca) => { falha = e; },
    /** Roda uma vez, no próximo PUT, antes de conferir a versão (alguém grava no meio). */
    antesDoPut: (f: () => void) => { antesDoPut = f; },
  };
}
/** O PCA com o processo P-1 ligado ao item 37/2026 (e, se vierem, respostas já salvas por fulano: versão 1). */
const comItem = (respostas?: Record<string, unknown>) => {
  const p = pcaFalso();
  p.vinculos.set('P-1', [ITEM_37]);
  if (respostas) p.outraPessoa(ITEM_37, respostas);
  return p;
};

const janela = () => parseHTML('<html><body><main id="gelic-peca"></main></body></html>').document as unknown as Document;
const espera = async (n = 10) => { for (let i = 0; i < n; i++) await new Promise(r => setTimeout(r, 0)); };
const controleDe = (doc: Document, campo: string) => doc.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-gelic-campo=${campo}] textarea, [data-gelic-campo=${campo}] input`);
const valorNaJanela = (doc: Document, campo: string) => controleDe(doc, campo)?.value;
const origemNaJanela = (doc: Document, campo: string) => doc.querySelector(`[data-gelic-campo=${campo}] .gelic-origem`)?.textContent ?? '';
const clicar = async (doc: Document, acao: string) => { doc.querySelector<HTMLButtonElement>(`[data-gelic-acao=${acao}]`)!.click(); await espera(); };
/** A janela do DFD do processo P-1 com o PCA de mentira (null: PCA não configurado). */
function depsJanela(pca: ReturnType<typeof pcaFalso> | null, area = areaFalsa(), o: { podeInstruir?: boolean } = {}) {
  const gravados: { dados: Record<string, unknown> }[] = [];
  const deps: DepsJanela = {
    protocolo: 'P-1', modelo: 'dfd', nomePeca: 'DFD', temIa: false, configurarIa: () => {}, area,
    analisar: async () => ({ ok: true, estado: { valores: { unidade: 'GEX' }, evidencias: { unidade: { fonte: 'tela' } } }, entradas: entradasCfc('dfd', { unidade: 'GEX' }, false), faltando: [] }),
    previa: async () => ({ html: '<p/>', faltando: [] }),
    tipos: async () => ['Documento de Formalização de Demanda'],
    gravar: async g => { gravados.push(g); return { ok: true, numero: '9999001' }; },
    dados: { protocolo: 'P-1', area, cliente: pca?.cliente ?? null, podeInstruir: o.podeInstruir ?? true, agora: () => Date.UTC(2026, 9, 10, 12) },
  };
  return { deps, gravados };
}

const digitar = (doc: Document, campo: string, valor: string) => {
  const e = controleDe(doc, campo)!;
  e.value = valor;
  e.dispatchEvent(new (doc.defaultView as unknown as { Event: typeof Event }).Event('input'));
};
/** "Gravar no SEI" → escolhe o tipo → "Confirmar e gravar". */
async function gravarNoSei(doc: Document): Promise<void> {
  await clicar(doc, 'gravar');
  doc.querySelectorAll('[data-gelic-tipo] option')[1].setAttribute('selected', '');
  await clicar(doc, 'confirmar');
}
const statusDe = (doc: Document) => doc.querySelector('.gelic-status')?.textContent ?? '';

export async function verificarFicha(): Promise<void> {
  await teste('dados formato: lê esquema, respostas, situação e o resto; vazio do PCA vira esquema 0 sem problema', () => {
    assert.deepEqual(lerDados({}), { esquema: 0, respostas: {}, situacao: {}, resto: {} });
    assert.deepEqual(lerDados({ esquema: 1, respostas: { objeto: 'X' }, situacao: { 'P-1': { completa: false } }, futuro: { a: 1 } }),
      { esquema: 1, respostas: { objeto: 'X' }, situacao: { 'P-1': { completa: false } }, resto: { futuro: { a: 1 } } });
  });
  await teste('dados formato: esquema mais novo e formato desconhecido só leem; gravar preserva o que não conhece', () => {
    assert.equal(lerDados({ esquema: 2, respostas: { objeto: 'X' } }).problema, 'esquema_novo');
    assert.equal(lerDados({ esquema: 1, respostas: ['x'] }).problema, 'formato');
    assert.equal(lerDados({ situacao: 'autuado' }).problema, 'formato', 'o exemplo do contrato do PCA não é deste formato');
    assert.equal(lerDados('x').problema, 'formato');
    assert.throws(() => montarDados(lerDados({ esquema: 2 }), {}), /não grava/);
    assert.deepEqual(montarDados(lerDados({ respostas: { a: 1 }, situacao: { s: 1 }, futuro: 'f' }), { respostas: { b: 2 } }),
      { futuro: 'f', esquema: 1, respostas: { b: 2 }, situacao: { s: 1 } });
  });
  await teste('dados formato: a identificação da UO fica fora; equipe e pessoas entram', () => {
    assert.deepEqual(daContratacao({ objeto: 'X', unidade: 'GEX', responsavel_nome: 'F', diretor_nome: 'D', projetos_contas: [1],
      equipe_planejamento: [{ nome: 'A' }], pessoas: [{ nome: 'B' }] }),
    { objeto: 'X', equipe_planejamento: [{ nome: 'A' }], pessoas: [{ nome: 'B' }] });
  });
  await teste('dados junção: os quatro casos por campo; campos de outra peça ficam como estão', () => {
    const j = juntar({ a: '1', b: '1', c: '1', d: '1', outra: 'x' }, { a: '1', b: '2', c: '3', d: '4' }, { a: '9', b: '1', c: '3', d: '5', outra: 'y' }, ['a', 'b', 'c', 'd']);
    assert.deepEqual(j.resultado, { a: '9', b: '2', c: '3', d: '5', outra: 'y' });
    assert.deepEqual(j.trazidos, ['a']);
    assert.deepEqual(j.conflitos, [{ campo: 'd', meu: '4', deles: '5' }]);
  });
  await teste('dados junção: vazio, ausente e lista vazia são iguais; espaços das pontas não contam; tabela é um valor só; apagar conta', () => {
    assert.ok(iguais(undefined, '') && iguais(null, []) && iguais(' x ', 'x'));
    assert.ok(iguais([{ nome: 'A', cargo: 'B' }], [{ cargo: 'B', nome: 'A' }]), 'a ordem das chaves não conta');
    assert.ok(iguais([{ nome: 'A', cargo: '' }], [{ nome: 'A' }]), 'coluna vazia é o mesmo que coluna ausente');
    assert.ok(!iguais([{ nome: 'A' }], [{ nome: 'A' }, { nome: 'B' }]));
    assert.deepEqual(juntar({ a: 'x' }, { a: '' }, { a: 'x', b: 'y' }, ['a']).resultado, { b: 'y' }, 'apaguei o que só eu mudei: sai');
    const t = juntar({ equipe: [{ nome: 'A' }] }, { equipe: [{ nome: 'A' }, { nome: 'B' }] }, { equipe: [{ nome: 'C' }] }, ['equipe']);
    assert.deepEqual(t.conflitos.map(c => c.campo), ['equipe'], 'os dois mexeram na mesma tabela: conflito da tabela inteira');
  });
  await teste('dados junção: base vazia (a subida sem base): o que só um lado tem fica; diferente é conflito', () => {
    const j = juntar({}, { a: '1', b: '2' }, { b: '3', c: '4' }, ['a', 'b']);
    assert.deepEqual(j.resultado, { a: '1', b: '3', c: '4' });
    assert.deepEqual(j.conflitos, [{ campo: 'b', meu: '2', deles: '3' }]);
  });
  await teste('dados cliente: GET pelo nº SEI e pelo item, PUT com a versão; o 409 traz a ficha atual em ErroPca.corpo', async () => {
    const atual = { item_pca: 37, exercicio: 2026, versao: 3, dados: { esquema: 1, respostas: { objeto: 'Novo' } }, atualizado_em: '2026-10-11T14:32:00-03:00', atualizado_por: 'f@cfc.org.br' };
    let put = 0;
    const { buscar, pedidos } = buscarPca({
      'GET /ficha': () => ({ status: 200, corpo: atual }),
      'PUT /ficha': () => (++put === 1 ? { status: 409, corpo: { erro: 'versao_desatualizada', ficha: atual } } : { status: 200, corpo: { ...atual, versao: 4 } }),
    });
    const c = criarClientePca({ url: 'https://pca.exemplo.org', token: 'T' }, buscar);
    assert.equal((await c.ficha({ sei: '12345670000033.000076/2026-96' })).versao, 3);
    await c.ficha({ item_pca: 37, exercicio: 2026 });
    assert.deepEqual(pedidos.map(p => p.url), ['https://pca.exemplo.org/api/sei/ficha?sei=12345670000033.000076%2F2026-96',
      'https://pca.exemplo.org/api/sei/ficha?item=37&exercicio=2026']);
    const corpo = { item_pca: 37, exercicio: 2026, versao: 2, dados: { esquema: 1, respostas: {} } };
    await assert.rejects(c.gravarFicha(corpo), (e: unknown) => e instanceof ErroPca && e.codigo === 'versao_desatualizada' && e.status === 409
      && (e.corpo as { ficha: { versao: number } }).ficha.versao === 3 && /mudaram no PCA/.test(e.message));
    assert.equal((await c.gravarFicha({ ...corpo, versao: 3 })).versao, 4);
    assert.equal(pedidos[2].metodo, 'PUT');
    assert.deepEqual(pedidos[2].corpo, corpo);
  });
  await teste('dados cliente: erros próprios em palavras (grupo demandante, 512 KB, vários itens, sem item, rota ausente)', async () => {
    const casos: [number, unknown, string, RegExp][] = [
      [403, { erro: 'sem_permissao' }, 'sem_permissao', /grupo demandante/],
      [413, { erro: 'corpo_grande_demais' }, 'corpo_grande_demais', /limite do PCA \(512 KB\)/],
      [409, { erro: 'sei_em_varios_itens', itens: [{ item_pca: 1, exercicio: 2026 }, { item_pca: 2, exercicio: 2026 }] }, 'sei_em_varios_itens', /mais de um item/],
      [404, { erro: 'item_inexistente' }, 'item_inexistente', /sem item do PCA/],
      [404, undefined, 'processo_sem_item', /anterior à versão 1\.1/],
    ];
    for (const [status, corpo, codigo, msg] of casos) {
      const c = criarClientePca({ url: 'https://p', token: 't' }, buscarPca({ 'GET /ficha': () => ({ status, corpo }) }).buscar);
      await assert.rejects(c.ficha({ sei: 'P' }), (e: unknown) => e instanceof ErroPca && e.codigo === codigo && msg.test(e.message), `${status} ${codigo}`);
    }
  });
  await teste('dados do navegador: um por processo pelos dígitos do nº SEI; "desde" é o da primeira vez; base junto; apagar; sem storage, nada', async () => {
    const area = areaFalsa();
    const nr = '12345670000033.000076/2026-96';
    assert.equal(await lerLocal(area, nr), null);
    assert.ok(await guardarLocal(area, nr, { objeto: 'A' }, 1000));
    assert.ok(await guardarLocal(area, '12345670000033000076202696', { objeto: 'B' }, 2000, { objeto: 'Do PCA' }));
    assert.deepEqual(await lerLocal(area, nr), { esquema: 1, respostas: { objeto: 'B' }, base: { objeto: 'Do PCA' }, desde: 1000, em: 2000 });
    assert.ok(area.m.has('gelic_cfc_ficha:12345670000033000076202696'));
    await apagarLocal(area, nr);
    assert.equal(await lerLocal(area, nr), null);
    assert.equal(await guardarLocal(null, nr, {}, 1), false);
    area.m.set(chaveLocal('P-1'), 'lixo');
    assert.equal(await lerLocal(area, 'P-1'), null, 'formato estranho conta como nada guardado');
  });
  await teste('dados abrir: sem configuração ou sem item, navegador; com item e permissão, PCA; sem permissão ou esquema novo, só leitura; PCA fora, navegador com a mensagem', async () => {
    const area = areaFalsa();
    const deps = (pca: ReturnType<typeof pcaFalso> | null, podeInstruir = true): DepsDados => ({ protocolo: 'P-1', area, cliente: pca?.cliente ?? null, podeInstruir, agora: () => 1 });
    assert.deepEqual(await abrirDados(deps(null)), { modo: 'navegador', motivo: 'PCA não configurado nesta extensão', pca: null, local: null, itens: [] });
    assert.equal((await abrirDados(deps(pcaFalso()))).motivo, 'processo sem item do PCA');
    const pca = comItem({ objeto: 'A' });
    const e = await abrirDados(deps(pca));
    assert.equal(e.modo, 'pca');
    assert.deepEqual([e.pca!.versao, e.pca!.respostas, e.pca!.por, e.pca!.item], [1, { objeto: 'A' }, 'fulano@cfc.org.br', ITEM_37]);
    assert.equal(salvoPor(e.pca!.por, e.pca!.em), 'salvo por fulano, 11/10 14:32');
    assert.equal(quemSalvou(e.pca!.por, e.pca!.em), 'fulano salvou em 11/10 14:32');
    assert.deepEqual([salvoPor(null, null), quemSalvou(null, null)], ['salvo no PCA', 'foram salvos']);
    const sem = await abrirDados(deps(pca, false));
    assert.deepEqual([sem.modo, sem.motivo], ['leitura', 'sem permissão de gravar os dados da contratação (grupo demandante no PCA)']);
    pca.fichas.set('37/2026', { ...ITEM_37, versao: 5, dados: { esquema: 2, respostas: { objeto: 'B' } }, atualizado_em: null, atualizado_por: null });
    const novo = await abrirDados(deps(pca));
    assert.deepEqual([novo.modo, novo.pca!.respostas.objeto], ['leitura', 'B']);
    assert.match(novo.motivo!, /atualize a extensão/);
    pca.falharProximo(new ErroPca('tempo', 'o PCA não respondeu a tempo'));
    const fora = await abrirDados(deps(pca));
    assert.deepEqual([fora.modo, fora.motivo], ['navegador', 'o PCA não respondeu a tempo']);
  });
  await teste('dados abrir: processo em vários itens usa o item informado; sem ele, ou fora da lista, a pessoa escolhe', async () => {
    const pca = pcaFalso();
    const i38 = { item_pca: 38, exercicio: 2026 };
    pca.vinculos.set('P-1', [ITEM_37, i38]);
    pca.outraPessoa(i38, { objeto: 'Do 38' });
    const deps: DepsDados = { protocolo: 'P-1', area: areaFalsa(), cliente: pca.cliente, podeInstruir: true, agora: () => 1 };
    const e = await abrirDados(deps, i38);
    assert.deepEqual([e.modo, e.pca!.item, e.pca!.respostas.objeto], ['pca', i38, 'Do 38']);
    for (const informado of [null, { item_pca: 99, exercicio: 2026 }]) {
      const x = await abrirDados(deps, informado);
      assert.deepEqual([x.modo, x.itens], ['navegador', [ITEM_37, i38]], JSON.stringify(informado));
      assert.match(x.motivo!, /mais de um item do PCA: escolha o item/);
    }
  });
  await teste('dados salvar: grava com a versão; 409 junta por campo e grava na versão nova (o trazido volta); sem mudança, nada vai ao PCA', async () => {
    const pca = comItem({ objeto: 'A', vinculacao: 'V' });
    const deps: DepsDados = { protocolo: 'P-1', area: areaFalsa(), cliente: pca.cliente, podeInstruir: true, agora: () => 1 };
    const e = await abrirDados(deps);
    pca.outraPessoa(ITEM_37, { objeto: 'A', vinculacao: 'V nova' });
    const campos = ['objeto', 'justificativa', 'vinculacao'];
    const r = await salvarDados(deps, e, e.pca!.respostas, { objeto: 'A', justificativa: 'J', vinculacao: 'V' }, campos);
    assert.equal(r.tipo, 'pca');
    assert.deepEqual(pca.pedidos.filter(p => p.startsWith('PUT')), ['PUT 37/2026 v1', 'PUT 37/2026 v2']);
    assert.deepEqual(respostasDe(pca.ler(ITEM_37)), { objeto: 'A', vinculacao: 'V nova', justificativa: 'J' });
    if (r.tipo !== 'pca') return;
    assert.deepEqual(r.trazidos, { vinculacao: 'V nova' });
    assert.equal(r.estado.pca!.versao, 3);
    const n = pca.pedidos.length;
    assert.equal((await salvarDados(deps, r.estado, r.base, { objeto: 'A', justificativa: 'J', vinculacao: 'V nova' }, campos)).tipo, 'pca');
    assert.equal(pca.pedidos.length, n, 'nada mudou: nada vai ao PCA');
  });
  await teste('dados salvar: o mesmo campo dos dois lados volta como conflito; depois da escolha (base = deles) grava; três 409 seguidos desistem', async () => {
    const pca = comItem({ justificativa: 'J' });
    const deps: DepsDados = { protocolo: 'P-1', area: areaFalsa(), cliente: pca.cliente, podeInstruir: true, agora: () => 1 };
    const e = await abrirDados(deps);
    pca.outraPessoa(ITEM_37, { justificativa: 'J deles' });
    const r = await salvarDados(deps, e, e.pca!.respostas, { justificativa: 'J meu' }, ['justificativa']);
    assert.equal(r.tipo, 'conflito');
    if (r.tipo !== 'conflito') return;
    assert.deepEqual(r.juncao.conflitos, [{ campo: 'justificativa', meu: 'J meu', deles: 'J deles' }]);
    assert.equal((await salvarDados(deps, r.estado, r.deles, { justificativa: 'J meu' }, ['justificativa'])).tipo, 'pca');
    assert.equal(respostasDe(pca.ler(ITEM_37)).justificativa, 'J meu');
    const teimoso = comItem({ objeto: 'A' });
    const d2: DepsDados = { ...deps, cliente: teimoso.cliente };
    const e2 = await abrirDados(d2);
    const original = teimoso.cliente.gravarFicha;
    let n = 0;
    teimoso.cliente.gravarFicha = async c => { n++; teimoso.outraPessoa(ITEM_37, { objeto: 'A', outro: String(n) }); return original(c); };
    const x = await salvarDados(d2, e2, e2.pca!.respostas, { objeto: 'A', justificativa: 'J' }, ['objeto', 'justificativa']);
    assert.deepEqual(x, { tipo: 'erro', motivo: 'os dados da contratação estão mudando agora; tente de novo em instantes' });
    assert.equal(n, TENTATIVAS);
  });
  await teste('dados salvar: PCA fora, 403 e 413 guardam neste navegador com a base do PCA (403 passa a só leitura); sem storage, nada é dado como salvo', async () => {
    const casos: [ErroPca, Modo][] = [
      [new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)'), 'pca'],
      [new ErroPca('sem_permissao', 'seu usuário do PCA não pode gravar os dados da contratação: peça a inclusão no grupo demandante', 403), 'leitura'],
      [new ErroPca('corpo_grande_demais', 'os dados da contratação passaram do limite do PCA (512 KB)', 413), 'pca'],
    ];
    for (const [erro, modo] of casos) {
      const pca = comItem({ objeto: 'A' });
      const area = areaFalsa();
      const deps: DepsDados = { protocolo: 'P-1', area, cliente: pca.cliente, podeInstruir: true, agora: () => 7 };
      const e = await abrirDados(deps);
      pca.falharProximo(erro);
      const r = await salvarDados(deps, e, e.pca!.respostas, { objeto: 'A meu', justificativa: '' }, ['objeto', 'justificativa']);
      assert.equal(r.tipo, 'navegador', erro.codigo);
      if (r.tipo !== 'navegador') continue;
      assert.deepEqual([r.motivo, r.estado.modo], [erro.message, modo], erro.codigo);
      assert.deepEqual(await lerLocal(area, 'P-1'), { esquema: 1, respostas: { objeto: 'A meu', justificativa: '' }, base: { objeto: 'A' }, desde: 7, em: 7 });
    }
    const pca = comItem({ objeto: 'A' });
    const semArea: DepsDados = { protocolo: 'P-1', area: null, cliente: pca.cliente, podeInstruir: true, agora: () => 1 };
    const e = await abrirDados(semArea);
    pca.falharProximo(new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)'));
    assert.deepEqual(await salvarDados(semArea, e, e.pca!.respostas, { objeto: 'B' }, ['objeto']),
      { tipo: 'erro', motivo: 'o PCA não respondeu (rede ou endereço); e este navegador não guardou os dados' });
  });
  await teste('dados salvar: sem PCA, junta com outra janela deste navegador; a subida usa a base guardada (sem conflito falso) e limpa o navegador', async () => {
    const area = areaFalsa();
    const semPca: DepsDados = { protocolo: 'P-1', area, cliente: null, podeInstruir: true, agora: () => 3 };
    const a = await abrirDados(semPca);
    const b = await abrirDados(semPca);
    assert.equal((await salvarDados(semPca, a, {}, { objeto: 'A' }, ['objeto'])).tipo, 'navegador');
    assert.equal((await salvarDados(semPca, b, {}, { objeto: 'B' }, ['objeto'])).tipo, 'conflito', 'a outra janela salvou o mesmo campo');
    await guardarLocal(area, 'P-1', { objeto: 'A meu', justificativa: 'J' }, 3, { objeto: 'A' });
    const pca = comItem({ objeto: 'A' });
    const deps: DepsDados = { ...semPca, cliente: pca.cliente };
    const e = await abrirDados(deps);
    assert.ok(e.local, 'no modo PCA, os dados do navegador esperam a subida');
    const r = await salvarDados(deps, e, e.local!.base, e.local!.respostas, Object.keys(e.local!.respostas), { subindo: true });
    assert.equal(r.tipo, 'pca');
    assert.deepEqual(respostasDe(pca.ler(ITEM_37)), { objeto: 'A meu', justificativa: 'J' });
    assert.equal(await lerLocal(area, 'P-1'), null);
    await guardarLocal(area, 'P-1', { justificativa: 'J' }, 4);
    const e2 = await abrirDados(deps);
    await salvarDados(deps, e2, e2.pca!.respostas, { objeto: 'A meu 2' }, ['objeto']);
    assert.equal(await lerLocal(area, 'P-1'), null, 'o que sobrou no navegador já estava igual no PCA: saiu');
  });
  const docVazio = () => parseHTML('<html><body></body></html>').document as unknown as Document;
  await teste('conflito: um bloco por campo com o seu e o salvo; "Usar" só com todas as escolhas; atalhos; tabela legível', () => {
    const doc = docVazio();
    const usadas: Escolhas[] = [];
    const s = montarConflito(doc, {
      quem: 'fulano salvou em 11/10 14:32',
      conflitos: [{ campo: 'objeto', meu: 'Meu', deles: 'Deles' }, { campo: 'equipe_planejamento', meu: [{ nome: 'Ana', cargo: 'Analista' }], deles: [] }],
      rotulo: c => (c === 'objeto' ? 'Objeto' : 'Equipe'), aoUsar: e => usadas.push(e),
    });
    doc.body.append(s);
    assert.match(s.textContent!, /Os dados da contratação mudaram desde que você começou/);
    assert.match(s.textContent!, /fulano salvou em 11\/10 14:32/);
    assert.equal(s.querySelectorAll('[data-gelic-conflito-campo]').length, 2);
    const equipe = s.querySelector('[data-gelic-conflito-campo=equipe_planejamento]')!.textContent!;
    assert.match(equipe, /O seu: 1 linha: Ana · Analista/);
    assert.match(equipe, /O salvo: \(vazio\)/);
    assert.doesNotMatch(s.textContent!, /object Object/);
    const usar = s.querySelector<HTMLButtonElement>('[data-gelic-acao=conflito-usar]')!;
    assert.ok(usar.hasAttribute('disabled'));
    s.querySelector<HTMLButtonElement>('[data-gelic-conflito-campo=objeto] [data-gelic-escolha=deles]')!.click();
    assert.ok(usar.hasAttribute('disabled'), 'falta a equipe');
    usar.click();
    assert.equal(usadas.length, 0, 'sem todas as escolhas, nada');
    s.querySelector<HTMLButtonElement>('[data-gelic-acao=conflito-meus]')!.click();
    assert.ok(!usar.hasAttribute('disabled'));
    assert.equal(s.querySelector('[data-gelic-conflito-campo=objeto] [data-gelic-escolha=meu]')!.getAttribute('aria-pressed'), 'true', 'o atalho troca a escolha');
    usar.click();
    assert.deepEqual(usadas, [{ objeto: { lado: 'meu', valor: 'Meu' }, equipe_planejamento: { lado: 'meu', valor: [{ nome: 'Ana', cargo: 'Analista' }] } }]);
  });
  await teste('conflito: texto longo mostra o começo e "ver tudo"; objeto vira "chave: valor"', () => {
    const doc = docVazio();
    const s = montarConflito(doc, { quem: 'x', conflitos: [{ campo: 'justificativa', meu: 'a'.repeat(300), deles: 'curto' }], rotulo: c => c, aoUsar: () => {} });
    const campo = s.querySelector('[data-gelic-conflito-campo=justificativa]')!;
    assert.equal(campo.querySelectorAll('details').length, 1, '"ver tudo" só no texto longo');
    assert.match(campo.querySelector('summary')!.textContent!, /ver tudo/);
    assert.ok(s.querySelector('[data-gelic-escolha] details') === null, 'fora dos botões de escolha');
    assert.equal(resumoDoValor({ item: 1, vazio: '' }), 'item: 1');
  });
  await teste('sobe depois: desde e quantos campos; levar e agora não; descartar só no segundo clique', () => {
    const doc = docVazio();
    const feitos: string[] = [];
    const s = montarSubir(doc, { desde: new Date(2026, 9, 10, 12).getTime(), campos: 2, item: '37/2026',
      aoLevar: () => feitos.push('levar'), aoDepois: () => feitos.push('depois'), aoDescartar: () => feitos.push('descartar') });
    assert.match(s.textContent!, /guardados neste navegador \(desde 10\/10, 2 campos\)\. Levar para o item 37\/2026 no PCA\?/);
    s.querySelector<HTMLButtonElement>('[data-gelic-acao=subir-levar]')!.click();
    s.querySelector<HTMLButtonElement>('[data-gelic-acao=subir-depois]')!.click();
    const descartar = s.querySelector<HTMLButtonElement>('[data-gelic-acao=subir-descartar]')!;
    descartar.click();
    assert.deepEqual(feitos, ['levar', 'depois'], 'o primeiro clique em descartar só pede confirmação');
    assert.match(descartar.textContent!, /Confirmar: apagar os dados deste navegador/);
    descartar.click();
    assert.deepEqual(feitos, ['levar', 'depois', 'descartar']);
  });
  await teste('janela e dados: camadas na abertura (UO, análise, dados do PCA, digitado); rascunho antigo sem conflito; origem "salvo por"; barra do modo PCA', async () => {
    const pca = comItem({ objeto: 'Do PCA', justificativa: 'Do PCA', unidade: 'XYZ' });
    const area = areaFalsa();
    await guardarRascunho(area, 'P-1', 'dfd', { justificativa: 'Digitado' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca, area).deps);
    assert.equal(valorNaJanela(doc, 'objeto'), 'Do PCA');
    assert.match(origemNaJanela(doc, 'objeto'), /salvo por fulano, 11\/10 14:32/);
    assert.equal(valorNaJanela(doc, 'justificativa'), 'Digitado', 'o rascunho no formato antigo conta como digitado');
    assert.equal(valorNaJanela(doc, 'unidade'), 'GEX', 'a identificação da UO não vem dos dados da contratação');
    assert.ok(doc.querySelector('[data-gelic-conflito]') === null);
    const barra = doc.querySelector('.gelic-dados')!;
    assert.equal(barra.getAttribute('data-gelic-dados'), 'pca');
    assert.match(barra.textContent!, /item 37\/2026 no PCA · salvo por fulano, 11\/10 14:32/);
  });
  await teste('janela e dados: do rascunho volta só o digitado e o redigido pela IA; o resto é lido de novo', async () => {
    const pca = comItem({ objeto: 'Novo no PCA' });
    const area = areaFalsa();
    await guardarRascunho(area, 'P-1', 'dfd', { valores: { objeto: 'Velho', justificativa: 'Da IA', vinculacao: 'Minha' },
      evidencias: { objeto: { fonte: 'ficha', nota: 'salvo por x' }, justificativa: { fonte: 'agente', nota: 'redigido pela IA: valide' }, vinculacao: { fonte: 'usuario' } } });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca, area).deps);
    assert.equal(valorNaJanela(doc, 'objeto'), 'Novo no PCA');
    assert.equal(valorNaJanela(doc, 'justificativa'), 'Da IA');
    assert.match(origemNaJanela(doc, 'justificativa'), /redigido pela IA/);
    assert.equal(valorNaJanela(doc, 'vinculacao'), 'Minha');
  });
  await teste('janela e dados: sem PCA, sem item e sem permissão: a barra diz o modo e o motivo; os dados do navegador entram', async () => {
    const casos: [ReturnType<typeof pcaFalso> | null, boolean, string, RegExp][] = [
      [null, true, 'navegador', /neste navegador \(PCA não configurado nesta extensão\)/],
      [pcaFalso(), true, 'navegador', /neste navegador \(processo sem item do PCA\)/],
      [comItem({ objeto: 'Do PCA' }), false, 'leitura', /item 37\/2026 no PCA, só leitura \(sem permissão de gravar os dados da contratação/],
    ];
    for (const [pca, podeInstruir, modo, texto] of casos) {
      const area = areaFalsa();
      await guardarLocal(area, 'P-1', { justificativa: 'Do navegador' }, 1000);
      const doc = janela();
      await montarJanela(doc, depsJanela(pca, area, { podeInstruir }).deps);
      const barra = doc.querySelector('.gelic-dados')!;
      assert.equal(barra.getAttribute('data-gelic-dados'), modo);
      assert.match(barra.textContent!, texto);
      assert.equal(valorNaJanela(doc, 'justificativa'), 'Do navegador', modo);
      assert.match(origemNaJanela(doc, 'justificativa'), /salvo neste navegador/);
    }
  });
  await teste('janela e dados: rascunho de uma versão anterior junta na abertura; o mesmo campo dos dois abre a escolha', async () => {
    const pca = comItem({ objeto: 'A', justificativa: 'J' });
    const area = areaFalsa();
    await guardarRascunho(area, 'P-1', 'dfd', { valores: { objeto: 'A meu', justificativa: 'J meu' },
      evidencias: { objeto: { fonte: 'usuario' }, justificativa: { fonte: 'usuario' } }, ficha: { versao: 1, base: { objeto: 'A', justificativa: 'J' } } });
    pca.outraPessoa(ITEM_37, { objeto: 'A', justificativa: 'J deles', vinculacao: 'V deles' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca, area).deps);
    assert.equal(valorNaJanela(doc, 'objeto'), 'A meu', 'só eu mudei: fica o meu');
    assert.equal(valorNaJanela(doc, 'vinculacao'), 'V deles', 'só eles mudaram: entra');
    assert.equal(doc.querySelectorAll('[data-gelic-conflito-campo]').length, 1, 'a justificativa mudou dos dois lados');
    await clicar(doc, 'conflito-meus');
    await clicar(doc, 'conflito-usar');
    assert.equal(valorNaJanela(doc, 'justificativa'), 'J meu');
    assert.ok(doc.querySelector('[data-gelic-conflito]') === null, 'escolhido, o painel sai');
    assert.equal(((await lerRascunho(area, 'P-1', 'dfd'))!.ficha as { versao: number }).versao, 2, 'o rascunho passa a valer na versão nova');
  });
  await teste('janela e dados: processo em dois itens — sem item informado, a barra oferece a escolha; escolher abre os dados do item', async () => {
    const pca = pcaFalso();
    const i38 = { item_pca: 38, exercicio: 2026 };
    pca.vinculos.set('P-1', [ITEM_37, i38]);
    pca.outraPessoa(i38, { objeto: 'Do 38' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca).deps);
    assert.match(doc.querySelector('.gelic-dados')!.textContent!, /mais de um item do PCA: escolha o item/);
    const opcoes = doc.querySelectorAll('[data-gelic-dados-item] option');
    assert.equal(opcoes.length, 2);
    opcoes[1].setAttribute('selected', '');
    await clicar(doc, 'dados-item');
    assert.equal(valorNaJanela(doc, 'objeto'), 'Do 38');
    assert.match(doc.querySelector('.gelic-dados')!.textContent!, /item 38\/2026 no PCA/);
  });
  await teste('janela e dados: "Salvar dados da contratação" manda só os campos visíveis (sem UO nem padrão) com a versão; o que outra pessoa mudou entra destacado', async () => {
    const pca = comItem({ objeto: 'A', vinculacao: 'V' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca).deps);
    digitar(doc, 'justificativa', 'Minha justificativa');
    digitar(doc, 'diretor_nome', 'Fulano Diretor');
    pca.outraPessoa(ITEM_37, { objeto: 'A', vinculacao: 'V nova' });
    await clicar(doc, 'salvar-dados');
    assert.deepEqual(pca.pedidos.filter(p => p.startsWith('PUT')), ['PUT 37/2026 v1', 'PUT 37/2026 v2'], 'o 409 da v1 junta e grava na v2');
    const respostas = respostasDe(pca.ler(ITEM_37));
    assert.equal(respostas.justificativa, 'Minha justificativa');
    assert.equal(respostas.vinculacao, 'V nova', 'o que só a outra pessoa mudou fica');
    assert.ok(!('diretor_nome' in respostas), 'a identificação da UO não vai');
    assert.ok(!('data_pretendida' in respostas), 'o valor padrão da tela não vai');
    assert.equal(valorNaJanela(doc, 'vinculacao'), 'V nova');
    assert.ok(doc.querySelector('[data-gelic-campo=vinculacao]')!.classList.contains('gelic-trazido'));
    assert.match(statusDe(doc), /salvos no PCA/);
    assert.match(doc.querySelector('.gelic-dados')!.textContent!, /salvo por eu, 11\/10 14:32/);
  });
  await teste('janela e dados: "Gravar no SEI" salva os dados antes da peça; mudança de outra pessoa num campo visível para e pede para conferir', async () => {
    const pca = comItem({ objeto: 'A' });
    const { deps, gravados } = depsJanela(pca);
    const doc = janela();
    await montarJanela(doc, deps);
    digitar(doc, 'justificativa', 'J');
    pca.outraPessoa(ITEM_37, { objeto: 'A mudado' });
    await gravarNoSei(doc);
    assert.equal(gravados.length, 0, 'parou para conferir');
    assert.match(statusDe(doc), /mudaram em [^.]*\(destacados\)\. Confira e clique de novo em "Confirmar e gravar"/);
    assert.equal(valorNaJanela(doc, 'objeto'), 'A mudado');
    await gravarNoSei(doc);
    assert.equal(gravados.length, 1, 'na segunda, grava');
    assert.equal(gravados[0].dados.objeto, 'A mudado');
    assert.equal(respostasDe(pca.ler(ITEM_37)).justificativa, 'J', 'os dados foram salvos antes da peça');
  });
  await teste('janela e dados: conflito ao salvar — escolha campo a campo; só salva com tudo escolhido; nada vai ao SEI', async () => {
    const pca = comItem({ justificativa: 'J' });
    const { deps, gravados } = depsJanela(pca);
    const doc = janela();
    await montarJanela(doc, deps);
    digitar(doc, 'justificativa', 'J minha');
    pca.outraPessoa(ITEM_37, { justificativa: 'J deles' });
    await clicar(doc, 'salvar-dados');
    assert.match(doc.querySelector('[data-gelic-conflito]')!.textContent!, /fulano salvou em 11\/10 14:32/);
    await clicar(doc, 'conflito-usar');
    assert.ok(doc.querySelector('[data-gelic-conflito]') !== null, 'sem escolha, nada');
    await clicar(doc, 'conflito-meus');
    await clicar(doc, 'conflito-usar');
    assert.ok(doc.querySelector('[data-gelic-conflito]') === null);
    assert.equal(respostasDe(pca.ler(ITEM_37)).justificativa, 'J minha');
    assert.equal(gravados.length, 0);
  });
  await teste('janela e dados: PCA fora do ar ao gravar — os dados ficam no navegador, com aviso, e a peça é gravada assim mesmo', async () => {
    const pca = comItem({ objeto: 'A' });
    const area = areaFalsa();
    const { deps, gravados } = depsJanela(pca, area);
    const doc = janela();
    await montarJanela(doc, deps);
    digitar(doc, 'justificativa', 'J');
    pca.falharProximo(new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)'));
    await gravarNoSei(doc);
    assert.equal(gravados.length, 1);
    assert.match(statusDe(doc), /SEI nº 9999001.*ficaram neste navegador: o PCA não respondeu/);
    const local = await lerLocal(area, 'P-1');
    assert.equal(local!.respostas.justificativa, 'J');
    assert.equal(local!.base.objeto, 'A', 'a base do PCA vai junto, para subir sem conflito falso');
  });
  await teste('janela e dados: depois da escolha do conflito o PCA cai — os dados ficam no navegador, e o rascunho também', async () => {
    const pca = comItem({ justificativa: 'J' });
    const area = areaFalsa();
    const doc = janela();
    await montarJanela(doc, depsJanela(pca, area).deps);
    digitar(doc, 'justificativa', 'J minha');
    pca.outraPessoa(ITEM_37, { justificativa: 'J deles' });
    await clicar(doc, 'salvar-dados');
    pca.falharProximo(new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)'));
    await clicar(doc, 'conflito-meus');
    await clicar(doc, 'conflito-usar');
    assert.match(statusDe(doc), /ficaram neste navegador: o PCA não respondeu/);
    assert.equal((await lerLocal(area, 'P-1'))!.respostas.justificativa, 'J minha');
    assert.ok(await lerRascunho(area, 'P-1', 'dfd'), 'o rascunho continua');
  });
  await teste('janela e dados: sobe depois — levar grava no PCA e limpa o navegador; "Agora não" mantém; descartar pede o segundo clique', async () => {
    const preparar = async () => {
      const pca = comItem({ objeto: 'A' });
      const area = areaFalsa();
      await guardarLocal(area, 'P-1', { objeto: 'A meu', justificativa: 'J' }, new Date(2026, 9, 10, 12).getTime(), { objeto: 'A' });
      const doc = janela();
      await montarJanela(doc, depsJanela(pca, area).deps);
      return { pca, area, doc };
    };
    const um = await preparar();
    assert.match(um.doc.querySelector('[data-gelic-subir]')!.textContent!, /desde 10\/10, 2 campos\)\. Levar para o item 37\/2026 no PCA\?/);
    assert.equal(valorNaJanela(um.doc, 'objeto'), 'A', 'antes de levar, a tela mostra o PCA');
    await clicar(um.doc, 'subir-levar');
    assert.deepEqual(respostasDe(um.pca.ler(ITEM_37)), { objeto: 'A meu', justificativa: 'J' });
    assert.equal(await lerLocal(um.area, 'P-1'), null);
    assert.ok(um.doc.querySelector('[data-gelic-subir]') === null);
    assert.equal(valorNaJanela(um.doc, 'objeto'), 'A meu');
    const dois = await preparar();
    await clicar(dois.doc, 'subir-depois');
    assert.ok(dois.doc.querySelector('[data-gelic-subir]') === null);
    assert.ok(await lerLocal(dois.area, 'P-1'), '"Agora não" não apaga');
    const tres = await preparar();
    await clicar(tres.doc, 'subir-descartar');
    assert.ok(await lerLocal(tres.area, 'P-1'), 'o primeiro clique só pede confirmação');
    await clicar(tres.doc, 'subir-descartar');
    assert.equal(await lerLocal(tres.area, 'P-1'), null);
  });
  await teste('situação: do roteiro (o "em" fora da comparação); grava em cada item ligado, só a do processo; não grava de novo se não mudou', async () => {
    const pca = pcaFalso();
    const i38 = { item_pca: 38, exercicio: 2026 };
    pca.outraPessoa(ITEM_37, { objeto: 'A' }, { 'OUTRO-9': { completa: true } });
    const docs = docsDaArvore({ documentos: [
      { titulo: 'Documento de Formalização da Demanda (DFD)', numero: '111', assinado: false, assinaturas: [{}], externo: false, src: 'x', cancelado: false },
      { titulo: 'Cancelado', numero: '222', assinado: true, assinaturas: [], externo: false, src: 'x', cancelado: true },
    ] } as never);
    assert.deepEqual(docs.map(d => [d.numero, d.assinado]), [['111', true]], 'cancelado fora; assinatura no quadro conta');
    const rot = roteiro(docs);
    const s = situacaoDoRoteiro(rot, new Date(Date.UTC(2026, 9, 11, 17, 32)));
    assert.equal(s.em, '2026-10-11T17:32:00.000Z');
    assert.deepEqual([s.passos[0].chave, s.passos[0].estado, s.passos[0].numero], ['dfd', 'feito', '111']);
    assert.equal(s.passos.length, rot.passos.length);
    const area = areaFalsa();
    const deps = { cliente: pca.cliente, area, agora: () => 5 };
    assert.deepEqual(await gravarSituacao('P-1', [ITEM_37, i38], s, deps), ['gravada', 'gravada']);
    const d37 = pca.ler(ITEM_37).dados as { respostas: Record<string, unknown>; situacao: Record<string, unknown> };
    assert.equal(d37.respostas.objeto, 'A', 'as respostas ficam');
    assert.deepEqual(Object.keys(d37.situacao).sort(), ['OUTRO-9', 'P-1'], 'a de outro processo fica');
    const antes = pca.pedidos.length;
    assert.deepEqual(await gravarSituacao('P-1', [ITEM_37], situacaoDoRoteiro(rot, new Date()), deps), ['em_dia']);
    assert.equal(pca.pedidos.length, antes, 'só o "em" mudou: nada vai ao PCA');
  });
  await teste('situação: 409 reaplica sobre o que veio; falha não fica lembrada (tenta de novo); esquema mais novo não grava', async () => {
    const s = situacaoDoRoteiro(roteiro([]), new Date(0));
    const pca = comItem({ objeto: 'A' });
    pca.antesDoPut(() => pca.outraPessoa(ITEM_37, { objeto: 'no meio' }));
    assert.deepEqual(await gravarSituacao('P-1', [ITEM_37], s, { cliente: pca.cliente, area: areaFalsa(), agora: () => 1 }), ['gravada']);
    assert.equal(respostasDe(pca.ler(ITEM_37)).objeto, 'no meio', 'o gravado no meio fica');
    const area = areaFalsa();
    pca.falharProximo(new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)'));
    const [falhou] = await gravarSituacao('P-2', [ITEM_37], s, { cliente: pca.cliente, area, agora: () => 1 });
    assert.match((falhou as { erro: string }).erro, /não respondeu/);
    assert.deepEqual(await gravarSituacao('P-2', [ITEM_37], s, { cliente: pca.cliente, area, agora: () => 2 }), ['gravada'], 'na próxima abertura, grava');
    const novo = pcaFalso();
    novo.fichas.set('37/2026', { ...ITEM_37, versao: 1, dados: { esquema: 2 }, atualizado_em: null, atualizado_por: null });
    const [x] = await gravarSituacao('P-1', [ITEM_37], s, { cliente: novo.cliente, area: areaFalsa(), agora: () => 1 });
    assert.match((x as { erro: string }).erro, /formato mais novo/);
    assert.ok(!novo.pedidos.some(p => p.startsWith('PUT')));
  });
  await teste('situação: no SEI CFC a permissão de instruir é conferida de novo a cada 12 h', async () => {
    const area = areaFalsa();
    const config: ConfigGuardada = { url: 'https://p', token: 't', pode_instruir: false, conferido_em: 1 };
    await guardarConfigPca(area, config);
    let saudes = 0;
    const saude = async () => { saudes++; return { versao: 1, pode_instruir: true, pode_enviar: false }; };
    const c = await permissaoEmDia(config, area, 'cfc', REVER_PERMISSAO_MS + 2, saude);
    assert.deepEqual([c.pode_instruir, saudes], [true, 1]);
    assert.equal((await lerConfigPca(area))!.pode_instruir, true);
    assert.equal((await permissaoEmDia(c, area, 'cfc', REVER_PERMISSAO_MS + 3, saude)).pode_instruir, true);
    assert.equal(saudes, 1, 'dentro das 12 h, não pergunta');
  });
  // ---- revisão final (achados reproduzidos)
  await teste('janela e dados (revisão): sobe depois com conflito não reverte nem apaga o que só o PCA mudou', async () => {
    const pca = comItem({ objeto: 'A', justificativa: 'J' });
    const area = areaFalsa();
    await guardarLocal(area, 'P-1', { objeto: 'A meu', justificativa: 'J', vinculacao: '' }, 1, { objeto: 'A', justificativa: 'J' });
    pca.outraPessoa(ITEM_37, { objeto: 'A fulano', justificativa: 'J fulano', vinculacao: 'V fulano' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca, area).deps);
    await clicar(doc, 'subir-levar');
    assert.equal(doc.querySelectorAll('[data-gelic-conflito-campo]').length, 1, 'só o objeto mudou dos dois lados');
    await clicar(doc, 'conflito-meus');
    await clicar(doc, 'conflito-usar');
    assert.deepEqual(respostasDe(pca.ler(ITEM_37)), { objeto: 'A meu', justificativa: 'J fulano', vinculacao: 'V fulano' });
  });
  await teste('janela e dados (revisão): com a escolha da abertura pendente, salvar e gravar não seguem, e o rascunho guarda o meu', async () => {
    const pca = comItem({ justificativa: 'J' });
    const area = areaFalsa();
    await guardarRascunho(area, 'P-1', 'dfd', { valores: { justificativa: 'O meu' }, evidencias: { justificativa: { fonte: 'usuario' } }, ficha: { versao: 1, base: { justificativa: 'J' } } });
    pca.outraPessoa(ITEM_37, { justificativa: 'O fulano' });
    const { deps, gravados } = depsJanela(pca, area);
    const doc = janela();
    await montarJanela(doc, deps);
    digitar(doc, 'vinculacao', 'V');
    await clicar(doc, 'salvar-dados');
    await gravarNoSei(doc);
    assert.equal(gravados.length, 0, 'nada vai ao SEI');
    assert.match(statusDe(doc), /Escolha acima/);
    assert.ok(doc.querySelector('[data-gelic-conflito]') !== null, 'a escolha continua na tela');
    assert.equal(respostasDe(pca.ler(ITEM_37)).justificativa, 'O fulano', 'nada foi salvo por cima');
    assert.equal(((await lerRascunho(area, 'P-1', 'dfd'))!.valores as Record<string, unknown>).justificativa, 'O meu', 'o rascunho guarda o meu');
  });
  await teste('janela e dados (revisão): gravar sem mexer em nada confere os dados no PCA antes; o que outra pessoa salvou entra e para para conferir', async () => {
    const pca = comItem({ objeto: 'O' });
    const { deps, gravados } = depsJanela(pca);
    const doc = janela();
    await montarJanela(doc, deps);
    pca.outraPessoa(ITEM_37, { objeto: 'O novo' });
    await gravarNoSei(doc);
    assert.equal(gravados.length, 0, 'parou para conferir');
    assert.equal(valorNaJanela(doc, 'objeto'), 'O novo');
    await gravarNoSei(doc);
    assert.equal(gravados.length, 1);
    assert.equal(gravados[0].dados.objeto, 'O novo');
  });
  await teste('janela e dados (revisão): escolher o item (processo em dois itens) não apaga o que a pessoa digitou', async () => {
    const pca = pcaFalso();
    const i38 = { item_pca: 38, exercicio: 2026 };
    pca.vinculos.set('P-1', [ITEM_37, i38]);
    pca.outraPessoa(i38, { justificativa: 'J 38', objeto: 'O 38' });
    const doc = janela();
    await montarJanela(doc, depsJanela(pca).deps);
    digitar(doc, 'justificativa', 'Minha J');
    doc.querySelectorAll('[data-gelic-dados-item] option')[1].setAttribute('selected', '');
    await clicar(doc, 'dados-item');
    assert.equal(valorNaJanela(doc, 'justificativa'), 'Minha J');
    assert.equal(valorNaJanela(doc, 'objeto'), 'O 38');
  });
  await teste('conflito (revisão): abrir o "ver tudo" para ler não escolhe aquele lado', () => {
    const doc = docVazio();
    const s = montarConflito(doc, { quem: 'x', conflitos: [{ campo: 'justificativa', meu: 'a'.repeat(300), deles: 'b'.repeat(300) }], rotulo: c => c, aoUsar: () => {} });
    for (const r of s.querySelectorAll<HTMLElement>('details summary')) r.click();
    assert.deepEqual([...s.querySelectorAll('[data-gelic-escolha]')].map(b => b.getAttribute('aria-pressed')), ['false', 'false']);
    assert.ok(s.querySelector<HTMLButtonElement>('[data-gelic-acao=conflito-usar]')!.hasAttribute('disabled'));
  });
}
