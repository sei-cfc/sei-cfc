/**
 * "Iniciar processo" (src/iniciar/): árvore inicial, telas do SEI (fixtures sintéticos no formato do SEI 4.1) e execução.
 */
import assert from 'node:assert/strict';
import { roteiro } from '../src/peca/roteiro';
import { arvoreInicial, especificacao } from '../src/iniciar/arvore-inicial';
import { tipoFonteCfc } from '../src/modelos/fontes-cfc';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { Sei } from '../../sei-nucleo/src/sei';
import { lerArvore } from '../../sei-nucleo/src/dominio/arvore';
import { definirAnalisador } from '../../sei-nucleo/src/sessao/dom';
import { chaveDoTipo, criarPecas, escolherTipo, resolverTipos } from '../src/iniciar/executar';
import { duracao, ID_DIALOGO, montarIniciar, selecionar, type DepsDialogo, type ItemDoPca } from '../src/iniciar/dialogo';
import { incluirExternoVazio, iniciarProcesso, tiposDeDocumento, tiposDeProcesso } from '../src/iniciar/sei';
import { depsPcaIniciar, valorBr } from '../src/iniciar/pca';
import { criarClientePca, type Buscar } from '../src/pca/cliente';
import { CHAVE_VINCULOS, lerVinculo } from '../src/pca/config';
import type { ItemPca } from '../src/pca/contrato';
import { areaFalsa } from './peca';
import { CHAVE_PENDENTE, guardarPendente, tomarPendente, VALIDADE_PENDENTE_MS } from '../src/iniciar/pendente';
import { clicarIniciar, fichaDoItem, ID_BOTAO_PCA, montarBotaoPca, URL_SEI } from '../src/pca-site/botao';
import { teste } from './util';

definirAnalisador(html => parseHTML(html).document as unknown as Document);
const RAIZ = 'https://sei.cfc.org.br/sei/';
const HASH = '0'.repeat(64);
const ler = (n: string) => readFileSync(new URL(`../../sei-nucleo/tests/fixtures/sei41/${n}`, import.meta.url), 'utf8').replace(/^<!-- url: .*? -->\n/, '');
const pag = (corpo: string, titulo = 'SEI') => `<html><head><title>${titulo}</title></head><body>${corpo}</body></html>`;
// Telas sintéticas no formato do SEI 4.1, com os campos que o lote de processos do SEI Pro usa (sei-pro-proc-lote.js)
const LISTA_TIPOS = (todos: boolean) => pag(`<form id="frmProcedimentoEscolherTipo" method="post" action="controlador.php?acao=procedimento_escolher_tipo&infra_hash=${HASH}">
  <input type="hidden" id="hdnFiltroTipoProcedimento" name="hdnFiltroTipoProcedimento" value="${todos ? 'T' : 'U'}">
  <table id="tblTipoProcedimento"><tr><td><a class="ancoraOpcao" href="controlador.php?acao=procedimento_escolher_tipo&amp;id_tipo_procedimento=10&amp;infra_hash=${HASH}">Contratação: Pregão</a></td></tr>
  ${todos ? `<tr><td><a class="ancoraOpcao" href="controlador.php?acao=procedimento_escolher_tipo&amp;id_tipo_procedimento=11&amp;infra_hash=${HASH}">Contratação: Dispensa</a></td></tr>` : ''}</table></form>`);
const CADASTRO = pag(`<script>var url = 'controlador_ajax.php?acao_ajax=contato_auto_completar_contexto_RI1225&amp;infra_hash=${HASH}';
  objLupaAssuntos = new infraLupaSelect('selAssuntos','hdnAssuntos','x'); objLupaInteressados = new infraLupaSelect('selInteressados','hdnInteressados','y');</script>
  <form id="frmProcedimentoCadastro" method="post" action="controlador.php?acao=procedimento_gerar&acao_origem=procedimento_escolher_tipo&infra_hash=${HASH}">
  <input type="text" id="txtDescricao" name="txtDescricao" value="">
  <select id="selAssuntos" name="selAssuntos" multiple><option value="55">Licitação</option></select><input type="hidden" id="hdnAssuntos" name="hdnAssuntos" value="">
  <select id="selInteressados" name="selInteressados" multiple></select><input type="hidden" id="hdnInteressados" name="hdnInteressados" value="">
  <input type="radio" name="rdoNivelAcesso" value="0"><input type="radio" name="rdoNivelAcesso" value="1">
  <input type="hidden" id="hdnFlagProcedimentoCadastro" name="hdnFlagProcedimentoCadastro" value="1">
  <input type="hidden" id="hdnIdTipoProcedimento" name="hdnIdTipoProcedimento" value="10">
  <button type="submit" name="sbmSalvar" value="Salvar">Salvar</button></form>`);
const EXTERNO = pag(`<form id="frmDocumentoCadastro" method="post" action="controlador.php?acao=documento_receber&acao_origem=documento_receber&arvore=1&id_procedimento=148265&infra_hash=${HASH}">
  <select id="selSerie" name="selSerie"><option value="null"></option><option value="300">Anexo</option><option value="301">Estudo Técnico Preliminar</option><option value="302">Termo de Referência</option></select>
  <input type="hidden" id="hdnIdSerie" name="hdnIdSerie" value=""><input type="text" id="txtDataElaboracao" name="txtDataElaboracao" value="">
  <input type="text" id="txtNumero" name="txtNumero" value=""><input type="text" id="txtNomeArvore" name="txtNomeArvore" value="">
  <input type="radio" name="rdoFormato" value="N"><input type="radio" name="rdoFormato" value="D">
  <input type="radio" name="rdoNivelAcesso" value="0"><input type="hidden" id="hdnStaNivelAcessoLocal" name="hdnStaNivelAcessoLocal" value="">
  <input type="hidden" id="hdnFlagDocumentoCadastro" name="hdnFlagDocumentoCadastro" value="1"><input type="hidden" id="hdnAnexos" name="hdnAnexos" value="">
  <button type="submit" name="sbmCadastrar" value="Salvar">Salvar</button></form>`);

