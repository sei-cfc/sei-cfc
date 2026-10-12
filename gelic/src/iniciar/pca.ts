/**
 * O PCA no "Iniciar processo" (contrato v1.1): o item (objeto, valor, via pela modalidade, unidade), a permissão de
 * vincular (conferida no /saude a cada prévia: a da configuração pode estar velha) e o vínculo do processo criado, que
 * também vai para o cache do selo. Sem o SEI: testável com o fetch falso.
 */
import type { Area } from '../peca/guardados';
import { ErroPca, type ClientePca } from '../pca/cliente';
import { guardarVinculo } from '../pca/config';
import { viaDaModalidade } from '../pca/contrato';
import type { ItemDoPca } from './dialogo';

/** "165000.00" (PCA) → "165.000,00" (formulário). */
export const valorBr = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : v;
};

/** Nem a prévia nem a criação ficam presas num PCA que não responde. */
export const TEMPO_PCA_MS = 15_000;

export type PodeVincular = { pode: true } | { pode: false; motivo: string };

export function depsPcaIniciar(cliente: Pick<ClientePca, 'porItem' | 'saude' | 'vincular'>, area: Area | null, agora: () => number = Date.now,
  prazo: () => AbortSignal = () => AbortSignal.timeout(TEMPO_PCA_MS)) {
  return {
    itemDoPca: async (item: number, exercicio: number): Promise<ItemDoPca | null> => {
      const i = (await cliente.porItem(item, exercicio)).itens[0];
      if (!i) return null;
      return {
        objeto: i.objeto ?? i.descricao_objeto, valor_estimado: i.valor_estimado ? valorBr(i.valor_estimado) : null, grau_prioridade: i.grau_prioridade,
        via: viaDaModalidade(i.modalidade), unidade: i.unidade_sigla_sei ?? i.unidade, unidade_sei: !!i.unidade_sigla_sei, numeros_sei: i.numeros_sei,
      };
    },
    podeVincular: async (): Promise<PodeVincular> => {
      try {
        const s = await cliente.saude(prazo());
        if (s.pode_instruir === true) return { pode: true };
        if (s.pode_instruir === false) return { pode: false, motivo: 'seu usuário do PCA não pode vincular processos: peça a inclusão no grupo demandante' };
        return { pode: false, motivo: 'o PCA ainda não aceita o vínculo (a API do PCA não tem a versão 1.1)' };
      } catch (e) {
        return { pode: false, motivo: e instanceof ErroPca ? e.message : 'o PCA não respondeu' };
      }
    },
    vincular: async (protocolo: string, item: number, exercicio: number): Promise<{ criado: boolean }> => {
      const r = await cliente.vincular({ item_pca: item, exercicio, numero_sei: protocolo }, prazo());
      await guardarVinculo(area, protocolo, { itens: [r.item] }, agora());
      return { criado: r.criado };
    },
  };
}
