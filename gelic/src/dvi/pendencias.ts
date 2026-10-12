/**
 * Pendências sem IA: o checklist que o código decide sozinho sobre o pacote da preparação — presença das peças
 * da etapa (pelo título e pelo cabeçalho), assinaturas, cronologia, número de processo, citados não localizados,
 * valores, validades e o que não foi examinado. O mérito dos itens do checklist fica para a análise. Função pura.
 */
import { tipoDe } from '../regras/motor';
import { contextoDoPacote } from './contexto';
import type { Checagem, PacoteDvi } from './preparar/index';

export type Situacao = 'atende' | 'não atende' | 'a conferir';

interface Peca { nome: string; casa: (tipo: string, classe: string) => boolean; opcional?: string }
const PECAS: Record<PacoteDvi['familia'], Peca[]> = {
  preparatoria: [
    { nome: 'DFD', casa: (t, c) => t === 'dfd' || c === 'dfd' },
    { nome: 'ETP', casa: (t, c) => t === 'etp' || c === 'etp', opcional: 'o ETP pode ter sido dispensado: confira a justificativa' },
    { nome: 'Termo de Referência', casa: (t, c) => t === 'tr' || c === 'tr' },
    { nome: 'Pesquisa de preços (MCP, pesquisa, parâmetros ou justificativa de preço)', casa: (_t, c) => ['mcp', 'pesquisa', 'parametros', 'justificativa_preco'].includes(c) },
  ],
  prorrogacao: [
    { nome: 'Contrato ou aditivo vigente', casa: t => ['contrato', 'termo_aditivo', 'apostila'].includes(t) },
    { nome: 'Formulário de alteração contratual', casa: t => t === 'formulario_alteracao', opcional: 'confira se a demanda veio por outro documento' },
  ],
  reajuste: [
    { nome: 'Contrato ou aditivo vigente', casa: t => ['contrato', 'termo_aditivo', 'apostila'].includes(t) },
    { nome: 'Formulário de alteração contratual', casa: t => t === 'formulario_alteracao', opcional: 'confira se a demanda veio por outro documento' },
  ],
};

/** Classes de peça que a própria Administração produz e assina no SEI. */
const INTERNAS = new Set(['dfd', 'etp', 'tr', 'mcp', 'pesquisa', 'parametros', 'justificativa_preco', 'contratacao_direta', 'riscos', 'portaria', 'cientificacao', 'despacho']);

const GRUPOS: [string, Checagem['tipo'][], Situacao][] = [
  ['Cronologia', ['cronologia'], 'a conferir'],
  ['Número de processo', ['processo_divergente'], 'a conferir'],
  ['Título do SEI × conteúdo', ['titulo_x_conteudo'], 'não atende'],
  ['Documentos citados e não localizados nos autos', ['citado_ausente'], 'a conferir'],
  ['Valores (MCP × propostas, valores próximos)', ['mcp_sem_proposta', 'valores_proximos'], 'a conferir'],
  ['Validades e vigências', ['validade', 'vigencia', 'vigencia_divergente'], 'a conferir'],
  ['CNPJ', ['cnpj_estabelecimentos'], 'a conferir'],
];

function situacaoDe(c: Checagem, padrao: Situacao): Situacao {
  if (c.tipo === 'validade') return /VENCIDA/.test(c.texto) && !c.candidato ? 'não atende' : /VENCIDA/.test(c.texto) || c.candidato ? 'a conferir' : 'atende';
  if (c.tipo === 'vigencia') return /encerrad/.test(c.texto) ? 'a conferir' : 'atende';
  return padrao;
}

export interface Pendencia { situacao: Situacao; texto: string }
export interface GrupoPendencias { titulo: string; itens: Pendencia[] }
export interface Pendencias { cabecalho: string; grupos: GrupoPendencias[]; rodape: string }

/** As pendências por grupo (o checklist da presença): a mesma regra do texto, em dados. */
export function pendenciasDoPacote(p: PacoteDvi): Pendencias {
  const grupos: GrupoPendencias[] = [];
  const grupo = (titulo: string) => { const g: GrupoPendencias = { titulo, itens: [] }; grupos.push(g); return g; };
  const docs = contextoDoPacote(p).documentos;

  const pecas = grupo('Peças da etapa (presença nos autos)');
  for (const pc of PECAS[p.familia]) {
    const achou = docs.filter(d => pc.casa(tipoDe(d.titulo), d.classe ?? ''));
    if (achou.length) pecas.itens.push({ situacao: 'atende', texto: `${pc.nome}: ${achou.map(d => `SEI ${d.numero}`).join(', ')}` });
    else pecas.itens.push({ situacao: pc.opcional ? 'a conferir' : 'não atende', texto: `${pc.nome}: não localizado${pc.opcional ? ` (${pc.opcional})` : ''}` });
  }
  if (p.dviAnterior) pecas.itens.push({ situacao: 'a conferir', texto: `DVI anterior desta etapa: SEI ${p.dviAnterior.numero} — reexame: confira o que foi sanado` });

  const de = (t: Checagem['tipo']) => p.checagens.filter(c => c.tipo === t);
  const ass = grupo('Assinaturas');
  const sem = de('sem_assinatura');
  if (!sem.length) ass.itens.push({ situacao: 'atende', texto: 'todos os documentos dos autos têm assinatura eletrônica' });
  // peça interna sem assinatura não atende; documento externo (proposta, certidão, estatuto) se confere
  const classe = new Map(docs.map(d => [d.numero, d.classe ?? '']));
  for (const c of sem) ass.itens.push({ situacao: !/digitalizado/.test(c.texto) && INTERNAS.has(classe.get(c.sei[0]) ?? '') ? 'não atende' : 'a conferir', texto: c.texto });
  for (const [titulo, tipos, padrao] of GRUPOS) {
    const cs = tipos.flatMap(de);
    const g = grupo(titulo);
    if (!cs.length) g.itens.push({ situacao: 'atende', texto: 'nada apontado' });
    for (const c of cs) g.itens.push({ situacao: situacaoDe(c, padrao), texto: c.texto });
  }
  if (p.limites.documentosNaoLidos.length) {
    const nl = grupo('Não examinados pelo código');
    for (const n of p.limites.documentosNaoLidos) nl.itens.push({ situacao: 'a conferir', texto: `SEI ${n.numero}${n.titulo ? ` ${n.titulo}` : ''}: ${n.motivo}` });
  }
  const imp = p.checklist.filter(i => i.grau === 'I').length;
  return {
    cabecalho: `Pendências de ${p.processo} — etapa: ${p.etapa.nome}; família: ${p.familia}; próximo passo: ${(p.etapa.proximo || '—').replace(/\.+$/, '')}.`,
    grupos,
    rodape: `Checklist da família: ${p.checklist.length} itens (séries ${p.series.join(' ')}; ${imp} impeditivos). O conteúdo dos itens se confere na análise (botão Analisar), não aqui.`,
  };
}

export function textoDePendencias(p: PacoteDvi): string {
  const x = pendenciasDoPacote(p);
  const L: string[] = [x.cabecalho];
  for (const g of x.grupos) {
    L.push('', `${g.titulo}:`);
    for (const i of g.itens) L.push(`- [${i.situacao}] ${i.texto}`);
  }
  L.push('', x.rodape);
  return L.join('\n');
}
