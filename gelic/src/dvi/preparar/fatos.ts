/**
 * Fatos mecânicos dos autos: porte fiel do scripts/fatos.py da skill gelic (documentos sem assinatura,
 * cronologia, número de processo divergente, título × conteúdo, citados e não localizados, valores do MCP sem
 * proposta, validade relativa de certidão). As heurísticas só listam candidatos; quem decide é o modelo.
 *
 * Entrada: um documento por peça da árvore do SEI, com o texto já lido. Diferença de entrada em relação à
 * skill: lá o texto vem do PDF dos autos inteiros, com `[[p. N]]` numerando as páginas DOS AUTOS; aqui cada
 * documento vem sozinho do SEI, e só o PDF traz páginas (do próprio documento: `[página N]` do pdf.js, que o
 * preparar converte para `[[p. N]]`). Documento interno do SEI (HTML) não tem página: `p` sai null.
 *
 * Funções puras. Regex do Python sobre texto cru com `\w`/`\b` Unicode viram classes `\p{L}` (flag u).
 */
import { arred2, brlParaFloat, classe, compararDias, diaValido, fmtData, normalizar, paraData, somarDias, todas, RE_PROCESSO, RE_VALOR, type Dia } from './texto';

/** Um documento dos autos como os fatos o veem (o "doc" do indice.json + o texto). */
export interface DocAutos {
  /** Ordem na árvore, de 1 (o `seq` da skill). */
  seq: number;
  sei: string;
  titulo: string;
  /** Texto do documento; páginas marcadas por `[[p. N]]` quando houver. */
  texto: string;
  /** Datas (dd/mm/aaaa) das assinaturas eletrônicas lidas no texto. */
  datasAssinatura: string[];
  /** A árvore do SEI diz que está assinado (a skill só tinha o texto). */
  assinado?: boolean;
  /** Todo o texto veio de OCR (documento escaneado). */
  digitalizado?: boolean;
  /** Páginas: as do PDF, ou estimadas pelo tamanho (ver selecionar.ts). */
  nPags?: number;
}
/** Rótulo de conteúdo por seq (D-17): o `estado["conteudo"]` da skill. */
export type Conteudo = Readonly<Record<number, string>>;

const W = '[\\p{L}\\p{N}_]';
const PLANEJAMENTO = new Set(['etp', 'tr', 'mcp', 'pesquisa', 'parametros', 'justificativa_preco', 'contratacao_direta']);
const NOME_CLASSE: Record<string, string> = {
  dfd: 'DFD', etp: 'ETP', tr: 'TR', mcp: 'MCP', pesquisa: 'Pesquisa de mercado',
  parametros: 'Parâmetros prioritários de preços', justificativa_preco: 'Justificativa de preços',
  contratacao_direta: 'Justificativa de contratação direta', portaria: 'Portaria',
  cientificacao: 'Termo de cientificação', despacho: 'Despacho', proposta: 'Proposta', ata_rp: 'Ata de RP',
};
const RE_COMPRAS_GOV = /(\d{2}\/\d{2}\/\d{4})\s+\d{2}:\d{2}\s+\(v\s*[\d.]+\)/;
const RE_MARCA = /^\[\[p\. (\d+)\]\]/gm;
const RE_DESIGNACAO = /designa|nomea|gestor|fiscal|equipe de planejamento/;
const RE_REFERENCIA = /Refer[êe]ncia:/iu;
// tipo SEI de comunicação: a descrição depois de " - " cita a peça tratada, não diz o que o documento é (WR-03)
const RE_TIPO_COMUNICACAO = /^(?:despacho|e-?mail|correio eletronico|oficio|memorando|mensagem|carta)\b/;

const sei = (d: DocAutos) => d.sei || '—';

// ---------------------------------------------------------------- apoio

export function classeDoc(doc: Pick<DocAutos, 'seq' | 'titulo'>, conteudo: Conteudo = {}): string | null {
  const titulo = normalizar(doc.titulo);
  if (/cientifica/.test(titulo)) return 'cientificacao';
  if (/^portaria/.test(titulo)) return 'portaria';
  const rot = conteudo[doc.seq] ?? '';
  const c = rot ? classe(normalizar(rot)) : null;
  if (c) return c;
  const tipo = normalizar((doc.titulo ?? '').split(' - ')[0]).trim();
  if (RE_TIPO_COMUNICACAO.test(tipo)) return tipo.startsWith('despacho') ? 'despacho' : null;
  return classe(titulo);
}

