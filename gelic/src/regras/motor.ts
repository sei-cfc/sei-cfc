/**
 * Etapa do rito da Gelic pelos títulos dos documentos: porte fiel da parte "regra" do
 * scripts/etapa.py da skill gelic, sobre os MESMOS arquivos (gelic/regras/etapas.json e
 * fatos-etapa.json, copiados da skill e convertidos em src/regras/dados.gerado.ts). Paridade conferida por tests/paridade.
 *
 * O que fica de fora: o segundo juiz (Jev) e a confirmação do usuário. Fato que a regra não
 * calcula (objeto do contrato, instrumento da alteração…) fica `null`, e o documento que
 * dependia dele vira pergunta (`opcoes`), como na skill sem Jev.
 *
 * Função pura: sem DOM, sem rede. A ordem dos documentos é a ordem da árvore do SEI.
 */
// Gerado de regras/etapas.json e fatos-etapa.json (o agente-ia não importa JSON): npm run gerar.
import { ETAPAS_JSON, FATOS_JSON } from './dados.gerado';

export type ValorFato = boolean | string | null;
export type Valores = Record<string, ValorFato>;

type Par = [string, string];
type Pares = Par | Par[];
export interface Condicao {
  tem?: string[];
  tem_algum?: string[];
  nao_tem?: string[];
  depois_de?: Pares;
  nao_depois_de?: Pares;
  marca?: Pares;
  sem_marca?: Pares;
  familia?: string;
}

export interface Opcao { template?: string; dados?: Record<string, unknown>; acao?: string; comando?: string }
export interface DocumentoEtapa extends Opcao {
  criterio?: 'fato' | 'usuario' | 'portaria_233';
  fato?: string;
  por_valor?: Record<string, string | string[]>;
  padrao?: string;
  motivo?: string;
  opcoes?: Record<string, Opcao>;
}
export interface Etapa { id: string; descricao: string; quando: Condicao; documento: DocumentoEtapa }

interface RegraFato {
  tem?: string;
  depois_de?: [string, string];
  marca?: string;
  valores?: Record<string, boolean | string>;
  marca_em_algum?: Record<string, string>;
}
export interface Fato {
  id: string;
  tipo: 'noul' | 'choice';
  rotulo: string;
  pergunta: string;
  opcoes?: Record<string, string>;
  aplica_se?: string;
  regra: RegraFato | null;
}

export interface Documento { ordem: number; titulo: string; tipo: string; marcas: string[] }

const ETAPAS = ETAPAS_JSON as unknown as {
  tipos: Record<string, string[]>;
  marcas: Record<string, string[]>;
  modelos: Record<string, string>;
  etapas: Etapa[];
};
export const FATOS = (FATOS_JSON as unknown as { fatos: Fato[] }).fatos;
export const LISTA_ETAPAS: readonly Etapa[] = ETAPAS.etapas;
export const ETAPA: Readonly<Record<string, Etapa>> = Object.fromEntries(ETAPAS.etapas.map(e => [e.id, e]));
export const FATO: Readonly<Record<string, Fato>> = Object.fromEntries(FATOS.map(f => [f.id, f]));
export const MOTIVO_SEM_LIMITES = 'limites do art. 75 / Portaria 233 não configurados em references/limites.json';

// ---------------------------------------------------------------- regex do Python → JS

/**
 * Python `re.search(p, s, re.I)` sobre str é Unicode. Em JS, a flag `u` dá a mesma
 * comparação sem caixa para letras acentuadas; padrão que a `u` recusa cai para só `i`.
 */
function compilar(p: string): RegExp {
  try {
    return new RegExp(p, 'iu');
  } catch {
    return new RegExp(p, 'i');
  }
}
const TIPOS: [string, RegExp[]][] = Object.entries(ETAPAS.tipos).map(([t, ps]) => [t, ps.map(compilar)]);
const MARCAS: [string, RegExp[]][] = Object.entries(ETAPAS.marcas ?? {}).map(([m, ps]) => [m, ps.map(compilar)]);

/** Tipo canônico pelo título: a primeira entrada de `tipos` cuja regex casar; senão "outro". */
export function tipoDe(titulo: string): string {
  for (const [tipo, res] of TIPOS) if (res.some(r => r.test(titulo))) return tipo;
  return 'outro';
}

/** Rótulos lidos do título inteiro (prorrogação, acréscimo/supressão, SRP…), em ordem alfabética. */
export function marcasDe(titulo: string): string[] {
  return MARCAS.filter(([, res]) => res.some(r => r.test(titulo))).map(([m]) => m).sort();
}

export function classificar(titulos: readonly string[]): Documento[] {
  return titulos.map((titulo, i) => ({ ordem: i + 1, titulo, tipo: tipoDe(titulo), marcas: marcasDe(titulo) }));
}

