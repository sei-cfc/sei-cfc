#!/usr/bin/env bash
# Gera as capturas da ficha da Chrome Web Store (gelic/loja/capturar.mjs), sempre com o limite de
# memória da máquina (systemd-run --scope, sem swap): o Chromium e os servidores de mentira ficam
# no mesmo cgroup do node, então o limite vale para tudo.
#
#   gelic/loja/rodar-capturas.sh            # as duas extensões (SEI CFC Gelic e SEI CFC)
#   gelic/loja/rodar-capturas.sh gelic      # só a SEI CFC Gelic
#   gelic/loja/rodar-capturas.sh cfc        # só a SEI CFC
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
exec systemd-run --user --scope -q -p MemoryMax=2500M -p MemorySwapMax=0 timeout 600 node "$AQUI/capturar.mjs" "$@"
