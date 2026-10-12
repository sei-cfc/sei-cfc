/**
 * Os dados da contratação no PCA (a "ficha" da API v1.1: `dados` livre da extensão, o PCA só guarda e versiona). O
 * formato que a extensão lê e grava: {esquema, respostas: campo → valor, situacao: nº SEI → roteiro}. O que ela não
 * conhece (chaves de uma versão futura ou de outra ferramenta) volta intacto em toda gravação. Puro. Vai também no
 * bundle do selo (ASCII): nada de regex com acento aqui.
 * Desenho: docs/gelic/2026-10-11-dados-da-contratacao-design.md.
 */
import { CAMPOS_DA_UO } from '../peca/guardados';

export const ESQUEMA = 1;
/** Até isto de 409 seguidos (alguém gravando ao mesmo tempo) antes de desistir. */
export const TENTATIVAS = 3;
/** Identificação da UO: fica no navegador ("da última vez"). Equipe e pessoas são da contratação e vão aos dados. */
export const CAMPOS_FORA_DA_FICHA: readonly string[] = CAMPOS_DA_UO.filter(k => k !== 'equipe_planejamento' && k !== 'pessoas');

export type Problema = 'esquema_novo' | 'formato';
export interface DadosLidos {
  esquema: number;
  respostas: Record<string, unknown>;
  situacao: Record<string, unknown>;
  /** Chaves de fora do formato: voltam intactas na gravação. */
  resto: Record<string, unknown>;
  /** Com problema, a extensão só lê: nada é gravado no PCA. */
  problema?: Problema;
}

const ehObjeto = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);

export function lerDados(dados: unknown): DadosLidos {
  if (!ehObjeto(dados)) return { esquema: 0, respostas: {}, situacao: {}, resto: {}, problema: 'formato' };
  const { esquema, respostas, situacao, ...resto } = dados;
  const n = typeof esquema === 'number' && Number.isInteger(esquema) && esquema >= 0 ? esquema : 0;
  const lidos: DadosLidos = { esquema: n, respostas: ehObjeto(respostas) ? respostas : {}, situacao: ehObjeto(situacao) ? situacao : {}, resto };
  if (n > ESQUEMA) lidos.problema = 'esquema_novo';
  else if ((respostas !== undefined && !ehObjeto(respostas)) || (situacao !== undefined && !ehObjeto(situacao))) lidos.problema = 'formato';
  return lidos;
}

/** O `dados` a gravar: o lido, com as respostas e a situação trocadas quando vierem. */
export function montarDados(lidos: DadosLidos, troca: { respostas?: Record<string, unknown>; situacao?: Record<string, unknown> }): Record<string, unknown> {
  if (lidos.problema) throw new Error(`dados da contratação com problema (${lidos.problema}): a extensão não grava`);
  return { ...lidos.resto, esquema: ESQUEMA, respostas: troca.respostas ?? lidos.respostas, situacao: troca.situacao ?? lidos.situacao };
}

/** Só o que vai aos dados da contratação: tira a identificação da UO. */
export function daContratacao(valores: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(valores).filter(([k]) => !CAMPOS_FORA_DA_FICHA.includes(k)));
}
