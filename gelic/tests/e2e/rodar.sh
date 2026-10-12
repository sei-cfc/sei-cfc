#!/usr/bin/env bash
# Teste de ponta a ponta: carrega build/sei-pro-<perfil>/ num Chromium headless e abre um SEI de
# mentira (sei.cfc.org.br → 127.0.0.1; sei.outro.gov.br, o mesmo SEI noutro órgão, onde a extensão não pode entrar). Rode depois de "npm run build" (monta os dois perfis).
#   CHROMIUM=/caminho/do/chrome npm run e2e   (padrão: Chromium do Playwright ou google-chrome)
#   GELIC_PERFIL=cfc npm run e2e              (= npm run e2e:cfc) o pacote SEI CFC
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
export GELIC_PERFIL="${GELIC_PERFIL:-gelic}"
EXT="$(cd "$AQUI/../../../build/sei-pro-$GELIC_PERFIL" && pwd)"
CH="${CHROMIUM:-$(ls -d ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome 2>/dev/null | tail -1 || true)}"
CH="${CH:-$(command -v google-chrome || command -v chromium || true)}"
[[ -x "$CH" ]] || { echo "Chromium não encontrado: defina CHROMIUM=/caminho/do/chrome"; exit 2; }
PORTA_WEB=8765; PORTA_CDP=9333; PORTA_PCA=8766
PERFIL="$(mktemp -d)"
python3 "$AQUI/servidor.py" $PORTA_WEB & WEB=$!
# PCA de mentira em https (certificado de teste; o Chromium do teste ignora o erro de certificado)
openssl req -x509 -newkey rsa:2048 -nodes -days 1 -subj "/CN=pca.teste.org.br" -keyout "$PERFIL/pca.key" -out "$PERFIL/pca.crt" >/dev/null 2>&1
python3 "$AQUI/pca_falso.py" $PORTA_PCA "$PERFIL/pca.crt" "$PERFIL/pca.key" & PCA=$!
"$CH" --headless=new --no-sandbox --disable-gpu --user-data-dir="$PERFIL" --remote-debugging-port=$PORTA_CDP \
  --disable-extensions-except="$EXT" --load-extension="$EXT" \
  --ignore-certificate-errors --host-resolver-rules="MAP sei.cfc.org.br 127.0.0.1, MAP sei.outro.gov.br 127.0.0.1, MAP pca.teste.org.br 127.0.0.1, MAP pca.sistemascfc.org 127.0.0.1, MAP sei-cfc.github.io 127.0.0.1" about:blank >"$PERFIL/chrome.log" 2>&1 & NAV=$!
trap 'kill $WEB $PCA $NAV 2>/dev/null; wait $NAV 2>/dev/null; rm -rf "$PERFIL" 2>/dev/null || true' EXIT
node "$AQUI/verificar.mjs" $PORTA_WEB $PORTA_CDP $PORTA_PCA
