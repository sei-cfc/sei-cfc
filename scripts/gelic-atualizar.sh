#!/usr/bin/env bash
# Traz a versão nova do SEI Pro (upstream) para o SEI CFC Gelic e remonta as duas extensões
# (perfis gelic e cfc, ver gelic/README.md): pastas build/sei-pro-gelic/ e build/sei-pro-cfc/ e os zips.
#
#   scripts/gelic-atualizar.sh            merge de upstream/master no branch atual + build + empacotar
#   scripts/gelic-atualizar.sh --sem-merge  só reconstrói (depois de resolver um conflito, por exemplo)
#
# Regra de conflito (docs/gelic/GANCHOS.md): arquivo GERADO no dist/ nunca se resolve à mão —
# fica o do upstream e o build recompila com os ganchos Gelic.
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ"

if [[ "${1:-}" != "--sem-merge" ]]; then
  [[ -z "$(git status --porcelain --untracked-files=no)" ]] || { echo "Há alterações não commitadas. Commite ou guarde antes de atualizar."; exit 1; }
  git fetch upstream
  if ! git merge --no-edit upstream/master; then
    echo
    echo "Conflitos:"; git diff --name-only --diff-filter=U
    echo
    echo "Arquivos gerados em conflito (dist/js/agente, init_*.js...): git checkout --theirs <arquivo>"
    echo "Fontes em conflito: só podem ser os ganchos de docs/gelic/GANCHOS.md — reaplique o gancho."
    echo "Depois: git add, git commit e rode de novo com --sem-merge."
    exit 1
  fi
fi

# Ordem dos módulos: as bibliotecas primeiro (são importadas pelo fonte), depois quem gera o dist/.
for m in sei-comum sei-nucleo ferramentas-pdf projetos agente-ia favoritos historico anotacoes-controle gelic; do
  [[ -f "$m/package.json" ]] || continue
  echo "== $m: npm install"
  (cd "$m" && npm install --no-audit --no-fund --loglevel=error)
done
# Node >= 21 tem um `navigator` global somente leitura e um teste do agente o sobrescreve
# (agente-ia/tests/verificar-diagnostico.ts; candidato a PR, ver docs/gelic/GANCHOS.md).
if (( $(node -p 'process.versions.node.split(".")[0]') >= 21 )); then
  export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--no-experimental-global-navigator"
fi
for m in ferramentas-pdf projetos agente-ia favoritos historico anotacoes-controle; do
  [[ -f "$m/build.mjs" ]] || continue
  echo "== $m: build (testes + bundle)"
  (cd "$m" && npm run -s build)
done
echo "== gelic: testes, build e empacotamento (SEI CFC Gelic e SEI CFC)"
(cd gelic && npm run -s build && npm run -s zip:todos)

echo
echo "Pronto. Carregue build/sei-pro-gelic/ (SEI CFC Gelic) ou build/sei-pro-cfc/ (SEI CFC) em"
echo "chrome://extensions (Carregar sem compactação), ou recarregue a extensão. Zips em build/sei-pro-<perfil>-<versão>.zip."
git status --short dist | head -20
