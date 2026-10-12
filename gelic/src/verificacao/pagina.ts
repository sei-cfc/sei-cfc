/**
 * A janela da verificação prévia (js/gelic/verificar.html). Só DOM: a rodada, a ponte, a IA e o storage chegam por
 * DepsVerificacao (main.ts monta as reais; os testes, as falsas). Texto de fora entra como nó de texto; a prévia vai
 * num iframe com sandbox vazio. Mostra os pendentes com o que corrigir e a caixa de justificativa; os resolvidos
 * ficam numa linha de resumo. "Gravar" só com o checklist fechado.
 *
 * Dois modos, a IA sempre opcional: "Verificar sem IA" (presença dos requisitos, sempre disponível) e "Verificar com
 * IA" (só com chave). A tela mostra a última verificação feita, e o "Gravar" grava essa.
 */
import type { ResultadoRodada } from './rodada';
import { tipoEhChecklist, tipoSugerido } from './documento';
import { fechado, pendentes, situacaoDe, type ItemVerificado, type Modo, type Situacao, type Verificacao } from './estado';

export interface DepsVerificacao {
  protocolo: string;
  temIa: boolean;
  /** Avisa quando a chave de IA passa a existir ou deixa de existir (configurada em outra aba). */
  aoMudarIa?(f: (temIa: boolean) => void): void;
  configurarIa(): void;
  /** A verificação guardada deste processo (a mais recente dos dois modos), se houver. */
  anterior(): Promise<Verificacao | null>;
  rodar(modo: Modo): Promise<ResultadoRodada>;
  justificar(id: string, texto: string, modo: Modo): Promise<Verificacao>;
  /** O HTML do checklist como vai ao SEI. */
  previa(modo: Modo): Promise<string>;
  tipos(): Promise<string[]>;
  gravar(tipo: string, modo: Modo): Promise<{ ok: boolean; numero?: string; erro?: string }>;
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
/** Sem IA, o "não verificado" é o "a conferir" das checagens. */
const rotulo = (modo: Modo, s: Situacao) => (modo === 'presenca' && s === 'nao_verificado' ? 'a conferir' : ROTULO[s]);
const NOME_MODO: Readonly<Record<Modo, string>> = { presenca: 'Sem IA: presença dos requisitos', ia: 'Com IA: julgamento do conteúdo' };
const FORMA_CURTA: Readonly<Record<Modo, string>> = { presenca: 'verificação sem IA', ia: 'verificação com IA' };
/** O valor de um select: o `value` do navegador ou, sem ele, a opção selecionada. */
function valorDoSelect(s: HTMLSelectElement): string {
  if (typeof s.value === 'string') return s.value;
  const o = s.querySelector('option[selected]') ?? s.querySelector('option');
  return o?.getAttribute('value') ?? '';
}

export async function montarVerificacao(doc: Document, deps: DepsVerificacao): Promise<void> {
  const raiz = doc.getElementById('gelic-peca')!;
  let v: Verificacao | null = await deps.anterior().catch(() => null);
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

  const bSemIa = botao('verificar-sem-ia', 'Verificar sem IA');
  bSemIa.title = 'Confere a presença dos requisitos (peças, assinaturas, datas, números, valores), sem juízo sobre o conteúdo. Não usa IA nem custa nada.';
  const bVerificar = botao('verificar', 'Verificar com IA', true);
  bVerificar.title = 'O modelo de IA julga o conteúdo de cada item pelos critérios do DVI da Gelic, com a sua chave.';
  const bIa = botao('ia', 'Configurar a IA (opcional)');
  const bPrevia = botao('previa', 'Prévia do checklist');
  const bGravar = botao('gravar', 'Gravar Checklist de Conformidade');
  const rotulos = () => {
    bVerificar.hidden = !temIa;
    bIa.hidden = temIa;
  };
  deps.aoMudarIa?.(t => { temIa = t; rotulos(); });

  function item(i: ItemVerificado): HTMLElement {
    const s = situacaoDe(i);
    const caixa = el(doc, 'textarea', { rows: '2', 'data-gelic-justificativa': i.id, 'aria-label': `Justificativa: ${i.grupo ? `${i.grupo}, ${i.texto}` : `item ${i.id}`}` }) as HTMLTextAreaElement;
    caixa.value = i.justificativa ?? i.justificativaAnterior ?? '';
    const b = el(doc, 'button', { type: 'button', class: 'gelic-mini', 'data-gelic-justificar': i.id }, s === 'justificado' ? 'Trocar justificativa' : 'Justificar');
    b.addEventListener('click', () => void (async () => {
      try {
        v = await deps.justificar(i.id, caixa.value, v!.modo);
        desenhar();
        avisar(`Item justificado: ${i.grupo ?? i.id}.`, 'ok');
      } catch (e) {
        avisar(mensagem(e), 'erro');
      }
    })());
    return el(doc, 'div', { class: 'gelic-item', 'data-gelic-item': i.id, 'data-situacao': s },
      el(doc, 'p', { class: 'gelic-item-cab' }, el(doc, 'strong', {}, i.grupo ? `${i.grupo}:` : i.id), ` ${i.texto} — `, el(doc, 'span', { class: 'gelic-situacao' }, rotulo(v!.modo, s)), i.sei ? ` · SEI ${i.sei}` : ''),
      ...i.achados.map(a => el(doc, 'div', { class: 'gelic-achado' },
        el(doc, 'p', {}, a.sei ? `SEI ${a.sei} (${a.documento}), ${a.achado.item}: ` : `${a.documento}: `, a.achado.constatacao),
        el(doc, 'p', {}, el(doc, 'strong', {}, 'O que corrigir: '), a.achado.recomendacao))),
      i.nota ? el(doc, 'p', { class: 'gelic-nota' }, i.nota) : null,
      i.justificativaAnterior && !i.justificativa ? el(doc, 'p', { class: 'gelic-nota' }, 'O que foi verificado mudou depois da justificativa: confira e justifique de novo.') : null,
      el(doc, 'label', {}, 'Ou justifique (vai no checklist):'), caixa, b);
  }

  function desenhar(): void {
    rotulos();
    const filhos: HTMLElement[] = [];
    if (v) {
      const modo = v.modo;
      const abertos = v.itens.filter(i => !['atende', 'nao_se_aplica'].includes(situacaoDe(i)));
      const resolvidos = v.itens.filter(i => !abertos.includes(i));
      filhos.push(...abertos.map(item));
      const n = resolvidos.length;
      filhos.push(el(doc, 'details', { class: 'gelic-resolvidos' }, el(doc, 'summary', {}, `${n} ${n === 1 ? 'item atende' : 'itens atendem'}${modo === 'ia' ? ' ou não se aplicam' : ''}`),
        el(doc, 'ul', {}, ...resolvidos.map(i => el(doc, 'li', {}, `${i.grupo ? `${i.grupo}: ` : `${i.id} `}${i.texto} — ${rotulo(modo, situacaoDe(i))}${i.sei ? ` · SEI ${i.sei}` : ''}`)))));
      if (v.outros.length) {
        filhos.push(el(doc, 'section', { class: 'gelic-outros' }, el(doc, 'h2', {}, 'Outros apontamentos'),
          ...v.outros.map(a => el(doc, 'p', {}, `${a.sei ? `SEI ${a.sei}: ` : ''}${a.achado.constatacao} O que corrigir: ${a.achado.recomendacao}`))));
      }
      if (v.ausencias.length) filhos.push(el(doc, 'section', { class: 'gelic-ausencias' }, el(doc, 'h2', {}, 'Peças que faltam'), el(doc, 'ul', {}, ...v.ausencias.map(a => el(doc, 'li', {}, a)))));
      // com IA, as checagens sem IA da mesma leitura ficam à mão; sem IA, elas já são os itens
      if (modo === 'ia' && mecanicas) filhos.push(el(doc, 'details', { class: 'gelic-mecanicas' }, el(doc, 'summary', {}, 'Checagens sem IA'), el(doc, 'pre', {}, mecanicas)));
    }
    itens.replaceChildren(...filhos);
    const n = v ? pendentes(v).length : 0;
    faixa.textContent = !v ? 'Sem verificação ainda. Escolha: sem IA (presença dos requisitos) ou com IA (julgamento do conteúdo).'
      : `${NOME_MODO[v.modo]}. ${n ? `${n} ${n > 1 ? 'itens pendentes' : 'item pendente'}: corrija nos autos e verifique de novo, ou justifique.` : 'Checklist fechado: pode gravar.'}`;
    faixa.className = `gelic-faixa${n ? ' gelic-faixa-falta' : ''}`;
    bGravar.disabled = !v || !fechado(v);
    bPrevia.disabled = !v;
  }

  bIa.addEventListener('click', () => deps.configurarIa());
  const rodar = (modo: Modo, b: HTMLButtonElement) => void (async () => {
    bSemIa.disabled = bVerificar.disabled = true;
    // a caixa de gravar e a prévia eram da verificação anterior: o Confirmar não pode gravar a nova sem a pessoa ver
    gravarCaixa.hidden = true;
    previaCaixa.hidden = true;
    avisar(modo === 'ia' ? 'Lendo os autos e verificando com a IA…' : 'Lendo os autos e conferindo a presença dos requisitos…');
    try {
      const r = await deps.rodar(modo);
      if (r.tipo === 'erro') { avisar([r.erro, ...r.erros].join(' '), 'erro'); return; }
      mecanicas = r.pendencias;
      v = r.verificacao;
      desenhar();
      const g = modo === 'ia' ? deps.gasto?.() : 0;
      avisar(`Pronto: ${r.reexaminados} ${r.reexaminados === 1 ? 'item examinado' : 'itens examinados'} nesta rodada${modo === 'presenca' ? ', sem IA' : ''}.${g ? ` Gasto da IA nesta janela: US$ ${g.toFixed(3)}.` : ''}`, 'ok');
    } catch (e) {
      avisar(mensagem(e), 'erro');
    } finally {
      bSemIa.disabled = bVerificar.disabled = false;
      b.focus?.();
    }
  })();
  bSemIa.addEventListener('click', () => rodar('presenca', bSemIa));
  bVerificar.addEventListener('click', () => rodar('ia', bVerificar));
  bPrevia.addEventListener('click', () => void (async () => {
    try {
      previaCaixa.replaceChildren(el(doc, 'h2', {}, 'Prévia'), el(doc, 'iframe', { class: 'gelic-previa', sandbox: '', srcdoc: await deps.previa(v!.modo), title: 'Prévia do checklist' }));
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
        const r = await deps.gravar(tipo, v!.modo);
        if (!r.ok) { avisar(r.erro ?? 'O SEI não gravou o documento.', 'erro'); return; }
        gravarCaixa.hidden = true;
        avisar(`Criado o Checklist de Conformidade SEI nº ${r.numero}, não assinado. Confira no SEI antes de assinar.`, 'ok');
      } catch (e) {
        avisar(mensagem(e), 'erro');
      } finally {
        confirmar.disabled = false;
      }
    })());
    gravarCaixa.replaceChildren(...[
      el(doc, 'h2', {}, 'Gravar no SEI'),
      el(doc, 'p', {}, `Cria o Checklist de Conformidade (${FORMA_CURTA[v!.modo]}) no processo ${deps.protocolo}. Não assina.`),
      tipoEhChecklist(sugerido) ? null : el(doc, 'p', { class: 'gelic-nota' }, sugerido
        ? 'O tipo "Checklist de Conformidade" ainda não existe neste SEI: vai como Despacho, e a árvore mostra "Despacho de Conformidade".'
        : 'Escolha o tipo: o nome na árvore sai "<tipo> de Conformidade". Use Despacho quando houver; o roteiro reconhece "Despacho de Conformidade".'),
      el(doc, 'label', { for: 'gelic-tipo' }, 'Tipo de documento no SEI'), sel,
      el(doc, 'div', { class: 'gelic-botoes' }, confirmar, cancelar),
    ].filter((x): x is HTMLElement => !!x));
    gravarCaixa.hidden = false;
  })());

  raiz.replaceChildren(
    el(doc, 'header', { class: 'gelic-cab' }, el(doc, 'h1', {}, 'Verificação prévia'), el(doc, 'p', {}, `Processo ${deps.protocolo}`)),
    el(doc, 'p', { class: 'gelic-nota' }, 'Os critérios do DVI da Gelic, em dois modos à sua escolha: sem IA, a extensão confere só a presença dos requisitos, sem juízo sobre o conteúdo; com IA, o modelo julga o conteúdo de cada item. Corrija nos autos e verifique de novo, ou justifique o item. Com o checklist fechado, grave-o no processo: o documento diz se a verificação usou IA.'),
    faixa, itens,
    el(doc, 'div', { class: 'gelic-botoes gelic-rodape' }, bSemIa, bVerificar, bIa, bPrevia, bGravar),
    status, gravarCaixa, previaCaixa);
  desenhar();
}
