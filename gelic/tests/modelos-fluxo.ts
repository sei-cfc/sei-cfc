/**
 * Documento por modelo barato (src/modelos/fontes.ts, src/modelos/analise.ts, gelic_modelo_analisar e
 * gelic_documento_gravar em src/agente/modelos.ts), com um contexto falso: árvore e documentos sintéticos e
 * ctx.completar de mentira, sem rede.
 *
 *   npx tsx -e "import('./tests/modelos-fluxo.ts').then(m=>m.verificarModelosFluxo())"
 */
import assert from 'node:assert/strict';
import type { ContextoTool } from '../../agente-ia/src/motor/tools';
import { analisarModelo, ANALISES_MODELO, MAX_CHAMADAS_MODELO, TOOLS_MODELOS } from '../src/agente/modelos';
import { AUTORIDADES, conferirResposta, derivar, mesclar, prePreencher, variaveisAPedir } from '../src/modelos/analise';
import { brl, extenso } from '../src/modelos/calculos';
import { selecionarFontes, tipoFonte } from '../src/modelos/fontes';
import { formulario, listarModelos, paraHtmlSei, preencher } from '../src/modelos/motor';
import { contextoFalso, PRORROGACAO, type DocFalso } from './dvi-preparar';
import { teste } from './util';

const PROCESSO = '12345670000048.000009/2026-21';
const HOJE = new Date(2026, 9, 9);
const SEGREDO = 'FRASE-DE-CONTROLE-QUE-NAO-PODE-VOLTAR';
const VP = AUTORIDADES.vp_gestao;
const linhas = (n: number, f: (i: number) => string) => Array.from({ length: n }, (_, i) => f(i)).join('\n');

/** Contratação direta por inexigibilidade (treinamento), sintética. */
export const INEXIGIBILIDADE: DocFalso[] = [
  { numero: '9400001', titulo: 'Documento de Formalização de Demanda - DFD', assinado: true, texto: 'Unidade demandante: DEGEP.\nNecessidade de capacitação da equipe.' },
  { numero: '9400002', titulo: 'Termo de Referência 12/2026', assinado: true, texto: `TERMO DE REFERÊNCIA\n1. Objeto: contratação de curso de capacitação em licitações, conforme condições estabelecidas neste Termo de Referência.\n${linhas(600, i => (i === 300 ? SEGREDO : `Cláusula ${i} do termo de referência com obrigações gerais.`))}` },
  { numero: '9400003', titulo: 'Proposta comercial Empresa Exemplo', texto: 'Empresa Exemplo Treinamentos Ltda., CNPJ 00.000.000/0001-00.\nValor total: R$ 82.242,00.' },
  { numero: '9400004', titulo: 'Justificativa de inexigibilidade', assinado: true, texto: 'Treinamento com profissional de notória especialização.' },
  { numero: '9400005', titulo: 'Despacho Gelic - emissão reserva Gecont', assinado: true, texto: 'À Gecont.' },
  { numero: '9400006', titulo: 'Anexo sem relação', texto: 'Não deve ser lido.' },
  { numero: '9400007', nivel: 'sigiloso', texto: 'segredo' },
];

const RESPOSTA_BOA = {
  'hipotese.inex_exclusivo': { valor: false },
  'hipotese.inex_treinamento': { valor: true, sei: '9400004' },
  'hipotese.dispensa_valor': { valor: false },
  'autoridade.nome': { valor: VP.nome },
  'contratacao.numero': null,
  unidade_gestora: { valor: 'DEGEP', sei: '9400001' },
  objeto: { valor: 'contratação de curso de capacitação em licitações, conforme condições estabelecidas neste Termo de Referência.', sei: '9400002' },
  itens: { valor: false },
  'contratada.razao_social': { valor: 'Empresa Exemplo Treinamentos Ltda.', sei: '9400003' },
  'contratada.cnpj': { valor: '00.000.000/0001-00', sei: '9400003' },
  valor_global: { valor: 'R$ 82.242,00', sei: '9400003' },
  'dispensa_eletronica.relatorio_sei': null,
};
const comCnpj = (cnpj: string) => JSON.stringify({ ...RESPOSTA_BOA, 'contratada.cnpj': { valor: cnpj, sei: '9400003' } });

