/**
 * Preparação do DVI: o `gelic.py preparar` da skill (selecionar → checar → etapa) num pacote só, compacto,
 * para o agente de IA da extensão escrever os achados lendo pouco. Tudo o que é regra roda aqui, em código:
 * a etapa, a família, as séries e os itens do checklist, a leitura dirigida (o que entra inteiro, por recorte,
 * pela 1ª página) e as checagens mecânicas. O modelo de IA recebe só o resultado.
 *
 * Leitura dos documentos: como a ferramenta `documento_ler` do agente — processo sigiloso é recusado pela
 * própria ponte (`processo.arvore`), documento sigiloso nunca é lido (a árvore nem traz o título), documento
 * restrito só com o consentimento do usuário (uma vez por conversa), PDF pelo pdf.js (com OCR quando não tem
 * texto), e todo texto que vai ao modelo passa pela varredura de instrução embutida e pelo envelope.
 *
 * Diferenças em relação à skill (que lê o PDF dos autos inteiros):
 * - página: só o PDF de cada documento tem página, e ela é do documento (não dos autos); ver selecionar.ts;
 * - OCR: o do agente processa as primeiras páginas do PDF digitalizado (painel/pdf.ts); na prorrogação, os
 *   documentos anteriores ao contrato que a regra não lê entram só para as checagens, sem OCR;
 * - assinatura: além do bloco "assinado eletronicamente" do texto, vale o `assinado` da árvore do SEI;
 * - orçamento de caracteres (a skill não tem): ver selecionar.ORCAMENTO.
 */
import type { ContextoTool } from '../../../../agente-ia/src/motor/tools';
import { extrairTextoPdf } from '../../../../agente-ia/src/painel/pdf';
import { envelopar } from '../../../../agente-ia/src/seguranca/envelope';
import { resumoDosAchados, varrer, varrerCamposLivres } from '../../../../agente-ia/src/seguranca/injecao';
import { tipoDe } from '../../regras/motor';
import { resumir, type Resumo } from '../../regras/resumo';
import { checagensMecanicas, type Checagem } from './checar';
import { familiaDoProcesso, itensDoChecklist, P_CONTRATO, type Familia, type ItemDoPacote } from './checklist';
import type { DocAutos } from './fatos';
import { caberNoOrcamento, ORCAMENTO, selecionarModos, type Leitura } from './selecionar';
import { fmtData, hojeLocal, normalizar, type Dia } from './texto';

export { checagensMecanicas, type Checagem } from './checar';
export { familiaDoProcesso, itensDoChecklist, seriesDoChecklist, type Familia, type ItemDoPacote } from './checklist';
export { selecionarLeitura, selecionarModos, ORCAMENTO, enxugar, recorte, primeiraPagina, type Leitura } from './selecionar';

export interface DocumentoPacote {
  numero: string;
  /** Tipo canônico pelo título (o mesmo do motor de etapas: dfd, etp, tr, dvi, contrato… ou "outro"). */
  tipo: string;
  titulo: string;
  assinado: boolean;
  /** Como o texto entrou: inteiro, recorte por palavras-chave, só a 1ª página. */
  leitura: Exclude<Leitura, 'nao_lido'>;
  /** Cabeçalho da peça quando diverge do tipo do SEI (D-17). */
  conteudo?: string;
  /** Caracteres cortados pelo limite do pacote, quando houve. */
  cortado?: number;
  /** Texto recortado e enxugado, dentro do envelope da conversa. */
  texto: string;
  /** Resumo da varredura de instrução embutida, quando achou algo. */
  integridade?: string;
}

export interface DocumentoNaoLido { numero: string; titulo?: string; motivo: string }

export interface PacoteDvi {
  processo: string;
  /** A etapa do rito pelos títulos (o mesmo resumo da ferramenta gelic_etapa e do selo). */
  etapa: Omit<Resumo, 'documentosChave'>;
  familia: Familia;
  /** Tipo de análise: o pedido ou "<família> (inferido)". */
  tipo: string;
  /** Data de referência das checagens (dd/mm/aaaa). */
  hoje: string;
  /** Contrato/aditivo mais recente e DVI anterior desta etapa: decidem o formato do documento. */
  contrato: { numero: string; titulo: string } | null;
  dviAnterior: { numero: string; titulo: string } | null;
  /** Séries do checklist que recebem status (checklist_status) — todo item delas. */
  series: string[];
  documentos: DocumentoPacote[];
  checagens: Checagem[];
  checklist: ItemDoPacote[];
  limites: {
    /** Tamanho do pacote inteiro (JSON), em caracteres. */
    caracteres: number;
    /** Orçamento dos textos dos documentos, em caracteres. */
    orcamento: number;
    documentosNaoLidos: DocumentoNaoLido[];
  };
}

