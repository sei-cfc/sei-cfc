%% Modelo DFD (Documento de Formalização de Demanda) do Gera CFC — Fase 43 Plan 03.
%% Fonte do texto fixo: DFD 2026 preenchido, SEI 0000000 (anonimizado em
%% 43-DFD-REFERENCIA-SEI-0000000.txt), modelo em branco SEI 0000000 (D-01).
%% Decisão de arquitetura (D-01/D-14/D-16/D-17 da Fase 43): "valor_estimado_fmt"/
%% "valor_estimado_extenso" (item 4) e "data_pretendida_extenso" (item 5) são
%% calculados por QUEM MONTA o ctx (apps/gera/documentos, Plan 04), reaproveitando
%% calculos.brl/fmt_brl/extenso/data_extenso do motor — NÃO via @calcula genérico
%% novo, para não acrescentar uma diretiva ao motor só para estes dois casos
%% isolados (preencher.py da Plan 01 já cobre @calcula numerar_paragrafos, que
%% segue sendo o único @calcula deste modelo). "prioridade_baixo"/"_medio"/"_alto"
%% (item 6), "portaria_pca"/"ano_exercicio" (item 8) e "contratacao_direta"
%% (trecho após o item 1) são booleanos/strings igualmente montados por quem
%% chama o motor, a partir de grau_prioridade/processo_pca/via (Contratacao).
%% O bloco "@cabecalho" (linha literal, sem chaves) é um marcador para
%% para_html: sobrevive à renderização em texto puro e só ganha o timbre do
%% CFC (nome/endereço/telefone) quando convertido para HTML — por isso o golden
%% test (D-01) não traz o timbre: ele não existe no texto puro, só na prévia.
%% "vinculacao" (item 7) e "autoridade_nome"/"autoridade_cargo" (assinaturas)
%% também são montados por quem chama o motor, SEM `@padrao`: a diretiva
%% `@padrao ALVO=origem` faz `formulario_variaveis()` excluir ALVO da lista de
%% variáveis do formulário (tratado como valor sempre derivável), o que
%% esconderia "vinculacao"/"autoridade_nome" do formulário dinâmico da Plan 05
%% mesmo sendo perguntas reais de `dfd.yaml` — por isso o padrão "Não se
%% aplica" (vinculacao) e o nome/cargo das constantes (autoridade) são
%% aplicados no `ctx` antes de chamar `preencher_texto`, não no `.md`.
%% Quick 261003-k9t (03/10/2026, CONTEXT LOCKED) — o item 8 passou a exigir "item_pca" (nº do
%% item do PCA, lido de `Processo.item_pca`) e perdeu o ramo "não consta do PCA": sem
%% contratação vinculada, "item_pca"/"ano_exercicio"/"portaria_pca" saem ⟦...⟧ (pendência
%% obrigatória; a faixa RASCUNHO já existente cobre o aviso), nunca uma frase alternativa.

@cabecalho

Área Requisitante ou Técnica: {area_nome}
Responsável pela Demanda: {responsavel_nome}
E-mail: {responsavel_email}  |  Matrícula: {responsavel_matricula}

# DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA

@calcula numerar_paragrafos:justificativa

## 1. Justificativa da necessidade da contratação, considerando o Planejamento Estratégico:

{justificativa}

{#contratacao_direta}

## Fundamento da contratação direta:

{fundamento_contratacao_direta}

{/contratacao_direta}

## 2. Descrição sucinta do objeto:

{objeto}

## 3. Quantidade a ser contratada, quando couber, considerada a expectativa de consumo anual:

| ITEM | Descrição | Unidade | Quantidade | Período |
| --- | --- | --- | --- | --- |
{*itens}| {._n} | {.descricao} | {.unidade_medida} | {.quantidade} | {vigencia_meses} meses |
{/itens}

## 4. Estimativa preliminar do valor da contratação, por meio de procedimento simplificado:

O valor preliminar estimado para a contratação é de R$ {valor_estimado_fmt} ({valor_estimado_extenso}).

## 5. Indicação da data pretendida para a conclusão da contratação, a fim de não gerar prejuízos ou descontinuidade das atividades da instituição:

{data_pretendida_extenso}

## 6. Grau de prioridade da compra ou da contratação:

( {#prioridade_baixo}X {/prioridade_baixo}{^prioridade_baixo} {/prioridade_baixo}) Baixo   ( {#prioridade_medio}X {/prioridade_medio}{^prioridade_medio} {/prioridade_medio}) Médio   ( {#prioridade_alto}X {/prioridade_alto}{^prioridade_alto} {/prioridade_alto}) Alto

## 7. Indicação da vinculação ou dependência com o objeto de outro documento de formalização de demanda para a sua execução, com vistas a determinar a sequência em que as contratações serão realizadas:

{vinculacao}

## 8. Plano de Contratações Anual (PCA) / Plano Diretor de Tecnologia da Informação (PDTI):

Item nº {item_pca} do Plano de Contratações Anual (PCA) do CFC para o exercício de {ano_exercicio}, aprovado pela {portaria_pca}.{#pdtic} {pdtic}{/pdtic}

## 9. Projeto do Plano de Trabalho e Conta contábil:

{*projetos_contas}{.projeto}
{.conta}
{/projetos_contas}

## 10. Indicação do membro da equipe de planejamento (identificar o Integrante Requisitante, conforme o caso):

{*equipe_planejamento}{.nome}
{/equipe_planejamento}

{responsavel_nome}
Responsável pela Formalização da Demanda
Assinado eletronicamente via SEI na data consignada

De acordo. Para manifestação do {autoridade_cargo}.

{diretor_nome}
{diretor_cargo}
Assinado eletronicamente via SEI na data consignada

Autorizo a abertura do respectivo processo conforme preconiza a legislação e demais normas aplicáveis.

{autoridade_nome}
{autoridade_cargo}
Assinado eletronicamente via SEI na data consignada
