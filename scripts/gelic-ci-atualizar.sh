#!/usr/bin/env bash
# Atualização automática do SEI Pro original, parte 1: construir (workflow .github/workflows/atualizar-upstream.yml;
# decisão do usuário de 2026-10-12, ver docs/gelic/ATUALIZACAO.md). Roda também à mão, no repositório local.
#
#   scripts/gelic-ci-atualizar.sh   merge da última versão publicada (tag) do SEI Pro + revisão + Novidades + testes +
#                                   e2e + conferência do site e do código público + commit; o pacote para publicar fica
#                                   em build/ci-saida/ (scripts/gelic-ci-publicar.sh). Nada sai daqui.
#
# Este script roda o código do upstream (npm install, builds, testes): no workflow, num job SEM segredo e só com leitura.
# Conflito: arquivo com o cabeçalho "GERADO por" fica o do upstream e o build recompila (GANCHOS.md, regra 1);
# conflito em qualquer outro arquivo para tudo, porque precisa de alguém.
# Saída: 0 = pacote pronto ou nada novo (build/ci-saida/estado diz qual); 2 = conflito em fonte; outro = falha.
# Em qualquer falha depois do merge, o repositório volta ao commit de antes (a árvore estava limpa no começo).
# O resumo vai em build/ci-resultado.txt (o workflow o põe na issue).
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ"
mkdir -p build
RES="$RAIZ/build/ci-resultado.txt"
SAIDA="$RAIZ/build/ci-saida"
: >"$RES"
rm -rf "$SAIDA" && mkdir -p "$SAIDA"

[[ -z "$(git status --porcelain --untracked-files=no)" ]] || { echo "Há alterações não commitadas." | tee "$RES"; exit 1; }
INICIO="$(git rev-parse HEAD)"
MEXEU=0
voltar() {
  local rc=$?
  if (( rc != 0 && MEXEU )); then
    git merge --abort 2>/dev/null || true
    git reset -q --hard "$INICIO"
    echo "(o repositório voltou a ${INICIO:0:8}, como estava antes)" | tee -a "$RES"
  fi
}
trap voltar EXIT

git remote get-url upstream >/dev/null 2>&1 || git remote add upstream https://github.com/SEI-Pro/sei-pro.git
# Só versão publicada (tag vX.Y.Z do upstream), nunca o meio do desenvolvimento no master.
TAG="$(git ls-remote --tags --refs upstream 'v*' | sed 's#.*refs/tags/##' | grep -E '^v[0-9]+(\.[0-9]+)*$' | sort -V | tail -1)"
[[ -n "$TAG" ]] || { echo "nenhuma versão (tag v*) no SEI Pro original" | tee "$RES"; exit 1; }
ALVO="refs/upstream-versao/$TAG"
git fetch -q --no-tags upstream "+refs/tags/$TAG:$ALVO"
if git merge-base --is-ancestor "$ALVO" HEAD; then
  echo "nada novo no SEI Pro ($TAG já está em ${INICIO:0:8})" | tee "$RES"
  echo "novo=nao" >"$SAIDA/estado"
  exit 0
fi

versao_upstream() { node -p "require('./dist/manifest.json').version"; }
# o começo do arquivo numa variável: com pipefail, `git show | head | grep` falha pelo SIGPIPE do head mesmo achando
gerado() { local inicio; inicio="$(git show "$1" 2>/dev/null | head -c 400 || true)"; [[ "$inicio" == *'GERADO por'* ]]; }
BASE_ANTES="$(versao_upstream)"
MEXEU=1
if ! git merge --no-edit -q -m "Merge do SEI Pro $TAG (upstream)" "$ALVO"; then
  FONTES=()
  while IFS= read -r f; do
    if gerado ":3:$f" || gerado ":2:$f"; then
      # o do upstream; se o upstream apagou (chunk com hash novo), sai também
      if git cat-file -e ":3:$f" 2>/dev/null; then git checkout --theirs -- "$f"; git add -- "$f"; else git rm -q -- "$f"; fi
    else
      FONTES+=("$f")
    fi
  done < <(git diff --name-only --diff-filter=U)
  if (( ${#FONTES[@]} )); then
    { echo "conflito em fonte no merge do SEI Pro $TAG:"; printf -- '- %s\n' "${FONTES[@]}"; echo "Só ganchos de docs/gelic/GANCHOS.md podem conflitar em fonte: resolva numa sessão."; } | tee "$RES"
    exit 2
  fi
  git commit -q --no-edit
fi
BASE="$(versao_upstream)"

# revisão +1 (a loja exige versão sempre maior) e a entrada de Novidades a partir do histórico do upstream
node -e "const f='gelic/versao.json',fs=require('fs'),v=JSON.parse(fs.readFileSync(f));v.revisao++;fs.writeFileSync(f,JSON.stringify(v,null,2)+'\n')"
REV="$(node -p "require('./gelic/versao.json').revisao")"
(cd gelic && npm install --no-audit --no-fund --loglevel=error >/dev/null)
VERSAO="$(cd gelic && npx tsx novidades.ts "$BASE_ANTES")"
echo "SEI Pro $BASE_ANTES → $BASE ($TAG); versão $VERSAO (r$REV)"

# testes e build de todos os módulos, zips, e2e dos dois perfis
scripts/gelic-atualizar.sh --sem-merge
(cd gelic && npm run -s e2e:todos)

git add -A
git commit -q -m "Gelic r$REV: base SEI Pro $BASE (atualização automática)"
# o site (mkdocs estrito, verificações) e o código público (trava de dados reais) conferidos ANTES de publicar
scripts/gelic-site.sh
GELIC_UPSTREAM_REF="$ALVO" scripts/gelic-codigo.sh

# o pacote do job de publicar: commits, zips, Novidades da versão, cópia do código
git bundle create -q "$SAIDA/atualizacao.bundle" "$INICIO..HEAD"
cp build/sei-pro-gelic-"$VERSAO".zip build/sei-pro-cfc-"$VERSAO".zip "$SAIDA/"
awk -v a="{#v${VERSAO//./-}}" 'index($0,a){p=1} p&&/^## /&&!index($0,a){exit} p' gelic/site/docs/novidades.md >"$SAIDA/notas.md"
tar -czf "$SAIDA/codigo.tgz" -C build codigo-copia
printf 'novo=sim\nversao=%s\nbase=%s\ninicio=%s\nfim=%s\n' "$VERSAO" "$BASE" "$INICIO" "$(git rev-parse HEAD)" >"$SAIDA/estado"
MEXEU=0
echo "ok: versão $VERSAO (base SEI Pro $BASE, r$REV), testes, e2e, site e código conferidos; pacote em build/ci-saida/" | tee "$RES"
