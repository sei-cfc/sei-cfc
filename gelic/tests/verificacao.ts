/**
 * Verificação prévia da UO (src/verificacao/): estado, nova rodada, justificativa, documento e janela. Sem rede e
 * sem chrome.*.
 *
 *   npx tsx -e "import('./tests/verificacao.ts').then(m=>m.verificarVerificacao())"
 */
import assert from 'node:assert/strict';
import { prepararDvi, type PacoteDvi } from '../src/dvi/preparar/index';
import type { Achados } from '../src/dvi/montar/index';
import {
  aReexaminar, chaveVerificacao, documentosDoPacote, fechado, guardarVerificacao, juntarRodada, justificar, lerVerificacao,
  pendentes, situacaoDe,
} from '../src/verificacao/estado';
import type { Verificacao } from '../src/verificacao/estado';
import * as estadoMod from '../src/verificacao/estado';
import type { DepsVerificacao } from '../src/verificacao/pagina';
import { contextoFalso, HOJE, PREPARATORIA, type DocFalso } from './dvi-preparar';
import { areaFalsa } from './peca';
import { teste } from './util';

export const PROCESSO = '12345670000048.000007/2026-13';
export const AGORA = new Date('2026-10-12T10:00:00-03:00');
export const pacoteDe = (docs: DocFalso[]) => prepararDvi(PROCESSO, contextoFalso(docs, { consentir: true }).ctx, { hoje: HOJE });

/** Achados da IA: todo item atende no DFD, menos T04 (não atende no ETP, com achado). `so`: só estes ids. */
export function achadosDaIa(p: PacoteDvi, so?: readonly string[]): Achados {
  const ids = p.checklist.map(i => i.id).filter(id => !so || so.includes(id));
  const status: NonNullable<Achados['checklist_status']> = Object.fromEntries(ids.map(id => [id, { status: 'atende' as const, sei: '9300001' }]));
  const comT04 = ids.includes('T04');
  if (comT04) status.T04 = { status: 'nao_atende', sei: '9300002' };
  return {
    processo: p.processo, objeto: 'contratação de serviços de manutenção predial.', verificacao_legal: false,
    blocos: comT04 ? [{ documento: 'Estudo Técnico Preliminar 30/2026', sei: '9300002', achados: [{
      item: 'Estimativa do valor', constatacao: 'O ETP não traz a memória de cálculo da estimativa.',
      recomendacao: 'Incluir a memória de cálculo, coerente com o MCP (SEI 9300006).', checklist: 'T04',
    }] }] : [],
    checklist_status: status,
  };
}

