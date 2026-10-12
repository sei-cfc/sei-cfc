/**
 * Derivações que o motor de modelos roda pela diretiva `@calcula <nome>`: porte fiel do
 * scripts/calculos.py da skill gelic (e do por_extenso_reais do gelic_lib.py, de que ele depende).
 *
 * O modelo só informa dados dos autos (valores atuais, percentual, datas); aqui saem, por código,
 * os valores reajustados, totais, extensos, ordinais e datas por extenso. Valor informado que diverge
 * do calculado é recusado (ErroCalculo, mensagem igual à do Python; o motor a converte em ErroModelo).
 *
 * Dinheiro em Decimal, nunca em float: o Python usa decimal.Decimal com o contexto padrão
 * (28 algarismos significativos, arredondamento "meio para o par" nas operações) e quantiza
 * centavos com ROUND_HALF_UP. Reproduzimos isso com BigInt para o reajuste dar o mesmo centavo
 * mesmo com percentual de muitas casas. Funções puras, sem DOM.
 */
import { ehDict, ESPACO, pyRepr, pyStr, strip, tem, type Dicionario } from './python';

/** Equivale ao ValueError do calculos.py. */
export class ErroCalculo extends Error {
  override name = 'ErroCalculo';
}

// ---------------------------------------------------------------- Decimal (o necessário)

/** valor = c × 10^e. */
export interface Dec { c: bigint; e: number }

const PRECISAO = 28;
const p10 = (n: number): bigint => 10n ** BigInt(n);
const abs = (x: bigint): bigint => (x < 0n ? -x : x);

/** Arredonda ao contexto padrão do decimal do Python: 28 algarismos, meio para o par. */
function contexto(d: Dec): Dec {
  const digitos = abs(d.c).toString().length;
  if (digitos <= PRECISAO) return d;
  const corte = digitos - PRECISAO;
  const base = p10(corte);
  const sinal = d.c < 0n ? -1n : 1n;
  let q = abs(d.c) / base;
  const r = abs(d.c) % base;
  if (r * 2n > base || (r * 2n === base && q % 2n === 1n)) q += 1n;
  return { c: sinal * q, e: d.e + corte };
}

/** Decimal("…") de um texto já validado: só dígitos, com ou sem um ponto. */
export function dec(txt: string): Dec {
  const [int, frac = ''] = txt.split('.');
  return { c: BigInt(int + frac || '0'), e: -frac.length };
}
function alinhar(a: Dec, b: Dec): [bigint, bigint, number] {
  const e = Math.min(a.e, b.e);
  return [a.c * p10(a.e - e), b.c * p10(b.e - e), e];
}
export const somar = (a: Dec, b: Dec): Dec => { const [x, y, e] = alinhar(a, b); return contexto({ c: x + y, e }); };
export const multiplicar = (a: Dec, b: Dec): Dec => contexto({ c: a.c * b.c, e: a.e + b.e });
/** a / 100: exato, salvo se passar de 28 algarismos (aí o contexto arredonda, como no Python). */
const centesimo = (a: Dec): Dec => contexto({ c: a.c, e: a.e - 2 });
export function comparar(a: Dec, b: Dec): number {
  const [x, y] = alinhar(a, b);
  return x < y ? -1 : x > y ? 1 : 0;
}

/** -a (o Dec não tem zero com sinal: quem precisa do "-0,00" do Python trata à parte). */
export const negar = (a: Dec): Dec => ({ c: -a.c, e: a.e });
/**
 * a / b no contexto padrão do decimal do Python (28 algarismos, meio para o par): exato quando cabe, senão
 * arredondado. Quando a divisão não é exata, um algarismo 1 depois do último decide o arredondamento (o resto
 * não nulo nunca é "meio" exato). Usado só pelos cálculos do perfil CFC (calculos-cfc.ts).
 */
