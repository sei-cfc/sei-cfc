"""PCA de mentira (https, certificado de teste) para o e2e: as rotas do contrato v1.1 com CORS para qualquer origem.
GET /api/sei/_pedidos devolve o que a extensão pediu (método, caminho, Authorization, Origin e o corpo da coleta)."""
import http.server, json, ssl, sys
from urllib.parse import urlparse, parse_qs
PEDIDOS = []
FICHAS = {}
ITEM = {"item_pca": 37, "exercicio": 2026, "descricao_objeto": "Objeto de teste", "valor_estimado": "1000.00", "unidade": "GELIC",
        "grau_prioridade": "Alto", "mes_previsto": 3, "situacao": "EM_ANDAMENTO", "situacao_rotulo": "Em andamento", "numeros_sei": [],
        "modalidade": "Dispensa Sem Disputa", "objeto": "Objeto de teste", "unidade_sigla_sei": "TESTE"}
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def cors(self):
        self.send_header("Access-Control-Allow-Origin", self.headers.get("Origin", "*"))
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    def json(self, status, corpo):
        b = json.dumps(corpo).encode()
        self.send_response(status); self.cors()
        self.send_header("Content-Type", "application/json"); self.send_header("Content-Length", str(len(b))); self.end_headers()
        self.wfile.write(b)
    def do_OPTIONS(self):
        self.send_response(200); self.cors(); self.send_header("Content-Length", "0"); self.end_headers()
    def registrar(self, corpo=None):
        u = urlparse(self.path)
        if u.path != "/api/sei/_pedidos":
            PEDIDOS.append({"metodo": self.command, "caminho": u.path, "query": u.query, "auth": self.headers.get("Authorization"),
                            "origem": self.headers.get("Origin"), "cookie": self.headers.get("Cookie"), "corpo": corpo})
        return u
    def do_GET(self):
        u = self.registrar()
        if u.path == "/pca/2026/37/":
            b = ('<!doctype html><html><head><meta charset="utf-8"><title>Item 37/2026</title></head><body>'
                 '<div class="page-header" data-item-pca="37" data-exercicio="2026"><h1>Item 37/2026</h1>'
                 '<div class="btn-list"><a class="btn btn-primary" href="/pca/2026/37/editar/">Editar</a></div></div>'
                 '</body></html>').encode()
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(b))); self.end_headers(); return self.wfile.write(b)
        if u.path == "/api/sei/_pedidos": return self.json(200, PEDIDOS)
        if self.headers.get("Authorization") != "Bearer e2e": return self.json(401, {"erro": "nao_autenticado"})
        if u.path == "/api/sei/saude": return self.json(200, {"versao": 1, "usuario": "e2e@cfc.org.br", "pode_enviar": True, "pode_instruir": True})
        if u.path == "/api/sei/processo":
            if "sei" in parse_qs(u.query): return self.json(200, {"itens": [ITEM], "ultima_coleta": None})
            q = parse_qs(u.query)
            if q.get("item") == ["37"] and q.get("exercicio") == ["2026"]: return self.json(200, {"itens": [ITEM]})
            return self.json(200, {"itens": []})
        if u.path == "/api/sei/ficha":
            q = parse_qs(u.query)
            chave = "37/2026" if "sei" in q else f'{q.get("item", [""])[0]}/{q.get("exercicio", [""])[0]}'
            if chave != "37/2026": return self.json(404, {"erro": "item_inexistente"})
            return self.json(200, FICHAS.get(chave, {"item_pca": 37, "exercicio": 2026, "versao": 0, "dados": {}, "atualizado_em": None, "atualizado_por": None}))
        self.json(404, {"erro": "rota"})
    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        corpo = json.loads(self.rfile.read(n) or b"{}")
        u = self.registrar(corpo)
        if self.headers.get("Authorization") != "Bearer e2e": return self.json(401, {"erro": "nao_autenticado"})
        if u.path == "/api/sei/vinculo": return self.json(201, {"criado": True, "item": {**ITEM, "numeros_sei": [corpo.get("numero_sei")]}})
        self.json(200, {"itens": [{"item_pca": 37, "exercicio": 2026, "alterados": {"situacao": ["EM_ANDAMENTO", "CONCLUIDO"]}, "pendencias": []}]})
    def do_PUT(self):
        n = int(self.headers.get("Content-Length", 0))
        corpo = json.loads(self.rfile.read(n) or b"{}")
        u = self.registrar(corpo)
        if self.headers.get("Authorization") != "Bearer e2e": return self.json(401, {"erro": "nao_autenticado"})
        if u.path != "/api/sei/ficha": return self.json(404, {"erro": "rota"})
        chave = f'{corpo.get("item_pca")}/{corpo.get("exercicio")}'
        atual = FICHAS.get(chave, {"item_pca": corpo.get("item_pca"), "exercicio": corpo.get("exercicio"), "versao": 0, "dados": {}, "atualizado_em": None, "atualizado_por": None})
        if corpo.get("versao") != atual["versao"]: return self.json(409, {"erro": "versao_desatualizada", "ficha": atual})
        FICHAS[chave] = {**atual, "versao": atual["versao"] + 1, "dados": corpo.get("dados"), "atualizado_em": "2026-10-11T14:32:00-03:00", "atualizado_por": "e2e@cfc.org.br"}
        self.json(200, FICHAS[chave])
srv = http.server.ThreadingHTTPServer(("127.0.0.1", int(sys.argv[1])), H)
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER); ctx.load_cert_chain(sys.argv[2], sys.argv[3])
srv.socket = ctx.wrap_socket(srv.socket, server_side=True)
srv.serve_forever()
