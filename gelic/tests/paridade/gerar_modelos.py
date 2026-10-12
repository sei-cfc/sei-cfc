#!/usr/bin/env python3
"""Gabarito de paridade do motor de modelos: o que o preencher.py da skill gelic produz para cada caso.

O motor TS (gelic/src/modelos/motor.ts) tem de devolver exatamente isto: o mesmo texto, byte a byte,
a mesma folha de validação e a mesma mensagem de recusa. Casos:
  - cada templates/exemplos/<modelo>.json da skill (dados inventados, nunca autos reais);
  - variantes construídas aqui: hipóteses trocadas (inexigibilidade/dispensa), lista e sem lista,
    @requer recusado, variável faltando, cálculos do apostilamento (certos e divergentes);
  - cada condição {#x}/{^x} de cada modelo invertida, uma a uma, e combinações sorteadas (semente fixa);
  - modelos sintéticos que exercitam a sintaxe e as bordas do Python (str() de não-texto, strip(), ^ só em \\n...).
Mais: a lista de modelos, o formulário de cada um e as funções de calculos.py (extenso, reajuste, datas...).
Texto e folha das variantes sorteadas vão como sha256 (o arquivo ficaria com megabytes); o resto, por inteiro.

    GELIC_SKILL=~/.claude/skills/gelic python3 gelic/tests/paridade/gerar_modelos.py
"""
import copy
import hashlib
import json
import os
import random
import re
import subprocess
import sys
import tempfile
from decimal import Decimal
from pathlib import Path

SKILL = Path(os.environ.get("GELIC_SKILL", Path.home() / ".claude/skills/gelic")).expanduser()
sys.path.insert(0, str(SKILL / "scripts"))
import calculos  # noqa: E402
import preencher  # noqa: E402

SAIDA = Path(__file__).resolve().parents[2] / "regras" / "modelos-paridade.json"
TPL = SKILL / "templates"
DIC = json.loads((TPL / "variaveis.json").read_text(encoding="utf-8"))
sorteio = random.Random(20261009)
TEMP = Path(tempfile.mkdtemp(prefix="gelic-paridade-"))


