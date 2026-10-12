/**
 * Modelos do perfil CFC (peças do demandante): porte do que o app "gera" do PCA CFC faz em
 * apps/gera/documentos/respostas.py (ctx do documento, perguntas visíveis e pendentes, calcular) sobre os
 * modelos copiados em regras/modelos-cfc/ (src/modelos/cfc.gerado.ts). O texto sai do preencherCfc (motor.ts),
 * o motor da Gelic em modo rascunho. Paridade com o Python em tests/modelos-cfc.ts.
 *
 * Funções puras: sem DOM, sem rede. Quem lê o SEI (ou o PCA) monta o DocumentoCfc.
 */
import { brl, dataExtenso, dec, ErroCalculo, extenso, fmtBrl, negar, type Dec } from './calculos';
import { CALCULOS_CFC } from './calculos-cfc';
import { MODELOS_CFC, SEQUENCIA_CFC, type ModeloCfcDados, type PerguntaCfc } from './cfc.gerado';
import { analisar, ErroModelo, preencherCfc, verdadeiro, type Bloco, type No } from './motor';
import { ehDict, pyBool, pyRepr, pyStr, strip, tem, type Dicionario } from './python';

export { MODELOS_CFC, SEQUENCIA_CFC, type ModeloCfcDados, type PerguntaCfc };

/**
 * O que o gera lê do banco para montar o ctx (Documento + Contratacao + Perfil + Processo do PCA), em dados
 * planos. `cadastro` é o cadastro único da contratação (objeto, justificativa, valor_estimado, data_pretendida,
 * itens, vigencia, pessoas, projetos_contas...); `respostas`, as respostas do formulário deste documento.
 */
export interface DocumentoCfc {
  /** Chave do modelo (dfd, tr, mapa_precos, despacho_delic, termos_cientificacao). */
  modelo: string;
  /** Nome da unidade demandante (area_nome). */
  unidade: string;
  /** Quem cria a contratação. Sem `matricula` = sem perfil (sai null, como no gera). Sem nome, vale o e-mail. */
  responsavel: { nome?: string; email: string; matricula?: string | null };
  /** pregao | concorrencia | dispensa | inexigibilidade | credenciamento | adesao_ata | chamamento_publico */
  via: string;
  /** Item do PCA vinculado (null/ausente = sem item: item_pca/ano_exercicio/portaria_pca saem ⟦...⟧ no DFD). */
  pca?: { item_pca: unknown; ano: number; grau_prioridade?: string | null } | null;
  cadastro?: Dicionario | null;
  respostas?: Dicionario | null;
}

/** Timbre do CFC usado pelo @cabecalho (o ORGAO_CABECALHO do gera). */
export const ORGAO_CABECALHO = {
  nome: 'CONSELHO FEDERAL DE CONTABILIDADE',
  endereco: 'SAUS Quadra 05, Lote 03, Bloco J, Edifício CFC, Bairro Asa Sul, Brasília/DF, CEP 70070-920',
  contato: 'Telefone: (61) 3314-9600 - www.cfc.org.br - E-mail: cfc@cfc.org.br',
} as const;

const PAPEL_LABEL: Readonly<Record<string, string>> = {
  equipe_planejamento: 'membro de equipe de planejamento de contrato',
  gestor: 'gestor de contrato',
  fiscal: 'fiscal de contrato',
};
const CHAVES_CADASTRO = ['objeto', 'justificativa', 'valor_estimado', 'mes_previsto', 'itens', 'vigencia', 'indice', 'pessoas',
  'projetos_contas', 'data_pretendida'] as const;

const obter = (d: Dicionario, k: string, padrao: unknown = null): unknown => (tem(d, k) ? d[k] : padrao);

export function modeloCfc(id: string): ModeloCfcDados {
  if (!tem(MODELOS_CFC, id)) throw new ErroModelo(`modelo de documento ${pyRepr(id)} não encontrado (disponíveis: ${pyRepr(Object.keys(MODELOS_CFC).sort())})`);
  return MODELOS_CFC[id];
}