export interface OpcoesPreparar {
  /** Tipo de análise (apelido da família: pregao, dispensa, prorrogacao, reajuste…); sem ele, inferido. */
  tipo?: string | null;
  /** Orçamento de caracteres dos textos (padrão: selecionar.ORCAMENTO da família). */
  orcamento?: number;
  /** Data de referência (padrão: hoje). */
  hoje?: Dia;
  /** Documentos lidos em paralelo (padrão 4). */
  paralelo?: number;
  /** O vínculo do processo no PCA (src/pca/dfd.ts), para o A04 da fase preparatória; undefined = sem configuração. */
  pca?: (protocolo: string) => Promise<{ itens: { item_pca: number; exercicio: number; situacao_rotulo: string }[] } | undefined>;
}

/** A checagem do A04 pelo PCA: o vínculo é fato; a falta dele é candidato (o PCA pode ainda não ter o nº SEI). */
export function checagemPca(r: { itens: { item_pca: number; exercicio: number; situacao_rotulo: string }[] }): Checagem {
  if (r.itens.length) {
    const itens = r.itens.map(i => `item ${i.item_pca}/${i.exercicio} (${i.situacao_rotulo})`).join('; ');
    return { tipo: 'pca', candidato: false, texto: `PCA: o sistema do PCA liga este processo ao ${itens}. Para o A04, a demanda consta do PCA.`, sei: [] };
  }
  return { tipo: 'pca', candidato: true, texto: 'PCA: o sistema do PCA não liga este processo a nenhum item (o nº SEI pode ainda não ter sido vinculado lá). Para o A04, confira o item do PCA citado no DFD ou a justificativa de demanda fora do PCA.', sei: [] };
}

export interface DocArvore {
  numero: string;
  titulo?: string;
  nivel?: string;
  assinado?: boolean;
  assinaturas?: string[];
  cancelado?: boolean;
}
interface Arvore { protocolo: string; tipo?: string; documentos: DocArvore[] }
interface Conteudo { forma: string; texto?: string; base64?: string; tipo?: string; ocultos?: Array<{ texto: string; motivo: string }> }
interface Lido { numero: string; nivel?: string; conteudo: Conteudo }

/** Mais documentos que isto não são lidos (processo enorme): o pacote diz quais ficaram de fora. */
export const MAX_DOCUMENTOS = 150;
/** Assinatura eletrônica no texto (extrair.RE_ASSINATURA da skill). */
const RE_ASSINATURA = /assinado eletronicamente por\s*(.+?),\s*(.+?),\s*em\s*(\d{2}\/\d{2}\/\d{4})/gis;
const SEM_TEXTO_PDF = '[PDF sem camada de texto';
const MARCA_OCR = '[texto obtido por OCR';

/** "[página N]" do pdf.js vira "[[p. N]]", o marcador que as regras da skill esperam. */
const paginasDoPdf = (texto: string) => texto.replace(/^\[página (\d+)\]$/gm, '[[p. $1]]');

async function emParalelo<T>(itens: readonly T[], n: number, fn: (x: T) => Promise<void>): Promise<void> {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, itens.length) }, async () => {
    while (i < itens.length) await fn(itens[i++]);
  }));
}

export interface Lida { texto: string; digitalizado: boolean; ocultos?: Conteudo['ocultos']; motivo?: string }

/**
 * Lê os documentos dados como a `documento_ler` do agente (usada também pelos documentos por modelo): sigiloso
 * nunca é lido, restrito só com o consentimento do usuário (pedido uma vez, antes das leituras em paralelo, para
 * não abrir vários cartões), PDF pelo pdf.js (OCR salvo `semOcr`). Devolve, por nº SEI, o texto ou o motivo
 * de não ter lido. Não varre nem envelopa: quem monta o pacote faz isso.
 */
