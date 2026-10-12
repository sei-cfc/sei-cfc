/**
 * Roda em processo próprio (tests/perfil.ts): finge o manifest de um perfil ANTES de carregar o agente
 * e devolve o que o agente-ia vê pelo gancho G2 (TOOLS_SEI, SKILLS, prompt de sistema).
 *   tsx tests/perfil-g2.ts cfc
 */
const perfil = process.argv[2];
(globalThis as Record<string, unknown>).chrome = { runtime: { getManifest: () => (perfil === 'gelic' ? { name: 'SEI CFC Gelic' } : { name: 'SEI CFC', sei_pro_perfil: perfil }) } };
const { TOOLS_SEI } = await import('../../agente-ia/src/tools/sei');
const { SKILLS } = await import('../../agente-ia/src/skills');
const { promptSistema } = await import('../../agente-ia/src/motor/prompt');
console.log(JSON.stringify({
  tools: TOOLS_SEI.map(t => t.nome).filter(n => /^(gelic|cfc)_/.test(n)),
  totalTools: TOOLS_SEI.length,
  skills: Object.keys(SKILLS),
  prompt: promptSistema(null, new Date(2026, 9, 9), 'INSTRUCAO DO USUARIO'),
}));
export {};
