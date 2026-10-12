/**
 * Checagens mecânicas para o DVI: porte do scripts/checar.py da skill gelic (o `_checagens.md`).
 *
 * `secoesFatos` reproduz, linha a linha, as seis seções do topo do _checagens.md (fatos.py); `linhasValidades`,
 * `linhasVigencias`, `linhasProximos` e `linhasCnpj` reproduzem as linhas das seções de validade, vigência,
 * valores muito próximos e CNPJ. É sobre essas linhas que a paridade com o Python é conferida.
 *
 * O pacote do DVI não leva o markdown: leva `checagensMecanicas`, uma lista curta de fatos com o nº SEI, o
 * mesmo conteúdo em itens. O que fica de fora de propósito (custo em tokens sem fato novo): as listas de todos
 * os valores em R$, de todos os percentuais e de todos os CNPJ por documento — estão no texto dos documentos
 * do pacote. Delas ficam só os cruzamentos (valores ≤ 1% entre documentos, CNPJ de mesma raiz).
 *
 * Funções puras; a data de referência (hoje) é parâmetro.
 */
import {
  citadosAusentes, cronologia, documentosSemAssinatura, mcpSemProposta, processosDivergentes, tituloXConteudo, validadesRelativas,
  type Conteudo, type DocAutos,
} from './fatos';
import { brlParaFloat, diasEntre, fmtData, floatParaBrl, paraData, todas, RE_CNPJ, RE_DATA, RE_VALOR, type Dia } from './texto';

const RE_VALIDADE = /v[áa]lid[ao]|validade|vencimento|vigente at[ée]|expira|v[áa]lida at[ée]/iu;
const RE_VIGENCIA = /(\d{2}\/\d{2}\/\d{4})\s*(?:a|à|até|-|–)\s*(\d{2}\/\d{2}\/\d{4})/g;
const RE_EMISSAO = /emitid[ao] em|emiss[ãa]o|expedi[çc][ãa]o|expedid[ao] em|gerado (?:no dia|em)|certifica, em|certifica-se que, em/iu;

export const rotulo = (d: Pick<DocAutos, 'seq' | 'titulo' | 'sei'>) => `[${d.seq}] ${d.titulo} (SEI ${d.sei || '—'})`;
const secao = (titulo: string, ls: string[]) => [titulo, '', ...(ls.length ? ls : ['- nenhum']), ''];
/** Fatias por ponto de código, como o Python (s[:90]). */
const corte = (s: string, n: number) => Array.from(s).slice(0, n).join('');
const ordenar = (xs: Iterable<string>) => [...xs].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

/** As seis seções do topo do _checagens.md (checar.secoes_fatos), com as mesmas linhas. */
export function secoesFatos(docs: readonly DocAutos[], processo: string, conteudo: Conteudo = {}): string[] {
  const porSeq = new Map(docs.map(d => [d.seq, d]));
  let L = secao('## Documentos sem assinatura eletrônica', documentosSemAssinatura(docs).map(x =>
    `- ${rotulo(x)}${x.digitalizado ? ' — digitalizado: assinatura manuscrita não detectável' : ''}`));
  L = L.concat(secao('## Cronologia (candidatos — conferir)', cronologia(docs, conteudo).map(x => `- ${x.texto}`)));
  const divergentes = processosDivergentes(docs, processo);
  const ls = divergentes.length ? [`Processo dos autos: ${processo}.`, ''] : [];
  ls.push(...divergentes.map(x => `- ${rotulo(x)}: cita o Processo ${x.processo} (p. ${x.paginas.join(', ') || '—'})`));
  L = L.concat(secao('## Número de processo diferente do processo dos autos (candidatos — conferir)', ls));
  L = L.concat(secao('## Título do SEI × conteúdo', tituloXConteudo(docs, conteudo).map(x => `- ${rotulo(x)}: o cabeçalho da peça é "${x.rotulo}"`)));
  L = L.concat(secao('## Documentos citados e não localizados no índice (candidatos — conferir)', citadosAusentes(docs, conteudo).map(x =>
    `- ${rotulo(porSeq.get(x.seq)!)}, p. ${x.p ?? '—'}: "${x.citacao}" — ${x.motivo}`)));
  const r = mcpSemProposta(docs, conteudo);
  const lm: string[] = [];
  if (r.mcp.length && r.valores.length) {
    const mcps = r.mcp.map(m => rotulo(porSeq.get(m.seq)!)).join('; ');
    const fontes = r.fontes.map(f => rotulo(porSeq.get(f.seq)!)).join('; ') || 'nenhum';
    lm.push(`- MCP: ${mcps}. Documentos comparados (propostas, orçamentos e anexos): ${fontes}.`);
    if (r.observacao) lm.push(`- Observação: ${r.observacao}.`);
    lm.push(`- Valores do MCP que não aparecem em nenhum desses documentos: ${r.valores.map(floatParaBrl).join(', ')}`);
  }
  return L.concat(secao('## Valores do MCP sem correspondência em proposta juntada (candidatos — conferir)', lm));
}