function seiFalso(o: { semCfc?: boolean; falhar?: boolean } = {}) {
  const posts: { acao: string; corpo: string }[] = [];
  const resp = (url: string, html: string) => {
    const bytes = new Uint8Array([...html].map(c => c.charCodeAt(0) & 0xff));
    return { url, status: 200, arrayBuffer: async () => bytes.buffer, headers: new Headers({ 'content-type': 'text/html; charset=iso-8859-1' }) } as unknown as Response;
  };
  const fetch = (async (u: string, init?: RequestInit) => {
    const acao = /[?&]acao(?:_ajax)?=(\w+)/.exec(u)?.[1] ?? '';
    const corpo = String(init?.body ?? '');
    if (init?.method === 'POST') posts.push({ acao, corpo });
    if (acao === 'procedimento_escolher_tipo' && /id_tipo_procedimento=/.test(u)) return resp(u, CADASTRO);
    if (acao === 'procedimento_escolher_tipo') return resp(u, LISTA_TIPOS(init?.method === 'POST'));
    if (acao.startsWith('contato_auto_completar')) return resp(u, o.semCfc ? '<itens></itens>' : '<itens><item id="900" descricao="CFC - Conselho Federal de Contabilidade"></item><item id="901" descricao="CFC-RJ"></item></itens>');
    if (acao === 'procedimento_gerar') return resp(o.falhar ? u : `${RAIZ}controlador.php?acao=procedimento_trabalhar&acao_origem=procedimento_gerar&id_procedimento=777`, pag('', 'SEI - 12345670000033.000099/2026-01'));
    if (acao === 'documento_escolher_tipo' && /hdnIdSerie=-1/.test(corpo)) return resp(u, EXTERNO);
    if (acao === 'documento_escolher_tipo') return resp(u, ler('p_documento_escolher_tipo.html'));
    if (acao === 'documento_receber') return resp(`${RAIZ}controlador.php?acao=arvore_visualizar&acao_origem=documento_receber&id_documento=555`, pag(''));
    return resp(u, pag('?'));
  }) as unknown as typeof globalThis.fetch;
  const html = pag(`<div id="infraMenu"><a href="controlador.php?acao=procedimento_escolher_tipo&infra_item_menu=1&infra_hash=${HASH}">Iniciar Processo</a></div><form id="frmProtocoloPesquisaRapida"></form>`);
  const base = { url: `${RAIZ}controlador.php?acao=procedimento_controlar`, status: 200, html, get doc() { return parseHTML(html).document as unknown as Document; } };
  const sei = new Sei(base.url, () => base, { fetch });
  // a árvore do processo: a fixture do SEI 4.1 (tem o "Incluir documento"), sem a pesquisa rápida
  const arvoreHtml = ler('arvore.html');
  const arv = lerArvore({ url: `${RAIZ}controlador.php?acao=procedimento_visualizar&id_procedimento=148265`, status: 200, html: arvoreHtml, doc: parseHTML(arvoreHtml).document as unknown as Document });
  (sei as unknown as { arvore: () => Promise<typeof arv> }).arvore = async () => arv;
  return { sei, posts };
}

