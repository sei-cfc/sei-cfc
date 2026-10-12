# Ganchos Gelic no código do upstream

O SEI Pro Gelic vive em pastas próprias (`gelic/`, `skills-gelic/`, `docs/gelic/`, `scripts/gelic-*`).
Cada linha alterada **em arquivo do upstream** é um gancho e está registrada aqui, com o motivo e o
diff mínimo. Assim, num merge do upstream, todo conflito em fonte tem de estar nesta lista. Se não
estiver, é engano.

## Regras

1. **Arquivo gerado nunca se resolve à mão.** Os arquivos `dist/` com o cabeçalho
   `GERADO por <módulo>/build.mjs` ficam com a versão do upstream (`git checkout --theirs`) e são
   recompilados (`scripts/gelic-atualizar.sh --sem-merge`).
2. **Gancho é fio, não conteúdo.** No fonte do upstream entra só o import ou o parâmetro que liga o
   código da Gelic. A lógica fica em `gelic/src/`.
3. **Não editar:** o legado (`dist/js/sei-pro*.js`, `sei-functions-pro.js`, `init*.js`,
   `dist/html/options.*`) e o `dist/manifest.json`. O manifest da Gelic é gerado por
   `gelic/empacotar.ts`.
4. **Correção genérica vai como PR ao upstream** (remote `publico` = `ToNiauM/sei-pro`, branch
   próprio a partir de `upstream/master`), não como gancho.

## Ganchos ativos

Todos marcados no código com `GANCHO GELIC` (`git grep "GANCHO GELIC"` lista cada um). São 45 linhas
acrescentadas (e 1 alterada) em 7 arquivos do upstream, mais um arquivo novo no agente-ia, que não conflita.

### G1: abrir o Agente já com um pedido (botões do selo)

| Arquivo | O quê |
|---|---|
| `dist/background.js` (listener `abrirAgente`) | 4 linhas: se a mensagem traz `pedido`, grava `agenteIA_pedido = {texto, janela, t}` no `storage.session` |
| `agente-ia/src/painel/main.ts` (import + fim de `iniciar()`) | 8 linhas: `ouvirPedidosExternos(...)` põe o texto na caixa de mensagem e envia, se o agente não estiver ocupado |
| `agente-ia/src/painel/pedido-externo.ts` | **arquivo novo** (genérico, candidato a PR): valida (fresco, da janela do painel) e consome uma vez |

### G2: ferramentas, skills e contexto da Gelic no agente

| Arquivo | O quê |
|---|---|
| `agente-ia/src/tools/sei.ts` | import + `...TOOLS_GELIC` em `TOOLS_SEI` (ferramenta `gelic_etapa`, leitura) |
| `agente-ia/src/skills/index.ts` | import + `...SKILLS_GELIC` no fim de `SKILLS` (as 7 skills de `skills-gelic/`) |
| `agente-ia/src/motor/prompt.ts` | import + `${PROMPT_GELIC}` antes das instruções do usuário |

O conteúdo fica em `gelic/src/agente/`, já filtrado pelo perfil do pacote (`gelic/src/agente/perfil.ts`):
o bundle do agente é um só para o SEI Pro Gelic e o SEI Pro CFC, então `index.ts` lê o perfil do manifest
(`sei_pro_perfil`) ao carregar e exporta as listas do perfil; as três linhas do gancho não mudaram. No
perfil `cfc` o agente vê `gelic_etapa`, `gelic_calcular` e as peças do demandante (`cfc_modelo_analisar`,
`cfc_documento_gravar`, de `gelic/src/agente/cfc.ts`; a skill `cfc-documento`), nenhuma ferramenta nem skill
de análise da Gelic e o contexto do demandante; o pacote da Gelic não vê nada `cfc_*`/`cfc-*`. Os três
ganchos são os mesmos (as listas já chegam filtradas). O `cfc_modelo_analisar` usa o G3 (`ctx.completar`)
como o `gelic_modelo_analisar`. As skills e as regras chegam ao agente como TS gerado
(`npm run gerar`), porque o tsconfig e os loaders do agente-ia não importam `.md` nem `.json`.

### G3: uma chamada ao modelo, fora do ciclo do agente (DVI barato)

