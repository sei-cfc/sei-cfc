#!/usr/bin/env python3
"""Gabarito de paridade da montagem do DVI (gelic/src/dvi/montar/): o que a própria skill gelic decide e escreve.

Para cada caso roda o código da skill (avaliar.validar, render.decidir, render.resumo, render.CORPOS) sobre uma
pasta sintética (índice, textos e _estado.json inventados; nada de autos reais) e grava o esperado:
validação (erros e avisos), formato ou recusa, resumo e os blocos de texto do documento (HTML normalizado).
O TS tem de reproduzir tudo byte a byte, salvo as ADAPTACOES abaixo, aplicadas aqui e documentadas no código TS:
  - a extensão não tem páginas: `p` sai do checklist_status (o Python recebe p = 1ª página do documento citado);
  - recusas citam os parâmetros do TS (pedido, forcar), não as flags da CLI;
  - o despacho à Gecont pede o objeto `gecont` (o Python, `valor`), e o texto sai do modelo (não comparado aqui;
    só o extenso, contra o por_extenso_reais);
  - limitações e fundamentação não conferida vão ao chat: o documento do Python é renderizado sem `limitacoes`,
    e o resumo troca o rótulo dessas linhas;
  - o corpo do SEI não tem cabeçalho, título do tipo, número do processo nem assinaturas (vêm do SEI), e ganha o
    rótulo "Observações:" antes das observações do DVI.
Casos: construídos (cada regra do validador, cada recusa, cada formato) e sorteados (semente fixa).

    GELIC_SKILL=~/.claude/skills/gelic python3 gelic/tests/paridade/gerar_dvi_montar.py
"""
import copy
import json
import os
import random
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

SKILL = Path(os.environ.get("GELIC_SKILL", Path.home() / ".claude/skills/gelic")).expanduser()
sys.path.insert(0, str(SKILL / "scripts"))
import avaliar  # noqa: E402
import fatos  # noqa: E402
import render  # noqa: E402
from gelic_lib import carregar_checklist, carregar_graus_checklist, por_extenso_reais, series_da_familia  # noqa: E402

SAIDA = Path(__file__).resolve().parents[2] / "regras" / "dvi-montar" / "paridade.json"
GRAUS = carregar_graus_checklist(SKILL)
CFG = json.loads((SKILL / "assets" / "assinaturas.json").read_text(encoding="utf-8"))
TEMP = Path(tempfile.mkdtemp(prefix="gelic-dvi-montar-"))
sorteio = random.Random(20261009)
render.REV["ativo"] = False  # versão final: sem grifo nem legenda

ADAPTACOES = [
    (" exige 'sei' e 'p' (página do processo)", " exige 'sei'"),
    ("{status, sei, p, nota}", "{status, sei, nota}"),
    ("(rode sem flag ou com --dvi)", "(sem pedido ou com pedido 'dvi')"),
    ("Use --forcar para", "Use forcar: true para"),
    ("recusado: --despacho exige", "recusado: pedido 'despacho' exige"),
    ("despacho à Gecont exige o campo 'valor' (ex.: \"R$ 3.098,75\") em achados.json",
     "despacho à Gecont exige o campo 'gecont' ({natureza, natureza_valor, objeto, valor, valor_sei}) nos achados"),
    ("(faixa de aviso será impressa)", "(o aviso vai ao chat, não ao documento)"),
]


def adaptar(s: str) -> str:
    for a, b in ADAPTACOES:
        s = s.replace(a, b)
    return s


# ---------------------------------------------------------------- HTML → blocos de texto
class Blocos(HTMLParser):
    """Blocos visíveis: cada p/h1/h2/div é um texto; cada tabela, a lista de linhas (células). <br> = "\\n"."""
    PULAR = {"cabecalho", "processo", "aviso", "assinatura", "revisao"}

    def __init__(self, com_titulo: bool):
        super().__init__(convert_charrefs=True)
        self.com_titulo, self.saida, self.pulando, self.buf, self.tabela, self.linha, self.obs = com_titulo, [], 0, None, None, None, False

    def handle_starttag(self, tag, attrs):
        classes = set((dict(attrs).get("class") or "").split())
        if self.pulando:
            self.pulando += 1 if tag not in ("br", "col") else 0
            return
        if classes & self.PULAR or (tag == "h1" and not self.com_titulo):
            self.pulando = 1
            return
        if tag == "br" and self.buf is not None:
            self.buf.append("\n")
        elif tag == "table":
            self.tabela = []
        elif tag == "tr" and self.tabela is not None:
            self.linha = []
            self.tabela.append(self.linha)
        elif tag in ("td", "th") and self.linha is not None:
            self.buf = []
        elif tag in ("p", "h1", "h2", "div") and self.tabela is None:
            if "obs" in classes and not self.obs:
                self.obs = True
                self.saida.append("Observações:")  # ADAPTAÇÃO: rótulo dos DVIs reais
            self.buf = []

    def handle_endtag(self, tag):
        if self.pulando:
            self.pulando -= 1
            return
        if tag in ("td", "th") and self.linha is not None and self.buf is not None:
            self.linha.append("".join(self.buf))
            self.buf = None
        elif tag == "table":
            self.saida.append(self.tabela)
            self.tabela = self.linha = None
        elif tag in ("p", "h1", "h2", "div") and self.tabela is None and self.buf is not None:
            self.saida.append("".join(self.buf))
            self.buf = None

    def handle_data(self, data):
        if not self.pulando and self.buf is not None:
            self.buf.append(data)


