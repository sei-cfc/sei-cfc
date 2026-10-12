/**
 * Leitura dirigida para o DVI: porte do scripts/selecionar.py da skill gelic (o `_leitura.md`): quais
 * documentos entram inteiros, por recorte de palavras-chave, só pela 1ª página ou não entram, e o enxugamento
 * do boilerplate do SEI. O recorte é por regra fixa (padrões de título por família), igual em qualquer modelo.
 *
 * Diferenças de entrada, e como o porte se adapta:
 * - Páginas. A skill conta páginas do PDF dos autos (limite de páginas para ler inteiro, "≤ 2 páginas entra
 *   inteiro", "só a 1ª página"). Aqui só o PDF tem páginas (as do próprio documento); documento interno do
 *   SEI (HTML) não tem. Sem página, ela é estimada pelo tamanho: CARACTERES_POR_PAGINA (3 000, uma página
 *   A4 de despacho/TR do SEI), e a "1ª página" é o começo do texto até esse tamanho, cortado em fim de linha.
 * - Orçamento. A skill não corta por tamanho (o MANUAL dá a ordem de grandeza: ≈ 40 mil tokens no recorte de
 *   prorrogação, teto de ≈ 100 mil na preparatória). A extensão paga por token a cada conversa, então o
 *   pacote tem orçamento de caracteres (ORCAMENTO) e uma escada fixa de cortes para caber nele (ver
 *   `caberNoOrcamento`): determinística, e só depois das regras da skill.
 *
 * Funções puras.
 */
import { P_CONTRATO, seriesDoChecklist, type Familia } from './checklist';
import type { DocAutos } from './fatos';
import { linhas, normalizar, rotuloConteudo, todas } from './texto';

// Padrões casados contra o título normalizado (sem acento, minúsculo).
const P_GELIC = /verificacao inicial|\bdvi\b|^despacho|encaminh|memorando/;
const P_TR = /termo de referencia|\btr\b|projeto basico/;
const PADROES: Readonly<Record<Familia, readonly RegExp[]>> = {
  preparatoria: [
    P_GELIC, P_CONTRATO, P_TR,
    /\bdfd\b|formalizacao de demanda|formalizacao da demanda/,
    /estudo tecnico|\betp\b/,
    /mapa comparativo|\bmcp\b|pesquisa de pre|justificativa de pre|banco de pre|cotac|proposta|orcamento/,
    /risco/, /portaria|cientifica|declaracao/, /\bpca\b|plano de contrata/, /autorizac|aviso|edital|minuta/,
  ],
  prorrogacao: [
    P_GELIC, P_CONTRATO,
    /prorroga|renova|formulario/,
    /proposta|oficio|manifesta|anuencia|interesse|e-mail|email/,
    /mapa comparativo|\bmcp\b|pesquisa de pre|justificativa de pre|banco de pre|cotac|nota fiscal|\bnf\b/,
    /certid|sicaf|\bcnd\b|cndt|fgts|regularidade|\btcu\b|\bcnj\b|\bcgu\b|ceis/,
    /procura|estatuto|contrato social|ata\b|representa|alteracao/,
    /garantia|seguro|fianca|apolice/,
    /relatorio|fiscaliza|execucao|ocorrencia/,
    /indice|ipca|inpc|igp|reajust|repactua|planilha|\bcct\b|convencao/,
    /portaria/,
  ],
  reajuste: [
    P_GELIC, P_CONTRATO,
    /reajust|repactua|apostila|revisao|reequilibrio|pedido|requerimento|solicita/,
    /indice|ipca|inpc|igp|planilha|\bcct\b|convencao|dissidio|memoria/,
    /proposta|oficio|manifesta|e-mail|email/,
    /certid|sicaf|regularidade/,
    /portaria|relatorio|fiscaliza/,
    // família reajuste lê o formulário, a representação e a garantia como a prorrogação (G05/G06/G11 valem para ambas)
    /formulario|prorroga/,
    /procura|estatuto|contrato social|ata\b|representa|alteracao/,
    /garantia|seguro|fianca|apolice/,
  ],
};
// Trechos-chave de documentos longos lidos só por recorte: cláusulas que regem a alteração contratual
// (TR/contrato) e regras de representação (estatuto, ata, contrato social).
export const CHAVE_CONTRATUAL = new RegExp(
  'vig[eê]ncia|prorroga|reajust|repactua|data-base|[íi]ndice|ipca|inpc|igp|habilita|regularidade|'
  + 'garantia|sanç|penalidad|extin|rescis|dota[çc]|apostil|aditivo|natureza continuada|contínu', 'iu');
