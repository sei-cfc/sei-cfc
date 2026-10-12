/**
 * Roteiro da instrução no selo do SEI CFC: as peças do demandante na ordem do usuário (regras/modelos-cfc/
 * sequencia.json, mantida aqui desde 2026-10-10), feitas ou não pelos títulos da árvore. Puro: o selo desenha, os
 * testes conferem.
 *
 * - Peça com formulário: a que o catálogo do CFC oferece (DOCUMENTOS_CFC sem `indisponivel`).
 * - ETP, TR e mapa de riscos são feitos no Compras.gov.br: contam como feitos quando o PDF exportado está na árvore.
 * - Portarias, Banco de Preços e cotações são documentos externos: a unidade anexa o PDF.
 * - Peça interna só conta como feita assinada; antes disso, "em elaboração" (a árvore inicial do "Iniciar processo"
 *   nasce com as peças vazias, e o título sozinho não pode dar a instrução por completa).
 * - Obrigatórias: as que a instrução da licitação exige sempre. As outras (termos, portarias, checklist) são "conforme
 *   o caso" até o fluxo por via e a verificação prévia existirem.
 */
import { DOCUMENTOS_CFC } from '../documentos/catalogo';
import { SEQUENCIA_CFC } from '../modelos/cfc.gerado';
import { pecaPronta, temArquivo, tipoFonteCfc, type SinaisDaPeca } from '../modelos/fontes-cfc';
import type { Arvore } from '../../../sei-nucleo/src/dominio/arvore';

export { urlDaPeca } from './abrir';

export type Onde = 'formulario' | 'compras' | 'anexar' | 'verificacao' | 'sei';
export type EstadoPasso = 'feito' | 'em_elaboracao' | 'falta';
export interface PassoRoteiro {
  chave: string;
  rotulo: string;
  /** Tem formulário no SEI CFC. */
  modelo: boolean;
  onde: Onde;
  obrigatoria: boolean;
  estado: EstadoPasso;
  feito: boolean;
  numero?: string;
  /** Peça que pede mais de um documento (cotações): quantos há e o mínimo. */
  quantos?: { tem: number; minimo: number };
}
export interface Roteiro { passos: PassoRoteiro[]; proxima: PassoRoteiro | null; completa: boolean }

/** O documento da árvore como o roteiro o vê (sinais ausentes contam como peça pronta: ver pecaPronta). */
export interface DocRoteiro extends SinaisDaPeca { titulo: string; numero: string }
/** Os documentos da árvore como o roteiro os vê: cancelado não conta; assinatura (ou arquivo, no externo) decide "feito". */
export function docsDaArvore(arvore: Pick<Arvore, 'documentos'>): DocRoteiro[] {
  return arvore.documentos.filter(d => !d.cancelado)
    .map(d => ({ titulo: d.titulo, numero: d.numero, assinado: d.assinado || d.assinaturas.length > 0, externo: d.externo, comArquivo: temArquivo(d.src) }));
}

/** A chave da sequência → o tipo que tipoFonteCfc dá ao título da peça na árvore. */
const TIPO_DA_PECA: Readonly<Record<string, string>> = {
  dfd: 'dfd', termos_cientificacao: 'termo_ciencia', portaria_planejamento: 'portaria', portaria_gestores: 'portaria_gestores',
  etp: 'etp', pesquisa_banco_precos: 'banco_precos', cotacoes: 'cotacao', mapa_precos: 'mcp', tr: 'tr', mapa_riscos: 'mapa_riscos',
  checklist_conformidade: 'checklist_conformidade', despacho_delic: 'memorando_delic',
};
const NO_COMPRAS: ReadonlySet<string> = new Set(['etp', 'tr', 'mapa_riscos']);
const ANEXAR: ReadonlySet<string> = new Set(['portaria_planejamento', 'portaria_gestores', 'pesquisa_banco_precos', 'cotacoes']);
const VERIFICACAO: ReadonlySet<string> = new Set(['checklist_conformidade']);
const OBRIGATORIAS: ReadonlySet<string> = new Set(['dfd', 'etp', 'pesquisa_banco_precos', 'cotacoes', 'mapa_precos', 'tr', 'mapa_riscos', 'despacho_delic']);
const MINIMO: Readonly<Record<string, number>> = { cotacoes: 3 };
const COM_FORMULARIO: ReadonlySet<string> = new Set(DOCUMENTOS_CFC.filter(d => !d.indisponivel).map(d => d.id));

export const NOTA_ONDE: Readonly<Record<Onde, string>> = {
  formulario: '',
  compras: 'no Compras.gov.br: junte o PDF exportado',
  anexar: 'documento externo: anexe o PDF',
  verificacao: 'gerado pela verificação prévia',
  sei: 'sem modelo: produza no SEI',
};

const ondeDe = (chave: string, modelo: boolean): Onde =>
  modelo ? 'formulario' : NO_COMPRAS.has(chave) ? 'compras' : ANEXAR.has(chave) ? 'anexar' : VERIFICACAO.has(chave) ? 'verificacao' : 'sei';

export function roteiro(docs: readonly DocRoteiro[]): Roteiro {
  const tipos = docs.map(d => ({ ...d, tipo: tipoFonteCfc(d.titulo) }));
  const passos = SEQUENCIA_CFC.map((s): PassoRoteiro => {
    const doTipo = tipos.filter(d => d.tipo === (TIPO_DA_PECA[s.chave] ?? s.chave));
    // externo vale pelo arquivo; interno, só assinado
    const prontos = doTipo.filter(pecaPronta);
    const modelo = COM_FORMULARIO.has(s.chave);
    const minimo = MINIMO[s.chave] ?? 1;
    const estado: EstadoPasso = prontos.length >= minimo ? 'feito' : doTipo.length ? 'em_elaboracao' : 'falta';
    const ultimo = (prontos.length ? prontos : doTipo).at(-1);
    return {
      chave: s.chave,
      rotulo: s.rotulo,
      modelo,
      onde: ondeDe(s.chave, modelo),
      obrigatoria: OBRIGATORIAS.has(s.chave),
      estado,
      feito: estado === 'feito',
      ...(ultimo ? { numero: ultimo.numero } : {}),
      ...(minimo > 1 ? { quantos: { tem: prontos.length, minimo } } : {}),
    };
  });
  // Peça "conforme o caso" que ficou para trás (já há peça PRONTA depois dela) foi dispensada: não volta a ser a próxima.
  // Só a pronta conta: a árvore inicial nasce com o despacho vazio no fim, e ele não pode dispensar os termos.
  const ultimaFeita = passos.map(p => p.feito).lastIndexOf(true);
  const proxima = passos.find((p, i) => !p.feito && (p.obrigatoria || i > ultimaFeita)) ?? null;
  return { passos, proxima, completa: passos.every(p => p.feito || !p.obrigatoria) };
}