export function dividir(a: Dec, b: Dec): Dec {
  if (b.c === 0n) throw new ErroCalculo('divisão por zero');
  if (a.c === 0n) return { c: 0n, e: a.e - b.e };
  const sinal = (a.c < 0n) !== (b.c < 0n) ? -1n : 1n;
  const x = abs(a.c);
  const y = abs(b.c);
  const k = Math.max(0, PRECISAO + 2 + y.toString().length - x.toString().length);
  const num = x * p10(k);
  let q = num / y;
  let e = a.e - b.e - k;
  if (num % y !== 0n) { q = q * 10n + 1n; e -= 1; }
  return contexto({ c: sinal * q, e });
}

/** quantize(Decimal("0.01"), ROUND_HALF_UP): o resultado tem sempre e = -2. */
export function centavos(d: Dec): Dec {
  if (d.e >= -2) return { c: d.c * p10(d.e + 2), e: -2 };
  const base = p10(-2 - d.e);
  const sinal = d.c < 0n ? -1n : 1n;
  let q = abs(d.c) / base;
  if ((abs(d.c) % base) * 2n >= base) q += 1n;
  return { c: sinal * q, e: -2 };
}

/** str(Decimal) do Python (notação científica quando o expoente pede). */
export function decTexto(d: Dec): string {
  const sinal = d.c < 0n ? '-' : '';
  const digitos = abs(d.c).toString();
  const ajustado = d.e + digitos.length - 1;
  if (d.e <= 0 && ajustado >= -6) {
    if (d.e === 0) return sinal + digitos;
    const casas = -d.e;
    const inteiro = digitos.length > casas ? digitos.slice(0, digitos.length - casas) : '0';
    return `${sinal}${inteiro}.${digitos.padStart(casas, '0').slice(-casas)}`;
  }
  const mant = digitos.length > 1 ? `${digitos[0]}.${digitos.slice(1)}` : digitos;
  return `${sinal}${mant}E${ajustado < 0 ? '-' : '+'}${Math.abs(ajustado)}`;
}

/** Decimal.normalize(): sem zeros à direita. */
export function normalizar(d: Dec): Dec {
  if (d.c === 0n) return { c: 0n, e: 0 };
  let { c, e } = contexto(d);
  while (c % 10n === 0n) { c /= 10n; e += 1; }
  return { c, e };
}

// ---------------------------------------------------------------- números

const CENTAVO_MSG = '(use 54.368,53)';
const RE_REAIS = new RegExp(`^R\\$[${ESPACO}]*`);
/** Desembrulha {"valor": ...}. */
const v = (x: unknown): unknown => (ehDict(x) && tem(x, 'valor') ? x.valor : x);
/** str(_v(s) if s is not None else "") */
const textoDe = (s: unknown): string => (s === null || s === undefined ? '' : pyStr(v(s)));

/** '54.368,53' ou 'R$ 54.368,53' → 54368.53. */
export function brl(s: unknown): Dec {
  let txt = strip(textoDe(s));
  txt = txt.replace(RE_REAIS, '');
  if (!/^(?:\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2})$/.test(txt)) throw new ErroCalculo(`valor em reais inválido: ${pyRepr(txt)} ${CENTAVO_MSG}`);
  return dec(txt.replaceAll('.', '').replace(',', '.'));
}

/** 56891.95 → '56.891,95' (sem R$). */
export function fmtBrl(d: Dec): string {
  const q = centavos(d);
  const sinal = q.c < 0n ? '-' : '';
  const t = abs(q.c).toString().padStart(3, '0');
  let inteiro = t.slice(0, -2);
  const cent = t.slice(-2);
  const grupos: string[] = [];
  while (inteiro) { grupos.unshift(inteiro.slice(-3)); inteiro = inteiro.slice(0, -3); }
  return `${sinal}${grupos.join('.')},${cent}`;
}

