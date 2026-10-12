/**
 * A janela do formulário das peças (js/gelic/peca.html). Só DOM: o motor, a ponte, a IA e o storage chegam por
 * `DepsJanela` (main.ts monta as reais; os testes, as falsas). Texto de fora entra como nó de texto, nunca HTML; o
 * documento da prévia vai num iframe com `sandbox` vazio.
 *
 * Ordem dos valores na abertura (o de depois vence): dados da UO guardados ("da última vez") → análise sem IA (tela,
 * árvore, PCA, regras) → dados da contratação (do PCA ou deste navegador: src/ficha/) → do rascunho, o digitado e o
 * redigido pela IA. O que a pessoa digita vence tudo, inclusive a IA, que só preenche o vazio.
 */
import { temValor, type EntradaCfc, type EstadoCfc, type EvidenciaCfc } from '../modelos/analise-cfc';
import { modeloCfc } from '../modelos/cfc';
import { camposDoFormulario, dadosDoFormulario, type Campo } from './formulario';
import { apagarRascunho, guardarRascunho, guardarUo, lerRascunho, lerUo, type Area } from './guardados';
import { CAMPOS_FORA_DA_FICHA, daContratacao } from '../ficha/formato';
import { abrirDados, quemSalvou, salvarDados, salvoPor, type DepsDados, type EstadoDados, type ResultadoSalvar } from '../ficha/fonte';
import { juntar, type Conflito } from '../ficha/juntar';
import { apagarLocal } from '../ficha/local';
import { montarConflito, montarSubir, type Escolhas } from './conflito';

export interface AnaliseJanela {
  ok?: boolean;
  erro?: string;
  estado?: EstadoCfc;
  entradas?: EntradaCfc[];
  faltando?: { variavel: string }[];
  avisos?: string[];
}
export interface DepsJanela {
  protocolo: string;
  modelo: string;
  nomePeca: string;
  analisar(o: { ia: boolean; dados: Record<string, unknown> }): Promise<AnaliseJanela>;
  previa(dados: Record<string, unknown>): Promise<{ html: string; faltando: string[] }>;
  tipos(): Promise<string[]>;
  gravar(o: { dados: Record<string, unknown>; tipo: string; nome_arvore?: string; rascunho: boolean }): Promise<{ ok: boolean; numero?: string; erro?: string }>;
  temIa: boolean;
  configurarIa(): void;
  /** Avisa quando a chave de IA passa a existir ou deixa de existir (configurada em outra aba). */
  aoMudarIa?(f: (temIa: boolean) => void): void;
  area: Area | null;
  /** Gasto da IA nesta janela (dólares), quando houver. */
  gasto?(): number;
  /** Os dados da contratação (src/ficha/); sem eles, a janela fica como antes (só o rascunho deste navegador). */
  dados?: DepsDados;
}

type Filhos = (Node | string | null | undefined | false)[];
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filhos): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}
const texto = (x: unknown) => (x === undefined || x === null ? '' : String(x));
/** O valor de um select: o `value` do navegador ou, sem ele, a opção selecionada. */
function valorDoSelect(s: HTMLSelectElement): string {
  if (typeof s.value === 'string') return s.value;
  const o = s.querySelector('option[selected]') ?? s.querySelector('option');
  return o?.getAttribute('value') ?? '';
}
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
/** Do rascunho volta só o trabalho desta janela: o digitado e o redigido pela IA (o resto é lido de novo na abertura). */
const DESTA_JANELA: ReadonlySet<string> = new Set(['usuario', 'agente']);
interface Rascunho {
  valores: Record<string, unknown>;
  evidencias: Record<string, Partial<EvidenciaCfc>>;
  /** No modo PCA: a versão dos dados e o valor de cada campo nela quando a pessoa começou. */
  ficha: { versao: number; base: Record<string, unknown> } | null;
}
/** O rascunho guardado: {valores, evidencias, ficha?}; no formato antigo, só os valores (contam como digitados). */
function lerDoRascunho(r: Record<string, unknown> | null): Rascunho | null {
  if (!r) return null;
  const comOrigem = typeof r.valores === 'object' && r.valores !== null;
  const f = comOrigem ? (r.ficha as { versao?: unknown; base?: unknown } | undefined) : undefined;
  const base = f?.base;
  return {
    valores: (comOrigem ? r.valores : r) as Record<string, unknown>,
    evidencias: (comOrigem ? r.evidencias ?? {} : {}) as Record<string, Partial<EvidenciaCfc>>,
    ficha: f && typeof f.versao === 'number' && base && typeof base === 'object' && !Array.isArray(base) ? { versao: f.versao, base: base as Record<string, unknown> } : null,
  };
}
const inteiroDe = (x: unknown) => (typeof x === 'number' || (typeof x === 'string' && /^\d+$/.test(x.trim())) ? Number(x) : null);
/** O item do PCA informado no formulário (DFD: item_pca e ano), para o processo ligado a mais de um item. */
function itemInformado(v: Record<string, unknown>): { item_pca: number; exercicio: number } | null {
  const item_pca = inteiroDe(v.item_pca), exercicio = inteiroDe(v.ano);
  return item_pca && exercicio ? { item_pca, exercicio } : null;
}

