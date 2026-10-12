---
name: gelic-gerar-dvi
description: Use quando o usuário pedir "gere o DVI", "faz a devolução", "manda para a Gecont", "redige o despacho da Gelic" num processo de contratação do CFC. A extensão analisa os autos em código e numa chamada única ao modelo (gelic_dvi_analisar), decide pela regra entre DVI, devolução e despacho à Gecont, mostra o resumo e espera o "ok"; só então grava no SEI com gelic_dvi_gravar (cartão de aprovação, não assina).
---

# Gerar DVI, devolução ou despacho à Gecont (Gelic)

Você não lê os documentos nem escreve o corpo: a extensão faz isso em código. Você conversa com o usuário.

1. `gelic_dvi_analisar {processo}`. Se o usuário pediu devolução ou Gecont, passe `pedido: "devolucao"` ou
   `"gecont"`; o que ele pediu para olhar vai em `observacoes`. O formato sai da regra (sem DVI anterior desta
   etapa → DVI; com DVI anterior: impeditivo → devolução, senão → Gecont). Não contradiga.
2. Mostre `resumo` e cada linha de `paraOChat` **como vieram** (sem reescrever), mais `pacote.documentosNaoLidos`
   se houver. Com `erros`, diga que os achados ainda não passam no validador e quais.
3. Pergunte: "Confere? Posso gravar no SEI?" e **espere**. Não grave sem o "ok".
4. Correção do usuário (tirar, mudar ou acrescentar achado, objeto, remetente): edite o JSON de `achados`
   (mesmo esquema; cite "SEI n" e item, nunca página; não invente SEI, valor nem data) e mostre o que mudou.
5. "ok" → `gelic_dvi_gravar {processo}` (ou `{processo, achados}` com o JSON corrigido). O cartão de aprovação
   mostra a prévia. Se o validador recusar, mostre os erros e volte ao passo 4.

Convenções da Gelic (o código já aplica; confirme só o tipo):
- DVI: tipo **DVI** (tipo próprio). Despacho à Gecont: tipo **Despacho**, árvore "Solicitação Reserva Gecont".
  Devolução: tipo **Despacho**, árvore "Devolução para Ajustes".
- Se o SEI da unidade usar outro nome de tipo (confira com `sei_opcoes {lista: "tipos_documento", processo}`
  quando o gravar falhar por tipo), passe `tipo` exato; nunca invente.
- Endereçamento à unidade que encaminhou ("À Gerência de …"), nunca à pessoa; tabelas Item | Constatação |
  Recomendação; a fundamentação não conferida e as limitações vão ao chat, nunca ao documento.

Depois: "Criado o <tipo> SEI nº <n> (não assinado)." Não assine.
