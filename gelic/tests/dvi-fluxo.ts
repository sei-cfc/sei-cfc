/**
 * Fluxo do DVI barato (src/dvi/contexto.ts, src/dvi/prompt.ts, src/dvi/pendencias.ts, src/agente/dvi.ts): a ponte
 * pacote → contexto, a requisição única ao modelo, e as ferramentas com um contexto falso (ponte do SEI e
 * ctx.completar de mentira, sem rede).
 *
 *   npx tsx -e "import('./tests/dvi-fluxo.ts').then(m=>m.verificarDviFluxo())"
 */
import assert from 'node:assert/strict';
import type { ContextoTool } from '../../agente-ia/src/motor/tools';
import { ANALISES, MAX_CHAMADAS, TOOLS_DVI } from '../src/agente/dvi';
import { contextoDoPacote, semEnvelope } from '../src/dvi/contexto';
import { montarDocumento, validarAchados, type Achados } from '../src/dvi/montar/index';
import { textoDePendencias } from '../src/dvi/pendencias';
import { prepararDvi, type PacoteDvi } from '../src/dvi/preparar/index';
import { estimarTokens, extrairJson, requisicaoDvi, SISTEMA_DVI } from '../src/dvi/prompt';
import { contextoFalso, HOJE, PREPARATORIA, PRORROGACAO, type DocFalso } from './dvi-preparar';
import { teste } from './util';

const PROCESSO = '12345670000048.000007/2026-13';
const tool = (nome: string) => TOOLS_DVI.find(t => t.nome === nome)!;

/** Contexto falso da preparação + criar/editar documento + completar com respostas prontas. */
function fluxoFalso(docs: DocFalso[], respostas: string[], o: { sigiloso?: boolean; semCompletar?: boolean } = {}) {
  const base = contextoFalso(docs, { consentir: true, sigiloso: o.sigiloso });
  const chamadas: { sistema: string; pedido: string }[] = [];
  const escritas: { op: string; a: Record<string, unknown> }[] = [];
  const ctx = {
    ...base.ctx,
    async sei(op: string, a: Record<string, unknown>) {
      if (op === 'documento.criar') {
        escritas.push({ op, a });
        return { alvo: `Processo ${a.processo}`, mudancas: [{ campo: 'Tipo', antes: '', depois: String((a.novo as { tipo: string }).tipo) }], resumo: 'Novo documento', ...(a.aplicar ? { dados: { numero: '9999001' } } : {}) };
      }
      if (op === 'documento.editar') { escritas.push({ op, a }); return { alvo: String(a.numero), mudancas: [], resumo: 'Corpo gravado' }; }
      return base.ctx.sei(op, a);
    },
    ...(o.semCompletar ? {} : {
      async completar(sistema: string, pedido: string) {
        chamadas.push({ sistema, pedido });
        const r = respostas.shift();
        if (r === undefined) throw new Error('chamada a mais ao modelo');
        return r;
      },
    }),
  } as unknown as ContextoTool;
  return { ctx, chamadas, escritas, lidos: base.lidos };
}

/** Achados válidos para o pacote: todo item nao_verificado, um achado [I] no ETP (T04). */
function achadosValidos(p: PacoteDvi): Achados {
  const status: Achados['checklist_status'] = Object.fromEntries(p.checklist.map(i => [i.id, { status: 'nao_verificado' as const }]));
  status!.T04 = { status: 'nao_atende', sei: '9300002' };
  return {
    processo: p.processo,
    objeto: 'contratação de serviços de manutenção predial.',
    verificacao_legal: false,
    blocos: [{ documento: 'Estudo Técnico Preliminar 30/2026', sei: '9300002', achados: [{
      item: 'Estimativa do valor', constatacao: 'O ETP não traz a memória de cálculo da estimativa de valor.',
      recomendacao: 'Incluir a memória de cálculo da estimativa, coerente com o MCP (SEI 9300006).', checklist: 'T04',
    }] }],
    checklist_status: status,
    limitacoes: ['O Relatório de pesquisa complementar foi lido só em parte.'],
  };
}

