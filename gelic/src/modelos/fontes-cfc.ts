/**
 * Tipo da peça para as fontes do cfc: o da leitura dos modelos (fontes.ts) mais as peças só do demandante. Fica
 * fora de analise-cfc.ts para o selo (content script) reconhecer as peças sem levar o motor dos modelos junto.
 */
import { tipoFonte } from './fontes';

// Acentos em \uXXXX: o selo (content script) leva estas regras, e o bundle dele tem de ser ASCII (build.mjs).
/**
 * Antes dos tipos de fontes.ts, que os confundiriam: "Pesquisa de preços - Banco de Preços" não é o mapa (mcp),
 * "Cotação" não é proposta genérica, "Termo de Ciência de conflito de interesses" não é manifestação.
 */
const ANTES: readonly [string, RegExp][] = [
  ['termo_ciencia', /termos? de ci[\u00ea\u00e9e]n(cia|tifica)/i],
  ['banco_precos', /banco de pre[\u00e7c]os/i],
  // o título que começa por cotação ("Cotação - Empresa A"), ou com um tipo genérico do SEI antes ("Anexo Cotação de
  // fornecedor 1"): o e-mail, a planilha ou o ofício de cotação não são a cotação
  ['cotacao', /^((anexo|documento|pdf)\s+)?cota[\u00e7c](\u00e3o|ao|\u00f5es|oes)\b/i],
  // só o da unidade: a "Lista de Verificação" da AGU, usada pela Gelic, não é o checklist de conformidade
  ['checklist_conformidade', /check[\s-]?list de conformidade/i],
  // O envio à Gelic: o despacho "Envio à Gelic" (2026-10-10) ou o memorando que as unidades usavam ("Memorando nº 32 -
  // encaminha GELIC"). Um despacho DA Gelic ("Despacho Gelic - devolução") não é envio: fica com o tipoDe.
  ['memorando_delic', /^memorando.*\b(gelic|delic)\b|envio (ao delic|[\u00e0a] gelic)/i],
];
const EXTRAS_CFC: readonly [string, RegExp][] = [
  ['mapa_riscos', /(mapa|an[\u00e1a]lise|matriz|gerenciamento) de riscos?/i],
  // só as duas portarias da instrução: "Portaria de nomeação de pregoeiro" ou a Portaria 233/2025 não são peças
  ['portaria_gestores', /portaria.*(gestor|fiscal|fiscais)/i],
  ['portaria', /portaria.*(equipe|planejamento)/i],
  // o nome da peça na árvore inicial ("Mapa de preços"); "Mapa Comparativo de Preços" já é mcp pelo fontes.ts
  ['mcp', /^mapa de pre[\u00e7c]os/i],
];
export function tipoFonteCfc(titulo: string): string {
  const antes = ANTES.find(([, re]) => re.test(titulo));
  if (antes) return antes[0];
  const t = tipoFonte(titulo);
  return t === 'outro' ? EXTRAS_CFC.find(([, re]) => re.test(titulo))?.[0] ?? 'outro' : t;
}

/**
 * A peça tem conteúdo de verdade: a interna, assinada; a externa, com arquivo. A árvore inicial do "Iniciar processo"
 * nasce com as peças vazias, e o título sozinho não pode contar como peça pronta (roteiro, despacho de envio).
 * Campo ausente conta como pronto (chamadas que não sabem).
 */
export interface SinaisDaPeca { assinado?: boolean; externo?: boolean; comArquivo?: boolean }
export const pecaPronta = (d: SinaisDaPeca) => (d.externo ? d.comArquivo !== false : d.assinado !== false);
/** Externo com arquivo: o SEI dá o link de download do anexo. O externo salvo sem arquivo não tem. */
export const temArquivo = (src: string) => /documento_download_anexo/.test(src);
