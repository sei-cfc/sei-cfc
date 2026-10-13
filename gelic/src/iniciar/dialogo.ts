/**
 * "Iniciar processo" no Controle de Processos do SEI CFC: o botão e o diálogo (perguntas → prévia da árvore →
 * criação com progresso → resultado). Desenhado na própria página do SEI (content script); as telas do SEI, o PCA e o
 * armazenamento vêm injetados (deps), para os testes. Só nós de texto. Nada é criado sem o clique em "Criar no SEI".
 */
import { arvoreInicial, especificacao, LIMITES, type PecaInicial, type Respostas, type Via } from './arvore-inicial';
import { chaveDoTipo, criarPecas, resolverTipos, type DepsPecas, type Pendente } from './executar';
import type { Opcao, ProcessoCriado } from './sei';
import type { PedidoPca } from './pendente';

export const ID_BOTAO = 'gelic-iniciar';
export const ID_DIALOGO = 'gelic-iniciar-dialogo';

export interface ItemDoPca {
  objeto?: string; valor_estimado?: string | null; grau_prioridade?: string | null;
  /** v1.1: a via pela modalidade do item; null quando o PCA não a tem. */
  via?: Via | null;
  /** A unidade do item: a sigla do SEI (v1.1) ou, sem ela, o nome da unidade no PCA. */
  unidade?: string | null;
  /** A unidade é a sigla do SEI: só então a entrada pelo PCA pode mandar trocar de unidade. */
  unidade_sei?: boolean;
  /** Os nº SEI já vinculados ao item (o PCA aceita vários). */
  numeros_sei?: string[];
}
export interface Lembrados { tipos: Record<string, string>; tipoProcesso?: string; assuntos?: Record<string, Opcao> }
export interface DepsDialogo extends DepsPecas {
  tiposDeProcesso: () => Promise<Opcao[]>;
  iniciar: (novo: { tipo: string; especificacao: string; assunto?: Opcao }) => Promise<ProcessoCriado>;
  /** Classificação por assunto (obrigatória no SEI): os que o tipo já traz e a busca do SEI. Sem ela, o campo não aparece. */
  assuntos?: { sugeridos: (tipo: string) => Promise<Opcao[]>; buscar: (tipo: string, termo: string) => Promise<Opcao[]> };
  tiposDeDocumento: (ref: string) => Promise<{ internos: Opcao[]; externos: Opcao[] }>;
  /** Tipos lembrados (por chaveDoTipo), o tipo de processo lembrado e o assunto de cada tipo de processo. */
  lembrados: () => Promise<Lembrados>;
  lembrar: (l: Lembrados & { tipoProcesso: string }) => Promise<void>;
  /** Item do PCA (com o PCA ligado); sem ele, o campo não aparece. */
  itemDoPca?: (item: number, exercicio: number) => Promise<ItemDoPca | null>;
  /** Com o PCA ligado: se o vínculo vai poder ser gravado (conferido na prévia). */
  podeVincular?: () => Promise<{ pode: true } | { pode: false; motivo: string }>;
  /** Com o PCA ligado: grava o nº SEI no item (v1.1). */
  vincular?: (protocolo: string, item: number, exercicio: number) => Promise<{ criado: boolean }>;
  /** A sigla da unidade em que a pessoa está no SEI, para o aviso de unidade diferente da do item. */
  unidadeAtual?: () => string | null;
  /** As respostas viram o rascunho do DFD do processo novo. */
  guardarDfd: (protocolo: string, r: Respostas) => Promise<void>;
  /** As internas criadas em branco: só nelas o "Preencher" grava (src/iniciar/vazios.ts). */
  guardarVazios?: (protocolo: string, vazios: { chave: string; numero: string }[]) => Promise<void>;
  abrirProcesso: (p: ProcessoCriado) => void;
  /** Relógio do cronômetro (padrão Date.now): os testes passam um falso. */
  agora?: () => number;
}

const ROTULO_VIA: Readonly<Record<Via, string>> = {
  pregao: 'Pregão', concorrencia: 'Concorrência', dispensa: 'Dispensa', inexigibilidade: 'Inexigibilidade',
  credenciamento: 'Credenciamento', adesao_ata: 'Adesão a ata de registro de preços', chamamento_publico: 'Chamamento público',
};