const pacoteDe = async (docs: DocFalso[]) => prepararDvi(PROCESSO, contextoFalso(docs, { consentir: true }).ctx, { hoje: HOJE });

export async function verificarDviFluxo(): Promise<void> {
  const prep = await pacoteDe(PREPARATORIA);
  const prorr = await pacoteDe(PRORROGACAO);

  await teste('dvi-fluxo: com o PCA configurado, a preparatória leva a checagem do A04; falha do PCA não derruba', async () => {
    const item = { item_pca: 37, exercicio: 2026, situacao_rotulo: 'Em andamento' };
    const com = await prepararDvi(PROCESSO, contextoFalso(PREPARATORIA, { consentir: true }).ctx, { hoje: HOJE, pca: async () => ({ itens: [item] }) });
    assert.deepEqual(com.checagens.filter(c => c.tipo === 'pca').map(c => c.candidato), [false]);
    assert.deepEqual(prep.checagens.filter(c => c.tipo === 'pca'), [], 'sem o gancho, nada');
    const fora = await prepararDvi(PROCESSO, contextoFalso(PREPARATORIA, { consentir: true }).ctx, { hoje: HOJE, pca: async () => { throw new Error('fora do ar'); } });
    assert.deepEqual(fora.checagens.filter(c => c.tipo === 'pca'), []);
  });
  await teste('dvi-fluxo: contextoDoPacote — documentos dos autos (lidos e não lidos, sem sigiloso nem cancelado), textos sem envelope, checklist e DVI anterior', () => {
    const c = contextoDoPacote(prorr);
    const nums = c.documentos.map(d => d.numero);
    assert.deepEqual(nums, [...nums].sort());
    assert.ok(nums.includes('9200002'), 'o ETP não lido continua citável');
    assert.ok(!nums.includes('9200009') && !nums.includes('9200010'), 'cancelado e sigiloso fora');
    assert.equal(c.documentos.find(d => d.numero === '9200002')!.assinado, true);
    assert.equal(c.documentos.find(d => d.numero === '9200005')!.assinado, false);
    assert.equal(c.documentos.find(d => d.numero === '9200001')!.classe, 'tr');
    assert.deepEqual(c.checklist, { familia: 'prorrogacao', series: ['G', 'B'] });
    assert.equal(c.dviAnterior, null);
    assert.equal(c.processo, PROCESSO);
    for (const d of prorr.documentos) {
      assert.ok(!c.textos![d.numero].includes('nonce='), 'sem envelope');
      assert.equal(c.textos![d.numero], semEnvelope(d.texto));
    }
  });

  await teste('dvi-fluxo: contextoDoPacote — checagens no formato do validador (cronologia por regra, MCP sem proposta em número)', () => {
    const c = contextoDoPacote(prep).checagens!;
    assert.deepEqual(c.cronologia!.map(x => x.regra).sort(), ['apos_encaminhamento', 'cientificacao_antes']);
    assert.deepEqual(c.mcpSemProposta, [14500]);
    assert.deepEqual(c.processosDivergentes, []);
    const ach = achadosValidos(prep);
    assert.deepEqual(validarAchados(ach, contextoDoPacote(prep)).erros, []);
    assert.equal(montarDocumento('dvi', ach, contextoDoPacote(prep)).tipoSei?.tipo, 'DVI');
  });

  await teste('dvi-fluxo: requisição única — sistema fixo, pedido compacto (sem JSON indentado nem dado repetido), tokens = caracteres / 2,4', () => {
    const r = requisicaoDvi(prorr, 'dvi', 'olhar a certidão');
    assert.equal(r.sistema, SISTEMA_DVI);
    assert.equal(r.caracteres, r.sistema.length + r.pedido.length);
    assert.equal(r.tokensEstimados, Math.ceil(r.caracteres / 2.4));
    assert.equal(estimarTokens(24), 10);
    for (const i of prorr.checklist) assert.ok(r.pedido.includes(`\n${i.id} ${i.grau} `), i.id);
    for (const d of prorr.documentos) {
      assert.equal(r.pedido.split(`# SEI ${d.numero} `).length, 2, `cabeçalho de ${d.numero} uma vez`);
      assert.equal(r.pedido.split(d.texto).length, 2, `texto de ${d.numero} uma vez`);
    }
    assert.ok(r.pedido.includes('Observações do usuário: olhar a certidão'));
    assert.ok(r.pedido.includes('F [5] Ofício - Manifestação de interesse (SEI 9200005) sem assinatura eletrônica'));
    assert.ok(r.pedido.includes('C Valores muito próximos'));
    assert.ok(!/\{\s*\n\s+"/.test(r.pedido), 'nada de JSON indentado');
    assert.ok(/Responda SOMENTE com o JSON/.test(r.sistema) && /nunca página/.test(r.sistema) && /etapa posterior/.test(r.sistema) && /limitacoes/.test(r.sistema));
    assert.ok(r.sistema.length < 4000, `sistema com ${r.sistema.length} caracteres`);
  });

  await teste('dvi-fluxo: extrairJson tolera cerca ```json e texto em volta; recusa resposta sem objeto', () => {
    assert.deepEqual(extrairJson('```json\n{"a":1}\n```'), { a: 1 });
    assert.deepEqual(extrairJson('Segue:\n{"a":{"b":2}}\nFim.'), { a: { b: 2 } });
    assert.throws(() => extrairJson('não sei'), SyntaxError);
  });

  await teste('dvi-fluxo: gelic_dvi_analisar — leitura; 1 chamada quando o JSON é válido; nenhum texto de documento volta à conversa', async () => {
    ANALISES.clear();
    const t = tool('gelic_dvi_analisar');
    assert.equal(t.efeito, 'leitura');
    const ach = achadosValidos(prep);
    const f = fluxoFalso(PREPARATORIA, ['```json\n' + JSON.stringify(ach) + '\n```']);
    const r = await t.executar({ processo: PROCESSO }, f.ctx) as Record<string, any>;
    assert.equal(f.chamadas.length, 1);
    assert.equal(r.chamadas, 1);
    assert.equal(r.ok, true, JSON.stringify(r.erros));
    assert.equal(r.formato, 'dvi');
    assert.match(r.resumo, /- \[I\] Estudo Técnico Preliminar 30\/2026 \(SEI 9300002\)/);
    assert.deepEqual(r.achados, ach);
    assert.deepEqual(r.paraOChat.at(-1), 'Limitação (não vai no documento): O Relatório de pesquisa complementar foi lido só em parte.');
    assert.ok(r.pacote.caracteres > 10_000 && r.pacote.tokensEstimados === Math.ceil(r.pacote.caracteres / 2.4));
    assert.ok(f.chamadas[0].pedido.includes('Cláusula 10 do termo de referência'), 'o pacote foi ao modelo');
    const volta = JSON.stringify(r);
    for (const trecho of ['Cláusula 10 do termo de referência', 'Item 3 do estudo técnico', 'Registro 5 de consulta', 'nonce=', 'Necessidade 3.']) assert.ok(!volta.includes(trecho), `"${trecho}" voltou à conversa`);
    assert.ok(volta.length < 12_000, `resultado com ${volta.length} caracteres`);
    assert.ok(ANALISES.has(PROCESSO));
  });

  await teste(`dvi-fluxo: gelic_dvi_analisar — JSON inválido → 1 correção com os erros e o JSON anterior; nunca mais de ${MAX_CHAMADAS} chamadas`, async () => {
    const t = tool('gelic_dvi_analisar');
    const ach = achadosValidos(prep);
    const { checklist_status: _s, ...semStatus } = ach;
    const f = fluxoFalso(PREPARATORIA, [JSON.stringify(semStatus), JSON.stringify(ach)]);
    const r = await t.executar({ processo: PROCESSO }, f.ctx) as Record<string, any>;
    assert.equal(f.chamadas.length, 2);
    assert.equal(r.chamadas, 2);
    assert.equal(r.ok, true);
    assert.match(f.chamadas[1].pedido, /O validador recusou:\n- campo obrigatório ausente ou de tipo errado: checklist_status/);
    assert.ok(f.chamadas[1].pedido.includes(JSON.stringify(semStatus)), 'manda o JSON anterior');
    const g = fluxoFalso(PREPARATORIA, ['não sei', JSON.stringify(semStatus), JSON.stringify(ach)]);
    const r2 = await t.executar({ processo: PROCESSO }, g.ctx) as Record<string, any>;
    assert.equal(g.chamadas.length, 2, 'para na segunda');
    assert.equal(r2.ok, false);
    assert.ok(r2.erros.some((e: string) => /checklist_status/.test(e)));
    const h = fluxoFalso(PREPARATORIA, ['nada', 'nada de novo', 'x']);
    const r3 = await t.executar({ processo: PROCESSO }, h.ctx) as Record<string, any>;
    assert.equal(h.chamadas.length, 2);
    assert.equal(r3.ok, false);
    assert.match(r3.erro, /JSON válido/);
  });

  await teste('dvi-fluxo: gelic_dvi_analisar — sem ctx.completar dá erro claro; processo sigiloso é recusado; devolução sem DVI anterior não chama o modelo', async () => {
    const t = tool('gelic_dvi_analisar');
    const sem = await t.executar({ processo: PROCESSO }, fluxoFalso(PREPARATORIA, [], { semCompletar: true }).ctx) as Record<string, any>;
    assert.equal(sem.ok, false);
    assert.match(sem.erro, /completar/);
    const sig = fluxoFalso(PREPARATORIA, ['{}'], { sigiloso: true });
    await assert.rejects(t.executar({ processo: PROCESSO }, sig.ctx), /sigiloso/);
    assert.equal(sig.chamadas.length, 0);
    assert.deepEqual(sig.lidos, []);
    const dev = fluxoFalso(PREPARATORIA, ['{}']);
    const r = await t.executar({ processo: PROCESSO, pedido: 'devolucao' }, dev.ctx) as Record<string, any>;
    assert.equal(r.ok, false);
    assert.equal(dev.chamadas.length, 0);
    assert.match(r.erro, /DVI anterior/);
  });

  await teste('dvi-fluxo: gelic_dvi_gravar — escrita com prévia; grava exatamente o html do montarDocumento, tipo DVI; nunca chama o modelo', async () => {
    ANALISES.clear();
    const g = tool('gelic_dvi_gravar');
    assert.equal(g.efeito, 'escrita');
    assert.ok(g.previsualizar);
    const ach = achadosValidos(prep);
    const f = fluxoFalso(PREPARATORIA, [JSON.stringify(ach)]);
    await tool('gelic_dvi_analisar').executar({ processo: PROCESSO }, f.ctx);
    const previa = await g.previsualizar!({ processo: PROCESSO }, f.ctx);
    assert.equal(previa[0].erro, undefined);
    assert.deepEqual(f.escritas.map(e => [e.op, e.a.aplicar]), [['documento.criar', false]]);
    assert.ok(previa[0].mudancas.some(m => /Conteúdo \(dvi\)/.test(m.campo)));
    const r = await g.executar({ processo: PROCESSO }, f.ctx) as Record<string, any>;
    assert.equal(r.ok, true);
    assert.equal(r.tipo, 'DVI');
    const esperado = montarDocumento('dvi', ach, contextoDoPacote(prep));
    assert.deepEqual(f.escritas.map(e => [e.op, e.a.aplicar]), [['documento.criar', false], ['documento.criar', true], ['documento.editar', true]]);
    assert.deepEqual(f.escritas[1].a.novo, { tipo: 'DVI' });
    assert.equal(f.escritas[2].a.numero, '9999001');
    assert.equal(f.escritas[2].a.html, esperado.html);
    assert.equal(f.chamadas.length, 1, 'só a da análise');
    assert.match(r.aviso, /não foi assinado/);
  });

  await teste('dvi-fluxo: gelic_dvi_gravar — achados corrigidos revalidados (erro não grava), tipo do usuário, e sem análise pede gelic_dvi_analisar', async () => {
    ANALISES.clear();
    const g = tool('gelic_dvi_gravar');
    const vazio = fluxoFalso(PREPARATORIA, []);
    const r0 = await g.executar({ processo: PROCESSO }, vazio.ctx) as Record<string, any>;
    assert.equal(r0.ok, false);
    assert.match(r0.erro, /gelic_dvi_analisar/);
    assert.match((await g.previsualizar!({ processo: PROCESSO }, vazio.ctx))[0].erro!, /gelic_dvi_analisar/);
    assert.equal(vazio.escritas.length, 0);

    const ach = achadosValidos(prep);
    const corrigido = { ...ach, objeto: 'contratação de serviços de limpeza.' };
    const f = fluxoFalso(PREPARATORIA, []);
    const r = await g.executar({ processo: PROCESSO, achados: corrigido, tipo: 'Documento de Verificação da Instrução' }, f.ctx) as Record<string, any>;
    assert.equal(r.ok, true, JSON.stringify(r));
    assert.deepEqual(f.escritas[0].a.novo, { tipo: 'Documento de Verificação da Instrução' });
    assert.equal(f.escritas[1].a.html, montarDocumento('dvi', corrigido, contextoDoPacote(prep)).html);
    assert.ok(String(f.escritas[1].a.html).includes('serviços de limpeza'));

    const ruim = { ...ach, checklist_status: { ...ach.checklist_status, T04: { status: 'atende', sei: '1' } } };
    const e = fluxoFalso(PREPARATORIA, []);
    const r2 = await g.executar({ processo: PROCESSO, achados: ruim }, e.ctx) as Record<string, any>;
    assert.equal(r2.ok, false);
    assert.ok(r2.erros.length);
    assert.equal(e.escritas.length, 0);
  });

  await teste('dvi-fluxo: gelic_pendencias — leitura, zero chamadas ao modelo; checklist determinístico com nº SEI', async () => {
    const t = tool('gelic_pendencias');
    assert.equal(t.efeito, 'leitura');
    const f = fluxoFalso(PREPARATORIA, []);
    const r = await t.executar({ processo: PROCESSO }, f.ctx) as { texto: string };
    assert.equal(f.chamadas.length, 0);
    assert.equal(r.texto, textoDePendencias(prep));
    for (const l of ['- [atende] DFD: SEI 9300001', '- [atende] ETP: SEI 9300002', '- [atende] Termo de Referência: SEI 9300003', '- [a conferir] [4] Proposta comercial Empresa A (SEI 9300004) sem assinatura eletrônica']) assert.ok(r.texto.includes(l), l);
    assert.match(r.texto, /Cronologia:\n- \[a conferir\] Despacho de encaminhamento \(SEI 9300010\)/);
    assert.match(r.texto, /\[a conferir\] Valores do MCP .*R\$ 14\.500,00/);
    const p = textoDePendencias(prorr);
    assert.ok(p.includes('- [atende] Contrato ou aditivo vigente: SEI 9200003'));
    assert.ok(p.includes('- [a conferir] SEI 9200002 Estudo Técnico Preliminar 9/2024: fora da leitura dirigida'));
    const sem = textoDePendencias({ ...prep, documentos: prep.documentos.filter(d => d.tipo !== 'dfd') });
    assert.ok(sem.includes('- [não atende] DFD: não localizado'));
    await assert.rejects(t.executar({ processo: PROCESSO }, fluxoFalso(PREPARATORIA, [], { sigiloso: true }).ctx), /sigiloso/);
  });
}
