/**
 * O documento "Checklist de Conformidade" (desenho, Parte 2), montado só pelo código: cabeçalho com a forma da
 * verificação (com ou sem IA), itens com situação, onde foram conferidos e a justificativa da unidade, documentos
 * conferidos e a nota fixa do modo. A constatação e a recomendação da IA ficam na tela, nunca no documento. Puro.
 *
 * Tipo no SEI: "Checklist de Conformidade" quando existir; até o administrador do SEI criá-lo, Despacho, e a árvore
 * mostra "Despacho de Conformidade" (decisão do usuário, 2026-10-12).
 */
import type { Bloco } from '../modelos/motor';
import { situacaoDe, type Modo, type Situacao, type Verificacao } from './estado';

export const NOME_CHECKLIST = 'Checklist de Conformidade';
/** Nome na árvore quando o tipo não é o do checklist: "Despacho" + "de Conformidade". */
export const NOME_NA_ARVORE = 'de Conformidade';
export const NOTAS: Readonly<Record<Modo, string>> = {
  ia: 'Verificação prévia assistida por IA, feita pela unidade: o modelo julgou o conteúdo de cada item pelos critérios da Gelic. Não substitui a análise da Gelic.',
  presenca: 'Verificação prévia feita pela unidade sem uso de IA: confere só a presença dos requisitos (peças da etapa, assinaturas, cronologia, números de processo, valores e validades), sem juízo sobre o conteúdo. Não substitui a análise da Gelic.',
};
const FORMA: Readonly<Record<Modo, string>> = {
  ia: 'Forma da verificação: com IA (julgamento do conteúdo pelo modelo).',
  presenca: 'Forma da verificação: sem IA (presença dos requisitos, sem juízo sobre o conteúdo).',
};
const ROTULO: Readonly<Record<Situacao, string>> = {
  atende: 'Atende', nao_se_aplica: 'Não se aplica', justificado: 'Justificado', nao_atende: 'Não atende', nao_verificado: 'Não verificado',
};
/** Sem IA, o "não verificado" é o "a conferir" das checagens. */
const rotulo = (modo: Modo, s: Situacao) => (modo === 'presenca' && s === 'nao_verificado' ? 'A conferir' : ROTULO[s]);
const sem = (s: string) => s.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
/** Só o checklist de conformidade da unidade: a "Lista de Verificação" da AGU (da Gelic) e um "Checklist" genérico não são ele. */
const GRAFIA = /check[\s-]?list de conformidade/;

/** O tipo do SEI do checklist (check-list, check list, checklist de conformidade), senão Despacho; nenhum → ''. */
export function tipoSugerido(tipos: readonly string[]): string {
  return tipos.find(t => sem(t) === sem(NOME_CHECKLIST)) ?? tipos.find(t => GRAFIA.test(sem(t))) ?? tipos.find(t => sem(t) === 'despacho') ?? '';
}
/** O tipo escolhido já diz que é checklist: o nome na árvore fica o do tipo. */
export const tipoEhChecklist = (tipo: string) => GRAFIA.test(sem(tipo));

export function blocosDoChecklist(v: Verificacao, o: { unidade?: string; data: string }): Bloco[] {
  const p = (texto: string): Bloco => ({ tipo: 'paragrafo', texto, recuo: false });
  const lidos = v.documentos.filter(d => d.lido);
  const fora = v.documentos.filter(d => !d.lido);
  return [
    { tipo: 'titulo', texto: 'CHECKLIST DE CONFORMIDADE' },
    p(`Processo: ${v.processo}`),
    ...(o.unidade ? [p(`Unidade: ${o.unidade}`)] : []),
    p(`Data da verificação: ${o.data}`),
    p(`Etapa: ${v.etapa}. Checklist da família ${v.familia}, com os critérios da Gelic.`),
    p(FORMA[v.modo]),
    { tipo: 'clausula', texto: v.modo === 'ia' ? '1. ITENS DO CHECKLIST' : '1. REQUISITOS CONFERIDOS' },
    { tipo: 'tabela', cabecalho: true, linhas: [
      ['Item', 'Situação', 'Onde foi conferido', 'Justificativa da unidade'],
      ...v.itens.map(i => [i.grupo ? `${i.grupo}: ${i.texto}` : `${i.id} — ${i.texto}`, rotulo(v.modo, situacaoDe(i)), i.sei ? `SEI ${i.sei}` : '—', i.justificativa ?? '—']),
    ] },
    { tipo: 'clausula', texto: '2. DOCUMENTOS CONFERIDOS' },
    { tipo: 'tabela', cabecalho: true, linhas: [['SEI', 'Documento'], ...lidos.map(d => [d.numero, d.titulo])] },
    // o que está nos autos e não foi lido (restrito sem consentimento, PDF sem texto, fora do limite) não é "conferido"
    ...(fora.length ? [
      { tipo: 'clausula', texto: '3. DOCUMENTOS NOS AUTOS NÃO EXAMINADOS' } as Bloco,
      { tipo: 'tabela', cabecalho: true, linhas: [['SEI', 'Documento', 'Motivo'], ...fora.map(d => [d.numero, d.titulo, d.motivo ?? '—'])] } as Bloco,
    ] : []),
    p(NOTAS[v.modo]),
  ];
}
