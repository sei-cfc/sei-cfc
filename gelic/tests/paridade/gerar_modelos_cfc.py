#!/usr/bin/env python3
"""Gabarito de paridade dos modelos do perfil CFC: o que o motor do app "gera" (PCA CFC) produz para cada caso.

O motor TS no modo CFC (gelic/src/modelos/cfc.ts: preencherCfc, contextoCfc, calcularCfc...) tem de devolver
exatamente isto. Diferente da skill gelic, o motor do gera (apps/gera/motor/preencher.py) é o modo rascunho:
variável sem valor não recusa, sai ⟦nome⟧ e entra em `faltando`; valor substituído nunca vira sintaxe (WR-01);
`@calcula nome:arg`; e o ctx já vem montado por quem chama (documentos/respostas.py::contexto_documento).

Casos (sempre sobre os modelos de gelic/regras/modelos-cfc/, mantidos aqui desde 2026-10-10; do gera só o motor):
  - o exemplo de cada modelo (regras/modelos-cfc/<m>/exemplos/*.json: dados inventados, nunca autos reais);
  - cada condição {#x}/{^x} invertida, cada lista vazia, cada variável ausente, cada valor com sintaxe do motor
    ({, |, .., # no começo da linha...), valores que não são texto, cálculos do mapa de preços e da numeração
    de parágrafos, combinações sorteadas (semente fixa) e modelos sintéticos das bordas do modo rascunho;
  - o ctx montado pelo contexto_documento a partir de documentos falsos (sem banco: o Django é substituído por
    módulos vazios só para o import), com as perguntas visíveis/pendentes e o calcular() de cada um.
Também grava regras/modelos-cfc/<m>/formulario.json (o <m>.yaml já lido pelo carregar_modelo do gera: o TS
não lê YAML) (a sequencia.json é mantida aqui, à mão, desde 2026-10-10).

    GERA_APP=~/ativos/pca-cfc-gera/apps/gera python3 gelic/tests/paridade/gerar_modelos_cfc.py
"""
import sys
sys.dont_write_bytecode = True  # o app gera é só leitura: nada de __pycache__ novo lá
import contextlib
import copy
import dataclasses
import hashlib
import json
import os
import random
import re
import subprocess
import sys
import types
from pathlib import Path

GERA = Path(os.environ.get("GERA_APP", Path.home() / "ativos/pca-cfc-gera/apps/gera")).expanduser().resolve()
RAIZ = Path(__file__).resolve().parents[2]
PASTA = RAIZ / "regras" / "modelos-cfc"
SAIDA = RAIZ / "regras" / "modelos-cfc-paridade.json"
MODELOS = ["dfd", "tr", "mapa_precos", "despacho_delic", "termos_cientificacao"]

# ---- import do gera sem Django: só os módulos puros, mais respostas.py/regras.py com o ORM substituído.
sys.path.insert(0, str(GERA.parents[1]))
_django = types.ModuleType("django")
_django_db = types.ModuleType("django.db")
_django_db.transaction = types.SimpleNamespace(atomic=contextlib.nullcontext)
_django.db = _django_db
sys.modules.setdefault("django", _django)
sys.modules.setdefault("django.db", _django_db)


class _Escolhas(type):
    def __getattr__(cls, nome):
        return nome.lower()


class Via(metaclass=_Escolhas):  # mesmos valores de apps.gera.models.Via
    PREGAO, CONCORRENCIA, DISPENSA, INEXIGIBILIDADE = "pregao", "concorrencia", "dispensa", "inexigibilidade"


class TipoObjeto(metaclass=_Escolhas):
    pass


_models = types.ModuleType("apps.gera.models")
_models.Via, _models.TipoObjeto, _models.Documento = Via, TipoObjeto, object
sys.modules["apps.gera.models"] = _models

