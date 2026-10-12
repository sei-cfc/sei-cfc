/**
 * A janela da verificação prévia (js/gelic/verificar.html). Só DOM: a rodada, a ponte, a IA e o storage chegam por
 * DepsVerificacao (main.ts monta as reais; os testes, as falsas). Texto de fora entra como nó de texto; a prévia vai
 * num iframe com sandbox vazio. Mostra os pendentes com o que corrigir e a caixa de justificativa; os resolvidos
 * ficam numa linha de resumo. "Gravar" só com o checklist fechado.
 */
import type { ResultadoRodada } from './rodada';
import { tipoSugerido } from './documento';
import { fechado, pendentes, situacaoDe, type ItemVerificado, type Situacao, type Verificacao } from './estado';

export interface DepsVerificacao {
  protocolo: string;
  temIa: boolean;
  /** Avisa quando a chave de IA passa a existir ou deixa de existir (configurada em outra aba). */
  aoMudarIa?(f: (temIa: boolean) => void): void;
  configurarIa(): void;
  /** A verificação guardada deste processo, se houver. */
  anterior(): Promise<Verificacao | null>;
  rodar(): Promise<ResultadoRodada>;
  justificar(id: string, texto: string): Promise<Verificacao>;
  /** O HTML do checklist como vai ao SEI. */
  previa(): Promise<string>;
  tipos(): Promise<string[]>;
  gravar(tipo: string): Promise<{ ok: boolean; numero?: string; erro?: string }>;
  /** Gasto da IA nesta janela (dólares), quando houver. */
  gasto?(): number;
}

type Filhos = (Node | string | null | undefined | false)[];
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filhos): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}
const mensagem = (e: unknown) => (e instanceof Error ? e.message : String(e));
const ROTULO: Readonly<Record<Situacao, string>> = {
  atende: 'atende', nao_se_aplica: 'não se aplica', justificado: 'justificado', nao_atende: 'não atende', nao_verificado: 'não verificado',
};
/** O valor de um select: o `value` do navegador ou, sem ele, a opção selecionada. */
function valorDoSelect(s: HTMLSelectElement): string {
  if (typeof s.value === 'string') return s.value;
  const o = s.querySelector('option[selected]') ?? s.querySelector('option');
  return o?.getAttribute('value') ?? '';
}

