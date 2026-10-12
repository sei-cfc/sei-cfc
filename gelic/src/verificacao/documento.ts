/**
 * O documento "Checklist de Conformidade" (desenho, Parte 2), montado só pelo código: cabeçalho, itens com situação,
 * onde foram conferidos e a justificativa da unidade, documentos conferidos e a nota fixa. A constatação e a
 * recomendação da IA ficam na tela, nunca no documento. Puro.
 */
import type { Bloco } from '../modelos/motor';
import { situacaoDe, type Situacao, type Verificacao } from './estado';

export const NOME_CHECKLIST = 'Checklist de Conformidade';
export const NOTA_CHECKLIST = 'Verificação prévia assistida por IA, feita pela unidade. Não substitui a análise da Gelic.';
const ROTULO: Readonly<Record<Situacao, string>> = {
  atende: 'Atende', nao_se_aplica: 'Não se aplica', justificado: 'Justificado', nao_atende: 'Não atende', nao_verificado: 'Não verificado',
};
const sem = (s: string) => s.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
const GRAFIA = /check[\s-]?list|lista de verificacao/;

/** O tipo do SEI do checklist: o nome exato, senão o primeiro com uma das grafias; nenhum → ''. */
export function tipoSugerido(tipos: readonly string[]): string {
  return tipos.find(t => sem(t) === sem(NOME_CHECKLIST)) ?? tipos.find(t => GRAFIA.test(sem(t))) ?? '';
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
    { tipo: 'clausula', texto: '1. ITENS DO CHECKLIST' },
    { tipo: 'tabela', cabecalho: true, linhas: [
      ['Item', 'Situação', 'Onde foi conferido', 'Justificativa da unidade'],
      ...v.itens.map(i => [`${i.id} — ${i.texto}`, ROTULO[situacaoDe(i)], i.sei ? `SEI ${i.sei}` : '—', i.justificativa ?? '—']),
    ] },
    { tipo: 'clausula', texto: '2. DOCUMENTOS CONFERIDOS' },
    { tipo: 'tabela', cabecalho: true, linhas: [['SEI', 'Documento'], ...lidos.map(d => [d.numero, d.titulo])] },
    // o que está nos autos e não foi lido (restrito sem consentimento, PDF sem texto, fora do limite) não é "conferido"
    ...(fora.length ? [
      { tipo: 'clausula', texto: '3. DOCUMENTOS NOS AUTOS NÃO EXAMINADOS' } as Bloco,
      { tipo: 'tabela', cabecalho: true, linhas: [['SEI', 'Documento', 'Motivo'], ...fora.map(d => [d.numero, d.titulo, d.motivo ?? '—'])] } as Bloco,
    ] : []),
    p(NOTA_CHECKLIST),
  ];
}
