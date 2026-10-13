/**
 * Manifest do SEI CFC Gelic, derivado do `dist/manifest.json` do upstream.
 *
 * O fork não edita o manifest do upstream (muda a cada versão e geraria
 * conflito em todo merge): o empacotamento lê o dele e aplica só isto.
 *
 * `short_name` fica como está: o legado lê dele o NAMESPACE_SPRO e compara com
 * 'SEI Pro Lab' para ligar as funcionalidades do Lab (sei-functions-pro.js,
 * sei-pro.js, sei-pro-arvore.js, sei-pro-all.js). Trocá-lo desliga o Lab.
 *
 * Dois perfis (src/perfil.ts), cada um um pacote: gelic (o manifest de sempre, sem chave de perfil)
 * e cfc (nome, descrição, ícones em icons/cfc/ e a chave `sei_pro_perfil: "cfc"`, que o Chrome
 * aceita com um aviso de chave desconhecida e devolve em runtime.getManifest()). Os dois perfis levam `gelic_site`, a
 * página do perfil no site das extensões (src/site.ts), que o gancho G4 abre ao instalar.
 */
import { CHAVE_PERFIL, type Perfil } from '../perfil';
import { CHAVE_SITE, paginaDoPerfil } from '../site';

export interface DadosPerfil {
  nome: string;
  descricao: string;
  /** Rótulo no version_name: "2.7 Gelic r8". */
  rotulo: string;
  /** Logo da marca do selo da árvore (desenhada pela página do SEI, então precisa ser acessível). */
  logoSelo: string;
}
export const PERFIS_MANIFESTO: Readonly<Record<Perfil, DadosPerfil>> = {
  gelic: {
    nome: 'SEI CFC Gelic',
    descricao: 'Licitação do CFC (Gelic): análise de processos, etapa da contratação e documentos com IA no SEI. Derivado do SEI Pro.',
    rotulo: 'Gelic',
    logoSelo: 'icons/gelic/logo-pequeno.svg',
  },
  cfc: {
    nome: 'SEI CFC',
    descricao: 'Para as áreas do CFC que instruem contratações: etapa do processo e peças do demandante no SEI. Derivado do SEI Pro.',
    rotulo: 'CFC',
    logoSelo: 'icons/cfc/logo-pequeno.png',
  },
};

export const NOME = PERFIS_MANIFESTO.gelic.nome;
export const SCRIPT = 'js/gelic/init_gelic.js';
/** Janela do formulário das peças do CFC (src/peca/peca.html, copiada por build.mjs). */
export const PAGINA_PECA = 'js/gelic/peca.html';
/** Configuração do PCA (src/pca/pca.html), aberta pelo selo nos dois perfis. */
export const PAGINA_PCA = 'js/gelic/pca.html';
/** Janela da verificação prévia do CFC (src/verificacao/verificar.html, copiada por build.mjs). */
export const PAGINA_VERIFICAR = 'js/gelic/verificar.html';
/** Página "Configurar a IA" do CFC (src/ia/configurar-ia.html, copiada por build.mjs). */
export const PAGINA_IA = 'js/gelic/configurar-ia.html';
export const TAMANHOS = ['16', '32', '48', '128'] as const;
export const icone = (tamanho: string, perfil: Perfil = 'gelic') => `icons/${perfil}/icon-${tamanho}.png`;
export const LOGO_SELO = PERFIS_MANIFESTO.gelic.logoSelo;
/**
 * As duas extensões rodam só no SEI do CFC (decisão de 2026-10-10): os padrões do upstream para qualquer `*.br` e
 * `*.org` viram estes hosts, e os de outros órgãos saem. Sem esquema fixo (`*://`): o padrão casa com qualquer porta,
 * e o e2e serve o SEI de mentira em http://sei.cfc.org.br:<porta>.
 */
export const HOSTS_CFC = ['sei.cfc.org.br', 'sip.cfc.org.br'] as const;
const HOSTS_GENERICOS = new Set(['*.br', '*.org']);
/** A janela das peças só abre a partir das telas do SEI (não do SIP), e nenhum outro site a embute. */
export const MATCHES_PECA = ['*://sei.cfc.org.br/*'] as const;
/** Content script do SEI CFC nas telas do PCA (src/pca-site/): o botão "Iniciar processo" na ficha do item. */
export const SCRIPT_PCA_SITE = 'js/gelic/pca_site.js';
/** Só o PCA de produção, em https (o padrão de host casa com qualquer porta: o e2e usa a dele). */
export const MATCHES_PCA_SITE = ['https://pca.sistemascfc.org/*'] as const;

/** `*://*.br/sei/*` → os mesmos caminhos em sei.cfc.org.br e sip.cfc.org.br; padrão de outro órgão → nada. */
export function paraOCfc(padroes: readonly string[]): string[] {
  const saida = padroes.flatMap(p => {
    const m = /^([^:]+):\/\/([^/]+)(\/.*)$/.exec(p);
    if (!m || !HOSTS_GENERICOS.has(m[2])) return [];
    return HOSTS_CFC.map(h => `${m[1]}://${h}${m[3]}`);
  });
  return [...new Set(saida)];
}

/** Pasta do pacote em build/ (pastas diferentes = extensões sem empacotar com IDs diferentes). */
export const pastaDoPacote = (perfil: Perfil) => `sei-pro-${perfil}`;