export const CHAVE_REPRESENTACAO = new RegExp(
  'representa[rç]|assinar|em conjunto|isoladamente|procura[çd]|mandato|poderes para|'
  + 'compete ao (presidente|diretor|vice)|substitui o presidente|responsabilidade financeira', 'iu');
const P_REPRESENTACAO = /estatuto|contrato social|ata\b|alteracao contratual|requerimento de empresario/;
export const LIMITE_PAGS_INTEGRAL: Readonly<Record<Familia, number>> = { preparatoria: 25, prorrogacao: 8, reajuste: 8 };
// Peças centrais da fase preparatória: entram inteiras, qualquer que seja o tamanho.
const P_ESSENCIAL_PREP = new RegExp(
  'termo de referencia|\\btr\\b|projeto basico|estudo tecnico|\\betp\\b|\\bdfd\\b|formalizacao d[ae] demanda|'
  + 'inexigibilidade|dispensa|justificativa|escolha d[oa] (contratad|fornecedor)|mapa comparativo|\\bmcp\\b|'
  + 'pesquisa de (mercado|precos)|parametros prioritarios');
const P_DVI = /verificacao inicial|\bdvi\b/;

/** Página estimada quando o documento não tem marcador de página (HTML do SEI). */
export const CARACTERES_POR_PAGINA = 3000;
/**
 * Orçamento de caracteres para os textos do pacote. A skill mediu 2,4 caracteres por token em autos do SEI
 * (113.582 caracteres = 48.336 tokens): 60 mil ≈ 25 mil tokens; 120 mil ≈ 50 mil tokens — abaixo da ordem
 * de grandeza do MANUAL (≈ 40 mil e ≈ 100 mil tokens), de propósito.
 */
export const ORCAMENTO: Readonly<Record<Familia, number>> = { preparatoria: 120_000, prorrogacao: 60_000, reajuste: 60_000 };

// ---------------------------------------------------------------- enxugar (selecionar.enxugar)

const RE_BLOCO_ASSINATURA = /Documento assinado eletronicamente por\s+(?<nome>.+?)\s*,\s*(?<cargo>.+?)\s*,\s*em\s*(?<data>\d{2}\/\d{2}\/\d{4}).*?10\.543,?\s*de\s*13\s*de\s*novembro\s*de\s*2020\s*\.?/gs;
const RE_AUTENTICIDADE = /A autenticidade deste documento pode ser conferida.*?c[óo]digo CRC\s*[0-9A-F]{6,10}\s*\.?/gs;
const RE_REFERENCIA = /Refer[êe]ncia:\s*Processo n[ºo°]\s*[\d./-]+\s*SEI n[ºo°]\s*\d+/g;
const RE_ENDERECO_CFC = /SAUS Quadra 05.*?cfc@cfc\.org\.br/gs;
const RE_LINHA_DESCARTE = new RegExp(
  '^\\s*(?:.*\\(?\\d{6,8}\\)?\\s+SEI\\s+\\d{5,20}\\.\\d{6}/\\d{4}-\\d{2}\\s*/\\s*pg\\.\\s*\\d+.*' // rodapé do SEI
  + '|\\d+\\s+de\\s+\\d+' // "3 de 26"
  + '|Assinado eletronicamente via SEI na data consignada'
  + '|\\s*)$');

/**
 * Tira o que se repete em toda página do SEI: bloco de assinatura (vira uma linha), autenticidade/CRC,
 * referência, endereço do CFC, rodapé "SEI … / pg. N", contador "N de M" e linhas vazias. Linha que é só
 * pontuação é colada à anterior.
 */