def sha(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def rodar(alvo: str, dados: dict) -> dict | None:
    """O mesmo fluxo do main() do preencher.py, sem gravar nada. None = o Python quebrou (fora do gabarito)."""
    try:
        texto, usados, faltando, _ = preencher.preencher(alvo, copy.deepcopy(dados))
    except preencher.ErroTemplate as e:
        return {"erro": str(e)}
    except Exception as e:  # noqa: BLE001 — IndexError etc.: comportamento não especificado, fica de fora
        print(f"  (fora do gabarito: {type(e).__name__}: {e})", file=sys.stderr)
        return None
    sem_dic = sorted({n for n, _ in usados if n not in DIC and n.split(".")[0] not in DIC})
    avisos = [f"variável fora de variaveis.json: {n}" for n in sem_dic]
    if faltando:
        return {"erro": f"sem valor: {', '.join(faltando)}", "faltando": faltando, "texto": texto, "avisos": avisos}
    return {"texto": texto, "folha": preencher.relatorio(Path(alvo).stem, usados, faltando, DIC), "avisos": avisos}


def compactar(r: dict) -> dict:
    r = dict(r)
    for k in ("texto", "folha"):
        if k in r:
            r[f"{k}_sha256"], r[f"{k}_tamanho"] = sha(r[k]), len(r[k])
            del r[k]
    return r


casos, nomes = [], set()


def caso(nome: str, dados: dict, modelo: str | None = None, fonte: str | None = None, arquivo: str | None = None,
         inteiro: bool = True, delta: dict | None = None) -> dict | None:
    """delta = {"base": modelo, "definir": {caminho: valor}, "remover": [chave]}: grava a receita (o exemplo da
    cópia em regras/modelos/exemplos/ + mudanças) em vez dos dados inteiros."""
    assert nome not in nomes, nome
    nomes.add(nome)
    if fonte is not None:
        caminho = TEMP / f"{arquivo}.md"
        caminho.write_text(fonte, encoding="utf-8")
        r = rodar(str(caminho), dados)
    else:
        r = rodar(modelo, dados)
    if r is None:
        return None
    c = {"nome": nome, **(delta if delta else {"dados": dados})}
    c.update({"modelo": modelo} if fonte is None else {"fonte": fonte, "arquivo": arquivo})
    c.update(r if inteiro else compactar(r))
    casos.append(c)
    return r


def ler(modelo: str) -> dict:
    return json.loads((TPL / "exemplos" / f"{modelo}.json").read_text(encoding="utf-8"))


MODELOS = [p.stem for p in sorted(TPL.glob("*.md"))]

# ---------------------------------------------------------------- 1. exemplos da skill (e o --texto da CLI)
for m in MODELOS:
    r = caso(f"exemplo {m}", ler(m), modelo=m, delta={"base": m})
    assert r and "texto" in r, f"exemplo {m} não preenche: {r}"
    cli = subprocess.run([sys.executable, str(SKILL / "scripts" / "preencher.py"), m, str(TPL / "exemplos" / f"{m}.json"),
                          "--texto"], capture_output=True, text=True, check=True).stdout
    assert cli.startswith(r["texto"] + "\n") and cli[len(r["texto"]) + 1:].startswith("ok: "), f"--texto de {m} difere"

# ---------------------------------------------------------------- 2. variantes construídas
aut = ler("autorizacao-contratacao-direta")
LIMITE = {"exercicio": "2026", "valor": "65.492,11", "decreto": "Decreto nº 12.343/2024"}
caso("autorização: dispensa por valor, sem lista", {**aut, "inexigibilidade": False, "hipotese": {"dispensa_valor": True},
                                                     "limite_dispensa": LIMITE}, "autorizacao-contratacao-direta")
caso("autorização: dispensa eletrônica com lista de itens", {
    **aut, "inexigibilidade": False, "hipotese": {"dispensa_valor": True}, "limite_dispensa": LIMITE,
    "dispensa_eletronica": {"relatorio_sei": "1000099"},
    "itens": [{"item": "1", "razao_social": "Alfa Comércio Ltda.", "cnpj": "11.111.111/0001-11", "total": "10.000,00"},
              {"item": "2", "razao_social": "Beta & Filhos <ME>", "cnpj": "22.222.222/0001-22", "total": "5.500,50"}]},
    "autorizacao-contratacao-direta")
caso("autorização: inexigibilidade por exclusividade", {**aut, "hipotese": {"inex_exclusivo": True}}, "autorizacao-contratacao-direta")
caso("autorização: inexigibilidade sem hipótese", {**aut, "hipotese": {}}, "autorizacao-contratacao-direta")
caso("autorização: dispensa sem o limite", {**aut, "inexigibilidade": False, "hipotese": {"dispensa_valor": True}},
     "autorizacao-contratacao-direta")
caso("autorização: lista vazia cai no sem lista", {**aut, "itens": []}, "autorizacao-contratacao-direta")
caso("autorização: regime como número passa no @requer", {**aut, "regime": 14133}, "autorizacao-contratacao-direta")

pro = ler("termo-aditivo-prorrogacao")
caso("@requer: 8666 no modelo 14133 sugere o -8666", {**pro, "regime": {"valor": "8666", "sei": "1"}}, "termo-aditivo-prorrogacao")
caso("@requer: sem regime", {k: v for k, v in pro.items() if k != "regime"}, "termo-aditivo-prorrogacao")
caso("@requer: 14133 no modelo 8666 (sem sugestão)", {**ler("termo-aditivo-prorrogacao-8666"), "regime": "14133"},
     "termo-aditivo-prorrogacao-8666")
caso("@requer: regime com aspa", {**pro, "regime": "it's"}, "termo-aditivo-prorrogacao")
caso("@padrao: dados trazem a autoridade", {**pro, "autoridade": {"nome": "Fulana de Tal", "cargo": "Presidente"}},
     "termo-aditivo-prorrogacao")

for m in MODELOS:
    d = ler(m)
    chave = "processo" if "processo" in d else next(iter(d))
    caso(f"faltando {chave} em {m}", {k: v for k, v in d.items() if k != chave}, m, inteiro=False,
         delta={"base": m, "remover": [chave]})
caso("faltando: valor vazio e valor nulo", {**aut, "objeto": "", "unidade_gestora": None}, "autorizacao-contratacao-direta")

ap = ler("termo-apostilamento-reajuste")


def apost(nome: str, **mudar):
    d = copy.deepcopy(ap)
    for caminho, valor in mudar.items():
        alvo, partes = d, caminho.split("__")
        for p in partes[:-1]:
            alvo = alvo[int(p)] if isinstance(alvo, list) else alvo[p]
        if valor is ...:
            del alvo[partes[-1]]
        elif isinstance(alvo, list):
            alvo[int(partes[-1])] = valor
        else:
            alvo[partes[-1]] = valor
    caso(f"apostilamento: {nome}", d, "termo-apostilamento-reajuste")


P0 = {"descricao": "Peças", "periodicidade": "anual", "valor_atual": "54.368,53"}
P1 = {"descricao": "Serviços", "periodicidade": "Mensal ", "valor_atual": {"valor": "R$ 8.469,89", "sei": "9"}}
apost("uma parcela (sem 'composto por')", reajuste__parcelas=[P0])
apost("três parcelas (; / ; e / .)", reajuste__parcelas=[P0, P1, {**P0, "descricao": "Extra"}])
apost("informado igual ao calculado", reajuste__parcelas=[{**P0, "valor_reajustado_informado": "56.891,95"}, P1],
      reajuste__total_informado="163.248,07")
apost("informado diverge", reajuste__parcelas=[{**P0, "valor_reajustado_informado": "56.891,96"}, P1])
apost("total informado diverge", reajuste__total_informado={"valor": "163.248,00", "sei": "1"})
apost("efeitos não é aniversário", reajuste__efeitos="29/07/2026")
apost("efeitos no mesmo ano", reajuste__efeitos="28/07/2023")
apost("data inválida", reajuste__data_base="2023-07-28")
apost("data inexistente", reajuste__data_base="31/02/2023", reajuste__efeitos="31/02/2026")
apost("dia primeiro e ano bissexto", reajuste__data_base="01/03/2024", reajuste__efeitos="01/03/2026")
apost("29 de fevereiro", reajuste__data_base="29/02/2024", reajuste__efeitos="29/02/2028")
apost("percentual inválido", reajuste__percentual="4.64%")
apost("percentual zero", reajuste__percentual="0%")
apost("percentual cem", reajuste__percentual="100")
apost("percentual com muitas casas", reajuste__percentual="4,6413301234567890123456789012345%")
apost("percentual sem casas", reajuste__percentual="5")
apost("ordinal 1", apostilamento__numero=1)
apost("ordinal 20 em texto", apostilamento__numero=" 20 ")
apost("ordinal 21", apostilamento__numero=21)
apost("ordinal inválido", apostilamento__numero={"valor": "3º", "sei": "1"})
apost("ordinal com sublinhado", apostilamento__numero="1_2")
apost("sem número", apostilamento__numero=...)
apost("sem apostilamento", apostilamento=...)
apost("apostilamento com valor", apostilamento={"valor": "3"})
apost("parcelas vazias", reajuste__parcelas=[])
apost("parcela não objeto", reajuste__parcelas=["x"])
apost("parcela sem valor", reajuste__parcelas=[{**P0, "valor_atual": ""}])
apost("periodicidade errada", reajuste__parcelas=[{**P0, "periodicidade": "Semestral"}])
apost("valor em reais inválido", reajuste__parcelas=[{**P0, "valor_atual": "54368.53"}])
apost("valor grande", reajuste__parcelas=[{**P0, "valor_atual": "1.000.000,00"}, {**P1, "valor_atual": "999.999.999,99"}])
apost("valor pequeno", reajuste__parcelas=[{**P0, "valor_atual": "0,01"}, {**P1, "valor_atual": "1,00"}])

# ---------------------------------------------------------------- 3. cada condição invertida (e sorteios)


def definir(d: dict, caminho: str, valor) -> bool:
    alvo, partes = d, caminho.split(".")
    for p in partes[:-1]:
        if p not in alvo:
            alvo[p] = {}
        alvo = alvo[p]
        if not isinstance(alvo, dict) or "valor" in alvo:
            return False
    alvo[partes[-1]] = valor
    return True


for m in MODELOS:
    fonte = (TPL / f"{m}.md").read_text(encoding="utf-8")
    conds = sorted({n for t, n, _ in preencher.TOKEN.findall(fonte) if t in "#^" and not n.startswith(".")})
    base = ler(m)
    ctx = preencher.carregar_contexto(copy.deepcopy(base))
    for n in conds:
        d = copy.deepcopy(base)
        novo = not preencher.verdadeiro(preencher.valor_bruto(n, [ctx]))
        if definir(d, n, novo):
            caso(f"inverte {n} em {m}", d, m, inteiro=False, delta={"base": m, "definir": {n: novo}})
    for i in range(4 if len(conds) > 3 else 0):
        d = copy.deepcopy(base)
        escolha = sorteio.sample(conds, sorteio.randint(2, min(5, len(conds))))
        novos = {n: not preencher.verdadeiro(preencher.valor_bruto(n, [ctx])) for n in escolha}
        if all(definir(d, n, v) for n, v in novos.items()):
            caso(f"sorteio {i} em {m}: {', '.join(escolha)}", d, m, inteiro=False, delta={"base": m, "definir": novos})

# ---------------------------------------------------------------- 4. modelos sintéticos (sintaxe e bordas do Python)
SINTAXE = """@origem modelo de teste
%% comentário com {variavel_no_comentario}
@cabecalho

# TÍTULO {#a}COM A{/a}{^a}SEM A{/a} {x|maiusculas}
segunda linha do título

> Processo nº {processo}
> Valor: {valor|minusculas}

::: EMENTA {y|cap} {acento|cap}

Texto com **negrito {n}** e {b} e {f} e {f2} e {z} e {lst} e {d} e {html}. {§cl} fora da cláusula.

{#zero}não sai{/zero}{^zero}zero é falso{/zero}; {#vazio_lista}não{/vazio_lista}{^obj_vazio}objeto vazio é falso{/obj_vazio}; {#txt0}"0" é verdadeiro{/txt0}; {#embrulhado}embrulhado falso não sai{/embrulhado}{^embrulhado}embrulhado falso{/embrulhado}

## CLÁUSULA {§cl} – PRIMEIRA ({§sec})

{§} Item.

{§§@sub} Subitem.

{§§§} Sub-sub.

{§§§§} Nível quatro.

{§§§§} Nível quatro de novo.

{§§} Subitem dois (zera os de baixo).

{#a}{§} Ver {§ref@sub} e {§ref@depois}.
{/a}## CLÁUSULA {§cl} – COLADA NO FIM DA VARIANTE

{§@depois} Depois: {w}.

| Nº | Nome | Ativo |
|---|---|---|
{*itens}| {._n} | {._letra}) {.nome|maiusculas} | {#.ativo}sim{/.ativo}{^.ativo}não{/.ativo} |
{/itens}

{*escalares}> {._letra}) item {._n}
{/escalares}

{*grupos}{§} Grupo {.nome}: {*.membros}{.nome} ({._n}){/.membros}.

{/grupos}%% comentário que some
{#a}texto a{/a}%% vira comentário depois do render
{^a}não{/a}## CLÁUSULA {§cl} – DEPOIS DE VARIANTE NO INÍCIO DA LINHA

{§} {cr}

{ls}

{fim}
"""
VALORES = {
    "a": True, "x": "ação", "y": "ágil", "acento": "über", "valor": "ÇÃO", "n": 5, "b": True, "f": 2.5, "f2": 1e-7,
    "z": {"valor": 0, "sei": "77", "p": 0, "nota": ""}, "lst": [1, "a", True, None], "d": {"k": "v", "aspa": "it's", "n": None},
    "html": "<script>alert('x')</script> & \"aspas\"", "zero": 0, "vazio_lista": [], "obj_vazio": {}, "txt0": "0",
    "embrulhado": {"valor": False, "sei": "5"}, "w": "EMPRESA LTDA.",
    "processo": {"valor": "123|456", "sei": "1000001", "p": 3, "nota": "nota do processo"},
    "itens": [{"nome": "ção", "ativo": True}, {"nome": "b", "ativo": 0}, {"nome": "c", "ativo": {"valor": True}}],
    "escalares": ["p", "q"],
    "grupos": [{"nome": "G1", "membros": [{"nome": "m1"}, {"nome": "m2"}]}, {"nome": "G2", "membros": [{"nome": "m3"}]}],
    "cr": "antes\r%% não é comentário (\\r não abre linha no Python)\u2028## nem cláusula",
    "ls": "x\u2029%% também fica",
    "fim": "fim\ufeff\x1c\x85 ",
}
caso("sintaxe completa", VALORES, fonte=SINTAXE, arquivo="sint-sintaxe")
caso("sintaxe: variante a falsa", {**VALORES, "a": False}, fonte=SINTAXE, arquivo="sint-sintaxe")
caso("sintaxe: lista vazia e lista interna vazia", {**VALORES, "itens": [], "grupos": [{"nome": "G", "membros": []}]},
     fonte=SINTAXE, arquivo="sint-sintaxe")
caso("sintaxe: lista embrulhada em valor não é lista", {**VALORES, "itens": {"valor": [{"nome": "x", "ativo": True}]}},
     fonte=SINTAXE, arquivo="sint-sintaxe")
SIMPLES = "# T\n\n{§} {v}\n"
caso("{.} numa lista de textos (no Python não acha o item)", {"l": ["a"]}, fonte="{*l}{.}{/l}\n", arquivo="sint-ponto")
caso("filtro desconhecido", {"v": "x"}, fonte="{v|titulo}\n", arquivo="sint-filtro")
caso("fecho sem abertura", {"v": "x"}, fonte="{v}{/v}\n", arquivo="sint-fecho")
caso("bloco não fechado", {"v": "x"}, fonte="{#v}{v}\n", arquivo="sint-aberto")
caso("referência a item excluído", {"v": False}, fonte="## C\n\n{#v}{§@r} A.{/v}\n\n{§} Ver {§ref@r}.\n", arquivo="sint-ref")
caso("cálculo desconhecido", {"v": "x"}, fonte="@calcula nada\n" + SIMPLES, arquivo="sint-calc")
caso("@padrao com alvo pontuado não preenche o caminho", {}, fonte="@padrao a.b=cfc.nome\n{a.b}\n", arquivo="sint-padrao")
caso("@padrao sem origem", {}, fonte="@padrao a=nao.existe\n{a.nome}\n", arquivo="sint-padrao2")
caso("@padrao com valor vazio nos dados não completa", {"autoridade": ""},
     fonte="@padrao autoridade=autoridades.vp_gestao\n{autoridade.nome}\n", arquivo="sint-padrao3")
caso("@requer com objeto", {"modo": {"a": 1}}, fonte="@requer modo=x\n" + SIMPLES, arquivo="sint-requer")
caso("@requer: dois requisitos, falha o segundo", {"modo": "x", "tipo": True}, fonte="@requer modo=x\n@requer tipo=y\n" + SIMPLES,
     arquivo="sint-requer2")
caso("@requer com sufixo que existe", {"regime": "8666"}, fonte="@requer regime=14133\n" + SIMPLES, arquivo="termo-aditivo-prorrogacao")
caso("CRLF no modelo", {"v": "x"}, fonte="# T\r\n\r\n{§} {v}\r\n\r\n> a\r\n> b\r\n", arquivo="sint-crlf")
caso("diretiva na última linha sem \\n fica no texto", {"v": "x"}, fonte="{v}\n@origem fim", arquivo="sint-diretiva")
caso("valor numa variável de lista", {"l": ["a", "b"], "v": "x"}, fonte="{l} {v}\n", arquivo="sint-lista-valor")

# ---------------------------------------------------------------- 5. lista, formulário e calculos.py
lista = []
for nome, titulo, origem in preencher.listar_templates():
    req = re.findall(r"^@requer (\S+)=(\S+)$", (TPL / f"{nome}.md").read_text(encoding="utf-8"), re.M)
    lista.append({"id": nome, "nome": titulo, "origem": origem, **({"requer": dict(req)} if req else {})})
formularios = {m: [list(v) for v in preencher.formulario(m)] for m in MODELOS}


def tentar(f, *a):
    try:
        return f(*a)
    except ValueError as e:
        return {"erro": str(e)}


extensos = ["0", "0.01", "0.5", "0.99", "1", "1.01", "2", "10", "15", "20", "21", "99", "100", "101", "110", "199", "200",
            "999", "1000", "1001", "1010", "1100", "1101", "1999", "2000", "10000", "100000", "100100", "999999.99",
            "1000000", "1000001", "1000100", "1001000", "1100000", "2000000", "2000000.01", "1000000000", "1000000001",
            "1001000000", "2500000000.5", "999999999999.99", "0.004", "0.005", "1.995"]
extensos += [str(Decimal(sorteio.randint(0, 10 ** sorteio.randint(1, 14))) / 100) for _ in range(400)]
reais = ["54.368,53", "R$ 8.469,89", "R$8.469,89", " 1,00 ", "0,01", "1234,56", "1.234,56", "12.34,56", "54368.53",
         "1.234", "", "abc", "1.234,5", "-1,00", "1.234.567,89"]
pcts = ["4,641330%", "4,64133", "5", "0", "0,0", "100", "99,99", "4.64", "abc", " 3,5 % ", "3,5%%", "0,0000001"]
reajustes = []
for _ in range(400):
    valor = calculos.fmt_brl(Decimal(sorteio.randint(1, 10 ** sorteio.randint(1, 11))) / 100)
    casas = sorteio.choice([0, 1, 2, 4, 6, 8, 12, 20, 30])
    p = f"{sorteio.randint(0, 99)}" + (f",{sorteio.randint(0, 10 ** casas - 1):0{casas}d}" if casas else "")
    reajustes.append([valor, p])
reajustes += [["54.368,53", "4,641330%"], ["8.469,89", "4,641330"], ["100,00", "0,005"], ["100,00", "0,015"],
              ["0,01", "50"], ["999.999.999,99", "99,9999999999999999999999999999999"],
              ["123.456.789,01", "0,0000000000000000000000000000001"], ["1,00", "100"]]


def reajuste(valor, p):
    v, pc = calculos.brl(valor), calculos.pct(p)
    return [calculos.fmt_brl(calculos.reajustar(v, pc)), str((1 + pc / 100).normalize())]


ordinais = [1, 2, 10, 11, 19, 20, 21, 0, -1, "3", " 4 ", "+5", "1_0", "x", "3.0", True, {"valor": 7, "sei": "1"}, {"valor": "y"}]
datas = ["01/01/2026", "1/1/2026", "31/12/1999", "29/02/2023", "29/02/2024", "00/01/2026", "01/13/2026", "01/01/0000",
         "15/08/0999", " 05/05/2025 ", "2026-01-01", "", {"valor": "02/02/2022", "sei": "1"}, None]
calc = {
    "extenso": [[x, calculos.extenso(Decimal(x))] for x in extensos],
    "brl": [[x, tentar(lambda s: calculos.fmt_brl(calculos.brl(s)), x)] for x in reais],
    "pct": [[x, tentar(lambda s: str(calculos.pct(s)), x)] for x in pcts],
    "reajuste": [[v, p, tentar(reajuste, v, p)] for v, p in reajustes],
    "ordinal": [[x, tentar(calculos.ordinal_masculino, x)] for x in ordinais],
    "data_extenso": [[x, tentar(calculos.data_extenso, x)] for x in datas],
}

origem = subprocess.run(["git", "-C", str(SKILL), "log", "-1", "--format=%h %ad", "--date=short"],
                        capture_output=True, text=True).stdout.strip() or "sem git"
SAIDA.write_text(json.dumps({"_leia": "GERADO por gelic/tests/paridade/gerar_modelos.py a partir do preencher.py da skill gelic. NAO EDITE.",
                             "origem": origem, "lista": lista, "formularios": formularios, "calculos": calc, "casos": casos},
                            ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
erros = sum("erro" in c for c in casos)
print(f"{len(casos)} casos ({len(casos) - erros} documentos, {erros} recusas) em {SAIDA}")
