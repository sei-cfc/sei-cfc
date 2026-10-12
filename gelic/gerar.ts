/**
 * Gera os módulos TS que o agente do SEI Pro importa (gancho G2), a partir das fontes em
 * texto:
 *   regras/etapas.json + regras/fatos-etapa.json → src/regras/dados.gerado.ts
 *   skills-gelic/*.md (sem o README)              → src/agente/skills.gerado.ts (gelic-* e, à parte, cfc-*)
 *   regras/modelos/*.md + variaveis.json + constantes.json + assinaturas.json
 *                                                 → src/modelos/dados.gerado.ts
 *   regras/dvi-montar/checklist-*.md + regras/modelos/assinaturas.json → src/dvi/montar/dados.gerado.ts
 *   regras/dvi/checklist-*.md + achados.md          → src/dvi/preparar/dados.gerado.ts
 *   regras/modelos-cfc/<m>/{<m>.md, constantes.json, formulario.json} + sequencia.json
 *                                                 → src/modelos/cfc.gerado.ts
 *
 * Por que gerar: o agente-ia não importa JSON nem .md (tsconfig e loaders dele são do upstream,
 * e mexer neles seria mais um gancho). TS puro entra no bundle sem configuração.
 * O teste confere que os gerados estão em dia com as fontes.
 *
 *   npx tsx gerar.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const caminho = (rel: string) => fileURLToPath(new URL(rel, import.meta.url));
const CABECALHO = '/* GERADO por gelic/gerar.ts a partir das fontes em texto. NAO EDITE: rode "npm run gerar". */\n';

export interface SkillGelic { descricao: string; texto: string }

/** Frontmatter `---\nname: ...\ndescription: ...\n---` + corpo. */
export function lerSkill(md: string, arquivo: string): [string, SkillGelic] {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(md.replace(/\r\n/g, '\n'));
  if (!m) throw new Error(`${arquivo}: sem frontmatter (---\\nname: ...\\ndescription: ...\\n---)`);
  const campo = (nome: string) => new RegExp(`^${nome}:\\s*(.+)$`, 'm').exec(m[1])?.[1].trim();
  const nome = campo('name');
  const descricao = campo('description');
  if (!nome || !/^[a-z][a-z0-9-]{2,63}$/.test(nome)) throw new Error(`${arquivo}: name ausente ou fora do padrão (minúsculas, números e hífen)`);
  if (`${nome}.md` !== arquivo) throw new Error(`${arquivo}: o name (${nome}) tem de ser o nome do arquivo`);
  if (!descricao) throw new Error(`${arquivo}: description ausente`);
  const texto = m[2].trim();
  if (texto.length > 40_000) throw new Error(`${arquivo}: ${texto.length} caracteres (o agente aceita até 40 000)`);
  return [nome, { descricao, texto }];
}

/** Modelos de documento (templates do preencher.py) e seus dados, como texto e JSON embutidos. */
function modelos(): string {
  const pasta = caminho('regras/modelos');
  const json = (a: string) => JSON.parse(readFileSync(`${pasta}/${a}`, 'utf8'));
  // read_text() do Python lê em modo universal ("\r\n" vira "\n"): o motor tem de ver o mesmo texto
  const md = Object.fromEntries(
    readdirSync(pasta).filter(a => a.endsWith('.md')).sort().map(a => [a.slice(0, -3), readFileSync(`${pasta}/${a}`, 'utf8').replace(/\r\n?/g, '\n')]),
  );
  if (!Object.keys(md).length) throw new Error('regras/modelos/ sem modelos .md (rode npm run regras)');
  return `${CABECALHO}export const MODELOS_MD: Readonly<Record<string, string>> = ${JSON.stringify(md, null, 1)};\n\n`
    + `export const VARIAVEIS_JSON: unknown = ${JSON.stringify(json('variaveis.json'), null, 1)};\n\n`
    + `export const CONSTANTES_JSON: unknown = ${JSON.stringify(json('constantes.json'), null, 1)};\n\n`
    + `export const ASSINATURAS_JSON: unknown = ${JSON.stringify(json('assinaturas.json'), null, 1)};\n`;
}

/**
 * Modelos do perfil CFC (cópias do app gera): texto do modelo, constantes e o formulário. O <m>.yaml do gera não é
 * lido aqui (sem dependência de YAML): o tests/paridade/gerar_modelos_cfc.py grava o formulario.json com as
 * perguntas já lidas pelo carregar_modelo do próprio gera, e a sequencia.json com a SEQUENCIA_DOCUMENTOS.
 */
