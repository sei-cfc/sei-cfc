/**
 * Os dados da contratação para a janela da peça (desenho: docs/gelic/2026-10-11-dados-da-contratacao-design.md,
 * "Modos", "Junção por campo e conflito", "Sobe depois"). Diz de onde ler (PCA, só leitura ou este navegador) e salva
 * com a junção por campo e até TENTATIVAS contra o 409. O PCA e o storage chegam injetados: testável sem rede.
 */
import { temValor } from '../modelos/analise-cfc';
import type { Area } from '../peca/guardados';
import { ErroPca, type ClientePca } from '../pca/cliente';
import type { ItemDaFicha, RespostaFicha } from '../pca/contrato';
import { TEMPO_PCA_MS } from '../iniciar/pca';
import { lerDados, montarDados, TENTATIVAS, type DadosLidos } from './formato';
import { iguais, juntar, type Juncao } from './juntar';
import { apagarLocal, guardarLocal, lerLocal, type DadosLocais } from './local';

export type Modo = 'pca' | 'leitura' | 'navegador';
export interface DadosPca {
  item: ItemDaFicha;
  versao: number;
  respostas: Record<string, unknown>;
  por: string | null;
  em: string | null;
  lidos: DadosLidos;
}
export interface EstadoDados {
  modo: Modo;
  /** Por que não é o modo PCA, em palavras (a barra da janela mostra). */
  motivo: string | null;
  /** Os dados do PCA; o modo só leitura também os mostra. */
  pca: DadosPca | null;
  /** Os dados deste navegador para o processo. */
  local: DadosLocais | null;
  /** Processo em mais de um item, sem item informado: a pessoa escolhe. */
  itens: ItemDaFicha[];
}
export interface DepsDados {
  protocolo: string;
  area: Area | null;
  /** null: PCA não configurado na extensão. */
  cliente: Pick<ClientePca, 'ficha' | 'gravarFicha'> | null;
  /** `pode_instruir` da configuração: sem ele, só leitura. */
  podeInstruir: boolean;
  agora: () => number;
  /** Prazo de cada pedido ao PCA (padrão: TEMPO_PCA_MS). */
  prazo?: () => AbortSignal;
}
export type ResultadoSalvar =
  /** Gravado no PCA ou neste navegador. `base`: a da próxima junção; `trazidos`: campos que vieram mudados do outro lado. */
  | { tipo: 'pca' | 'navegador'; estado: EstadoDados; base: Record<string, unknown>; trazidos: Record<string, unknown>; motivo: string | null }
  /** Os dois mudaram o mesmo campo: depois da escolha, salvar de novo com `base` = `deles`. */
  | { tipo: 'conflito'; estado: EstadoDados; juncao: Juncao; deles: Record<string, unknown> }
  /** Nada gravado. */
  | { tipo: 'erro'; motivo: string };

const ehErro = (e: unknown, codigo: string) => e instanceof ErroPca && e.codigo === codigo;
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
const prazoDe = (deps: DepsDados) => (deps.prazo ?? (() => AbortSignal.timeout(TEMPO_PCA_MS)))();

/** "11/10 14:32", da data do PCA como ela veio (sem converter fuso). */
function quando(em: string | null): string | null {
  const m = em ? /^\d{4}-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(em) : null;
  return m ? `${m[2]}/${m[1]} ${m[3]}:${m[4]}` : null;
}
const quem = (por: string | null) => (por ? por.split('@')[0] : null);
/** A origem do campo: "salvo por fulano, 11/10 14:32". */
export function salvoPor(por: string | null, em: string | null): string {
  const q = quem(por), w = quando(em);
  return `salvo ${q ? `por ${q}` : 'no PCA'}${w ? `, ${w}` : ''}`;
}
/** O cabeçalho do conflito: "fulano salvou em 11/10 14:32". */
export function quemSalvou(por: string | null, em: string | null): string {
  const q = quem(por), w = quando(em);
  return `${q ? `${q} salvou` : 'foram salvos'}${w ? ` em ${w}` : ''}`;
}

