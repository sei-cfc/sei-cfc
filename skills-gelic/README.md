# skills-gelic

Skills da Gelic (Gerência de Licitações e Contratos do CFC) para o Agente de IA do SEI Pro. São
instruções em Markdown, em pt-BR, que o agente carrega com `skill_ler` quando o pedido é daquele
assunto (ou quando a barra de ações Gelic abre o agente com a skill certa).

## As skills

| Skill | Faz | Escreve no SEI? |
|---|---|---|
| `gelic-analisar-processo` | `gelic_dvi_analisar {pedido: "analise"}`: a extensão lê e recorta os autos, calcula etapa, check-list e checagens em código e faz uma chamada única ao modelo; achados [I]/[R] no chat | não |
| `gelic-verificar-pendencias` | `gelic_pendencias`: check-list mecânico sem IA (presença, assinatura, cronologia, processo, citados, valores, validades) atende / não atende / a conferir | não |
| `gelic-gerar-dvi` | `gelic_dvi_analisar` → resumo e "ok" → `gelic_dvi_gravar` (formato pela regra, corpo montado em código, cartão de aprovação, não assina) | sim, com aprovação |
| `gelic-proxima-etapa` | explica a etapa em linguagem simples, os documentos que a decidiram e o próximo passo; oferece as ações | não |
| `gelic-rito` | referência: etapas em ordem, títulos que o rito reconhece, famílias, regra do formato, limites da análise | — |
| `gelic-checklist-preparatoria` | referência: séries A F T R P K M J com id e grau | — |
| `gelic-checklist-contratual` | referência: séries G B C D E com id e grau | — |

As skills são provider-agnósticas (Claude, GPT e outros via OpenRouter): instruções imperativas, sem
recurso de um modelo só.

## Como entram na extensão

São embutidas no bundle do agente no build (registro `SKILLS_EXTRAS`, gancho G2 —
`docs/gelic/2026-10-09-diagnostico-e-plano.md`). Cada arquivo `.md` vira uma skill; o `name:` do
cabeçalho é o nome e o `description:` é a linha que o modelo vê no catálogo. Este README fica de fora.

## Fonte das regras e sincronização

A fonte das regras é a skill `gelic` do Claude Code (`~/.claude/skills/gelic/`). Estas skills são uma
adaptação dela para o agente do navegador, que não tem shell, scripts nem arquivos: lê e escreve o SEI
só pelas ferramentas do agente. Mudou a regra na skill `gelic`? Atualize aqui o arquivo correspondente:

| Arquivo daqui | Derivado de (na skill `gelic`) |
|---|---|
| `gelic-rito.md` | `references/etapas.json` (tipos, ordem e descrição das etapas, `modelos`), `SKILL.md` ("O que os scripts decidem", "Regras que continuam suas"), `MANUAL.md` (FORMATO, TIPO), `references/legislacao.md` (hierarquia de fontes) |
| `gelic-checklist-preparatoria.md` | `references/checklist-preparatoria.md` (quase literal; referências a scripts removidas) |
| `gelic-checklist-contratual.md` | `references/checklist-contratual.md` (quase literal); tabela "Séries por pedido" de `references/achados.md` e `MANUAL.md` |
| `gelic-analisar-processo.md` | `SKILL.md` (passos 1 a 3), `references/achados.md` (regras de redação, status), `MANUAL.md` ("O que o agente lê") |
| `gelic-verificar-pendencias.md` | `SKILL.md` (tabela fato → id), `MANUAL.md` (`_checagens.md`), `scripts/selecionar.py` (padrões de título), checklists |
| `gelic-gerar-dvi.md` | `scripts/render.py` (formato e texto fixo do DVI, devolução e Gecont), `assets/assinaturas.json` (destinos e observações), `references/achados.md`, `templates/despacho-gecont-reserva.md` |
| `gelic-proxima-etapa.md` | `references/etapas.json` (`documento`: template, ação ou opções), `MANUAL.md` (ETAPA DO PROCESSO) |

Pontos de atenção na sincronização:

- **`etapas.json`** tem cópia própria em `gelic/regras/` (usada pela ferramenta `gelic_etapa`), com
  teste de paridade. Etapa nova ou renomeada exige atualizar também a tabela do `gelic-rito.md`.
- **Checklists**: id novo, grau alterado ou item na tabela "Um fato, um id" → copie para o checklist
  daqui; se o item for mecânico (presença, assinatura, cronologia, valores), acrescente a linha em
  `gelic-verificar-pendencias.md`.
- **Texto fixo** do DVI, da devolução e do despacho à Gecont (frases de abertura e fecho,
  observações padrão, destinos) → `gelic-gerar-dvi.md`.
- Nunca copie para cá conteúdo de `processos/` ou `gelic-workspace/` da skill: são autos reais.

O que ficou de fora de propósito: os scripts (`preparar`, `calc`, validador, `render`), o
`achados.json`, o check-list em HTML, o comparativo `--compare` e os documentos por modelo (termos,
contratos, aviso, autorização, despacho à Projur). O DVI determinístico pelo `render` da skill é a
Fase 5 do plano; os modelos, a Fase 2.

## gelic-documento-modelo

Documentos que saem de modelo (autorização, aviso de dispensa, contratos, editais e ata AGU, aditivos, apostilamento, extinção, despachos à Projur e de PAR, e o texto do despacho à Gecont). O agente só preenche as variáveis com evidência; o motor em `gelic/src/modelos/` (porte do `preencher.py`, paridade em `gelic/regras/modelos-paridade.json`) monta o texto, e `gelic_documento_gravar` grava sem a IA reescrever o HTML. Fonte: `SKILL.md` ("Documento por modelo"), `templates/`, `templates/variaveis.json`.

## cfc-documento (só no SEI Pro CFC)

Peças do demandante pelos modelos do app "gera" do PCA (DFD, termos de cientificação, mapa comparativo de preços, despacho de envio à Gerência de Licitações; o TR fica no motor pela paridade, mas é feito no Compras.gov.br): `cfc_modelo_analisar` → folha e "ok" → `cfc_documento_gravar`. Os arquivos `cfc-*.md` entram só no perfil `cfc` (`gelic/gerar.ts` os separa em `SKILLS_CFC`); a Gelic não os vê, e o CFC não vê as `gelic-*`. Fonte dos modelos: `gelic/regras/modelos-cfc/`, mantidos aqui desde 2026-10-10 (do gera só o motor, para o gabarito `gelic/regras/modelos-cfc-paridade.json`).
