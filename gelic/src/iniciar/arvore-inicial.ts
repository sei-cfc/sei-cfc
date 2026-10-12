/**
 * A árvore inicial do "Iniciar processo" (desenho em docs/gelic/2026-10-10-iniciar-contratacao-pelo-pca.md): as peças
 * da instrução, na ordem do usuário, que o processo novo recebe já criadas. A interna nasce em branco (o DFD é
 * preenchido em seguida pela janela da peça); a externa nasce sem arquivo, para a unidade anexar. Puro.
 *
 * `nomeArvore` é o que vai no campo "Nome na árvore" do SEI: o roteiro do selo e o despacho de envio reconhecem a peça
 * por esse título (src/modelos/fontes-cfc.ts). `tipoSei` são os nomes prováveis do tipo de documento no SEI do CFC,
 * do mais para o menos provável; a primeira vez a pessoa confirma, e a escolha fica lembrada (src/iniciar/sei.ts).
 */
import { VIAS } from '../modelos/analise-cfc';

export type Via = (typeof VIAS)[number];

export interface Respostas {
  objeto: string;
  via: Via;
  item_pca?: number | null;
  exercicio?: number | null;
  valor_estimado?: string | null;
  data_pretendida?: string | null;
  grau_prioridade?: string | null;
  termos: number;
  cotacoes: number;
}

export interface PecaInicial {
  /** A chave do passo no roteiro (sequencia.json). */
  chave: string;
  externo: boolean;
  nomeArvore: string;
  /** Nomes prováveis do tipo de documento no SEI, do mais para o menos provável. */
  tipoSei: readonly string[];
}

export const LIMITES = { termos: { min: 0, max: 10, padrao: 4 }, cotacoes: { min: 0, max: 10, padrao: 3 } } as const;

const interna = (chave: string, nomeArvore: string, tipoSei: string[]): PecaInicial => ({ chave, externo: false, nomeArvore, tipoSei });
const externa = (chave: string, nomeArvore: string, tipoSei: string[]): PecaInicial => ({ chave, externo: true, nomeArvore, tipoSei });

export function arvoreInicial(r: Pick<Respostas, 'via' | 'termos' | 'cotacoes'>): PecaInicial[] {
  const termos = Math.min(Math.max(r.termos, LIMITES.termos.min), LIMITES.termos.max);
  const cotacoes = Math.min(Math.max(r.cotacoes, LIMITES.cotacoes.min), LIMITES.cotacoes.max);
  // A árvore é a da licitação; dispensa, inexigibilidade e adesão terão a sua quando o fluxo por via for validado
  // (docs/gelic/2026-10-10-pecas-por-fluxo-rascunho.md). Por ora a via só vai para o DFD.
  return [
    interna('dfd', 'Documento de Formalização da Demanda (DFD)', ['Documento de Formalização da Demanda', 'DFD', 'Formalização de Demanda']),
    ...Array.from({ length: termos }, (_, i) => interna('termos_cientificacao', `Termo de Cientificação ${i + 1}`, ['Termo de Ciência', 'Termo de Cientificação'])),
    externa('portaria_planejamento', 'Portaria nº - Equipe de Planejamento', ['Portaria']),
    externa('portaria_gestores', 'Portaria nº - Gestores de Contrato', ['Portaria']),
    externa('etp', 'Estudo Técnico Preliminar (ETP)', ['Estudo Técnico Preliminar', 'ETP']),
    externa('pesquisa_banco_precos', 'Pesquisa de preços - Banco de Preços', ['Pesquisa de Preço', 'Pesquisa de Preços', 'Pesquisa de Mercado', 'Anexo']),
    ...Array.from({ length: cotacoes }, (_, i) => externa('cotacoes', `Cotação de fornecedor ${i + 1}`, ['Cotação', 'Orçamento', 'Proposta', 'Anexo'])),
    interna('mapa_precos', 'Mapa Comparativo de Preços', ['Mapa Comparativo de Preços', 'Mapa de Preços']),
    externa('tr', 'Termo de Referência', ['Termo de Referência', 'TR']),
    externa('mapa_riscos', 'Mapa de Riscos', ['Mapa de Riscos', 'Matriz de Riscos', 'Análise de Riscos', 'Anexo']),
    interna('despacho_delic', 'Envio à Gelic', ['Despacho']),
  ];
}

/** Especificação do processo no SEI (até 100 caracteres, como o próprio SEI corta): o objeto, sem quebra de linha. */
export const especificacao = (objeto: string) => objeto.replace(/\s+/g, ' ').trim().slice(0, 100).trim();
