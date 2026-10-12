/**
 * API do PCA para as extensões, contrato v1 (~/ativos/docker/pca-cfc/docs/api-extensao-sei.md), e a coleta no formato
 * do robô (apps/pca/sei/coletor.py). Puro: quem lê o SEI e quem faz o fetch ficam em sincronizar.ts e cliente.ts.
 *
 * Paridade com o robô:
 * - RE_CONTRATUAL é a de apps/pca/sei/extracao.py (acentos em \uXXXX: o selo leva este módulo, e o bundle dele é ASCII);
 * - assinantes_externos_na_arvore conta "Usuário Externo" no quadro de assinaturas da árvore (o title do anchorA);
 * - só o externo de Contrato e de Termo Aditivo é baixado (PDF); os outros externos contratuais vão como
 *   externo_nao_baixado.
 */
import type { Andamento } from '../../../sei-nucleo/src/dominio/historico';
import type { DocumentoArvore } from '../../../sei-nucleo/src/dominio/arvore';
import type { VIAS } from '../modelos/analise-cfc';

export const VERSAO_API = 1;
export const URL_PADRAO = 'https://pca.sistemascfc.org';

export interface ItemPca {
  item_pca: number;
  exercicio: number;
  descricao_objeto: string;
  valor_estimado: string | null;
  unidade: string | null;
  grau_prioridade: string | null;
  mes_previsto: number | null;
  situacao: string;
  situacao_rotulo: string;
  numeros_sei: string[];
  /** v1.1 (opcionais: o PCA de produção pode ainda ser v1). Rótulo da Modalidade do item, ou null se não preenchida. */
  modalidade?: string | null;
  /** v1.1: o mesmo que descricao_objeto. */
  objeto?: string;
  /** v1.1: a unidade do item já com a sigla do SEI (ex.: GEX-LIC). */
  unidade_sigla_sei?: string;
}
export interface AndamentoPca { data_hora: string; unidade: string; descricao: string }
export interface UltimaColeta { registros: number | null; primeiro: AndamentoPca | null; recebido_em: string; origem: 'robo' | 'extensao' | string }
export interface RespostaProcesso { itens: ItemPca[]; ultima_coleta?: UltimaColeta | null }
export interface RespostaSaude { versao: number; usuario?: string; pode_enviar?: boolean; /** v1.1: pode gravar vínculo e ficha. */ pode_instruir?: boolean }
/** v1.1: POST /vinculo. */
export interface CorpoVinculo { item_pca: number; exercicio: number; numero_sei: string }
export interface RespostaVinculo { criado: boolean; item: ItemPca }
/** v1.1: GET/PUT /ficha. O `dados` é da extensão (src/ficha/formato.ts); o PCA só guarda, limita e versiona. */
export interface RespostaFicha { item_pca: number; exercicio: number; versao: number; dados: unknown; atualizado_em: string | null; atualizado_por: string | null }
export interface CorpoFicha { item_pca: number; exercicio: number; versao: number; dados: Record<string, unknown> }
/** Um item do PCA: o da ficha, e cada um da lista do 409 `sei_em_varios_itens`. */
export interface ItemDaFicha { item_pca: number; exercicio: number }

/** Modalidade do item no PCA (Processo.modalidade) → via da extensão. Rótulos do PCA em 2026-10-10. */
const VIA_DA_MODALIDADE: Readonly<Record<string, (typeof VIAS)[number]>> = {
  'pregao': 'pregao', 'pregao eletronico': 'pregao', 'concorrencia': 'concorrencia', 'dispensa': 'dispensa', 'dispensa com disputa': 'dispensa',
  'dispensa sem disputa': 'dispensa', 'inexigibilidade': 'inexigibilidade', 'adesao a arp': 'adesao_ata', 'adesao a ata de registro de precos': 'adesao_ata',
  'credenciamento': 'credenciamento', 'chamamento publico': 'chamamento_publico',
};
/** A via pela modalidade do PCA; desconhecida ou vazia, null (a via fica como está). */
export function viaDaModalidade(m: string | null | undefined): (typeof VIAS)[number] | null {
  if (!m) return null;
  const k = m.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  return VIA_DA_MODALIDADE[k] ?? null;
}

