/**
 * Medição de custo dos documentos por modelo (gelic_modelo_analisar), sobre pacotes sintéticos: a autorização de
 * contratação direta (tests/modelos-fluxo.ts) e o termo aditivo de prorrogação (a prorrogação de
 * tests/dvi-preparar.ts). Mede a chamada única (ctx.completar) e quantas variáveis o código já preencheu.
 * Tokens estimados = caracteres / 2,4.
 *
 *   npx tsx tests/custo-modelos.ts
 *   PRECO_ENTRADA=1 PRECO_SAIDA=5 npx tsx tests/custo-modelos.ts   # US$ por milhão de tokens
 */
import type { ContextoTool } from '../../agente-ia/src/motor/tools';
import { SKILLS } from '../../agente-ia/src/skills';
import { analisarModelo } from '../src/agente/modelos';
import { estimarTokens } from '../src/dvi/prompt';
import { contextoFalso, PRORROGACAO, type DocFalso } from './dvi-preparar';
import { INEXIGIBILIDADE } from './modelos-fluxo';

const preco = (v?: string) => (v ? Number(v) : NaN);
const P = { entrada: preco(process.env.PRECO_ENTRADA), saida: preco(process.env.PRECO_SAIDA) };
const usd = (tokens: number, porMilhao: number) => (Number.isFinite(porMilhao) ? ` ≈ US$ ${((tokens * porMilhao) / 1e6).toFixed(4)}` : '');
const n = (x: number) => x.toLocaleString('pt-BR');
const skill = (SKILLS['gelic-documento-modelo'] as { texto: string }).texto.length;
console.log(`skill gelic-documento-modelo: ${n(skill)} caracteres ≈ ${n(estimarTokens(skill))} tokens`);

for (const [nome, modelo, docs] of [
  ['autorização de contratação direta', 'autorizacao-contratacao-direta', INEXIGIBILIDADE],
  ['termo aditivo de prorrogação', 'termo-aditivo-prorrogacao', PRORROGACAO],
] as [string, string, DocFalso[]][]) {
  let pedidas = 0;
  const ctx = {
    ...contextoFalso(docs, { consentir: true }).ctx,
    async completar(_s: string, pedido: string) {
      const nomes = pedido.split('\n').filter(l => / \| (valor|condicao|lista) \| /.test(l)).map(l => l.split(' | ')[0]);
      pedidas = nomes.length;
      return JSON.stringify(Object.fromEntries(nomes.map(x => [x, null])));
    },
  } as unknown as ContextoTool;
  const r = await analisarModelo({ processo: '12345670000048.000009/2026-21', modelo, observacoes: 'medição' }, ctx, new Date(2026, 9, 9)) as { chamadas: number; folha: string[]; pacote: { caracteres: number; tokensEstimados: number; documentosNaoLidos: unknown[] } };
  const saida = estimarTokens(pedidas * 90);
  console.log(`\n${nome}: ${r.folha.length} variáveis na folha (a IA falsa responde null a tudo); ${pedidas} pedidas ao modelo; ${r.chamadas} chamada(s)`);
  console.log(`  chamada única: ${n(r.pacote.caracteres)} caracteres ≈ ${n(r.pacote.tokensEstimados)} tokens de entrada${usd(r.pacote.tokensEstimados, P.entrada)}; saída ≈ ${n(saida)} tokens${usd(saida, P.saida)}`);
  console.log(`  com 1 correção (pior caso): entrada ≈ ${n(2 * r.pacote.tokensEstimados + saida)} tokens${usd(2 * r.pacote.tokensEstimados + saida, P.entrada)}`);
}
