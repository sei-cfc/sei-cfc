/**
 * As telas do SEI do "Iniciar processo", pela sessão do usuário (content script, no Controle de Processos). O
 * `sei-nucleo` é usado como biblioteca: `Formulario`, `Sei.ajax`, `criarDocumento`. Iniciar processo e incluir
 * documento externo sem arquivo não existem no núcleo; o caminho segue o que o próprio SEI Pro já faz em produção:
 * - processo: `dist/js/sei-pro-proc-lote.js` (lista de tipos, `#frmProcedimentoCadastro`, sucesso por
 *   `procedimento_trabalhar&acao_origem=procedimento_gerar`, protocolo no `<title>`);
 * - externo: `ferramentas-pdf/src/ponte/enviarDocumento.ts` (`documento_receber`, `#frmDocumentoCadastro`, sucesso por
 *   `acao_origem=documento_receber`), aqui sem anexo.
 * Não conferido no SEI real (decisão do usuário): os testes usam telas sintéticas nesse formato.
 */
import { acaoNaArvore } from '../../../sei-nucleo/src/dominio/arvore';
import { criarDocumento } from '../../../sei-nucleo/src/dominio/documento';
import { Formulario, normalizar } from '../../../sei-nucleo/src/formulario/formulario';
import { parametros } from '../../../sei-nucleo/src/links/links';
import { textoDe } from '../../../sei-nucleo/src/sessao/dom';
import { ErroSei } from '../../../sei-nucleo/src/sessao/erros';
import type { Pagina } from '../../../sei-nucleo/src/sessao/http';
import type { Sei } from '../../../sei-nucleo/src/sei';

export interface Opcao { id: string; nome: string }
interface TipoProcesso extends Opcao { href: string }

const decodificar = (s: string) => s.replace(/&amp;/g, '&');

// ---------------------------------------------------------------- tipo de processo

async function listaDeTiposDeProcesso(sei: Sei, sinal?: AbortSignal): Promise<Pagina> {
  const pagina = await sei.http.obter(sei.linkMenu('procedimento_escolher_tipo'), { sinal });
  // O SEI 4.1 abre só os tipos mais usados; "T" lista todos (o mesmo do lote de processos do SEI Pro).
  const form = Formulario.de(pagina, '#frmProcedimentoEscolherTipo, #frmIniciarProcessoEscolhaTipo', sei.http);
  if (!form.tem('hdnFiltroTipoProcedimento') || form.valor('hdnFiltroTipoProcedimento') === 'T') return pagina;
  return form.definir({ hdnFiltroTipoProcedimento: 'T' }).enviar({ sinal });
}

function lerTiposDeProcesso(p: Pagina): TipoProcesso[] {
  const vistos = new Map<string, TipoProcesso>();
  for (const a of p.doc.querySelectorAll('a[href*="procedimento_escolher_tipo"][href*="id_tipo_procedimento="]')) {
    const href = decodificar(a.getAttribute('href') ?? '');
    const id = parametros(href).get('id_tipo_procedimento');
    const nome = textoDe(a);
    if (id && nome && !vistos.has(id)) vistos.set(id, { id, nome, href });
  }
  return [...vistos.values()];
}

export async function tiposDeProcesso(sei: Sei, sinal?: AbortSignal): Promise<Opcao[]> {
  return lerTiposDeProcesso(await listaDeTiposDeProcesso(sei, sinal)).map(({ id, nome }) => ({ id, nome }));
}

// ---------------------------------------------------------------- interessado

