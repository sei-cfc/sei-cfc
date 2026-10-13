# SEI CFC e SEI CFC Gelic: código-fonte

Código-fonte das extensões do Conselho Federal de Contabilidade para o SEI, publicado sob a AGPL-3.0
(`LICENSE.txt`). Documentação e novidades: https://sei-cfc.github.io/

- O código próprio do CFC está em `gelic/` (as duas extensões saem dele, por perfil), `skills-gelic/` e
  `scripts/gelic-*`. O resto é o [SEI Pro](https://github.com/SEI-Pro/sei-pro) (veja `README-SEI-PRO.md`), com os
  pontos de ligação listados em `docs/gelic/GANCHOS.md`.
- Montar as extensões: `cd gelic && npm install && npm run build` (pastas `build/sei-pro-gelic/` e `build/sei-pro-cfc/`).

Esta é uma cópia de cada versão publicada. O desenvolvimento acontece num repositório interno do CFC.
Para contribuir, veja `CONTRIBUTING.md`.