// ---------------------------------------------------------------- fatos pela regra

const IDX_TEM = new Map<string, string>();
const IDX_ORDEM = new Map<string, string>();
const IDX_MARCA = new Map<string, [string, boolean | string]>();
for (const f of FATOS) {
  const r = f.regra;
  if (r?.tem) IDX_TEM.set(r.tem, f.id);
  if (r?.depois_de) IDX_ORDEM.set(r.depois_de.join('\u0000'), f.id);
  if (r?.marca) for (const [m, v] of Object.entries(r.valores ?? {})) IDX_MARCA.set(`${r.marca}\u0000${m}`, [f.id, v]);
}

function indice<T>(mapa: Map<string, T>, chave: string, oque: string): T {
  const v = mapa.get(chave);
  if (v === undefined) throw new Error(`Condição sem fato em fatos-etapa.json: ${oque} ${chave.replace('\u0000', ' / ')}`);
  return v;
}

/** Ordem do último documento dos tipos dados ("a|b"); "*" = qualquer documento; -1 sem nenhum. */
function ultimo(docs: readonly Documento[], tipos: string): number {
  const alvo = new Set(tipos.split('|'));
  return docs.reduce((m, d) => (alvo.has('*') || alvo.has(d.tipo) ? Math.max(m, d.ordem) : m), -1);
}

/** Uma condição aceita um par ou uma lista de pares (o `_pares` do Python). */
function pares(v: Pares | undefined): Par[] {
  if (!v || v.length === 0) return [];
  return typeof v[0] === 'string' ? [v as Par] : (v as Par[]);
}

export function fatoPelaRegra(f: Fato, docs: readonly Documento[]): ValorFato {
  const r = f.regra;
  if (f.aplica_se && !docs.some(d => d.tipo === f.aplica_se)) return null;
  if (!r) return null;
  if (r.tem !== undefined) return docs.some(d => d.tipo === r.tem);
  if (r.depois_de) return ultimo(docs, r.depois_de[0]) > ultimo(docs, r.depois_de[1]);
  if (r.marca !== undefined) {
    let d: Documento | undefined;
    for (const x of docs) if (x.tipo === r.marca && (!d || x.ordem > d.ordem)) d = x;
    if (!d) return null;
    for (const [m, v] of Object.entries(r.valores ?? {})) if (d.marcas.includes(m)) return v;
    return f.tipo === 'noul' ? false : null;
  }
  if (r.marca_em_algum) {
    const vistos = new Set(Object.entries(r.marca_em_algum).filter(([m]) => docs.some(d => d.marcas.includes(m))).map(([, v]) => v));
    return vistos.size === 1 ? [...vistos][0] : null;
  }
  throw new Error(`regra desconhecida no fato ${f.id}`);
}

export function valoresRegra(docs: readonly Documento[]): Valores {
  return Object.fromEntries(FATOS.map(f => [f.id, fatoPelaRegra(f, docs)]));
}

// ---------------------------------------------------------------- etapa a partir dos fatos

export function casaFatos(c: Condicao, v: Valores, familia: string | null = null): boolean {
  const tem = (t: string) => v[indice(IDX_TEM, t, 'tem')];
  const ordem = (p: Par) => v[indice(IDX_ORDEM, p.join('\u0000'), 'depois_de')];
  if ((c.tem ?? []).some(t => tem(t) !== true)) return false;
  if (c.tem_algum?.length && !c.tem_algum.some(t => tem(t) === true)) return false;
  if ((c.nao_tem ?? []).some(t => tem(t) === true)) return false;
  if (pares(c.depois_de).some(p => ordem(p) !== true)) return false;
  if (pares(c.nao_depois_de).some(p => ordem(p) === true)) return false;
  for (const [t, m] of pares(c.marca)) {
    const [fid, val] = indice(IDX_MARCA, `${t}\u0000${m}`, 'marca');
    if (v[fid] !== val) return false;
  }
  for (const [t, m] of pares(c.sem_marca)) {
    const [fid, val] = indice(IDX_MARCA, `${t}\u0000${m}`, 'marca');
    if (v[fid] === val) return false;
  }
  if (c.familia && c.familia !== familia) return false;
  return true;
}

export function etapasQueCasam(v: Valores, familia: string | null = null): string[] {
  return ETAPAS.etapas.filter(e => casaFatos(e.quando, v, familia)).map(e => e.id);
}

/** Opção (ou lista) que o valor do fato escolhe; sem valor em por_valor, a opção `padrao`. */
function alvoDoFato(doc: DocumentoEtapa, valor: ValorFato): string | string[] | undefined {
  const alvo = valor !== null ? doc.por_valor?.[String(valor)] : undefined;
  return alvo === undefined ? doc.padrao : alvo;
}

