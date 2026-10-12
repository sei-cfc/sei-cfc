/**
 * Content script do SEI CFC Gelic (mundo isolado, todos os quadros das telas do SEI).
 *
 * Marca a página com a revisão da Gelic (`<html data-gelic="rN">`) e, no quadro da árvore do
 * processo (`procedimento_visualizar`), desenha o selo com a etapa da contratação (e guarda a
 * etapa para o Controle de Processos). No Controle de Processos, mostra a etapa de cada linha
 * e a barra "Calcular etapas" (src/controle/). O quadro da
 * árvore recarrega quando um documento entra ou sai, e este script roda de novo com ele.
 * O selo só lê. O perfil do pacote (src/perfil.ts) decide os botões e o catálogo. Os botões dele abrem o Agente de IA com o pedido; o que o agente propuser
 * gravar passa pelo cartão de aprovação.
 */
import { revisao } from '../../versao.json';
import { resumir } from '../regras/resumo';
import { documentosDaRegra, lerArvoreDaPagina } from './arvore';
import { desenharSelo } from './selo';
import css from './selo.css';
import { guardarEtapas } from '../controle/cache';
import { guardavel, iniciarControle } from '../controle/controle';
import cssControle from '../controle/controle.css';
import { perfilAtual } from '../perfil';
import { docsDaArvore } from '../peca/roteiro';
import { ligarPca, ligarPcaNoControleDaPagina } from '../pca/na-pagina';
import { montarIniciarDaPagina } from '../iniciar/na-pagina';
import { lerVazios } from '../iniciar/vazios';
import { areaLocal } from '../pca/config';
import cssIniciar from '../iniciar/iniciar.css';
import { garantirPadroes } from '../padroes';
import { ligarNovidades } from './novidades';

document.documentElement.dataset.gelic = `r${revisao}`;

async function montarSelo(): Promise<void> {
  const estilo = document.createElement('style');
  estilo.id = 'gelic-selo-estilo';
  estilo.textContent = css;
  (document.head ?? document.documentElement).append(estilo);
  desenharSelo(document, { tipo: 'carregando' });
  try {
    const arvore = await lerArvoreDaPagina(document, location.href);
    if (arvore.nivel === 'sigiloso') {
      desenharSelo(document, { tipo: 'sigiloso' });
      void guardarEtapas({ [arvore.idProcedimento]: { etapa: 'sigiloso', nome: 'Sigiloso: etapa não calculada', tom: 'fora', descricao: 'A Gelic não lê processo sigiloso.', t: Date.now() } });
      return;
    }
    const docs = documentosDaRegra(arvore);
    const resumo = resumir(docs);
    // o roteiro do CFC distingue peça assinada (ou externa com arquivo) de rascunho
    const docsRoteiro = docsDaArvore(arvore);
    const vazios = perfilAtual() === 'cfc' ? await lerVazios(areaLocal(), arvore.protocolo) : [];
    desenharSelo(document, { tipo: 'resumo', resumo, protocolo: arvore.protocolo, docs: docsRoteiro, vazios });
    // A etapa deste processo fica guardada para o Controle de Processos mostrar sem requisição.
    void guardarEtapas({ [arvore.idProcedimento]: guardavel(resumo, Date.now()) });
    // O PCA vem depois, sem atrasar o selo (sem configuração, nada sai pela rede).
    void ligarPca(document, arvore, perfilAtual(), location.href).catch(e => console.warn('[SEI CFC Gelic] PCA:', e));
  } catch (e) {
    const msg = (e as { mensagem?: string; message?: string }).mensagem ?? (e as Error).message ?? 'erro desconhecido';
    console.warn('[SEI CFC Gelic] selo:', e);
    desenharSelo(document, { tipo: 'erro', mensagem: msg.length > 90 ? `${msg.slice(0, 90)}…` : msg });
  } finally {
    // Novidades e Ajuda depois do último desenho do selo (o sigiloso sai com return, e o finally roda do mesmo jeito).
    void ligarNovidades(document, perfilAtual()).catch(e => console.warn('[SEI CFC Gelic] novidades:', e));
  }
}

function montarControle(): void {
  if (!document.querySelector('#tblProcessosRecebidos, #tblProcessosGerados')) return;
  const estilo = document.createElement('style');
  estilo.id = 'gelic-controle-estilo';
  estilo.textContent = cssControle;
  (document.head ?? document.documentElement).append(estilo);
  void iniciarControle(document).then(c => ligarPcaNoControleDaPagina(document, c.barra.raiz)).catch(e => console.warn('[SEI CFC Gelic] controle:', e));
}

function iniciar(): void {
  // Demandas e Projetos do SEI Pro vêm desligadas nas nossas extensões (src/padroes.ts). Só no quadro principal, para os
  // quadros da mesma página não gravarem juntos.
  const storage = globalThis.chrome?.storage;
  if (window === window.top && storage?.local && storage.sync) {
    void garantirPadroes({ local: storage.local, sync: storage.sync }).catch(e => console.warn('[SEI CFC Gelic] padrões:', e));
  }
  const acao = new URL(location.href).searchParams.get('acao');
  if (acao === 'procedimento_visualizar') void montarSelo();
  // As etapas no Controle de Processos são da Gelic.
  else if (acao === 'procedimento_controlar' && perfilAtual() === 'gelic') montarControle();
  // SEI CFC: "Iniciar processo" (cria o processo e a árvore inicial da instrução)
  else if (acao === 'procedimento_controlar' && perfilAtual() === 'cfc' && document.querySelector('#tblProcessosRecebidos, #tblProcessosGerados')) {
    const estilo = document.createElement('style');
    estilo.textContent = cssIniciar;
    (document.head ?? document.documentElement).append(estilo);
    void montarIniciarDaPagina(document).catch(e => console.warn('[SEI CFC] iniciar:', e));
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
else iniciar();