export type Conteudo = 'html' | 'pdf' | 'externo_nao_baixado' | 'nao_lido';
export interface DocumentoColeta {
  id_documento: string;
  protocolo: string;
  rotulo: string;
  assinantes_externos_na_arvore: number;
  contratual: boolean;
  cancelado: boolean;
  motivo_cancelamento: string | null;
  conteudo: Conteudo;
  motivo: 'restrito' | 'nao_contratual' | null;
  html: string | null;
  pdf_base64: string | null;
}
export interface CorpoColeta { numero: string; andamentos: AndamentoPca[]; documentos: DocumentoColeta[] }
export interface Pendencia { chave: string; texto: string }
export interface ItemAplicado { item_pca: number; exercicio: number; alterados: Record<string, [unknown, unknown]>; pendencias: Pendencia[] }
export interface RespostaColeta { itens: ItemAplicado[] }

/** A de apps/pca/sei/extracao.py: o rótulo do documento é instrumento de contratação. */
export const RE_CONTRATUAL =
  /^(contrato(?!\s+social)|termo aditivo|termo de apostilamento|apostilamento|ordem de fornecimento|ata de registro de pre[c\u00e7]os|termo de contrato|termo de rescis[a\u00e3]o)\b/i;

/** O tipo do instrumento, como o tipo_documento do robô (termo de rescisão casa, mas não é instrumento). */
export function tipoInstrumento(rotulo: string): 'contrato' | 'termo_aditivo' | 'apostilamento' | 'ordem_fornecimento' | 'ata_rp' | null {
  const m = RE_CONTRATUAL.exec(rotulo);
  if (!m) return null;
  const g = m[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (g === 'contrato' || g === 'termo de contrato') return 'contrato';
  if (g === 'termo aditivo') return 'termo_aditivo';
  if (g === 'apostilamento' || g === 'termo de apostilamento') return 'apostilamento';
  if (g === 'ordem de fornecimento') return 'ordem_fornecimento';
  if (g === 'ata de registro de precos') return 'ata_rp';
  return null;
}
export const ehContratual = (rotulo: string) => RE_CONTRATUAL.test(rotulo);
/** O robô só baixa o PDF do externo de Contrato e de Termo Aditivo. */
export const baixaPdf = (rotulo: string) => { const t = tipoInstrumento(rotulo); return t === 'contrato' || t === 'termo_aditivo'; };

/** O que ler de cada documento da árvore: nada, o HTML (interno) ou o PDF (externo de contrato ou aditivo). */
export type Leitura = 'nenhuma' | 'html' | 'pdf';
export function leituraDe(d: DocumentoArvore): Leitura {
  if (d.cancelado || d.nivel !== 'publico' || !ehContratual(d.titulo)) return 'nenhuma';
  if (!d.externo) return 'html';
  return baixaPdf(d.titulo) ? 'pdf' : 'nenhuma';
}

export const assinantesExternos = (d: Pick<DocumentoArvore, 'assinaturas'>) =>
  d.assinaturas.reduce((n, l) => n + (l.match(/Usu\u00e1rio Externo/g)?.length ?? 0), 0);

/** O documento da árvore no formato da coleta, com o que foi lido (html ou pdf em base64), quando foi. */
export function documentoDaColeta(d: DocumentoArvore, lido?: { html?: string; pdf_base64?: string }): DocumentoColeta {
  const contratual = ehContratual(d.titulo);
  const base = {
    id_documento: d.id, protocolo: d.numero, rotulo: d.titulo, assinantes_externos_na_arvore: assinantesExternos(d),
    contratual, cancelado: d.cancelado, motivo_cancelamento: null, html: null, pdf_base64: null,
  };
  if (d.cancelado) return { ...base, conteudo: 'nao_lido', motivo: null };
  if (!contratual) return { ...base, conteudo: 'nao_lido', motivo: 'nao_contratual' };
  if (d.nivel !== 'publico') return { ...base, conteudo: 'nao_lido', motivo: 'restrito' };
  if (lido?.html != null) return { ...base, conteudo: 'html', motivo: null, html: lido.html };
  if (lido?.pdf_base64 != null) return { ...base, conteudo: 'pdf', motivo: null, pdf_base64: lido.pdf_base64 };
  return { ...base, conteudo: 'externo_nao_baixado', motivo: null };
}

export const andamentoPca = (a: Andamento): AndamentoPca => ({ data_hora: a.data, unidade: a.unidade, descricao: a.descricao });

/**
 * A descrição do andamento como o PCA a guarda (montagem._anon do robô): sem o login de quem assinou nem o
 * usuário que recebeu a liberação. A comparação do atalho de pulo é feita com ela.
 */
export function anonimizar(descricao: string): string {
  let d = descricao.replace(/usu\u00e1rio .+? \([^)]*@[^)]*\)/g, 'usu\u00e1rio [omitido]');
  if (d.toLowerCase().startsWith('assinado documento')) d = d.replace(/\bpor \S+@?\S*$/, 'por [omitido]');
  return d.replace(/\(cancelada por \S+ em /g, '(cancelada por [omitido] em ');
}