function modelosCfc(): string {
  const pasta = caminho('regras/modelos-cfc');
  const ler = (a: string) => readFileSync(`${pasta}/${a}`, 'utf8').replace(/\r\n?/g, '\n');
  const ids = readdirSync(pasta, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort();
  if (!ids.length) throw new Error('regras/modelos-cfc/ sem modelos (rode npm run regras)');
  const modelosCfc = Object.fromEntries(ids.map(m => [m, {
    md: ler(`${m}/${m}.md`),
    constantes: JSON.parse(ler(`${m}/constantes.json`)),
    perguntas: JSON.parse(ler(`${m}/formulario.json`)),
  }]));
  const tipos = `export type TipoPerguntaCfc = 'texto' | 'texto_longo' | 'data' | 'escolha' | 'tabela_itens' | 'lista_pessoas' | 'somente_leitura';
/** Uma pergunta do <modelo>.yaml do gera (o dataclass Pergunta de apps/gera/documentos/modelos.py). */
export interface PerguntaCfc {
  id: string;
  texto: string;
  tipo: TipoPerguntaCfc;
  /** Só no tipo escolha. */
  opcoes: string[] | null;
  obrigatoria: boolean;
  /** Nota (i) explicativa ('' se não há). */
  nota: string;
  check_list_id: string | null;
  /** Chave do cadastro único da contratação de onde a resposta vem e para onde vai (null = só deste documento). */
  le_do_cadastro: string | null;
  /** "nao <var>" | "<var> in (v1, v2)" | null (sempre aparece). */
  quando_aparece: string | null;
}
export interface ModeloCfcDados { md: string; constantes: Readonly<Record<string, unknown>>; perguntas: readonly PerguntaCfc[] }
/** Um documento da sequência do demandante no gera (regras.py::SEQUENCIA_DOCUMENTOS); \`modelo\` = há modelo pronto. */
export interface DocumentoSequenciaCfc { chave: string; rotulo: string; nota: string; check_list_id: string | null; modelo: boolean }
`;
  return `${CABECALHO}${tipos}\nexport const MODELOS_CFC: Readonly<Record<string, ModeloCfcDados>> = ${JSON.stringify(modelosCfc, null, 1)} as Readonly<Record<string, ModeloCfcDados>>;\n\n`
    + `export const SEQUENCIA_CFC: readonly DocumentoSequenciaCfc[] = ${JSON.stringify(JSON.parse(ler('sequencia.json')), null, 1)};\n`;
}

/** Checklists da skill (séries e itens [I]/[R]) e o esquema do achados.json, para a preparação do DVI. */
function dvi(): string {
  const pasta = caminho('regras/dvi');
  // read_text() do Python lê em modo universal: o parser do checklist tem de ver o mesmo texto
  const md = (a: string) => readFileSync(`${pasta}/${a}`, 'utf8').replace(/\r\n?/g, '\n');
  const checklists = Object.fromEntries(['checklist-contratual.md', 'checklist-preparatoria.md'].map(a => [a, md(a)]));
  return `${CABECALHO}export const CHECKLISTS_MD: Readonly<Record<string, string>> = ${JSON.stringify(checklists, null, 1)};\n\n`
    + `export const ACHADOS_MD: string = ${JSON.stringify(md('achados.md'))};\n`;
}

/**
 * Montagem do DVI (src/dvi/montar/): graus [I]/[R] e itens dos checklists (cópias em regras/dvi-montar/, lidos como o
 * carregar_graus_checklist/carregar_checklist do gelic_lib.py) e os textos fixos do assinaturas.json da skill.
 */
function dviMontar(): string {
  const pasta = caminho('regras/dvi-montar');
  const graus: Record<string, string> = {};
  const checklists: Record<string, { series: Record<string, string>; itens: { id: string; serie: string; grau: string; texto: string }[] }> = {};
  for (const a of readdirSync(pasta).filter(x => /^checklist-.*\.md$/.test(x)).sort()) {
    const md = readFileSync(`${pasta}/${a}`, 'utf8').replace(/\r\n?/g, '\n');
    for (const m of md.matchAll(/\[([A-Z]\d{2})\]\s*\[([IR])\]/g)) {
      if (graus[m[1]] !== undefined && graus[m[1]] !== m[2]) throw new Error(`${a}: grau de ${m[1]} diverge entre checklists`);
      graus[m[1]] = m[2];
    }
    const series = Object.fromEntries([...md.matchAll(/^## ([A-Z]) — (.+?)\s*$/gm)].map(m => [m[1], m[2]]));
    const itens = [...md.matchAll(/^\|\s*\[([A-Z]\d{2})\]\s*\[([IR])\]\s*\|(.*)\|\s*[IR]\s*\|\s*$/gm)].map(m => ({
      id: m[1], serie: m[1][0], grau: m[2], texto: m[3].split('|').map(c => c.trim()).filter(Boolean).join(' — '),
    }));
    checklists[a] = { series, itens };
  }
  const ass = JSON.parse(readFileSync(caminho('regras/modelos/assinaturas.json'), 'utf8'));
  const fixos = { destino_padrao: ass.destino_padrao, observacoes: ass.observacoes, observacao_etp: ass.observacao_etp };
  return `${CABECALHO}export const GRAUS: Readonly<Record<string, 'I' | 'R'>> = ${JSON.stringify(graus)};\n\n`
    + `export const CHECKLISTS: Readonly<Record<string, { series: Record<string, string>; itens: { id: string; serie: string; grau: 'I' | 'R'; texto: string }[] }>> = ${JSON.stringify(checklists, null, 1)};\n\n`
    + `export const TEXTOS_FIXOS: { destino_padrao: string; observacoes: string[]; observacao_etp: string } = ${JSON.stringify(fixos, null, 1)};\n`;
}

export function conteudos(): { dados: string; skills: string; modelos: string; dvi: string; dviMontar: string; modelosCfc: string } {
  const etapas = JSON.parse(readFileSync(caminho('regras/etapas.json'), 'utf8'));
  const fatos = JSON.parse(readFileSync(caminho('regras/fatos-etapa.json'), 'utf8'));
  const dados = `${CABECALHO}export const ETAPAS_JSON: unknown = ${JSON.stringify(etapas, null, 1)};\n\nexport const FATOS_JSON: unknown = ${JSON.stringify(fatos, null, 1)};\n`;
  const pasta = caminho('../skills-gelic');
  const skills = Object.fromEntries(
    readdirSync(pasta).filter(a => a.endsWith('.md') && a !== 'README.md').sort().map(a => lerSkill(readFileSync(`${pasta}/${a}`, 'utf8'), a)),
  );
  // cfc-*.md são do perfil cfc (src/agente/perfil.ts): ficam fora das da Gelic, que seguem como sempre
  const doCfc = (slug: string) => slug.startsWith('cfc-');
  const tipo = 'Readonly<Record<string, { descricao: string; texto: string }>>';
  const lista = (cfc: boolean) => JSON.stringify(Object.fromEntries(Object.entries(skills).filter(([slug]) => doCfc(slug) === cfc)), null, 1);
  const ts = `${CABECALHO}export const SKILLS_GELIC: ${tipo} = ${lista(false)};\n\nexport const SKILLS_CFC: ${tipo} = ${lista(true)};\n`;
  return { dados, skills: ts, modelos: modelos(), dvi: dvi(), dviMontar: dviMontar(), modelosCfc: modelosCfc() };
}

export const SAIDAS = { dados: 'src/regras/dados.gerado.ts', skills: 'src/agente/skills.gerado.ts', modelos: 'src/modelos/dados.gerado.ts', dvi: 'src/dvi/preparar/dados.gerado.ts', dviMontar: 'src/dvi/montar/dados.gerado.ts', modelosCfc: 'src/modelos/cfc.gerado.ts' } as const;

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const c = conteudos();
  writeFileSync(caminho(SAIDAS.dados), c.dados);
  writeFileSync(caminho(SAIDAS.skills), c.skills);
  writeFileSync(caminho(SAIDAS.modelos), c.modelos);
  writeFileSync(caminho(SAIDAS.dvi), c.dvi);
  writeFileSync(caminho(SAIDAS.dviMontar), c.dviMontar);
  writeFileSync(caminho(SAIDAS.modelosCfc), c.modelosCfc);
  console.log(`Gerados ${SAIDAS.dados}, ${SAIDAS.skills} (${(c.skills.match(/^ "[a-z0-9-]+": \{$/gm) ?? []).length} skills), ${SAIDAS.modelos}, ${SAIDAS.dvi}, ${SAIDAS.dviMontar} e ${SAIDAS.modelosCfc}.`);
}