const nomeDoc = (doc: DocAutos, conteudo: Conteudo) => NOME_CLASSE[classeDoc(doc, conteudo) ?? ''] || doc.titulo;

export function primeiraPagina(texto: string): string {
  const marcas = todas(RE_MARCA, texto);
  return marcas.length >= 2 ? texto.slice(0, marcas[1].index) : texto;
}

/** Página do marcador [[p. N]] anterior à posição; null sem marcador. */
export function paginaEm(texto: string, pos: number): number | null {
  let ultima: number | null = null;
  for (const m of todas(RE_MARCA, texto)) {
    if (m.index > pos) break;
    ultima = Number(m[1]);
  }
  return ultima;
}

function datasAssinatura(doc: DocAutos): Dia[] {
  return doc.datasAssinatura.map(paraData).filter((d): d is Dia => !!d).sort(compararDias);
}

// ---------------------------------------------------------------- assinatura (D-08)

export interface SemAssinatura { seq: number; sei: string; titulo: string; digitalizado: boolean }

/**
 * Documentos sem assinatura eletrônica. Diferença: a skill só tinha o texto do PDF (bloco "assinado
 * eletronicamente"); aqui vale também o `assinado` da árvore do SEI, que é o dado oficial.
 */
export function documentosSemAssinatura(docs: readonly DocAutos[]): SemAssinatura[] {
  return docs.filter(d => !d.assinado && !d.datasAssinatura.length).map(d => ({ seq: d.seq, sei: d.sei, titulo: d.titulo, digitalizado: !!d.digitalizado }));
}

type Origem = 'assinatura' | 'compras.gov';
/** (data, origem): primeira assinatura; sem ela, a data "dd/mm/aaaa hh:mm (v x.y)" do Compras.gov na 1ª página. */
export function dataDocumento(doc: DocAutos): [Dia | null, Origem | null] {
  const datas = datasAssinatura(doc);
  if (datas.length) return [datas[0], 'assinatura'];
  const m = RE_COMPRAS_GOV.exec(primeiraPagina(doc.texto ?? ''));
  const dt = m ? paraData(m[1]) : null;
  return dt ? [dt, 'compras.gov'] : [null, null];
}

function ultimaData(doc: DocAutos): [Dia | null, Origem | null] {
  const datas = datasAssinatura(doc);
  return datas.length ? [datas[datas.length - 1], 'assinatura'] : dataDocumento(doc);
}

const desc = (doc: DocAutos, conteudo: Conteudo, data: Dia, origem: Origem | null) =>
  `${nomeDoc(doc, conteudo)} (SEI ${sei(doc)}, ${fmtData(data)}${origem === 'compras.gov' ? ' — data do Compras.gov' : ''})`;

// ---------------------------------------------------------------- cronologia (D-09)

export interface Cronologia { regra: 'dfd_posterior' | 'apos_encaminhamento' | 'cientificacao_antes'; texto: string; seis: string[] }

