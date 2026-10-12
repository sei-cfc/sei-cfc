import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { conteudos, SAIDAS } from '../gerar';
import { PROMPT_GELIC, SKILLS_GELIC, TOOLS_GELIC } from '../src/agente';
import { DOCUMENTOS, sugeridos } from '../src/documentos/catalogo';
import { ACOES } from '../src/pagina/acoes';
import { desenharSelo } from '../src/pagina/selo';
import { resumir } from '../src/regras/resumo';
import { CHAVE_PEDIDO, ouvirPedidosExternos, pedidoValido, VALIDADE_PEDIDO_MS } from '../../agente-ia/src/painel/pedido-externo';
import { teste } from './util';

const SLUGS = ['gelic-analisar-processo', 'gelic-checklist-contratual', 'gelic-checklist-preparatoria', 'gelic-documento-modelo', 'gelic-gerar-dvi', 'gelic-proxima-etapa', 'gelic-rito', 'gelic-verificar-pendencias'];

/** storage.session de mentira, com onChanged. */
function sessaoFalsa(inicial: Record<string, unknown> = {}) {
  const dados: Record<string, unknown> = { ...inicial };
  const ouvintes: ((m: Record<string, { newValue?: unknown }>) => void)[] = [];
  return {
    dados,
    get: async (k: string) => (k in dados ? { [k]: dados[k] } : {}),
    remove: async (k: string) => { delete dados[k]; },
    set(k: string, v: unknown) { dados[k] = v; for (const o of ouvintes) o({ [k]: { newValue: v } }); },
    onChanged: { addListener: (f: (m: Record<string, { newValue?: unknown }>) => void) => ouvintes.push(f) },
  };
}
const esperar = () => new Promise(r => setTimeout(r, 20));