export function enxugar(texto: string): string {
  const limpa = (x: string) => x.replace(/\s+/g, ' ').trim();
  texto = texto.replace(RE_BLOCO_ASSINATURA, (...a) => {
    const g = a[a.length - 1] as Record<string, string>;
    return `[assinado eletronicamente: ${limpa(g.nome)}, ${limpa(g.cargo)}, ${g.data}]`;
  });
  texto = texto.replace(RE_AUTENTICIDADE, '').replace(RE_REFERENCIA, '').replace(RE_ENDERECO_CFC, '');
  const saida: string[] = [];
  for (let linha of linhas(texto)) {
    if (RE_LINHA_DESCARTE.test(linha) && !linha.startsWith('[[p.')) continue;
    linha = linha.trimEnd();
    if (saida.length && /^\s*[,.;:)]\s*$/.test(linha)) {
      saida[saida.length - 1] += linha.trim();
      continue;
    }
    saida.push(linha);
  }
  return saida.join('\n');
}

/** Só as linhas com palavra-chave (± contexto), com os marcadores de página; "[...]" onde houve corte. */
export function recorte(texto: string, chave: RegExp, contexto = 1): string {
  const ls = linhas(texto);
  const manter = new Set<number>();
  ls.forEach((l, i) => {
    if (l.startsWith('[[p.') || chave.test(l)) for (let j = Math.max(0, i - contexto); j < Math.min(ls.length, i + contexto + 1); j++) manter.add(j);
  });
  const saida: string[] = [];
  let anterior = -2;
  for (const i of [...manter].sort((a, b) => a - b)) {
    if (i !== anterior + 1) saida.push('[...]');
    saida.push(ls[i]);
    anterior = i;
  }
  return saida.join('\n');
}

const RE_MARCA = /^\[\[p\. \d+\]\]/gm;

/** Páginas do documento: as informadas, as marcadas no texto ou a estimativa pelo tamanho. */
export function paginas(d: Pick<DocAutos, 'nPags' | 'texto'>): number {
  if (d.nPags) return d.nPags;
  const marcas = todas(RE_MARCA, d.texto ?? '').length;
  return marcas || Math.max(1, Math.ceil((d.texto ?? '').length / CARACTERES_POR_PAGINA));
}

/** A 1ª página: até o segundo marcador; sem marcador, os primeiros CARACTERES_POR_PAGINA, em fim de linha. */
export function primeiraPagina(texto: string): string {
  const marcas = todas(RE_MARCA, texto);
  if (marcas.length >= 2) return texto.slice(0, marcas[1].index);
  if (marcas.length || texto.length <= CARACTERES_POR_PAGINA) return texto;
  const fim = texto.lastIndexOf('\n', CARACTERES_POR_PAGINA);
  return texto.slice(0, fim > CARACTERES_POR_PAGINA / 2 ? fim : CARACTERES_POR_PAGINA);
}

// ---------------------------------------------------------------- seleção (selecionar.montar)

export type Leitura = 'integral' | 'recorte' | 'primeira_pagina' | 'nao_lido';

export interface Selecao {
  familia: Familia;
  /** Séries do checklist que recebem status. */
  series: string[];
  /** Modo de leitura por seq. */
  modos: Record<number, Leitura>;
  /** Rótulo de conteúdo por seq (D-17): cabeçalho que diverge do tipo SEI. */
  rotulos: Record<number, string>;
  /** seq do contrato/aditivo mais recente. */
  contrato: number | null;
  /** seq do DVI anterior desta etapa. */
  dviAnterior: number | null;
}

const ultimoIndice = (docs: readonly DocAutos[], p: RegExp) => {
  let r: number | null = null;
  docs.forEach((d, i) => { if (p.test(normalizar(d.titulo))) r = i; });
  return r as number | null;
};

