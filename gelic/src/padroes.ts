/**
 * Opções do SEI Pro que as nossas extensões trazem desligadas (decisão do usuário, 2026-10-12): Demandas e Projetos vêm
 * ligadas no SEI Pro 2.9 (opção ausente conta como ligada) e não servem à rotina do CFC.
 *
 * Gravadas uma vez, na primeira página do SEI depois de instalar ou atualizar, e só as que a pessoa nunca escolheu: quem
 * quiser liga nas Configurações, e a extensão não volta a desligar (marca `gelic_padroes` no storage.local). Os módulos do
 * SEI Pro leem a opção ao carregar a página, então os painéis ainda aparecem nessa primeira página.
 *
 * O formato é o do legado e da página de Configurações (`chrome.storage.sync.dataValues`): uma STRING com
 * `JSON.stringify([...perfis, { configGeral: [{name, value}] }])`. A edição é mínima: o resto fica como estava.
 */
import type { Area } from './controle/cache';

export const DESLIGADAS = ['gerenciardemandas', 'gerenciarprojetos'] as const;
export const CHAVE_PADROES = 'gelic_padroes';
export const VERSAO_PADROES = 1;

/**
 * A configuração com `{name, value: false}` para cada opção desligada que ainda não está lá. `null` quando não há o que
 * gravar ou quando a configuração é ilegível (nunca se sobrescreve o que não se entendeu).
 */
export function comPadroes(dataValues: unknown): string | null {
  let lista: unknown = [];
  if (typeof dataValues === 'string' && dataValues.trim()) {
    try {
      lista = JSON.parse(dataValues);
    } catch {
      return null;
    }
  } else if (Array.isArray(dataValues)) {
    lista = structuredClone(dataValues);
  } else if (dataValues !== undefined && dataValues !== null && dataValues !== '') {
    return null;
  }
  if (!Array.isArray(lista)) return null;
  let geral = lista.find((x): x is { configGeral: unknown[] } => !!x && typeof x === 'object' && Array.isArray((x as { configGeral?: unknown }).configGeral));
  if (!geral) {
    geral = { configGeral: [] };
    lista.push(geral);
  }
  const itens = geral.configGeral;
  let mudou = false;
  for (const nome of DESLIGADAS) {
    if (itens.some(o => (o as { name?: unknown } | null)?.name === nome)) continue;
    itens.push({ name: nome, value: false });
    mudou = true;
  }
  return mudou ? JSON.stringify(lista) : null;
}

/** Aplica os padrões uma vez por navegador. Erro ao gravar (cota do storage.sync) não escapa nem se repete. */
export async function garantirPadroes(areas: { local: Area; sync: Area }): Promise<'gravado' | 'nada' | 'ja'> {
  const marca = (await areas.local.get(CHAVE_PADROES))[CHAVE_PADROES];
  if (typeof marca === 'number' && marca >= VERSAO_PADROES) return 'ja';
  let gravou = false;
  try {
    const texto = comPadroes((await areas.sync.get('dataValues')).dataValues);
    if (texto !== null) {
      await areas.sync.set({ dataValues: texto });
      gravou = true;
    }
  } catch (e) {
    console.warn('[SEI CFC Gelic] padrões do SEI Pro:', e);
  }
  await areas.local.set({ [CHAVE_PADROES]: VERSAO_PADROES });
  return gravou ? 'gravado' : 'nada';
}
