<img src="icones/logo.svg" width="96" alt="Logo do SEI Pro Gelic: carimbo azul-petróleo com um G cuja barra vira um visto verde">

# gelic

Camada da Licitação do CFC (Gelic) sobre o SEI Pro. É uma ferramenta interna: a IA trabalha no
processo aberto, mostra a etapa da contratação e redige DVI, despachos e minutas dentro do SEI. Plano
e decisões: [`docs/gelic/2026-10-09-diagnostico-e-plano.md`](../docs/gelic/2026-10-09-diagnostico-e-plano.md).

## Duas extensões, um código (perfis)

| Perfil | Extensão | Para quem | Selo da árvore | Agente |
|---|---|---|---|---|
| `gelic` | **SEI Pro Gelic** | equipe da Gelic (análise) | Analisar, Pendências, Gerar documento (23 peças), Próximo passo; etapas no Controle de Processos | tudo: `gelic_dvi_*`, `gelic_pendencias`, `gelic_modelo_*`, as 8 skills `gelic-*`, contexto da Gelic |
| `cfc` | **SEI Pro CFC** | áreas do CFC que instruem o processo (DFD, ETP, mapa de riscos, TR, pesquisa e mapa de preços) | Gerar documento (grupo "Peças do demandante": DFD, termos de cientificação, mapa comparativo de preços, TR e memorando de envio ao Delic, pelos modelos do app "gera"; ETP e mapa de riscos aparecem sem modelo) e Próximo passo | `gelic_etapa`, `gelic_calcular`, `cfc_modelo_analisar` e `cfc_documento_gravar`; a skill `cfc-documento` (nenhuma `gelic-*`); contexto do demandante |

O perfil vai no manifest do pacote (`"sei_pro_perfil": "cfc"`; o da Gelic não tem a chave e é o mesmo de
antes dos perfis). O Chrome aceita a chave desconhecida (no máximo um aviso em `chrome://extensions`) e a
devolve em `chrome.runtime.getManifest()`; `src/perfil.ts` (`perfilAtual()`) a lê em tempo de execução,
porque o bundle do agente e o da Gelic são os mesmos nos dois pacotes. O que muda por perfil: botões
(`BOTOES_DO_PERFIL` em `src/pagina/acoes.ts`), catálogo (`CATALOGOS` em `src/documentos/catalogo.ts`),
ferramentas, skills e prompt do agente (`src/agente/perfil.ts`) e nome, descrição e ícones
(`PERFIS_MANIFESTO` em `src/empacotamento/manifesto.ts`).

As duas instalam lado a lado: nomes diferentes e, sem empacotar, o Chrome dá o ID pela **pasta**, então
cada uma tem de ser carregada da sua (`build/sei-pro-gelic/` e `build/sei-pro-cfc/`; não copie uma por
cima da outra). Cada usuário instala uma só: as duas juntas no mesmo perfil do Chrome rodam o SEI Pro duas
vezes na página.

## Como a extensão é montada

```
dist/                (SEI Pro do upstream; a Gelic não escreve aqui)
  + gelic/saida/     (bundle da Gelic, gerado por build.mjs; o mesmo nos dois perfis)
  + ícones do perfil (gelic: icones/*.png, de desenhar.py + rasterizar.mjs → icons/gelic/;
                      cfc: icones/cfc/*.png, de icones/cfc.py → icons/cfc/)
  + manifest derivado (src/empacotamento/manifesto.ts)
  = build/sei-pro-gelic/  ou  build/sei-pro-cfc/   ← carregar no Chrome
```

O manifest muda só `name`, `description`, `version`/`version_name` (`<upstream>.<revisão>`, revisão
em `versao.json`), `icons`, `action.default_title`, uma entrada de `content_scripts` (mesmas telas do
`anotacoes-controle`) e os ícones em `web_accessible_resources`. O `short_name` fica `SEI Pro Lab`:
o legado compara esse nome para ligar as funcionalidades do Lab.

## Comandos

