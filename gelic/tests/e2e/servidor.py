"""SEI de mentira para o teste de ponta a ponta. Responde pela `acao` da URL:
procedimento_visualizar → www/arvore.html (árvore do SEI 4.1 da fixture do núcleo, sem pastas e com
títulos de licitação); procedimento_controlar → www/controle.html (a caixa do SEI 4.1 da fixture);
procedimento_trabalhar → www/trabalhar.html (o iframe da árvore); procedimento_consultar_historico → www/historico.html
(GET e o POST do formulário, a fixture do núcleo); o resto → www/sei/controlador.php. Sempre como HTML."""
import functools, http.server, pathlib, sys
from urllib.parse import parse_qs, urlparse
PASTA = pathlib.Path(__file__).resolve().parent / "www"
ROTAS = {"procedimento_visualizar": "arvore.html", "procedimento_controlar": "controle.html", "procedimento_trabalhar": "trabalhar.html",
         "procedimento_consultar_historico": "historico.html"}
class H(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path): return "text/html; charset=utf-8"
    def log_message(self, *a): pass
    def log_error(self, *a): pass
    def translate_path(self, path):
        acao = parse_qs(urlparse(path).query).get("acao", [""])[0]
        return str(PASTA / ROTAS[acao]) if acao in ROTAS else super().translate_path(path)
    # O histórico completo é um POST do formulário (hdnTipoHistorico): responde a mesma página.
    def do_POST(self):
        self.rfile.read(int(self.headers.get("Content-Length", 0)))
        self.do_GET()
class Servidor(http.server.ThreadingHTTPServer):
    # Imagens da fixture que não existem (404) e o navegador fechando a conexão não são erro do teste.
    def handle_error(self, request, client_address): pass
Servidor(("127.0.0.1", int(sys.argv[1])), functools.partial(H, directory=str(PASTA))).serve_forever()
