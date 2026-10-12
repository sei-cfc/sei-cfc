/**
 * O selo da Gelic no topo da árvore do processo: a etapa num relance e, ao abrir, o porquê,
 * o próximo passo e os documentos que a regra reconheceu.
 *
 * Só nós de texto (nada de innerHTML com título de documento). O documento é passado
 * explicitamente: o selo é desenhado no quadro da árvore e testado com linkedom.
 */
import type { Resumo } from '../regras/resumo';
import { CATALOGOS, pedidoDeDocumento, sugeridos, type Catalogo, type DocumentoGelic } from '../documentos/catalogo';
import { PERFIS_MANIFESTO } from '../empacotamento/manifesto';
import { perfilAtual, type Perfil } from '../perfil';
import { ACOES, BOTOES_DO_PERFIL, pedirAoAgente } from './acoes';
import { NOTA_ONDE, roteiro, type DocRoteiro, type PassoRoteiro } from '../peca/roteiro';
import { abrirPeca } from '../peca/abrir';

export const ID = 'gelic-selo';
const CHAVE_ABERTO = 'gelic_selo_aberto';

/** O que muda no selo de um perfil para outro (os botões ficam em acoes.ts, o catálogo em documentos/catalogo.ts). */
const TEXTOS: Readonly<Record<Perfil, { sobre: string; inicial: string; rotulo: string; nota: string }>> = {
  gelic: { sobre: 'Gelic', inicial: 'G', rotulo: 'Etapa da contratação (Gelic)', nota: 'Calculado só pelos títulos e pela ordem dos documentos, com as regras da skill gelic. Confira nos autos antes de decidir.' },
  cfc: { sobre: 'Etapa da contratação', inicial: 'C', rotulo: 'Etapa da contratação (SEI CFC)', nota: 'Calculado só pelos títulos e pela ordem dos documentos, com as regras do rito de contratações do CFC. Confira nos autos antes de decidir.' },
};

export type EstadoSelo =
  | { tipo: 'carregando' }
  | { tipo: 'sigiloso' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'resumo'; resumo: Resumo; protocolo: string; docs?: readonly DocRoteiro[]; /** Internas criadas em branco pelo Iniciar processo. */ vazios?: readonly { chave: string; numero: string }[] };

export interface OpcoesSelo {
  /**
   * Abre a janela do formulário das peças (perfil cfc). O padrão abre como ABA na mesma janela do navegador, nunca
   * popup: a ponte do agente só enxerga as abas do SEI da mesma janela (src/peca/abrir.ts).
   */
  abrirJanela?: (modelo: string, protocolo: string, documento?: string) => void;
}
/** Extensão recarregada com o SEI aberto: o runtime some, e o clique avisa em vez de não fazer nada. */
function abrirComoAba(modelo: string, protocolo: string, documento?: string): void {
  try {
    const rt = globalThis.chrome?.runtime;
    if (!rt?.id) throw new Error('sem runtime');
    abrirPeca((url, alvo) => window.open(rt.getURL(url), alvo), modelo, protocolo, documento);
  } catch {
    window.alert('O SEI CFC foi atualizado: recarregue esta página do SEI (F5) e clique de novo.');
  }
}

type Filho = Node | string | null | undefined | false;
function el(doc: Document, tag: string, attrs: Record<string, string> = {}, ...filhos: Filho[]): HTMLElement {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const f of filhos) if (f) e.append(typeof f === 'string' ? doc.createTextNode(f) : f);
  return e;
}

function lerAberto(doc: Document): boolean {
  try {
    return doc.defaultView?.sessionStorage.getItem(CHAVE_ABERTO) === '1';
  } catch {
    return false;
  }
}
function gravarAberto(doc: Document, aberto: boolean): void {
  try {
    doc.defaultView?.sessionStorage.setItem(CHAVE_ABERTO, aberto ? '1' : '0');
  } catch {
    /* sem sessionStorage: o selo só não lembra */
  }
}

/** A logo do perfil (Gelic: carimbo com o G e o visto; CFC: o símbolo do CFC); fora da extensão (testes), a inicial. */
function marca(doc: Document, perfil: Perfil): HTMLElement {
  const url = globalThis.chrome?.runtime?.getURL?.(PERFIS_MANIFESTO[perfil].logoSelo);
  if (!url) return el(doc, 'span', { class: 'gelic-marca', 'aria-hidden': 'true' }, TEXTOS[perfil].inicial);
  return el(doc, 'img', { class: 'gelic-marca gelic-logo', src: url, alt: '', width: '22', height: '22' });
}

