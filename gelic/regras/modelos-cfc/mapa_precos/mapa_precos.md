%% Modelo Mapa de preços (MCP + Justificativa de preços) do Gera CFC — Quick 261003-k9t.
%% Mantido no SEI Pro CFC desde 2026-10-10: a justificativa da pesquisa (seção 4) fica abaixo da tabela das
%% contratações pesquisadas, e não vira documento próprio na árvore (decisão do usuário).
%% Fonte do texto fixo: Mapa Comparativo de Preços, SEI 0000000, e Justificativa de Preços do
%% MCP, SEI 0000000 (anonimizados em `.planning/gera/notes/2026-10-03-processo-000000-0000/
%% 038_0000000.txt` e `039_0000000.txt`).
%% Decisão (CONTEXT LOCKED): 3 referências pesquisadas fixas ("fonte_1_"/"fonte_2_"/
%% "fonte_3_", mesmo número do processo real) + a proposta do fornecedor. Total/média/mediana
%% são calculados por `apps.gera.motor.calculos.estatistica_mcp` (`@calcula` abaixo), nunca
%% digitados — "media_fmt"/"mediana_fmt"/"economia_pct_fmt" são variáveis DERIVADAS do cálculo,
%% não perguntas de `mapa_precos.yaml`.

@cabecalho

# MAPA COMPARATIVO DE PREÇOS

@calcula estatistica_mcp:fonte_1_valor_unitario,fonte_2_valor_unitario,fonte_3_valor_unitario

## 1. Objeto

{objeto}

## 2. Proposta apresentada

Empresa: {proposta_instituicao}.

Valor global estimado: R$ {proposta_valor_global}, considerando {quantidade_estimada}.

Valor unitário: R$ {proposta_valor_unitario}.

## 3. Contratações pesquisadas (Portal Nacional de Contratações Públicas)

| Referência | Objeto | Valor unitário |
| --- | --- | --- |
| {fonte_1_instituicao} | {fonte_1_objeto} | R$ {fonte_1_valor_unitario} |
| {fonte_2_instituicao} | {fonte_2_objeto} | R$ {fonte_2_valor_unitario} |
| {fonte_3_instituicao} | {fonte_3_objeto} | R$ {fonte_3_valor_unitario} |

## 4. Pesquisa de preços e pertinência das referências

{justificativa_pesquisa}

## 5. Comparação dos valores

Os valores pesquisados resultam na média de R$ {media_fmt} e na mediana de R$ {mediana_fmt}. O preço completo proposto, de R$ {proposta_valor_unitario} por unidade, é aproximadamente {economia_pct_fmt}% inferior à média pesquisada.

## 6. Conclusão

{conclusao}

## 7. Previsão orçamentária e adequação da proposta

{*projetos_contas}Declaramos que o custeio da presente contratação está previsto no {.projeto}.
{/projetos_contas}

Declaramos, ainda, que as especificações da proposta apresentada foram analisadas e atendem aos requisitos do Termo de Referência da contratação.

Elaboração do mapa comparativo:

{*equipe_planejamento}{.nome}
{/equipe_planejamento}
