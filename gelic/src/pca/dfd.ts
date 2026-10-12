/**
 * O item do PCA no DFD do SEI CFC (gancho `dadosDoPca`): pelo processo SEI; sem vínculo, ou com mais de um item,
 * pelo item e exercício que o usuário informou. Paridade com o gera (apps/gera/documentos/respostas.py): item, ano do
 * exercício e grau de prioridade (só se for um dos graus do DFD: Baixo, Médio, Alto).
 */
import type { DadosDoPca, DadosPca } from '../modelos/analise-cfc';
import { criarClientePca, type ClientePcaV1 } from './cliente';
import { areaLocal, lerConfigPca } from './config';
import type { ItemPca } from './contrato';

const GRAUS: Readonly<Record<string, string>> = { baixo: 'Baixo', medio: 'Médio', alto: 'Alto' };
const semAcento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function dadosDoItem(i: ItemPca): DadosPca {
  const grau = i.grau_prioridade ? GRAUS[semAcento(i.grau_prioridade)] : undefined;
  return { item_pca: i.item_pca, ano: i.exercicio, ...(grau ? { grau_prioridade: grau } : {}) };
}

const numero = (x: unknown) => (typeof x === 'number' || (typeof x === 'string' && /^\d+$/.test(x.trim())) ? Number(x) : null);

export function dadosDoPcaCom(cliente: ClientePcaV1): DadosDoPca {
  return async (protocolo, o = {}) => {
    const item = numero(o.item_pca);
    const ano = numero(o.ano);
    const pelo = await cliente.porSei(protocolo);
    const doInformado = (itens: ItemPca[]) => itens.find(i => i.item_pca === item && (ano === null || i.exercicio === ano));
    if (pelo.itens.length === 1) return dadosDoItem(pelo.itens[0]);
    const entre = doInformado(pelo.itens);
    if (entre) return dadosDoItem(entre);
    if (item === null || ano === null) return undefined;
    const r = await cliente.porItem(item, ano);
    return r.itens.length === 1 ? dadosDoItem(r.itens[0]) : undefined;
  };
}

/** O gancho padrão: lê a configuração a cada uso (pode mudar com a janela aberta); sem ela, nada sai pela rede. */
export const dadosDoPcaDaConfig: DadosDoPca = async (protocolo, o) => {
  const config = await lerConfigPca(areaLocal());
  if (!config) return undefined;
  return dadosDoPcaCom(criarClientePca(config, (u, i) => fetch(u, i)))(protocolo, o);
};

/** O vínculo do processo no PCA para o DVI (A04): sem configuração, undefined e nada sai pela rede. */
export async function vinculoDaConfig(protocolo: string): Promise<{ itens: ItemPca[] } | undefined> {
  const config = await lerConfigPca(areaLocal());
  if (!config) return undefined;
  return { itens: (await criarClientePca(config, (u, i) => fetch(u, i)).porSei(protocolo)).itens };
}
