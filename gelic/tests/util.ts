import { readFileSync } from 'node:fs';

/**
 * Classe que a pesquisa rápida do SEI Pro (2.9) põe na linha do Controle que não casa com o texto, lida do fonte do
 * original: se ele trocar o nome, os testes que a usam falham.
 */
export function classeDaPesquisaRapida(): string {
  const m = /export const OCULTA = '([^']+)'/.exec(readFileSync(new URL('../../pesquisa-rapida/src/controle.ts', import.meta.url), 'utf8'));
  if (!m) throw new Error('pesquisa-rapida/src/controle.ts sem a constante OCULTA: o SEI Pro mudou a pesquisa rápida');
  return m[1];
}

let n = 0;
export async function teste(nome: string, fn: () => void | Promise<void>): Promise<void> {
  await fn();
  console.log(`OK ${++n}: ${nome}`);
}
export const total = () => n;
