/**
 * Endereço do site de documentação das extensões (desenho docs/gelic/2026-10-12-site-documentacao-design.md), num lugar
 * só: o empacotamento grava a página do perfil no manifest (`gelic_site`, que o gancho G4 abre ao instalar), o selo usa
 * para "Novidades" e "Ajuda", e os testes do site conferem que as páginas existem.
 */
import type { Perfil } from './perfil';

export const SITE = 'https://sei-cfc.github.io';
/** Chave do manifest com a página do perfil (lida pelo gancho G4 no background). */
export const CHAVE_SITE = 'gelic_site';
/** Página de cada perfil no site: o MkDocs publica docs/<nome>.md em /<nome>/. */
export const PAGINAS: Readonly<Record<Perfil, string>> = { gelic: 'sei-cfc-gelic', cfc: 'sei-cfc' };

export const paginaDoPerfil = (perfil: Perfil): string => `${SITE}/${PAGINAS[perfil]}/`;
/** Âncora da entrada de uma versão em Novidades: 2.9.0.18 → v2-9-0-18 (o título leva `{#v2-9-0-18}`). */
export const ancoraDaVersao = (versao: string): string => `v${versao.replaceAll('.', '-')}`;
export const urlNovidades = (versao: string): string => `${SITE}/novidades/#${ancoraDaVersao(versao)}`;