export function cronologia(docs: readonly DocAutos[], conteudo: Conteudo = {}): Cronologia[] {
  const info = docs.map(d => ({ d, t: d.texto ?? '', c: classeDoc(d, conteudo), dt: dataDocumento(d) }));
  const saida: Cronologia[] = [];
  const antesDe = (a: Dia, b: Dia) => compararDias(a, b) < 0;

  for (const { d, c, dt: [dt] } of info) {
    if (c !== 'dfd' || !dt) continue;
    const antes = info.filter(o => PLANEJAMENTO.has(o.c ?? '') && o.dt[0] && antesDe(o.dt[0], dt));
    if (antes.length) {
      saida.push({
        regra: 'dfd_posterior',
        texto: `DFD (SEI ${sei(d)}) assinado em ${fmtData(dt)}, depois de: ${antes.map(o => desc(o.d, conteudo, o.dt[0]!, o.dt[1])).join(', ')}.`,
        seis: [d.sei, ...antes.map(o => o.d.sei)],
      });
    }
  }

  for (const { d, t, c, dt: [dt] } of info) {
    if (c !== 'despacho' || !dt || !normalizar(t).includes('encaminh')) continue;
    const depois: [DocAutos, Dia, Origem | null][] = [];
    for (const o of info) {
      if (o.d.seq >= d.seq) continue;
      const [udt, uor] = ultimaData(o.d);
      if (udt && antesDe(dt, udt)) depois.push([o.d, udt, uor]);
    }
    if (depois.length) {
      saida.push({
        regra: 'apos_encaminhamento',
        texto: `Despacho de encaminhamento (SEI ${sei(d)}) assinado em ${fmtData(dt)}; peças anteriores a ele na ordem dos autos e assinadas depois: `
          + `${depois.map(([o, udt, uor]) => desc(o, conteudo, udt, uor)).join(', ')}.`,
        seis: [d.sei, ...depois.map(([o]) => o.sei)],
      });
    }
  }

  const portarias = info.filter(x => x.c === 'portaria' && x.dt[0] && RE_DESIGNACAO.test(normalizar(x.t)));
  if (portarias.length) {
    // min() do Python: no empate, a primeira
    const p = portarias.reduce((a, b) => (antesDe(b.dt[0]!, a.dt[0]!) ? b : a));
    const pdt = p.dt[0]!;
    const ciencias = info.filter(x => x.c === 'cientificacao' && x.dt[0] && antesDe(x.dt[0], pdt));
    if (ciencias.length) {
      saida.push({
        regra: 'cientificacao_antes',
        texto: `Termos de cientificação assinados antes da portaria de designação mais antiga (${p.d.titulo}, SEI ${sei(p.d)}, ${fmtData(pdt)}): `
          + `${ciencias.map(x => `${x.d.titulo} (SEI ${sei(x.d)}, ${fmtData(x.dt[0]!)})`).join(', ')}.`,
        seis: [...ciencias.map(x => x.d.sei), p.d.sei],
      });
    }
  }
  return saida;
}

// ---------------------------------------------------------------- processo divergente (D-10)

export interface ProcessoDivergente { seq: number; sei: string; titulo: string; processo: string; paginas: number[] }

const forma = (n: string) => n.replace(/\d/g, '9');

/** Número de processo do mesmo órgão (mesmo formato, mesmos 7 primeiros dígitos) diferente do processo dos autos. */
export function processosDivergentes(docs: readonly DocAutos[], proprio: string): ProcessoDivergente[] {
  if (!new RegExp(`^(?:${RE_PROCESSO.source})$`).test(proprio ?? '')) return [];
  const saida: ProcessoDivergente[] = [];
  for (const d of docs) {
    const t = d.texto ?? '';
    const achados = new Map<string, number[]>();
    for (const m of todas(RE_PROCESSO, t)) {
      const n = m[0];
      const ini = m.index;
      const fim = ini + n.length;
      if (n === proprio || forma(n) !== forma(proprio) || n.slice(0, 7) !== proprio.slice(0, 7)) continue;
      // rodapé "SEI <processo> / pg. N", com o espaçamento que a extração deixar — WR-06
      if (/\bSEI\s+$/.test(t.slice(Math.max(0, ini - 12), ini)) && /^\s*\/\s*pg\./.test(t.slice(fim, fim + 12))) continue;
      if (RE_REFERENCIA.test(t.slice(Math.max(0, ini - 80 - 'Referência:'.length), ini))) continue;
      const pag = paginaEm(t, ini);
      if (!achados.has(n)) achados.set(n, []);
      const ps = achados.get(n)!;
      if (pag !== null && !ps.includes(pag)) ps.push(pag);
    }
    for (const [n, pags] of achados) saida.push({ seq: d.seq, sei: d.sei, titulo: d.titulo, processo: n, paginas: [...pags].sort((a, b) => a - b) });
  }
  return saida;
}

// ---------------------------------------------------------------- título × conteúdo (D-17)

export interface TituloConteudo { seq: number; sei: string; titulo: string; rotulo: string }