def blocos_de(html: str, com_titulo=False) -> list:
    p = Blocos(com_titulo)
    p.feed(html)
    p.close()
    return p.saida


# ---------------------------------------------------------------- autos sintéticos
PROC = "12345670000099.000001/2026-11"


def doc(sei, titulo, texto, assinado=True, digitalizado=False):
    return {"sei": sei, "titulo": titulo, "texto": texto, "assinado": assinado, "digitalizado": digitalizado}


BASES = {
    "preparatoria": [
        doc("1100001", "Documento de Formalização da Demanda - DFD 1/2026", "Demanda de 05/03/2026. Valor estimado de R$ 12.345,67 para serviços de manutenção predial."),
        doc("1100005", "Estudo Técnico Preliminar - ETP 2/2026", "ETP de 10/03/2026. Estimativa preliminar de R$ 12.000,00. Item 5.1: requisitos."),
        doc("1100010", "Termo de Referência - TR 3/2026", "TR de 15/03/2026. Cláusula 8.1: prazo de 12 meses. Valor de R$ 12.345,67."),
        doc("1100020", "Mapa Comparativo de Preços - MCP", "Propostas: R$ 11.900,00; R$ 12.345,67; R$ 13.000,00. Data: 20/03/2026."),
        doc("1100030", "Despacho - Encaminhamento à Gelic", "Encaminha os autos à Gelic em 25/03/2026.", assinado=False),
        doc("1100040", "Mapa de Gerenciamento de Riscos", "Riscos identificados em 12/03/2026.", assinado=False),
        doc("1100050", "Proposta - Empresa Alfa", "Proposta digitalizada de R$ 11.900,00 em 18/03/2026.", assinado=False, digitalizado=True),
        doc("1099990", "Termo de Referência - TR 3/2026 (versão anterior)", "Versão de 01/03/2026.", assinado=False),
    ],
    "contratual": [
        doc("1090000", "Contrato nº 10/2025", "Contrato de 01/04/2025, valor anual de R$ 36.000,00. Cláusula 6.15.2: data-base."),
        doc("1200001", "Formulário de prorrogação contratual n.º 4/2026", "Prorrogação por 12 meses a partir de 01/04/2026; valor de R$ 37.200,00."),
        doc("1200010", "Índice IPCA - reajuste", "Variação de 3,33% entre 03/2025 e 02/2026; novo valor R$ 37.198,80."),
        doc("1200020", "Certidão TCU", "Certidão emitida em 30/07/2026, válida até 29/08/2026."),
        doc("1200030", "Despacho - Encaminhamento", "Encaminha à Gelic em 02/08/2026.", assinado=False),
    ],
}


BASES["contratual-sem-reajuste"] = [d for d in BASES["contratual"] if "reajuste" not in d["titulo"]]


def pasta_de(nome: str, docs: list, estado: dict) -> Path:
    pasta = TEMP / nome
    (pasta / "_texto" / "docs").mkdir(parents=True)
    indice = {"processo": PROC, "documentos": []}
    pag = 1
    for i, d in enumerate(docs, 1):
        arquivo = f"docs/{i:03d}_{d['sei']}.txt"
        (pasta / "_texto" / arquivo).write_text(d["texto"], encoding="utf-8")
        ini, fim = pag, pag + 1
        pag += 2
        indice["documentos"].append({
            "seq": i, "sei": d["sei"], "titulo": d["titulo"], "pag_ini": ini, "pag_fim": fim, "texto": arquivo,
            "assinaturas": ["Fulano"] if d["assinado"] else [], "pags_ocr": [ini, fim] if d["digitalizado"] else []})
    (pasta / "_texto" / "indice.json").write_text(json.dumps(indice, ensure_ascii=False), encoding="utf-8")
    (pasta / "_texto" / "_estado.json").write_text(json.dumps(estado, ensure_ascii=False), encoding="utf-8")
    return pasta


