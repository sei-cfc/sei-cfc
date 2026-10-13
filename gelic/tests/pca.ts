/**
 * Módulo do PCA (src/pca/): contrato v1, coleta no formato do robô, cliente com fetch falso.
 */
import assert from 'node:assert/strict';
import type { DocumentoArvore } from '../../sei-nucleo/src/dominio/arvore';
import { criarClientePca, ErroPca, type Buscar } from '../src/pca/cliente';
import {
  anonimizar, assinantesExternos, documentoDaColeta, JANELA_EXTENSAO_MS, leituraDe, linhaDoPca, precisaColetar, RE_CONTRATUAL, tipoInstrumento,
  viaDaModalidade, type ItemPca,
} from '../src/pca/contrato';
import { parseHTML } from 'linkedom';
import { CHAVE_PCA, CHAVE_VINCULOS, guardarVinculo, lerConfigPca, lerVinculo, validarUrl } from '../src/pca/config';
import { montarPaginaPca } from '../src/pca/pagina';
import { desenharPca } from '../src/pca/selo';
import { dadosDoItem, dadosDoPcaCom } from '../src/pca/dfd';
import { ligarPcaNoControle, resumoPca } from '../src/pca/controle';
import { checagemPca } from '../src/dvi/preparar/index';
import { GANCHOS_DVI } from '../src/agente/dvi';
import { readFileSync } from 'node:fs';
import { desenharSelo } from '../src/pagina/selo';
import { resumir } from '../src/regras/resumo';
import { base64, coletar, ColetaRecusada, MAX_BYTES_PDF, sincronizarProcesso, type DepsSincronizar } from '../src/pca/sincronizar';
import type { Arvore } from '../../sei-nucleo/src/dominio/arvore';
import type { RespostaProcesso } from '../src/pca/contrato';
import { areaFalsa } from './peca';
import { classeDaPesquisaRapida, teste } from './util';

const doc = (o: Partial<DocumentoArvore>): DocumentoArvore => ({
  id: '1234521', numero: '1234522', titulo: 'Contrato nº 01/2026 - EMPRESA EXEMPLO x CFC', pasta: null, externo: false, formato: 'interno',
  nivel: 'publico', assinado: true, assinaturas: [], cancelado: false, link: '', src: 'controlador.php?acao=documento_visualizar', acoes: [], botoes: [], ...o,
});
const ITEM: ItemPca = {
  item_pca: 37, exercicio: 2026, descricao_objeto: 'Limpeza', valor_estimado: '165000.00', unidade: 'GECONT', grau_prioridade: 'Essencial',
  mes_previsto: 3, situacao: 'EM_ANDAMENTO', situacao_rotulo: 'Em andamento', numeros_sei: ['12345670000007.000036/2025-81'],
};

/** Resultado do Python (re.match de apps/pca/sei/extracao.py), gravado em 2026-10-10. */
const PARIDADE: Readonly<Record<string, string | null>> = {
  'Contrato nº 01/2026 - EMPRESA EXEMPLO x CFC': 'Contrato', 'Contrato Social': null, 'Contrato social da empresa': null, 'contratos de terceiros': null,
  'Termo Aditivo 1/2026': 'Termo Aditivo', 'TERMO ADITIVO': 'TERMO ADITIVO', 'Termo de Apostilamento 2': 'Termo de Apostilamento',
  Apostilamento: 'Apostilamento', 'Ordem de Fornecimento 3': 'Ordem de Fornecimento', 'Ata de Registro de Preços 5/2025': 'Ata de Registro de Preços',
  'Ata de Registro de Precos': 'Ata de Registro de Precos', 'Termo de Contrato': 'Termo de Contrato', 'Termo de Rescisão': 'Termo de Rescisão',
  'Termo de Rescisao': 'Termo de Rescisao', 'Minuta de Contrato': null, Despacho: null, 'Contratação direta': null, Contrato: 'Contrato',
  'Contrato-12': 'Contrato', 'Termo Aditivo-2': 'Termo Aditivo',
};

function buscarFalso(respostas: Record<string, { status: number; corpo?: unknown }>) {
  const pedidos: { url: string; init?: RequestInit }[] = [];
  const buscar: Buscar = async (url, init) => {
    pedidos.push({ url, init });
    const chave = Object.keys(respostas).find(k => url.includes(k));
    if (!chave) throw new TypeError('Failed to fetch');
    const r = respostas[chave];
    return { ok: r.status < 300, status: r.status, json: async () => { if (r.corpo === undefined) throw new SyntaxError('sem JSON'); return r.corpo; } };
  };
  return { buscar, pedidos };
}