export function tituloXConteudo(docs: readonly DocAutos[], conteudo: Conteudo): TituloConteudo[] {
  const porSeq = new Map(docs.map(d => [d.seq, d]));
  return Object.keys(conteudo).map(Number).sort((a, b) => a - b).flatMap(seq => {
    const d = porSeq.get(seq);
    return d ? [{ seq: d.seq, sei: d.sei, titulo: d.titulo, rotulo: conteudo[seq] }] : [];
  });
}

// ---------------------------------------------------------------- citados e ausentes (D-11) — candidatos

const CITANTES = new Set([...PLANEJAMENTO, 'dfd', 'despacho']);
const RE_ANEXO_REF = new RegExp(`Anexo\\s+([IVX]+|[A-Z])(?!${W})[^.\\n]{0,25}?(?<!${W})(?:deste|desta|do presente)\\s+${W}+`, 'gu');
const RE_ANEXO_REG = new RegExp(`(?<!${W})O\\s+Anexo\\s+([IVX]+|[A-Z])\\s+(?:registra|cont[ée]m|apresenta|traz|re[úu]ne)`, 'gu');
const RE_OFICIO = /Of[íi]cios?\s+([A-ZÇ]{2,})\s+n[ºo°.]*\s*(\d+\/\d{4})((?:\s*(?:,|\be\b)\s*(?:n[ºo°.]*\s*)?\d+\/\d{4})*)/gu;
const RE_NUM_OFICIO = /\d+\/\d{4}/g;
const MAIUSCULA = 'A-ZÁÉÍÓÚÂÊÔÃÕÇ';
const RE_NOME_DOC = new RegExp(
  `(?<!${W})(?:Justificativa|Relat[óo]rio|Matriz|Registro|Parecer|Nota\\s+T[ée]cnica|Planilha|Declara[çc][ãa]o|Atestado|Mapa)`
  // a quebra de linha só continua o nome antes de conectivo ("Relatório\nde Pesquisa"); ponto final encerra
  + `(?:(?:[ \\t]+|[ \\t]*\\n\\s*(?=(?:d[aoe]s?|em|para)\\s))(?:(?:d[aoe]s?|em|para)\\s+)?[${MAIUSCULA}][\\p{L}\\p{N}_\\-]*(?:\\.${W}+)*)+`,
  'gu',
);
const RE_TITULO_SECAO = /^\s*\d+(?:\.\d+)*\.?\s*$/;
const CONECTIVOS = new Set(['para', 'pelo', 'pela', 'pelos', 'pelas', 'com', 'sobre']);
const RE_NAO_CABECALHO = new RegExp(`(?<!${W})(?:deste|desta|do presente|da presente|registra|cont[ée]m|apresenta|traz|re[úu]ne)(?!${W})`, 'iu');

const palavras = (nome: string) => (normalizar(nome).match(/[a-z]+/g) ?? []).filter(p => p.length >= 4 && !CONECTIVOS.has(p));

/** Há linha que abre a seção "Anexo X" (cabeçalho, não a própria citação nem frase que cite o anexo; WR-07). */
function secaoAnexo(t: string, x: string, cit: number): boolean {
  for (const s of todas(new RegExp(`^[ \\t]*anexo\\s+${x}(?!${W})[^\\n]*`, 'gimu'), t)) {
    if ((s.index <= cit && cit < s.index + s[0].length) || RE_NAO_CABECALHO.test(s[0])) continue;
    return true;
  }
  return false;
}

export interface CitadoAusente { seq: number; sei: string; p: number | null; citacao: string; motivo: string }