export async function montarVerificacao(doc: Document, deps: DepsVerificacao): Promise<void> {
  const raiz = doc.getElementById('gelic-peca')!;
  let v: Verificacao | null = await deps.anterior().catch(() => null);
  let parcial = false;
  let mecanicas = '';
  let temIa = deps.temIa;

  const botao = (acao: string, rotulo: string, primario = false) => el(doc, 'button', { type: 'button', 'data-gelic-acao': acao, class: primario ? 'gelic-botao gelic-primario' : 'gelic-botao' }, rotulo) as HTMLButtonElement;
  const faixa = el(doc, 'p', { class: 'gelic-faixa' });
  const itens = el(doc, 'section', { class: 'gelic-itens' });
  const status = el(doc, 'p', { class: 'gelic-status', role: 'status', 'aria-live': 'polite' });
  const gravarCaixa = el(doc, 'section', { class: 'gelic-gravar', hidden: '' });
  const previaCaixa = el(doc, 'section', { class: 'gelic-previa-caixa', hidden: '' });
  const avisar = (t: string, tom: 'ok' | 'erro' | '' = '') => {
    status.textContent = t;
    status.className = `gelic-status${tom ? ` gelic-status-${tom}` : ''}`;
  };

  const bVerificar = botao('verificar', '', true);
  const bIa = botao('ia', 'Configurar a IA');
  const bPrevia = botao('previa', 'Prévia do checklist');
  const bGravar = botao('gravar', 'Gravar Checklist de Conformidade');
  const rotulos = () => {
    bVerificar.textContent = temIa ? (v ? 'Verificar de novo' : 'Verificar') : 'Verificação parcial (sem IA)';
    bIa.hidden = temIa;
  };
  deps.aoMudarIa?.(t => { temIa = t; rotulos(); });

  function item(i: ItemVerificado): HTMLElement {
    const s = situacaoDe(i);
    const caixa = el(doc, 'textarea', { rows: '2', 'data-gelic-justificativa': i.id, 'aria-label': `Justificativa do item ${i.id}` }) as HTMLTextAreaElement;
    caixa.value = i.justificativa ?? i.justificativaAnterior ?? '';
    const b = el(doc, 'button', { type: 'button', class: 'gelic-mini', 'data-gelic-justificar': i.id }, s === 'justificado' ? 'Trocar justificativa' : 'Justificar');
    b.addEventListener('click', () => void (async () => {
      try {
        v = await deps.justificar(i.id, caixa.value);
        desenhar();
        avisar(`Item ${i.id} justificado.`, 'ok');
      } catch (e) {
        avisar(mensagem(e), 'erro');
      }
    })());
    return el(doc, 'div', { class: 'gelic-item', 'data-gelic-item': i.id, 'data-situacao': s },
      el(doc, 'p', { class: 'gelic-item-cab' }, el(doc, 'strong', {}, i.id), ` ${i.texto} — `, el(doc, 'span', { class: 'gelic-situacao' }, ROTULO[s]), i.sei ? ` · SEI ${i.sei}` : ''),
      ...i.achados.map(a => el(doc, 'div', { class: 'gelic-achado' },
        el(doc, 'p', {}, a.sei ? `SEI ${a.sei} (${a.documento}), ${a.achado.item}: ` : `${a.documento}: `, a.achado.constatacao),
        el(doc, 'p', {}, el(doc, 'strong', {}, 'O que corrigir: '), a.achado.recomendacao))),
      i.nota ? el(doc, 'p', { class: 'gelic-nota' }, i.nota) : null,
      i.justificativaAnterior && !i.justificativa ? el(doc, 'p', { class: 'gelic-nota' }, 'O documento mudou depois da justificativa: confira e justifique de novo.') : null,
      el(doc, 'label', {}, 'Ou justifique (vai no checklist):'), caixa, b);
  }

  function desenhar(): void {
    rotulos();
    const filhos: HTMLElement[] = [];
    if (v && !parcial) {
      const abertos = v.itens.filter(i => !['atende', 'nao_se_aplica'].includes(situacaoDe(i)));
      const resolvidos = v.itens.filter(i => !abertos.includes(i));
      filhos.push(...abertos.map(item));
      filhos.push(el(doc, 'details', { class: 'gelic-resolvidos' }, el(doc, 'summary', {}, `${resolvidos.length} itens atendem ou não se aplicam`),
        el(doc, 'ul', {}, ...resolvidos.map(i => el(doc, 'li', {}, `${i.id} ${i.texto} — ${ROTULO[situacaoDe(i)]}${i.sei ? ` · SEI ${i.sei}` : ''}`)))));
      if (v.outros.length) {
        filhos.push(el(doc, 'section', { class: 'gelic-outros' }, el(doc, 'h2', {}, 'Outros apontamentos'),
          ...v.outros.map(a => el(doc, 'p', {}, `${a.sei ? `SEI ${a.sei}: ` : ''}${a.achado.constatacao} O que corrigir: ${a.achado.recomendacao}`))));
      }
      if (v.ausencias.length) filhos.push(el(doc, 'section', { class: 'gelic-ausencias' }, el(doc, 'h2', {}, 'Peças que faltam'), el(doc, 'ul', {}, ...v.ausencias.map(a => el(doc, 'li', {}, a)))));
    }
    if (mecanicas) filhos.push(el(doc, 'details', { class: 'gelic-mecanicas', ...(parcial ? { open: '' } : {}) }, el(doc, 'summary', {}, 'Checagens sem IA'), el(doc, 'pre', {}, mecanicas)));
    itens.replaceChildren(...filhos);
    const n = v ? pendentes(v).length : 0;
    faixa.textContent = parcial ? 'Verificação parcial: o mérito não foi analisado (configure a IA para a verificação completa).'
      : !v ? 'Sem verificação ainda.'
        : n ? `${n} ${n > 1 ? 'itens pendentes' : 'item pendente'}: corrija nos autos e verifique de novo, ou justifique.`
          : 'Checklist fechado: pode gravar.';
    faixa.className = `gelic-faixa${parcial || n ? ' gelic-faixa-falta' : ''}`;
    bGravar.disabled = !v || parcial || !fechado(v);
    bPrevia.disabled = !v || parcial;
  }

  bIa.addEventListener('click', () => deps.configurarIa());
  bVerificar.addEventListener('click', () => void (async () => {
    bVerificar.disabled = true;
    avisar(temIa ? 'Lendo os autos e verificando com a IA…' : 'Lendo os autos…');
    try {
      const r = await deps.rodar();
      mecanicas = r.pendencias;
      if (r.tipo === 'erro') { desenhar(); avisar([r.erro, ...r.erros].join(' '), 'erro'); return; }
      parcial = r.tipo === 'parcial';
      if (r.tipo === 'completa') v = r.verificacao;
      desenhar();
      if (r.tipo === 'parcial') { avisar('Verificação parcial pronta.', 'ok'); return; }
      const g = deps.gasto?.();
      avisar(`Pronto: ${r.reexaminados} ${r.reexaminados === 1 ? 'item examinado' : 'itens examinados'} nesta rodada.${g ? ` Gasto: US$ ${g.toFixed(3)}.` : ''}`, 'ok');
    } catch (e) {
      avisar(mensagem(e), 'erro');
    } finally {
      bVerificar.disabled = false;
    }
  })());
  bPrevia.addEventListener('click', () => void (async () => {
    try {
      previaCaixa.replaceChildren(el(doc, 'h2', {}, 'Prévia'), el(doc, 'iframe', { class: 'gelic-previa', sandbox: '', srcdoc: await deps.previa(), title: 'Prévia do checklist' }));
      previaCaixa.hidden = false;
    } catch (e) {
      avisar(mensagem(e), 'erro');
    }
  })());
  bGravar.addEventListener('click', () => void (async () => {
    let tipos: string[] = [];
    try { tipos = await deps.tipos(); } catch (e) { avisar(`Não consegui ler os tipos de documento do SEI: ${mensagem(e)}`, 'erro'); }
    const sugerido = tipoSugerido(tipos);
    const sel = el(doc, 'select', { 'data-gelic-tipo': '', id: 'gelic-tipo' }) as HTMLSelectElement;
    sel.append(el(doc, 'option', { value: '' }, '— escolha o tipo —'));
    for (const t of tipos) {
      const o = el(doc, 'option', { value: t }, t);
      if (t === sugerido) o.setAttribute('selected', '');
      sel.append(o);
    }
    const confirmar = botao('confirmar', 'Confirmar e gravar', true);
    const cancelar = botao('cancelar', 'Cancelar');
    cancelar.addEventListener('click', () => { gravarCaixa.hidden = true; });
    confirmar.addEventListener('click', () => void (async () => {
      const tipo = valorDoSelect(sel);
      if (!tipo) { avisar('Escolha o tipo de documento no SEI.', 'erro'); return; }
      confirmar.disabled = true;
      try {
        const r = await deps.gravar(tipo);
        if (!r.ok) { avisar(r.erro ?? 'O SEI não gravou o documento.', 'erro'); return; }
        gravarCaixa.hidden = true;
        avisar(`Criado o Checklist de Conformidade SEI nº ${r.numero}, não assinado. Confira no SEI antes de assinar.`, 'ok');
      } catch (e) {
        avisar(mensagem(e), 'erro');
      } finally {
        confirmar.disabled = false;
      }
    })());
    gravarCaixa.replaceChildren(
      el(doc, 'h2', {}, 'Gravar no SEI'),
      el(doc, 'p', {}, `Cria o Checklist de Conformidade no processo ${deps.protocolo}. Não assina.${sugerido ? '' : ' O tipo "Checklist de Conformidade" ainda não existe neste SEI: escolha outro, e o nome na árvore sai "Checklist de Conformidade".'}`),
      el(doc, 'label', { for: 'gelic-tipo' }, 'Tipo de documento no SEI'), sel,
      el(doc, 'div', { class: 'gelic-botoes' }, confirmar, cancelar));
    gravarCaixa.hidden = false;
  })());

  raiz.replaceChildren(
    el(doc, 'header', { class: 'gelic-cab' }, el(doc, 'h1', {}, 'Verificação prévia'), el(doc, 'p', {}, `Processo ${deps.protocolo}`)),
    el(doc, 'p', { class: 'gelic-nota' }, 'Os mesmos critérios do DVI da Gelic. Corrija nos autos e verifique de novo, ou justifique o item. Com o checklist fechado, grave o Checklist de Conformidade no processo.'),
    faixa, itens,
    el(doc, 'div', { class: 'gelic-botoes gelic-rodape' }, bVerificar, bIa, bPrevia, bGravar),
    status, gravarCaixa, previaCaixa);
  desenhar();
}