/** '4,641330%' ou '4,64133' → 4.641330; tem de ser > 0 e < 100. */
export function pct(s: unknown): Dec {
  const txt = strip(strip(textoDe(s)).replace(/%+$/, ''));
  if (!/^\d+(?:,\d+)?$/.test(txt)) throw new ErroCalculo(`percentual inválido: ${pyRepr(s ?? null)} (use 4,641330%)`);
  const p = dec(txt.replace(',', '.'));
  if (!(comparar(p, dec('0')) > 0 && comparar(p, dec('100')) < 0)) throw new ErroCalculo(`percentual fora do intervalo (0, 100): ${pyRepr(s ?? null)}`);
  return p;
}

/** 1 + p / 100, no contexto do Python. */
export const fatorDe = (p: Dec): Dec => somar(dec('1'), centesimo(p));
export const reajustar = (valor: Dec, p: Dec): Dec => centavos(multiplicar(valor, fatorDe(p)));

// ---------------------------------------------------------------- valor por extenso (gelic_lib.por_extenso_reais)

const U = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze',
  'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const D = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const C = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

function ate999(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'cem';
  const c = Math.floor(n / 100), r = n % 100, d = Math.floor(r / 10), u = r % 10;
  // No Python, n ≥ 1000 estoura o índice (IndexError): só acontece de um trilhão de reais para cima.
  if (c >= C.length) throw new ErroCalculo(`valor grande demais para escrever por extenso: ${n}`);
  const partes: string[] = [];
  if (c) partes.push(C[c]);
  if (r < 20) { if (r) partes.push(U[r]); } else partes.push(D[d] + (u ? ` e ${U[u]}` : ''));
  return partes.join(' e ');
}
function grupo(n: number, singular: string, plural: string): string {
  if (n === 0) return '';
  if (singular === 'mil') return n === 1 ? 'mil' : `${ate999(n)} mil`;
  return n === 1 ? `um ${singular}` : `${ate999(n)} ${plural}`;
}

/** Valor (já em centavos exatos) por extenso em reais, como o gelic_lib.por_extenso_reais. */
export function extenso(d: Dec): string {
  const q = centavos(d);
  if (q.c < 0n) throw new ErroCalculo(`valor negativo não se escreve por extenso: ${fmtBrl(q)}`);
  const inteiroBig = q.c / 100n;
  const cent = Number(q.c % 100n);
  const inteiro = Number(inteiroBig);
  const bil = Math.floor(inteiro / 1e9), r1 = inteiro % 1e9;
  const mi = Math.floor(r1 / 1e6), r2 = r1 % 1e6;
  const mil = Math.floor(r2 / 1000), cen = r2 % 1000;
  const partes = [grupo(bil, 'bilhão', 'bilhões'), grupo(mi, 'milhão', 'milhões'), grupo(mil, 'mil', 'mil'), ate999(cen)].filter(g => g);
  let txt: string;
  if (!partes.length) txt = 'zero reais';
  else {
    // "e" antes do último grupo quando ele é < 100 ou múltiplo de 100 (regra usual); vírgula nos demais
    const sep = (cen && (cen < 100 || cen % 100 === 0)) || !cen ? ' e ' : ', ';
    txt = partes.length > 1 ? partes.slice(0, -1).join(', ') + sep + partes[partes.length - 1] : partes[0];
    if (inteiro >= 1e6 && mil === 0 && cen === 0) txt += ' de';
    txt += inteiro === 1 ? ' real' : ' reais';
  }
  if (cent) {
    const centavosTxt = ate999(cent) + (cent === 1 ? ' centavo' : ' centavos');
    txt = !inteiro ? centavosTxt : `${txt} e ${centavosTxt}`;
  }
  return txt;
}

// ---------------------------------------------------------------- palavras e datas

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const ORD = ['PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO', 'QUINTO', 'SEXTO', 'SÉTIMO', 'OITAVO', 'NONO'];
export const ORDINAIS_M: readonly string[] = [...ORD, 'DÉCIMO', ...ORD.map(o => `DÉCIMO ${o}`), 'VIGÉSIMO'];

