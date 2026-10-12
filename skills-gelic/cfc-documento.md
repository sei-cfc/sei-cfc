---
name: cfc-documento
description: Use quando o usuário pedir uma peça do demandante pelo modelo do CFC — DFD, termos de cientificação, mapa comparativo de preços ou despacho de envio à Gerência de Licitações — pelo chat. O botão "Gerar documento" do selo abre o formulário da peça, sem o agente. O texto fixo é o do modelo; a extensão preenche e confere os campos, e nada é gravado sem aprovação.
---

# Peça do demandante por modelo (CFC)

Se o usuário pediu a peça pelo chat, ofereça antes o formulário: "Gerar documento" no selo abre a janela da
peça. Siga por aqui só se ele preferir a conversa.

O texto fixo é do modelo e **nunca se edita**: você não redige o documento nem reescreve o HTML. Não leia
os documentos você mesmo: a extensão faz isso. ETP e TR são feitos no Compras.gov.br (no SEI entra o PDF exportado de
lá) e mapa de riscos não tem modelo: ajude com o que o usuário pedir, sem `cfc_modelo_analisar`.

1. `cfc_modelo_analisar {processo, modelo, observacoes?, dados?}`. `observacoes` = o que o usuário contou
   da demanda; `dados` = valores que ele já deu (ex.: `{"via": "pregao", "valor_estimado": "12.345,67"}`).
   A extensão preenche o que sai do PCA e da árvore e copia das peças anteriores (DFD, ETP, mapa, TR)
   objeto, justificativa, itens e valor.
2. Mostre a `folha` (campo = valor [fonte, SEI]) e os `avisos`. Destaque o "redigido pela IA: valide". Se `faltando` não estiver vazio, pergunte esses campos com `perguntar` (as `opcoes`, quando
   houver). Nunca invente valor.
3. Tipo no SEI: `tipo_sei.tipo` é "a confirmar". Sugira `tipo_sei.nomeArvore`, confira com
   `sei_opcoes {lista: "tipos_documento", processo, filtro: <palavra>}` e pergunte ao usuário qual tipo
   usar. Confirmado: `memoria_anotar`. **Termine a resposta** e espere o "ok".
4. Depois do "ok": `cfc_documento_gravar {processo, modelo, tipo, nome_arvore?, dados?}`, com `dados` só
   com o que o usuário informou ou corrigiu. Campo que ele quer completar no editor: `rascunho: true`
   (sai marcado ⟦campo⟧). O cartão de aprovação aparece. Não assine.

Depois de gravar: "Criado o <tipo> SEI nº <n> (não assinado), com o texto do modelo <id>. Antes de
assinar, confira <campos redigidos pela IA / perguntados>."
Processo sigiloso: pare.