export async function verificarVerificacao(): Promise<void> {
  const p = await pacoteDe(PREPARATORIA);
  const todos = p.checklist.map(i => i.id);

  await teste('verificação: primeira rodada reexamina todo item do checklist da família', () => {
    assert.deepEqual(aReexaminar(null, p), todos);
  });
  await teste('verificação: juntarRodada guarda status, SEI e achados por item, e os documentos conferidos com marca', () => {
    const v = juntarRodada(null, p, achadosDaIa(p), todos, AGORA);
    assert.equal(v.versao, 1);
    assert.equal(v.processo, PROCESSO);
    assert.equal(v.rodadas, 1);
    assert.equal(v.itens.length, p.checklist.length);
    const t04 = v.itens.find(i => i.id === 'T04')!;
    assert.equal(t04.status, 'nao_atende');
    assert.equal(t04.achados[0].sei, '9300002');
    assert.match(t04.achados[0].achado.recomendacao, /memória de cálculo/);
    assert.ok(v.documentos.some(d => d.numero === '9300002' && d.marca.length > 0));
    assert.deepEqual(pendentes(v).map(i => i.id), ['T04']);
    assert.equal(fechado(v), false);
  });
  await teste('verificação: item sem status da IA vira nao_verificado (pendente)', () => {
    const a = achadosDaIa(p);
    delete a.checklist_status!.A01;
    const v = juntarRodada(null, p, a, todos, AGORA);
    assert.equal(v.itens.find(i => i.id === 'A01')!.status, 'nao_verificado');
    assert.ok(pendentes(v).some(i => i.id === 'A01'));
  });
  await teste('verificação: justificar fecha o item pendente; recusa vazio e item que já atende', () => {
    const v = juntarRodada(null, p, achadosDaIa(p), todos, AGORA);
    assert.throws(() => justificar(v, 'T04', '   '), /Escreva a justificativa/);
    assert.throws(() => justificar(v, 'A01', 'qualquer coisa'), /não está pendente/);
    const j = justificar(v, 'T04', 'Memória de cálculo no MCP, SEI 9300006.');
    assert.equal(situacaoDe(j.itens.find(i => i.id === 'T04')!), 'justificado');
    assert.equal(fechado(j), true);
    assert.equal(v.itens.find(i => i.id === 'T04')!.justificativa, undefined, 'não altera o original');
  });
  await teste('verificação: nova rodada sem mudança nos autos não reexamina nada resolvido (atende e justificado)', () => {
    const v = justificar(juntarRodada(null, p, achadosDaIa(p), todos, AGORA), 'T04', 'Justificado pela unidade.');
    assert.deepEqual(aReexaminar(v, p), []);
  });
  await teste('verificação: nova rodada reexamina o pendente e o item cujo documento de origem mudou', async () => {
    const v = juntarRodada(null, p, achadosDaIa(p), todos, AGORA);
    assert.deepEqual(aReexaminar(v, p), ['T04'], 'só o pendente');
    const outroDfd = PREPARATORIA.map(d => (d.numero === '9300001' ? { ...d, texto: `${d.texto}\nAcréscimo.` } : d));
    const p2 = await pacoteDe(outroDfd);
    const re = aReexaminar(v, p2);
    assert.ok(re.includes('T04'));
    assert.ok(re.includes('A01'), 'atende no DFD, e o DFD mudou');
  });
  await teste('verificação: nao_se_aplica só volta quando entra documento novo', async () => {
    const a = achadosDaIa(p);
    a.checklist_status!.M01 = { status: 'nao_se_aplica', nota: 'não é pregão' };
    const v = juntarRodada(null, p, a, todos, AGORA);
    assert.ok(!aReexaminar(v, p).includes('M01'));
    const p2 = await pacoteDe([...PREPARATORIA, { numero: '9300011', titulo: 'Despacho complementar', assinado: true, texto: 'Complemento.' }]);
    assert.ok(aReexaminar(v, p2).includes('M01'));
  });
  await teste('verificação: item justificado reexaminado e ainda pendente guarda a justificativa como anterior e volta a pendente', async () => {
    const v = justificar(juntarRodada(null, p, achadosDaIa(p), todos, AGORA), 'T04', 'Primeira justificativa.');
    const outroEtp = PREPARATORIA.map(d => (d.numero === '9300002' ? { ...d, texto: `${d.texto}\nRevisão.` } : d));
    const p2 = await pacoteDe(outroEtp);
    const re = aReexaminar(v, p2);
    assert.ok(re.includes('T04'));
    const v2 = juntarRodada(v, p2, achadosDaIa(p2, re), re, AGORA);
    const t04 = v2.itens.find(i => i.id === 'T04')!;
    assert.equal(t04.justificativa, undefined);
    assert.equal(t04.justificativaAnterior, 'Primeira justificativa.');
    assert.equal(situacaoDe(t04), 'nao_atende');
    assert.equal(v2.rodadas, 2);
    assert.equal(v2.itens.find(i => i.id === 'A02')!.status, v.itens.find(i => i.id === 'A02')!.status, 'o não reexaminado fica como estava');
  });
  await teste('verificação: storage — guarda e lê por processo; vazio, corrompido ou de outro processo dá null', async () => {
    const area = areaFalsa();
    assert.equal(await lerVerificacao(area, PROCESSO), null);
    const v = juntarRodada(null, p, achadosDaIa(p), todos, AGORA);
    await guardarVerificacao(area, v);
    assert.equal((await lerVerificacao(area, PROCESSO))?.rodadas, 1);
    assert.equal(chaveVerificacao(PROCESSO), `gelic_verificacao:${PROCESSO}`);
    area.m.set(chaveVerificacao(PROCESSO), { versao: 1, processo: 'outro', itens: [], documentos: [] });
    assert.equal(await lerVerificacao(area, PROCESSO), null);
    area.m.set(chaveVerificacao(PROCESSO), 'lixo');
    assert.equal(await lerVerificacao(area, PROCESSO), null);
    assert.equal(await lerVerificacao(null, PROCESSO), null);
    const quebrada = { ...areaFalsa(), get: async () => { throw new Error('storage fora'); } };
    assert.equal(await lerVerificacao(quebrada, PROCESSO), null);
  });
  await teste('verificação: documentosDoPacote — lidos e não lidos, sem sigiloso nem cancelado; marca muda com o texto', async () => {
    const docs = documentosDoPacote(p);
    assert.ok(docs.some(d => d.numero === '9300009'), 'o relatório (talvez não lido) entra');
    const p2 = await pacoteDe(PREPARATORIA.map(d => (d.numero === '9300001' ? { ...d, texto: `${d.texto} x` } : d)));
    const marca = (q: PacoteDvi) => documentosDoPacote(q).find(d => d.numero === '9300001')!.marca;
    assert.notEqual(marca(p), marca(p2));
  });
  await teste('verificação: pedido previa — mesmo sistema do DVI, alvo da unidade, só os itens do recorte', async () => {
    const { requisicaoDvi, SISTEMA_DVI } = await import('../src/dvi/prompt');
    const recorte = { ...p, checklist: p.checklist.filter(i => i.id === 'T04') };
    const r = requisicaoDvi(recorte, 'previa');
    assert.equal(r.sistema, SISTEMA_DVI);
    assert.match(r.pedido, /Pedido: verificação prévia da unidade, antes do envio à Gelic: dê status só aos itens do checklist listados/);
    assert.match(r.pedido, /\nT04 /);
    assert.doesNotMatch(r.pedido, /\nA01 /);
  });

  // ---------------------------------------------------------------- rodada
  const { rodarVerificacao } = await import('../src/verificacao/rodada');
  const comIa = (docs: DocFalso[], respostas: string[]) => {
    const base = contextoFalso(docs, { consentir: true });
    const chamadas: string[] = [];
    const ctx = { ...base.ctx, async completar(_s: string, pedido: string) { chamadas.push(pedido); const r = respostas.shift(); if (r === undefined) throw new Error('chamada a mais ao modelo'); return r; } };
    return { ctx: ctx as never, chamadas };
  };
  const deps = (area = areaFalsa()) => ({ area, agora: () => AGORA, hoje: HOJE });

  await teste('verificação sem IA: o id do item ignora a posição na árvore e a contagem de dias (o fato é o mesmo)', () => {
    const { idDaChecagem } = estadoMod;
    const g = 'Validades e vigências';
    assert.equal(idDaChecagem(g, '[7] Certidão FGTS (SEI 9300020): válida até 10/10/2026 — VENCIDA há 3 dia(s)'), idDaChecagem(g, '[6] Certidão FGTS (SEI 9300020): válida até 10/10/2026 — VENCIDA há 4 dia(s)'));
    assert.notEqual(idDaChecagem(g, '[7] Certidão FGTS (SEI 9300020): VENCIDA há 3 dia(s)'), idDaChecagem(g, '[7] Certidão FGTS (SEI 9300021): VENCIDA há 3 dia(s)'), 'outro documento, outro item');
    assert.notEqual(idDaChecagem(g, 'Certidão (SEI 9300020): VENCIDA há 3 dia(s)'), idDaChecagem(g, 'Certidão (SEI 9300020): vigente por 3 dia(s)'), 'situação diferente, outro fato');
  });
  await teste('verificação sem IA: justificativa sobrevive ao documento que muda de posição; texto que muda vira justificativa anterior no item do mesmo documento', () => {
    const v1 = estadoMod.rodadaDePresenca(null, p, AGORA);
    const alvo = v1.itens.find(i => /Proposta comercial Empresa A/.test(i.texto))!;
    assert.equal(alvo.sei, '9300004', 'o nº SEI do item vem do texto da checagem');
    const v1j = justificar(v1, alvo.id, 'Proposta de fornecedor.');
    const deslocado = { ...p, checagens: p.checagens.map(c => ({ ...c, texto: c.texto.replace('[4] Proposta comercial Empresa A', '[3] Proposta comercial Empresa A') })) };
    const v2 = estadoMod.rodadaDePresenca(v1j, deslocado, AGORA);
    assert.equal(situacaoDe(v2.itens.find(i => /Proposta comercial Empresa A/.test(i.texto))!), 'justificado');
    const reescrito = { ...p, checagens: p.checagens.map(c => ({ ...c, texto: c.texto.replace('sem assinatura eletrônica', 'sem assinatura eletrônica válida') })) };
    const v3 = estadoMod.rodadaDePresenca(v1j, reescrito, AGORA);
    const novo = v3.itens.find(i => /Proposta comercial Empresa A/.test(i.texto))!;
    assert.equal(situacaoDe(novo), 'nao_verificado');
    assert.equal(novo.justificativaAnterior, 'Proposta de fornecedor.', 'a caixa já vem com o texto da unidade');
  });
  await teste('verificação: com IA pedida e sem chave (ctx sem completar), erro claro e nada guardado', async () => {
    const area = areaFalsa();
    const r = await rodarVerificacao(PROCESSO, contextoFalso(PREPARATORIA, { consentir: true }).ctx as never, deps(area), 'ia');
    assert.equal(r.tipo, 'erro');
    if (r.tipo === 'erro') assert.match(r.erro, /Configure a IA/);
    assert.equal(area.m.size, 0);
  });
  await teste('verificação sem IA: presença dos requisitos — itens das checagens por grupo, nenhuma chamada ao modelo (nem com chave), guardada à parte', async () => {
    const area = areaFalsa();
    const f = comIa(PREPARATORIA, []);
    const r = await rodarVerificacao(PROCESSO, f.ctx, deps(area), 'presenca');
    assert.equal(r.tipo, 'completa', JSON.stringify(r));
    if (r.tipo !== 'completa') return;
    assert.equal(f.chamadas.length, 0);
    assert.equal(r.chamadas, 0);
    const v = r.verificacao;
    assert.equal(v.modo, 'presenca');
    const dfd = v.itens.find(i => i.grupo === 'Peças da etapa (presença nos autos)' && /^DFD:/.test(i.texto))!;
    assert.equal(dfd.status, 'atende');
    const proposta = v.itens.find(i => i.grupo === 'Assinaturas' && /Proposta comercial Empresa A/.test(i.texto))!;
    assert.equal(proposta.status, 'nao_verificado', 'a conferir = pendente até a unidade justificar');
    assert.ok(!v.itens.some(i => i.grupo === 'Não examinados pelo código'), 'os não lidos vão na seção própria do documento');
    assert.ok(v.itens.every(i => /^R[0-9a-f]{8}$/.test(i.id)));
    assert.equal((await lerVerificacao(area, PROCESSO, 'presenca'))?.modo, 'presenca');
    assert.equal(await lerVerificacao(area, PROCESSO, 'ia'), null, 'não mistura com a verificação com IA');
    assert.equal(chaveVerificacao(PROCESSO, 'presenca'), `gelic_verificacao_presenca:${PROCESSO}`);
  });
  await teste('verificação sem IA: a justificativa fica enquanto o fato é o mesmo; some quando o fato muda', async () => {
    const area = areaFalsa();
    const r = await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, []).ctx, deps(area), 'presenca');
    if (r.tipo !== 'completa') throw new Error(JSON.stringify(r));
    const alvo = r.verificacao.itens.find(i => /Proposta comercial Empresa A/.test(i.texto))!;
    await guardarVerificacao(area, justificar(r.verificacao, alvo.id, 'Proposta de fornecedor, sem assinatura eletrônica.'));
    const r2 = await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, []).ctx, deps(area), 'presenca');
    if (r2.tipo !== 'completa') throw new Error(JSON.stringify(r2));
    assert.equal(situacaoDe(r2.verificacao.itens.find(i => i.id === alvo.id)!), 'justificado');
    assert.equal(r2.verificacao.rodadas, 2);
    const assinada = PREPARATORIA.map(d => (d.numero === '9300004' ? { ...d, assinado: true } : d));
    const r3 = await rodarVerificacao(PROCESSO, comIa(assinada, []).ctx, deps(area), 'presenca');
    if (r3.tipo !== 'completa') throw new Error(JSON.stringify(r3));
    assert.ok(!r3.verificacao.itens.some(i => i.id === alvo.id), 'o fato sumiu: o item e a justificativa saem');
  });
  await teste('verificação: com IA, uma chamada, resultado guardado; nova rodada sem mudança não chama a IA', async () => {
    const area = areaFalsa();
    const f = comIa(PREPARATORIA, [JSON.stringify(achadosDaIa(p))]);
    const r = await rodarVerificacao(PROCESSO, f.ctx, deps(area), 'ia');
    assert.equal(r.tipo, 'completa', JSON.stringify(r));
    if (r.tipo !== 'completa') return;
    assert.equal(r.chamadas, 1);
    assert.match(f.chamadas[0], /Pedido: verificação prévia da unidade/);
    assert.deepEqual(r.verificacao.itens.filter(i => i.status === 'nao_atende').map(i => i.id), ['T04']);
    const salvo = await lerVerificacao(area, PROCESSO);
    assert.equal(salvo?.rodadas, 1);
    await guardarVerificacao(area, justificar(salvo!, 'T04', 'Justificado.'));
    const g = comIa(PREPARATORIA, []);
    const r2 = await rodarVerificacao(PROCESSO, g.ctx, deps(area), 'ia');
    assert.equal(r2.tipo, 'completa');
    if (r2.tipo === 'completa') { assert.equal(r2.chamadas, 0); assert.equal(r2.reexaminados, 0); assert.equal(fechado(r2.verificacao), true); }
  });
  await teste('verificação: nova rodada manda à IA só o recorte e mantém o resto (inclusive o achado do justificado)', async () => {
    const area = areaFalsa();
    await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, [JSON.stringify(achadosDaIa(p))]).ctx, deps(area), 'ia');
    await guardarVerificacao(area, justificar((await lerVerificacao(area, PROCESSO))!, 'T04', 'Justificado.'));
    const outroDfd = PREPARATORIA.map(d => (d.numero === '9300001' ? { ...d, texto: `${d.texto}\nAcréscimo.` } : d));
    const p2 = await pacoteDe(outroDfd);
    const re = aReexaminar((await lerVerificacao(area, PROCESSO))!, p2);
    assert.ok(!re.includes('T04'), 'o justificado no ETP fica');
    const f = comIa(outroDfd, [JSON.stringify(achadosDaIa(p2, re))]);
    const r = await rodarVerificacao(PROCESSO, f.ctx, deps(area), 'ia');
    assert.equal(r.tipo, 'completa', JSON.stringify(r));
    if (r.tipo === 'completa') {
      assert.equal(r.reexaminados, re.length);
      assert.equal(situacaoDe(r.verificacao.itens.find(i => i.id === 'T04')!), 'justificado');
    }
    const listados = [...f.chamadas[0].matchAll(/^([A-Z]\d{2}) [IR] /gm)].map(m => m[1]);
    assert.deepEqual(listados, re);
  });
  await teste('verificação: JSON inválido → 1 correção; ainda inválido → erro, nada guardado; nunca mais de 2 chamadas', async () => {
    const area = areaFalsa();
    const f = comIa(PREPARATORIA, ['sem json', 'ainda sem json']);
    const r = await rodarVerificacao(PROCESSO, f.ctx, deps(area), 'ia');
    assert.equal(r.tipo, 'erro');
    assert.equal(f.chamadas.length, 2);
    assert.match(f.chamadas[1], /O validador recusou/);
    assert.equal(area.m.size, 0);
  });
  await teste('verificação: achado da IA citando item mantido como atende vai à correção', async () => {
    const area = areaFalsa();
    await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, [JSON.stringify(achadosDaIa(p))]).ctx, deps(area), 'ia');
    const ruim = achadosDaIa(p, ['T04']);
    ruim.blocos[0].achados.push({ item: '1', constatacao: 'x.', recomendacao: 'y.', checklist: 'A01' });
    const f = comIa(PREPARATORIA, [JSON.stringify(ruim), JSON.stringify(achadosDaIa(p, ['T04']))]);
    const r = await rodarVerificacao(PROCESSO, f.ctx, deps(area), 'ia');
    assert.equal(f.chamadas.length, 2, 'o A01 mantido como atende recusa o achado');
    assert.equal(r.tipo, 'completa');
  });
  await teste('verificação: processo sigiloso não é lido', async () => {
    await assert.rejects(rodarVerificacao(PROCESSO, contextoFalso(PREPARATORIA, { sigiloso: true }).ctx as never, deps(), 'presenca'), /sigiloso/);
  });

  // ---------------------------------------------------------------- documento e gravação
  const docMod = await import('../src/verificacao/documento');
  const { gravarChecklist, previaChecklist } = await import('../src/verificacao/rodada');
  const fechada = () => justificar(juntarRodada(null, p, achadosDaIa(p), todos, AGORA), 'T04', 'Memória no MCP, SEI 9300006.');
  const ponteQueGrava = (docs: DocFalso[]) => {
    const base = contextoFalso(docs, { consentir: true });
    const escritas: { op: string; a: Record<string, unknown> }[] = [];
    const ctx = { ...base.ctx, async sei(op: string, a: Record<string, unknown>) {
      if (op === 'documento.criar') { escritas.push({ op, a }); return { alvo: '', mudancas: [], resumo: 'Novo', ...(a.aplicar ? { dados: { numero: '9999001' } } : {}) }; }
      if (op === 'documento.editar') { escritas.push({ op, a }); return { alvo: '', mudancas: [], resumo: 'Corpo' }; }
      return base.ctx.sei(op, a);
    } };
    return { ctx: ctx as never, escritas };
  };
  await teste('verificação: tipo sugerido — o do checklist de conformidade (grafias), senão Despacho; nunca a Lista de Verificação da AGU nem um Checklist genérico', () => {
    assert.equal(docMod.tipoSugerido(['Despacho', 'Check-list de Conformidade', 'Ofício']), 'Check-list de Conformidade');
    assert.equal(docMod.tipoSugerido(['Despacho', 'Check list de conformidade']), 'Check list de conformidade');
    assert.equal(docMod.tipoSugerido(['Despacho', 'Lista de Verificação']), 'Despacho');
    assert.equal(docMod.tipoSugerido(['Despacho', 'Checklist']), 'Despacho');
    assert.equal(docMod.tipoSugerido(['Despacho', 'Ofício']), 'Despacho', 'a árvore mostra "Despacho de Conformidade"');
    assert.equal(docMod.tipoSugerido(['Ofício']), '');
    assert.equal(docMod.tipoEhChecklist('Lista de Verificação'), false);
    assert.equal(docMod.tipoEhChecklist('Checklist de Conformidade'), true);
  });
  await teste('verificação: documento — título, cabeçalho, tabela de itens com situação e justificativa, documentos conferidos, nota fixa; sem texto da IA', () => {
    const b = docMod.blocosDoChecklist(fechada(), { unidade: 'GEX-LIC', data: '12/10/2026' });
    const texto = JSON.stringify(b);
    assert.deepEqual(b[0], { tipo: 'titulo', texto: 'CHECKLIST DE CONFORMIDADE' });
    assert.ok(texto.includes(`Processo: ${PROCESSO}`));
    assert.match(texto, /Unidade: GEX-LIC/);
    const itens = b.find(x => x.tipo === 'tabela')!;
    assert.ok(itens.tipo === 'tabela' && itens.cabecalho);
    if (itens.tipo === 'tabela') {
      assert.deepEqual(itens.linhas[0], ['Item', 'Situação', 'Onde foi conferido', 'Justificativa da unidade']);
      const t04 = itens.linhas.find(l => l[0].startsWith('T04'))!;
      assert.deepEqual(t04.slice(1), ['Justificado', 'SEI 9300002', 'Memória no MCP, SEI 9300006.']);
      assert.equal(itens.linhas.length, p.checklist.length + 1);
    }
    assert.match(texto, /DOCUMENTOS CONFERIDOS/);
    assert.match(texto, /9300006/);
    assert.ok(texto.includes(docMod.NOTAS.ia));
    assert.match(texto, /com IA/);
    assert.doesNotMatch(texto, /não traz a memória|Incluir a memória/i, 'a constatação e a recomendação da IA ficam só na tela');
  });
  await teste('verificação sem IA: o documento diz que não usou IA e que só confere a presença, sem juízo sobre o conteúdo', async () => {
    const r = await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, []).ctx, deps(), 'presenca');
    if (r.tipo !== 'completa') throw new Error(JSON.stringify(r));
    const texto = JSON.stringify(docMod.blocosDoChecklist(r.verificacao, { data: '12/10/2026' }));
    assert.ok(texto.includes(docMod.NOTAS.presenca));
    assert.match(docMod.NOTAS.presenca, /sem uso de IA/);
    assert.match(docMod.NOTAS.presenca, /sem juízo sobre o conteúdo/);
    assert.match(texto, /REQUISITOS CONFERIDOS/);
    assert.match(texto, /Assinaturas: \[4\] Proposta comercial Empresa A/, 'o grupo no lugar do id');
    assert.doesNotMatch(texto, /R[0-9a-f]{8}/, 'o id interno não aparece');
  });
  await teste('verificação sem IA: gravar lê a verificação sem IA (não a com IA)', async () => {
    const area = areaFalsa();
    const r = await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, []).ctx, deps(area), 'presenca');
    if (r.tipo !== 'completa') throw new Error(JSON.stringify(r));
    let v = r.verificacao;
    for (const i of pendentes(v)) v = justificar(v, i.id, 'Conferido pela unidade.');
    await guardarVerificacao(area, v);
    const f = ponteQueGrava(PREPARATORIA);
    assert.match((await gravarChecklist({ processo: PROCESSO, tipo: 'Despacho', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA })).erro!, /Rode a verificação/);
    const ok = await gravarChecklist({ processo: PROCESSO, tipo: 'Despacho', modo: 'presenca', ctx: f.ctx, area, agora: () => AGORA });
    assert.deepEqual(ok, { ok: true, numero: '9999001' });
    assert.match(String(f.escritas[1].a.html), /sem uso de IA/);
  });
  await teste('verificação: o html do checklist escapa a justificativa (vem do usuário)', () => {
    const v = justificar(juntarRodada(null, p, achadosDaIa(p), todos, AGORA), 'T04', '<script>x</script>');
    const html = previaChecklist(v, { agora: AGORA });
    assert.ok(!html.includes('<script>'));
    assert.ok(html.includes('&lt;script&gt;'));
    assert.match(html, /Data da verificação: 12\/10\/2026/);
  });
  await teste('verificação: o documento separa os lidos ("conferidos") dos que estão nos autos e não foram examinados, com o motivo', async () => {
    const docs = [...PREPARATORIA, { numero: '9300012', titulo: 'Parecer reservado', nivel: 'restrito', assinado: true, texto: 'Conteúdo restrito.' }];
    const q = await prepararDvi(PROCESSO, contextoFalso(docs, { consentir: false }).ctx, { hoje: HOJE });
    const naoLido = q.limites.documentosNaoLidos.find(n => n.numero === '9300012');
    assert.ok(naoLido, 'o restrito sem consentimento não é lido');
    const v = justificar(juntarRodada(null, q, achadosDaIa(q), q.checklist.map(i => i.id), AGORA), 'T04', 'J.');
    assert.equal(v.documentos.find(d => d.numero === '9300012')?.lido, false);
    assert.equal(v.documentos.find(d => d.numero === '9300001')?.lido, true);
    const b = docMod.blocosDoChecklist(v, { data: '12/10/2026' });
    const tabelas = b.filter(x => x.tipo === 'tabela') as Extract<typeof b[number], { tipo: 'tabela' }>[];
    const conferidos = tabelas[1].linhas.map(l => l[0]);
    assert.ok(!conferidos.includes('9300012'), 'não lido não aparece como conferido');
    assert.ok(conferidos.includes('9300001'));
    assert.ok(b.some(x => x.tipo === 'clausula' && /NÃO EXAMINADOS/.test(x.texto)));
    const fora = tabelas[2].linhas.find(l => l[0] === '9300012')!;
    assert.equal(fora[2], naoLido!.motivo);
    // tudo lido: sem a seção dos não examinados
    const tudo = docMod.blocosDoChecklist({ ...v, documentos: v.documentos.filter(d => d.lido) }, { data: '12/10/2026' });
    assert.ok(!tudo.some(x => x.tipo === 'clausula' && /NÃO EXAMINADOS/.test(x.texto)));
  });
  await teste('verificação: gravar — só com o checklist fechado; cria com nome na árvore e grava o corpo; não assina', async () => {
    const area = areaFalsa();
    await guardarVerificacao(area, juntarRodada(null, p, achadosDaIa(p), todos, AGORA));
    const f = ponteQueGrava(PREPARATORIA);
    const aberto = await gravarChecklist({ processo: PROCESSO, tipo: 'Despacho', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA });
    assert.equal(aberto.ok, false);
    assert.match(aberto.erro!, /1 item pendente/);
    assert.equal(f.escritas.length, 0);
    await guardarVerificacao(area, fechada());
    const r = await gravarChecklist({ processo: PROCESSO, tipo: 'Despacho', unidade: 'GEX-LIC', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA });
    assert.deepEqual(r, { ok: true, numero: '9999001' });
    assert.deepEqual(f.escritas.map(e => e.op), ['documento.criar', 'documento.editar']);
    assert.deepEqual(f.escritas[0].a.novo, { tipo: 'Despacho', nomeArvore: 'de Conformidade' }, 'a árvore mostra "Despacho de Conformidade"');
    assert.equal(f.escritas[0].a.aplicar, true);
    assert.equal(f.escritas[1].a.numero, '9999001');
    assert.match(String(f.escritas[1].a.html), /CHECKLIST DE CONFORMIDADE/);
    assert.match(String(f.escritas[1].a.html), /Unidade: GEX-LIC/);
  });
  await teste('verificação: gravar — tipo que já é o checklist vai sem nome na árvore; sem verificação guardada, erro claro', async () => {
    const area = areaFalsa();
    const f = ponteQueGrava(PREPARATORIA);
    assert.match((await gravarChecklist({ processo: PROCESSO, tipo: 'Checklist de Conformidade', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA })).erro!, /Rode a verificação/);
    await guardarVerificacao(area, fechada());
    await gravarChecklist({ processo: PROCESSO, tipo: 'Checklist de Conformidade', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA });
    assert.deepEqual(f.escritas[0].a.novo, { tipo: 'Checklist de Conformidade' });
  });
  await teste('verificação: gravar — documento que entrou depois da verificação recusa e pede nova rodada', async () => {
    const area = areaFalsa();
    await guardarVerificacao(area, fechada());
    const f = ponteQueGrava([...PREPARATORIA, { numero: '9300011', titulo: 'Ofício novo', assinado: true, texto: 'x' }]);
    const r = await gravarChecklist({ processo: PROCESSO, tipo: 'Despacho', modo: 'ia', ctx: f.ctx, area, agora: () => AGORA });
    assert.equal(r.ok, false);
    assert.match(r.erro!, /SEI 9300011.*verifique de novo/);
    assert.equal(f.escritas.length, 0);
  });

  // ---------------------------------------------------------------- janela
  const { parseHTML } = await import('linkedom');
  const { montarVerificacao } = await import('../src/verificacao/pagina');
  const janela = () => parseHTML('<html><body><main id="gelic-peca"></main></body></html>').document as unknown as Document;
  const vBase = juntarRodada(null, p, achadosDaIa(p), todos, AGORA);
  const rp = await rodarVerificacao(PROCESSO, comIa(PREPARATORIA, []).ctx, deps(), 'presenca');
  if (rp.tipo !== 'completa') throw new Error('presença');
  const vPresenca = rp.verificacao;
  const depsFalsas = (o: Partial<DepsVerificacao> = {}) => {
    let atual: Verificacao | null = null;
    const gravados: string[] = [];
    const rodados: string[] = [];
    const d: DepsVerificacao = {
      protocolo: PROCESSO, temIa: true, configurarIa: () => {},
      anterior: async () => atual,
      rodar: async modo => {
        rodados.push(modo);
        atual = modo === 'ia' ? vBase : vPresenca;
        return { tipo: 'completa', verificacao: atual, pendencias: 'Pendências de X', reexaminados: atual.itens.length, chamadas: modo === 'ia' ? 1 : 0 };
      },
      justificar: async (id, t) => (atual = justificar(atual!, id, t)),
      previa: async () => '<p>CHECKLIST</p>',
      tipos: async () => ['Despacho', 'Checklist de Conformidade'],
      gravar: async (tipo, modo) => { gravados.push(`${tipo}|${modo}`); return { ok: true, numero: '9999001' }; },
      ...o,
    };
    return { d, gravados, rodados };
  };
  const clicar = (doc: Document, sel: string) => doc.querySelector<HTMLButtonElement>(sel)!.click();
  const espera = async () => { for (let i = 0; i < 5; i++) await new Promise(r => setTimeout(r, 0)); };

  await teste('janela da verificação: verificar mostra só os pendentes com o que corrigir; gravar indisponível', async () => {
    const doc = janela();
    const { d } = depsFalsas();
    await montarVerificacao(doc, d);
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /Sem verificação ainda/);
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.disabled, true);
    clicar(doc, '[data-gelic-acao=verificar]');
    await espera();
    const itens = [...doc.querySelectorAll('[data-gelic-item]')].map(e => e.getAttribute('data-gelic-item'));
    assert.deepEqual(itens, ['T04']);
    const t04 = doc.querySelector('[data-gelic-item=T04]')!.textContent!;
    assert.match(t04, /O que corrigir: Incluir a memória de cálculo/);
    assert.match(t04, /SEI 9300002/);
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.disabled, true);
    assert.match(doc.querySelector('.gelic-resolvidos summary')!.textContent!, /\d+ itens atendem/);
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /1 item pendente/);
  });
  await teste('janela da verificação: justificar fecha o checklist e libera o gravar; o tipo vem sugerido; gravar mostra o nº', async () => {
    const doc = janela();
    const { d, gravados } = depsFalsas();
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=verificar]');
    await espera();
    const caixa = doc.querySelector<HTMLTextAreaElement>('[data-gelic-justificativa=T04]')!;
    caixa.value = 'Memória no MCP, SEI 9300006.';
    clicar(doc, '[data-gelic-justificar=T04]');
    await espera();
    assert.equal(doc.querySelector('[data-gelic-item=T04]')!.getAttribute('data-situacao'), 'justificado');
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /Checklist fechado/);
    const gravar = doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!;
    assert.equal(gravar.disabled, false);
    gravar.click();
    await espera();
    const sel = doc.querySelector<HTMLSelectElement>('[data-gelic-tipo]')!;
    assert.equal(sel.querySelector('option[selected]')?.getAttribute('value'), 'Checklist de Conformidade');
    clicar(doc, '[data-gelic-acao=confirmar]');
    await espera();
    assert.deepEqual(gravados, ['Checklist de Conformidade|ia']);
    assert.match(doc.querySelector('.gelic-status')!.textContent!, /SEI nº 9999001, não assinado/);
  });
  await teste('janela da verificação: sem chave — "Verificar sem IA" disponível, "com IA" escondido, Configurar a IA; a sem IA fecha e grava', async () => {
    const doc = janela();
    let configurou = 0;
    const { d, gravados, rodados } = depsFalsas({ temIa: false, configurarIa: () => { configurou++; } });
    await montarVerificacao(doc, d);
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=verificar]')!.hidden, true);
    assert.match(doc.querySelector('[data-gelic-acao=verificar-sem-ia]')!.textContent!, /Verificar sem IA/);
    clicar(doc, '[data-gelic-acao=ia]');
    assert.equal(configurou, 1);
    clicar(doc, '[data-gelic-acao=verificar-sem-ia]');
    await espera();
    assert.deepEqual(rodados, ['presenca']);
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /Sem IA: presença dos requisitos/);
    const pend = [...doc.querySelectorAll('[data-gelic-item]')];
    assert.ok(pend.length > 0);
    assert.match(pend[0].textContent!, /Assinaturas|Cronologia|Valores|Validades/);
    assert.match(pend[0].textContent!, /a conferir|não atende/);
    for (const id of pend.map(e => e.getAttribute('data-gelic-item')!)) {
      doc.querySelector<HTMLTextAreaElement>(`[data-gelic-justificativa="${id}"]`)!.value = 'Conferido.';
      clicar(doc, `[data-gelic-justificar="${id}"]`);
      await espera();
    }
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /fechado/);
    clicar(doc, '[data-gelic-acao=gravar]');
    await espera();
    clicar(doc, '[data-gelic-acao=confirmar]');
    await espera();
    assert.deepEqual(gravados, ['Checklist de Conformidade|presenca']);
  });
  await teste('janela da verificação: com chave, os dois botões; "Verificar com IA" roda a com IA', async () => {
    const doc = janela();
    const { d, rodados } = depsFalsas();
    await montarVerificacao(doc, d);
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=verificar]')!.hidden, false);
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=ia]')!.hidden, true);
    clicar(doc, '[data-gelic-acao=verificar]');
    await espera();
    assert.deepEqual(rodados, ['ia']);
    assert.match(doc.querySelector('.gelic-faixa')!.textContent!, /Com IA/);
  });
  await teste('janela da verificação: sem o tipo do checklist no SEI, a gravação avisa que vai como "Despacho de Conformidade"', async () => {
    const doc = janela();
    const { d } = depsFalsas({ anterior: async () => justificar(vBase, 'T04', 'J.'), tipos: async () => ['Despacho', 'Ofício'] });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=gravar]');
    await espera();
    assert.equal(doc.querySelector('[data-gelic-tipo] option[selected]')?.getAttribute('value'), 'Despacho');
    assert.match(doc.querySelector('.gelic-gravar')!.textContent!, /Despacho de Conformidade/);
  });
  await teste('janela da verificação: nova rodada fecha a caixa de gravar e a prévia (o Confirmar não grava o outro modo)', async () => {
    const doc = janela();
    const { d, gravados } = depsFalsas({ anterior: async () => justificar(vBase, 'T04', 'J.') });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=gravar]');
    await espera();
    clicar(doc, '[data-gelic-acao=previa]');
    await espera();
    assert.equal(doc.querySelector('.gelic-gravar')!.hasAttribute('hidden'), false);
    clicar(doc, '[data-gelic-acao=verificar-sem-ia]');
    await espera();
    assert.equal(doc.querySelector('.gelic-gravar')!.hasAttribute('hidden'), true);
    assert.equal(doc.querySelector('.gelic-previa-caixa')!.hasAttribute('hidden'), true);
    assert.deepEqual(gravados, []);
  });
  await teste('janela da verificação: sem IA, a mensagem de justificado não mostra o id interno; a caixa de gravar diz "sem IA"', async () => {
    const doc = janela();
    const { d } = depsFalsas({ temIa: false });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=verificar-sem-ia]');
    await espera();
    const id = doc.querySelector('[data-gelic-item]')!.getAttribute('data-gelic-item')!;
    doc.querySelector<HTMLTextAreaElement>(`[data-gelic-justificativa="${id}"]`)!.value = 'Conferido.';
    clicar(doc, `[data-gelic-justificar="${id}"]`);
    await espera();
    assert.doesNotMatch(doc.querySelector('.gelic-status')!.textContent!, /R[0-9a-f]{8}/);
    assert.doesNotMatch(doc.querySelector(`[data-gelic-justificativa="${id}"]`)!.getAttribute('aria-label')!, /R[0-9a-f]{8}/);
  });
  await teste('janela da verificação: sem Despacho nem o tipo do checklist, pede a escolha (não promete Despacho)', async () => {
    const doc = janela();
    const { d } = depsFalsas({ anterior: async () => justificar(vBase, 'T04', 'J.'), tipos: async () => ['Ofício', 'Memorando'] });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=gravar]');
    await espera();
    const t = doc.querySelector('.gelic-gravar')!.textContent!;
    assert.doesNotMatch(t, /vai como Despacho/);
    assert.match(t, /de Conformidade/);
    assert.match(t, /com IA/);
  });
  await teste('janela da verificação: reabre com o resultado guardado; justificativa anterior já na caixa, item ainda pendente', async () => {
    const doc = janela();
    const comAnterior: Verificacao = { ...vBase, itens: vBase.itens.map(i => (i.id === 'T04' ? { ...i, justificativaAnterior: 'Antes.' } : i)) };
    const { d } = depsFalsas({ anterior: async () => comAnterior });
    await montarVerificacao(doc, d);
    assert.equal(doc.querySelector<HTMLTextAreaElement>('[data-gelic-justificativa=T04]')!.value, 'Antes.');
    assert.equal(doc.querySelector('[data-gelic-item=T04]')!.getAttribute('data-situacao'), 'nao_atende');
    assert.equal(doc.querySelector<HTMLButtonElement>('[data-gelic-acao=gravar]')!.disabled, true);
  });
  await teste('janela da verificação: erro da rodada aparece no status como texto (nunca HTML)', async () => {
    const doc = janela();
    const { d } = depsFalsas({ rodar: async () => ({ tipo: 'erro', erro: 'A resposta da IA não passou <b>x</b>', erros: [], pendencias: '' }) });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=verificar]');
    await espera();
    const st = doc.querySelector('.gelic-status')!;
    assert.match(st.textContent!, /não passou <b>x<\/b>/);
    assert.equal(st.querySelector('b'), null);
  });
  await teste('janela da verificação: erro do gravar (documento novo) fica no status e não some a caixa', async () => {
    const doc = janela();
    const fechadaV = justificar(vBase, 'T04', 'J.');
    const { d } = depsFalsas({ anterior: async () => fechadaV, gravar: async () => ({ ok: false, erro: 'Entrou documento depois da verificação (SEI 1): verifique de novo antes de gravar.' }) });
    await montarVerificacao(doc, d);
    clicar(doc, '[data-gelic-acao=gravar]');
    await espera();
    clicar(doc, '[data-gelic-acao=confirmar]');
    await espera();
    assert.match(doc.querySelector('.gelic-status')!.textContent!, /Entrou documento depois/);
    assert.equal(doc.querySelector('.gelic-gravar')!.hasAttribute('hidden'), false);
  });
}
