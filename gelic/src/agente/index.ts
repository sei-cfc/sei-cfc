/**
 * O que o agente-ia importa da Gelic (gancho G2, ver docs/gelic/GANCHOS.md), já filtrado pelo perfil do
 * pacote (src/perfil.ts, lido do manifest ao carregar o módulo; sem chrome, como nos testes, é gelic).
 */
import { perfilAtual } from '../perfil';
import { promptDoPerfil, skillsDoPerfil, toolsDoPerfil } from './perfil';

const PERFIL = perfilAtual();
export const PROMPT_GELIC = promptDoPerfil(PERFIL);
export const SKILLS_GELIC = skillsDoPerfil(PERFIL);
export const TOOLS_GELIC = toolsDoPerfil(PERFIL);
