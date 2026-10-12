/**
 * Formato e documento da análise da Gelic: porte do render.py da skill gelic (decidir, ordenado, resumo e os
 * corpos do DVI, da devolução e do comparativo), com os MESMOS textos fixos e a mesma ordem. O despacho à
 * Gecont não é desenhado aqui: sai do modelo despacho-gecont-reserva pelo motor de modelos (preencher +
 * paraHtmlSei), com os dados montados destes achados. Paridade em tests/dvi-montar.ts.
 *
 * O que muda em relação ao Python, e por quê:
 *  - Sai só o CORPO para o editor do SEI, com classes do SEI: cabeçalho do órgão, título do tipo, número do
 *    processo e assinaturas vêm do próprio SEI (o tipo de documento "DVI" ou "Despacho" e a assinatura
 *    eletrônica). Não há versão de revisão (grifo) nem a faixa de "fundamentação não conferida": a revisão é a
 *    prévia do cartão de aprovação, e fundamentação não conferida e limitações vão ao chat (`paraOChat`), nunca
 *    ao documento (convenção da Gelic). Por isso `limitacoes` não sai no corpo.
 *  - Antes das observações do DVI entra o rótulo "Observações:", como nos DVIs reais da Gelic.
 *  - "De acordo. Encaminhe-se." sai como parágrafo no fim do corpo; a assinatura da Gerência Executiva é a do SEI.
 *  - Recusas citam os parâmetros desta função (pedido, forcar), não as flags da linha de comando.
 *  - A ordem dos achados por página (o Python ordena pela página do `item`/`p`) fica como veio: na extensão não há
 *    página. Os blocos (SEI crescente) e a compatibilidade (menor SEI citado) seguem a regra do Python.
 * Funções puras: sem DOM, sem rede.
 */
import { DOCUMENTOS } from '../../documentos/catalogo';
import { brl, ErroCalculo, extenso, fmtBrl } from '../../modelos/calculos';
import { paraHtmlSei, preencher } from '../../modelos/motor';
import { pyStr, strip } from '../../modelos/python';
import { TEXTOS_FIXOS } from './dados.gerado';
import { grauDe, RE_SEI_TXT, STATUS, validarAchados, type Achado, type Achados, type ContextoDvi, type Validacao } from './achados';

export type Formato = 'dvi' | 'devolucao' | 'gecont' | 'comparativo';
/** O que o usuário pediu (o --dvi / --despacho[=...] do Python); 'despacho' = qualquer despacho, nunca DVI. */
export type Pedido = 'dvi' | 'devolucao' | 'gecont' | 'despacho';
/** Os nomes do FORMATOS do render.py (aparecem no resumo). */
export const NOME_FORMATO: Readonly<Record<Formato, string>> = { dvi: 'DVI', devolucao: 'Despacho-devolucao', gecont: 'Despacho-Gecont', comparativo: 'Comparativo' };

/** Recusa de formato: o texto do documento afirmaria algo falso, ou a regra indica outro formato. */
export class ErroFormato extends Error {
  override name = 'ErroFormato';
}
/** Achados com erro: nada é montado. */
export class ErroMontagem extends Error {
  override name = 'ErroMontagem';
  constructor(readonly erros: string[], readonly avisos: string[]) {
    super(`achados com erros; corrija e tente de novo (avisos não bloqueiam):\n${erros.map(e => `ERRO   ${e}`).join('\n')}`);
  }
}

type Obj = Record<string, unknown>;
const ehObj = (x: unknown): x is Obj => typeof x === 'object' && x !== null && !Array.isArray(x);
const lista = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const verdade = (x: unknown): boolean => !(x === undefined || x === null || x === false || x === 0 || x === '');

/** Achado impeditivo: pelo grau do id do checklist; sem id conhecido, pelo campo `impede`. */
export function impede(a: Partial<Achado>): boolean {
  const cid = a.checklist;
  if (verdade(cid) && typeof cid === 'string' && grauDe(cid)) return grauDe(cid) === 'I';
  return verdade(a.impede);
}
const haImpeditivo = (ach: Achados) =>
  lista(ach.blocos).some(b => ehObj(b) && lista(b.achados).some(a => ehObj(a) && impede(a))) || lista(ach.compatibilidade).some(a => ehObj(a) && impede(a));