export async function lerDocumentos(ctx: ContextoTool, protocolo: string, aLer: readonly (DocArvore & { semOcr?: boolean })[], paralelo = 4): Promise<Map<string, Lida>> {
  const restritos = aLer.filter(d => d.nivel === 'restrito');
  let consentiu: boolean | null = null;
  const consentir = async (detalhe: string) => (consentiu ??= await ctx.consentirRestrito(detalhe));
  if (restritos.length) {
    const lista = restritos.slice(0, 5).map(d => `${d.numero} (${d.titulo})`).join(', ');
    await consentir(`${restritos.length === 1 ? 'Documento' : `${restritos.length} documentos restritos:`} ${lista}${restritos.length > 5 ? '…' : ''}, processo ${protocolo}`);
  }
  const lidos = new Map<string, Lida>();
  await emParalelo(aLer, Math.max(1, paralelo), async d => {
    if (d.nivel === 'sigiloso' || !d.titulo) { lidos.set(d.numero, { texto: '', digitalizado: false, motivo: 'sigiloso: não é lido' }); return; }
    if (d.nivel === 'restrito' && !consentiu) { lidos.set(d.numero, { texto: '', digitalizado: false, motivo: 'restrito: o usuário não autorizou o envio ao modelo nesta conversa' }); return; }
    try {
      const r = await ctx.sei<Lido>('documento.ler', { numero: d.numero });
      if (r.nivel === 'sigiloso') { lidos.set(d.numero, { texto: '', digitalizado: false, motivo: 'sigiloso: não é lido' }); return; }
      if (r.nivel === 'restrito' && !(await consentir(`Documento ${d.numero} (${d.titulo}), processo ${protocolo}`))) {
        lidos.set(d.numero, { texto: '', digitalizado: false, motivo: 'restrito: o usuário não autorizou o envio ao modelo nesta conversa' });
        return;
      }
      const c = r.conteudo;
      if (c.forma === 'arquivo' && c.tipo === 'application/pdf' && c.base64) {
        const bruto = await extrairTextoPdf(c.base64, d.semOcr ? { ocr: false } : {});
        if (bruto.startsWith(SEM_TEXTO_PDF)) lidos.set(d.numero, { texto: '', digitalizado: true, motivo: 'PDF sem texto legível (digitalizado)' });
        else lidos.set(d.numero, { texto: paginasDoPdf(bruto), digitalizado: bruto.startsWith(MARCA_OCR) });
      } else if (c.forma === 'arquivo') lidos.set(d.numero, { texto: '', digitalizado: false, motivo: `arquivo ${c.tipo}: sem extração de texto` });
      else if (c.forma === 'grande') lidos.set(d.numero, { texto: '', digitalizado: false, motivo: 'arquivo grande demais para ler' });
      else lidos.set(d.numero, { texto: c.texto ?? '', digitalizado: false, ocultos: c.ocultos });
    } catch (e) {
      lidos.set(d.numero, { texto: '', digitalizado: false, motivo: `erro na leitura: ${(e as Error).message ?? e}` });
    }
  });
  return lidos;
}

/**
 * Prepara o pacote do DVI de um processo: etapa, família, documentos recortados, checagens e checklist.
 * Lança o erro da ponte quando o processo é sigiloso (o agente não atua nele).
 */
