---
name: gelic-proxima-etapa
description: Use quando o usuário perguntar "em que pé está este processo?", "qual o próximo passo?", "o que a Gelic tem de fazer aqui?" num processo de contratação do CFC. Chama gelic_etapa e explica em linguagem simples onde o processo está, quais documentos decidiram isso, qual é o próximo passo e o documento que ele implica, e oferece (sem executar) as ações seguintes. Só leitura.
---

# Próxima etapa (Gelic)

Explique a etapa calculada pela ferramenta; não a calcule você. Esta skill **só lê**. As ações que
você oferecer só acontecem se o usuário pedir, e toda escrita passa pelo cartão de aprovação.

## Passos

1. `contexto_tela` → protocolo do processo aberto (se não houver processo aberto, peça ao usuário
   para abrir um). Processo sigiloso é recusado pelo sistema: informe e pare.
2. `gelic_etapa {processo}`. Use o que ela devolve:
   - `etapa` e `descricao` → onde o processo está;
   - `documentosChave` → os documentos que decidiram (título e nº SEI), na ordem;
   - `proximo` → `template` (documento por modelo), `acao` (o que fazer, sem documento) ou `opcoes`
     (a ferramenta não conseguiu decidir pelos títulos: há escolhas);
   - `aConferir` → fatos que a regra não firmou; mostre-os como "a conferir".
3. Para traduzir o id da etapa e o nome do modelo em linguagem simples, use a tabela de etapas do
   `gelic-rito` (`skill_ler gelic-rito`, uma vez por conversa).
4. Não leia o conteúdo dos documentos, salvo se o usuário perguntar algo que só o conteúdo responde.
   Se ele contestar a etapa ("mas o DVI já foi respondido"), confira na árvore com
   `documentos_listar` e relate a divergência com os nºs SEI e os títulos. **Não substitua a etapa da
   ferramenta**; explique que ela se baseia nos títulos e na ordem dos documentos e diga qual título
   faria a regra reconhecer a peça (ver tabela de títulos do `gelic-rito`).
5. Responda no formato abaixo e pare.

## Como explicar cada tipo de próximo passo

- **Análise/DVI** (`preparatoria_analise`, `alteracao_analise`): a Gelic verifica a instrução e emite
  o DVI. Ofereça: verificação rápida (`gelic-verificar-pendencias`), análise completa
  (`gelic-analisar-processo`) e geração do DVI (`gelic-gerar-dvi`).
- **Reexame** (`preparatoria_reexame`, `alteracao_reexame`): chegaram documentos depois do DVI; a
  Gelic reexamina e emite devolução (se restar impeditivo) ou despacho à Gecont. Ofereça a análise e o
  `gelic-gerar-dvi`. Se o único documento novo for da própria Gelic, aponte isso.
- **Aguardar** (`*_aguarda_unidade`, `aguarda_parecer`, `dispensa_em_andamento`,
  `licitacao_em_andamento`): não há ação da Gelic agora. Ofereça registrar acompanhamento com
  `processo_marcador` ou `processo_anotacao` (escrita, com aprovação).
- **Documento por modelo** (termo aditivo, apostilamento, contrato, ata, aviso, autorização, despacho
  à Projur, termo de extinção): diga o nome do modelo. O texto fixo é da Projur (Portaria PRES CFC
  233/2025) ou da AGU adaptado ao CFC; enquanto o agente não tiver a ferramenta de modelos, não
  redija esse documento de memória — diga que ele deve sair do modelo oficial.
- **Ação sem modelo** (pedir empenho, publicar extrato, enviar minuta à Projur): diga a ação e que o
  despacho é redigido à mão; ofereça ajudar a redigir se o usuário quiser (escrita com aprovação).
- **Opções** (`autorizacao`, `direta_pos_parecer`, `contrato_direta`, `contrato_licitacao`,
  `aditivo_instrumento_indefinido`, `alteracao_reexame` com apostila): liste as opções e o critério
  (ex.: valor e limites da Portaria 233 e do art. 75; compras × serviços × obras; apostila × aditivo).
  Pergunte qual se aplica; não escolha.
- **Concluído**: nada a fazer pela Gelic; arquivar ou devolver ao gestor.
- **Fora do rito / erro da ferramenta**: diga isso. Não invente etapa.

## Regras

- Linguagem simples, sem jargão do código: diga "o processo tem DVI e nenhum documento novo
  depois dele", não "nao_depois_de [*, dvi]". Mostre o id da etapa só entre parênteses.
- Nunca invente nº SEI, título ou data: use os que a ferramenta e a árvore devolvem.
- Não execute nenhuma ação oferecida sem pedido do usuário.

## Saída esperada

```
**Onde está:** <descrição em linguagem simples> (etapa `<id>`)
**Por quê:** <frase curta> — documentos que decidiram:
- <Título> (SEI <n>)
- …
**A conferir:** <fatos de aConferir, ou "—">
**Próximo passo:** <ação ou documento> — <nome legível do modelo, se houver>
[**Opções:** a) … b) … — <critério>. Qual se aplica?]
**Posso fazer agora:**
1. <oferta, ex.: verificar pendências (só leitura)>
2. <oferta, ex.: gerar o DVI — você aprova antes de qualquer escrita no SEI>
```