export async function verificarPca(): Promise<void> {
  await teste('pca: RE_CONTRATUAL igual à do robô (títulos de exemplo com o resultado do Python)', () => {
    for (const [titulo, esperado] of Object.entries(PARIDADE)) assert.equal(RE_CONTRATUAL.exec(titulo)?.[1] ?? null, esperado, titulo);
    assert.equal(tipoInstrumento('Termo de Contrato 3'), 'contrato');
    assert.equal(tipoInstrumento('Termo de Rescisão'), null, 'casa, mas não é instrumento (como o tipo_documento do robô)');
    assert.equal(tipoInstrumento('Ata de Registro de Preços'), 'ata_rp');
  });
  await teste('pca: o que ler de cada documento (paridade com o coletor): interno contratual = HTML; externo só Contrato e Termo Aditivo', () => {
    assert.equal(leituraDe(doc({})), 'html');
    assert.equal(leituraDe(doc({ externo: true })), 'pdf');
    assert.equal(leituraDe(doc({ externo: true, titulo: 'Termo Aditivo 2/2026' })), 'pdf');
    assert.equal(leituraDe(doc({ externo: true, titulo: 'Apostilamento 1' })), 'nenhuma');
    assert.equal(leituraDe(doc({ titulo: 'Despacho 3' })), 'nenhuma');
    assert.equal(leituraDe(doc({ nivel: 'restrito' })), 'nenhuma', 'restrito nunca é lido');
    assert.equal(leituraDe(doc({ cancelado: true })), 'nenhuma');
  });
  await teste('pca: documento da coleta (conteudo e motivo do contrato v1) e assinantes externos pelo quadro da árvore', () => {
    const assinaturas = ['Fulano, Presidente, CFC', 'Beltrano, Usuário Externo (12345678900)', 'Sicrano, Usuário Externo'];
    assert.equal(assinantesExternos({ assinaturas }), 2);
    const lido = documentoDaColeta(doc({ assinaturas }), { html: '<p>x</p>' });
    assert.deepEqual(lido, {
      id_documento: '1234521', protocolo: '1234522', rotulo: 'Contrato nº 01/2026 - EMPRESA EXEMPLO x CFC', assinantes_externos_na_arvore: 2,
      contratual: true, cancelado: false, motivo_cancelamento: null, conteudo: 'html', motivo: null, html: '<p>x</p>', pdf_base64: null,
    });
    assert.equal(documentoDaColeta(doc({ externo: true }), { pdf_base64: 'JVBERi0=' }).conteudo, 'pdf');
    assert.equal(documentoDaColeta(doc({ externo: true, titulo: 'Apostilamento 1' })).conteudo, 'externo_nao_baixado');
    assert.deepEqual(pick(documentoDaColeta(doc({ nivel: 'restrito' }), { html: 'vazou' })), { conteudo: 'nao_lido', motivo: 'restrito', html: null });
    assert.deepEqual(pick(documentoDaColeta(doc({ titulo: 'Despacho 3' }))), { conteudo: 'nao_lido', motivo: 'nao_contratual', html: null });
    assert.deepEqual(pick(documentoDaColeta(doc({ cancelado: true }), { html: 'x' })), { conteudo: 'nao_lido', motivo: null, html: null });
  });
  await teste('pca: atalho de pulo do robô (só coleta quando o total ou o andamento mais recente mudou)', () => {
    const primeiro = { data: '13/04/2026 10:53', unidade: 'DELIC', usuario: 'fulano', descricao: 'Conclusão do processo na unidade' };
    const ultima = { registros: 42, primeiro: { data_hora: '13/04/2026 10:53', unidade: 'DELIC', descricao: 'Conclusão do processo na unidade' }, recebido_em: '', origem: 'robo' };
    assert.equal(precisaColetar(ultima, { total: 42, primeiro }), false);
    assert.equal(precisaColetar(ultima, { total: 43, primeiro }), true);
    assert.equal(precisaColetar(ultima, { total: 42, primeiro: { ...primeiro, descricao: 'Processo recebido' } }), true);
    assert.equal(precisaColetar(null, { total: 42, primeiro }), true, 'sem coleta anterior');
    assert.equal(precisaColetar({ ...ultima, registros: 0, primeiro: null }, { total: 0, primeiro: null }), false);
  });
  await teste('pca: linha do selo em palavras', () => {
    assert.equal(linhaDoPca({ tipo: 'sem_config' }), null, 'sem configuração, o selo não fala do PCA');
    assert.equal(linhaDoPca({ tipo: 'sem_vinculo' }), 'PCA: processo sem item vinculado');
    assert.equal(linhaDoPca({ tipo: 'item', itens: [ITEM], envio: 'em_dia' }), 'PCA: item 37/2026 · Em andamento · em dia');
    assert.equal(linhaDoPca({ tipo: 'item', itens: [ITEM], envio: { alterados: ['data_assinatura_contrato', 'numero_instrumento_contratual'], pendencias: [{ chave: 'a', texto: 'b' }] } }),
      'PCA: item 37/2026 · Em andamento · atualizado: data de assinatura, nº do contrato · 1 pendência');
    assert.equal(linhaDoPca({ tipo: 'item', itens: [ITEM], envio: { alterados: [], pendencias: [] } }), 'PCA: item 37/2026 · Em andamento · sem mudança');
  });
  await teste('pca cliente: Bearer, sem cookies, rotas do contrato v1 e a coleta em JSON', async () => {
    const { buscar, pedidos } = buscarFalso({ '/saude': { status: 200, corpo: { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: true } },
      '/processo?sei=': { status: 200, corpo: { itens: [ITEM] } }, '/processo?item=': { status: 200, corpo: { itens: [] } }, '/coleta': { status: 200, corpo: { itens: [] } } });
    const c = criarClientePca({ url: 'https://pca.exemplo.org/', token: 'T0k' }, buscar);
    assert.deepEqual(await c.saude(), { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: true });
    await c.porSei('12345670000007.000036/2025-81');
    await c.porItem(117, 2026);
    await c.coleta({ numero: 'N', andamentos: [], documentos: [] });
    assert.deepEqual(pedidos.map(p => p.url), ['https://pca.exemplo.org/api/sei/saude', 'https://pca.exemplo.org/api/sei/processo?sei=12345670000007.000036%2F2025-81',
      'https://pca.exemplo.org/api/sei/processo?item=117&exercicio=2026', 'https://pca.exemplo.org/api/sei/coleta']);
    for (const p of pedidos) {
      assert.equal((p.init!.headers as Record<string, string>).Authorization, 'Bearer T0k');
      assert.equal(p.init!.credentials, 'omit', 'nunca manda os cookies do SEI ao PCA');
    }
    assert.equal(pedidos[3].init!.method, 'POST');
    assert.equal((pedidos[3].init!.headers as Record<string, string>)['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(String(pedidos[3].init!.body)), { numero: 'N', andamentos: [], documentos: [] });
  });
  await teste('pca cliente: erros da tabela do contrato em palavras; rede fora do ar', async () => {
    const casos: [number, unknown, string, RegExp][] = [
      [401, { erro: 'nao_autenticado' }, 'nao_autenticado', /token do PCA inválido/],
      [403, { erro: 'sem_permissao' }, 'sem_permissao', /não pode enviar/],
      [404, { erro: 'processo_sem_item' }, 'processo_sem_item', /sem item vinculado/],
      [413, { erro: 'corpo_grande_demais' }, 'corpo_grande_demais', /limite/],
      [429, undefined, 'limite_requisicoes', /um minuto/],
      [502, undefined, 'http', /respondeu 502/],
    ];
    for (const [status, corpo, codigo, msg] of casos) {
      const c = criarClientePca({ url: 'https://p', token: 't' }, buscarFalso({ '/saude': { status, corpo } }).buscar);
      await assert.rejects(c.saude(), (e: unknown) => e instanceof ErroPca && e.codigo === codigo && msg.test(e.message), String(status));
    }
    const off = criarClientePca({ url: 'https://p', token: 't' }, buscarFalso({}).buscar);
    await assert.rejects(off.saude(), /não respondeu/);
  });
  await teste('pca v1.1: modalidade do PCA vira a via da extensão; a desconhecida não decide', () => {
    const casos: [string | null | undefined, string | null][] = [
      ['Pregão Eletrônico', 'pregao'], ['Concorrência', 'concorrencia'], ['Dispensa Com Disputa', 'dispensa'], ['Dispensa Sem Disputa', 'dispensa'],
      ['Inexigibilidade', 'inexigibilidade'], ['Adesão a ARP', 'adesao_ata'], ['Credenciamento', 'credenciamento'], ['  pregao eletronico ', 'pregao'],
      ['Chamamento Público', 'chamamento_publico'], ['Leilão', null], [null, null], [undefined, null], ['', null],
    ];
    for (const [m, via] of casos) assert.equal(viaDaModalidade(m), via, String(m));
  });
  await teste('pca v1.1 cliente: POST /vinculo em JSON (201 e 200 idempotente); 403 fala do grupo demandante; item inexistente em palavras', async () => {
    const { buscar, pedidos } = buscarFalso({ '/vinculo': { status: 201, corpo: { criado: true, item: ITEM } } });
    const c = criarClientePca({ url: 'https://p', token: 't' }, buscar);
    assert.deepEqual(await c.vincular({ item_pca: 37, exercicio: 2026, numero_sei: 'N-1' }), { criado: true, item: ITEM });
    assert.equal(pedidos[0].url, 'https://p/api/sei/vinculo');
    assert.equal(pedidos[0].init!.method, 'POST');
    assert.deepEqual(JSON.parse(String(pedidos[0].init!.body)), { item_pca: 37, exercicio: 2026, numero_sei: 'N-1' });
    const casos: [number, unknown, string, RegExp][] = [
      [403, { erro: 'sem_permissao' }, 'sem_permissao', /não pode vincular.*demandante/],
      [404, { erro: 'item_inexistente' }, 'item_inexistente', /item não existe no PCA/],
      [400, { erro: 'corpo_invalido', detalhes: ['x'] }, 'corpo_invalido', /recusou o vínculo/],
    ];
    for (const [status, corpo, codigo, msg] of casos) {
      const e = criarClientePca({ url: 'https://p', token: 't' }, buscarFalso({ '/vinculo': { status, corpo } }).buscar);
      await assert.rejects(e.vincular({ item_pca: 1, exercicio: 2026, numero_sei: 'N' }), (x: unknown) => x instanceof ErroPca && x.codigo === codigo && msg.test(x.message), String(status));
    }
  });
  await teste('pca config: só https e com token; vínculos por 12 h, por dígitos do processo; trocar a config apaga os vínculos', async () => {
    const a = areaFalsa();
    assert.equal(await lerConfigPca(a), null, 'sem configuração');
    await a.set({ [CHAVE_PCA]: { url: 'http://pca.exemplo.org', token: 't' } });
    assert.equal(await lerConfigPca(a), null, 'http não: o token iria aberto');
    await a.set({ [CHAVE_PCA]: { token: ' t ' } });
    assert.deepEqual(await lerConfigPca(a), { url: 'https://pca.sistemascfc.org', token: 't' }, 'sem endereço, o de produção');
    assert.equal(validarUrl(' https://pca.exemplo.org/ '), 'https://pca.exemplo.org');
    assert.equal(validarUrl('pca.exemplo.org'), null);
    const r = { itens: [ITEM], ultima_coleta: { registros: 1, primeiro: null, recebido_em: '', origem: 'robo' } };
    await guardarVinculo(a, '12345670000007.000036/2025-81', r, 1000);
    assert.deepEqual(await lerVinculo(a, '1234567000000700003620258 1', 2000), { itens: [ITEM] }, 'por dígitos; a última coleta não fica guardada');
    assert.equal(await lerVinculo(a, '12345670000007.000036/2025-81', 1000 + 12 * 3600 * 1000), null, 'vencido');
  });
  await teste('pca página: testar e guardar (usuário e permissão), token não volta à tela, erro em palavras, apagar', async () => {
    const { document } = parseHTML('<html><body><main id="gelic-peca"></main></body></html>');
    const doc = document as unknown as Document;
    const a = areaFalsa();
    a.m.set(CHAVE_VINCULOS, { x: 1 });
    const testados: unknown[] = [];
    let falhar = false;
    await montarPaginaPca(doc, { area: a, testar: async c => { testados.push(c); if (falhar) throw new ErroPca('nao_autenticado', 'token do PCA inválido ou revogado'); return { versao: 1, usuario: 'f@cfc.org.br', pode_enviar: true, pode_instruir: true }; } });
    const q = (s: string) => doc.querySelector<HTMLInputElement>(`[data-gelic-pca=${s}]`)!;
    const clicar = async (acao: string) => { doc.querySelector<HTMLButtonElement>(`[data-gelic-acao=${acao}]`)!.click(); await new Promise(r => setTimeout(r, 0)); };
    assert.match(q('status').textContent!, /Sem configuração/);
    await clicar('salvar');
    assert.match(q('status').textContent!, /Cole o token/);
    assert.equal(testados.length, 0);
    q('token').value = 'segredo';
    await clicar('salvar');
    assert.deepEqual(testados, [{ url: 'https://pca.sistemascfc.org', token: 'segredo' }]);
    const { conferido_em, ...guardado } = a.m.get(CHAVE_PCA) as Record<string, unknown>;
    assert.deepEqual(guardado, { url: 'https://pca.sistemascfc.org', token: 'segredo', usuario: 'f@cfc.org.br', pode_enviar: true, pode_instruir: true });
    assert.equal(typeof conferido_em, 'number', 'a permissão guarda quando foi conferida');
    assert.equal(a.m.has(CHAVE_VINCULOS), false, 'config nova apaga os vínculos de antes');
    assert.equal(q('token').value, '', 'o token não fica na tela');
    assert.match(q('status').textContent!, /Conectado como f@cfc\.org\.br · pode enviar.* · pode vincular processos/);
    falhar = true;
    q('token').value = 'outro';
    await clicar('salvar');
    assert.match(q('status').textContent!, /Não guardado: token do PCA inválido/);
    assert.equal((a.m.get(CHAVE_PCA) as { token: string }).token, 'segredo', 'o que falhou não substitui o guardado');
    await clicar('apagar');
    assert.equal(a.m.has(CHAVE_PCA), false);
  });
  await teste('pca coleta: todos os documentos, conteúdo só dos contratuais; PDF até o limite; falha de HTML derruba (como o robô), de PDF degrada', async () => {
    const arv = arvoreCom([doc({}), doc({ id: '2', numero: '2', titulo: 'Despacho 1' }), doc({ id: '3', numero: '3', externo: true, titulo: 'Termo Aditivo 1' }),
      doc({ id: '4', numero: '4', externo: true, titulo: 'Contrato 9 (anexo)' }), doc({ id: '5', numero: '5', titulo: 'Termo Aditivo 2', nivel: 'restrito' }),
      doc({ id: '6', numero: '6', externo: true, titulo: 'Contrato 7' })]);
    const lidos: string[] = [];
    const hist = async () => ({ total: 1, andamentos: [{ data: '13/04/2026 10:53', unidade: 'DELIC', usuario: 'f', descricao: 'Assinado Documento 1 (Contrato) por x@externo.com.br' }] });
    const corpo = await coletar(arv, {
      historico: hist,
      html: async d => { lidos.push(d.numero); return `<p>${d.numero}</p>`; },
      pdf: async d => { lidos.push(d.numero); if (d.id === '6') throw new Error('rede'); return d.id === '3' ? new Uint8Array([37, 80, 68, 70]) : new Uint8Array(MAX_BYTES_PDF); },
    });
    assert.equal(corpo.numero, arv.protocolo);
    assert.deepEqual(corpo.andamentos, [{ data_hora: '13/04/2026 10:53', unidade: 'DELIC', descricao: 'Assinado Documento 1 (Contrato) por x@externo.com.br' }]);
    assert.deepEqual(lidos, ['1234522', '3', '4', '6'], 'nem o despacho nem o restrito são lidos');
    // o PDF grande demais (passa do orçamento) e o que falhou vão como externo_nao_baixado: pendência no PCA, nunca 413
    assert.deepEqual(corpo.documentos.map(d => d.conteudo), ['html', 'nao_lido', 'pdf', 'externo_nao_baixado', 'nao_lido', 'externo_nao_baixado']);
    assert.equal(corpo.documentos[2].pdf_base64, 'JVBERg==');
    await assert.rejects(coletar(arv, { historico: hist, html: async () => { throw new Error('SEI_SESSAO_EXPIRADA'); }, pdf: async () => null }), /SEI_SESSAO_EXPIRADA/,
      'HTML que não veio derruba a coleta: o PCA não recebe contrato sem conteúdo');
    await assert.rejects(coletar(arv, { historico: async () => ({ total: 3, andamentos: [] }), html: async () => '', pdf: async () => null }), (e: unknown) => e instanceof ColetaRecusada && /incompleto \(0 de 3/.test((e as Error).message));
    const fechada = { ...arv, pagina: { html: 'Nos[1] = new infraArvoreNo("AGUARDE","AGUARDE1","PASTA1")' } } as unknown as Arvore;
    await assert.rejects(coletar(fechada, { historico: hist, html: async () => '', pdf: async () => null }), /pasta fechada/);
    const parar = new AbortController();
    parar.abort();
    await assert.rejects(coletar(arv, { historico: hist, html: async () => '', pdf: async () => null, sinal: parar.signal }), /cancelado/);
    assert.equal(base64(new Uint8Array(70_000).fill(65)).length, Math.ceil(70_000 / 3) * 4, 'base64 de bloco grande sem estourar a pilha');
  });
  await teste('pca atalho: a coleta da extensão vem sem total (o PCA não o guarda): vale o enviado deste navegador ou as últimas 24 h; o primeiro andamento comparado anonimizado', () => {
    const primeiro = { data: 'd', unidade: 'u', usuario: 'f', descricao: 'Assinado Documento 1 (Contrato) por fulano@externo.com.br' };
    const anon = { data_hora: 'd', unidade: 'u', descricao: 'Assinado Documento 1 (Contrato) por [omitido]' };
    assert.equal(anonimizar('Liberado acesso para usuário Fulano (f@x.br)'), 'Liberado acesso para usuário [omitido]');
    assert.equal(precisaColetar({ registros: 5, primeiro: anon, recebido_em: '', origem: 'robo' }, { total: 5, primeiro }), false, 'o robô guarda anonimizado');
    const daExtensao = { registros: null, primeiro: null, recebido_em: '2026-10-10T09:00:00-03:00', origem: 'extensao' };
    const agora = Date.parse('2026-10-10T10:00:00-03:00');
    assert.equal(precisaColetar(daExtensao, { total: 5, primeiro }, { agora }), false, 'a extensão enviou há 1 h');
    assert.equal(precisaColetar(daExtensao, { total: 5, primeiro }, { agora: agora + 2 * JANELA_EXTENSAO_MS }), true);
    const enviado = { total: 5, primeiro: { data_hora: 'd', unidade: 'u', descricao: primeiro.descricao }, t: 0 };
    assert.equal(precisaColetar(daExtensao, { total: 5, primeiro }, { enviado, agora: agora + 2 * JANELA_EXTENSAO_MS }), false, 'este navegador já enviou este estado');
    assert.equal(precisaColetar(daExtensao, { total: 6, primeiro }, { enviado, agora }), false, 'mudou, mas a extensão enviou há 1 h (como o robô, espera a janela)');
  });
  await teste('pca sincronizar: gelic com permissão envia só quando o histórico mudou; cfc e sem permissão só consultam (com vínculo guardado)', async () => {
    const vinculo: RespostaProcesso = { itens: [ITEM], ultima_coleta: { registros: 5, primeiro: { data_hora: 'd', unidade: 'u', descricao: 'x' }, recebido_em: '', origem: 'robo' } };
    const montar = (total: number, pode_enviar: boolean) => {
      const chamadas: string[] = [];
      const deps: DepsSincronizar = {
        cliente: {
          saude: async () => ({ versao: 1 }), porItem: async () => ({ itens: [] }),
          porSei: async () => { chamadas.push('porSei'); return vinculo; },
          coleta: async () => { chamadas.push('coleta'); return { itens: [{ item_pca: 37, exercicio: 2026, alterados: { data_assinatura_contrato: [null, '2026-02-03'] }, pendencias: [] }] }; },
        },
        config: { url: 'https://p', token: 't', pode_enviar }, area: areaFalsa(), agora: () => 1000,
        historico: async lim => { chamadas.push(`historico:${lim ?? 'todos'}`); return { total, andamentos: Array.from({ length: lim ?? total }, () => ({ data: 'd', unidade: 'u', usuario: 'f', descricao: 'x' })) }; },
        html: async () => '<p/>', pdf: async () => null,
      };
      return { deps, chamadas };
    };
    const arv = arvoreCom([doc({})]);
    let m = montar(5, true);
    assert.deepEqual(await sincronizarProcesso(arv, 'gelic', m.deps), { tipo: 'item', itens: [ITEM], envio: 'em_dia' });
    assert.deepEqual(m.chamadas, ['porSei', 'historico:1'], 'em dia: lê só a 1ª linha e não envia');
    m = montar(6, true);
    const passos: unknown[] = [];
    const fim = await sincronizarProcesso(arv, 'gelic', m.deps, e => passos.push(e));
    assert.deepEqual(m.chamadas, ['porSei', 'historico:1', 'historico:todos', 'coleta']);
    assert.deepEqual(passos, [{ tipo: 'item', itens: [ITEM], envio: 'enviando' }]);
    assert.equal(linhaDoPca(fim), 'PCA: item 37/2026 · Em andamento · atualizado: data de assinatura');
    m = montar(6, false);
    assert.deepEqual(await sincronizarProcesso(arv, 'gelic', m.deps), { tipo: 'item', itens: [ITEM] });
    assert.deepEqual(m.chamadas, ['porSei'], 'sem permissão: só consulta');
    await sincronizarProcesso(arv, 'gelic', m.deps);
    assert.deepEqual(m.chamadas, ['porSei'], 'a segunda vez sai do vínculo guardado');
    m = montar(6, true);
    assert.deepEqual(await sincronizarProcesso(arv, 'cfc', m.deps), { tipo: 'item', itens: [ITEM] });
    assert.ok(!m.chamadas.includes('coleta'), 'o SEI CFC nunca envia');
  });
  await teste('pca sincronizar: sem vínculo; erro do PCA em palavras; falha no envio mantém o item', async () => {
    const base = { config: { url: 'https://p', token: 't', pode_enviar: true }, area: null, agora: () => 1, html: async () => '', pdf: async () => null,
      historico: async () => ({ total: 0, andamentos: [] }) };
    const cli = (porSei: () => Promise<RespostaProcesso>, coleta = async () => ({ itens: [] })) => ({ saude: async () => ({ versao: 1 }), porItem: async () => ({ itens: [] }), porSei, coleta });
    assert.deepEqual(await sincronizarProcesso(arvoreCom([]), 'gelic', { ...base, cliente: cli(async () => ({ itens: [] })) }), { tipo: 'sem_vinculo' });
    assert.deepEqual(await sincronizarProcesso(arvoreCom([]), 'gelic', { ...base, cliente: cli(async () => { throw new ErroPca('nao_autenticado', 'token do PCA inválido'); }) }),
      { tipo: 'erro', mensagem: 'token do PCA inválido', codigo: 'nao_autenticado' });
    let perdeu = 0;
    const r = await sincronizarProcesso(arvoreCom([]), 'gelic', { ...base, aoPerderPermissao: () => perdeu++, cliente: cli(async () => ({ itens: [ITEM] }), async () => { throw new ErroPca('sem_permissao', 'sem permissão'); }) });
    assert.deepEqual(r, { tipo: 'item', itens: [ITEM], envio: { erro: 'sem permissão', codigo: 'sem_permissao' } });
    assert.equal(perdeu, 1, 'o 403 desliga o envio neste navegador (até a próxima conferência)');
  });
  await teste('pca sincronizar: cancelado não envia; o que foi enviado fica registrado e a próxima abertura não reenvia; "sem vínculo" não fica guardado', async () => {
    const area = areaFalsa();
    const posts: unknown[] = [];
    const hist = async (lim?: number) => ({ total: 2, andamentos: [{ data: 'd2', unidade: 'u', usuario: 'f', descricao: 'b' }, { data: 'd1', unidade: 'u', usuario: 'f', descricao: 'a' }].slice(0, lim ?? 2) });
    // o PCA devolve a coleta da extensão sem total, recebida há mais de 24 h
    const vinculo: RespostaProcesso = { itens: [ITEM], ultima_coleta: { registros: null, primeiro: null, recebido_em: '2026-01-01T00:00:00Z', origem: 'extensao' } };
    const deps = (sinal?: AbortSignal): DepsSincronizar => ({
      config: { url: 'https://p', token: 't', pode_enviar: true }, area, agora: () => Date.parse('2026-10-10T12:00:00Z'), html: async () => '', pdf: async () => null, historico: hist,
      ...(sinal ? { sinal } : {}),
      cliente: { saude: async () => ({ versao: 1 }), porItem: async () => ({ itens: [] }), porSei: async () => vinculo, coleta: async c => { posts.push(c); return { itens: [] }; } },
    });
    const parar = new AbortController();
    parar.abort();
    const cancelado = await sincronizarProcesso(arvoreCom([]), 'gelic', deps(parar.signal));
    assert.equal(posts.length, 0, 'cancelado: nada sai');
    assert.match(linhaDoPca(cancelado)!, /cancelado/);
    await sincronizarProcesso(arvoreCom([]), 'gelic', deps());
    assert.equal(posts.length, 1);
    assert.deepEqual(await sincronizarProcesso(arvoreCom([]), 'gelic', deps()), { tipo: 'item', itens: [ITEM], envio: 'em_dia' }, 'a coleta da extensão vem sem total: vale o registro deste navegador');
    assert.equal(posts.length, 1, 'não reenvia em laço');
    const a2 = areaFalsa();
    const vazio = { ...deps(), area: a2, config: { url: 'https://p', token: 't', pode_enviar: false } };
    vazio.cliente = { ...vazio.cliente, porSei: async () => ({ itens: [] }) };
    await sincronizarProcesso(arvoreCom([]), 'cfc', vazio);
    assert.equal(a2.m.has(CHAVE_VINCULOS), false, '"sem vínculo" não fica guardado: a Gelic pode ligar o processo a qualquer momento');
  });
  await teste('pca selo: linha antes do detalhe, com o check do vínculo (✓/✗); sem config, só "Ligar ao PCA" no detalhe; erro com Configurar; redesenhar não duplica', () => {
    const { document } = parseHTML('<html><body><div id="container"></div></body></html>');
    const doc = document as unknown as Document;
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir([{ titulo: 'DFD', numero: '1' }]), protocolo: 'P1' }, () => {}, 'gelic');
    let abriu = 0;
    desenharPca(doc, { tipo: 'sem_config' }, () => abriu++);
    assert.equal(doc.querySelector('#gelic-selo .gelic-pca'), null);
    doc.querySelector<HTMLButtonElement>('#gelic-selo .gelic-detalhe [data-gelic-pca-config]')!.click();
    assert.equal(abriu, 1);
    desenharPca(doc, { tipo: 'item', itens: [ITEM], envio: 'enviando' }, () => abriu++);
    desenharPca(doc, { tipo: 'item', itens: [ITEM], envio: { alterados: [], pendencias: [{ chave: 'k', texto: 'Documento 1 não pôde ser lido' }] } }, () => abriu++);
    const linhas = doc.querySelectorAll('#gelic-selo .gelic-pca');
    assert.equal(linhas.length, 1);
    assert.deepEqual([...doc.querySelectorAll('#gelic-selo [data-gelic-pca-config]')].map(b => b.textContent), ['Configurar o PCA…'], 'configurado: um botão só, para trocar o token');
    assert.equal(linhas[0].nextElementSibling?.classList.contains('gelic-detalhe'), true);
    assert.match(linhas[0].textContent!, /item 37\/2026 · Em andamento · sem mudança · 1 pendência/);
    assert.equal(linhas[0].getAttribute('title'), 'Documento 1 não pôde ser lido');
    // o check do vínculo à vista: ✓ com item, ✗ sem; consultando e erro sem check
    assert.equal(linhas[0].getAttribute('data-gelic-vinculo'), 'sim');
    assert.equal(linhas[0].querySelector('.gelic-pca-marca')?.textContent, '✓');
    desenharPca(doc, { tipo: 'sem_vinculo' }, () => abriu++);
    const sem = doc.querySelector('#gelic-selo .gelic-pca')!;
    assert.equal(sem.getAttribute('data-gelic-vinculo'), 'nao');
    assert.equal(sem.textContent, '✗ PCA: processo sem item vinculado');
    desenharPca(doc, { tipo: 'consultando' }, () => abriu++);
    assert.equal(doc.querySelector('#gelic-selo .gelic-pca .gelic-pca-marca'), null);
    desenharPca(doc, { tipo: 'erro', mensagem: 'token do PCA inválido' }, () => abriu++);
    assert.equal(doc.querySelector('#gelic-selo .gelic-pca')!.hasAttribute('data-gelic-vinculo'), false);
    doc.querySelector<HTMLButtonElement>('#gelic-selo .gelic-pca [data-gelic-pca-config]')!.click();
    assert.equal(abriu, 2);
  });
  await teste('pca DFD: item pelo processo; sem vínculo ou com vários, pelo item informado; grau só se for do DFD', async () => {
    assert.deepEqual(dadosDoItem({ ...ITEM, grau_prioridade: 'medio' }), { item_pca: 37, ano: 2026, grau_prioridade: 'Médio' });
    assert.deepEqual(dadosDoItem(ITEM), { item_pca: 37, ano: 2026 }, '"Essencial" não é grau do DFD: o usuário escolhe');
    const outro = { ...ITEM, item_pca: 40 };
    const consultas: string[] = [];
    const cli = (porSei: ItemPca[], porItem: ItemPca[]) => ({ saude: async () => ({ versao: 1 }), coleta: async () => ({ itens: [] }),
      porSei: async (n: string) => { consultas.push(`sei:${n}`); return { itens: porSei }; },
      porItem: async (i: number | string, e: number | string) => { consultas.push(`item:${i}/${e}`); return { itens: porItem }; } });
    assert.deepEqual(await dadosDoPcaCom(cli([ITEM], []))('P1'), { item_pca: 37, ano: 2026 });
    assert.deepEqual(await dadosDoPcaCom(cli([ITEM, outro], []))('P1', { item_pca: '40', ano: 2026 }), { item_pca: 40, ano: 2026 }, 'vários: o informado');
    assert.equal(await dadosDoPcaCom(cli([ITEM, outro], []))('P1'), undefined, 'vários e nada informado: o usuário escolhe');
    consultas.length = 0;
    assert.deepEqual(await dadosDoPcaCom(cli([], [outro]))('P1', { item_pca: 40, ano: '2026' }), { item_pca: 40, ano: 2026 });
    assert.deepEqual(consultas, ['sei:P1', 'item:40/2026']);
    assert.equal(await dadosDoPcaCom(cli([], [outro]))('P1', { item_pca: 40 }), undefined, 'sem o exercício não busca pelo item');
  });
  await teste('pca controle: "Atualizar PCA" nas linhas visíveis, 3 por vez, sigiloso não lido, marca por linha e resumo', async () => {
    const doc = parseHTML(readFileSync(new URL('../../sei-nucleo/tests/fixtures/sei41/caixa.html', import.meta.url), 'utf8')).document as unknown as Document;
    const barra = doc.createElement('section');
    barra.innerHTML = '<div class="gelic-ctl-chips"></div>';
    doc.body.prepend(barra);
    const trs = [...doc.querySelectorAll<HTMLTableRowElement>('#tblProcessosRecebidos tr[id^="P"], #tblProcessosGerados tr[id^="P"]')];
    trs[0].setAttribute('data-gelic-oculto', '');
    let ativos = 0, maximo = 0, n = 0;
    const abertos: string[] = [];
    const atualizar = ligarPcaNoControle(doc, barra, {
      abrir: async href => { abertos.push(href); ativos++; maximo = Math.max(maximo, ativos); await new Promise(r => setTimeout(r, 3)); ativos--; return arvoreCom([]); },
      sincronizar: async () => {
        n++;
        if (n === 1) return { tipo: 'sem_vinculo' };
        if (n === 2) throw new Error('rede');
        return n % 2 ? { tipo: 'item', itens: [ITEM], envio: 'em_dia' } : { tipo: 'item', itens: [ITEM], envio: { alterados: ['situacao'], pendencias: [] } };
      },
    });
    assert.ok(barra.querySelector('.gelic-ctl-pca'), 'botão na barra');
    await atualizar();
    assert.ok(maximo <= 3 && maximo > 1, `concorrência ${maximo}`);
    const sigilosos = trs.filter(tr => !tr.hasAttribute('data-gelic-oculto') && /sigiloso/i.test(tr.innerHTML)).length;
    assert.ok(!abertos.some(h => trs[0].innerHTML.includes(h.replaceAll('&', '&amp;'))), 'a linha escondida pelo filtro fica de fora');
    const marcas = doc.querySelectorAll('.gelic-pca-linha');
    assert.equal(marcas.length, abertos.length, 'uma marca por processo lido');
    const estado = barra.querySelector('.gelic-ctl-pca-estado')!.textContent!;
    assert.match(estado, /^PCA: \d+ processos · \d+ atualizados? · \d+ em dia · 1 sem vínculo · 1 com erro/);
    if (sigilosos) assert.match(estado, /sigiloso/);
    assert.equal(resumoPca({ atualizado: 1, sigiloso: 2 }), 'PCA: 3 processos · 1 atualizado · 2 sigilosos (não lidos)');
  });
  await teste('pca controle: linha escondida pela pesquisa rápida do SEI Pro fica fora do "Atualizar PCA"', async () => {
    const doc = parseHTML(readFileSync(new URL('../../sei-nucleo/tests/fixtures/sei41/caixa.html', import.meta.url), 'utf8')).document as unknown as Document;
    const barra = doc.createElement('section');
    barra.innerHTML = '<div class="gelic-ctl-chips"></div>';
    doc.body.prepend(barra);
    const trs = [...doc.querySelectorAll<HTMLTableRowElement>('#tblProcessosRecebidos tr[id^="P"], #tblProcessosGerados tr[id^="P"]')]
      .filter(tr => !/sigiloso/i.test(tr.innerHTML));
    trs[1].classList.add(classeDaPesquisaRapida());
    const href = (tr: HTMLTableRowElement) => tr.querySelector('a[href*="acao=procedimento_trabalhar"]')!.getAttribute('href')!;
    const abertos: string[] = [];
    const atualizar = ligarPcaNoControle(doc, barra, {
      abrir: async h => { abertos.push(h); return arvoreCom([]); },
      sincronizar: async () => ({ tipo: 'item', itens: [ITEM], envio: 'em_dia' }),
    });
    await atualizar();
    assert.ok(abertos.includes(href(trs[0])), 'a linha à vista entra');
    assert.ok(!abertos.includes(href(trs[1])), 'a linha escondida pela pesquisa fica de fora');
  });
  await teste('pca A04: o vínculo vai ao pacote do DVI como fato; sem vínculo, candidato (o nº SEI pode não estar no PCA ainda)', async () => {
    assert.deepEqual(checagemPca({ itens: [ITEM] }), { tipo: 'pca', candidato: false, sei: [],
      texto: 'PCA: o sistema do PCA liga este processo ao item 37/2026 (Em andamento). Para o A04, a demanda consta do PCA.' });
    const sem = checagemPca({ itens: [] });
    assert.equal(sem.candidato, true);
    assert.match(sem.texto, /confira o item do PCA citado no DFD/);
    assert.equal(await GANCHOS_DVI.pca!('P1'), undefined, 'sem configuração do PCA, nada (e nada sai pela rede)');
  });
  await teste('pca controle: limite de requisições, token inválido ou sessão expirada param o lote inteiro', async () => {
    const doc = parseHTML(readFileSync(new URL('../../sei-nucleo/tests/fixtures/sei41/caixa.html', import.meta.url), 'utf8')).document as unknown as Document;
    const barra = doc.createElement('section');
    doc.body.prepend(barra);
    let n = 0;
    const atualizar = ligarPcaNoControle(doc, barra, {
      abrir: async () => arvoreCom([]),
      sincronizar: async () => { n++; return { tipo: 'erro', mensagem: 'limite', codigo: 'limite_requisicoes' }; },
    });
    await atualizar();
    assert.ok(n <= 3, `parou no primeiro erro de cada trabalhador (${n})`);
    assert.match(barra.querySelector('.gelic-ctl-pca-estado')!.textContent!, /parado: limite de requisições do PCA/);
  });
  await teste('pca controle: com processos marcados na caixa do SEI, só eles; sem marcados, os visíveis; a seleção do SEI não é alterada', async () => {
    const doc = parseHTML(readFileSync(new URL('../../sei-nucleo/tests/fixtures/sei41/caixa.html', import.meta.url), 'utf8')).document as unknown as Document;
    const barra = doc.createElement('section');
    doc.body.prepend(barra);
    const caixas = [...doc.querySelectorAll<HTMLInputElement>('input.infraCheckboxInput')];
    const abertos: string[] = [];
    const atualizar = ligarPcaNoControle(doc, barra, { abrir: async href => { abertos.push(href); return arvoreCom([]); }, sincronizar: async () => ({ tipo: 'sem_vinculo' }) });
    const botao = barra.querySelector<HTMLButtonElement>('.gelic-ctl-pca')!;
    assert.equal(botao.textContent, 'Atualizar PCA');
    caixas[1].checked = true;
    caixas[2].checked = true;
    caixas[1].dispatchEvent(new (doc.defaultView as unknown as { Event: typeof Event }).Event('change', { bubbles: true }));
    assert.equal(botao.textContent, 'Atualizar PCA (2 marcados)');
    await atualizar();
    assert.equal(abertos.length, 2, 'só os marcados');
    assert.deepEqual(caixas.map(c => c.checked).filter(Boolean).length, 2, 'a seleção do SEI fica como estava');
    caixas[1].checked = caixas[2].checked = false;
    abertos.length = 0;
    await atualizar();
    assert.ok(abertos.length > 2, 'sem marcados: todos os visíveis');
  });
}

const arvoreCom = (documentos: Arvore['documentos']): Arvore => ({ idProcedimento: '148265', protocolo: '12345670000007.000036/2025-81', tipo: 'Contratação', nivel: 'publico', marcadores: [], documentos, acoesProcesso: [], botoesProcesso: [] } as unknown as Arvore);
const pick = (d: { conteudo: string; motivo: string | null; html: string | null }) => ({ conteudo: d.conteudo, motivo: d.motivo, html: d.html });