function cabecalho(doc: Document, titulo: string, aberto: boolean | null, perfil: Perfil): HTMLElement {
  const b = el(doc, aberto === null ? 'div' : 'button', aberto === null ? { class: 'gelic-cab' } : { class: 'gelic-cab', type: 'button', 'aria-expanded': String(aberto), 'aria-controls': `${ID}-detalhe` },
    marca(doc, perfil),
    el(doc, 'span', { class: 'gelic-textos' }, el(doc, 'span', { class: 'gelic-sobre' }, TEXTOS[perfil].sobre), el(doc, 'span', { class: 'gelic-nome' }, titulo)),
    aberto === null ? null : el(doc, 'span', { class: 'gelic-seta', 'aria-hidden': 'true' }, aberto ? '▴' : '▾'),
  );
  return b;
}

/** dfd → DFD; despacho_reserva → despacho reserva. */
const siglaDoTipo = (tipo: string) => (tipo.length <= 4 ? tipo.toUpperCase() : tipo.replaceAll('_', ' '));

function detalhe(doc: Document, r: Resumo, perfil: Perfil): HTMLElement {
  const sec = (rotulo: string, ...conteudo: Filho[]) => el(doc, 'div', { class: 'gelic-sec' }, el(doc, 'div', { class: 'gelic-rot' }, rotulo), ...conteudo);
  const lista = (itens: Filho[]) => el(doc, 'ul', { class: 'gelic-lista' }, ...itens.map(i => el(doc, 'li', {}, i)));
  const proximo = sec('Próximo passo', el(doc, 'p', {}, r.proximo), r.opcoes.length ? lista(r.opcoes) : null);
  proximo.id = `${ID}-proximo`;
  proximo.setAttribute('tabindex', '-1');
  return el(doc, 'div', { class: 'gelic-detalhe', id: `${ID}-detalhe` },
    el(doc, 'p', { class: 'gelic-desc' }, r.descricao),
    proximo,
    r.decisivos.length ? sec('Por que esta etapa', lista(r.decisivos)) : null,
    sec(`Documentos reconhecidos (${r.documentosChave.length})`,
      r.documentosChave.length
        ? lista(r.documentosChave.map(d => el(doc, 'span', {}, el(doc, 'span', { class: 'gelic-tipo' }, siglaDoTipo(d.tipo)), ` ${d.titulo}${d.numero ? ` (${d.numero})` : ''}`)))
        : el(doc, 'p', {}, 'Nenhum título reconhecido pelas regras.')),
    el(doc, 'p', { class: 'gelic-nota' }, TEXTOS[perfil].nota),
  );
}

/** Seletor de documentos: os sugeridos pela etapa no topo, depois todos os do catálogo do perfil, por grupo. */
function seletor(doc: Document, r: Resumo, catalogo: Catalogo, escolher: (d: DocumentoGelic) => void): HTMLElement {
  const item = (d: DocumentoGelic) => {
    const b = el(doc, 'button', { type: 'button', class: 'gelic-doc', 'data-documento': d.id, title: `Tipo no SEI: ${d.tipoSei.tipo}${d.tipoSei.nomeArvore ? ` — "${d.tipoSei.nomeArvore}"` : ''}` }, d.nome);
    b.addEventListener('click', () => escolher(d));
    return b;
  };
  const painel = el(doc, 'div', { class: 'gelic-docs', id: `${ID}-docs`, role: 'group', 'aria-label': 'Documentos da Gelic' });
  const sug = sugeridos(r, catalogo);
  if (sug.length) painel.append(el(doc, 'div', { class: 'gelic-grupo gelic-sugeridos' }, el(doc, 'div', { class: 'gelic-rot' }, 'Sugeridos para esta etapa'), ...sug.map(item)));
  // Peça sem modelo (ETP, mapa de riscos no cfc) aparece só como nota: não é botão, não gera pedido.
  const semModelo = (d: DocumentoGelic) => el(doc, 'p', { class: 'gelic-nota gelic-indisponivel', 'data-indisponivel': d.id }, `${d.nome} — ${d.indisponivel}`);
  for (const g of catalogo.grupos) {
    const todos = catalogo.documentos.filter(d => d.grupo === g);
    const docs = todos.filter(d => !d.indisponivel);
    painel.append(el(doc, 'details', { class: 'gelic-grupo' }, el(doc, 'summary', {}, `${g} (${docs.length})`),
      ...(todos.length ? todos.map(d => (d.indisponivel ? semModelo(d) : item(d))) : [el(doc, 'p', { class: 'gelic-nota gelic-vazio' }, catalogo.aviso ?? 'Nenhum documento neste grupo.')])));
  }
  painel.hidden = true;
  return painel;
}

/**
 * Botões que abrem o agente com o pedido, o "Próximo passo" (local, sem IA) e o "Gerar documento", que abre o
 * seletor. Só os do perfil (BOTOES_DO_PERFIL), na ordem dele.
 */
