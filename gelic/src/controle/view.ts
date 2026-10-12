/**
 * Desenho no Controle de Processos: a etiqueta da etapa em cada linha e a barra da Gelic acima
 * das tabelas (botão "Calcular etapas", progresso e o resumo por etapa, que filtra a lista).
 *
 * O estado mora no DOM (atributos `data-gelic-*` na linha), então linhas que o SEI Pro clona ao
 * agrupar levam junto o que precisam. Só nós de texto: nome de etapa vem do código, mas a regra
 * é a mesma do selo.
 */
import { lerLinhaCaixa, type ProcessoNaCaixa } from '../../../sei-nucleo/src/dominio/caixa';
import { desatualizada, type EtapaGuardada, type MapaEtapas } from './cache';

export const TABELAS = '#tblProcessosRecebidos, #tblProcessosGerados';
const PROCESSO = 'a[href*="acao=procedimento_trabalhar"]';
export const ID_BARRA = 'gelic-controle';

export interface Linha { tr: HTMLTableRowElement; processo: ProcessoNaCaixa; href: string }

/** Linhas de processo visíveis nas duas tabelas (as que o SEI Pro clonou ao agrupar também). */
export function linhas(doc: Document): Linha[] {
  const out: Linha[] = [];
  for (const tabela of doc.querySelectorAll(TABELAS)) {
    const grupo = tabela.id === 'tblProcessosGerados' ? 'gerados' : 'recebidos';
    for (const tr of tabela.querySelectorAll<HTMLTableRowElement>('tr[id^="P"]')) {
      const processo = lerLinhaCaixa(tr, grupo);
      const href = tr.querySelector(PROCESSO)?.getAttribute('href');
      if (processo && href) out.push({ tr, processo, href });
    }
  }
  return out;
}

/**
 * Classe da pesquisa rápida do SEI Pro (2.9; `OCULTA` em `pesquisa-rapida/src/controle.ts`) na linha que não casa com o
 * texto digitado. Os botões da Gelic agem só sobre o que a pessoa vê.
 */
export const OCULTA_PESQUISA = 'spro-pesquisa-oculta';
/** A pesquisa rápida do SEI Pro escondeu a linha (o filtro de etapa da Gelic é outro: `data-gelic-oculto`). */
export const foraDaPesquisa = (l: Linha) => l.tr.classList.contains(OCULTA_PESQUISA);
/** A linha está à vista: nem o filtro de etapa da Gelic (`data-gelic-oculto`) nem a pesquisa rápida a esconderam. */
export const aVista = (l: Linha) => !l.tr.hasAttribute('data-gelic-oculto') && !foraDaPesquisa(l);

function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: (Node | string | null)[]): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f !== null) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}

