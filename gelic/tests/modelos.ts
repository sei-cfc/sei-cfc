import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { conteudos, SAIDAS } from '../gerar';
import { brl, dataExtenso, dec, decTexto, extenso, fatorDe, fmtBrl, normalizar, ordinalMasculino, pct, reajustar } from '../src/modelos/calculos';
import { ErroModelo, folhaValidacao, formulario, listarModelos, paraHtmlSei, preencher, preencherFonte, type Bloco, type Preenchido } from '../src/modelos/motor';
import { teste } from './util';

type Erro = { erro: string };
interface Caso {
  nome: string;
  modelo?: string; fonte?: string; arquivo?: string;
  dados?: Record<string, unknown>; base?: string; definir?: Record<string, unknown>; remover?: string[];
  texto?: string; texto_sha256?: string; texto_tamanho?: number;
  folha?: string; folha_sha256?: string;
  avisos?: string[]; erro?: string; faltando?: string[];
}
interface Gabarito {
  origem: string;
  lista: { id: string; nome: string; origem: string; requer?: Record<string, string> }[];
  formularios: Record<string, [string, string, string, string][]>;
  calculos: {
    extenso: [string, string][]; brl: [string, string | Erro][]; pct: [string, string | Erro][];
    reajuste: [string, string, [string, string] | Erro][]; ordinal: [unknown, string | Erro][]; data_extenso: [unknown, string | Erro][];
  };
  casos: Caso[];
}
const G = JSON.parse(readFileSync(new URL('../regras/modelos-paridade.json', import.meta.url), 'utf8')) as Gabarito;
const PASTA_EXEMPLOS = new URL('../regras/modelos/exemplos/', import.meta.url);
const exemplo = (m: string) => JSON.parse(readFileSync(new URL(`${m}.json`, PASTA_EXEMPLOS), 'utf8')) as Record<string, unknown>;
const sha = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

/** Os dados do caso: inteiros, ou a receita (exemplo copiado + mudanças), como o gerar_modelos.py os montou. */
function dadosDe(c: Caso): Record<string, unknown> {
  if (c.dados) return c.dados;
  const d = exemplo(c.base!);
  for (const k of c.remover ?? []) delete d[k];
  for (const [caminho, valor] of Object.entries(c.definir ?? {})) {
    const partes = caminho.split('.');
    let alvo = d;
    for (const p of partes.slice(0, -1)) alvo = (alvo[p] ??= {}) as Record<string, unknown>;
    alvo[partes[partes.length - 1]] = valor;
  }
  return d;
}

/** Compara texto inteiro ou pelo sha256; na diferença, mostra onde começa. */
function igual(obtido: string, c: Caso, campo: 'texto' | 'folha', onde: string) {
  const esperado = c[campo];
  if (esperado !== undefined) {
    if (obtido === esperado) return;
    let i = 0;
    while (obtido[i] === esperado[i]) i++;
    assert.fail(`${onde}: ${campo} difere na posição ${i}\n  TS: ${JSON.stringify(obtido.slice(Math.max(0, i - 60), i + 60))}\n  PY: ${JSON.stringify(esperado.slice(Math.max(0, i - 60), i + 60))}`);
  }
  assert.equal(sha(obtido), c[`${campo}_sha256`], `${onde}: ${campo} difere (sha256; tamanho TS ${obtido.length}, PY ${c.texto_tamanho ?? '?'})`);
}

function rodar(c: Caso): Preenchido {
  const dados = dadosDe(c);
  return c.fonte !== undefined ? preencherFonte(c.fonte, dados, c.arquivo!) : preencher(c.modelo!, dados);
}

const CLASSES = new Set(['Texto_Centralizado_Maiusculas_Negrito', 'Texto_Alinhado_Esquerda_Maiusc_Negrito', 'Texto_Justificado',
  'Texto_Justificado_Recuo_Primeira_Linha', 'Texto_Alinhado_Direita', 'Tabela_Texto_Centralizado', 'Tabela_Texto_Alinhado_Esquerda', 'Citacao']);
const TAGS = new Set(['P', 'STRONG', 'BR', 'TABLE', 'TBODY', 'TR', 'TD']);