export async function prepararDvi(processo: string, ctx: ContextoTool, o: OpcoesPreparar = {}): Promise<PacoteDvi> {
  const arv = await ctx.sei<Arvore>('processo.arvore', { processo });
  const naoLidos: DocumentoNaoLido[] = [];
  const usaveis: DocArvore[] = [];
  for (const d of arv.documentos) {
    if (d.nivel === 'sigiloso' || !d.titulo) naoLidos.push({ numero: d.numero, motivo: 'sigiloso: não é lido' });
    else if (d.cancelado) naoLidos.push({ numero: d.numero, titulo: d.titulo, motivo: 'cancelado' });
    else usaveis.push(d);
  }
  const titulos = usaveis.map(d => d.titulo!);
  const { familia, tipo } = familiaDoProcesso(titulos, o.tipo);
  const { documentosChave: _chave, ...etapa } = resumir(usaveis.map(d => ({ titulo: d.titulo!, numero: d.numero })));

  // Na prorrogação/reajuste, o que veio antes do último contrato só serve às checagens: lido sem OCR.
  let iContrato = -1;
  titulos.forEach((t, i) => { if (P_CONTRATO.test(normalizar(t))) iContrato = i; });
  const semOcr = (i: number) => familia !== 'preparatoria' && i < iContrato;

  const aLer = usaveis.slice(0, MAX_DOCUMENTOS);
  for (const d of usaveis.slice(MAX_DOCUMENTOS)) naoLidos.push({ numero: d.numero, titulo: d.titulo, motivo: `limite de ${MAX_DOCUMENTOS} documentos por pacote` });

  const lidos = await lerDocumentos(ctx, arv.protocolo, aLer.map((d, i) => ({ ...d, semOcr: semOcr(i) })), o.paralelo);

  // Os documentos como as regras da skill os veem (seq = ordem na árvore, sem cancelados nem sigilosos).
  const docs: DocAutos[] = usaveis.map((d, i) => {
    const l = lidos.get(d.numero);
    const texto = l?.texto ?? '';
    return {
      seq: i + 1, sei: d.numero, titulo: d.titulo!, texto,
      datasAssinatura: [...new Set([...texto.matchAll(RE_ASSINATURA)].map(m => m[3]))].sort(),
      assinado: !!d.assinado || !!d.assinaturas?.length, digitalizado: !!l?.digitalizado,
    };
  });
  const porSeq = new Map(docs.map(d => [d.seq, d]));
  for (const d of aLer) {
    const m = lidos.get(d.numero)?.motivo;
    if (m) naoLidos.push({ numero: d.numero, titulo: d.titulo, motivo: m });
  }

  // A regra vê todos os títulos (contrato e DVI anterior são pelo título); o que não foi lido sai da leitura.
  const sel = selecionarModos(docs, familia, o.tipo);
  const semTexto = new Set(docs.filter(d => !lidos.has(d.sei) || lidos.get(d.sei)!.motivo).map(d => d.seq));
  for (const d of docs) {
    if (semTexto.has(d.seq)) { sel.modos[d.seq] = 'nao_lido'; continue; }
    if (sel.modos[d.seq] === 'nao_lido') naoLidos.push({ numero: d.sei, titulo: d.titulo, motivo: 'fora da leitura dirigida da família (fase anterior ao contrato)' });
  }
  const leitura = caberNoOrcamento(docs, sel, o.orcamento ?? ORCAMENTO[familia]);
  for (const seq of leitura.foraPeloOrcamento) naoLidos.push({ numero: porSeq.get(seq)!.sei, titulo: porSeq.get(seq)!.titulo, motivo: 'limite de caracteres do pacote' });

  const hoje = o.hoje ?? hojeLocal();
  const varridas = varrerCamposLivres(checagensMecanicas(docs, {
    processo: arv.protocolo, hoje, conteudo: sel.rotulos, lidos: leitura.documentos.map(x => x.seq),
  }));
  if (varridas.achados.length) ctx.registrarAchados(`checagens de ${arv.protocolo}`, varridas.achados);
  if (familia === 'preparatoria' && o.pca) {
    try {
      const r = await o.pca(arv.protocolo);
      if (r) varridas.valor.push(checagemPca(r));
    } catch { /* PCA fora do ar: o A04 segue só pelos autos */ }
  }

  const documentos: DocumentoPacote[] = leitura.documentos.map(x => {
    const d = porSeq.get(x.seq)!;
    const v = varrer(x.texto, { ocultos: lidos.get(d.sei)?.ocultos });
    if (v.achados.length) ctx.registrarAchados(d.sei, v.achados);
    return {
      numero: d.sei, tipo: tipoDe(d.titulo), titulo: d.titulo, assinado: !!d.assinado || d.datasAssinatura.length > 0,
      leitura: x.modo as DocumentoPacote['leitura'],
      ...(sel.rotulos[x.seq] ? { conteudo: sel.rotulos[x.seq] } : {}),
      ...(x.cortado ? { cortado: x.cortado } : {}),
      texto: envelopar(d.sei, v.texto, ctx.nonce),
      ...(v.achados.length ? { integridade: resumoDosAchados(v.achados) } : {}),
    };
  });
  const ref = (seq: number | null) => (seq === null ? null : { numero: porSeq.get(seq)!.sei, titulo: porSeq.get(seq)!.titulo });
  const pacote: PacoteDvi = {
    processo: arv.protocolo,
    etapa,
    familia,
    tipo,
    hoje: fmtData(hoje),
    contrato: ref(sel.contrato),
    dviAnterior: ref(sel.dviAnterior),
    series: sel.series,
    documentos,
    checagens: varridas.valor,
    checklist: itensDoChecklist(familia, sel.series),
    limites: { caracteres: 0, orcamento: leitura.orcamento, documentosNaoLidos: naoLidos },
  };
  // o tamanho entra no próprio pacote: duas passadas bastam (o número só muda de dígitos)
  pacote.limites.caracteres = JSON.stringify(pacote).length;
  pacote.limites.caracteres = JSON.stringify(pacote).length;
  return pacote;
}
