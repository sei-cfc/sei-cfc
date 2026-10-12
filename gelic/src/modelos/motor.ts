/**
 * Motor de modelos de documento da Gelic: porte fiel do scripts/preencher.py da skill gelic,
 * sobre os MESMOS modelos (gelic/regras/modelos/*.md, variaveis.json, constantes.json e
 * assinaturas.json, copiados da skill e convertidos em src/modelos/dados.gerado.ts). Paridade
 * conferida por tests/modelos.ts contra regras/modelos-paridade.json (gerado rodando o próprio
 * preencher.py): o `texto` sai byte a byte igual ao do Python, e as recusas com a mesma mensagem.
 *
 * Sintaxe do modelo (resumo; a referência é a docstring do preencher.py):
 *   {var} {a.b} {var|cap|maiusculas|minusculas}   valor (texto ou {"valor", "sei", "p", "nota"})
 *   {#x}…{/x}  {^x}…{/x}  {*lista}…{/lista} com {.campo} {._n} {._letra}
 *   {§} {§§} {§§§} {§§§§} {§@rot} {§ref@rot}; na linha "## ": {§cl} {§sec}
 *   @requer var=valor  @padrao var=caminho  @calcula nome  @origem rótulo  @fonte nome  @cabecalho
 *   # título  ## cláusula  > sem recuo  ::: ementa  | tabela |  **negrito**  %% comentário
 * Variável usada e sem valor é recusa: nada sai em branco.
 *
 * O que muda em relação ao Python: em vez de HTML de visualização (para_html), os blocos tipados
 * (`Bloco`) e o corpo para o editor do SEI (`paraHtmlSei`), só com as classes de parágrafo do SEI.
 * Funções puras: sem DOM, sem rede.
 */
// Gerado de regras/modelos/ (o agente-ia não importa .md nem JSON): npm run gerar.
import { ASSINATURAS_JSON, CONSTANTES_JSON, MODELOS_MD, VARIAVEIS_JSON } from './dados.gerado';
import { CALCULOS, CAMPOS_LISTA, ENTRADAS, ErroCalculo } from './calculos';
import { CALCULOS_CFC } from './calculos-cfc';
import { capitalizarPrimeira, ehDict, ESPACO, pyBool, pyRepr, pyStr, rstrip, strip, tem, type Dicionario } from './python';

export interface InfoModelo {
  id: string;
  nome: string;
  /** 'modelo PROJUR' | 'modelo AGU' | 'modelo CFC' | 'modelo CFC (8.666)' | 'modelo Gelic' (como o `gelic.py modelos`). */
  origem: string;
  /** Condições do @requer (ex.: { regime: '14133' }); ausente se o modelo não exige nada. */
  requer?: Record<string, string>;
}
export interface VariavelFormulario {
  nome: string;
  tipo: 'valor' | 'condicao' | 'lista';
  /** Quem preenche, de variaveis.json: autos | agente | regra | calculo (| '?' fora do dicionário). */
  fonte: string;
  descricao: string;
  /**
   * Os campos de cada item ({.campo} dentro do {*lista}), sempre que a variável é lista em algum ponto do
   * modelo — mesmo quando o tipo, que é o do primeiro uso, saiu 'condicao'. Detalhe do TS; o Python não os lista.
   */
  campos?: VariavelFormulario[];
}
export type Bloco =
  | { tipo: 'titulo'; texto: string }
  | { tipo: 'clausula'; texto: string }
  | { tipo: 'item'; nivel: 1 | 2 | 3 | 4; texto: string }
  | { tipo: 'paragrafo'; texto: string; recuo: boolean }
  | { tipo: 'ementa'; texto: string }
  | { tipo: 'tabela'; linhas: string[][]; cabecalho: boolean }
  | { tipo: 'cabecalho' };
export interface ItemValidacao {
  variavel: string;
  /** Como a folha de validação do Python mostra: condição = "sim"/"não", lista = "N item(ns)". */
  valor: string;
  sei?: string;
  p?: number;
  fonte: string;
  nota?: string;
  /** "SEI x, p. y, nota" exatamente como a coluna "evidência" da folha do Python ('' se não há). */
  evidencia: string;
}
export interface Preenchido {
  id: string;
  blocos: Bloco[];
  /** Exatamente o documento que o preencher.py devolve (e imprime com --texto), terminado em um "\n". */
  texto: string;
  validacao: ItemValidacao[];
  avisos: string[];
}