def para_python(ach: dict, indice: dict) -> dict:
    """achados do TS → achados.json da skill: p = 1ª página do documento citado; gecont → valor."""
    a = copy.deepcopy(ach)
    pag = {d["sei"]: d["pag_ini"] for d in indice["documentos"]}
    for e in (a.get("checklist_status") or {}).values() if isinstance(a.get("checklist_status"), dict) else []:
        if isinstance(e, dict) and e.get("status") in ("atende", "nao_atende") and isinstance(e.get("sei"), str) and e["sei"].strip():
            e["p"] = pag.get(e["sei"].strip(), 1)
    g = a.pop("gecont", None)
    if isinstance(g, dict) and isinstance(g.get("valor"), str):
        a["valor"] = "R$ " + re.sub(r"^\s*R\$\s*", "", g["valor"])
        a["natureza_valor"] = g.get("natureza_valor")
    return a


ORIGINAIS = {n: getattr(fatos, n) for n in ("processos_divergentes", "citados_ausentes", "titulo_x_conteudo", "cronologia", "mcp_sem_proposta")}


def com_checagens(c: dict | None):
    c = c or {}
    fatos.processos_divergentes = lambda *_: [{"sei": s} for s in c.get("processosDivergentes", [])]
    fatos.citados_ausentes = lambda *_: [{"sei": s} for s in c.get("citadosAusentes", [])]
    fatos.titulo_x_conteudo = lambda *_: [{"sei": s} for s in c.get("tituloConteudo", [])]
    fatos.cronologia = lambda *_: c.get("cronologia", [])
    fatos.mcp_sem_proposta = lambda *_: {"mcp": bool(c.get("mcpSemProposta")), "valores": c.get("mcpSemProposta", [])}


casos, nomes = [], set()


def caso(nome, ach, base="preparatoria", familia="preparatoria", tipo=None, dvi=None, compare=False, pedido=None, forcar=False,
         checagens=None, processo=PROC, avisos_extensao=()):
    """avisos_extensao: avisos que só a extensão dá (conferência do gecont.valor no documento gecont.valor_sei)."""
    assert nome not in nomes, nome
    nomes.add(nome)
    docs = BASES[base]
    estado = {**({"familia": familia} if familia else {}), **({"tipo": tipo} if tipo else {}),
              **({"dvi_anterior": {"sei": dvi}} if dvi else {}), **({"compare": True} if compare else {})}
    pasta = pasta_de(f"c{len(casos):04d}", docs, estado)
    indice = json.loads((pasta / "_texto" / "indice.json").read_text(encoding="utf-8"))
    if processo != PROC:
        indice["processo"] = processo
        (pasta / "_texto" / "indice.json").write_text(json.dumps(indice, ensure_ascii=False), encoding="utf-8")
    com_checagens(checagens)
    contexto = {"processo": processo, "documentos": [
        {"numero": d["sei"], "titulo": d["titulo"], "assinado": d["assinado"], "digitalizado": d["digitalizado"],
         "classe": fatos.classe_doc(i, estado)} for d, i in zip(docs, indice["documentos"])]}
    if familia and not compare:
        contexto["checklist"] = {"familia": familia, "series": series_da_familia(familia, indice["documentos"], None, tipo=tipo)}
    if checagens:
        contexto["checagens"] = checagens
    if dvi:
        contexto["dviAnterior"] = dvi
    if compare:
        contexto["comparativo"] = True
    c = {"nome": nome, "base": base, "contexto": contexto, "achados": ach, **({"pedido": pedido} if pedido else {}), **({"forcar": True} if forcar else {})}
    esperado = {}
    ach_py = para_python(ach, indice)
    if pedido == "despacho" and not dvi:
        esperado["recusa"] = adaptar("recusado: --despacho exige DVI anterior desta etapa nos autos; não há. O formato correto é DVI.")
    else:
        erros, avisos = avaliar.validar(pasta, ach_py, SKILL)
        esperado["validacao"] = {"erros": [adaptar(e) for e in erros], "avisos": [adaptar(a) for a in avisos] + list(avisos_extensao)}
        estruturado = isinstance(ach_py.get("blocos"), list) and all(isinstance(b, dict) and isinstance(b.get("achados"), list) for b in ach_py["blocos"])
        if estruturado and not any(e.startswith("campo obrigatório ausente") and "checklist_status" not in e for e in erros):
            try:
                formato = render.decidir(estado, ach_py, None if pedido == "despacho" else pedido, forcar, GRAUS)
            except SystemExit as e:
                esperado["recusa"] = adaptar(str(e.code))
            else:
                if formato == "gecont" and not ach_py.get("valor"):
                    erros.append("despacho à Gecont exige o campo 'valor' (ex.: \"R$ 3.098,75\") em achados.json")
                try:
                    L = render.resumo(ach_py, formato, GRAUS, erros, avisos + list(avisos_extensao)).split("\n")
                except TypeError as e:  # o Python quebra (ex.: ausência que não é texto): só a validação vale
                    print(f"  ({nome}: resumo fora do gabarito: {e})", file=sys.stderr)
                    c["esperado"] = esperado
                    casos.append(c)
                    return esperado
                lim = ach_py.get("limitacoes") or []
                if lim:  # as linhas de limitações vêm logo depois das de ausências, com o mesmo rótulo
                    aus = "".join(f"- [texto corrido] {x[:140]}\n" for x in ach_py.get("ausencias") or [])
                    velho = aus + "".join(f"- [texto corrido] {x[:140]}\n" for x in lim)
                    texto = "\n".join(L)
                    assert texto.count(velho) == 1, nome
                    L = texto.replace(velho, aus + "".join(f"- [limitação, só no chat] {x[:140]}\n" for x in lim)).split("\n")
                esperado["formato"] = {"compare": "comparativo"}.get(formato, formato)
                esperado["resumo"] = adaptar("\n".join(L))
                if not erros and formato != "gecont":
                    sem_lim = {k: v for k, v in ach_py.items() if k != "limitacoes"}
                    esperado["documento"] = blocos_de(render.CORPOS[formato](sem_lim, estado, CFG, GRAUS), com_titulo=formato == "compare")
                    faixa = render.faixa_verificacao(ach_py)
                    if faixa:
                        esperado["faixa"] = "".join(x if isinstance(x, str) else "" for x in blocos_de(faixa.replace('class="aviso"', "")))
                if not erros and formato == "gecont":
                    v = float(re.sub(r"[^\d,]", "", ach_py["valor"]).replace(",", "."))
                    esperado["extenso"] = por_extenso_reais(v)
    c["esperado"] = esperado
    casos.append(c)
    return esperado


