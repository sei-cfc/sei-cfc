#!/usr/bin/env python3
"""Gabarito de paridade da preparação do DVI: o que selecionar.py, checar.py, fatos.py e o checklist da skill
gelic dizem para casos SINTÉTICOS. O porte TS (gelic/src/dvi/preparar/) tem de devolver exatamente isto.

Casos: a fixture sintética de evals/test_checagens.py (DOCS) e três processos inventados aqui (preparatória,
prorrogação, reajuste), montados em pasta temporária como os evals montam (indice.json + _texto/docs/*.txt).
Nunca autos reais.

    GELIC_SKILL=~/.claude/skills/gelic python3 gelic/tests/paridade/gerar_dvi_preparar.py
"""
import json
import os
import re
import sys
import tempfile
from datetime import date
from pathlib import Path

SKILL = Path(os.environ.get("GELIC_SKILL", Path.home() / ".claude/skills/gelic")).expanduser()
sys.path.insert(0, str(SKILL / "scripts"))
sys.path.insert(0, str(SKILL / "evals"))
import checar  # noqa: E402
import fatos  # noqa: E402
import gelic_lib  # noqa: E402
import selecionar  # noqa: E402
import test_checagens  # noqa: E402
import test_leitura  # noqa: E402

SAIDA = Path(__file__).resolve().parents[2] / "regras" / "dvi" / "paridade-preparar.json"
HOJE = date(2026, 10, 9)
checar.hoje = lambda: HOJE  # data de referência fixa (validades e vigências)
PROCESSO = test_checagens.PROCESSO


def paginas(ini, n, linhas_por_pagina):
    """Texto de n páginas a partir de ini, com o marcador [[p. N]] da extração e linhas dadas por página."""
    partes = []
    for k in range(n):
        corpo = linhas_por_pagina(k) if callable(linhas_por_pagina) else linhas_por_pagina
        partes.append(f"[[p. {ini + k}]]\n{corpo}")
    return "\n".join(partes) + "\n"


ASSINA = ("\nDocumento assinado eletronicamente por\nFulano de Tal\n,\nAnalista\n, em\n{data}, às 14:00, conforme horário "
          "oficial de Brasília, com fundamento no art. 4º, do\nDecreto nº\n10.543, de 13 de novembro de 2020\n.\n"
          "A autenticidade deste documento pode ser conferida no site\nhttps://sei.exemplo/sei\n, informando o código "
          "verificador\n9000099\n e o\ncódigo CRC\nAB12CD34\n.\nReferência:\n Processo nº " + PROCESSO + "\nSEI nº 9000099\n")

TR_LONGO = lambda k: ("CLÁUSULA DE VIGÊNCIA: o contrato terá vigência de 12 meses, admitida a prorrogação.\n" if k == 2 else "") + \
    ("O índice de reajuste será o IPCA, a contar da data-base da proposta.\n" if k == 5 else "") + \
    "Texto descritivo do objeto, sem cláusula de interesse.\nOutra linha comum do termo.\n"
ESTATUTO = lambda k: ("Art. 20. Compete ao Presidente representar a sociedade isoladamente.\n" if k == 3 else "") + \
    ("A Diretoria assinará em conjunto os contratos.\n" if k == 9 else "") + "Disposições gerais da entidade.\nMais texto.\n"

