import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { conteudos, SAIDAS } from '../gerar';
import { CHECKLISTS, GRAUS } from '../src/dvi/montar/dados.gerado';
import {
  ErroFormato, ErroMontagem, montarDocumento, resumirAchados, validarAchados,
  type Achados, type ContextoDvi, type Formato, type Pedido, type Validacao,
} from '../src/dvi/montar';
import { teste } from './util';

type Bloco = string | string[][];
interface Caso {
  nome: string; base: string; contexto: ContextoDvi; achados: Achados; pedido?: Pedido; forcar?: boolean;
  esperado: { recusa?: string; validacao?: Validacao; formato?: Formato; resumo?: string; documento?: Bloco[]; faixa?: string; extenso?: string };
}
interface Gabarito {
  origem: string; adaptacoes: [string, string][]; graus: Record<string, string>;
  checklists: Record<string, { series: Record<string, string>; itens: { id: string; serie: string; grau: string; texto: string }[] }>;
  textos: Record<string, string>; casos: Caso[];
}
const G = JSON.parse(readFileSync(new URL('../regras/dvi-montar/paridade.json', import.meta.url), 'utf8')) as Gabarito;

const contextoDe = (c: Caso): ContextoDvi => ({ ...c.contexto, textos: Object.fromEntries(c.contexto.documentos.map(d => [d.numero, G.textos[d.numero] ?? ''])) });

/** Texto visível de um elemento, com <br> como "\n" (o mesmo que o normalizador do gerar_dvi_montar.py faz). */
function texto(el: Element): string {
  const copia = el.cloneNode(true) as Element;
  for (const br of [...copia.querySelectorAll('br')]) br.replaceWith(copia.ownerDocument.createTextNode('\n'));
  return copia.textContent ?? '';
}
/** Blocos do corpo: cada parágrafo um texto; cada tabela, as linhas com as células. */
function blocosDoHtml(html: string): Bloco[] {
  const { document } = parseHTML(`<!doctype html><html><body>${html}</body></html>`);
  return [...document.body.children].map(el => (el.tagName === 'TABLE' ? [...el.querySelectorAll('tr')].map(tr => [...tr.querySelectorAll('td')].map(texto)) : texto(el)));
}

const CLASSES = new Set(['Texto_Alinhado_Esquerda', 'Texto_Justificado_Recuo_Primeira_Linha', 'Texto_Justificado', 'Texto_Alinhado_Esquerda_Maiusc_Negrito',
  'Texto_Centralizado_Maiusculas_Negrito', 'Tabela_Texto_Centralizado', 'Tabela_Texto_Alinhado_Esquerda', 'Tabela_Texto_Justificado']);
/** Só P, BR e tabela; só classes do SEI; nenhum on*=; style só o da tabela; width só no cabeçalho da tabela. */
function conferirHtml(html: string, onde: string) {
  const { document } = parseHTML(`<!doctype html><html><body>${html}</body></html>`);
  for (const el of document.body.querySelectorAll('*')) {
    assert.ok(['P', 'BR', 'TABLE', 'TBODY', 'TR', 'TD'].includes(el.tagName), `${onde}: tag <${el.tagName}>`);
    for (const a of el.attributes) {
      if (a.name === 'class') assert.ok(CLASSES.has(a.value) && el.tagName === 'P', `${onde}: classe ${a.value}`);
      else if (el.tagName === 'TABLE') assert.ok(['border', 'style', 'width'].includes(a.name), `${onde}: ${a.name} na tabela`);
      else assert.ok(el.tagName === 'TD' && a.name === 'width', `${onde}: atributo ${a.name} em <${el.tagName}>`);
    }
  }
  assert.ok(!/<script|javascript:/i.test(html), `${onde}: script`);
}

function recusa(f: () => unknown, msg: string, onde: string) {
  assert.throws(f, (e: unknown) => {
    assert.ok(e instanceof ErroFormato, `${onde}: esperava ErroFormato "${msg}", veio ${e}`);
    assert.equal(e.message, msg, `${onde}: mensagem da recusa`);
    return true;
  });
}

