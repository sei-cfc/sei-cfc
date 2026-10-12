@requer regime=14133
@fonte agu-ata-registro-precos
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# ATA DE REGISTRO DE PREÇOS

> Processo Administrativo n° {processo}
> Ata de Registro de Preços nº {ata.numero}/{ata.ano}

%% contratacao_direta: verdadeiro = ata de contratação direta (Aviso da Contratação Direta); falso = pregão eletrônico (Edital de licitação).
O(A) {cfc.nome}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o nº {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}, nomeado(a) pela Portaria nº {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matrícula Funcional nº {nomeacao.matricula}, considerando o julgamento da {^contratacao_direta}licitação na modalidade de pregão, na forma eletrônica{/contratacao_direta}{#contratacao_direta}procedimento de contratação direta{/contratacao_direta}, para REGISTRO DE PREÇOS nº {certame.numero}/{certame.ano}, publicada no {certame.publicacao_veiculo} de {certame.publicacao_data}, processo administrativo n.º {processo}, RESOLVE registrar os preços da(s) empresa(s) indicada(s) e qualificada(s) nesta ATA, de acordo com a classificação por ela(s) alcançada(s) e na(s) quantidade(s) cotada(s), atendendo as condições previstas no {^contratacao_direta}Edital de licitação{/contratacao_direta}{#contratacao_direta}Aviso da Contratação Direta{/contratacao_direta}, sujeitando-se as partes às normas constantes na Lei nº 14.133, de 1º de abril de 2021, no Decreto n.º 11.462, de 31 de março de 2023, e em conformidade com as disposições a seguir:

## {§sec}. DO OBJETO

{§} A presente Ata tem por objeto o registro de preços para a eventual contratação de {objeto_contratacao}, especificado(s) no(s) item(ns) {tr.itens} do Termo de Referência, anexo {tr.anexo} do {^contratacao_direta}edital de licitação{/contratacao_direta}{#contratacao_direta}aviso da contratação direta{/contratacao_direta} n.º {certame.numero}/{certame.ano}, que é parte integrante desta Ata, assim como as propostas cujos preços tenham sido registrados, independentemente de transcrição.

## {§sec}. DOS PREÇOS, ESPECIFICAÇÕES E QUANTITATIVOS

%% Nota AGU: o preço registrado, com os fornecedores, é divulgado no PNCP durante a vigência da ata (art. 18, § 4º, Decreto 11.462/2023).
%% Nota AGU: registro sem o total a adquirir (só unidades) apenas na 1ª contratação sem demanda anterior, alimento perecível ou serviço integrado a bens (art. 82, § 3º; art. 4º do Decreto) — exige valor máximo da despesa e veda participantes.
{§} O preço registrado, as especificações do objeto, as quantidades mínimas e máximas de cada item, fornecedor(es) e as demais condições ofertadas na(s) proposta(s) são as que seguem:

%% exige_marca / exige_modelo: colunas Marca e Modelo só quando o edital/aviso as exigir.
| Item do TR | Fornecedor | Especificação |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade Máxima | Quantidade Mínima | Valor Unitário | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*itens}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/itens}

%% Nota AGU: a listagem do cadastro de reserva segue a ordem do art. 18, II e § 2º, do Decreto 11.462/2023.
{§} A listagem do cadastro de reserva referente ao presente registro de preços consta como anexo a esta Ata.

## {§sec}. ÓRGÃO(S) GERENCIADOR E PARTICIPANTE(S)

{§} O órgão gerenciador será o(a) {cfc.nome}.

%% Nota AGU: participantes vêm da IRP (mínimo de 8 dias úteis, art. 9º do Decreto 11.462/2023); sem indicação do quantitativo total (art. 4º) não pode haver participante.
{^participantes}{§} Além do gerenciador, não há órgãos e entidades públicas participantes do registro de preços.{/participantes}{#participantes}{§} Além do gerenciador, são órgãos e entidades públicas participantes do registro de preços:

| Item nº | Órgãos Participantes | Unidade | Quantidade |
|---|---|---|---|
{*participantes}| {.item} | {.orgao} | {.unidade} | {.quantidade} |
{/participantes}{/participantes}

## {§sec}. DA ADESÃO À ATA DE REGISTRO DE PREÇOS

%% Nota AGU: vedar a adesão exige justificativa nos ETP (ex.: registro sem quantitativo total, art. 4º, parágrafo único; capacidade de gerenciamento, art. 7º, I e XI, do Decreto 11.462/2023).
{^adesao}{§} Não será admitida a adesão à ata de registro de preços decorrente desta licitação ou desta contratação direta, conforme justificativa apresentada nos estudos técnicos preliminares.{/adesao}{#adesao}{§@adesao_requisitos} Durante a vigência da ata, os órgãos e as entidades da Administração Pública federal, estadual, distrital e municipal que não participaram do procedimento de IRP poderão aderir à ata de registro de preços na condição de não participantes, observados os seguintes requisitos:

{§§} apresentação de justificativa da vantagem da adesão, inclusive em situações de provável desabastecimento ou descontinuidade de serviço público;

{§§} demonstração de que os valores registrados estão compatíveis com os valores praticados pelo mercado na forma do art. 23 da Lei nº 14.133, de 2021; e

{§§} consulta e aceitação prévias do órgão ou da entidade gerenciadora e do fornecedor.

{§} A autorização do órgão ou entidade gerenciadora apenas será realizada após a aceitação da adesão pelo fornecedor.

{§§} O órgão ou entidade gerenciadora poderá rejeitar adesões caso elas possam acarretar prejuízo à execução de seus próprios contratos ou à sua capacidade de gerenciamento.

{§} Após a autorização do órgão ou da entidade gerenciadora, o órgão ou entidade não participante deverá efetivar a aquisição ou a contratação solicitada em até noventa dias, observado o prazo de vigência da ata.

{§} O prazo de que trata o subitem anterior, relativo à efetivação da contratação, poderá ser prorrogado excepcionalmente, mediante solicitação do órgão ou da entidade não participante aceita pelo órgão ou pela entidade gerenciadora, desde que respeitado o limite temporal de vigência da ata de registro de preços.

{§} O órgão ou a entidade poderá aderir a item da ata de registro de preços da qual seja integrante, na qualidade de não participante, para aqueles itens para os quais não tenha quantitativo registrado, observados os requisitos do item {§ref@adesao_requisitos}.

> **Dos limites para as adesões**

{§} As aquisições ou contratações adicionais não poderão exceder, por órgão ou entidade, a cinquenta por cento dos quantitativos dos itens do instrumento convocatório registrados na ata de registro de preços para o gerenciador e para os participantes.

{§@adesao_limite_dobro} O quantitativo decorrente das adesões não poderá exceder, na totalidade, ao dobro do quantitativo de cada item registrado na ata de registro de preços para o gerenciador e os participantes, independentemente do número de órgãos ou entidades não participantes que aderirem à ata de registro de preços.

{§} Para aquisição emergencial de medicamentos e material de consumo médico-hospitalar por órgãos e entidades da Administração Pública federal, estadual, distrital e municipal, a adesão à ata de registro de preços gerenciada pelo Ministério da Saúde não estará sujeita ao limite previsto no item {§ref@adesao_limite_dobro}.

{§} A adesão à ata de registro de preços por órgãos e entidades da Administração Pública estadual, distrital e municipal poderá ser exigida para fins de transferências voluntárias, não ficando sujeita ao limite de que trata o item {§ref@adesao_limite_dobro}, desde que seja destinada à execução descentralizada de programa ou projeto federal e comprovada a compatibilidade dos preços registrados com os valores praticados no mercado na forma do art. 23 da Lei nº 14.133, de 2021.{/adesao}

> **Vedação a acréscimo de quantitativos**

{§} É vedado efetuar acréscimos nos quantitativos fixados na ata de registro de preços.

## {§sec}. VALIDADE, FORMALIZAÇÃO DA ATA DE REGISTRO DE PREÇOS E CADASTRO RESERVA

%% Nota AGU: o art. 84 da Lei 14.133 fixa a validade em 1 ano, prorrogável por igual período.
{§} A validade da Ata de Registro de Preços será de 1 (um) ano, contado a partir do primeiro dia útil subsequente à data de divulgação no PNCP{#ata.prorrogavel}, podendo ser prorrogada por igual período, mediante a anuência do fornecedor, desde que comprovado o preço vantajoso{/ata.prorrogavel}.

%% Nota AGU (Parecer 00075/2024/DECOR/CGU/AGU): renovar o quantitativo na prorrogação exige preço vantajoso, previsão no ato convocatório e na ata, tratamento no planejamento e termo aditivo dentro da vigência.
{§§} Em caso de prorrogação da ata, {#ata.renova_quantitativo}poderá{/ata.renova_quantitativo}{^ata.renova_quantitativo}não poderá{/ata.renova_quantitativo} ser renovado o quantitativo originalmente registrado.

{§§} O contrato decorrente da ata de registro de preços terá sua vigência estabelecida no próprio instrumento contratual e observará no momento da contratação e a cada exercício financeiro a disponibilidade de créditos orçamentários, bem como a previsão no plano plurianual, quando ultrapassar 1 (um) exercício financeiro.

{§§} Na formalização do contrato ou do instrumento substituto deverá haver a indicação da disponibilidade dos créditos orçamentários respectivos.

{§@instrumento_contratual} A contratação com os fornecedores registrados na ata será formalizada pelo órgão ou pela entidade interessada por intermédio de instrumento contratual, emissão de nota de empenho de despesa, autorização de compra ou outro instrumento hábil, conforme o art. 95 da Lei nº 14.133, de 2021.

{§§} O instrumento contratual de que trata o item {§ref@instrumento_contratual}. deverá ser assinado no prazo de validade da ata de registro de preços.

{§} Os contratos decorrentes do sistema de registro de preços poderão ser alterados, observado o art. 124 da Lei nº 14.133, de 2021.

{§} Após a homologação da licitação ou da contratação direta, deverão ser observadas as seguintes condições para formalização da ata de registro de preços:

{§§} Serão registrados na ata os preços e os quantitativos do adjudicatário, devendo ser observada a possibilidade de o licitante oferecer ou não proposta em quantitativo inferior ao máximo previsto no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contratação direta{/contratacao_direta} e se obrigar nos limites dela;

{§§@cadastro_reserva} Será incluído na ata, na forma de anexo, o registro dos licitantes ou dos fornecedores que:

{§§§@reserva_precos_iguais} Aceitarem cotar os bens, as obras ou os serviços com preços iguais aos do adjudicatário, observada a classificação da licitação; e

{§§§@reserva_proposta_original} Mantiverem sua proposta original.

{§§} Será respeitada, nas contratações, a ordem de classificação dos licitantes ou dos fornecedores registrados na ata.

{§} O registro a que se refere o item {§ref@cadastro_reserva} tem por objetivo a formação de cadastro de reserva para o caso de impossibilidade de atendimento pelo signatário da ata.

{§} Para fins da ordem de classificação, os licitantes ou fornecedores que aceitarem reduzir suas propostas para o preço do adjudicatário antecederão aqueles que mantiverem sua proposta original.

{§@habilitacao_reserva} A habilitação dos licitantes que comporão o cadastro de reserva a que se refere o item {§ref@reserva_proposta_original} somente será efetuada quando houver necessidade de contratação dos licitantes remanescentes, nas seguintes hipóteses:

{§§} Quando o licitante vencedor não assinar a ata de registro de preços, no prazo e nas condições estabelecidos no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contratação direta{/contratacao_direta}; e

%% "item 9" cita a cláusula (não um subitem): o motor só rotula itens, e as cláusulas desta ata não têm variante — número fixo como no modelo.
{§§} Quando houver o cancelamento do registro do licitante ou do registro de preços nas hipóteses previstas no item 9.

{§} O preço registrado com indicação dos licitantes e fornecedores será divulgado no PNCP e ficará disponibilizado durante a vigência da ata de registro de preços.

{§} Após a homologação da licitação ou da contratação direta, o licitante mais bem classificado ou o fornecedor, no caso da contratação direta, será convocado para assinar a ata de registro de preços, no prazo e nas condições estabelecidos no edital de licitação ou no aviso de contratação direta, sob pena de decair o direito, sem prejuízo das sanções previstas na Lei nº 14.133, de 2021.

{§§} O prazo de convocação poderá ser prorrogado 1 (uma) vez, por igual período, mediante solicitação do licitante ou fornecedor convocado, desde que apresentada dentro do prazo, devidamente justificada, e que a justificativa seja aceita pela Administração.

{§} A ata de registro de preços será assinada por meio de assinatura digital e disponibilizada no Sistema de Registro de Preços.

{§} Quando o convocado não assinar a ata de registro de preços no prazo e nas condições estabelecidos no edital ou no aviso de contratação, observando o item {§ref@habilitacao_reserva} e subitens, fica facultado à Administração convocar os licitantes remanescentes do cadastro de reserva, na ordem de classificação, para fazê-lo em igual prazo e nas condições propostas pelo primeiro classificado.

{§} Na hipótese de nenhum dos licitantes que trata o item {§ref@reserva_precos_iguais}, aceitar a contratação nos termos do item anterior, a Administração, observados o valor estimado e sua eventual atualização nos termos do {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contratação direta{/contratacao_direta}, poderá:

{§§} Convocar para negociação os demais licitantes ou fornecedores remanescentes cujos preços foram registrados sem redução, observada a ordem de classificação, com vistas à obtenção de preço melhor, mesmo que acima do preço do adjudicatário; ou

{§§} Adjudicar e firmar o contrato nas condições ofertadas pelos licitantes ou fornecedores remanescentes, atendida a ordem classificatória, quando frustrada a negociação de melhor condição.

{§} A existência de preços registrados implicará compromisso de fornecimento nas condições estabelecidas, mas não obrigará a Administração a contratar, facultada a realização de licitação específica para a aquisição pretendida, desde que devidamente justificada.

## {§sec}. ALTERAÇÃO OU ATUALIZAÇÃO DOS PREÇOS REGISTRADOS

%% Nota AGU: se o reequilíbrio se restringir a itens fornecidos em circunstâncias específicas, a ata pode prever preços distintos (art. 82, III, da Lei 14.133).
{§} Os preços registrados poderão ser alterados ou atualizados em decorrência de eventual redução dos preços praticados no mercado ou de fato que eleve o custo dos bens, das obras ou dos serviços registrados, nas seguintes situações:

{§§} Em caso de força maior, caso fortuito ou fato do príncipe ou em decorrência de fatos imprevisíveis ou previsíveis de consequências incalculáveis, que inviabilizem a execução da ata tal como pactuada, nos termos da alínea “d” do inciso II do caput do art. 124 da Lei nº 14.133, de 2021;

{§§} Em caso de criação, alteração ou extinção de quaisquer tributos ou encargos legais ou a superveniência de disposições legais, com comprovada repercussão sobre os preços registrados;

{§§} Na hipótese de previsão no edital ou no aviso de contratação direta de cláusula de reajustamento ou repactuação sobre os preços registrados, nos termos da Lei nº 14.133, de 2021.

{§§§} No caso do reajustamento, deverá ser respeitada a contagem da anualidade e o índice previstos para a contratação;

{§§§} No caso da repactuação, poderá ser a pedido do interessado, conforme critérios definidos para a contratação.

## {§sec}. NEGOCIAÇÃO DE PREÇOS REGISTRADOS

{§} Na hipótese de o preço registrado tornar-se superior ao preço praticado no mercado por motivo superveniente, o órgão ou entidade gerenciadora convocará o fornecedor para negociar a redução do preço registrado.

{§§} Caso não aceite reduzir seu preço aos valores praticados pelo mercado, o fornecedor será liberado do compromisso assumido quanto ao item registrado, sem aplicação de penalidades administrativas.

%% Nota AGU: art. 28, § 3º, do Decreto 11.462/2023 — cancelado o registro, o gerenciador pode convocar o cadastro de reserva pela ordem de classificação.
{§§} Na hipótese prevista no item anterior, o gerenciador convocará os fornecedores do cadastro de reserva, na ordem de classificação, para verificar se aceitam reduzir seus preços aos valores de mercado e não convocará os licitantes ou fornecedores que tiveram seu registro cancelado.

{§§} Se não obtiver êxito nas negociações, o órgão ou entidade gerenciadora procederá ao cancelamento da ata de registro de preços, adotando as medidas cabíveis para obtenção de contratação mais vantajosa.

{§§} Na hipótese de redução do preço registrado, o gerenciador comunicará aos órgãos e às entidades que tiverem firmado contratos decorrentes da ata de registro de preços para que avaliem a conveniência e a oportunidade de diligenciarem negociação com vistas à alteração contratual, observado o disposto no art. 124 da Lei nº 14.133, de 2021.

{§@preco_mercado_superior} Na hipótese de o preço de mercado tornar-se superior ao preço registrado e o fornecedor não poder cumprir as obrigações estabelecidas na ata, será facultado ao fornecedor requerer ao gerenciador a alteração do preço registrado, mediante comprovação de fato superveniente que supostamente o impossibilite de cumprir o compromisso.

{§§@documentacao_comprobatoria} Neste caso, o fornecedor encaminhará, juntamente com o pedido de alteração, a documentação comprobatória ou a planilha de custos que demonstre a inviabilidade do preço registrado em relação às condições inicialmente pactuadas.

{§§} Na hipótese de não comprovação da existência de fato superveniente que inviabilize o preço registrado, o pedido será indeferido pelo órgão ou entidade gerenciadora e o fornecedor deverá cumprir as obrigações estabelecidas na ata, sob pena de cancelamento do seu registro, nos termos do item {§ref@cancelamento_registro}, sem prejuízo das sanções previstas na Lei nº 14.133, de 2021, e na legislação aplicável.

{§§} Na hipótese de cancelamento do registro do fornecedor, nos termos do item anterior, o gerenciador convocará os fornecedores do cadastro de reserva, na ordem de classificação, para verificar se aceitam manter seus preços registrados, observado o disposto no item {§ref@habilitacao_reserva}.

{§§} Se não obtiver êxito nas negociações, o órgão ou entidade gerenciadora procederá ao cancelamento da ata de registro de preços, nos termos do item {§ref@cancelamento_precos}, e adotará as medidas cabíveis para a obtenção da contratação mais vantajosa.

{§§} Na hipótese de comprovação da majoração do preço de mercado que inviabilize o preço registrado, conforme previsto no item {§ref@preco_mercado_superior} e no item {§ref@documentacao_comprobatoria}, o órgão ou entidade gerenciadora atualizará o preço registrado, de acordo com a realidade dos valores praticados pelo mercado.

{§§} O órgão ou entidade gerenciadora comunicará aos órgãos e às entidades que tiverem firmado contratos decorrentes da ata de registro de preços sobre a efetiva alteração do preço registrado, para que avaliem a necessidade de alteração contratual, observado o disposto no art. 124 da Lei nº 14.133, de 2021.

## {§sec}. REMANEJAMENTO DAS QUANTIDADES REGISTRADAS NA ATA DE REGISTRO DE PREÇOS

%% Nota AGU: o remanejamento está previsto no art. 30 do Decreto 11.462/2023; para não participante valem os limites do art. 32 (50% por órgão; dobro no total).
{§} As quantidades previstas para os itens com preços registrados nas atas de registro de preços poderão ser remanejadas pelo órgão ou entidade gerenciadora entre os órgãos ou as entidades participantes e não participantes do registro de preços.

{§} O remanejamento somente poderá ser feito:

{§§} De órgão ou entidade participante para órgão ou entidade participante; ou

{§§} De órgão ou entidade participante para órgão ou entidade não participante.

{§@gerenciador_participante} O órgão ou entidade gerenciadora que tiver estimado as quantidades que pretende contratar será considerado participante para efeito do remanejamento.

{§} Na hipótese de remanejamento de órgão ou entidade participante para órgão ou entidade não participante, serão observados os limites previstos no art. 32 do Decreto nº 11.462, de 2023.

{§} Competirá ao órgão ou à entidade gerenciadora autorizar o remanejamento solicitado, com a redução do quantitativo inicialmente informado pelo órgão ou pela entidade participante, desde que haja prévia anuência do órgão ou da entidade que sofrer redução dos quantitativos informados.

{§} Caso o remanejamento seja feito entre órgãos ou entidades dos Estados, do Distrito Federal ou de Municípios distintos, caberá ao fornecedor beneficiário da ata de registro de preços, observadas as condições nela estabelecidas, optar pela aceitação ou não do fornecimento decorrente do remanejamento dos itens.

{§} Na hipótese da compra centralizada, não havendo indicação pelo órgão ou pela entidade gerenciadora, dos quantitativos dos participantes da compra centralizada, nos termos do item {§ref@gerenciador_participante}, a distribuição das quantidades para a execução descentralizada será por meio do remanejamento.

## {§sec}. CANCELAMENTO DO REGISTRO DO LICITANTE VENCEDOR E DOS PREÇOS REGISTRADOS

{§@cancelamento_registro} O registro do fornecedor será cancelado pelo gerenciador, quando o fornecedor:

{§§} Descumprir as condições da ata de registro de preços, sem motivo justificado;

{§§} Não retirar a nota de empenho, ou instrumento equivalente, no prazo estabelecido pela Administração sem justificativa razoável;

{§§} Não aceitar manter seu preço registrado, na hipótese prevista no artigo 27, § 2º, do Decreto nº 11.462, de 2023; ou

{§§} Sofrer sanção prevista nos incisos III ou IV do caput do art. 156 da Lei nº 14.133, de 2021.

{§§§} Na hipótese de aplicação de sanção prevista nos incisos III ou IV do caput do art. 156 da Lei nº 14.133, de 2021, caso a penalidade aplicada ao fornecedor não ultrapasse o prazo de vigência da ata de registro de preços, poderá o órgão ou a entidade gerenciadora, mediante decisão fundamentada, decidir pela manutenção do registro de preços, vedadas contratações derivadas da ata enquanto perdurarem os efeitos da sanção.

{§} O cancelamento de registros nas hipóteses previstas no item {§ref@cancelamento_registro} será formalizado por despacho do órgão ou da entidade gerenciadora, garantidos os princípios do contraditório e da ampla defesa.

{§} Na hipótese de cancelamento do registro do fornecedor, o órgão ou a entidade gerenciadora poderá convocar os licitantes que compõem o cadastro de reserva, observada a ordem de classificação.

{§@cancelamento_precos} O cancelamento dos preços registrados poderá ser realizado pelo gerenciador, em determinada ata de registro de preços, total ou parcialmente, nas seguintes hipóteses, desde que devidamente comprovadas e justificadas:

{§§} Por razão de interesse público;

{§§} A pedido do fornecedor, decorrente de caso fortuito ou força maior; ou

{§§} Se não houver êxito nas negociações, nas hipóteses em que o preço de mercado tornar-se superior ou inferior ao preço registrado, nos termos do artigos 26, § 3º e  27, § 4º, ambos do Decreto nº 11.462, de 2023.

## {§sec}. DAS PENALIDADES

{§} O descumprimento da Ata de Registro de Preços ensejará aplicação das penalidades estabelecidas no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contratação direta{/contratacao_direta}.

%% Nota AGU: a sanção ao remanescente só cabe se ele já assinou a ata e depois não atende à convocação (art. 45, §§ 4º e 5º, do Decreto 11.462/2023).
{§§} As sanções também se aplicam aos integrantes do cadastro de reserva no registro de preços que, convocados, não honrarem o compromisso assumido injustificadamente após terem assinado a ata.

{§} É da competência do gerenciador a aplicação das penalidades decorrentes do descumprimento do pactuado nesta ata de registro de preço (art. 7º, XIV, do Decreto nº 11.462, de 2023), exceto nas hipóteses em que o descumprimento disser respeito às contratações dos órgãos ou entidade participante, caso no qual caberá ao respectivo órgão participante a aplicação da penalidade (art. 8º, IX, do Decreto nº 11.462, de 2023).

{§} O órgão ou entidade participante deverá comunicar ao órgão gerenciador qualquer das ocorrências previstas no item {§ref@cancelamento_registro}, dada a necessidade de instauração de procedimento para cancelamento do registro do fornecedor.

## {§sec}. CONDIÇÕES GERAIS

{§} As condições gerais de execução do objeto, tais como os prazos para entrega e recebimento, as obrigações da Administração e do fornecedor registrado, penalidades e demais condições do ajuste, encontram-se definidos no Termo de Referência, anexo ao {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contratação direta{/contratacao_direta}.

%% adjudicacao_por_grupo: incluir quando houver adjudicação por preço global de grupo de itens.
{#adjudicacao_por_grupo}{§} No caso de adjudicação por preço global de grupo de itens, só será admitida a contratação de parte de itens do grupo se houver prévia pesquisa de mercado e demonstração de sua vantagem para o órgão ou a entidade.{/adjudicacao_por_grupo}

%% "e encaminhada cópia..." só quando houver órgãos participantes.
Para firmeza e validade do pactuado, a presente Ata foi lavrada em {ata.vias} ({ata.vias_extenso}) vias de igual teor, que, depois de lida e achada em ordem, vai assinada pelas partes{#participantes} e encaminhada cópia aos demais órgãos participantes{/participantes}.

> {local_data}

> **{cfc.nome|maiusculas}**
> {autoridade.nome}
> {autoridade.cargo}

{*fornecedores}> **{.razao_social|maiusculas}**
> {.representante}
> {.funcao}

{/fornecedores}
# Anexo
# Cadastro Reserva

%% Nota AGU: com preços diferentes (art. 82, III, da Lei 14.133; art. 15, III, do Decreto 11.462/2023), incluir tabela com os fornecedores e seus preços — e revisar os demais modelos.
Seguindo a ordem de classificação, segue relação de fornecedores que aceitaram cotar os itens com preços iguais ao adjudicatário:

{#cadastro_reserva.precos_iguais}| Item do TR | Fornecedor | Especificação |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade Máxima | Quantidade Mínima | Valor Unitário | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*cadastro_reserva.precos_iguais}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/cadastro_reserva.precos_iguais}{/cadastro_reserva.precos_iguais}{^cadastro_reserva.precos_iguais}> Não houve fornecedores nesta condição.{/cadastro_reserva.precos_iguais}

Seguindo a ordem de classificação, segue relação de fornecedores que mantiveram sua proposta original:

{#cadastro_reserva.proposta_original}| Item do TR | Fornecedor | Especificação |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade Máxima | Quantidade Mínima | Valor Unitário | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*cadastro_reserva.proposta_original}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/cadastro_reserva.proposta_original}{/cadastro_reserva.proposta_original}{^cadastro_reserva.proposta_original}> Não houve fornecedores nesta condição.{/cadastro_reserva.proposta_original}
