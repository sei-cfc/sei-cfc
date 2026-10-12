import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import type { Area } from '../src/controle/cache';
import { CHAVE_VISTA, desenharNovidades, ligarNovidades } from '../src/pagina/novidades';
import { desenharSelo } from '../src/pagina/selo';
import { resumir } from '../src/regras/resumo';
import { teste } from './util';

const PREP = [{ titulo: 'DFD - Contratação', numero: '0000001' }];
function selo(perfil: 'gelic' | 'cfc' = 'gelic', tipo: 'resumo' | 'sigiloso' = 'resumo'): Document {
  const doc = parseHTML('<html><body><div id="container"></div></body></html>').document as unknown as Document;
  if (tipo === 'resumo') desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: '00000.000001/2026-01' }, () => {}, perfil);
  else desenharSelo(doc, { tipo: 'sigiloso' }, () => {}, perfil);
  return doc;
}
function area(inicial: Record<string, unknown> = {}, falhar = false) {
  const dados: Record<string, unknown> = { ...inicial };
  const a: Area = {
    get: async (k: string) => (k in dados ? { [k]: dados[k] } : {}),
    set: async (o: Record<string, unknown>) => { if (falhar) throw new Error('falhou'); Object.assign(dados, o); },
  };
  return { a, dados };
}
const aviso = (doc: Document) => doc.querySelector<HTMLAnchorElement>('#gelic-selo .gelic-novidades a.gelic-novidades-link');
const esperar = () => new Promise(r => setTimeout(r, 10));

export async function verificarNovidades(): Promise<void> {
  await teste('novidades: versão não vista mostra "Novidades da versão X" logo abaixo do cabeçalho, com o link da âncora', () => {
    const doc = selo();
    desenharNovidades(doc, { versao: '2.9.0.18', vista: null, perfil: 'gelic' }, () => {});
    const a = aviso(doc);
    assert.ok(a !== null, 'aviso presente');
    assert.equal(a!.textContent, 'Novidades da versão 2.9.0.18');
    assert.equal(a!.getAttribute('href'), 'https://sei-cfc.github.io/novidades/#v2-9-0-18');
    assert.equal(a!.getAttribute('target'), '_blank');
    assert.ok(doc.querySelector('#gelic-selo .gelic-cab')!.nextElementSibling === a!.parentElement, 'logo depois do cabeçalho');
  });

  await teste('novidades: versão já vista não mostra aviso; "Ajuda" fica sempre no detalhe, com a página do perfil', () => {
    const doc = selo('cfc');
    desenharNovidades(doc, { versao: '2.9.0.18', vista: '2.9.0.18', perfil: 'cfc' }, () => {});
    assert.ok(aviso(doc) === null, 'sem aviso');
    const ajuda = doc.querySelector<HTMLAnchorElement>('#gelic-selo .gelic-detalhe a.gelic-ajuda');
    assert.ok(ajuda !== null);
    assert.equal(ajuda!.getAttribute('href'), 'https://sei-cfc.github.io/sei-cfc/');
    assert.equal(ajuda!.textContent, 'Ajuda');
  });

  await teste('novidades: depois de duas atualizações sem ver, o aviso aponta para a versão instalada', () => {
    const doc = selo();
    desenharNovidades(doc, { versao: '2.9.0.18', vista: '2.9.0.16', perfil: 'gelic' }, () => {});
    assert.ok(aviso(doc)!.getAttribute('href')!.endsWith('#v2-9-0-18'));
  });

  await teste('novidades: o clique esconde o aviso e grava a versão; redesenhar não duplica aviso nem "Ajuda"', async () => {
    const doc = selo();
    const { a, dados } = area();
    await ligarNovidades(doc, 'gelic', { versao: () => '2.9.0.18', area: a });
    await ligarNovidades(doc, 'gelic', { versao: () => '2.9.0.18', area: a });
    assert.equal(doc.querySelectorAll('#gelic-selo .gelic-novidades').length, 1);
    assert.equal(doc.querySelectorAll('#gelic-selo [data-gelic-ajuda]').length, 1);
    aviso(doc)!.click();
    await esperar();
    assert.ok(doc.querySelector<HTMLElement>('#gelic-selo .gelic-novidades')!.hidden, 'escondido');
    assert.equal(dados[CHAVE_VISTA], '2.9.0.18');
    await ligarNovidades(doc, 'gelic', { versao: () => '2.9.0.18', area: a });
    assert.ok(aviso(doc) === null, 'na próxima página, sem aviso');
  });

  await teste('novidades: sem runtime (extensão recarregada) ou sem storage, nada; erro ao gravar não escapa', async () => {
    const doc = selo();
    await ligarNovidades(doc, 'gelic', { versao: () => undefined, area: area().a });
    await ligarNovidades(doc, 'gelic', { versao: () => '2.9.0.18', area: null });
    assert.ok(aviso(doc) === null && doc.querySelector('[data-gelic-ajuda]') === null, 'nada desenhado');
    const falha = area({}, true);
    await ligarNovidades(doc, 'gelic', { versao: () => '2.9.0.18', area: falha.a });
    aviso(doc)!.click();
    await esperar();
    assert.ok(doc.querySelector<HTMLElement>('#gelic-selo .gelic-novidades')!.hidden, 'some mesmo sem gravar');
    assert.equal(falha.dados[CHAVE_VISTA], undefined, 'nada gravado: a página seguinte avisa de novo');
  });

  await teste('novidades: no selo sem detalhe (sigiloso), o aviso aparece e o "Ajuda" não', () => {
    const doc = selo('gelic', 'sigiloso');
    desenharNovidades(doc, { versao: '2.9.0.18', vista: null, perfil: 'gelic' }, () => {});
    assert.ok(aviso(doc) !== null);
    assert.ok(doc.querySelector('[data-gelic-ajuda]') === null);
  });
}