export async function verificarIniciar(): Promise<void> {
  await teste('iniciar: árvore inicial na ordem do usuário; cada título é reconhecido como a peça certa pelo roteiro', () => {
    const a = arvoreInicial({ via: 'pregao', termos: 4, cotacoes: 3 });
    assert.equal(a.length, 1 + 4 + 2 + 2 + 3 + 1 + 2 + 1);
    assert.deepEqual([...new Set(a.map(p => p.chave))], ['dfd', 'termos_cientificacao', 'portaria_planejamento', 'portaria_gestores', 'etp', 'pesquisa_banco_precos',
      'cotacoes', 'mapa_precos', 'tr', 'mapa_riscos', 'despacho_delic']);
    // o nome na árvore do SEI aparece depois do tipo ("Despacho Envio à Gelic"): o roteiro tem de achar cada peça
    const r = roteiro(a.map((p, i) => ({ titulo: `${p.tipoSei[0]} ${p.nomeArvore}`, numero: String(i + 1), assinado: true, externo: p.externo, comArquivo: true })));
    for (const p of r.passos.filter(x => x.chave !== 'checklist_conformidade')) assert.equal(p.feito, true, `${p.chave} (${p.rotulo})`);
    assert.deepEqual(a.filter(p => p.externo).map(p => p.chave), ['portaria_planejamento', 'portaria_gestores', 'etp', 'pesquisa_banco_precos', 'cotacoes', 'cotacoes', 'cotacoes', 'tr', 'mapa_riscos']);
    assert.equal(arvoreInicial({ via: 'pregao', termos: 99, cotacoes: -1 }).filter(p => p.chave === 'termos_cientificacao').length, 10, 'limites');
    assert.equal(tipoFonteCfc('Termo de Ciência Termo de Cientificação 2'), 'termo_ciencia');
    // com o tipo genérico do SEI ("Anexo") antes do nome, as externas continuam reconhecidas
    for (const p of a.filter(x => x.externo)) assert.notEqual(tipoFonteCfc(`Anexo ${p.nomeArvore}`), 'outro', p.nomeArvore);
    for (const t of ['Planilha de cotação', 'E-mail solicitação de cotação', 'Ofício de cotação', 'E-mail cotação fornecedor', 'Planilha Cotação', 'Ofício cotação 1']) assert.equal(tipoFonteCfc(t) === 'cotacao', false, t);
  });
  await teste('iniciar: especificação do processo = objeto numa linha, até 100 caracteres', () => {
    assert.equal(especificacao('  Contratação de\nserviço   de limpeza '), 'Contratação de serviço de limpeza');
    assert.equal(especificacao('x'.repeat(150)).length, 100);
  });
  await teste('iniciar SEI: tipos de processo (todos, como o lote do SEI Pro); cria o processo com especificação, assuntos, nível público e o CFC interessado', async () => {
    const { sei, posts } = seiFalso();
    assert.deepEqual(await tiposDeProcesso(sei), [{ id: '10', nome: 'Contratação: Pregão' }, { id: '11', nome: 'Contratação: Dispensa' }]);
    const r = await iniciarProcesso(sei, { tipo: '10', especificacao: 'Contratação de serviço de limpeza' });
    assert.deepEqual({ ...r, url: undefined }, { protocolo: '12345670000033.000099/2026-01', idProcedimento: '777', avisos: [], url: undefined });
    assert.match(r.url!, /procedimento_trabalhar/);
    const corpo = unescape(posts.find(p => p.acao === 'procedimento_gerar')!.corpo.replace(/\+/g, ' '));
    assert.match(corpo, /txtDescricao=Contratação de serviço de limpeza/, "em ISO-8859-1, como o SEI");
    assert.match(corpo, /rdoNivelAcesso=0/);
    assert.match(corpo, /hdnFlagProcedimentoCadastro=2/);
    assert.match(corpo, /hdnAssuntos=55/, 'assuntos do tipo');
    assert.match(corpo, /hdnInteressados=900/, 'o CFC (não o CFC-RJ)');
    await assert.rejects(iniciarProcesso(sei, { tipo: '99', especificacao: 'x' }), /não está disponível/);
    const sem = await iniciarProcesso(seiFalso({ semCfc: true }).sei, { tipo: '10', especificacao: 'x' });
    assert.match(sem.avisos[0], /CFC/);
    await assert.rejects(iniciarProcesso(seiFalso({ falhar: true }).sei, { tipo: '10', especificacao: 'x' }), /não confirmou a criação do processo/);
  });
  await teste('iniciar SEI: tipos de documento (internos da escolha, externos da tela do externo) e externo SEM arquivo', async () => {
    const { sei, posts } = seiFalso();
    const t = await tiposDeDocumento(sei, '148265');
    assert.ok(t.internos.some(x => x.nome === 'Apostila') && !t.internos.some(x => x.id === '-1'), 'internos sem o "Externo"');
    assert.deepEqual(t.externos.map(x => x.nome), ['Anexo', 'Estudo Técnico Preliminar', 'Termo de Referência']);
    const r = await incluirExternoVazio(sei, '148265', { tipo: '301', nomeArvore: 'Estudo Técnico Preliminar (ETP)', data: new Date(2026, 9, 10) });
    assert.equal(r.idDocumento, '555');
    const corpo = unescape(posts.filter(p => p.acao === 'documento_receber').at(-1)!.corpo.replace(/\+/g, ' '));
    for (const c of ['selSerie=301', 'hdnIdSerie=301', 'txtDataElaboracao=10/10/2026', 'rdoFormato=N', 'rdoNivelAcesso=0', 'hdnFlagDocumentoCadastro=2'])
      assert.ok(corpo.includes(c), `${c} em ${corpo}`);
    assert.match(corpo, /hdnAnexos=(&|$)/, 'sem anexo');
    assert.match(corpo, /txtNomeArvore=Estudo T.cnico Preliminar \(ETP\)/);
    await assert.rejects(incluirExternoVazio(sei, '148265', { tipo: '999', nomeArvore: 'x' }), /não está disponível/);
  });
  await teste('iniciar execução: tipo lembrado, nome exato ou único parecido; sem certeza, pergunta (não cria às cegas)', () => {
    const [dfd] = arvoreInicial({ via: 'pregao', termos: 0, cotacoes: 0 });
    const ops = [{ id: '1', nome: 'Documento de Formalização da Demanda - DFD' }, { id: '2', nome: 'Despacho' }];
    assert.equal(escolherTipo(dfd, ops), '1', 'o único que contém o nome');
    assert.equal(escolherTipo(dfd, ops, '2'), '2', 'o lembrado vence');
    assert.equal(escolherTipo(dfd, ops, '9'), '1', 'lembrado que sumiu: volta ao nome');
    assert.equal(escolherTipo(dfd, [{ id: '1', nome: 'DFD - Bens' }, { id: '3', nome: 'DFD - Serviços' }]), null, 'dois parecidos: pergunta');
    const termo = arvoreInicial({ via: 'pregao', termos: 1, cotacoes: 0 })[1];
    assert.equal(escolherTipo(termo, [{ id: '9', nome: 'Termo de Referência' }]), null, 'revisão r13: "Termo" sozinho não decide');
    const pecas = arvoreInicial({ via: 'pregao', termos: 2, cotacoes: 3 });
    const r = resolverTipos(pecas, { internos: [{ id: '1', nome: 'Documento de Formalização da Demanda' }, { id: '4', nome: 'Termo de Ciência' }, { id: '5', nome: 'Mapa Comparativo de Preços' }, { id: '2', nome: 'Despacho' }],
      externos: [{ id: '30', nome: 'Anexo' }, { id: '31', nome: 'Portaria' }, { id: '32', nome: 'Estudo Técnico Preliminar' }, { id: '33', nome: 'Termo de Referência' }] }, {});
    assert.equal(r.escolhidos[chaveDoTipo({ chave: 'cotacoes', externo: true })], '30', 'cotação cai no Anexo');
    assert.deepEqual(r.pendentes, [], JSON.stringify(r.pendentes));
    const sem = resolverTipos(pecas, { internos: [{ id: '2', nome: 'Despacho' }], externos: [{ id: '30', nome: 'Anexo' }] }, {});
    assert.deepEqual(sem.pendentes.map(p => p.chave), ['dfd', 'termos_cientificacao', 'portaria_planejamento', 'portaria_gestores', 'etp', 'mapa_precos', 'tr'], 'cada peça uma vez');
  });
  await teste('iniciar execução: cria na ordem, com progresso; para no primeiro erro e diz o que já foi criado', async () => {
    const pecas = arvoreInicial({ via: 'pregao', termos: 1, cotacoes: 1 });
    const tipos = Object.fromEntries(pecas.map(p => [chaveDoTipo(p), '1']));
    const feitos: string[] = [];
    const ok = await criarPecas('P', pecas, tipos, { interno: async (_, d) => { feitos.push(`i:${d.nomeArvore}`); return { numero: String(feitos.length) }; }, externo: async (_, d) => feitos.push(`e:${d.nomeArvore}`) });
    assert.equal(ok.criadas.length, pecas.length);
    assert.deepEqual(ok.vazios.map(v => v.chave), ['dfd', 'termos_cientificacao', 'mapa_precos', 'despacho_delic'], 'as internas criadas em branco');
    assert.deepEqual(feitos.slice(0, 3), ['i:Documento de Formalização da Demanda (DFD)', 'i:Termo de Cientificação 1', 'e:Portaria nº - Equipe de Planejamento']);
    const falha = await criarPecas('P', pecas, tipos, { interno: async () => {}, externo: async (_, d) => { if (d.nomeArvore.startsWith('Estudo')) throw new Error('recusado'); } });
    assert.deepEqual(falha.erro, { peca: 'Estudo Técnico Preliminar (ETP)', mensagem: 'recusado' });
    assert.equal(falha.criadas.length, 4);
  });
  await teste('iniciar diálogo: perguntas → prévia → cria o processo, pergunta o tipo que falta, cria as peças e guarda o DFD e os tipos', async () => {
    const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
    const doc = document as unknown as Document;
    const log: string[] = [];
    let lembrado: Record<string, unknown> = {};
    const deps: DepsDialogo = {
      tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
      iniciar: async n => { log.push(`processo:${n.tipo}:${n.especificacao}`); return { protocolo: 'P-1', idProcedimento: '777', avisos: [] }; },
      tiposDeDocumento: async () => ({ internos: [{ id: '1', nome: 'Documento de Formalização da Demanda' }, { id: '4', nome: 'Termo de Ciência' }, { id: '2', nome: 'Despacho' }],
        externos: [{ id: '30', nome: 'Anexo' }, { id: '31', nome: 'Portaria' }, { id: '32', nome: 'Estudo Técnico Preliminar' }, { id: '33', nome: 'Termo de Referência' }] }),
      lembrados: async () => ({ tipos: {} }),
      lembrar: async l => { lembrado = l; },
      itemDoPca: async () => ({ objeto: 'Objeto do PCA', valor_estimado: '1.000,00', grau_prioridade: 'Alto' }),
      guardarDfd: async (p, r) => { log.push(`dfd:${p}:${r.objeto}:${r.grau_prioridade}`); },
      interno: async (_, d) => { log.push(`i:${d.tipo}:${d.nomeArvore}`); },
      externo: async (_, d) => { log.push(`e:${d.tipo}:${d.nomeArvore}`); },
      abrirProcesso: p => log.push(`abrir:${p.idProcedimento}`),
    };
    const abrir = montarIniciar(doc, deps);
    assert.ok(doc.getElementById('gelic-iniciar'));
    await abrir();
    await new Promise(r => setTimeout(r, 0));
    const caixa = doc.getElementById(ID_DIALOGO)!;
    const q = <T extends Element>(s: string) => caixa.querySelector<T>(s)!;
    const clicar = async (acao: string) => { q<HTMLButtonElement>(`[data-gelic-acao=${acao}]`).click(); for (let i = 0; i < 5; i++) await new Promise(r => setTimeout(r, 0)); };
    await clicar('previa');
    assert.match(q('.gelic-ini-status').textContent!, /objeto/i, 'sem objeto não avança');
    q<HTMLInputElement>('[name=item_pca]').value = '37';
    await clicar('buscar-pca');
    assert.equal(q<HTMLTextAreaElement>('[name=objeto]').value, 'Objeto do PCA');
    selecionar(q<HTMLSelectElement>('[name=tipo_processo]'), '10');
    q<HTMLInputElement>('[name=termos]').value = '2';
    await clicar('previa');
    assert.equal(caixa.querySelectorAll('.gelic-ini-pecas li').length, 1 + 2 + 2 + 2 + 3 + 1 + 2 + 1);
    assert.equal(log.length, 0, 'a prévia não cria nada');
    await clicar('criar');
    assert.deepEqual(log.slice(0, 2), ['processo:10:Objeto do PCA', 'dfd:P-1:Objeto do PCA:Alto']);
    // o mapa de preços não tem tipo interno parecido: pergunta
    const sel = caixa.querySelectorAll<HTMLSelectElement>('[data-gelic-tipo]');
    assert.deepEqual([...sel].map(s => s.getAttribute('data-gelic-tipo')), ['mapa_precos:interno']);
    selecionar(sel[0], '2');
    await clicar('continuar');
    assert.equal(log.filter(l => /^[ie]:/.test(l)).length, 14);
    assert.equal(log[2], 'i:1:Documento de Formalização da Demanda (DFD)');
    assert.ok(log.includes('e:30:Cotação de fornecedor 3'));
    assert.deepEqual(lembrado.tipoProcesso, '10');
    assert.equal((lembrado.tipos as Record<string, string>)['mapa_precos:interno'], '2', 'a escolha fica lembrada');
    assert.match(q('.gelic-ini-status').textContent!, /Processo P-1 criado com 14 peças/);
    await clicar('abrir');
    assert.equal(log.at(-1), 'abrir:777');
  });
  await teste('iniciar PCA v1.1: item com via (modalidade) e unidade; vínculo só com pode_instruir; vínculo feito vai para o cache do selo', async () => {
    const ITEM: ItemPca = { item_pca: 117, exercicio: 2026, descricao_objeto: 'Licenças', valor_estimado: '48000.00', unidade: 'CGTI', grau_prioridade: 'Alto',
      mes_previsto: 6, situacao: 'EM_ANDAMENTO', situacao_rotulo: 'Em andamento', numeros_sei: [], modalidade: 'Dispensa Sem Disputa', objeto: 'Licenças de software', unidade_sigla_sei: 'GEX-TI' };
    let saude: Record<string, unknown> = { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: false, pode_instruir: true };
    let statusVinculo = 201;
    const pedidos: string[] = [];
    const buscar: Buscar = async (url, init) => {
      pedidos.push(`${init?.method ?? 'GET'} ${url}`);
      if (url.includes('/saude')) return { ok: true, status: 200, json: async () => saude };
      if (url.includes('/processo?item=117')) return { ok: true, status: 200, json: async () => ({ itens: [ITEM] }) };
      if (url.includes('/processo?item=')) return { ok: true, status: 200, json: async () => ({ itens: [] }) };
      if (url.includes('/vinculo')) return { ok: statusVinculo < 300, status: statusVinculo, json: async () => statusVinculo < 300 ? { criado: statusVinculo === 201, item: { ...ITEM, numeros_sei: ['P-1'] } } : { erro: 'sem_permissao' } };
      throw new TypeError('Failed to fetch');
    };
    const area = areaFalsa();
    const d = depsPcaIniciar(criarClientePca({ url: 'https://p', token: 't' }, buscar), area, () => 5000);
    assert.deepEqual(await d.itemDoPca(117, 2026), { objeto: 'Licenças de software', valor_estimado: '48.000,00', grau_prioridade: 'Alto', via: 'dispensa', unidade: 'GEX-TI', unidade_sei: true, numeros_sei: [] });
    assert.equal(await d.itemDoPca(1, 2026), null);
    // PCA de produção ainda v1: sem objeto/modalidade/unidade_sigla_sei, cai nos campos da v1 e a via não é decidida
    const v1 = depsPcaIniciar(criarClientePca({ url: 'https://p', token: 't' }, async u => u.includes('/processo') ? { ok: true, status: 200, json: async () => ({ itens: [{ ...ITEM, modalidade: undefined, objeto: undefined, unidade_sigla_sei: undefined }] }) } : buscar(u)), area, () => 0);
    assert.deepEqual(await v1.itemDoPca(117, 2026), { objeto: 'Licenças', valor_estimado: '48.000,00', grau_prioridade: 'Alto', via: null, unidade: 'CGTI', unidade_sei: false, numeros_sei: [] });
    assert.deepEqual(await d.podeVincular(), { pode: true });
    saude = { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: false, pode_instruir: false };
    const sem = await d.podeVincular();
    assert.ok(!sem.pode && /demandante/.test(sem.motivo), JSON.stringify(sem));
    saude = { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: true };
    const velho = await d.podeVincular();
    assert.ok(!velho.pode && /ainda não aceita o vínculo/.test(velho.motivo), 'PCA sem a v1.1');
    const erro = await depsPcaIniciar(criarClientePca({ url: 'https://p', token: 't' }, async () => { throw new TypeError('Failed to fetch'); }), area).podeVincular();
    assert.ok(!erro.pode && /não respondeu/.test(erro.motivo), '/saude fora do ar');
    // PCA que não responde: o prazo vence e vira motivo, sem prender a prévia
    const parado: Buscar = (_u, init) => new Promise((_, rej) => init?.signal?.addEventListener('abort', () => rej(init.signal!.reason)));
    const lento = depsPcaIniciar(criarClientePca({ url: 'https://p', token: 't' }, parado), area, () => 0, () => {
      // como o AbortSignal.timeout (que não segura o processo do Node): aborta com TimeoutError
      const c = new AbortController(); setTimeout(() => c.abort(new DOMException('prazo', 'TimeoutError')), 20); return c.signal;
    });
    const t = await lento.podeVincular();
    assert.ok(!t.pode && /não respondeu a tempo/.test(t.motivo), JSON.stringify(t));
    await assert.rejects(lento.vincular('P-9', 1, 2026), /não respondeu a tempo/);
    // PCA v1 com a rota ausente: 404 sem o JSON do contrato
    const sem404 = depsPcaIniciar(criarClientePca({ url: 'https://p', token: 't' }, async () => ({ ok: false, status: 404, json: async () => { throw new SyntaxError('html'); } })), area);
    await assert.rejects(sem404.vincular('P-9', 1, 2026), /não tem a rota do vínculo/);
    assert.deepEqual(await d.vincular('P-1', 117, 2026), { criado: true });
    assert.deepEqual(await lerVinculo(area, 'P-1', 6000), { itens: [{ ...ITEM, numeros_sei: ['P-1'] }] }, 'o selo do processo novo já mostra o item');
    assert.ok(pedidos.includes('POST https://p/api/sei/vinculo'));
    statusVinculo = 403;
    area.m.delete(CHAVE_VINCULOS);
    await assert.rejects(d.vincular('P-2', 117, 2026), /demandante/);
    assert.equal(area.m.has(CHAVE_VINCULOS), false, 'vínculo recusado não vai para o cache');
    assert.equal(valorBr('165000.00'), '165.000,00');
  });
  await teste('iniciar diálogo PCA v1.1: buscar põe a via e avisa a unidade; a prévia diz o vínculo; o vínculo sai logo depois do processo e o erro dele não para as peças', async () => {
    const montar = (o: { pode?: boolean; vinculoFalha?: boolean; semPca?: boolean } = {}) => {
      const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
      const doc = document as unknown as Document;
      const log: string[] = [];
      const deps: DepsDialogo = {
        tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
        iniciar: async () => { log.push('processo'); return { protocolo: 'P-1', idProcedimento: '777', avisos: [] }; },
        tiposDeDocumento: async () => ({ internos: [{ id: '1', nome: 'Documento de Formalização da Demanda' }, { id: '4', nome: 'Termo de Ciência' }, { id: '5', nome: 'Mapa Comparativo de Preços' }, { id: '2', nome: 'Despacho' }],
          externos: [{ id: '30', nome: 'Anexo' }, { id: '31', nome: 'Portaria' }, { id: '32', nome: 'Estudo Técnico Preliminar' }, { id: '33', nome: 'Termo de Referência' }] }),
        lembrados: async () => ({ tipos: {} }),
        lembrar: async () => {},
        guardarDfd: async (_, r) => { log.push(`dfd:${r.via}`); },
        interno: async (_, d) => { log.push(`i:${d.nomeArvore}`); },
        externo: async (_, d) => { log.push(`e:${d.nomeArvore}`); },
        abrirProcesso: () => {},
        unidadeAtual: () => 'GEX-LIC',
        ...(o.semPca ? {} : {
          itemDoPca: async () => ({ objeto: 'Licenças', valor_estimado: '48.000,00', grau_prioridade: 'Alto', via: 'dispensa' as const, unidade: 'GEX-TI' }),
          podeVincular: async () => (o.pode === false ? { pode: false as const, motivo: 'sem o grupo demandante' } : { pode: true as const }),
          vincular: async (p: string, item: number, ex: number) => { log.push(`vinculo:${p}:${item}/${ex}`); if (o.vinculoFalha) throw new Error('o PCA não respondeu'); return { criado: true }; },
        }),
      };
      return { doc, log, abrir: montarIniciar(doc, deps) };
    };
    const passo = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
    const preparar = async (m: ReturnType<typeof montar>, comItem = true) => {
      await m.abrir();
      await passo();
      const caixa = m.doc.getElementById(ID_DIALOGO)!;
      const q = <T extends Element>(s: string) => caixa.querySelector<T>(s)!;
      const clicar = async (acao: string) => { q<HTMLButtonElement>(`[data-gelic-acao=${acao}]`).click(); await passo(); };
      if (comItem) {
        q<HTMLInputElement>('[name=item_pca]').value = '117';
        if (q('[data-gelic-acao=buscar-pca]')) await clicar('buscar-pca');
      }
      if (!q<HTMLTextAreaElement>('[name=objeto]').value) q<HTMLTextAreaElement>('[name=objeto]').value = 'Licenças';
      selecionar(q<HTMLSelectElement>('[name=tipo_processo]'), '10');
      return { caixa, q, clicar };
    };

    const m = montar();
    const { caixa, q, clicar } = await preparar(m);
    assert.equal(q<HTMLSelectElement>('[name=via]').querySelector('option[selected]')?.getAttribute('value'), 'dispensa', 'a via do PCA');
    assert.match(q('.gelic-ini-status').textContent!, /unidade GEX-TI.*você está na GEX-LIC/, 'avisa a unidade');
    await clicar('previa');
    assert.match(caixa.querySelector('[data-gelic-pca=vinculo]')!.textContent!, /^Depois de criado, o nº do processo é vinculado ao item 117\/\d{4} no PCA/);
    assert.match(caixa.querySelector('[data-gelic-pca=unidade]')!.textContent!, /GEX-TI.*GEX-LIC/, 'o aviso de unidade também na prévia');
    assert.equal(m.log.length, 0, 'a prévia não grava nada, nem no PCA');
    await clicar('criar');
    assert.deepEqual(m.log.slice(0, 3), ['processo', 'dfd:dispensa', `vinculo:P-1:117/${new Date().getFullYear()}`], 'o vínculo antes das peças');
    assert.ok(m.log.some(l => l.startsWith('e:')), 'as peças seguem');
    assert.equal(caixa.querySelector('[data-gelic-pca=vinculo]')!.getAttribute('class'), 'gelic-ini-ok');
    assert.match(caixa.querySelector('[data-gelic-pca=vinculo]')!.textContent!, /^Vinculado ao item 117\/\d{4} no PCA/);

    const f = montar({ vinculoFalha: true });
    const pf = await preparar(f);
    await pf.clicar('previa');
    await pf.clicar('criar');
    assert.ok(f.log.filter(l => /^[ie]:/.test(l)).length > 10, 'erro no vínculo não interrompe as peças');
    assert.match(pf.caixa.textContent!, /Não vinculado no PCA: o PCA não respondeu/);

    const s = montar({ pode: false });
    const ps = await preparar(s);
    await ps.clicar('previa');
    assert.match(ps.caixa.querySelector('[data-gelic-pca=vinculo]')!.textContent!, /^O processo não será vinculado.*sem o grupo demandante/);
    await ps.clicar('criar');
    assert.equal(s.log.some(l => l.startsWith('vinculo')), false, 'sem permissão, não tenta');

    const n = montar({ semPca: true });
    const pn = await preparar(n);
    await pn.clicar('previa');
    assert.match(pn.caixa.querySelector('[data-gelic-pca=vinculo]')!.textContent!, /PCA não está ligado/);
    const semItem = montar();
    const pi = await preparar(semItem, false);
    await pi.clicar('previa');
    assert.equal(pi.caixa.querySelector('[data-gelic-pca=vinculo]'), null, 'sem item, nada a dizer sobre o PCA');
  });
  await teste('iniciar diálogo PCA v1.1 (revisão r14): resposta velha do PCA é descartada; o vínculo é o que a prévia mostrou; nunca um segundo processo', async () => {
    const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
    const doc = document as unknown as Document;
    const log: string[] = [];
    const pendentes: ((v: { pode: true } | { pode: false; motivo: string }) => void)[] = [];
    let falharTipos = true;
    const deps: DepsDialogo = {
      tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
      iniciar: async () => { log.push('processo'); return { protocolo: 'P-1', idProcedimento: '777', avisos: [] }; },
      tiposDeDocumento: async () => { if (falharTipos) throw new Error('sessão expirada'); return { internos: [], externos: [] }; },
      lembrados: async () => ({ tipos: {} }), lembrar: async () => {}, guardarDfd: async () => {},
      interno: async () => {}, externo: async () => {}, abrirProcesso: () => {},
      itemDoPca: async () => null,
      podeVincular: () => new Promise(r => pendentes.push(r)),
      vincular: async (p: string) => { log.push(`vinculo:${p}`); return { criado: true }; },
    };
    await montarIniciar(doc, deps)();
    const passo = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
    await passo();
    const caixa = doc.getElementById(ID_DIALOGO)!;
    const q = <T extends Element>(s: string) => caixa.querySelector<T>(s)!;
    q<HTMLTextAreaElement>('[name=objeto]').value = 'Licenças';
    q<HTMLInputElement>('[name=item_pca]').value = '117';
    selecionar(q<HTMLSelectElement>('[name=tipo_processo]'), '10');
    const avancar = q<HTMLButtonElement>('[data-gelic-acao=previa]');
    avancar.click();
    await passo();
    assert.equal(avancar.hasAttribute('disabled'), true, 'conferindo no PCA: o botão fica desabilitado');
    avancar.click(); // um clique que passa mesmo assim (duplo clique)
    await passo();
    assert.equal(pendentes.length, 2);
    pendentes[1]({ pode: false, motivo: 'limite de requisições' });
    await passo();
    assert.match(q('[data-gelic-pca=vinculo]').textContent!, /não será vinculado/);
    pendentes[0]({ pode: true }); // a resposta velha chega depois: não redesenha a prévia
    await passo();
    assert.match(q('[data-gelic-pca=vinculo]').textContent!, /não será vinculado/, 'a resposta velha foi descartada');
    const criar = q<HTMLButtonElement>('[data-gelic-acao=criar]');
    criar.click();
    await passo();
    assert.deepEqual(log, ['processo'], 'sem vínculo: a prévia mostrada disse que não haveria');
    assert.match(q('.gelic-ini-status').textContent!, /continuar no processo P-1: sessão expirada/);
    // o botão "Criar no SEI" de antes, clicado de novo (ficou numa referência velha): nada cria um segundo processo
    falharTipos = false;
    criar.click();
    await passo();
    assert.deepEqual(log, ['processo']);
  });
  await teste('iniciar diálogo PCA v1.1 (revisão r14): vínculo feito e falha depois dele: a nota "Vinculado" continua, em verde', async () => {
    const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
    const doc = document as unknown as Document;
    const deps: DepsDialogo = {
      tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
      iniciar: async () => ({ protocolo: 'P-1', idProcedimento: '777', avisos: [] }),
      tiposDeDocumento: async () => { throw new Error('sessão expirada'); },
      lembrados: async () => ({ tipos: {} }), lembrar: async () => {}, guardarDfd: async () => {},
      interno: async () => {}, externo: async () => {}, abrirProcesso: () => {},
      podeVincular: async () => ({ pode: true }), vincular: async () => ({ criado: true }),
    };
    await montarIniciar(doc, deps)();
    const passo = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
    await passo();
    const caixa = doc.getElementById(ID_DIALOGO)!;
    const q = <T extends Element>(s: string) => caixa.querySelector<T>(s)!;
    q<HTMLTextAreaElement>('[name=objeto]').value = 'Licenças';
    q<HTMLInputElement>('[name=item_pca]').value = '117';
    selecionar(q<HTMLSelectElement>('[name=tipo_processo]'), '10');
    q<HTMLButtonElement>('[data-gelic-acao=previa]').click();
    await passo();
    q<HTMLButtonElement>('[data-gelic-acao=criar]').click();
    await passo();
    const nota = q('[data-gelic-pca=vinculo]');
    assert.match(nota.textContent!, /^Vinculado ao item 117/);
    assert.equal(nota.getAttribute('class'), 'gelic-ini-ok');
  });
  await teste('iniciar pelo PCA: pedido pendente vale 15 min, é apagado ao ser tomado; corrompido ou do futuro é descartado', async () => {
    const a = areaFalsa();
    assert.equal(await tomarPendente(a, 0), null, 'sem pedido');
    assert.equal(await tomarPendente(null, 0), null, 'sem storage');
    await guardarPendente(a, { item_pca: 37, exercicio: 2026 }, 1000);
    assert.deepEqual(a.m.get(CHAVE_PENDENTE), { item_pca: 37, exercicio: 2026, t: 1000 });
    assert.deepEqual(await tomarPendente(a, 1000 + VALIDADE_PENDENTE_MS - 1), { item_pca: 37, exercicio: 2026 });
    assert.equal(a.m.has(CHAVE_PENDENTE), false, 'tomado uma vez só: recarregar o Controle não reabre');
    assert.equal(await tomarPendente(a, 2000), null);
    await guardarPendente(a, { item_pca: 37, exercicio: 2026 }, 1000);
    assert.equal(await tomarPendente(a, 1000 + VALIDADE_PENDENTE_MS), null, 'vencido');
    assert.equal(a.m.has(CHAVE_PENDENTE), false, 'vencido também é apagado');
    for (const ruim of [{ item_pca: '37', exercicio: 2026, t: 1000 }, { item_pca: 37, t: 1000 }, { item_pca: 0, exercicio: 2026, t: 1000 },
      { item_pca: 37, exercicio: 2026, t: 5000 }, 'x', null]) {
      await a.set({ [CHAVE_PENDENTE]: ruim });
      assert.equal(await tomarPendente(a, 2000), null, JSON.stringify(ruim));
      assert.equal(a.m.has(CHAVE_PENDENTE), false, `apagado: ${JSON.stringify(ruim)}`);
    }
  });
  await teste('iniciar pelo PCA: item travado e preenchido; nº SEI já vinculado pede "iniciar outro"; unidade diferente para; item inexistente e PCA fora do ar param', async () => {
    const base = (o: { item?: ItemDoPca | null; erro?: boolean; unidade?: string | null }) => {
      const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
      const doc = document as unknown as Document;
      const log: string[] = [];
      const deps: DepsDialogo = {
        tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
        iniciar: async () => { log.push('processo'); return { protocolo: 'P-1', idProcedimento: '777', avisos: [] }; },
        tiposDeDocumento: async () => ({ internos: [], externos: [] }),
        lembrados: async () => ({ tipos: {} }), lembrar: async () => {}, guardarDfd: async () => {},
        interno: async () => {}, externo: async () => {}, abrirProcesso: () => {},
        unidadeAtual: () => (o.unidade === undefined ? 'GEX-LIC' : o.unidade),
        itemDoPca: async () => { if (o.erro) throw new Error('o PCA não respondeu'); return o.item ?? null; },
        podeVincular: async () => ({ pode: true }), vincular: async () => ({ criado: true }),
      };
      return { doc, log, abrir: montarIniciar(doc, deps) };
    };
    const ITEM_PCA: ItemDoPca = { objeto: 'Licenças', valor_estimado: '48.000,00', grau_prioridade: 'Alto', via: 'dispensa', unidade: 'gex-lic', unidade_sei: true, numeros_sei: [] };
    const passo = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
    const abrirPelo = async (m: ReturnType<typeof base>) => {
      const caixa = await m.abrir({ pelo: { item_pca: 117, exercicio: 2026 } });
      await passo();
      return { caixa, q: <T extends Element>(s: string) => caixa.querySelector<T>(s) };
    };

    // caminho feliz: travado, preenchido, sem o "Buscar no PCA"; unidade igual sem diferença de caixa
    const ok = await abrirPelo(base({ item: ITEM_PCA }));
    assert.equal(ok.q<HTMLInputElement>('[name=item_pca]')!.value, '117');
    assert.equal(ok.q<HTMLInputElement>('[name=exercicio]')!.value, '2026');
    assert.ok(ok.q('[name=item_pca]')!.hasAttribute('readonly') && ok.q('[name=exercicio]')!.hasAttribute('readonly'), 'item e exercício travados');
    assert.equal(ok.q('[data-gelic-acao=buscar-pca]'), null);
    assert.equal(ok.q<HTMLTextAreaElement>('[name=objeto]')!.value, 'Licenças');
    assert.equal(ok.q('[name=via] option[selected]')!.getAttribute('value'), 'dispensa');
    assert.match(ok.q('.gelic-ini-status')!.textContent!, /Item 117\/2026 do PCA/);

    // nº SEI já vinculado: pergunta antes do formulário
    const ja = await abrirPelo(base({ item: { ...ITEM_PCA, numeros_sei: ['12345670000033.000076/2026-96'] } }));
    assert.match(ja.q('.gelic-ini-status')!.textContent!, /já tem o processo 12345670000033\.000076\/2026-96.*Iniciar outro/);
    assert.equal(ja.q('[name=objeto]'), null, 'o formulário só depois da confirmação');
    ja.q<HTMLButtonElement>('[data-gelic-acao=iniciar-outro]')!.click();
    await passo();
    assert.equal(ja.q<HTMLTextAreaElement>('[name=objeto]')!.value, 'Licenças');

    // unidade diferente: para e explica, sem formulário nem criar
    const outra = await abrirPelo(base({ item: { ...ITEM_PCA, unidade: 'GEX-TI' } }));
    assert.match(outra.q('.gelic-ini-status')!.textContent!, /é da unidade GEX-TI, e você está na GEX-LIC\. Troque para a GEX-TI no SEI e clique de novo/);
    assert.equal(outra.q('[name=objeto]'), null);
    assert.equal(outra.q('[data-gelic-acao=criar]'), null);
    outra.q<HTMLButtonElement>('[data-gelic-acao=fechar]')!.click();
    assert.equal(outra.caixa.isConnected, false);

    // unidade sem sigla do SEI (nome da unidade no PCA, sem mapeamento): não manda trocar para o que não existe no SEI;
    // segue com o aviso, como no "Buscar no PCA"
    const semSigla = await abrirPelo(base({ item: { ...ITEM_PCA, unidade: 'CGTI', unidade_sei: false } }));
    assert.equal(semSigla.q<HTMLTextAreaElement>('[name=objeto]')!.value, 'Licenças');
    assert.match(semSigla.q('.gelic-ini-status')!.textContent!, /Atenção: o item é da unidade CGTI, e você está na GEX-LIC/);

    // unidade atual ilegível: segue, e a prévia avisa para conferir
    const muda = base({ item: ITEM_PCA, unidade: null });
    const sem = await abrirPelo(muda);
    selecionar(sem.q<HTMLSelectElement>('[name=tipo_processo]')!, '10');
    sem.q<HTMLButtonElement>('[data-gelic-acao=previa]')!.click();
    await passo();
    assert.match(sem.q('[data-gelic-pca=unidade]')!.textContent!, /confira se está na gex-lic/i);

    // item inexistente e PCA fora do ar: param com Fechar
    const nada = await abrirPelo(base({ item: null }));
    assert.equal(nada.q('.gelic-ini-status')!.textContent, 'O item 117/2026 não foi encontrado no PCA.');
    assert.ok(nada.q('[data-gelic-acao=fechar]') && !nada.q('[name=objeto]'));
    const fora = await abrirPelo(base({ erro: true }));
    assert.match(fora.q('.gelic-ini-status')!.textContent!, /^PCA: o PCA não respondeu\. Tente de novo pelo PCA\./);
  });
  await teste('iniciar pelo PCA: botão na ficha do item (DSGov e Tabler), sem duplicar; clique guarda o pedido e abre o SEI; sem configuração abre a configuração', async () => {
    // recortes dos cabeçalhos de processo_detalhe.html do PCA (apps/pca/templates e tabler/templates), 2026-10-11
    const DSGOV = `<div class="d-flex flex-wrap align-items-start mb-3" data-item-pca="37" data-exercicio="2026"><div><h1>Item 37/2026</h1></div>
      <div class="ml-auto d-flex"><a class="br-button primary" href="/pca/2026/37/editar/">Editar</a></div></div>`;
    const TABLER = `<div class="page-header" data-item-pca="37" data-exercicio="2026"><div class="row"><div class="col"><h1 class="page-title">Item 37/2026</h1></div>
      <div class="col-12 col-md-auto"><div class="btn-list"><a class="btn" data-voltar href="/pca/">Voltar</a><a class="btn btn-primary" href="/pca/2026/37/editar/">Editar</a></div></div></div></div>`;
    const SEM_EDITAR = `<div class="page-header" data-item-pca="37" data-exercicio="2026"><h1>Item 37/2026</h1></div>`;
    for (const [nome, html] of [['DSGov', DSGOV], ['Tabler', TABLER], ['sem Editar', SEM_EDITAR]] as const) {
      const doc = parseHTML(`<html><body>${html}</body></html>`).document as unknown as Document;
      assert.deepEqual({ ...fichaDoItem(doc)!, cabecalho: undefined }, { item_pca: 37, exercicio: 2026, cabecalho: undefined }, nome);
      const pedidos: unknown[] = [];
      montarBotaoPca(doc, p => pedidos.push(p));
      montarBotaoPca(doc, p => pedidos.push(p)); // o script roda de novo: nunca dois botões
      const botoes = doc.querySelectorAll(`#${ID_BOTAO_PCA}`);
      assert.equal(botoes.length, 1, nome);
      const editar = doc.querySelector('a[href$="/editar/"]');
      if (editar) assert.ok(botoes[0].nextElementSibling === editar, `${nome}: ao lado de Editar`);
      else assert.ok(fichaDoItem(doc)!.cabecalho.contains(botoes[0]), `${nome}: no cabeçalho`);
      assert.equal(botoes[0].textContent, 'Iniciar processo');
      (botoes[0] as HTMLElement).click();
      assert.deepEqual(pedidos, [{ item_pca: 37, exercicio: 2026 }], `${nome}: o clique da segunda montagem não se soma`);
    }
    for (const fora of ['<div data-item-pca="x" data-exercicio="2026"></div>', '<div data-item-pca="37"></div>', '<p>tabela do PCA</p>']) {
      const doc = parseHTML(`<html><body>${fora}</body></html>`).document as unknown as Document;
      assert.ok(fichaDoItem(doc) === null, fora);
      assert.ok(montarBotaoPca(doc, () => {}) === null, `${fora}: sem botão`);
    }

    const log: string[] = [];
    const area = areaFalsa();
    const deps = (configurado: boolean, a: typeof area | null = area) => ({
      area: a, configurado: async () => configurado, abrirConfig: () => log.push('config'), abrirSei: (u: string) => log.push(`sei:${u}`),
      avisar: (t: string) => log.push(`aviso:${t}`), agora: () => 1000,
    });
    await clicarIniciar({ item_pca: 37, exercicio: 2026 }, deps(false));
    assert.deepEqual(log, ['config'], 'sem PCA configurado: abre a configuração');
    assert.equal(area.m.has(CHAVE_PENDENTE), false, 'e não guarda pedido');
    await clicarIniciar({ item_pca: 37, exercicio: 2026 }, deps(true));
    assert.deepEqual(log, ['config', `sei:${URL_SEI}`]);
    assert.deepEqual(area.m.get(CHAVE_PENDENTE), { item_pca: 37, exercicio: 2026, t: 1000 });
    assert.equal(URL_SEI, 'https://sei.cfc.org.br/sei/');
    await clicarIniciar({ item_pca: 37, exercicio: 2026 }, deps(true, null));
    assert.match(log.at(-1)!, /^aviso:.*recarregue esta página/, 'extensão recarregada: avisa, sem erro mudo');
  });
  await teste('iniciar cronômetro: só a automação conta (a pausa da escolha do tipo não); segundos e minutos; a parada no meio diz depois de quanto', async () => {
    assert.deepEqual([duracao(0), duracao(52_000), duracao(72_400), duracao(120_000)], ['0 s', '52 s', '1 min 12 s', '2 min']);
    const rodar = async (o: { comMapa: boolean; falharEm?: string }) => {
      const { document } = parseHTML('<html><body><div><div id="divRecebidos"><table id="tblProcessosRecebidos"></table></div></div></body></html>');
      const doc = document as unknown as Document;
      let t = 0;
      const peca = async (_: string, d: { nomeArvore: string }) => { t += 4_000; if (d.nomeArvore === o.falharEm) throw new Error('recusado'); };
      const deps: DepsDialogo = {
        agora: () => t,
        tiposDeProcesso: async () => [{ id: '10', nome: 'Contratação: Pregão' }],
        iniciar: async () => { t += 5_000; return { protocolo: 'P-1', idProcedimento: '777', avisos: [] }; },
        tiposDeDocumento: async () => {
          t += 1_000;
          return { internos: [{ id: '1', nome: 'Documento de Formalização da Demanda' }, { id: '4', nome: 'Termo de Ciência' }, { id: '2', nome: 'Despacho' },
            ...(o.comMapa ? [{ id: '5', nome: 'Mapa Comparativo de Preços' }] : [])],
          externos: [{ id: '30', nome: 'Anexo' }, { id: '31', nome: 'Portaria' }, { id: '32', nome: 'Estudo Técnico Preliminar' }, { id: '33', nome: 'Termo de Referência' }] };
        },
        lembrados: async () => ({ tipos: {} }), lembrar: async () => {}, guardarDfd: async () => {},
        interno: peca, externo: peca, abrirProcesso: () => {},
      };
      const caixa = await montarIniciar(doc, deps)();
      const q = <T extends Element>(s: string) => caixa.querySelector<T>(s)!;
      const clicar = async (acao: string) => { q<HTMLButtonElement>(`[data-gelic-acao=${acao}]`).click(); for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
      await new Promise(r => setTimeout(r, 0));
      q<HTMLTextAreaElement>('[name=objeto]').value = 'Licenças';
      selecionar(q<HTMLSelectElement>('[name=tipo_processo]'), '10');
      q<HTMLInputElement>('[name=termos]').value = '2';
      await clicar('previa');
      await clicar('criar');
      if (!o.comMapa) {
        t += 600_000; // 10 min parado na escolha do tipo: não conta
        selecionar(caixa.querySelector<HTMLSelectElement>('[data-gelic-tipo]')!, '2');
        await clicar('continuar');
      }
      return q('.gelic-ini-status').textContent!;
    };
    // processo 5 s + tipos 1 s + 14 peças × 4 s = 62 s, sem os 10 min da pausa
    assert.match(await rodar({ comMapa: false }), /Processo P-1 criado com 14 peças em 1 min 2 s\./);
    // parou no 2º termo: processo, tipos, DFD, termo 1 e a tentativa do termo 2 = 5 + 1 + 3 × 4 = 18 s
    assert.match(await rodar({ comMapa: true, falharEm: 'Termo de Cientificação 2' }), /parou em "Termo de Cientificação 2" depois de 18 s: recusado/);
  });
}
