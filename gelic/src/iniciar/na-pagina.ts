/**
 * O "Iniciar processo" no Controle de Processos do SEI CFC (content script): as telas do SEI pela sessão do usuário
 * (a página viva tem o menu e a pesquisa rápida), o PCA (com a configuração) e o que fica lembrado no navegador.
 */
import { lerContexto, Sei } from '../../../sei-nucleo/src/sei';
import type { Pagina } from '../../../sei-nucleo/src/sessao/http';
import { guardarRascunho } from '../peca/guardados';
import { criarClientePca } from '../pca/cliente';
import { areaLocal, lerConfigPca } from '../pca/config';
import { montarIniciar, type Lembrados } from './dialogo';
import { tomarPendente } from './pendente';
import { depsPcaIniciar } from './pca';
import { guardarVazios } from './vazios';
import { assuntosDoSei, incluirExternoVazio, incluirInterno, iniciarProcesso, tiposDeDocumento, tiposDeProcesso } from './sei';

export const CHAVE_INICIAR = 'gelic_cfc_iniciar';

export async function montarIniciarDaPagina(doc: Document): Promise<void> {
  const viva = (): Pagina => ({ url: location.href, status: 200, html: doc.documentElement.outerHTML, doc });
  const sei = new Sei(location.href, viva);
  const area = areaLocal();
  const pca = await lerConfigPca(area);
  const abrir = montarIniciar(doc, {
    tiposDeProcesso: () => tiposDeProcesso(sei),
    iniciar: novo => iniciarProcesso(sei, novo),
    // a classificação por assunto: a tela de cadastro do tipo (só aberta) e o autocompletar de assuntos dela
    assuntos: assuntosDoSei(sei),
    tiposDeDocumento: ref => tiposDeDocumento(sei, ref),
    interno: (ref, d) => incluirInterno(sei, ref, d),
    externo: (ref, d) => incluirExternoVazio(sei, ref, d),
    lembrados: async () => {
      const v = area ? (await area.get(CHAVE_INICIAR))[CHAVE_INICIAR] : undefined;
      return (v && typeof v === 'object' ? v : { tipos: {} }) as Lembrados;
    },
    lembrar: async l => { await area?.set({ [CHAVE_INICIAR]: l }); },
    // com o PCA ligado: o item (objeto, valor, via), a permissão de vincular e o vínculo do processo criado
    ...(pca ? depsPcaIniciar(criarClientePca(pca, (u, i) => fetch(u, i)), area) : {}),
    unidadeAtual: () => { try { return lerContexto(viva()).unidade.sigla || null; } catch { return null; } },
    // as respostas viram o rascunho do DFD do processo novo: a janela da peça abre com elas
    guardarDfd: (protocolo, r) => guardarRascunho(area, protocolo, 'dfd', {
      objeto: r.objeto, via: r.via, ...(r.valor_estimado ? { valor_estimado: r.valor_estimado } : {}), ...(r.data_pretendida ? { data_pretendida: r.data_pretendida } : {}),
      ...(r.grau_prioridade ? { grau_prioridade: r.grau_prioridade } : {}), ...(r.item_pca ? { item_pca: r.item_pca, ano: r.exercicio } : {}),
    }),
    guardarVazios: (protocolo, vazios) => guardarVazios(area, protocolo, vazios),
    abrirProcesso: p => { location.href = p.url ?? `controlador.php?acao=procedimento_trabalhar&id_procedimento=${p.idProcedimento}`; },
  });
  // pedido feito na ficha do item do PCA (src/pca-site/): abre o diálogo travado no item, uma vez só
  const pedido = pca ? await tomarPendente(area, Date.now()) : null;
  if (pedido) void abrir({ pelo: pedido });
}