from apps.gera.motor import preencher as P  # noqa: E402
from apps.gera.documentos import modelos as M  # noqa: E402
from apps.gera.documentos import respostas as R  # noqa: E402
from apps.gera import regras as RG  # noqa: E402

M.BASE_DIR = PASTA  # o carregar_modelo do gera lê as cópias da Gelic, não os originais
sorteio = random.Random(20261009)


def sha(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def rodar(fonte: str, dados: dict) -> dict | None:
    try:
        texto, usados, faltando = P.preencher_texto(fonte, copy.deepcopy(dados))
    except P.ErroTemplate as e:
        return {"erro": str(e)}
    except Exception as e:  # noqa: BLE001 — IndexError etc.: comportamento não especificado, fica de fora
        print(f"  (fora do gabarito: {type(e).__name__}: {e})", file=sys.stderr)
        return None
    return {"texto": texto, "usados": [[n, v] for n, v in usados], "faltando": faltando}


def compactar(r: dict) -> dict:
    """Texto vai como sha256 e, dos usados, só os nomes (o arquivo ficaria com megabytes)."""
    if "texto" in r:
        r = dict(r)
        t = r.pop("texto")
        r["texto_sha256"], r["texto_tamanho"] = sha(t), len(t)
        r["usados_nomes"] = [n for n, _ in r.pop("usados")]
    return r


casos: list[dict] = []
fontes = {m: M.carregar_modelo(m).fonte for m in MODELOS}
exemplos = {m: sorted(p.stem for p in (PASTA / m / "exemplos").glob("*.json")) for m in MODELOS}
carregar_exemplo = lambda m, e: json.loads((PASTA / m / "exemplos" / f"{e}.json").read_text(encoding="utf-8"))  # noqa: E731


def caso(nome: str, modelo: str, base: str, definir: dict | None = None, remover: list | None = None, inteiro=False):
    dados = carregar_exemplo(modelo, base)
    for k in remover or []:
        dados.pop(k, None)
    dados.update(copy.deepcopy(definir or {}))
    r = rodar(fontes[modelo], dados)
    if r is None:
        return
    receita = {"base": base}
    if definir:
        receita["definir"] = definir
    if remover:
        receita["remover"] = remover
    casos.append({"caso": nome, "modelo": modelo, **receita, **(r if inteiro else compactar(r))})


def sintetico(nome: str, fonte: str, dados: dict):
    r = rodar(fonte, dados)
    if r is not None:
        casos.append({"caso": nome, "fonte": fonte, "dados": dados, **r})


def tokens(fonte: str):
    fonte = re.sub(r"^%%.*\n", "", fonte, flags=re.M)
    return [(t, n) for t, n, _ in P.TOKEN.findall(fonte) if not n.startswith(".")]


SINTAXE = ("início {objeto} e {#x}y{/x} {^x}z{/x} {*l}{.a}{/l} | coluna | fim.. e ... e {§} {§§@a} {§ref@a} {x|cap}\n"
           "# título falso\n## cláusula falsa {§cl}\n| a | b |\n|---|---|\n::: ementa\n> citação\n@cabecalho\n"
           "%% comentário\n@calcula numerar_paragrafos:objeto\n\n\n\ntexto ⟦x⟧ Ltda.")
NAO_TEXTO = [42, 0, True, False, 1.5, ["a", "b"], {"valor": "embrulhado", "sei": "0000000", "p": 3}, {"valor": ""}, " ", "0"]

for m in MODELOS:
    for e in exemplos[m]:
        caso(f"exemplo {m}/{e}", m, e, inteiro=True)
    base = exemplos[m][0]
    dados = carregar_exemplo(m, base)
    toks = tokens(fontes[m])
    conds = list(dict.fromkeys(n for t, n in toks if t in "#^" and t))
    listas = list(dict.fromkeys(n for t, n in toks if t == "*"))
    valores = list(dict.fromkeys(n for t, n in toks if t == ""))
    for c in conds:
        v = dados.get(c)
        novo = (False if isinstance(v, bool) else "") if P.verdadeiro(v) else (True if isinstance(v, bool) else "Texto inventado da condição.")
        caso(f"{m}: condição {c} invertida", m, base, {c: novo})
        caso(f"{m}: condição {c} ausente", m, base, remover=[c])
    for li in listas:
        caso(f"{m}: lista {li} vazia", m, base, {li: []})
        caso(f"{m}: lista {li} ausente", m, base, remover=[li])
        caso(f"{m}: lista {li} de textos", m, base, {li: ["x", "y"]})
    for v in valores:
        caso(f"{m}: {v} ausente", m, base, remover=[v])
        caso(f"{m}: {v} vazio", m, base, {v: ""})
        caso(f"{m}: {v} com sintaxe do motor", m, base, {v: SINTAXE})
    alvo = valores[0]
    for i, x in enumerate(NAO_TEXTO):
        caso(f"{m}: {alvo} não texto #{i}", m, base, {alvo: x})
    caso(f"{m}: tudo ausente", m, base, remover=list(dados))
    for i in range(25):
        definir, remover = {}, []
        for c in conds:
            if sorteio.random() < 0.4:
                definir[c] = sorteio.choice([True, False, "", "sim", 0, [], ["a"]])
        for v in valores:
            r = sorteio.random()
            if r < 0.1:
                remover.append(v)
            elif r < 0.15:
                definir[v] = sorteio.choice([SINTAXE, "a | b", "x..", "# t", "{v}", "linha\r\nnova sep", " "])
        for li in listas:
            if sorteio.random() < 0.2:
                definir[li] = sorteio.choice([[], [{}], [{"nome": "{x}", "projeto": "P | Q"}] * 3])
        caso(f"{m}: sorteio {i}", m, base, definir, remover)

# ---- cálculos dentro dos modelos
caso("dfd: justificativa com parágrafos vazios", "dfd", exemplos["dfd"][0], {"justificativa": "a\n\n\n\nb\n\n  \n\nc\n"}, inteiro=True)
caso("dfd: justificativa embrulhada", "dfd", exemplos["dfd"][0], {"justificativa": {"valor": "a\n\nb", "sei": "1"}}, inteiro=True)
caso("dfd: justificativa embrulhada vazia", "dfd", exemplos["dfd"][0], {"justificativa": {"valor": ""}}, inteiro=True)
caso("dfd: justificativa não texto", "dfd", exemplos["dfd"][0], {"justificativa": 5})
caso("dfd: justificativa lista", "dfd", exemplos["dfd"][0], {"justificativa": ["a"]})
caso("dfd: justificativa False", "dfd", exemplos["dfd"][0], {"justificativa": False})
caso("dfd: justificativa só espaços", "dfd", exemplos["dfd"][0], {"justificativa": "   "})
MP = ["fonte_1_valor_unitario", "fonte_2_valor_unitario", "fonte_3_valor_unitario"]
precos = [
    ["100,00", "110,00", "104,50"], ["100,00", "110,00", ""], ["100,00", "", ""], ["", "", ""], ["abc", "173", "1.000,00"],
    ["1.234.567,89", "0,01", "999.999,99"], ["200.000.000,00", "200.000.000,00", "200.000.000,00"], ["0,00", "0,00", "0,00"],
    ["R$ 10,00", "R$10,00", " 20,00 "], [{"valor": "50,00", "sei": "1"}, None, 7], ["33,33", "33,33", "33,34"], ["1,00", "2,00", "4,00"],
]
propostas = ["95,00", "", "abc", "200.000.000,01", "104,83", "0,01", "110,00", None, "1.000.000,00"]
for i, ps in enumerate(precos):
    for j, pr in enumerate(propostas if i < 8 else propostas[:2]):
        d = {k: v for k, v in zip(MP, ps)}
        d["proposta_valor_unitario"] = pr
        caso(f"mapa_precos: preços {i} proposta {j}", "mapa_precos", exemplos["mapa_precos"][0], d)
for i, pessoas in enumerate([
    [], [{"nome": "A", "matricula": "1", "papel": "fiscal de contrato"}],
    [{"nome": "A", "matricula": "1", "papel": "x", "apto": True}, {"nome": "B", "matricula": "", "papel": "y", "apto": False},
     {"nome": "{C}", "matricula": "3 | 4", "papel": "z..", "apto": "sim"}],
    [{}], ["só texto"],
]):
    caso(f"termos_cientificacao: pessoas {i}", "termos_cientificacao", exemplos["termos_cientificacao"][0], {"pessoas_termo": pessoas}, inteiro=True)

# ---- sintéticos: bordas do modo rascunho e da sintaxe
sintetico("requer recusado (sem dica de modelo)", "@requer regime=14133\n\nTexto {a}.\n", {"regime": "8666", "a": "x"})
sintetico("requer sem a variável", "@requer regime=14133\n\nTexto.\n", {})
sintetico("requer embrulhado aceito", "@requer regime=14133\n\nTexto.\n", {"regime": {"valor": 14133}})
sintetico("cálculo desconhecido", "@calcula inexistente\n\n{a}\n", {"a": "x"})
sintetico("cálculo desconhecido com argumento", "@calcula inexistente:a\n\n{a}\n", {"a": "x"})
sintetico("numerar_paragrafos sem campo", "@calcula numerar_paragrafos\n\n{j}\n", {"j": "a\n\nb"})
sintetico("numerar_paragrafos campo ausente", "@calcula numerar_paragrafos:j\n\n{j}\n", {})
sintetico("numerar_paragrafos dois campos", "@calcula numerar_paragrafos:j\n@calcula numerar_paragrafos:k\n\n{j}\n\n{k}\n",
          {"j": "a\n\nb", "k": "c\n\n\n\nd"})
sintetico("estatistica_mcp sem campos", "@calcula estatistica_mcp\n\n{media_fmt}\n", {"x": "1,00"})
sintetico("estatistica_mcp com espaços", "@calcula estatistica_mcp:a,b,c\n\n{media_fmt} {mediana_fmt} {economia_pct_fmt}\n",
          {"a": "1,00", "b": "2,00", "c": "4,00", "proposta_valor_unitario": "3,00"})
sintetico("estatistica_mcp dois valores", "@calcula estatistica_mcp:a,b\n\n{media_fmt} {mediana_fmt} {economia_pct_fmt}\n",
          {"a": "1,00", "b": "2,00", "proposta_valor_unitario": "1,49"})
sintetico("estatistica_mcp dízima", "@calcula estatistica_mcp:a,b,c\n\n{media_fmt} {mediana_fmt} {economia_pct_fmt}\n",
          {"a": "0,01", "b": "0,01", "c": "0,02", "proposta_valor_unitario": "0,01"})
sintetico("estatistica_mcp economia meio centavo", "@calcula estatistica_mcp:a\n\n{economia_pct_fmt}\n",
          {"a": "8,00", "proposta_valor_unitario": "7,9996"})
sintetico("estatistica_mcp proposta meio-termo", "@calcula estatistica_mcp:a\n\n{economia_pct_fmt}\n",
          {"a": "1.000,00", "proposta_valor_unitario": "999,95"})
sintetico("padrao", "@padrao a=b\n@padrao c=d.e\n\n{a} {c}\n", {"b": "B", "d": {"e": "E"}})
sintetico("padrao sem origem", "@padrao a=b\n\n{a}\n", {})
sintetico("comentário depois do render fica (gera não o tira)", "{#a}A{/a}\n{^a}%% comentário{/a}\n## Título\n{b}\nfim\n## Outro\n",
          {"a": False, "b": "B"})
sintetico("numeração e referência", "## {§cl} — {§sec}\n\n{§} um {§§@x}\n\n{§§} dois, ver {§ref@x}\n\n## {§cl}\n\n{§} {v}\n",
          {"v": "{§} {§ref@x} {§cl}"})
sintetico("referência inexistente", "## T\n\n{§ref@nada}\n", {})
sintetico("filtros", "{a|cap} {a|maiusculas} {a|minusculas} {b|cap}\n", {"a": "ação {x} | y..", "b": "ÉDITO"})
sintetico("filtro desconhecido", "{a|outro}\n", {"a": "x"})
sintetico("bloco não fechado", "{#a}x\n", {"a": True})
sintetico("fechamento sem abertura", "x{/a}\n", {})
sintetico("fechamento trocado", "{#a}{#b}x{/a}{/b}\n", {"a": True, "b": True})
sintetico("listas e campos", "{*l}{._n}-{._letra}: {.a} {.} {.valor} {.b.c}\n{/l}fim {*v}{.x}{/v}\n",
          {"l": [{"a": "A", "b": {"c": "C"}}, "texto", {"a": ""}, 3], "v": []})
sintetico("lista aninhada", "{*l}{.n}:{*.s}[{.x}{._n}]{/.s};{/l}\n", {"l": [{"n": 1, "s": [{"x": "a"}, {"x": "b"}]}, {"n": 2, "s": []}]})
sintetico("lista de 30 letras", "{*l}{._letra}{/l}\n", {"l": list(range(30))})
sintetico("condições pythonicas", "{#a}a{/a}{#b}b{/b}{#c}c{/c}{#d}d{/d}{#e}e{/e}{#f}f{/f}{#g}g{/g}{^h}h{/h}{#i}i{/i}\n",
          {"a": 0, "b": "0", "c": [], "d": {}, "e": "False", "f": {"valor": ""}, "g": {"valor": 1}, "h": None, "i": 0.0})
sintetico("valores pythonicos", "{a} {b} {c} {d} {e} {f} {g}\n",
          {"a": True, "b": False, "c": 2.5, "d": [1, "x", None, True], "e": {"k": "v", "n": [1]}, "f": -0.5, "g": 10 ** 20})
sintetico("ponto duplo", "{a}. {b}.. {c}...\n", {"a": "Ltda.", "b": "x", "c": "y.."})
sintetico("separadores de linha no valor", "{a}\n\n## {b}\n", {"a": "x\r\n# y | z ::: w\x85> v", "b": "t\n@cabecalho"})
sintetico("cabeçalho e marcadores", "@cabecalho\n\n# T\n\n## C\n\n> s\n\n::: e\n\n| a | b |\n| --- | --- |\n| {x} | {y} |\n",
          {"x": "1 | 2", "y": "# 3"})
sintetico("caracteres de uso privado no valor", "{a} {b}\n", {"a": "", "b": "{c}"})
sintetico("três linhas em branco e bordas", "\n\n  {a}\n\n\n\n\n{b}  \n\n\n", {"a": "x\n\n\n\ny", "b": " "})
sintetico("ausentes na ordem", "{z} {a} {z} {*l}{.q}{/l} {#k}{m}{/k}\n", {"l": [{}], "k": True})

# ---- funções de cálculo isoladas
calc = {"numerar_paragrafos": [], "estatistica_mcp": []}
for j in ["", None, "a", "a\n\nb", "a\n\n\n\nb", "\n\na\n\n", "  \n\nx", 5, {"valor": "p\n\nq"}, {"valor": None}, ["x"], 0, False]:
    ctx = {"j": copy.deepcopy(j)}
    try:
        P.CALCULOS["numerar_paragrafos"][0](ctx, "j")
        calc["numerar_paragrafos"].append([j, ctx.get("j")])
    except ValueError as e:
        calc["numerar_paragrafos"].append([j, {"erro": str(e)}])
for _ in range(300):
    n = sorteio.randint(0, 5)
    vals = [f"{sorteio.randint(0, 10 ** sorteio.randint(1, 9))},{sorteio.randint(0, 99):02d}" for _ in range(n)]
    ctx = {f"v{i}": v for i, v in enumerate(vals)}
    if sorteio.random() < 0.8 and vals:
        ctx["proposta_valor_unitario"] = sorteio.choice(vals[:1] + [f"{sorteio.randint(0, 10 ** 6)},{sorteio.randint(0, 99):02d}"])
    entrada = copy.deepcopy(ctx)
    campos = ",".join(f"v{i}" for i in range(n))
    P.CALCULOS["estatistica_mcp"][0](ctx, *([campos] if campos else []))
    calc["estatistica_mcp"].append([entrada, campos, {k: ctx[k] for k in ("media_fmt", "mediana_fmt", "economia_pct_fmt") if k in ctx}])

# ---- ctx do documento (contexto_documento) + perguntas visíveis/pendentes + calcular()
def documento_falso(e: dict):
    resp = e["responsavel"]
    criador = types.SimpleNamespace(email=resp["email"], get_full_name=lambda: resp.get("nome", ""))
    if "matricula" in resp:
        criador.perfil_gera = types.SimpleNamespace(matricula=resp["matricula"])
    pca = e.get("pca")
    processo = None
    if pca:
        grau = pca.get("grau_prioridade")
        processo = types.SimpleNamespace(item_pca=pca["item_pca"], exercicio=types.SimpleNamespace(ano=pca["ano"]),
                                         grau_prioridade_id=1 if grau else None,
                                         grau_prioridade=types.SimpleNamespace(nome=grau) if grau else None)
    contratacao = types.SimpleNamespace(cadastro=copy.deepcopy(e.get("cadastro")), criado_por=criador,
                                        unidade=types.SimpleNamespace(nome=e["unidade"]), processo_pca_id=1 if processo else None,
                                        processo_pca=processo, via=e["via"])
    return types.SimpleNamespace(contratacao=contratacao, respostas=copy.deepcopy(e.get("respostas") or {}), modelo=e["modelo"])


CADASTRO = {
    "objeto": "Contratação de serviço fictício de manutenção de equipamentos de exemplo.",
    "justificativa": "Necessidade fictícia de exemplo.\n\nSegundo parágrafo de exemplo.",
    "valor_estimado": "12345.67", "mes_previsto": 11, "data_pretendida": "30/11/2026",
    "itens": [{"descricao": "Serviço de exemplo", "unidade_medida": "Serviço/mês", "quantidade": "12"}],
    "vigencia": {"meses": 12}, "indice": "IPCA",
    "pessoas": [{"nome": "Fulana de Tal Exemplo", "matricula": "000123", "papel": "equipe_planejamento"},
                {"nome": "Beltrano Exemplo da Silva", "matricula": "000456", "papel": "fiscal"},
                {"nome": "Sicrano Exemplo", "matricula": "000789", "papel": "gestor"}],
    "projetos_contas": [{"projeto": "Projeto 0000 - Projeto de exemplo", "conta": "0.0.0.0.00.00.000 - Conta de exemplo"}],
}


def respostas_de(m: str) -> dict:
    ex = carregar_exemplo(m, exemplos[m][0])
    return {p.id: ex[p.id] for p in M.carregar_modelo(m).perguntas if p.id in ex and not p.le_do_cadastro}


BASE_DOC = {"unidade": "Gerência Executiva de Exemplo - GEX-EXEM", "via": "pregao",
            "responsavel": {"nome": "Fulana de Tal Exemplo", "email": "fulana.exemplo@exemplo.invalid", "matricula": "000123"},
            "pca": {"item_pca": 99, "ano": 2026, "grau_prioridade": "Médio"}, "cadastro": CADASTRO}
contextos: list[dict] = []


def contexto(nome: str, m: str, **mudar):
    e = copy.deepcopy({**BASE_DOC, "modelo": m, "respostas": respostas_de(m)})
    for k, v in mudar.items():
        if k == "cadastro_mais":
            e["cadastro"] = {**e["cadastro"], **v}
        elif k == "cadastro_menos":
            e["cadastro"] = {a: b for a, b in e["cadastro"].items() if a not in v}
        elif k == "respostas_mais":
            e["respostas"] = {**e["respostas"], **v}
        elif v is None and k in e and k != "pca":
            del e[k]
        else:
            e[k] = v
    try:
        doc = documento_falso(e)
        modelo = M.carregar_modelo(m)
        ctx = R.contexto_documento(doc, modelo)
        visiveis = [p.id for p in R.perguntas_visiveis(modelo, ctx)]
        pendentes = [p.id for p in R.perguntas_pendentes(doc, modelo, ctx)]
        texto, faltando = R.calcular(documento_falso(e))
    except (ValueError, P.ErroTemplate) as erro:
        contextos.append({"caso": nome, "entrada": e, "erro": str(erro)})
        return
    r = compactar({"texto": texto, "usados": []})
    r.pop("usados", None), r.pop("usados_nomes", None)
    contextos.append({"caso": nome, "entrada": e, "ctx": json.loads(json.dumps(ctx, ensure_ascii=False)),
                      "visiveis": visiveis, "pendentes": pendentes, "faltando": faltando, **r})


for m in MODELOS:
    contexto(f"{m}: completo", m)
    contexto(f"{m}: sem PCA", m, pca=None)
    contexto(f"{m}: PCA sem grau", m, pca={"item_pca": "12", "ano": 2027, "grau_prioridade": None})
    contexto(f"{m}: dispensa", m, via="dispensa")
    contexto(f"{m}: inexigibilidade", m, via="inexigibilidade")
    contexto(f"{m}: sem respostas", m, respostas={})
    contexto(f"{m}: sem cadastro", m, cadastro={}, respostas={})
    contexto(f"{m}: cadastro None", m, cadastro=None, respostas={})
contexto("dfd: valor pt-BR", "dfd", cadastro_mais={"valor_estimado": "12.345,67"})
contexto("dfd: valor inteiro", "dfd", cadastro_mais={"valor_estimado": "100"})
contexto("dfd: valor ilegível", "dfd", cadastro_mais={"valor_estimado": "abc"})
contexto("dfd: valor vazio", "dfd", cadastro_mais={"valor_estimado": ""})
contexto("dfd: valor zero", "dfd", cadastro_mais={"valor_estimado": "0.00"})
contexto("dfd: valor 1 milhão", "dfd", cadastro_mais={"valor_estimado": "1000000.01"})
contexto("dfd: data inválida", "dfd", cadastro_mais={"data_pretendida": "2026-11-30"})
contexto("dfd: data dia 1º", "dfd", cadastro_mais={"data_pretendida": "01/12/2026"})
contexto("dfd: sem vigência", "dfd", cadastro_mais={"vigencia": {}})
contexto("dfd: vigência None", "dfd", cadastro_mais={"vigencia": None})
contexto("dfd: sem pessoas", "dfd", cadastro_menos=["pessoas"])
contexto("dfd: sem nome completo", "dfd", responsavel={"nome": "", "email": "x@exemplo.invalid", "matricula": "1"})
contexto("dfd: sem perfil", "dfd", responsavel={"nome": "Fulana", "email": "x@exemplo.invalid"})
contexto("dfd: matrícula vazia", "dfd", responsavel={"nome": "Fulana", "email": "x@exemplo.invalid", "matricula": ""})
contexto("dfd: resposta tenta sobrescrever leitura direta", "dfd", respostas_mais={"area_nome": "Outra", "responsavel_email": "y@y"})
contexto("dfd: resposta de objeto perde para o cadastro", "dfd", respostas_mais={"objeto": "Objeto da resposta"})
contexto("dfd: objeto só na resposta", "dfd", cadastro_menos=["objeto"], respostas_mais={"objeto": "Objeto da resposta"})
contexto("dfd: vinculação respondida", "dfd", respostas_mais={"vinculacao": "DFD 1/2026"})
contexto("dfd: autoridade respondida", "dfd", respostas_mais={"autoridade_nome": "Autoridade Respondida"})
contexto("dfd: grau respondido sem PCA", "dfd", pca=None, respostas_mais={"grau_prioridade": "Baixo"})
contexto("dfd: grau respondido com PCA", "dfd", respostas_mais={"grau_prioridade": "Alto"})
contexto("dfd: resposta de equipe", "dfd", respostas_mais={"equipe_planejamento": [{"nome": "Resposta"}]})
contexto("dfd: dispensa sem fundamento", "dfd", via="dispensa", respostas_mais={"fundamento_contratacao_direta": ""})
contexto("dfd: dispensa com fundamento", "dfd", via="dispensa", respostas_mais={"fundamento_contratacao_direta": "Art. 75, II."})
contexto("dfd: via desconhecida", "dfd", via="adesao_ata")
contexto("dfd: resposta com sintaxe", "dfd", respostas_mais={"diretor_nome": SINTAXE})
contexto("tr: sem modalidade em dispensa", "tr", via="dispensa", respostas_mais={"modalidade_licitacao": ""})
contexto("tr: objeto ausente", "tr", cadastro_menos=["objeto"])
contexto("termos: sem treinamento", "termos_cientificacao",
         respostas_mais={"pessoas_sem_treinamento": "  Beltrano Exemplo da Silva  \n\nNinguém\n"})
contexto("termos: papel desconhecido e sem papel", "termos_cientificacao",
         cadastro_mais={"pessoas": [{"nome": "A", "matricula": "1", "papel": "outro"}, {"nome": "B"}]})
contexto("termos: resposta não texto", "termos_cientificacao", respostas_mais={"pessoas_sem_treinamento": 5})
contexto("mapa: valores da resposta", "mapa_precos", respostas_mais={"fonte_1_valor_unitario": "abc"})
contexto("despacho: sem cargo", "despacho_delic", respostas_mais={"signatario_cargo": ""})

# ---- arquivos auxiliares: formulário (YAML já lido) e sequência
for m in MODELOS:
    perguntas = [dataclasses.asdict(p) for p in M.carregar_modelo(m).perguntas]
    (PASTA / m / "formulario.json").write_text(json.dumps(perguntas, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
# A sequência das peças (sequencia.json) é mantida em gelic/regras/modelos-cfc/ desde 2026-10-10 (a do usuário, não
# mais a SEQUENCIA_DOCUMENTOS do gera): este gerador não a regrava.

# sem as linhas %%: o formulario_variaveis do gera também acharia os {#var} citados nos comentários do modelo
variaveis = {m: [list(v) for v in P.formulario_variaveis(re.sub(r"^%%.*\n", "", fontes[m], flags=re.M), {})] for m in MODELOS}
origem = subprocess.run(["git", "-C", str(GERA), "log", "-1", "--format=%h %ad", "--date=short"],
                        capture_output=True, text=True).stdout.strip() or "sem git"
SAIDA.write_text(json.dumps({"_leia": "GERADO por gelic/tests/paridade/gerar_modelos_cfc.py a partir do motor do app gera. NAO EDITE.",
                             "origem": origem, "variaveis": variaveis, "calculos": calc, "casos": casos, "contextos": contextos},
                            ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
erros = sum("erro" in c for c in casos)
print(f"{len(casos)} casos ({len(casos) - erros} documentos, {erros} recusas), {len(contextos)} contextos, "
      f"{sum(len(v) for v in calc.values())} cálculos em {SAIDA}")
