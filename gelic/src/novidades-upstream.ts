/**
 * A entrada de Novidades de uma revisão que só traz a versão nova do SEI Pro (workflow diário,
 * scripts/gelic-ci-atualizar.sh). O texto vem do histórico do próprio SEI Pro (pages/HISTORICO.md), das versões
 * depois da base anterior, sem links nem imagens: os caminhos do upstream não existem no nosso site, e o MkDocs
 * estrito recusaria. Puro.
 */
import { ancoraDaVersao } from './site';

export interface VersaoDoHistorico { versao: string; texto: string }

const RE_VERSAO = /^### Versão (\d+(?:\.\d+)*)\s*$/gm;
const RE_DATA = /^\d{2}\/\d{2}\/\d{4}\s*$/m;
/** Endereço de link com até um nível de parênteses dentro ("../a_(b).md"). */
const ENDERECO = String.raw`\((?:[^()]|\([^()]*\))*\)`;
/**
 * Sem imagens nem links (os caminhos do upstream não existem no nosso site) e sem HTML cru (o site é público):
 * primeiro as imagens (inclusive dentro de link), depois os links, inclusive os que ficaram vazios.
 */
const limpar = (t: string) => t
  .replace(new RegExp(String.raw`!\[[^\]]*\]` + ENDERECO + String.raw`\s?`, 'g'), '')
  .replace(new RegExp(String.raw`\[([^\]]*)\]` + ENDERECO, 'g'), '$1')
  .replace(/</g, '&lt;');
/** Compara versões como números (3.10 > 3.9). */
function comparar(a: string, b: string): number {
  const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
}

/**
 * As versões do histórico mais novas que a base anterior, na ordem do histórico (a mais nova primeiro), até a primeira
 * versão ≤ base. Histórico que não chega à base é erro: o texto inteiro iria parar nas Novidades.
 */
export function versoesDoHistorico(historico: string, baseAnterior: string): VersaoDoHistorico[] {
  const marcas = [...historico.matchAll(RE_VERSAO)];
  const saida: VersaoDoHistorico[] = [];
  for (const [i, m] of marcas.entries()) {
    if (comparar(m[1], baseAnterior) <= 0) return saida;
    const fim = i + 1 < marcas.length ? marcas[i + 1].index : historico.length;
    const corpo = historico.slice(m.index + m[0].length, fim).replace(RE_DATA, '');
    saida.push({ versao: m[1], texto: limpar(corpo).trim() });
  }
  throw new Error(`a versão ${baseAnterior} do SEI Pro não está no histórico (pages/HISTORICO.md mudou de formato?)`);
}

/** A entrada inteira, com a âncora que o selo usa ({#v3-2-3-23}). */
export function entradaDoUpstream(historico: string, baseAnterior: string, base: string, versaoFinal: string, data: string): string {
  const versoes = versoesDoHistorico(historico, baseAnterior);
  const L = [
    `## ${versaoFinal} — ${data} {#${ancoraDaVersao(versaoFinal)}}`,
    '',
    `Base atualizada para o **SEI Pro ${base}** (atualização automática). Nas extensões do CFC, nada muda além da base.`,
    '',
  ];
  if (versoes.length) {
    L.push('O que chega do SEI Pro:', '');
    for (const v of versoes) L.push(`**SEI Pro ${v.versao}**`, '', v.texto, '');
  }
  return `${L.join('\n').trimEnd()}\n`;
}

/** Põe a entrada logo abaixo do título "# Novidades"; se a versão já tem entrada, devolve o arquivo como estava. */
export function incluirEntrada(novidades: string, entrada: string, versaoFinal: string): string {
  if (novidades.includes(`{#${ancoraDaVersao(versaoFinal)}}`)) return novidades;
  const titulo = '# Novidades\n\n';
  if (!novidades.startsWith(titulo)) throw new Error('novidades.md não começa com "# Novidades"');
  return `${titulo}${entrada}\n${novidades.slice(titulo.length)}`;
}
