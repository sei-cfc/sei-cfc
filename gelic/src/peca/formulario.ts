/**
 * Campos do formulário das peças do SEI CFC (docs/gelic/2026-10-10-formulario-pecas-cfc.md), a partir das
 * perguntas do modelo (regras/modelos-cfc/<m>/formulario.json, o formulário do gera) e das entradas que o texto do
 * modelo usa e não são pergunta (unidade, responsável, via, itens...). Funções puras: a janela (pagina.ts) desenha.
 */
import { contextoCfc, modeloCfc, perguntasVisiveisCfc } from '../modelos/cfc';
import type { TipoPerguntaCfc } from '../modelos/cfc.gerado';
import { documentoDe, temValor, type EntradaCfc, type EstadoCfc, type EvidenciaCfc } from '../modelos/analise-cfc';

export type TipoCampo = TipoPerguntaCfc;
export interface OrigemCampo { rotulo: string; sei?: string; ia?: boolean }
export interface Campo {
  nome: string;
  rotulo: string;
  tipo: TipoCampo;
  opcoes: string[] | null;
  obrigatoria: boolean;
  nota: string;
  /** Colunas da tabela (tabela_itens e lista_pessoas). */
  colunas: string[];
  valor: unknown;
  origem: OrigemCampo | null;
  falta: boolean;
}

/** Fontes com rótulo fixo (a nota do motor é para o agente, não para a tela). */
const ROTULO_FIXO: Readonly<Record<string, string>> = {
  tela: 'da tela do SEI',
  pca: 'do PCA',
  usuario: 'informado por você',
  ultima_vez: 'da última vez',
};
const ROTULO_PADRAO: Readonly<Record<string, string>> = { arvore: 'da árvore do processo', autos: 'dos autos', regra: 'por regra', agente: 'redigido pela IA: valide' };

/** Rótulo da origem a partir da evidência do motor (EvidenciaCfc) ou dos guardados (fonte ultima_vez). */
export function origemDe(ev: Partial<EvidenciaCfc> | undefined): OrigemCampo | null {
  if (!ev?.fonte) return null;
  const nota = ev.nota?.trim();
  const ia = !!nota && /pela IA/i.test(nota);
  const rotulo = (!ia && ROTULO_FIXO[ev.fonte]) || nota || ROTULO_PADRAO[ev.fonte] || ev.fonte;
  return { rotulo, ...(ev.sei ? { sei: ev.sei } : {}), ...(ia ? { ia: true } : {}) };
}

const capitalizar = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
function tipoDaEntrada(e: EntradaCfc): TipoCampo {
  if (e.tipo === 'lista') return e.campos?.includes('nome') ? 'lista_pessoas' : 'tabela_itens';
  return e.tipo === 'data' ? 'data' : e.tipo === 'escolha' ? 'escolha' : 'texto';
}

/** O ctx do gera para decidir o que aparece; com valores ainda inválidos (data errada), os valores puros. */
function contexto(modelo: string, valores: Record<string, unknown>): Record<string, unknown> {
  try {
    return contextoCfc(documentoDe(modelo, valores));
  } catch {
    return { ...valores };
  }
}

/** Campos visíveis do modelo para o estado atual, na ordem do formulario.json; depois as entradas que não são pergunta. */
export function camposDoFormulario(modelo: string, estado: EstadoCfc, entradas: readonly EntradaCfc[], faltando: readonly string[]): Campo[] {
  const ctx = contexto(modelo, estado.valores);
  const falta = new Set(faltando);
  const perguntas = new Set(modeloCfc(modelo).perguntas.map(p => p.id));
  const campo = (nome: string, base: Omit<Campo, 'nome' | 'valor' | 'origem' | 'falta'>): Campo => ({
    nome,
    ...base,
    valor: estado.valores[nome] ?? (nome in ctx ? ctx[nome] : undefined),
    origem: origemDe(estado.evidencias[nome]),
    falta: falta.has(nome),
  });
  const saida: Campo[] = perguntasVisiveisCfc(modelo, ctx).map(p => campo(p.id, {
    rotulo: p.texto, tipo: p.tipo, opcoes: p.opcoes ? [...p.opcoes] : null, obrigatoria: p.obrigatoria, nota: p.nota, colunas: [],
  }));
  for (const e of entradas) {
    if (perguntas.has(e.nome) || saida.some(c => c.nome === e.nome)) continue;
    saida.push(campo(e.nome, {
      rotulo: capitalizar(e.descricao), tipo: tipoDaEntrada(e), opcoes: e.opcoes ? [...e.opcoes] : null,
      obrigatoria: false, nota: '', colunas: e.campos ? [...e.campos] : [],
    }));
  }
  return saida;
}

/** Só os campos visíveis com valor entram em dados (o que ficou escondido por quando_aparece sai). */
export function dadosDoFormulario(campos: readonly Campo[], valores: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const dados: Record<string, unknown> = {};
  for (const c of campos) if (c.nome in valores && temValor(valores[c.nome])) dados[c.nome] = valores[c.nome];
  return dados;
}
