/**
 * achados da Gelic: o único texto que a IA escreve para o DVI, a devolução e o despacho à Gecont, e o
 * validador que o confere contra o que a extensão sabe do processo. Porte do avaliar.validar (e de
 * validar_checklist/validar_checagens) da skill gelic, com as MESMAS mensagens, na mesma ordem; paridade em
 * tests/dvi-montar.ts contra regras/dvi-montar/paridade.json (gerado rodando o próprio Python).
 *
 * O que muda em relação ao Python, e por quê:
 *  - A extensão não tem a paginação do processo (lê documento a documento na árvore). Por isso não há `p` em
 *    lugar nenhum: o checklist_status pede só `sei` (no Python, `sei` e `p`), os avisos de página fora do
 *    intervalo somem, e página citada no texto que vai ao documento é ERRO (o Python a tira com sem_paginas, que
 *    precisa do índice de páginas). Sem página no texto, sem_paginas é a identidade: o texto sai igual.
 *  - Esquema estrito: campo desconhecido e tipo errado são erro (o Python ignora ou quebra). Esses erros vêm
 *    antes dos do Python, numa fase própria, para a IA corrigir a forma antes do conteúdo.
 *  - O despacho à Gecont sai do modelo despacho-gecont-reserva, que pede natureza, objeto e valor com o SEI de
 *    onde veio: em vez de `valor`/`natureza_valor` soltos, o objeto `gecont` (ver Achados).
 *  - Os fatos mecânicos (documento sem assinatura, digitalizado, classe da peça, processo divergente, citados
 *    ausentes, cronologia, MCP sem proposta) vêm prontos no contexto, calculados pela preparação; aqui só se
 *    cruzam com o checklist_status, como o validar_checagens faz com o fatos.py.
 * Funções puras: sem DOM, sem rede.
 */
import { CHECKLISTS, GRAUS } from './dados.gerado';
import { ESPACO, pyRepr, pyStr, strip } from '../../modelos/python';

// ---------------------------------------------------------------- o que a IA escreve

export type StatusChecklist = 'atende' | 'nao_atende' | 'nao_se_aplica' | 'nao_verificado';
export interface Achado {
  /** Item, cláusula ou campo do documento ("8.1", "cláusula 6.15.2"). Sem página. */
  item: string;
  /** O fato, verificável no documento (número, data, valor, trecho curto). Sem juízo. */
  constatacao: string;
  /** O que refazer ou reavaliar + fundamento (cláusula, item do TR, artigo). */
  recomendacao: string;
  /** Id do checklist ("G05"): decide se impede. */
  checklist?: string;
  /** Só sem id de checklist: true para descumprimento objetivo, ausência essencial ou incompatibilidade relevante. */
  impede?: boolean;
}
export interface BlocoAchados { documento: string; sei: string; achados: Achado[] }
export interface EntradaChecklist { status: StatusChecklist; sei?: string; nota?: string }
export interface DadosGecont {
  /** Natureza da despesa no modelo ("reajuste", "prorrogação", "contratação"). */
  natureza: string;
  /** Como o modelo diz "O valor previsto para {natureza_valor}": "o reajuste contratual", "a futura contratação". */
  natureza_valor: string;
  /** Objeto copiado do contrato/TR, iniciando em minúscula e terminando com ponto. */
  objeto: string;
  /** Valor a reservar como está nos autos ("3.098,75" ou "R$ 3.098,75"). O extenso sai do código. */
  valor: string;
  /** SEI do documento de onde o valor veio. */
  valor_sei: string;
  /** Contrato vigente (alteração contratual). */
  contrato?: { numero: string; sei: string };
}
export interface Achados {
  processo: string;
  /** Copiado dos autos, terminado em ponto. */
  objeto: string;
  /** true só se os dispositivos citados foram conferidos na fonte oficial nesta sessão. */
  verificacao_legal: boolean;
  /** Um bloco por documento com achado (a ordem é do código: SEI crescente). */
  blocos: BlocoAchados[];
  /** Documento de encaminhamento à Gelic; destino = a unidade ("À Gerência de ..."), nunca a pessoa. */
  remetente?: { unidade?: string; documento?: string; sei?: string; destino?: string };
  tem_etp?: boolean;
  fontes_nao_verificadas?: string[];
  compatibilidade?: Achado[];
  checklist_status?: Record<string, EntradaChecklist>;
  /** Frases completas: documento desta etapa que deveria existir e não existe. */
  ausencias?: string[];
  /** O que não se conseguiu examinar: vai ao chat, nunca ao documento. */
  limitacoes?: string[];
  de_acordo?: boolean;
  descartados?: { tema: string; motivo: string }[];
  /** Só para o despacho à Gecont. */
  gecont?: DadosGecont;
}

