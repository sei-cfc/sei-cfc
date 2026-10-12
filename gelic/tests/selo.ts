import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { lerArvore } from '../../sei-nucleo/src/dominio/arvore';
import { definirAnalisador } from '../../sei-nucleo/src/sessao/dom';
import { LISTA_ETAPAS } from '../src/regras/motor';
import { resumir } from '../src/regras/resumo';
import { ROTULOS } from '../src/regras/rotulos';
import { documentosDaRegra } from '../src/pagina/arvore';
import { desenharSelo, ID } from '../src/pagina/selo';
import { roteiro, urlDaPeca } from '../src/peca/roteiro';
import { teste } from './util';

definirAnalisador(html => parseHTML(html).document as unknown as Document);
const fixture = (nome: string) => readFileSync(new URL(`../../sei-nucleo/tests/fixtures/sei41/${nome}`, import.meta.url), 'utf8');
const docDe = (html: string) => parseHTML(html).document as unknown as Document;
const PREP = [{ titulo: 'DFD - Contratação', numero: '0000001' }, { titulo: 'Estudo Técnico Preliminar 30/2025', numero: '0000002' },
  { titulo: 'Termo de Referência 31/2025', numero: '0000003' }, { titulo: 'Ofício 9/2026', numero: '0000004' }];