function acoes(doc: Document, r: Resumo, protocolo: string, aoPedir: (pedido: string) => void, mostrarProximo: () => void, perfil: Perfil, abrirJanela: (modelo: string, protocolo: string, documento?: string) => void): HTMLElement[] {
  const catalogo = CATALOGOS[perfil];
  const barra = el(doc, 'div', { class: 'gelic-acoes', role: 'group', 'aria-label': perfil === 'gelic' ? 'Ações Gelic com o Agente de IA' : 'Ações do SEI CFC' });
  const botao = (id: string, rotulo: string, dica: string, destaque = false) =>
    el(doc, 'button', { type: 'button', class: destaque ? 'gelic-acao gelic-acao-destaque' : 'gelic-acao', title: dica, 'data-acao': id }, rotulo);
  const painel = seletor(doc, r, catalogo, d => {
    fechar();
    // No CFC a peça abre o formulário (janela da extensão); na Gelic, o pedido vai ao agente.
    if (perfil === 'cfc' && d.modelo) abrirJanela(d.modelo, protocolo);
    else aoPedir(pedidoDeDocumento(d, protocolo, r.nome));
  });
  const dica = perfil === 'cfc' ? 'Escolha a peça: o formulário abre numa aba, já preenchido com o que os autos dizem; nada é gravado sem a sua aprovação'
    : 'Escolha o documento: o agente lê os autos e prepara; nada é gravado sem a sua aprovação';
  const gerar = botao('documento', 'Gerar documento ▾', dica, sugeridos(r, catalogo).length > 0);
  gerar.setAttribute('aria-expanded', 'false');
  gerar.setAttribute('aria-controls', painel.id);
  function fechar() {
    painel.hidden = true;
    gerar.setAttribute('aria-expanded', 'false');
  }
  gerar.addEventListener('click', () => {
    painel.hidden = !painel.hidden;
    gerar.setAttribute('aria-expanded', String(!painel.hidden));
    if (!painel.hidden) painel.querySelector<HTMLButtonElement>('button')?.focus();
  });
  painel.addEventListener('keydown', e => {
    if ((e as KeyboardEvent).key === 'Escape') {
      fechar();
      gerar.focus();
    }
  });
  const botoes = BOTOES_DO_PERFIL[perfil].map(id => {
    if (id === 'documento') return gerar;
    const a = ACOES.find(x => x.id === id)!;
    const b = botao(a.id, a.rotulo, a.dica);
    b.addEventListener('click', () => (a.local ? mostrarProximo() : aoPedir(a.pedido(protocolo, r.nome))));
    return b;
  });
  barra.append(...botoes);
  return [barra, painel];
}

/**
 * Roteiro da instrução (só no cfc): uma linha sempre visível com o andamento e a próxima peça (botão "Preencher"
 * quando ela tem formulário), e a lista das peças no detalhe.
 */
function linhaDoRoteiro(doc: Document, passos: readonly PassoRoteiro[], proxima: PassoRoteiro | null, completa: boolean, protocolo: string, abrirJanela: (modelo: string, protocolo: string, documento?: string) => void, vazio?: string): HTMLElement {
  const obrig = passos.filter(p => p.obrigatoria);
  const feitas = obrig.filter(p => p.feito).length;
  const linha = el(doc, 'div', { class: 'gelic-roteiro', role: 'status' },
    el(doc, 'span', { class: 'gelic-andamento' }, `Instrução: ${feitas} de ${obrig.length} peças obrigatórias`));
  if (completa) {
    linha.append(el(doc, 'span', { class: 'gelic-completa' }, ' · Instrução completa'));
    linha.setAttribute('data-completa', '1');
  }
  if (proxima) {
    linha.append(el(doc, 'span', { class: 'gelic-proxima' }, ` · Próxima peça: ${proxima.rotulo}`));
    if (proxima.modelo) {
      const b = el(doc, 'button', { type: 'button', class: 'gelic-preencher', 'data-gelic-preencher': proxima.chave, title: 'Abre o formulário da peça numa aba' }, 'Preencher');
      // peça vazia já na árvore (Iniciar processo): o formulário grava nela
      b.addEventListener('click', () => abrirJanela(proxima.chave, protocolo, vazio));
      linha.append(' ', b);
    } else {
      linha.append(el(doc, 'span', { class: 'gelic-nota-curta' }, ` (${NOTA_ONDE[proxima.onde]})`));
    }
  }
  return linha;
}
function textoDoPasso(p: PassoRoteiro): string {
  const onde = p.onde === 'formulario' ? '' : `; ${NOTA_ONDE[p.onde]}`;
  if (p.feito) return p.numero ? ` (${p.numero})` : '';
  if (p.estado === 'em_elaboracao') return ` — em elaboração${p.numero ? ` (${p.numero}, sem assinatura)` : ''}${p.quantos ? onde : ''}`;
  return ` — falta${p.obrigatoria ? '' : ' (conforme o caso)'}${onde}`;
}
function passosDoRoteiro(doc: Document, passos: readonly PassoRoteiro[]): HTMLElement {
  return el(doc, 'div', { class: 'gelic-sec' }, el(doc, 'div', { class: 'gelic-rot' }, 'Roteiro da instrução'),
    el(doc, 'ul', { class: 'gelic-lista gelic-passos' }, ...passos.map(p => el(doc, 'li', { class: 'gelic-passo', 'data-feito': String(p.feito) },
      el(doc, 'span', { class: 'gelic-visto', 'aria-hidden': 'true' }, p.feito ? '✓' : p.estado === 'em_elaboracao' ? '◐' : '○'),
      ` ${p.rotulo}`,
      p.quantos ? ` (${p.quantos.tem} de ${p.quantos.minimo})` : '',
      textoDoPasso(p),
    ))));
}