export type Escolha = string | string[] | null;

/** [etapa, escolha do documento pelo fato]: o que um fato relevante pode mudar. */
export function desfecho(v: Valores, familia: string | null = null): [string | null, Escolha] {
  const ids = etapasQueCasam(v, familia);
  if (!ids.length) return [null, null];
  const doc = ETAPA[ids[0]].documento;
  let escolha: Escolha = null;
  if (doc.criterio === 'fato') escolha = alvoDoFato(doc, v[doc.fato!] ?? null) ?? null;
  return [ids[0], escolha];
}

const mesmo = (a: [string | null, Escolha], b: [string | null, Escolha]) => JSON.stringify(a) === JSON.stringify(b);
const alternativas = (f: Fato): ValorFato[] => (f.tipo === 'noul' ? [true, false] : Object.keys(f.opcoes ?? {}));

/** Fatos cujo valor, trocado sozinho, muda a etapa ou o documento: os que decidem e precisam estar certos. */
export function relevantes(v: Valores, familia: string | null = null): string[] {
  const base = desfecho(v, familia);
  return FATOS.filter(f => alternativas(f).some(alt => alt !== v[f.id] && !mesmo(desfecho({ ...v, [f.id]: alt }, familia), base))).map(f => f.id);
}

// ---------------------------------------------------------------- documento

const sn = (x: ValorFato) => (x === true ? 'sim' : x === false ? 'não' : x === null ? '—' : x);

export interface DocumentoResolvido extends Opcao { opcao?: string; fundamento?: string }
export interface Resolucao { documento: DocumentoResolvido | null; opcoes: string[] | null; motivo: string | null }

/**
 * O documento (ou ação) da etapa. Sem os limites da Portaria 233 nem o valor da contratação
 * (a extensão só vê títulos), o critério `portaria_233` sempre vira pergunta.
 */
export function resolverDocumento(etapa: Etapa, v: Valores): Resolucao {
  const doc = etapa.documento;
  if (!doc.opcoes) return { documento: doc, opcoes: null, motivo: null };
  if (doc.criterio === 'portaria_233') return { documento: null, opcoes: Object.keys(doc.opcoes), motivo: MOTIVO_SEM_LIMITES };
  if (doc.criterio === 'fato') {
    const valor = v[doc.fato!] ?? null;
    const alvo = alvoDoFato(doc, valor);
    if (typeof alvo === 'string') {
      const mostrado = valor !== null && doc.por_valor && String(valor) in doc.por_valor ? valor : `${sn(valor)} (padrão da etapa)`;
      return { documento: { ...doc.opcoes[alvo], opcao: alvo, fundamento: `${FATO[doc.fato!].rotulo}: ${mostrado}` }, opcoes: null, motivo: null };
    }
    if (Array.isArray(alvo)) return { documento: null, opcoes: [...alvo], motivo: `${FATO[doc.fato!].rotulo}: ${valor} — ${doc.motivo}` };
    return { documento: null, opcoes: Object.keys(doc.opcoes), motivo: doc.motivo ?? null };
  }
  return { documento: null, opcoes: Object.keys(doc.opcoes), motivo: doc.motivo ?? 'os autos não dizem qual documento' };
}

export const nomeModelo = (template: string) => ETAPAS.modelos[template] ?? template;

// ---------------------------------------------------------------- diagnóstico para a tela e para o agente

export interface Diagnostico {
  /** Etapa, ou null quando nenhuma condição casa (processo fora do rito ou títulos que a regra não reconhece). */
  etapa: string | null;
  descricao: string | null;
  resolucao: Resolucao | null;
  /** Fatos que decidiram a etapa, com o valor que a regra leu ("há DVI: sim"). */
  decisivos: { id: string; rotulo: string; valor: ValorFato }[];
  /** Documentos que a regra reconheceu (tipo ≠ "outro"), na ordem da árvore. */
  reconhecidos: Documento[];
}

export function diagnosticar(titulos: readonly string[]): Diagnostico {
  const docs = classificar(titulos);
  const v = valoresRegra(docs);
  const [etapa] = desfecho(v);
  const reconhecidos = docs.filter(d => d.tipo !== 'outro');
  if (!etapa) return { etapa: null, descricao: null, resolucao: null, decisivos: [], reconhecidos };
  return {
    etapa,
    descricao: ETAPA[etapa].descricao,
    resolucao: resolverDocumento(ETAPA[etapa], v),
    decisivos: relevantes(v).map(id => ({ id, rotulo: FATO[id].rotulo, valor: v[id] })),
    reconhecidos,
  };
}
