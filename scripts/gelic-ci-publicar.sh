#!/usr/bin/env bash
# Atualização automática do SEI Pro original, parte 2: publicar o pacote de scripts/gelic-ci-atualizar.sh
# (build/ci-saida/). Só git, rsync e gh: nada do upstream roda aqui. No workflow, é o único job com o SEI_CFC_TOKEN.
#
#   SEI_CFC_TOKEN=… scripts/gelic-ci-publicar.sh [pasta do pacote]
#
# Ordem: main do repositório privado, release com os zips, site e código público. Cada etapa feita vai para
# build/ci-publicado.txt, para a issue dizer a verdade se uma etapa do meio falhar. Rodar de novo é seguro: o que já
# foi publicado é pulado (main já no fim, release existente, espelho sem mudança).
set -euo pipefail
# Corpo numa função: o passo 1 pode trazer uma versão nova deste próprio arquivo, e o bash lê o script aos poucos.
principal() {
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ"
PACOTE="$(cd "${1:-build/ci-saida}" && pwd)"
FEITO="$RAIZ/build/ci-publicado.txt"
mkdir -p build && : >"$FEITO"

ler() { sed -n "s/^$1=//p" "$PACOTE/estado"; }
[[ "$(ler novo)" == sim ]] || { echo "Pacote sem versão nova: nada a publicar."; exit 0; }
VERSAO="$(ler versao)"; BASE="$(ler base)"; INICIO="$(ler inicio)"; FIM="$(ler fim)"
[[ "$VERSAO" =~ ^[0-9]+(\.[0-9]+){1,4}$ && "$BASE" =~ ^[0-9]+(\.[0-9]+){0,3}$ && "$INICIO$FIM" =~ ^[0-9a-f]{80}$ ]] || { echo "estado do pacote inválido"; exit 1; }
[[ -n "${SEI_CFC_TOKEN:-}" ]] || { echo "Falta o SEI_CFC_TOKEN (ver docs/gelic/ATUALIZACAO.md)."; exit 1; }
[[ "$(git rev-parse --abbrev-ref HEAD)" == main ]] || { echo "Publique a partir do branch main."; exit 1; }
# O gh escolheria sozinho o repositório padrão, que no clone local é o upstream (SEI-Pro/sei-pro): fixa no origin.
ORIGEM="$(git remote get-url origin | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')"
[[ "$ORIGEM" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]] || { echo "origin fora do GitHub: $ORIGEM"; exit 1; }
export GH_REPO="${GITHUB_REPOSITORY:-$ORIGEM}"

# 1. main: avança do commit de antes até o fim do pacote (só fast-forward; o main não pode ter mudado no meio)
case "$(git rev-parse HEAD)" in
  "$FIM") ;;
  "$INICIO") git fetch -q "$PACOTE/atualizacao.bundle" HEAD && git merge -q --ff-only FETCH_HEAD ;;
  *) echo "O main mudou desde a construção (${INICIO:0:8} → $(git rev-parse --short HEAD)): rode o workflow de novo."; exit 1 ;;
esac
[[ "$(git rev-parse HEAD)" == "$FIM" ]] || { echo "O pacote não chegou ao commit esperado."; exit 1; }
git push -q origin HEAD:main
echo "main: ${FIM:0:8}" | tee -a "$FEITO"

# 2. release com os zips (pula se já existe)
if ! gh release view "v$VERSAO" >/dev/null 2>&1; then
  gh release create "v$VERSAO" "$PACOTE/sei-pro-gelic-$VERSAO.zip" "$PACOTE/sei-pro-cfc-$VERSAO.zip" \
    --target "$FIM" --title "SEI CFC $VERSAO (SEI Pro $BASE)" --notes-file "$PACOTE/notas.md"
fi
echo "release: v$VERSAO" | tee -a "$FEITO"

# 3 e 4. espelhos públicos. O token vai em cabeçalho, nunca na URL nem no .git/config.
CABECALHO="AUTHORIZATION: basic $(printf 'x-access-token:%s' "$SEI_CFC_TOKEN" | base64 -w0)"
espelhar() {
  local repo="$1" origem="$2" dir
  dir="$(mktemp -d)"
  git -c http.extraheader="$CABECALHO" clone -q "${GELIC_PUBLICAR_GITHUB:-https://github.com}/$repo.git" "$dir"
  rsync -a --delete --exclude .git "$origem/" "$dir/"
  if [[ -n "$(git -C "$dir" status --porcelain)" ]]; then
    git -C "$dir" add -A
    git -C "$dir" -c user.name="SEI CFC" -c user.email="sei-cfc@users.noreply.github.com" commit -q -m "Versão $VERSAO"
    git -C "$dir" -c http.extraheader="$CABECALHO" push -q origin HEAD:main
  fi
  # no código público, também a tag da versão (a tag que este job cria no privado não dispara publicar-codigo.yml)
  if [[ "$repo" == sei-cfc/sei-cfc ]] && ! git -C "$dir" -c http.extraheader="$CABECALHO" ls-remote --exit-code --tags origin "refs/tags/v$VERSAO" >/dev/null; then
    git -C "$dir" -c user.name="SEI CFC" -c user.email="sei-cfc@users.noreply.github.com" tag -a "v$VERSAO" -m "SEI CFC $VERSAO"
    git -C "$dir" -c http.extraheader="$CABECALHO" push -q origin "refs/tags/v$VERSAO"
  fi
  rm -rf "$dir"
  echo "$repo: versão $VERSAO" | tee -a "$FEITO"
}
espelhar sei-cfc/sei-cfc.github.io gelic/site
COPIA="$(mktemp -d)"
tar -xzf "$PACOTE/codigo.tgz" -C "$COPIA"
espelhar sei-cfc/sei-cfc "$COPIA/codigo-copia"
rm -rf "$COPIA"
echo "publicado: main, release v$VERSAO, site e código público"
}
principal "$@"
exit