/** As regras fixas da skill: modo de leitura de cada documento, rótulos de conteúdo, contrato e DVI anterior. */
export function selecionarModos(docs: readonly DocAutos[], familia: Familia, tipo?: string | null): Selecao {
  const series = seriesDoChecklist(familia, docs.map(d => d.titulo), tipo);
  const padroes = PADROES[familia];
  const iContrato = ultimoIndice(docs, P_CONTRATO);
  const iTr = ultimoIndice(iContrato !== null ? docs.slice(0, iContrato) : docs, P_TR);
  const limite = LIMITE_PAGS_INTEGRAL[familia];
  const rotulos: Record<number, string> = {};
  for (const d of docs) {
    const r = rotuloConteudo(d.titulo, d.texto ?? '');
    if (r) rotulos[d.seq] = r;
  }
  const efetivo = (d: DocAutos) => (rotulos[d.seq] ? normalizar(`${d.titulo} ${rotulos[d.seq]}`) : normalizar(d.titulo));
  const modos: Record<number, Leitura> = {};
  docs.forEach((d, i) => {
    const eContrato = P_CONTRATO.test(normalizar(d.titulo));
    let modo: Leitura;
    if (familia !== 'preparatoria' && iContrato !== null && i < iContrato) {
      // fase preparatória já encerrada: só o que ainda rege o contrato — o próprio contrato/aditivos e o
      // último TR (por recorte de cláusulas)
      modo = eContrato ? 'integral' : i === iTr ? 'recorte' : 'nao_lido';
    } else if (eContrato || (familia === 'preparatoria' && P_ESSENCIAL_PREP.test(efetivo(d)))) modo = 'integral';
    else if (padroes.some(p => p.test(efetivo(d)))) modo = paginas(d) <= limite ? 'integral' : 'recorte';
    else if (paginas(d) <= 2) modo = 'integral';
    else modo = 'primeira_pagina';
    modos[d.seq] = modo;
  });
  let dviAnterior: number | null = null;
  docs.forEach((d, i) => {
    if (P_DVI.test(normalizar(d.titulo)) && (familia === 'preparatoria' || iContrato === null || i > iContrato)) dviAnterior = d.seq;
  });
  return { familia, series, modos, rotulos, contrato: iContrato !== null ? docs[iContrato].seq : null, dviAnterior };
}

/** O texto que entra no pacote para o modo dado, já enxugado (o _leitura.md da skill). */
export function corpoDe(d: Pick<DocAutos, 'titulo' | 'texto'>, modo: Leitura): string {
  const texto = d.texto ?? '';
  let corpo: string;
  if (modo === 'recorte') corpo = recorte(texto, P_REPRESENTACAO.test(normalizar(d.titulo)) ? CHAVE_REPRESENTACAO : CHAVE_CONTRATUAL);
  else if (modo === 'primeira_pagina') corpo = primeiraPagina(texto);
  else if (modo === 'integral') corpo = texto;
  else return '';
  return enxugar(corpo).trim();
}

// ---------------------------------------------------------------- orçamento

export interface DocLeitura {
  seq: number;
  modo: Leitura;
  texto: string;
  /** Caracteres cortados pelo orçamento (0 quando não houve corte além do da regra). */
  cortado: number;
}
export interface PacoteLeitura {
  selecao: Selecao;
  documentos: DocLeitura[];
  orcamento: number;
  total: number;
  /** Documentos que o orçamento tirou do pacote (os que a regra já não lia ficam em `modos`). */
  foraPeloOrcamento: number[];
}

const PISO_CORTE = 1500;
const MARCA_CORTE = (n: number) => `\n[... ${n} caracteres cortados pelo limite do pacote; leia com documento_ler se precisar]`;

/**
 * Faz a leitura caber no orçamento, por uma escada fixa (determinística, documento maior primeiro):
 * 1. peça que a regra não protege desce um degrau: integral → recorte → 1ª página;
 * 2. peça protegida (contrato mais recente; na preparatória, as essenciais — TR, ETP, DFD, MCP…) desce de
 *    integral para recorte;
 * 3. o maior texto é cortado no fim (nunca abaixo de PISO_CORTE caracteres), com a marca do corte;
 * 4. se ainda não couber, sai o último documento da ordem dos autos que não seja protegido.
 */