/**
 * O formato pela regra fixa do render.py: sem DVI anterior desta etapa → DVI; com DVI anterior e achado
 * impeditivo → devolução; sem impeditivo → despacho à Gecont; comparativo → comparativo. O pedido só vale se
 * for compatível; devolução sem DVI anterior e Gecont com impeditivo são sempre recusados (o texto afirmaria
 * algo falso); DVI ou devolução contra a regra só com `forcar`.
 */
export function decidirFormato(achados: Achados, contexto: Pick<ContextoDvi, 'dviAnterior' | 'comparativo'>, pedido?: Pedido, forcar = false): Formato {
  const dvi = contexto.dviAnterior || null;
  if (pedido === 'despacho') {
    if (!dvi) throw new ErroFormato("recusado: pedido 'despacho' exige DVI anterior desta etapa nos autos; não há. O formato correto é DVI.");
    pedido = undefined;
  }
  if (contexto.comparativo) return 'comparativo';
  const ha = haImpeditivo(achados);
  const auto: Formato = !dvi ? 'dvi' : ha ? 'devolucao' : 'gecont';
  if (pedido === undefined || pedido === auto) return auto;
  if (pedido === 'devolucao' && !dvi) {
    throw new ErroFormato("recusado: despacho de devolução exige DVI anterior desta etapa nos autos; não há. O formato correto é DVI (sem pedido ou com pedido 'dvi').");
  }
  if (pedido === 'gecont' && ha) {
    throw new ErroFormato(`recusado: há achado impeditivo (impede=true ou checklist [I]); o despacho à Gecont afirmaria saneamento inexistente. O formato correto é ${dvi ? 'devolução' : 'DVI'}.`);
  }
  if (pedido === 'dvi' && !forcar) throw new ErroFormato(`a regra indica '${auto}' (há DVI anterior SEI ${dvi}). Use forcar: true para emitir um novo DVI mesmo assim.`);
  if (pedido === 'devolucao' && auto === 'gecont' && !forcar) throw new ErroFormato('nenhum achado impeditivo: a regra indica despacho à Gecont. Use forcar: true para devolver mesmo assim.');
  return pedido;
}

// ---------------------------------------------------------------- ordem (ordenado do render.py)

const RE_PAGS = /\bpp?\.\s*(\d+)((?:\s*(?:,|e|a|–|-)\s*\d+)*)/g;
/** Páginas citadas ("p. 3, 5 e 7", "pp. 9–11"), para a ordem dos achados (só no resumo de achados com erro). */
function paginasCitadas(texto: string): Set<number> {
  const pags = new Set<number>();
  for (const m of texto.matchAll(RE_PAGS)) {
    let anterior = Number(m[1]);
    pags.add(anterior);
    for (const [, sep, nTxt] of (m[2] || '').matchAll(/(,|e|a|–|-)\s*(\d+)/g)) {
      const n = Number(nTxt);
      if ('a–-'.includes(sep) && n >= anterior) for (let p = anterior; p <= n; p++) pags.add(p);
      else pags.add(n);
      anterior = n;
    }
  }
  return pags;
}
const pagAchado = (a: Obj): number | null => {
  if (typeof a.p === 'number' && Number.isInteger(a.p)) return a.p;
  const p = [...paginasCitadas(typeof a.item === 'string' ? a.item : '')];
  return p.length ? Math.min(...p) : null;
};
const numSei = (s: unknown): number | null => {
  const d = pyStr(verdade(s) ? s : '').replace(/\D/g, '');
  return d ? Number(d) : null;
};
const menorSeiCitado = (a: Obj): number | null => {
  const t = `${typeof a.item === 'string' ? a.item : ''} ${typeof a.constatacao === 'string' ? a.constatacao : ''}`;
  const s = [...t.matchAll(RE_SEI_TXT)].map(m => Number(m[1]));
  return s.length ? Math.min(...s) : null;
};
/** Sem valor → fim; Array.sort é estável, como o sorted() do Python. */
const porChave = <T>(itens: T[], chave: (x: T) => number | null): T[] =>
  itens.map(x => [x, chave(x)] as const).sort(([, a], [, b]) => (a === null ? (b === null ? 0 : 1) : b === null ? -1 : a - b)).map(([x]) => x);

