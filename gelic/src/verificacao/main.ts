/**
 * Entrada da janela da verificação prévia (js/gelic/verificar.html?processo=<protocolo>), aberta pelo selo do SEI CFC.
 * Junta a ponte com a aba do SEI do processo, a IA configurada no agente e a rodada, e entrega a montarVerificacao.
 * Página da extensão: a chave de IA só é lida aqui.
 */
import { PontePainel } from '../../../agente-ia/src/ponte/cliente';
import { vinculoDaConfig } from '../pca/dfd';
import { completarDaConfig, contextoDaJanela, esperarAba, lerConfigAgente } from '../peca/contexto';
import { abrirConfigurarIa } from '../peca/abrir';
import { sincronizarResumo } from '../ia/guardado';
import { areaPadrao, lerUo } from '../peca/guardados';
import { guardarVerificacao, justificar, lerVerificacao, type Modo } from './estado';
import { montarVerificacao } from './pagina';
import { gravarChecklist, previaChecklist, rodarVerificacao } from './rodada';

const raiz = () => document.getElementById('gelic-peca')!;
function parar(texto: string): void {
  const h = document.createElement('h1');
  h.textContent = 'Verificação prévia';
  const p = document.createElement('p');
  p.className = 'gelic-status gelic-status-erro';
  p.textContent = texto;
  raiz().replaceChildren(h, p);
}

async function iniciar(): Promise<void> {
  const processo = new URLSearchParams(location.search).get('processo') ?? '';
  if (!processo) return parar('Abra a verificação pelo botão "Verificar antes de enviar" do selo, no processo.');
  document.title = `Verificação prévia · ${processo}`;
  const ponte = new PontePainel();
  await ponte.iniciar();
  if ((await esperarAba(ponte, processo)) === null) {
    return parar(`Abra o processo ${processo} no SEI (na árvore do processo) e clique de novo em "Verificar antes de enviar". Com esta janela aberta, o painel do Agente de IA fica sem o SEI até ela fechar.`);
  }
  const sinal = new AbortController();
  addEventListener('pagehide', () => sinal.abort());
  // A IA pode ser configurada com a janela aberta (em outra aba): `ia` muda e cada rodada lê a atual.
  let ia = await completarDaConfig(lerConfigAgente).catch(() => undefined);
  // o resumo sem segredo que o selo lê, em dia mesmo quando a chave foi posta pelo painel do agente
  const sincronizarIa = () => void lerConfigAgente().then(c => sincronizarResumo(areaPadrao(), c, new Date())).catch(() => undefined);
  sincronizarIa();
  // sem IA, leitura local: nada sai do navegador, e o restrito é lido sem a pergunta do envio ao modelo
  const contexto = (modo: Modo = 'ia') => contextoDaJanela({
    protocolo: processo, ponte, sinal: sinal.signal, leituraLocal: modo === 'presenca',
    // sem chave, o contexto vai sem completar: só a verificação sem IA
    ...(ia ? { completar: (s: string, p: string, sn: AbortSignal) => ia!.completar(s, p, sn) } : {}),
    get privacidade() { return ia?.privacidade; },
    confirmar: async texto => confirm(texto),
  });
  try {
    const arv = await contexto().sei<{ nivel?: string }>('processo.arvore', { processo });
    if (arv?.nivel === 'sigiloso') return parar('Processo sigiloso: o SEI CFC não o lê.');
  } catch (e) {
    return parar(`Não consegui ler o processo no SEI: ${(e as Error).message}`);
  }
  const area = areaPadrao();
  /** A unidade dos dados da UO (do DFD), para o cabeçalho do checklist. */
  const unidade = async () => {
    const u = (await lerUo(area)).unidade;
    return typeof u === 'string' && u.trim() ? { unidade: u.trim() } : {};
  };
  const guardada = async (modo: Modo) => {
    const v = await lerVerificacao(area, processo, modo);
    if (!v) throw new Error('Rode a verificação primeiro.');
    return v;
  };
  await montarVerificacao(document, {
    protocolo: processo,
    temIa: !!ia,
    // a página "Configurar a IA" do SEI CFC (src/ia/), numa aba da mesma janela
    configurarIa: () => abrirConfigurarIa((u, alvo) => window.open(chrome.runtime.getURL(u), alvo)),
    aoMudarIa: f => chrome.storage.onChanged.addListener((mud, a) => {
      if (a !== 'local' || !mud.agenteIA_config) return;
      sincronizarIa();
      void completarDaConfig(lerConfigAgente).catch(() => undefined).then(nova => { ia = nova; f(!!nova); });
    }),
    // a mais recente dos dois modos: é a que a pessoa estava vendo
    anterior: async () => {
      const [a, b] = await Promise.all([lerVerificacao(area, processo, 'presenca'), lerVerificacao(area, processo, 'ia')]);
      return !a ? b : !b ? a : a.em > b.em ? a : b;
    },
    rodar: modo => rodarVerificacao(processo, contexto(modo), { area, agora: () => new Date(), pca: vinculoDaConfig }, modo),
    justificar: async (id, texto, modo) => {
      const nova = justificar(await guardada(modo), id, texto);
      await guardarVerificacao(area, nova);
      return nova;
    },
    previa: async modo => previaChecklist(await guardada(modo), { ...(await unidade()), agora: new Date() }),
    tipos: async () => ((await contexto().sei<{ nome: string }[]>('opcoes', { lista: 'tipos_documento', processo })) ?? []).map(o => o.nome),
    gravar: async (tipo, modo) => gravarChecklist({ processo, tipo, modo, ...(await unidade()), ctx: contexto('presenca'), area, agora: () => new Date() }),
    gasto: () => ia?.uso().custo ?? 0,
  });
}

void iniciar();