export function citadosAusentes(docs: readonly DocAutos[], conteudo: Conteudo = {}): CitadoAusente[] {
  const nomes = docs.map(d => normalizar(`${d.titulo ?? ''} ${conteudo[d.seq] ?? ''}`));
  const titulos = docs.map(d => normalizar(d.titulo ?? ''));
  const vistos = new Set<string>();
  const saida: CitadoAusente[] = [];
  const add = (chave: string, d: DocAutos, t: string, pos: number, citacao: string, motivo: string) => {
    if (vistos.has(chave)) return;
    vistos.add(chave);
    saida.push({ seq: d.seq, sei: d.sei, p: paginaEm(t, pos), citacao: citacao.replace(/\s+/g, ' ').trim(), motivo });
  };

  for (const d of docs) {
    if (!CITANTES.has(classeDoc(d, conteudo) ?? '')) continue;
    const t = d.texto ?? '';
    for (const [m, ref] of [...todas(RE_ANEXO_REF, t).map(m => [m, true] as const), ...todas(RE_ANEXO_REG, t).map(m => [m, false] as const)]) {
      const x = m[1];
      if (secaoAnexo(t, x, m.index) || titulos.some(n => new RegExp(`(?<!${W})anexo\\s+${x.toLowerCase()}(?!${W})`, 'u').test(n))) continue;
      add(JSON.stringify([d.seq, 'anexo', x]), d, t, m.index, ref ? m[0] : `Anexo ${x}`,
        `nenhuma seção iniciada por "Anexo ${x}" no documento nem documento com esse título no índice`);
    }
    const porSigla = new Map<string, { pos: number; nums: string[] }>();
    for (const m of todas(RE_OFICIO, t)) {
      const nums = [m[2], ...((m[3] ?? '').match(RE_NUM_OFICIO) ?? [])];
      if (!porSigla.has(m[1])) porSigla.set(m[1], { pos: m.index, nums: [] });
      const s = porSigla.get(m[1])!;
      for (const n of nums) if (!s.nums.includes(n)) s.nums.push(n);
    }
    for (const [sigla, s] of porSigla) {
      const faltam = s.nums.filter(n => !titulos.some(x => x.includes('oficio') && x.includes(n)));
      if (faltam.length) {
        add(JSON.stringify(['oficio', sigla, faltam]), d, t, s.pos, `${faltam.length > 1 ? 'Ofícios' : 'Ofício'} ${sigla} ${faltam.map(n => `nº ${n}`).join(', ')}`,
          'nenhum documento com esse ofício no título');
      }
    }
    for (const m of todas(RE_NOME_DOC, t)) {
      const ini = m.index === 0 ? 0 : t.lastIndexOf('\n', m.index - 1) + 1;
      if (RE_TITULO_SECAO.test(t.slice(ini, m.index))) continue; // título de seção numerada ("6.6 Registro de ..."), não citação
      const nome = m[0].replace(/\s+/g, ' ').replace(/[.-]+$/, '');
      const chave = normalizar(nome);
      if (vistos.has(chave)) continue;
      const ps = palavras(nome);
      if (ps.length < 2 || nomes.some(n => ps.every(p => n.includes(p)))) continue;
      add(chave, d, t, m.index, nome, 'nenhum documento do índice com esse nome no título ou no conteúdo');
    }
  }
  return saida;
}

// ---------------------------------------------------------------- MCP × propostas (D-12)

const NAO_FONTE = new Set([...PLANEJAMENTO, 'dfd', 'portaria', 'cientificacao', 'despacho']);
export const SEM_FONTE = 'nenhuma proposta ou orçamento identificado nos autos';

const valoresDe = (texto: string) =>
  new Set(todas(RE_VALOR, texto).map(m => brlParaFloat(m[1])).filter(v => v >= 100).map(arred2));
const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;
const RE_ROTULO_DERIVADO = /medi[ao]|mediana|total|global|estimad|amplitude|diferenc|soma|montante|multiplic|[×=]|\bx\s*\d/;
const RE_CONTA_DEPOIS = /^\s*(?:[×*=]|x\s*\d)/;

function rotulados(texto: string): Map<number, boolean[]> {
  const saida = new Map<number, boolean[]>();
  let fimAnt = 0;
  const ms = todas(RE_VALOR, texto ?? '');
  ms.forEach((m, i) => {
    const fim = m.index + m[0].length;
    const antes = normalizar(texto.slice(Math.max(fimAnt, m.index - 60), m.index));
    const depois = texto.slice(fim, i + 1 < ms.length ? ms[i + 1].index : texto.length).slice(0, 15);
    const v = arred2(brlParaFloat(m[1]));
    if (!saida.has(v)) saida.set(v, []);
    saida.get(v)!.push(RE_ROTULO_DERIVADO.test(antes) || RE_CONTA_DEPOIS.test(depois));
    fimAnt = fim;
  });
  return saida;
}

