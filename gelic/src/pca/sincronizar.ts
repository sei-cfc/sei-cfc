/**
 * O PCA ao abrir um processo: o item ligado a ele e, no SEI CFC Gelic com permissão de editar o PCA, o envio da
 * coleta bruta (histórico completo e instrumentos contratuais), só quando o histórico mudou desde a última coleta
 * que o PCA conhece (o atalho de pulo do robô).
 *
 * As leituras do SEI vêm injetadas (deps): no content script saem pela sessão do usuário (criarHttp), nos testes
 * são falsas. Processo sigiloso nunca chega aqui (o selo para antes).
 */
import type { Andamento } from '../../../sei-nucleo/src/dominio/historico';
import type { Arvore, DocumentoArvore } from '../../../sei-nucleo/src/dominio/arvore';
import type { Area } from '../peca/guardados';
import type { Perfil } from '../perfil';
import type { ClientePcaV1, ErroPca } from './cliente';
import { guardarEnviado, guardarVinculo, lerEnviado, lerVinculo, type ConfigGuardada } from './config';
import { andamentoPca, documentoDaColeta, leituraDe, precisaColetar, type CorpoColeta, type EstadoPca, type ItemAplicado } from './contrato';

/**
 * O PCA recusa acima de 10 MB. O conteúdo (HTML e PDF em base64) cabe neste orçamento; o que passa dele vai como
 * externo_nao_baixado (pendência no PCA), em vez de um 413 a cada abertura.
 */
export const MAX_BYTES_CONTEUDO = 8 * 1024 * 1024;
/** Só o PDF: base64 cresce 4/3. */
export const MAX_BYTES_PDF = Math.floor((MAX_BYTES_CONTEUDO * 3) / 4);

export class ColetaRecusada extends Error {}

export interface DepsSincronizar {
  cliente: ClientePcaV1;
  config: ConfigGuardada;
  area: Area | null;
  agora: () => number;
  /** Histórico completo do processo, do mais recente para o mais antigo (limite: só as primeiras linhas). */
  historico: (limite?: number) => Promise<{ total: number; andamentos: Andamento[] }>;
  /** HTML do documento interno (lança se o SEI não o entregou). */
  html: (d: DocumentoArvore) => Promise<string>;
  /** Bytes do anexo externo (null se não for PDF). */
  pdf: (d: DocumentoArvore) => Promise<Uint8Array | null>;
  /** Cancelamento (Controle de Processos): nada é enviado depois dele. */
  sinal?: AbortSignal;
  /** O PCA recusou o envio (403): a permissão foi retirada. */
  aoPerderPermissao?: () => void;
}

export function base64(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

/** Pasta fechada na árvore (nó "Aguarde..."): os documentos dela não foram carregados. */
export const temPastaFechada = (arvore: Arvore) => /infraArvoreNo\("AGUARDE"/.test(arvore.pagina?.html ?? '');

/**
 * A coleta do processo no formato do robô: todos os documentos, com o conteúdo só dos contratuais legíveis.
 * Como o robô, falha ao ler um documento interno derruba a coleta (nada é enviado); só o PDF externo degrada.
 * Recusa (ColetaRecusada) a árvore com pasta fechada e o histórico que não bate com o total.
 */
export async function coletar(arvore: Arvore, deps: Pick<DepsSincronizar, 'historico' | 'html' | 'pdf' | 'sinal'>): Promise<CorpoColeta> {
  if (temPastaFechada(arvore)) throw new ColetaRecusada('a árvore veio com pasta fechada; abra as pastas e tente de novo');
  const { total, andamentos } = await deps.historico();
  if (andamentos.length !== total) throw new ColetaRecusada(`histórico incompleto (${andamentos.length} de ${total} andamentos)`);
  let bytes = 0;
  const documentos = [];
  for (const d of arvore.documentos) {
    if (deps.sinal?.aborted) throw new ColetaRecusada('cancelado');
    const leitura = leituraDe(d);
    let lido: { html?: string; pdf_base64?: string } | undefined;
    if (leitura === 'html') {
      const html = await deps.html(d);
      if (bytes + html.length <= MAX_BYTES_CONTEUDO) { bytes += html.length; lido = { html }; }
    } else if (leitura === 'pdf') {
      let b: Uint8Array | null = null;
      try { b = await deps.pdf(d); } catch (e) { if (deps.sinal?.aborted) throw e; /* como o robô: o PDF externo degrada */ }
      const tamanho = b ? Math.ceil(b.length / 3) * 4 : 0;
      if (b && bytes + tamanho <= MAX_BYTES_CONTEUDO) { bytes += tamanho; lido = { pdf_base64: base64(b) }; }
    }
    documentos.push(documentoDaColeta(d, lido));
  }
  return { numero: arvore.protocolo, andamentos: andamentos.map(andamentoPca), documentos };
}

/** O código do erro (do PCA ou do SEI), para o lote do Controle saber quando parar. */
const codigoDe = (e: unknown) => { const c = (e as { codigo?: unknown }).codigo; return typeof c === 'string' ? { codigo: c } : {}; };

const resumoDoEnvio = (itens: ItemAplicado[]) => ({
  alterados: itens.flatMap(i => Object.keys(i.alterados)),
  pendencias: itens.flatMap(i => i.pendencias),
});

/**
 * O estado do PCA para o processo. `aoMudar` recebe os passos intermediários (o item já achado, "enviando…"), para o
 * selo mostrar o item antes de a coleta terminar.
 */
export async function sincronizarProcesso(arvore: Arvore, perfil: Perfil, deps: DepsSincronizar, aoMudar: (e: EstadoPca) => void = () => {}): Promise<EstadoPca> {
  const enviar = perfil === 'gelic' && deps.config.pode_enviar === true;
  try {
    let vinculo = enviar ? null : await lerVinculo(deps.area, arvore.protocolo, deps.agora());
    if (!vinculo) {
      vinculo = await deps.cliente.porSei(arvore.protocolo);
      await guardarVinculo(deps.area, arvore.protocolo, vinculo, deps.agora());
    }
    if (!vinculo.itens.length) return { tipo: 'sem_vinculo' };
    const itens = vinculo.itens;
    if (!enviar) return { tipo: 'item', itens };

    try {
      const topo = await deps.historico(1);
      const atual = { total: topo.total, primeiro: topo.andamentos[0] ?? null };
      const enviado = await lerEnviado(deps.area, arvore.protocolo);
      if (!precisaColetar(vinculo.ultima_coleta, atual, { enviado, agora: deps.agora() })) return { tipo: 'item', itens, envio: 'em_dia' };
      aoMudar({ tipo: 'item', itens, envio: 'enviando' });
      const corpo = await coletar(arvore, deps);
      if (deps.sinal?.aborted) throw new ColetaRecusada('cancelado');
      const r = await deps.cliente.coleta(corpo, deps.sinal);
      await guardarEnviado(deps.area, arvore.protocolo, { total: corpo.andamentos.length, primeiro: corpo.andamentos[0] ?? null, t: deps.agora() });
      return { tipo: 'item', itens, envio: resumoDoEnvio(r.itens) };
    } catch (e) {
      if ((e as ErroPca).codigo === 'sem_permissao') deps.aoPerderPermissao?.();
      return { tipo: 'item', itens, envio: { erro: (e as Error).message, ...codigoDe(e) } };
    }
  } catch (e) {
    return { tipo: 'erro', mensagem: (e as Error).message, ...codigoDe(e) };
  }
}
