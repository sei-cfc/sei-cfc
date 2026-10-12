// Só as verificações do site (scripts/gelic-site.sh); a última linha é a versão, para o commit da publicação.
import { readFileSync } from 'node:fs';
import { versaoGelic } from '../src/empacotamento/manifesto';
import { verificarSite } from './site';

await verificarSite();
const upstream = JSON.parse(readFileSync(new URL('../../dist/manifest.json', import.meta.url), 'utf8')).version as string;
const { revisao } = JSON.parse(readFileSync(new URL('../versao.json', import.meta.url), 'utf8')) as { revisao: number };
console.log(`versao=${versaoGelic(upstream, revisao)}`);