/** O contato do CFC no autocompletar de interessados da tela (sigla "CFC" ou o nome por extenso). */
async function contatoCfc(sei: Sei, form: Formulario, sinal?: AbortSignal): Promise<Opcao | null> {
  const ajax = /controlador_ajax\.php\?acao_ajax=contato_auto_completar[^'"]*/.exec(form.pagina.html)?.[0];
  if (!ajax) return null;
  const itens = await sei.ajax(decodificar(ajax), [['palavras_pesquisa', 'CFC']], { sinal });
  const nome = (t: string) => normalizar(t);
  // um só contato que seja o próprio CFC (sigla sozinha, "CFC - Conselho Federal…" ou o nome): mais de um, não escolhe
  const exatos = itens.filter(i => nome(i.texto) === 'cfc' || /^cfc - conselho federal de contabilidade/.test(nome(i.texto)) || nome(i.texto) === 'conselho federal de contabilidade');
  return exatos.length === 1 ? { id: exatos[0].id, nome: exatos[0].texto } : null;
}

// ---------------------------------------------------------------- iniciar processo

export interface NovoProcesso {
  /** Id do tipo de processo (escolhido na lista do SEI). */
  tipo: string;
  especificacao: string;
}
export interface ProcessoCriado { protocolo: string; idProcedimento: string; avisos: string[]; /** A tela do processo novo (o SEI redireciona para ela). */ url?: string }

export async function iniciarProcesso(sei: Sei, novo: NovoProcesso, sinal?: AbortSignal): Promise<ProcessoCriado> {
  const tipos = lerTiposDeProcesso(await listaDeTiposDeProcesso(sei, sinal));
  const tipo = tipos.find(t => t.id === novo.tipo);
  if (!tipo) throw new ErroSei('ARGUMENTO_INVALIDO', `O tipo de processo ${novo.tipo} não está disponível na sua unidade.`, tipos.map(t => t.nome).join(' | '));
  const form = await Formulario.abrir(sei.http, tipo.href, '#frmProcedimentoCadastro', { sinal });

  const avisos: string[] = [];
  form.definir({
    txtDescricao: novo.especificacao.slice(0, 100),
    rdoNivelAcesso: '0',
    hdnFlagProcedimentoCadastro: '2',
    rdoProtocolo: 'M',
    txaObservacoes: '',
  });
  // O SEI exige os assuntos do tipo; o hdn vem vazio e quem o preenche é o JS da tela, no envio (lote do SEI Pro).
  const lupa = (select: string, itens: { id: string; texto: string }[]) => {
    try { form.definirLupa(select, itens); } catch { avisos.push(`A tela não tem a lista ${select} esperada: confira no SEI.`); }
  };
  if (!form.itensLupa('selAssuntos').length) {
    const assuntos = form.opcoes('selAssuntos').filter(o => o.valor).map(o => ({ id: o.valor, texto: o.texto }));
    if (assuntos.length) lupa('selAssuntos', assuntos);
  }
  // Interessado: o CFC (decisão do usuário), somado aos que o tipo já traz.
  // como o lote do SEI Pro: o hdn pode vir vazio, e os interessados do tipo estão nas opções do select
  const interessados = form.itensLupa('selInteressados').length ? form.itensLupa('selInteressados') : form.opcoes('selInteressados').filter(o => o.valor).map(o => ({ id: o.valor, texto: o.texto }));
  const cfc = await contatoCfc(sei, form, sinal);
  if (!cfc) avisos.push('O contato "CFC" não foi encontrado na lista de interessados: inclua-o no processo, no SEI.');
  else if (!interessados.some(i => i.id === cfc.id)) lupa('selInteressados', [...interessados, { id: cfc.id, texto: cfc.nome }]);

  const resposta = await form.enviar({
    sinal,
    operacao: 'a criação do processo',
    sucesso: p => /acao=procedimento_trabalhar/.test(p.url) && /acao_origem=procedimento_gerar/.test(p.url),
  });
  // o id na URL ou, como o lote do SEI Pro, no quadro da árvore da tela do processo
  const doQuadro = resposta.doc.querySelector('#ifrArvore')?.getAttribute('src') ?? '';
  const idProcedimento = parametros(resposta.url).get('id_procedimento') ?? parametros(decodificar(doQuadro)).get('id_procedimento') ?? '';
  const protocolo = textoDe(resposta.doc.querySelector('title')).split(' - ').pop()?.trim() ?? '';
  if (!idProcedimento || !/\d/.test(protocolo)) throw new ErroSei('SEI_RESPOSTA_INESPERADA', 'O SEI aceitou o pedido, mas não devolveu o número: o processo PODE ter sido criado. Confira no Controle de Processos antes de tentar de novo.');
  return { protocolo, idProcedimento, avisos, url: resposta.url };
}

// ---------------------------------------------------------------- documentos

async function telaEscolherTipoDocumento(sei: Sei, refProcesso: string, sinal?: AbortSignal): Promise<Formulario> {
  const arv = await sei.arvore(refProcesso, { sinal });
  const link = acaoNaArvore(arv, 'documento_escolher_tipo');
  if (!link) throw new ErroSei('SEI_ACAO_INDISPONIVEL', `Não é possível incluir documento no processo ${arv.protocolo}.`);
  let form = await Formulario.abrir(sei.http, link, '#frmDocumentoEscolherTipo', { sinal });
  if (form.tem('hdnFiltroSerie') && form.valor('hdnFiltroSerie') !== 'T') form = Formulario.de(await form.definir({ hdnFiltroSerie: 'T' }).enviar({ sinal }), '#frmDocumentoEscolherTipo', sei.http);
  return form;
}

/** A tela do documento externo (a opção "Externo" da escolha de tipo: link `documento_receber` ou série -1). */
async function telaExterno(sei: Sei, refProcesso: string, sinal?: AbortSignal): Promise<Formulario> {
  const escolha = await telaEscolherTipoDocumento(sei, refProcesso, sinal);
  const link = escolha.pagina.doc.querySelector('a[href*="acao=documento_receber"]')?.getAttribute('href');
  const pagina = link ? await sei.http.obter(decodificar(link), { sinal }) : await escolha.definir({ hdnIdSerie: '-1' }).enviar({ sinal });
  return Formulario.de(pagina, '#frmDocumentoCadastro', sei.http);
}

function lerTiposInternos(p: Pagina): Opcao[] {
  const vistos = new Map<string, string>();
  for (const a of p.doc.querySelectorAll("[onclick*='escolher(']")) {
    const id = /escolher\((-?\d+)\)/.exec(a.getAttribute('onclick') ?? '')?.[1];
    if (id && id !== '-1' && !vistos.has(id)) vistos.set(id, textoDe(a));
  }
  return [...vistos].filter(([, nome]) => nome).map(([id, nome]) => ({ id, nome }));
}

/** Os tipos de documento do processo: os internos (escolha de tipo) e os externos (a lista da tela do externo). */
export async function tiposDeDocumento(sei: Sei, refProcesso: string, sinal?: AbortSignal): Promise<{ internos: Opcao[]; externos: Opcao[] }> {
  const internos = lerTiposInternos((await telaEscolherTipoDocumento(sei, refProcesso, sinal)).pagina);
  const externos = (await telaExterno(sei, refProcesso, sinal)).opcoes('selSerie').filter(o => o.valor && o.valor !== 'null').map(o => ({ id: o.valor, nome: o.texto }));
  return { internos, externos };
}

const hoje = (d = new Date()) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

export interface DocumentoCriado { idDocumento: string }

/** Inclui documento externo SEM arquivo (o SEI aceita): a unidade anexa o PDF depois. */
export async function incluirExternoVazio(sei: Sei, refProcesso: string, d: { tipo: string; nomeArvore: string; data?: Date }, sinal?: AbortSignal): Promise<DocumentoCriado> {
  const { idProcedimento } = await sei.arvore(refProcesso, { sinal });
  const form = await telaExterno(sei, refProcesso, sinal);
  if (!form.opcoes('selSerie').some(o => o.valor === d.tipo)) throw new ErroSei('ARGUMENTO_INVALIDO', `O tipo de documento externo ${d.tipo} não está disponível.`);
  form.definir({
    selSerie: d.tipo, hdnIdSerie: d.tipo,
    txtDataElaboracao: hoje(d.data),
    txtNumero: '', txtNomeArvore: d.nomeArvore.slice(0, 50),
    rdoFormato: 'N',
    rdoNivelAcesso: '0', hdnStaNivelAcessoLocal: '0',
    hdnFlagDocumentoCadastro: '2',
    hdnAnexos: '',
    txaObservacoes: '',
  });
  // a regra do enviarDocumento do SEI Pro: o SEI volta para a árvore; a própria tela redesenhada não é sucesso
  const resposta = await form.enviar({ sinal, operacao: 'a inclusão do documento externo', sucesso: p => /acao=arvore_visualizar/.test(p.url) && /acao_origem=documento_receber/.test(p.url) });
  sei.invalidar(idProcedimento);
  const idDocumento = parametros(resposta.url).get('id_documento') ?? '';
  if (!idDocumento) throw new ErroSei('SEI_RESPOSTA_INESPERADA', 'O SEI não devolveu o documento incluído: confira a árvore antes de tentar de novo.');
  return { idDocumento };
}

/** Documento interno em branco, pelo `criarDocumento` do núcleo. */
export async function incluirInterno(sei: Sei, refProcesso: string, d: { tipo: string; nomeArvore: string }, sinal?: AbortSignal): Promise<DocumentoCriado & { numero: string }> {
  const r = await criarDocumento(sei, refProcesso, { tipo: d.tipo, nomeArvore: d.nomeArvore.slice(0, 50) }, { aplicar: true, sinal });
  const dados = (r.dados ?? {}) as { idDocumento?: string; numero?: string };
  return { idDocumento: dados.idDocumento ?? '', numero: dados.numero ?? '' };
}