/** O _valor_em_reais do gera: "61648.00" (str(Decimal)) ou "61.648,00"; ilegível = null (sai pendente). */
function valorEmReais(bruto: unknown): Dec | null {
  if (bruto === null || bruto === undefined || bruto === '') return null;
  const texto = strip(pyStr(bruto));
  if (/^-?\d+(\.\d+)?$/.test(texto)) return texto.startsWith('-') ? negar(dec(texto.slice(1))) : dec(texto);
  try {
    return brl(texto);
  } catch (e) {
    if (e instanceof ErroCalculo) return null;
    throw e;
  }
}

/**
 * O ctx que o gera passa ao motor (contexto_documento): constantes do modelo, leituras diretas (unidade,
 * responsável, timbre), PCA, via, cadastro único, derivadas (valor por extenso, data por extenso, vigência,
 * equipe, prioridade, pessoas dos termos), respostas — que não vencem as leituras diretas nem o cadastro nas
 * perguntas com `le_do_cadastro` — e os padrões (vinculação, autoridade). Data pretendida inválida recusa.
 */
export function contextoCfc(doc: DocumentoCfc): Dicionario {
  const modelo = modeloCfc(doc.modelo);
  const constantes = modelo.constantes as Dicionario;
  const cadastro: Dicionario = doc.cadastro ?? {};
  const ctx: Dicionario = structuredClone(constantes) as Dicionario;
  const r = doc.responsavel;
  const leituras: Dicionario = {
    area_nome: doc.unidade,
    responsavel_nome: r.nome || r.email,
    responsavel_email: r.email,
    responsavel_matricula: 'matricula' in r && pyBool(r.matricula) ? r.matricula : null,
    orgao: { ...ORGAO_CABECALHO },
  };
  Object.assign(ctx, leituras);

  ctx.tem_item_pca = Boolean(doc.pca);
  if (doc.pca) {
    ctx.item_pca = doc.pca.item_pca;
    ctx.ano_exercicio = doc.pca.ano;
    const portarias = obter(constantes, 'portarias_pca', {}) as Dicionario;
    ctx.portaria_pca = obter(portarias, pyStr(doc.pca.ano));
    ctx.grau_prioridade = doc.pca.grau_prioridade || null;
  }
  ctx.via = doc.via;
  ctx.contratacao_direta = doc.via === 'dispensa' || doc.via === 'inexigibilidade';
  for (const chave of CHAVES_CADASTRO) if (tem(cadastro, chave)) ctx[chave] = structuredClone(cadastro[chave]);

  const valor = valorEmReais(obter(cadastro, 'valor_estimado'));
  if (valor !== null) {
    ctx.valor_estimado_fmt = fmtBrl(valor);
    ctx.valor_estimado_extenso = extenso(valor);
  }
  if (pyBool(obter(cadastro, 'data_pretendida'))) {
    try {
      ctx.data_pretendida_extenso = dataExtenso(cadastro.data_pretendida);
    } catch (e) {
      if (e instanceof ErroCalculo) throw new ErroModelo(e.message);
      throw e;
    }
  }
  const vigencia = obter(cadastro, 'vigencia');
  const vig = pyBool(vigencia) && ehDict(vigencia) ? vigencia : {};
  if (pyBool(obter(vig, 'meses'))) ctx.vigencia_meses = vig.meses;
  const pessoas = (obter(cadastro, 'pessoas', []) ?? []) as Dicionario[];
  ctx.equipe_planejamento = pessoas.filter(p => obter(p, 'papel') === 'equipe_planejamento').map(p => ({ nome: obter(p, 'nome', '') }));

  Object.assign(ctx, structuredClone(doc.respostas ?? {}));
  for (const p of modelo.perguntas) {
    if (p.le_do_cadastro && tem(cadastro, p.le_do_cadastro)) ctx[p.id] = structuredClone(cadastro[p.le_do_cadastro]);
  }
  Object.assign(ctx, leituras, { orgao: { ...ORGAO_CABECALHO } });

  const grau = obter(ctx, 'grau_prioridade');
  ctx.prioridade_baixo = grau === 'Baixo';
  ctx.prioridade_medio = grau === 'Médio';
  ctx.prioridade_alto = grau === 'Alto';

  if (pyBool(pessoas)) {
    const semTreino = new Set(pyStr(pyBool(obter(ctx, 'pessoas_sem_treinamento')) ? ctx.pessoas_sem_treinamento : '')
      .split('\n').map(strip).filter(Boolean));
    ctx.pessoas_termo = pessoas.map(p => {
      const papel = obter(p, 'papel');
      return {
        nome: obter(p, 'nome', ''),
        matricula: obter(p, 'matricula', ''),
        papel: typeof papel === 'string' && tem(PAPEL_LABEL, papel) ? PAPEL_LABEL[papel] : obter(p, 'papel', ''),
        apto: !semTreino.has(obter(p, 'nome', '') as string),
      };
    });
  }

  if (!pyBool(obter(ctx, 'vinculacao'))) ctx.vinculacao = obter(constantes, 'vinculacao_padrao', '');
  const autoridade = obter(constantes, 'autoridade', {}) as Dicionario;
  const nomePadrao = pyBool(obter(autoridade, 'nome')) ? String(autoridade.nome) : '';
  if (!pyBool(obter(ctx, 'autoridade_nome')) && nomePadrao && !nomePadrao.startsWith('[')) ctx.autoridade_nome = nomePadrao;
  ctx.autoridade_cargo = obter(autoridade, 'cargo');
  return ctx;
}