export async function verificarSelo(): Promise<void> {
  await teste('toda etapa do etapas.json tem rótulo curto', () => {
    assert.deepEqual(LISTA_ETAPAS.map(e => e.id).filter(id => !ROTULOS[id]), []);
  });
  await teste('resumo: etapa, próximo passo e documentos-chave com nº SEI (só os reconhecidos)', () => {
    const r = resumir(PREP);
    assert.equal(r.etapa, 'preparatoria_analise');
    assert.equal(r.nome, 'Preparatória · análise inicial (DVI)');
    assert.equal(r.proximo, 'Analisar a fase preparatória e emitir o DVI (a análise escolhe o formato).');
    assert.deepEqual(r.documentosChave.map(d => d.numero), ['0000001', '0000002', '0000003']);
    assert.match(r.decisivos.find(x => x.startsWith('Ainda não há: ')) ?? '', /\bDVI\b/, r.decisivos.join('; '));
    const comDvi = resumir([...PREP, { titulo: 'Despacho de Verificação Inicial - DVI', numero: '5' }]).decisivos;
    assert.equal(comDvi[0], 'Há: DVI');
    assert.ok(comDvi.includes('Algum documento depois do DVI ou da devolução: não'), comDvi.join('; '));
  });
  await teste('resumo: Portaria 233 sem valor da contratação explica pelo motivo da etapa e lista as opções', () => {
    const r = resumir([...PREP, { titulo: 'Despacho de Verificação Inicial - DVI', numero: '5' }, { titulo: 'Despacho Gelic - emissão reserva Gecont', numero: '6' }]);
    assert.equal(r.etapa, 'autorizacao');
    assert.match(r.proximo, /Portaria PRES CFC 233\/2025/);
    assert.doesNotMatch(r.proximo, /limites\.json/);
    assert.equal(r.opcoes.length, 3);
  });
  await teste('árvore real do SEI 4.1 (fixture): lê os títulos, ignora cancelados e calcula sem quebrar', () => {
    const html = fixture('arvore_completa.html');
    const arvore = lerArvore({ url: 'https://sei.exemplo.gov.br/sei/controlador.php?acao=procedimento_visualizar', status: 200, html, doc: docDe(html) });
    const docs = documentosDaRegra(arvore);
    assert.ok(docs.length > 10);
    assert.equal(docs.length, arvore.documentos.filter(d => !d.cancelado).length);
    const r = resumir(docs);
    assert.ok(r.nome.length > 0);
  });
  await teste('selo: desenha no topo do #container, fechado por padrão, e abre ao clicar', () => {
    const doc = docDe(fixture('arvore.html'));
    const raiz = desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: '00000.000001/2026-01' }, () => {});
    assert.equal(doc.getElementById('container')!.firstElementChild, raiz);
    assert.equal(raiz.getAttribute('data-tom'), 'acao');
    const cab = raiz.querySelector('button.gelic-cab')!;
    const det = raiz.querySelector<HTMLElement>('.gelic-detalhe')!;
    assert.equal(cab.getAttribute('aria-expanded'), 'false');
    assert.equal(det.hidden, true);
    (cab as HTMLElement).click();
    assert.equal(det.hidden, false);
    assert.equal(cab.getAttribute('aria-expanded'), 'true');
    assert.match(det.textContent!, /Próximo passo/);
    assert.match(det.textContent!, /Termo de Referência 31\/2025 \(0000003\)/);
  });
  await teste('selo: redesenhar não duplica; sigiloso e erro não abrem detalhe', () => {
    const doc = docDe(fixture('arvore.html'));
    desenharSelo(doc, { tipo: 'carregando' });
    desenharSelo(doc, { tipo: 'sigiloso' });
    assert.equal(doc.querySelectorAll(`#${ID}`).length, 1);
    assert.match(doc.getElementById(ID)!.textContent!, /sigiloso/);
    assert.equal(doc.querySelector(`#${ID} button`), null);
    desenharSelo(doc, { tipo: 'erro', mensagem: 'Sessão expirada' });
    assert.match(doc.getElementById(ID)!.textContent!, /Sessão expirada/);
  });
  await teste('selo: título de documento entra como texto, nunca como HTML', () => {
    const doc = docDe(fixture('arvore.html'));
    const r = resumir([{ titulo: 'Termo de Referência <img src=x onerror=alert(1)>', numero: '1' }]);
    desenharSelo(doc, { tipo: 'resumo', resumo: r, protocolo: '1' }, () => {});
    assert.equal(doc.querySelector(`#${ID} img`), null);
    assert.match(doc.getElementById(ID)!.textContent!, /<img src=x/);
  });

  await teste('roteiro cfc: a sequência do usuário (2026-10-10), peças pela árvore, próxima e completa', () => {
    const r = roteiro([{ titulo: 'Documento de Formalização da Demanda (DFD)', numero: '1' }, { titulo: 'Termo de Referência', numero: '2' }]);
    assert.deepEqual(r.passos.map(p => p.chave), ['dfd', 'termos_cientificacao', 'portaria_planejamento', 'portaria_gestores', 'etp', 'pesquisa_banco_precos',
      'cotacoes', 'mapa_precos', 'tr', 'mapa_riscos', 'checklist_conformidade', 'despacho_delic']);
    assert.equal(r.passos.find(p => p.chave === 'dfd')?.feito, true);
    assert.equal(r.passos.find(p => p.chave === 'tr')?.numero, '2');
    assert.deepEqual(['etp', 'tr', 'mapa_riscos'].map(c => r.passos.find(p => p.chave === c)?.onde), ['compras', 'compras', 'compras'], 'ETP, TR e riscos no Compras.gov.br');
    assert.deepEqual(['portaria_planejamento', 'portaria_gestores', 'pesquisa_banco_precos', 'cotacoes'].map(c => r.passos.find(p => p.chave === c)?.onde), ['anexar', 'anexar', 'anexar', 'anexar']);
    // termos e portarias ficaram para trás (já há o TR): conforme o caso, não voltam; o ETP é obrigatório
    assert.equal(r.proxima?.chave, 'etp');
    assert.equal(r.completa, false);
    assert.equal(roteiro([{ titulo: 'DFD - Contratação', numero: '1' }]).proxima?.chave, 'termos_cientificacao', 'logo depois do DFD, os termos');
    const tudo = roteiro([{ titulo: 'DFD', numero: '1' }, { titulo: 'ETP383500_000078_2026.pdf', numero: '2', externo: true }, { titulo: 'Pesquisa de preços - Banco de Preços', numero: '3', externo: true },
      { titulo: 'Cotação - Empresa A', numero: '4', externo: true }, { titulo: 'Cotação - Empresa B', numero: '5', externo: true }, { titulo: 'Cotação - Empresa C', numero: '6', externo: true },
      { titulo: 'Mapa Comparativo de Preços', numero: '7' }, { titulo: 'TR383500_000012_2026.pdf', numero: '8', externo: true }, { titulo: 'Mapa de Riscos', numero: '9', externo: true },
      { titulo: 'Memorando nº 32 - encaminha GELIC', numero: '10' }]);
    assert.equal(tudo.completa, true, 'sem termos, portarias e checklist (conforme o caso) a instrução fecha');
    assert.equal(tudo.proxima, null);
  });
  await teste('roteiro cfc: cotações pedem 3; peça interna sem assinatura fica "em elaboração" e não fecha a instrução', () => {
    const duas = roteiro([{ titulo: 'Cotação - A', numero: '1', externo: true }, { titulo: 'Cotação - B', numero: '2', externo: true }]);
    const cot = duas.passos.find(p => p.chave === 'cotacoes')!;
    assert.equal(cot.estado, 'em_elaboracao');
    assert.deepEqual(cot.quantos, { tem: 2, minimo: 3 });
    const rascunho = roteiro([{ titulo: 'DFD', numero: '1', assinado: false }]);
    assert.equal(rascunho.passos[0].estado, 'em_elaboracao');
    assert.equal(rascunho.passos[0].feito, false);
    assert.equal(rascunho.proxima?.chave, 'dfd', 'o DFD sem assinatura continua sendo a próxima');
    assert.equal(roteiro([{ titulo: 'DFD', numero: '1', assinado: true }]).passos[0].feito, true);
  });
  await teste('roteiro cfc: memorando qualquer não é o despacho à Gelic; termo de ciência de conflito de interesses é termo; portarias separadas', () => {
    const r = roteiro([{ titulo: 'Memorando 12/2026 - Solicitação de contratação', numero: '1' }, { titulo: 'DFD', numero: '2' },
      { titulo: 'Termo de Ciência de conflito de interesses', numero: '3' }, { titulo: 'Portaria nº 13 - Gestores de Contrato', numero: '4', externo: true }]);
    assert.equal(r.passos.find(p => p.chave === 'despacho_delic')!.feito, false);
    assert.equal(r.passos.find(p => p.chave === 'termos_cientificacao')!.numero, '3');
    assert.equal(r.passos.find(p => p.chave === 'portaria_gestores')!.numero, '4');
    assert.equal(r.passos.find(p => p.chave === 'portaria_planejamento')!.feito, false);
    assert.equal(r.completa, false);
    for (const t of ['Memorando nº 32 - encaminha GELIC', 'Despacho Envio à Gelic', 'Memorando — Despacho de envio ao Delic'])
      assert.equal(roteiro([{ titulo: t, numero: '9' }]).passos.at(-1)!.feito, true, t);
    // revisão da r12: títulos que NÃO são a peça
    for (const t of ['Despacho Gelic - devolução', 'Despacho da Gelic à Gecont', 'Despacho de Verificação Inicial - DVI'])
      assert.equal(roteiro([{ titulo: t, numero: '9' }]).passos.at(-1)!.feito, false, t);
    const nada = (t: string, chave: string) => assert.equal(roteiro([{ titulo: t, numero: '9' }]).passos.find(p => p.chave === chave)!.estado, 'falta', t);
    nada('E-mail solicitação de cotação', 'cotacoes');
    nada('Planilha de cotação', 'cotacoes');
    nada('Lista de Verificação AGU', 'checklist_conformidade');
    assert.equal(roteiro([{ titulo: 'Despacho de Conformidade', numero: '9', assinado: true }]).passos.find(p => p.chave === 'checklist_conformidade')!.feito, true, 'enquanto o tipo do checklist não existe no SEI');
    nada('Portaria de nomeação de pregoeiro', 'portaria_planejamento');
    nada('Portaria PRES 233/2025', 'portaria_planejamento');
    assert.equal(roteiro([{ titulo: 'Mapa de preços', numero: '9' }]).passos.find(p => p.chave === 'mapa_precos')!.feito, true, 'o nome da árvore inicial');
  });
  await teste('roteiro cfc (revisão r12): a árvore inicial vazia não dá a instrução por completa; peça vazia não dispensa as anteriores', () => {
    const vazio = (titulo: string, numero: string) => ({ titulo, numero, externo: true, comArquivo: false });
    const rascunho = (titulo: string, numero: string) => ({ titulo, numero, assinado: false });
    const arvoreInicial = [{ titulo: 'DFD', numero: '1', assinado: true }, ...[2, 3, 4, 5].map(n => rascunho('Termo de Ciência', String(n))),
      vazio('Portaria nº - Equipe de Planejamento', '6'), vazio('Portaria nº - Gestores de Contrato', '7'), vazio('Estudo Técnico Preliminar', '8'),
      vazio('Pesquisa de preços - Banco de Preços', '9'), ...[10, 11, 12].map(n => vazio('Cotação de fornecedor', String(n))), rascunho('Mapa de preços', '13'),
      vazio('Termo de Referência', '14'), vazio('Mapa de Riscos', '15'), rascunho('Despacho Envio à Gelic', '16')];
    const r = roteiro(arvoreInicial);
    assert.equal(r.completa, false);
    assert.deepEqual(r.passos.filter(p => p.feito).map(p => p.chave), ['dfd']);
    assert.equal(r.passos.find(p => p.chave === 'etp')!.estado, 'em_elaboracao', 'externo sem arquivo: em elaboração');
    assert.equal(r.proxima?.chave, 'termos_cientificacao', 'o despacho vazio no fim não dispensa os termos');
  });
  await teste('selo cfc: "Verificar antes de enviar" abre a janela da verificação do processo (não o agente)', () => {
    const doc = docDe(fixture('arvore.html'));
    const abertas: string[] = [];
    const pedidos: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: 'P1', docs: PREP }, p => pedidos.push(p), 'cfc', { abrirJanela: () => {}, abrirVerificacao: p => abertas.push(p) });
    const b = doc.querySelector<HTMLButtonElement>('#gelic-selo [data-acao=verificar]')!;
    assert.equal(b.textContent, 'Verificar antes de enviar');
    b.click();
    assert.deepEqual(abertas, ['P1']);
    assert.deepEqual(pedidos, []);
  });
  await teste('selo gelic: sem "Verificar antes de enviar"', () => {
    const doc = docDe(fixture('arvore.html'));
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: 'P1', docs: PREP }, () => {}, 'gelic');
    assert.equal(doc.querySelector('#gelic-selo [data-acao=verificar]'), null);
  });
  await teste('selo cfc: com a instrução feita até o mapa de riscos, a próxima é o checklist, com o botão Verificar', () => {
    const doc = docDe(fixture('arvore.html'));
    const abertas: string[] = [];
    const pronto = (titulo: string, numero: string) => ({ titulo, numero, assinado: true });
    const anexo = (titulo: string, numero: string) => ({ titulo, numero, externo: true, comArquivo: true });
    const docs = [pronto('DFD', '1'), pronto('Termo de Ciência', '2'), anexo('Portaria nº 1 - Equipe de Planejamento', '3'), anexo('Portaria nº 2 - Gestores de Contrato', '4'),
      anexo('Estudo Técnico Preliminar', '5'), anexo('Pesquisa de preços - Banco de Preços', '6'), ...[7, 8, 9].map(n => anexo('Cotação de fornecedor', String(n))),
      pronto('Mapa de preços', '10'), anexo('Termo de Referência', '11'), anexo('Mapa de Riscos', '12')];
    assert.equal(roteiro(docs).proxima?.chave, 'checklist_conformidade');
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(docs), protocolo: 'P1', docs }, () => {}, 'cfc', { abrirJanela: () => {}, abrirVerificacao: p => abertas.push(p) });
    const linha = doc.querySelector('#gelic-selo .gelic-roteiro')!;
    assert.match(linha.textContent!, /Próxima peça: Checklist de Conformidade/);
    linha.querySelector<HTMLButtonElement>('[data-gelic-verificar]')!.click();
    assert.deepEqual(abertas, ['P1']);
    assert.equal(linha.querySelector('[data-gelic-preencher]'), null);
  });
  await teste('selo cfc: Gerar documento → peça abre a janela (não o agente) e mostra o roteiro', () => {
    const doc = docDe(fixture('arvore.html'));
    const abertas: string[] = [];
    const pedidos: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: 'P1', docs: PREP }, p => pedidos.push(p), 'cfc', { abrirJanela: (m, p) => abertas.push(urlDaPeca(m, p)) });
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-acao=documento]')!.click();
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-documento=dfd]')!.click();
    assert.deepEqual(abertas, [urlDaPeca('dfd', 'P1')]);
    assert.deepEqual(pedidos, []);
    const linha = doc.querySelector('#gelic-selo .gelic-roteiro')!;
    assert.ok(linha);
    assert.equal(doc.querySelector('#gelic-selo [data-documento=tr]'), null, 'TR fora do formulário');
    assert.ok(doc.querySelector('#gelic-selo [data-indisponivel=tr]'));
    // PREP tem DFD, ETP e TR: a próxima é a pesquisa do Banco de Preços (externa: sem formulário, só a nota)
    assert.match(linha.textContent!, /Próxima peça: Pesquisa de preços - Banco de Preços \(documento externo: anexe o PDF\)/);
    assert.equal(linha.querySelector('[data-gelic-preencher]'), null);
    assert.equal(doc.querySelectorAll('#gelic-selo .gelic-passo').length, 12);
    // com a pesquisa e as cotações, a próxima é o mapa de preços, com o botão que abre a janela
    const comPesquisa = [...PREP, { titulo: 'Pesquisa de preços - Banco de Preços', numero: '5' }, ...['A', 'B', 'C'].map((x, i) => ({ titulo: `Cotação - ${x}`, numero: String(6 + i) }))];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(comPesquisa), protocolo: 'P1', docs: comPesquisa }, () => {}, 'cfc', { abrirJanela: (m, p) => abertas.push(urlDaPeca(m, p)) });
    const linha2 = doc.querySelector('#gelic-selo .gelic-roteiro')!;
    assert.match(linha2.textContent!, /Próxima peça: Mapa de preços/);
    linha2.querySelector<HTMLButtonElement>('[data-gelic-preencher]')!.click();
    assert.deepEqual(abertas.at(-1), urlDaPeca('mapa_precos', 'P1'));
  });
  await teste('selo cfc: DFD vazio na árvore (Iniciar processo) → "Preencher" abre o formulário gravando naquele documento', () => {
    const doc = docDe(fixture('arvore.html'));
    const abertas: string[] = [];
    const docs = [{ titulo: 'Documento de Formalização da Demanda (DFD)', numero: '9700001', assinado: false }];
    const abrir = { abrirJanela: (m: string, p: string, d?: string) => { abertas.push(urlDaPeca(m, p, d)); } };
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir([]), protocolo: 'P1', docs, vazios: [{ chave: 'dfd', numero: '9700001' }] }, () => {}, 'cfc', abrir);
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-gelic-preencher]')!.click();
    // revisão r13: um DFD que a unidade escreveu à mão (não criado vazio pela extensão) nunca é sobrescrito
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir([]), protocolo: 'P1', docs }, () => {}, 'cfc', abrir);
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-gelic-preencher]')!.click();
    assert.deepEqual(abertas, ['js/gelic/peca.html?modelo=dfd&processo=P1&documento=9700001', 'js/gelic/peca.html?modelo=dfd&processo=P1']);
  });
  await teste('selo gelic: sem roteiro, e o seletor continua pedindo ao agente', () => {
    const doc = docDe(fixture('arvore.html'));
    const pedidos: string[] = [];
    const abertas: string[] = [];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(PREP), protocolo: 'P1', docs: PREP }, p => pedidos.push(p), 'gelic', { abrirJanela: (m, p) => abertas.push(urlDaPeca(m, p)) });
    assert.equal(doc.querySelector('#gelic-selo .gelic-roteiro'), null);
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-acao=documento]')!.click();
    doc.querySelector<HTMLButtonElement>('#gelic-selo [data-documento=dvi]')!.click();
    assert.equal(pedidos.length, 1);
    assert.deepEqual(abertas, []);
  });
  await teste('selo cfc: instrução completa', () => {
    const doc = docDe(fixture('arvore.html'));
    const docs = [{ titulo: 'DFD', numero: '1' }, { titulo: 'Estudo Técnico Preliminar', numero: '2' }, { titulo: 'Pesquisa de preços - Banco de Preços', numero: '3' },
      ...['A', 'B', 'C'].map((x, i) => ({ titulo: `Cotação - ${x}`, numero: String(4 + i) })), { titulo: 'Mapa Comparativo de Preços', numero: '7' },
      { titulo: 'Termo de Referência', numero: '8' }, { titulo: 'Mapa de Riscos', numero: '9' }, { titulo: 'Despacho Envio à Gelic', numero: '10' }];
    desenharSelo(doc, { tipo: 'resumo', resumo: resumir(docs), protocolo: 'P1', docs }, () => {}, 'cfc', { abrirJanela: () => {} });
    assert.match(doc.querySelector('#gelic-selo .gelic-roteiro')!.textContent!, /Instrução completa/);
    assert.equal(doc.querySelector('#gelic-selo [data-gelic-preencher]'), null);
  });
}
