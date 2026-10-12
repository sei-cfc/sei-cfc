/**
 * Peças do demandante no perfil cfc (src/modelos/analise-cfc.ts, cfc_modelo_analisar e cfc_documento_gravar em
 * src/agente/cfc.ts, o catálogo e o seletor do cfc), com um contexto falso: árvore e documentos sintéticos
 * (dados fictícios) e ctx.completar de mentira, sem rede.
 *
 *   npx tsx -e "import('./tests/modelos-cfc-fluxo.ts').then(m=>m.verificarModelosCfcFluxo())"
 */
import { urlDaPeca } from '../src/peca/abrir';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import type { ContextoTool } from '../../agente-ia/src/motor/tools';
import { ANALISES_CFC, analisarCfc, GANCHOS_CFC, gravarCfc, MAX_CHAMADAS_CFC, previaCfc, TOOLS_CFC } from '../src/agente/cfc';
import { skillsDoPerfil, toolsDoPerfil } from '../src/agente/perfil';
import { CATALOGOS, DOCUMENTOS, DOCUMENTOS_CFC, GRUPO_DEMANDANTE, pedidoDeDocumento, sugeridos, TIPO_A_CONFIRMAR } from '../src/documentos/catalogo';
import { conferirCfc, documentoDe, documentosEncaminhados, selecionarFontesCfc, tipoFonteCfc, viaPelaArvore, type DadosPca } from '../src/modelos/analise-cfc';
import { calcularCfc, listarModelosCfc, MODELOS_CFC } from '../src/modelos/cfc';
import { paraHtmlSei } from '../src/modelos/motor';
import { desenharSelo } from '../src/pagina/selo';
import { resumir } from '../src/regras/resumo';
import { contextoFalso, type DocFalso } from './dvi-preparar';
import { teste } from './util';

const PROCESSO = '12345670000048.000011/2026-01';
const HOJE = new Date(2026, 9, 9);
const SEGREDO = 'FRASE-DE-CONTROLE-QUE-NAO-PODE-VOLTAR';
const OBJETO = 'Contratação de serviço fictício de manutenção de equipamentos de exemplo, pelo período de 12 (doze) meses.';
const linhas = (n: number, f: (i: number) => string) => Array.from({ length: n }, (_, i) => f(i)).join('\n');

/** Instrução de um serviço fictício: DFD, ETP e mapa de preços já nos autos (a cadeia do TR). */
export const DEMANDA: DocFalso[] = [
  { numero: '9600001', titulo: 'Documento de Formalização da Demanda (DFD)', assinado: true, texto: `DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA\nÁrea Requisitante ou Técnica: Gerência Executiva de Exemplo - GEX-EXEM\n1. Justificativa: a demanda decorre da necessidade de manter em funcionamento o serviço fictício de exemplo.\n2. Descrição sucinta do objeto:\n${OBJETO}\n4. O valor preliminar estimado para a contratação é de R$ 12.345,67.\n8. Item nº 99 do Plano de Contratações Anual (PCA) do CFC para o exercício de 2026.\nDocumento assinado eletronicamente por Fulana de Tal Exemplo, Gerente de Exemplo, em 01/10/2026.` },
  { numero: '9600002', titulo: 'Estudo Técnico Preliminar 1/2026', assinado: true, texto: `ESTUDO TÉCNICO PRELIMINAR\nA vigência será de 12 (doze) meses.\nLocal de execução: sede do CFC em Brasília/DF.\n${linhas(500, i => (i === 250 ? SEGREDO : `Linha ${i} do estudo com a análise de mercado.`))}` },
  { numero: '9600003', titulo: 'Mapa Comparativo de Preços', assinado: true, texto: 'MAPA COMPARATIVO DE PREÇOS\nValor global estimado da contratação: R$ 12.345,67.' },
  { numero: '9600004', titulo: 'Anexo sem relação', texto: 'Não deve ser lido.' },
  { numero: '9600005', nivel: 'sigiloso', texto: 'segredo' },
];