type Filho = Node | string | null | undefined | false;
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filho[]): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}
/** Marca a opção do select (pelo atributo: funciona no navegador e no linkedom dos testes). */
export function selecionar(s: HTMLSelectElement, valor: string): void {
  for (const o of s.querySelectorAll('option')) o.toggleAttribute('selected', o.getAttribute('value') === valor);
}
/** O cronômetro: "52 s" abaixo de um minuto; "1 min 12 s" (ou "2 min") acima. */
export function duracao(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60), r = s % 60;
  return r ? `${m} min ${r} s` : `${m} min`;
}
const valorDe = (s: HTMLSelectElement) => s.querySelector('option[selected]')?.getAttribute('value') ?? s.value;
const campo = (doc: Document, rotulo: string, controle: HTMLElement, nota?: string) =>
  el(doc, 'label', { class: 'gelic-ini-campo' }, el(doc, 'span', {}, rotulo), controle, nota ? el(doc, 'small', {}, nota) : null);

/** Põe o botão "Iniciar processo" acima das tabelas do Controle de Processos. Devolve a função que abre o diálogo. */
/** O título da tela do Controle de Processos (os mesmos seletores da grade nova, grade-controle/src/ativacao/botao.ts). */
const TITULO_CONTROLE = '#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao';
let ouvinte: ((e: Event) => void) | null = null;

export function montarIniciar(doc: Document, deps: DepsDialogo): (o?: { pelo?: PedidoPca }) => Promise<HTMLElement> {
  doc.getElementById(ID_BOTAO)?.remove();
  const botao = el(doc, 'button', { type: 'button', id: ID_BOTAO, class: 'gelic-ini-botao', title: 'Cria o processo e a árvore com as peças da instrução (você confere antes)' }, 'Iniciar processo');
  // No título "Controle de Processos", onde a grade nova do SEI Pro também põe o botão dela: visível na lista do SEI e
  // na grade (que esconde a área das tabelas). Sem o título, acima das tabelas, como antes.
  const titulo = doc.querySelector<HTMLElement>(TITULO_CONTROLE);
  const alvo = doc.getElementById('divRecebidos')?.parentElement ?? doc.querySelector('#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado')?.closest('div');
  if (titulo) { botao.style.marginLeft = '12px'; botao.style.verticalAlign = 'middle'; titulo.append(botao); }
  else if (alvo?.parentElement) alvo.parentElement.insertBefore(botao, alvo);
  else doc.body.prepend(botao);
  const abrir = (o: { pelo?: PedidoPca } = {}) => abrirDialogo(doc, deps, o);
  // O legado clona a área do título ($.fn.moveTo) e o clone perde os ouvintes: o clique é ouvido no documento.
  if (ouvinte) doc.removeEventListener('click', ouvinte);
  ouvinte = (e: Event) => { if ((e.target as Element | null)?.closest?.(`#${ID_BOTAO}`)) void abrir(); };
  doc.addEventListener('click', ouvinte);
  return abrir;
}

/** Criação em curso: o diálogo não fecha nem reabre (fechar no meio e criar de novo duplicaria o processo). */
let emAndamento = false;

