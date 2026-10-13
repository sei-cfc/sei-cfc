"""SEI de mentira para o teste de ponta a ponta. Responde pela `acao` da URL:
procedimento_visualizar → www/arvore.html (árvore do SEI 4.1 da fixture do núcleo, sem pastas e com
títulos de licitação); procedimento_controlar → www/controle.html (a caixa do SEI 4.1 da fixture);
procedimento_trabalhar → www/trabalhar.html (o iframe da árvore); procedimento_consultar_historico → www/historico.html
(GET e o POST do formulário, a fixture do núcleo); procedimento_escolher_tipo → www/escolher_tipo.html (formato do SEI
do CFC) e, no POST com o tipo escolhido, www/cadastro.html (tipo sem assunto sugerido); o autocompletar de assuntos
(controlador_ajax.php?acao_ajax=assunto_auto_completar…) → o XML dos ASSUNTOS que contêm o texto; o resto →
www/sei/controlador.php. Sempre como HTML; as telas novas em ISO-8859-1, como o SEI (o núcleo lê assim)."""
import functools, http.server, pathlib, sys
from urllib.parse import parse_qs, urlparse
PASTA = pathlib.Path(__file__).resolve().parent / "www"
ROTAS = {"procedimento_visualizar": "arvore.html", "procedimento_controlar": "controle.html", "procedimento_trabalhar": "trabalhar.html",
         "procedimento_consultar_historico": "historico.html", "procedimento_escolher_tipo": "escolher_tipo.html"}
# Assuntos fictícios do autocompletar (o formato do SEI: <item id descricao>)
ASSUNTOS = [("4220", "CFP.422 - APOIO A CURSOS E EVENTOS"), ("4230", "CFP.423 - APOIO A PUBLICAÇÕES"), ("1010", "ADM.101 - AQUISIÇÃO DE MATERIAL")]
class H(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path): return "text/html; charset=utf-8"
    def log_message(self, *a): pass
    def log_error(self, *a): pass
    def translate_path(self, path):
        acao = parse_qs(urlparse(path).query).get("acao", [""])[0]
        return str(PASTA / ROTAS[acao]) if acao in ROTAS else super().translate_path(path)
    # O histórico completo é um POST do formulário (hdnTipoHistorico): responde a mesma página.
    def do_POST(self):
        corpo = parse_qs(self.rfile.read(int(self.headers.get("Content-Length", 0))).decode("latin-1"), encoding="latin-1")
        q = parse_qs(urlparse(self.path).query)
        if q.get("acao_ajax", [""])[0].startswith("assunto_auto_completar"):
            termo = corpo.get("palavras_pesquisa", [""])[0].lower()
            itens = "".join(f'<item id="{i}" descricao="{d}"></item>' for i, d in ASSUNTOS if termo in d.lower())
            return self.responder(f"<?xml version='1.0' encoding='iso-8859-1'?><itens>{itens}</itens>".encode("latin-1"))
        if q.get("acao", [""])[0] == "procedimento_escolher_tipo" and corpo.get("hdnIdTipoProcedimento", [""])[0]:
            return self.responder((PASTA / "cadastro.html").read_bytes())
        self.do_GET()
    def responder(self, b):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=iso-8859-1")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)
class Servidor(http.server.ThreadingHTTPServer):
    # Imagens da fixture que não existem (404) e o navegador fechando a conexão não são erro do teste.
    def handle_error(self, request, client_address): pass
Servidor(("127.0.0.1", int(sys.argv[1])), functools.partial(H, directory=str(PASTA))).serve_forever()
