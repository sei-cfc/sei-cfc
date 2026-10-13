/**
 * Configurar a IA (src/ia/): passos de cada serviço, gravação na configuração do agente sem mexer no resto, resumo sem
 * segredo para o selo e a página (DOM com linkedom). Sem rede e sem chrome.*.
 *
 *   npx tsx -e "import('./tests/ia.ts').then(m=>m.verificarIa())"
 */
import assert from 'node:assert/strict';
import { formatoDaChave, impressaoDaChave, mesclarConfig, passosDe, resumoDaConfig, resumoDoEstado, textoDoSelo } from '../src/ia/estado';
import { parseHTML } from 'linkedom';
import { montarConfigurarIa, type DepsConfigurarIa } from '../src/ia/pagina';
import { CHAVE_ESTADO_IA } from '../src/ia/estado';
import { lerResumo, sincronizarResumo } from '../src/ia/guardado';
import { areaFalsa } from './peca';
import { teste } from './util';

export async function verificarIa(): Promise<void> {
  await teste('ia: OpenRouter — conta e crédito à mão; limite, chave e modelo conferidos sozinhos', () => {
    const nada = passosDe('openrouter', { conferida: false, limite: undefined, modelo: '', marcados: [] });
    assert.deepEqual(nada.map(p => [p.id, p.tipo, p.feito]), [
      ['conta', 'manual', false], ['credito', 'manual', false], ['limite', 'auto', false], ['chave', 'auto', false], ['modelo', 'auto', false],
    ]);
    const tudo = passosDe('openrouter', { conferida: true, limite: 10, modelo: 'anthropic/claude-sonnet-5', marcados: ['conta', 'credito'] });
    assert.ok(tudo.every(p => p.feito));
    const semLimite = passosDe('openrouter', { conferida: true, limite: null, modelo: 'x', marcados: [] });
    const lim = semLimite.find(p => p.id === 'limite')!;
    assert.equal(lim.feito, false);
    assert.match(lim.nota ?? '', /sem limite de gasto/);
  });
  await teste('ia: Anthropic — limite da organização é marcado à mão (a API não diz); chave e modelo conferidos', () => {
    const p = passosDe('anthropic', { conferida: true, limite: undefined, modelo: 'claude-sonnet-5', marcados: ['limite'] });
    assert.deepEqual(p.map(x => [x.id, x.tipo, x.feito]), [
      ['conta', 'manual', false], ['credito', 'manual', false], ['limite', 'manual', true], ['chave', 'auto', true], ['modelo', 'auto', true],
    ]);
    assert.ok(p.every(x => x.texto && x.texto.length > 5));
    assert.ok(p.find(x => x.id === 'conta')!.link?.startsWith('https://console.anthropic.com'));
  });
  await teste('ia: mesclarConfig grava só serviço, chave e modelo; troca de serviço zera o modelo auxiliar (era do serviço antigo)', () => {
    const atual = { servico: 'openrouter', url: 'https://x/v1', chave: 'velha', modelo: 'a/b', modeloAuxiliar: 'anthropic/claude-haiku', nomes: true, ajustes: { temperatura: 0.3 } };
    const outro = mesclarConfig(atual, { servico: 'anthropic', chave: ' sk-ant-1 ', modelo: 'claude-sonnet-5' });
    assert.deepEqual(outro, { servico: 'anthropic', url: '', chave: 'sk-ant-1', modelo: 'claude-sonnet-5', modeloAuxiliar: '', nomes: true, ajustes: { temperatura: 0.3 } });
    const mesmo = mesclarConfig(atual, { servico: 'openrouter', chave: 'sk-or-2', modelo: 'c/d' });
    assert.equal(mesmo.modeloAuxiliar, 'anthropic/claude-haiku', 'mesmo serviço: o auxiliar continua valendo');
    assert.equal(atual.chave, 'velha', 'não altera o original');
    assert.deepEqual(mesclarConfig(undefined, { servico: 'anthropic', chave: 'sk-ant-1', modelo: 'claude-sonnet-5' }), { servico: 'anthropic', url: '', chave: 'sk-ant-1', modelo: 'claude-sonnet-5' });
  });
  await teste('ia: formato da chave — avisa a chave de um serviço colada no outro; sem aviso no formato certo', () => {
    assert.equal(formatoDaChave('openrouter', 'sk-or-v1-abc'), null);
    assert.equal(formatoDaChave('anthropic', 'sk-ant-api03-abc'), null);
    assert.match(formatoDaChave('openrouter', 'sk-ant-api03-abc')!, /Anthropic/);
    assert.match(formatoDaChave('anthropic', 'sk-or-v1-abc')!, /OpenRouter/);
    assert.match(formatoDaChave('openrouter', '')!, /Cole a chave/);
  });
  await teste('ia: resumo sem segredo para o selo e o texto da linha', () => {
    const r = resumoDoEstado({ servico: 'openrouter', modelo: 'anthropic/claude-sonnet-5', testada: true, limite: 10, usado: 1.234, em: new Date('2026-10-12T10:00:00-03:00') });
    assert.ok(!JSON.stringify(r).includes('sk-'), 'nada de chave');
    assert.equal(textoDoSelo(r), 'IA (opcional): OpenRouter, testada em 12/10/2026, limite US$ 10.00 (usado US$ 1.23)');
    assert.equal(textoDoSelo(resumoDoEstado({ servico: 'anthropic', modelo: 'claude-sonnet-5', testada: true, em: new Date('2026-10-12T10:00:00-03:00') })), 'IA (opcional): Anthropic, testada em 12/10/2026');
    assert.equal(textoDoSelo(resumoDoEstado({ servico: 'openrouter', modelo: 'x', testada: true, limite: null, em: new Date('2026-10-12T10:00:00-03:00') })), 'IA (opcional): OpenRouter, testada em 12/10/2026, sem limite de gasto');
    assert.equal(textoDoSelo(null), 'IA (opcional): não configurada neste navegador');
    assert.equal(textoDoSelo({ servico: 'openrouter', modelo: 'x', testada: false, em: 'lixo' } as never), 'IA (opcional): OpenRouter, ainda não testada');
  });

  await teste('ia: resumo a partir da configuração (janelas) — mesmo serviço, modelo e chave mantêm o testado; chave trocada no painel vira "não testada" e perde o limite', async () => {
    const agora = new Date('2026-10-13T10:00:00-03:00');
    const imp1 = await impressaoDaChave('sk-or-1');
    assert.match(imp1, /^[0-9a-f]{8}$/);
    assert.notEqual(imp1, await impressaoDaChave('sk-or-2'));
    const testado = resumoDoEstado({ servico: 'openrouter', modelo: 'm1', testada: true, limite: 5, impressao: imp1, em: new Date('2026-10-12T10:00:00-03:00') });
    assert.equal(await resumoDaConfig({ servico: 'openrouter', chave: 'sk-or-1', modelo: 'm1' }, testado, agora), testado);
    assert.deepEqual(await resumoDaConfig({ servico: 'openrouter', chave: 'sk-or-2', modelo: 'm1' }, testado, agora), { servico: 'openrouter', modelo: 'm1', testada: false, impressao: await impressaoDaChave('sk-or-2'), em: agora.toISOString() });
    assert.equal((await resumoDaConfig({ servico: 'openrouter', chave: 'sk-or-1', modelo: 'm2' }, testado, agora))?.testada, false);
    assert.equal(await resumoDaConfig({ servico: 'openrouter', chave: '  ', modelo: 'm1' }, testado, agora), null);
    assert.equal(await resumoDaConfig(undefined, testado, agora), null);
    assert.ok(!JSON.stringify(await resumoDaConfig({ servico: 'openai', chave: 'sk-segredo', modelo: 'x' }, null, agora)).includes('segredo'));
  });
  await teste('ia: selo com serviço configurado só pelo painel mostra o nome do serviço; nome herdado (constructor) não engana', () => {
    const em = '2026-10-12T13:00:00.000Z';
    assert.equal(textoDoSelo({ servico: 'gemini', modelo: 'x', testada: false, em }), 'IA (opcional): Google Gemini, ainda não testada');
    assert.equal(textoDoSelo({ servico: 'compativel', modelo: 'x', testada: false, em }), 'IA (opcional): outro serviço compatível, ainda não testada');
    assert.equal(textoDoSelo({ servico: 'constructor', modelo: 'x', testada: false, em }), 'IA (opcional): constructor, ainda não testada');
  });
  await teste('ia: sincronizarResumo grava o resumo da configuração (sem a chave) e apaga quando não há chave; storage ruim não quebra', async () => {
    const area = areaFalsa();
    const agora = new Date('2026-10-13T10:00:00-03:00');
    await sincronizarResumo(area, { servico: 'openrouter', chave: 'sk-or-1', modelo: 'm1' }, agora);
    assert.deepEqual(await lerResumo(area), { servico: 'openrouter', modelo: 'm1', testada: false, impressao: await impressaoDaChave('sk-or-1'), em: agora.toISOString() });
    assert.ok(!JSON.stringify([...area.m.values()]).includes('sk-or'));
    await sincronizarResumo(area, { servico: 'openrouter', chave: '' }, agora);
    assert.equal(area.m.has(CHAVE_ESTADO_IA), false);
    area.m.set(CHAVE_ESTADO_IA, 'lixo');
    assert.equal(await lerResumo(area), null);
    const quebrada = { ...areaFalsa(), get: async () => { throw new Error('fora'); } };
    assert.equal(await lerResumo(quebrada), null);
    area.m.set('gelic_ia_passos', { openrouter: 'lixo', anthropic: ['conta', 7] });
    assert.deepEqual(await (await import('../src/ia/guardado')).lerPassos(area), { anthropic: ['conta'] }, 'só listas de texto');
    await sincronizarResumo(quebrada, { servico: 'x', chave: 'k' }, agora);
  });
  // ---------------------------------------------------------------- página
  const janela = () => parseHTML('<html><body><main id="gelic-ia"></main></body></html>').document as unknown as Document;
  const espera = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setTimeout(r, 0)); };
  const clicar = (doc: Document, sel: string) => doc.querySelector<HTMLElement>(sel)!.click();
  const digitar = (doc: Document, sel: string, v: string) => { const i = doc.querySelector<HTMLInputElement>(sel)!; i.value = v; i.dispatchEvent(new doc.defaultView!.Event('input')); };
  const depsFalsas = (o: Partial<DepsConfigurarIa> = {}) => {
    const gravado: { config?: Record<string, unknown>; resumo?: unknown; passos?: Record<string, string[]>; conferidas: string[]; autorizados: string[] } = { conferidas: [], autorizados: [] };
    const d: DepsConfigurarIa = {
      lerConfig: async () => ({ servico: 'openai', chave: 'velha', modelo: 'gpt-5', nomes: true }),
      gravarConfig: async c => { gravado.config = c; },
      conferir: async (s, c) => { gravado.conferidas.push(`${s}:${c}`); return { ok: true, limite: 10, usado: 1.5 }; },
      autorizar: async s => { gravado.autorizados.push(s); return true; },
      modelos: async () => [{ id: 'anthropic/claude-sonnet-5', nome: 'Claude Sonnet 5', precoEntrada: 3, precoSaida: 15 }],
      lerPassos: async () => ({}),
      gravarPassos: async p => { gravado.passos = p; },
      gravarResumo: async r => { gravado.resumo = r; },
      modeloPadrao: { openrouter: 'anthropic/claude-sonnet-5', anthropic: 'claude-sonnet-5' },
      agora: () => new Date('2026-10-12T10:00:00-03:00'),
      ...o,
    };
    return { d, gravado };
  };
  const col = (s: string) => `[data-gelic-servico="${s}"]`;

  await teste('ia (página): OpenRouter e Anthropic lado a lado, com os passos, links que abrem fora e o modelo padrão', async () => {
    const doc = janela();
    await montarConfigurarIa(doc, depsFalsas().d);
    assert.deepEqual([...doc.querySelectorAll('[data-gelic-servico]')].map(e => e.getAttribute('data-gelic-servico')), ['openrouter', 'anthropic']);
    assert.equal(doc.querySelectorAll(`${col('openrouter')} [data-gelic-passo]`).length, 5);
    const link = doc.querySelector<HTMLAnchorElement>(`${col('anthropic')} [data-gelic-passo="conta"] a`)!;
    assert.equal(link.getAttribute('target'), '_blank');
    assert.equal(link.getAttribute('rel'), 'noopener noreferrer');
    assert.equal(doc.querySelector<HTMLInputElement>(`${col('anthropic')} [data-gelic-modelo]`)!.value, 'claude-sonnet-5');
    assert.match(doc.body.textContent!, /opcional/);
    assert.match(doc.body.textContent!, /fica só neste navegador/);
  });
  await teste('ia (página): passo manual marcado fica guardado', async () => {
    const doc = janela();
    const { d, gravado } = depsFalsas();
    await montarConfigurarIa(doc, d);
    clicar(doc, `${col('openrouter')} [data-gelic-marcar="conta"]`);
    await espera();
    assert.deepEqual(gravado.passos, { openrouter: ['conta'] });
    assert.equal(doc.querySelector(`${col('openrouter')} [data-gelic-passo="conta"]`)!.getAttribute('data-feito'), 'true');
  });
  await teste('ia (página): Testar confere a chave e o limite; Usar grava no agente (sem mexer no resto) e o resumo sem a chave', async () => {
    const doc = janela();
    const { d, gravado } = depsFalsas();
    await montarConfigurarIa(doc, d);
    digitar(doc, `${col('openrouter')} [data-gelic-chave]`, 'sk-or-v1-abc');
    clicar(doc, `${col('openrouter')} [data-gelic-acao="testar"]`);
    await espera();
    assert.deepEqual(gravado.conferidas, ['openrouter:sk-or-v1-abc']);
    for (const id of ['limite', 'chave', 'modelo']) assert.equal(doc.querySelector(`${col('openrouter')} [data-gelic-passo="${id}"]`)!.getAttribute('data-feito'), 'true', id);
    assert.match(doc.querySelector(`${col('openrouter')} .gelic-ia-status`)!.textContent!, /funcionou.*US\$ 10\.00.*US\$ 1\.50/);
    clicar(doc, `${col('openrouter')} [data-gelic-acao="usar"]`);
    await espera();
    assert.deepEqual(gravado.config, { servico: 'openrouter', url: '', chave: 'sk-or-v1-abc', modelo: 'anthropic/claude-sonnet-5', modeloAuxiliar: '', nomes: true });
    assert.deepEqual(gravado.resumo, { servico: 'openrouter', modelo: 'anthropic/claude-sonnet-5', testada: true, limite: 10, usado: 1.5, impressao: await impressaoDaChave('sk-or-v1-abc'), em: '2026-10-12T13:00:00.000Z' });
    assert.ok(!JSON.stringify(gravado.resumo).includes('sk-or'));
    assert.match(doc.querySelector('.gelic-ia-aviso')!.textContent!, /painel do agente estiver aberto, feche e abra de novo/);
  });
  await teste('ia (página): Usar sem testar recusa; chave de outro serviço avisa sem conferir', async () => {
    const doc = janela();
    const { d, gravado } = depsFalsas();
    await montarConfigurarIa(doc, d);
    clicar(doc, `${col('openrouter')} [data-gelic-acao="usar"]`);
    await espera();
    assert.equal(gravado.config, undefined);
    assert.match(doc.querySelector(`${col('openrouter')} .gelic-ia-status`)!.textContent!, /Teste a chave/);
    digitar(doc, `${col('openrouter')} [data-gelic-chave]`, 'sk-ant-api03-x');
    clicar(doc, `${col('openrouter')} [data-gelic-acao="testar"]`);
    await espera();
    assert.deepEqual(gravado.conferidas, []);
    assert.match(doc.querySelector(`${col('openrouter')} .gelic-ia-status`)!.textContent!, /é da Anthropic/);
  });
  await teste('ia (página): chave editada durante o teste não conta como testada (o Usar recusa)', async () => {
    const doc = janela();
    let soltar: (v: { ok: boolean }) => void = () => {};
    const { d, gravado } = depsFalsas({ conferir: () => new Promise(r => { soltar = r; }) });
    await montarConfigurarIa(doc, d);
    digitar(doc, `${col('openrouter')} [data-gelic-chave]`, 'sk-or-v1-abc');
    clicar(doc, `${col('openrouter')} [data-gelic-acao="testar"]`);
    await espera();
    digitar(doc, `${col('openrouter')} [data-gelic-chave]`, 'sk-or-v1-outra');
    soltar({ ok: true });
    await espera();
    clicar(doc, `${col('openrouter')} [data-gelic-acao="usar"]`);
    await espera();
    assert.equal(gravado.config, undefined);
    assert.match(doc.querySelector(`${col('openrouter')} .gelic-ia-status`)!.textContent!, /Teste a chave/);
  });
  await teste('ia (página): Anthropic pede a permissão do navegador antes; recusada, não testa; chave que não responde avisa', async () => {
    const doc = janela();
    const { d, gravado } = depsFalsas({ autorizar: async s => { gravado.autorizados.push(s); return false; } });
    await montarConfigurarIa(doc, d);
    digitar(doc, `${col('anthropic')} [data-gelic-chave]`, 'sk-ant-api03-x');
    clicar(doc, `${col('anthropic')} [data-gelic-acao="testar"]`);
    await espera();
    assert.deepEqual(gravado.autorizados, ['anthropic']);
    assert.deepEqual(gravado.conferidas, []);
    assert.match(doc.querySelector(`${col('anthropic')} .gelic-ia-status`)!.textContent!, /permissão/);
    const doc2 = janela();
    const f = depsFalsas({ conferir: async () => ({ ok: false }) });
    await montarConfigurarIa(doc2, f.d);
    digitar(doc2, `${col('anthropic')} [data-gelic-chave]`, 'sk-ant-api03-x');
    clicar(doc2, `${col('anthropic')} [data-gelic-acao="testar"]`);
    await espera();
    assert.match(doc2.querySelector(`${col('anthropic')} .gelic-ia-status`)!.textContent!, /não respondeu/);
    assert.equal(doc2.querySelector(`${col('anthropic')} [data-gelic-passo="chave"]`)!.getAttribute('data-feito'), 'false');
  });
  await teste('ia (página): o serviço já configurado no agente vem marcado "em uso", com a chave e o modelo dele', async () => {
    const doc = janela();
    await montarConfigurarIa(doc, depsFalsas({ lerConfig: async () => ({ servico: 'anthropic', chave: 'sk-ant-api03-y', modelo: 'claude-opus-5-5' }) }).d);
    assert.match(doc.querySelector(col('anthropic'))!.textContent!, /em uso/);
    assert.equal(doc.querySelector<HTMLInputElement>(`${col('anthropic')} [data-gelic-chave]`)!.value, 'sk-ant-api03-y');
    assert.equal(doc.querySelector<HTMLInputElement>(`${col('anthropic')} [data-gelic-modelo]`)!.value, 'claude-opus-5-5');
    assert.doesNotMatch(doc.querySelector(col('openrouter'))!.textContent!, /em uso/);
  });
}
