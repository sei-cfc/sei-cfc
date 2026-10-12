#!/usr/bin/env python3
"""Logo do SEI Pro Gelic: um carimbo de verificação.

A Gelic confere a instrução e carimba: o contorno é o de um selo de cartório (borda recortada),
e dentro um G cuja barra vira um visto que escapa pela abertura da letra, no verde do "!" do
SEI Pro (o parentesco com a extensão-mãe). Três cores, nenhum gradiente.

    python3 gelic/icones/desenhar.py      → logo.svg (48 px ou mais) e logo-pequeno.svg (16 e 32 px)
    node gelic/icones/rasterizar.mjs      → icon-16/32/48/128.png e logo-512.png
"""
import math
from pathlib import Path

AQUI = Path(__file__).resolve().parent
PETROLEO = "#0E5C7A"   # cor da Gelic no selo da árvore
PROFUNDO = "#09435A"   # borda do carimbo
VERDE = "#95BF37"      # o verde do "!" do SEI Pro Lab
PAPEL = "#FFFFFF"


def roseta(cx, cy, raio, dentes, fundo, passos=720):
    """Contorno de selo: círculo com `dentes` lóbulos arredondados (fundo = profundidade do recorte)."""
    pts = []
    for i in range(passos):
        t = 2 * math.pi * i / passos
        r = raio - fundo * (1 - math.cos(dentes * t)) / 2
        pts.append(f"{cx + r * math.cos(t):.2f},{cy + r * math.sin(t):.2f}")
    return "M" + " L".join(pts) + " Z"


def arco(cx, cy, r, de, ate):
    """Arco no sentido anti-horário da tela (ângulos em graus, 0 = direita, positivo = para cima)."""
    p = lambda a: (cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a)))
    (x1, y1), (x2, y2) = p(de), p(ate)
    grande = 1 if (ate - de) % 360 > 180 else 0
    return f"M{x1:.2f},{y1:.2f} A{r},{r} 0 {grande} 0 {x2:.2f},{y2:.2f}"


def logo(pequeno: bool) -> str:
    # No pequeno: menos dentes e mais fundos (o recorte some a 16 px se for fino), traços mais
    # grossos e sem o anel pontilhado.
    dentes, fundo = (12, 7) if pequeno else (20, 4.2)
    traco = 17 if pequeno else 13
    # O G: arco aberto em cima à direita que desce até pouco abaixo do meio. A barra do G entra
    # pela direita, levemente inclinada (o braço curto do visto), e no canto sobe como o braço
    # longo, saindo pela abertura da letra: um traço só, verde, que é a barra do G e o visto.
    r = 27 if pequeno else 26
    g = arco(60, 64, r, 46, 345)
    visto = "M57,61 L83,72 L103,40" if pequeno else "M59,61 L84,72 L104,38"
    anel = "" if pequeno else (
        f'<circle cx="64" cy="64" r="50" fill="none" stroke="{PAPEL}" stroke-opacity=".45" '
        f'stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0 6.9"/>')
    # Miolo girado como um carimbo batido à mão.
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <title>SEI Pro Gelic</title>
  <path d="{roseta(64, 64, 62, dentes, fundo)}" fill="{PROFUNDO}"/>
  <path d="{roseta(64, 64, 58.5, dentes, fundo)}" fill="{PETROLEO}"/>
  {anel}
  <g transform="rotate(-8 64 64)">
    <path d="{g}" fill="none" stroke="{PAPEL}" stroke-width="{traco}" stroke-linecap="round"/>
    <path d="{visto}" fill="none" stroke="{PETROLEO}" stroke-width="{traco + 6}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="{visto}" fill="none" stroke="{VERDE}" stroke-width="{traco}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
'''


if __name__ == "__main__":
    (AQUI / "logo.svg").write_text(logo(False), encoding="utf-8")
    (AQUI / "logo-pequeno.svg").write_text(logo(True), encoding="utf-8")
    print("logo.svg e logo-pequeno.svg gerados")