/** `quando_aparece` do yaml: "nao <var>" | "<var> in (v1, v2)" | vazio (sempre). */
function quandoApareceVale(expressao: string | null, ctx: Dicionario): boolean {
  if (!expressao) return true;
  if (expressao.startsWith('nao ')) return !verdadeiro(obter(ctx, strip(expressao.slice(4))));
  const m = /^(\w+)\s+in\s+\(([^)]*)\)$/.exec(strip(expressao));
  if (m) return m[2].split(',').map(strip).filter(Boolean).includes(pyStr(obter(ctx, m[1])));
  throw new ErroModelo(`quando_aparece desconhecido: ${pyRepr(expressao)}`);
}

/** Perguntas do formulário que aparecem para este ctx. */
export function perguntasVisiveisCfc(id: string, ctx: Dicionario): PerguntaCfc[] {
  return modeloCfc(id).perguntas.filter(p => quandoApareceVale(p.quando_aparece, ctx));
}

/** Entre as visíveis, as obrigatórias ainda sem valor no ctx. */
export function perguntasPendentesCfc(id: string, ctx: Dicionario): PerguntaCfc[] {
  return perguntasVisiveisCfc(id, ctx).filter(p => p.obrigatoria && !verdadeiro(obter(ctx, p.id)));
}

export interface CalculadoCfc {
  texto: string;
  blocos: Bloco[];
  ctx: Dicionario;
  /** Perguntas obrigatórias pendentes, mais toda ⟦var⟧ que sobrou no texto (o `faltando` do calcular do gera). */
  faltando: string[];
  usados: [string, unknown][];
}

/** O calcular() do gera: ctx, texto em rascunho e o que falta para o documento ficar completo. */
export function calcularCfc(doc: DocumentoCfc): CalculadoCfc {
  const ctx = contextoCfc(doc);
  const r = preencherCfc(modeloCfc(doc.modelo).md, ctx);
  const faltando = perguntasPendentesCfc(doc.modelo, ctx).map(p => p.id);
  for (const m of r.texto.matchAll(/⟦([^⟧]+)⟧/g)) if (!faltando.includes(m[1])) faltando.push(m[1]);
  return { texto: r.texto, blocos: r.blocos, ctx, faltando, usados: r.usados };
}