// ---------------------------------------------------------------- o que a extensão sabe

export type Familia = 'preparatoria' | 'prorrogacao' | 'reajuste';
export interface DocumentoArvore {
  numero: string;
  titulo: string;
  tipo?: string;
  assinado: boolean;
  /** Todas as páginas por OCR (assinatura manuscrita não detectável): o erro de assinatura vira aviso. */
  digitalizado?: boolean;
  /** Classe da peça (etp, tr, mcp, pesquisa, parametros, justificativa_preco, riscos...), como o fatos.classe_doc. */
  classe?: string | null;
}
/** Fatos mecânicos da preparação (os de _checagens.md): os SEIs de cada candidato. */
export interface Checagens {
  processosDivergentes?: string[];
  citadosAusentes?: string[];
  tituloConteudo?: string[];
  cronologia?: { regra: string; seis: string[] }[];
  /** Valores do MCP sem proposta correspondente (há MCP nos autos). */
  mcpSemProposta?: number[];
}
export interface ContextoDvi {
  /** Protocolo do processo aberto. */
  processo?: string;
  /** Documentos da árvore, na ordem da árvore. */
  documentos: readonly DocumentoArvore[];
  /** Texto de cada documento que a IA viu (numero → texto): é onde se procuram os valores e as datas citados. */
  textos?: Readonly<Record<string, string>>;
  /** Família e séries do checklist (as da preparação, antes dos achados). Sem ele, o checklist_status não é cobrado. */
  checklist?: { familia: Familia; series: readonly string[] };
  checagens?: Checagens;
  /** SEI do DVI anterior desta etapa (reexame), ou nada. */
  dviAnterior?: string | null;
  /** Comparativo entre dois documentos (o --compare): sem checklist, formato próprio. */
  comparativo?: boolean;
}
export interface Validacao { erros: string[]; avisos: string[] }

// ---------------------------------------------------------------- regex do Python → JS

const S = `[${ESPACO}]`; // \s do Python
const W = '[\\p{L}\\p{N}_]'; // \w do Python (o \b do JS só conhece ASCII)
/** (?!\d|\.\d): "Processo SEI nº nnnnnnnnnnnnnn.nnnnnn/…" não é SEI, e o SEI que fecha a frase continua sendo. */
export const RE_SEI_TXT = new RegExp(`SEI${S}*(?:n[ºo.°]*${S}*)?(\\d{6,8})(?!\\d|\\.\\d)`, 'gi');
const RE_VALOR = new RegExp(`R\\$${S}*([\\d.]+,\\d{2})`, 'g');
const RE_DATA = new RegExp(`(?<!${W})(\\d{2})/(\\d{2})/(\\d{4})(?!${W})`, 'gu');
/** O começo do RE_PAG_CIT do gelic_lib.py: "p. 10", "pp. 3", "págs. 2", "fls. 5", "páginas 4", "folhas 7". */
const RE_PAGINA = new RegExp(`(?<!${W})(?:(?:pp?|p[áa]gs?|pgs?|fls?)\\.${S}*|(?:p[áa]ginas?|folhas?)${S}+)\\d`, 'iu');

export const STATUS: readonly StatusChecklist[] = ['atende', 'nao_atende', 'nao_se_aplica', 'nao_verificado'];
const SERIES_FAMILIA: Record<Familia, readonly string[]> = { preparatoria: ['A', 'F', 'T', 'R', 'P', 'K', 'M'], prorrogacao: ['G', 'B'], reajuste: ['G', 'C'] };
const ARQUIVO_FAMILIA: Record<Familia, string> = { preparatoria: 'checklist-preparatoria.md', prorrogacao: 'checklist-contratual.md', reajuste: 'checklist-contratual.md' };
const ITENS_ASSINATURA = ['A02', 'T07', 'R07', 'P06', 'K03'];
const CLASSES_ASSINATURA: Record<string, readonly string[]> = { T07: ['etp'], R07: ['tr'], P06: ['mcp', 'pesquisa', 'parametros', 'justificativa_preco'], K03: ['riscos'] };

// ---------------------------------------------------------------- miúdos do Python

type Obj = Record<string, unknown>;
const ehObj = (x: unknown): x is Obj => typeof x === 'object' && x !== null && !Array.isArray(x);
const txt = (x: unknown): string => (typeof x === 'string' ? x : ''); // _txt
/** str() do Python para o que aparece nas mensagens (None quando falta). */