export function caberNoOrcamento(docs: readonly DocAutos[], sel: Selecao, orcamento: number): PacoteLeitura {
  const porSeq = new Map(docs.map(d => [d.seq, d]));
  const protegido = (d: DocAutos) => d.seq === sel.contrato
    || (sel.familia === 'preparatoria' && P_ESSENCIAL_PREP.test(sel.rotulos[d.seq] ? normalizar(`${d.titulo} ${sel.rotulos[d.seq]}`) : normalizar(d.titulo)));
  const lidos = docs.filter(d => sel.modos[d.seq] !== 'nao_lido');
  const atual = new Map<number, DocLeitura>(lidos.map(d => [d.seq, { seq: d.seq, modo: sel.modos[d.seq], texto: corpoDe(d, sel.modos[d.seq]), cortado: 0 }]));
  const total = () => [...atual.values()].reduce((s, x) => s + x.texto.length, 0);
  const fora: number[] = [];
  const maiorPrimeiro = (xs: DocLeitura[]) => xs.sort((a, b) => b.texto.length - a.texto.length || a.seq - b.seq);
  const descer = (filtro: (d: DocAutos) => boolean, proximo: Partial<Record<Leitura, Leitura>>) => {
    for (;;) {
      if (total() <= orcamento) return;
      const candidatos = maiorPrimeiro([...atual.values()].filter(x => filtro(porSeq.get(x.seq)!) && proximo[x.modo]));
      let mudou = false;
      for (const x of candidatos) {
        const modo = proximo[x.modo]!;
        const texto = corpoDe(porSeq.get(x.seq)!, modo);
        if (texto.length < x.texto.length) { atual.set(x.seq, { ...x, modo, texto }); mudou = true; break; }
        // o degrau não encurta: tenta o seguinte deste mesmo documento antes de passar ao próximo
        const depois = proximo[modo];
        if (depois) {
          const t2 = corpoDe(porSeq.get(x.seq)!, depois);
          if (t2.length < x.texto.length) { atual.set(x.seq, { ...x, modo: depois, texto: t2 }); mudou = true; break; }
        }
      }
      if (!mudou) return;
    }
  };
  descer(d => !protegido(d), { integral: 'recorte', recorte: 'primeira_pagina' });
  descer(protegido, { integral: 'recorte' });
  // O corte parte sempre do texto anterior a qualquer corte (a marca não se acumula) e desconta o tamanho
  // da própria marca; documento que não encolhe mais sai da fila, então o laço sempre termina.
  const antesDoCorte = new Map([...atual.values()].map(x => [x.seq, x.texto]));
  const esgotados = new Set<number>();
  while (total() > orcamento) {
    const x = maiorPrimeiro([...atual.values()]).find(y => !esgotados.has(y.seq));
    if (!x) break;
    const inteiro = antesDoCorte.get(x.seq)!;
    const alvo = Math.max(PISO_CORTE, x.texto.length - (total() - orcamento) - MARCA_CORTE(inteiro.length).length);
    const fim = inteiro.lastIndexOf('\n', alvo);
    const corte = Math.min(alvo, fim > alvo * 0.8 ? fim : alvo);
    const texto = inteiro.slice(0, corte) + MARCA_CORTE(inteiro.length - corte);
    if (corte >= inteiro.length || texto.length >= x.texto.length) { esgotados.add(x.seq); continue; }
    atual.set(x.seq, { ...x, texto, cortado: inteiro.length - corte });
  }
  for (const d of [...lidos].reverse()) {
    if (total() <= orcamento) break;
    if (protegido(d)) continue;
    atual.delete(d.seq);
    fora.push(d.seq);
  }
  return {
    selecao: sel,
    documentos: lidos.filter(d => atual.has(d.seq)).map(d => atual.get(d.seq)!),
    orcamento,
    total: total(),
    foraPeloOrcamento: fora.sort((a, b) => a - b),
  };
}

export interface OpcoesLeitura { tipo?: string | null; orcamento?: number }

/** Seleção pela regra da skill + orçamento: o pacote de leitura do DVI. */
export function selecionarLeitura(docs: readonly DocAutos[], familia: Familia, o: OpcoesLeitura = {}): PacoteLeitura {
  return caberNoOrcamento(docs, selecionarModos(docs, familia, o.tipo), o.orcamento ?? ORCAMENTO[familia]);
}