const situacao = (delta: number) => (delta < 0 ? `VENCIDA há ${-delta} dia(s)` : `vigente por ${delta} dia(s)`);

interface Validade { doc: DocAutos; linha: string; data: Dia; situacao: string; conferir: boolean; trecho: string }

function validades(docs: readonly DocAutos[], H: Dia): Validade[] {
  const saida: Validade[] = [];
  for (const d of docs) {
    const t = d.texto ?? '';
    for (const m of todas(RE_DATA, t)) {
      const fim = m.index + m[0].length;
      const ctx = t.slice(Math.max(0, m.index - 70), fim + 30).replace(/\n/g, ' ');
      if (!RE_VALIDADE.test(ctx) || RE_EMISSAO.test(t.slice(Math.max(0, m.index - 25), m.index))) continue;
      const dt = paraData(m[0]);
      if (!dt) continue;
      const sit = situacao(diasEntre(H, dt));
      const trecho = corte(ctx.trim().replace(/\s+/g, ' '), 90);
      saida.push({ doc: d, linha: `| ${rotulo(d)} | …${trecho}… | ${m[0]} | ${sit} |`, data: dt, situacao: sit, conferir: false, trecho: `…${trecho}…` });
    }
    for (const v of validadesRelativas(t)) {
      const delta = diasEntre(H, v.termo);
      let sit = situacao(delta);
      let base: string;
      if (v.origem === 'emissao') base = 'data de emissão/expedição na página';
      else { // WR-05: data-base incerta → não afirma vencimento
        base = 'data anterior na página; conferir se é a expedição';
        sit = `a conferir — se a data-base for a expedição, ${delta < 0 ? `venceu há ${-delta} dia(s)` : `vigente por ${delta} dia(s)`}`;
      }
      const trecho = `p. ${v.p ?? '—'}: "${v.contexto}" — ${v.dias} dias a contar de ${fmtData(v.base)} (${base})`;
      saida.push({ doc: d, linha: `| ${rotulo(d)} | ${trecho} | ${fmtData(v.termo)} | ${sit} |`, data: v.termo, situacao: sit, conferir: v.origem !== 'emissao', trecho });
    }
  }
  return saida;
}

/** Linhas da tabela "Datas de validade e vencimento" (sem cabeçalho). */
export const linhasValidades = (docs: readonly DocAutos[], H: Dia) => validades(docs, H).map(v => v.linha);

interface Periodo { a: string; b: string; quem: Set<string>; seis: Set<string> }
function periodos(docs: readonly DocAutos[]): Map<string, Periodo> {
  const p = new Map<string, Periodo>();
  for (const d of docs) {
    for (const [, a, b] of todas(RE_VIGENCIA, d.texto ?? '')) {
      const da = paraData(a);
      const db = paraData(b);
      if (!da || !db) continue;
      const dias = diasEntre(da, db);
      if (dias <= 0 || dias > 366 * 6) continue;
      const k = `${a}\u0000${b}`;
      if (!p.has(k)) p.set(k, { a, b, quem: new Set(), seis: new Set() });
      p.get(k)!.quem.add(rotulo(d));
      p.get(k)!.seis.add(d.sei);
    }
  }
  return p;
}
const termo = (b: string, H: Dia) => { const delta = diasEntre(H, paraData(b)!); return delta < 0 ? `encerrado há ${-delta} dia(s)` : `${delta} dia(s) restantes`; };

