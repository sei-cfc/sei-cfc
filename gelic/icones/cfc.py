#!/usr/bin/env python3
"""Ícones do SEI Pro CFC (perfil cfc) a partir do símbolo institucional do CFC.

Fonte: o símbolo do CFC (quadrado dourado com engrenagem branca e círculo azul) usado no app do PCA,
pca-cfc/core/static/img/simbolo-cfc.png (57×58 px, RGBA com fundo transparente). É uma ferramenta
interna do próprio CFC.

    python3 gelic/icones/cfc.py [caminho/simbolo-cfc.png]
      → gelic/icones/cfc/icon-16.png, icon-32.png, icon-48.png, icon-128.png e logo-pequeno.png (44 px,
        a marca do selo, desenhada a 22 px: o dobro para tela de alta densidade)

O símbolo é centrado num quadrado transparente, com margem só a partir de 48 px (a 16 e 32 px cada
pixel conta). A fonte tem 57 px: abaixo disso é redução (LANCZOS, nítida); o 128 é ampliação 2,2×,
então leva um realce leve (UnsharpMask) para a borda não ficar borrada.
Os ícones da Gelic (icones/*.png, desenhados por desenhar.py) não são tocados.
"""
import sys
from pathlib import Path

from PIL import Image, ImageFilter

AQUI = Path(__file__).resolve().parent
PADRAO = Path.home() / "ativos/docker/pca-cfc/core/static/img/simbolo-cfc.png"
SAIDA = AQUI / "cfc"
# (arquivo, lado em px, margem em px de cada lado)
ALVOS = [("icon-16.png", 16, 0), ("icon-32.png", 32, 0), ("icon-48.png", 48, 2), ("icon-128.png", 128, 6), ("logo-pequeno.png", 44, 0)]


def quadrado(im: Image.Image) -> Image.Image:
    """Recorta pelo alfa e centra num quadrado transparente (o símbolo tem 57×58)."""
    im = im.convert("RGBA")
    im = im.crop(im.getchannel("A").getbbox())
    lado = max(im.size)
    q = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    q.alpha_composite(im, ((lado - im.width) // 2, (lado - im.height) // 2))
    return q


def icone(fonte: Image.Image, lado: int, margem: int) -> Image.Image:
    arte = lado - 2 * margem
    # Redimensiona com alfa pré-multiplicado (sem halo escuro na borda transparente).
    r = fonte.convert("RGBa").resize((arte, arte), Image.LANCZOS).convert("RGBA")
    if arte > fonte.width:
        r = r.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    saida = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    saida.alpha_composite(r, (margem, margem))
    return saida


def main() -> None:
    origem = Path(sys.argv[1]) if len(sys.argv) > 1 else PADRAO
    fonte = quadrado(Image.open(origem))
    SAIDA.mkdir(exist_ok=True)
    for nome, lado, margem in ALVOS:
        icone(fonte, lado, margem).save(SAIDA / nome, optimize=True)
        print(f"cfc/{nome} ({lado} px, margem {margem})")


if __name__ == "__main__":
    main()
