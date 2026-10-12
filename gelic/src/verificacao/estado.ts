/**
 * Estado da verificação prévia da UO (desenho 2026-10-10-verificacao-previa-uo.md), em dois modos, sempre à escolha da
 * unidade (decisão do usuário, 2026-10-12):
 *  - `presenca` (sem IA): determinístico, sem juízo de valor; os itens são as checagens mecânicas do DVI (peças da
 *    etapa, assinaturas, cronologia, números, valores, validades), guardados em gelic_verificacao_presenca:<protocolo>;
 *  - `ia`: o modelo julga cada item do checklist da Gelic, guardado em gelic_verificacao:<protocolo>.
 * Puro, menos ler/guardar. Storage ausente ou com erro vira "nada guardado".
 *
 * Nova rodada: vai de novo à IA só o item pendente (não atende, não verificado), o item cujo documento de origem
 * mudou ou saiu, o item novo (série que passou a valer) e, quando entrou documento, o "não se aplica". Atende e
 * justificado ficam como estavam: o resultado não muda à toa entre uma rodada e outra.
 */
import type { Achado, Achados, StatusChecklist } from '../dvi/montar/achados';
import { semEnvelope } from '../dvi/contexto';
import { pendenciasDoPacote } from '../dvi/pendencias';
import type { PacoteDvi } from '../dvi/preparar/index';
import type { Area } from '../peca/guardados';

export type Situacao = StatusChecklist | 'justificado';
export type Modo = 'presenca' | 'ia';
export interface AchadoDoItem { documento: string; sei: string; achado: Achado }
export interface ItemVerificado {
  id: string;
  texto: string;
  /** Grau do item do checklist (modo ia). */
  grau?: 'I' | 'R';
  /** O grupo da checagem (modo presenca): aparece no lugar do id, que é interno. */
  grupo?: string;
  status: StatusChecklist;
  sei?: string;
  nota?: string;
  achados: AchadoDoItem[];
  justificativa?: string;
  /** A justificativa de antes do reexame: a caixa já vem com ela, mas o item só fecha com novo "Justificar". */
  justificativaAnterior?: string;
}
/** Documento que a rodada viu nos autos: lido (o texto foi à verificação) ou não examinado (com o motivo). */
export interface DocConferido { numero: string; titulo: string; marca: string; lido: boolean; motivo?: string }
export interface Verificacao {
  versao: 1;
  modo: Modo;
  processo: string;
  /** ISO da última rodada. */
  em: string;
  etapa: string;
  familia: string;
  itens: ItemVerificado[];
  /** Achados sem id do checklist: aparecem na tela, não fecham nem abrem o checklist. */
  outros: AchadoDoItem[];
  ausencias: string[];
  documentos: DocConferido[];
  rodadas: number;
}

export const situacaoDe = (i: ItemVerificado): Situacao =>
  i.justificativa && (i.status === 'nao_atende' || i.status === 'nao_verificado') ? 'justificado' : i.status;
const RESOLVIDO: ReadonlySet<Situacao> = new Set(['atende', 'nao_se_aplica', 'justificado']);
export const pendentes = (v: Verificacao) => v.itens.filter(i => !RESOLVIDO.has(situacaoDe(i)));
export const fechado = (v: Verificacao) => v.itens.length > 0 && pendentes(v).length === 0;