export async function verificarAgente(): Promise<void> {
  await teste('gerados em dia com as fontes (etapas.json, fatos-etapa.json, skills-gelic/*.md)', () => {
    const c = conteudos();
    assert.equal(readFileSync(new URL(`../${SAIDAS.dados}`, import.meta.url), 'utf8'), c.dados, 'rode npm run gerar');
    assert.equal(readFileSync(new URL(`../${SAIDAS.skills}`, import.meta.url), 'utf8'), c.skills, 'rode npm run gerar');
  });
  await teste('skills Gelic embutidas: as 8, com descrição e sem o frontmatter no texto', () => {
    assert.deepEqual(Object.keys(SKILLS_GELIC).sort(), SLUGS);
    for (const [slug, sk] of Object.entries(SKILLS_GELIC)) {
      assert.ok(sk.descricao.length > 20, slug);
      assert.ok(!sk.texto.startsWith('---'), slug);
    }
  });
  await teste('as ações do selo nomeiam skills que existem', () => {
    for (const a of ACOES) assert.ok(SKILLS_GELIC[a.skill], a.skill);
  });
  await teste('gelic_etapa: leitura, calcula pela árvore da ponte, ignora cancelado e sigiloso sem título', async () => {
    const tool = TOOLS_GELIC.find(t => t.nome === 'gelic_etapa')!;
    assert.equal(tool.efeito, 'leitura');
    const pedidos: [string, unknown][] = [];
    const ctx = {
      sei: async (op: string, args: unknown) => {
        pedidos.push([op, args]);
        return { protocolo: '00000.000001/2026-01', tipo: 'Licitação', documentos: [
          { numero: '1', titulo: 'DFD - Contratação' }, { numero: '2', titulo: 'Termo de Referência 31/2025' },
          { numero: '3', titulo: 'Despacho de Verificação Inicial - DVI', cancelado: true }, { numero: '4', nivel: 'sigiloso' },
        ] };
      },
    } as never;
    const r = await tool.executar({ processo: '00000.000001/2026-01' }, ctx) as Record<string, unknown>;
    assert.deepEqual(pedidos, [['processo.arvore', { processo: '00000.000001/2026-01' }]]);
    assert.equal(r.etapa, 'preparatoria_analise', 'o DVI cancelado não conta');
    assert.deepEqual(r.fora_da_regra, { cancelados: 1, sigilosos_sem_titulo: 1 });
    assert.deepEqual((r.documentosChave as { numero: string }[]).map(d => d.numero), ['1', '2']);
  });
  await teste('gancho G2: TOOLS_SEI tem gelic_etapa e o registro aceita (sem nome repetido)', async () => {
    const { TOOLS_SEI } = await import('../../agente-ia/src/tools/sei');
    const { RegistroTools } = await import('../../agente-ia/src/motor/tools');
    assert.equal(TOOLS_SEI.filter(t => t.nome === 'gelic_etapa').length, 1);
    const reg = new RegistroTools(TOOLS_SEI);
    assert.ok(reg.paraProvedor().some((t: { function?: { name?: string } }) => t.function?.name === 'gelic_etapa'));
  });
  await teste('gancho G2: skills Gelic entre as embutidas e contexto Gelic no prompt de sistema', async () => {
    const { SKILLS } = await import('../../agente-ia/src/skills');
    for (const s of SLUGS) assert.ok(SKILLS[s], s);
    assert.ok(SKILLS['redacao-oficial'], 'as do upstream continuam');
    const { promptSistema } = await import('../../agente-ia/src/motor/prompt');
    const p = promptSistema(null, new Date(2026, 9, 9), 'INSTRUCAO DO USUARIO');
    assert.ok(p.includes(PROMPT_GELIC.trim()));
    assert.ok(p.indexOf('CONTEXTO DA GELIC') < p.indexOf('INSTRUCAO DO USUARIO'), 'instruções do usuário continuam por último');
  });
  await teste('gancho G1: pedido válido só fresco, com texto, e da janela deste painel', () => {
    const agora = 1_000_000;
    assert.equal(pedidoValido({ texto: ' Analise ', janela: 7, t: agora }, 7, agora), 'Analise');
    assert.equal(pedidoValido({ texto: 'x', janela: 7, t: agora }, null, agora), 'x');
    assert.equal(pedidoValido({ texto: 'x', janela: 8, t: agora }, 7, agora), null);
    assert.equal(pedidoValido({ texto: 'x', janela: 7, t: agora - VALIDADE_PEDIDO_MS - 1 }, 7, agora), null);
    assert.equal(pedidoValido({ texto: '  ', janela: 7, t: agora }, 7, agora), null);
    assert.equal(pedidoValido('texto solto', 7, agora), null);
    assert.equal(pedidoValido({ texto: 'a'.repeat(5000), janela: 7, t: agora }, 7, agora)!.length, 4000);
  });
  await teste('gancho G1: consome o pedido pendente ao abrir e os novos pelo onChanged, uma vez cada', async () => {
    const agora = 5_000_000;
    const sessao = sessaoFalsa({ [CHAVE_PEDIDO]: { texto: 'primeiro', janela: 7, t: agora } });
    const recebidos: string[] = [];
    ouvirPedidosExternos(t => recebidos.push(t), { sessao: sessao as never, janela: async () => 7, agora: () => agora });
    await esperar();
    assert.deepEqual(recebidos, ['primeiro']);
    assert.ok(!(CHAVE_PEDIDO in sessao.dados), 'consumido = apagado');
    sessao.set(CHAVE_PEDIDO, { texto: 'segundo', janela: 7, t: agora });
    await esperar();
    assert.deepEqual(recebidos, ['primeiro', 'segundo']);
    sessao.set(CHAVE_PEDIDO, { texto: 'de outra janela', janela: 9, t: agora });
    await esperar();
    assert.deepEqual(recebidos, ['primeiro', 'segundo']);
    assert.ok(CHAVE_PEDIDO in sessao.dados, 'o da outra janela fica para o painel dela');
    sessao.set(CHAVE_PEDIDO, { texto: 'velho', janela: 7, t: agora - VALIDADE_PEDIDO_MS - 1 });
    await esperar();
    assert.deepEqual(recebidos, ['primeiro', 'segundo']);
    assert.ok(!(CHAVE_PEDIDO in sessao.dados), 'velho é descartado');
  });
  await teste('selo: Analisar e Pendências pedem ao agente com a skill e o processo; Próximo passo abre o detalhe, sem IA', () => {
    const doc = parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
    const pedidos: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir([{ titulo: 'Termo de Referência 1/2026', numero: '1' }]), protocolo: '00000.000001/2026-01' }, p => pedidos.push(p));
    const botoes = [...doc.querySelectorAll<HTMLButtonElement>('#gelic-selo .gelic-acao')];
    assert.deepEqual(botoes.map(b => b.getAttribute('data-acao')), ['analisar', 'pendencias', 'documento', 'proximo']);
    botoes[0].click();
    assert.match(pedidos[0], /skill gelic-analisar-processo/);
    assert.match(pedidos[0], /00000\.000001\/2026-01/);
    const det = doc.getElementById('gelic-selo-detalhe')!;
    assert.equal(det.hidden, true);
    botoes[3].click();
    assert.equal(pedidos.length, 1, 'Próximo passo não chama o agente');
    assert.equal(det.hidden, false, 'abre o detalhe');
    assert.ok(det.querySelector('#gelic-selo-proximo'), 'a seção Próximo passo é o alvo do foco');
    assert.equal(doc.querySelector('.gelic-cab')!.getAttribute('aria-expanded'), 'true');
  });
  await teste('Gerar documento: abre o seletor com os 23 documentos e os sugeridos pela etapa no topo', () => {
    const doc = parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
    const pedidos: string[] = [];
    // Contratação direta autorizada sem contrato: a regra aponta os contratos PROJUR (compras ou serviços).
    const r = resumir(['DFD', 'Termo de Referência 1/2026', 'Despacho Gelic - emissão reserva Gecont', 'Autorização de Contratação Direta'].map((titulo, i) => ({ titulo, numero: String(i + 1) })));
    assert.equal(r.etapa, 'contrato_direta');
    desenharSelo(doc, { tipo: 'resumo', resumo: r, protocolo: 'P1' }, p => pedidos.push(p));
    const gerar = doc.querySelector<HTMLButtonElement>('[data-acao=documento]')!;
    const painel = doc.querySelector<HTMLElement>('#gelic-selo .gelic-docs')!;
    assert.ok(gerar.classList.contains('gelic-acao-destaque'), 'há sugestão: o botão fica em destaque');
    assert.equal(painel.hidden, true);
    gerar.click();
    assert.equal(painel.hidden, false);
    assert.equal(gerar.getAttribute('aria-expanded'), 'true');
    const ids = [...painel.querySelectorAll('[data-documento]')].map(b => b.getAttribute('data-documento'));
    assert.deepEqual(ids.slice(0, 2), ['contrato-compras', 'contrato-servicos'], 'sugeridos primeiro');
    assert.equal(new Set(ids).size, DOCUMENTOS.length, 'todos os documentos da Gelic no seletor');
    painel.querySelector<HTMLButtonElement>('[data-documento=contrato-servicos]')!.click();
    assert.equal(painel.hidden, true, 'escolher fecha o seletor');
    assert.match(pedidos[0], /skill gelic-documento-modelo/);
    assert.match(pedidos[0], /modelo contrato-servicos/);
    assert.match(pedidos[0], /processo P1/);
  });
  await teste('Gerar documento: na análise sugere o DVI (skill de análise); fora do rito, nada em destaque', () => {
    const r = resumir([{ titulo: 'Termo de Referência 1/2026', numero: '1' }]);
    assert.deepEqual(sugeridos(r).map(d => d.id), ['dvi']);
    const doc = parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
    const pedidos: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: r, protocolo: 'P2' }, p => pedidos.push(p));
    doc.querySelector<HTMLButtonElement>('[data-acao=documento]')!.click();
    doc.querySelector<HTMLButtonElement>('.gelic-sugeridos [data-documento=dvi]')!.click();
    assert.match(pedidos[0], /skill gelic-gerar-dvi/);
    const fora = parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
    desenharSelo(fora, { tipo: 'resumo', resumo: resumir([{ titulo: 'Ofício 1', numero: '1' }]), protocolo: 'x' }, () => {});
    assert.ok(!fora.querySelector('.gelic-acao-destaque'));
    assert.equal(fora.querySelector('.gelic-sugeridos'), null);
  });
  await teste('catálogo: ids únicos, todo modelo que a regra sugere está no catálogo', async () => {
    assert.equal(new Set(DOCUMENTOS.map(d => d.id)).size, DOCUMENTOS.length);
    const { LISTA_ETAPAS } = await import('../src/regras/motor');
    const doCatalogo = new Set(DOCUMENTOS.map(d => d.modelo).filter(Boolean));
    const daRegra = new Set(LISTA_ETAPAS.flatMap(e => [e.documento.template, ...Object.values(e.documento.opcoes ?? {}).map(o => o.template)]).filter(Boolean));
    assert.deepEqual([...daRegra].filter(t => !doCatalogo.has(t as string)), []);
  });
  await teste('catálogo × motor: todo modelo do catálogo existe no motor, e todo modelo do motor está no catálogo', async () => {
    const { listarModelos } = await import('../src/modelos/motor');
    const doMotor = listarModelos().map(m => m.id).sort();
    assert.deepEqual(DOCUMENTOS.filter(d => d.modelo).map(d => d.modelo).sort(), doMotor);
  });
  const exemplo = (id: string) => JSON.parse(readFileSync(new URL(`../regras/modelos/exemplos/${id}.json`, import.meta.url), 'utf8'));
  const tool = (nome: string) => TOOLS_GELIC.find(t => t.nome === nome)!;
  await teste('gelic_modelo_formulario e gelic_modelo_preencher: leitura; folha de validação sem devolver o documento inteiro', async () => {
    assert.equal(tool('gelic_modelo_formulario').efeito, 'leitura');
    assert.equal(tool('gelic_modelo_preencher').efeito, 'leitura');
    const f = await tool('gelic_modelo_formulario').executar({ modelo: 'autorizacao-contratacao-direta' }, {} as never) as { variaveis: { nome: string }[]; tipo_sei: { tipo: string } };
    assert.ok(f.variaveis.some(v => v.nome === 'objeto'));
    assert.match(f.tipo_sei.tipo, /Autorização de Contratação Direta/);
    const r = await tool('gelic_modelo_preencher').executar({ modelo: 'autorizacao-contratacao-direta', dados: exemplo('autorizacao-contratacao-direta') }, {} as never) as Record<string, unknown>;
    assert.equal(r.ok, true);
    assert.ok((r.validacao as unknown[]).length > 3);
    assert.equal(r.html, undefined, 'html só com incluir_html');
    assert.ok((r.inicio as string).length <= 1500 && (r.tamanho as number) > 0);
    const comHtml = await tool('gelic_modelo_preencher').executar({ modelo: 'autorizacao-contratacao-direta', dados: exemplo('autorizacao-contratacao-direta'), incluir_html: true }, {} as never) as { html: string };
    assert.match(comHtml.html, /class="Texto_/);
    const erro = await tool('gelic_modelo_preencher').executar({ modelo: 'autorizacao-contratacao-direta', dados: {} }, {} as never) as { ok: boolean; erro: string };
    assert.equal(erro.ok, false);
    assert.match(erro.erro, /sem valor|regime/);
  });
  await teste('gelic_documento_gravar: escrita com prévia; cria e grava o corpo montado pelo motor, igual ao preencher', async () => {
    const g = tool('gelic_documento_gravar');
    assert.equal(g.efeito, 'escrita');
    assert.ok(g.previsualizar, 'escrita sem prévia não passaria pelo cartão de aprovação');
    const ops: [string, Record<string, unknown>][] = [];
    const ctx = { sei: async (op: string, args: Record<string, unknown>) => {
      ops.push([op, args]);
      if (op === 'documento.criar') return { alvo: 'P1', mudancas: [{ campo: 'Tipo', antes: '', depois: String((args.novo as { tipo: string }).tipo) }], resumo: 'Novo documento', dados: args.aplicar ? { numero: '0999999' } : undefined };
      return { ok: true };
    } } as never;
    const a = { processo: 'P1', modelo: 'autorizacao-contratacao-direta', dados: exemplo('autorizacao-contratacao-direta'), tipo: 'Autorização de Contratação Direta - Inex - NLL' };
    const previa = await g.previsualizar!(a, ctx);
    assert.equal(previa[0].erro, undefined);
    assert.ok(previa[0].mudancas.some(m => /Conteúdo \(modelo autorizacao-contratacao-direta\)/.test(m.campo)));
    assert.deepEqual(ops.map(([op, x]) => [op, x.aplicar]), [['documento.criar', false]], 'a prévia não grava');
    const r = await g.executar(a, ctx) as { ok: boolean; numero: string };
    assert.equal(r.ok, true);
    assert.equal(r.numero, '0999999');
    const editar = ops.find(([op]) => op === 'documento.editar')!;
    const { paraHtmlSei, preencher } = await import('../src/modelos/motor');
    assert.equal(editar[1].html, paraHtmlSei(preencher(a.modelo, a.dados).blocos), 'grava exatamente o que o motor montou');
    assert.equal(editar[1].numero, '0999999');
    const ruim = await g.previsualizar!({ ...a, dados: {} }, ctx);
    assert.ok(ruim[0].erro, 'dados incompletos aparecem na prévia, antes de qualquer gravação');
  });
  await teste('gelic_calcular: extenso, ordinal, data por extenso e reajuste pelo código dos modelos', async () => {
    const c = tool('gelic_calcular');
    assert.deepEqual(await c.executar({ operacao: 'extenso', valor: '150.000,00' }, {} as never), { valor: '150.000,00', extenso: 'cento e cinquenta mil reais' });
    assert.deepEqual(await c.executar({ operacao: 'ordinal', valor: '2' }, {} as never), { ordinal: 'SEGUNDO' });
    assert.match((await c.executar({ operacao: 'data_extenso', valor: '06/08/2026' }, {} as never) as { data_extenso: string }).data_extenso, /agosto de 2026/);
    const rj = await c.executar({ operacao: 'reajuste', valor: '1.000,00', percentual: '4,83' }, {} as never) as { valor_reajustado: string };
    assert.equal(rj.valor_reajustado, '1.048,30');
    assert.ok('erro' in (await c.executar({ operacao: 'extenso', valor: 'abc' }, {} as never) as object));
  });
}
