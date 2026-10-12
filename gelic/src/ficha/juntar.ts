/**
 * A junção por campo dos dados da contratação (desenho: "Junção por campo e conflito"). Três valores por campo: base
 * (o que estava nos dados quando a pessoa começou), meu (o formulário) e deles (os dados agora). Só os `campos` desta
 * peça entram na conta; os outros ficam como estão em `deles`. Puro; vai também no bundle do selo (ASCII).
 */
import { temValor } from '../modelos/analise-cfc';

export interface Conflito { campo: string; meu: unknown; deles: unknown }
export interface Juncao {
  /** `deles` com a decisão de cada campo; no conflito fica o deles até a pessoa escolher. */
  resultado: Record<string, unknown>;
  conflitos: Conflito[];
  /** Campos desta peça que mudaram só do lado deles: entram no formulário. */
  trazidos: string[];
}

/** Para comparar: vazio vira null, texto sem os espaços das pontas, objeto com as chaves em ordem e sem as vazias. */
function normal(v: unknown): unknown {
  if (!temValor(v)) return null;
  if (typeof v === 'string') return v.trim();
  if (Array.isArray(v)) return v.map(normal);
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    return Object.fromEntries(Object.keys(o).sort().map(k => [k, normal(o[k])] as const).filter(([, x]) => x !== null));
  }
  return v;
}
export const iguais = (a: unknown, b: unknown) => JSON.stringify(normal(a)) === JSON.stringify(normal(b));

export function juntar(base: Readonly<Record<string, unknown>>, meus: Readonly<Record<string, unknown>>, deles: Readonly<Record<string, unknown>>,
  campos: readonly string[]): Juncao {
  const resultado: Record<string, unknown> = { ...deles };
  const conflitos: Conflito[] = [];
  const trazidos: string[] = [];
  const por = (k: string, v: unknown) => { if (temValor(v)) resultado[k] = v; else delete resultado[k]; };
  for (const k of campos) {
    const b = base[k], m = meus[k], d = deles[k];
    // só eles mudaram (ou ninguém): fica o deles
    if (iguais(m, b)) { if (!iguais(d, b)) trazidos.push(k); continue; }
    // só eu mudei, ou os dois chegaram ao mesmo valor
    if (iguais(d, b) || iguais(m, d)) { por(k, m); continue; }
    conflitos.push({ campo: k, meu: m, deles: d });
  }
  return { resultado, conflitos, trazidos };
}
