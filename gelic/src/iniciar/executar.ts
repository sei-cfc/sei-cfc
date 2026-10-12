/**
 * A execução do "Iniciar processo": o tipo de documento de cada peça (lembrado, ou pelo nome, ou perguntado) e a criação
 * das peças na ordem, com progresso. Para no primeiro erro e diz o que já foi criado; nunca apaga nada. As telas do SEI
 * vêm injetadas (src/iniciar/sei.ts no content script; falsas nos testes).
 */
import { normalizar } from '../../../sei-nucleo/src/formulario/formulario';
import type { PecaInicial } from './arvore-inicial';
import type { Opcao } from './sei';

/** Chave do tipo lembrado: a peça e se é externa (o mesmo nome pode ter tipos diferentes nas duas listas). */
export const chaveDoTipo = (p: Pick<PecaInicial, 'chave' | 'externo'>) => `${p.chave}:${p.externo ? 'externo' : 'interno'}`;

/** O tipo da peça: o lembrado, se ainda existe; senão o nome exato; senão o único que contém o nome. Sem certeza, null. */
export function escolherTipo(p: PecaInicial, opcoes: readonly Opcao[], lembrado?: string): string | null {
  if (lembrado && opcoes.some(o => o.id === lembrado)) return lembrado;
  // primeiro o nome exato (qualquer um da lista); depois o único que contém um nome de duas palavras ou mais
  // ("Termo de Ciência" acha "Termo de Ciência - Equipe"; "Termo" sozinho nunca decide)
  for (const nome of p.tipoSei) {
    const exato = opcoes.filter(o => normalizar(o.nome) === normalizar(nome));
    if (exato.length === 1) return exato[0].id;
  }
  for (const nome of p.tipoSei.filter(n => n.trim().split(/\s+/).length >= 2)) {
    const contem = opcoes.filter(o => normalizar(o.nome).includes(normalizar(nome)));
    if (contem.length === 1) return contem[0].id;
  }
  return null;
}

export interface Pendente { chave: string; externo: boolean; nomeArvore: string; opcoes: readonly Opcao[] }
/** Tipo de cada peça (por chaveDoTipo), ou as que precisam de escolha. */
export function resolverTipos(pecas: readonly PecaInicial[], tipos: { internos: readonly Opcao[]; externos: readonly Opcao[] }, lembrados: Readonly<Record<string, string>>) {
  const escolhidos: Record<string, string> = {};
  const pendentes: Pendente[] = [];
  for (const p of pecas) {
    const k = chaveDoTipo(p);
    if (k in escolhidos || pendentes.some(x => chaveDoTipo(x) === k)) continue;
    const opcoes = p.externo ? tipos.externos : tipos.internos;
    const id = escolherTipo(p, opcoes, lembrados[k]);
    if (id) escolhidos[k] = id;
    else pendentes.push({ chave: p.chave, externo: p.externo, nomeArvore: p.nomeArvore, opcoes });
  }
  return { escolhidos, pendentes };
}

export interface DepsPecas {
  interno: (ref: string, d: { tipo: string; nomeArvore: string }) => Promise<unknown>;
  externo: (ref: string, d: { tipo: string; nomeArvore: string }) => Promise<unknown>;
}
export interface ResultadoPecas { criadas: string[]; /** As internas criadas em branco (src/iniciar/vazios.ts). */ vazios: { chave: string; numero: string }[]; erro?: { peca: string; mensagem: string } }

/** Cria as peças na ordem (o SEI ordena a árvore pela criação). Para no primeiro erro, sem desfazer o que foi criado. */
export async function criarPecas(protocolo: string, pecas: readonly PecaInicial[], tipos: Readonly<Record<string, string>>, deps: DepsPecas,
  aoProgresso: (feitas: number, total: number, atual: string) => void = () => {}, sinal?: AbortSignal): Promise<ResultadoPecas> {
  const criadas: string[] = [];
  const vazios: { chave: string; numero: string }[] = [];
  for (const [i, p] of pecas.entries()) {
    if (sinal?.aborted) return { criadas, vazios, erro: { peca: p.nomeArvore, mensagem: 'cancelado' } };
    aoProgresso(i, pecas.length, p.nomeArvore);
    const tipo = tipos[chaveDoTipo(p)];
    try {
      if (!tipo) throw new Error('tipo de documento não escolhido');
      const r = await (p.externo ? deps.externo : deps.interno)(protocolo, { tipo, nomeArvore: p.nomeArvore });
      const numero = (r as { numero?: unknown } | undefined)?.numero;
      if (!p.externo && typeof numero === 'string' && numero) vazios.push({ chave: p.chave, numero });
      criadas.push(p.nomeArvore);
    } catch (e) {
      return { criadas, vazios, erro: { peca: p.nomeArvore, mensagem: (e as Error).message } };
    }
  }
  aoProgresso(pecas.length, pecas.length, '');
  return { criadas, vazios };
}