interface Ordenado { blocos: { documento: unknown; sei: unknown; achados: Obj[] }[]; compatibilidade: Obj[] }
function ordenado(ach: Achados): Ordenado {
  const blocos = lista(ach.blocos).filter(ehObj).map(b => ({ documento: b.documento, sei: b.sei, achados: porChave(lista(b.achados).filter(ehObj), pagAchado) }));
  return { blocos: porChave(blocos, b => numSei(b.sei)), compatibilidade: porChave(lista(ach.compatibilidade).filter(ehObj), menorSeiCitado) };
}

// ---------------------------------------------------------------- resumo (gelic.py resumo)

const primeiros = (s: unknown, n: number) => [...pyStr(s ?? '')].slice(0, n).join('');

function resumoChecklist(ach: Obj): string {
  const cs = ach.checklist_status;
  if (!ehObj(cs)) return 'Check-list: campo checklist_status ausente';
  const contagem = new Map(STATUS.map(s => [s as string, 0]));
  let invalidos = 0;
  for (const e of Object.values(cs)) {
    const st = ehObj(e) ? e.status : undefined;
    if (typeof st === 'string' && contagem.has(st)) contagem.set(st, contagem.get(st)! + 1);
    else invalidos += 1;
  }
  let t = STATUS.map(s => `${s} ${contagem.get(s)}`).join(' · ');
  if (invalidos) t += ` · inválido ${invalidos}`;
  return `Check-list: ${t} (${Object.keys(cs).length} itens)`;
}

/** Uma linha por achado, como o `gelic.py resumo` (com os erros e avisos no fim). */
export function resumo(ach: Achados, formato: Formato, validacao: Validacao): string {
  const L = [`Formato decidido: ${NOME_FORMATO[formato]}`, `Processo: ${pyStr(ach.processo)}`, resumoChecklist(ach as unknown as Obj), ''];
  const o = ordenado(ach);
  const grau = (a: Obj) => (impede(a) ? 'I' : 'R');
  for (const b of o.blocos) for (const a of b.achados) L.push(`- [${grau(a)}] ${pyStr(b.documento)} (SEI ${pyStr(b.sei)}) · ${pyStr(a.item)}: ${primeiros(a.constatacao, 140)}`);
  for (const a of o.compatibilidade) L.push(`- [${grau(a)}] Compatibilidade · ${pyStr(a.item)}: ${primeiros(a.constatacao, 140)}`);
  for (const s of lista(ach.ausencias)) L.push(`- [texto corrido] ${primeiros(s, 140)}`);
  for (const s of lista(ach.limitacoes)) L.push(`- [limitação, só no chat] ${primeiros(s, 140)}`);
  if (ach.verificacao_legal === false) L.push('- ⚠ fundamentação legal não verificada na fonte oficial (o aviso vai ao chat, não ao documento)');
  for (const d of lista(ach.descartados)) if (ehObj(d)) L.push(`- [descartado] ${pyStr(d.tema ?? '')} — ${pyStr(d.motivo ?? '')}`);
  L.push('', ...validacao.erros.map(e => `ERRO   ${e}`), ...validacao.avisos.map(a => `AVISO  ${a}`));
  return L.join('\n');
}

// ---------------------------------------------------------------- corpo (classes do editor do SEI)

export type ClasseSei = 'Texto_Alinhado_Esquerda' | 'Texto_Justificado_Recuo_Primeira_Linha' | 'Texto_Justificado' | 'Texto_Alinhado_Esquerda_Maiusc_Negrito' | 'Texto_Centralizado_Maiusculas_Negrito';
export type BlocoDvi =
  | { tipo: 'paragrafo'; classe: ClasseSei; texto: string }
  /** Item | Constatação | Recomendação; a primeira linha é o cabeçalho. */
  | { tipo: 'tabela'; linhas: [string, string, string][] };