| Arquivo | O quê |
|---|---|
| `agente-ia/src/motor/tools.ts` (`ContextoTool`) | 2 linhas: `completar?(sistema, pedido, sinal)` |
| `agente-ia/src/motor/motor.ts` (opções e `contexto()`) | 4 linhas: a opção `completar` e o repasse ao contexto, com `anonimizar` na ida e `reidratar` na volta |
| `agente-ia/src/painel/main.ts` (`criarMotor` + método `completar`) | 17 linhas: uma chamada ao provedor configurado, sem ferramentas; o gasto soma no contador da conversa |

Para quê: a ferramenta de DVI manda os autos recortados ao modelo **uma vez**, sem as cerca de 40
ferramentas nem o histórico, e recebe só os achados. O pacote grande nunca entra na conversa
principal, então não é reenviado a cada rodada.

### G4: a página da extensão ao instalar, nenhuma aba ao atualizar

| Arquivo | O quê |
|---|---|
| `dist/background.js` (`handleInstalled`, depois dos dois `return` iniciais) | 3 linhas: com `gelic_site` no manifest, instalar abre essa página e atualizar não abre aba. Sem a chave, que é o caso do SEI Pro puro, nada muda |

Para quê: o legado abre o `seipro.app` ao instalar e o histórico de versões do SEI Pro a cada mudança de versão, o que
no nosso caso é cada revisão. O site das extensões entra no lugar (`https://sei-cfc.github.io/`, desenho
`2026-10-12-site-documentacao-design.md`). O `return` pula a marca `InstallOrUpdate`, que ninguém lê (conferido em
2026-10-12).

### Revisões sem gancho novo

A r10 (formulário das peças e roteiro da instrução no SEI Pro CFC) não criou gancho: a janela das peças
(`gelic/src/peca/`) é página da própria extensão e usa a ponte (`PontePainel`) e o provedor do agente como
bibliotecas, sem mudar uma linha deles.

A r11 (módulo do PCA) também não criou gancho. O fetch ao PCA sai do content script, com a origem do SEI, ou das
páginas da extensão: `pca.html`, a janela das peças e o painel do agente pelos ganchos `dadosDoPca` e
`GANCHOS_DVI.pca`, que ficam no código da Gelic.

A r17 (merge do SEI Pro 2.9) também não criou gancho. O único conflito foi o gerado `dist/js/agente/painel.js`:
ficou o do upstream, e o build recompilou com os ganchos. O `background.js` juntou sozinho a aba `demandas` do upstream
com o G1, que fica logo abaixo.

### Reaplicar depois de um merge

Se o upstream mexer nessas linhas e o merge conflitar, reaplique o gancho pelo diff desta tabela (os
pontos de ancoragem são o import de `./projetos` em `sei.ts`, o fim do objeto `SKILLS`, o fim do template
do `promptSistema`, o fim de `iniciar()` e o fim do listener `abrirAgente` no background e,
para o G4, o fim dos dois `return` iniciais de `handleInstalled`). Depois:
`scripts/gelic-atualizar.sh --sem-merge`. Os testes `gancho G1` e `gancho G2` do `gelic` (`npm run
verificar`) e o e2e conferem que os ganchos continuam ligados.

## Candidatos a PR no upstream

| Assunto | Onde | Situação |
|---|---|---|
| Teste do agente quebra no Node ≥ 21: `globalThis.navigator` é getter e a atribuição lança `TypeError` (usar `Object.defineProperty`) | `agente-ia/tests/verificar-diagnostico.ts:98` | encontrado em 2026-10-09 |
| Pedido externo ao agente (G1) como ponto de extensão genérico: `pedido-externo.ts` + 4 linhas no background | `agente-ia/src/painel/pedido-externo.ts` | pronto para PR |
| Página de instalação pelo manifest (G4): pacote com outro nome abre a própria página e não abre aba ao atualizar | `dist/background.js` | pronto para PR |
| `guardarFluxos` espelha os fluxos em `chrome.storage.sync`, contra o comentário "Nunca sincronizada" | `agente-ia/src/painel/espelho.ts:164`, `agente-ia/src/fluxos/modelo.ts:149` | a confirmar |