/** Recusa do modelo (o ErroTemplate do Python, mais o "sem valor" que o Python dá na saída). */
export class ErroModelo extends Error {
  override name = 'ErroModelo';
  /** Na recusa por variável sem valor: as variáveis e o texto com ⟦var⟧ nos buracos. */
  faltando?: string[];
  texto?: string;
}

const MODELOS: Readonly<Record<string, string>> = MODELOS_MD;
const DIC = VARIAVEIS_JSON as Record<string, { fonte: string; descricao: string }>;

// ---------------------------------------------------------------- regex do Python → JS
// `^`/`$` com re.M no Python só olham "\n"; o `m` do JS também para em \r e nos separadores de linha/parágrafo do Unicode, que
// podem vir num valor dos autos. Por isso as âncoras de linha são escritas à mão, e `.` vira [^\n].
const INICIO = '(?<![^\\n])';
const FIM_LINHA = '(?![^\\n])';
const NE = `[^${ESPACO}]`; // \S do Python
const linhas = (corpo: string, flags = 'g') => new RegExp(`${INICIO}${corpo}${FIM_LINHA}`, flags);
const RE_REQUER = linhas(`@requer (${NE}+)=(${NE}+)`);
const RE_PADRAO = linhas(`@padrao (${NE}+)=(${NE}+)`);
const RE_CALCULA = linhas(`@calcula (${NE}+)`);
const RE_FONTE = linhas(`@fonte (${NE}+)`, '');
const RE_ORIGEM = linhas('@origem ([^\\n]+)', '');
const RE_TITULO = linhas('# ([^\\n]+)', '');
const RE_DIRETIVA = new RegExp(`${INICIO}@(requer|padrao|fonte|calcula|origem) [^\\n]*\\n`, 'g');
const RE_COMENTARIO = new RegExp(`${INICIO}%%[^\\n]*\\n`, 'g');
const RE_COMENTARIO_DEPOIS = new RegExp(`${INICIO}%%[^\\n]*(\\n|$)`, 'g');
const TOKEN = /\{([#^*/]?)(\.?[A-Za-z_][A-Za-z0-9_.]*|\.)(?:\|([a-z]+))?\}/g;
const FILTROS: Record<string, (s: string) => string> = {
  cap: capitalizarPrimeira,
  maiusculas: s => s.toUpperCase(),
  minusculas: s => s.toLowerCase(),
};
const LETRAS = 'abcdefghijklmnopqrstuvwxyz';

const normalizarFonte = (fonte: string) => fonte.replace(/\r\n?/g, '\n'); // read_text() do Python
function fonteDe(id: string): string {
  if (!tem(MODELOS, id)) throw new ErroModelo(`modelo desconhecido: ${id}`);
  return normalizarFonte(MODELOS[id]);
}

// ---------------------------------------------------------------- valores

function valorBruto(nome: string, pilha: readonly unknown[]): unknown {
  let alvo: unknown;
  let partes: string[];
  if (nome.startsWith('.')) {
    alvo = pilha.length > 1 ? pilha[pilha.length - 1] : {};
    partes = nome.slice(1).split('.');
  } else {
    alvo = pilha[0];
    partes = nome.split('.');
  }
  for (const p of partes) {
    // {"valor": {...}, "sei": ...}: o caminho continua dentro do valor
    if (ehDict(alvo) && tem(alvo, 'valor') && !tem(alvo, p)) alvo = alvo.valor;
    if (!ehDict(alvo) || !tem(alvo, p)) return null;
    alvo = alvo[p];
  }
  return alvo ?? null;
}

/** Verdadeiro = existe, não vazio, não false (e não 0: no Python, 0 == False). */
export function verdadeiro(v: unknown): boolean {
  if (ehDict(v) && tem(v, 'valor')) v = v.valor;
  return pyBool(v);
}

// ---------------------------------------------------------------- árvore e render

export type No = string | { t: 'var'; nome: string; filtro?: string } | { t: '#' | '^' | '*'; nome: string; filhos: No[] };

export function analisar(texto: string): No[] {
  const raiz: No[] = [];
  const pilha: [string, No[]][] = [];
  let atual = raiz;
  let pos = 0;
  for (const m of texto.matchAll(TOKEN)) {
    atual.push(texto.slice(pos, m.index));
    pos = m.index! + m[0].length;
    const [, tipo, nome, filtro] = m;
    if (filtro && !tem(FILTROS, filtro)) throw new ErroModelo(`filtro desconhecido: |${filtro}`);
    if (tipo === '#' || tipo === '^' || tipo === '*') {
      const no = { t: tipo as '#' | '^' | '*', nome, filhos: [] as No[] };
      atual.push(no);
      pilha.push([nome, atual]);
      atual = no.filhos;
    } else if (tipo === '/') {
      if (!pilha.length || pilha[pilha.length - 1][0] !== nome) throw new ErroModelo(`{/${nome}} sem abertura correspondente`);
      atual = pilha.pop()![1];
    } else atual.push({ t: 'var', nome, filtro });
  }
  if (pilha.length) throw new ErroModelo(`bloco {${pilha[pilha.length - 1][0]}} não fechado`);
  atual.push(texto.slice(pos));
  return raiz;
}

type Usado = [string, unknown];

/** `proteger` (só no modo CFC): o que o valor substituído passa antes de entrar no texto (o _proteger_valor do gera). */
function render(arvore: readonly No[], pilha: readonly unknown[], usados: Usado[], faltando: string[], proteger?: (s: string) => string): string {
  let saida = '';
  for (const no of arvore) {
    if (typeof no === 'string') { saida += no; continue; }
    if (no.t === 'var') {
      const v = valorBruto(no.nome, pilha);
      if (v === null || v === '') {
        faltando.push(no.nome);
        saida += `⟦${no.nome}⟧`;
        continue;
      }
      if (!no.nome.startsWith('.')) usados.push([no.nome, v]);
      const txt = pyStr(ehDict(v) && tem(v, 'valor') ? v.valor : v);
      const filtrado = no.filtro ? FILTROS[no.filtro](txt) : txt;
      saida += proteger ? proteger(filtrado) : filtrado;
      continue;
    }
    const v = valorBruto(no.nome, pilha);
    if (!no.nome.startsWith('.')) usados.push([no.nome, v ?? false]);
    if (no.t === '#' && verdadeiro(v)) saida += render(no.filhos, pilha, usados, faltando, proteger);
    else if (no.t === '^' && !verdadeiro(v)) saida += render(no.filhos, pilha, usados, faltando, proteger);
    else if (no.t === '*') {
      const itens = Array.isArray(v) ? v : [];
      if (!itens.length) faltando.push(no.nome);
      itens.forEach((item: unknown, i) => {
        const ctxItem: Dicionario = ehDict(item) ? { ...item } : { valor: item };
        ctxItem._n = String(i + 1);
        ctxItem._letra = LETRAS[i % 26];
        saida += render(no.filhos, [...pilha, ctxItem], usados, faltando, proteger);
      });
    }
  }
  return saida;
}

// ---------------------------------------------------------------- numeração

const ORD = ['PRIMEIRA', 'SEGUNDA', 'TERCEIRA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÉTIMA', 'OITAVA', 'NONA'];
const ORDINAIS = [...ORD, 'DÉCIMA', ...ORD.map(o => `DÉCIMA ${o}`), 'VIGÉSIMA', ...ORD.map(o => `VIGÉSIMA ${o}`)];
const NUM = /\{§(§{0,3})(?:@([a-z0-9_]+))?\}/g;

/**
 * Numeração depois das variantes, para o documento nunca ter buraco (1.1, 1.3) nem cláusula fora
 * de ordem. Cada número de item sai precedido de `marca` + nível (1–4): é assim que os blocos
 * sabem, sem adivinhar pelo texto, que parágrafo é item. A marca sai do `texto` no fim.
 */
function numerar(texto: string, marca: string): string {
  const rotulos = new Map<string, string>();
  let sec = 0;
  let niveis = [0, 0, 0, 0];
  const saida = texto.split('\n').map(linha => {
    if (linha.startsWith('## ')) {
      sec += 1;
      niveis = [0, 0, 0, 0];
      // O Python indexa ORDINAIS em toda linha "## " (IndexError além da 29ª cláusula).
      if (sec > ORDINAIS.length) throw new ErroModelo(`mais de ${ORDINAIS.length} cláusulas: sem ordinal para a ${sec}ª`);
      linha = linha.replaceAll('{§cl}', ORDINAIS[sec - 1]).replaceAll('{§sec}', String(sec));
    }
    return linha.replace(NUM, (_m, sinais: string, rot?: string) => {
      const nivel = sinais.length;
      niveis[nivel] += 1;
      for (let i = nivel + 1; i < 4; i++) niveis[i] = 0;
      const numero = [String(sec), ...niveis.slice(0, nivel + 1).map(String)].join('.');
      if (rot) rotulos.set(rot, numero);
      return `${marca}${nivel + 1}${numero}.`;
    });
  }).join('\n');
  return saida.replace(/\{§ref@([a-z0-9_]+)\}/g, (_m, rot: string) => {
    const n = rotulos.get(rot);
    if (n === undefined) throw new ErroModelo(`referência a item inexistente ou excluído: ${rot}`);
    return n;
  });
}

/** Caractere que não aparece no texto, para marcar itens (um valor dos autos pode trazer qualquer coisa). */
function marcaLivre(texto: string): string {
  for (let cp = 0xe000; cp < 0xf900; cp++) {
    const c = String.fromCharCode(cp);
    if (!texto.includes(c)) return c;
  }
  throw new ErroModelo('texto sem caractere livre para marcar os itens');
}

// ---------------------------------------------------------------- preencher

function lerDiretivas(re: RegExp, fonte: string): string[][] {
  return [...fonte.matchAll(re)].map(m => m.slice(1));
}

/**
 * Preenche um modelo dado pelo texto (o `preencher(caminho.md)` do Python). `nome` faz o papel do
 * nome do arquivo: aparece na folha e na dica do @requer ("use o template <nome>-<valor>").
 */
export function preencherFonte(fonteBruta: string, dados: Record<string, unknown>, nome: string): Preenchido {
  let fonte = normalizarFonte(fonteBruta);
  const ctx: Dicionario = { ...(ASSINATURAS_JSON as Dicionario), ...(CONSTANTES_JSON as Dicionario), ...dados };
  for (const [variavel, esperado] of lerDiretivas(RE_REQUER, fonte)) {
    let atual = valorBruto(variavel, [ctx]);
    if (ehDict(atual) && tem(atual, 'valor')) atual = atual.valor;
    if (pyStr(atual) !== esperado) {
      const dica = `${nome}-${pyStr(atual)}`;
      throw new ErroModelo(`template exige ${variavel}=${esperado}; dados trazem ${pyRepr(atual)}${tem(MODELOS, dica) ? `; use o template ${dica}` : ''}`);
    }
  }
  for (const [alvo, origem] of lerDiretivas(RE_PADRAO, fonte)) {
    if (valorBruto(alvo, [ctx]) === null) ctx[alvo] = valorBruto(origem, [ctx]);
  }
  for (const [calc] of lerDiretivas(RE_CALCULA, fonte)) {
    if (!tem(CALCULOS, calc)) throw new ErroModelo(`cálculo desconhecido: ${calc}`);
    try {
      CALCULOS[calc].calcular(ctx);
    } catch (e) {
      if (e instanceof ErroCalculo) throw new ErroModelo(e.message);
      throw e;
    }
  }
  fonte = fonte.replace(RE_DIRETIVA, '').replace(RE_COMENTARIO, '');
  const usados: Usado[] = [];
  const faltando: string[] = [];
  let texto = render(analisar(fonte), [ctx], usados, faltando);
  // variante fechada no início da linha ({/x}%% ... / {/x}## ...) só vira comentário/título depois do render
  texto = texto.replace(RE_COMENTARIO_DEPOIS, '').replace(/(?<=[^\n])\n(?=## )/g, '\n\n');
  const marca = marcaLivre(texto);
  texto = numerar(texto, marca);
  texto = texto.replace(/(?<!\.)\.\.(?!\.)/g, '.'); // "LTDA." + "." do template
  const marcado = `${strip(texto.replace(/\n{3,}/g, '\n\n'))}\n`;
  const semMarca = new RegExp(`${marca}[1-4]`, 'g');
  const final = marcado.replace(semMarca, '');

  const faltam = [...new Set(faltando)].sort();
  if (faltam.length) {
    const erro = new ErroModelo(`sem valor: ${faltam.join(', ')}`);
    erro.faltando = faltam;
    erro.texto = final;
    throw erro;
  }
  const foraDoDic = [...new Set(usados.map(([n]) => n).filter(n => !tem(DIC, n) && !tem(DIC, n.split('.')[0])))].sort();
  return {
    id: nome,
    blocos: blocos(marcado, marca),
    texto: final,
    validacao: validacao(usados),
    avisos: foraDoDic.map(n => `variável fora de variaveis.json: ${n}`),
  };
}

/** Preenche o modelo `id` (nome em regras/modelos/, sem .md) com os dados. Recusa com ErroModelo. */
export function preencher(id: string, dados: Record<string, unknown>): Preenchido {
  return preencherFonte(fonteDe(id), dados, id);
}

// ---------------------------------------------------------------- modo CFC (motor do app "gera")

/** O documento do modo CFC: rascunho, nunca recusado por falta de valor. */
export interface PreenchidoCfc {
  /** Exatamente o texto do preencher_texto do gera, com ⟦var⟧ no lugar de cada valor ausente. */
  texto: string;
  blocos: Bloco[];
  /** (nome, valor) de cada variável e condição usada, na ordem do texto (o `usados` do Python). */
  usados: [string, unknown][];
  /** Variáveis sem valor e listas vazias, em ordem alfabética e sem repetição. */
  faltando: string[];
}

// WR-01 do gera: valor substituído nunca vira sintaxe. "{" e o primeiro ponto de ".." viram caracteres de uso
// privado (devolvidos depois do numerar e do colapso de ".."), "|" vira "∣" e a linha do valor que começaria com
// marcador de bloco (#, |, :::, >, @cabecalho) ganha um espaço de largura zero na frente.
const CHAVE_PROTEGIDA = '';
const PONTO_PROTEGIDO = '';
const MARCADOR_DE_BLOCO = /(?<![^\n])(?=#|\||:::|>|@cabecalho)/g;
const protegerValor = (txt: string): string =>
  txt.replaceAll('{', CHAVE_PROTEGIDA).replaceAll('|', '∣').replace(/\.(?=\.)/g, PONTO_PROTEGIDO).replace(MARCADOR_DE_BLOCO, '​');

/**
 * Preenche um modelo do perfil CFC (regras/modelos-cfc/, o preencher_texto do gera) sobre o `ctx` já montado
 * (constantes do modelo + cadastro + respostas: ver contextoCfc em cfc.ts). Diferenças em relação ao
 * preencherFonte da Gelic: não junta assinaturas/constantes da Gelic; variável sem valor sai ⟦nome⟧ e vai para
 * `faltando` em vez de recusar; valores protegidos (WR-01); `@calcula nome:arg` com os cálculos do gera; o
 * `%%` e o "## " que só aparecem depois do render ficam como estão. Recusa (ErroModelo) só o que o gera recusa:
 * @requer, cálculo desconhecido ou com erro, sintaxe do modelo e referência {§ref@x} inexistente.
 */
export function preencherCfc(fonteBruta: string, dados: Record<string, unknown>): PreenchidoCfc {
  let fonte = normalizarFonte(fonteBruta);
  const ctx: Dicionario = { ...dados };
  for (const [variavel, esperado] of lerDiretivas(RE_REQUER, fonte)) {
    let atual = valorBruto(variavel, [ctx]);
    if (ehDict(atual) && tem(atual, 'valor')) atual = atual.valor;
    if (pyStr(atual) !== esperado) throw new ErroModelo(`template exige ${variavel}=${esperado}; dados trazem ${pyRepr(atual)}`);
  }
  for (const [alvo, origem] of lerDiretivas(RE_PADRAO, fonte)) {
    if (valorBruto(alvo, [ctx]) === null) ctx[alvo] = valorBruto(origem, [ctx]);
  }
  for (const [diretiva] of lerDiretivas(RE_CALCULA, fonte)) {
    const i = diretiva.indexOf(':');
    const calc = i < 0 ? diretiva : diretiva.slice(0, i);
    const arg = i < 0 ? '' : diretiva.slice(i + 1);
    if (!tem(CALCULOS_CFC, calc)) throw new ErroModelo(`cálculo desconhecido: ${calc}`);
    try {
      CALCULOS_CFC[calc].calcular(ctx, ...(arg ? [arg] : []));
    } catch (e) {
      if (e instanceof ErroCalculo) throw new ErroModelo(e.message);
      throw e;
    }
  }
  fonte = fonte.replace(RE_DIRETIVA, '').replace(RE_COMENTARIO, '');
  const usados: Usado[] = [];
  const faltando: string[] = [];
  let texto = render(analisar(fonte), [ctx], usados, faltando, protegerValor);
  const marca = marcaLivre(texto + CHAVE_PROTEGIDA + PONTO_PROTEGIDO); // a marca não pode ser um dos protegidos
  texto = numerar(texto, marca);
  texto = texto.replace(/(?<!\.)\.\.(?!\.)/g, '.'); // "LTDA." + "." do template
  texto = texto.replaceAll(CHAVE_PROTEGIDA, '{').replaceAll(PONTO_PROTEGIDO, '.'); // só depois do numerar e do ".."
  const marcado = `${strip(texto.replace(/\n{3,}/g, '\n\n'))}\n`;
  return {
    texto: marcado.replace(new RegExp(`${marca}[1-4]`, 'g'), ''),
    blocos: blocos(marcado, marca),
    usados,
    faltando: [...new Set(faltando)].sort(),
  };
}

// ---------------------------------------------------------------- folha de validação

function validacao(usados: readonly Usado[]): ItemValidacao[] {
  const vistos = new Set<string>();
  const saida: ItemValidacao[] = [];
  for (const [nome, v] of usados) {
    if (vistos.has(nome)) continue;
    vistos.add(nome);
    const fonte = tem(DIC, nome) ? DIC[nome].fonte ?? '?' : '?';
    let val: unknown;
    const item: Partial<ItemValidacao> = {};
    const ev: string[] = [];
    if (ehDict(v) && tem(v, 'valor')) {
      val = v.valor;
      if (pyBool(v.sei)) { item.sei = pyStr(v.sei); ev.push(`SEI ${item.sei}`); }
      if (pyBool(v.p)) { if (typeof v.p === 'number') item.p = v.p; ev.push(`p. ${pyStr(v.p)}`); }
      if (pyBool(v.nota)) { item.nota = pyStr(v.nota); ev.push(item.nota); }
    } else if (Array.isArray(v)) val = `${v.length} item(ns)`;
    else if (ehDict(v)) continue; // grupo (contratada, autoridade…): os campos aparecem um a um
    else val = v;
    saida.push({ variavel: nome, valor: val === true ? 'sim' : val === false ? 'não' : pyStr(val), fonte, ...item, evidencia: ev.join(', ') });
  }
  return saida;
}

/** A folha de validação em Markdown, igual ao `relatorio()` do Python (o -validacao do `gelic.py documento`). */
export function folhaValidacao(p: Pick<Preenchido, 'id' | 'validacao'>): string {
  const topo = [`# Validação — ${p.id}`, '', 'Faltando: nada', '', '| variável | quem preenche | valor | evidência |', '|---|---|---|---|'];
  const corpo = p.validacao.map(i => `| ${i.variavel} | ${i.fonte} | ${i.valor.replaceAll('|', '/')} | ${i.evidencia || '—'} |`);
  return `${[...topo, ...corpo].join('\n')}\n`;
}

// ---------------------------------------------------------------- blocos

const RE_BLOCOS = new RegExp(`\\n[${ESPACO}]*\\n`);
const RE_SEPARADOR = new RegExp(`^\\|[${ESPACO}:|-]+\\|$`);

/** Os blocos do texto, com a mesma leitura do para_html do Python (um bloco por parágrafo). */
function blocos(marcado: string, marca: string): Bloco[] {
  const semMarca = (s: string) => s.replace(new RegExp(`${marca}[1-4]`, 'g'), '');
  const saida: Bloco[] = [];
  for (const bruto of strip(marcado).split(RE_BLOCOS)) {
    const ls = bruto.split('\n').map(rstrip);
    if (ls[0].startsWith(marca)) {
      saida.push({ tipo: 'item', nivel: Number(ls[0][1]) as 1 | 2 | 3 | 4, texto: semMarca(ls.join('\n')) });
      continue;
    }
    const l = ls.map(semMarca);
    const sem = (pre: string) => l.map(x => (x.startsWith(pre) ? x.slice(pre.length) : x)).join('\n');
    if (l[0] === '@cabecalho') saida.push({ tipo: 'cabecalho' });
    else if (l[0].startsWith('# ')) saida.push({ tipo: 'titulo', texto: sem('# ') });
    else if (l[0].startsWith('## ')) {
      saida.push({ tipo: 'clausula', texto: l[0].slice(3) });
      if (l.length > 1) saida.push({ tipo: 'paragrafo', texto: l.slice(1).join('\n'), recuo: true });
    } else if (l[0].startsWith('|')) {
      const linhasTab = l.filter(x => !RE_SEPARADOR.test(x)).map(x => x.replace(/^\|+|\|+$/g, '').split('|').map(strip));
      // como o para_html: a primeira linha é sempre o cabeçalho (há modelo AGU sem a linha |---|)
      saida.push({ tipo: 'tabela', linhas: linhasTab, cabecalho: true });
    } else if (l[0].startsWith('::: ')) saida.push({ tipo: 'ementa', texto: sem('::: ') });
    else if (l[0].startsWith('> ')) saida.push({ tipo: 'paragrafo', texto: sem('> '), recuo: false });
    else saida.push({ tipo: 'paragrafo', texto: l.join('\n'), recuo: true });
  }
  return saida;
}

// ---------------------------------------------------------------- HTML do editor do SEI

const escapar = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
/** Uma linha: escapa tudo (os valores vêm dos autos) e só então troca **x** por <strong>. */
const inline = (s: string): string => escapar(s).replace(/\*\*([^\n]+?)\*\*/g, '<strong>$1</strong>');
const paragrafo = (classe: string, texto: string): string => `<p class="${classe}">${texto.split('\n').map(inline).join('<br>')}</p>`;

/**
 * Corpo do documento para o editor do SEI (CKEditor), só com classes de parágrafo do SEI e
 * numeração literal (sem as classes de autonumeração, que renumerariam o modelo). O cabeçalho do
 * órgão fica de fora: o tipo de documento do SEI já o imprime.
 */
const TRANSCRICAO = /^Art\. \d+[º°]?\.? /;

export function paraHtmlSei(blocosDoc: readonly Bloco[]): string {
  const partes: string[] = [];
  for (const b of blocosDoc) {
    switch (b.tipo) {
      case 'cabecalho': break;
      case 'titulo': partes.push(paragrafo('Texto_Centralizado_Maiusculas_Negrito', b.texto)); break;
      case 'clausula': partes.push(paragrafo('Texto_Alinhado_Esquerda_Maiusc_Negrito', b.texto)); break;
      case 'item': partes.push(paragrafo('Texto_Justificado', b.texto)); break;
      // Transcrição de dispositivo de lei ("> Art. 74. ...") sai recuada como citação, como nos
      // documentos reais da Gelic (ex.: autorização de contratação direta).
      case 'paragrafo': partes.push(paragrafo(!b.recuo && TRANSCRICAO.test(b.texto) ? 'Citacao' : b.recuo ? 'Texto_Justificado_Recuo_Primeira_Linha' : 'Texto_Justificado', b.texto)); break;
      case 'ementa': partes.push(paragrafo('Texto_Alinhado_Direita', b.texto)); break;
      case 'tabela': {
        const linhasHtml = b.linhas.map((cels, i) => {
          const classe = i === 0 && b.cabecalho ? 'Tabela_Texto_Centralizado' : 'Tabela_Texto_Alinhado_Esquerda';
          return `<tr>${cels.map(c => `<td>${paragrafo(classe, c)}</td>`).join('')}</tr>`;
        });
        partes.push(`<table border="1" style="border-collapse:collapse" width="100%"><tbody>${linhasHtml.join('')}</tbody></table>`);
        break;
      }
    }
  }
  return partes.join('\n');
}

// ---------------------------------------------------------------- lista e formulário

function tituloDe(fonte: string): string {
  const t = RE_TITULO.exec(fonte);
  return t ? t[1].replace(/\{[#^/][^}]*\}/g, '').replace(/\{[^}]*\}/g, '…') : '';
}

function infoDe(id: string): InfoModelo {
  const fonte = fonteDe(id);
  const fonteModelo = RE_FONTE.exec(fonte)?.[1];
  const rotulo = RE_ORIGEM.exec(fonte)?.[1];
  const origem = rotulo !== undefined ? strip(rotulo)
    : !fonteModelo ? 'modelo Gelic'
      : fonteModelo.startsWith('agu-') ? 'modelo AGU'
        : fonteModelo.endsWith('-8666') ? 'modelo CFC (8.666)'
          : 'modelo PROJUR';
  const info: InfoModelo = { id, nome: tituloDe(fonte), origem };
  const requer = lerDiretivas(RE_REQUER, fonte);
  if (requer.length) info.requer = Object.fromEntries(requer);
  return info;
}

/** Ordem do sorted(glob("*.md")) do Python: pelo nome do arquivo, ".md" incluído ("x-8666.md" < "x.md"). */
const porArquivo = (a: string, b: string) => (`${a}.md` < `${b}.md` ? -1 : `${a}.md` > `${b}.md` ? 1 : 0);

/** Os modelos em ordem de arquivo, com título e origem (o `gelic.py modelos`). */
export function listarModelos(): InfoModelo[] {
  return Object.keys(MODELOS).sort(porArquivo).map(infoDe);
}

const USO: Record<string, VariavelFormulario['tipo']> = { '#': 'condicao', '^': 'condicao', '*': 'lista' };
const meta = (nome: string) => (tem(DIC, nome) ? DIC[nome] : { fonte: '?', descricao: 'fora de variaveis.json' });

/** Campos de cada lista: tokens {.campo} dentro dos {*lista} (somando as vezes em que a lista aparece). */
function camposDasListas(fonte: string): Map<string, VariavelFormulario[]> {
  const mapa = new Map<string, VariavelFormulario[]>();
  let arvore: No[];
  try {
    arvore = analisar(fonte.replace(RE_DIRETIVA, '').replace(RE_COMENTARIO, ''));
  } catch {
    return mapa;
  }
  const coletar = (lista: string, filhos: readonly No[], fonteLista: string, campos: VariavelFormulario[]) => {
    for (const no of filhos) {
      if (typeof no === 'string') continue;
      const ehCampo = no.nome.startsWith('.') && no.nome !== '.' && !no.nome.startsWith('._');
      const tipo = no.t === 'var' ? 'valor' : USO[no.t];
      if (ehCampo && !campos.some(c => c.nome === no.nome.slice(1))) {
        const caminho = `${lista}.${no.nome.slice(1)}`;
        const m = tem(DIC, caminho) ? DIC[caminho] : { fonte: fonteLista, descricao: `campo de cada item de ${lista}` };
        campos.push({ nome: no.nome.slice(1), tipo, fonte: m.fonte, descricao: m.descricao });
      }
      if (no.t === 'var') continue;
      if (no.t === '*' && ehCampo) {
        const sub = campos.find(c => c.nome === no.nome.slice(1))!;
        coletar(`${lista}.${sub.nome}`, no.filhos, sub.fonte, (sub.campos ??= []));
      } else if (no.t === '*') visitar([no]);
      else coletar(lista, no.filhos, fonteLista, campos);
    }
  };
  const visitar = (nos: readonly No[]) => {
    for (const no of nos) {
      if (typeof no === 'string' || no.t === 'var') continue;
      if (no.t === '*' && !no.nome.startsWith('.')) {
        if (!mapa.has(no.nome)) mapa.set(no.nome, []);
        coletar(no.nome, no.filhos, meta(no.nome).fonte, mapa.get(no.nome)!);
      } else visitar(no.filhos);
    }
  };
  visitar(arvore);
  return mapa;
}

/**
 * Só o que quem chama tem de preencher, na ordem do modelo (o `gelic.py modelos <id>`): ficam de
 * fora as constantes (fonte config), o que o @padrao completa e o que o @calcula gera; entram as
 * entradas que o cálculo lê sem o modelo citá-las.
 */
export function formulario(id: string): { id: string; nome: string; variaveis: VariavelFormulario[] } {
  const fonte = fonteDe(id);
  const padroes = new Set(lerDiretivas(RE_PADRAO, fonte).map(([alvo]) => alvo));
  const calculos = lerDiretivas(RE_CALCULA, fonte).map(([c]) => c).filter(c => tem(CALCULOS, c));
  const derivados = new Set(calculos.flatMap(c => [...CALCULOS[c].derivados]));
  const entradas = calculos.flatMap(c => ENTRADAS[c] ?? []).map(n => ['', n]);
  const campos = camposDasListas(fonte);
  const vistos = new Set<string>();
  const variaveis: VariavelFormulario[] = [];
  for (const [tipo, nome] of [...[...fonte.matchAll(TOKEN)].map(m => [m[1], m[2]]), ...entradas]) {
    if (tipo === '/' || nome.startsWith('.') || vistos.has(nome)) continue;
    vistos.add(nome);
    const m = meta(nome);
    if (m.fonte === 'config' || padroes.has(nome.split('.')[0]) || derivados.has(nome)) continue;
    const v: VariavelFormulario = { nome, tipo: USO[tipo] ?? 'valor', fonte: m.fonte, descricao: m.descricao };
    // O tipo é o do primeiro uso, como no Python: {#itens}…{*itens}…{/itens}{/itens} sai "condicao".
    // Os campos vêm sempre que a variável é lista em algum ponto do modelo.
    const fixos = CAMPOS_LISTA[nome];
    if (fixos) v.campos = fixos.map(c => ({ nome: c, tipo: 'valor' as const, ...(tem(DIC, `${nome}.${c}`) ? DIC[`${nome}.${c}`] : { fonte: m.fonte, descricao: `campo de cada item de ${nome}` }) }));
    else if (campos.has(nome)) v.campos = campos.get(nome);
    variaveis.push(v);
  }
  return { id, nome: tituloDe(fonte), variaveis };
}
