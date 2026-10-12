/**
 * Duas telas da janela da peça para os dados da contratação (desenho: "Junção por campo e conflito" e "Sobe
 * depois"): a escolha campo a campo quando os dois lados mudaram o mesmo campo, e a oferta de levar os dados deste
 * navegador para o PCA. Só DOM; quem chama decide o que fazer com a escolha. Texto de fora entra como nó de texto.
 */
import { temValor } from '../modelos/analise-cfc';
import type { Conflito } from '../ficha/juntar';

export type Lado = 'meu' | 'deles';
export type Escolhas = Record<string, { lado: Lado; valor: unknown }>;

type Filhos = (Node | string | null | undefined | false)[];
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filhos): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}

/** O valor para ler na tela: a tabela em linhas, o vazio dito. */
export function resumoDoValor(v: unknown): string {
  if (!temValor(v)) return '(vazio)';
  if (Array.isArray(v)) {
    const linhas = v.map(l => (l && typeof l === 'object' ? Object.values(l as Record<string, unknown>).filter(temValor).map(String).join(' · ') : String(l)));
    return `${v.length} linha${v.length > 1 ? 's' : ''}: ${linhas.join('; ')}`;
  }
  if (typeof v === 'object') return Object.entries(v as Record<string, unknown>).filter(([, x]) => temValor(x)).map(([k, x]) => `${k}: ${String(x)}`).join('; ');
  return String(v);
}
/** Acima disto, o começo e um "ver tudo". */
const LONGO = 200;
/** O começo do valor (vai no botão de escolha) e, se for longo, o "ver tudo" (fora do botão: abrir para ler não escolhe). */
function valorNaTela(doc: Document, v: unknown): { curto: HTMLElement; tudo: HTMLElement | null } {
  const t = resumoDoValor(v);
  if (t.length <= LONGO) return { curto: el(doc, 'span', { class: 'gelic-cf-valor' }, t), tudo: null };
  return { curto: el(doc, 'span', { class: 'gelic-cf-valor' }, `${t.slice(0, LONGO)}…`),
    tudo: el(doc, 'details', { class: 'gelic-cf-tudo' }, el(doc, 'summary', {}, 'ver tudo'), el(doc, 'p', {}, t)) };
}

export interface OpcoesConflito {
  /** "fulano salvou em 11/10 14:32" (ou "outra janela deste navegador salvou"). */
  quem: string;
  conflitos: readonly Conflito[];
  rotulo: (campo: string) => string;
  /** Só com uma escolha por campo. */
  aoUsar: (escolhas: Escolhas) => void;
}

export function montarConflito(doc: Document, o: OpcoesConflito): HTMLElement {
  const escolhas: Escolhas = {};
  const falta = () => o.conflitos.some(c => !escolhas[c.campo]);
  const usar = el(doc, 'button', { type: 'button', class: 'gelic-botao gelic-primario', 'data-gelic-acao': 'conflito-usar', disabled: '' }, 'Usar estes e salvar') as HTMLButtonElement;
  const blocos = new Map<string, HTMLElement>();
  const escolher = (c: Conflito, lado: Lado) => {
    escolhas[c.campo] = { lado, valor: lado === 'meu' ? c.meu : c.deles };
    for (const b of blocos.get(c.campo)!.querySelectorAll('[data-gelic-escolha]')) b.setAttribute('aria-pressed', String(b.getAttribute('data-gelic-escolha') === lado));
    usar.toggleAttribute('disabled', falta());
  };
  for (const c of o.conflitos) {
    const opcoes = (['meu', 'deles'] as const).flatMap(lado => {
      const v = valorNaTela(doc, lado === 'meu' ? c.meu : c.deles);
      const b = el(doc, 'button', { type: 'button', class: 'gelic-cf-opcao', 'data-gelic-escolha': lado, 'aria-pressed': 'false' },
        el(doc, 'strong', {}, lado === 'meu' ? 'O seu: ' : 'O salvo: '), v.curto);
      b.addEventListener('click', () => escolher(c, lado));
      return v.tudo ? [b, v.tudo] : [b];
    });
    blocos.set(c.campo, el(doc, 'fieldset', { class: 'gelic-cf-campo', 'data-gelic-conflito-campo': c.campo }, el(doc, 'legend', {}, o.rotulo(c.campo)), ...opcoes));
  }
  const todos = (lado: Lado, rotulo: string, acao: string) => {
    const b = el(doc, 'button', { type: 'button', class: 'gelic-botao', 'data-gelic-acao': acao }, rotulo);
    b.addEventListener('click', () => { for (const c of o.conflitos) escolher(c, lado); });
    return b;
  };
  // o navegador não dispara clique em botão desabilitado; a conferência aqui vale para quem dispara (testes)
  usar.addEventListener('click', () => { if (!falta()) o.aoUsar({ ...escolhas }); });
  return el(doc, 'section', { class: 'gelic-conflito', 'data-gelic-conflito': '', role: 'group', 'aria-label': 'Escolha dos dados da contratação' },
    el(doc, 'h2', {}, 'Os dados da contratação mudaram desde que você começou'),
    el(doc, 'p', {}, `${o.quem}. Escolha, em cada campo, o valor que fica.`),
    el(doc, 'div', { class: 'gelic-botoes' }, todos('meu', 'Ficar com todos os meus', 'conflito-meus'), todos('deles', 'Ficar com todos os salvos', 'conflito-salvos')),
    ...blocos.values(),
    el(doc, 'div', { class: 'gelic-botoes' }, usar));
}

export interface OpcoesSubir {
  /** Quando os dados ficaram guardados aqui (ms). */
  desde: number;
  campos: number;
  /** "37/2026". */
  item: string;
  aoLevar: () => void;
  aoDepois: () => void;
  aoDescartar: () => void;
}
const diaMes = (ms: number) => { const d = new Date(ms); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; };

export function montarSubir(doc: Document, o: OpcoesSubir): HTMLElement {
  const botao = (acao: string, rotulo: string, primario = false) =>
    el(doc, 'button', { type: 'button', class: primario ? 'gelic-botao gelic-primario' : 'gelic-botao', 'data-gelic-acao': acao }, rotulo) as HTMLButtonElement;
  const levar = botao('subir-levar', 'Levar para o PCA', true);
  const depois = botao('subir-depois', 'Agora não');
  const descartar = botao('subir-descartar', 'Descartar os do navegador');
  levar.addEventListener('click', () => o.aoLevar());
  depois.addEventListener('click', () => o.aoDepois());
  // apagar dados da pessoa pede um segundo clique
  let confirmando = false;
  descartar.addEventListener('click', () => {
    if (confirmando) { o.aoDescartar(); return; }
    confirmando = true;
    descartar.textContent = 'Confirmar: apagar os dados deste navegador';
  });
  return el(doc, 'section', { class: 'gelic-subir', 'data-gelic-subir': '' },
    el(doc, 'p', {}, `Este processo tem dados da contratação guardados neste navegador (desde ${diaMes(o.desde)}, ${o.campos} campo${o.campos > 1 ? 's' : ''}). Levar para o item ${o.item} no PCA?`),
    el(doc, 'div', { class: 'gelic-botoes' }, levar, depois, descartar));
}
