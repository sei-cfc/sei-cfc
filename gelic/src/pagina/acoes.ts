/**
 * Ações Gelic do selo: Analisar e Pendências abrem o Agente de IA já com o pedido (gancho G1). O pedido
 * nomeia a skill embutida (gancho G2) e o processo, então funciona igual em qualquer modelo.
 * "Próximo passo" é `local`: não chama o agente (a resposta já está calculada pela regra no selo); abre o detalhe
 * do selo na seção "Próximo passo". O `pedido` dele fica para quem quiser a explicação longa (skill gelic-proxima-etapa).
 * "Gerar documento" não está aqui: abre o seletor de documentos (selo.ts, documentos/catalogo.ts).
 * Cada perfil mostra só os seus botões (BOTOES_DO_PERFIL): o SEI CFC não tem Analisar nem Pendências,
 * que são a análise da Gelic; tem "Verificar antes de enviar", que abre a janela da verificação prévia (selo.ts).
 * Nenhuma ação escreve no SEI por si: o agente só lê, e o que ele propuser gravar passa pelo
 * cartão de aprovação.
 */
import type { Perfil } from '../perfil';

export interface AcaoGelic {
  id: string;
  rotulo: string;
  dica: string;
  skill: string;
  /** Resolvido no próprio selo, sem o agente. */
  local?: boolean;
  pedido(protocolo: string, etapa: string): string;
}

const comEtapa = (etapa: string) => (etapa ? ` O selo da Gelic indica a etapa "${etapa}".` : '');

export const ACOES: readonly AcaoGelic[] = [
  {
    id: 'analisar',
    rotulo: 'Analisar',
    dica: 'O agente lê os documentos da etapa e aponta achados com o nº SEI (só leitura)',
    skill: 'gelic-analisar-processo',
    pedido: (p, e) => `Leia a skill gelic-analisar-processo e siga-a para analisar o processo ${p}.${comEtapa(e)}`,
  },
  {
    id: 'pendencias',
    rotulo: 'Pendências',
    dica: 'Confere documentos obrigatórios, assinaturas, cronologia e coerência (só leitura)',
    skill: 'gelic-verificar-pendencias',
    pedido: (p, e) => `Leia a skill gelic-verificar-pendencias e siga-a para verificar as pendências do processo ${p}.${comEtapa(e)}`,
  },
  {
    id: 'proximo',
    rotulo: 'Próximo passo',
    dica: 'Mostra o próximo passo calculado pela regra da Gelic (sem IA)',
    skill: 'gelic-proxima-etapa',
    local: true,
    pedido: (p, e) => `Leia a skill gelic-proxima-etapa e siga-a para explicar a próxima etapa do processo ${p}.${comEtapa(e)}`,
  },
];

/** Botões do selo de cada perfil, na ordem ('documento' é o "Gerar documento"; 'verificar', a verificação prévia do CFC). */
export const BOTOES_DO_PERFIL: Readonly<Record<Perfil, readonly string[]>> = {
  gelic: ['analisar', 'pendencias', 'documento', 'proximo'],
  cfc: ['documento', 'verificar', 'proximo'],
};

/** Manda o pedido ao background, que abre o painel do agente (precisa ser chamado no clique). */
export function pedirAoAgente(pedido: string): void {
  const rt = globalThis.chrome?.runtime;
  if (!rt?.sendMessage) return;
  rt.sendMessage({ tipo: 'abrirAgente', pedido }).catch(() => {
    /* extensão recarregada com a página aberta: o usuário recarrega a página */
  });
}