const p = (classe: ClasseSei, texto: string): BlocoDvi => ({ tipo: 'paragrafo', classe, texto });
const CABECA: [string, string, string] = ['Item', 'Constatação', 'Recomendação'];

function blocosAchados(ach: Achados, soImpeditivos: boolean): BlocoDvi[] {
  const o = ordenado(ach);
  const saida: BlocoDvi[] = [];
  let n = 0;
  const tabela = (itens: Obj[]): BlocoDvi => ({ tipo: 'tabela', linhas: [CABECA, ...itens.map(a => [pyStr(a.item ?? ''), pyStr(a.constatacao), pyStr(a.recomendacao)] as [string, string, string])] });
  for (const b of o.blocos) {
    const itens = b.achados.filter(a => !soImpeditivos || impede(a));
    if (!itens.length) continue;
    n += 1;
    saida.push(p('Texto_Alinhado_Esquerda_Maiusc_Negrito', `${n}) ${pyStr(b.documento)} (SEI ${pyStr(b.sei)})`), tabela(itens));
  }
  const comp = o.compatibilidade.filter(a => !soImpeditivos || impede(a));
  if (comp.length) {
    n += 1;
    saida.push(p('Texto_Alinhado_Esquerda_Maiusc_Negrito', `${n}) Compatibilidade entre os documentos`), tabela(comp));
  }
  for (const s of lista(ach.ausencias)) saida.push(p('Texto_Justificado_Recuo_Primeira_Linha', pyStr(s)));
  return saida;
}

/** Endereçamento à unidade ("À Gerência de ..."), sem vocativo. */
function destino(ach: Achados): string {
  const rem = ach.remetente ?? {};
  return `${strip(rem.destino || TEXTOS_FIXOS.destino_padrao).replace(/[,.]+$/, '')}.`;
}
const deAcordo = (ach: Achados): BlocoDvi[] => (verdade(ach.de_acordo) ? [p('Texto_Justificado', 'De acordo. Encaminhe-se.')] : []);

function corpoDvi(ach: Achados): BlocoDvi[] {
  const rem = ach.remetente ?? {};
  const abertura = rem.documento && rem.sei
    ? `encaminhado por ${rem.unidade || 'a unidade demandante'} por meio do ${rem.documento} (SEI ${rem.sei})`
    : 'instruído pelos documentos juntados pela unidade demandante';
  const obs = [...TEXTOS_FIXOS.observacoes];
  if (verdade(ach.tem_etp)) obs.splice(1, 0, TEXTOS_FIXOS.observacao_etp);
  return [
    p('Texto_Alinhado_Esquerda', destino(ach)),
    p('Texto_Justificado_Recuo_Primeira_Linha', `Trata o presente processo de ${ach.objeto}`),
    p('Texto_Justificado_Recuo_Primeira_Linha', `O processo foi protocolado na Gerência de Licitações e Contratos, ${abertura} e, após triagem inicial de sua composição, faço as seguintes considerações:`),
    ...blocosAchados(ach, false),
    p('Texto_Alinhado_Esquerda', 'Observações:'),
    ...obs.map((o, i) => p('Texto_Justificado', `${i + 1}) ${o}`)),
    ...deAcordo(ach),
  ];
}

function corpoDevolucao(ach: Achados, dvi: string): BlocoDvi[] {
  return [
    p('Texto_Alinhado_Esquerda', destino(ach)),
    p('Texto_Justificado_Recuo_Primeira_Linha', `Trata o presente processo de ${ach.objeto}`),
    p('Texto_Justificado_Recuo_Primeira_Linha', `Em atenção ao DVI (SEI ${dvi}) e aos documentos apresentados pela unidade demandante, procedeu-se ao reexame dos apontamentos. Permanecem pendentes os seguintes pontos:`),
    ...blocosAchados(ach, true),
    p('Texto_Justificado_Recuo_Primeira_Linha', 'Diante do exposto, encaminham-se os autos à unidade demandante para análise e manifestação quanto aos apontamentos remanescentes.'),
    ...deAcordo(ach),
  ];
}

