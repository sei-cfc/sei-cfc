import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { CATALOGOS, DOCUMENTOS, GRUPO_DEMANDANTE, sugeridos } from '../src/documentos/catalogo';
import { perfilAtual, perfilDoManifesto } from '../src/perfil';
import { promptDoPerfil, skillsDoPerfil, toolsDoPerfil } from '../src/agente/perfil';
import { PROMPT_GELIC, SKILLS_GELIC, TOOLS_GELIC } from '../src/agente';
import { BOTOES_DO_PERFIL } from '../src/pagina/acoes';
import { desenharSelo } from '../src/pagina/selo';
import { resumir } from '../src/regras/resumo';
import { teste } from './util';

const ANALISE_GELIC = /^gelic_(dvi_|pendencias|modelo_|documento_gravar)/;
const docVazio = () => parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
/** O que o agente-ia vê pelo G2 com o manifest do perfil (processo próprio: o módulo lê o perfil ao carregar). */
function agenteNoPerfil(perfil: string): { tools: string[]; totalTools: number; skills: string[]; prompt: string } {
  const tsx = fileURLToPath(new URL('../node_modules/.bin/tsx', import.meta.url));
  const script = fileURLToPath(new URL('./perfil-g2.ts', import.meta.url));
  return JSON.parse(execFileSync(tsx, [script, perfil], { encoding: 'utf8' }));
}

