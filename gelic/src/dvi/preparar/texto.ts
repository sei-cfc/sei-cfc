/**
 * Apoio de texto da preparação do DVI: porte fiel das funções comuns do scripts/gelic_lib.py da skill gelic
 * (normalizar, regex de data/valor/CNPJ/processo, classe da peça, cabeçalhos e rótulo de conteúdo).
 *
 * Regex do Python → JS: o `\w` e o `\b` do Python sobre str são Unicode; no JS são ASCII. Onde o padrão roda
 * sobre texto normalizado (sem acento) isso não muda nada; onde roda sobre o texto cru e precisa de letra
 * acentuada, o porte troca `\w` por `[\p{L}\p{N}_]` com a flag `u` (ver fatos.ts).
 *
 * Funções puras: sem DOM, sem rede.
 */

/** minúsculas, sem acento, espaços colapsados — para casar títulos (gelic_lib.normalizar). */
export function normalizar(s: string | null | undefined): string {
  // NFKD + tira o que unicodedata.combining() marca (classe de combinação ≠ 0): no português, os acentos
  return (s ?? '').normalize('NFKD').replace(/\p{M}/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * str.splitlines() do Python: quebra em \n, \r\n, \r e nos separadores Unicode, e não devolve a linha vazia
 * depois da última quebra.
 */
export function linhas(texto: string): string[] {
  if (!texto) return [];
  const partes = texto.split(/\r\n|[\n\r\v\f\x1c-\x1e\x85\u2028\u2029]/);
  if (/(?:\r\n|[\n\r\v\f\x1c-\x1e\x85\u2028\u2029])$/.test(texto)) partes.pop();
  return partes;
}

export const RE_DATA = /\b(\d{2})\/(\d{2})\/(\d{4})\b/g;
export const RE_VALOR = /R\$\s*([\d.]+,\d{2})/g;
export const RE_CNPJ = /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g;
export const RE_PROCESSO = /\d{5,20}\.\d{6}\/\d{4}-\d{2}/g;

/** Data simples (dia, mês, ano), comparável pelo número de dias desde a época. */
export interface Dia { d: number; m: number; a: number }

/** datetime.strptime(s, "%d/%m/%Y").date(): null se a data não existe (31/02, mês 13). */
export function paraData(s: string): Dia | null {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s.trim());
  if (!m) return null;
  return diaValido(Number(m[3]), Number(m[2]), Number(m[1]));
}

export function diaValido(a: number, m: number, d: number): Dia | null {
  if (a < 1 || m < 1 || m > 12 || d < 1) return null;
  const dt = new Date(Date.UTC(a, m - 1, d));
  if (a < 100) dt.setUTCFullYear(a);
  if (dt.getUTCFullYear() !== a || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return { d, m, a };
}

const MS_DIA = 86_400_000;
function utc(x: Dia): number {
  const dt = new Date(Date.UTC(x.a, x.m - 1, x.d));
  if (x.a < 100) dt.setUTCFullYear(x.a);
  return dt.getTime();
}
/** (b - a).days */
export const diasEntre = (a: Dia, b: Dia) => Math.round((utc(b) - utc(a)) / MS_DIA);
export function somarDias(x: Dia, n: number): Dia {
  const dt = new Date(utc(x) + n * MS_DIA);
  return { d: dt.getUTCDate(), m: dt.getUTCMonth() + 1, a: dt.getUTCFullYear() };
}
export const compararDias = (a: Dia, b: Dia) => utc(a) - utc(b);
export const fmtData = (x: Dia) => `${String(x.d).padStart(2, '0')}/${String(x.m).padStart(2, '0')}/${String(x.a).padStart(4, '0')}`;
export function hojeLocal(): Dia {
  const h = new Date();
  return { d: h.getDate(), m: h.getMonth() + 1, a: h.getFullYear() };
}

export const brlParaFloat = (s: string) => Number(s.replace(/\./g, '').replace(',', '.'));

/**
 * round(v, 2) do Python. Os dois arredondam o valor binário exato; só diferem no empate exato (x,xx5 que o
 * binário representa sem erro, como 0,125), o que não acontece com valores lidos de "R$ x,yy".
 */
export const arred2 = (v: number) => Number(v.toFixed(2));

/** f"{v:,.2f}" com ponto de milhar e vírgula decimal: "R$ 1.234,56". */
export function floatParaBrl(v: number): string {
  const [inteiro, dec] = Math.abs(v).toFixed(2).split('.');
  return `R$ ${v < 0 ? '-' : ''}${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${dec}`;
}

// ---------------------------------------------------------------- classe da peça (gelic_lib.CLASSES_CONTEUDO)

/** A ORDEM decide o empate: vale a primeira classe que casa (as mais específicas vêm antes). */
export const CLASSES_CONTEUDO: readonly [string, RegExp][] = [
  ['parametros', /parametros prioritarios/],
  ['pesquisa', /pesquisa de (mercado|precos)/],
  ['justificativa_preco', /justificativa de preco/],
  ['mcp', /mapa (de )?comparativo|\bmcp\b/],
  ['contratacao_direta', /inexigibilidade|dispensa de licitacao|contratacao direta/],
  ['tr', /termo de referencia|projeto basico/],
  ['etp', /estudo tecnico preliminar/],
  ['dfd', /formalizacao d[ae] demanda|\bdfd\b/],
  ['proposta', /^proposta|proposta (comercial|tecnica|de precos)|orcamento/],
  ['portaria', /^portaria/],
  ['cientificacao', /cientificacao/],
  ['despacho', /^despacho|encaminh/],
  ['ata_rp', /ata de registro de precos/],
];

export function classe(textoNormalizado: string): string | null {
  for (const [nome, p] of CLASSES_CONTEUDO) if (p.test(textoNormalizado)) return nome;
  return null;
}

const RE_MARCA_PAGINA = /^\[\[p\. \d+\]\]/gm;
const RE_SECAO_NUMERADA = /^\s*\d+\s*[.)–-]/;
const DESCARTE_CABECALHO = ['saus quadra', 'telefone', 'www.', 'cep ', 'processo', 'documento assinado', 'autenticidade', 'codigo'];

/** Linhas em caixa alta da 1ª página que nomeiam a peça (gelic_lib.cabecalhos). */
export function cabecalhos(texto: string): string[] {
  const marcas = [...texto.matchAll(RE_MARCA_PAGINA)];
  if (marcas.length >= 2) texto = texto.slice(0, marcas[1].index);
  const saida: string[] = [];
  for (const linha of linhas(texto)) {
    if (linha.startsWith('[[p.')) continue;
    if (RE_SECAO_NUMERADA.test(linha)) break;
    const limpa = linha.replace(/\s+/g, ' ').trim();
    const letras = [...limpa].filter(c => /\p{L}/u.test(c));
    if (letras.length < 6 || [...limpa].length > 120 || /^\p{Nd}/u.test(limpa)) continue;
    if (letras.filter(c => /\p{Lu}/u.test(c)).length < 0.8 * letras.length) continue;
    const n = normalizar(limpa);
    if (n.startsWith('conselho federal de contabilidade') || DESCARTE_CABECALHO.some(x => n.includes(x))) continue;
    saida.push(limpa);
  }
  return saida;
}

/** Cabeçalho que revela o conteúdo quando a peça foi cadastrada no SEI com o tipo de outra (D-17). */
export function rotuloConteudo(titulo: string, texto: string): string | null {
  const classeTitulo = classe(normalizar((titulo ?? '').split(' - ')[0]));
  for (const h of cabecalhos(texto)) {
    const c = classe(normalizar(h));
    if (c && c !== classeTitulo) return h.replace(/\s+/g, ' ').trim();
  }
  return null;
}

/** Ocorrências de uma regex global (cópia, para não herdar lastIndex). */
export function todas(re: RegExp, texto: string): RegExpExecArray[] {
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
  return [...texto.matchAll(g)] as RegExpExecArray[];
}