# (seq, sei, titulo, n_pags, datas_assinatura, texto)
PRORROGACAO = [
    (1, "9100001", "Termo de Referência 10/2024", 12, ["10/01/2024"], paginas(1, 12, TR_LONGO)),
    (2, "9100002", "Estudo Técnico Preliminar 9/2024", 4, ["09/01/2024"], paginas(13, 4, "Estudo do serviço.\n")),
    (3, "9100003", "Contrato 68/2025", 4, ["30/10/2025"],
     paginas(17, 4, lambda k: "CONTRATO N.º 68/2025\nVigência: 30/10/2025 a 30/10/2026.\nValor mensal R$ 3.098,75.\n"
                              "CONTRATADA: Empresa Teste Ltda., CNPJ 12.345.678/0001-90.\n" if k == 0 else "Cláusulas gerais.\n")),
    (4, "9100004", "Formulário de prorrogação contratual", 2, ["01/09/2026"],
     paginas(21, 2, lambda k: "FORMULÁRIO DE PRORROGAÇÃO\nPeríodo atual 30/10/2025 a 30/10/2026; novo período 30/10/2025 a 30/10/2027.\n"
                              "Processo SEI nº 12345670000048.000009/2026-11.\n" if k == 0 else "Assinatura do gestor.\n")),
    (5, "9100005", "Ofício - Manifestação de interesse da contratada", 1, [],
     paginas(23, 1, "Manifestamos interesse na prorrogação pelo valor de R$ 3.099,50 mensais.\n"
                    "Empresa Teste Ltda., CNPJ 12.345.678/0002-71.\n")),
    (6, "9100006", "Certidão Negativa de Débitos - CND", 1, [],
     paginas(24, 1, "CERTIDÃO NEGATIVA\nEmitida em 10/07/2026.\nVálida por 180 (cento e oitenta) dias, a contar da data de sua emissão.\n"
                    "Esta certidão é válida até 15/08/2026.\n")),
    (7, "9100007", "Certidão de Regularidade do FGTS - CRF", 1, [],
     paginas(25, 1, "Certificado de regularidade.\nValidade: 01/12/2026\nCertidão expedida em 02/09/2026.\n")),
    (8, "9100008", "Estatuto Social da Contratada", 15, [], paginas(26, 15, ESTATUTO)),
    (9, "9100009", "Relatório de fiscalização do contrato", 1, ["15/09/2026"],
     paginas(41, 1, "Relatório da execução: sem ocorrências no período.\nAtestamos a execução.\n" + ASSINA.format(data="15/09/2026"))),
    (10, "9100010", "Planilha de reajuste IPCA", 3, ["16/09/2026"], paginas(42, 3, "Índice IPCA acumulado 4,83 %.\nR$ 3.248,41 corrigido.\n")),
    (11, "9100011", "Anexo técnico do serviço", 5, ["16/09/2026"], paginas(45, 5, lambda k: f"Seção técnica {k + 1}.\nDetalhe operacional.\n"
                                                                   + ("Valor de referência R$ 3.145,00 e R$ 3.161,00.\n" if k == 1 else ""))),
    (12, "9100012", "Despacho de Verificação Inicial - DVI", 1, ["20/09/2026"],
     paginas(50, 1, "DESPACHO\nVerificação inicial: pendências listadas.\n")),
    (13, "9100013", "E-mail da contratada", 1, [], paginas(51, 1, "Encaminhamos a documentação. Sem anexos.\n")),
]

PREPARATORIA_EXTRA = [
    (12, "9000012", "Declaração de compatibilidade orçamentária", 30, ["16/09/2026"],
     paginas(23, 30, lambda k: ("Declaramos a dotação orçamentária disponível.\n" if k == 4 else "") + "Texto da declaração.\n")),
    (13, "9000013", "Documento complementar do setor", 30, ["16/09/2026"], paginas(53, 30, "Conteúdo complementar.\n")),
    (14, "9000014", "Despacho de Verificação Inicial - DVI", 1, ["18/09/2026"], paginas(83, 1, "DESPACHO\nDVI com pendências.\n")),
    (15, "9000015", "Nota curta", 2, [], paginas(84, 2, "Nota.\n")),
]


def _doc(seq, sei, titulo, ini, n, datas, ocr=()):
    return {
        "seq": seq, "sei": sei, "titulo": titulo, "pag_ini": ini, "pag_fim": ini + n - 1, "n_pags": n,
        "texto": f"docs/{seq:03d}_{sei}.txt", "pags_sem_texto": [], "pags_ocr": list(ocr), "imagens": [],
        "datas_assinatura": list(datas), "assinaturas": [{"nome": "Fulano", "cargo": "Analista", "data": d} for d in datas],
    }