# ---------------------------------------------------------------- checklist completo (base dos casos)
CK = {"preparatoria": carregar_checklist(SKILL, "checklist-preparatoria.md"), "contratual": carregar_checklist(SKILL, "checklist-contratual.md")}


def status_base(familia, series=None, base="preparatoria"):
    arq = CK["preparatoria" if familia == "preparatoria" else "contratual"]
    series = series or {"preparatoria": "AFTRPKM", "prorrogacao": "GB", "reajuste": "GC"}[familia]
    return {it["id"]: {"status": "nao_verificado"} for it in arq["itens"] if it["serie"] in series}


def A(item, const, rec, checklist=None, impede=None):
    a = {"item": item, "constatacao": const, "recomendacao": rec}
    if checklist is not None:
        a["checklist"] = checklist
    if impede is not None:
        a["impede"] = impede
    return a


def prep(**extra):
    st = status_base("preparatoria")
    st["T07"] = {"status": "nao_atende", "sei": "1100005"}
    st["R01"] = {"status": "atende", "sei": "1100010", "nota": "cláusula 1.1"}
    st["M01"] = {"status": "nao_se_aplica", "nota": "não há modalidade a escolher"}
    st["P01"] = {"status": "nao_atende", "sei": "1100020"}
    base = {
        "processo": PROC, "objeto": "contratação de serviços de manutenção predial preventiva e corretiva.",
        "remetente": {"unidade": "Gerência de Infraestrutura", "documento": "Despacho", "sei": "1100030", "destino": "À Gerência de Infraestrutura"},
        "verificacao_legal": True,
        "blocos": [
            {"documento": "Termo de Referência - TR 3/2026", "sei": "1100010", "achados": [
                A("Cláusula 8.1", "O prazo de 12 meses não indica a forma de prorrogação.", "Indicar a forma de prorrogação, conforme cláusula 8.1 do TR (SEI 1100010).", impede=False)]},
            {"documento": "Estudo Técnico Preliminar - ETP 2/2026", "sei": "1100005", "achados": [
                A("Assinatura", "O ETP não traz assinatura eletrônica.", "Assinar o ETP.", "T07"),
                A("Item 5.1", "Os requisitos citam R$ 12.000,00 sem memória de cálculo.", "Juntar a memória de cálculo da estimativa.", impede=True)]},
        ],
        "compatibilidade": [A("Valor estimado", "O TR (SEI 1100010) registra R$ 12.345,67 e o ETP (SEI 1100005) R$ 12.000,00.",
                              "Uniformizar o valor estimado entre as peças.", "P01")],
        "checklist_status": st,
    }
    base.update(extra)
    return {k: v for k, v in base.items() if v is not None}


