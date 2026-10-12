/**
 * Cálculos do perfil CFC: porte dos `@calcula` do motor do app "gera" (apps/gera/motor/calculos.py), que a skill
 * gelic não tem. Diferente dos da Gelic (calculos.ts), recebem o argumento da diretiva: `@calcula nome:arg`.
 * Paridade em tests/modelos-cfc.ts contra regras/modelos-cfc-paridade.json (gerado rodando o próprio Python).
 */
import { brl, centavos, comparar, dec, dividir, ErroCalculo, fmtBrl, multiplicar, negar, somar, type Dec } from './calculos';
import { ehDict, pyBool, pyRepr, strip, tem, type Dicionario } from './python';

export interface CalculoCfc {
  calcular: (ctx: Dicionario, ...args: string[]) => void;
  /** Variáveis que o cálculo gera: não são perguntas. */
  derivados: ReadonlySet<string>;
}

/** Desembrulha {"valor": ...}. */
const v = (x: unknown): unknown => (ehDict(x) && tem(x, 'valor') ? x.valor : x);
const obter = (ctx: Dicionario, chave: string): unknown => (tem(ctx, chave) ? ctx[chave] : null);

/** Numera cada parágrafo (separado por "\n\n") do campo `args[0]`; parágrafo vazio fica sem número. */
export function numerarParagrafos(ctx: Dicionario, ...args: string[]): void {
  const campo = args[0];
  if (!campo) throw new ErroCalculo('numerar_paragrafos exige o campo-alvo (ex.: @calcula numerar_paragrafos:justificativa)');
  const bruto = obter(ctx, campo);
  const texto = v(bruto);
  if (texto === null || texto === undefined || texto === '') return; // ainda não preenchido: sai ⟦campo⟧
  if (typeof texto !== 'string') throw new ErroCalculo(`numerar_paragrafos: campo ${pyRepr(campo)} não é texto`);
  let n = 0;
  const novo = texto.split('\n\n').map(p => (strip(p) === '' ? p : `${++n}. ${p}`)).join('\n\n');
  ctx[campo] = ehDict(bruto) && tem(bruto, 'valor') ? { ...bruto, valor: novo } : novo;
}

/** fmt_brl do Python, inclusive o "-0,00" de um negativo que arredonda a zero (o Decimal guarda o sinal). */
function fmtBrlComSinal(d: Dec): string {
  return d.c < 0n && centavos(d).c === 0n ? '-0,00' : fmtBrl(d);
}

/**
 * Mapa comparativo de preços: dos valores unitários pesquisados (campos de `args[0]`, separados por vírgula),
 * `media_fmt`/`mediana_fmt` e, havendo proposta, `economia_pct_fmt` (quanto a proposta fica abaixo da média,
 * em %). Valor ausente ou ilegível é ignorado; sem nenhum válido, nada é escrito (sai ⟦...⟧ no rascunho).
 */
export function estatisticaMcp(ctx: Dicionario, ...args: string[]): void {
  const campos = args.length ? args[0].split(',') : [];
  const valores: Dec[] = [];
  for (const campo of campos) {
    const bruto = v(obter(ctx, strip(campo)));
    if (!pyBool(bruto)) continue;
    try {
      valores.push(brl(bruto));
    } catch (e) {
      if (!(e instanceof ErroCalculo)) throw e;
    }
  }
  if (!valores.length) return;
  const ordenados = [...valores].sort(comparar);
  const n = ordenados.length;
  const media = dividir(ordenados.reduce(somar, dec('0')), dec(String(n)));
  const mediana = n % 2 ? ordenados[(n - 1) / 2] : dividir(somar(ordenados[n / 2 - 1], ordenados[n / 2]), dec('2'));
  ctx.media_fmt = fmtBrl(media);
  ctx.mediana_fmt = fmtBrl(mediana);
  const propostaBruta = v(obter(ctx, 'proposta_valor_unitario'));
  if (pyBool(propostaBruta) && comparar(media, dec('0')) > 0) {
    let proposta: Dec;
    try {
      proposta = brl(propostaBruta);
    } catch (e) {
      if (e instanceof ErroCalculo) return;
      throw e;
    }
    ctx.economia_pct_fmt = fmtBrlComSinal(multiplicar(dividir(somar(media, negar(proposta)), media), dec('100')));
  }
}

/** nome → (função, derivados). O CALCULOS do gera não tem o apostilamento_reajuste da Gelic. */
export const CALCULOS_CFC: Readonly<Record<string, CalculoCfc>> = {
  numerar_paragrafos: { calcular: numerarParagrafos, derivados: new Set() },
  estatistica_mcp: { calcular: estatisticaMcp, derivados: new Set(['media_fmt', 'mediana_fmt', 'economia_pct_fmt']) },
};