/** Verdadeiro do Python para os campos de texto/lista/objeto. */
const pyVerdade = (x: unknown): boolean => !(x === undefined || x === null || x === false || x === 0 || x === '' || (Array.isArray(x) && !x.length) || (ehObj(x) && !Object.keys(x).length));
export const comprimento = (s: string): number => [...s].length; // len() conta code points
const brlParaNumero = (s: string): number => Number(s.replaceAll('.', '').replace(',', '.'));
/** float_para_brl: "R$ 1.234,56". */
export function numeroParaBrl(v: number): string {
  const [inteiro, dec] = v.toFixed(2).split('.');
  return `R$ ${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${dec}`;
}
/** _seis: SEIs sem repetição, na ordem, ou "—". */
const seis = (lista: Iterable<string | undefined>): string => [...new Set([...lista].filter((x): x is string => !!x))].join(', ') || '—';
/** normalizar() do gelic_lib: minúsculas, sem acento, espaços colapsados. */
export const normalizar = (s: string): string => strip((s || '').normalize('NFKD').replace(/\p{Mn}/gu, '').replace(new RegExp(`${S}+`, 'g'), ' ')).toLowerCase();

/** Graus [I]/[R] de todos os checklists da skill (carregar_graus_checklist). */
export const grauDe = (id: string): 'I' | 'R' | undefined => (Object.hasOwn(GRAUS, id) ? GRAUS[id] : undefined);

/** Ids de checklist citados nos achados (_ids_dos_achados). */
function* idsDosAchados(a: Obj): Generator<string> {
  for (const b of Array.isArray(a.blocos) ? a.blocos : []) {
    for (const x of ehObj(b) && Array.isArray(b.achados) ? b.achados : []) if (ehObj(x) && typeof x.checklist === 'string') yield x.checklist;
  }
  for (const x of Array.isArray(a.compatibilidade) ? a.compatibilidade : []) if (ehObj(x) && typeof x.checklist === 'string') yield x.checklist;
}

/**
 * Séries do checklist_status: as da preparação mais as que os achados puxam (series_da_familia): na preparatória,
 * achado com id J inclui a série J; na prorrogação, achado com id C inclui a série C (depois de B).
 */
export function seriesComAchados(familia: Familia, series: readonly string[], achados: unknown): string[] {
  const s = [...series];
  const ids = ehObj(achados) ? [...idsDosAchados(achados)] : [];
  if (familia === 'preparatoria' && !s.includes('J') && ids.some(c => c.startsWith('J'))) s.push('J');
  if (familia === 'prorrogacao' && !s.includes('C') && ids.some(c => c.startsWith('C'))) s.splice(s.indexOf('B') + 1, 0, 'C');
  return s;
}
export const seriesDaFamilia = (f: Familia): readonly string[] => SERIES_FAMILIA[f];

// ---------------------------------------------------------------- esquema estrito (só da extensão)

const CAMPOS: Record<string, readonly string[]> = {
  topo: ['processo', 'objeto', 'verificacao_legal', 'blocos', 'remetente', 'tem_etp', 'fontes_nao_verificadas', 'compatibilidade',
    'checklist_status', 'ausencias', 'limitacoes', 'de_acordo', 'descartados', 'gecont'],
  remetente: ['unidade', 'documento', 'sei', 'destino'],
  bloco: ['documento', 'sei', 'achados'],
  achado: ['item', 'constatacao', 'recomendacao', 'checklist', 'impede'],
  checklist: ['status', 'sei', 'nota'],
  descartado: ['tema', 'motivo'],
  gecont: ['natureza', 'natureza_valor', 'objeto', 'valor', 'valor_sei', 'contrato'],
  contrato: ['numero', 'sei'],
};
const DICA: Record<string, string> = {
  p: "'p' (página) não se usa: a extensão não tem a paginação do processo; cite só o SEI",
  valor: "o valor do despacho à Gecont vai em gecont.valor (com gecont.valor_sei)",
  natureza_valor: 'vai em gecont.natureza_valor',
  vocativo: "use remetente.destino (a unidade, sem vocativo)",
};

