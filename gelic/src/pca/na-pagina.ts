/**
 * O PCA nas telas do SEI (content script): lê a configuração, monta as leituras do SEI pela sessão do usuário e
 * desenha a linha do selo. O fetch ao PCA sai daqui, com a origem do SEI (o CORS do PCA aceita
 * https://sei.cfc.org.br), sem os cookies do SEI.
 */
import { andamentos } from '../../../sei-nucleo/src/dominio/historico';
import { abrirArvore } from '../../../sei-nucleo/src/dominio/arvore';
import type { Arvore } from '../../../sei-nucleo/src/dominio/arvore';
import { criarHttp, type Http } from '../../../sei-nucleo/src/sessao/http';
import type { Sei } from '../../../sei-nucleo/src/sei';
import type { Area } from '../peca/guardados';
import type { Perfil } from '../perfil';
import { criarClientePca } from './cliente';
import { areaLocal, atualizarPermissao, atualizarPodeInstruir, lerConfigPca, REVER_PERMISSAO_MS, type ConfigGuardada } from './config';
import { gravarSituacao, situacaoDoRoteiro } from '../ficha/situacao';
import { docsDaArvore, roteiro } from '../peca/roteiro';
import { ligarPcaNoControle } from './controle';
import { desenharPca } from './selo';
import { sincronizarProcesso, type DepsSincronizar } from './sincronizar';

/** As leituras do SEI de um processo, pela sessão do usuário (a árvore já lida). */
export function leiturasDaSessao(http: Http, arvore: Arvore, sinal?: AbortSignal): Pick<DepsSincronizar, 'historico' | 'html' | 'pdf'> {
  // O histórico do núcleo só usa a árvore e o http do Sei: a árvore já foi lida.
  const sei = { arvore: async () => arvore, http } as unknown as Sei;
  return {
    historico: async limite => andamentos(sei, arvore.protocolo, { tipo: 'completo', limite: limite ?? 5000, sinal }),
    html: async d => {
      const p = await http.obter(d.src, { sinal });
      // página de erro do SEI (404, acesso negado) não é o conteúdo do contrato
      if (p.status >= 400) throw new Error(`o SEI não entregou o documento ${d.numero} (HTTP ${p.status})`);
      return p.html;
    },
    pdf: async d => {
      const a = await http.baixar(d.src, { sinal });
      const ehPdf = a.tipo.includes('pdf') || (a.bytes[0] === 0x25 && a.bytes[1] === 0x50 && a.bytes[2] === 0x44 && a.bytes[3] === 0x46);
      return ehPdf ? a.bytes : null;
    },
  };
}

export const depsDoPca = (config: ConfigGuardada, area: Area | null, http: Http, arvore: Arvore, sinal?: AbortSignal): DepsSincronizar => ({
  cliente: criarClientePca(config, (u, i) => fetch(u, i)),
  config, area, agora: () => Date.now(),
  ...leiturasDaSessao(http, arvore, sinal),
  ...(sinal ? { sinal } : {}),
  aoPerderPermissao: () => void atualizarPermissao(area, false, Date.now()),
});

/**
 * A permissão do PCA conferida de novo a cada 12 h (`/saude`): no SEI CFC Gelic a de enviar a coleta; no SEI CFC a
 * de instruir (gravar a situação). Quem configurou antes de receber a permissão passa a usá-la; quem a perdeu para.
 */
export async function permissaoEmDia(config: ConfigGuardada, area: Area | null, perfil: Perfil, agora = Date.now(),
  saude = () => criarClientePca(config, (u, i) => fetch(u, i)).saude()): Promise<ConfigGuardada> {
  if (config.conferido_em && agora - config.conferido_em < REVER_PERMISSAO_MS) return config;
  try {
    const s = await saude();
    if (perfil === 'gelic') {
      await atualizarPermissao(area, !!s.pode_enviar, agora);
      return { ...config, pode_enviar: !!s.pode_enviar, conferido_em: agora };
    }
    await atualizarPodeInstruir(area, !!s.pode_instruir, agora);
    return { ...config, pode_instruir: !!s.pode_instruir, conferido_em: agora };
  } catch {
    return config; // PCA fora do ar ou token inválido: o GET do vínculo mostra o erro
  }
}

export async function ligarPca(doc: Document, arvore: Arvore, perfil: Perfil, url: string): Promise<void> {
  const area = areaLocal();
  const guardada = await lerConfigPca(area);
  if (!guardada) { desenharPca(doc, { tipo: 'sem_config' }); return; }
  desenharPca(doc, { tipo: 'consultando' });
  const config = await permissaoEmDia(guardada, area, perfil);
  const fim = await sincronizarProcesso(arvore, perfil, depsDoPca(config, area, criarHttp(url), arvore), e => desenharPca(doc, e));
  desenharPca(doc, fim);
  // SEI CFC: a situação da instrução nos dados da contratação de cada item ligado (só quando mudou; falha só no console)
  if (perfil === 'cfc' && config.pode_instruir && fim.tipo === 'item') {
    const itens = fim.itens.map(i => ({ item_pca: i.item_pca, exercicio: i.exercicio }));
    const feitos = await gravarSituacao(arvore.protocolo, itens, situacaoDoRoteiro(roteiro(docsDaArvore(arvore)), new Date()),
      { cliente: criarClientePca(config, (u, i) => fetch(u, i)), area, agora: () => Date.now() });
    const falhas = feitos.filter((f): f is { erro: string } => typeof f === 'object');
    if (falhas.length) console.warn('[SEI CFC] situação no PCA:', falhas.map(f => f.erro).join('; '));
  }
}

/** "Atualizar PCA" na barra da Gelic do Controle de Processos: só com a permissão de enviar a coleta. */
export async function ligarPcaNoControleDaPagina(doc: Document, barra: HTMLElement): Promise<void> {
  const area = areaLocal();
  const guardada = await lerConfigPca(area);
  if (!guardada) return;
  const config = await permissaoEmDia(guardada, area, 'gelic');
  if (!config.pode_enviar) return;
  const http = criarHttp(location.href);
  ligarPcaNoControle(doc, barra, {
    abrir: (href, sinal) => abrirArvore(http, href, { sinal }),
    sincronizar: (arvore, sinal) => sincronizarProcesso(arvore, 'gelic', depsDoPca(config, area, http, arvore, sinal)),
  });
}
