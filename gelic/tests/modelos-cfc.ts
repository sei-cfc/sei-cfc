/**
 * Modelos do perfil CFC: paridade do preencherCfc/contextoCfc/calcularCfc (src/modelos/motor.ts e cfc.ts) com o
 * motor do app gera (regras/modelos-cfc-paridade.json, gerado por tests/paridade/gerar_modelos_cfc.py rodando o
 * próprio Python sobre as cópias em regras/modelos-cfc/), e o gerado src/modelos/cfc.gerado.ts em dia.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { conteudos, SAIDAS } from '../gerar';
import { CALCULOS_CFC } from '../src/modelos/calculos-cfc';
import { calcularCfc, contextoCfc, listarModelosCfc, MODELOS_CFC, perguntasPendentesCfc, perguntasVisiveisCfc, SEQUENCIA_CFC, variaveisCfc, type DocumentoCfc } from '../src/modelos/cfc';
import { ErroModelo, paraHtmlSei, preencherCfc } from '../src/modelos/motor';
import type { Dicionario } from '../src/modelos/python';
import { teste } from './util';

type Erro = { erro: string };
interface Caso {
  caso: string;
  modelo?: string; fonte?: string; dados?: Dicionario; base?: string; definir?: Dicionario; remover?: string[];
  texto?: string; texto_sha256?: string; texto_tamanho?: number;
  usados?: [string, unknown][]; usados_nomes?: string[]; faltando?: string[]; erro?: string;
}
interface Contexto {
  caso: string; entrada: DocumentoCfc; erro?: string;
  ctx?: Dicionario; visiveis?: string[]; pendentes?: string[]; faltando?: string[]; texto?: string; texto_sha256?: string;
}
interface Gabarito {
  origem: string;
  variaveis: Record<string, [string, string, string, string][]>;
  calculos: { numerar_paragrafos: [unknown, unknown | Erro][]; estatistica_mcp: [Dicionario, string, Dicionario][] };
  casos: Caso[];
  contextos: Contexto[];
}
const G = JSON.parse(readFileSync(new URL('../regras/modelos-cfc-paridade.json', import.meta.url), 'utf8')) as Gabarito;
const PASTA = new URL('../regras/modelos-cfc/', import.meta.url);
const exemplo = (m: string, e: string) => JSON.parse(readFileSync(new URL(`${m}/exemplos/${e}.json`, PASTA), 'utf8')) as Dicionario;
const sha = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

function dadosDe(c: Caso): Dicionario {
  if (c.dados) return structuredClone(c.dados);
  const d = exemplo(c.modelo!, c.base!);
  for (const k of c.remover ?? []) delete d[k];
  return { ...d, ...structuredClone(c.definir ?? {}) };
}

function igual(obtido: string, c: { texto?: string; texto_sha256?: string }, onde: string) {
  if (c.texto !== undefined) {
    if (obtido === c.texto) return;
    let i = 0;
    while (obtido[i] === c.texto[i]) i++;
    assert.fail(`${onde}: texto difere na posição ${i}\n  TS: ${JSON.stringify(obtido.slice(Math.max(0, i - 60), i + 60))}\n  PY: ${JSON.stringify(c.texto.slice(Math.max(0, i - 60), i + 60))}`);
  }
  assert.equal(sha(obtido), c.texto_sha256, `${onde}: texto difere (sha256, tamanho TS ${obtido.length})`);
}

function erroDe(fn: () => unknown): unknown {
  try { fn(); } catch (e) { return e; }
  return undefined;
}

export async function verificarModelosCfc(): Promise<void> {
  await teste('modelos CFC: gerado em dia com regras/modelos-cfc/ (md, constantes, formulario.json, sequencia.json)', () => {
    assert.equal(readFileSync(new URL(`../${SAIDAS.modelosCfc}`, import.meta.url), 'utf8'), conteudos().modelosCfc, 'rode npm run gerar');
    assert.deepEqual(Object.keys(MODELOS_CFC).sort(), ['despacho_delic', 'dfd', 'mapa_precos', 'termos_cientificacao', 'tr']);
    for (const [id, m] of Object.entries(MODELOS_CFC)) {
      assert.ok(m.perguntas.length > 0, `${id}: sem perguntas`);
      assert.ok(SEQUENCIA_CFC.some(d => d.chave === id && d.modelo), `${id}: fora da sequência`);
    }
    assert.deepEqual(listarModelosCfc().map(m => m.id), ['dfd', 'termos_cientificacao', 'mapa_precos', 'tr', 'despacho_delic']);
  });

  const docs = G.casos.filter(c => c.erro === undefined).length;
  await teste(`modelos CFC: paridade do preencherCfc com o motor do gera (${G.origem}): ${G.casos.length} casos, ${docs} documentos byte a byte e ${G.casos.length - docs} recusas`, () => {
    for (const c of G.casos) {
      const onde = `caso "${c.caso}"`;
      const fonte = c.fonte ?? MODELOS_CFC[c.modelo!].md;
      const dados = dadosDe(c);
      if (c.erro !== undefined) {
        const erro = erroDe(() => preencherCfc(fonte, dados));
        assert.ok(erro instanceof ErroModelo, `${onde}: esperava a recusa "${c.erro}", veio ${erro ?? 'documento'}`);
        assert.equal(erro.message, c.erro, `${onde}: mensagem`);
        continue;
      }
      const r = preencherCfc(fonte, dados);
      igual(r.texto, c, onde);
      assert.deepEqual(r.faltando, c.faltando, `${onde}: faltando`);
      if (c.usados) assert.deepEqual(r.usados, c.usados, `${onde}: usados`);
      else assert.deepEqual(r.usados.map(([n]) => n), c.usados_nomes, `${onde}: usados`);
    }
  });

  await teste(`modelos CFC: cálculos do gera (${G.calculos.numerar_paragrafos.length} numerar_paragrafos, ${G.calculos.estatistica_mcp.length} estatistica_mcp)`, () => {
    for (const [j, esperado] of G.calculos.numerar_paragrafos) {
      const ctx: Dicionario = { j: structuredClone(j) };
      const erro = erroDe(() => CALCULOS_CFC.numerar_paragrafos.calcular(ctx, 'j'));
      if (erro) assert.deepEqual({ erro: (erro as Error).message }, esperado, JSON.stringify(j));
      else assert.deepEqual(ctx.j ?? null, esperado, JSON.stringify(j));
    }
    for (const [entrada, campos, esperado] of G.calculos.estatistica_mcp) {
      const ctx = structuredClone(entrada);
      CALCULOS_CFC.estatistica_mcp.calcular(ctx, ...(campos ? [campos] : []));
      const saida = Object.fromEntries(['media_fmt', 'mediana_fmt', 'economia_pct_fmt'].filter(k => k in ctx).map(k => [k, ctx[k]]));
      assert.deepEqual(saida, esperado, JSON.stringify([entrada, campos]));
    }
  });

  await teste('modelos CFC: variáveis de cada modelo iguais ao formulario_variaveis do gera (nome, tipo, na ordem)', () => {
    const TIPO: Record<string, string> = { 'valor': 'valor', 'condição': 'condicao', 'lista': 'lista' };
    for (const id of Object.keys(MODELOS_CFC)) {
      assert.deepEqual(variaveisCfc(id).map(v => [v.nome, v.tipo]), G.variaveis[id].map(([n, u]) => [n, TIPO[u]]), id);
    }
    assert.deepEqual(variaveisCfc('dfd').find(v => v.nome === 'itens')?.campos, ['descricao', 'unidade_medida', 'quantidade']);
  });

  await teste(`modelos CFC: ctx do documento, perguntas visíveis/pendentes e calcular iguais ao gera (${G.contextos.length} documentos)`, () => {
    for (const c of G.contextos) {
      const onde = `contexto "${c.caso}"`;
      if (c.erro !== undefined) {
        const erro = erroDe(() => contextoCfc(c.entrada));
        assert.ok(erro instanceof ErroModelo, `${onde}: esperava "${c.erro}", veio ${erro ?? 'ctx'}`);
        assert.equal(erro.message, c.erro, onde);
        continue;
      }
      const ctx = contextoCfc(c.entrada);
      assert.deepEqual(JSON.parse(JSON.stringify(ctx)), c.ctx, `${onde}: ctx`);
      assert.deepEqual(perguntasVisiveisCfc(c.entrada.modelo, ctx).map(p => p.id), c.visiveis, `${onde}: visíveis`);
      assert.deepEqual(perguntasPendentesCfc(c.entrada.modelo, ctx).map(p => p.id), c.pendentes, `${onde}: pendentes`);
      const r = calcularCfc(c.entrada);
      igual(r.texto, c, onde);
      assert.deepEqual(r.faltando, c.faltando, `${onde}: faltando`);
    }
  });

  await teste('modelos CFC: cada modelo tem exemplo inventado, completo no gabarito, e vira HTML do SEI sem sintaxe do motor', () => {
    for (const id of Object.keys(MODELOS_CFC)) {
      const arquivos = readdirSync(new URL(`${id}/exemplos/`, PASTA)).filter(a => a.endsWith('.json'));
      assert.ok(arquivos.length, `${id}: sem exemplo`);
      for (const a of arquivos) {
        const e = a.slice(0, -5);
        const c = G.casos.find(x => x.caso === `exemplo ${id}/${e}`);
        assert.ok(c?.texto && c.faltando?.length === 0, `${id}/${e}: exemplo fora do gabarito ou incompleto`);
        const r = preencherCfc(MODELOS_CFC[id].md, exemplo(id, e));
        const html = paraHtmlSei(r.blocos);
        assert.ok(html.length > 200 && !/[{}⟦]|@cabecalho|%%/.test(html), `${id}/${e}: HTML`);
      }
    }
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await verificarModelosCfc();