function fluxoFalso(docs: DocFalso[], respostas: string[], o: { semCompletar?: boolean } = {}) {
  const base = contextoFalso(docs, { consentir: true });
  const chamadas: { sistema: string; pedido: string }[] = [];
  const escritas: { op: string; a: Record<string, unknown> }[] = [];
  const ctx = {
    ...base.ctx,
    async sei(op: string, a: Record<string, unknown>) {
      if (op === 'documento.criar') {
        escritas.push({ op, a });
        return { alvo: `Processo ${a.processo}`, mudancas: [{ campo: 'Tipo', antes: '', depois: String((a.novo as { tipo: string }).tipo) }], resumo: 'Novo documento', ...(a.aplicar ? { dados: { numero: '9999002' } } : {}) };
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

type Resultado = Awaited<ReturnType<typeof analisarModelo>> & { folha: string[]; faltando: { variavel: string }[]; avisos: string[]; chamadas: number; pacote: { caracteres: number; tokensEstimados: number } };
const analisar = async (f: ReturnType<typeof fluxoFalso>, modelo: string, extra: Record<string, unknown> = {}) =>
  (await analisarModelo({ processo: PROCESSO, modelo, ...extra }, f.ctx, HOJE)) as Resultado;
const tool = (nome: string) => TOOLS_MODELOS.find(t => t.nome === nome)!;
const arvore = (docs: DocFalso[]) => docs.filter(d => d.titulo && d.nivel !== 'sigiloso').map(d => ({ numero: d.numero, titulo: d.titulo! }));

export async function verificarModelosFluxo(): Promise<void> {
  await teste('modelos-fluxo: toda peça-fonte tem modelo no catálogo e os tipos extras saem do título', () => {
    const { FONTES } = { FONTES: Object.fromEntries(listarModelos().map(m => [m.id, selecionarFontes([], m.id)])) };
    assert.equal(Object.keys(FONTES).length, 20);
    for (const [id, r] of Object.entries(FONTES)) assert.ok(r.ausentes.length > 0, `${id} sem fontes`);
    assert.equal(tipoFonte('Mapa Comparativo de Preços - MCP'), 'mcp');
    assert.equal(tipoFonte('Proposta comercial Empresa B'), 'proposta');
    assert.equal(tipoFonte('Termo de Referência 12/2026'), 'tr');
    const s = selecionarFontes(arvore(INEXIGIBILIDADE), 'autorizacao-contratacao-direta');
    assert.deepEqual(s.fontes.map(f => f.numero), ['9400002', '9400001', '9400003']);
    assert.ok(s.ausentes.includes('relatorio_dispensa'));
  });

  await teste('modelos-fluxo: pré-preenchimento sem IA — processo, regime, nº SEI pela árvore, condições pelos títulos, ordinal, contas', () => {
    const f = formulario('autorizacao-contratacao-direta').variaveis;
    const p = prePreencher({ form: f, requer: { regime: '14133' }, protocolo: PROCESSO, docs: arvore(INEXIGIBILIDADE), hoje: HOJE });
    assert.deepEqual(p.dados.processo, { valor: PROCESSO, nota: 'pela árvore' });
    assert.deepEqual(p.dados.regime, { valor: '14133', nota: 'pelo modelo escolhido' });
    assert.equal((p.dados.tr as { sei: { valor: string } }).sei.valor, '9400002');
    assert.equal((p.dados.inexigibilidade as { valor: boolean }).valor, true);
    assert.equal((p.dados.dispensa_eletronica as { valor: boolean }).valor, false);
    const pedidas = variaveisAPedir(f, p.dados).map(v => v.nome);
    for (const n of ['processo', 'tr.sei', 'inexigibilidade', 'dispensa_eletronica', 'valor_global_extenso', 'autoridade.cargo']) assert.ok(!pedidas.includes(n), n);
    assert.ok(pedidas.includes('objeto') && pedidas.includes('autoridade.nome'));

    const fa = formulario('termo-aditivo-prorrogacao').variaveis;
    const docs = [{ numero: '1', titulo: 'Contrato 10/2025' }, { numero: '2', titulo: 'Termo Aditivo 1' }, { numero: '3', titulo: 'Termo Aditivo 2' }, { numero: '4', titulo: 'Minuta de Termo Aditivo' }];
    const pa = prePreencher({ form: fa, requer: { regime: '14133' }, protocolo: PROCESSO, docs, hoje: HOJE });
    assert.equal((pa.dados.aditivo as { ordinal: { valor: string } }).ordinal.valor, 'TERCEIRO');
    assert.ok(variaveisAPedir(fa, pa.dados).some(v => v.nome === 'vigencia_atual.fim'), 'a conta do período pede o fim da vigência');
    const d = mesclar(pa.dados, { 'vigencia_atual.fim': '11/10/2026', 'prorrogacao.prazo': '12 (doze) meses', valor_global: '37.185,00' });
    assert.deepEqual(derivar(d, fa), []);
    assert.equal((d.prorrogacao as { inicio: { valor: string } }).inicio.valor, '12/10/2026');
    assert.equal((d.prorrogacao as { fim: { valor: string } }).fim.valor, '11/10/2027');
    assert.equal((d.valor_global_extenso as { valor: string }).valor, extenso(brl('37.185,00')));
  });

  await teste('modelos-fluxo: conferirResposta — valor fora do documento citado é recusado; SEI fora da árvore; tipo; null', () => {
    const pedidas = formulario('autorizacao-contratacao-direta').variaveis.filter(v => ['contratada.cnpj', 'valor_global', 'inexigibilidade', 'objeto', 'contratacao.numero'].includes(v.nome));
    const textos = new Map(INEXIGIBILIDADE.filter(d => d.texto).map(d => [d.numero, d.texto!]));
    const c = conferirResposta({
      'contratada.cnpj': { valor: '11.111.111/0001-11', sei: '9400003' },
      valor_global: { valor: '82.242,00', sei: '9999999' },
      inexigibilidade: { valor: 'sim' },
      objeto: { valor: 'contratação de curso de capacitação em licitações', sei: '9400002' },
      'contratacao.numero': null,
    }, pedidas, { arvore: new Set(textos.keys()), textos });
    assert.deepEqual(Object.keys(c.aceitos), ['objeto']);
    assert.deepEqual(c.nulos, ['contratacao.numero']);
    assert.deepEqual(c.errados.sort(), ['contratada.cnpj', 'inexigibilidade', 'valor_global']);
    assert.match(c.erros.join('\n'), /não está escrito no SEI 9400003/);
    assert.match(c.erros.join('\n'), /SEI 9999999 não existe/);
  });

  await teste('modelos-fluxo: gelic_modelo_analisar — 1 chamada com JSON válido; null vira faltando; só as fontes lidas; sigiloso nunca; texto não volta', async () => {
    assert.equal(tool('gelic_modelo_analisar').efeito, 'leitura');
    const f = fluxoFalso(INEXIGIBILIDADE, [JSON.stringify(RESPOSTA_BOA)]);
    const r = await analisar(f, 'autorizacao-contratacao-direta');
    assert.equal(r.chamadas, 1);
    assert.equal(f.chamadas.length, 1);
    assert.deepEqual(r.faltando.map(x => x.variavel), ['contratacao.numero']);
    assert.equal(r.ok, false);
    assert.deepEqual([...f.lidos].sort(), ['9400001', '9400002', '9400003'], 'só as peças-fonte');
    const pedido = f.chamadas[0].pedido;
    assert.ok(!/\nprocesso \|/.test(pedido) && !/\ntr\.sei \|/.test(pedido), 'o que a árvore deu não é pedido');
    assert.match(pedido, /autoridade\.nome \| valor \| regra .*escolha uma/);
    assert.ok(pedido.includes(SEGREDO) || pedido.includes('Cláusula'), 'o TR vai recortado ao modelo');
    const saida = JSON.stringify(r);
    assert.ok(!saida.includes(SEGREDO) && !saida.includes('Cláusula 1') && !saida.includes('n0nce'), 'nenhum texto de documento volta à conversa');
    assert.ok(r.folha.some(l => l.startsWith(`valor_global_extenso = ${extenso(brl('82.242,00'))}`)));
    assert.ok(r.folha.some(l => l.startsWith(`autoridade.cargo = ${VP.cargo}`)));
    assert.ok(r.folha.some(l => /^tr\.sei = 9400002 \[autos, SEI 9400002, pela árvore/.test(l)));
    assert.ok(r.pacote.tokensEstimados > 0 && r.pacote.caracteres < 50_000);
  });

  await teste('modelos-fluxo: JSON inválido → 2 chamadas, nunca mais; o valor ainda errado vira faltando com aviso', async () => {
    const f = fluxoFalso(INEXIGIBILIDADE, [comCnpj('11.111.111/0001-11'), JSON.stringify(RESPOSTA_BOA)]);
    const r = await analisar(f, 'autorizacao-contratacao-direta');
    assert.equal(r.chamadas, 2);
    assert.match(f.chamadas[1].pedido, /contratada\.cnpj: "11\.111\.111\/0001-11" não está escrito no SEI 9400003/);
    assert.deepEqual(r.faltando.map(x => x.variavel), ['contratacao.numero']);

    const f2 = fluxoFalso(INEXIGIBILIDADE, ['sem json', comCnpj('22.222.222/0001-22'), '{}']);
    const r2 = await analisar(f2, 'autorizacao-contratacao-direta');
    assert.equal(r2.chamadas, MAX_CHAMADAS_MODELO);
    assert.equal(f2.chamadas.length, 2, 'nunca mais de duas chamadas');
    assert.ok(r2.faltando.some(x => x.variavel === 'contratada.cnpj'));
    assert.ok(r2.avisos.some(a => /Recusado pelo código: contratada\.cnpj/.test(a)));
  });

  await teste('modelos-fluxo: nada faltando → 0 chamadas e nenhum documento lido', async () => {
    const docs: DocFalso[] = [{ numero: '9500001', titulo: 'Contrato 10/2025', assinado: true, texto: 'Contrato.' }, { numero: '9500002', titulo: 'Formulário de prorrogação contratual', texto: 'x' }];
    const f = fluxoFalso(docs, [], { semCompletar: true });
    const r = await analisar(f, 'despacho-gecont-reserva', {
      dados: { objeto: 'prestação de serviços de limpeza.', valor: '1.000,00', natureza: 'prorrogação', natureza_valor: 'a prorrogação', 'contrato.numero': '10/2025' },
    });
    assert.equal(r.chamadas, 0);
    assert.deepEqual(f.lidos, []);
    assert.equal(r.ok, true, JSON.stringify(r));
    assert.ok(r.folha.some(l => l.startsWith('contrato.sei = 9500001')));
    assert.ok(r.folha.some(l => l.startsWith('valor_extenso = mil reais')));
  });

  await teste('modelos-fluxo: gelic_documento_gravar — da análise guardada + valores do usuário; grava exatamente paraHtmlSei(preencher(...))', async () => {
    const f = fluxoFalso(INEXIGIBILIDADE, [JSON.stringify(RESPOSTA_BOA)]);
    await analisar(f, 'autorizacao-contratacao-direta');
    const g = tool('gelic_documento_gravar');
    const base = { processo: PROCESSO, modelo: 'autorizacao-contratacao-direta', tipo: 'Autorização de Contratação Direta - Inex - NLL' };
    const semValor = await g.previsualizar!(base, f.ctx);
    assert.match(String(semValor[0].erro), /contratacao\.numero/);
    assert.deepEqual(await g.executar(base, f.ctx), { ok: false, erro: String(semValor[0].erro) });
    assert.equal(f.escritas.length, 0, 'nada criado sem o valor do usuário');
    const a = { ...base, dados: { 'contratacao.numero': '383500-27/2026' } };
    const previa = await g.previsualizar!(a, f.ctx);
    assert.equal(previa[0].erro, undefined);
    const r = await g.executar(a, f.ctx) as { ok: boolean; numero: string };
    assert.equal(r.ok, true);
    const guardada = ANALISES_MODELO.get(`${PROCESSO}\u0000autorizacao-contratacao-direta`)!;
    const esperado = paraHtmlSei(preencher(base.modelo, mesclar(guardada.dados, a.dados)).blocos);
    const editar = f.escritas.find(e => e.op === 'documento.editar')!;
    assert.equal(editar.a.html, esperado);
    assert.match(String(editar.a.html), /383500-27\/2026/);
    assert.ok(String(editar.a.html).includes(extenso(brl('82.242,00'))));
    assert.equal(f.chamadas.length, 1, 'gravar não chama o modelo');
  });

  await teste('modelos-fluxo: termo aditivo de prorrogação — ordinal pela árvore e período pela conta, com 1 chamada', async () => {
    const pedidasNomes = variaveisAPedir(formulario('termo-aditivo-prorrogacao').variaveis, {}).map(v => v.nome);
    const resposta = Object.fromEntries(pedidasNomes.map(n => [n, null]));
    Object.assign(resposta, {
      'contrato.numero': { valor: '68/2025', sei: '9200003' },
      'vigencia_atual.fim': { valor: '30/10/2026', sei: '9200003' },
      'prorrogacao.prazo': { valor: '12 meses', sei: '9200004' },
    });
    const docs = PRORROGACAO.map(d => (d.numero === '9200004' ? { ...d, texto: 'Prorrogação por 12 meses, de 31/10/2026 a 30/10/2027.' } : d));
    const f = fluxoFalso(docs, [JSON.stringify(resposta)]);
    const r = await analisar(f, 'termo-aditivo-prorrogacao');
    assert.equal(r.chamadas, 1);
    assert.ok(!f.lidos.includes('9200010'), 'sigiloso nunca é lido');
    assert.ok(r.folha.some(l => l.startsWith('aditivo.ordinal = PRIMEIRO')), r.folha.join('\n'));
    assert.ok(r.folha.some(l => l.startsWith('prorrogacao.inicio = 31/10/2026')));
    assert.ok(r.folha.some(l => l.startsWith('prorrogacao.fim = 30/10/2027')));
    assert.ok(r.faltando.length > 0, 'os nulos usados viram faltando');
  });
}