/** Linhas da tabela de vigências e, se houver, as de "mesmo início e termos finais diferentes". */
export function linhasVigencias(docs: readonly DocAutos[], H: Dia): string[] {
  const p = periodos(docs);
  const L = [...p.values()].sort((x, y) => (x.a < y.a ? -1 : x.a > y.a ? 1 : x.b < y.b ? -1 : x.b > y.b ? 1 : 0))
    .map(x => `| ${ordenar(x.quem).join('; ')} | ${x.a} a ${x.b} | ${termo(x.b, H)} |`);
  const div = divergenciasDeInicio(p);
  if (div.length) L.push('', 'Períodos com o mesmo início e termos finais diferentes (conferir qual prevalece):', ...div.map(([a, bs]) => `- início ${a}: termos ${bs.join(', ')}`));
  return L;
}
function divergenciasDeInicio(p: Map<string, Periodo>): [string, string[]][] {
  const inicios = new Map<string, Set<string>>();
  for (const x of p.values()) { if (!inicios.has(x.a)) inicios.set(x.a, new Set()); inicios.get(x.a)!.add(x.b); }
  return [...inicios].filter(([, bs]) => bs.size > 1).map(([a, bs]) => [a, ordenar(bs)]);
}

interface Proximo { a: number; b: number; ra: string[]; rb: string[] }
function proximos(docs: readonly DocAutos[]): Proximo[] {
  const valores = new Map<number, Set<string>>();
  for (const d of docs) {
    const vs = [...new Set(todas(RE_VALOR, d.texto ?? '').map(m => brlParaFloat(m[1])).filter(v => v >= 100))].sort((a, b) => a - b);
    for (const v of vs) { if (!valores.has(v)) valores.set(v, new Set()); valores.get(v)!.add(rotulo(d)); }
  }
  const lista = [...valores.keys()].sort((a, b) => a - b);
  const mesmo = (x: Set<string>, y: Set<string>) => x.size === y.size && [...x].every(e => y.has(e));
  const saida: Proximo[] = [];
  lista.forEach((a, i) => {
    for (const b of lista.slice(i + 1)) {
      if (b - a > a * 0.01) break;
      if (!mesmo(valores.get(a)!, valores.get(b)!)) saida.push({ a, b, ra: ordenar(valores.get(a)!), rb: ordenar(valores.get(b)!) });
    }
  });
  return saida;
}
/** Linhas de "Valores muito próximos (≤ 1%) em documentos diferentes". */
export const linhasProximos = (docs: readonly DocAutos[]) =>
  proximos(docs).map(x => `- ${floatParaBrl(x.a)} em ${x.ra.join('; ')}  ×  ${floatParaBrl(x.b)} em ${x.rb.join('; ')}`);

function cnpjs(docs: readonly DocAutos[]): [string, string[]][] {
  const raizes = new Map<string, Set<string>>();
  for (const d of docs) {
    for (const c of ordenar(new Set(todas(RE_CNPJ, d.texto ?? '').map(m => m[0])))) {
      const r = c.slice(0, 10);
      if (!raizes.has(r)) raizes.set(r, new Set());
      raizes.get(r)!.add(c);
    }
  }
  return [...raizes].filter(([, cs]) => cs.size > 1).map(([r, cs]) => [r, ordenar(cs)]);
}
/** Linhas de "Mesma raiz de CNPJ com estabelecimentos diferentes". */
export const linhasCnpj = (docs: readonly DocAutos[]) => cnpjs(docs).map(([r, cs]) => `- raiz ${r}: ${cs.join(', ')}`);

// ---------------------------------------------------------------- o que vai no pacote

export type TipoChecagem =
  | 'sem_assinatura' | 'cronologia' | 'processo_divergente' | 'titulo_x_conteudo' | 'citado_ausente' | 'mcp_sem_proposta'
  | 'validade' | 'vigencia' | 'vigencia_divergente' | 'valores_proximos' | 'cnpj_estabelecimentos'
  /** O vínculo do processo no sistema do PCA (src/pca/), para o A04. */
  | 'pca';

export interface Checagem {
  tipo: TipoChecagem;
  /** true: heurística ("candidatos — conferir"): confira no documento antes de virar achado. */
  candidato: boolean;
  texto: string;
  /** Nº SEI dos documentos envolvidos. */
  sei: string[];
}

export interface OpcoesChecagem {
  /** Número do processo dos autos (para o processo divergente). */
  processo: string;
  /** Data de referência das validades e vigências. */
  hoje: Dia;
  conteudo?: Conteudo;
  /** seq dos documentos lidos no pacote: validade, vigência, valores e CNPJ olham só estes (como a skill). */
  lidos?: readonly number[];
}

/**
 * Os fatos mecânicos do _checagens.md em itens. As seis primeiras categorias olham todos os documentos;
 * as demais, só os lidos (como na skill).
 */