function doPca(f: RespostaFicha): DadosPca {
  const lidos = lerDados(f.dados);
  return { item: { item_pca: f.item_pca, exercicio: f.exercicio }, versao: f.versao, respostas: lidos.problema === 'formato' ? {} : lidos.respostas,
    por: f.atualizado_por, em: f.atualizado_em, lidos };
}
function itensDoErro(e: unknown): ItemDaFicha[] {
  const itens = ((e as ErroPca).corpo as { itens?: unknown } | undefined)?.itens;
  if (!Array.isArray(itens)) return [];
  return itens.filter((i): i is ItemDaFicha => !!i && typeof (i as ItemDaFicha).item_pca === 'number' && typeof (i as ItemDaFicha).exercicio === 'number')
    .map(i => ({ item_pca: i.item_pca, exercicio: i.exercicio }));
}

/** Abre os dados do processo: no PCA pelo nº SEI (em vários itens, o informado, ou a escolha da pessoa); sem PCA, deste navegador. */
export async function abrirDados(deps: DepsDados, informado: ItemDaFicha | null = null): Promise<EstadoDados> {
  const local = await lerLocal(deps.area, deps.protocolo);
  const navegador = (motivo: string, itens: ItemDaFicha[] = []): EstadoDados => ({ modo: 'navegador', motivo, pca: null, local, itens });
  if (!deps.cliente) return navegador('PCA não configurado nesta extensão');
  let f: RespostaFicha;
  try {
    f = await deps.cliente.ficha({ sei: deps.protocolo }, prazoDe(deps));
  } catch (e) {
    if (ehErro(e, 'item_inexistente')) return navegador('processo sem item do PCA');
    if (!ehErro(e, 'sei_em_varios_itens')) return navegador(mensagem(e));
    const itens = itensDoErro(e);
    const escolhido = informado ? itens.find(i => i.item_pca === informado.item_pca && i.exercicio === informado.exercicio) : undefined;
    if (!escolhido) return navegador('o processo está ligado a mais de um item do PCA: escolha o item', itens);
    try { f = await deps.cliente.ficha(escolhido, prazoDe(deps)); } catch (e2) { return navegador(mensagem(e2)); }
  }
  const pca = doPca(f);
  if (pca.lidos.problema) {
    const motivo = pca.lidos.problema === 'esquema_novo' ? 'os dados da contratação têm um formato mais novo: atualize a extensão' : 'dados da contratação em formato desconhecido';
    return { modo: 'leitura', motivo, pca, local, itens: [] };
  }
  if (!deps.podeInstruir) return { modo: 'leitura', motivo: 'sem permissão de gravar os dados da contratação (grupo demandante no PCA)', pca, local, itens: [] };
  return { modo: 'pca', motivo: null, pca, local, itens: [] };
}

/**
 * Salva os `campos` desta peça (`meus`), juntados por campo com o destino do modo. `base`: o valor de cada campo
 * quando a pessoa começou. `subindo`: o "sobe depois" (os dados do navegador saem daqui depois de gravados no PCA).
 * `conferir`: a gravação no SEI; sem nada a escrever, relê os dados no PCA, para o documento sair com os de agora.
 */
