/**
 * Etapas da Gelic no Controle de Processos (`procedimento_controlar`).
 *
 * Ao abrir a tela, nada sai pela rede: as etapas já guardadas (o selo da árvore guarda toda vez
 * que um processo é aberto) aparecem na hora. "Calcular etapas" lê, só quando o usuário clica, a
 * árvore dos processos visíveis sem etapa ou com etapa desatualizada, três de cada vez, pela
 * sessão do usuário e pelos links assinados da própria linha. Processo sigiloso não é lido.
 *
 * Redesenha quando as tabelas mudam (paginação, agrupamento do SEI Pro) e quando outra aba
 * guarda etapas novas.
 */
import { abrirArvore } from '../../../sei-nucleo/src/dominio/arvore';
import { criarHttp, type Http } from '../../../sei-nucleo/src/sessao/http';
import { resumir } from '../regras/resumo';
import { documentosDaRegra } from '../pagina/arvore';
import { areaPadrao, CHAVE_ETAPAS, guardarEtapas, lerEtapas, type Area, type EtapaGuardada, type MapaEtapas } from './cache';
import { aplicarFiltro, aVista, chaveDoEstado, criarBarra, desenharLinha, estadoDe, linhas, OCULTA_PESQUISA, TABELAS, type EstadoLinha, type Linha } from './view';

export const CONCORRENCIA = 3;

export interface DepsControle {
  area: Area | null;
  http: () => Http;
  agora: () => number;
  /** Mudanças no storage feitas em outra aba (o selo de outro processo). */
  aoMudarStorage?: (f: () => void) => void;
}

const depsPadrao = (): DepsControle => ({
  area: areaPadrao(),
  http: () => criarHttp(location.href),
  agora: Date.now,
  aoMudarStorage: f => globalThis.chrome?.storage?.onChanged?.addListener((m, area) => { if (area === 'local' && m[CHAVE_ETAPAS]) f(); }),
});

/** A etapa guardada a partir do resumo (só o resultado, nunca os títulos). */
export const guardavel = (r: ReturnType<typeof resumir>, t: number): EtapaGuardada => ({ etapa: r.etapa, nome: r.nome, tom: r.tom, descricao: r.descricao, t });