export function checagensMecanicas(docs: readonly DocAutos[], o: OpcoesChecagem): Checagem[] {
  const conteudo = o.conteudo ?? {};
  const porSeq = new Map(docs.map(d => [d.seq, d]));
  const seiDe = (seq: number) => porSeq.get(seq)?.sei ?? '';
  const lidos = o.lidos ? docs.filter(d => o.lidos!.includes(d.seq)) : docs;
  const C: Checagem[] = [];
  for (const x of documentosSemAssinatura(docs)) {
    C.push({ tipo: 'sem_assinatura', candidato: false, texto: `${rotulo(x)} sem assinatura eletrônica${x.digitalizado ? ' (digitalizado: assinatura manuscrita não detectável)' : ''}`, sei: [x.sei] });
  }
  for (const x of cronologia(docs, conteudo)) C.push({ tipo: 'cronologia', candidato: true, texto: x.texto, sei: x.seis });
  for (const x of processosDivergentes(docs, o.processo)) {
    C.push({ tipo: 'processo_divergente', candidato: true, texto: `${rotulo(x)} cita o Processo ${x.processo} (p. ${x.paginas.join(', ') || '—'}); processo dos autos: ${o.processo}`, sei: [x.sei] });
  }
  for (const x of tituloXConteudo(docs, conteudo)) C.push({ tipo: 'titulo_x_conteudo', candidato: false, texto: `${rotulo(x)}: o cabeçalho da peça é "${x.rotulo}"`, sei: [x.sei] });
  for (const x of citadosAusentes(docs, conteudo)) {
    C.push({ tipo: 'citado_ausente', candidato: true, texto: `${rotulo(porSeq.get(x.seq)!)}, p. ${x.p ?? '—'}: "${x.citacao}" — ${x.motivo}`, sei: [x.sei] });
  }
  const r = mcpSemProposta(docs, conteudo);
  if (r.mcp.length && r.valores.length) {
    C.push({
      tipo: 'mcp_sem_proposta', candidato: true,
      texto: `Valores do MCP (${r.mcp.map(m => rotulo(porSeq.get(m.seq)!)).join('; ')}) que não aparecem em nenhuma proposta, orçamento ou anexo `
        + `(${r.fontes.map(f => rotulo(porSeq.get(f.seq)!)).join('; ') || 'nenhum'}): ${r.valores.map(floatParaBrl).join(', ')}${r.observacao ? `. Observação: ${r.observacao}` : ''}`,
      sei: [...r.mcp.map(m => m.sei), ...r.fontes.map(f => seiDe(f.seq))],
    });
  }
  for (const v of validades(lidos, o.hoje)) {
    C.push({ tipo: 'validade', candidato: v.conferir, texto: `${rotulo(v.doc)}: ${v.trecho} → ${fmtData(v.data)}: ${v.situacao}`, sei: [v.doc.sei] });
  }
  const p = periodos(lidos);
  for (const x of [...p.values()].sort((x, y) => (x.a < y.a ? -1 : x.a > y.a ? 1 : x.b < y.b ? -1 : 1))) {
    C.push({ tipo: 'vigencia', candidato: false, texto: `Período ${x.a} a ${x.b} (${termo(x.b, o.hoje)}) em ${ordenar(x.quem).join('; ')}`, sei: ordenar(x.seis) });
  }
  for (const [a, bs] of divergenciasDeInicio(p)) {
    const seis = ordenar(new Set([...p.values()].filter(x => x.a === a).flatMap(x => [...x.seis])));
    C.push({ tipo: 'vigencia_divergente', candidato: true, texto: `Períodos com o mesmo início ${a} e termos finais diferentes: ${bs.join(', ')} (conferir qual prevalece)`, sei: seis });
  }
  const seiDoRotulo = new Map(lidos.map(d => [rotulo(d), d.sei]));
  for (const x of proximos(lidos)) {
    C.push({
      tipo: 'valores_proximos', candidato: true,
      texto: `Valores muito próximos (≤ 1%) em documentos diferentes: ${floatParaBrl(x.a)} em ${x.ra.join('; ')} × ${floatParaBrl(x.b)} em ${x.rb.join('; ')}`,
      sei: ordenar(new Set([...x.ra, ...x.rb].map(q => seiDoRotulo.get(q) ?? ''))),
    });
  }
  for (const [raiz, cs] of cnpjs(lidos)) {
    const seis = lidos.filter(d => todas(RE_CNPJ, d.texto ?? '').some(m => m[0].startsWith(raiz))).map(d => d.sei);
    C.push({ tipo: 'cnpj_estabelecimentos', candidato: true, texto: `Mesma raiz de CNPJ ${raiz} com estabelecimentos diferentes: ${cs.join(', ')} (conferir qual é o contratado)`, sei: seis });
  }
  return C;
}
