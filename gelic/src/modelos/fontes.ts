/**
 * Fontes dos documentos por modelo: de que peças dos autos saem as variáveis de cada modelo, e o recorte delas
 * para a chamada única ao modelo de IA (gancho G3). A regra é fixa, por tipo de peça (o tipo do motor de etapas,
 * `tipoDe`, mais alguns tipos só daqui: MCP, proposta, relatório da dispensa, manifestação, representação,
 * índice). Só essas peças são lidas, e cada uma entra recortada: o modelo precisa de valores (nomes, CNPJ, valores,
 * datas, cláusulas), não da análise inteira, então o orçamento é bem menor que o do DVI.
 *
 * Funções puras (a leitura é de src/dvi/preparar: `lerDocumentos`).
 */
import { tipoDe } from '../regras/motor';
import { enxugar, primeiraPagina, recorte } from '../dvi/preparar/selecionar';

/** Orçamento dos textos do pacote, em caracteres (≈ 15 mil tokens; o DVI usa 60 a 120 mil). */
export const ORCAMENTO_MODELO = 36_000;
/** Documento até este tamanho (já enxugado) entra inteiro; maior entra pela 1ª página + recorte. */
export const LIMITE_INTEGRAL = 8_000;
/** No máximo isto de documentos lidos por modelo. */
export const MAX_FONTES = 10;
const PISO_CORTE = 1_200;

/** Tipos só da leitura dos modelos, pelo título (o `tipoDe` os deixa como "outro"). Acentos em \uXXXX: o selo leva estas regras, e o bundle dele é ASCII. */
const EXTRAS: readonly [string, RegExp][] = [
  ['mcp', /mapa (de )?comparativo|\bmcp\b|pesquisa de pre[\u00e7c]o/i],
  ['relatorio_dispensa', /relat[\u00f3o]rio.*(dispensa|disputa|sess[\u00e3a]o|lances)|resultado.*dispensa|ata da sess[\u00e3a]o/i],
  ['proposta', /proposta|or[\u00e7c]amento/i],
  ['representacao', /estatuto|contrato social|procura[\u00e7c][\u00e3a]o|ata de (assembleia|elei)|requerimento de empres/i],
  ['indice', /[\u00edi]ndice|\bipca\b|\binpc\b|\bigp|mem[\u00f3o]ria de c[\u00e1a]lculo|planilha de reajuste/i],
  ['manifestacao', /manifesta[\u00e7c][\u00e3a]o|anu[\u00eae]ncia|interesse|of[\u00edi]cio/i],
];

/** Tipo da peça para a leitura dos modelos: o do motor de etapas ou um dos EXTRAS. */
export function tipoFonte(titulo: string): string {
  const t = tipoDe(titulo);
  if (t !== 'outro') return t;
  return EXTRAS.find(([, re]) => re.test(titulo))?.[0] ?? 'outro';
}

const CONTRATACAO = ['tr', 'etp', 'dfd', 'mcp', 'proposta', 'relatorio_dispensa', 'aviso_dispensa', 'nota_reserva'];
const CONTRATO_DIRETO = ['tr', 'proposta', 'autorizacao', 'relatorio_dispensa', 'aviso_dispensa', 'nota_reserva', 'representacao', 'mcp'];
const CONTRATO_LICITACAO = ['tr', 'edital', 'homologacao', 'proposta', 'nota_reserva', 'nota_empenho', 'representacao'];
const EDITAL = ['tr', 'etp', 'mcp', 'dfd'];
const ALTERACAO = ['contrato', 'termo_aditivo', 'formulario_alteracao', 'manifestacao', 'indice', 'nota_reserva', 'representacao'];

/** Para cada modelo, os tipos de peça de onde saem as variáveis, na ordem de prioridade da leitura. */
export const FONTES: Readonly<Record<string, readonly string[]>> = {
  'autorizacao-contratacao-direta': CONTRATACAO,
  'aviso-dispensa-eletronica': ['tr', 'etp', 'mcp', 'dfd'],
  'contrato-compras': CONTRATO_DIRETO,
  'contrato-servicos': CONTRATO_DIRETO,
  'agu-contrato-compras': CONTRATO_LICITACAO,
  'agu-contrato-servicos-sem-mo': CONTRATO_LICITACAO,
  'agu-contrato-servicos-com-mo': CONTRATO_LICITACAO,
  'agu-contrato-obras': CONTRATO_LICITACAO,
  'agu-ata-registro-precos': ['tr', 'edital', 'aviso_dispensa', 'homologacao', 'proposta', 'relatorio_dispensa'],
  'agu-edital-pregao': EDITAL,
  'agu-edital-tecnica-preco': EDITAL,
  'agu-edital-credenciamento': EDITAL,
  'termo-aditivo-prorrogacao': ALTERACAO,
  'termo-aditivo-prorrogacao-8666': ALTERACAO,
  'termo-aditivo-alteracao': ['contrato', 'termo_aditivo', 'formulario_alteracao', 'manifestacao', 'nota_reserva', 'representacao'],
  'termo-apostilamento-reajuste': ['contrato', 'termo_aditivo', 'apostila', 'formulario_alteracao', 'indice', 'manifestacao'],
  'termo-extincao-unilateral': ['contrato', 'termo_aditivo', 'informacao_inexecucao', 'notificacao', 'parecer'],
  'despacho-projur': ['contrato', 'termo_aditivo', 'minuta_aditivo', 'termo_extincao', 'formulario_alteracao', 'manifestacao', 'informacao_inexecucao'],
  'despacho-abertura-par': ['informacao_inexecucao', 'notificacao', 'contrato', 'parecer'],
  'despacho-gecont-reserva': ['contrato', 'termo_aditivo', 'formulario_alteracao', 'tr', 'mcp', 'proposta'],
};