def montar_pasta(raiz: Path, nome: str, docs_py: list, textos: dict) -> Path:
    pasta = raiz / nome
    (pasta / "_texto" / "docs").mkdir(parents=True)
    for d in docs_py:
        (pasta / "_texto" / d["texto"]).write_text(textos[d["seq"]], encoding="utf8")
    (pasta / "_texto" / "indice.json").write_text(json.dumps({"processo": PROCESSO, "documentos": docs_py}, ensure_ascii=False), encoding="utf8")
    return pasta


def entrada_ts(docs_py, textos):
    """O documento como o porte TS o recebe (DocAutos)."""
    saida = []
    for d in docs_py:
        paginas_doc = set(range(d["pag_ini"], d["pag_fim"] + 1))
        saida.append({"seq": d["seq"], "sei": d["sei"], "titulo": d["titulo"], "texto": textos[d["seq"]],
                      "datasAssinatura": d["datas_assinatura"], "nPags": d["n_pags"],
                      "digitalizado": bool(paginas_doc) and paginas_doc <= set(d["pags_ocr"])})
    return saida


def secao(md: str, titulo: str, ate: str, pular: int = 0) -> list:
    """Linhas entre o título e o próximo marcador `ate`, sem as primeiras `pular` e sem as vazias das pontas."""
    if titulo not in md:
        return []
    resto = md.split(titulo, 1)[1]
    resto = resto.split(ate, 1)[0] if ate in resto else resto
    ls = resto.split("\n")[1:]
    while ls and not ls[0].strip():
        ls.pop(0)
    ls = ls[pular:]
    while ls and not ls[-1].strip():
        ls.pop()
    return ls


def linhas_checar(md: str) -> dict:
    validades = secao(md, "## Datas de validade e vencimento", "\n## ", pular=2)
    vigencias = secao(md, "## Períodos de vigência (dd/mm/aaaa a dd/mm/aaaa)", "\n## ", pular=2)
    proximos = secao(md, "Valores muito próximos (≤ 1%) em documentos diferentes — possível divergência:", "\n## ")
    cnpj = secao(md, "Mesma raiz de CNPJ com estabelecimentos diferentes (conferir qual é o contratado):", "\n## ")
    # "nenhuma ..." é a linha que o checar põe quando a tabela fica vazia; o porte devolve lista vazia
    validades = [x for x in validades if not x.startswith("| — |")]
    vigencias = [x for x in vigencias if not x.startswith("| — |")]
    return {"validades": validades, "vigencias": vigencias, "proximos": proximos, "cnpj": cnpj}


def fatos_de(pasta: Path, indice: dict, estado: dict) -> dict:
    def data(d):
        return d.strftime("%d/%m/%Y")
    return {
        "classes": [fatos.classe_doc(d, estado) for d in indice["documentos"]],
        "sem_assinatura": fatos.documentos_sem_assinatura(indice),
        "cronologia": fatos.cronologia(pasta, indice, estado),
        "divergentes": fatos.processos_divergentes(pasta, indice),
        "titulo_x_conteudo": fatos.titulo_x_conteudo(estado, indice),
        "citados": fatos.citados_ausentes(pasta, indice, estado),
        "mcp": fatos.mcp_sem_proposta(pasta, indice, estado),
        "validades_relativas": [[{**v, "base": data(v["base"]), "termo": data(v["termo"])} for v in fatos.validades_relativas(gelic_lib.texto_doc(pasta, d))]
                                for d in indice["documentos"]],
        "secoes_fatos": checar.secoes_fatos(pasta, indice, estado),
    }


