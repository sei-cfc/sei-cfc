/**
 * O mínimo da semântica do Python de que o motor de modelos precisa para dar o MESMO texto que o
 * scripts/preencher.py da skill gelic: str() e repr() de valores vindos de JSON, o conjunto de
 * espaços de str.strip()/\s e a "verdade" do Python. Funções puras.
 *
 * Por que não usar o equivalente JS direto: String(true) é "true" e o Python imprime "True";
 * String([1, 2]) é "1,2" e o Python, "[1, 2]"; trim() do JS não tira \x1c–\x1f nem \x85 e tira
 * ﻿, ao contrário do strip(). Cada diferença dessas mudaria o documento ou a mensagem de erro.
 */

/** Caracteres para os quais str.isspace() é verdadeiro — o que strip() tira e o que \s casa no `re` do Python. */
export const ESPACO = '\\t\\n\\v\\f\\r\\x1c-\\x1f \\x85\\xa0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000';
const BORDA = new RegExp(`^[${ESPACO}]+|[${ESPACO}]+$`, 'g');
const FIM = new RegExp(`[${ESPACO}]+$`);

/** str.strip() sem argumento. */
export const strip = (s: string): string => s.replace(BORDA, '');
/** str.rstrip() sem argumento. */
export const rstrip = (s: string): string => s.replace(FIM, '');

export type Dicionario = Record<string, unknown>;

/** isinstance(x, dict) para o que vem de JSON. */
export function ehDict(x: unknown): x is Dicionario {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}
/** `chave in dict` (só chaves próprias: "constructor" não é chave de um dict do JSON). */
export function tem(d: Dicionario, chave: string): boolean {
  return Object.prototype.hasOwnProperty.call(d, chave);
}

/** bool(x) do Python. */
export function pyBool(x: unknown): boolean {
  if (x === null || x === undefined || x === false || x === 0 || x === '') return false;
  if (Array.isArray(x)) return x.length > 0;
  if (ehDict(x)) return Object.keys(x).length > 0;
  return true;
}

/**
 * Número do JSON como o Python o imprime. O JSON.parse não distingue 2 de 2.0: inteiro sai como
 * int do Python ("2"); fracionário, como repr(float) (notação científica abaixo de 1e-4 e a partir de 1e16).
 */
function numero(x: number): string {
  if (Number.isNaN(x)) return 'nan';
  if (!Number.isFinite(x)) return x > 0 ? 'inf' : '-inf';
  if (Number.isInteger(x)) return BigInt(x).toString();
  const [mant, expTxt] = x.toExponential().split('e');
  const exp = Number(expTxt);
  if (exp < -4 || exp >= 16) return `${mant}e${exp < 0 ? '-' : '+'}${String(Math.abs(exp)).padStart(2, '0')}`;
  const sinal = mant.startsWith('-') ? '-' : '';
  const digitos = mant.replace('-', '').replace('.', '');
  if (exp < 0) return `${sinal}0.${'0'.repeat(-exp - 1)}${digitos}`;
  return `${sinal}${digitos.slice(0, exp + 1).padEnd(exp + 1, '0')}.${digitos.slice(exp + 1)}`;
}

/** Não imprimíveis para str.isprintable() (Cc, Cf, Cs, Co, Cn, Zl, Zp, Zs menos o espaço): repr() os escapa. */
const NAO_IMPRIMIVEL = /[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}\p{Zl}\p{Zp}\p{Zs}]/u;

function reprTexto(s: string): string {
  const aspa = s.includes("'") && !s.includes('"') ? '"' : "'";
  let saida = aspa;
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (ch === aspa || ch === '\\') saida += `\\${ch}`;
    else if (ch === '\n') saida += '\\n';
    else if (ch === '\r') saida += '\\r';
    else if (ch === '\t') saida += '\\t';
    else if (ch === ' ' || (cp > 0x20 && cp < 0x7f)) saida += ch;
    else if (NAO_IMPRIMIVEL.test(ch)) {
      const h = cp.toString(16);
      saida += cp <= 0xff ? `\\x${h.padStart(2, '0')}` : cp <= 0xffff ? `\\u${h.padStart(4, '0')}` : `\\U${h.padStart(8, '0')}`;
    } else saida += ch;
  }
  return saida + aspa;
}

/** repr(x) do Python para um valor de JSON (aparece nas mensagens de recusa: `dados trazem '8666'`). */
export function pyRepr(x: unknown): string {
  return typeof x === 'string' ? reprTexto(x) : pyStr(x);
}

/** str(x) do Python para um valor de JSON (é o que vai para o documento). */
export function pyStr(x: unknown): string {
  if (typeof x === 'string') return x;
  if (x === null || x === undefined) return 'None';
  if (x === true) return 'True';
  if (x === false) return 'False';
  if (typeof x === 'number') return numero(x);
  if (Array.isArray(x)) return `[${x.map(pyRepr).join(', ')}]`;
  if (ehDict(x)) return `{${Object.entries(x).map(([k, v]) => `${reprTexto(k)}: ${pyRepr(v)}`).join(', ')}}`;
  return String(x);
}

/** Primeira letra maiúscula (s[:1].upper() + s[1:]), por ponto de código como no Python. */
export function capitalizarPrimeira(s: string): string {
  const [primeira = '', ...resto] = Array.from(s);
  return primeira.toUpperCase() + resto.join('');
}
