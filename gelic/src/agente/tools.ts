/**
 * Ferramentas da Gelic para o Agente de IA (entram em TOOLS_SEI pelo gancho G2).
 * Só leitura: a etapa é calculada aqui no painel, sobre a árvore que a ponte já lê.
 */
import { s } from '../../../agente-ia/src/motor/esquema';
import { definirTool, type DefTool } from '../../../agente-ia/src/motor/tools';
import { resumir } from '../regras/resumo';
import { TOOLS_DVI } from './dvi';
import { TOOLS_MODELOS } from './modelos';

interface DocArvore { numero: string; titulo?: string; cancelado?: boolean; nivel?: string }

export const TOOLS_GELIC: DefTool[] = [
  definirTool({
    nome: 'gelic_etapa',
    descricao:
      'Etapa do rito da Gelic (contratações do CFC) em que o processo está, calculada de forma determinística pelos títulos e pela ordem dos documentos, com as regras oficiais da Gelic: etapa, descrição, próximo passo (documento ou ação), fatos que decidiram e documentos reconhecidos com nº SEI. Chame ANTES de analisar, verificar pendências, gerar DVI/despacho ou dizer a próxima etapa, e não contradiga o resultado: se os autos indicarem outra coisa, relate a divergência ao usuário.',
    parametros: s.objeto({ processo: s.texto({ descricao: 'Número do processo (protocolo), ex.: 50300.018905/2018-67.' }) }),
    efeito: 'leitura',
    rotulo: a => `Etapa Gelic de ${a.processo}`,
    executar: async (a, ctx) => {
      const r = await ctx.sei<{ protocolo: string; tipo: string; documentos: DocArvore[] }>('processo.arvore', { processo: a.processo });
      const usados = r.documentos.filter(d => d.titulo && !d.cancelado);
      const resumo = resumir(usados.map(d => ({ titulo: d.titulo!, numero: d.numero })));
      return {
        protocolo: r.protocolo,
        tipo: r.tipo,
        ...resumo,
        fora_da_regra: {
          cancelados: r.documentos.filter(d => d.cancelado).length,
          sigilosos_sem_titulo: r.documentos.filter(d => !d.titulo).length,
        },
        aviso: 'Calculado só pelos títulos e pela ordem dos documentos (não lê conteúdo). Confira nos autos o que a análise exigir.',
      };
    },
  }),
  ...TOOLS_MODELOS,
  ...TOOLS_DVI,
];
