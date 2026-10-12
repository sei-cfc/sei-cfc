import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classificar, desfecho, diagnosticar, etapasQueCasam, LISTA_ETAPAS, relevantes, resolverDocumento, ETAPA, valoresRegra } from '../src/regras/motor';
import { teste } from './util';

interface Caso {
  nome: string; titulos: string[]; tipos: string[]; marcas: string[][]; valores: Record<string, unknown>;
  etapas: string[]; desfecho: [string | null, unknown]; relevantes: string[];
  documento: unknown; opcoes: string[] | null; motivo: string | null;
}
const { casos } = JSON.parse(readFileSync(new URL('../regras/paridade.json', import.meta.url), 'utf8')) as { casos: Caso[] };

export async function verificarRegras(): Promise<void> {
  await teste(`paridade com o etapa.py da skill: ${casos.length} casos, tipos, marcas, fatos, etapas, relevantes e documento`, () => {
    for (const c of casos) {
      const docs = classificar(c.titulos);
      const onde = `caso "${c.nome}"`;
      assert.deepEqual(docs.map(d => d.tipo), c.tipos, `${onde}: tipos`);
      assert.deepEqual(docs.map(d => d.marcas), c.marcas, `${onde}: marcas`);
      const v = valoresRegra(docs);
      assert.deepEqual(v, c.valores, `${onde}: fatos`);
      assert.deepEqual(etapasQueCasam(v), c.etapas, `${onde}: etapas que casam`);
      assert.deepEqual(desfecho(v), c.desfecho, `${onde}: desfecho`);
      const et = c.desfecho[0];
      assert.deepEqual(et ? relevantes(v) : [], c.relevantes, `${onde}: relevantes`);
      const r = et ? resolverDocumento(ETAPA[et], v) : { documento: null, opcoes: null, motivo: null };
      assert.deepEqual(r, { documento: c.documento, opcoes: c.opcoes, motivo: c.motivo }, `${onde}: documento`);
    }
  });
  await teste('o gabarito cobre todas as etapas do etapas.json', () => {
    const vistas = new Set(casos.map(c => c.desfecho[0]));
    assert.deepEqual(LISTA_ETAPAS.map(e => e.id).filter(id => !vistas.has(id)), []);
  });
  await teste('diagnóstico: preparatória sem DVI diz a etapa, o próximo passo e o que decidiu', () => {
    const d = diagnosticar(['DFD - Contratação', 'Estudo Técnico Preliminar 30/2025', 'Termo de Referência 31/2025']);
    assert.equal(d.etapa, 'preparatoria_analise');
    assert.match(d.resolucao!.documento!.acao!, /DVI/);
    assert.ok(d.decisivos.some(f => f.id === 'tem_dvi' && f.valor === false));
    assert.deepEqual(d.reconhecidos.map(x => x.tipo), ['dfd', 'etp', 'tr']);
  });
  await teste('diagnóstico: processo fora do rito não inventa etapa', () => {
    const d = diagnosticar(['Ofício 12/2026', 'Certidão TCU']);
    assert.equal(d.etapa, null);
    assert.equal(d.resolucao, null);
    assert.deepEqual(d.reconhecidos, []);
  });
  await teste('diagnóstico: critério que os títulos não resolvem vira pergunta com opções', () => {
    const d = diagnosticar(['DFD', 'Termo de Referência 1/2026', 'Despacho Gelic - emissão reserva Gecont', 'Autorização de Contratação Direta']);
    assert.equal(d.etapa, 'contrato_direta');
    assert.equal(d.resolucao!.documento, null);
    assert.deepEqual(d.resolucao!.opcoes, ['contrato-compras', 'contrato-servicos']);
  });
}
