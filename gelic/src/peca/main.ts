/**
 * Entrada da janela do formulário das peças (js/gelic/peca.html?modelo=<id>&processo=<protocolo>), aberta pelo
 * selo do SEI CFC. Junta a ponte com a aba do SEI do processo, a IA configurada no agente e o motor das peças
 * (src/agente/cfc.ts) e entrega a montarJanela. Página da extensão: a chave de IA só é lida aqui.
 */
import { PontePainel } from '../../../agente-ia/src/ponte/cliente';
import { analisarCfc, GANCHOS_CFC, gravarCfc, previaCfc } from '../agente/cfc';
import { DOCUMENTOS_CFC } from '../documentos/catalogo';
import { completarDaConfig, contextoDaJanela, escolherAba, lerConfigAgente } from './contexto';
import { areaPadrao } from './guardados';
import { criarClientePca } from '../pca/cliente';
import { lerConfigPca } from '../pca/config';
import { removerVazio } from '../iniciar/vazios';
import { montarJanela } from './pagina';

const raiz = () => document.getElementById('gelic-peca')!;
function parar(titulo: string, texto: string): void {
  const h = document.createElement('h1');
  h.textContent = titulo;
  const p = document.createElement('p');
  p.className = 'gelic-status gelic-status-erro';
  p.textContent = texto;
  raiz().replaceChildren(h, p);
}

/** Espera a aba do SEI do processo conectar à ponte (até 10 s). */
function esperarAba(ponte: PontePainel, protocolo: string): Promise<number | null> {
  return new Promise(ok => {
    const achou = escolherAba(ponte, protocolo);
    if (achou !== null) return ok(achou);
    const fim = setTimeout(() => ok(null), 10_000);
    ponte.aoMudar(() => {
      const id = escolherAba(ponte, protocolo);
      if (id !== null) { clearTimeout(fim); ok(id); }
    });
  });
}

async function iniciar(): Promise<void> {
  const q = new URLSearchParams(location.search);
  const modelo = q.get('modelo') ?? '';
  const processo = q.get('processo') ?? '';
  /** A peça já existe na árvore (vazia): o "Gravar" grava o corpo nela. */
  const documento = /^\d+$/.test(q.get('documento') ?? '') ? q.get('documento')! : null;
  const peca = DOCUMENTOS_CFC.find(d => d.modelo === modelo && !d.indisponivel);
  if (!peca || !processo) return parar('Peça desconhecida', 'Abra o formulário pelo botão "Gerar documento" do selo, no processo.');
  document.title = `${peca.nome} · ${processo}`;

  const ponte = new PontePainel();
  await ponte.iniciar();
  if ((await esperarAba(ponte, processo)) === null) {
    return parar(peca.nome, `Abra o processo ${processo} no SEI (na árvore do processo) e clique de novo em "Gerar documento". Com esta janela aberta, o painel do Agente de IA fica sem o SEI até ela fechar.`);
  }
  const sinal = new AbortController();
  addEventListener('pagehide', () => sinal.abort());
  // A IA pode ser configurada com a janela aberta (em outra aba): `ia` muda e o contexto lê sempre a atual.
  let ia = await completarDaConfig(lerConfigAgente).catch(() => undefined);
  const ctx = contextoDaJanela({
    protocolo: processo, ponte, sinal: sinal.signal,
    completar: (s: string, p: string, sn: AbortSignal) => (ia ? ia.completar(s, p, sn) : Promise.reject(new Error('Configure a IA no painel do agente.'))),
    get privacidade() { return ia?.privacidade; },
    confirmar: async texto => confirm(texto),
  });
  try {
    const arv = await ctx.sei<{ nivel?: string }>('processo.arvore', { processo });
    if (arv?.nivel === 'sigiloso') return parar(peca.nome, 'Processo sigiloso: o SEI CFC não o lê.');
  } catch (e) {
    return parar(peca.nome, `Não consegui ler o processo no SEI: ${(e as Error).message}`);
  }

  const area = areaPadrao();
  // os dados da contratação: no PCA configurado, com a permissão de instruir; sem ele, só neste navegador
  const configPca = await lerConfigPca(area);
  await montarJanela(document, {
    protocolo: processo,
    modelo,
    nomePeca: peca.nome,
    temIa: !!ia,
    area,
    dados: {
      protocolo: processo, area,
      cliente: configPca ? criarClientePca(configPca, (u, i) => fetch(u, i)) : null,
      podeInstruir: configPca?.pode_instruir === true,
      agora: () => Date.now(),
    },
    gasto: () => ia?.uso().custo ?? 0,
    analisar: ({ ia: comIa, dados }) => analisarCfc({ processo, modelo, dados }, ctx, new Date(), GANCHOS_CFC, { ia: comIa }),
    previa: dados => previaCfc({ processo, modelo, dados }),
    // com a peça já na árvore, o tipo é o dela: a lista só confirma o documento em que o corpo vai ser gravado
    tipos: async () => (documento ? [`Documento SEI nº ${documento} (já na árvore)`] : ((await ctx.sei<{ nome: string }[]>('opcoes', { lista: 'tipos_documento', processo })) ?? []).map(o => o.nome)),
    gravar: async ({ dados, tipo, nome_arvore, rascunho }) => {
      const r = await gravarCfc({ processo, modelo, dados, tipo, ...(nome_arvore ? { nome_arvore } : {}), ...(documento ? { documento } : {}), rascunho }, ctx);
      // a peça vazia foi preenchida: sai da lista, e o próximo "Preencher" do mesmo tipo vai para a seguinte
      if (r.ok && documento) await removerVazio(areaPadrao(), processo, documento).catch(() => {});
      return r;
    },
    // Sem chave: o painel do agente abre na configuração (o "Configurar a IA" próprio é da verificação prévia).
    // A janela é aba da mesma janela do navegador (abrir.ts), então o painel lateral abre ao lado dela.
    configurarIa: () => void chrome.runtime.sendMessage({ tipo: 'abrirAgente' }).catch(() => undefined),
    aoMudarIa: f => chrome.storage.onChanged.addListener((mud, area) => {
      if (area !== 'local' || !mud.agenteIA_config) return;
      void completarDaConfig(lerConfigAgente).catch(() => undefined).then(nova => { ia = nova; f(!!nova); });
    }),
  });
}

void iniciar();