function forma(a: Obj): string[] {
  const erros: string[] = [];
  const chaves = (o: Obj, tipo: string, onde: string) => {
    for (const k of Object.keys(o)) if (!CAMPOS[tipo].includes(k)) erros.push(`${onde}campo desconhecido '${k}'${DICA[k] ? ` (${DICA[k]})` : ''}`);
  };
  const texto = (o: Obj, k: string, onde: string) => {
    if (o[k] !== undefined && typeof o[k] !== 'string') erros.push(`${onde}'${k}' deve ser texto`);
  };
  const logico = (o: Obj, k: string, onde: string) => {
    if (o[k] !== undefined && typeof o[k] !== 'boolean') erros.push(`${onde}'${k}' deve ser true/false`);
  };
  const semPagina = (s: unknown, onde: string) => {
    const m = typeof s === 'string' ? RE_PAGINA.exec(s) : null;
    if (m) erros.push(`${onde}cite "SEI n, item x", sem página ("${(s as string).slice(Math.max(0, m.index - 20), m.index + 12)}"): a extensão não tem a paginação do processo`);
  };
  const listaDeTextos = (k: string) => {
    const v = a[k];
    if (v !== undefined && !Array.isArray(v)) erros.push(`${k} deve ser lista de textos`); // cada item: mensagem do Python
  };
  const achado = (x: unknown, onde: string) => {
    if (!ehObj(x)) return; // a mensagem é a do Python
    chaves(x, 'achado', `${onde}: `);
    for (const k of ['item', 'constatacao', 'recomendacao', 'checklist']) texto(x, k, `${onde}: `);
    for (const k of ['item', 'constatacao', 'recomendacao']) semPagina(x[k], `${onde}: '${k}': `);
  };

  chaves(a, 'topo', '');
  semPagina(a.objeto, "objeto: ");
  for (const k of ['tem_etp', 'de_acordo']) logico(a, k, '');
  for (const k of ['fontes_nao_verificadas', 'ausencias', 'limitacoes']) listaDeTextos(k);
  for (const [j, s] of (Array.isArray(a.ausencias) ? a.ausencias : []).entries()) semPagina(s, `ausencias[${j + 1}]: `);
  if (a.remetente !== undefined) {
    if (!ehObj(a.remetente)) erros.push('remetente deve ser objeto {unidade, documento, sei, destino}');
    else {
      chaves(a.remetente, 'remetente', 'remetente: ');
      for (const k of CAMPOS.remetente) texto(a.remetente, k, 'remetente: ');
      semPagina(a.remetente.destino, 'remetente: ');
    }
  }
  for (const [i, b] of (a.blocos as unknown[]).entries()) {
    const onde = `bloco ${i + 1}`;
    if (!ehObj(b)) { erros.push(`${onde}: deve ser objeto {documento, sei, achados}`); continue; }
    chaves(b, 'bloco', `${onde}: `);
    texto(b, 'documento', `${onde}: `);
    texto(b, 'sei', `${onde}: `);
    for (const [j, x] of (Array.isArray(b.achados) ? b.achados : []).entries()) achado(x, `${onde}, achado ${j + 1}`);
  }
  if (a.compatibilidade !== undefined && !Array.isArray(a.compatibilidade)) erros.push('compatibilidade deve ser lista de {item, constatacao, recomendacao, checklist}');
  for (const [j, x] of (Array.isArray(a.compatibilidade) ? a.compatibilidade : []).entries()) achado(x, `compatibilidade ${j + 1}`);
  if (a.checklist_status !== undefined) {
    if (ehObj(a.checklist_status)) { // não objeto: a mensagem é a do Python (só com família)
      for (const [id, e] of Object.entries(a.checklist_status)) {
        if (!ehObj(e)) continue; // a mensagem é a do Python
        chaves(e, 'checklist', `checklist_status[${id}]: `);
        texto(e, 'sei', `checklist_status[${id}]: `);
      }
    }
  }
  if (Array.isArray(a.descartados)) for (const [j, d] of a.descartados.entries()) if (ehObj(d)) chaves(d, 'descartado', `descartados[${j + 1}]: `);
  if (a.gecont !== undefined) {
    const g = a.gecont;
    if (!ehObj(g)) erros.push('gecont deve ser objeto {natureza, natureza_valor, objeto, valor, valor_sei, contrato?}');
    else {
      chaves(g, 'gecont', 'gecont: ');
      for (const k of ['natureza', 'natureza_valor', 'objeto', 'valor', 'valor_sei']) {
        if (typeof g[k] !== 'string' || !strip(g[k] as string)) erros.push(`gecont: '${k}' obrigatório (texto)`);
      }
      semPagina(g.objeto, 'gecont: objeto: ');
      if (g.contrato !== undefined) {
        const c = g.contrato;
        if (!ehObj(c)) erros.push('gecont: contrato deve ser objeto {numero, sei}');
        else {
          chaves(c, 'contrato', 'gecont.contrato: ');
          for (const k of ['numero', 'sei']) if (typeof c[k] !== 'string' || !strip(c[k] as string)) erros.push(`gecont.contrato: '${k}' obrigatório (texto)`);
        }
      }
    }
  }
  return erros;
}

