/**
 * O que o agente vê em cada perfil (src/perfil.ts). O bundle do agente é um só para os dois pacotes,
 * então o filtro é em tempo de execução (index.ts aplica o perfil do manifest ao carregar o módulo).
 *  - gelic: tudo (ferramentas de etapa, DVI, pendências e modelos; as 8 skills gelic-*; o contexto da Gelic).
 *  - cfc: leitura da etapa, as contas e as peças do demandante (cfc_modelo_analisar, cfc_documento_gravar; skill
 *    cfc-documento); nenhuma skill nem ferramenta de análise da Gelic (gelic_dvi_*, gelic_pendencias,
 *    gelic_modelo_*, gelic_documento_gravar); o contexto do demandante.
 */
import type { DefTool } from '../../../agente-ia/src/motor/tools';
import type { Perfil } from '../perfil';
import { PROMPT_CFC, PROMPT_GELIC } from './prompt';
import { TOOLS_CFC } from './cfc';
import { SKILLS_CFC, SKILLS_GELIC } from './skills.gerado';
import { TOOLS_GELIC } from './tools';

type Skills = Readonly<Record<string, { descricao: string; texto: string }>>;

/** Ferramentas da Gelic que o CFC também vê, com a descrição sem as menções à análise da Gelic. */
const DESCRICOES_CFC: Readonly<Record<string, string>> = {
  gelic_etapa:
    'Etapa do rito de contratações do CFC em que o processo está, calculada de forma determinística pelos títulos e pela ordem dos documentos: etapa, descrição, próximo passo (documento ou ação), fatos que decidiram e documentos reconhecidos com nº SEI. Chame antes de dizer em que pé está o processo ou qual é o próximo documento, e não contradiga o resultado: se os autos indicarem outra coisa, relate a divergência ao usuário.',
  gelic_calcular:
    'Contas para os documentos, pelo mesmo código dos modelos (nunca faça de cabeça): extenso (valor em reais por extenso), ordinal (1 → PRIMEIRO), data_extenso (dd/mm/aaaa por extenso) e reajuste (valor × (1 + percentual), com o extenso).',
};
/** Skills gelic-* que o CFC também vê (nenhuma: as dele são as cfc-*, de skills-gelic/cfc-*.md). */
const SKILLS_GELIC_NO_CFC: readonly string[] = [];

export function toolsDoPerfil(perfil: Perfil): DefTool[] {
  if (perfil === 'gelic') return TOOLS_GELIC;
  return [...TOOLS_GELIC.filter(t => t.nome in DESCRICOES_CFC).map(t => ({ ...t, descricao: DESCRICOES_CFC[t.nome] })), ...TOOLS_CFC];
}

export function skillsDoPerfil(perfil: Perfil): Skills {
  if (perfil === 'gelic') return SKILLS_GELIC;
  return { ...Object.fromEntries(Object.entries(SKILLS_GELIC).filter(([slug]) => SKILLS_GELIC_NO_CFC.includes(slug))), ...SKILLS_CFC };
}

export const promptDoPerfil = (perfil: Perfil): string => (perfil === 'gelic' ? PROMPT_GELIC : PROMPT_CFC);
