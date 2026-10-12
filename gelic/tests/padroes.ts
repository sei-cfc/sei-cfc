import assert from 'node:assert/strict';
import { opcaoLegadaLigada, opcaoLegadaMarcada } from '../../sei-comum/src/opcoes/legadas';
import type { Area } from '../src/controle/cache';
import { CHAVE_PADROES, comPadroes, DESLIGADAS, garantirPadroes, VERSAO_PADROES } from '../src/padroes';
import { teste } from './util';

/** Área de storage em memória, com contagem de leituras e escritas (e falha opcional na escrita). */
function area(inicial: Record<string, unknown> = {}, falharAoGravar = false) {
  const dados: Record<string, unknown> = structuredClone(inicial);
  const conta = { get: 0, set: 0 };
  const a: Area = {
    get: async (k: string) => { conta.get += 1; return k in dados ? { [k]: structuredClone(dados[k]) } : {}; },
    set: async (o: Record<string, unknown>) => { conta.set += 1; if (falharAoGravar) throw new Error('QUOTA_BYTES_PER_ITEM quota exceeded'); Object.assign(dados, structuredClone(o)); },
  };
  return { a, dados, conta };
}

const PERFIL_BASE = { baseName: 'Atividades', baseTipo: 'atividades', conexaoTipo: 'api', URL_API: 'https://x', KEY_USER: 'k' };

export async function verificarPadroes(): Promise<void> {
  await teste('padrões: configuração vazia ganha Demandas e Projetos desligadas, como o leitor do SEI Pro as lê', () => {
    for (const vazio of [undefined, null, '']) {
      const texto = comPadroes(vazio);
      assert.equal(typeof texto, 'string', String(vazio));
      for (const nome of DESLIGADAS) assert.equal(opcaoLegadaLigada(texto, nome), false, nome);
    }
  });

  await teste('padrões: preserva perfis e as outras opções; só acrescenta no fim do configGeral', () => {
    const original = JSON.stringify([PERFIL_BASE, { configGeral: [{ name: 'filtrarpaginapelapesquisarapida', value: true }, { name: 'outra', value: 'x' }] }]);
    const texto = comPadroes(original)!;
    const lista = JSON.parse(texto);
    assert.deepEqual(lista[0], PERFIL_BASE);
    assert.deepEqual(lista[1].configGeral.slice(0, 2), [{ name: 'filtrarpaginapelapesquisarapida', value: true }, { name: 'outra', value: 'x' }]);
    assert.deepEqual(lista[1].configGeral.slice(2), DESLIGADAS.map(name => ({ name, value: false })));
    assert.equal(opcaoLegadaMarcada(texto, 'filtrarpaginapelapesquisarapida'), true, 'a escolha que já havia continua');
  });

  await teste('padrões: a escolha da pessoa vale (Demandas ligada fica ligada; só falta Projetos)', () => {
    const texto = comPadroes(JSON.stringify([{ configGeral: [{ name: 'gerenciardemandas', value: true }] }]))!;
    assert.equal(opcaoLegadaLigada(texto, 'gerenciardemandas'), true);
    assert.equal(opcaoLegadaLigada(texto, 'gerenciarprojetos'), false);
    assert.equal(JSON.parse(texto)[0].configGeral.length, 2);
  });

  await teste('padrões: com as duas já escolhidas, nada a gravar; configuração ilegível não é tocada', () => {
    assert.equal(comPadroes(JSON.stringify([{ configGeral: [{ name: 'gerenciardemandas', value: false }, { name: 'gerenciarprojetos', value: true }] }])), null);
    assert.equal(comPadroes('{x'), null, 'JSON quebrado');
    assert.equal(comPadroes('{"a":1}'), null, 'não é lista');
  });

  await teste('padrões: grava uma vez só (marca no storage.local); depois, nem lê a configuração', async () => {
    const local = area();
    const sync = area();
    assert.equal(await garantirPadroes({ local: local.a, sync: sync.a }), 'gravado');
    assert.equal(local.dados[CHAVE_PADROES], VERSAO_PADROES);
    for (const nome of DESLIGADAS) assert.equal(opcaoLegadaLigada(sync.dados.dataValues, nome), false, nome);
    // A pessoa religa Demandas nas Configurações: a extensão não volta a desligar.
    sync.dados.dataValues = JSON.stringify([{ configGeral: [{ name: 'gerenciardemandas', value: true }] }]);
    const antes = { ...sync.conta };
    assert.equal(await garantirPadroes({ local: local.a, sync: sync.a }), 'ja');
    assert.deepEqual(sync.conta, antes, 'nem lê nem grava');
    assert.equal(opcaoLegadaLigada(sync.dados.dataValues, 'gerenciardemandas'), true);
  });

  await teste('padrões: nada a mudar ou erro ao gravar (cota do storage.sync) não repete na próxima página', async () => {
    const pronto = area({ dataValues: JSON.stringify([{ configGeral: DESLIGADAS.map(name => ({ name, value: true })) }]) });
    const local = area();
    assert.equal(await garantirPadroes({ local: local.a, sync: pronto.a }), 'nada');
    assert.equal(pronto.conta.set, 0);
    assert.equal(local.dados[CHAVE_PADROES], VERSAO_PADROES);
    const cheio = area({}, true);
    const local2 = area();
    assert.equal(await garantirPadroes({ local: local2.a, sync: cheio.a }), 'nada', 'o erro não escapa');
    assert.equal(local2.dados[CHAVE_PADROES], VERSAO_PADROES, 'marca mesmo assim: tentar de novo não resolve a cota');
  });
}
