---
name: gelic-analisar-processo
description: Use quando o usuário pedir "analise este processo", "confere essa prorrogação", "verifica a instrução", "compara ETP e TR" num processo de contratação do CFC. A extensão lê os autos, aplica o check-list da Gelic em código e faz uma chamada única ao modelo (gelic_dvi_analisar com pedido "analise"); você entrega no chat os achados [I]/[R] com nº SEI e item e o próximo passo. Só leitura — nunca escreve no SEI.
---

# Analisar processo (Gelic)

1. `gelic_dvi_analisar {processo, pedido: "analise"}` (o que o usuário pediu para olhar vai em `observacoes`).
   Não leia os documentos você mesmo.
2. Mostre `resumo` e `paraOChat` como vieram; liste `pacote.documentosNaoLidos` se houver; com `erros`, diga que
   a análise tem pontos a corrigir.
3. Feche com o próximo passo: o `formato` indicado (DVI, devolução ou despacho à Gecont) e a oferta de gerar o
   documento (skill gelic-gerar-dvi: os mesmos achados, sem nova análise).

Não escreva no SEI. Não trate como falha o que é de etapa posterior; não entre no mérito técnico.