export async function montarJanela(doc: Document, deps: DepsJanela): Promise<void> {
  const raiz = doc.getElementById('gelic-peca')!;
  const valores: Record<string, unknown> = {};
  const evidencias: Record<string, Partial<EvidenciaCfc>> = {};
  let entradas: EntradaCfc[] = [];
  let faltando: string[] = [];
  let avisos: string[] = [];
  let campos: Campo[] = [];
  /** Os dados da contratação (sem deps.dados, null e a janela fica como antes). */
  let estadoDados: EstadoDados | null = null;
  /** O valor de cada campo nos dados quando a pessoa começou: a base da junção. */
  let base: Record<string, unknown> = {};
  /** A versão do PCA dessa base (vai no rascunho: a abertura percebe quando os dados mudaram). */
  let versaoBase = 0;
  let conflitosDaAbertura: Conflito[] = [];

  const aplicar = (v: Record<string, unknown>, ev: Record<string, Partial<EvidenciaCfc>>, so: (k: string) => boolean = () => true) => {
    for (const [k, x] of Object.entries(v)) {
      if (!temValor(x) || !so(k)) continue;
      valores[k] = x;
      evidencias[k] = ev[k] ?? evidencias[k] ?? { fonte: 'usuario' };
    }
  };
  const usarAnalise = (r: AnaliseJanela, so?: (k: string) => boolean) => {
    if (r.estado) aplicar(r.estado.valores, r.estado.evidencias, so);
    if (r.entradas) entradas = r.entradas;
    faltando = (r.faltando ?? []).map(f => f.variavel);
    avisos = r.avisos ?? [];
  };
  /** A camada dos dados: os do PCA ("salvo por…"); fora do modo PCA, por cima, os deste navegador. */
  const usarDados = (e: EstadoDados) => {
    if (e.pca) {
      const r = daContratacao(e.pca.respostas);
      const nota = salvoPor(e.pca.por, e.pca.em);
      aplicar(r, Object.fromEntries(Object.keys(r).map(k => [k, { fonte: 'ficha', nota }])));
    }
    if (e.modo !== 'pca' && e.local) {
      const r = daContratacao(e.local.respostas);
      aplicar(r, Object.fromEntries(Object.keys(r).map(k => [k, { fonte: 'ficha', nota: 'salvo neste navegador' }])));
    }
    base = { ...((e.modo === 'pca' ? e.pca?.respostas : e.local?.respostas) ?? {}) };
    versaoBase = e.modo === 'pca' ? e.pca?.versao ?? 0 : 0;
  };

  // 1. abertura: UO → análise sem IA → dados da contratação → rascunho
  const uo = await lerUo(deps.area);
  aplicar(uo, Object.fromEntries(Object.keys(uo).map(k => [k, { fonte: 'ultima_vez' }])));
  let erroAbertura = '';
  try {
    const r = await deps.analisar({ ia: false, dados: {} });
    if (r.erro) erroAbertura = r.erro;
    usarAnalise(r);
  } catch (e) {
    erroAbertura = mensagem(e);
  }
  const rascunho = lerDoRascunho(await lerRascunho(deps.area, deps.protocolo, deps.modelo));
  if (deps.dados) {
    estadoDados = await abrirDados(deps.dados, itemInformado({ ...valores, ...(rascunho?.valores ?? {}) }));
    usarDados(estadoDados);
  }
  if (rascunho) {
    const ev = rascunho.evidencias;
    const meus = Object.fromEntries(Object.entries(rascunho.valores).filter(([k]) => DESTA_JANELA.has(ev[k]?.fonte ?? 'usuario')));
    const comoEstava = (k: string) => ev[k] ?? { fonte: 'usuario' };
    const pca = estadoDados?.modo === 'pca' ? estadoDados.pca : null;
    if (pca && rascunho.ficha && rascunho.ficha.versao !== pca.versao) {
      // os dados mudaram desde o rascunho: o que só eu mudei fica, o que só eles mudaram já entrou, o mesmo campo dos dois espera a escolha
      const j = juntar(rascunho.ficha.base, meus, pca.respostas, Object.keys(meus));
      const ficam = Object.fromEntries(Object.entries(meus).filter(([k]) => !j.trazidos.includes(k) && !j.conflitos.some(c => c.campo === k)));
      aplicar(ficam, Object.fromEntries(Object.keys(ficam).map(k => [k, comoEstava(k)])));
      conflitosDaAbertura = j.conflitos;
    } else {
      aplicar(meus, Object.fromEntries(Object.keys(meus).map(k => [k, comoEstava(k)])));
    }
  }

  const status = el(doc, 'p', { class: 'gelic-status', role: 'status', 'aria-live': 'polite' });
  const avisar = (t: string, tom: 'ok' | 'erro' | '' = '') => {
    status.textContent = t;
    status.className = `gelic-status${tom ? ` gelic-status-${tom}` : ''}`;
  };
  const dados = () => dadosDoFormulario(campos, valores);
  /** Campos do formulário (perguntas e entradas do modelo): os que não podem voltar da análise guardada. */
  const doFormulario = () => new Set([...modeloCfc(deps.modelo).perguntas.map(p => p.id), ...entradas.map(e => e.nome)]);
  /**
   * O que vai ao motor (prévia, IA, gravação): o visível com valor e, VAZIO explícito, o campo apagado ou escondido —
   * senão o motor usaria o valor da análise guardada (cfc.ts, montar) e o documento teria o que a tela não mostra.
   */
  const dadosParaMotor = () => {
    const d: Record<string, unknown> = dados();
    for (const n of doFormulario()) if (!(n in d)) d[n] = '';
    return d;
  };
  const guardar = () => {
    // com a escolha da abertura pendente, o rascunho fica como estava (com o meu e a base dele)
    if (conflitosDaAbertura.length) return;
    const v = dados();
    const ev = Object.fromEntries(Object.keys(v).filter(k => evidencias[k]).map(k => [k, evidencias[k]]));
    // no modo PCA o rascunho leva a versão e a base: se alguém salvar enquanto ele espera, a abertura percebe
    const ficha = estadoDados?.modo === 'pca' ? { versao: versaoBase, base: Object.fromEntries(Object.keys(v).filter(k => k in base).map(k => [k, base[k]])) } : null;
    void guardarRascunho(deps.area, deps.protocolo, deps.modelo, { valores: v, evidencias: ev, ...(ficha ? { ficha } : {}) });
  };
  const mudou = (nome: string, valor: unknown, redesenhar = false) => {
    valores[nome] = valor;
    evidencias[nome] = { fonte: 'usuario' };
    faltando = faltando.filter(f => f !== nome || !temValor(valor));
    if (redesenhar) desenhar();
    guardar();
  };

  // ---------------------------------------------------------------- um campo
  function controle(c: Campo): HTMLElement {
    const id = `gelic-c-${c.nome}`;
    if (c.tipo === 'texto_longo') {
      const t = el(doc, 'textarea', { id, rows: '5' }) as HTMLTextAreaElement;
      t.value = texto(c.valor);
      t.addEventListener('input', () => mudou(c.nome, t.value));
      return t;
    }
    if (c.tipo === 'escolha') {
      const s = el(doc, 'select', { id }) as HTMLSelectElement;
      s.append(el(doc, 'option', { value: '' }, '—'));
      for (const o of c.opcoes ?? []) {
        const op = el(doc, 'option', { value: o }, o);
        if (texto(c.valor) === o) op.setAttribute('selected', '');
        s.append(op);
      }
      s.addEventListener('change', () => mudou(c.nome, valorDoSelect(s), true));
      return s;
    }
    if (c.tipo === 'tabela_itens' || c.tipo === 'lista_pessoas') return tabela(c);
    if (c.tipo === 'somente_leitura') return el(doc, 'output', { id }, texto(c.valor));
    const i = el(doc, 'input', { id, type: c.tipo === 'data' ? 'date' : 'text' }) as HTMLInputElement;
    i.value = c.tipo === 'data' ? paraIso(texto(c.valor)) : texto(c.valor);
    i.addEventListener('input', () => mudou(c.nome, c.tipo === 'data' ? deIso(i.value) : i.value));
    return i;
  }

  function tabela(c: Campo): HTMLElement {
    const linhas = (Array.isArray(c.valor) ? c.valor : []).map(l => ({ ...(l as Record<string, unknown>) }));
    const colunas = c.colunas.length ? c.colunas : ['descricao'];
    const caixa = el(doc, 'div', { class: 'gelic-tabela' });
    const salvar = () => mudou(c.nome, linhas.filter(l => colunas.some(k => temValor(l[k]))));
    const montar = () => {
      caixa.replaceChildren();
      const t = el(doc, 'table', {}, el(doc, 'thead', {}, el(doc, 'tr', {}, ...colunas.map(k => el(doc, 'th', {}, k.replace(/_/g, ' '))), el(doc, 'th', {}, ''))));
      const corpo = el(doc, 'tbody');
      linhas.forEach((l, n) => {
        const tr = el(doc, 'tr');
        for (const k of colunas) {
          const i = el(doc, 'input', { type: 'text', 'aria-label': `${k} da linha ${n + 1}` }) as HTMLInputElement;
          i.value = texto(l[k]);
          i.addEventListener('input', () => { l[k] = i.value; salvar(); });
          tr.append(el(doc, 'td', {}, i));
        }
        const tirar = el(doc, 'button', { type: 'button', class: 'gelic-mini' }, 'Remover');
        tirar.addEventListener('click', () => { linhas.splice(n, 1); salvar(); montar(); });
        tr.append(el(doc, 'td', {}, tirar));
        corpo.append(tr);
      });
      t.append(corpo);
      const mais = el(doc, 'button', { type: 'button', class: 'gelic-mini' }, 'Acrescentar linha');
      mais.addEventListener('click', () => { linhas.push({}); montar(); });
      caixa.append(t, mais);
    };
    montar();
    return caixa;
  }

  function blocoDoCampo(c: Campo): HTMLElement {
    const falta = c.falta && !temValor(valores[c.nome]);
    const origem = c.origem
      ? el(doc, 'span', { class: `gelic-origem${c.origem.ia ? ' gelic-origem-ia' : ''}` }, c.origem.rotulo, c.origem.sei ? ` · SEI ${c.origem.sei}` : '')
      : null;
    return el(doc, 'div', { class: `gelic-campo${falta ? ' gelic-falta' : ''}`, 'data-gelic-campo': c.nome },
      el(doc, 'label', { for: `gelic-c-${c.nome}` }, c.rotulo, c.obrigatoria ? el(doc, 'span', { class: 'gelic-obrig', title: 'obrigatório' }, ' *') : null),
      origem,
      controle(c),
      c.nota ? el(doc, 'small', { class: 'gelic-nota' }, c.nota) : null);
  }

  // ---------------------------------------------------------------- a tela
  const area = el(doc, 'div', { class: 'gelic-campos' });
  const faixa = el(doc, 'p', { class: 'gelic-faixa' });
  const previa = el(doc, 'section', { class: 'gelic-previa-caixa', hidden: '' });
  const gravar = el(doc, 'section', { class: 'gelic-gravar', hidden: '' });

  function desenhar() {
    campos = camposDoFormulario(deps.modelo, { valores, evidencias: evidencias as Record<string, EvidenciaCfc> }, entradas, faltando);
    area.replaceChildren(...campos.map(blocoDoCampo));
    const n = campos.filter(c => c.falta && !temValor(valores[c.nome])).length;
    faixa.textContent = n ? `${n} campo${n > 1 ? 's' : ''} falta${n > 1 ? 'm' : ''}: o documento sai com ⟦campo⟧ onde faltar.` : 'Nenhum campo obrigatório faltando.';
    faixa.className = `gelic-faixa${n ? ' gelic-faixa-falta' : ''}`;
  }

  const botao = (acao: string, rotulo: string, primario = false) => el(doc, 'button', { type: 'button', 'data-gelic-acao': acao, class: primario ? 'gelic-botao gelic-primario' : 'gelic-botao' }, rotulo) as HTMLButtonElement;
  let temIa = deps.temIa;
  const bIa = botao('ia', temIa ? 'Preencher com IA o que falta' : 'Configurar a IA');
  deps.aoMudarIa?.(tem => { temIa = tem; bIa.textContent = tem ? 'Preencher com IA o que falta' : 'Configurar a IA'; });
  const bDescartar = botao('descartar', 'Descartar rascunho');
  bDescartar.addEventListener('click', () => {
    void apagarRascunho(deps.area, deps.protocolo, deps.modelo).then(() => avisar('Rascunho descartado. Feche e abra de novo para recomeçar do que está nos autos.', 'ok'));
  });
  const bPrevia = botao('previa', 'Prévia');
  const bGravar = botao('gravar', 'Gravar no SEI', true);
  // ---------------------------------------------------------------- dados da contratação
  const barra = el(doc, 'div', { class: 'gelic-dados', hidden: '' });
  const painel = el(doc, 'div', { class: 'gelic-conflito-caixa' });
  const rotuloDe = (k: string) => campos.find(c => c.nome === k)?.rotulo ?? k.replace(/_/g, ' ');
  function desenharBarra(): void {
    const e = estadoDados;
    if (!deps.dados || !e) return;
    barra.hidden = false;
    barra.setAttribute('data-gelic-dados', e.modo);
    const item = e.pca ? `item ${e.pca.item.item_pca}/${e.pca.item.exercicio}` : '';
    const texto = e.modo === 'pca' && e.pca
      ? `Dados da contratação: ${item} no PCA · ${e.pca.versao ? salvoPor(e.pca.por, e.pca.em) : 'ainda sem dados salvos'}`
      : e.modo === 'leitura'
        ? `Dados da contratação: ${item} no PCA, só leitura (${e.motivo}). O que você salvar fica neste navegador.`
        : `Dados da contratação neste navegador (${e.motivo}).`;
    const filhos: HTMLElement[] = [el(doc, 'p', {}, texto)];
    if (e.itens.length) {
      const sel = el(doc, 'select', { 'data-gelic-dados-item': '' }, ...e.itens.map(i => el(doc, 'option', { value: `${i.item_pca}/${i.exercicio}` }, `Item ${i.item_pca}/${i.exercicio}`))) as HTMLSelectElement;
      const usar = botao('dados-item', 'Usar este item');
      usar.addEventListener('click', () => void (async () => {
        const [item_pca, exercicio] = valorDoSelect(sel).split('/').map(Number);
        estadoDados = await abrirDados(deps.dados!, { item_pca, exercicio });
        // o trabalho desta janela (digitado, IA) continua por cima dos dados do item escolhido
        const destaJanela = Object.keys(valores).filter(k => DESTA_JANELA.has(evidencias[k]?.fonte ?? '')).map(k => [k, valores[k], evidencias[k]] as const);
        usarDados(estadoDados);
        for (const [k, v, ev] of destaJanela) { valores[k] = v; evidencias[k] = ev; }
        desenhar();
        desenharBarra();
        desenharSubir();
      })());
      filhos.push(el(doc, 'div', { class: 'gelic-botoes' }, sel, usar));
    }
    barra.replaceChildren(...filhos);
  }
  /** As escolhas na tela: o meu fica como digitado; o salvo, com a origem dos dados. */
  const usarEscolhas = (escolhas: Escolhas, nota: string) => {
    for (const [k, x] of Object.entries(escolhas)) {
      valores[k] = x.valor;
      evidencias[k] = x.lado === 'meu' ? { fonte: 'usuario' } : { fonte: 'ficha', nota };
    }
  };
  function mostrarConflitoDaAbertura(): void {
    const pca = estadoDados?.pca;
    if (!conflitosDaAbertura.length || !pca) return;
    painel.replaceChildren(montarConflito(doc, {
      quem: quemSalvou(pca.por, pca.em), conflitos: conflitosDaAbertura, rotulo: rotuloDe,
      aoUsar: escolhas => {
        usarEscolhas(escolhas, salvoPor(pca.por, pca.em));
        conflitosDaAbertura = [];
        painel.replaceChildren();
        desenhar();
        guardar();
        avisar('Escolhas aplicadas. Salve os dados da contratação quando terminar.', 'ok');
      },
    }));
  }
  /** Os campos desta peça que vão aos dados: os visíveis, menos a identificação da UO e os só de leitura. */
  const camposDaFicha = () => campos.filter(c => c.tipo !== 'somente_leitura' && !CAMPOS_FORA_DA_FICHA.includes(c.nome)).map(c => c.nome);
  /** O meu de cada campo: o da tela; o apagado vale vazio; o que só aparece por padrão (sem valor guardado) fica como estava. */
  const meusDados = () => Object.fromEntries(camposDaFicha().map(k => [k, k in valores ? (temValor(valores[k]) ? valores[k] : '') : base[k]]));
  /** Dados que ficaram neste navegador: entra na mensagem da gravação no SEI. */
  let notaDados = '';
  const subir = el(doc, 'div', { class: 'gelic-subir-caixa' });

  /** O resultado do salvar na tela. true: a gravação no SEI pode seguir. */
  async function tratar(r: ResultadoSalvar, o: { gravando: boolean; subindo: boolean }): Promise<boolean> {
    if (r.tipo === 'erro') { avisar(r.motivo, 'erro'); return false; }
    if (r.tipo === 'conflito') { mostrarConflito(r, o); return false; }
    estadoDados = r.estado;
    base = { ...r.base };
    if (r.tipo === 'pca') versaoBase = r.estado.pca?.versao ?? versaoBase;
    const pca = r.estado.pca;
    const nota = r.tipo === 'pca' && pca ? salvoPor(pca.por, pca.em) : 'salvo neste navegador';
    // o que veio do outro lado entra com a origem dele; na subida, também o que subiu (menos o trabalho desta janela)
    const vindos: Record<string, unknown> = { ...r.trazidos };
    if (o.subindo && pca) for (const [k, v] of Object.entries(daContratacao(pca.respostas))) if (!DESTA_JANELA.has(evidencias[k]?.fonte ?? '')) vindos[k] = v;
    for (const [k, v] of Object.entries(vindos)) { valores[k] = v; evidencias[k] = { fonte: 'ficha', nota }; }
    const visiveis = new Set(camposDaFicha());
    const mudaram = Object.keys(r.trazidos).filter(k => visiveis.has(k));
    desenhar();
    for (const k of mudaram) area.querySelector(`[data-gelic-campo="${k}"]`)?.classList.add('gelic-trazido');
    guardar();
    desenharBarra();
    desenharSubir();
    notaDados = r.tipo === 'navegador' ? `Os dados da contratação ficaram neste navegador: ${r.motivo}. Sobem para o PCA quando der.` : '';
    if (o.gravando && mudaram.length) {
      avisar(`Os dados da contratação mudaram em ${mudaram.map(rotuloDe).join(', ')} (destacados). Confira e clique de novo em "Confirmar e gravar".`, 'erro');
      return false;
    }
    if (!o.gravando) avisar(r.tipo === 'pca' ? (o.subindo ? 'Os dados deste navegador foram para o PCA.' : 'Dados da contratação salvos no PCA.') : notaDados, r.tipo === 'pca' ? 'ok' : '');
    return true;
  }

  function mostrarConflito(r: Extract<ResultadoSalvar, { tipo: 'conflito' }>, o: { gravando: boolean; subindo: boolean }): void {
    const doPca = r.estado.modo === 'pca' ? r.estado.pca : null;
    const nota = doPca ? salvoPor(doPca.por, doPca.em) : 'salvo neste navegador';
    // o que só o outro lado mudou já entra; o mesmo campo dos dois espera a escolha
    for (const k of r.juncao.trazidos) { valores[k] = r.juncao.resultado[k]; evidencias[k] = { fonte: 'ficha', nota }; }
    desenhar();
    painel.replaceChildren(montarConflito(doc, {
      quem: doPca ? quemSalvou(doPca.por, doPca.em) : 'outra janela deste navegador salvou',
      conflitos: r.juncao.conflitos, rotulo: rotuloDe,
      aoUsar: escolhas => void (async () => {
        usarEscolhas(escolhas, nota);
        painel.replaceChildren();
        desenhar();
        guardar();
        // salva de novo a partir do que acabou de ser juntado: onde ficou o meu, o meu passa por cima
        const subindo = o.subindo ? r.estado.local : null;
        const campos2 = subindo ? Object.keys(subindo.respostas) : camposDaFicha();
        // na subida, o meu é o que a junção decidiu (não o valor velho do navegador), com as escolhas por cima
        const meus2 = subindo ? { ...Object.fromEntries(campos2.map(k => [k, r.juncao.resultado[k] ?? ''])), ...Object.fromEntries(Object.entries(escolhas).map(([k, x]) => [k, x.valor])) } : meusDados();
        const ok = await tratar(await salvarDados(deps.dados!, r.estado, r.deles, meus2, campos2, { subindo: o.subindo }), o);
        if (ok && o.gravando) avisar('Dados da contratação salvos. Confira e clique de novo em "Confirmar e gravar".', 'ok');
      })(),
    }));
  }

  /** Salva os dados desta peça; no "Gravar no SEI", antes da peça. true: a gravação pode seguir. */
  async function salvarDadosDaContratacao(gravando: boolean): Promise<boolean> {
    if (!deps.dados || !estadoDados) return true;
    // a escolha da abertura vem antes: salvar agora passaria por cima do que a pessoa digitou
    if (conflitosDaAbertura.length) { avisar('Escolha acima, em cada campo, o valor que fica; depois salve ou grave.', 'erro'); return false; }
    painel.replaceChildren();
    return tratar(await salvarDados(deps.dados, estadoDados, base, meusDados(), camposDaFicha(), { conferir: gravando }), { gravando, subindo: false });
  }

  function desenharSubir(): void {
    const e = estadoDados;
    const pca = e?.pca;
    const local = e?.local;
    if (!deps.dados || !e || e.modo !== 'pca' || !pca || !local || !Object.keys(local.respostas).length) { subir.replaceChildren(); return; }
    subir.replaceChildren(montarSubir(doc, {
      desde: local.desde, campos: Object.keys(local.respostas).length, item: `${pca.item.item_pca}/${pca.item.exercicio}`,
      aoLevar: () => void (async () => {
        await tratar(await salvarDados(deps.dados!, e, local.base, local.respostas, Object.keys(local.respostas), { subindo: true }), { gravando: false, subindo: true });
      })(),
      aoDepois: () => subir.replaceChildren(),
      aoDescartar: () => void (async () => {
        await apagarLocal(deps.dados!.area, deps.dados!.protocolo);
        estadoDados = { ...e, local: null };
        subir.replaceChildren();
        avisar('Os dados deste navegador foram apagados.', 'ok');
      })(),
    }));
  }

  let bSalvarDados: HTMLButtonElement | null = null;
  if (deps.dados) {
    const b = botao('salvar-dados', 'Salvar dados da contratação');
    b.addEventListener('click', () => void (async () => {
      b.disabled = true;
      try { await salvarDadosDaContratacao(false); } catch (e) { avisar(mensagem(e), 'erro'); } finally { b.disabled = false; }
    })());
    bSalvarDados = b;
  }

  bIa.addEventListener('click', () => {
    if (!temIa) { deps.configurarIa(); return; }
    void (async () => {
      bIa.disabled = true;
      avisar('A IA está lendo os autos e preenchendo o que falta…');
      try {
        const r = await deps.analisar({ ia: true, dados: dadosParaMotor() });
        if (r.erro) { avisar(r.erro, 'erro'); return; }
        usarAnalise(r, k => !temValor(valores[k]) || evidencias[k]?.fonte !== 'usuario');
        desenhar();
        guardar();
        const g = deps.gasto?.();
        avisar(`Pronto: confira os campos marcados "redigido pela IA".${g ? ` Gasto: US$ ${g.toFixed(3)}.` : ''}${avisos.length ? ` ${avisos.join(' ')}` : ''}`, 'ok');
      } catch (e) {
        avisar(mensagem(e), 'erro');
      } finally {
        bIa.disabled = false;
      }
    })();
  });

  bPrevia.addEventListener('click', () => {
    void (async () => {
      try {
        const p = await deps.previa(dadosParaMotor());
        previa.replaceChildren(el(doc, 'h2', {}, 'Prévia'), el(doc, 'iframe', { class: 'gelic-previa', sandbox: '', srcdoc: p.html, title: 'Prévia do documento' }));
        previa.hidden = false;
      } catch (e) {
        avisar(mensagem(e), 'erro');
      }
    })();
  });

  bGravar.addEventListener('click', () => {
    void (async () => {
      let tipos: string[] = [];
      try { tipos = await deps.tipos(); } catch (e) { avisar(`Não consegui ler os tipos de documento do SEI: ${mensagem(e)}`, 'erro'); }
      const sel = el(doc, 'select', { 'data-gelic-tipo': '', id: 'gelic-tipo' }) as HTMLSelectElement;
      sel.append(el(doc, 'option', { value: '' }, '— escolha o tipo —'));
      for (const t of tipos) sel.append(el(doc, 'option', { value: t }, t));
      const nome = el(doc, 'input', { type: 'text', id: 'gelic-nome-arvore', maxlength: '50' }) as HTMLInputElement;
      const comPendencia = el(doc, 'input', { type: 'checkbox', id: 'gelic-rascunho' }) as HTMLInputElement;
      const confirmar = botao('confirmar', 'Confirmar e gravar', true);
      const cancelar = botao('cancelar', 'Cancelar');
      cancelar.addEventListener('click', () => { gravar.hidden = true; });
      confirmar.addEventListener('click', () => {
        void (async () => {
          const tipo = valorDoSelect(sel);
          if (!tipo) { avisar('Escolha o tipo de documento no SEI.', 'erro'); return; }
          confirmar.disabled = true;
          try {
            // os dados da contratação antes da peça: o documento sai com o que ficou nos dados
            if (!(await salvarDadosDaContratacao(true))) return;
            const r = await deps.gravar({ dados: dadosParaMotor(), tipo, ...(nome.value.trim() ? { nome_arvore: nome.value.trim() } : {}), rascunho: comPendencia.checked });
            if (!r.ok) { avisar(erroParaTela(r.erro), 'erro'); return; }
            await guardarUo(deps.area, valores);
            await apagarRascunho(deps.area, deps.protocolo, deps.modelo);
            gravar.hidden = true;
            avisar(`Criado ${tipo} SEI nº ${r.numero}, não assinado. Confira no SEI antes de assinar.${notaDados ? ` ${notaDados}` : ''}`, 'ok');
          } catch (e) {
            avisar(mensagem(e), 'erro');
          } finally {
            confirmar.disabled = false;
          }
        })();
      });
      gravar.replaceChildren(
        el(doc, 'h2', {}, 'Gravar no SEI'),
        el(doc, 'p', {}, `Cria o documento no processo ${deps.protocolo} com o texto do modelo. Não assina.`),
        el(doc, 'label', { for: 'gelic-tipo' }, 'Tipo de documento no SEI'), sel,
        el(doc, 'label', { for: 'gelic-nome-arvore' }, 'Nome na árvore (opcional)'), nome,
        el(doc, 'label', { class: 'gelic-check' }, comPendencia, ' Gravar mesmo com campos faltando (saem marcados ⟦campo⟧)'),
        el(doc, 'div', { class: 'gelic-botoes' }, confirmar, cancelar));
      gravar.hidden = false;
    })();
  });

  raiz.replaceChildren(...[
    el(doc, 'header', { class: 'gelic-cab' }, el(doc, 'h1', {}, deps.nomePeca), el(doc, 'p', {}, `Processo ${deps.protocolo}`)),
    barra,
    faixa,
    erroAbertura ? el(doc, 'p', { class: 'gelic-status gelic-status-erro' }, erroAbertura) : null,
    painel,
    subir,
    area,
    el(doc, 'div', { class: 'gelic-botoes gelic-rodape' }, bIa, bPrevia, bGravar, bSalvarDados, bDescartar),
    status,
    gravar,
    previa,
  ].filter((x): x is HTMLElement => !!x));
  desenhar();
  desenharBarra();
  mostrarConflitoDaAbertura();
  desenharSubir();
}

/** O erro do motor (escrito para o agente) na linguagem da tela. */
function erroParaTela(erro: string | undefined): string {
  const faltam = /^Faltam valores que só o usuário informa: ([^.]+)\./.exec(erro ?? '');
  if (faltam) return `Faltam campos obrigatórios: ${faltam[1]}. Preencha-os ou marque “Gravar mesmo com campos faltando”.`;
  return erro || 'O SEI não gravou o documento.';
}

/** dd/mm/aaaa ↔ aaaa-mm-dd (o input date). */
function paraIso(v: string): string {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v.trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : v;
}
function deIso(v: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.trim());
  return m ? `${m[3]}/${m[2]}/${m[1]}` : v;
}