function quantidades(texto: string): number[] {
  let t = (texto ?? '').replace(new RegExp(RE_VALOR.source, 'g'), ' ');
  t = t.replace(/\d{1,2}\/\d{1,2}\/\d{2,4}|\d+[.,]\d+/g, ' ');
  return [...new Set((t.match(/(?<!\d)(\d{1,2})(?!\d)/g) ?? []).map(Number).filter(x => x >= 2 && x <= 60))].sort((a, b) => a - b);
}

const media = (c: readonly number[]) => c.reduce((a, b) => a + b, 0) / c.length;
function mediana(c: readonly number[]): number {
  const s = [...c].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
function* combinacoes<T>(xs: readonly T[], k: number, ini = 0, atual: T[] = []): Generator<T[]> {
  if (atual.length === k) { yield [...atual]; return; }
  for (let i = ini; i < xs.length; i++) { atual.push(xs[i]); yield* combinacoes(xs, k, i + 1, atual); atual.pop(); }
}

function contas(vs: readonly number[], minSub: number, mults: readonly number[], comDiferenca: boolean): Set<number> {
  const dif = new Set(comDiferenca ? vs.filter(v => vs.some(a => vs.some(b => a !== v && b !== v && a > b && b > v && igual(v, a - b)))) : []);
  const derivados = new Set(dif);
  const base = vs.filter(v => !dif.has(v));
  for (const v of base) {
    const outros = base.filter(u => u !== v);
    let bate = false;
    if (outros.length > 12) bate = outros.length >= minSub && (igual(v, media(outros)) || igual(v, mediana(outros)));
    else {
      for (let k = minSub; k <= outros.length && !bate; k++) {
        for (const c of combinacoes(outros, k)) if (igual(v, media(c)) || igual(v, mediana(c))) { bate = true; break; }
      }
    }
    if (bate) { derivados.add(v); continue; }
    if (outros.some(u => u < v && u > 0 && mults.some(k => igual(v, k * u)))) derivados.add(v);
  }
  return derivados;
}

/** Valores do MCP que são conta sobre os demais (WR-04): rotulados como média/total/… e que batem, ou conta forte. */
export function derivadosMcp(valores: readonly number[], texto = ''): Set<number> {
  const vs = [...new Set(valores)].sort((a, b) => a - b);
  const rot = rotulados(texto);
  const frouxas = contas(vs, 2, Array.from({ length: 59 }, (_, i) => i + 2), true);
  const fortes = contas(vs, 3, quantidades(texto), false);
  return new Set([...[...frouxas].filter(v => { const r = rot.get(v); return !!r?.length && r.every(Boolean); }), ...fortes]);
}

export interface McpSemProposta {
  mcp: { seq: number; sei: string }[];
  fontes: { seq: number; sei: string; titulo: string }[];
  valores: number[];
  observacao: string | null;
}

export function mcpSemProposta(docs: readonly DocAutos[], conteudo: Conteudo = {}): McpSemProposta {
  const mcp: McpSemProposta['mcp'] = [];
  const fontes: McpSemProposta['fontes'] = [];
  const vMcp = new Set<number>();
  const vFonte = new Set<number>();
  const tMcp: string[] = [];
  for (const d of docs) {
    const c = classeDoc(d, conteudo);
    if (c === 'mcp') {
      mcp.push({ seq: d.seq, sei: d.sei });
      tMcp.push(d.texto ?? '');
      for (const v of valoresDe(d.texto ?? '')) vMcp.add(v);
    } else if (!NAO_FONTE.has(c ?? '')) {
      const vs = valoresDe(d.texto ?? '');
      if (vs.size) {
        fontes.push({ seq: d.seq, sei: d.sei, titulo: d.titulo });
        for (const v of vs) vFonte.add(v);
      }
    }
  }
  const ordenados = [...vMcp].sort((a, b) => a - b);
  if (!mcp.length) return { mcp: [], fontes, valores: [], observacao: null };
  if (!fontes.length) return { mcp, fontes: [], valores: ordenados, observacao: SEM_FONTE };
  const derivados = derivadosMcp(ordenados, tMcp.join('\n'));
  const valores = ordenados.filter(v => !derivados.has(v) && ![...vFonte].some(f => igual(v, f)));
  return { mcp, fontes, valores, observacao: null };
}

// ---------------------------------------------------------------- validade relativa (plano 03-09)

const MESES: Record<string, number> = Object.fromEntries(
  ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'].map((m, i) => [m, i + 1]),
);
const RE_VALIDADE_RELATIVA = new RegExp(
  'v[áa]lid[ao]\\s+por\\s+(\\d{1,3})\\s*(?:\\([^)]{0,30}\\)\\s*)?dias?\\s*,?\\s+(?:a\\s+contar|contad[oa]s?)\\s+d[ao]\\s+'
  + `(?:data\\s+d[ae]\\s+)?(?:sua\\s+)?(?:expedi|emiss)${W}*`, 'giu');
const RE_DATA_QUALQUER = /\b(\d{2})\/(\d{2})\/(\d{4})\b|\b(\d{1,2})\s+de\s+([A-Za-zÇç]+)\s+de\s+(\d{4})\b/g;
// data ligada à emissão: "Emitida em 10/07/2026", "Expedição: 12/07/2026", "data de emissão 1º de julho de 2026"
const RE_DATA_EMISSAO = /(?:emitid[ao]|emiss[ãa]o|expedi[çc][ãa]o|expedid[ao]|gerad[ao])(?=\s*(?:em|:)?[^\d\n]{0,12}?\d{1,2}(?:\/\d{2}\/\d{4}|\s+de\s+[A-Za-zÇç]+\s+de\s+\d{4}))/giu;

function dataDe(m: RegExpExecArray): Dia | null {
  if (m[1]) return diaValido(Number(m[3]), Number(m[2]), Number(m[1]));
  const mes = MESES[normalizar(m[5])];
  return mes ? diaValido(Number(m[6]), mes, Number(m[4])) : null;
}

/** finditer(texto, pos, endpos) do Python: a busca vê o texto cortado em `fim` (lookahead e \b inclusive). */
function entre(re: RegExp, texto: string, ini: number, fim: number): RegExpExecArray[] {
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
  const corte = texto.slice(0, fim);
  const saida: RegExpExecArray[] = [];
  g.lastIndex = ini;
  for (let m = g.exec(corte); m; m = g.exec(corte)) {
    saida.push(m);
    if (m[0] === '') g.lastIndex++;
  }
  return saida;
}

export interface ValidadeRelativa { p: number | null; dias: number; base: Dia; termo: Dia; origem: 'emissao' | 'anterior'; contexto: string }

/** Certidões "válida por N dias a contar da expedição": termo = data de emissão da página + N (WR-05). */
export function validadesRelativas(texto: string): ValidadeRelativa[] {
  const saida: ValidadeRelativa[] = [];
  texto ??= '';
  const marcasTodas = todas(RE_MARCA, texto);
  for (const m of todas(RE_VALIDADE_RELATIVA, texto)) {
    const fimM = m.index + m[0].length;
    const marcas = marcasTodas.filter(x => x.index <= m.index);
    const ini = marcas.length ? marcas[marcas.length - 1].index + marcas[marcas.length - 1][0].length : 0;
    const prox = marcasTodas.find(x => x.index >= fimM);
    const fim = prox ? prox.index : texto.length;
    let base: Dia | null = null;
    let origem: 'emissao' | 'anterior' | null = null;
    let dist: number | null = null;
    for (const e of entre(RE_DATA_EMISSAO, texto, ini, fim)) {
      if (m.index <= e.index && e.index < fimM) continue; // o "expedição" da própria frase
      const r = new RegExp(RE_DATA_QUALQUER.source, 'g');
      r.lastIndex = e.index + e[0].length;
      const d = r.exec(texto);
      const dt = d ? dataDe(d) : null;
      if (dt && (dist === null || Math.abs(e.index - m.index) < dist)) [base, origem, dist] = [dt, 'emissao', Math.abs(e.index - m.index)];
    }
    if (!base) {
      for (const d of entre(RE_DATA_QUALQUER, texto, ini, m.index)) base = dataDe(d) ?? base;
      origem = 'anterior';
    }
    if (!base) continue;
    const dias = Number(m[1]);
    saida.push({
      p: marcas.length ? Number(marcas[marcas.length - 1][1]) : null, dias, base, termo: somarDias(base, dias), origem: origem!,
      contexto: m[0].replace(/\s+/g, ' '),
    });
  }
  return saida;
}