/** O HTML só tem as tags e classes permitidas, nenhum on*=, e style só o da tabela. */
function conferirHtml(html: string, onde: string) {
  const { document } = parseHTML(`<!doctype html><html><body>${html}</body></html>`);
  for (const el of document.body.querySelectorAll('*')) {
    assert.ok(TAGS.has(el.tagName), `${onde}: tag <${el.tagName}>`);
    for (const a of el.attributes) {
      assert.ok(!/^on/i.test(a.name), `${onde}: atributo ${a.name}`);
      if (a.name === 'class') assert.ok(CLASSES.has(a.value), `${onde}: classe ${a.value}`);
      else if (el.tagName === 'TABLE') assert.ok(['border', 'style', 'width'].includes(a.name), `${onde}: ${a.name} na tabela`);
      else assert.fail(`${onde}: atributo ${a.name} em <${el.tagName}>`);
    }
  }
  assert.ok(!/<script|javascript:/i.test(html), `${onde}: script`);
  assert.equal((html.match(/style=/g) ?? []).length, document.querySelectorAll('table').length, `${onde}: style fora da tabela`);
  return document;
}

/** Texto visível de cada bloco, para comparar com o que o HTML mostra. */
function textoDoBloco(b: Bloco): string {
  if (b.tipo === 'cabecalho') return '';
  if (b.tipo === 'tabela') return b.linhas.flat().join('');
  return b.texto.replaceAll('\n', '').replace(/\*\*([^\n]+?)\*\*/g, '$1');
}