# ---------------------------------------------------------------- 1. formatos e textos fixos
caso("DVI: preparatória completa", prep())
caso("DVI: sem remetente, com ETP, de acordo, ausência e limitação",
     prep(remetente=None, tem_etp=True, de_acordo=True, ausencias=["Verificou-se, ainda, a ausência de estudo de riscos assinado nos autos, necessário para a fase preparatória, conforme o rito."],
          limitacoes=["A proposta (SEI 1100050) não pôde ser examinada por não apresentar conteúdo legível."]))
caso("DVI: remetente sem destino e destino com vírgula", prep(remetente={"unidade": "SEXEMP", "documento": "Ofício", "sei": "1100030"}))
caso("DVI: destino com ponto e espaços", prep(remetente={"destino": "  Ao Setor de Biblioteca,. "}))
caso("DVI: remetente só com documento (sem sei)", prep(remetente={"documento": "Despacho", "unidade": "SEXEMP"}))
caso("DVI: fundamentação não conferida", prep(verificacao_legal=False, fontes_nao_verificadas=["Lei nº 14.133/2021, art. 25, § 8º", "IN Seges/ME nº 65/2021"]))
caso("DVI: fundamentação não conferida sem lista", prep(verificacao_legal=False))
caso("DVI: caracteres especiais escapados", prep(objeto="contratação de <serviços> & \"insumos\" d'água para a sede.",
     blocos=[{"documento": "TR <3> & 'x'", "sei": "1100010", "achados": [A("8.1 <b>", "Texto com <script>alert(1)</script> & \"aspas\".\nSegunda linha.", "Rever 'isso' & aquilo.", impede=True)]}],
     compatibilidade=[], checklist_status={**status_base("preparatoria"), "T07": {"status": "nao_verificado"}, "P01": {"status": "nao_verificado"}}))
caso("DVI: blocos fora de ordem e SEI sem dígito no fim", prep(blocos=[
    {"documento": "MCP", "sei": "1100020", "achados": [A("Mediana", "A mediana não confere.", "Refazer.", impede=True)]},
    {"documento": "DFD", "sei": "1100001", "achados": [A("Campo 3", "Sem justificativa.", "Justificar.", impede=False)]},
    {"documento": "ETP", "sei": "1100005", "achados": [A("Assinatura", "Sem assinatura.", "Assinar.", "T07")]}],
    compatibilidade=[A("Datas", "Sem SEI citado.", "Conferir.", impede=False), A("Valores", "SEI 1100020 e SEI 1100001 divergem.", "Uniformizar.", "P01"),
                     A("Prazo", "SEI 1100010 diverge do SEI 1100005.", "Uniformizar.", impede=False)]))
caso("DVI: sem achado nenhum", prep(blocos=[], compatibilidade=[], checklist_status={**status_base("preparatoria"), "T07": {"status": "nao_verificado"}, "P01": {"status": "nao_verificado"}}))
caso("devolução: só impeditivos", prep(), dvi="1100099")
caso("devolução: com ausência e de acordo", prep(ausencias=["Verificou-se a ausência de X."], de_acordo=True), dvi="1100099")
SEM_I = prep(blocos=[{"documento": "TR", "sei": "1100010", "achados": [A("8.1", "Prazo sem forma de prorrogação.", "Indicar.", impede=False)]}],
             compatibilidade=[], checklist_status={**status_base("preparatoria"), "T07": {"status": "nao_verificado"}, "P01": {"status": "nao_verificado"}})
GEC = {"natureza": "contratação", "natureza_valor": "a futura contratação", "objeto": "serviços de manutenção predial preventiva e corretiva.",
       "valor": "R$ 12.345,67", "valor_sei": "1100010"}
caso("Gecont: sem impeditivo, com gecont", {**SEM_I, "gecont": GEC}, dvi="1100099")
caso("Gecont: sem o objeto gecont", SEM_I, dvi="1100099")
caso("Gecont: valor grande", {**SEM_I, "gecont": {**GEC, "valor": "1.000.001,01"}}, dvi="1100099",
     avisos_extensao=["gecont: R$ 1.000.001,01 não localizado em nenhum documento (ok se for resultado de cálculo)"])
