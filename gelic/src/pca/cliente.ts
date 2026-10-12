/**
 * Cliente da API do PCA (contrato v1). O fetch é injetado: no content script é o da página (o CORS do PCA aceita a
 * origem do SEI), na janela da peça é o da extensão, nos testes é falso.
 */
import type { CorpoColeta, CorpoFicha, CorpoVinculo, ItemDaFicha, RespostaColeta, RespostaFicha, RespostaProcesso, RespostaSaude, RespostaVinculo } from './contrato';

export interface ConfigPca { url: string; token: string }
export type Buscar = (url: string, init?: RequestInit) => Promise<Pick<Response, 'ok' | 'status' | 'json'>>;

/** Erros da tabela do contrato, em palavras para a tela. */
const MENSAGENS: Readonly<Record<string, string>> = {
  nao_autenticado: 'token do PCA inválido ou revogado: gere outro em Meu perfil, no PCA',
  sem_permissao: 'seu usuário do PCA não pode enviar coleta (falta a permissão de editar o PCA)',
  processo_sem_item: 'processo sem item vinculado no PCA',
  corpo_invalido: 'o PCA recusou a coleta (formato inválido)',
  corpo_grande_demais: 'a coleta passou do limite do PCA (documentos grandes demais)',
  limite_requisicoes: 'limite de requisições ao PCA: tente de novo em um minuto',
  falha_interna: 'o PCA falhou ao aplicar a coleta; nada foi gravado',
  item_inexistente: 'o item não existe no PCA (confira o nº e o exercício)',
};
/** O vínculo (v1.1) tem permissão própria: o grupo demandante, ou a de editar o PCA. */
const MENSAGENS_VINCULO: Readonly<Record<string, string>> = {
  sem_permissao: 'seu usuário do PCA não pode vincular processos: peça a inclusão no grupo demandante',
  corpo_invalido: 'o PCA recusou o vínculo (formato inválido)',
  falha_interna: 'o PCA falhou ao gravar o vínculo',
  // 404 sem o JSON do contrato: a rota não existe (PCA anterior à v1.1)
  processo_sem_item: 'o PCA não tem a rota do vínculo (API anterior à versão 1.1)',
};
/** Os dados da contratação (v1.1): a mesma permissão do vínculo; 404 sem o JSON do contrato é PCA sem a rota. */
const MENSAGENS_FICHA: Readonly<Record<string, string>> = {
  sem_permissao: 'seu usuário do PCA não pode gravar os dados da contratação: peça a inclusão no grupo demandante',
  item_inexistente: 'processo sem item do PCA',
  sei_em_varios_itens: 'o processo está ligado a mais de um item do PCA',
  versao_desatualizada: 'os dados da contratação mudaram no PCA',
  corpo_invalido: 'o PCA recusou os dados da contratação (formato inválido)',
  corpo_grande_demais: 'os dados da contratação passaram do limite do PCA (512 KB)',
  falha_interna: 'o PCA falhou ao gravar os dados da contratação',
  processo_sem_item: 'o PCA não tem a rota dos dados da contratação (API anterior à versão 1.1)',
};
const POR_STATUS: Readonly<Record<number, string>> = { 401: 'nao_autenticado', 403: 'sem_permissao', 404: 'processo_sem_item', 400: 'corpo_invalido', 413: 'corpo_grande_demais', 429: 'limite_requisicoes', 500: 'falha_interna' };

export class ErroPca extends Error {
  constructor(readonly codigo: string, mensagem: string, readonly status?: number, /** O JSON da resposta de erro (o 409 traz a ficha atual e a lista de itens). */ readonly corpo?: unknown) {
    super(mensagem);
    this.name = 'ErroPca';
  }
}

const base = (url: string) => `${url.replace(/\/+$/, '')}/api/sei`;

export function criarClientePca(config: ConfigPca, buscar: Buscar) {
  async function pedir<T>(caminho: string, init: RequestInit = {}, mensagens: Readonly<Record<string, string>> = {}): Promise<T> {
    const parado = () => (init.signal?.reason as Error | undefined)?.name === 'TimeoutError'
      ? new ErroPca('tempo', 'o PCA não respondeu a tempo') : new ErroPca('cancelado', 'cancelado');
    if (init.signal?.aborted) throw parado();
    let r: Awaited<ReturnType<Buscar>>;
    try {
      r = await buscar(`${base(config.url)}${caminho}`, {
        ...init,
        headers: { Authorization: `Bearer ${config.token}`, ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
        credentials: 'omit',
      });
    } catch {
      if (init.signal?.aborted) throw parado();
      throw new ErroPca('rede', 'o PCA não respondeu (rede ou endereço)');
    }
    if (r.ok) return (await r.json()) as T;
    let codigo = POR_STATUS[r.status] ?? 'http';
    let corpo: unknown;
    try {
      corpo = await r.json();
      const erro = (corpo as { erro?: unknown } | null)?.erro;
      if (typeof erro === 'string' && erro) codigo = erro;
    } catch { /* corpo sem JSON: fica o código pelo status */ }
    throw new ErroPca(codigo, mensagens[codigo] ?? MENSAGENS[codigo] ?? `o PCA respondeu ${r.status}`, r.status, corpo);
  }
  return {
    saude: (sinal?: AbortSignal) => pedir<RespostaSaude>('/saude', sinal ? { signal: sinal } : {}),
    porSei: (numero: string) => pedir<RespostaProcesso>(`/processo?sei=${encodeURIComponent(numero)}`),
    porItem: (item: number | string, exercicio: number | string) =>
      pedir<RespostaProcesso>(`/processo?item=${encodeURIComponent(String(item))}&exercicio=${encodeURIComponent(String(exercicio))}`),
    coleta: (corpo: CorpoColeta, sinal?: AbortSignal) => pedir<RespostaColeta>('/coleta', { method: 'POST', body: JSON.stringify(corpo), ...(sinal ? { signal: sinal } : {}) }),
    /** v1.1: liga o nº SEI ao item (idempotente: 201 criado, 200 já existia). */
    vincular: (corpo: CorpoVinculo, sinal?: AbortSignal) =>
      pedir<RespostaVinculo>('/vinculo', { method: 'POST', body: JSON.stringify(corpo), ...(sinal ? { signal: sinal } : {}) }, MENSAGENS_VINCULO),
    /** v1.1: os dados da contratação do item (pelo nº SEI ou pelo item); sem dados gravados, versão 0 e `dados` {}. */
    ficha: (q: { sei: string } | ItemDaFicha, sinal?: AbortSignal) =>
      pedir<RespostaFicha>(`/ficha?${'sei' in q ? `sei=${encodeURIComponent(q.sei)}` : `item=${encodeURIComponent(String(q.item_pca))}&exercicio=${encodeURIComponent(String(q.exercicio))}`}`,
        sinal ? { signal: sinal } : {}, MENSAGENS_FICHA),
    /** v1.1: grava com a versão lida; versão velha dá 409 `versao_desatualizada`, com a ficha atual em `ErroPca.corpo`. */
    gravarFicha: (corpo: CorpoFicha, sinal?: AbortSignal) =>
      pedir<RespostaFicha>('/ficha', { method: 'PUT', body: JSON.stringify(corpo), ...(sinal ? { signal: sinal } : {}) }, MENSAGENS_FICHA),
  };
}
export type ClientePca = ReturnType<typeof criarClientePca>;
/** A parte do cliente da v1 (consulta e coleta): quem não grava vínculo nem ficha depende só dela. */
export type ClientePcaV1 = Pick<ClientePca, 'saude' | 'porSei' | 'porItem' | 'coleta'>;