// ---------------------------------------------------------------- validar

/**
 * Confere os achados contra o contexto. Erro impede montar o documento; aviso só informa. Mesmas regras e
 * mensagens do avaliar.validar da skill (com as adaptações do cabeçalho deste arquivo).
 */
export function validarAchados(achados: unknown, contexto: ContextoDvi): Validacao {
  const erros: string[] = [];
  const avisos: string[] = [];
  if (!ehObj(achados)) return { erros: ['achados deve ser objeto (ver o esquema Achados)'], avisos };
  const a = achados;
  for (const [chave, ok, nome] of [
    ['processo', (x: unknown) => typeof x === 'string', 'str'],
    ['objeto', (x: unknown) => typeof x === 'string', 'str'],
    ['blocos', Array.isArray, 'list'],
    ['verificacao_legal', (x: unknown) => typeof x === 'boolean', 'bool'],
  ] as const) {
    if (!ok(a[chave])) erros.push(`campo obrigatório ausente ou de tipo errado: ${chave} (${nome})`);
  }
  if (erros.length) return { erros, avisos };
  erros.push(...forma(a));

  const docs = new Map<string, DocumentoArvore>();
  // dict comprehension do Python: o último com o mesmo número vence
  for (const d of contexto.documentos) if (d.numero) docs.set(d.numero, d);
  const textos = contexto.textos ?? {};
  const textoDe = (d: DocumentoArvore | undefined) => (d && Object.hasOwn(textos, d.numero) ? textos[d.numero] : '');

  if (contexto.processo && a.processo !== contexto.processo) erros.push(`processo ${a.processo} difere do identificado nos autos (${contexto.processo})`);
  if (comprimento(txt(a.objeto)) < 20) erros.push('objeto muito curto: copie a descrição do objeto dos autos');

  let todo: string | undefined;
  const textoTodo = () => (todo ??= contexto.documentos.map(textoDe).join('\n'));
  const valoresDe = (t: string) => new Set([...t.matchAll(RE_VALOR)].map(m => brlParaNumero(m[1])));

  const checarTexto = (onde: string, doc: DocumentoArvore | undefined, t: string) => {
    for (const m of t.matchAll(RE_SEI_TXT)) if (!docs.has(m[1])) erros.push(`${onde}: SEI ${m[1]} citado no texto não existe nos autos`);
    const base = textoDe(doc);
    const valores = [...new Set([...t.matchAll(RE_VALOR)].map(m => m[1]))]
      .sort((x, y) => brlParaNumero(x) - brlParaNumero(y) || (x < y ? -1 : x > y ? 1 : 0));
    let conhecidos: Set<number> | undefined;
    for (const v of valores) {
      conhecidos ??= new Set([...valoresDe(base), ...valoresDe(textoTodo())]);
      if (!conhecidos.has(brlParaNumero(v))) avisos.push(`${onde}: R$ ${v} não localizado em nenhum documento (ok se for resultado de cálculo)`);
    }
    const chave = (x: string) => `${x.slice(-4)}${x.slice(3, 5)}${x.slice(0, 2)}`;
    const datas = [...new Set([...t.matchAll(RE_DATA)].map(m => m[0]))].sort((x, y) => (chave(x) < chave(y) ? -1 : chave(x) > chave(y) ? 1 : 0));
    for (const dt of datas) if (!base.includes(dt) && !textoTodo().includes(dt)) avisos.push(`${onde}: data ${dt} não localizada em nenhum documento`);
  };

  const checarAchado = (onde: string, x: Obj, doc: DocumentoArvore | undefined) => {
    for (const k of ['item', 'constatacao', 'recomendacao']) if (!strip(txt(x[k]))) erros.push(`${onde}: campo '${k}' vazio`);
    if (pyVerdade(x.checklist) && !(typeof x.checklist === 'string' && grauDe(x.checklist))) avisos.push(`${onde}: id de checklist desconhecido: ${pyStr(x.checklist)}`);
    if ('impede' in x && typeof x.impede !== 'boolean') erros.push(`${onde}: 'impede' deve ser true/false`);
    checarTexto(onde, doc, `${txt(x.item)} ${txt(x.constatacao)} ${txt(x.recomendacao)}`);
  };

  const achadosOnde: [string, Obj][] = [];
  for (const [i, b] of (a.blocos as unknown[]).entries()) {
    const onde = `bloco ${i + 1}`;
    if (!ehObj(b)) continue; // já é erro de forma
    if (!strip(txt(b.documento))) erros.push(`${onde}: 'documento' vazio`);
    const sei = strip(txt(b.sei));
    const doc = docs.get(sei);
    if (!sei) erros.push(`${onde} (${pyStr(b.documento)}): 'sei' vazio — todo bloco aponta um documento dos autos`);
    else if (!doc) erros.push(`${onde} (${pyStr(b.documento)}): SEI ${sei} não existe nos autos`);
    const lista = b.achados;
    if (!Array.isArray(lista) || !lista.length) { erros.push(`${onde}: 'achados' deve ser lista com ao menos um item`); continue; }
    for (const [j, x] of lista.entries()) {
      if (!ehObj(x)) { erros.push(`${onde}, achado ${j + 1}: deve ser objeto {item, constatacao, recomendacao, checklist}`); continue; }
      checarAchado(`${onde}, achado ${j + 1}`, x, doc);
      achadosOnde.push([`${onde}, achado ${j + 1}`, x]);
    }
  }
  for (const [j, x] of (Array.isArray(a.compatibilidade) ? a.compatibilidade : []).entries()) {
    if (!ehObj(x)) { erros.push(`compatibilidade ${j + 1}: deve ser objeto {item, constatacao, recomendacao, checklist}`); continue; }
    checarAchado(`compatibilidade ${j + 1}`, x, undefined);
    achadosOnde.push([`compatibilidade ${j + 1}`, x]);
  }
  for (const k of ['ausencias', 'limitacoes', 'fontes_nao_verificadas']) {
    for (const [j, s] of (Array.isArray(a[k]) ? (a[k] as unknown[]) : []).entries()) {
      if (typeof s !== 'string') erros.push(`${k}[${j + 1}] deve ser texto`);
      else checarTexto(`${k}[${j + 1}]`, undefined, s);
    }
  }
  if (a.descartados !== undefined && a.descartados !== null) {
    if (!Array.isArray(a.descartados)) erros.push('descartados deve ser lista de {tema, motivo}');
    else {
      for (const [j, d] of a.descartados.entries()) {
        if (!(ehObj(d) && strip(txt(d.tema)) && strip(txt(d.motivo)))) erros.push(`descartados[${j + 1}]: deve ser objeto {tema, motivo} com os dois textos preenchidos`);
        else checarTexto(`descartados[${j + 1}]`, undefined, `${d.tema} ${d.motivo}`);
      }
    }
  }
  const rem = a.remetente;
  if (ehObj(rem) && pyVerdade(rem.sei) && !docs.has(rem.sei as string)) erros.push(`remetente: SEI ${pyStr(rem.sei)} não existe nos autos`);
  // Só da extensão: o valor da Gecont aponta um documento dos autos, e o valor tem de estar nele.
  const g = a.gecont;
  if (ehObj(g) && typeof g.valor_sei === 'string' && strip(g.valor_sei)) {
    const doc = docs.get(strip(g.valor_sei));
    if (!doc) erros.push(`gecont: SEI ${strip(g.valor_sei)} não existe nos autos`);
    else if (typeof g.valor === 'string') checarTexto('gecont', doc, `R$ ${g.valor.replace(/^\s*R\$\s*/, '')}`);
  }

  const ck = contexto.checklist;
  if (!contexto.comparativo && ck && Object.hasOwn(SERIES_FAMILIA, ck.familia)) {
    const series = seriesComAchados(ck.familia, ck.series, a);
    // Como no Python: o que o checarTexto acha na nota entra na hora; os erros do checklist, no fim dele.
    const doChecklist: string[] = [];
    validarChecklist(a, ck.familia, docs, series, achadosOnde, checarTexto, doChecklist);
    erros.push(...doChecklist);
    if (ehObj(a.checklist_status)) validarChecagens(a.checklist_status, contexto, series, avisos, erros);
  }
  return { erros, avisos };
}