function fluxoFalso(docs: DocFalso[], respostas: string[], o: { semCompletar?: boolean; tela?: Record<string, string> } = {}) {
  const base = contextoFalso(docs, { consentir: true });
  const chamadas: { sistema: string; pedido: string }[] = [];
  const escritas: { op: string; a: Record<string, unknown> }[] = [];
  const ctx = {
    ...base.ctx,
    async sei(op: string, a: Record<string, unknown>) {
      if (op === 'tela') return o.tela ?? { unidade: 'GEX-EXEM', usuario: 'Fulana de Tal Exemplo' };
      if (op === 'documento.criar') {
        escritas.push({ op, a });
        return { alvo: `Processo ${a.processo}`, mudancas: [{ campo: 'Tipo', antes: '', depois: String((a.novo as { tipo: string }).tipo) }], resumo: 'Novo documento', ...(a.aplicar ? { dados: { numero: '9999003' } } : {}) };
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

type Resultado = { ok: boolean; erro?: string; folha: string[]; faltando: { variavel: string; fonte: string; opcoes?: string[] }[]; avisos: string[]; chamadas: number; tipo_sei: { tipo: string; nomeArvore?: string }; pacote: { caracteres: number; tokensEstimados: number; fontes: { numero: string }[] } };
const analisar = async (f: ReturnType<typeof fluxoFalso>, modelo: string, extra: Record<string, unknown> = {}, ganchos = GANCHOS_CFC) =>
  (await analisarCfc({ processo: PROCESSO, modelo, ...extra }, f.ctx, HOJE, ganchos)) as unknown as Resultado;
/** Os campos pedidos na chamada (linhas "nome | tipo | fonte | descrição"). */
const pedidosNa = (pedido: string) => pedido.split('\n').filter(l => / \| (valor|data|escolha|lista) \| (autos|agente|regra) \| /.test(l)).map(l => l.split(' | ')[0]);
const nulos = (pedido: string, extra: Record<string, unknown> = {}) => JSON.stringify({ ...Object.fromEntries(pedidosNa(pedido).map(n => [n, null])), ...extra });
const tool = (nome: string) => TOOLS_CFC.find(t => t.nome === nome)!;
const docVazio = () => parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
const MODELOS_PRONTOS = ['dfd', 'termos_cientificacao', 'mapa_precos', 'tr', 'despacho_delic'];

/** completar que responde null a tudo o que foi pedido, menos os campos de `extra`. */
function fluxoQueResponde(docs: DocFalso[], ...extras: Record<string, unknown>[]) {
  const f = fluxoFalso(docs, []);
  const ctx = f.ctx as unknown as { completar: (s: string, p: string) => Promise<string> };
  ctx.completar = async (sistema: string, pedido: string) => {
    f.chamadas.push({ sistema, pedido });
    const extra = extras.shift();
    if (extra === undefined) throw new Error('chamada a mais ao modelo');
    return nulos(pedido.split('\nSua resposta anterior:')[0], extra);
  };
  return f;
}

export async function verificarModelosCfcFluxo(): Promise<void> {
  await teste('cfc catálogo: os 5 modelos do gera com tipo "a confirmar" e o rótulo do gera; ETP e TR no Compras.gov.br, mapa de riscos sem modelo; a Gelic intacta', () => {
    assert.equal(CATALOGOS.gelic.documentos, DOCUMENTOS, 'catálogo da Gelic é o de sempre');
    assert.ok(!DOCUMENTOS.some(d => d.skill || d.indisponivel || d.grupo === GRUPO_DEMANDANTE));
    assert.deepEqual(CATALOGOS.cfc.grupos, [GRUPO_DEMANDANTE]);
    assert.equal(CATALOGOS.cfc.documentos, DOCUMENTOS_CFC);
    const prontos = DOCUMENTOS_CFC.filter(d => !d.indisponivel);
    // o motor do TR fica (paridade com o gera); só o formulário sai do catálogo
    const semTr = MODELOS_PRONTOS.filter(m => m !== 'tr');
    assert.deepEqual(prontos.map(d => d.modelo), semTr);
    assert.deepEqual(Object.keys(MODELOS_CFC).sort(), [...MODELOS_PRONTOS].sort());
    assert.deepEqual(prontos.map(d => d.modelo), listarModelosCfc().map(m => m.id).filter(m => m !== 'tr'), 'na ordem da sequência do gera');
    assert.deepEqual(DOCUMENTOS_CFC.filter(d => d.indisponivel).map(d => d.id), ['etp', 'mapa_riscos', 'tr']);
    assert.match(DOCUMENTOS_CFC.find(d => d.id === 'tr')!.indisponivel!, /Compras\.gov\.br/);
    for (const d of DOCUMENTOS_CFC) {
      // o despacho tem tipo conhecido (Despacho, o padrão entre unidades); as outras peças, "a confirmar"
      assert.equal(d.tipoSei.tipo, d.id === 'despacho_delic' ? 'Despacho' : TIPO_A_CONFIRMAR, d.id);
      assert.ok(d.tipoSei.nomeArvore && d.tipoSei.nomeArvore.length <= 50, d.id);
      assert.equal(d.indisponivel ? d.modelo : d.skill, d.indisponivel ? (d.id === 'tr' ? 'tr' : undefined) : 'cfc-documento', d.id);
    }
    assert.equal(DOCUMENTOS_CFC.find(d => d.id === 'despacho_delic')!.tipoSei.nomeArvore, 'Envio à Gelic');
    assert.equal(tipoFonteCfc('Despacho Envio à Gelic'), 'memorando_delic', 'o despacho na árvore (tipo + nome) é reconhecido');
    assert.equal(tipoFonteCfc(DOCUMENTOS_CFC.find(d => d.id === 'dfd')!.tipoSei.nomeArvore!), 'dfd', 'o nome na árvore é reconhecido pelas regras');
    assert.equal(tipoFonteCfc(DOCUMENTOS_CFC.find(d => d.id === 'tr')!.tipoSei.nomeArvore!), 'tr');
    const p = pedidoDeDocumento(DOCUMENTOS_CFC[0], 'P1', 'Preparatória');
    assert.match(p, /^Leia a skill cfc-documento .*"DFD — Documento de Formalização da Demanda" \(modelo dfd\) no processo P1\. O selo indica a etapa "Preparatória"\.$/);
    assert.doesNotMatch(p, /gelic/i);
    assert.throws(() => pedidoDeDocumento(DOCUMENTOS_CFC.find(d => d.id === 'etp')!, 'P1', ''), /Compras\.gov\.br/);
    const r = resumir([{ titulo: 'Termo de Referência 1/2026', numero: '1' }]);
    assert.deepEqual(sugeridos(r, CATALOGOS.cfc), [], 'nada da Gelic é sugerido no cfc');
  });

  await teste('cfc despacho (revisão r12): os encaminhados são só as peças prontas (interna assinada, externa com arquivo)', () => {
    const r = documentosEncaminhados([{ numero: '1', titulo: 'DFD', assinado: true }, { numero: '2', titulo: 'Termo de Ciência', assinado: false },
      { numero: '3', titulo: 'Estudo Técnico Preliminar', externo: true, comArquivo: false }, { numero: '4', titulo: 'Cotação - A', externo: true, comArquivo: true },
      { numero: '5', titulo: 'Cotação - B', externo: true, comArquivo: true }]);
    assert.equal(r?.texto, 'DFD (SEI nº 1)\nCotação de fornecedor (SEI nº 4)\nCotação de fornecedor (SEI nº 5)');
  });

  await teste('cfc seletor: 4 botões das peças do demandante, ETP e TR (Compras.gov.br) e mapa de riscos só como nota; o clique abre o formulário', () => {
    const doc = docVazio();
    const pedidos: string[] = [];
    const abertas: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir([{ titulo: 'Documento de Formalização da Demanda (DFD)', numero: '1' }]), protocolo: 'P1' }, p => pedidos.push(p), 'cfc', { abrirJanela: (m, p) => abertas.push(urlDaPeca(m, p)) });
    doc.querySelector<HTMLButtonElement>('[data-acao=documento]')!.click();
    const painel = doc.querySelector<HTMLElement>('.gelic-docs')!;
    assert.deepEqual([...painel.querySelectorAll('[data-documento]')].map(b => b.getAttribute('data-documento')), MODELOS_PRONTOS.filter(m => m !== 'tr'));
    assert.deepEqual([...painel.querySelectorAll('[data-indisponivel]')].map(b => b.getAttribute('data-indisponivel')), ['etp', 'mapa_riscos', 'tr']);
    assert.equal(painel.querySelectorAll('button[data-indisponivel]').length, 0);
    assert.match(painel.textContent!, /Peças do demandante \(4\)/);
    assert.match(painel.textContent!, /TR — Termo de Referência — feito no Compras\.gov\.br/);
    assert.doesNotMatch(painel.textContent!, /em breve|DVI|Gecont|aditivo/);
    painel.querySelector<HTMLButtonElement>('[data-documento=mapa_precos]')!.click();
    assert.deepEqual(pedidos, [], 'no cfc a peça não vai mais ao agente');
    assert.deepEqual(abertas, ['js/gelic/peca.html?modelo=mapa_precos&processo=P1']);
  });

  await teste('cfc ferramentas e skills por perfil: cfc_* e cfc-documento só no cfc; a Gelic sem nenhuma delas', () => {
    assert.deepEqual(toolsDoPerfil('cfc').map(t => t.nome), ['gelic_etapa', 'gelic_calcular', 'cfc_modelo_analisar', 'cfc_documento_gravar']);
    assert.ok(!toolsDoPerfil('gelic').some(t => t.nome.startsWith('cfc_')));
    assert.ok(!toolsDoPerfil('cfc').some(t => /^gelic_(dvi_|pendencias|modelo_|documento_gravar)/.test(t.nome)));
    assert.equal(tool('cfc_modelo_analisar').efeito, 'leitura');
    assert.equal(tool('cfc_documento_gravar').efeito, 'escrita');
    for (const t of TOOLS_CFC) assert.doesNotMatch(t.descricao, /\bDVI\b|Gelic/, t.nome);
    assert.deepEqual(Object.keys(skillsDoPerfil('cfc')), ['cfc-documento']);
    assert.ok(!Object.keys(skillsDoPerfil('gelic')).some(s => s.startsWith('cfc-')));
    const sk = skillsDoPerfil('cfc')['cfc-documento'];
    assert.ok(sk.texto.length <= 2000 && /cfc_modelo_analisar/.test(sk.texto) && /cfc_documento_gravar/.test(sk.texto) && /a confirmar/.test(sk.texto));
  });

  await teste('cfc puro: fontes por peça (anteriores primeiro), via e documentos encaminhados pela árvore, documento do gera', () => {
    const arv = DEMANDA.filter(d => d.titulo).map(d => ({ numero: d.numero, titulo: d.titulo! }));
    assert.deepEqual(selecionarFontesCfc(arv, 'tr').fontes.map(f => f.numero), ['9600001', '9600002', '9600003']);
    assert.deepEqual(selecionarFontesCfc(arv, 'tr').ausentes, ['mapa_riscos', 'tr']);
    assert.equal(tipoFonteCfc('Mapa de Riscos'), 'mapa_riscos');
    assert.equal(tipoFonteCfc('Portaria 12/2026 - equipe de planejamento'), 'portaria');
    assert.equal(viaPelaArvore(arv), null, 'sem título que diga a via');
    assert.deepEqual(viaPelaArvore([...arv, { numero: '9', titulo: 'Justificativa de inexigibilidade' }])?.via, 'inexigibilidade');
    assert.equal(documentosEncaminhados(arv)?.texto, 'DFD (SEI nº 9600001)\nETP (SEI nº 9600002)\nMapa de preços (SEI nº 9600003)');
    const d = documentoDe('dfd', { unidade: 'GEX', via: 'pregao', objeto: OBJETO, valor_estimado: '12.345,67', vigencia_meses: 12, item_pca: 99, ano: 2026, data_pretendida: '30/11/2026', diretor_nome: 'X' });
    assert.deepEqual(d.pca, { item_pca: 99, ano: 2026, grau_prioridade: null });
    assert.deepEqual(d.cadastro, { objeto: OBJETO, valor_estimado: '12.345,67', vigencia: { meses: 12 }, data_pretendida: '30/11/2026' });
    assert.deepEqual(d.respostas, { data_pretendida: '30/11/2026', diretor_nome: 'X' });
    const t = calcularCfc(d).texto;
    assert.match(t, /doze mil, trezentos e quarenta e cinco reais e sessenta e sete centavos/);
    assert.match(t, /30 de novembro de 2026/);
    assert.match(t, /Portaria PRES\/CFC nº 285/);
  });

  await teste('cfc conferirCfc: opção, data (dd/mm ou por extenso no documento), reais, meses, lista dos autos campo a campo', () => {
    const textos = new Map([['1', 'Data pretendida: 30 de novembro de 2026. Valor R$ 12.345,67. Serviço de manutenção de exemplo, Serviço/mês, 12.']]);
    const ped = [
      { nome: 'data_pretendida', tipo: 'data' as const, fonte: 'autos' as const, descricao: '' },
      { nome: 'grau_prioridade', tipo: 'escolha' as const, fonte: 'regra' as const, descricao: '', opcoes: ['Baixo', 'Médio', 'Alto'] },
      { nome: 'valor_estimado', tipo: 'valor' as const, fonte: 'autos' as const, descricao: '' },
      { nome: 'itens', tipo: 'lista' as const, fonte: 'autos' as const, descricao: '', campos: ['descricao', 'unidade_medida', 'quantidade'] },
      { nome: 'via', tipo: 'escolha' as const, fonte: 'regra' as const, descricao: '', opcoes: ['pregao', 'dispensa'] },
    ];
    const c = conferirCfc({
      data_pretendida: { valor: '30/11/2026', sei: '1' },
      grau_prioridade: { valor: 'medio', sei: '1' },
      valor_estimado: { valor: 'R$ 12.345,67', sei: '1' },
      itens: { valor: [{ descricao: 'Serviço de manutenção de exemplo', unidade_medida: 'Serviço/mês', quantidade: '12' }], sei: '1' },
      via: { valor: 'leilão' },
    }, ped, { arvore: new Set(['1']), textos });
    assert.deepEqual(c.aceitos.data_pretendida.valor, '30/11/2026');
    assert.equal(c.aceitos.grau_prioridade.valor, 'Médio');
    assert.equal(c.aceitos.valor_estimado.valor, '12.345,67');
    assert.equal((c.aceitos.itens.valor as unknown[]).length, 1);
    assert.deepEqual(c.errados, ['via']);
    const c2 = conferirCfc({ data_pretendida: { valor: '01/12/2026', sei: '1' }, grau_prioridade: null, valor_estimado: null, via: null, itens: { valor: [{ descricao: 'Item que não está lá', unidade_medida: 'Un', quantidade: '1' }], sei: '1' } }, ped, { arvore: new Set(['1']), textos });
    assert.deepEqual(c2.errados.sort(), ['data_pretendida', 'itens']);
  });

  await teste('cfc fluxo: nada faltando → 0 chamadas e nenhum documento lido (despacho à Gelic, encaminhados e fundamento pelo código)', async () => {
    const f = fluxoFalso(DEMANDA, [], { semCompletar: true });
    const r = await analisar(f, 'despacho_delic', { dados: { via: 'pregao', objeto: OBJETO, signatario_cargo: 'Gerente de Exemplo' } });
    assert.equal(r.chamadas, 0);
    assert.deepEqual(f.lidos, []);
    assert.equal(r.ok, true, JSON.stringify(r));
    assert.ok(r.folha.some(l => l.startsWith('documentos_encaminhados = DFD (SEI nº 9600001) ETP (SEI nº 9600002) Mapa de preços (SEI nº 9600003) [arvore')));
    assert.ok(r.folha.some(l => l.startsWith('fundamento_contratacao = Licitação na modalidade pregão, nos termos da Lei nº 14.133/2021. [regra')));
    assert.ok(r.folha.some(l => l.startsWith('responsavel_nome = Fulana de Tal Exemplo [tela')));
    assert.deepEqual(r.tipo_sei, DOCUMENTOS_CFC.find(d => d.id === 'despacho_delic')!.tipoSei);
  });

  await teste('cfc fluxo: TR — 1 chamada; o DFD, o ETP e o mapa entram na MESMA chamada e objeto/valor/vigência saem deles com o SEI (cadeia)', async () => {
    const f = fluxoQueResponde(DEMANDA, {
      objeto: { valor: OBJETO, sei: '9600001' },
      valor_estimado: { valor: '12.345,67', sei: '9600003' },
      vigencia_meses: { valor: '12 (doze) meses', sei: '9600002' },
      local_execucao: { valor: 'sede do CFC em Brasília/DF', sei: '9600002' },
      natureza_classificacao: { valor: 'comum(ns)', sei: '9600002' },
    });
    const r = await analisar(f, 'tr', { dados: { via: 'pregao' } });
    assert.equal(r.chamadas, 1);
    assert.equal(f.chamadas.length, 1);
    const pedido = f.chamadas[0].pedido;
    assert.match(pedido, /^objeto \| valor \| autos \| /m, 'com peça anterior, o objeto é cópia conferida (não redação)');
    assert.match(pedido, /^metodo_execucao \| valor \| agente \| /m);
    assert.ok(pedido.includes(OBJETO) && pedido.includes('# SEI 9600001 Documento de Formalização da Demanda (DFD) [dfd'), 'o DFD vai na mesma chamada');
    assert.ok(pedido.includes('# SEI 9600003 Mapa Comparativo de Preços [mcp'));
    assert.ok(!/\nmodalidade_licitacao \|/.test(pedido), 'a modalidade sai da via, sem IA');
    assert.deepEqual([...f.lidos].sort(), ['9600001', '9600002', '9600003'], 'só as peças-fonte; sigiloso e anexo nunca');
    assert.ok(r.folha.some(l => l.startsWith(`objeto = ${OBJETO.slice(0, 60)}`) && l.includes('[autos, SEI 9600001')), r.folha.join('\n'));
    assert.ok(r.folha.some(l => l === 'valor_estimado = 12.345,67 [autos, SEI 9600003, pela IA, conferido no documento]'));
    assert.ok(r.folha.some(l => l.startsWith('vigencia_meses = 12 [autos, SEI 9600002')));
    assert.ok(r.folha.some(l => l.startsWith('modalidade_licitacao = PREGÃO [regra, pela via')));
    assert.ok(r.faltando.some(x => x.variavel === 'foro'), 'o que veio null fica para o usuário');
    assert.ok(!r.faltando.some(x => ['objeto', 'valor_estimado', 'vigencia_meses'].includes(x.variavel)));
    const saida = JSON.stringify(r);
    assert.ok(!saida.includes(SEGREDO) && !saida.includes('Linha 1 do estudo') && !saida.includes('n0nce'), 'nenhum texto de documento volta à conversa');
  });

  await teste('cfc fluxo: valor fora do documento citado → 2 chamadas, nunca mais; o ainda errado vira faltando com aviso', async () => {
    const errado = { objeto: { valor: 'Objeto que não está escrito em lugar nenhum.', sei: '9600001' } };
    const f = fluxoQueResponde(DEMANDA, errado, { objeto: { valor: OBJETO, sei: '9600001' } });
    const r = await analisar(f, 'tr', { dados: { via: 'pregao' } });
    assert.equal(r.chamadas, 2);
    assert.match(f.chamadas[1].pedido, /objeto: "Objeto que não está escrito.*" não está escrito no SEI 9600001/);
    assert.ok(!r.faltando.some(x => x.variavel === 'objeto'));

    const f2 = fluxoQueResponde(DEMANDA, errado, errado, errado);
    const r2 = await analisar(f2, 'tr', { dados: { via: 'pregao' } });
    assert.equal(r2.chamadas, MAX_CHAMADAS_CFC);
    assert.equal(f2.chamadas.length, 2, 'nunca mais de duas chamadas');
    assert.ok(r2.faltando.some(x => x.variavel === 'objeto'));
    assert.ok(r2.avisos.some(a => /Recusado pelo código: objeto/.test(a)));

    const f3 = fluxoFalso(DEMANDA, ['sem json', 'ainda sem json']);
    const r3 = await analisar(f3, 'tr', { dados: { via: 'pregao' } });
    assert.equal(r3.chamadas, 2);
  });

  await teste('cfc fluxo: DFD sem peça-fonte nem observações → 0 chamadas (nada a ler, a IA não inventa); com observações → 1, justificativa redigida', async () => {
    const f = fluxoFalso([], [], { semCompletar: true });
    const r = await analisar(f, 'dfd');
    assert.equal(r.chamadas, 0);
    assert.ok(r.faltando.some(x => x.variavel === 'justificativa' && x.fonte === 'agente'));
    assert.ok(r.faltando.some(x => x.variavel === 'autoridade_nome' && x.opcoes?.length));
    assert.ok(r.folha.some(l => l.startsWith('unidade = GEX-EXEM [tela')));

    const g = fluxoQueResponde([], { justificativa: { valor: 'A demanda decorre da necessidade de manter o serviço fictício de exemplo.' } });
    const r2 = await analisar(g, 'dfd', { observacoes: 'Precisamos manter o serviço fictício de exemplo funcionando.' });
    assert.equal(r2.chamadas, 1);
    assert.match(g.chamadas[0].pedido, /Documentos: nenhum \(só as observações do usuário\)\./);
    assert.deepEqual(pedidosNa(g.chamadas[0].pedido), ['justificativa', 'objeto'], 'só os de redação (sem peça anterior, o objeto também): os dos autos, sem documento, não vão');
    assert.ok(r2.folha.some(l => l.startsWith('justificativa = A demanda decorre') && l.includes('redigido pela IA: valide')));
  });

  await teste('cfc fluxo: gancho dadosDoPca — o que o PCA sabe entra sem IA (item, ano, objeto, valor) e não é pedido', async () => {
    const vistos: string[] = [];
    const pca: DadosPca = { item_pca: 99, ano: 2026, objeto: OBJETO, valor_estimado: '12345.67', data_pretendida: '30/11/2026', vigencia: { meses: 12 } };
    const ganchos = { dadosDoPca: async (p: string) => { vistos.push(p); return pca; } };
    const f = fluxoQueResponde(DEMANDA, { justificativa: { valor: 'a demanda decorre da necessidade de manter em funcionamento o serviço fictício de exemplo.', sei: '9600001' } });
    const r = await analisar(f, 'dfd', {}, ganchos);
    assert.deepEqual(vistos, [PROCESSO]);
    const pedidos = pedidosNa(f.chamadas[0].pedido);
    for (const n of ['objeto', 'valor_estimado', 'item_pca', 'ano', 'data_pretendida', 'vigencia_meses', 'grau_prioridade']) assert.ok(!pedidos.includes(n), n);
    assert.ok(pedidos.includes('justificativa'));
    assert.ok(r.folha.some(l => l === 'item_pca = 99 [pca, pelo PCA]'));
    assert.ok(r.folha.some(l => l.startsWith('objeto = Contratação de serviço fictício') && l.includes('[pca, pelo PCA]')));
    assert.ok(!r.faltando.some(x => ['item_pca', 'ano', 'objeto', 'valor_estimado'].includes(x.variavel)));
    assert.equal(await GANCHOS_CFC.dadosDoPca!('P1'), undefined, 'o padrão lê a configuração do PCA: sem ela, nada (e nada sai pela rede)');
    const falho = await analisar(fluxoFalso([], [], { semCompletar: true }), 'termos_cientificacao', {}, { dadosDoPca: async () => { throw new Error('fora do ar'); } });
    assert.ok(falho.avisos.some(a => /PCA não respondeu: fora do ar/.test(a)));
  });

  await teste('cfc_documento_gravar — recusa "a confirmar" e o que falta; despacho à Gelic todo dos autos, gravado exatamente paraHtmlSei(calcularCfc(...)); rascunho com ⟦campo⟧', async () => {
    const f = fluxoFalso(DEMANDA, [], { semCompletar: true });
    await analisar(f, 'despacho_delic', { dados: { objeto: OBJETO } });
    const g = tool('cfc_documento_gravar');
    const base = { processo: PROCESSO, modelo: 'despacho_delic', tipo: 'Despacho' };
    assert.match(String((await g.previsualizar!({ ...base, tipo: 'a confirmar' }, f.ctx))[0].erro), /a confirmar/);
    assert.deepEqual(await g.executar({ ...base, tipo: 'A confirmar' }, f.ctx), { ok: false, erro: (await g.previsualizar!({ ...base, tipo: 'a confirmar' }, f.ctx))[0].erro });
    // o despacho à Gelic sai todo dos autos (objeto, fundamento pela via, encaminhados, assinante): nada a perguntar
    const a = base;
    assert.equal((await g.previsualizar!(a, f.ctx))[0].erro, undefined);
    const r = await g.executar(a, f.ctx) as { ok: boolean; numero: string };
    assert.equal(r.ok, true);
    // o que falta e só o usuário sabe trava a gravação (DFD sem a autoridade, sem IA)
    await analisar(f, 'dfd', {});
    const semAutoridade = await g.executar({ ...base, modelo: 'dfd' }, f.ctx) as { ok: boolean; erro: string };
    assert.equal(semAutoridade.ok, false);
    assert.match(semAutoridade.erro, /Faltam valores/);
    const est = ANALISES_CFC.get(`${PROCESSO}\u0000despacho_delic`)!.estado;
    const esperado = paraHtmlSei(calcularCfc(documentoDe('despacho_delic', est.valores)).blocos);
    const editar = f.escritas.find(e => e.op === 'documento.editar')!;
    assert.equal(editar.a.html, esperado);
    assert.match(String(editar.a.html), /DESPACHO/);
    assert.match(String(editar.a.html), /À Gerência de Licitações e Contratos/);
    assert.doesNotMatch(String(editar.a.html), /Memorando/, 'entre unidades, despacho');
    assert.match(String(editar.a.html), /Gerente de Exemplo/);
    assert.match(String(editar.a.html), /DFD \(SEI nº 9600001\)/);
    assert.doesNotMatch(String(editar.a.html), /⟦/);
    const rascunho = await g.executar({ ...base, modelo: 'dfd', rascunho: true }, f.ctx) as { ok: boolean };
    assert.equal(rascunho.ok, true);
    assert.match(String(f.escritas.filter(e => e.op === 'documento.editar')[1].a.html), /⟦/, 'rascunho grava com as marcas');
    assert.match(String((await g.executar({ ...base, processo: 'outro', dados: {} }, f.ctx) as { erro: string }).erro), /rode cfc_modelo_analisar/);
  });

  await teste('cfc gravar na peça que já está na árvore (Iniciar processo): só edita aquele documento, sem criar outro nem pedir tipo', async () => {
    const f = fluxoFalso(DEMANDA, [], { semCompletar: true });
    await analisar(f, 'despacho_delic', { dados: { objeto: OBJETO } });
    const ctx = f.ctx as unknown as ContextoTool;
    // revisão r13: só documento deste processo, interno e sem assinatura
    assert.match((await gravarCfc({ processo: PROCESSO, modelo: 'despacho_delic', documento: '1234567' }, ctx)).erro!, /não está no processo/);
    assert.match((await gravarCfc({ processo: PROCESSO, modelo: 'despacho_delic', documento: '9600001' }, ctx)).erro!, /já foi assinado/);
    assert.equal(f.escritas.length, 0);
    const r = await gravarCfc({ processo: PROCESSO, modelo: 'despacho_delic', tipo: 'a confirmar', documento: '9600004' }, ctx);
    assert.equal(r.ok, true, JSON.stringify(r));
    assert.equal(r.numero, '9600004');
    assert.deepEqual(f.escritas.map(e => [e.op, e.a.numero]), [['documento.editar', '9600004']]);
    // a ferramenta do agente ignora `documento` (cria sempre)
    const pelaTool = await tool('cfc_documento_gravar').executar({ processo: PROCESSO, modelo: 'despacho_delic', tipo: 'Despacho', documento: '9600004' }, ctx) as { ok: boolean };
    assert.equal(pelaTool.ok, true);
    assert.equal(f.escritas.at(-2)!.op, 'documento.criar');
  });
  await teste('cfc custo: a chamada do TR com DFD, ETP e mapa cabe no orçamento dos modelos', async () => {
    const f = fluxoQueResponde(DEMANDA, {});
    const r = await analisar(f, 'tr', { dados: { via: 'pregao' } });
    assert.ok(r.pacote.tokensEstimados > 0 && r.pacote.tokensEstimados < 20_000, String(r.pacote.tokensEstimados));
  });
  await teste('cfc: analisarCfc com ia:false só pré-preenche (sem completar, sem ler documento) e devolve estado e entradas', async () => {
    const f = fluxoFalso(DEMANDA, []);
    const r = await analisarCfc({ processo: PROCESSO, modelo: 'dfd' }, f.ctx as unknown as ContextoTool, HOJE, GANCHOS_CFC, { ia: false, estado: true }) as Record<string, unknown>;
    assert.equal(f.chamadas.length, 0);
    assert.deepEqual(f.lidos, []);
    assert.equal(r.chamadas, 0);
    assert.ok((r.estado as { valores: Record<string, unknown> }).valores.unidade, 'unidade vem da tela');
    assert.ok(Array.isArray(r.entradas) && (r.entradas as unknown[]).length > 0);
  });
  await teste('cfc: previaCfc devolve o mesmo HTML que a gravação, com ⟦campo⟧ no que falta', async () => {
    const f = fluxoFalso(DEMANDA, []);
    await analisarCfc({ processo: PROCESSO, modelo: 'dfd' }, f.ctx as unknown as ContextoTool, HOJE, GANCHOS_CFC, { ia: false });
    const p = await previaCfc({ processo: PROCESSO, modelo: 'dfd', dados: { justificativa: 'Necessidade fictícia.' } });
    assert.match(p.html, /FORMALIZA/);
    assert.match(p.texto, /⟦/);
    assert.ok(p.faltando.length > 0);
    const g = await gravarCfc({ processo: PROCESSO, modelo: 'dfd', dados: { justificativa: 'Necessidade fictícia.' }, tipo: 'Documento de Formalização de Demanda', rascunho: true }, f.ctx as unknown as ContextoTool);
    assert.equal(g.ok, true);
    assert.equal(f.escritas.find(e => e.op === 'documento.editar')?.a.html, p.html);
  });
  await teste('cfc: gravarCfc cria e grava o corpo; a tool cfc_documento_gravar usa o mesmo caminho', async () => {
    const f = fluxoFalso(DEMANDA, []);
    await analisarCfc({ processo: PROCESSO, modelo: 'dfd' }, f.ctx as unknown as ContextoTool, HOJE, GANCHOS_CFC, { ia: false });
    const r = await gravarCfc({ processo: PROCESSO, modelo: 'dfd', tipo: 'Documento de Formalização de Demanda', rascunho: true }, f.ctx as unknown as ContextoTool);
    assert.equal(r.ok, true);
    assert.equal(r.numero, '9999003');
    assert.deepEqual(f.escritas.map(e => e.op), ['documento.criar', 'documento.editar']);
    const semTipo = await gravarCfc({ processo: PROCESSO, modelo: 'dfd', tipo: 'a confirmar', rascunho: true }, f.ctx as unknown as ContextoTool);
    assert.equal(semTipo.ok, false);
  });
  await teste('final #4: a ferramenta do agente não devolve estado nem entradas ao modelo (custo); só a janela pede', async () => {
    const f = fluxoFalso(DEMANDA, [], { semCompletar: true });
    const tool = TOOLS_CFC.find(t => t.nome === 'cfc_modelo_analisar')!;
    const dados = { via: 'pregao', objeto: OBJETO, signatario_cargo: 'Gerente de Exemplo' };
    const r = await tool.executar({ processo: PROCESSO, modelo: 'despacho_delic', dados }, f.ctx as unknown as ContextoTool) as Record<string, unknown>;
    assert.equal(r.ok, true, JSON.stringify(r).slice(0, 300));
    assert.ok(!('estado' in r) && !('entradas' in r), Object.keys(r).join(','));
  });
  await teste('final #2 (motor): vazio explícito em dados tira da prévia o valor que veio da análise', async () => {
    const f = fluxoFalso(DEMANDA, []);
    await analisarCfc({ processo: PROCESSO, modelo: 'dfd' }, f.ctx as unknown as ContextoTool, HOJE, GANCHOS_CFC, { ia: false });
    const com = await previaCfc({ processo: PROCESSO, modelo: 'dfd' });
    assert.match(com.texto, /GEX-EXEM/, 'a unidade da tela entra');
    const sem = await previaCfc({ processo: PROCESSO, modelo: 'dfd', dados: { unidade: '' } });
    assert.doesNotMatch(sem.texto, /GEX-EXEM/);
  });
}