/** FNV-1a de 32 bits em hex: muda quando o texto muda (não é segurança). */
function marcaDe(texto: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) { h ^= texto.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
const FORA_DOS_AUTOS = /^(sigiloso|cancelado)/;

/** Os documentos que a rodada viu: os lidos (marca do texto e da assinatura) e os não lidos que continuam nos autos. */
export function documentosDoPacote(p: PacoteDvi): DocConferido[] {
  const docs: DocConferido[] = p.documentos.map(d => ({ numero: d.numero, titulo: d.titulo, marca: `${marcaDe(semEnvelope(d.texto))}${d.assinado ? 'a' : 'n'}`, lido: true }));
  const vistos = new Set(docs.map(d => d.numero));
  for (const n of p.limites.documentosNaoLidos) {
    if (vistos.has(n.numero) || !n.titulo || FORA_DOS_AUTOS.test(n.motivo)) continue;
    vistos.add(n.numero);
    docs.push({ numero: n.numero, titulo: n.titulo, marca: `nl:${marcaDe(n.motivo)}`, lido: false, motivo: n.motivo });
  }
  return docs.sort((a, b) => Number(a.numero) - Number(b.numero));
}

export function aReexaminar(ant: Verificacao | null, p: PacoteDvi): string[] {
  const ids = p.checklist.map(i => i.id);
  if (!ant) return ids;
  const agora = new Map(documentosDoPacote(p).map(d => [d.numero, d.marca]));
  const antes = new Map(ant.documentos.map(d => [d.numero, d.marca]));
  const mudou = (sei?: string) => !!sei && (!agora.has(sei) || agora.get(sei) !== antes.get(sei));
  const entrou = [...agora.keys()].some(n => !antes.has(n));
  const porId = new Map(ant.itens.map(i => [i.id, i]));
  return ids.filter(id => {
    const i = porId.get(id);
    if (!i) return true;
    if ([i.sei, ...i.achados.map(a => a.sei)].some(mudou)) return true;
    const s = situacaoDe(i);
    if (s === 'atende' || s === 'justificado') return false;
    if (s === 'nao_se_aplica') return entrou;
    return true;
  });
}

const COMPATIBILIDADE = 'Compatibilidade entre documentos';

export function juntarRodada(ant: Verificacao | null, p: PacoteDvi, achados: Achados | null, reexaminados: readonly string[], agora: Date): Verificacao {
  const status = achados?.checklist_status ?? {};
  const porId = new Map<string, AchadoDoItem[]>();
  const outros: AchadoDoItem[] = [];
  const por = (x: AchadoDoItem) => {
    const id = x.achado.checklist;
    if (!id) { outros.push(x); return; }
    if (!porId.has(id)) porId.set(id, []);
    porId.get(id)!.push(x);
  };
  for (const b of achados?.blocos ?? []) for (const a of b.achados) por({ documento: b.documento, sei: b.sei, achado: a });
  for (const a of achados?.compatibilidade ?? []) por({ documento: COMPATIBILIDADE, sei: '', achado: a });
  const anteriores = new Map((ant?.itens ?? []).map(i => [i.id, i]));
  const itens = p.checklist.map((ci): ItemVerificado => {
    const velho = anteriores.get(ci.id);
    if (velho && !reexaminados.includes(ci.id)) return { ...velho, texto: ci.texto, grau: ci.grau };
    const e = status[ci.id] ?? { status: 'nao_verificado' as const };
    const novo: ItemVerificado = { id: ci.id, texto: ci.texto, grau: ci.grau, status: e.status, achados: porId.get(ci.id) ?? [] };
    if (e.sei) novo.sei = e.sei;
    if (e.nota) novo.nota = e.nota;
    const antes = velho?.justificativa ?? velho?.justificativaAnterior;
    if (antes && (e.status === 'nao_atende' || e.status === 'nao_verificado')) novo.justificativaAnterior = antes;
    return novo;
  });
  return {
    versao: 1,
    modo: 'ia',
    processo: p.processo,
    em: agora.toISOString(),
    etapa: p.etapa.nome,
    familia: p.familia,
    itens,
    // sem chamada à IA (nada a reexaminar), os outros apontamentos e as ausências da rodada anterior continuam
    outros: achados ? outros : ant?.outros ?? [],
    ausencias: achados ? [...(achados.ausencias ?? [])] : ant?.ausencias ?? [],
    documentos: documentosDoPacote(p),
    rodadas: (ant?.rodadas ?? 0) + 1,
  };
}

const PARA_STATUS = { atende: 'atende', 'não atende': 'nao_atende', 'a conferir': 'nao_verificado' } as const;
/** Os não lidos já vão na seção própria do documento ("não examinados"): não viram item. */
const FORA_DA_PRESENCA = 'Não examinados pelo código';

/**
 * O id do item sem IA: marca do grupo e do texto da checagem, sem o que muda sem o fato mudar — a posição do
 * documento na árvore ("[7] ") e a contagem de dias ("VENCIDA há 3 dia(s)" amanhã é "há 4").
 */
export function idDaChecagem(grupo: string, texto: string): string {
  const fato = texto.replace(/\[\d+\]\s*/g, '').replace(/\d+ dia\(s\)/g, 'N dia(s)').replace(/\d+ dias\b/g, 'N dias');
  return `R${marcaDe(`${grupo}|${fato}`)}`;
}
const seisDe = (texto: string) => [...texto.matchAll(/SEI (\d{6,8})/g)].map(m => m[1]);

/**
 * A rodada sem IA: cada checagem mecânica vira um item (id: idDaChecagem). A justificativa acompanha o item enquanto
 * o fato é o mesmo. Se o texto da checagem mudou, a justificativa não fecha o item novo: vira `justificativaAnterior`
 * do item pendente do mesmo grupo e do mesmo documento, já escrita na caixa.
 */
export function rodadaDePresenca(ant: Verificacao | null, p: PacoteDvi, agora: Date): Verificacao {
  const x = pendenciasDoPacote(p);
  const anteriores = new Map((ant?.itens ?? []).map(i => [i.id, i]));
  const itens: ItemVerificado[] = [];
  for (const g of x.grupos) {
    if (g.titulo === FORA_DA_PRESENCA) continue;
    for (const pd of g.itens) {
      const id = idDaChecagem(g.titulo, pd.texto);
      if (itens.some(i => i.id === id)) continue;
      const status = PARA_STATUS[pd.situacao];
      const item: ItemVerificado = { id, texto: pd.texto, grupo: g.titulo, status, achados: [] };
      const sei = seisDe(pd.texto)[0];
      if (sei) item.sei = sei;
      const just = anteriores.get(id)?.justificativa;
      if (just && status !== 'atende') item.justificativa = just;
      itens.push(item);
    }
  }
  const ids = new Set(itens.map(i => i.id));
  for (const velho of ant?.itens ?? []) {
    const just = velho.justificativa ?? velho.justificativaAnterior;
    if (!just || ids.has(velho.id)) continue;
    const seis = seisDe(velho.texto);
    const herdeiro = itens.find(i => i.grupo === velho.grupo && i.status !== 'atende' && !i.justificativa && !i.justificativaAnterior && seisDe(i.texto).some(n => seis.includes(n)));
    if (herdeiro) herdeiro.justificativaAnterior = just;
  }
  return {
    versao: 1, modo: 'presenca', processo: p.processo, em: agora.toISOString(), etapa: p.etapa.nome, familia: p.familia,
    itens, outros: [], ausencias: [], documentos: documentosDoPacote(p), rodadas: (ant?.rodadas ?? 0) + 1,
  };
}

export function justificar(v: Verificacao, id: string, texto: string): Verificacao {
  const t = texto.trim();
  if (!t) throw new Error('Escreva a justificativa.');
  const alvo = v.itens.find(i => i.id === id);
  if (!alvo || (alvo.status !== 'nao_atende' && alvo.status !== 'nao_verificado')) throw new Error(`O item ${id} não está pendente.`);
  return {
    ...v,
    itens: v.itens.map(i => {
      if (i.id !== id) return i;
      const novo: ItemVerificado = { ...i, justificativa: t };
      delete novo.justificativaAnterior;
      return novo;
    }),
  };
}

export const chaveVerificacao = (processo: string, modo: Modo = 'ia') => `gelic_verificacao${modo === 'presenca' ? '_presenca' : ''}:${processo}`;

export async function lerVerificacao(area: Area | null, processo: string, modo: Modo = 'ia'): Promise<Verificacao | null> {
  if (!area) return null;
  try {
    const chave = chaveVerificacao(processo, modo);
    const v = (await area.get(chave))[chave] as Partial<Verificacao> | undefined;
    if (!v || typeof v !== 'object' || v.versao !== 1 || v.processo !== processo || !Array.isArray(v.itens) || !Array.isArray(v.documentos)) return null;
    // a r20 gravou sem o modo: era sempre a com IA
    if ((v.modo ?? 'ia') !== modo) return null;
    return { outros: [], ausencias: [], ...v, modo } as Verificacao;
  } catch {
    return null;
  }
}

export async function guardarVerificacao(area: Area | null, v: Verificacao): Promise<void> {
  if (!area) return;
  await area.set({ [chaveVerificacao(v.processo, v.modo)]: v });
}