caso("comparativo", {k: v for k, v in SEM_I.items() if k != "checklist_status"}, familia=None, compare=True)

# ---------------------------------------------------------------- 2. pedidos × estado (todas as combinações)
COM_I = prep()
for estado_nome, ach, dvi in (("sem DVI", COM_I, None), ("DVI e impeditivo", COM_I, "1100099"), ("DVI sem impeditivo", {**SEM_I, "gecont": GEC}, "1100099")):
    for pedido in (None, "dvi", "devolucao", "gecont", "despacho"):
        for forcar in (False, True):
            caso(f"pedido {pedido} forcar={forcar} ({estado_nome})", ach, dvi=dvi, pedido=pedido, forcar=forcar)

# ---------------------------------------------------------------- 3. regras do validador
caso("erro: campos obrigatórios", {"processo": 1, "objeto": "x", "blocos": {}, "verificacao_legal": "sim"})
caso("erro: processo divergente e objeto curto", prep(processo="12345670000099.000001/2026-12", objeto="serviços."))
caso("erro: SEI inexistente no bloco, no texto e no remetente", prep(remetente={"sei": "1999999", "documento": "Despacho"}, blocos=[
    {"documento": "Fantasma", "sei": "1999998", "achados": [A("1", "Cita o SEI 1999997 e o SEI nº 1100010.", "Ver SEI n.º 1999996.", impede=True)]},
    {"documento": "", "sei": "  ", "achados": [A("1", "x", "y", impede=False)]},
    {"documento": "Vazio", "sei": "1100001", "achados": []}]))
caso("erro: campos vazios e impede não lógico", prep(blocos=[{"documento": "TR", "sei": "1100010", "achados": [
    {"item": " ", "constatacao": "", "recomendacao": "ok", "impede": "sim"}]}], compatibilidade=[{"item": "x", "constatacao": "y", "recomendacao": " "}]))
caso("aviso: valor e data não localizados; id desconhecido", prep(blocos=[{"documento": "TR", "sei": "1100010", "achados": [
    A("8.1", "Valor de R$ 99.999,99 em 31/12/2030; também R$ 12.345,67 em 15/03/2026 e R$ 1.234,00 em 01/01/2020.", "Rever (R$ 12345,67).", "Z99"),
    A("8.2", "Valor R$ 13.000,00 (de outro documento) e R$ 13.000,00 de novo; datas 20/03/2026 e 20/03/2026.", "Rever.", impede=False)]}]))
caso("erro: listas de texto e descartados", prep(ausencias=["ok", 3], limitacoes=["Cita R$ 77,00 em 02/02/2022."],
     fontes_nao_verificadas=["Lei 1"], descartados=[{"tema": "Fracionamento", "motivo": "Valor abaixo do limite (R$ 12.345,67)."}, {"tema": "x"}, "y"]))
caso("erro: descartados não é lista", prep(descartados={"tema": "x"}))
caso("descartados no resumo", prep(descartados=[{"tema": "Hipótese de dispensa", "motivo": "Não se aplica: há competição."}]))
caso("erro: checklist_status ausente", {k: v for k, v in prep().items() if k != "checklist_status"})
caso("erro: checklist_status não é objeto", prep(checklist_status=["A01"]))
st = prep()["checklist_status"]
st_mau = {**st, "A01": "atende", "Z99": {"status": "atende"}, "G01": {"status": "atende", "sei": "1100010"}, "A03": {"status": "talvez"},
          "A04": {}, "A05": {"status": "atende"}, "A06": {"status": "nao_atende", "sei": "1999999"}, "A07": {"status": "nao_se_aplica", "nota": " "},
          "F01": {"status": "nao_verificado", "nota": 5}, "F02": {"status": "atende", "sei": "1100001", "nota": "Ver SEI 1999995 e R$ 55,55 em 09/09/2029."},
          "F03": {"status": "nao_atende", "sei": "1100001"}}
del st_mau["T01"]
del st_mau["K01"]
caso("erro: checklist_status — cada regra", prep(checklist_status=st_mau))
caso("erro: achado com id fora da família, sem entrada e não nao_atende", prep(compatibilidade=[A("x", "y", "z", "G01"), A("x", "y", "z", "A01"), A("x", "y", "z", "D01")],
     checklist_status={**st, "A01": {"status": "atende", "sei": "1100001"}}))