/** Entrada do upstream cujas telas (matches/exclude_matches) a Gelic copia. */
const MODELO = 'js/init_anotacoes_controle.js';
/** Recurso que identifica a lista de web_accessible_resources do legado. */
const ICONE_LAB = 'icons/lab/icon-32.png';

interface ContentScript {
  js?: string[];
  css?: string[];
  matches: string[];
  exclude_matches?: string[];
  all_frames?: boolean;
  run_at?: string;
}

interface RecursosAcessiveis {
  resources: string[];
  matches: string[];
  exclude_matches?: string[];
}

export interface Manifesto {
  name: string;
  short_name?: string;
  description?: string;
  version: string;
  version_name?: string;
  icons?: Record<string, string>;
  action?: { default_title?: string; [k: string]: unknown };
  content_scripts?: ContentScript[];
  web_accessible_resources?: RecursosAcessiveis[];
  [k: string]: unknown;
}

/** "2.7" + revisão 1 → "2.7.0.1". O Chrome aceita até quatro números. */
export function versaoGelic(upstream: string, revisao: number): string {
  if (!/^\d+(\.\d+){0,2}$/.test(upstream)) throw new Error(`Versão do upstream fora do formato esperado (até 3 números): "${upstream}"`);
  if (!Number.isInteger(revisao) || revisao < 1 || revisao > 65535) throw new Error(`Revisão Gelic inválida: ${revisao}`);
  const partes = upstream.split('.');
  while (partes.length < 3) partes.push('0');
  return [...partes, String(revisao)].join('.');
}

export function manifestoGelic(upstream: Manifesto, revisao: number, perfil: Perfil = 'gelic'): Manifesto {
  const dados = PERFIS_MANIFESTO[perfil];
  if (!dados) throw new Error(`Perfil desconhecido: "${perfil}" (use gelic ou cfc)`);
  const m: Manifesto = structuredClone(upstream);
  const scripts = m.content_scripts ?? [];
  if (scripts.some(c => c.js?.includes(SCRIPT))) throw new Error('O manifest de origem já tem o script da Gelic: empacote a partir do dist/ do upstream.');
  const modelo = scripts.find(c => c.js?.includes(MODELO));
  if (!modelo) throw new Error(`Entrada ${MODELO} não encontrada no manifest do upstream: revise a escolha das telas em manifesto.ts.`);
  const recursos = m.web_accessible_resources?.find(r => r.resources.includes(ICONE_LAB));
  if (!recursos) throw new Error(`Recurso ${ICONE_LAB} não encontrado em web_accessible_resources: revise manifesto.ts.`);

  m.name = dados.nome;
  m.description = dados.descricao;
  m.version = versaoGelic(upstream.version, revisao);
  m.version_name = `${upstream.version} ${dados.rotulo} r${revisao}`;
  m.icons = Object.fromEntries(TAMANHOS.map(t => [t, icone(t, perfil)]));
  m.action = { ...(m.action ?? {}), default_title: dados.nome };
  m.content_scripts = [...scripts, {
    js: [SCRIPT],
    matches: [...modelo.matches],
    ...(modelo.exclude_matches ? { exclude_matches: [...modelo.exclude_matches] } : {}),
    all_frames: true,
    run_at: 'document_idle',
  }];
  // O legado põe manifest.icons na sessionStorage e usa o ícone no mundo da página.
  for (const c of [...TAMANHOS.map(t => icone(t, perfil)), dados.logoSelo]) if (!recursos.resources.includes(c)) recursos.resources.push(c);
  // Só no SEI do CFC: telas do legado e da Gelic, e os recursos que as páginas enxergam.
  m.content_scripts = m.content_scripts.flatMap(c => {
    const matches = paraOCfc(c.matches);
    if (!matches.length) return [];
    const exclude = paraOCfc(c.exclude_matches ?? []);
    const { exclude_matches: _, ...resto } = c;
    return [{ ...resto, matches, ...(exclude.length ? { exclude_matches: exclude } : {}) }];
  });
  for (const r of m.web_accessible_resources ?? []) r.matches = paraOCfc(r.matches);
  // Páginas da extensão abertas pelo selo, numa entrada própria (só o SEI, não o SIP; nenhum outro site as embute): a
  // janela das peças (só no pacote do CFC) e a configuração do PCA (nos dois).
  m.web_accessible_resources!.push({ resources: perfil === 'cfc' ? [PAGINA_PECA, PAGINA_VERIFICAR, PAGINA_IA, PAGINA_PCA] : [PAGINA_PCA], matches: [...MATCHES_PECA] });
  // SEI CFC também no PCA: o botão "Iniciar processo" na ficha do item, e a configuração do PCA que o clique sem
  // configuração abre. Entra depois do filtro paraOCfc (que tiraria qualquer host fora do SEI do CFC).
  if (perfil === 'cfc') {
    m.content_scripts.push({ js: [SCRIPT_PCA_SITE], matches: [...MATCHES_PCA_SITE], run_at: 'document_idle' });
    m.web_accessible_resources!.push({ resources: [PAGINA_PCA], matches: [...MATCHES_PCA_SITE] });
  }
  // O da Gelic fica sem a chave (manifest idêntico ao de antes dos perfis): sem ela, perfilAtual() é gelic.
  if (perfil !== 'gelic') m[CHAVE_PERFIL] = perfil;
  // Página do perfil no site das extensões: o gancho G4 (dist/background.js) a abre ao instalar, no lugar do seipro.app.
  m[CHAVE_SITE] = paginaDoPerfil(perfil);
  return m;
}