/** Desenha (ou redesenha) o selo no documento da árvore. Devolve o elemento. */
export function desenharSelo(doc: Document, estado: EstadoSelo, aoPedir: (pedido: string) => void = pedirAoAgente, perfil: Perfil = perfilAtual(), o: OpcoesSelo = {}): HTMLElement {
  const abrirJanela = o.abrirJanela ?? abrirComoAba;
  let raiz = doc.getElementById(ID);
  if (!raiz) {
    raiz = el(doc, 'section', { id: ID, 'aria-label': TEXTOS[perfil].rotulo });
    const alvo = doc.getElementById('container');
    if (alvo) alvo.prepend(raiz);
    else doc.body.prepend(raiz);
  }
  raiz.replaceChildren();
  raiz.removeAttribute('data-tom');
  if (estado.tipo === 'carregando') {
    raiz.append(cabecalho(doc, 'Calculando a etapa…', null, perfil));
    raiz.setAttribute('data-tom', 'espera');
    return raiz;
  }
  if (estado.tipo === 'sigiloso') {
    raiz.append(cabecalho(doc, 'Processo sigiloso: etapa não calculada', null, perfil));
    raiz.setAttribute('data-tom', 'fora');
    return raiz;
  }
  if (estado.tipo === 'erro') {
    raiz.append(cabecalho(doc, `Etapa não calculada: ${estado.mensagem}`, null, perfil));
    raiz.setAttribute('data-tom', 'fora');
    return raiz;
  }
  const r = estado.resumo;
  const aberto = lerAberto(doc);
  const cab = cabecalho(doc, r.nome, aberto, perfil);
  const det = detalhe(doc, r, perfil);
  det.hidden = !aberto;
  const abrir = (agora: boolean) => {
    det.hidden = !agora;
    cab.setAttribute('aria-expanded', String(agora));
    cab.querySelector('.gelic-seta')!.textContent = agora ? '▴' : '▾';
    gravarAberto(doc, agora);
  };
  cab.addEventListener('click', () => abrir(det.hidden));
  // "Próximo passo" sem IA: abre o detalhe e leva o foco à seção (a resposta já está calculada)
  const mostrarProximo = () => {
    abrir(true);
    const alvo = det.querySelector<HTMLElement>(`#${ID}-proximo`);
    alvo?.scrollIntoView?.({ block: 'nearest' });
    alvo?.focus?.();
  };
  raiz.setAttribute('data-perfil', perfil);
  raiz.setAttribute('data-tom', r.tom);
  raiz.setAttribute('data-etapa', r.etapa ?? '');
  cab.title = r.descricao;
  const extras: HTMLElement[] = [];
  if (perfil === 'cfc' && estado.docs) {
    const rot = roteiro(estado.docs);
    // o formulário só grava numa peça que a extensão criou em branco e que continua na árvore, sem assinatura
    const naArvore = new Map((estado.docs ?? []).map(d => [d.numero, d]));
    const vazio = rot.proxima ? estado.vazios?.find(v => v.chave === rot.proxima!.chave && naArvore.has(v.numero) && naArvore.get(v.numero)!.assinado === false)?.numero : undefined;
    extras.push(linhaDoRoteiro(doc, rot.passos, rot.proxima, rot.completa, estado.protocolo, abrirJanela, vazio));
    det.insertBefore(passosDoRoteiro(doc, rot.passos), det.querySelector(`#${ID}-proximo`)?.nextSibling ?? null);
  }
  raiz.append(cab, ...acoes(doc, r, estado.protocolo, aoPedir, mostrarProximo, perfil, abrirJanela), ...extras, det);
  return raiz;
}