```bash
npm install
npm run verificar   # testes (tsx + node:assert, sem framework, como os demais módulos)
npm run tipos       # tsc --noEmit
npm run build       # testes + bundle + empacotar → build/sei-pro-gelic/ e build/sei-pro-cfc/
npm run zip         # SEI Pro Gelic: build/sei-pro-gelic-<versão>.zip para distribuir à equipe
npm run zip:cfc     # SEI Pro CFC: build/sei-pro-cfc-<versão>.zip (= tsx empacotar.ts --perfil cfc --zip)
npm run zip:todos   # os dois zips
npm run e2e         # Chromium headless + SEI de mentira: injeção, namespace do Lab, versão, ícones, selo e agente
npm run e2e:cfc     # o mesmo com o pacote SEI Pro CFC (GELIC_PERFIL=cfc); e2e:todos roda os dois
npm run regras      # sincroniza as regras com a skill gelic e regenera o gabarito de paridade
```

Para trazer uma versão nova do SEI Pro: `scripts/gelic-atualizar.sh` na raiz. Ganchos no código do
upstream: [`docs/gelic/GANCHOS.md`](../docs/gelic/GANCHOS.md).

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `src/regras/` | motor de etapas (porte do `etapa.py` da skill gelic, função pura), rótulos curtos e o resumo em palavras (usado pelo selo e, na 1B, pelo agente) |
| `regras/` | `etapas.json`/`fatos-etapa.json` copiados da skill (fonte única), gabarito `paridade.json` e `sincronizar.sh` — ver `regras/LEIA.md` |
| `src/pagina/` | content script: marca `<html data-gelic="rN">` e, no quadro da árvore (`procedimento_visualizar`), desenha o selo da etapa (`selo.ts`, `selo.css`). Só leitura |
| `src/empacotamento/` | derivação do manifest (função pura, testada contra o `dist/manifest.json` real) |
| `icones/` | logo (`logo.svg`; `logo-pequeno.svg` para 16 e 32 px), desenhada por `desenhar.py` e rasterizada nos ícones por `rasterizar.mjs` (Chromium). Carimbo de borda recortada em azul-petróleo, com um G cuja barra vira o visto verde do SEI Pro. `icones/cfc/`: ícones do SEI Pro CFC, gerados por `cfc.py` (Pillow) do símbolo do CFC (`pca-cfc/core/static/img/simbolo-cfc.png`) |
| `src/perfil.ts` | `perfilAtual()`: `gelic` ou `cfc`, pela chave `sei_pro_perfil` do manifest (sem ela, `gelic`) |
| `src/controle/` | etapas no Controle de Processos: etiqueta por linha, barra com "Calcular etapas" (sob demanda, 3 por vez, nunca sigiloso) e filtro por etapa; cache `gelic_etapas` alimentado também pelo selo |
| `src/documentos/` | catálogo dos 23 documentos (seletor "Gerar documento") |
| `src/modelos/` | motor de modelos (porte do `preencher.py`/`calculos.py`, paridade em `regras/modelos-paridade.json`); `fontes.ts` (peças-fonte de cada modelo e recorte) e `analise.ts` (pré-preenchimento pela árvore e pelas contas, pedido único ao modelo e validação) do `gelic_modelo_analisar`; `cfc.ts` (modelos do "gera", paridade em `regras/modelos-cfc-paridade.json`) e `analise-cfc.ts` (a mesma receita para o `cfc_modelo_analisar`: usuário, PCA pelo gancho `dadosDoPca` (`GANCHOS_CFC` em `src/agente/cfc.ts`, vazio até a API do PCA existir), tela e árvore; as peças anteriores na mesma chamada) |
| `src/agente/` | o que o agente importa pelo gancho G2: `gelic_etapa`, contexto da Gelic no prompt e as skills geradas de `skills-gelic/`; `cfc.ts`, as ferramentas do perfil cfc (`cfc_modelo_analisar`, `cfc_documento_gravar`) |
| `src/pagina/acoes.ts` | botões do selo: Analisar e Pendências abrem o agente com o pedido (gancho G1); Próximo passo abre o detalhe do selo, sem IA |
| `gerar.ts` | gera `src/regras/dados.gerado.ts` e `src/agente/skills.gerado.ts` (`npm run gerar`; o build já roda) |
| `tests/` | `verificar.ts` (unidade) e `e2e/` (Chromium headless contra `sei.teste.gov.br` → 127.0.0.1) |

Prefixos para não colidir com o SEI Pro: storage `gelic_*`, CSS `.gelic-*`, DOM `data-gelic*`.
