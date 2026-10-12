/**
 * "Atualizar PCA" no Controle de Processos (SEI CFC Gelic, com permissão de editar o PCA): para os processos marcados
 * na caixa de seleção do próprio SEI (a do envio em lote) ou, sem nenhum marcado, para as linhas visíveis; três de cada vez, abre a árvore e faz o mesmo que o selo faz ao abrir o processo (sincronizarProcesso). Só quando o
 * usuário clica; processo sigiloso não é lido; dá para cancelar. Cada linha ganha uma marca com o resultado.
 */
import type { Arvore } from '../../../sei-nucleo/src/dominio/arvore';
import { aVista, linhas, type Linha } from '../controle/view';
import { linhaDoPca, type EstadoPca } from './contrato';

export const CONCORRENCIA_PCA = 3;
/** Erros que valem para o lote inteiro: as próximas linhas falhariam igual. */
const PARAR: Readonly<Record<string, string>> = {
  SEI_SESSAO_EXPIRADA: 'sessão do SEI expirada',
  nao_autenticado: 'token do PCA inválido',
  limite_requisicoes: 'limite de requisições do PCA: espere um minuto e clique de novo',
  sem_permissao: 'sem permissão de enviar ao PCA',
};
const codigoDoEstado = (e: EstadoPca) =>
  e.tipo === 'erro' ? e.codigo : e.tipo === 'item' && typeof e.envio === 'object' && 'erro' in e.envio ? e.envio.codigo : undefined;

export interface DepsPcaControle {
  abrir: (href: string, sinal: AbortSignal) => Promise<Arvore>;
  sincronizar: (arvore: Arvore, sinal: AbortSignal) => Promise<EstadoPca>;
}

type Resultado = 'atualizado' | 'em_dia' | 'sem_vinculo' | 'erro' | 'sigiloso';
export function resultadoDe(e: EstadoPca): Resultado {
  if (e.tipo === 'sem_vinculo') return 'sem_vinculo';
  if (e.tipo !== 'item') return 'erro';
  const env = e.envio;
  if (!env || env === 'em_dia' || env === 'enviando') return 'em_dia';
  if ('erro' in env) return 'erro';
  return env.alterados.length ? 'atualizado' : 'em_dia';
}
const PLURAIS: Readonly<Record<Resultado, [string, string]>> = {
  atualizado: ['atualizado', 'atualizados'], em_dia: ['em dia', 'em dia'], sem_vinculo: ['sem vínculo', 'sem vínculo'],
  erro: ['com erro', 'com erro'], sigiloso: ['sigiloso (não lido)', 'sigilosos (não lidos)'],
};
export function resumoPca(contagem: Partial<Record<Resultado, number>>): string {
  const total = Object.values(contagem).reduce((a, b) => a + (b ?? 0), 0);
  const partes = (Object.keys(PLURAIS) as Resultado[]).filter(r => contagem[r]).map(r => `${contagem[r]} ${PLURAIS[r][contagem[r] === 1 ? 0 : 1]}`);
  return `PCA: ${total} processo${total === 1 ? '' : 's'}${partes.length ? ` · ${partes.join(' · ')}` : ''}`;
}

function marcar(doc: Document, l: Linha, texto: string, tom: string): void {
  const celula = l.tr.querySelector('.gelic-etapa-linha')?.parentElement ?? l.tr.querySelector('td:nth-child(3)') ?? l.tr.lastElementChild;
  if (!celula) return;
  let m = celula.querySelector<HTMLElement>('.gelic-pca-linha');
  if (!m) {
    m = doc.createElement('span');
    m.className = 'gelic-pca-linha';
    celula.append(m);
  }
  m.setAttribute('data-tom', tom);
  m.title = texto;
  m.textContent = texto.replace(/^PCA: /, 'PCA · ');
}

/** Acrescenta o botão à barra da Gelic. Devolve a função do clique (para os testes). */
/** A caixa de seleção do próprio SEI na linha (só lida, nunca alterada). */
const marcada = (l: Linha) => !!l.tr.querySelector<HTMLInputElement>('input.infraCheckboxInput')?.checked;
/**
 * Os processos que o botão vai atualizar: os marcados no SEI ou, sem nenhum marcado, os visíveis (fora do filtro de etapa da
 * Gelic e da pesquisa rápida do SEI Pro).
 */