export async function abrirDialogo(doc: Document, deps: DepsDialogo, o: { pelo?: PedidoPca } = {}): Promise<HTMLElement> {
  const aberto = doc.getElementById(ID_DIALOGO);
  if (aberto && emAndamento) return aberto;
  aberto?.remove();
  const corpo = el(doc, 'div', { class: 'gelic-ini-corpo' });
  const status = el(doc, 'p', { class: 'gelic-ini-status', role: 'status' });
  const fechar = el(doc, 'button', { type: 'button', class: 'gelic-ini-fechar', 'aria-label': 'Fechar' }, '×');
  const caixa = el(doc, 'section', { id: ID_DIALOGO, role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Iniciar processo' },
    el(doc, 'div', { class: 'gelic-ini-caixa' }, el(doc, 'header', {}, el(doc, 'h2', {}, 'Iniciar processo'), fechar), status, corpo));
  fechar.addEventListener('click', () => { if (emAndamento) mostrar('Aguarde: o processo está sendo criado. Fechar agora não desfaz o que já foi criado.', true); else caixa.remove(); });
  doc.body.append(caixa);
  // valorDe lê o atributo selected (o linkedom dos testes não tem .value de select); no navegador a escolha da pessoa
  // não mexe no atributo: sem isto, o tipo lembrado continuaria valendo depois de trocado. Na captura, antes dos ouvintes.
  caixa.addEventListener('change', e => { const s = e.target as HTMLSelectElement | null; if (s?.tagName === 'SELECT') selecionar(s, s.value); }, true);
  const mostrar = (t: string, erro = false) => { status.textContent = t; status.toggleAttribute('data-erro', erro); };

  // ---- 1. perguntas
  const objeto = el(doc, 'textarea', { name: 'objeto', rows: '3', required: '' }) as HTMLTextAreaElement;
  const via = el(doc, 'select', { name: 'via' }, ...(Object.keys(ROTULO_VIA) as Via[]).map(v => el(doc, 'option', { value: v }, ROTULO_VIA[v]))) as HTMLSelectElement;
  const item = el(doc, 'input', { name: 'item_pca', inputmode: 'numeric', size: '6' }) as HTMLInputElement;
  const exercicio = el(doc, 'input', { name: 'exercicio', inputmode: 'numeric', size: '6', value: String(new Date().getFullYear()) }) as HTMLInputElement;
  const valor = el(doc, 'input', { name: 'valor_estimado', placeholder: '0,00' }) as HTMLInputElement;
  const data = el(doc, 'input', { name: 'data_pretendida', placeholder: 'dd/mm/aaaa' }) as HTMLInputElement;
  const termos = el(doc, 'input', { name: 'termos', type: 'number', min: '0', max: String(LIMITES.termos.max), value: String(LIMITES.termos.padrao) }) as HTMLInputElement;
  const cotacoes = el(doc, 'input', { name: 'cotacoes', type: 'number', min: '0', max: String(LIMITES.cotacoes.max), value: String(LIMITES.cotacoes.padrao) }) as HTMLInputElement;
  const tipo = el(doc, 'select', { name: 'tipo_processo' }, el(doc, 'option', { value: '' }, 'carregando…')) as HTMLSelectElement;
  let grau: string | null = null;
  /** O aviso de unidade do último "Buscar no PCA": repetido na prévia, que é a tela de confirmação. */
  let avisoUnidade: string | null = null;

  /** Os dados do item nos campos; devolve o texto do status (com o aviso de unidade, quando houver). */
  const aplicarItem = (i: ItemDoPca, n: number, ano: number): string => {
    if (i.objeto && !objeto.value.trim()) objeto.value = i.objeto;
    if (i.valor_estimado && !valor.value.trim()) valor.value = i.valor_estimado;
    // a via vem do PCA (fonte da verdade do planejamento) e substitui a escolhida; objeto e valor só preenchem o vazio
    if (i.via) selecionar(via, i.via);
    grau = i.grau_prioridade ?? null;
    const aqui = deps.unidadeAtual?.();
    avisoUnidade = i.unidade && aqui && i.unidade.toUpperCase() !== aqui.toUpperCase()
      ? `Atenção: o item é da unidade ${i.unidade}, e você está na ${aqui}; o processo nasce na unidade atual do SEI.` : null;
    return `Item ${n}/${ano} do PCA: objeto, valor${i.via ? ' e via' : ''} preenchidos (confira).${avisoUnidade ? ` ${avisoUnidade}` : ''}`;
  };

  // pelo PCA o item vem travado: sem "Buscar no PCA"
  const buscarPca = deps.itemDoPca && !o.pelo ? el(doc, 'button', { type: 'button', 'data-gelic-acao': 'buscar-pca' }, 'Buscar no PCA') : null;
  buscarPca?.addEventListener('click', async () => {
    const n = Number(item.value), ano = Number(exercicio.value);
    if (!n || !ano) return mostrar('Informe o item e o exercício do PCA.', true);
    avisoUnidade = null;
    mostrar('Consultando o PCA…');
    try {
      const i = await deps.itemDoPca!(n, ano);
      if (!i) return mostrar(`Item ${n}/${ano} não encontrado no PCA.`, true);
      mostrar(aplicarItem(i, n, ano), !!avisoUnidade);
    } catch (e) { mostrar(`PCA: ${(e as Error).message}`, true); }
  });

  const lembrados: Lembrados = await deps.lembrados().catch(() => ({ tipos: {} }));

  // ---- classificação por assunto: o SEI a exige; o tipo pode trazer (sugeridos) ou não, e aí a pessoa busca e escolhe
  const assunto = el(doc, 'select', { name: 'assunto' }, el(doc, 'option', { value: '' }, '—')) as HTMLSelectElement;
  const termoAssunto = el(doc, 'input', { name: 'assunto_busca', placeholder: 'código ou palavra (ex.: CFP.422, eventos)' }) as HTMLInputElement;
  const notaAssunto = el(doc, 'small', { 'data-gelic-assunto': 'nota' }, 'obrigatória no SEI; fica lembrada para o tipo de processo');
  const buscarAssunto = el(doc, 'button', { type: 'button', 'data-gelic-acao': 'buscar-assunto' }, 'Buscar');
  /** As opções do select e o texto delas: a prévia mostra o nome do assunto escolhido. */
  const opcoesAssunto = (lista: readonly Opcao[], marcado?: string) => {
    assunto.replaceChildren(el(doc, 'option', { value: '' }, lista.length ? 'escolha o assunto' : '—'), ...lista.map(a => el(doc, 'option', { value: a.id }, a.nome)));
    if (marcado) selecionar(assunto, marcado);
  };
  const sugeridos = new Map<string, Promise<Opcao[]>>();
  const sugeridosDo = (t: string) => {
    if (!deps.assuntos || !t) return Promise.resolve([] as Opcao[]);
    if (!sugeridos.has(t)) sugeridos.set(t, deps.assuntos.sugeridos(t).catch(() => { sugeridos.delete(t); return [] as Opcao[]; }));
    return sugeridos.get(t)!;
  };
  /** Ao trocar o tipo: o assunto lembrado dele vem escolhido, e a nota diz se o tipo já traz assunto. */
  const aoTrocarTipo = () => {
    const t = valorDe(tipo);
    const lembrado = t ? lembrados.assuntos?.[t] : undefined;
    opcoesAssunto(lembrado ? [lembrado] : [], lembrado?.id);
    notaAssunto.textContent = 'obrigatória no SEI; fica lembrada para o tipo de processo';
    void sugeridosDo(t).then(s => {
      if (t !== valorDe(tipo)) return;
      notaAssunto.textContent = s.length ? `o tipo já traz: ${s.map(a => a.nome).join('; ')} (outro assunto é opcional)`
        : 'o tipo não traz assunto: busque e escolha (obrigatória no SEI); fica lembrada para este tipo';
    });
  };
  tipo.addEventListener('change', aoTrocarTipo);
  buscarAssunto.addEventListener('click', async () => {
    const t = valorDe(tipo), termo = termoAssunto.value.trim();
    if (!t) return mostrar('Escolha primeiro o tipo de processo.', true);
    if (termo.length < 3) return mostrar('Digite ao menos 3 letras ou o código do assunto.', true);
    mostrar('Buscando o assunto no SEI…');
    try {
      const achados = await deps.assuntos!.buscar(t, termo);
      opcoesAssunto(achados, achados.length === 1 ? achados[0].id : undefined);
      mostrar(achados.length ? `${achados.length} assunto(s) encontrado(s): escolha na lista.` : `Nenhum assunto com "${termo}": tente outra palavra ou o código.`, !achados.length);
    } catch (e) { mostrar(`Assuntos: ${(e as Error).message}`, true); }
  });
  /** O assunto escolhido no select (com o nome), ou nenhum. */
  const assuntoEscolhido = (): Opcao | undefined => {
    const id = valorDe(assunto);
    return id ? { id, nome: assunto.querySelector(`option[value="${id}"]`)?.textContent ?? id } : undefined;
  };

  void deps.tiposDeProcesso().then(ts => {
    tipo.replaceChildren(el(doc, 'option', { value: '' }, 'escolha o tipo de processo'), ...ts.map(t => el(doc, 'option', { value: t.id }, t.nome)));
    if (lembrados.tipoProcesso && ts.some(t => t.id === lembrados.tipoProcesso)) { selecionar(tipo, lembrados.tipoProcesso); aoTrocarTipo(); }
  }).catch(e => mostrar(`Tipos de processo: ${(e as Error).message}`, true));

  const respostas = (): Respostas => ({
    objeto: objeto.value.trim(), via: (valorDe(via) || 'pregao') as Via,
    item_pca: Number(item.value) || null, exercicio: Number(item.value) ? Number(exercicio.value) || null : null,
    valor_estimado: valor.value.trim() || null, data_pretendida: data.value.trim() || null, grau_prioridade: grau,
    termos: Number(termos.value) || 0, cotacoes: Number(cotacoes.value) || 0,
  });

  const formulario = () => {
    const avancar = el(doc, 'button', { type: 'button', class: 'gelic-ini-primario', 'data-gelic-acao': 'previa' }, 'Ver a prévia');
    avancar.addEventListener('click', async () => {
      if (!objeto.value.trim()) return mostrar('Descreva o objeto da contratação.', true);
      if (!valorDe(tipo)) return mostrar('Escolha o tipo de processo.', true);
      avancar.toggleAttribute('disabled', true);
      try { await previa(respostas()); } finally { avancar.toggleAttribute('disabled', false); }
    });
    mostrar('Responda o básico: o resto a extensão preenche (e você confere antes de criar).');
    corpo.replaceChildren(
      campo(doc, 'Objeto da contratação', objeto, 'vira a especificação do processo e o objeto do DFD'),
      campo(doc, 'Via', via),
      el(doc, 'div', { class: 'gelic-ini-linha' }, campo(doc, 'Item do PCA', item, 'opcional'), campo(doc, 'Exercício', exercicio), buscarPca),
      el(doc, 'div', { class: 'gelic-ini-linha' }, campo(doc, 'Valor estimado (R$)', valor), campo(doc, 'Data pretendida', data)),
      el(doc, 'div', { class: 'gelic-ini-linha' }, campo(doc, 'Termos de cientificação', termos), campo(doc, 'Cotações', cotacoes)),
      campo(doc, 'Tipo de processo no SEI', tipo),
      ...(deps.assuntos ? [
        el(doc, 'div', { class: 'gelic-ini-linha' }, campo(doc, 'Classificação por assunto', termoAssunto), buscarAssunto),
        // a nota muda com o tipo: vai dentro do campo, como as notas fixas
        (() => { const c = campo(doc, 'Assunto', assunto); c.append(notaAssunto); return c; })(),
      ] : []),
      el(doc, 'div', { class: 'gelic-ini-botoes' }, avancar),
    );
  };

  // ---- 2. prévia
  /** Cada prévia tem a sua geração: a resposta do PCA que chega depois de outra prévia (ou da criação) é descartada. */
  let geracao = 0;
  let notaVinculo: string | null = null;
  /** O processo criado neste diálogo: nunca se cria um segundo. */
  let criado: ProcessoCriado | null = null;
  /** Só o tempo da automação: a pausa em que a pessoa escolhe o tipo de documento não conta. */
  const agora = deps.agora ?? Date.now;
  let gasto = 0;
  const previa = async (r: Respostas) => {
    const minha = ++geracao;
    const pecas = arvoreInicial(r);
    // o assunto: o escolhido ou, sem ele, os do tipo; sem nenhum dos dois o SEI recusaria: não avança
    const escolhido = assuntoEscolhido();
    let linhaAssunto: string | null = null;
    if (deps.assuntos) {
      const doTipo = escolhido ? [] : await sugeridosDo(valorDe(tipo));
      if (minha !== geracao || emAndamento || criado || !caixa.isConnected) return;
      if (!escolhido && !doTipo.length) { mostrar('Escolha a classificação por assunto: o tipo de processo não traz assunto, e o SEI a exige. Busque pelo código ou por uma palavra.', true); return; }
      linhaAssunto = `Classificação por assunto: ${escolhido ? escolhido.nome : doTipo.map(a => a.nome).join('; ')}`;
    }
    // o vínculo só acontece se esta prévia o anunciou: a decisão vai presa no botão "Criar no SEI"
    let vincular = false;
    let linhaPca: string | null = null;
    if (r.item_pca && r.exercicio) {
      const nome = `item ${r.item_pca}/${r.exercicio}`;
      if (!deps.vincular || !deps.podeVincular) linhaPca = `O PCA não está ligado: depois de criado, vincule o processo ao ${nome} no PCA.`;
      else {
        mostrar('Conferindo a permissão no PCA…');
        const p = await deps.podeVincular();
        if (minha !== geracao || emAndamento || criado || !caixa.isConnected) return;
        vincular = p.pode;
        linhaPca = p.pode ? `Depois de criado, o nº do processo é vinculado ao ${nome} no PCA.` : `O processo não será vinculado ao ${nome} no PCA: ${p.motivo}.`;
      }
    }
    const criar = el(doc, 'button', { type: 'button', class: 'gelic-ini-primario', 'data-gelic-acao': 'criar' }, 'Criar no SEI');
    const voltar = el(doc, 'button', { type: 'button', 'data-gelic-acao': 'voltar' }, 'Voltar');
    voltar.addEventListener('click', formulario);
    criar.addEventListener('click', () => void executar(r, pecas, { vincular, assunto: escolhido }));
    mostrar('Confira: o processo e as peças abaixo serão criados no SEI, nesta ordem. Nada é assinado.');
    corpo.replaceChildren(
      el(doc, 'p', {}, `Processo: ${tipo.querySelector(`option[value="${valorDe(tipo)}"]`)?.textContent ?? ''} — "${especificacao(r.objeto)}" · interessado: CFC · público`),
      ...(linhaAssunto ? [el(doc, 'p', { 'data-gelic-assunto': 'previa' }, linhaAssunto)] : []),
      ...(linhaPca ? [el(doc, 'p', { 'data-gelic-pca': 'vinculo' }, linhaPca)] : []),
      ...(avisoUnidade && r.item_pca ? [el(doc, 'p', { class: 'gelic-ini-aviso', 'data-gelic-pca': 'unidade' }, avisoUnidade)] : []),
      el(doc, 'ol', { class: 'gelic-ini-pecas' }, ...pecas.map(p => el(doc, 'li', { 'data-externo': String(p.externo) }, p.nomeArvore,
        el(doc, 'small', {}, p.externo ? ' — externo, sem arquivo (anexe o PDF depois)' : p.chave === 'dfd' ? ' — preenchido em seguida com as respostas' : ' — em branco')))),
      el(doc, 'div', { class: 'gelic-ini-botoes' }, voltar, criar),
    );
  };

  const paragrafoVinculo = () => notaVinculo
    ? [el(doc, 'p', { class: notaVinculo.startsWith('Vinculado') ? 'gelic-ini-ok' : 'gelic-ini-aviso', 'data-gelic-pca': 'vinculo' }, notaVinculo)] : [];

  // ---- 3. criação
  const executar = async (r: Respostas, pecas: PecaInicial[], o: { vincular?: boolean; assunto?: Opcao; tipos?: Record<string, string>; processo?: ProcessoCriado } = {}) => {
    let { processo } = o;
    const tiposEscolhidos = o.tipos;
    if (emAndamento || (criado && !processo)) return;
    emAndamento = true;
    const inicio = agora();
    corpo.replaceChildren();
    try {
      if (!processo) {
        mostrar('Criando o processo…');
        processo = criado = await deps.iniciar({ tipo: valorDe(tipo), especificacao: especificacao(r.objeto), ...(o.assunto ? { assunto: o.assunto } : {}) });
        await deps.guardarDfd(processo.protocolo, r).catch(() => {});
        // o assunto aceito pelo SEI fica lembrado para o tipo já agora: vale mesmo se uma peça falhar depois
        if (o.assunto) {
          lembrados.assuntos = { ...lembrados.assuntos, [valorDe(tipo)]: o.assunto };
          await deps.lembrar({ ...lembrados, tipoProcesso: valorDe(tipo) }).catch(() => {});
        }
        // logo depois do processo, antes das peças: o vínculo vale mesmo se uma peça falhar; erro nele não para nada
        notaVinculo = null;
        if (o.vincular && deps.vincular && r.item_pca && r.exercicio) {
          mostrar(`Processo ${processo.protocolo} criado. Vinculando ao item ${r.item_pca}/${r.exercicio} no PCA…`);
          try {
            await deps.vincular(processo.protocolo, r.item_pca, r.exercicio);
            notaVinculo = `Vinculado ao item ${r.item_pca}/${r.exercicio} no PCA.`;
          } catch (e) {
            notaVinculo = `Não vinculado no PCA: ${(e as Error).message}. Vincule o processo ao item ${r.item_pca}/${r.exercicio} no PCA.`;
          }
        }
      }
      const p = processo;
      let tipos = tiposEscolhidos;
      if (!tipos) {
        mostrar(`Processo ${p.protocolo} criado. Lendo os tipos de documento…`);
        const resolvido = resolverTipos(pecas, await deps.tiposDeDocumento(p.protocolo), lembrados.tipos);
        if (resolvido.pendentes.length) { gasto += agora() - inicio; return escolherTipos(r, pecas, p, resolvido.escolhidos, resolvido.pendentes); }
        tipos = resolvido.escolhidos;
      }
      await deps.lembrar({ ...lembrados, tipos: { ...lembrados.tipos, ...tipos }, tipoProcesso: valorDe(tipo) }).catch(() => {});
      const res = await criarPecas(p.protocolo, pecas, tipos, deps, (feitas, total, atual) => mostrar(`Processo ${p.protocolo}: criando ${feitas + 1} de ${total}${atual ? ` — ${atual}` : ''}…`));
      await deps.guardarVazios?.(p.protocolo, res.vazios).catch(() => {});
      gasto += agora() - inicio;
      resultado(p, res.criadas, res.erro, gasto);
    } catch (e) {
      mostrar(`Não foi possível ${processo ? `continuar no processo ${processo.protocolo}` : 'criar o processo'}: ${(e as Error).message}`, true);
      corpo.replaceChildren(...paragrafoVinculo(),
        el(doc, 'div', { class: 'gelic-ini-botoes' }, processo ? abrirBotao(processo) : null));
    } finally {
      emAndamento = false;
    }
  };

  const escolherTipos = (r: Respostas, pecas: PecaInicial[], p: ProcessoCriado, escolhidos: Record<string, string>, pendentes: Pendente[]) => {
    mostrar(`Processo ${p.protocolo} criado. Escolha o tipo de documento destas peças (fica lembrado para as próximas vezes):`);
    const selects = pendentes.map(x => {
      const s = el(doc, 'select', { 'data-gelic-tipo': chaveDoTipo(x) }, el(doc, 'option', { value: '' }, 'escolha…'), ...x.opcoes.map(o => el(doc, 'option', { value: o.id }, o.nome))) as HTMLSelectElement;
      return { x, s };
    });
    const continuar = el(doc, 'button', { type: 'button', class: 'gelic-ini-primario', 'data-gelic-acao': 'continuar' }, 'Continuar');
    continuar.addEventListener('click', () => {
      if (selects.some(({ s }) => !valorDe(s))) return mostrar('Escolha o tipo de todas as peças.', true);
      void executar(r, pecas, { tipos: { ...escolhidos, ...Object.fromEntries(selects.map(({ x, s }) => [chaveDoTipo(x), valorDe(s)])) }, processo: p });
    });
    corpo.replaceChildren(...selects.map(({ x, s }) => campo(doc, `${x.nomeArvore} (${x.externo ? 'externo' : 'interno'})`, s)), el(doc, 'div', { class: 'gelic-ini-botoes' }, continuar));
  };

  // ---- 4. resultado
  const abrirBotao = (p: ProcessoCriado) => {
    const b = el(doc, 'button', { type: 'button', class: 'gelic-ini-primario', 'data-gelic-acao': 'abrir' }, `Abrir o processo ${p.protocolo}`);
    b.addEventListener('click', () => deps.abrirProcesso(p));
    return b;
  };
  const resultado = (p: ProcessoCriado, criadas: string[], erro: { peca: string; mensagem: string } | undefined, ms: number) => {
    mostrar(erro ? `Processo ${p.protocolo}: ${criadas.length} peça(s) criada(s); parou em "${erro.peca}" depois de ${duracao(ms)}: ${erro.mensagem}. Inclua o resto no SEI ou tente de novo pelo roteiro.`
      : `Processo ${p.protocolo} criado com ${criadas.length} peças em ${duracao(ms)}. Abra o processo e preencha o DFD pelo roteiro do selo.`, !!erro);
    corpo.replaceChildren(
      ...p.avisos.map(a => el(doc, 'p', { class: 'gelic-ini-aviso' }, a)),
      ...paragrafoVinculo(),
      el(doc, 'ol', { class: 'gelic-ini-pecas' }, ...criadas.map(c => el(doc, 'li', {}, `✓ ${c}`))),
      el(doc, 'div', { class: 'gelic-ini-botoes' }, abrirBotao(p)),
    );
  };

  // ---- entrada pelo PCA (src/pca-site/): item travado; nº SEI já vinculado pergunta; unidade diferente para
  const fecharBotao = () => {
    const b = el(doc, 'button', { type: 'button', 'data-gelic-acao': 'fechar' }, 'Fechar');
    b.addEventListener('click', () => caixa.remove());
    return b;
  };
  const parar = (texto: string) => { mostrar(texto, true); corpo.replaceChildren(el(doc, 'div', { class: 'gelic-ini-botoes' }, fecharBotao())); };
  const peloPca = async ({ item_pca: n, exercicio: ano }: PedidoPca) => {
    item.value = String(n);
    exercicio.value = String(ano);
    item.setAttribute('readonly', '');
    exercicio.setAttribute('readonly', '');
    if (!deps.itemDoPca) return parar('O PCA não está ligado nesta extensão: configure o PCA e clique de novo no item.');
    mostrar(`Consultando o item ${n}/${ano} no PCA…`);
    let i: ItemDoPca | null;
    try { i = await deps.itemDoPca(n, ano); } catch (e) { return parar(`PCA: ${(e as Error).message}. Tente de novo pelo PCA.`); }
    if (!i) return parar(`O item ${n}/${ano} não foi encontrado no PCA.`);
    const aqui = deps.unidadeAtual?.() ?? null;
    // sem a sigla do SEI (unidade do PCA sem mapeamento) não há para onde mandar trocar: fica o aviso de aplicarItem
    if (i.unidade_sei && i.unidade && aqui && i.unidade.toUpperCase() !== aqui.toUpperCase())
      return parar(`O item ${n}/${ano} é da unidade ${i.unidade}, e você está na ${aqui}. Troque para a ${i.unidade} no SEI e clique de novo em "Iniciar processo" no PCA.`);
    const texto = aplicarItem(i, n, ano);
    // sem a unidade atual (cabeçalho do SEI ilegível): não bloqueia ninguém às cegas, mas a prévia pede para conferir
    if (!aqui && i.unidade) avisoUnidade = `Não foi possível ler a unidade atual do SEI: confira se está na ${i.unidade} antes de criar.`;
    const seguir = () => { formulario(); mostrar(texto, !!avisoUnidade); };
    if (i.numeros_sei?.length) {
      const varios = i.numeros_sei.length > 1;
      mostrar(`O item ${n}/${ano} já tem ${varios ? 'os processos' : 'o processo'} ${i.numeros_sei.join(', ')} no PCA. Iniciar outro processo para o mesmo item?`, true);
      const outro = el(doc, 'button', { type: 'button', class: 'gelic-ini-primario', 'data-gelic-acao': 'iniciar-outro' }, 'Iniciar outro processo');
      outro.addEventListener('click', seguir);
      corpo.replaceChildren(el(doc, 'div', { class: 'gelic-ini-botoes' }, fecharBotao(), outro));
      return;
    }
    seguir();
  };

  if (o.pelo) await peloPca(o.pelo);
  else formulario();
  return caixa;
}