export async function salvarDados(deps: DepsDados, estado: EstadoDados, base: Readonly<Record<string, unknown>>, meus: Readonly<Record<string, unknown>>,
  campos: readonly string[], o: { subindo?: boolean; conferir?: boolean } = {}): Promise<ResultadoSalvar> {
  if (estado.modo !== 'pca' || !estado.pca || !deps.cliente) return salvarNoNavegador(deps, estado, base, meus, campos);
  let atual = estado.pca;
  const trazidos: Record<string, unknown> = {};
  let conferido = false;
  for (let i = 0; i < TENTATIVAS; i++) {
    const j = juntar(base, meus, atual.respostas, campos);
    for (const k of j.trazidos) trazidos[k] = j.resultado[k];
    if (j.conflitos.length) return { tipo: 'conflito', estado: { ...estado, pca: atual }, juncao: j, deles: atual.respostas };
    let local = estado.local;
    // nada a mudar: a versão não sobe à toa (na subida, só os dados do navegador saem)
    if (campos.every(k => iguais(j.resultado[k], atual.respostas[k]))) {
      // a gravação no SEI confere uma vez se os dados mudaram desde a abertura (a releitura não conta como tentativa)
      if (o.conferir && !conferido) {
        conferido = true;
        try {
          const nova = doPca(await deps.cliente.ficha(atual.item, prazoDe(deps)));
          if (nova.versao !== atual.versao && !nova.lidos.problema) { atual = nova; i--; continue; }
        } catch { /* PCA fora do ar: segue com o que se tem */ }
      }
      if (o.subindo && local) { await apagarLocal(deps.area, deps.protocolo); local = null; }
      return { tipo: 'pca', estado: { ...estado, pca: atual, local }, base: { ...atual.respostas }, trazidos, motivo: null };
    }
    try {
      const f = await deps.cliente.gravarFicha({ ...atual.item, versao: atual.versao, dados: montarDados(atual.lidos, { respostas: j.resultado }) }, prazoDe(deps));
      const pca = doPca(f);
      // o que estava neste navegador e acabou de subir (ou já está igual no PCA) sai daqui
      const l = local;
      if (l && (o.subindo || Object.keys(l.respostas).every(k => iguais(l.respostas[k], pca.respostas[k])))) { await apagarLocal(deps.area, deps.protocolo); local = null; }
      return { tipo: 'pca', estado: { ...estado, pca, local }, base: { ...pca.respostas }, trazidos, motivo: null };
    } catch (e) {
      if (ehErro(e, 'versao_desatualizada')) {
        const ficha = ((e as ErroPca).corpo as { ficha?: RespostaFicha } | undefined)?.ficha;
        const nova = ficha ? doPca(ficha) : null;
        // alguém gravou no meio: junta de novo com a versão que veio no 409
        if (nova && !nova.lidos.problema) { atual = nova; continue; }
      }
      return guardarDoPca(deps, estado, base, meus, campos, mensagem(e), ehErro(e, 'sem_permissao'));
    }
  }
  return { tipo: 'erro', motivo: 'os dados da contratação estão mudando agora; tente de novo em instantes' };
}

/** Destino neste navegador (sem o PCA, ou só leitura): junta com o que está guardado (outra janela pode ter salvo). */
async function salvarNoNavegador(deps: DepsDados, estado: EstadoDados, base: Readonly<Record<string, unknown>>, meus: Readonly<Record<string, unknown>>,
  campos: readonly string[]): Promise<ResultadoSalvar> {
  const agora = await lerLocal(deps.area, deps.protocolo);
  const deles = agora?.respostas ?? {};
  const j = juntar(base, meus, deles, campos);
  if (j.conflitos.length) return { tipo: 'conflito', estado: { ...estado, local: agora }, juncao: j, deles };
  // a base da subida: o valor no PCA que a pessoa via (só leitura), quando há
  const baseLocal = { ...(agora?.base ?? {}) };
  if (estado.pca) for (const k of campos) { if (temValor(estado.pca.respostas[k])) baseLocal[k] = estado.pca.respostas[k]; else delete baseLocal[k]; }
  if (!(await guardarLocal(deps.area, deps.protocolo, j.resultado, deps.agora(), baseLocal))) return { tipo: 'erro', motivo: 'este navegador não guardou os dados da contratação' };
  return { tipo: 'navegador', estado: { ...estado, local: await lerLocal(deps.area, deps.protocolo) }, base: { ...j.resultado },
    trazidos: Object.fromEntries(j.trazidos.map(k => [k, j.resultado[k]])), motivo: estado.motivo ?? 'sem o PCA' };
}

/** O PCA não aceitou: as respostas desta peça ficam neste navegador, com a base do PCA, para subir depois. */
async function guardarDoPca(deps: DepsDados, estado: EstadoDados, base: Readonly<Record<string, unknown>>, meus: Readonly<Record<string, unknown>>,
  campos: readonly string[], motivo: string, semPermissao: boolean): Promise<ResultadoSalvar> {
  const antes = await lerLocal(deps.area, deps.protocolo);
  const respostas = { ...(antes?.respostas ?? {}) };
  const baseLocal = { ...(antes?.base ?? {}) };
  for (const k of campos) {
    // o apagado vai como vazio: na subida, apaga
    respostas[k] = temValor(meus[k]) ? meus[k] : '';
    if (temValor(base[k])) baseLocal[k] = base[k]; else delete baseLocal[k];
  }
  if (!(await guardarLocal(deps.area, deps.protocolo, respostas, deps.agora(), baseLocal))) return { tipo: 'erro', motivo: `${motivo}; e este navegador não guardou os dados` };
  const local = await lerLocal(deps.area, deps.protocolo);
  return { tipo: 'navegador', estado: semPermissao ? { ...estado, modo: 'leitura', motivo, local } : { ...estado, local }, base: { ...base }, trazidos: {}, motivo };
}