caso("série J pelo achado (preparatória)", prep(compatibilidade=[A("Justificativa", "Sem razão da escolha.", "Justificar.", "J01")]))
caso("série J pelo tipo (inexigibilidade)", prep(), tipo="inexigibilidade")
# assinatura e checagens
ass = {**st, "A02": {"status": "atende", "sei": "1100001"}, "T07": {"status": "atende", "sei": "1100005"}, "R07": {"status": "atende", "sei": "1100030"},
       "P06": {"status": "atende", "sei": "1100050"}, "K03": {"status": "atende", "sei": "1100001"}}
caso("assinatura: atende com documento sem assinatura, digitalizado e peça da classe", prep(blocos=[], compatibilidade=[], checklist_status={**ass, "P01": {"status": "atende", "sei": "1100020"}}))
caso("assinatura: R07 citando a mesma classe (outra versão do TR)", prep(blocos=[], compatibilidade=[], checklist_status={**ass, "R07": {"status": "atende", "sei": "1100010"},
     "K03": {"status": "atende", "sei": "1100040"}, "T07": {"status": "nao_verificado"}, "P01": {"status": "nao_verificado"}}))
CHEC = {"processosDivergentes": ["1100005", "1100005", "1100010"], "citadosAusentes": ["1100010", "1100010"], "tituloConteudo": ["1100020"],
        "cronologia": [{"regra": "ETP antes do DFD", "seis": ["1100005", "1100001"]}, {"regra": "TR antes do ETP", "seis": ["1100010"]}],
        "mcpSemProposta": [12345.67, 900.5, 1234567.0]}
chec_st = {**st, "A01": {"status": "atende", "sei": "1100001"}, "A08": {"status": "atende", "sei": "1100001"}, "A09": {"status": "atende", "sei": "1100001"},
           "P01": {"status": "atende", "sei": "1100020"}, "P03": {"status": "nao_verificado"}}
caso("checagens: avisos de A01, A08, A09 e P01/P03", prep(compatibilidade=[], checklist_status=chec_st), checagens=CHEC)
caso("checagens: só título × conteúdo; MCP com nao_atende não avisa", prep(checklist_status={**chec_st, "P01": {"status": "nao_atende", "sei": "1100020"}}),
     checagens={"tituloConteudo": ["1100020"], "mcpSemProposta": [10.0]})
# prorrogação e reajuste
PRO_ST = status_base("prorrogacao")
PRO_ST["G03"] = {"status": "nao_atende", "sei": "1200001"}
PRO = {"processo": PROC, "objeto": "prorrogação do Contrato n.º 10/2025, celebrado com Empresa Exemplo Ltda., cujo objeto é a manutenção predial.",
       "verificacao_legal": True, "checklist_status": PRO_ST,
       "blocos": [{"documento": "Formulário de prorrogação contratual n.º 4/2026", "sei": "1200001", "achados": [
           A("Campo 3", "O valor de R$ 37.200,00 não confere com o índice (SEI 1200010).", "Refazer o cálculo pela cláusula 6.15.2 do Contrato (SEI 1090000).", "G03")]}]}
caso("prorrogação: série C pelo título de reajuste", PRO, base="contratual", familia="prorrogacao")
caso("prorrogação: achado C exige a série C", {**PRO, "blocos": PRO["blocos"] + [{"documento": "Índice", "sei": "1200010", "achados": [A("Índice", "Período errado.", "Refazer.", "C01")]}]},
     base="contratual", familia="prorrogacao")
caso("prorrogação sem reajuste nos títulos: achado C puxa a série C", {**PRO, "blocos": PRO["blocos"] + [{"documento": "Contrato", "sei": "1090000", "achados": [
    A("6.15.2", "Data-base sem índice.", "Indicar o índice.", "C01")]}]}, base="contratual-sem-reajuste", familia="prorrogacao")
caso("prorrogação sem reajuste nos títulos: só G e B", PRO, base="contratual-sem-reajuste", familia="prorrogacao")
caso("reajuste: G + C", {**PRO, "checklist_status": status_base("reajuste")}, base="contratual", familia="reajuste")
caso("família desconhecida: sem checklist", {k: v for k, v in PRO.items() if k != "checklist_status"}, base="contratual", familia="outra")
caso("prorrogação: devolução e Gecont", PRO, base="contratual", familia="prorrogacao", dvi="1200099")

# ---------------------------------------------------------------- 4. sorteados
IDS_PREP = [it["id"] for it in CK["preparatoria"]["itens"] if it["serie"] in "AFTRPKM"]
FRASES = ["O documento registra R$ 12.345,67 em 15/03/2026.", "Não há indicação da forma de prorrogação.",
          "A planilha soma R$ 9.999,00 (resultado de cálculo).", "O SEI 1100020 traz três propostas.", "Cita a data 31/01/2031.",
          "Trecho \"entre aspas\" & símbolos <x>.", "Linha um.\nLinha dois.", "Consta o valor de R$ 11.900,00 em 18/03/2026."]