export async function verificarModelos(): Promise<void> {
  await teste('modelos: gerado em dia com regras/modelos/ (*.md, variaveis, constantes, assinaturas)', () => {
    assert.equal(readFileSync(new URL(`../${SAIDAS.modelos}`, import.meta.url), 'utf8'), conteudos().modelos, 'rode npm run gerar');
  });

  const docs = G.casos.filter(c => !c.erro).length;
  await teste(`modelos: paridade com o preencher.py da skill (${G.origem}): ${G.casos.length} casos, ${docs} documentos byte a byte e ${G.casos.length - docs} recusas`, () => {
    for (const c of G.casos) {
      const onde = `caso "${c.nome}"`;
      if (c.erro !== undefined) {
        let erro: unknown;
        try { rodar(c); } catch (e) { erro = e; }
        assert.ok(erro instanceof ErroModelo, `${onde}: esperava a recusa "${c.erro}", veio ${erro ?? 'documento'}`);
        assert.equal(erro.message, c.erro, `${onde}: mensagem`);
        if (c.faltando) {
          assert.deepEqual(erro.faltando, c.faltando, `${onde}: faltando`);
          igual(erro.texto!, c, 'texto', onde);
        }
        continue;
      }
      const r = rodar(c);
      igual(r.texto, c, 'texto', onde);
      igual(folhaValidacao(r), c, 'folha', onde);
      assert.deepEqual(r.avisos, c.avisos, `${onde}: avisos`);
    }
  });

  await teste('modelos: os exemplos copiados em regras/modelos/exemplos são os do gabarito (um por modelo)', () => {
    const arquivos = readdirSync(PASTA_EXEMPLOS).filter(a => a.endsWith('.json')).map(a => a.slice(0, -5));
    assert.deepEqual(arquivos.sort(), listarModelos().map(m => m.id).sort());
    for (const m of arquivos) assert.ok(G.casos.some(c => c.nome === `exemplo ${m}` && c.texto), m);
  });

  await teste('modelos: listarModelos igual ao `gelic.py modelos` (id, título, origem, @requer)', () => {
    assert.deepEqual(listarModelos(), G.lista);
    assert.ok(G.lista.some(m => m.origem === 'modelo PROJUR') && G.lista.some(m => m.origem === 'modelo AGU'));
  });

  await teste('modelos: formulário igual ao `gelic.py modelos <modelo>` (nome, tipo, fonte, descrição, na ordem)', () => {
    const TIPO: Record<string, string> = { 'valor': 'valor', 'condição': 'condicao', 'lista': 'lista' };
    for (const m of listarModelos()) {
      const f = formulario(m.id);
      assert.equal(f.id, m.id);
      assert.equal(f.nome, m.nome);
      assert.deepEqual(f.variaveis.map(v => [v.nome, v.tipo, v.fonte, v.descricao]), G.formularios[m.id].map(([n, u, fo, d]) => [n, TIPO[u], fo, d]), m.id);
      assert.ok(f.variaveis.every(v => v.fonte !== 'config'), `${m.id}: constante no formulário`);
    }
  });

  await teste('modelos: formulário traz os campos das listas (e só os que o cálculo não gera)', () => {
    // {#itens}…{*itens}: o tipo é o do primeiro uso (como no Python), mas os campos vêm mesmo assim
    const itens = formulario('autorizacao-contratacao-direta').variaveis.find(v => v.nome === 'itens')!;
    assert.equal(itens.tipo, 'condicao');
    assert.deepEqual(itens.campos!.map(c => c.nome), ['item', 'razao_social', 'cnpj', 'total']);
    const parcelas = formulario('termo-apostilamento-reajuste').variaveis.find(v => v.nome === 'reajuste.parcelas')!;
    assert.equal(parcelas.tipo, 'lista');
    assert.deepEqual(parcelas.campos!.map(c => c.nome), ['descricao', 'periodicidade', 'valor_atual', 'valor_reajustado_informado']);
    const ap = formulario('termo-apostilamento-reajuste').variaveis.map(v => v.nome);
    assert.ok(ap.includes('apostilamento.numero') && !ap.includes('apostilamento.ordinal') && !ap.includes('autoridade.nome'));
  });

  await teste('modelos: calculos.ts igual ao calculos.py (extenso, reais, percentual, reajuste, ordinal, datas)', () => {
    const ou = <T>(f: () => T): T | Erro => { try { return f(); } catch (e) { return { erro: (e as Error).message }; } };
    for (const [x, esperado] of G.calculos.extenso) assert.equal(extenso(dec(x)), esperado, `extenso ${x}`);
    for (const [x, esperado] of G.calculos.brl) assert.deepEqual(ou(() => fmtBrl(brl(x))), esperado, `brl ${x}`);
    for (const [x, esperado] of G.calculos.pct) assert.deepEqual(ou(() => decTexto(pct(x))), esperado, `pct ${x}`);
    for (const [v, p, esperado] of G.calculos.reajuste) {
      assert.deepEqual(ou(() => [fmtBrl(reajustar(brl(v), pct(p))), decTexto(normalizar(fatorDe(pct(p))))]), esperado, `reajuste ${v} × ${p}`);
    }
    for (const [x, esperado] of G.calculos.ordinal) assert.deepEqual(ou(() => ordinalMasculino(x)), esperado, `ordinal ${JSON.stringify(x)}`);
    for (const [x, esperado] of G.calculos.data_extenso) assert.deepEqual(ou(() => dataExtenso(x)), esperado, `data ${JSON.stringify(x)}`);
  });

  await teste('modelos: blocos do texto (título, cláusula, item com nível, sem recuo, ementa, tabela, cabeçalho)', () => {
    const r = preencher('autorizacao-contratacao-direta', exemplo('autorizacao-contratacao-direta'));
    const b = r.blocos;
    assert.deepEqual(b[0], { tipo: 'cabecalho' });
    assert.deepEqual(b[1], { tipo: 'titulo', texto: 'AUTORIZAÇÃO DE CONTRATAÇÃO DIRETA - INEX - NLL\nINEXIGIBILIDADE Nº 383500-25/2026' });
    assert.deepEqual(b[2], { tipo: 'paragrafo', recuo: false, texto: 'Processo nº 12345670000000.000000/2026-00\nUnidade Gestora: DEGEP' });
    assert.deepEqual(b[3], { tipo: 'clausula', texto: '1. DO OBJETO' });
    assert.equal(b[4].tipo, 'item');
    assert.ok(b[4].tipo === 'item' && b[4].nivel === 1 && b[4].texto.startsWith('1.1. Contratação'));
    assert.ok(b.some(x => x.tipo === 'paragrafo' && !x.recuo && x.texto.startsWith('**Nome da Autoridade**')));
    const ap = preencher('termo-apostilamento-reajuste', exemplo('termo-apostilamento-reajuste')).blocos;
    assert.ok(ap.some(x => x.tipo === 'ementa' && x.texto.startsWith('TERCEIRO TERMO DE APOSTILAMENTO')));
    assert.ok(ap.some(x => x.tipo === 'clausula' && x.texto === 'CLÁUSULA PRIMEIRA – DO REAJUSTE'));
    const com = preencher('agu-contrato-compras', exemplo('agu-contrato-compras')).blocos;
    const tab = com.find(x => x.tipo === 'tabela');
    assert.ok(tab && tab.tipo === 'tabela' && tab.cabecalho && tab.linhas[0][0] === 'ITEM' && tab.linhas.length > 1);
    assert.ok(com.some(x => x.tipo === 'item' && x.nivel === 2));
    // nenhum bloco perde ou ganha texto: juntando os blocos volta o texto (menos prefixos de marcação)
    for (const m of listarModelos()) {
      const p = preencher(m.id, exemplo(m.id));
      const visivel = p.blocos.map(textoDoBloco).join('').replace(/[|\s]+/g, '');
      const doTexto = p.texto.split('\n')
        .filter(l => l !== '@cabecalho' && !/^\|[\s:|-]+\|$/.test(l))
        .map(l => l.replace(/^(#{1,2}|>|:::) /, '').replace(/\*\*([^\n]+?)\*\*/g, '$1'))
        .join('').replace(/[|\s]+/g, '');
      assert.equal(visivel, doTexto, m.id);
    }
  });

  await teste('modelos: paraHtmlSei só usa as classes do SEI, escapa os valores e tira o cabeçalho', () => {
    for (const c of G.casos.filter(x => !x.erro && x.modelo)) conferirHtml(paraHtmlSei(rodar(c).blocos), c.nome);
    const malicioso = '<script>alert(1)</script><img src=x onerror="alert(2)"> & \'aspas\' "duplas" **forte**';
    const d = { ...exemplo('autorizacao-contratacao-direta'), objeto: malicioso, unidade_gestora: '<b onclick=x>DEGEP</b>' };
    const r = preencher('autorizacao-contratacao-direta', d);
    const html = paraHtmlSei(r.blocos);
    const doc = conferirHtml(html, 'malicioso');
    assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=x onerror=&quot;alert(2)&quot;&gt; &amp; &#x27;aspas&#x27; &quot;duplas&quot; <strong>forte</strong>'));
    assert.ok(!html.includes('CONSELHO FEDERAL DE CONTABILIDADE</'), 'o cabeçalho do órgão fica para o tipo de documento do SEI');
    const ps = [...doc.querySelectorAll('p')];
    assert.equal(ps[0].className, 'Texto_Centralizado_Maiusculas_Negrito');
    assert.equal(ps[0].innerHTML, 'AUTORIZAÇÃO DE CONTRATAÇÃO DIRETA - INEX - NLL<br>INEXIGIBILIDADE Nº 383500-25/2026');
    assert.equal(ps[1].className, 'Texto_Justificado');
    assert.equal(ps[2].className, 'Texto_Alinhado_Esquerda_Maiusc_Negrito');
    assert.ok(ps[3].textContent!.startsWith('1.1. '));
    const citacao = ps.find(p => p.textContent!.startsWith('Art. 74.'));
    assert.equal(citacao?.className, 'Citacao', 'transcrição de artigo de lei sai como citação');
    assert.ok(ps.filter(p => p.className === 'Citacao').every(p => /^Art\. \d/.test(p.textContent!)), 'só transcrição de artigo vira citação');
    const tab = paraHtmlSei([{ tipo: 'tabela', cabecalho: true, linhas: [['A', 'B'], ['<1>', '**2**']] }, { tipo: 'ementa', texto: 'E' },
      { tipo: 'paragrafo', texto: 'P', recuo: true }]);
    assert.equal(tab, '<table border="1" style="border-collapse:collapse" width="100%"><tbody>'
      + '<tr><td><p class="Tabela_Texto_Centralizado">A</p></td><td><p class="Tabela_Texto_Centralizado">B</p></td></tr>'
      + '<tr><td><p class="Tabela_Texto_Alinhado_Esquerda">&lt;1&gt;</p></td><td><p class="Tabela_Texto_Alinhado_Esquerda"><strong>2</strong></p></td></tr>'
      + '</tbody></table>\n<p class="Texto_Alinhado_Direita">E</p>\n<p class="Texto_Justificado_Recuo_Primeira_Linha">P</p>');
  });

  await teste('modelos: recusas em pt-BR com o nome da variável; modelo desconhecido; dados de quem chama intactos', () => {
    const d = exemplo('termo-apostilamento-reajuste');
    const copia = structuredClone(d);
    preencher('termo-apostilamento-reajuste', d);
    assert.deepEqual(d, copia, 'o @calcula não altera os dados recebidos');
    assert.throws(() => preencher('nao-existe', {}), (e: unknown) => e instanceof ErroModelo && /modelo desconhecido: nao-existe/.test(e.message));
    assert.throws(() => preencher('contrato-compras', {}), (e: unknown) => e instanceof ErroModelo && e.message === "template exige regime=14133; dados trazem None");
    const muitas = Array.from({ length: 30 }, (_, i) => `## C${i}\n\n{§} x`).join('\n\n');
    assert.throws(() => preencherFonte(muitas, {}, 't'), /mais de 29 cláusulas/);
  });
}