function validarChecklist(a: Obj, familia: Familia, docs: Map<string, DocumentoArvore>, series: string[], achadosOnde: [string, Obj][],
  checarTexto: (onde: string, doc: DocumentoArvore | undefined, t: string) => void, erros: string[]) {
  const lista = CHECKLISTS[ARQUIVO_FAMILIA[familia]];
  const porId = new Set(lista.itens.map(i => i.id));
  const txtSeries = series.join(', ');
  const mapa = a.checklist_status;
  if (!ehObj(mapa)) {
    erros.push('campo obrigatório ausente ou de tipo errado: checklist_status (mapa id → {status, sei, nota}; ver references/achados.md)');
    return;
  }
  const serieFora = (cid: string) => !porId.has(cid) || !series.includes(cid[0]);
  // achados_por_checklist: todos os achados de blocos[] (mesmo de bloco com erro) e de compatibilidade[]
  const comAchado = new Set([...idsDosAchados(a)].filter(Boolean));
  for (const [cid, val] of Object.entries(mapa)) {
    const onde = `checklist_status[${cid}]`;
    if (!ehObj(val)) { erros.push(`${onde}: deve ser objeto {status, sei, nota}`); continue; }
    if (!grauDe(cid)) { erros.push(`${onde}: id desconhecido`); continue; }
    if (serieFora(cid)) { erros.push(`${onde}: série ${cid[0]} não pertence à família ${familia} (séries: ${txtSeries})`); continue; }
    const status = val.status;
    if (!STATUS.includes(status as StatusChecklist)) {
      erros.push(`${onde}: status ${pyRepr(status ?? null)} fora do vocabulário (${STATUS.join(', ')})`);
      continue;
    }
    const { sei, nota } = val;
    let doc: DocumentoArvore | undefined;
    if (status === 'atende' || status === 'nao_atende') {
      if (!(typeof sei === 'string' && strip(sei))) erros.push(`${onde}: ${status} exige 'sei'`);
      else {
        doc = docs.get(strip(sei));
        if (!doc) erros.push(`${onde}: SEI ${sei} não existe nos autos`);
      }
    }
    if (status === 'nao_se_aplica' && !(typeof nota === 'string' && strip(nota))) erros.push(`${onde}: nao_se_aplica exige 'nota' com a justificativa`);
    if (nota !== undefined && nota !== null) {
      if (typeof nota !== 'string') erros.push(`${onde}: 'nota' deve ser texto`);
      else checarTexto(onde, doc, nota);
    }
    if (status === 'nao_atende' && !comAchado.has(cid)) erros.push(`${onde}: nao_atende sem achado correspondente em blocos[] ou compatibilidade[] (campo checklist)`);
  }
  const faltam = lista.itens.filter(i => series.includes(i.serie) && !Object.hasOwn(mapa, i.id)).map(i => i.id);
  if (faltam.length) {
    erros.push(`checklist_status: sem status para ${faltam.join(', ')} (todo item das séries ${txtSeries} precisa de status explícito; use nao_verificado se não examinou)`);
  }
  for (const [onde, x] of achadosOnde) {
    const cid = x.checklist;
    if (typeof cid !== 'string' || !cid || !grauDe(cid)) continue;
    if (serieFora(cid)) { erros.push(`${onde}: id ${cid} de série ${cid[0]} fora da família ${familia} (séries: ${txtSeries})`); continue; }
    const val = mapa[cid];
    const status = ehObj(val) ? val.status : undefined;
    if (status !== 'nao_atende') {
      const esta = status !== undefined && status !== null ? `está ${pyRepr(status)}` : 'sem entrada';
      erros.push(`${onde}: checklist ${cid} exige checklist_status[${cid}].status = nao_atende (${esta})`);
    }
  }
}