export async function verificarPerfil(): Promise<void> {
  await teste('perfil: lido da chave sei_pro_perfil do manifest; sem chave, valor estranho ou sem chrome, é gelic', () => {
    assert.equal(perfilDoManifesto({ name: 'SEI CFC', sei_pro_perfil: 'cfc' }), 'cfc');
    assert.equal(perfilDoManifesto({ name: 'SEI CFC Gelic' }), 'gelic');
    assert.equal(perfilDoManifesto({ sei_pro_perfil: 'outro' }), 'gelic');
    assert.equal(perfilDoManifesto(undefined), 'gelic');
    assert.equal(perfilAtual(), 'gelic', 'nos testes não há chrome');
    const g = globalThis as Record<string, unknown>;
    g.chrome = { runtime: { getManifest: () => ({ sei_pro_perfil: 'cfc' }) } };
    try {
      assert.equal(perfilAtual(), 'cfc');
      g.chrome = { runtime: { getManifest: () => { throw new Error('contexto invalidado'); } } };
      assert.equal(perfilAtual(), 'gelic');
    } finally {
      delete g.chrome;
    }
  });
  await teste('catálogo por perfil: gelic tem os 23; cfc só o grupo do demandante, sem peça de análise nem contrato', () => {
    assert.equal(CATALOGOS.gelic.documentos, DOCUMENTOS);
    assert.deepEqual(CATALOGOS.cfc.grupos, [GRUPO_DEMANDANTE]);
    assert.deepEqual(CATALOGOS.cfc.documentos.filter(d => d.via === 'analise' || /contrato|aditivo|apostilamento|extincao|edital|ata-/.test(d.id)), []);
    // Na etapa de análise a regra sugere o DVI: no cfc, não.
    const r = resumir([{ titulo: 'Termo de Referência 1/2026', numero: '1' }]);
    assert.deepEqual(sugeridos(r).map(d => d.id), ['dvi']);
    assert.deepEqual(sugeridos(r, CATALOGOS.cfc), []);
  });
  await teste('ferramentas por perfil: gelic todas; cfc gelic_etapa e gelic_calcular (leitura) e as do demandante (cfc_*), sem análise da Gelic', () => {
    assert.equal(toolsDoPerfil('gelic'), TOOLS_GELIC);
    const cfc = toolsDoPerfil('cfc');
    assert.deepEqual(cfc.map(t => t.nome).sort(), ['cfc_documento_gravar', 'cfc_modelo_analisar', 'gelic_calcular', 'gelic_etapa']);
    assert.deepEqual(cfc.filter(t => t.efeito !== 'leitura').map(t => t.nome), ['cfc_documento_gravar'], 'a única escrita é a peça do demandante, com cartão de aprovação');
    for (const t of cfc) assert.doesNotMatch(t.descricao, /\bDVI\b|pendências|Gelic/, t.nome);
    assert.equal(cfc.find(t => t.nome === 'gelic_etapa')!.executar, TOOLS_GELIC.find(t => t.nome === 'gelic_etapa')!.executar, 'mesma execução, só a descrição muda');
  });
  await teste('skills e prompt por perfil: cfc sem skills gelic-*, com a cfc-documento e o contexto do demandante (Lei 14.133, nunca inventar)', () => {
    assert.equal(skillsDoPerfil('gelic'), SKILLS_GELIC);
    assert.deepEqual(Object.keys(skillsDoPerfil('cfc')), ['cfc-documento']);
    assert.ok(!Object.keys(SKILLS_GELIC).some(s => s.startsWith('cfc-')), 'a skill do cfc não entra na Gelic'); 
    assert.equal(promptDoPerfil('gelic'), PROMPT_GELIC);
    const p = promptDoPerfil('cfc');
    assert.match(p, /instrui processos de contratação no Conselho Federal de Contabilidade/);
    assert.match(p, /DFD.*ETP.*termo de referência/s);
    assert.match(p, /14\.133/);
    assert.match(p, /Nunca invente/);
    assert.doesNotMatch(p, /gelic_dvi|gelic_pendencias|gelic_modelo|em breve/);
    assert.match(p, /cfc_modelo_analisar.*cfc_documento_gravar.*cfc-documento/s);
    assert.doesNotMatch(promptDoPerfil('gelic'), /cfc_|cfc-documento/);
  });
  await teste('gancho G2 em tempo de execução: com o manifest do cfc o agente não vê gelic_dvi_*, pendências, modelos nem skills gelic-*; vê as cfc_*', () => {
    const cfc = agenteNoPerfil('cfc');
    assert.deepEqual(cfc.tools.sort(), ['cfc_documento_gravar', 'cfc_modelo_analisar', 'gelic_calcular', 'gelic_etapa']);
    assert.deepEqual(cfc.skills.filter(s => s.startsWith('gelic-')), []);
    assert.ok(cfc.skills.includes('cfc-documento'));
    assert.ok(cfc.skills.includes('redacao-oficial'), 'as do upstream continuam');
    assert.match(cfc.prompt, /CONTEXTO DO CFC/);
    assert.doesNotMatch(cfc.prompt, /CONTEXTO DA GELIC/);
    assert.ok(cfc.prompt.indexOf('CONTEXTO DO CFC') < cfc.prompt.indexOf('INSTRUCAO DO USUARIO'));
    const gelic = agenteNoPerfil('gelic');
    assert.ok(gelic.tools.some(n => ANALISE_GELIC.test(n)), 'o pacote da Gelic continua com a análise');
    assert.ok(!gelic.tools.some(n => n.startsWith('cfc_')) && !gelic.skills.includes('cfc-documento'), 'nada do cfc no pacote da Gelic');
    assert.equal(gelic.totalTools - cfc.totalTools, TOOLS_GELIC.length - 4, 'só as ferramentas da Gelic e do cfc mudam');
    assert.match(gelic.prompt, /CONTEXTO DA GELIC/);
  });
  await teste('selo por perfil: gelic com Analisar, Pendências, Gerar e Próximo; cfc só Gerar documento e Próximo passo', () => {
    assert.deepEqual(BOTOES_DO_PERFIL.gelic, ['analisar', 'pendencias', 'documento', 'proximo']);
    const r = resumir([{ titulo: 'Termo de Referência 1/2026', numero: '1' }]);
    const g = docVazio();
    desenharSelo(g, { tipo: 'resumo', resumo: r, protocolo: 'P1' }, () => {}, 'gelic');
    assert.deepEqual([...g.querySelectorAll('.gelic-acao')].map(b => b.getAttribute('data-acao')), ['analisar', 'pendencias', 'documento', 'proximo']);
    assert.match(g.querySelector('.gelic-sobre')!.textContent!, /^Gelic$/);

    const doc = docVazio();
    const pedidos: string[] = [];
    const raiz = desenharSelo(doc, { tipo: 'resumo', resumo: r, protocolo: 'P1' }, p => pedidos.push(p), 'cfc');
    assert.equal(raiz.getAttribute('data-perfil'), 'cfc');
    assert.deepEqual([...doc.querySelectorAll('.gelic-acao')].map(b => b.getAttribute('data-acao')), ['documento', 'proximo']);
    assert.doesNotMatch(raiz.querySelector('.gelic-acoes')!.textContent!, /Pendências|Analisar/);
    assert.doesNotMatch(raiz.textContent!, /Pendências|skill gelic/);
    const gerar = doc.querySelector<HTMLButtonElement>('[data-acao=documento]')!;
    assert.ok(!gerar.classList.contains('gelic-acao-destaque'), 'nada sugerido no cfc (o DVI é da Gelic)');
    gerar.click();
    const painel = doc.querySelector<HTMLElement>('.gelic-docs')!;
    assert.equal(painel.hidden, false);
    assert.equal(painel.querySelectorAll('[data-documento]').length, 4, 'as 4 peças do demandante com formulário (o TR é feito no Compras.gov.br)');
    assert.equal(painel.querySelector('.gelic-sugeridos'), null);
    assert.match(painel.textContent!, /Peças do demandante \(4\)/);
    assert.doesNotMatch(painel.textContent!, /em breve|próxima versão/);
    doc.querySelector<HTMLButtonElement>('[data-acao=proximo]')!.click();
    assert.equal(doc.getElementById('gelic-selo-detalhe')!.hidden, false, 'Próximo passo abre o detalhe, sem IA');
    assert.deepEqual(pedidos, []);
  });
}
