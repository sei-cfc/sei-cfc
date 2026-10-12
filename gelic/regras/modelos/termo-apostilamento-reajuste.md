@requer regime=14133
@fonte termo-apostilamento-reajuste
@origem modelo CFC
@padrao autoridade=autoridades.vp_gestao
@calcula apostilamento_reajuste
%% modelo CFC (14.133) — base: 3º Termo de Apostilamento ao Contrato 23/2023, SEI 1234503. Fundamento padronizado (quick 261001-ohy): art. 136, I, c/c art. 25, § 7º, e art. 92, V e § 3º. Valores reajustados, totais, extensos, ordinal e datas por extenso: calculados pelo motor (@calcula); o modelo só informa valores atuais.
%% Só reajuste por índice. Repactuação (custos) e revisão/reequilíbrio não usam este template.
@cabecalho

# TERMO DE APOSTILAMENTO

> Processo nº {processo}

> Unidade Gestora: {unidade_gestora}

::: {apostilamento.ordinal} TERMO DE APOSTILAMENTO AO CONTRATO Nº {contrato.numero} CELEBRADO ENTRE O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O CONSELHO FEDERAL DE CONTABILIDADE (CFC), entidade fiscalizadora do exercício profissional, neste ato denominado CONTRATANTE, com sede no Setor de Autarquias Sul Quadra 05, Bloco "J", Lote 03 Ed. CFC, em Brasília - DF, inscrito no CNPJ sob o nº. 33.618.570/0001-07, neste ato, representado pelo {autoridade.cargo}, {autoridade.nome}, tendo em vista o direito ao reajuste previsto na {contrato.clausula_reajuste} do Contrato nº {contrato.numero}, bem como as informações constantes do Processo CFC nº {processo}, referente ao {licitacao.origem}, resolve apostilar o Contrato nº {contrato.numero}, com fundamento no art. 136, inciso I, combinado com o art. 25, § 7º, e o art. 92, inciso V e § 3º, da Lei nº 14.133/2021, mediante as seguintes cláusulas:

## CLÁUSULA PRIMEIRA – DO REAJUSTE

{§} O presente Termo de Apostilamento tem por objeto registrar o reajuste dos valores do Contrato nº {contrato.numero}, cujo objeto consiste na {contrato.objeto}.

{§} O reajuste ora formalizado decorre da aplicação do índice previsto na {contrato.clausula_reajuste} do Contrato nº {contrato.numero}, em razão da variação acumulada do {reajuste.indice}, observado o interregno mínimo de 1 (um) ano contado da data do orçamento estimado.

{§} Considerando que o Mapa Comparativo de Preços — MCP foi datado de {reajuste.data_base_extenso}, bem como a previsão contratual de reajuste anual, o presente reajuste passa a produzir efeitos financeiros a partir de {reajuste.efeitos_extenso}.

%% "(SEI ...)" depois de "autos": inserção do template (o SEI 1234503 não cita a memória de cálculo).
{§} Conforme memória de cálculo constante dos autos (SEI {reajuste.sei}), foi aplicado o percentual de {reajuste.percentual}, correspondente à variação acumulada do {reajuste.sigla} no período de {reajuste.periodo}, nos termos da {contrato.clausula_reajuste} do Contrato nº {contrato.numero}.

{§} Em decorrência do reajuste, os valores contratuais passam a ser os seguintes:

%% Uma alínea por parcela; mensal mostra também o total anual (× 12). Valores e extensos: motor.
{*reajuste.parcelas}> {._letra}) {.descricao}:
{#.mensal}> Valor mensal atual: R$ {.valor_atual} ({.valor_atual_extenso}), totalizando R$ {.anual_atual} ({.anual_atual_extenso}) anuais.
> Novo valor mensal reajustado: R$ {.valor_reajustado} ({.valor_reajustado_extenso}), totalizando R$ {.anual_reajustado} ({.anual_reajustado_extenso}) anuais, com efeitos financeiros a partir de {reajuste.efeitos_extenso}.{/.mensal}{^.mensal}> Valor anual atual: R$ {.valor_atual} ({.valor_atual_extenso}).
> Novo valor anual reajustado: R$ {.valor_reajustado} ({.valor_reajustado_extenso}), com efeitos financeiros a partir de {reajuste.efeitos_extenso}.{/.mensal}

{/reajuste.parcelas}
%% Com uma só parcela a frase termina no total (sem "composto por").
{§} Após o reajuste, o valor total anual atualizado da contratação passa a ser de R$ {reajuste.total_anual} ({reajuste.total_anual_extenso}){#reajuste.composto}, composto por:{/reajuste.composto}{^reajuste.composto}.{/reajuste.composto}

{#reajuste.composto}{*reajuste.parcelas}> {._letra}) R$ {.anual_reajustado} referentes ao valor anual reajustado de {.descricao|minusculas}{.fim}
{/reajuste.parcelas}{/reajuste.composto}

## CLÁUSULA SEGUNDA - DA RATIFICAÇÃO DAS DEMAIS CLÁUSULAS CONTRATUAIS

{§} Ficam mantidas as demais cláusulas e condições constantes do Contrato nº {contrato.numero} e dos respectivos termos aditivos e apostilamentos anteriores, naquilo que não conflitarem com o presente Termo de Apostilamento.

E, para firmeza e validade do presente ato, lavra-se o presente Termo de Apostilamento, que será assinado eletronicamente pelo representante do CONTRATANTE.

> CONSELHO FEDERAL DE CONTABILIDADE
> {autoridade.nome}
> {autoridade.cargo}