def caso_selecao(raiz: Path, nome: str, linhas_docs: list, tipo):
    docs_py = [_doc(seq, sei, tit, 1 + 10 * seq, n, datas) for seq, sei, tit, n, datas, _ in linhas_docs]
    textos = {seq: txt for seq, _, _, _, _, txt in linhas_docs}
    pasta = montar_pasta(raiz, nome, docs_py, textos)
    estado = selecionar.montar(pasta, tipo, None)
    indice = gelic_lib.carregar_indice(pasta)
    modos = {}
    corpos = {}
    for d in docs_py:
        s = d["seq"]
        if s in estado["lidos_integral"]:
            modos[s], corpo = "integral", textos[s]
        elif s in estado["lidos_recorte"]:
            modos[s] = "recorte"
            chave = selecionar.CHAVE_REPRESENTACAO if re.search(selecionar.P_REPRESENTACAO, gelic_lib.normalizar(d["titulo"])) else selecionar.CHAVE_CONTRATUAL
            corpo = selecionar.recorte(textos[s], chave)
        elif s in estado["lidos_1a_pagina"]:
            modos[s] = "primeira_pagina"
            partes = re.split(r"(?=\[\[p\. \d+\]\])", textos[s])
            corpo = "".join(partes[:2]) if len(partes) > 1 else textos[s]
        else:
            modos[s], corpo = "nao_lido", None
        if corpo is not None:
            corpos[s] = selecionar.enxugar(corpo).strip()
    seq_de = {d["sei"]: d["seq"] for d in docs_py}
    return {
        "nome": nome, "tipo": tipo, "processo": PROCESSO, "documentos": entrada_ts(docs_py, textos),
        "familia": estado["familia"], "tipo_norm": estado["tipo"], "series": estado["series"],
        "modos": modos, "corpos": corpos, "conteudo": estado["conteudo"],
        "contrato": seq_de[estado["contrato"]["sei"]] if estado["contrato"] else None,
        "dvi_anterior": seq_de[estado["dvi_anterior"]["sei"]] if estado["dvi_anterior"] else None,
        "fatos": fatos_de(pasta, indice, estado),
        "checar": linhas_checar(checar.varrer(pasta)),
    }


def caso_fixture(raiz: Path):
    """A fixture de evals/test_checagens.py, com o _estado.json dela (todos lidos, rótulo de conteúdo dado)."""
    pasta = test_checagens.montar(raiz)
    indice = gelic_lib.carregar_indice(pasta)
    estado = json.loads((pasta / "_texto" / "_estado.json").read_text(encoding="utf8"))
    textos = {d["seq"]: gelic_lib.texto_doc(pasta, d) for d in indice["documentos"]}
    return {
        "nome": "fixture test_checagens", "processo": PROCESSO, "documentos": entrada_ts(indice["documentos"], textos),
        "conteudo": estado["conteudo"], "fatos": fatos_de(pasta, indice, estado), "checar": linhas_checar(checar.varrer(pasta)),
    }


def checklists() -> dict:
    out = {}
    for arq in ("checklist-preparatoria.md", "checklist-contratual.md"):
        c = gelic_lib.carregar_checklist(SKILL, arq)
        out[arq] = {"series": c["series"], "itens": c["itens"]}
    return out


TITULOS_SERIES = {
    "nenhum": [],
    "contrato": ["Contrato 1/2025"],
    "reajuste no título": ["Contrato 1/2025", "Pedido de reajuste - IPCA"],
    "apostila": ["Termo de Apostila 2/2026"],
    "direta no título": ["DFD", "Justificativa de Inexigibilidade de Licitação"],
    "dispensa eletrônica": ["Aviso de Dispensa Eletrônica 5/2026"],
    "dispensa de licitação": ["Termo de Dispensa de Licitação"],
    "contratação direta": ["Autorização de Contratação Direta"],
    "pregão": ["DFD", "Edital Pregão Eletrônico 3/2026"],
}
TIPOS = [None, "inexigibilidade", "dispensa", "pregao", "Dispensa", "reajuste", "prorrogacao"]
ACHADOS = [None, {"blocos": [{"achados": [{"checklist": "J03"}]}]}, {"compatibilidade": [{"checklist": "C02"}]}]


