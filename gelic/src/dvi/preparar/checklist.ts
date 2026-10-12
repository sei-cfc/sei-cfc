/**
 * Família do processo, séries do checklist e itens [I]/[R]: porte fiel de selecionar.familia_de,
 * gelic_lib.series_da_familia e gelic_lib.carregar_checklist, sobre os MESMOS arquivos da skill
 * (regras/dvi/checklist-*.md, convertidos em dados.gerado.ts por gerar.ts: o bundle do agente não importa .md).
 *
 * Funções puras. Paridade em tests/dvi-preparar.ts contra o gabarito do gerar_dvi_preparar.py.
 */
import { CHECKLISTS_MD } from './dados.gerado';
import { normalizar } from './texto';

export type Familia = 'preparatoria' | 'prorrogacao' | 'reajuste';

/** Apelidos → família (selecionar.FAMILIAS). */
export const FAMILIAS: Readonly<Record<Familia, readonly string[]>> = {
  preparatoria: ['preparatoria', 'pregao', 'dispensa', 'inexigibilidade', 'concorrencia', 'adesao', 'credenciamento'],
  prorrogacao: ['prorrogacao', 'aditivo'],
  reajuste: ['reajuste', 'repactuacao', 'apostilamento'],
};
export const CHECKLIST: Readonly<Record<Familia, string>> = {
  preparatoria: 'checklist-preparatoria.md',
  prorrogacao: 'checklist-contratual.md',
  reajuste: 'checklist-contratual.md',
};

/** Contrato ou aditivo, casado contra o título normalizado (selecionar.P_CONTRATO). */
export const P_CONTRATO = /^contrato\b|termo aditivo|apostila|termo de contrato/;

export interface FamiliaDoProcesso { familia: Familia; tipo: string }

/**
 * Família pelo tipo pedido (apelido) ou, sem ele, pelos títulos: há contrato/aditivo nos autos → prorrogação;
 * senão → preparatória (a família reajuste só vem pelo tipo, como na skill). `tipo` volta normalizado, com
 * "(inferido)" quando veio dos títulos — é o que o cabeçalho do _leitura.md mostra.
 */
export function familiaDoProcesso(titulos: readonly string[], tipo?: string | null): FamiliaDoProcesso {
  if (tipo) {
    const t = normalizar(tipo);
    for (const [fam, apelidos] of Object.entries(FAMILIAS) as [Familia, readonly string[]][]) if (apelidos.includes(t)) return { familia: fam, tipo: t };
    throw new Error(`tipo desconhecido: ${tipo}. Use um de: ${Object.values(FAMILIAS).flat().join(', ')}`);
  }
  const temContrato = titulos.some(t => P_CONTRATO.test(normalizar(t)));
  return temContrato ? { familia: 'prorrogacao', tipo: 'prorrogacao (inferido)' } : { familia: 'preparatoria', tipo: 'preparatoria (inferido)' };
}

// ---------------------------------------------------------------- séries (gelic_lib.series_da_familia)

export const SERIES_FAMILIA: Readonly<Record<Familia, readonly string[]>> = {
  preparatoria: ['A', 'F', 'T', 'R', 'P', 'K', 'M'],
  prorrogacao: ['G', 'B'],
  reajuste: ['G', 'C'],
};
const RE_REAJUSTE_TITULO = /indice|ipca|inpc|igp|reajust|repactua|apostila/;
const RE_CONTRATACAO_DIRETA = /inexigibilidade|dispensa de licitacao|contratacao direta|dispensa eletronica/;
const TIPOS_CONTRATACAO_DIRETA = ['inexigibilidade', 'dispensa'];

/**
 * Séries que recebem status na família. Prorrogação ganha C quando há título de reajuste nos autos ou algum
 * achado cita id C; preparatória ganha J quando o tipo é inexigibilidade/dispensa, um título indica contratação
 * direta ou algum achado cita id J. `idsDosAchados`: ids `checklist` dos achados já escritos (no preparar, vazio).
 */
export function seriesDoChecklist(familia: string, titulos: readonly string[], tipo?: string | null, idsDosAchados: readonly string[] = []): string[] {
  const series = [...(SERIES_FAMILIA[familia as Familia] ?? [])];
  if (familia === 'preparatoria' && !series.includes('J')) {
    let direta = TIPOS_CONTRATACAO_DIRETA.includes(normalizar(tipo ?? '').trim());
    direta ||= titulos.some(t => RE_CONTRATACAO_DIRETA.test(normalizar(t)));
    if (direta || idsDosAchados.some(id => id.startsWith('J'))) series.push('J');
  }
  if (familia === 'prorrogacao' && !series.includes('C')) {
    const haReajuste = titulos.some(t => RE_REAJUSTE_TITULO.test(normalizar(t)));
    if (haReajuste || idsDosAchados.some(id => id.startsWith('C'))) series.splice(series.indexOf('B') + 1, 0, 'C');
  }
  return series;
}

// ---------------------------------------------------------------- itens (gelic_lib.carregar_checklist)

export type Grau = 'I' | 'R';
export interface ItemChecklist { id: string; serie: string; grau: Grau; texto: string; ordem: number }
export interface Checklist { series: Record<string, string>; itens: ItemChecklist[]; porId: Record<string, ItemChecklist> }

const RE_SERIE_TITULO = /^## ([A-Z]) — (.+?)\s*$/gm;
const RE_LINHA_ITEM = /^\|\s*\[(?<id>[A-Z]\d{2})\]\s*\[(?<grau>[IR])\]\s*\|(?<meio>.*)\|\s*[IR]\s*\|\s*$/gm;

/** Séries {letra: título} e itens; texto = células do meio unidas por " — " (a série M tem a coluna Tipo). */
export function lerChecklist(md: string, arquivo = 'checklist'): Checklist {
  const series: Record<string, string> = {};
  for (const m of md.matchAll(RE_SERIE_TITULO)) series[m[1]] = m[2];
  const itens: ItemChecklist[] = [];
  const porId: Record<string, ItemChecklist> = {};
  for (const m of md.matchAll(RE_LINHA_ITEM)) {
    const { id, grau, meio } = m.groups!;
    const celulas = meio.split('|').map(c => c.trim()).filter(Boolean);
    const item: ItemChecklist = { id, serie: id[0], grau: grau as Grau, texto: celulas.join(' — '), ordem: itens.length };
    if (!(item.serie in series)) throw new Error(`${arquivo}: item ${id} fora de qualquer série '## X — ...'`);
    if (id in porId) throw new Error(`${arquivo}: id repetido ${id}`);
    itens.push(item);
    porId[id] = item;
  }
  return { series, itens, porId };
}

const CACHE: Record<string, Checklist> = {};
export function checklistDe(arquivo: string): Checklist {
  const md = CHECKLISTS_MD[arquivo];
  if (md === undefined) throw new Error(`checklist desconhecido: ${arquivo}`);
  return (CACHE[arquivo] ??= lerChecklist(md, arquivo));
}

export interface ItemDoPacote { id: string; texto: string; grau: Grau }

/** Os itens das séries que se aplicam, na ordem do arquivo — os que recebem status em checklist_status. */
export function itensDoChecklist(familia: Familia, series: readonly string[]): ItemDoPacote[] {
  return checklistDe(CHECKLIST[familia]).itens.filter(i => series.includes(i.serie)).map(({ id, texto, grau }) => ({ id, texto, grau }));
}