/** O que esta extensão já enviou de um processo (guardado no navegador): total e andamento mais recente. */
export interface Enviado { total: number; primeiro: AndamentoPca | null; t: number }
/** O robô pula o processo que a extensão informou nas últimas 24 h; a extensão também. */
export const JANELA_EXTENSAO_MS = 24 * 60 * 60 * 1000;

const mesmoAndamento = (a: AndamentoPca | null, b: AndamentoPca | null) =>
  !a || !b ? !!a === !!b : a.data_hora === b.data_hora && a.unidade === b.unidade && anonimizar(a.descricao) === anonimizar(b.descricao);

/**
 * O atalho de pulo do robô: o PCA já tem a coleta deste processo se o total de andamentos e o mais recente são os
 * mesmos. A coleta gravada pela extensão vem sem total (o PCA guarda só os marcos): aí vale o que este navegador
 * enviou e, sem isso, a coleta da extensão das últimas 24 h. Sem coleta anterior, coleta.
 */
export function precisaColetar(ultima: UltimaColeta | null | undefined, atual: { total: number; primeiro: Andamento | null }, o: { enviado?: Enviado | null; agora?: number } = {}): boolean {
  const primeiro = atual.primeiro ? andamentoPca(atual.primeiro) : null;
  if (o.enviado && o.enviado.total === atual.total && mesmoAndamento(o.enviado.primeiro, primeiro)) return false;
  if (!ultima) return true;
  if (ultima.registros == null) {
    const recebido = Date.parse(ultima.recebido_em);
    return !(ultima.origem === 'extensao' && o.agora !== undefined && Number.isFinite(recebido) && o.agora - recebido < JANELA_EXTENSAO_MS);
  }
  return ultima.registros !== atual.total || !mesmoAndamento(ultima.primeiro, primeiro);
}

/** Rótulos dos campos que o PCA altera (o resumo do aplicador), para a linha do selo. */
const CAMPOS: Readonly<Record<string, string>> = {
  data_assinatura_contrato: 'data de assinatura',
  numero_instrumento_contratual: 'nº do contrato',
  valor_contratado: 'valor contratado',
  vigencia_inicio: 'início da vigência',
  vigencia_fim: 'fim da vigência',
  situacao: 'situação',
};
const rotuloCampo = (c: string) => CAMPOS[c] ?? c.replaceAll('_', ' ');

export type EstadoPca =
  | { tipo: 'sem_config' }
  | { tipo: 'consultando' }
  | { tipo: 'sem_vinculo' }
  | { tipo: 'item'; itens: ItemPca[]; envio?: 'em_dia' | 'enviando' | { alterados: string[]; pendencias: Pendencia[] } | { erro: string; codigo?: string } }
  | { tipo: 'erro'; mensagem: string; codigo?: string };

const nomeItem = (i: ItemPca) => `item ${i.item_pca}/${i.exercicio}`;

/** A linha do PCA no selo, em palavras. */
export function linhaDoPca(e: EstadoPca): string | null {
  switch (e.tipo) {
    case 'sem_config': return null;
    case 'consultando': return 'PCA: consultando…';
    case 'sem_vinculo': return 'PCA: processo sem item vinculado';
    case 'erro': return `PCA: ${e.mensagem}`;
    case 'item': {
      const itens = e.itens.map(i => `${nomeItem(i)} · ${i.situacao_rotulo}`).join('; ');
      const env = e.envio;
      if (!env) return `PCA: ${itens}`;
      if (env === 'em_dia') return `PCA: ${itens} · em dia`;
      if (env === 'enviando') return `PCA: ${itens} · enviando a coleta…`;
      if ('erro' in env) return `PCA: ${itens} · coleta não enviada: ${env.erro}`;
      const alt = env.alterados.length ? `atualizado: ${[...new Set(env.alterados)].map(rotuloCampo).join(', ')}` : 'sem mudança';
      const pend = env.pendencias.length ? ` · ${env.pendencias.length} pendência${env.pendencias.length > 1 ? 's' : ''}` : '';
      return `PCA: ${itens} · ${alt}${pend}`;
    }
  }
}