function corpoComparativo(ach: Achados): BlocoDvi[] {
  return [
    p('Texto_Centralizado_Maiusculas_Negrito', 'Verificação de instrução processual'),
    p('Texto_Justificado', `Processo SEI n.º ${ach.processo} · comparativo · ${ach.objeto}`),
    ...blocosAchados(ach, false),
  ];
}

const escapar = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const par = (classe: string, texto: string) => `<p class="${classe}">${texto.split('\n').map(escapar).join('<br>')}</p>`;
const LARGURAS = ['15%', '42%', '43%'];

/** O corpo para o editor do SEI: só classes de parágrafo e de tabela do SEI, todo texto escapado. */
export function paraHtmlDvi(blocos: readonly BlocoDvi[]): string {
  return blocos.map(b => {
    if (b.tipo === 'paragrafo') return par(b.classe, b.texto);
    const linhas = b.linhas.map((l, i) => `<tr>${l.map((c, j) => (i === 0
      ? `<td width="${LARGURAS[j]}">${par('Tabela_Texto_Centralizado', c)}</td>`
      : `<td>${par(j === 0 ? 'Tabela_Texto_Alinhado_Esquerda' : 'Tabela_Texto_Justificado', c)}</td>`)).join('')}</tr>`);
    return `<table border="1" style="border-collapse:collapse" width="100%"><tbody>${linhas.join('')}</tbody></table>`;
  }).join('\n');
}
/** Texto simples do corpo (prévia no chat): parágrafos separados por linha em branco; tabela em "a | b | c". */
const paraTexto = (blocos: readonly BlocoDvi[]): string =>
  blocos.map(b => (b.tipo === 'paragrafo' ? b.texto : b.linhas.map(l => l.join(' | ')).join('\n'))).join('\n\n');

// ---------------------------------------------------------------- despacho à Gecont (modelo)

/** Os dados do modelo despacho-gecont-reserva a partir dos achados (o extenso sai do código, nunca da IA). */
export function dadosGecont(ach: Achados): Record<string, unknown> {
  const g = ach.gecont;
  if (!g) throw new ErroMontagem(["despacho à Gecont exige o campo 'gecont' ({natureza, natureza_valor, objeto, valor, valor_sei}) nos achados"], []);
  let valor;
  try {
    valor = brl(g.valor);
  } catch (e) {
    if (e instanceof ErroCalculo) throw new ErroMontagem([`valor inválido para o despacho à Gecont: ${e.message}`], []);
    throw e;
  }
  return {
    processo: ach.processo,
    objeto: { valor: g.objeto },
    natureza: g.natureza,
    natureza_valor: g.natureza_valor,
    valor: { valor: fmtBrl(valor), sei: g.valor_sei },
    valor_extenso: extenso(valor),
    ...(g.contrato ? { contrato: { numero: { valor: g.contrato.numero, sei: g.contrato.sei }, sei: g.contrato.sei } } : {}),
  };
}

// ---------------------------------------------------------------- montar

export interface TipoSei { tipo: string; nomeArvore?: string }
export interface DocumentoMontado {
  formato: Formato;
  /** Tipo do documento no SEI e nome na árvore (catálogo da Gelic); null no comparativo, que não vai ao SEI. */
  tipoSei: TipoSei | null;
  /** Corpo para o editor do SEI (documento.criar/documento.editar). */
  html: string;
  /** O mesmo corpo em texto simples, para a prévia. */
  texto: string;
  /** Blocos do DVI/devolução/comparativo (no Gecont, vazio: o corpo é o do modelo). */
  blocos: BlocoDvi[];
  /** Uma linha por achado (o `gelic.py resumo`). */
  resumo: string;
  /** Avisos do validador (não bloqueiam). */
  avisos: string[];
  /** O que vai ao chat e nunca ao documento: fundamentação não conferida e limitações. */
  paraOChat: string[];
  /** Só no Gecont: os dados do modelo despacho-gecont-reserva. */
  dadosModelo?: Record<string, unknown>;
}