/** Quantos documentos de cada tipo entram (os mais recentes); o padrão é 1. */
const QUANTOS: Readonly<Record<string, number>> = { proposta: 2 };

export interface DocTitulado { numero: string; titulo: string }
export interface Fonte extends DocTitulado { tipo: string }

/** As peças a ler para o modelo: por tipo, na ordem de FONTES, as mais recentes de cada; no máximo MAX_FONTES. */
export function selecionarFontes(docs: readonly DocTitulado[], modelo: string): { fontes: Fonte[]; ausentes: string[] } {
  const tipos = FONTES[modelo] ?? [];
  const comTipo = docs.map(d => ({ ...d, tipo: tipoFonte(d.titulo) }));
  const fontes: Fonte[] = [];
  const ausentes: string[] = [];
  for (const t of tipos) {
    const doTipo = comTipo.filter(d => d.tipo === t);
    if (!doTipo.length) { ausentes.push(t); continue; }
    fontes.push(...doTipo.slice(-(QUANTOS[t] ?? 1)));
  }
  return { fontes: fontes.slice(0, MAX_FONTES), ausentes };
}

/** Linhas com valor que um modelo preenche: dinheiro, CNPJ, datas, prazos, partes, dotação, cláusulas. */
export const CHAVE_VALORES = new RegExp(
  'R\\$|cnpj|cpf|\\d{2}/\\d{2}/\\d{4}|vig[êe]ncia|prazo|dota[çc]|or[çc]ament|elemento de despesa|centro de custo|conta cont|'
  + 'projeto|garantia|reajust|[íi]ndice|ipca|objeto|contratad|representad|procurador|s[óo]cio|administrador|endere[çc]o|sede|'
  + 'inscrit|valor|processo|dispensa|inexigib|art\\.? ?7[45]|unidade|ger[êe]ncia|prorroga|supress|acr[ée]scimo|percentual|%', 'iu');

export interface Recorte { modo: 'integral' | 'recorte'; texto: string; cortado: number }

/** O texto que vai ao modelo: inteiro se curto; senão a 1ª página e as linhas com valor do resto. */
export function recortarFonte(texto: string): Recorte {
  const limpo = enxugar(texto).trim();
  if (limpo.length <= LIMITE_INTEGRAL) return { modo: 'integral', texto: limpo, cortado: 0 };
  const p1 = primeiraPagina(limpo);
  const resto = recorte(limpo.slice(p1.length), CHAVE_VALORES, 0);
  return { modo: 'recorte', texto: `${p1.trimEnd()}\n${resto}`.trim(), cortado: 0 };
}

/** Faz os recortes caberem no orçamento: corta o fim do maior texto (nunca abaixo de PISO_CORTE), com a marca. */
export function caberNoOrcamentoModelo<T extends Recorte>(docs: T[], orcamento = ORCAMENTO_MODELO): T[] {
  const total = () => docs.reduce((s, d) => s + d.texto.length, 0);
  const esgotados = new Set<T>();
  while (total() > orcamento) {
    const x = [...docs].sort((a, b) => b.texto.length - a.texto.length).find(d => !esgotados.has(d));
    if (!x) break;
    const alvo = Math.max(PISO_CORTE, x.texto.length - (total() - orcamento) - 80);
    if (alvo >= x.texto.length) { esgotados.add(x); continue; }
    const fim = x.texto.lastIndexOf('\n', alvo);
    const corte = fim > alvo * 0.8 ? fim : alvo;
    const cortado = x.texto.length - corte;
    x.texto = `${x.texto.slice(0, corte)}\n[... ${cortado} caracteres cortados pelo limite do pacote]`;
    x.cortado += cortado;
    esgotados.add(x);
  }
  return docs;
}
