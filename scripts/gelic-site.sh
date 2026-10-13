#!/usr/bin/env bash
# Site de documentação das extensões (docs/gelic/2026-10-12-site-documentacao-design.md).
#   scripts/gelic-site.sh             monta e confere (nada sai daqui)
#   scripts/gelic-site.sh --publicar  monta, confere e publica em sei-cfc/sei-cfc.github.io (o Pages publica sozinho)
# Só a pasta gelic/site/ sai do repositório privado.
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$RAIZ/gelic/site"
VENV="$RAIZ/build/.venv-site"
PUBLICO="$RAIZ/build/site-publico"
# Destino trocável só para testar a publicação contra um repositório local.
PUBLICO="${GELIC_SITE_PUBLICO:-$PUBLICO}"
REMOTO="${GELIC_SITE_REMOTO:-git@github.com:sei-cfc/sei-cfc.github.io.git}"

# Publica só o que está no commit: arquivo fora dele (rascunho, build manual) em gelic/site/ para a publicação.
if [[ "${1:-}" == "--publicar" ]]; then
  SUJO="$(git -C "$RAIZ" status --porcelain --ignored -- gelic/site)"
  [[ -z "$SUJO" ]] || { printf '%s\n' "$SUJO"; echo "gelic/site/ tem arquivos fora do commit: faça o commit ou tire-os antes de publicar."; exit 1; }
fi

[[ -x "$VENV/bin/mkdocs" ]] || { python3 -m venv "$VENV" && "$VENV/bin/pip" install -q -r "$SITE/requirements.txt"; }
# Sem -q: no modo silencioso o --strict não vê os avisos e deixa passar link quebrado (conferido em 2026-10-12).
LOG="$RAIZ/build/site-mkdocs.log"
if ! "$VENV/bin/mkdocs" build --strict -f "$SITE/mkdocs.yml" -d "$RAIZ/build/site-html" >"$LOG" 2>&1; then
  sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -v '│'
  echo "O site não montou (avisos acima)."
  exit 1
fi
# Com limite de memória onde há systemd do usuário (a máquina de trabalho); no GitHub Actions, sem ele.
limitar() { if systemd-run --user --scope -q true 2>/dev/null; then systemd-run --user --scope -q -p MemoryMax=1500M -p MemorySwapMax=0 "$@"; else "$@"; fi; }
SAIDA="$(cd "$RAIZ/gelic" && limitar timeout 180 npx tsx tests/site-rodar.ts)"
VERSAO="$(printf '%s\n' "$SAIDA" | sed -n 's/^versao=//p' | tail -1)"
[[ -n "$VERSAO" ]] || { printf '%s\n' "$SAIDA"; echo "As verificações do site não terminaram."; exit 1; }
echo "Site da versão $VERSAO montado em build/site-html/ e conferido."
[[ "${1:-}" == "--publicar" ]] || exit 0

# O repositório público é espelho: parte sempre do main de lá (vazio na primeira vez) e publica no main.
[[ -d "$PUBLICO/.git" ]] || git clone -q "$REMOTO" "$PUBLICO"
git -C "$PUBLICO" fetch -q origin
git -C "$PUBLICO" checkout -q -B main
git -C "$PUBLICO" reset -q --hard origin/main 2>/dev/null || true
rsync -a --delete --exclude .git "$SITE/" "$PUBLICO/"
if [[ -z "$(git -C "$PUBLICO" status --porcelain)" ]]; then echo "Nada novo para publicar."; exit 0; fi
git -C "$PUBLICO" add -A
git -C "$PUBLICO" commit -q -m "Versão $VERSAO"
git -C "$PUBLICO" push -q origin main
echo "Publicado: https://sei-cfc.github.io/ (o GitHub Pages leva um ou dois minutos)."
