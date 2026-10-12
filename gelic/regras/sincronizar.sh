#!/usr/bin/env bash
# Traz as regras do rito da skill gelic (fonte única) e regenera o gabarito de paridade.
#   GELIC_SKILL=~/.claude/skills/gelic gelic/regras/sincronizar.sh   (ou: npm run regras)
# Depois rode "npm run verificar": a paridade mostra se o motor TS ainda acompanha o etapa.py.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
SKILL="${GELIC_SKILL:-$HOME/.claude/skills/gelic}"
[[ -f "$SKILL/references/etapas.json" ]] || { echo "Skill gelic não encontrada em $SKILL (defina GELIC_SKILL)."; exit 2; }
cp "$SKILL/references/etapas.json" "$SKILL/references/fatos-etapa.json" "$AQUI/"
GELIC_SKILL="$SKILL" python3 "$AQUI/../tests/paridade/gerar.py"
VERSAO="$(git -C "$SKILL" log -1 --format='%h %ad' --date=short 2>/dev/null || echo 'sem git')"
printf '%s\n' "$VERSAO" > "$AQUI/ORIGEM"
echo "Regras sincronizadas da skill ($VERSAO). Rode: npm run verificar"
# Modelos de documento (templates do preencher.py, dicionário, constantes, assinaturas e exemplos) e o
# gabarito de paridade do motor de modelos (src/modelos/motor.ts). Os exemplos são dados inventados.
mkdir -p "$AQUI/modelos/exemplos"
rm -f "$AQUI/modelos/"*.md "$AQUI/modelos/"*.json "$AQUI/modelos/exemplos/"*.json
cp "$SKILL/templates/"*.md "$SKILL/templates/variaveis.json" "$SKILL/templates/constantes.json" "$SKILL/assets/assinaturas.json" "$AQUI/modelos/"
cp "$SKILL/templates/exemplos/"*.json "$AQUI/modelos/exemplos/"
GELIC_SKILL="$SKILL" python3 "$AQUI/../tests/paridade/gerar_modelos.py"
echo "Modelos sincronizados ($(ls "$AQUI/modelos/"*.md | wc -l) modelos). Rode: npm run verificar"
# Preparação do DVI (src/dvi/preparar/): checklists e achados.md copiados da skill, e o gabarito de paridade
# do porte do selecionar.py/checar.py/fatos.py/checklist (regras/dvi/paridade-preparar.json). Fixtures sintéticas.
mkdir -p "$AQUI/dvi"
cp "$SKILL/references/checklist-preparatoria.md" "$SKILL/references/checklist-contratual.md" "$SKILL/references/achados.md" "$AQUI/dvi/"
GELIC_SKILL="$SKILL" python3 "$AQUI/../tests/paridade/gerar_dvi_preparar.py"
echo "Preparação do DVI sincronizada. Rode: npx tsx -e \"import('./tests/dvi-preparar.ts').then(m=>m.verificarDviPreparar())\""
# Montagem do DVI (src/dvi/montar/): checklists copiados da skill (graus [I]/[R] e itens) e o gabarito de paridade
# do porte do avaliar.validar/render.py (regras/dvi-montar/paridade.json). Fixtures sintéticas, nunca autos reais.
mkdir -p "$AQUI/dvi-montar"
cp "$SKILL/references/checklist-preparatoria.md" "$SKILL/references/checklist-contratual.md" "$AQUI/dvi-montar/"
GELIC_SKILL="$SKILL" python3 "$AQUI/../tests/paridade/gerar_dvi_montar.py"
echo "Montagem do DVI sincronizada. Rode: npx tsx tests/dvi-montar.ts"
# Modelos do perfil CFC (peças do demandante). Desde 2026-10-10 o texto dos modelos e a sequência das peças são
# mantidos AQUI (regras/modelos-cfc/): o app "gera" do PCA vai ser descontinuado e o usuário mudou a sequência e alguns
# textos (despacho à Gelic, justificativa do mapa de preços abaixo da tabela). Do gera só se usa o MOTOR
# (motor/preencher.py), para regenerar o gabarito de paridade sobre as cópias daqui. Sem o gera nesta máquina, pula.
GERA="${GERA_APP:-$HOME/ativos/pca-cfc-gera/apps/gera}"
if [[ -f "$GERA/motor/preencher.py" ]]; then
  GERA_APP="$GERA" python3 "$AQUI/../tests/paridade/gerar_modelos_cfc.py"
  echo "Gabarito dos modelos do CFC regenerado com o motor do gera ($GERA). Rode: npm run gerar && npm run verificar"
else
  echo "Motor do gera não encontrado em $GERA (defina GERA_APP): gabarito dos modelos do CFC não regenerado."
fi