const TIPO_SEI: Record<Exclude<Formato, 'comparativo'>, TipoSei> = Object.fromEntries((['dvi', 'devolucao', 'gecont'] as const).map(id => {
  const t = DOCUMENTOS.find(d => d.id === id)!.tipoSei!;
  return [id, { tipo: t.tipo, ...(t.nomeArvore ? { nomeArvore: t.nomeArvore } : {}) }];
})) as Record<Exclude<Formato, 'comparativo'>, TipoSei>;

function paraOChat(ach: Achados): string[] {
  const saida: string[] = [];
  if (ach.verificacao_legal === false) {
    const fontes = ach.fontes_nao_verificadas ?? [];
    saida.push('Atenção: a fundamentação normativa deste documento não foi conferida na fonte oficial nesta sessão (sem acesso à rede). '
      + `Confira a redação vigente dos dispositivos citados antes de assinar.${fontes.length ? `\nDispositivos citados sem conferência: ${fontes.join('; ')}` : ''}`);
  }
  for (const l of ach.limitacoes ?? []) saida.push(`Limitação (não vai no documento): ${l}`);
  return saida;
}

const pedidoDe = (f: Formato): Pedido | undefined => (f === 'comparativo' ? undefined : f);

/**
 * O resumo antes de escrever (o `gelic.py resumo`): valida, decide o formato e lista uma linha por achado,
 * com os erros e avisos no fim. Recusa de formato lança ErroFormato; achados sem a forma mínima, ErroMontagem.
 */
export function resumirAchados(achados: unknown, contexto: ContextoDvi, pedido?: Pedido, forcar = false): { formato: Formato; resumo: string; validacao: Validacao } {
  if (pedido === 'despacho' && !contexto.dviAnterior) decidirFormato({} as Achados, contexto, pedido);
  const validacao = validarAchados(achados, contexto);
  if (!ehObj(achados) || !Array.isArray(achados.blocos)) throw new ErroMontagem(validacao.erros, validacao.avisos);
  const ach = achados as unknown as Achados;
  const formato = decidirFormato(ach, contexto, pedido, forcar);
  if (formato === 'gecont' && !ach.gecont) validacao.erros.push("despacho à Gecont exige o campo 'gecont' ({natureza, natureza_valor, objeto, valor, valor_sei}) nos achados");
  return { formato, resumo: resumo(ach, formato, validacao), validacao };
}

/**
 * Monta o documento do formato pedido. Valida antes (erro → ErroMontagem, nada sai) e confere o formato contra a
 * regra (incompatível → ErroFormato); `forcar` é o --forcar do Python (DVI ou devolução contra a regra).
 */
export function montarDocumento(formato: Formato, achados: unknown, contexto: ContextoDvi, opcoes: { forcar?: boolean } = {}): DocumentoMontado {
  const { formato: decidido, resumo: linhas, validacao } = resumirAchados(achados, contexto, pedidoDe(formato), opcoes.forcar ?? false);
  if (decidido !== formato) throw new ErroFormato(`a regra indica '${decidido}', não '${formato}'`);
  if (validacao.erros.length) throw new ErroMontagem(validacao.erros, validacao.avisos);
  const ach = achados as Achados;
  const base = { formato, resumo: linhas, avisos: validacao.avisos, paraOChat: paraOChat(ach) };
  if (formato === 'gecont') {
    const dados = dadosGecont(ach);
    const r = preencher('despacho-gecont-reserva', dados);
    return { ...base, tipoSei: TIPO_SEI.gecont, html: paraHtmlSei(r.blocos), texto: r.texto, blocos: [], avisos: [...base.avisos, ...r.avisos], dadosModelo: dados };
  }
  const blocos = formato === 'dvi' ? corpoDvi(ach) : formato === 'devolucao' ? corpoDevolucao(ach, contexto.dviAnterior!) : corpoComparativo(ach);
  return { ...base, tipoSei: formato === 'comparativo' ? null : TIPO_SEI[formato], html: paraHtmlDvi(blocos), texto: paraTexto(blocos), blocos };
}

