/**
 * Medição de custo do DVI barato, sobre os pacotes sintéticos de tests/dvi-preparar.ts (preparatória e
 * prorrogação): o tamanho da chamada única (ctx.completar) e uma estimativa das rodadas do agente principal
 * (prompt de sistema + esquemas das ferramentas, que vão a cada rodada; o cache de prompt do provedor cobre esse
 * prefixo fixo a partir da 2ª rodada). Tokens estimados = caracteres / 2,4.
 *
 *   npx tsx tests/custo-dvi.ts
 *   PRECO_ENTRADA=3 PRECO_CACHE=0.3 PRECO_SAIDA=15 npx tsx tests/custo-dvi.ts   # US$ por milhão de tokens
 */
import { promptSistema } from '../../agente-ia/src/motor/prompt';
import { RegistroTools } from '../../agente-ia/src/motor/tools';
import { SKILLS } from '../../agente-ia/src/skills';
import { TOOLS_SEI } from '../../agente-ia/src/tools/sei';
import { prepararDvi } from '../src/dvi/preparar/index';
import { estimarTokens, requisicaoDvi } from '../src/dvi/prompt';
import { contextoFalso, HOJE, PREPARATORIA, PRORROGACAO } from './dvi-preparar';

const RODADAS = 4;
const preco = (v?: string) => (v ? Number(v) : NaN);
const P = { entrada: preco(process.env.PRECO_ENTRADA), cache: preco(process.env.PRECO_CACHE), saida: preco(process.env.PRECO_SAIDA) };
const usd = (tokens: number, porMilhao: number) => (Number.isFinite(porMilhao) ? ` ≈ US$ ${((tokens * porMilhao) / 1e6).toFixed(3)}` : '');
const n = (x: number) => x.toLocaleString('pt-BR');

const skills = Object.entries(SKILLS).map(([slug, s]) => ({ slug, nome: (s as { nome?: string }).nome ?? slug, descricao: (s as { descricao: string }).descricao }));
const sistema = promptSistema(null, new Date(2026, 9, 9), '', skills);
const ferramentas = JSON.stringify(new RegistroTools(TOOLS_SEI).paraProvedor());
const fixo = sistema.length + ferramentas.length;
const skillDvi = (SKILLS['gelic-gerar-dvi'] as { texto: string }).texto.length;

console.log('Agente principal (por rodada):');
console.log(`  prompt de sistema ${n(sistema.length)} caracteres + ${TOOLS_SEI.length} ferramentas ${n(ferramentas.length)} = ${n(fixo)} caracteres ≈ ${n(estimarTokens(fixo))} tokens`);
console.log(`  skill gelic-gerar-dvi: ${n(skillDvi)} caracteres ≈ ${n(estimarTokens(skillDvi))} tokens`);

for (const [nome, docs] of [['preparatória', PREPARATORIA], ['prorrogação', PRORROGACAO]] as const) {
  const p = await prepararDvi('12345670000048.000007/2026-13', contextoFalso(docs, { consentir: true }).ctx, { hoje: HOJE });
  const r = requisicaoDvi(p);
  // resposta: ~1 linha por item do checklist + uns achados
  const saida = estimarTokens(p.checklist.length * 60 + 3000);
  // o que volta à conversa: resumo + achados (JSON) + avisos — o pacote nunca volta
  const volta = estimarTokens(p.checklist.length * 60 + 4000);
  // rodadas: 1) skill_ler  2) gelic_dvi_analisar  3) resumo ao usuário  4) gelic_dvi_gravar; histórico cresce
  const historico = [0, estimarTokens(skillDvi), estimarTokens(skillDvi) + volta, estimarTokens(skillDvi) + 2 * volta];
  const prefixo = estimarTokens(fixo);
  const semCache = historico.reduce((s, h) => s + prefixo + h, 0);
  const comCache = { cheio: prefixo + historico.reduce((s, h) => s + h, 0), cacheado: prefixo * (RODADAS - 1) };
  console.log(`\n${nome}: ${p.documentos.length} documentos lidos, ${p.checklist.length} itens, ${p.checagens.length} checagens, ${p.limites.documentosNaoLidos.length} não lidos`);
  console.log(`  chamada única: sistema ${n(r.sistema.length)} + pedido ${n(r.pedido.length)} = ${n(r.caracteres)} caracteres ≈ ${n(r.tokensEstimados)} tokens de entrada${usd(r.tokensEstimados, P.entrada)}; saída ≈ ${n(saida)} tokens${usd(saida, P.saida)}`);
  console.log(`  com 1 correção (pior caso): entrada ≈ ${n(2 * r.tokensEstimados + saida)} tokens${usd(2 * r.tokensEstimados + saida, P.entrada)}`);
  console.log(`  ${RODADAS} rodadas do agente principal: ≈ ${n(semCache)} tokens de entrada sem cache${usd(semCache, P.entrada)}; com cache do prefixo: ${n(comCache.cheio)} cheios${usd(comCache.cheio, P.entrada)} + ${n(comCache.cacheado)} lidos do cache${usd(comCache.cacheado, P.cache)}`);
  const total = r.tokensEstimados + comCache.cheio;
  console.log(`  total por DVI (1 chamada + ${RODADAS} rodadas com cache): ≈ ${n(total)} tokens cheios + ${n(comCache.cacheado)} do cache + ≈ ${n(saida + 4 * 400)} de saída`);
}