def series() -> list:
    out = []
    for fam in ("preparatoria", "prorrogacao", "reajuste", "compare"):
        for nome, titulos in TITULOS_SERIES.items():
            for tipo in TIPOS:
                for ach in ACHADOS:
                    ids = [a["checklist"] for b in (ach or {}).get("blocos", []) for a in b["achados"]] + \
                          [a["checklist"] for a in (ach or {}).get("compatibilidade", [])]
                    out.append({"familia": fam, "titulos": titulos, "tipo": tipo, "ids": ids,
                                "series": gelic_lib.series_da_familia(fam, [{"titulo": t} for t in titulos], ach, tipo=tipo)})
    return out


def familias() -> list:
    out = []
    for tipo in [None, *sum(selecionar.FAMILIAS.values(), []), "Pregão", "INEXIGIBILIDADE", "Repactuação"]:
        for titulos in (["DFD", "ETP"], ["DFD", "Contrato 68/2025"], ["Termo Aditivo 2/2026"], ["Apostila 1/2026"], ["Termo de Contrato 3/2025"]):
            fam, t = selecionar.familia_de(tipo, {"documentos": [{"titulo": x} for x in titulos]})
            out.append({"tipo": tipo, "titulos": titulos, "familia": fam, "tipo_norm": t})
    return out


def textos_soltos() -> dict:
    amostras = {"amostra_enxugar": test_leitura.AMOSTRA, "tr_longo": paginas(1, 8, TR_LONGO), "estatuto": paginas(1, 12, ESTATUTO),
                "rodape": "texto\nDespacho X (1234567)         SEI 12345670000048.000007/2026-13 / pg. 3\n3 de 26\n\nfim\n,\n.",
                "cabecalhos": "[[p. 1]]\nCONSELHO FEDERAL DE CONTABILIDADE\nAVISO\nANEXO I\nTERMO DE REFERÊNCIA\nJUSTIFICATIVA DE PREÇOS\n1. OBJETO\nTEXTO EM CAIXA ALTA DEPOIS"}
    return {
        nome: {
            "texto": t,
            "enxugar": selecionar.enxugar(t),
            "recorte_contratual": selecionar.recorte(t, selecionar.CHAVE_CONTRATUAL),
            "recorte_representacao": selecionar.recorte(t, selecionar.CHAVE_REPRESENTACAO),
            "cabecalhos": gelic_lib.cabecalhos(t),
            "rotulo_despacho": gelic_lib.rotulo_conteudo("Despacho", t),
            "rotulo_tr": gelic_lib.rotulo_conteudo("Termo de Referência 1/2026", t),
        }
        for nome, t in amostras.items()
    }


def main():
    with tempfile.TemporaryDirectory() as tmp:
        raiz = Path(tmp)
        prep_docs = [(seq, sei, tit, fim - ini + 1, datas, corpo) for seq, sei, tit, ini, fim, datas, _ocr, corpo in test_checagens.DOCS] + PREPARATORIA_EXTRA
        casos = [
            caso_fixture(raiz / "fixture"),
            caso_selecao(raiz, "preparatoria", prep_docs, None),
            caso_selecao(raiz, "preparatoria-inexigibilidade", prep_docs, "inexigibilidade"),
            caso_selecao(raiz, "prorrogacao", PRORROGACAO, None),
            caso_selecao(raiz, "reajuste", PRORROGACAO, "reajuste"),
            caso_selecao(raiz, "prorrogacao-sem-contrato-no-fim", [x for x in PRORROGACAO if x[0] != 3] , "prorrogacao"),
        ]
    g = {
        "origem": "skill gelic: scripts/selecionar.py, checar.py, fatos.py, gelic_lib.py (carregar_checklist, series_da_familia)",
        "hoje": HOJE.strftime("%d/%m/%Y"),
        "checklists": checklists(),
        "series": series(),
        "familias": familias(),
        "textos": textos_soltos(),
        "casos": casos,
    }
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    SAIDA.write_text(json.dumps(g, ensure_ascii=False, indent=1) + "\n", encoding="utf8")
    print(f"{SAIDA}: {len(g['series'])} casos de séries, {len(g['familias'])} de família, {len(g['textos'])} textos, {len(casos)} processos")


if __name__ == "__main__":
    main()
