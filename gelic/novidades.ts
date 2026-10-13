/**
 * Escreve em site/docs/novidades.md a entrada da versão atual, quando a revisão só traz a versão nova do SEI Pro
 * (scripts/gelic-ci-atualizar.sh). Não duplica: se a versão já tem entrada, nada muda.
 *
 *   npx tsx novidades.ts <versão do SEI Pro antes do merge>
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { versaoGelic } from './src/empacotamento/manifesto';
import { entradaDoUpstream, incluirEntrada } from './src/novidades-upstream';

const baseAnterior = process.argv[2];
if (!baseAnterior) throw new Error('uso: npx tsx novidades.ts <versão do SEI Pro antes do merge>');
const ler = (rel: string) => readFileSync(new URL(rel, import.meta.url), 'utf8');
const upstream = (JSON.parse(ler('../dist/manifest.json')) as { version: string }).version;
const { revisao } = JSON.parse(ler('versao.json')) as { revisao: number };
const versao = versaoGelic(upstream, revisao);
const data = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
const caminho = new URL('site/docs/novidades.md', import.meta.url);
const antes = readFileSync(caminho, 'utf8');
const depois = incluirEntrada(antes, entradaDoUpstream(ler('../pages/HISTORICO.md'), baseAnterior, upstream, versao, data), versao);
if (depois !== antes) writeFileSync(caminho, depois);
console.log(versao);