/** int(texto) do Python: espaços em volta, sinal, sublinhado entre dígitos ("1_0"). Só dígitos ASCII. */
function inteiroPy(txt: string): number | null {
  const t = strip(txt);
  if (!/^[+-]?\d+(?:_\d+)*$/.test(t)) return null;
  return Number(t.replaceAll('_', ''));
}

export function ordinalMasculino(n: unknown): string {
  const i = inteiroPy(pyStr(v(n)));
  if (i === null) throw new ErroCalculo(`número de ordem inválido: ${pyRepr(n)}`);
  if (!(i >= 1 && i <= ORDINAIS_M.length)) throw new ErroCalculo(`número de ordem fora de 1 a ${ORDINAIS_M.length}: ${i}`);
  return ORDINAIS_M[i - 1];
}

export interface Data { dia: number; mes: number; ano: number }

export function paraData(s: unknown): Data {
  const txt = strip(textoDe(s));
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(txt);
  if (!m) throw new ErroCalculo(`data inválida: ${pyRepr(txt)} (use dd/mm/aaaa)`);
  const [dia, mes, ano] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const bissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  const dias = [31, bissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (ano < 1 || mes < 1 || mes > 12 || dia < 1 || dia > dias[mes - 1]) throw new ErroCalculo(`data inexistente: ${pyRepr(txt)}`);
  return { dia, mes, ano };
}

/** date.strftime("%d/%m/%Y") */
const ddmmaaaa = (d: Data): string => `${String(d.dia).padStart(2, '0')}/${String(d.mes).padStart(2, '0')}/${String(d.ano).padStart(4, '0')}`;

export function dataExtenso(s: unknown): string {
  const d = paraData(s);
  return `${d.dia === 1 ? '1º' : String(d.dia)} de ${MESES[d.mes - 1]} de ${d.ano}`;
}

// ---------------------------------------------------------------- apostilamento de reajuste

/** Cópia rasa de ctx[chave] posta de volta em ctx: o cálculo não altera os dados de quem chamou. */
function no(ctx: Dicionario, chave: string): Dicionario {
  const x = tem(ctx, chave) ? ctx[chave] : null;
  if (!ehDict(x) || tem(x, 'valor')) throw new ErroCalculo(`dados sem '${chave}' (objeto com campos, sem 'valor')`);
  const copia = { ...x };
  ctx[chave] = copia;
  return copia;
}
const campo = (d: Dicionario, k: string): unknown => (tem(d, k) ? d[k] : null);
const vazio = (x: unknown): boolean => x === null || x === undefined || x === '';

/** Completa ctx com ordinal, datas por extenso, parcelas reajustadas e total anual. */
export function apostilamentoReajuste(ctx: Dicionario): void {
  const apost = no(ctx, 'apostilamento');
  const reaj = no(ctx, 'reajuste');
  if (!tem(apost, 'numero')) throw new ErroCalculo("dados sem 'apostilamento.numero'");
  apost.ordinal = ordinalMasculino(apost.numero);

  const base = paraData(campo(reaj, 'data_base'));
  const efeitos = paraData(campo(reaj, 'efeitos'));
  if (efeitos.dia !== base.dia || efeitos.mes !== base.mes || efeitos.ano <= base.ano) {
    throw new ErroCalculo(`efeitos financeiros (${pyStr(v(reaj.efeitos))}) não é aniversário da data-base (${pyStr(v(reaj.data_base))})`);
  }
  reaj.data_base_extenso = dataExtenso(ddmmaaaa(base));
  reaj.efeitos_extenso = dataExtenso(ddmmaaaa(efeitos));

  const p = pct(campo(reaj, 'percentual'));
  const fator = fatorDe(p);
  const parcelas = v(campo(reaj, 'parcelas'));
  if (!Array.isArray(parcelas) || !parcelas.length) throw new ErroCalculo('reajuste.parcelas tem de ser lista não vazia');
  const saida: Dicionario[] = [];
  let total = dec('0');
  parcelas.forEach((item: unknown, i) => {
    if (!ehDict(item)) throw new ErroCalculo(`parcela ${i + 1}: esperado objeto com descricao, periodicidade e valor_atual`);
    for (const c of ['descricao', 'periodicidade', 'valor_atual']) {
      if (vazio(v(campo(item, c)))) throw new ErroCalculo(`parcela ${i + 1}: falta '${c}'`);
    }
    const desc = pyStr(v(item.descricao));
    const per = strip(pyStr(v(item.periodicidade))).toLowerCase();
    if (per !== 'mensal' && per !== 'anual') throw new ErroCalculo(`parcela '${desc}': periodicidade ${pyRepr(per)} (use mensal ou anual)`);
    const atual = brl(item.valor_atual);
    const novo = reajustar(atual, p);
    const informado = v(campo(item, 'valor_reajustado_informado'));
    if (!vazio(informado) && comparar(brl(informado), novo) !== 0) {
      throw new ErroCalculo(`parcela '${desc}': valor reajustado informado ${fmtBrl(brl(informado))} difere do calculado ${fmtBrl(novo)} (${fmtBrl(atual)} × ${decTexto(normalizar(fator))})`);
    }
    const mensal = per === 'mensal';
    const anualAtual = mensal ? multiplicar(atual, dec('12')) : atual;
    const anualNovo = mensal ? multiplicar(novo, dec('12')) : novo;
    total = somar(total, anualNovo);
    const resto = parcelas.length - 1 - i;
    saida.push({
      ...item,
      valor_atual: fmtBrl(atual), valor_atual_extenso: extenso(atual),
      valor_reajustado: fmtBrl(novo), valor_reajustado_extenso: extenso(novo),
      mensal,
      anual_atual: fmtBrl(anualAtual), anual_atual_extenso: extenso(anualAtual),
      anual_reajustado: fmtBrl(anualNovo), anual_reajustado_extenso: extenso(anualNovo),
      fim: resto === 0 ? '.' : resto === 1 ? '; e' : ';',
    });
  });
  const informado = v(campo(reaj, 'total_informado'));
  if (!vazio(informado) && comparar(brl(informado), total) !== 0) {
    throw new ErroCalculo(`total anual informado ${fmtBrl(brl(informado))} difere do calculado ${fmtBrl(total)}`);
  }
  reaj.parcelas = saida;
  reaj.total_anual = fmtBrl(total);
  reaj.total_anual_extenso = extenso(total);
  reaj.composto = saida.length > 1;
}

export interface Calculo {
  calcular: (ctx: Dicionario) => void;
  /** Variáveis que o cálculo gera: o formulário não as pede. */
  derivados: ReadonlySet<string>;
}

/** nome → (função que completa ctx, variáveis derivadas que o formulário não pede). */
export const CALCULOS: Readonly<Record<string, Calculo>> = {
  apostilamento_reajuste: {
    calcular: apostilamentoReajuste,
    derivados: new Set(['apostilamento.ordinal', 'reajuste.data_base_extenso', 'reajuste.efeitos_extenso',
      'reajuste.total_anual', 'reajuste.total_anual_extenso', 'reajuste.composto']),
  },
};

/** nome → dados que o cálculo lê sem que o template os cite como {var}: o formulário tem de pedi-los. */
export const ENTRADAS: Readonly<Record<string, readonly string[]>> = {
  apostilamento_reajuste: ['apostilamento.numero', 'reajuste.data_base', 'reajuste.efeitos', 'reajuste.total_informado'],
};

/**
 * Só no TS (o Python não detalha campos de lista no formulário): para a lista que um cálculo
 * processa, os campos que quem preenche informa. Os demais campos citados no modelo
 * ({.valor_reajustado}, {.anual_atual_extenso}…) saem do cálculo e não são pedidos.
 */
export const CAMPOS_LISTA: Readonly<Record<string, readonly string[]>> = {
  'reajuste.parcelas': ['descricao', 'periodicidade', 'valor_atual', 'valor_reajustado_informado'],
};