export function escolhidas(doc: Document): { linhas: Linha[]; marcadas: boolean } {
  const visiveis = linhas(doc).filter(aVista);
  const unicas = (ls: Linha[]) => [...new Map(ls.map(l => [l.processo.idProcedimento, l])).values()];
  const m = visiveis.filter(marcada);
  return m.length ? { linhas: unicas(m), marcadas: true } : { linhas: unicas(visiveis), marcadas: false };
}

export function ligarPcaNoControle(doc: Document, barra: HTMLElement, deps: DepsPcaControle): () => Promise<void> {
  const botao = doc.createElement('button');
  botao.type = 'button';
  botao.className = 'gelic-ctl-pca';
  // O rótulo acompanha a seleção do SEI ("marcar todos" do SEI muda as caixas sem evento: confere depois de cada clique).
  const rotular = () => {
    const e = escolhidas(doc);
    botao.textContent = e.marcadas ? `Atualizar PCA (${e.linhas.length} marcado${e.linhas.length === 1 ? '' : 's'})` : 'Atualizar PCA';
    botao.title = `Informa ao PCA o histórico e os instrumentos contratuais ${e.marcadas ? 'dos processos marcados' : 'dos processos visíveis (marque no SEI para escolher)'} que mudaram, 3 de cada vez. Sigiloso não é lido.`;
  };
  rotular();
  doc.addEventListener('click', () => setTimeout(rotular, 0), true);
  doc.addEventListener('change', rotular, true);
  const cancelar = doc.createElement('button');
  cancelar.type = 'button';
  cancelar.className = 'gelic-ctl-cancelar';
  cancelar.textContent = 'Cancelar';
  cancelar.hidden = true;
  const estado = doc.createElement('span');
  estado.className = 'gelic-ctl-progresso gelic-ctl-pca-estado';
  estado.setAttribute('aria-live', 'polite');
  barra.querySelector('.gelic-ctl-chips')?.before(botao, cancelar, estado) ?? barra.append(botao, cancelar, estado);

  let abortar: AbortController | null = null;
  cancelar.addEventListener('click', () => abortar?.abort());

  async function atualizar(): Promise<void> {
    if (abortar) return;
    const fila = escolhidas(doc).linhas;
    if (!fila.length) return;
    abortar = new AbortController();
    const sinal = abortar.signal;
    const total = fila.length;
    const contagem: Partial<Record<Resultado, number>> = {};
    let feitos = 0;
    let parou: string | null = null;
    botao.hidden = true;
    cancelar.hidden = false;
    const mostrar = () => { estado.textContent = `PCA: ${feitos} de ${total}…`; };
    mostrar();
    const contar = (r: Resultado) => { contagem[r] = (contagem[r] ?? 0) + 1; };
    const trabalhar = async () => {
      for (let l = fila.shift(); l && !sinal.aborted; l = fila.shift()) {
        try {
          if (l.processo.sigiloso) { contar('sigiloso'); continue; }
          marcar(doc, l, 'PCA: consultando…', 'espera');
          const arvore = await deps.abrir(l.href, sinal);
          if (arvore.nivel === 'sigiloso') { contar('sigiloso'); marcar(doc, l, 'PCA: sigiloso, não lido', 'fora'); continue; }
          const e = await deps.sincronizar(arvore, sinal);
          const codigo = codigoDoEstado(e);
          if (codigo === 'cancelado' && sinal.aborted) break;
          if (codigo && PARAR[codigo]) { parou = PARAR[codigo]; abortar?.abort(); }
          const r = resultadoDe(e);
          contar(r);
          marcar(doc, l, linhaDoPca(e) ?? '', r === 'erro' ? 'erro' : r === 'atualizado' ? 'acao' : 'fim');
        } catch (err) {
          if (sinal.aborted) break;
          const codigo = (err as { codigo?: string }).codigo;
          if (codigo && PARAR[codigo]) { parou = PARAR[codigo]; abortar?.abort(); }
          contar('erro');
          marcar(doc, l, `PCA: ${((err as Error).message ?? 'erro').slice(0, 80)}`, 'erro');
        } finally {
          feitos += 1;
          mostrar();
        }
      }
    };
    await Promise.all(Array.from({ length: CONCORRENCIA_PCA }, trabalhar));
    estado.textContent = `${resumoPca(contagem)}${parou ? ` · parado: ${parou}` : sinal.aborted ? ' · cancelado' : ''}`;
    botao.hidden = false;
    cancelar.hidden = true;
    abortar = null;
    rotular();
  }
  botao.addEventListener('click', () => void atualizar());
  return atualizar;
}
