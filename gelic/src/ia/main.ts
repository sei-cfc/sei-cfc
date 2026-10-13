/**
 * Entrada da página "Configurar a IA" (js/gelic/configurar-ia.html), aberta pelo selo do SEI CFC e pelas janelas das
 * peças e da verificação. Página da extensão: lê e grava a configuração do agente (agenteIA_config), testa a chave com
 * o provedor do agente e guarda o resumo sem segredo que o selo lê.
 */
import { conferirChave, listarModelos, SERVICOS } from '../../../agente-ia/src/motor/provedor';
import { CHAVE_CONFIG_SYNC, espelharConfig } from '../../../agente-ia/src/painel/espelho';
import { areaPadrao } from '../peca/guardados';
import { lerConfigAgente } from '../peca/contexto';
import { gravarPassos, gravarResumo, lerPassos, sincronizarResumo } from './guardado';
import { montarConfigurarIa } from './pagina';

const CHAVE_CONFIG = 'agenteIA_config';
const area = areaPadrao();
// a página também acerta o resumo do selo ao abrir (chave removida ou trocada pelo painel)
void lerConfigAgente().then(c => sincronizarResumo(area, c, new Date())).catch(() => undefined);

void montarConfigurarIa(document, {
  lerConfig: lerConfigAgente,
  gravarConfig: async c => {
    await chrome.storage.local.set({ [CHAVE_CONFIG]: c });
    // Com a sincronização do painel ligada (spro_ia no storage.sync), o painel traz de lá serviço e modelo ao abrir: a
    // escolha daqui vai para lá também, pela função do próprio painel (que tira a chave).
    const noSync = await chrome.storage.sync.get(CHAVE_CONFIG_SYNC).catch(() => ({} as Record<string, unknown>));
    if (noSync[CHAVE_CONFIG_SYNC]) await espelharConfig(c as unknown as Parameters<typeof espelharConfig>[0]);
  },
  conferir: (servico, chave) => conferirChave({ servico, chave }),
  // só o OpenRouter responde com CORS liberado; a Anthropic precisa da permissão do navegador, pedida no clique
  autorizar: async servico => {
    if (servico === 'openrouter') return true;
    const origins = [`${new URL(SERVICOS[servico].url).origin}/*`];
    try {
      return (await chrome.permissions.contains({ origins })) || (await chrome.permissions.request({ origins }));
    } catch {
      return false;
    }
  },
  modelos: (servico, chave) => listarModelos({ servico, chave }),
  lerPassos: () => lerPassos(area),
  gravarPassos: p => gravarPassos(area, p),
  gravarResumo: r => gravarResumo(area, r),
  modeloPadrao: { openrouter: SERVICOS.openrouter.modeloPadrao ?? '', anthropic: SERVICOS.anthropic.modeloPadrao ?? '' },
  agora: () => new Date(),
});