for n in range(150):
    docs = BASES["preparatoria"]
    blocos = []
    usados = []
    for d in sorteio.sample(docs, sorteio.randint(0, 5)):
        achs = []
        for _ in range(sorteio.randint(1, 3)):
            r = sorteio.random()
            cid = sorteio.choice(IDS_PREP) if r < 0.5 else None
            a = A(f"{sorteio.randint(1, 12)}.{sorteio.randint(1, 9)}", sorteio.choice(FRASES), sorteio.choice(FRASES), cid,
                  None if cid else sorteio.random() < 0.5)
            if cid:
                usados.append((cid, d["sei"]))
            achs.append(a)
        blocos.append({"documento": d["titulo"], "sei": d["sei"] if sorteio.random() > 0.05 else "1999990", "achados": achs})
    comp = [A(sorteio.choice(["Valor", "Prazo", "Objeto"]), f"SEI {sorteio.choice(docs)['sei']} e SEI {sorteio.choice(docs)['sei']}: {sorteio.choice(FRASES)}",
              sorteio.choice(FRASES), sorteio.choice(IDS_PREP) if sorteio.random() < 0.4 else None) for _ in range(sorteio.randint(0, 3))]
    for a in comp:
        if a.get("checklist"):
            usados.append((a["checklist"], "1100010"))
        else:
            a["impede"] = sorteio.random() < 0.3
    stx = status_base("preparatoria")
    for cid, sei in usados:
        if sorteio.random() > 0.05:
            stx[cid] = {"status": "nao_atende", "sei": sei}
    for cid in sorteio.sample(list(stx), 6):
        if stx[cid]["status"] == "nao_verificado":
            stx[cid] = sorteio.choice([{"status": "atende", "sei": sorteio.choice(docs)["sei"]}, {"status": "nao_se_aplica", "nota": "não cabe"}])
    ach = {"processo": PROC, "objeto": "contratação de serviços de manutenção predial preventiva e corretiva.", "verificacao_legal": sorteio.random() < 0.7,
           "blocos": blocos, "compatibilidade": comp, "checklist_status": stx}
    if sorteio.random() < 0.5:
        ach["remetente"] = sorteio.choice([{"unidade": "SEXEMP", "documento": "Despacho", "sei": "1100030"}, {"destino": "À Gerência de Patrimônio"}, {}])
    for k, p_ in (("tem_etp", 0.5), ("de_acordo", 0.3)):
        if sorteio.random() < p_:
            ach[k] = True
    if sorteio.random() < 0.4:
        ach["ausencias"] = [sorteio.choice(FRASES)]
    if sorteio.random() < 0.3:
        ach["limitacoes"] = [sorteio.choice(FRASES), "Outra limitação."]
    dvi = "1100099" if sorteio.random() < 0.5 else None
    if dvi and sorteio.random() < 0.5:
        ach["gecont"] = GEC
    pedido = sorteio.choice([None, None, None, "dvi", "devolucao", "gecont", "despacho"])
    caso(f"sorteio {n}", ach, dvi=dvi, pedido=pedido, forcar=sorteio.random() < 0.3)

for n, f in ORIGINAIS.items():
    setattr(fatos, n, f)

# ---------------------------------------------------------------- checklists e graus
checklists = {arq: {"series": c["series"], "itens": [{k: it[k] for k in ("id", "serie", "grau", "texto")} for it in c["itens"]]}
              for arq, c in ((a, carregar_checklist(SKILL, a)) for a in ("checklist-contratual.md", "checklist-preparatoria.md"))}
origem = subprocess.run(["git", "-C", str(SKILL), "log", "-1", "--format=%h %ad", "--date=short"], capture_output=True, text=True).stdout.strip() or "sem git"
textos = {sei: d["texto"] for b in BASES.values() for d in b for sei in [d["sei"]]}
SAIDA.write_text(json.dumps({"_leia": "GERADO por gelic/tests/paridade/gerar_dvi_montar.py a partir do avaliar.py/render.py da skill gelic. NAO EDITE.",
                             "origem": origem, "adaptacoes": ADAPTACOES, "graus": GRAUS, "checklists": checklists, "textos": textos,
                             "casos": casos}, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
docs_ = sum("documento" in c["esperado"] for c in casos)
rec = sum("recusa" in c["esperado"] for c in casos)
print(f"{len(casos)} casos ({docs_} documentos, {rec} recusas de formato) em {SAIDA}")
