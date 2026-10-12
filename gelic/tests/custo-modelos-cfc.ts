/**
 * Medição de custo das peças do demandante (cfc_modelo_analisar), sobre pacotes sintéticos (tests/modelos-cfc-fluxo.ts):
 * o DFD, primeira peça (sem peça anterior: só as observações do usuário), e o TR com DFD, ETP e mapa de preços nos
 * autos (a cadeia). Mede o fixo (skill cfc-documento, descrições das ferramentas cfc_*, sistema da chamada) e a
 * chamada única (ctx.completar). Tokens estimados = caracteres / 2,4.
 *
 *   npx tsx tests/custo-modelos-cfc.ts
 *   PRECO_ENTRADA=1 PRECO_SAIDA=5 npx tsx tests/custo-modelos-cfc.ts   # US$ por milhão de tokens
 */
import type { ContextoTool } from '../../agente-ia/src/motor/tools';
import { analisarCfc, TOOLS_CFC } from '../src/agente/cfc';
import { skillsDoPerfil } from '../src/agente/perfil';
import { estimarTokens } from '../src/dvi/prompt';
import { SISTEMA_CFC } from '../src/modelos/analise-cfc';
import { contextoFalso, type DocFalso } from './dvi-preparar';
import { DEMANDA } from './modelos-cfc-fluxo';

const preco = (v?: string) => (v ? Number(v) : NaN);
const P = { entrada: preco(process.env.PRECO_ENTRADA), saida: preco(process.env.PRECO_SAIDA) };
const usd = (tokens: number, porMilhao: number) => (Number.isFinite(porMilhao) ? ` ≈ US$ ${((tokens * porMilhao) / 1e6).toFixed(4)}` : '');
const n = (x: number) => x.toLocaleString('pt-BR');
const tk = (c: number) => `${n(c)} caracteres ≈ ${n(estimarTokens(c))} tokens`;

const skill = skillsDoPerfil('cfc')['cfc-documento'].texto.length;
const ferramentas = TOOLS_CFC.reduce((s, t) => s + t.nome.length + t.descricao.length + JSON.stringify(t.parametros).length, 0);
console.log(`fixo na conversa: skill cfc-documento ${tk(skill)}; ferramentas cfc_* ${tk(ferramentas)}`);
console.log(`fixo da chamada única: sistema ${tk(SISTEMA_CFC.length)}`);

for (const [nome, modelo, docs, extra] of [
  ['DFD (primeira peça, só observações)', 'dfd', [], { observacoes: 'Precisamos manter o serviço fictício de manutenção de equipamentos de exemplo por 12 meses; o contrato atual termina em novembro.' }],
  ['TR (DFD, ETP e mapa nos autos)', 'tr', DEMANDA, { dados: { via: 'pregao' } }],
] as [string, string, DocFalso[], Record<string, unknown>][]) {
  let pedidas = 0;
  const ctx = {
    ...contextoFalso(docs, { consentir: true }).ctx,
    async completar(_s: string, pedido: string) {
      const nomes = pedido.split('\n').filter(l => / \| (valor|data|escolha|lista) \| (autos|agente|regra) \| /.test(l)).map(l => l.split(' | ')[0]);
      pedidas = nomes.length;
      return JSON.stringify(Object.fromEntries(nomes.map(x => [x, null])));
    },
  } as unknown as ContextoTool;
  const r = await analisarCfc({ processo: '12345670000048.000011/2026-01', modelo, ...extra }, ctx, new Date(2026, 9, 9)) as { chamadas: number; folha: string[]; faltando: unknown[]; pacote: { caracteres: number; tokensEstimados: number; fontes: unknown[] } };
  const saida = estimarTokens(pedidas * 90);
  console.log(`\n${nome}: ${r.folha.length} campos já na folha; ${pedidas} pedidos ao modelo; ${r.pacote.fontes.length} fonte(s); ${r.chamadas} chamada(s)`);
  console.log(`  chamada única: ${tk(r.pacote.caracteres)} de entrada${usd(r.pacote.tokensEstimados, P.entrada)}; saída ≈ ${n(saida)} tokens${usd(saida, P.saida)}`);
  console.log(`  com 1 correção (pior caso): entrada ≈ ${n(2 * r.pacote.tokensEstimados + saida)} tokens${usd(2 * r.pacote.tokensEstimados + saida, P.entrada)}`);
}