function validarChecagens(mapa: Obj, contexto: ContextoDvi, series: string[], avisos: string[], erros: string[]) {
  const status = (cid: string): Obj | undefined => {
    if (!series.includes(cid[0])) return undefined;
    const v = mapa[cid];
    return ehObj(v) && Object.keys(v).length ? v : undefined; // {} é falso no Python
  };
  const atende = (cid: string) => status(cid)?.status === 'atende';
  // documentos_sem_assinatura: na ordem da árvore, um por documento (o dict do Python fica com o último do mesmo SEI)
  const sem = new Map<string, DocumentoArvore>();
  for (const d of contexto.documentos) if (!d.assinado && d.numero) sem.set(d.numero, d);
  const docs = new Map(contexto.documentos.filter(d => d.numero).map(d => [d.numero, d]));
  const seiDe = (v: Obj) => (typeof v.sei === 'string' ? strip(v.sei) : '');

  for (const cid of ITENS_ASSINATURA) {
    const val = status(cid);
    if (!val || val.status !== 'atende' || typeof val.sei !== 'string') continue;
    const sei = strip(val.sei);
    const d = sem.get(sei);
    if (!d) continue;
    if (d.digitalizado) {
      avisos.push(`checklist_status[${cid}]: atende, mas SEI ${sei} é documento digitalizado sem assinatura eletrônica no índice — confira a assinatura manuscrita na imagem (_checagens.md, seção 'Documentos sem assinatura eletrônica')`);
    } else {
      erros.push(`checklist_status[${cid}]: atende, mas SEI ${sei} não tem assinatura eletrônica no índice (_checagens.md) — marque nao_atende com achado, ou cite o SEI do documento assinado`);
    }
  }
  const classeAss = (d: DocumentoArvore) => d.classe ?? (/\brisco/.test(normalizar(d.titulo ?? '')) ? 'riscos' : null);
  for (const [cid, classes] of Object.entries(CLASSES_ASSINATURA)) {
    const val = status(cid);
    if (!val || val.status !== 'atende') continue;
    const citado = seiDe(val);
    if (sem.has(citado)) continue;
    const faltam = [...sem.values()].filter(x => docs.has(x.numero) && classes.includes(classeAss(docs.get(x.numero)!) ?? ''));
    if (!faltam.length) continue;
    const lista = seis(faltam.map(x => x.numero));
    const mesma = docs.has(citado) && classes.includes(classeAss(docs.get(citado)!) ?? '');
    if (mesma || faltam.every(x => x.digitalizado)) {
      avisos.push(`checklist_status[${cid}]: atende citando SEI ${citado || '—'}, mas há peça do item sem assinatura eletrônica no índice: SEI ${lista} (_checagens.md) — confira qual versão vale`);
    } else {
      erros.push(`checklist_status[${cid}]: atende citando SEI ${citado || '—'}, mas a peça do item não tem assinatura eletrônica no índice: SEI ${lista} (_checagens.md) — marque nao_atende com achado; o despacho ou outra peça assinada não supre a assinatura da peça`);
    }
  }
  const a02 = status('A02');
  if (a02 && a02.status === 'atende') {
    const citado = seiDe(a02);
    const outros = [...sem.keys()].filter(s => s !== citado);
    if (outros.length) {
      avisos.push(`checklist_status[A02]: atende, mas há documento(s) sem assinatura eletrônica no índice: SEI ${seis(outros)} (_checagens.md, seção 'Documentos sem assinatura eletrônica') — confira antes de manter atende`);
    }
  }
  const c = contexto.checagens ?? {};
  if (atende('A01') && c.processosDivergentes?.length) {
    avisos.push(`checklist_status[A01]: atende, mas há número de processo diferente do processo dos autos em SEI ${seis(c.processosDivergentes)} (_checagens.md, seção 'Número de processo diferente do processo dos autos (candidatos — conferir)') — confira antes de manter atende`);
  }
  if (atende('A08')) {
    const cit = c.citadosAusentes ?? [];
    const tit = c.tituloConteudo ?? [];
    if (cit.length || tit.length) {
      const partes: string[] = [];
      if (cit.length) partes.push(`${cit.length} documento(s) citado(s) e não localizado(s) no índice (SEI ${seis(cit)}; seção 'Documentos citados e não localizados no índice')`);
      if (tit.length) partes.push(`título do SEI diferente do conteúdo em SEI ${seis(tit)} (seção 'Título do SEI × conteúdo')`);
      avisos.push(`checklist_status[A08]: atende, mas _checagens.md aponta ${partes.join('; ')} — confira antes de manter atende`);
    }
  }
  if (atende('A09') && c.cronologia?.length) {
    avisos.push(`checklist_status[A09]: atende, mas há inversão de datas entre peças (${c.cronologia.map(x => x.regra).join(', ')}; SEI ${seis(c.cronologia.flatMap(x => x.seis))}) (_checagens.md, seção 'Cronologia (candidatos — conferir)') — confira antes de manter atende`);
  }
  const idsMcp = ['P01', 'P03'].filter(cid => status(cid));
  if (idsMcp.length && !idsMcp.some(cid => status(cid)!.status === 'nao_atende') && c.mcpSemProposta?.length) {
    avisos.push(`checklist_status[${idsMcp.join('/')}]: nenhum nao_atende, mas valores do MCP (${c.mcpSemProposta.map(numeroParaBrl).join(', ')}) não aparecem em proposta juntada (_checagens.md, seção 'Valores do MCP sem correspondência em proposta juntada (candidatos — conferir)') — confira`);
  }
}