export async function verificarDviMontar(): Promise<void> {
  await teste('dvi-montar: gerado em dia com regras/dvi-montar/ e assinaturas.json', () => {
    assert.equal(readFileSync(new URL(`../${SAIDAS.dviMontar}`, import.meta.url), 'utf8'), conteudos().dviMontar, 'rode npm run gerar');
  });

  await teste('dvi-montar: graus e itens dos checklists iguais aos do gelic_lib.py (carregar_graus_checklist, carregar_checklist)', () => {
    assert.deepEqual({ ...GRAUS }, G.graus);
    assert.deepEqual(JSON.parse(JSON.stringify(CHECKLISTS)), G.checklists);
  });

  const n = (k: keyof Caso['esperado']) => G.casos.filter(c => c.esperado[k] !== undefined).length;
  await teste(`dvi-montar: paridade com avaliar.py/render.py da skill (${G.origem}): ${G.casos.length} casos — ${n('validacao')} validações, `
    + `${n('formato')} formatos e resumos, ${n('recusa')} recusas, ${n('documento')} documentos e ${n('extenso')} Gecont`, () => {
    for (const c of G.casos) {
      const onde = `caso "${c.nome}"`;
      const ctx = contextoDe(c);
      const e = c.esperado;
      if (e.validacao) assert.deepEqual(validarAchados(c.achados, ctx), e.validacao, `${onde}: validação`);
      if (e.recusa !== undefined) { recusa(() => resumirAchados(c.achados, ctx, c.pedido, c.forcar), e.recusa, onde); continue; }
      if (!e.formato) continue;
      const r = resumirAchados(c.achados, ctx, c.pedido, c.forcar);
      assert.equal(r.formato, e.formato, `${onde}: formato`);
      assert.equal(r.resumo, e.resumo, `${onde}: resumo`);
      if (r.validacao.erros.length) {
        assert.throws(() => montarDocumento(r.formato, c.achados, ctx, { forcar: c.forcar }), ErroMontagem, `${onde}: monta com erro`);
        continue;
      }
      const d = montarDocumento(r.formato, c.achados, ctx, { forcar: c.forcar });
      assert.equal(d.resumo, e.resumo, `${onde}: resumo do documento`);
      if (e.documento) {
        conferirHtml(d.html, onde);
        assert.deepEqual(blocosDoHtml(d.html), e.documento, `${onde}: documento`);
        assert.equal(d.paraOChat.find(x => x.startsWith('Atenção')), e.faixa, `${onde}: fundamentação não conferida vai ao chat`);
      }
      if (e.extenso) {
        assert.equal(d.dadosModelo!.valor_extenso, e.extenso, `${onde}: extenso igual ao por_extenso_reais`);
        assert.ok(d.html.includes(`(${e.extenso})`), `${onde}: extenso no corpo`);
      }
    }
  });

  const base = G.casos.find(c => c.nome === 'DVI: preparatória completa')!;
  const ctx = contextoDe(base);
  const comErro = (ach: unknown, c: ContextoDvi = ctx) => validarAchados(ach, c).erros;

  await teste('dvi-montar: esquema estrito (campo desconhecido, página, p, tipos) — só da extensão', () => {
    const a = structuredClone(base.achados) as unknown as Record<string, any>;
    assert.deepEqual(comErro(a), []);
    a.vocativo = 'Senhor,';
    a.valor = 'R$ 1,00';
    a.blocos[0].achados[0].item = 'Cláusula 8.1, p. 12';
    a.blocos[0].achados[0].p = 12;
    a.checklist_status.R01.p = 3;
    a.ausencias = ['Ausência citada nas fls. 3 a 5.'];
    a.tem_etp = 'sim';
    a.remetente.sei = 1100030;
    const erros = comErro(a);
    for (const trecho of ["campo desconhecido 'vocativo' (use remetente.destino", "campo desconhecido 'valor' (o valor do despacho à Gecont vai em gecont.valor",
      "bloco 1, achado 1: campo desconhecido 'p' ('p' (página) não se usa", "checklist_status[R01]: campo desconhecido 'p'",
      "bloco 1, achado 1: 'item': cite \"SEI n, item x\", sem página (\"Cláusula 8.1, p. 12\")", 'ausencias[1]: cite "SEI n, item x", sem página',
      "'tem_etp' deve ser true/false", "remetente: 'sei' deve ser texto"]) {
      assert.ok(erros.some(e => e.includes(trecho)), `falta o erro "${trecho}" em ${JSON.stringify(erros)}`);
    }
    assert.ok(!comErro({ ...base.achados, objeto: 'contratação de 3 páginas de anúncio, pela p.' + 'x' }).some(e => e.includes('sem página')), 'número antes de "páginas" não é citação');
    assert.ok(comErro({ ...base.achados, gecont: { valor: '1,00' } }).some(e => e === "gecont: 'natureza' obrigatório (texto)"));
    assert.ok(comErro({ ...base.achados, gecont: { natureza: 'x', natureza_valor: 'y', objeto: 'z.', valor: '1,00', valor_sei: '1999999' } }).includes('gecont: SEI 1999999 não existe nos autos'));
    assert.deepEqual(validarAchados('x', ctx).erros, ['achados deve ser objeto (ver o esquema Achados)']);
  });

  await teste('dvi-montar: DVI no formato do SEI (tipo, classes, escape, Observações, nada de limitação no corpo)', () => {
    const ach = { ...base.achados, limitacoes: ['Documento X ilegível.'], verificacao_legal: false, fontes_nao_verificadas: ['Lei 1'], objeto: 'contratação de <b>serviços</b> & "insumos" d\'água.' };
    const d = montarDocumento('dvi', ach, ctx);
    assert.deepEqual(d.tipoSei, { tipo: 'DVI' });
    assert.ok(d.html.startsWith('<p class="Texto_Alinhado_Esquerda">À Gerência de Infraestrutura.</p>\n<p class="Texto_Justificado_Recuo_Primeira_Linha">Trata o presente processo de contratação de &lt;b&gt;serviços&lt;/b&gt; &amp; &quot;insumos&quot; d&#x27;água.</p>'), d.html.slice(0, 300));
    assert.ok(d.html.includes('<tr><td width="15%"><p class="Tabela_Texto_Centralizado">Item</p></td><td width="42%"><p class="Tabela_Texto_Centralizado">Constatação</p></td><td width="43%"><p class="Tabela_Texto_Centralizado">Recomendação</p></td></tr>'));
    assert.ok(d.html.includes('<p class="Texto_Alinhado_Esquerda">Observações:</p>\n<p class="Texto_Justificado">1) A presente verificação'));
    assert.ok(!d.html.includes('ilegível') && !d.html.includes('Atenção') && !d.html.includes('Lei 1'), 'limitação e fundamentação não entram no documento');
    assert.deepEqual(d.paraOChat, ['Atenção: a fundamentação normativa deste documento não foi conferida na fonte oficial nesta sessão (sem acesso à rede). Confira a redação vigente dos dispositivos citados antes de assinar.\nDispositivos citados sem conferência: Lei 1',
      'Limitação (não vai no documento): Documento X ilegível.']);
    assert.ok(d.texto.includes('1) Estudo Técnico Preliminar - ETP 2/2026 (SEI 1100005)\n\nItem | Constatação | Recomendação\nAssinatura | O ETP não traz'), d.texto);
    conferirHtml(d.html, 'dvi');
  });

  await teste('dvi-montar: devolução e Gecont (modelo despacho-gecont-reserva) com o tipo e o nome na árvore da Gelic', () => {
    const dev = G.casos.find(c => c.nome === 'devolução: só impeditivos')!;
    const d = montarDocumento('devolucao', dev.achados, contextoDe(dev));
    assert.deepEqual(d.tipoSei, { tipo: 'Despacho', nomeArvore: 'Devolução para Ajustes' });
    assert.ok(!d.html.includes('Cláusula 8.1'), 'achado [R] não entra na devolução');
    const gc = G.casos.find(c => c.nome === 'Gecont: sem impeditivo, com gecont')!;
    const g = montarDocumento('gecont', gc.achados, contextoDe(gc));
    assert.deepEqual(g.tipoSei, { tipo: 'Despacho', nomeArvore: 'Solicitação Reserva Gecont' });
    assert.ok(g.texto.includes('Trata o presente processo de contratação para serviços de manutenção predial preventiva e corretiva.'), g.texto);
    assert.ok(g.texto.includes('O valor previsto para a futura contratação é de R$ 12.345,67 (doze mil, trezentos e quarenta e cinco reais e sessenta e sete centavos).'), g.texto);
    assert.equal((g.dadosModelo!.valor as { sei: string }).sei, '1100010');
    const comContrato = { ...gc.achados, gecont: { ...gc.achados.gecont!, natureza: 'prorrogação', contrato: { numero: '10/2025', sei: '1100010' } } };
    assert.ok(montarDocumento('gecont', comContrato, contextoDe(gc)).texto.includes('Trata o presente processo de prorrogação ao Contrato nº 10/2025 (SEI 1100010), cujo objeto é serviços'));
    recusa(() => montarDocumento('gecont', base.achados, { ...ctx, dviAnterior: '1100099' }), 'recusado: há achado impeditivo (impede=true ou checklist [I]); o despacho à Gecont afirmaria saneamento inexistente. O formato correto é devolução.', 'gecont com [I]');
    recusa(() => montarDocumento('devolucao', base.achados, ctx), "recusado: despacho de devolução exige DVI anterior desta etapa nos autos; não há. O formato correto é DVI (sem pedido ou com pedido 'dvi').", 'devolução sem DVI');
    recusa(() => montarDocumento('comparativo', base.achados, ctx), "a regra indica 'dvi', não 'comparativo'", 'comparativo fora do --compare');
    assert.throws(() => montarDocumento('gecont', { ...gc.achados, gecont: { ...gc.achados.gecont!, valor: '12345.67' } }, contextoDe(gc)), (e: unknown) => e instanceof ErroMontagem && /valor inválido para o despacho à Gecont/.test(e.erros[0]));
    const comp = G.casos.find(c => c.nome === 'comparativo')!;
    assert.equal(montarDocumento('comparativo', comp.achados, contextoDe(comp)).tipoSei, null);
  });

  await teste('dvi-montar: erro bloqueia a montagem; os achados de quem chama ficam intactos', () => {
    const copia = structuredClone(base.achados);
    montarDocumento('dvi', base.achados, ctx);
    assert.deepEqual(base.achados, copia);
    assert.throws(() => montarDocumento('dvi', { ...base.achados, objeto: 'curto.' }, ctx), (e: unknown) => e instanceof ErroMontagem && e.erros.includes('objeto muito curto: copie a descrição do objeto dos autos'));
    assert.throws(() => resumirAchados({ processo: 'x' }, ctx), ErroMontagem);
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await verificarDviMontar();
