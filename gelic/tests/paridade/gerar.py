#!/usr/bin/env python3
"""Gabarito de paridade: o que o etapa.py da skill gelic diz para cada caso sintético.

O motor TS (gelic/src/regras/motor.ts) tem de devolver exatamente isto. Os casos vêm do
próprio teste da skill (evals/test_etapa.py: CASOS) mais os de EXTRAS abaixo — só títulos
sintéticos, nunca autos reais.

    GELIC_SKILL=~/.claude/skills/gelic python3 gelic/tests/paridade/gerar.py
"""
import json
import os
import sys
from pathlib import Path

SKILL = Path(os.environ.get("GELIC_SKILL", Path.home() / ".claude/skills/gelic")).expanduser()
sys.path.insert(0, str(SKILL / "scripts"))
sys.path.insert(0, str(SKILL / "evals"))
import etapa  # noqa: E402
import test_etapa  # noqa: E402

SAIDA = Path(__file__).resolve().parents[2] / "regras" / "paridade.json"

EXTRAS = [
    ("vazio", [], None),
    ("só outros documentos", ["Ofício 12/2026", "Certidão TCU"], None),
    ("caixa e acentos", ["TERMO DE REFERÊNCIA 3/2026", "estudo tecnico preliminar 2/2026"], None),
    ("dispensa eletrônica marcada", test_etapa.PREP + ["Despacho de Verificação Inicial - DVI",
                                                     "Despacho Gelic - emissão reserva Gecont",
                                                     "Aviso de Dispensa Eletrônica 5/2026"], None),
    ("SRP no edital", test_etapa.PREP + ["Edital Pregão Eletrônico SRP 3/2026"], None),
    ("acréscimo pedido", test_etapa.CONTRATO + ["Formulário de acréscimo contratual 2/2026"], None),
    ("reajuste pedido", test_etapa.CONTRATO + ["Pedido de reajuste - IPCA"], None),
    ("número SEI e nome depois do traço", ["Termo de Referência 31/2025 - Fulano de Tal (0123456)"], None),
]


def caso(nome, titulos):
    est = test_etapa.estado(*titulos)
    v = etapa.valores_regra(est)
    ids = etapa.etapas_que_casam(v)
    et, escolha = etapa.desfecho(v)
    doc = opcoes = motivo = None
    if et:
        doc, opcoes, motivo = etapa.resolver_documento(etapa.ETAPA[et], est, limites={}, valores=v)
    return {
        "nome": nome,
        "titulos": list(titulos),
        "tipos": [etapa.tipo_de(t) for t in titulos],
        "marcas": [etapa.marcas_de(t) for t in titulos],
        "valores": v,
        "etapas": ids,
        "desfecho": [et, list(escolha) if isinstance(escolha, tuple) else escolha],
        "relevantes": etapa.relevantes(v) if et else [],
        "documento": doc,
        "opcoes": opcoes,
        "motivo": motivo,
    }


# Sequências aleatórias (semente fixa) sobre um título por tipo e marca: cobrem as ~30 etapas e a ordem de avaliação.
POOL = [
    "DFD - Documento de Formalização da Demanda", "Estudo Técnico Preliminar 30/2025", "Termo de Referência 31/2025",
    "Mapa Comparativo de Preços - MCP", "Despacho de Verificação Inicial - DVI", "Despacho Gelic - devolução para ajuste",
    "Despacho Gelic - emissão reserva Gecont", "Nota de Reserva 123/2026", "Despacho GELIC - envio à PROJUR",
    "Parecer PROJUR 45/2026", "Autorização de Contratação Direta", "Aviso de Dispensa Eletrônica 5/2026",
    "Edital Pregão Eletrônico 3/2026", "Edital Pregão Eletrônico SRP 4/2026", "Termo de Homologação",
    "Minuta de Contrato", "Contrato 68/2025 - EMPRESA x CFC", "Nota de Empenho 7965", "Publicação PNCP-Contrato 68",
    "Formulário de prorrogação contratual 4/2026", "Formulário de acréscimo contratual 2/2026",
    "Pedido de reajuste - IPCA", "Minuta de Termo Aditivo", "Termo Aditivo [1º]", "Termo de Apostilamento 2/2026",
    "Informação Técnica 001/2026", "Ofício 1324/2026 - notificação", "Minuta de Termo de Extinção",
    "Despacho de abertura de PAR", "Inexigibilidade - justificativa", "Certidão TCU", "Ofício 12/2026",
]
import random  # noqa: E402
sorteio = random.Random(20261009)
ALEATORIOS = [(f"aleatorio {i}", [sorteio.choice(POOL) for _ in range(sorteio.randint(1, 14))], None) for i in range(400)]

# Aditivos: contrato + pedido + uma subsequência ORDENADA da cadeia típica (às vezes com um item fora de ordem).
CADEIA = ["Despacho de Verificação Inicial - DVI", "Despacho Gelic - emissão reserva Gecont", "Minuta de Termo Aditivo",
          "Despacho GELIC - envio à PROJUR", "Parecer PROJUR 45/2026", "Termo Aditivo [1º]", "Publicação PNCP",
          "Nota de Empenho 8001"]
PEDIDOS = ["Formulário de prorrogação contratual 4/2026", "Formulário de acréscimo contratual 2/2026",
           "Pedido de reajuste - IPCA", "Formulário de alteração contratual 1/2026",
           "Formulário de alteração contratual - acréscimo de 25%", "Formulário de alteração contratual - supressão"]
ADITIVOS = []
for i in range(200):
    resto = [t for t in CADEIA if sorteio.random() < 0.6]
    if resto and sorteio.random() < 0.2:
        a, b = sorteio.randrange(len(resto)), sorteio.randrange(len(resto))
        resto[a], resto[b] = resto[b], resto[a]
    ADITIVOS.append((f"aditivo {i}", test_etapa.CONTRATO + [sorteio.choice(PEDIDOS)] + resto, None))

casos = [caso(n, t) for n, t, _ in test_etapa.CASOS + EXTRAS + ALEATORIOS + ADITIVOS]
SAIDA.write_text(json.dumps({"_leia": "GERADO por gelic/tests/paridade/gerar.py a partir do etapa.py da skill gelic. NAO EDITE.",
                             "casos": casos}, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"{len(casos)} casos em {SAIDA}")
