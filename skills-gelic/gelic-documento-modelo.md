---
name: gelic-documento-modelo
description: Use quando o usuário pedir um documento da Gelic que sai de modelo — autorização de contratação direta, aviso de dispensa eletrônica, contrato (PROJUR ou AGU), edital ou ata (AGU), termo aditivo (prorrogação, acréscimo/supressão), apostilamento de reajuste, termo de extinção, despacho à Projur ou de abertura de PAR — inclusive pelo botão "Gerar documento" do selo. O texto fixo é o do modelo; a extensão preenche e confere as variáveis, e nada é gravado sem aprovação.
---

# Documento por modelo (Gelic)

O texto fixo é do modelo (Projur, AGU, CFC) e **nunca se edita**: você não redige, não resume, não
"melhora" nem reescreve o HTML. Não leia os documentos você mesmo: a extensão faz isso.

1. Só se o modelo não veio do selo ou parece não casar com a etapa: `gelic_etapa {processo}`. Se a
   etapa aponta outro modelo, diga em uma linha e siga só se o usuário confirmar.
2. `gelic_modelo_analisar {processo, modelo, observacoes?, dados?}`: a extensão preenche o que sai da
   árvore e das contas, lê só as peças-fonte e faz uma chamada ao modelo para o resto; confere cada
   valor no documento citado. `dados` = o que o usuário já informou (chave com ponto).
3. Mostre a `folha` (variável = valor [fonte, SEI]), os `avisos` e, se `faltando` não estiver vazio,
   pergunte esses valores ao usuário com `perguntar` (as `opcoes`, quando houver). Nunca invente valor.
   **Termine a resposta** e espere o "ok".
4. Tipo no SEI: `tipo_sei` do resultado, conferido com `sei_opcoes {lista: "tipos_documento",
   processo, filtro: <tipo>}`. Havendo mais de um (ex.: "Autorização de Contratação Direta - Inex -
   NLL" e "... - Dispensa - NLL"), escolha o que corresponde à folha (inexigibilidade × dispensa) e
   diga qual; não existindo, pergunte. Convenção nova confirmada: `memoria_anotar`.
5. Depois do "ok": `gelic_documento_gravar {processo, modelo, tipo, nome_arvore?, dados?}` com `dados`
   só com o que o usuário informou ou corrigiu (ex.: `{"contratacao.numero": "383500-27/2026"}`), ou
   sem `dados`. A ferramenta monta de novo e grava; o cartão de aprovação aparece. Não assine.

Usuário corrigiu um valor da folha: passe-o em `dados` no gravar (as contas, como o extenso, são
refeitas). Marcadores como `[PESSOA_1]` ficam como chegaram. Processo sigiloso: informe e pare.

Depois de gravar: "Criado o <tipo> SEI nº <n> (não assinado), com o texto do modelo <id>. Antes de
assinar, confira <valores da IA marcados para validar / perguntados>."