export interface VariavelCfc {
  nome: string;
  tipo: 'valor' | 'condicao' | 'lista';
  /** Campos de cada item ({.campo}) quando a variável é lista em algum ponto do modelo. */
  campos?: string[];
}

const RE_CALCULA_CFC = /(?<![^\n])@calcula ([^\s]+)(?![^\n])/g;
const TOKEN_CFC = /\{([#^*/]?)(\.?[A-Za-z_][A-Za-z0-9_.]*|\.)(?:\|([a-z]+))?\}/g;

/**
 * Variáveis do modelo na ordem (o formulario_variaveis do gera sem dicionário e sem os comentários %%): fora as
 * que o @calcula gera. Inclui as que o ctx traz sem pergunta (area_nome, valor_estimado_fmt...): o cruzamento com
 * as perguntas do formulário fica com quem chama.
 */
export function variaveisCfc(id: string): VariavelCfc[] {
  const fonte = modeloCfc(id).md;
  const derivados = new Set([...fonte.matchAll(RE_CALCULA_CFC)].map(m => m[1].split(':')[0])
    .filter(c => tem(CALCULOS_CFC, c)).flatMap(c => [...CALCULOS_CFC[c].derivados]));
  const campos = new Map<string, string[]>();
  const visitar = (nos: readonly No[], lista: string | null) => {
    for (const no of nos) {
      if (typeof no === 'string') continue;
      if (lista && no.nome.startsWith('.') && no.nome !== '.' && !no.nome.startsWith('._')) {
        const cs = campos.get(lista)!;
        if (!cs.includes(no.nome.slice(1))) cs.push(no.nome.slice(1));
      }
      if (no.t === 'var') continue;
      if (no.t === '*' && !no.nome.startsWith('.')) {
        if (!campos.has(no.nome)) campos.set(no.nome, []);
        visitar(no.filhos, no.nome);
      } else visitar(no.filhos, lista);
    }
  };
  const semComentarios = fonte.replace(/(?<![^\n])%%[^\n]*\n/g, ''); // os comentários citam {#var} de exemplo
  visitar(analisar(semComentarios.replace(/(?<![^\n])@(requer|padrao|fonte|calcula|origem) [^\n]*\n/g, '')), null);
  const USO: Record<string, VariavelCfc['tipo']> = { '#': 'condicao', '^': 'condicao', '*': 'lista' };
  const vistos = new Set<string>();
  const saida: VariavelCfc[] = [];
  for (const m of semComentarios.matchAll(TOKEN_CFC)) {
    const [, tipo, nome] = m;
    if (tipo === '/' || nome.startsWith('.') || vistos.has(nome)) continue;
    vistos.add(nome);
    if (derivados.has(nome)) continue;
    const v: VariavelCfc = { nome, tipo: USO[tipo] ?? 'valor' };
    if (campos.has(nome)) v.campos = campos.get(nome);
    saida.push(v);
  }
  return saida;
}

export interface InfoModeloCfc { id: string; rotulo: string; nota: string; titulo: string; versao: string; check_list_id: string | null }

/** Os modelos prontos, na ordem da sequência do demandante no gera. */
export function listarModelosCfc(): InfoModeloCfc[] {
  return SEQUENCIA_CFC.filter(d => d.modelo && tem(MODELOS_CFC, d.chave)).map(d => {
    const m = MODELOS_CFC[d.chave];
    const titulo = /(?<![^\n])# ([^\n]+)/.exec(m.md)?.[1] ?? d.rotulo;
    return { id: d.chave, rotulo: d.rotulo, nota: d.nota, titulo, versao: pyStr(obter(m.constantes as Dicionario, 'versao', '')), check_list_id: d.check_list_id };
  });
}