/** Estado de uma linha: etapa guardada (atual ou desatualizada), calculando, erro, sigiloso ou nada. */
export type EstadoLinha =
  | { tipo: 'etapa'; etapa: EtapaGuardada; velha: boolean }
  | { tipo: 'calculando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'nenhum' };

export function estadoDe(l: Linha, mapa: MapaEtapas, agora = Date.now()): EstadoLinha {
  if (l.processo.sigiloso) return { tipo: 'etapa', velha: false, etapa: { etapa: 'sigiloso', nome: 'Sigiloso: etapa não calculada', tom: 'fora', descricao: 'A Gelic não lê processo sigiloso.', t: agora } };
  const e = mapa[l.processo.idProcedimento];
  return e ? { tipo: 'etapa', etapa: e, velha: desatualizada(e, l.processo.documentoNovo, agora) } : { tipo: 'nenhum' };
}

/** Chave do filtro: a etapa (id), 'fora', 'sigiloso' ou 'sem' (ainda não calculada). */
export const chaveDoEstado = (s: EstadoLinha) => (s.tipo === 'etapa' ? s.etapa.etapa ?? 'fora' : 'sem');

/** Põe (ou atualiza) a etiqueta na célula do processo. Idempotente: compara pelo conteúdo. */
export function desenharLinha(doc: Document, l: Linha, s: EstadoLinha): void {
  const celula = l.tr.querySelector(PROCESSO)?.closest('td');
  if (!celula) return;
  l.tr.setAttribute('data-gelic-etapa', chaveDoEstado(s));
  let pilula = celula.querySelector<HTMLElement>('.gelic-etapa-linha');
  if (s.tipo === 'nenhum') {
    pilula?.remove();
    return;
  }
  const texto = s.tipo === 'etapa' ? s.etapa.nome : s.tipo === 'calculando' ? 'Calculando a etapa…' : `Etapa: ${s.mensagem}`;
  const tom = s.tipo === 'etapa' ? s.etapa.tom : s.tipo === 'calculando' ? 'espera' : 'fora';
  const dica = s.tipo === 'etapa'
    ? `${s.etapa.descricao}${s.velha ? ' (desatualizada: entrou documento ou faz mais de 7 dias; recalcule)' : ''}`
    : texto;
  const chave = JSON.stringify([texto, tom, s.tipo === 'etapa' && s.velha]);
  if (pilula?.getAttribute('data-gelic-chave') === chave) return;
  if (!pilula) {
    pilula = el(doc, 'span', { class: 'gelic-etapa-linha' });
    celula.append(pilula);
  }
  pilula.setAttribute('data-gelic-chave', chave);
  pilula.setAttribute('data-tom', tom);
  pilula.toggleAttribute('data-velha', s.tipo === 'etapa' && s.velha);
  pilula.title = dica;
  pilula.replaceChildren(doc.createTextNode(texto));
}

export interface Barra {
  raiz: HTMLElement;
  /** Atualiza contagens, botão e progresso. */
  atualizar(info: { resumo: { chave: string; nome: string; tom: string; n: number }[]; pendentes: number; progresso: { feitos: number; total: number } | null; filtro: string | null }): void;
}

/** Barra acima das tabelas: [Gelic] [Calcular etapas (n)] [progresso] [chips por etapa]. */
export function criarBarra(doc: Document, acoes: { calcular(): void; cancelar(): void; filtrar(chave: string | null): void }): Barra {
  const existente = doc.getElementById(ID_BARRA);
  existente?.remove();
  const botao = el(doc, 'button', { type: 'button', class: 'gelic-ctl-calcular' }, 'Calcular etapas');
  const cancelar = el(doc, 'button', { type: 'button', class: 'gelic-ctl-cancelar', hidden: '' }, 'Cancelar');
  const progresso = el(doc, 'span', { class: 'gelic-ctl-progresso', 'aria-live': 'polite' });
  const chips = el(doc, 'div', { class: 'gelic-ctl-chips', role: 'group', 'aria-label': 'Filtrar por etapa da Gelic' });
  const raiz = el(doc, 'section', { id: ID_BARRA, 'aria-label': 'Etapas da Gelic' },
    el(doc, 'span', { class: 'gelic-ctl-marca' }, 'Gelic'), botao, cancelar, progresso, chips);
  botao.addEventListener('click', () => acoes.calcular());
  cancelar.addEventListener('click', () => acoes.cancelar());
  const alvo = doc.getElementById('divRecebidos')?.parentElement ?? doc.querySelector(TABELAS)?.closest('div');
  if (alvo?.parentElement) alvo.parentElement.insertBefore(raiz, alvo);
  else doc.body.prepend(raiz);

  let gravado = '';
  return {
    raiz,
    atualizar(info) {
      // Só grava quando algo mudou: cada gravação acorda os observadores dos outros módulos (a pesquisa rápida do SEI
      // Pro varre a tabela inteira a cada mudança na página).
      const chave = JSON.stringify(info);
      if (chave === gravado) return;
      gravado = chave;
      const { resumo, pendentes, progresso: p, filtro } = info;
      botao.textContent = pendentes ? `Calcular etapas (${pendentes})` : 'Recalcular etapas';
      botao.title = pendentes
        ? `Lê a árvore dos ${pendentes} processos visíveis sem etapa ou com etapa desatualizada (3 de cada vez). Sigiloso não é lido.`
        : 'Todas as etapas visíveis estão em dia; clique para recalcular as visíveis.';
      botao.hidden = !!p;
      cancelar.hidden = !p;
      progresso.textContent = p ? `Calculando ${p.feitos} de ${p.total}…` : '';
      const todos = resumo.reduce((n, r) => n + r.n, 0);
      const chip = (chave: string | null, nome: string, n: number, tom: string) => {
        const b = el(doc, 'button', { type: 'button', class: 'gelic-ctl-chip', 'data-tom': tom, 'aria-pressed': String(filtro === chave) }, `${nome} (${n})`);
        b.addEventListener('click', () => acoes.filtrar(filtro === chave ? null : chave));
        return b;
      };
      chips.replaceChildren(
        ...(resumo.length ? [chip(null, 'Todos', todos, 'todos')] : []),
        ...resumo.map(r => chip(r.chave, r.nome, r.n, r.tom)),
      );
    },
  };
}

/** Esconde as linhas fora do filtro (por atributo: sobrevive à clonagem e não briga com o SEI). */
export function aplicarFiltro(ls: Linha[], filtro: string | null): void {
  for (const l of ls) l.tr.toggleAttribute('data-gelic-oculto', filtro !== null && l.tr.getAttribute('data-gelic-etapa') !== filtro);
}