export async function iniciarControle(doc: Document, deps: DepsControle = depsPadrao()) {
  let mapa: MapaEtapas = await lerEtapas(deps.area);
  let filtro: string | null = null;
  let progresso: { feitos: number; total: number } | null = null;
  let abortar: AbortController | null = null;
  const calculando = new Set<string>();
  const erros = new Map<string, string>();
  const janela = doc.defaultView;

  const estado = (l: Linha): EstadoLinha => {
    const id = l.processo.idProcedimento;
    if (calculando.has(id)) return { tipo: 'calculando' };
    if (erros.has(id)) return { tipo: 'erro', mensagem: erros.get(id)! };
    return estadoDe(l, mapa, deps.agora());
  };
  const pendente = (l: Linha) => {
    if (l.processo.sigiloso) return false;
    const s = estadoDe(l, mapa, deps.agora());
    return s.tipo === 'nenhum' || (s.tipo === 'etapa' && s.velha);
  };

  const barra = criarBarra(doc, {
    calcular: () => void calcular(),
    cancelar: () => abortar?.abort(),
    filtrar: chave => { filtro = chave; desenhar(); },
  });

  const mutacoes = janela?.MutationObserver ? new janela.MutationObserver(lista => {
    const dentro = (no: Node) => !!(no.nodeType === 1 ? (no as Element) : no.parentElement)?.closest?.(TABELAS);
    const contem = (no: Node) => no.nodeType === 1 && (!!(no as Element).closest?.(TABELAS) || !!(no as Element).querySelector?.(TABELAS));
    // Classe: só quando a pesquisa rápida do SEI Pro esconde ou mostra a linha (o SEI troca outras ao passar o mouse).
    const pesquisa = (m: MutationRecord) => dentro(m.target)
      && (m.oldValue ?? '').split(/\s+/).includes(OCULTA_PESQUISA) !== (m.target as Element).classList.contains(OCULTA_PESQUISA);
    if (lista.some(m => (m.type === 'attributes' ? pesquisa(m) : dentro(m.target) || [...m.addedNodes].some(contem) || [...m.removedNodes].some(contem)))) agendar();
  }) : null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  function agendar() {
    if (timer !== undefined) return;
    timer = setTimeout(() => { timer = undefined; desenhar(); }, 60);
  }

  function desenhar() {
    mutacoes?.disconnect();
    const ls = linhas(doc);
    // Os chips resumem todos os processos da página, inclusive os escondidos pelo filtro de etapa e pela pesquisa rápida
    // (é por eles que se troca de etapa); só o botão conta o que está à vista.
    const contagem = new Map<string, { chave: string; nome: string; tom: string; n: number }>();
    for (const l of ls) {
      const s = estado(l);
      desenharLinha(doc, l, s);
      const chave = chaveDoEstado(s);
      const nome = s.tipo === 'etapa' ? s.etapa.nome : 'Sem etapa calculada';
      const tom = s.tipo === 'etapa' ? s.etapa.tom : 'sem';
      const c = contagem.get(chave) ?? { chave, nome, tom, n: 0 };
      c.n += 1;
      contagem.set(chave, c);
    }
    // Primeiro o que pede ação da Gelic, depois espera, fim, fora e sem etapa; dentro, mais processos primeiro.
    const ordem: Record<string, number> = { acao: 0, espera: 1, fim: 2, fora: 3, sem: 4 };
    const resumo = [...contagem.values()].sort((a, b) => (ordem[a.tom] ?? 5) - (ordem[b.tom] ?? 5) || b.n - a.n);
    if (filtro !== null && !contagem.has(filtro)) filtro = null;
    aplicarFiltro(ls, filtro);
    barra.atualizar({ resumo, pendentes: new Set(ls.filter(l => aVista(l) && pendente(l)).map(l => l.processo.idProcedimento)).size, progresso, filtro });
    // A classe da linha muda quando a pesquisa rápida do SEI Pro a esconde ou mostra: a contagem do botão acompanha.
    mutacoes?.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
  }

  async function calcular() {
    if (progresso) return;
    const ls = linhas(doc).filter(aVista);
    const escolhidas = ls.some(pendente) ? ls.filter(pendente) : ls.filter(l => !l.processo.sigiloso);
    const fila = [...new Map(escolhidas.map(l => [l.processo.idProcedimento, l])).values()];
    if (!fila.length) return;
    abortar = new AbortController();
    const sinal = abortar.signal;
    const http = deps.http();
    const novas: MapaEtapas = {};
    progresso = { feitos: 0, total: fila.length };
    erros.clear();
    desenhar();
    const trabalhar = async () => {
      for (let l = fila.shift(); l && !sinal.aborted; l = fila.shift()) {
        const id = l.processo.idProcedimento;
        calculando.add(id);
        agendar();
        try {
          const arvore = await abrirArvore(http, l.href, { sinal });
          const e = arvore.nivel === 'sigiloso'
            ? { etapa: 'sigiloso', nome: 'Sigiloso: etapa não calculada', tom: 'fora' as const, descricao: 'A Gelic não lê processo sigiloso.', t: deps.agora() }
            : guardavel(resumir(documentosDaRegra(arvore)), deps.agora());
          novas[id] = e;
          mapa = { ...mapa, [id]: e };
        } catch (err) {
          if (sinal.aborted) break;
          const x = err as { codigo?: string; message?: string };
          // Sessão caiu: parar tudo (as próximas falhariam igual).
          if (x.codigo === 'SEI_SESSAO_EXPIRADA') { erros.set(id, 'sessão do SEI expirada'); abortar?.abort(); break; }
          erros.set(id, (x.message ?? 'erro').slice(0, 80));
        } finally {
          calculando.delete(id);
          if (progresso) progresso.feitos += 1;
          agendar();
        }
      }
    };
    await Promise.all(Array.from({ length: CONCORRENCIA }, trabalhar));
    for (const l of fila) calculando.delete(l.processo.idProcedimento);
    await guardarEtapas(novas, deps.area);
    progresso = null;
    abortar = null;
    desenhar();
  }

  deps.aoMudarStorage?.(async () => {
    if (progresso) return; // durante o cálculo, o mapa em memória é o mais novo
    mapa = await lerEtapas(deps.area);
    desenhar();
  });

  desenhar();
  return { desenhar, calcular, barra };
}
