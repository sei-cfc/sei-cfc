/* GERADO por agente-ia/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
var e={"agu-ata-registro-precos":`@requer regime=14133
@fonte agu-ata-registro-precos
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# ATA DE REGISTRO DE PRE\xC7OS

> Processo Administrativo n\xB0 {processo}
> Ata de Registro de Pre\xE7os n\xBA {ata.numero}/{ata.ano}

%% contratacao_direta: verdadeiro = ata de contrata\xE7\xE3o direta (Aviso da Contrata\xE7\xE3o Direta); falso = preg\xE3o eletr\xF4nico (Edital de licita\xE7\xE3o).
O(A) {cfc.nome}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}, nomeado(a) pela Portaria n\xBA {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matr\xEDcula Funcional n\xBA {nomeacao.matricula}, considerando o julgamento da {^contratacao_direta}licita\xE7\xE3o na modalidade de preg\xE3o, na forma eletr\xF4nica{/contratacao_direta}{#contratacao_direta}procedimento de contrata\xE7\xE3o direta{/contratacao_direta}, para REGISTRO DE PRE\xC7OS n\xBA {certame.numero}/{certame.ano}, publicada no {certame.publicacao_veiculo} de {certame.publicacao_data}, processo administrativo n.\xBA {processo}, RESOLVE registrar os pre\xE7os da(s) empresa(s) indicada(s) e qualificada(s) nesta ATA, de acordo com a classifica\xE7\xE3o por ela(s) alcan\xE7ada(s) e na(s) quantidade(s) cotada(s), atendendo as condi\xE7\xF5es previstas no {^contratacao_direta}Edital de licita\xE7\xE3o{/contratacao_direta}{#contratacao_direta}Aviso da Contrata\xE7\xE3o Direta{/contratacao_direta}, sujeitando-se as partes \xE0s normas constantes na Lei n\xBA 14.133, de 1\xBA de abril de 2021, no Decreto n.\xBA 11.462, de 31 de mar\xE7o de 2023, e em conformidade com as disposi\xE7\xF5es a seguir:

## {\xA7sec}. DO OBJETO

{\xA7} A presente Ata tem por objeto o registro de pre\xE7os para a eventual contrata\xE7\xE3o de {objeto_contratacao}, especificado(s) no(s) item(ns) {tr.itens} do Termo de Refer\xEAncia, anexo {tr.anexo} do {^contratacao_direta}edital de licita\xE7\xE3o{/contratacao_direta}{#contratacao_direta}aviso da contrata\xE7\xE3o direta{/contratacao_direta} n.\xBA {certame.numero}/{certame.ano}, que \xE9 parte integrante desta Ata, assim como as propostas cujos pre\xE7os tenham sido registrados, independentemente de transcri\xE7\xE3o.

## {\xA7sec}. DOS PRE\xC7OS, ESPECIFICA\xC7\xD5ES E QUANTITATIVOS

%% Nota AGU: o pre\xE7o registrado, com os fornecedores, \xE9 divulgado no PNCP durante a vig\xEAncia da ata (art. 18, \xA7 4\xBA, Decreto 11.462/2023).
%% Nota AGU: registro sem o total a adquirir (s\xF3 unidades) apenas na 1\xAA contrata\xE7\xE3o sem demanda anterior, alimento perec\xEDvel ou servi\xE7o integrado a bens (art. 82, \xA7 3\xBA; art. 4\xBA do Decreto) \u2014 exige valor m\xE1ximo da despesa e veda participantes.
{\xA7} O pre\xE7o registrado, as especifica\xE7\xF5es do objeto, as quantidades m\xEDnimas e m\xE1ximas de cada item, fornecedor(es) e as demais condi\xE7\xF5es ofertadas na(s) proposta(s) s\xE3o as que seguem:

%% exige_marca / exige_modelo: colunas Marca e Modelo s\xF3 quando o edital/aviso as exigir.
| Item do TR | Fornecedor | Especifica\xE7\xE3o |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade M\xE1xima | Quantidade M\xEDnima | Valor Unit\xE1rio | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*itens}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/itens}

%% Nota AGU: a listagem do cadastro de reserva segue a ordem do art. 18, II e \xA7 2\xBA, do Decreto 11.462/2023.
{\xA7} A listagem do cadastro de reserva referente ao presente registro de pre\xE7os consta como anexo a esta Ata.

## {\xA7sec}. \xD3RG\xC3O(S) GERENCIADOR E PARTICIPANTE(S)

{\xA7} O \xF3rg\xE3o gerenciador ser\xE1 o(a) {cfc.nome}.

%% Nota AGU: participantes v\xEAm da IRP (m\xEDnimo de 8 dias \xFAteis, art. 9\xBA do Decreto 11.462/2023); sem indica\xE7\xE3o do quantitativo total (art. 4\xBA) n\xE3o pode haver participante.
{^participantes}{\xA7} Al\xE9m do gerenciador, n\xE3o h\xE1 \xF3rg\xE3os e entidades p\xFAblicas participantes do registro de pre\xE7os.{/participantes}{#participantes}{\xA7} Al\xE9m do gerenciador, s\xE3o \xF3rg\xE3os e entidades p\xFAblicas participantes do registro de pre\xE7os:

| Item n\xBA | \xD3rg\xE3os Participantes | Unidade | Quantidade |
|---|---|---|---|
{*participantes}| {.item} | {.orgao} | {.unidade} | {.quantidade} |
{/participantes}{/participantes}

## {\xA7sec}. DA ADES\xC3O \xC0 ATA DE REGISTRO DE PRE\xC7OS

%% Nota AGU: vedar a ades\xE3o exige justificativa nos ETP (ex.: registro sem quantitativo total, art. 4\xBA, par\xE1grafo \xFAnico; capacidade de gerenciamento, art. 7\xBA, I e XI, do Decreto 11.462/2023).
{^adesao}{\xA7} N\xE3o ser\xE1 admitida a ades\xE3o \xE0 ata de registro de pre\xE7os decorrente desta licita\xE7\xE3o ou desta contrata\xE7\xE3o direta, conforme justificativa apresentada nos estudos t\xE9cnicos preliminares.{/adesao}{#adesao}{\xA7@adesao_requisitos} Durante a vig\xEAncia da ata, os \xF3rg\xE3os e as entidades da Administra\xE7\xE3o P\xFAblica federal, estadual, distrital e municipal que n\xE3o participaram do procedimento de IRP poder\xE3o aderir \xE0 ata de registro de pre\xE7os na condi\xE7\xE3o de n\xE3o participantes, observados os seguintes requisitos:

{\xA7\xA7} apresenta\xE7\xE3o de justificativa da vantagem da ades\xE3o, inclusive em situa\xE7\xF5es de prov\xE1vel desabastecimento ou descontinuidade de servi\xE7o p\xFAblico;

{\xA7\xA7} demonstra\xE7\xE3o de que os valores registrados est\xE3o compat\xEDveis com os valores praticados pelo mercado na forma do art. 23 da Lei n\xBA 14.133, de 2021; e

{\xA7\xA7} consulta e aceita\xE7\xE3o pr\xE9vias do \xF3rg\xE3o ou da entidade gerenciadora e do fornecedor.

{\xA7} A autoriza\xE7\xE3o do \xF3rg\xE3o ou entidade gerenciadora apenas ser\xE1 realizada ap\xF3s a aceita\xE7\xE3o da ades\xE3o pelo fornecedor.

{\xA7\xA7} O \xF3rg\xE3o ou entidade gerenciadora poder\xE1 rejeitar ades\xF5es caso elas possam acarretar preju\xEDzo \xE0 execu\xE7\xE3o de seus pr\xF3prios contratos ou \xE0 sua capacidade de gerenciamento.

{\xA7} Ap\xF3s a autoriza\xE7\xE3o do \xF3rg\xE3o ou da entidade gerenciadora, o \xF3rg\xE3o ou entidade n\xE3o participante dever\xE1 efetivar a aquisi\xE7\xE3o ou a contrata\xE7\xE3o solicitada em at\xE9 noventa dias, observado o prazo de vig\xEAncia da ata.

{\xA7} O prazo de que trata o subitem anterior, relativo \xE0 efetiva\xE7\xE3o da contrata\xE7\xE3o, poder\xE1 ser prorrogado excepcionalmente, mediante solicita\xE7\xE3o do \xF3rg\xE3o ou da entidade n\xE3o participante aceita pelo \xF3rg\xE3o ou pela entidade gerenciadora, desde que respeitado o limite temporal de vig\xEAncia da ata de registro de pre\xE7os.

{\xA7} O \xF3rg\xE3o ou a entidade poder\xE1 aderir a item da ata de registro de pre\xE7os da qual seja integrante, na qualidade de n\xE3o participante, para aqueles itens para os quais n\xE3o tenha quantitativo registrado, observados os requisitos do item {\xA7ref@adesao_requisitos}.

> **Dos limites para as ades\xF5es**

{\xA7} As aquisi\xE7\xF5es ou contrata\xE7\xF5es adicionais n\xE3o poder\xE3o exceder, por \xF3rg\xE3o ou entidade, a cinquenta por cento dos quantitativos dos itens do instrumento convocat\xF3rio registrados na ata de registro de pre\xE7os para o gerenciador e para os participantes.

{\xA7@adesao_limite_dobro} O quantitativo decorrente das ades\xF5es n\xE3o poder\xE1 exceder, na totalidade, ao dobro do quantitativo de cada item registrado na ata de registro de pre\xE7os para o gerenciador e os participantes, independentemente do n\xFAmero de \xF3rg\xE3os ou entidades n\xE3o participantes que aderirem \xE0 ata de registro de pre\xE7os.

{\xA7} Para aquisi\xE7\xE3o emergencial de medicamentos e material de consumo m\xE9dico-hospitalar por \xF3rg\xE3os e entidades da Administra\xE7\xE3o P\xFAblica federal, estadual, distrital e municipal, a ades\xE3o \xE0 ata de registro de pre\xE7os gerenciada pelo Minist\xE9rio da Sa\xFAde n\xE3o estar\xE1 sujeita ao limite previsto no item {\xA7ref@adesao_limite_dobro}.

{\xA7} A ades\xE3o \xE0 ata de registro de pre\xE7os por \xF3rg\xE3os e entidades da Administra\xE7\xE3o P\xFAblica estadual, distrital e municipal poder\xE1 ser exigida para fins de transfer\xEAncias volunt\xE1rias, n\xE3o ficando sujeita ao limite de que trata o item {\xA7ref@adesao_limite_dobro}, desde que seja destinada \xE0 execu\xE7\xE3o descentralizada de programa ou projeto federal e comprovada a compatibilidade dos pre\xE7os registrados com os valores praticados no mercado na forma do art. 23 da Lei n\xBA 14.133, de 2021.{/adesao}

> **Veda\xE7\xE3o a acr\xE9scimo de quantitativos**

{\xA7} \xC9 vedado efetuar acr\xE9scimos nos quantitativos fixados na ata de registro de pre\xE7os.

## {\xA7sec}. VALIDADE, FORMALIZA\xC7\xC3O DA ATA DE REGISTRO DE PRE\xC7OS E CADASTRO RESERVA

%% Nota AGU: o art. 84 da Lei 14.133 fixa a validade em 1 ano, prorrog\xE1vel por igual per\xEDodo.
{\xA7} A validade da Ata de Registro de Pre\xE7os ser\xE1 de 1 (um) ano, contado a partir do primeiro dia \xFAtil subsequente \xE0 data de divulga\xE7\xE3o no PNCP{#ata.prorrogavel}, podendo ser prorrogada por igual per\xEDodo, mediante a anu\xEAncia do fornecedor, desde que comprovado o pre\xE7o vantajoso{/ata.prorrogavel}.

%% Nota AGU (Parecer 00075/2024/DECOR/CGU/AGU): renovar o quantitativo na prorroga\xE7\xE3o exige pre\xE7o vantajoso, previs\xE3o no ato convocat\xF3rio e na ata, tratamento no planejamento e termo aditivo dentro da vig\xEAncia.
{\xA7\xA7} Em caso de prorroga\xE7\xE3o da ata, {#ata.renova_quantitativo}poder\xE1{/ata.renova_quantitativo}{^ata.renova_quantitativo}n\xE3o poder\xE1{/ata.renova_quantitativo} ser renovado o quantitativo originalmente registrado.

{\xA7\xA7} O contrato decorrente da ata de registro de pre\xE7os ter\xE1 sua vig\xEAncia estabelecida no pr\xF3prio instrumento contratual e observar\xE1 no momento da contrata\xE7\xE3o e a cada exerc\xEDcio financeiro a disponibilidade de cr\xE9ditos or\xE7ament\xE1rios, bem como a previs\xE3o no plano plurianual, quando ultrapassar 1 (um) exerc\xEDcio financeiro.

{\xA7\xA7} Na formaliza\xE7\xE3o do contrato ou do instrumento substituto dever\xE1 haver a indica\xE7\xE3o da disponibilidade dos cr\xE9ditos or\xE7ament\xE1rios respectivos.

{\xA7@instrumento_contratual} A contrata\xE7\xE3o com os fornecedores registrados na ata ser\xE1 formalizada pelo \xF3rg\xE3o ou pela entidade interessada por interm\xE9dio de instrumento contratual, emiss\xE3o de nota de empenho de despesa, autoriza\xE7\xE3o de compra ou outro instrumento h\xE1bil, conforme o art. 95 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} O instrumento contratual de que trata o item {\xA7ref@instrumento_contratual}. dever\xE1 ser assinado no prazo de validade da ata de registro de pre\xE7os.

{\xA7} Os contratos decorrentes do sistema de registro de pre\xE7os poder\xE3o ser alterados, observado o art. 124 da Lei n\xBA 14.133, de 2021.

{\xA7} Ap\xF3s a homologa\xE7\xE3o da licita\xE7\xE3o ou da contrata\xE7\xE3o direta, dever\xE3o ser observadas as seguintes condi\xE7\xF5es para formaliza\xE7\xE3o da ata de registro de pre\xE7os:

{\xA7\xA7} Ser\xE3o registrados na ata os pre\xE7os e os quantitativos do adjudicat\xE1rio, devendo ser observada a possibilidade de o licitante oferecer ou n\xE3o proposta em quantitativo inferior ao m\xE1ximo previsto no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contrata\xE7\xE3o direta{/contratacao_direta} e se obrigar nos limites dela;

{\xA7\xA7@cadastro_reserva} Ser\xE1 inclu\xEDdo na ata, na forma de anexo, o registro dos licitantes ou dos fornecedores que:

{\xA7\xA7\xA7@reserva_precos_iguais} Aceitarem cotar os bens, as obras ou os servi\xE7os com pre\xE7os iguais aos do adjudicat\xE1rio, observada a classifica\xE7\xE3o da licita\xE7\xE3o; e

{\xA7\xA7\xA7@reserva_proposta_original} Mantiverem sua proposta original.

{\xA7\xA7} Ser\xE1 respeitada, nas contrata\xE7\xF5es, a ordem de classifica\xE7\xE3o dos licitantes ou dos fornecedores registrados na ata.

{\xA7} O registro a que se refere o item {\xA7ref@cadastro_reserva} tem por objetivo a forma\xE7\xE3o de cadastro de reserva para o caso de impossibilidade de atendimento pelo signat\xE1rio da ata.

{\xA7} Para fins da ordem de classifica\xE7\xE3o, os licitantes ou fornecedores que aceitarem reduzir suas propostas para o pre\xE7o do adjudicat\xE1rio anteceder\xE3o aqueles que mantiverem sua proposta original.

{\xA7@habilitacao_reserva} A habilita\xE7\xE3o dos licitantes que compor\xE3o o cadastro de reserva a que se refere o item {\xA7ref@reserva_proposta_original} somente ser\xE1 efetuada quando houver necessidade de contrata\xE7\xE3o dos licitantes remanescentes, nas seguintes hip\xF3teses:

{\xA7\xA7} Quando o licitante vencedor n\xE3o assinar a ata de registro de pre\xE7os, no prazo e nas condi\xE7\xF5es estabelecidos no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contrata\xE7\xE3o direta{/contratacao_direta}; e

%% "item 9" cita a cl\xE1usula (n\xE3o um subitem): o motor s\xF3 rotula itens, e as cl\xE1usulas desta ata n\xE3o t\xEAm variante \u2014 n\xFAmero fixo como no modelo.
{\xA7\xA7} Quando houver o cancelamento do registro do licitante ou do registro de pre\xE7os nas hip\xF3teses previstas no item 9.

{\xA7} O pre\xE7o registrado com indica\xE7\xE3o dos licitantes e fornecedores ser\xE1 divulgado no PNCP e ficar\xE1 disponibilizado durante a vig\xEAncia da ata de registro de pre\xE7os.

{\xA7} Ap\xF3s a homologa\xE7\xE3o da licita\xE7\xE3o ou da contrata\xE7\xE3o direta, o licitante mais bem classificado ou o fornecedor, no caso da contrata\xE7\xE3o direta, ser\xE1 convocado para assinar a ata de registro de pre\xE7os, no prazo e nas condi\xE7\xF5es estabelecidos no edital de licita\xE7\xE3o ou no aviso de contrata\xE7\xE3o direta, sob pena de decair o direito, sem preju\xEDzo das san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021.

{\xA7\xA7} O prazo de convoca\xE7\xE3o poder\xE1 ser prorrogado 1 (uma) vez, por igual per\xEDodo, mediante solicita\xE7\xE3o do licitante ou fornecedor convocado, desde que apresentada dentro do prazo, devidamente justificada, e que a justificativa seja aceita pela Administra\xE7\xE3o.

{\xA7} A ata de registro de pre\xE7os ser\xE1 assinada por meio de assinatura digital e disponibilizada no Sistema de Registro de Pre\xE7os.

{\xA7} Quando o convocado n\xE3o assinar a ata de registro de pre\xE7os no prazo e nas condi\xE7\xF5es estabelecidos no edital ou no aviso de contrata\xE7\xE3o, observando o item {\xA7ref@habilitacao_reserva} e subitens, fica facultado \xE0 Administra\xE7\xE3o convocar os licitantes remanescentes do cadastro de reserva, na ordem de classifica\xE7\xE3o, para faz\xEA-lo em igual prazo e nas condi\xE7\xF5es propostas pelo primeiro classificado.

{\xA7} Na hip\xF3tese de nenhum dos licitantes que trata o item {\xA7ref@reserva_precos_iguais}, aceitar a contrata\xE7\xE3o nos termos do item anterior, a Administra\xE7\xE3o, observados o valor estimado e sua eventual atualiza\xE7\xE3o nos termos do {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contrata\xE7\xE3o direta{/contratacao_direta}, poder\xE1:

{\xA7\xA7} Convocar para negocia\xE7\xE3o os demais licitantes ou fornecedores remanescentes cujos pre\xE7os foram registrados sem redu\xE7\xE3o, observada a ordem de classifica\xE7\xE3o, com vistas \xE0 obten\xE7\xE3o de pre\xE7o melhor, mesmo que acima do pre\xE7o do adjudicat\xE1rio; ou

{\xA7\xA7} Adjudicar e firmar o contrato nas condi\xE7\xF5es ofertadas pelos licitantes ou fornecedores remanescentes, atendida a ordem classificat\xF3ria, quando frustrada a negocia\xE7\xE3o de melhor condi\xE7\xE3o.

{\xA7} A exist\xEAncia de pre\xE7os registrados implicar\xE1 compromisso de fornecimento nas condi\xE7\xF5es estabelecidas, mas n\xE3o obrigar\xE1 a Administra\xE7\xE3o a contratar, facultada a realiza\xE7\xE3o de licita\xE7\xE3o espec\xEDfica para a aquisi\xE7\xE3o pretendida, desde que devidamente justificada.

## {\xA7sec}. ALTERA\xC7\xC3O OU ATUALIZA\xC7\xC3O DOS PRE\xC7OS REGISTRADOS

%% Nota AGU: se o reequil\xEDbrio se restringir a itens fornecidos em circunst\xE2ncias espec\xEDficas, a ata pode prever pre\xE7os distintos (art. 82, III, da Lei 14.133).
{\xA7} Os pre\xE7os registrados poder\xE3o ser alterados ou atualizados em decorr\xEAncia de eventual redu\xE7\xE3o dos pre\xE7os praticados no mercado ou de fato que eleve o custo dos bens, das obras ou dos servi\xE7os registrados, nas seguintes situa\xE7\xF5es:

{\xA7\xA7} Em caso de for\xE7a maior, caso fortuito ou fato do pr\xEDncipe ou em decorr\xEAncia de fatos imprevis\xEDveis ou previs\xEDveis de consequ\xEAncias incalcul\xE1veis, que inviabilizem a execu\xE7\xE3o da ata tal como pactuada, nos termos da al\xEDnea \u201Cd\u201D do inciso II do caput do art. 124 da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} Em caso de cria\xE7\xE3o, altera\xE7\xE3o ou extin\xE7\xE3o de quaisquer tributos ou encargos legais ou a superveni\xEAncia de disposi\xE7\xF5es legais, com comprovada repercuss\xE3o sobre os pre\xE7os registrados;

{\xA7\xA7} Na hip\xF3tese de previs\xE3o no edital ou no aviso de contrata\xE7\xE3o direta de cl\xE1usula de reajustamento ou repactua\xE7\xE3o sobre os pre\xE7os registrados, nos termos da Lei n\xBA 14.133, de 2021.

{\xA7\xA7\xA7} No caso do reajustamento, dever\xE1 ser respeitada a contagem da anualidade e o \xEDndice previstos para a contrata\xE7\xE3o;

{\xA7\xA7\xA7} No caso da repactua\xE7\xE3o, poder\xE1 ser a pedido do interessado, conforme crit\xE9rios definidos para a contrata\xE7\xE3o.

## {\xA7sec}. NEGOCIA\xC7\xC3O DE PRE\xC7OS REGISTRADOS

{\xA7} Na hip\xF3tese de o pre\xE7o registrado tornar-se superior ao pre\xE7o praticado no mercado por motivo superveniente, o \xF3rg\xE3o ou entidade gerenciadora convocar\xE1 o fornecedor para negociar a redu\xE7\xE3o do pre\xE7o registrado.

{\xA7\xA7} Caso n\xE3o aceite reduzir seu pre\xE7o aos valores praticados pelo mercado, o fornecedor ser\xE1 liberado do compromisso assumido quanto ao item registrado, sem aplica\xE7\xE3o de penalidades administrativas.

%% Nota AGU: art. 28, \xA7 3\xBA, do Decreto 11.462/2023 \u2014 cancelado o registro, o gerenciador pode convocar o cadastro de reserva pela ordem de classifica\xE7\xE3o.
{\xA7\xA7} Na hip\xF3tese prevista no item anterior, o gerenciador convocar\xE1 os fornecedores do cadastro de reserva, na ordem de classifica\xE7\xE3o, para verificar se aceitam reduzir seus pre\xE7os aos valores de mercado e n\xE3o convocar\xE1 os licitantes ou fornecedores que tiveram seu registro cancelado.

{\xA7\xA7} Se n\xE3o obtiver \xEAxito nas negocia\xE7\xF5es, o \xF3rg\xE3o ou entidade gerenciadora proceder\xE1 ao cancelamento da ata de registro de pre\xE7os, adotando as medidas cab\xEDveis para obten\xE7\xE3o de contrata\xE7\xE3o mais vantajosa.

{\xA7\xA7} Na hip\xF3tese de redu\xE7\xE3o do pre\xE7o registrado, o gerenciador comunicar\xE1 aos \xF3rg\xE3os e \xE0s entidades que tiverem firmado contratos decorrentes da ata de registro de pre\xE7os para que avaliem a conveni\xEAncia e a oportunidade de diligenciarem negocia\xE7\xE3o com vistas \xE0 altera\xE7\xE3o contratual, observado o disposto no art. 124 da Lei n\xBA 14.133, de 2021.

{\xA7@preco_mercado_superior} Na hip\xF3tese de o pre\xE7o de mercado tornar-se superior ao pre\xE7o registrado e o fornecedor n\xE3o poder cumprir as obriga\xE7\xF5es estabelecidas na ata, ser\xE1 facultado ao fornecedor requerer ao gerenciador a altera\xE7\xE3o do pre\xE7o registrado, mediante comprova\xE7\xE3o de fato superveniente que supostamente o impossibilite de cumprir o compromisso.

{\xA7\xA7@documentacao_comprobatoria} Neste caso, o fornecedor encaminhar\xE1, juntamente com o pedido de altera\xE7\xE3o, a documenta\xE7\xE3o comprobat\xF3ria ou a planilha de custos que demonstre a inviabilidade do pre\xE7o registrado em rela\xE7\xE3o \xE0s condi\xE7\xF5es inicialmente pactuadas.

{\xA7\xA7} Na hip\xF3tese de n\xE3o comprova\xE7\xE3o da exist\xEAncia de fato superveniente que inviabilize o pre\xE7o registrado, o pedido ser\xE1 indeferido pelo \xF3rg\xE3o ou entidade gerenciadora e o fornecedor dever\xE1 cumprir as obriga\xE7\xF5es estabelecidas na ata, sob pena de cancelamento do seu registro, nos termos do item {\xA7ref@cancelamento_registro}, sem preju\xEDzo das san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021, e na legisla\xE7\xE3o aplic\xE1vel.

{\xA7\xA7} Na hip\xF3tese de cancelamento do registro do fornecedor, nos termos do item anterior, o gerenciador convocar\xE1 os fornecedores do cadastro de reserva, na ordem de classifica\xE7\xE3o, para verificar se aceitam manter seus pre\xE7os registrados, observado o disposto no item {\xA7ref@habilitacao_reserva}.

{\xA7\xA7} Se n\xE3o obtiver \xEAxito nas negocia\xE7\xF5es, o \xF3rg\xE3o ou entidade gerenciadora proceder\xE1 ao cancelamento da ata de registro de pre\xE7os, nos termos do item {\xA7ref@cancelamento_precos}, e adotar\xE1 as medidas cab\xEDveis para a obten\xE7\xE3o da contrata\xE7\xE3o mais vantajosa.

{\xA7\xA7} Na hip\xF3tese de comprova\xE7\xE3o da majora\xE7\xE3o do pre\xE7o de mercado que inviabilize o pre\xE7o registrado, conforme previsto no item {\xA7ref@preco_mercado_superior} e no item {\xA7ref@documentacao_comprobatoria}, o \xF3rg\xE3o ou entidade gerenciadora atualizar\xE1 o pre\xE7o registrado, de acordo com a realidade dos valores praticados pelo mercado.

{\xA7\xA7} O \xF3rg\xE3o ou entidade gerenciadora comunicar\xE1 aos \xF3rg\xE3os e \xE0s entidades que tiverem firmado contratos decorrentes da ata de registro de pre\xE7os sobre a efetiva altera\xE7\xE3o do pre\xE7o registrado, para que avaliem a necessidade de altera\xE7\xE3o contratual, observado o disposto no art. 124 da Lei n\xBA 14.133, de 2021.

## {\xA7sec}. REMANEJAMENTO DAS QUANTIDADES REGISTRADAS NA ATA DE REGISTRO DE PRE\xC7OS

%% Nota AGU: o remanejamento est\xE1 previsto no art. 30 do Decreto 11.462/2023; para n\xE3o participante valem os limites do art. 32 (50% por \xF3rg\xE3o; dobro no total).
{\xA7} As quantidades previstas para os itens com pre\xE7os registrados nas atas de registro de pre\xE7os poder\xE3o ser remanejadas pelo \xF3rg\xE3o ou entidade gerenciadora entre os \xF3rg\xE3os ou as entidades participantes e n\xE3o participantes do registro de pre\xE7os.

{\xA7} O remanejamento somente poder\xE1 ser feito:

{\xA7\xA7} De \xF3rg\xE3o ou entidade participante para \xF3rg\xE3o ou entidade participante; ou

{\xA7\xA7} De \xF3rg\xE3o ou entidade participante para \xF3rg\xE3o ou entidade n\xE3o participante.

{\xA7@gerenciador_participante} O \xF3rg\xE3o ou entidade gerenciadora que tiver estimado as quantidades que pretende contratar ser\xE1 considerado participante para efeito do remanejamento.

{\xA7} Na hip\xF3tese de remanejamento de \xF3rg\xE3o ou entidade participante para \xF3rg\xE3o ou entidade n\xE3o participante, ser\xE3o observados os limites previstos no art. 32 do Decreto n\xBA 11.462, de 2023.

{\xA7} Competir\xE1 ao \xF3rg\xE3o ou \xE0 entidade gerenciadora autorizar o remanejamento solicitado, com a redu\xE7\xE3o do quantitativo inicialmente informado pelo \xF3rg\xE3o ou pela entidade participante, desde que haja pr\xE9via anu\xEAncia do \xF3rg\xE3o ou da entidade que sofrer redu\xE7\xE3o dos quantitativos informados.

{\xA7} Caso o remanejamento seja feito entre \xF3rg\xE3os ou entidades dos Estados, do Distrito Federal ou de Munic\xEDpios distintos, caber\xE1 ao fornecedor benefici\xE1rio da ata de registro de pre\xE7os, observadas as condi\xE7\xF5es nela estabelecidas, optar pela aceita\xE7\xE3o ou n\xE3o do fornecimento decorrente do remanejamento dos itens.

{\xA7} Na hip\xF3tese da compra centralizada, n\xE3o havendo indica\xE7\xE3o pelo \xF3rg\xE3o ou pela entidade gerenciadora, dos quantitativos dos participantes da compra centralizada, nos termos do item {\xA7ref@gerenciador_participante}, a distribui\xE7\xE3o das quantidades para a execu\xE7\xE3o descentralizada ser\xE1 por meio do remanejamento.

## {\xA7sec}. CANCELAMENTO DO REGISTRO DO LICITANTE VENCEDOR E DOS PRE\xC7OS REGISTRADOS

{\xA7@cancelamento_registro} O registro do fornecedor ser\xE1 cancelado pelo gerenciador, quando o fornecedor:

{\xA7\xA7} Descumprir as condi\xE7\xF5es da ata de registro de pre\xE7os, sem motivo justificado;

{\xA7\xA7} N\xE3o retirar a nota de empenho, ou instrumento equivalente, no prazo estabelecido pela Administra\xE7\xE3o sem justificativa razo\xE1vel;

{\xA7\xA7} N\xE3o aceitar manter seu pre\xE7o registrado, na hip\xF3tese prevista no artigo 27, \xA7 2\xBA, do Decreto n\xBA 11.462, de 2023; ou

{\xA7\xA7} Sofrer san\xE7\xE3o prevista nos incisos III ou IV do caput do art. 156 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7\xA7} Na hip\xF3tese de aplica\xE7\xE3o de san\xE7\xE3o prevista nos incisos III ou IV do caput do art. 156 da Lei n\xBA 14.133, de 2021, caso a penalidade aplicada ao fornecedor n\xE3o ultrapasse o prazo de vig\xEAncia da ata de registro de pre\xE7os, poder\xE1 o \xF3rg\xE3o ou a entidade gerenciadora, mediante decis\xE3o fundamentada, decidir pela manuten\xE7\xE3o do registro de pre\xE7os, vedadas contrata\xE7\xF5es derivadas da ata enquanto perdurarem os efeitos da san\xE7\xE3o.

{\xA7} O cancelamento de registros nas hip\xF3teses previstas no item {\xA7ref@cancelamento_registro} ser\xE1 formalizado por despacho do \xF3rg\xE3o ou da entidade gerenciadora, garantidos os princ\xEDpios do contradit\xF3rio e da ampla defesa.

{\xA7} Na hip\xF3tese de cancelamento do registro do fornecedor, o \xF3rg\xE3o ou a entidade gerenciadora poder\xE1 convocar os licitantes que comp\xF5em o cadastro de reserva, observada a ordem de classifica\xE7\xE3o.

{\xA7@cancelamento_precos} O cancelamento dos pre\xE7os registrados poder\xE1 ser realizado pelo gerenciador, em determinada ata de registro de pre\xE7os, total ou parcialmente, nas seguintes hip\xF3teses, desde que devidamente comprovadas e justificadas:

{\xA7\xA7} Por raz\xE3o de interesse p\xFAblico;

{\xA7\xA7} A pedido do fornecedor, decorrente de caso fortuito ou for\xE7a maior; ou

{\xA7\xA7} Se n\xE3o houver \xEAxito nas negocia\xE7\xF5es, nas hip\xF3teses em que o pre\xE7o de mercado tornar-se superior ou inferior ao pre\xE7o registrado, nos termos do artigos 26, \xA7 3\xBA e  27, \xA7 4\xBA, ambos do Decreto n\xBA 11.462, de 2023.

## {\xA7sec}. DAS PENALIDADES

{\xA7} O descumprimento da Ata de Registro de Pre\xE7os ensejar\xE1 aplica\xE7\xE3o das penalidades estabelecidas no {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contrata\xE7\xE3o direta{/contratacao_direta}.

%% Nota AGU: a san\xE7\xE3o ao remanescente s\xF3 cabe se ele j\xE1 assinou a ata e depois n\xE3o atende \xE0 convoca\xE7\xE3o (art. 45, \xA7\xA7 4\xBA e 5\xBA, do Decreto 11.462/2023).
{\xA7\xA7} As san\xE7\xF5es tamb\xE9m se aplicam aos integrantes do cadastro de reserva no registro de pre\xE7os que, convocados, n\xE3o honrarem o compromisso assumido injustificadamente ap\xF3s terem assinado a ata.

{\xA7} \xC9 da compet\xEAncia do gerenciador a aplica\xE7\xE3o das penalidades decorrentes do descumprimento do pactuado nesta ata de registro de pre\xE7o (art. 7\xBA, XIV, do Decreto n\xBA 11.462, de 2023), exceto nas hip\xF3teses em que o descumprimento disser respeito \xE0s contrata\xE7\xF5es dos \xF3rg\xE3os ou entidade participante, caso no qual caber\xE1 ao respectivo \xF3rg\xE3o participante a aplica\xE7\xE3o da penalidade (art. 8\xBA, IX, do Decreto n\xBA 11.462, de 2023).

{\xA7} O \xF3rg\xE3o ou entidade participante dever\xE1 comunicar ao \xF3rg\xE3o gerenciador qualquer das ocorr\xEAncias previstas no item {\xA7ref@cancelamento_registro}, dada a necessidade de instaura\xE7\xE3o de procedimento para cancelamento do registro do fornecedor.

## {\xA7sec}. CONDI\xC7\xD5ES GERAIS

{\xA7} As condi\xE7\xF5es gerais de execu\xE7\xE3o do objeto, tais como os prazos para entrega e recebimento, as obriga\xE7\xF5es da Administra\xE7\xE3o e do fornecedor registrado, penalidades e demais condi\xE7\xF5es do ajuste, encontram-se definidos no Termo de Refer\xEAncia, anexo ao {^contratacao_direta}edital{/contratacao_direta}{#contratacao_direta}aviso de contrata\xE7\xE3o direta{/contratacao_direta}.

%% adjudicacao_por_grupo: incluir quando houver adjudica\xE7\xE3o por pre\xE7o global de grupo de itens.
{#adjudicacao_por_grupo}{\xA7} No caso de adjudica\xE7\xE3o por pre\xE7o global de grupo de itens, s\xF3 ser\xE1 admitida a contrata\xE7\xE3o de parte de itens do grupo se houver pr\xE9via pesquisa de mercado e demonstra\xE7\xE3o de sua vantagem para o \xF3rg\xE3o ou a entidade.{/adjudicacao_por_grupo}

%% "e encaminhada c\xF3pia..." s\xF3 quando houver \xF3rg\xE3os participantes.
Para firmeza e validade do pactuado, a presente Ata foi lavrada em {ata.vias} ({ata.vias_extenso}) vias de igual teor, que, depois de lida e achada em ordem, vai assinada pelas partes{#participantes} e encaminhada c\xF3pia aos demais \xF3rg\xE3os participantes{/participantes}.

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

%% Nota AGU: com pre\xE7os diferentes (art. 82, III, da Lei 14.133; art. 15, III, do Decreto 11.462/2023), incluir tabela com os fornecedores e seus pre\xE7os \u2014 e revisar os demais modelos.
Seguindo a ordem de classifica\xE7\xE3o, segue rela\xE7\xE3o de fornecedores que aceitaram cotar os itens com pre\xE7os iguais ao adjudicat\xE1rio:

{#cadastro_reserva.precos_iguais}| Item do TR | Fornecedor | Especifica\xE7\xE3o |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade M\xE1xima | Quantidade M\xEDnima | Valor Unit\xE1rio | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*cadastro_reserva.precos_iguais}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/cadastro_reserva.precos_iguais}{/cadastro_reserva.precos_iguais}{^cadastro_reserva.precos_iguais}> N\xE3o houve fornecedores nesta condi\xE7\xE3o.{/cadastro_reserva.precos_iguais}

Seguindo a ordem de classifica\xE7\xE3o, segue rela\xE7\xE3o de fornecedores que mantiveram sua proposta original:

{#cadastro_reserva.proposta_original}| Item do TR | Fornecedor | Especifica\xE7\xE3o |{#exige_marca} Marca |{/exige_marca}{#exige_modelo} Modelo |{/exige_modelo} Unidade | Quantidade M\xE1xima | Quantidade M\xEDnima | Valor Unit\xE1rio | Prazo garantia ou validade |
|---|---|---|{#exige_marca}---|{/exige_marca}{#exige_modelo}---|{/exige_modelo}---|---|---|---|---|
{*cadastro_reserva.proposta_original}| {.item} | {.razao_social}, CNPJ/MF {.cnpj}, {.endereco}, {.contato}, representante: {.representante} | {.especificacao} |{#exige_marca} {.marca} |{/exige_marca}{#exige_modelo} {.modelo} |{/exige_modelo} {.unidade} | {.quantidade_maxima} | {.quantidade_minima} | R$ {.valor_unitario} | {.prazo_garantia} |
{/cadastro_reserva.proposta_original}{/cadastro_reserva.proposta_original}{^cadastro_reserva.proposta_original}> N\xE3o houve fornecedores nesta condi\xE7\xE3o.{/cadastro_reserva.proposta_original}
`,"agu-contrato-compras":`@requer regime=14133
@fonte agu-contrato-compras
@padrao autoridade=autoridades.vp_gestao
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
%% Modelo de Termo de Contrato \u2014 Aquisi\xE7\xF5es (AGU, dez/2025). Uso no CFC: contrato decorrente de LICITA\xC7\xC3O (preg\xE3o ou concorr\xEAncia); contrata\xE7\xE3o direta usa contrato-compras (modelo Projur).
@cabecalho

> (Processo Administrativo n\xB0 {processo})

%% Nota AGU: a men\xE7\xE3o \xE0 Uni\xE3o s\xF3 cabe a \xF3rg\xE3o da Administra\xE7\xE3o Direta; nos demais casos, o nome da autarquia ou funda\xE7\xE3o.
::: CONTRATO ADMINISTRATIVO N\xBA {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas} E {contratada.razao_social|maiusculas}

%% Nota AGU (Parecer 4/2022/CNMLC): sem n\xFAmeros de documentos pessoais \u2014 autoridade identificada pela matr\xEDcula funcional; representante da contratada, s\xF3 pelo nome.
A Autarquia {cfc.nome}, por interm\xE9dio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}, nomeado(a) pela Portaria n\xBA {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matr\xEDcula Funcional n\xBA {nomeacao.matricula}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o n\xBA {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}/{contratada.uf}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}{#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}, tendo em vista o que consta no Processo n\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n\xBA 14.133, de 1\xBA de abril de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao.concorrencia}Concorr\xEAncia{/licitacao.concorrencia}{^licitacao.concorrencia}Preg\xE3o Eletr\xF4nico{/licitacao.concorrencia} n\xBA {licitacao.numero}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de {objeto_contratacao}, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

{\xA7} Objeto da contrata\xE7\xE3o:

%% Nota AGU: tabela meramente ilustrativa, ajustada ao caso concreto.
| ITEM | ESPECIFICA\xC7\xC3O | CATMAT | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

%% Contrato decorrente de licita\xE7\xE3o: das alternativas do modelo, vale "O Edital da Licita\xE7\xE3o".
{\xA7\xA7} O Edital da Licita\xE7\xE3o;

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% Nota AGU: reda\xE7\xE3o para contratos de escopo (art. 105).
{#vigencia.escopo}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do artigo 105 da Lei n\xB0 14.133, de 2021.

{\xA7\xA7} O prazo de vig\xEAncia ser\xE1 automaticamente prorrogado, independentemente de termo aditivo, quando o objeto n\xE3o for conclu\xEDdo no per\xEDodo firmado acima, ressalvadas as provid\xEAncias cab\xEDveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% Nota AGU: reda\xE7\xE3o para fornecimentos cont\xEDnuos (arts. 106 e 107; art. 6\xBA, XV); prazo inicial de no m\xE1ximo 5 anos; consulta pr\xE9via ao Cadin obrigat\xF3ria (Lei 10.522/2002, art. 6\xBA).
{#vigencia.continuada}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n\xB0 14.133, de 2021.

{\xA7\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, bem como \xE0 inexist\xEAncia de registros no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.{/vigencia.continuada}

%% Nota AGU: reda\xE7\xE3o para contrata\xE7\xF5es emergenciais (art. 75, VIII), qualquer que seja a natureza do objeto; prazo m\xE1ximo de um ano.
{#vigencia.emergencial}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrog\xE1vel, na forma do art. 75, VIII, da Lei n\xB0 14.133/2021.{/vigencia.emergencial}

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 PRE\xC7O

%% Nota AGU: o valor total considera o per\xEDodo inicial de vig\xEAncia.
{#valor_mensal}{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{\xA7} O valor total da contrata\xE7\xE3o \xE9 de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% Nota AGU: inserir quando o contrato for de valor estimativo, com demanda vari\xE1vel.
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

%% Nota AGU: o contrato deve prever \xEDndice de reajuste com data-base vinculada \xE0 data do or\xE7amento estimado (art. 25, \xA7 7\xBA).
## CL\xC1USULA {\xA7cl} - REAJUSTE

{\xA7} As regras acerca do reajuste do valor contratual s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE

{\xA7} S\xE3o obriga\xE7\xF5es do CONTRATANTE:

{\xA7\xA7} Exigir o cumprimento de todas as obriga\xE7\xF5es assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{\xA7\xA7} Receber o objeto no prazo e condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia;

{\xA7\xA7} Notificar o CONTRATADO, por escrito, sobre v\xEDcios, defeitos incorre\xE7\xF5es, imperfei\xE7\xF5es, falhas ou irregularidades verificadas na execu\xE7\xE3o do objeto contratual, fixando prazo para que seja substitu\xEDdo, reparado ou corrigido, total ou parcialmente, \xE0s suas expensas, certificando-se de que as solu\xE7\xF5es por ele propostas sejam as mais adequadas;

{\xA7\xA7} Acompanhar e fiscalizar a execu\xE7\xE3o do contrato e o cumprimento das obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Efetuar o pagamento ao CONTRATADO do valor correspondente ao fornecimento do objeto, no prazo, forma e condi\xE7\xF5es estabelecidos no presente Contrato e no Termo de Refer\xEAncia.

{\xA7\xA7} Aplicar ao CONTRATADO as san\xE7\xF5es previstas na lei e neste Contrato;

{\xA7\xA7} Cientificar o \xF3rg\xE3o de representa\xE7\xE3o judicial da Advocacia-Geral da Uni\xE3o para ado\xE7\xE3o das medidas cab\xEDveis quando do descumprimento de obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Explicitamente emitir decis\xE3o sobre todas as solicita\xE7\xF5es e reclama\xE7\xF5es relacionadas \xE0 execu\xE7\xE3o do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelat\xF3rios ou de nenhum interesse para a boa execu\xE7\xE3o do ajuste.

%% Nota AGU: prazo definido pela Administra\xE7\xE3o conforme a complexidade do objeto; sem especifica\xE7\xE3o, \xE9 de um m\xEAs (art. 123, par\xE1grafo \xFAnico; Decreto 11.246/2022, art. 28).
{\xA7\xA7\xA7} A Administra\xE7\xE3o ter\xE1 o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorroga\xE7\xE3o motivada, por igual per\xEDodo.

%% Nota AGU: cl\xE1usula necess\xE1ria (art. 92, XI); pode-se adotar o mesmo prazo do art. 123.
{\xA7\xA7} Responder eventuais pedidos de reestabelecimento do equil\xEDbrio econ\xF4mico-financeiro feitos pelo CONTRATADO no prazo m\xE1ximo de {prazo_reequilibrio};

%% Nota AGU: disposi\xE7\xE3o do art. 137, \xA7 4\xBA \u2014 s\xF3 cabe quando houver garantia de execu\xE7\xE3o.
{#garantia}{\xA7\xA7} Notificar os emitentes das garantias quanto ao in\xEDcio de processo administrativo para apura\xE7\xE3o de descumprimento de cl\xE1usulas contratuais.{/garantia}

{\xA7} A Administra\xE7\xE3o n\xE3o responder\xE1 por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados \xE0 execu\xE7\xE3o do contrato, bem como por qualquer dano causado a terceiros em decorr\xEAncia de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

%% Nota AGU: obriga\xE7\xF5es gerais; o \xF3rg\xE3o inclui, modifica ou exclui itens conforme as especificidades do objeto.
## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATADO

{\xA7} O CONTRATADO deve cumprir todas as obriga\xE7\xF5es constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execu\xE7\xE3o do objeto, observando, ainda, as obriga\xE7\xF5es a seguir dispostas:

{\xA7} Atender \xE0s determina\xE7\xF5es regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informa\xE7\xE3o por eles solicitados;

%% Nota AGU: o prazo de corre\xE7\xE3o \xE9 fixado pelo fiscal conforme o caso concreto, n\xE3o em prazo \xFAnico.
{\xA7} Reparar, corrigir, remover, reconstruir ou substituir, \xE0s suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e servi\xE7os nos quais se verificarem v\xEDcios, defeitos ou incorre\xE7\xF5es resultantes da execu\xE7\xE3o ou dos materiais empregados;

{\xA7} Responsabilizar-se pelos v\xEDcios e danos decorrentes da execu\xE7\xE3o do objeto, bem como por todo e qualquer dano causado \xE0 Administra\xE7\xE3o ou terceiros, n\xE3o reduzindo essa responsabilidade a fiscaliza\xE7\xE3o ou o acompanhamento da execu\xE7\xE3o contratual pelo CONTRATANTE, que ficar\xE1 autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

{\xA7} Quando n\xE3o for poss\xEDvel a verifica\xE7\xE3o da regularidade no Sistema de Cadastro de Fornecedores \u2013 SICAF, o CONTRATADO dever\xE1 entregar ao setor respons\xE1vel pela fiscaliza\xE7\xE3o do contrato, junto com a Nota Fiscal para fins de pagamento, os seguintes documentos:

{\xA7\xA7} prova de regularidade relativa \xE0 Seguridade Social;

{\xA7\xA7} certid\xE3o conjunta relativa aos tributos federais e \xE0 D\xEDvida Ativa da Uni\xE3o;

{\xA7\xA7} certid\xF5es que comprovem a regularidade perante a Fazenda Estadual ou Distrital do domic\xEDlio ou sede do CONTRATADO;

{\xA7\xA7} Certid\xE3o de Regularidade do FGTS \u2013 CRF; e

{\xA7\xA7} Certid\xE3o Negativa de D\xE9bitos Trabalhistas \u2013 CNDT.

{\xA7} Responsabilizar-se pelo cumprimento de todas as obriga\xE7\xF5es trabalhistas, sociais, previdenci\xE1rias, tribut\xE1rias, fiscais, comerciais e as demais previstas em legisla\xE7\xE3o espec\xEDfica, cuja inadimpl\xEAncia n\xE3o transfere a responsabilidade ao CONTRATANTE e n\xE3o poder\xE1 onerar o objeto do contrato;

{\xA7} Comunicar ao Fiscal do contrato tempestivamente, observada a urg\xEAncia da situa\xE7\xE3o, qualquer ocorr\xEAncia anormal ou acidente que se verifique no local da execu\xE7\xE3o do objeto contratual, n\xE3o ultrapassando o prazo de 24 (vinte e quatro) horas;

{\xA7} Paralisar, por determina\xE7\xE3o do CONTRATANTE, qualquer atividade que n\xE3o esteja sendo executada de acordo com a boa t\xE9cnica ou que ponha em risco a seguran\xE7a de pessoas ou bens de terceiros;

{\xA7} Manter, durante toda a vig\xEAncia do contrato, em compatibilidade com as obriga\xE7\xF5es assumidas, todas as condi\xE7\xF5es exigidas para habilita\xE7\xE3o na licita\xE7\xE3o ou para qualifica\xE7\xE3o na contrata\xE7\xE3o direta;

{\xA7} Cumprir, durante todo o per\xEDodo de execu\xE7\xE3o do contrato, a reserva de cargos prevista em lei para pessoa com defici\xEAncia, para reabilitado da Previd\xEAncia Social ou para aprendiz, bem como as reservas de cargos previstas na legisla\xE7\xE3o;

{\xA7} Comprovar a reserva de cargos a que se refere a cl\xE1usula acima, no prazo fixado pelo fiscal do contrato, com a indica\xE7\xE3o dos empregados que preencheram as referidas vagas;

{\xA7} Guardar sigilo sobre todas as informa\xE7\xF5es obtidas em decorr\xEAncia do cumprimento do contrato;

{\xA7} Arcar com o \xF4nus decorrente de eventual equ\xEDvoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos vari\xE1veis decorrentes de fatores futuros e incertos, devendo complement\xE1-los, caso o previsto inicialmente em sua proposta n\xE3o seja satisfat\xF3rio para o atendimento do objeto da contrata\xE7\xE3o, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei n\xBA 14.133, de 2021;

{\xA7} Cumprir, al\xE9m dos postulados legais vigentes de \xE2mbito federal, estadual ou municipal, as normas de seguran\xE7a do CONTRATANTE;

%% Obriga\xE7\xF5es em vermelho para compra com execu\xE7\xE3o acess\xF3ria no local (instala\xE7\xE3o, montagem, servi\xE7o agregado ao fornecimento).
{#servico_agregado}{\xA7} Alocar os empregados necess\xE1rios ao perfeito cumprimento das cl\xE1usulas deste contrato, com habilita\xE7\xE3o e conhecimento adequados;

{\xA7} Prestar os servi\xE7os dentro dos par\xE2metros e rotinas estabelecidos;

{\xA7} Fornecer todos os materiais, equipamentos, ferramentas e utens\xEDlios demandados, em quantidade, qualidade e tecnologia adequadas, com a observ\xE2ncia \xE0s recomenda\xE7\xF5es aceitas pela boa t\xE9cnica, normas e legisla\xE7\xE3o de reg\xEAncia;

{\xA7} Conduzir os trabalhos com estrita observ\xE2ncia \xE0s normas da legisla\xE7\xE3o pertinente, cumprindo as determina\xE7\xF5es dos Poderes P\xFAblicos, mantendo sempre limpo o local de execu\xE7\xE3o do objeto e nas melhores condi\xE7\xF5es de seguran\xE7a, higiene e disciplina;

{\xA7} Submeter previamente, por escrito, ao CONTRATANTE, para an\xE1lise e aprova\xE7\xE3o, quaisquer mudan\xE7as nos m\xE9todos executivos que fujam \xE0s especifica\xE7\xF5es do memorial descritivo ou instrumento cong\xEAnere;{/servico_agregado}

%% Obriga\xE7\xF5es em vermelho de prote\xE7\xE3o ao trabalho: quando a execu\xE7\xE3o envolver trabalhadores do CONTRATADO.
{#protecao_trabalho}{\xA7} Cumprir as normas de prote\xE7\xE3o ao trabalho, inclusive aquelas relativas \xE0 seguran\xE7a e \xE0 sa\xFAde no trabalho;

{\xA7} N\xE3o submeter os trabalhadores a condi\xE7\xF5es degradantes de trabalho, jornadas exaustivas, servid\xE3o por d\xEDvida ou trabalhos for\xE7ados;

{\xA7} N\xE3o permitir a utiliza\xE7\xE3o de qualquer trabalho do menor de dezesseis anos de idade, exceto na condi\xE7\xE3o de aprendiz para os maiores de quatorze anos de idade, observada a legisla\xE7\xE3o pertinente;

{\xA7} N\xE3o submeter o menor de dezoito anos de idade \xE0 realiza\xE7\xE3o de trabalho noturno e em condi\xE7\xF5es perigosas e insalubres e \xE0 realiza\xE7\xE3o de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto n\xBA 6.481, de 12 de junho de 2008;

{\xA7} Receber e dar o tratamento adequado a den\xFAncias de discrimina\xE7\xE3o, viol\xEAncia e ass\xE9dio no ambiente de trabalho;{/protecao_trabalho}

%% Obriga\xE7\xE3o em vermelho para bens com manual e assist\xEAncia t\xE9cnica (equipamentos).
{#manual_usuario}{\xA7} Entregar o objeto acompanhado do manual do usu\xE1rio, com uma vers\xE3o em portugu\xEAs, e da rela\xE7\xE3o da rede de assist\xEAncia t\xE9cnica autorizada;{/manual_usuario}

{\xA7} Responsabilizar-se pelos v\xEDcios e danos decorrentes do objeto, de acordo com o C\xF3digo de Defesa do Consumidor (Lei n\xBA 8.078, de 1990);

{\xA7} Comunicar ao CONTRATANTE, no prazo m\xE1ximo de 24 (vinte e quatro) horas que antecede a data da entrega, os motivos que impossibilitem o cumprimento do prazo previsto, com a devida comprova\xE7\xE3o;

%% Nota AGU: aquisi\xE7\xF5es raramente envolvem dados pessoais; havendo tratamento, inserir esta obriga\xE7\xE3o e a cl\xE1usula da LGPD.
{#lgpd}{\xA7} Orientar e treinar seus empregados sobre os deveres previstos na Lei n\xBA 13.709, de 14 de agosto de 2018, adotando medidas eficazes para prote\xE7\xE3o de dados pessoais a que tenha acesso por for\xE7a da execu\xE7\xE3o deste contrato;{/lgpd}

%% Nota AGU: cl\xE1usula necess\xE1ria quando a contrata\xE7\xE3o envolver, de qualquer forma, tratamento de dados pessoais (LGPD); disposi\xE7\xF5es indicativas, ajust\xE1veis ao objeto.
{#lgpd}## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n\xBA 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de SUBOPERADORES e SUBCONTRATADOS o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA7 1\xBA do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O

%% Nota AGU: exigir garantia \xE9 crit\xE9rio da Administra\xE7\xE3o; exigindo, prever no edital e no contrato; n\xE3o exigindo, justificar com base nos estudos preliminares e na an\xE1lise de riscos.
{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} Ser\xE1 exigida a presta\xE7\xE3o de garantia na presente contrata\xE7\xE3o, conforme regras constantes do Termo de Refer\xEAncia.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} As regras acerca de infra\xE7\xF5es e san\xE7\xF5es administrativas referentes \xE0 execu\xE7\xE3o do contrato s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL

%% Nota AGU: reda\xE7\xE3o para contratos por escopo (objeto prestado em determinado prazo \u2014 ex.: compra pontual de sof\xE1s, aquisi\xE7\xE3o e instala\xE7\xE3o de servidores).
{#vigencia.escopo}{\xA7} O contrato ser\xE1 extinto quando cumpridas as obriga\xE7\xF5es de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{\xA7} Se as obriga\xE7\xF5es n\xE3o forem cumpridas no prazo estipulado, a vig\xEAncia ficar\xE1 prorrogada at\xE9 a conclus\xE3o do objeto, caso em que dever\xE1 a Administra\xE7\xE3o providenciar a readequa\xE7\xE3o do cronograma fixado para o contrato.

{\xA7\xA7} Quando a n\xE3o conclus\xE3o do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{\xA7\xA7\xA7} ficar\xE1 ele constitu\xEDdo em mora, sendo-lhe aplic\xE1veis as respectivas san\xE7\xF5es administrativas; e

{\xA7\xA7\xA7} poder\xE1 a Administra\xE7\xE3o optar pela extin\xE7\xE3o do contrato e, nesse caso, adotar\xE1 as medidas admitidas em lei para a continuidade da execu\xE7\xE3o contratual.{/vigencia.escopo}

%% Nota AGU: reda\xE7\xE3o para fornecimentos cont\xEDnuos, aluguel de equipamentos e uso de programas de inform\xE1tica (art. 106); extin\xE7\xE3o antecipada com ou sem \xF4nus, justificada formalmente (ON AGU n\xBA 98/2025).
{#vigencia.continuada}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, mediante justificativa formal de que n\xE3o disp\xF5e de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou de que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n\xBA 14.133, de 2021.{/vigencia.continuada}

%% Nota AGU: reda\xE7\xE3o para contratos decorrentes da dispensa do art. 75, VIII.
{#vigencia.emergencial}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.\xBA 14.133/2021, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.{/vigencia.emergencial}

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei n\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Da rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio.

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou na contrata\xE7\xE3o direta, ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau.

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos arts. 124 e seguintes da Lei n\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

%% Nota AGU: supress\xE3o consensual acima de 25% admitida (Parecer 61/2024/DECOR/CGU/AGU).
{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs.

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o correr\xE3o \xE0 conta de recursos espec\xEDficos consignados no Or\xE7amento Geral da Uni\xE3o deste exerc\xEDcio, na dota\xE7\xE3o abaixo discriminada:

{\xA7\xA7} Gest\xE3o/unidade: {dotacao.gestao_unidade};

{\xA7\xA7} Fonte de recursos: {dotacao.fonte};

{\xA7\xA7} Programa de trabalho: {dotacao.projeto};

{\xA7\xA7} Elemento de despesa: {dotacao.conta}; e

{\xA7\xA7} Plano interno: {dotacao.plano_interno}; e

{\xA7\xA7} Nota de empenho: {dotacao.empenho};

%% Nota AGU: em fornecimento cont\xEDnuo, a Administra\xE7\xE3o atesta no in\xEDcio de cada exerc\xEDcio a exist\xEAncia de cr\xE9ditos (art. 106, II).
{#vigencia.continuada}{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes ser\xE1 indicada ap\xF3s aprova\xE7\xE3o da Lei Or\xE7ament\xE1ria respectiva e libera\xE7\xE3o dos cr\xE9ditos correspondentes, mediante apostilamento.{/vigencia.continuada}

%% Nota AGU: a Administra\xE7\xE3o pode invocar o CDC como destinat\xE1ria final quando suas prerrogativas forem insuficientes (TCU, Ac\xF3rd\xE3o 2569/2018-Plen\xE1rio).
## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS

{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl} \u2013 FORO

{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n\xBA 14.133, de 2021.

{#local_data}> {local_data}{/local_data}

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

%% Nota AGU: a assinatura eletr\xF4nica do SEI n\xE3o dispensa as testemunhas (CPC, art. 784, \xA7 4\xBA); mantida a recomenda\xE7\xE3o de duas testemunhas (Nota 13/2021/DECOR/CGU/AGU).
{#testemunhas}> TESTEMUNHAS:
{*testemunhas}> {._n}- {.nome}
{/testemunhas}{/testemunhas}
`,"agu-contrato-obras":`@requer regime=14133
@fonte agu-contrato-obras
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
%% Modelo de Termo de Contrato \u2014 Obras e Servi\xE7os de Engenharia \u2014 Licita\xE7\xE3o e Contrata\xE7\xE3o Direta (AGU, dez/2025).
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# TERMO DE CONTRATO

> (Processo Administrativo n\xB0 {processo})

%% Nota AGU: "A UNI\xC3O" s\xF3 para \xF3rg\xE3o da Administra\xE7\xE3o Direta; nos demais casos, o nome da autarquia ou funda\xE7\xE3o.
::: CONTRATO ADMINISTRATIVO N\xBA {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas}, POR INTERM\xC9DIO DO (A) {cfc.setor_licitacoes|maiusculas} E {contratada.razao_social|maiusculas}.

%% Nota AGU (Parecer 4/2022/CNMLC): representantes identificados s\xF3 pelo nome; o da Administra\xE7\xE3o, tamb\xE9m pela matr\xEDcula funcional.
%% Nota AGU: se exigido seguro-garantia com cl\xE1usula de retomada, qualificar a seguradora no pre\xE2mbulo como INTERVENIENTE ANUENTE.
%% nomeacao: ato de nomea\xE7\xE3o da autoridade signat\xE1ria (Portaria, data, DOU, matr\xEDcula) \u2014 sem ele o trecho sai inteiro.
%% Origem: licitacao = {"concorrencia": true|false} (Concorr\xEAncia OU Preg\xE3o Eletr\xF4nico); sem licitacao \u2192 inexigibilidade (Inexigibilidade) OU Dispensa de Licita\xE7\xE3o (dispensa_eletronica escolhe o Aviso na vincula\xE7\xE3o).
O {cfc.nome}, por interm\xE9dio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}{#nomeacao}, nomeado(a) pela Portaria n\xBA {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matr\xEDcula Funcional n\xBA {nomeacao.matricula}{/nomeacao}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o n\xBA {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n\xBA 14.133, de 1\xBA de abril de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao}{#licitacao.concorrencia}Concorr\xEAncia{/licitacao.concorrencia}{^licitacao.concorrencia}Preg\xE3o Eletr\xF4nico{/licitacao.concorrencia}{/licitacao}{^licitacao}{#inexigibilidade}Inexigibilidade de Licita\xE7\xE3o{/inexigibilidade}{^inexigibilidade}Dispensa de Licita\xE7\xE3o{/inexigibilidade}{/licitacao} n\xBA {contratacao.numero}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de {objeto_contratacao}, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

%% Nota AGU: a tabela \xE9 meramente ilustrativa, ajustar ao caso concreto.
{\xA7} Objeto da contrata\xE7\xE3o:

| ITEM | ESPECIFICA\xC7\xC3O | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

%% O Edital da Licita\xE7\xE3o (licita\xE7\xE3o) OU A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta OU O Aviso de Dispensa Eletr\xF4nica.
{\xA7\xA7} {#licitacao}O Edital da Licita\xE7\xE3o;{/licitacao}{^licitacao}{#dispensa_eletronica}O Aviso de Dispensa Eletr\xF4nica;{/dispensa_eletronica}{^dispensa_eletronica}A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta;{/dispensa_eletronica}{/licitacao}

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

%% Regime do art. 46: empreitada por pre\xE7o global OU por pre\xE7o unit\xE1rio OU empreitada integral OU contrata\xE7\xE3o por tarefa OU contrata\xE7\xE3o integrada OU semi-integrada OU fornecimento e presta\xE7\xE3o de servi\xE7o associado.
%% Nota AGU: objeto com parte em pre\xE7o global e parte em pre\xE7o unit\xE1rio (sob demanda) \u2192 ajustar a cl\xE1usula.
{\xA7} O regime de execu\xE7\xE3o \xE9 o de {regime_execucao}.

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% Nota AGU: subitens 2.1 e 2.2 para contratos de escopo (art. 105).
{#vigencia.escopo}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do artigo 105 da Lei n\xB0 14.133, de 2021.

{\xA7} O prazo de vig\xEAncia ser\xE1 automaticamente prorrogado, independentemente de termo aditivo, quando o objeto n\xE3o for conclu\xEDdo no per\xEDodo firmado acima, ressalvadas as provid\xEAncias cab\xEDveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% OU \u2014 Nota AGU: arts. 106 e 107 e IN SEGES/MP 5/2017 (servi\xE7os continuados); Cadin impede aditamento de contratos firmados desde 16/09/2024 (Lei 10.522, art. 6\xBA-A).
{#vigencia.continuada}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n\xB0 14.133, de 2021.

{\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{\xA7\xA7} Estar formalmente demonstrado no processo que a forma de presta\xE7\xE3o dos servi\xE7os tem natureza continuada;

{\xA7\xA7} Seja juntado relat\xF3rio que discorra sobre a execu\xE7\xE3o do contrato, com informa\xE7\xF5es de que os servi\xE7os tenham sido prestados regularmente;

{\xA7\xA7} Seja juntada justificativa e motivo, por escrito, de que a Administra\xE7\xE3o mant\xE9m interesse na realiza\xE7\xE3o do servi\xE7o;

{\xA7\xA7} Haja manifesta\xE7\xE3o expressa do CONTRATADO informando o interesse na prorroga\xE7\xE3o;

{\xA7\xA7} Seja comprovado que o CONTRATADO mant\xE9m as condi\xE7\xF5es iniciais de habilita\xE7\xE3o; e

{\xA7\xA7} N\xE3o haja registro no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} Nas eventuais prorroga\xE7\xF5es contratuais, os custos n\xE3o renov\xE1veis j\xE1 pagos ou amortizados ao longo do primeiro per\xEDodo de vig\xEAncia da contrata\xE7\xE3o dever\xE3o ser reduzidos ou eliminados como condi\xE7\xE3o para a renova\xE7\xE3o.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.{/vigencia.continuada}

%% OU \u2014 Nota AGU: contrata\xE7\xF5es emergenciais (art. 75, VIII), seja o objeto de escopo ou continuado; prazo m\xE1ximo de um ano.
{#vigencia.emergencial}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrog\xE1vel, na forma do art. 75, VIII, da Lei n\xB0 14.133/2021.{/vigencia.emergencial}

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

%% Nota AGU: matriz de risco (art. 6\xBA, XXVII) obrigat\xF3ria em obras e servi\xE7os de grande vulto e nos regimes de contrata\xE7\xE3o integrada e semi-integrada (art. 22, \xA73\xBA); nos demais casos, opcional (arts. 22 e 103).
{#matriz_risco}Matriz de risco:

{#matriz_risco.contratante}{\xA7\xA7} Constituem riscos a serem suportados pelo CONTRATANTE:

{*matriz_risco.contratante}{\xA7\xA7\xA7} {.texto}

{/matriz_risco.contratante}{/matriz_risco.contratante}{#matriz_risco.contratado}{\xA7\xA7} Constituem riscos a serem suportados pelo CONTRATADO:

{*matriz_risco.contratado}{\xA7\xA7\xA7} {.texto}

{/matriz_risco.contratado}{/matriz_risco.contratado}{#matriz_risco.compartilhados}{\xA7\xA7} Constituem riscos a serem compartilhados pelas partes, na propor\xE7\xE3o de {matriz_risco.percentual_contratante} para o CONTRATANTE e {matriz_risco.percentual_contratado} para o CONTRATADO:

{*matriz_risco.compartilhados}{\xA7\xA7\xA7} {.texto}

{/matriz_risco.compartilhados}{/matriz_risco.compartilhados}{/matriz_risco}
## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 PRE\xC7O

%% Valor mensal com valor total OU s\xF3 o valor total.
{#valor_mensal}{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{\xA7} O valor total da contrata\xE7\xE3o \xE9 de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% Nota AGU: inserir se o contrato for de valor estimativo, com demanda vari\xE1vel.
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - REAJUSTE

{\xA7} As regras acerca do reajuste do valor contratual s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE

{\xA7} S\xE3o obriga\xE7\xF5es do CONTRATANTE:

{\xA7\xA7} Exigir o cumprimento de todas as obriga\xE7\xF5es assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{\xA7\xA7} Receber o objeto no prazo e condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia;

{\xA7\xA7} Notificar o CONTRATADO, por escrito, sobre v\xEDcios, defeitos incorre\xE7\xF5es, imperfei\xE7\xF5es, falhas ou irregularidades verificadas na execu\xE7\xE3o do objeto contratual, fixando prazo para que seja substitu\xEDdo, reparado ou corrigido, total ou parcialmente, \xE0s suas expensas, certificando-se de que as solu\xE7\xF5es por ele propostas sejam as mais adequadas;

{\xA7\xA7} Acompanhar e fiscalizar a execu\xE7\xE3o do contrato e o cumprimento das obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Comunicar a empresa para emiss\xE3o de Nota Fiscal relativa \xE0 parcela incontroversa da execu\xE7\xE3o do objeto, para efeito de liquida\xE7\xE3o e pagamento, quando houver controv\xE9rsia sobre a execu\xE7\xE3o do objeto, quanto \xE0 dimens\xE3o, qualidade e quantidade, conforme o art. 143 da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} Efetuar o pagamento ao CONTRATADO do valor correspondente \xE0 execu\xE7\xE3o do objeto, no prazo, forma e condi\xE7\xF5es estabelecidos no presente Contrato e no Termo de Refer\xEAncia;

{\xA7\xA7} Aplicar ao CONTRATADO as san\xE7\xF5es previstas na lei e neste Contrato;

{\xA7\xA7} N\xE3o praticar atos de inger\xEAncia na administra\xE7\xE3o do CONTRATADO, tais como:

{\xA7\xA7\xA7} indicar pessoas expressamente nominadas para executar direta ou indiretamente o objeto CONTRATADO;

{\xA7\xA7\xA7} fixar sal\xE1rio inferior ao definido em lei ou em ato normativo a ser pago pelo CONTRATADO;

{\xA7\xA7\xA7} estabelecer v\xEDnculo de subordina\xE7\xE3o com funcion\xE1rio do CONTRATADO;

{\xA7\xA7\xA7} definir forma de pagamento mediante exclusivo reembolso dos sal\xE1rios pagos;

{\xA7\xA7\xA7} demandar a funcion\xE1rio do CONTRATADO a execu\xE7\xE3o de tarefas fora do escopo do objeto da contrata\xE7\xE3o; e

{\xA7\xA7\xA7} prever exig\xEAncias que constituam interven\xE7\xE3o indevida da Administra\xE7\xE3o na gest\xE3o interna do CONTRATADO.

{\xA7\xA7} Cientificar o \xF3rg\xE3o de representa\xE7\xE3o judicial da Advocacia-Geral da Uni\xE3o para ado\xE7\xE3o das medidas cab\xEDveis quando do descumprimento de obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Explicitamente emitir decis\xE3o sobre todas as solicita\xE7\xF5es e reclama\xE7\xF5es relacionadas \xE0 execu\xE7\xE3o do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelat\xF3rios ou de nenhum interesse para a boa execu\xE7\xE3o do ajuste;

%% Nota AGU: dever de decidir (art. 123); sem prazo espec\xEDfico, vale um m\xEAs (art. 123, par\xE1grafo \xFAnico; Decreto 11.246/2022, art. 28).
{\xA7\xA7\xA7} A Administra\xE7\xE3o ter\xE1 o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorroga\xE7\xE3o motivada, por igual per\xEDodo.

%% Nota AGU: prazo de resposta ao pedido de reequil\xEDbrio (art. 92, XI); pode ser o mesmo do art. 123.
{\xA7\xA7} Responder eventuais pedidos de reestabelecimento do equil\xEDbrio econ\xF4mico-financeiro feitos pelo CONTRATADO no prazo m\xE1ximo de {prazo_reequilibrio};

%% Nota AGU: decorre do art. 137, \xA74\xBA \u2014 s\xF3 quando houver garantia.
{#garantia}{\xA7\xA7} Notificar os emitentes das garantias quanto ao in\xEDcio de processo administrativo para apura\xE7\xE3o de descumprimento de cl\xE1usulas contratuais;{/garantia}

{\xA7\xA7} Comunicar o CONTRATADO na hip\xF3tese de posterior altera\xE7\xE3o do projeto pelo CONTRATANTE, no caso do art. 93, \xA72\xBA, da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} Fornecer por escrito as informa\xE7\xF5es necess\xE1rias para o desenvolvimento dos servi\xE7os objeto do contrato;

{\xA7\xA7} Realizar avalia\xE7\xF5es peri\xF3dicas da qualidade dos servi\xE7os, ap\xF3s seu recebimento;

{\xA7\xA7} Assegurar que o ambiente de trabalho, inclusive seus equipamentos e instala\xE7\xF5es, apresentem condi\xE7\xF5es adequadas ao cumprimento, pelo CONTRATADO, das normas de seguran\xE7a e sa\xFAde no trabalho, quando o servi\xE7o for executado em suas depend\xEAncias, ou em local por ela designado;

{\xA7\xA7} Previamente \xE0 expedi\xE7\xE3o da ordem de servi\xE7o, verificar pend\xEAncias, liberar \xE1reas e/ou adotar provid\xEAncias cab\xEDveis para a regularidade do in\xEDcio da sua execu\xE7\xE3o.

%% Opcional (vermelho): documenta\xE7\xE3o exigida para o recebimento definitivo da obra.
{#documentos_recebimento}{\xA7\xA7} Exigir do CONTRATADO que providencie a seguinte documenta\xE7\xE3o como condi\xE7\xE3o indispens\xE1vel para o recebimento definitivo de objeto, quando for o caso:

{\xA7\xA7\xA7} "As built", elaborado pelo respons\xE1vel por sua execu\xE7\xE3o;

{\xA7\xA7\xA7} Comprova\xE7\xE3o das liga\xE7\xF5es definitivas de energia, \xE1gua, telefone e g\xE1s;

{\xA7\xA7\xA7} Laudo de vistoria do corpo de bombeiros aprovando o servi\xE7o;

{\xA7\xA7\xA7} Carta "habite-se", emitida pela prefeitura; e

{\xA7\xA7\xA7} Certid\xE3o negativa de d\xE9bitos previdenci\xE1rios espec\xEDfica para o registro da obra junto ao Cart\xF3rio de Registro de Im\xF3veis;{/documentos_recebimento}

%% Opcional (vermelho): arquivamento da documenta\xE7\xE3o da obra.
{#arquivar_documentos}{\xA7\xA7} Arquivar, entre outros documentos, de projetos, "as built", especifica\xE7\xF5es t\xE9cnicas, or\xE7amentos, termos de recebimento, contratos e aditamentos, relat\xF3rios de inspe\xE7\xF5es t\xE9cnicas ap\xF3s o recebimento do servi\xE7o e notifica\xE7\xF5es expedidas.{/arquivar_documentos}

{\xA7} A Administra\xE7\xE3o n\xE3o responder\xE1 por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados \xE0 execu\xE7\xE3o do contrato, bem como por qualquer dano causado a terceiros em decorr\xEAncia de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

%% Nota AGU: obriga\xE7\xF5es gerais \u2014 o \xF3rg\xE3o verifica quais se aplicam ao objeto (pode incluir, modificar ou excluir, justificando nos autos).
## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATADO

{\xA7} O CONTRATADO deve cumprir todas as obriga\xE7\xF5es constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execu\xE7\xE3o do objeto, observando, ainda, as obriga\xE7\xF5es a seguir dispostas:

{\xA7} Atender \xE0s determina\xE7\xF5es regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informa\xE7\xE3o por eles solicitados;

{\xA7} Reparar, corrigir, remover, reconstruir ou substituir, \xE0s suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e servi\xE7os nos quais se verificarem v\xEDcios, defeitos ou incorre\xE7\xF5es resultantes da execu\xE7\xE3o ou dos materiais empregados;

{\xA7} Responsabilizar-se pelos v\xEDcios e danos decorrentes da execu\xE7\xE3o do objeto, bem como por todo e qualquer dano causado \xE0 Administra\xE7\xE3o ou terceiros, n\xE3o reduzindo essa responsabilidade a fiscaliza\xE7\xE3o ou o acompanhamento da execu\xE7\xE3o contratual pelo CONTRATANTE, que ficar\xE1 autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

{\xA7} Quando n\xE3o for poss\xEDvel a verifica\xE7\xE3o da regularidade no Sistema de Cadastro de Fornecedores \u2013 SICAF, o CONTRATADO dever\xE1 entregar ao setor respons\xE1vel pela fiscaliza\xE7\xE3o do contrato, at\xE9 o dia trinta do m\xEAs seguinte ao da presta\xE7\xE3o dos servi\xE7os, os seguintes documentos:

{\xA7\xA7} prova de regularidade relativa \xE0 Seguridade Social;

{\xA7\xA7} certid\xE3o conjunta relativa aos tributos federais e \xE0 D\xEDvida Ativa da Uni\xE3o;

{\xA7\xA7} certid\xF5es que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domic\xEDlio ou sede do CONTRATADO;

{\xA7\xA7} Certid\xE3o de Regularidade do FGTS \u2013 CRF; e

{\xA7\xA7} Certid\xE3o Negativa de D\xE9bitos Trabalhistas \u2013 CNDT.

{\xA7} Responsabilizar-se pelo cumprimento das obriga\xE7\xF5es previstas em Acordo, Conven\xE7\xE3o, Diss\xEDdio Coletivo de Trabalho ou equivalentes das categorias abrangidas pelo contrato, por todas as obriga\xE7\xF5es trabalhistas, sociais, previdenci\xE1rias, tribut\xE1rias, fiscais, comerciais e as demais previstas em legisla\xE7\xE3o espec\xEDfica, cuja inadimpl\xEAncia n\xE3o transfere a responsabilidade ao CONTRATANTE e n\xE3o poder\xE1 onerar o objeto do contrato;

{\xA7} Comunicar ao Fiscal do contrato tempestivamente, observada a urg\xEAncia da situa\xE7\xE3o, qualquer ocorr\xEAncia anormal ou acidente que se verifique no local da execu\xE7\xE3o do objeto contratual, n\xE3o ultrapassando o prazo de 24 (vinte e quatro) horas;

{\xA7} Paralisar, por determina\xE7\xE3o do CONTRATANTE, qualquer atividade que n\xE3o esteja sendo executada de acordo com a boa t\xE9cnica ou que ponha em risco a seguran\xE7a de pessoas ou bens de terceiros;

{\xA7} Manter, durante toda a vig\xEAncia do contrato, em compatibilidade com as obriga\xE7\xF5es assumidas, todas as condi\xE7\xF5es exigidas para habilita\xE7\xE3o na licita\xE7\xE3o ou para qualifica\xE7\xE3o na contrata\xE7\xE3o direta;

{\xA7} Cumprir, durante todo o per\xEDodo de execu\xE7\xE3o do contrato, a reserva de cargos prevista em lei para pessoa com defici\xEAncia, para reabilitado da Previd\xEAncia Social ou para aprendiz, bem como as reservas de cargos previstas na legisla\xE7\xE3o;

{\xA7} Comprovar a reserva de cargos a que se refere a cl\xE1usula acima, no prazo fixado pelo fiscal do contrato, com a indica\xE7\xE3o dos empregados que preencheram as referidas vagas;

{\xA7} Guardar sigilo sobre todas as informa\xE7\xF5es obtidas em decorr\xEAncia do cumprimento do contrato;

{\xA7} Arcar com o \xF4nus decorrente de eventual equ\xEDvoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos vari\xE1veis decorrentes de fatores futuros e incertos, devendo complement\xE1-los, caso o previsto inicialmente em sua proposta n\xE3o seja satisfat\xF3rio para o atendimento do objeto da contrata\xE7\xE3o, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei n\xBA 14.133, de 2021;

{\xA7} Cumprir, al\xE9m dos postulados legais vigentes de \xE2mbito federal, estadual ou municipal, as normas de seguran\xE7a do CONTRATANTE;

{\xA7} Alocar os empregados necess\xE1rios ao perfeito cumprimento das cl\xE1usulas deste contrato, com habilita\xE7\xE3o e conhecimento adequados;

{\xA7} Prestar os servi\xE7os dentro dos par\xE2metros e rotinas estabelecidos;

{\xA7} Fornecer todos os materiais, equipamentos, ferramentas e utens\xEDlios demandados, em quantidade, qualidade e tecnologia adequadas, com a observ\xE2ncia \xE0s recomenda\xE7\xF5es aceitas pela boa t\xE9cnica, normas e legisla\xE7\xE3o de reg\xEAncia;

{\xA7} Conduzir os trabalhos com estrita observ\xE2ncia \xE0s normas da legisla\xE7\xE3o pertinente, cumprindo as determina\xE7\xF5es dos Poderes P\xFAblicos, mantendo sempre limpo o local de execu\xE7\xE3o do objeto e nas melhores condi\xE7\xF5es de seguran\xE7a, higiene e disciplina;

{\xA7} Submeter previamente, por escrito, ao CONTRATANTE, para an\xE1lise e aprova\xE7\xE3o, quaisquer mudan\xE7as nos m\xE9todos executivos que fujam \xE0s especifica\xE7\xF5es do memorial descritivo ou instrumento cong\xEAnere;

{\xA7} Cumprir as normas de prote\xE7\xE3o ao trabalho, inclusive aquelas relativas \xE0 seguran\xE7a e \xE0 sa\xFAde no trabalho;

{\xA7} N\xE3o submeter os trabalhadores a condi\xE7\xF5es degradantes de trabalho, jornadas exaustivas, servid\xE3o por d\xEDvida ou trabalhos for\xE7ados;

{\xA7} N\xE3o permitir a utiliza\xE7\xE3o de qualquer trabalho do menor de dezesseis anos de idade, exceto na condi\xE7\xE3o de aprendiz para os maiores de quatorze anos de idade, observada a legisla\xE7\xE3o pertinente;

{\xA7} N\xE3o submeter o menor de dezoito anos de idade \xE0 realiza\xE7\xE3o de trabalho noturno e em condi\xE7\xF5es perigosas e insalubres e \xE0 realiza\xE7\xE3o de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto n\xBA 6.481, de 12 de junho de 2008;

{\xA7} Receber e dar o tratamento adequado a den\xFAncias de discrimina\xE7\xE3o, viol\xEAncia e ass\xE9dio no ambiente de trabalho;

{\xA7} Manter preposto aceito pela Administra\xE7\xE3o no local da obra ou do servi\xE7o para represent\xE1-lo na execu\xE7\xE3o do contrato;

{\xA7\xA7} A indica\xE7\xE3o ou a manuten\xE7\xE3o do preposto da empresa poder\xE1 ser recusada pelo \xF3rg\xE3o ou entidade, desde que devidamente justificada, devendo a empresa designar outro para o exerc\xEDcio da atividade.

{\xA7} N\xE3o contratar, durante a vig\xEAncia do contrato, c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau, de dirigente do CONTRATANTE ou de agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou que atue na fiscaliza\xE7\xE3o ou gest\xE3o do contrato, nos termos do artigo 48, par\xE1grafo \xFAnico, da Lei n\xBA 14.133, de 2021;

{\xA7} Prestar todo esclarecimento ou informa\xE7\xE3o solicitada pelo CONTRATANTE ou por seus prepostos, garantindo-lhes o acesso, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a guarda, manuten\xE7\xE3o e vigil\xE2ncia de materiais, ferramentas, e tudo o que for necess\xE1rio \xE0 execu\xE7\xE3o do objeto, durante a vig\xEAncia do contrato;

{\xA7} Assegurar aos seus trabalhadores ambiente de trabalho e instala\xE7\xF5es em condi\xE7\xF5es adequadas ao cumprimento das normas de sa\xFAde, seguran\xE7a e bem-estar no trabalho;

{\xA7} Fornecer equipamentos de prote\xE7\xE3o individual (EPI) e equipamentos de prote\xE7\xE3o coletiva (EPC),quando for o caso;

{\xA7} Garantir o acesso do CONTRATANTE, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a organiza\xE7\xE3o t\xE9cnica e administrativa dos servi\xE7os, de modo a conduzi-los eficaz e eficientemente, de acordo com os documentos e especifica\xE7\xF5es que integram o Termo de Refer\xEAncia, no prazo determinado;

{\xA7} Instruir seus empregados quanto \xE0 necessidade de acatar as normas internas da Administra\xE7\xE3o;

{\xA7} Instruir seus empregados a respeito das atividades a serem desempenhadas, alertando-os a n\xE3o executar atividades n\xE3o abrangidas pelo contrato, devendo o CONTRATADO relatar ao CONTRATANTE toda e qualquer ocorr\xEAncia neste sentido, a fim de evitar desvio de fun\xE7\xE3o;

{\xA7} Efetuar comunica\xE7\xE3o ao CONTRATANTE, assim que tiver ci\xEAncia da impossibilidade de realiza\xE7\xE3o ou finaliza\xE7\xE3o do servi\xE7o no prazo estabelecido, para ado\xE7\xE3o de a\xE7\xF5es de conting\xEAncia cab\xEDveis.

%% Nota AGU: servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica \u2192 incluir estes itens (art. 47, \xA72\xBA).
{#manutencao}{\xA7} Realizar os servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica no(s) seguinte(s) local(is) {manutencao.locais};

{\xA7} O t\xE9cnico dever\xE1 se deslocar ao local da reparti\xE7\xE3o, salvo se o CONTRATADO tiver unidade de presta\xE7\xE3o de servi\xE7os em dist\xE2ncia de {manutencao.distancia} do local demandado.{/manutencao}

%% Nota AGU: itens para objeto de elabora\xE7\xE3o de projetos ou servi\xE7os t\xE9cnicos especializados, inclusive software (art. 93, caput).
{#transicao_contratual}{\xA7} Realizar a transi\xE7\xE3o contratual com transfer\xEAncia de conhecimento, tecnologia e t\xE9cnicas empregadas, sem perda de informa\xE7\xF5es, podendo exigir, inclusive, a capacita\xE7\xE3o dos t\xE9cnicos do CONTRATANTE ou da nova empresa que continuar\xE1 a execu\xE7\xE3o dos servi\xE7os;{/transicao_contratual}

%% Cess\xE3o de direitos patrimoniais (art. 93, caput); o \xA72\xBA admite dispens\xE1-la em pesquisa e desenvolvimento (Lei 10.973/2004).
{#cessao_direitos}{\xA7} Ceder ao CONTRATANTE todos os direitos patrimoniais relativos ao objeto contratado, o qual poder\xE1 ser livremente utilizado e/ou alterado em outras ocasi\xF5es, sem necessidade de nova autoriza\xE7\xE3o do CONTRATADO.

%% Nota AGU: projeto de obra imaterial de car\xE1ter tecnol\xF3gico, insuscet\xEDvel de privil\xE9gio (art. 93, \xA71\xBA).
{#cessao_direitos.obra_imaterial}{\xA7\xA7} Considerando que o projeto contratado se refere a obra imaterial de car\xE1ter tecnol\xF3gico, insuscet\xEDvel de privil\xE9gio, a cess\xE3o dos direitos a que se refere o subitem acima inclui o fornecimento de todos os dados, documentos e elementos de informa\xE7\xE3o pertinentes \xE0 tecnologia de concep\xE7\xE3o, desenvolvimento, fixa\xE7\xE3o em suporte f\xEDsico de qualquer natureza e aplica\xE7\xE3o da obra.{/cessao_direitos.obra_imaterial}{/cessao_direitos}

{\xA7} Manter os empregados nos hor\xE1rios predeterminados pelo CONTRATANTE;

{\xA7} Apresentar os empregados devidamente identificados por meio de crach\xE1;

{\xA7} Apresentar ao CONTRATANTE, quando for o caso, a rela\xE7\xE3o nominal dos empregados que adentrar\xE3o no \xF3rg\xE3o para a execu\xE7\xE3o do servi\xE7o;

{\xA7} Observar os preceitos da legisla\xE7\xE3o sobre a jornada de trabalho, conforme a categoria profissional;

{\xA7} Atender \xE0s solicita\xE7\xF5es do CONTRATANTE quanto \xE0 substitui\xE7\xE3o dos empregados alocados, no prazo fixado pela fiscaliza\xE7\xE3o do contrato, nos casos em que ficar constatado descumprimento das obriga\xE7\xF5es relativas \xE0 execu\xE7\xE3o do servi\xE7o, conforme descrito nas especifica\xE7\xF5es do objeto;

{\xA7} Instruir os seus empregados, quanto \xE0 preven\xE7\xE3o de inc\xEAndios nas \xE1reas do CONTRATANTE;

{\xA7} Adotar as provid\xEAncias e precau\xE7\xF5es necess\xE1rias, inclusive consulta nos respectivos \xF3rg\xE3os, se necess\xE1rio for, a fim de que n\xE3o venham a ser danificadas as redes hidrossanit\xE1rias, el\xE9tricas e de comunica\xE7\xE3o;

%% Nota AGU: o TR define os profissionais e, com isso, os conselhos (em engenharia, normalmente CREA, CAU e CFT).
{\xA7} Estar registrada ou inscrita no Conselho Profissional competente, conforme as \xE1reas de atua\xE7\xE3o previstas no Termo de Refer\xEAncia, em plena validade;

{\xA7} Obter junto aos \xF3rg\xE3os competentes, conforme o caso, as licen\xE7as necess\xE1rias e demais documentos e autoriza\xE7\xF5es exig\xEDveis, na forma da legisla\xE7\xE3o aplic\xE1vel;

{\xA7} Elaborar o Di\xE1rio de Obra, incluindo diariamente, pelo Engenheiro preposto respons\xE1vel, as informa\xE7\xF5es sobre o andamento do empreendimento, tais como, n\xFAmero de funcion\xE1rios, de equipamentos, condi\xE7\xF5es de trabalho, condi\xE7\xF5es meteorol\xF3gicas, servi\xE7os executados, registro de ocorr\xEAncias e outros fatos relacionados, bem como os comunicados \xE0 Fiscaliza\xE7\xE3o e situa\xE7\xE3o das atividades em rela\xE7\xE3o ao cronograma previsto;

{\xA7} Refazer, \xE0s suas expensas, os trabalhos executados em desacordo com o estabelecido nas especifica\xE7\xF5es, bem como substituir aqueles realizados com materiais defeituosos ou com v\xEDcio de constru\xE7\xE3o, pelo prazo de 05 (cinco) anos, contado da data de emiss\xE3o do Termo de Recebimento Definitivo;

{\xA7} Utilizar somente mat\xE9ria-prima florestal procedente, nos termos do artigo 11 do Decreto n\xB0 5.975, de 2006, de:

{\xA7\xA7} manejo florestal, realizado por meio de Plano de Manejo Florestal Sustent\xE1vel - PMFS devidamente aprovado pelo \xF3rg\xE3o competente do Sistema Nacional do Meio Ambiente - SISNAMA;

{\xA7\xA7} supress\xE3o da vegeta\xE7\xE3o natural, devidamente autorizada pelo \xF3rg\xE3o competente do Sistema Nacional do Meio Ambiente - SISNAMA;

{\xA7\xA7} florestas plantadas; e

{\xA7\xA7} outras fontes de biomassa florestal, definidas em normas espec\xEDficas do \xF3rg\xE3o ambiental competente.

{\xA7} Comprovar a proced\xEAncia legal dos produtos ou subprodutos florestais utilizados em cada etapa da execu\xE7\xE3o contratual, nos termos do artigo 4\xB0, inciso IX, da Instru\xE7\xE3o Normativa SLTI/MP n\xB0 1, de 19/01/2010, por ocasi\xE3o da respectiva medi\xE7\xE3o, mediante a apresenta\xE7\xE3o dos seguintes documentos, conforme o caso:

{\xA7\xA7} C\xF3pias autenticadas das notas fiscais de aquisi\xE7\xE3o dos produtos ou subprodutos florestais;

{\xA7\xA7} C\xF3pia dos Comprovantes de Registro do fornecedor e do transportador dos produtos ou subprodutos florestais junto ao Cadastro T\xE9cnico Federal de Atividades Potencialmente Poluidoras ou Utilizadoras de Recursos Ambientais - CTF, mantido pelo IBAMA, quando tal inscri\xE7\xE3o for obrigat\xF3ria, acompanhados dos respectivos Certificados de Regularidade v\xE1lidos, conforme artigo 17, inciso II, da Lei n\xB0 6.938, de 1981, e legisla\xE7\xE3o correlata;

{\xA7\xA7} Documento de Origem Florestal \u2013 DOF, institu\xEDdo pela Portaria n\xB0 253, de 18/08/2006, do Minist\xE9rio do Meio Ambiente, e Instru\xE7\xE3o Normativa IBAMA n\xB0 21, de 24/12/2014, quando se tratar de produtos ou subprodutos florestais de origem nativa cujo transporte e armazenamento exijam a emiss\xE3o de tal licen\xE7a obrigat\xF3ria; e

{\xA7\xA7} Caso os produtos ou subprodutos florestais utilizados na execu\xE7\xE3o contratual tenham origem em Estado que possua documento de controle pr\xF3prio, o CONTRATADO dever\xE1 apresent\xE1-lo, em complementa\xE7\xE3o ao DOF, a fim de demonstrar a regularidade do transporte e armazenamento nos limites do territ\xF3rio estadual.

{\xA7} Observar as diretrizes, crit\xE9rios e procedimentos para a gest\xE3o dos res\xEDduos da constru\xE7\xE3o civil estabelecidos na Resolu\xE7\xE3o n\xBA 307, de 05/07/2002, com as altera\xE7\xF5es posteriores, do Conselho Nacional de Meio Ambiente - CONAMA, conforme artigo 4\xB0, \xA7\xA7 2\xB0 e 3\xB0, da Instru\xE7\xE3o Normativa SLTI/MP n\xB0 1, de 2010, nos seguintes termos:

{\xA7\xA7} O gerenciamento dos res\xEDduos origin\xE1rios da contrata\xE7\xE3o dever\xE1 obedecer \xE0s diretrizes t\xE9cnicas e procedimentos do Programa Municipal de Gerenciamento de Res\xEDduos da Constru\xE7\xE3o Civil, ou do Projeto de Gerenciamento de Res\xEDduos da Constru\xE7\xE3o Civil apresentado ao \xF3rg\xE3o competente, conforme o caso.

{\xA7\xA7} Nos termos dos artigos 3\xB0 e 10\xB0 da Resolu\xE7\xE3o CONAMA n\xB0 307, de 2002, o CONTRATADO dever\xE1 providenciar a destina\xE7\xE3o ambientalmente adequada dos res\xEDduos da constru\xE7\xE3o civil origin\xE1rios da contrata\xE7\xE3o, obedecendo, no que couber, aos seguintes procedimentos:

{\xA7\xA7\xA7} res\xEDduos Classe A (reutiliz\xE1veis ou recicl\xE1veis como agregados): dever\xE3o ser reutilizados ou reciclados na forma de agregados, ou encaminhados a aterros de res\xEDduos classe A de preserva\xE7\xE3o de material para usos futuros.

{\xA7\xA7\xA7} res\xEDduos Classe B (recicl\xE1veis para outras destina\xE7\xF5es): dever\xE3o ser reutilizados, reciclados ou encaminhados a \xE1reas de armazenamento tempor\xE1rio, sendo dispostos de modo a permitir a sua utiliza\xE7\xE3o ou reciclagem futura.

{\xA7\xA7\xA7} res\xEDduos Classe C (para os quais n\xE3o foram desenvolvidas tecnologias ou aplica\xE7\xF5es economicamente vi\xE1veis que permitam a sua reciclagem/recupera\xE7\xE3o): dever\xE3o ser armazenados, transportados e destinados em conformidade com as normas t\xE9cnicas espec\xEDficas.

{\xA7\xA7\xA7} res\xEDduos Classe D (perigosos, contaminados ou prejudiciais \xE0 sa\xFAde): dever\xE3o ser armazenados, transportados, reutilizados e destinados em conformidade com as normas t\xE9cnicas espec\xEDficas.

{\xA7\xA7} Em nenhuma hip\xF3tese o CONTRATADO poder\xE1 dispor os res\xEDduos origin\xE1rios da contrata\xE7\xE3o em aterros de res\xEDduos s\xF3lidos urbanos, \xE1reas de \u201Cbota fora\u201D, encostas, corpos d\xB4\xE1gua, lotes vagos e \xE1reas protegidas por Lei, bem como em \xE1reas n\xE3o licenciadas.

{\xA7\xA7} Para fins de fiscaliza\xE7\xE3o do fiel cumprimento do Programa Municipal de Gerenciamento de Res\xEDduos da Constru\xE7\xE3o Civil, ou do Projeto de Gerenciamento de Res\xEDduos da Constru\xE7\xE3o Civil, conforme o caso, o CONTRATADO comprovar\xE1, sob pena de multa, que todos os res\xEDduos removidos est\xE3o acompanhados de Controle de Transporte de Res\xEDduos, em conformidade com as normas da Ag\xEAncia Brasileira de Normas T\xE9cnicas - ABNT, ABNT NBR ns. 15.112, 15.113, 15.114, 15.115 e 15.116, de 2004.

{\xA7} Observar as seguintes diretrizes de car\xE1ter ambiental:

{\xA7\xA7} Qualquer instala\xE7\xE3o, equipamento ou processo, situado em local fixo, que libere ou emita mat\xE9ria para a atmosfera, por emiss\xE3o pontual ou fugitiva, utilizado na execu\xE7\xE3o contratual, dever\xE1 respeitar os limites m\xE1ximos de emiss\xE3o de poluentes admitidos na Resolu\xE7\xE3o CONAMA n\xB0 382, de 2006, e legisla\xE7\xE3o correlata, de acordo com o poluente e o tipo de fonte.

{\xA7\xA7} Na execu\xE7\xE3o contratual, conforme o caso, a emiss\xE3o de ru\xEDdos n\xE3o poder\xE1 ultrapassar os n\xEDveis considerados aceit\xE1veis pela Norma NBR-10.151 - Avalia\xE7\xE3o do Ru\xEDdo em \xC1reas Habitadas visando o conforto da comunidade, da Associa\xE7\xE3o Brasileira de Normas T\xE9cnicas - ABNT, ou aqueles estabelecidos na NBR-10.152 - N\xEDveis de Ru\xEDdo para conforto ac\xFAstico, da Associa\xE7\xE3o Brasileira de Normas T\xE9cnicas - ABNT, nos termos da Resolu\xE7\xE3o CONAMA n\xB0 01, de 1990, e legisla\xE7\xE3o correlata.

{\xA7} Nos termos do artigo 4\xB0, \xA7 3\xB0, da Instru\xE7\xE3o Normativa SLTI/MP n\xB0 1, de 2010, dever\xE3o ser utilizados, na execu\xE7\xE3o contratual, agregados reciclados, sempre que existir a oferta de tais materiais, capacidade de suprimento e custo inferior em rela\xE7\xE3o aos agregados naturais, inserindo-se na planilha de forma\xE7\xE3o de pre\xE7os os custos correspondentes.

{\xA7} Responder por qualquer acidente de trabalho na execu\xE7\xE3o dos servi\xE7os, por uso indevido de patentes registradas em nome de terceiros, por danos resultantes de defeitos ou incorre\xE7\xF5es dos servi\xE7os ou dos bens do CONTRATANTE, de seus funcion\xE1rios ou de terceiros, ainda que ocorridos em via p\xFAblica junto ao servi\xE7o de engenharia.

{\xA7} Realizar, conforme o caso, por meio de laborat\xF3rios previamente aprovados pela fiscaliza\xE7\xE3o e sob suas custas, os testes, ensaios, exames e provas que lhe caibam necess\xE1rias ao controle de qualidade dos materiais, servi\xE7os e equipamentos a serem aplicados nos trabalhos, conforme procedimento previsto nas especifica\xE7\xF5es.

{\xA7} Providenciar, conforme o caso, as liga\xE7\xF5es definitivas das utilidades previstas no projeto (\xE1gua, esgoto, g\xE1s, energia el\xE9trica, telefone etc.), bem como atuar junto aos \xF3rg\xE3os federais, estaduais e municipais e concession\xE1rias de servi\xE7os p\xFAblicos para a obten\xE7\xE3o de licen\xE7as e regulariza\xE7\xE3o dos servi\xE7os e atividades conclu\xEDdas (ex.: Habite-se, Licen\xE7a Ambiental de Opera\xE7\xE3o etc.).

%% Nota AGU: incluir se o CONTRATANTE atribuiu ao CONTRATADO a elabora\xE7\xE3o do projeto executivo.
{#projeto_executivo_contratado}{\xA7} Fornecer os projetos executivos desenvolvidos pelo CONTRATADO, que formar\xE3o um conjunto de documentos t\xE9cnicos, gr\xE1ficos e descritivos referentes aos segmentos especializados de engenharia, previamente e devidamente compatibilizados, de modo a considerar todas as poss\xEDveis interfer\xEAncias capazes de oferecer impedimento total ou parcial, permanente ou tempor\xE1rio, \xE0 execu\xE7\xE3o do empreendimento, de maneira a abrang\xEA-la em seu todo, compreendendo a completa caracteriza\xE7\xE3o e entendimento de todas as suas especifica\xE7\xF5es t\xE9cnicas, para posterior execu\xE7\xE3o e implanta\xE7\xE3o do objeto garantindo a plena compreens\xE3o das informa\xE7\xF5es prestadas, bem como sua aplica\xE7\xE3o correta nos trabalhos;

{\xA7\xA7} A elabora\xE7\xE3o dos projetos executivos dever\xE1 partir das solu\xE7\xF5es desenvolvidas nos anteprojetos constantes neste Termo de Refer\xEAncia e seus anexos (Caderno de Encargos e Especifica\xE7\xF5es T\xE9cnicas) e apresentar o detalhamento dos elementos construtivos e especifica\xE7\xF5es t\xE9cnicas, incorporando as altera\xE7\xF5es exigidas pelas m\xFAtuas interfer\xEAncias entre os diversos projetos.{/projeto_executivo_contratado}

%% Opcional (vermelho): servi\xE7os de natureza intelectual \u2192 reuni\xE3o inicial registrada em ata.
{#natureza_intelectual}{\xA7} Em se tratando de atividades que envolvam servi\xE7os de natureza intelectual, ap\xF3s a assinatura do contrato, o CONTRATADO dever\xE1 participar de reuni\xE3o inicial, devidamente registrada em Ata, para dar in\xEDcio \xE0 execu\xE7\xE3o do servi\xE7o, com o esclarecimento das obriga\xE7\xF5es contratuais, em que estejam presentes os t\xE9cnicos respons\xE1veis pela elabora\xE7\xE3o do termo de refer\xEAncia, o gestor do contrato, o fiscal t\xE9cnico do contrato, o fiscal administrativo do contrato, se houver, os t\xE9cnicos da \xE1rea requisitante, o preposto da empresa e os gerentes das \xE1reas que executar\xE3o os servi\xE7os contratados.{/natureza_intelectual}

%% Nota AGU: cl\xE1usula necess\xE1ria se a contrata\xE7\xE3o envolver, de qualquer forma, tratamento de dados pessoais (LGPD); disposi\xE7\xF5es indicativas, ajust\xE1veis ao objeto.
{#lgpd}## CL\xC1USULA {\xA7cl} \u2013 OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n\xBA 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de suboperadores e subcontratados o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA7 1\xBA do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O

%% Nota AGU: exigir ou n\xE3o a garantia \xE9 crit\xE9rio da Administra\xE7\xE3o (salvo norma que a obrigue); n\xE3o exigindo, justificar nos autos (ETP e riscos).
{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} Ser\xE1 exigida a presta\xE7\xE3o de garantia na presente contrata\xE7\xE3o, conforme regras constantes do Termo de Refer\xEAncia.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} As regras acerca de infra\xE7\xF5es e san\xE7\xF5es administrativas referentes \xE0 execu\xE7\xE3o do contrato s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL

%% Contratos de escopo (art. 105).
{#vigencia.escopo}{\xA7} O contrato ser\xE1 extinto quando cumpridas as obriga\xE7\xF5es de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{\xA7} Se as obriga\xE7\xF5es n\xE3o forem cumpridas no prazo estipulado, a vig\xEAncia ficar\xE1 prorrogada at\xE9 a conclus\xE3o do objeto, caso em que dever\xE1 a Administra\xE7\xE3o providenciar a readequa\xE7\xE3o do cronograma fixado para o contrato.

{\xA7} Quando a n\xE3o conclus\xE3o do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{\xA7\xA7} ficar\xE1 ele constitu\xEDdo em mora, sendo-lhe aplic\xE1veis as respectivas san\xE7\xF5es administrativas; e

{\xA7\xA7} poder\xE1 a Administra\xE7\xE3o optar pela extin\xE7\xE3o do contrato e, nesse caso, adotar\xE1 as medidas admitidas em lei para a continuidade da execu\xE7\xE3o contratual.{/vigencia.escopo}

%% OU \u2014 Nota AGU: contratos cont\xEDnuos (art. 106); extin\xE7\xE3o antecipada conforme art. 106, III e \xA71\xBA, e ON AGU n\xBA 98/2025.
{#vigencia.continuada}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, mediante justificativa formal de que n\xE3o disp\xF5e de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou de que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n\xBA 14.133, de 2021.{/vigencia.continuada}

%% OU \u2014 Nota AGU: contratos decorrentes da dispensa do art. 75, VIII.
{#vigencia.emergencial}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.\xBA 14.133/2021, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.{/vigencia.emergencial}

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei n\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Da rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio.

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou na contrata\xE7\xE3o direta, ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau.

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos arts. 124 e seguintes da Lei n\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato, e, no caso de reforma de edif\xEDcio ou de equipamento, o limite para os acr\xE9scimos ser\xE1 de 50% (cinquenta por cento).

%% Nota AGU: Parecer 61/2024/DECOR/CGU \u2014 supress\xE3o consensual acima de 25% \xE9 poss\xEDvel, fundamentada.
{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs.

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

%% Os itens abaixo s\xE3o numerados I) a VI) no modelo (lista autom\xE1tica do Word); o motor n\xE3o tem numera\xE7\xE3o romana.
{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o correr\xE3o \xE0 conta de recursos espec\xEDficos consignados no Or\xE7amento Geral da Uni\xE3o deste exerc\xEDcio, na dota\xE7\xE3o abaixo discriminada:

> Gest\xE3o/unidade: {cfc.uasg};
> Fonte de recursos: {dotacao.fonte};
> Programa de trabalho: {dotacao.projeto};
> Elemento de despesa: {dotacao.conta}; e
> Plano interno: {dotacao.plano_interno}; e
> Nota de empenho: {dotacao.empenho};

%% Nota AGU: art. 106, II \u2014 contratos continuados: atestar cr\xE9ditos no in\xEDcio de cada exerc\xEDcio.
{#vigencia.continuada}{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes ser\xE1 indicada ap\xF3s aprova\xE7\xE3o da Lei Or\xE7ament\xE1ria respectiva e libera\xE7\xE3o dos cr\xE9ditos correspondentes, mediante apostilamento.{/vigencia.continuada}

%% Nota AGU: TCU, Ac\xF3rd\xE3o 2569/2018-Plen\xE1rio \u2014 CDC aplic\xE1vel \xE0 Administra\xE7\xE3o como destinat\xE1ria final.
## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS

{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl}\u2013 FORO

{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n\xBA 14.133, de 2021.

%% Local e data (vermelho): opcional \u2014 no SEI a data sai da assinatura eletr\xF4nica.
{#local_data}> {local_data}{/local_data}

%% Nota AGU: a assinatura no SEI n\xE3o dispensa as testemunhas (CPC, art. 784, \xA74\xBA; Nota 13/2021/DECOR/CGU) \u2014 recomenda-se duas.
> **{cfc.nome|maiusculas}**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

{#testemunhas}> TESTEMUNHAS:
{*testemunhas}> {._n}- {.nome}
{/testemunhas}{/testemunhas}
`,"agu-contrato-servicos-com-mo":`@requer regime=14133
@fonte agu-contrato-servicos-com-mo
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
%% Termo de contrato de servi\xE7os cont\xEDnuos com regime de dedica\xE7\xE3o exclusiva de m\xE3o de obra, vers\xE3o dez/2025. Uso no CFC: contrato decorrente de LICITA\xC7\xC3O (preg\xE3o eletr\xF4nico ou concorr\xEAncia). Contrata\xE7\xE3o direta (inclusive emergencial, art. 75, VIII) usa o modelo da Projur (contrato-servicos).
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# TERMO DE CONTRATO

> (Processo Administrativo n\xB0 {processo})

%% Ementa: o preto do modelo diz "A UNI\xC3O, POR INTERM\xC9DIO DO (A)"; o CFC \xE9 autarquia e \xE9 ele a parte (exce\xE7\xE3o de fidelidade).
::: CONTRATO ADMINISTRATIVO N\xBA {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas} E A EMPRESA {contratada.razao_social|maiusculas}.

%% Nota AGU (Parecer 00004/2022/CNMLC/CGU/AGU \u2014 LGPD): n\xE3o constam n\xFAmeros de documentos pessoais; a autoridade \xE9 identificada pela matr\xEDcula funcional e o representante da contratada s\xF3 pelo nome.
%% Nota AGU: "Uni\xE3o" s\xF3 para a Administra\xE7\xE3o Direta; autarquia/funda\xE7\xE3o p\xF5e o pr\xF3prio nome \u2014 no CFC, a alternativa vermelha "[Autarquia XXXXX]" (mant\xE9m o "A" preto).
%% Alternativa vermelha da modalidade: [Preg\xE3o Eletr\xF4nico] OU [Concorr\xEAncia] (Dispensa/Inexigibilidade \u2192 template Projur contrato-servicos).
%% O trecho do ato de nomea\xE7\xE3o (Portaria, DOU, matr\xEDcula) s\xF3 sai se os dados trouxerem "nomeacao".
A Autarquia {cfc.nome}, por interm\xE9dio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}{#nomeacao}, nomeado(a) pela Portaria n\xBA {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matr\xEDcula Funcional n\xBA {nomeacao.matricula}{/nomeacao}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o n\xBA {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}{#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}, tendo em vista o que consta no Processo n\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n\xBA 14.133, de 1\xBA de abril de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao.concorrencia}Concorr\xEAncia{/licitacao.concorrencia}{^licitacao.concorrencia}Preg\xE3o Eletr\xF4nico{/licitacao.concorrencia} n\xBA {licitacao.numero}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de servi\xE7os cont\xEDnuos de {objeto_servico}, a serem executados com regime de dedica\xE7\xE3o exclusiva de m\xE3o de obra, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

{\xA7} Objeto da contrata\xE7\xE3o:

%% Nota AGU: a tabela \xE9 meramente ilustrativa, devendo ser ajustada conforme o caso concreto.
| ITEM | ESPECIFICA\xC7\xC3O | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

%% Modelo: [O Edital da Licita\xE7\xE3o] OU [A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta] OU [O Aviso de Dispensa Eletr\xF4nica] \u2014 este template s\xF3 atende contrato decorrente de licita\xE7\xE3o.
{\xA7\xA7} O Edital da Licita\xE7\xE3o;

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% Nota AGU: as disposi\xE7\xF5es decorrem dos arts. 106 e 107 da Lei 14.133 e da IN SEGES/MP 5/2017 (aplica\xE7\xE3o autorizada pela IN SEGES/ME 98/2022).
%% A alternativa do modelo para contrata\xE7\xE3o emergencial (art. 75, VIII \u2014 vig\xEAncia improrrog\xE1vel de at\xE9 um ano) n\xE3o se aplica a contrato decorrente de licita\xE7\xE3o.
{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n\xB0 14.133, de 2021.

{\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{\xA7\xA7} Estar formalmente demonstrado no processo que a forma de presta\xE7\xE3o dos servi\xE7os tem natureza continuada;

{\xA7\xA7} Seja juntado relat\xF3rio que discorra sobre a execu\xE7\xE3o do contrato, com informa\xE7\xF5es de que os servi\xE7os tenham sido prestados regularmente;

{\xA7\xA7} Seja juntada justificativa e motivo, por escrito, de que a Administra\xE7\xE3o mant\xE9m interesse na realiza\xE7\xE3o do servi\xE7o;

{\xA7\xA7} Haja manifesta\xE7\xE3o expressa do CONTRATADO informando o interesse na prorroga\xE7\xE3o;

{\xA7\xA7} Seja comprovado que o CONTRATADO mant\xE9m as condi\xE7\xF5es iniciais de habilita\xE7\xE3o; e

%% Nota AGU: Lei 10.522/2002, art. 6\xBA-A (Lei 14.973/2024) \u2014 registro no Cadin impede o aditamento dos contratos firmados a partir de 16/09/2024 (Parecer 00063/2024/DECOR/CGU/AGU).
{\xA7\xA7} N\xE3o haja registro no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} Nas eventuais prorroga\xE7\xF5es contratuais, os custos n\xE3o renov\xE1veis j\xE1 pagos ou amortizados ao longo do primeiro per\xEDodo de vig\xEAncia da contrata\xE7\xE3o dever\xE3o ser reduzidos ou eliminados como condi\xE7\xE3o para a renova\xE7\xE3o.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.

{\xA7} Sujeitando-se o CONTRATADO ao regime de incid\xEAncia n\xE3o-cumulativa de PIS e COFINS, a comprova\xE7\xE3o das al\xEDquotas m\xE9dias efetivas de recolhimento dever\xE1 ser feita no momento da prorroga\xE7\xE3o contratual ou da repactua\xE7\xE3o de pre\xE7os, a fim de que sejam promovidos os ajustes necess\xE1rios decorrentes das oscila\xE7\xF5es dos custos efetivos dessas contribui\xE7\xF5es.

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 PRE\xC7O

{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% Nota AGU: contrato de valor estimativo, em que a pr\xF3pria demanda \xE9 vari\xE1vel \u2192 incluir o subitem abaixo.
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes, inclusive quanto \xE0 utiliza\xE7\xE3o da Conta-Dep\xF3sito Vinculada - bloqueada para movimenta\xE7\xE3o ou do Pagamento pelo Fato Gerador, encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - REPACTUA\xC7\xC3O DOS PRE\xC7OS CONTRATADOS

{\xA7} As regras acerca da repactua\xE7\xE3o dos pre\xE7os contratados s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE

{\xA7} S\xE3o obriga\xE7\xF5es do CONTRATANTE:

{\xA7\xA7} Exigir o cumprimento de todas as obriga\xE7\xF5es assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{\xA7\xA7} Receber o objeto no prazo e condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia;

{\xA7\xA7} Notificar o CONTRATADO, por escrito, sobre v\xEDcios, defeitos incorre\xE7\xF5es, imperfei\xE7\xF5es, falhas ou irregularidades verificadas na execu\xE7\xE3o do objeto contratual, fixando prazo para que seja substitu\xEDdo, reparado ou corrigido, total ou parcialmente, \xE0s suas expensas, certificando-se de que as solu\xE7\xF5es por ele propostas sejam as mais adequadas;

{\xA7\xA7} Acompanhar e fiscalizar a execu\xE7\xE3o do contrato e o cumprimento das obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Comunicar a empresa para emiss\xE3o de Nota Fiscal relativa \xE0 parcela incontroversa da execu\xE7\xE3o do objeto, para efeito de liquida\xE7\xE3o e pagamento, quando houver controv\xE9rsia sobre a execu\xE7\xE3o do objeto, quanto \xE0 dimens\xE3o, qualidade e quantidade, conforme o art. 143 da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} Efetuar o pagamento ao CONTRATADO do valor correspondente \xE0 execu\xE7\xE3o do objeto, no prazo, forma e condi\xE7\xF5es estabelecidos no presente Contrato e no Termo de Refer\xEAncia;

{\xA7\xA7} Aplicar ao CONTRATADO as san\xE7\xF5es previstas na lei e neste Contrato;

{\xA7\xA7} N\xE3o praticar atos de inger\xEAncia na administra\xE7\xE3o do CONTRATADO, tais como:

{\xA7\xA7\xA7} indicar pessoas expressamente nominadas para executar direta ou indiretamente o objeto contratado;

{\xA7\xA7\xA7} fixar sal\xE1rio inferior ao definido em lei ou em ato normativo a ser pago pelo CONTRATADO;

{\xA7\xA7\xA7} estabelecer v\xEDnculo de subordina\xE7\xE3o com funcion\xE1rio do CONTRATADO;

{\xA7\xA7\xA7} definir forma de pagamento mediante exclusivo reembolso dos sal\xE1rios pagos;

{\xA7\xA7\xA7} demandar a funcion\xE1rio do CONTRATADO a execu\xE7\xE3o de tarefas fora do escopo do objeto da contrata\xE7\xE3o; e

{\xA7\xA7\xA7} prever exig\xEAncias que constituam interven\xE7\xE3o indevida da Administra\xE7\xE3o na gest\xE3o interna do CONTRATADO.

{\xA7\xA7} Cientificar o \xF3rg\xE3o de representa\xE7\xE3o judicial da Advocacia-Geral da Uni\xE3o para ado\xE7\xE3o das medidas cab\xEDveis quando do descumprimento de obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Explicitamente emitir decis\xE3o sobre todas as solicita\xE7\xF5es e reclama\xE7\xF5es relacionadas \xE0 execu\xE7\xE3o do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelat\xF3rios ou de nenhum interesse para a boa execu\xE7\xE3o do ajuste;

%% Nota AGU: art. 123 da Lei 14.133 \u2014 dever de decidir; sem prazo especificado, vale um m\xEAs (art. 123, par\xE1grafo \xFAnico, e art. 28 do Decreto 11.246/2022).
{\xA7\xA7\xA7} A Administra\xE7\xE3o ter\xE1 o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorroga\xE7\xE3o motivada, por igual per\xEDodo.

%% Nota AGU: art. 92, XI \u2014 prazo de resposta ao pedido de reequil\xEDbrio; a lei n\xE3o o fixa, pode-se adotar o mesmo prazo do art. 123.
{\xA7\xA7} Responder eventuais pedidos de reestabelecimento do equil\xEDbrio econ\xF4mico-financeiro feitos pelo CONTRATADO no prazo m\xE1ximo de {prazo_reequilibrio};

%% Nota AGU: decorre do art. 137, \xA7 4\xBA, da Lei 14.133 (s\xF3 cabe quando h\xE1 garantia).
{#garantia}{\xA7\xA7} Notificar os emitentes das garantias quanto ao in\xEDcio de processo administrativo para apura\xE7\xE3o de descumprimento de cl\xE1usulas contratuais;{/garantia}

{\xA7\xA7} Comunicar o CONTRATADO na hip\xF3tese de posterior altera\xE7\xE3o do projeto pelo CONTRATANTE, no caso do art. 93, \xA72\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7} A Administra\xE7\xE3o n\xE3o responder\xE1 por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados \xE0 execu\xE7\xE3o do contrato, bem como por qualquer dano causado a terceiros em decorr\xEAncia de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATADO

%% Nota AGU: obriga\xE7\xF5es gerais; o \xF3rg\xE3o verifica as peculiaridades do objeto para incluir, modificar ou excluir itens. Cada v\xEDcio tem prazo de corre\xE7\xE3o pr\xF3prio, fixado pelo fiscal.
{\xA7} O CONTRATADO deve cumprir todas as obriga\xE7\xF5es constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execu\xE7\xE3o do objeto, observando, ainda, as obriga\xE7\xF5es a seguir dispostas:

{\xA7} Atender \xE0s determina\xE7\xF5es regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informa\xE7\xE3o por eles solicitados;

{\xA7} Reparar, corrigir, remover, reconstruir ou substituir, \xE0s suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e servi\xE7os nos quais se verificarem v\xEDcios, defeitos ou incorre\xE7\xF5es resultantes da execu\xE7\xE3o ou dos materiais empregados;

{\xA7} Responsabilizar-se pelos v\xEDcios e danos decorrentes da execu\xE7\xE3o do objeto, bem como por todo e qualquer dano causado \xE0 Administra\xE7\xE3o ou terceiros, n\xE3o reduzindo essa responsabilidade a fiscaliza\xE7\xE3o ou o acompanhamento da execu\xE7\xE3o contratual pelo CONTRATANTE, que ficar\xE1 autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

%% Nota AGU: a regularidade fiscal considera a natureza da atividade (em regra ISSQN municipal; ICMS em transporte interestadual/intermunicipal e comunica\xE7\xE3o).
{\xA7} Quando n\xE3o for poss\xEDvel a verifica\xE7\xE3o da regularidade no Sistema de Cadastro de Fornecedores \u2013 SICAF, o CONTRATADO dever\xE1 entregar ao setor respons\xE1vel pela fiscaliza\xE7\xE3o do contrato, at\xE9 o dia trinta do m\xEAs seguinte ao da presta\xE7\xE3o dos servi\xE7os, os seguintes documentos:

{\xA7\xA7} prova de regularidade relativa \xE0 Seguridade Social;

{\xA7\xA7} certid\xE3o conjunta relativa aos tributos federais e \xE0 D\xEDvida Ativa da Uni\xE3o;

{\xA7\xA7} certid\xF5es que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domic\xEDlio ou sede do CONTRATADO;

{\xA7\xA7} Certid\xE3o de Regularidade do FGTS \u2013 CRF; e

{\xA7\xA7} Certid\xE3o Negativa de D\xE9bitos Trabalhistas \u2013 CNDT.

{\xA7} Responsabilizar-se pelo cumprimento das obriga\xE7\xF5es previstas em Acordo, Conven\xE7\xE3o, Diss\xEDdio Coletivo de Trabalho ou equivalentes das categorias abrangidas pelo contrato, por todas as obriga\xE7\xF5es trabalhistas, sociais, previdenci\xE1rias, tribut\xE1rias, fiscais, comerciais e as demais previstas em legisla\xE7\xE3o espec\xEDfica, cuja inadimpl\xEAncia n\xE3o transfere a responsabilidade ao CONTRATANTE e n\xE3o poder\xE1 onerar o objeto do contrato;

{\xA7} Comunicar ao Fiscal do contrato tempestivamente, observada a urg\xEAncia da situa\xE7\xE3o, qualquer ocorr\xEAncia anormal ou acidente que se verifique no local da execu\xE7\xE3o do objeto contratual, n\xE3o ultrapassando o prazo de 24 (vinte e quatro) horas;

{\xA7} Paralisar, por determina\xE7\xE3o do CONTRATANTE, qualquer atividade que n\xE3o esteja sendo executada de acordo com a boa t\xE9cnica ou que ponha em risco a seguran\xE7a de pessoas ou bens de terceiros;

{\xA7} Manter durante toda a vig\xEAncia do contrato, em compatibilidade com as obriga\xE7\xF5es assumidas, todas as condi\xE7\xF5es exigidas para habilita\xE7\xE3o na licita\xE7\xE3o ou para qualifica\xE7\xE3o na contrata\xE7\xE3o direta;

{\xA7} Cumprir, durante todo o per\xEDodo de execu\xE7\xE3o do contrato, a reserva de cargos prevista em lei para pessoa com defici\xEAncia, para reabilitado da Previd\xEAncia Social ou para aprendiz, bem como as reservas de cargos previstas na legisla\xE7\xE3o;

{\xA7} Comprovar a reserva de cargos a que se refere a cl\xE1usula acima, no prazo fixado pelo fiscal do contrato, com a indica\xE7\xE3o dos empregados que preencheram as referidas vagas;

{\xA7} Guardar sigilo sobre todas as informa\xE7\xF5es obtidas em decorr\xEAncia do cumprimento do contrato;

{\xA7} Arcar com o \xF4nus decorrente de eventual equ\xEDvoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos vari\xE1veis decorrentes de fatores futuros e incertos, devendo complement\xE1-los, caso o previsto inicialmente em sua proposta n\xE3o seja satisfat\xF3rio para o atendimento do objeto da contrata\xE7\xE3o, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei n\xBA 14.133, de 2021;

{\xA7} Cumprir, al\xE9m dos postulados legais vigentes de \xE2mbito federal, estadual ou municipal, as normas de seguran\xE7a do CONTRATANTE;

{\xA7} Alocar os empregados necess\xE1rios ao perfeito cumprimento das cl\xE1usulas deste contrato, com habilita\xE7\xE3o e conhecimento adequados;

{\xA7} Prestar os servi\xE7os dentro dos par\xE2metros e rotinas estabelecidos;

{\xA7} Fornecer todos os materiais, equipamentos, ferramentas e utens\xEDlios demandados, em quantidade, qualidade e tecnologia adequadas, com a observ\xE2ncia \xE0s recomenda\xE7\xF5es aceitas pela boa t\xE9cnica, normas e legisla\xE7\xE3o de reg\xEAncia;

{\xA7} Conduzir os trabalhos com estrita observ\xE2ncia \xE0s normas da legisla\xE7\xE3o pertinente, cumprindo as determina\xE7\xF5es dos Poderes P\xFAblicos, mantendo sempre limpo o local de execu\xE7\xE3o do objeto e nas melhores condi\xE7\xF5es de seguran\xE7a, higiene e disciplina;

{\xA7} Submeter previamente, por escrito, ao CONTRATANTE, para an\xE1lise e aprova\xE7\xE3o, quaisquer mudan\xE7as nos m\xE9todos executivos que fujam \xE0s especifica\xE7\xF5es do memorial descritivo ou instrumento cong\xEAnere;

{\xA7} Cumprir as normas de prote\xE7\xE3o ao trabalho, inclusive aquelas relativas \xE0 seguran\xE7a e \xE0 sa\xFAde no trabalho;

{\xA7} N\xE3o submeter os trabalhadores a condi\xE7\xF5es degradantes de trabalho, jornadas exaustivas, servid\xE3o por d\xEDvida ou trabalhos for\xE7ados;

{\xA7} N\xE3o permitir a utiliza\xE7\xE3o de qualquer trabalho do menor de dezesseis anos de idade, exceto na condi\xE7\xE3o de aprendiz para os maiores de quatorze anos de idade, observada a legisla\xE7\xE3o pertinente;

{\xA7} N\xE3o submeter o menor de dezoito anos de idade \xE0 realiza\xE7\xE3o de trabalho noturno e em condi\xE7\xF5es perigosas e insalubres e \xE0 realiza\xE7\xE3o de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto n\xBA 6.481, de 12 de junho de 2008;

{\xA7} Receber e dar o tratamento adequado a den\xFAncias de discrimina\xE7\xE3o, viol\xEAncia e ass\xE9dio no ambiente de trabalho;

{\xA7} Manter preposto aceito pela Administra\xE7\xE3o no local da obra ou do servi\xE7o para represent\xE1-lo na execu\xE7\xE3o do contrato;

{\xA7\xA7} A indica\xE7\xE3o ou a manuten\xE7\xE3o do preposto da empresa poder\xE1 ser recusada pelo \xF3rg\xE3o ou entidade, desde que devidamente justificada, devendo a empresa designar outro para o exerc\xEDcio da atividade.

{\xA7} N\xE3o contratar, durante a vig\xEAncia do contrato, c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau, de dirigente do CONTRATANTE ou de agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou que atue na fiscaliza\xE7\xE3o ou gest\xE3o do contrato, nos termos do artigo 48, par\xE1grafo \xFAnico, da Lei n\xBA 14.133, de 2021;

{\xA7} Prestar todo esclarecimento ou informa\xE7\xE3o solicitada pelo CONTRATANTE ou por seus prepostos, garantindo-lhes o acesso, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a guarda, manuten\xE7\xE3o e vigil\xE2ncia de materiais, ferramentas, e tudo o que for necess\xE1rio \xE0 execu\xE7\xE3o do objeto, durante a vig\xEAncia do contrato;

{\xA7} Assegurar aos seus trabalhadores ambiente de trabalho e instala\xE7\xF5es em condi\xE7\xF5es adequadas ao cumprimento das normas de sa\xFAde, seguran\xE7a e bem-estar no trabalho;

{\xA7} Fornecer equipamentos de prote\xE7\xE3o individual (EPI) e equipamentos de prote\xE7\xE3o coletiva (EPC),quando for o caso;

{\xA7} Garantir o acesso do CONTRATANTE, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a organiza\xE7\xE3o t\xE9cnica e administrativa dos servi\xE7os, de modo a conduzi-los eficaz e eficientemente, de acordo com os documentos e especifica\xE7\xF5es que integram o Termo de Refer\xEAncia, no prazo determinado;

{\xA7} Instruir seus empregados quanto \xE0 necessidade de acatar as normas internas da Administra\xE7\xE3o;

{\xA7} Instruir seus empregados a respeito das atividades a serem desempenhadas, alertando-os a n\xE3o executar atividades n\xE3o abrangidas pelo contrato, devendo o CONTRATADO relatar ao CONTRATANTE toda e qualquer ocorr\xEAncia neste sentido, a fim de evitar desvio de fun\xE7\xE3o;

{\xA7} Vedar a utiliza\xE7\xE3o, na execu\xE7\xE3o dos servi\xE7os, de empregado que seja familiar de agente p\xFAblico ocupante de cargo em comiss\xE3o ou fun\xE7\xE3o de confian\xE7a no \xF3rg\xE3o contratante, nos termos do artigo 7\xB0 do Decreto n\xB0 7.203, de 2010;

{\xA7} Disponibilizar ao CONTRATANTE os empregados devidamente uniformizados e identificados por meio de crach\xE1, al\xE9m de prov\xEA-los com os Equipamentos de Prote\xE7\xE3o Individual - EPI, quando for o caso;

{\xA7} Fornecer os uniformes a serem utilizados por seus empregados, conforme disposto no Termo de Refer\xEAncia, sem repassar quaisquer custos a estes;

{\xA7} Apresentar rela\xE7\xE3o mensal dos empregados que expressamente optarem por n\xE3o receber o vale-transporte;

{\xA7} Efetuar o pagamento dos sal\xE1rios dos empregados alocados na execu\xE7\xE3o contratual mediante dep\xF3sito na conta banc\xE1ria de titularidade do trabalhador, em ag\xEAncia situada na localidade ou regi\xE3o metropolitana em que ocorre a presta\xE7\xE3o dos servi\xE7os, de modo a possibilitar a confer\xEAncia do pagamento por parte do CONTRATANTE. Em caso de impossibilidade de cumprimento desta disposi\xE7\xE3o, o CONTRATADO dever\xE1 apresentar justificativa, a fim de que a Administra\xE7\xE3o analise sua plausibilidade e possa verificar a realiza\xE7\xE3o do pagamento.

{\xA7} Autorizar o CONTRATANTE, no momento da assinatura do contrato, a fazer o desconto nas faturas e realizar os pagamentos dos sal\xE1rios e demais verbas trabalhistas diretamente aos trabalhadores, bem como das contribui\xE7\xF5es previdenci\xE1rias e do FGTS, quando n\xE3o demonstrado o cumprimento tempestivo e regular dessas obriga\xE7\xF5es, at\xE9 o momento da regulariza\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es cab\xEDveis;

{\xA7} N\xE3o permitir que o empregado designado para trabalhar em um turno preste seus servi\xE7os no turno imediatamente subsequente;

{\xA7} Realizar o planejamento das f\xE9rias dos colaboradores terceirizados, desde o in\xEDcio do contrato administrativo, a fim de viabilizar a previsibilidade das f\xE9rias, estabelecida no inciso I do art. 3\xBA do Decreto n.\xBA 12.174, de 11 de setembro de 2024, e permitir o acompanhamento pela fiscaliza\xE7\xE3o do contrato, observando integralmente o disposto na Instru\xE7\xE3o Normativa Seges/MGI n\xBA 213, de 29 de maio de 2025;

{\xA7} Desenvolver e implementar pol\xEDticas institucionais de enfrentamento do ass\xE9dio e da discrimina\xE7\xE3o em suas rela\xE7\xF5es de trabalho e na sua gest\xE3o, observando as diretrizes estabelecidas na Portaria MGI n\xBA 6.719, de 13 de setembro de 2024, e promovendo pr\xE1ticas respeitosas e humanizadas no ambiente laboral;

{\xA7} Implementar a\xE7\xF5es de forma\xE7\xE3o e capacita\xE7\xE3o para todas as suas empregadas e empregados sobre preven\xE7\xE3o e combate ao ass\xE9dio moral, sexual e \xE0 discrimina\xE7\xE3o, garantindo ambiente de trabalho seguro e respeitoso;

{\xA7} Estabelecer canais de den\xFAncia e procedimentos claros para recebimento, apura\xE7\xE3o e tratamento de casos de ass\xE9dio e discrimina\xE7\xE3o, assegurando a prote\xE7\xE3o dos denunciantes contra retalia\xE7\xF5es;

{\xA7} Promover a divulga\xE7\xE3o das pol\xEDticas de combate ao ass\xE9dio e discrimina\xE7\xE3o para todos os trabalhadores alocados na execu\xE7\xE3o contratual, mediante campanhas educativas e informativos espec\xEDficos;

{\xA7} Apresentar ao CONTRATANTE, quando solicitado, relat\xF3rios sobre as medidas adotadas e os resultados alcan\xE7ados na implementa\xE7\xE3o das pol\xEDticas de enfrentamento ao ass\xE9dio e discrimina\xE7\xE3o;

{\xA7} Comunicar ao CONTRATANTE, no prazo m\xE1ximo de 48 (quarenta e oito) horas, qualquer ocorr\xEAncia de ass\xE9dio ou discrimina\xE7\xE3o envolvendo trabalhadores alocados na execu\xE7\xE3o contratual, informando as medidas adotadas para apura\xE7\xE3o e corre\xE7\xE3o;

{\xA7} Garantir que as pol\xEDticas de combate ao ass\xE9dio e discrimina\xE7\xE3o sejam extensivas a eventuais subcontratados, quando permitida a subcontrata\xE7\xE3o.

{\xA7} Atender \xE0s solicita\xE7\xF5es do CONTRATANTE quanto \xE0 substitui\xE7\xE3o dos empregados alocados, no prazo fixado pelo fiscal do contrato, nos casos em que ficar constatado descumprimento das obriga\xE7\xF5es relativas \xE0 execu\xE7\xE3o do servi\xE7o, conforme descrito neste Termo de Refer\xEAncia;

{\xA7} Instruir seus empregados, no in\xEDcio da execu\xE7\xE3o contratual, quanto \xE0 obten\xE7\xE3o das informa\xE7\xF5es de seus interesses junto aos \xF3rg\xE3os p\xFAblicos, relativas ao contrato de trabalho e obriga\xE7\xF5es a ele inerentes, adotando, entre outras, as seguintes medidas:

{\xA7} Viabilizar o acesso de seus empregados, via internet, por meio de senha pr\xF3pria, aos sistemas da Previd\xEAncia Social e da Receita do Brasil, com o objetivo de verificar se as suas contribui\xE7\xF5es previdenci\xE1rias foram recolhidas, no prazo m\xE1ximo de 60 (sessenta) dias, contados do in\xEDcio da presta\xE7\xE3o dos servi\xE7os ou da admiss\xE3o do empregado;

{\xA7} Viabilizar a emiss\xE3o do cart\xE3o cidad\xE3o pela Caixa Econ\xF4mica Federal para todos os empregados, no prazo m\xE1ximo de 60 (sessenta) dias, contados do in\xEDcio da presta\xE7\xE3o dos servi\xE7os ou da admiss\xE3o do empregado;

{\xA7} Oferecer todos os meios necess\xE1rios aos seus empregados para a obten\xE7\xE3o de extratos de recolhimentos de seus direitos sociais, preferencialmente por meio eletr\xF4nico, quando dispon\xEDvel.

{\xA7} N\xE3o se beneficiar da condi\xE7\xE3o de optante pelo Simples Nacional, salvo quando se tratar das exce\xE7\xF5es previstas no \xA7 5\xBA-C do art. 18 da Lei Complementar n\xBA 123, de 14 de dezembro de 2006;

{\xA7\xA7} Comunicar formalmente \xE0 Receita Federal a assinatura do contrato de presta\xE7\xE3o de servi\xE7os mediante cess\xE3o de m\xE3o de obra, para fins de exclus\xE3o obrigat\xF3ria do Simples Nacional, a contar do m\xEAs seguinte ao da contrata\xE7\xE3o, conforme previs\xE3o do art.17, XII, art. 30, \xA71\xBA, II, e do art. 31, II, todos da Lei Complementar n\xBA 123/2006, salvo quando se tratar das exce\xE7\xF5es previstas no \xA7 5\xBA-C do art. 18 do mesmo diploma legal;

{\xA7\xA7} Para efeito de comprova\xE7\xE3o da comunica\xE7\xE3o, o CONTRATADO dever\xE1 apresentar c\xF3pia do of\xEDcio enviado \xE0 Receita Federal do Brasil, com comprovante de entrega e recebimento, comunicando a assinatura do contrato de presta\xE7\xE3o de servi\xE7os mediante cess\xE3o de m\xE3o de obra, at\xE9 o \xFAltimo dia \xFAtil do m\xEAs subsequente ao da ocorr\xEAncia da situa\xE7\xE3o de veda\xE7\xE3o.

%% Nota AGU: servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica \u2192 incluir os dois itens abaixo (art. 47, \xA7 2\xBA, da Lei 14.133).
{#manutencao}{\xA7} Realizar os servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica no(s) seguinte(s) local(is) {manutencao.locais};

{\xA7} O t\xE9cnico dever\xE1 se deslocar ao local da reparti\xE7\xE3o, salvo se o CONTRATADO tiver unidade de presta\xE7\xE3o de servi\xE7os em dist\xE2ncia de {manutencao.distancia} do local demandado.{/manutencao}

%% Nota AGU (art. 93): projetos ou servi\xE7os t\xE9cnicos especializados, inclusive software \u2192 transi\xE7\xE3o contratual e cess\xE3o dos direitos patrimoniais; o \xA7 2\xBA do art. 93 admite dispensar a cess\xE3o em pesquisa e desenvolvimento (Lei 10.973/2004); o subitem da obra imaterial de car\xE1ter tecnol\xF3gico, insuscet\xEDvel de privil\xE9gio, vem do art. 93, \xA7 1\xBA.
{#transicao_contratual}{\xA7} Realizar a transi\xE7\xE3o contratual com transfer\xEAncia de conhecimento, tecnologia e t\xE9cnicas empregadas, sem perda de informa\xE7\xF5es, podendo exigir, inclusive, a capacita\xE7\xE3o dos t\xE9cnicos do CONTRATANTE ou da nova empresa que continuar\xE1 a execu\xE7\xE3o dos servi\xE7os;{/transicao_contratual}

{#cessao_direitos}{\xA7} Ceder ao CONTRATANTE todos os direitos patrimoniais relativos ao objeto contratado, o qual poder\xE1 ser livremente utilizado e/ou alterado em outras ocasi\xF5es, sem necessidade de nova autoriza\xE7\xE3o do CONTRATADO.

{#cessao_direitos.obra_imaterial}{\xA7\xA7} Considerando que o projeto contratado se refere a obra imaterial de car\xE1ter tecnol\xF3gico, insuscet\xEDvel de privil\xE9gio, a cess\xE3o dos direitos a que se refere o subitem acima inclui o fornecimento de todos os dados, documentos e elementos de informa\xE7\xE3o pertinentes \xE0 tecnologia de concep\xE7\xE3o, desenvolvimento, fixa\xE7\xE3o em suporte f\xEDsico de qualquer natureza e aplica\xE7\xE3o da obra.{/cessao_direitos.obra_imaterial}{/cessao_direitos}

%% Nota AGU (Decreto 11.430/2023): reserva de vagas para mulheres v\xEDtimas de viol\xEAncia dom\xE9stica \u2014 8% com 25 ou mais colaboradores; abaixo de 25, percentual inferior admitido (art. 3\xBA, \xA7 1\xBA-A). \xC9 obriga\xE7\xE3o contratual (n\xE3o requisito de habilita\xE7\xE3o), s\xF3 para novas contrata\xE7\xF5es; sem mulheres eleg\xEDveis a empresa contrata livremente, mas consulta a Administra\xE7\xE3o a cada desligamento.
{#reserva_mulheres}{^reserva_mulheres.inferior_25}{\xA7} Nos casos em que haja um n\xFAmero m\xEDnimo de vinte e cinco colaboradores alocados no contrato, destinar 8% das vagas exclusivamente para mulheres v\xEDtimas de viol\xEAncia dom\xE9stica;{/reserva_mulheres.inferior_25}{#reserva_mulheres.inferior_25}{\xA7} Considerando que se trata de contrato com n\xFAmero inferior a vinte e cinco colaboradores, a previs\xE3o do percentual para o emprego de m\xE3o de obra constitu\xEDda por mulheres v\xEDtimas de viol\xEAncia dom\xE9stica ser\xE1 de {reserva_mulheres.percentual}%{/reserva_mulheres.inferior_25}

{\xA7\xA7} As vagas ser\xE3o destinadas \xE0s mulheres indicadas pelas unidades respons\xE1veis pela pol\xEDtica p\xFAblica, signat\xE1rias do acordo de ades\xE3o de que trata o art. 4\xBA do Decreto n\xBA 11.430, de 2023, vedada a exig\xEAncia, pelas empresas contratadas e pelos \xF3rg\xE3os contratantes, de apresenta\xE7\xE3o, pelas candidatas, de quaisquer outros documentos para fins de comprova\xE7\xE3o da situa\xE7\xE3o de viol\xEAncia.

{\xA7\xA7} Sempre que houver um desligamento, o CONTRATADO dever\xE1 buscar atender ao percentual m\xEDnimo de {reserva_mulheres.percentual}% com a nova contrata\xE7\xE3o.

{\xA7\xA7@mulheres_nao_elegiveis} Se n\xE3o houver mulheres eleg\xEDveis em n\xFAmero suficiente para preencher as vagas reservadas, a empresa poder\xE1 contratar livremente.

{\xA7\xA7} Para c\xE1lculo do percentual de vagas reservadas ser\xE3o considerados todos os empregados alocados no contrato, incluindo folguistas e substitutos.

{\xA7\xA7} O percentual de m\xE3o-de-obra de que trata este item dever\xE1 ser mantido durante toda a execu\xE7\xE3o contratual, ressalvado o subitem {\xA7ref@mulheres_nao_elegiveis}.

{\xA7\xA7} O CONTRATADO deve manter o sigilo da condi\xE7\xE3o de viol\xEAncia dom\xE9stica da profissional que ser\xE1 alocada para a presta\xE7\xE3o do servi\xE7o.{/reserva_mulheres}

%% Nota AGU (STF, Tema 1118): capital social integralizado compat\xEDvel com o n\xFAmero de empregados (art. 4\xBA-B da Lei 6.019/1974), mantido durante toda a vig\xEAncia. Vigil\xE2ncia e transporte de valores \u2192 segunda reda\xE7\xE3o (art. 14 da Lei 14.967/2024, Estatuto da Seguran\xE7a Privada).
{^seguranca_privada}{\xA7} Manter, durante toda a vig\xEAncia do contrato, capital social integralizado compat\xEDvel com o n\xFAmero de empregados, na forma do art. 4\xBA-B da Lei n\xBA 6.019/1974, apresentando, quando solicitada, a respectiva documenta\xE7\xE3o comprobat\xF3ria, no prazo fixado pela fiscaliza\xE7\xE3o contratual.{/seguranca_privada}{#seguranca_privada}{\xA7} Manter, durante toda a vig\xEAncia do contrato, capital social m\xEDnimo integralizado de acordo com os valores estipulados no art. 14 da Lei n.\xBA 14.967/2024, apresentando, quando solicitada, a respectiva documenta\xE7\xE3o comprobat\xF3ria, no prazo fixado pela fiscaliza\xE7\xE3o contratual.{/seguranca_privada}

## CLA\xDASULA {\xA7cl} - DA COMPENSA\xC7\xC3O DA JORNADA DE TRABALHO

{\xA7} A compensa\xE7\xE3o de jornada dos trabalhadores do CONTRATADO alocados \xE0 execu\xE7\xE3o contratual em regime de dedica\xE7\xE3o exclusiva, quando compat\xEDvel com a natureza dos servi\xE7os prestados, ser\xE1 realizada de acordo com as regras constantes do Decreto n.\xBA 12.174, de 11 de setembro de 2024, da Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 81, de 12 de setembro de 2024, e do Termo de Refer\xEAncia, anexo a este Contrato.

%% Nota AGU: cl\xE1usula necess\xE1ria se a contrata\xE7\xE3o envolver, de qualquer forma, tratamento de dados pessoais (Lei 13.709/2018); disposi\xE7\xF5es indicativas, ajust\xE1veis ao objeto. Admite declara\xE7\xE3o de capacita\xE7\xE3o dos empregados (Parecer 00004/2022/CNMLC/CGU/AGU); transfer\xEAncia internacional de dados \u2192 cl\xE1usulas-padr\xE3o da Resolu\xE7\xE3o CD/ANPD 19/2024 como anexo.
{#lgpd}## CL\xC1USULA {\xA7cl}- OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n\xBA 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de SUBOPERADORES e SUBCONTRATADOS o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA7 1\xBA do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O

%% Nota AGU: exigir ou n\xE3o a garantia fica a crit\xE9rio da Administra\xE7\xE3o (salvo norma que a torne obrigat\xF3ria); exigindo, prever no edital e no contrato; n\xE3o exigindo, justificar nos autos com base no ETP e na an\xE1lise de riscos.
{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} Ser\xE1 exigida a presta\xE7\xE3o de garantia na presente contrata\xE7\xE3o, conforme regras constantes do Termo de Refer\xEAncia.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} As regras acerca de infra\xE7\xF5es e san\xE7\xF5es administrativas referentes \xE0 execu\xE7\xE3o do contrato s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL

%% Nota AGU: reda\xE7\xE3o para contratos cont\xEDnuos (art. 106). A alternativa do modelo para a dispensa emergencial (art. 75, VIII) n\xE3o se aplica a contrato decorrente de licita\xE7\xE3o.
{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

%% Nota AGU: sistem\xE1tica do art. 106, III e \xA7 1\xBA, conforme a Orienta\xE7\xE3o Normativa AGU n\xBA 98/2025 \u2014 extin\xE7\xE3o sem \xF4nus na data de anivers\xE1rio com ci\xEAncia m\xEDnima de dois meses; antes disso, s\xF3 com \xF4nus (art. 138, \xA7 2\xBA).
{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, mediante justificativa formal de que n\xE3o disp\xF5e de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou de que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei n\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Da rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio.

%% Nota AGU: arts. 50 e 121, \xA7 3\xBA, da Lei 14.133 e IN SEGES/MP 5/2017 \u2014 medidas acautelat\xF3rias contra a responsabilidade subsidi\xE1ria trabalhista (conta vinculada, pagamento direto), inclusive a extin\xE7\xE3o do contrato.
{\xA7} O n\xE3o pagamento dos sal\xE1rios e das verbas trabalhistas, e o n\xE3o recolhimento das contribui\xE7\xF5es sociais, previdenci\xE1rias e para com o FGTS poder\xE1 dar ensejo \xE0 extin\xE7\xE3o do contrato por ato unilateral e escrito do CONTRATANTE e \xE0 aplica\xE7\xE3o das penalidades cab\xEDveis.

{\xA7} O CONTRATANTE poder\xE1 conceder prazo para que o CONTRATADO regularize suas obriga\xE7\xF5es trabalhistas ou suas condi\xE7\xF5es de habilita\xE7\xE3o, sob pena de extin\xE7\xE3o contratual, quando n\xE3o identificar m\xE1-f\xE9 ou a incapacidade de corre\xE7\xE3o.

{\xA7} Quando da extin\xE7\xE3o, o fiscal administrativo dever\xE1 verificar o pagamento pelo CONTRATADO das verbas rescis\xF3rias ou os documentos que comprovem que os empregados ser\xE3o realocados em outra atividade de presta\xE7\xE3o de servi\xE7os, sem que ocorra a interrup\xE7\xE3o do contrato de trabalho.

{\xA7} At\xE9 que o CONTRATADO comprove o disposto no item anterior, o CONTRATANTE reter\xE1:

{\xA7\xA7} a garantia contratual - prestada com cobertura para os casos de descumprimento das obriga\xE7\xF5es de natureza trabalhista e previdenci\xE1ria, inclu\xEDdas as verbas rescis\xF3rias -, a qual ser\xE1 executada para reembolso dos preju\xEDzos sofridos pela Administra\xE7\xE3o, nos termos da legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} os valores das Notas fiscais ou Faturas correspondentes em valor proporcional ao inadimplemento, at\xE9 que a situa\xE7\xE3o seja regularizada.

{\xA7} Na hip\xF3tese do subitem anterior, n\xE3o havendo quita\xE7\xE3o das obriga\xE7\xF5es por parte do contratado no prazo de 15 (quinze) dias, fica o CONTRATADO obrigado a emitir as guias de recolhimento de contribui\xE7\xF5es previdenci\xE1rias e do FGTS e entreg\xE1-las ao CONTRATANTE, que poder\xE1 efetuar o pagamento das obriga\xE7\xF5es inadimplidas diretamente aos empregados que tenham participado da execu\xE7\xE3o dos servi\xE7os objeto do contrato, bem como das contribui\xE7\xF5es previdenci\xE1rias e do FGTS, deduzindo o respectivo valor do pagamento devido ao contratado.

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou na contrata\xE7\xE3o direta, ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau.

%% Nota AGU: Ac\xF3rd\xE3o 1207/2024-TCU-Plen\xE1rio, item 9.2.4 \u2014 erro ou fraude no enquadramento sindical que imponha repactua\xE7\xE3o ou \xF4nus por decis\xE3o judicial \xE9 motivo de extin\xE7\xE3o (art. 137, I).
{\xA7} O contrato poder\xE1 ser extinto em caso de altera\xE7\xE3o da conven\xE7\xE3o coletiva de trabalho em que se baseia a planilha de custos e forma\xE7\xE3o de pre\xE7os contratuais, em raz\xE3o de erro ou fraude no enquadramento sindical de que resulte a necessidade de repactua\xE7\xE3o ou imposi\xE7\xE3o de \xF4nus financeiro para a Administra\xE7\xE3o Contratante, em cumprimento de decis\xE3o judicial.

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos arts. 124 e seguintes da Lei n\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

%% Nota AGU: Parecer 00061/2024/DECOR/CGU/AGU \u2014 supress\xE3o consensual acima de 25% \xE9 poss\xEDvel, fundamentada; sugere-se prev\xEA-la no edital.
{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs.

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

%% Preto do modelo: "Or\xE7amento Geral da Uni\xE3o" (mantido literal; ver relat\xF3rio). No CFC: Gest\xE3o/unidade = UASG; Programa de trabalho = projeto; Elemento de despesa = conta cont\xE1bil.
{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o correr\xE3o \xE0 conta de recursos espec\xEDficos consignados no Or\xE7amento Geral da Uni\xE3o deste exerc\xEDcio, na dota\xE7\xE3o abaixo discriminada:

{\xA7\xA7} Gest\xE3o/unidade: UASG {cfc.uasg};

{\xA7\xA7} Fonte de recursos: {dotacao.fonte};

{\xA7\xA7} Programa de trabalho: Projeto n.\xBA {dotacao.projeto};

{\xA7\xA7} Elemento de despesa: conta cont\xE1bil {dotacao.conta}; e

{\xA7\xA7} Plano interno: {dotacao.plano_interno}; e

{\xA7\xA7} Nota de empenho: {dotacao.empenho};

%% Nota AGU (art. 106, II): em contrata\xE7\xE3o continuada, atestar no in\xEDcio e a cada exerc\xEDcio os cr\xE9ditos or\xE7ament\xE1rios. Reda\xE7\xE3o vermelha adaptada ao CFC com o texto do modelo Projur (n\xE3o h\xE1 Lei Or\xE7ament\xE1ria no CFC).
{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.

## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS

%% Nota AGU: Ac\xF3rd\xE3o 2569/2018-TCU-Plen\xE1rio \u2014 a Administra\xE7\xE3o, destinat\xE1ria final, pode invocar o CDC quando suas prerrogativas forem insuficientes.
{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl}\u2013 FORO

%% Foro do CFC: Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal ("de" do modelo contra\xEDdo em "do"; ver relat\xF3rio).
{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n\xBA 14.133, de 2021.

{#local_data}> {local_data}{/local_data}

> **{cfc.nome|maiusculas}**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

%% Nota AGU: a assinatura eletr\xF4nica do SEI n\xE3o dispensa testemunhas (art. 784, \xA7 4\xBA, do CPC; Nota 00013/2021/DECOR/CGU/AGU) \u2014 recomenda-se que o termo seja assinado por duas testemunhas.
{#testemunhas}> TESTEMUNHAS:
{*testemunhas}> {._n}- {.nome}
{/testemunhas}{/testemunhas}
`,"agu-contrato-servicos-sem-mo":`@requer regime=14133
@fonte agu-contrato-servicos-sem-mo
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
%% Modelo de Termo de Contrato \u2014 servi\xE7os sem regime de dedica\xE7\xE3o exclusiva de m\xE3o de obra (AGU, dez/2025). Uso no CFC: contrato decorrente de LICITA\xC7\xC3O (preg\xE3o eletr\xF4nico ou concorr\xEAncia); contrata\xE7\xE3o direta usa templates/contrato-servicos.md (Projur).
@padrao autoridade=autoridades.vp_gestao
@cabecalho

%% A linha vermelha "\xD3RG\xC3O OU ENTIDADE P\xDABLICA" do modelo \xE9 suprida pelo @cabecalho.
> (Processo Administrativo n\xB0 {processo})

%% Ementa: o preto do modelo diz "A UNI\xC3O, POR INTERM\xC9DIO DO (A)"; o CFC \xE9 autarquia e \xE9 ele a parte (exce\xE7\xE3o de fidelidade).
::: CONTRATO ADMINISTRATIVO N\xBA {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas} E A EMPRESA {contratada.razao_social|maiusculas}.

%% Alternativa vermelha da modalidade: [Preg\xE3o Eletr\xF4nico] OU [Concorr\xEAncia] (Dispensa/Inexigibilidade \u2192 template Projur contrato-servicos).
%% Nota AGU (Parecer 00004/2022/CNMLC/CGU/AGU, LGPD): n\xE3o p\xF4r documentos pessoais; representante da Administra\xE7\xE3o identificado s\xF3 pela matr\xEDcula funcional, o da contratada s\xF3 pelo nome.
%% Nota AGU: "Uni\xE3o" s\xF3 para a Administra\xE7\xE3o Direta; autarquia/funda\xE7\xE3o p\xF5e o pr\xF3prio nome \u2014 no CFC, a alternativa vermelha "[Autarquia XXXXX]" (mant\xE9m o "A" preto).
A Autarquia {cfc.nome}, por interm\xE9dio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}, nomeado(a) pela Portaria n\xBA {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matr\xEDcula Funcional n\xBA {nomeacao.matricula}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o n\xBA {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n\xBA 14.133, de 1\xBA de abril de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao.concorrencia}Concorr\xEAncia{/licitacao.concorrencia}{^licitacao.concorrencia}Preg\xE3o Eletr\xF4nico{/licitacao.concorrencia} n\xBA {licitacao.numero}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de servi\xE7os comuns de {objeto_servico}, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

%% Nota AGU: a tabela \xE9 meramente ilustrativa, ajustada ao caso concreto (linhas = itens adjudicados). Sem linha "|---|" para o cabe\xE7alho preto seguir colado a "Objeto da contrata\xE7\xE3o:".
{\xA7} Objeto da contrata\xE7\xE3o:

| ITEM | ESPECIFICA\xC7\xC3O | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

%% Alternativa vermelha do modelo: [O Edital da Licita\xE7\xE3o] OU [A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta] OU [O Aviso de Dispensa Eletr\xF4nica]. Este template \xE9 s\xF3 para licita\xE7\xE3o.
{\xA7\xA7} O Edital da Licita\xE7\xE3o;

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% Nota AGU: disposi\xE7\xF5es dos arts. 105, 106 e 107 da Lei 14.133 e da IN SEGES/MP 5/2017 (autorizada pela IN SEGES/ME 98/2022). Escolher UMA: objeto por escopo (art. 105) OU servi\xE7o continuado (arts. 106 e 107). A 3\xAA alternativa do modelo (emergencial, art. 75, VIII) \xE9 contrata\xE7\xE3o direta e n\xE3o entra neste template.
{#vigencia.escopo}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do artigo 105 da Lei n\xB0 14.133, de 2021.

{\xA7} O prazo de vig\xEAncia ser\xE1 automaticamente prorrogado, independentemente de termo aditivo, quando o objeto n\xE3o for conclu\xEDdo no per\xEDodo firmado acima, ressalvadas as provid\xEAncias cab\xEDveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% Nota AGU (Cadin): Lei 10.522/2002, art. 6\xBA-A (Lei 14.973/2024) e Parecer 00063/2024/DECOR/CGU/AGU \u2014 registro no Cadin impede o aditamento de contratos firmados a partir de 16/09/2024.
{#vigencia.continuada}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n\xB0 14.133, de 2021.

{\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{\xA7\xA7} Estar formalmente demonstrado no processo que a forma de presta\xE7\xE3o dos servi\xE7os tem natureza continuada;

{\xA7\xA7} Seja juntado relat\xF3rio que discorra sobre a execu\xE7\xE3o do contrato, com informa\xE7\xF5es de que os servi\xE7os tenham sido prestados regularmente;

{\xA7\xA7} Seja juntada justificativa e motivo, por escrito, de que a Administra\xE7\xE3o mant\xE9m interesse na realiza\xE7\xE3o do servi\xE7o;

{\xA7\xA7} Haja manifesta\xE7\xE3o expressa do CONTRATADO informando o interesse na prorroga\xE7\xE3o;

{\xA7\xA7} Seja comprovado que o CONTRATADO mant\xE9m as condi\xE7\xF5es iniciais de habilita\xE7\xE3o; e

{\xA7\xA7} N\xE3o haja registro no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} Nas eventuais prorroga\xE7\xF5es contratuais, os custos n\xE3o renov\xE1veis j\xE1 pagos ou amortizados ao longo do primeiro per\xEDodo de vig\xEAncia da contrata\xE7\xE3o dever\xE3o ser reduzidos ou eliminados como condi\xE7\xE3o para a renova\xE7\xE3o.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.{/vigencia.continuada}

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato

## CL\xC1USULA {\xA7cl} \u2013 PRE\xC7O

%% Escolher: valor mensal + total (servi\xE7o continuado) OU s\xF3 valor total.
{#valor_mensal}{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{\xA7} O valor total da contrata\xE7\xE3o \xE9 de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% Nota AGU: contrato de valor estimativo, com demanda vari\xE1vel, inclui o subitem abaixo.
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - REAJUSTE

{\xA7} As regras acerca do reajuste do valor contratual s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE

{\xA7} S\xE3o obriga\xE7\xF5es do CONTRATANTE:

{\xA7\xA7} Exigir o cumprimento de todas as obriga\xE7\xF5es assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{\xA7\xA7} Receber o objeto no prazo e condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia;

{\xA7\xA7} Notificar o CONTRATADO, por escrito, sobre v\xEDcios, defeitos incorre\xE7\xF5es, imperfei\xE7\xF5es, falhas ou irregularidades verificadas na execu\xE7\xE3o do objeto contratual, fixando prazo para que seja substitu\xEDdo, reparado ou corrigido, total ou parcialmente, \xE0s suas expensas, certificando-se de que as solu\xE7\xF5es por ele propostas sejam as mais adequadas;

{\xA7\xA7} Acompanhar e fiscalizar a execu\xE7\xE3o do contrato e o cumprimento das obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Comunicar a empresa para emiss\xE3o de Nota Fiscal relativa \xE0 parcela incontroversa da execu\xE7\xE3o do objeto, para efeito de liquida\xE7\xE3o e pagamento, quando houver controv\xE9rsia sobre a execu\xE7\xE3o do objeto, quanto \xE0 dimens\xE3o, qualidade e quantidade, conforme o art. 143 da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} Efetuar o pagamento ao CONTRATADO do valor correspondente \xE0 execu\xE7\xE3o do objeto, no prazo, forma e condi\xE7\xF5es estabelecidos no presente Contrato e no Termo de Refer\xEAncia;

{\xA7\xA7} Aplicar ao CONTRATADO as san\xE7\xF5es previstas na lei e neste Contrato;

{\xA7\xA7} N\xE3o praticar atos de inger\xEAncia na administra\xE7\xE3o do CONTRATADO, tais como:

{\xA7\xA7\xA7} indicar pessoas expressamente nominadas para executar direta ou indiretamente o objeto contratado;

{\xA7\xA7\xA7} fixar sal\xE1rio inferior ao definido em lei ou em ato normativo a ser pago pelo CONTRATADO;

{\xA7\xA7\xA7} estabelecer v\xEDnculo de subordina\xE7\xE3o com funcion\xE1rio do CONTRATADO;

{\xA7\xA7\xA7} definir forma de pagamento mediante exclusivo reembolso dos sal\xE1rios pagos;

{\xA7\xA7\xA7} demandar a funcion\xE1rio do CONTRATADO a execu\xE7\xE3o de tarefas fora do escopo do objeto da contrata\xE7\xE3o; e

{\xA7\xA7\xA7} prever exig\xEAncias que constituam interven\xE7\xE3o indevida da Administra\xE7\xE3o na gest\xE3o interna do CONTRATADO.

{\xA7\xA7} Cientificar o \xF3rg\xE3o de representa\xE7\xE3o judicial da Advocacia-Geral da Uni\xE3o para ado\xE7\xE3o das medidas cab\xEDveis quando do descumprimento de obriga\xE7\xF5es pelo CONTRATADO;

{\xA7\xA7} Explicitamente emitir decis\xE3o sobre todas as solicita\xE7\xF5es e reclama\xE7\xF5es relacionadas \xE0 execu\xE7\xE3o do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelat\xF3rios ou de nenhum interesse para a boa execu\xE7\xE3o do ajuste;

%% Nota AGU (art. 123 da Lei 14.133): prazo para decidir conforme a complexidade do objeto; sem especifica\xE7\xE3o, 1 (um) m\xEAs (art. 123, par\xE1grafo \xFAnico, e art. 28 do Decreto 11.246/2022).
{\xA7\xA7\xA7} A Administra\xE7\xE3o ter\xE1 o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorroga\xE7\xE3o motivada, por igual per\xEDodo.

%% Nota AGU (art. 92, XI): prazo de resposta ao pedido de reequil\xEDbrio; pode adotar o mesmo prazo do art. 123.
{\xA7\xA7} Responder eventuais pedidos de reestabelecimento do equil\xEDbrio econ\xF4mico-financeiro feitos pelo CONTRATADO no prazo m\xE1ximo de {prazo_reequilibrio};

%% Nota AGU: decorre do \xA7 4\xBA do art. 137 da Lei 14.133 \u2014 s\xF3 quando houver garantia de execu\xE7\xE3o.
{#garantia}{\xA7\xA7} Notificar os emitentes das garantias quanto ao in\xEDcio de processo administrativo para apura\xE7\xE3o de descumprimento de cl\xE1usulas contratuais;{/garantia}

{\xA7\xA7} Comunicar o CONTRATADO na hip\xF3tese de posterior altera\xE7\xE3o do projeto pelo CONTRATANTE, no caso do art. 93, \xA72\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7} A Administra\xE7\xE3o n\xE3o responder\xE1 por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados \xE0 execu\xE7\xE3o do contrato, bem como por qualquer dano causado a terceiros em decorr\xEAncia de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATADO

%% Nota AGU: obriga\xE7\xF5es gerais; o \xF3rg\xE3o verifica as peculiaridades do objeto (incluir, modificar ou excluir justificadamente).
{\xA7} O CONTRATADO deve cumprir todas as obriga\xE7\xF5es constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execu\xE7\xE3o do objeto, observando, ainda, as obriga\xE7\xF5es a seguir dispostas:

{\xA7} Atender \xE0s determina\xE7\xF5es regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informa\xE7\xE3o por eles solicitados;

%% Nota AGU: o prazo de corre\xE7\xE3o \xE9 fixado pelo fiscal caso a caso.
{\xA7} Reparar, corrigir, remover, reconstruir ou substituir, \xE0s suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e servi\xE7os nos quais se verificarem v\xEDcios, defeitos ou incorre\xE7\xF5es resultantes da execu\xE7\xE3o ou dos materiais empregados;

{\xA7} Responsabilizar-se pelos v\xEDcios e danos decorrentes da execu\xE7\xE3o do objeto, bem como por todo e qualquer dano causado \xE0 Administra\xE7\xE3o ou terceiros, n\xE3o reduzindo essa responsabilidade a fiscaliza\xE7\xE3o ou o acompanhamento da execu\xE7\xE3o contratual pelo CONTRATANTE, que ficar\xE1 autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

%% Nota AGU (art. 193 do CTN): a regularidade fiscal considera a natureza da atividade \u2014 em regra ISSQN (municipal); ICMS em transporte interestadual/intermunicipal e comunica\xE7\xE3o.
{\xA7} Quando n\xE3o for poss\xEDvel a verifica\xE7\xE3o da regularidade no Sistema de Cadastro de Fornecedores \u2013 SICAF, o CONTRATADO dever\xE1 entregar ao setor respons\xE1vel pela fiscaliza\xE7\xE3o do contrato, at\xE9 o dia trinta do m\xEAs seguinte ao da presta\xE7\xE3o dos servi\xE7os, os seguintes documentos:

{\xA7\xA7} prova de regularidade relativa \xE0 Seguridade Social;

{\xA7\xA7} certid\xE3o conjunta relativa aos tributos federais e \xE0 D\xEDvida Ativa da Uni\xE3o;

{\xA7\xA7} certid\xF5es que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domic\xEDlio ou sede do CONTRATADO;

{\xA7\xA7} Certid\xE3o de Regularidade do FGTS \u2013 CRF; e

{\xA7\xA7} Certid\xE3o Negativa de D\xE9bitos Trabalhistas \u2013 CNDT.

{\xA7} Responsabilizar-se pelo cumprimento das obriga\xE7\xF5es previstas em Acordo, Conven\xE7\xE3o, Diss\xEDdio Coletivo de Trabalho ou equivalentes das categorias abrangidas pelo contrato, por todas as obriga\xE7\xF5es trabalhistas, sociais, previdenci\xE1rias, tribut\xE1rias, fiscais, comerciais e as demais previstas em legisla\xE7\xE3o espec\xEDfica, cuja inadimpl\xEAncia n\xE3o transfere a responsabilidade ao CONTRATANTE e n\xE3o poder\xE1 onerar o objeto do contrato;

{\xA7} Comunicar ao Fiscal do contrato tempestivamente, observada a urg\xEAncia da situa\xE7\xE3o, qualquer ocorr\xEAncia anormal ou acidente que se verifique no local da execu\xE7\xE3o do objeto contratual, n\xE3o ultrapassando o prazo de 24 (vinte e quatro) horas;

{\xA7} Paralisar, por determina\xE7\xE3o do CONTRATANTE, qualquer atividade que n\xE3o esteja sendo executada de acordo com a boa t\xE9cnica ou que ponha em risco a seguran\xE7a de pessoas ou bens de terceiros;

{\xA7} Manter, durante toda a vig\xEAncia do contrato, em compatibilidade com as obriga\xE7\xF5es assumidas, todas as condi\xE7\xF5es exigidas para habilita\xE7\xE3o na licita\xE7\xE3o ou para qualifica\xE7\xE3o na contrata\xE7\xE3o direta;

{\xA7} Cumprir, durante todo o per\xEDodo de execu\xE7\xE3o do contrato, a reserva de cargos prevista em lei para pessoa com defici\xEAncia, para reabilitado da Previd\xEAncia Social ou para aprendiz, bem como as reservas de cargos previstas na legisla\xE7\xE3o;

{\xA7} Comprovar a reserva de cargos a que se refere a cl\xE1usula acima, no prazo fixado pelo fiscal do contrato, com a indica\xE7\xE3o dos empregados que preencheram as referidas vagas;

{\xA7} Guardar sigilo sobre todas as informa\xE7\xF5es obtidas em decorr\xEAncia do cumprimento do contrato;

{\xA7} Arcar com o \xF4nus decorrente de eventual equ\xEDvoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos vari\xE1veis decorrentes de fatores futuros e incertos, devendo complement\xE1-los, caso o previsto inicialmente em sua proposta n\xE3o seja satisfat\xF3rio para o atendimento do objeto da contrata\xE7\xE3o, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei n\xBA 14.133, de 2021;

{\xA7} Cumprir, al\xE9m dos postulados legais vigentes de \xE2mbito federal, estadual ou municipal, as normas de seguran\xE7a do CONTRATANTE;

{\xA7} Alocar os empregados necess\xE1rios ao perfeito cumprimento das cl\xE1usulas deste contrato, com habilita\xE7\xE3o e conhecimento adequados;

{\xA7} Prestar os servi\xE7os dentro dos par\xE2metros e rotinas estabelecidos;

{\xA7} Fornecer todos os materiais, equipamentos, ferramentas e utens\xEDlios demandados, em quantidade, qualidade e tecnologia adequadas, com a observ\xE2ncia \xE0s recomenda\xE7\xF5es aceitas pela boa t\xE9cnica, normas e legisla\xE7\xE3o de reg\xEAncia;

{\xA7} Conduzir os trabalhos com estrita observ\xE2ncia \xE0s normas da legisla\xE7\xE3o pertinente, cumprindo as determina\xE7\xF5es dos Poderes P\xFAblicos, mantendo sempre limpo o local de execu\xE7\xE3o do objeto e nas melhores condi\xE7\xF5es de seguran\xE7a, higiene e disciplina;

{\xA7} Submeter previamente, por escrito, ao CONTRATANTE, para an\xE1lise e aprova\xE7\xE3o, quaisquer mudan\xE7as nos m\xE9todos executivos que fujam \xE0s especifica\xE7\xF5es do memorial descritivo ou instrumento cong\xEAnere;

{\xA7} Cumprir as normas de prote\xE7\xE3o ao trabalho, inclusive aquelas relativas \xE0 seguran\xE7a e \xE0 sa\xFAde no trabalho;

{\xA7} N\xE3o submeter os trabalhadores a condi\xE7\xF5es degradantes de trabalho, jornadas exaustivas, servid\xE3o por d\xEDvida ou trabalhos for\xE7ados;

{\xA7} N\xE3o permitir a utiliza\xE7\xE3o de qualquer trabalho do menor de dezesseis anos de idade, exceto na condi\xE7\xE3o de aprendiz para os maiores de quatorze anos de idade, observada a legisla\xE7\xE3o pertinente;

{\xA7} N\xE3o submeter o menor de dezoito anos de idade \xE0 realiza\xE7\xE3o de trabalho noturno e em condi\xE7\xF5es perigosas e insalubres e \xE0 realiza\xE7\xE3o de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto n\xBA 6.481, de 12 de junho de 2008;

{\xA7} Receber e dar o tratamento adequado a den\xFAncias de discrimina\xE7\xE3o, viol\xEAncia e ass\xE9dio no ambiente de trabalho;

{\xA7} Manter preposto aceito pela Administra\xE7\xE3o no local do servi\xE7o para represent\xE1-lo na execu\xE7\xE3o do contrato;

{\xA7\xA7} A indica\xE7\xE3o ou a manuten\xE7\xE3o do preposto da empresa poder\xE1 ser recusada pelo \xF3rg\xE3o ou entidade, desde que devidamente justificada, devendo a empresa designar outro para o exerc\xEDcio da atividade.

{\xA7} N\xE3o contratar, durante a vig\xEAncia do contrato, c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau, de dirigente do CONTRATANTE ou de agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou que atue na fiscaliza\xE7\xE3o ou gest\xE3o do contrato, nos termos do artigo 48, par\xE1grafo \xFAnico, da Lei n\xBA 14.133, de 2021;

{\xA7} Prestar todo esclarecimento ou informa\xE7\xE3o solicitada pelo CONTRATANTE ou por seus prepostos, garantindo-lhes o acesso, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a guarda, manuten\xE7\xE3o e vigil\xE2ncia de materiais, ferramentas, e tudo o que for necess\xE1rio \xE0 execu\xE7\xE3o do objeto, durante a vig\xEAncia do contrato;

{\xA7} Assegurar aos seus trabalhadores ambiente de trabalho e instala\xE7\xF5es em condi\xE7\xF5es adequadas ao cumprimento das normas de sa\xFAde, seguran\xE7a e bem-estar no trabalho;

{\xA7} Fornecer equipamentos de prote\xE7\xE3o individual (EPI) e equipamentos de prote\xE7\xE3o coletiva (EPC),quando for o caso;

{\xA7} Garantir o acesso do CONTRATANTE, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos \xE0 execu\xE7\xE3o do contrato;

{\xA7} Promover a organiza\xE7\xE3o t\xE9cnica e administrativa dos servi\xE7os, de modo a conduzi-los eficaz e eficientemente, de acordo com os documentos e especifica\xE7\xF5es que integram o Termo de Refer\xEAncia, no prazo determinado;

{\xA7} Instruir seus empregados quanto \xE0 necessidade de acatar as normas internas da Administra\xE7\xE3o;

{\xA7} Instruir seus empregados a respeito das atividades a serem desempenhadas, alertando-os a n\xE3o executar atividades n\xE3o abrangidas pelo contrato, devendo o CONTRATADO relatar ao CONTRATANTE toda e qualquer ocorr\xEAncia neste sentido, a fim de evitar desvio de fun\xE7\xE3o;

%% Nota AGU (art. 47, \xA7 2\xBA): em servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica, recomenda-se incluir os dois subitens abaixo.
{#manutencao}{\xA7} Realizar os servi\xE7os de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica no(s) seguinte(s) local(is) {manutencao.locais};

{\xA7} O t\xE9cnico dever\xE1 se deslocar ao local da reparti\xE7\xE3o, salvo se o CONTRATADO tiver unidade de presta\xE7\xE3o de servi\xE7os em dist\xE2ncia de {manutencao.distancia} do local demandado.{/manutencao}

{#transicao_contratual}{\xA7} Realizar a transi\xE7\xE3o contratual com transfer\xEAncia de conhecimento, tecnologia e t\xE9cnicas empregadas, sem perda de informa\xE7\xF5es, podendo exigir, inclusive, a capacita\xE7\xE3o dos t\xE9cnicos do CONTRATANTE ou da nova empresa que continuar\xE1 a execu\xE7\xE3o dos servi\xE7os;{/transicao_contratual}

%% Nota AGU (art. 93): cess\xE3o de direitos quando o objeto for elabora\xE7\xE3o de projetos ou servi\xE7os t\xE9cnicos especializados, inclusive software; dispens\xE1vel em pesquisa e desenvolvimento (art. 93, \xA7 2\xBA). O subitem da obra imaterial de car\xE1ter tecnol\xF3gico s\xF3 se o objeto for esse projeto (art. 93, \xA7 1\xBA).
{#cessao_direitos}{\xA7} Ceder ao CONTRATANTE todos os direitos patrimoniais relativos ao objeto contratado, o qual poder\xE1 ser livremente utilizado e/ou alterado em outras ocasi\xF5es, sem necessidade de nova autoriza\xE7\xE3o do CONTRATADO.

{#cessao_direitos.obra_imaterial}{\xA7\xA7} Considerando que o projeto contratado se refere a obra imaterial de car\xE1ter tecnol\xF3gico, insuscet\xEDvel de privil\xE9gio, a cess\xE3o dos direitos a que se refere o subitem acima inclui o fornecimento de todos os dados, documentos e elementos de informa\xE7\xE3o pertinentes \xE0 tecnologia de concep\xE7\xE3o, desenvolvimento, fixa\xE7\xE3o em suporte f\xEDsico de qualquer natureza e aplica\xE7\xE3o da obra.{/cessao_direitos.obra_imaterial}{/cessao_direitos}

%% Nota AGU (LGPD): cl\xE1usula necess\xE1ria se a contrata\xE7\xE3o envolver, de qualquer forma, tratamento de dados pessoais; admite modelagem de acesso direto da Administra\xE7\xE3o aos dados, declara\xE7\xE3o de capacita\xE7\xE3o dos empregados, rotinas de dilig\xEAncia espec\xEDficas e, em transfer\xEAncia internacional, cl\xE1usulas-padr\xE3o da Resolu\xE7\xE3o CD/ANPD 19/2024 (Anexo II) sem altera\xE7\xE3o.
{#lgpd}## CL\xC1USULA {\xA7cl}- OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n\xBA 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de SUBOPERADORES e SUBCONTRATADOS o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA7 1\xBA do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O

%% Nota AGU: exigir ou n\xE3o a garantia \xE9 crit\xE9rio da Administra\xE7\xE3o (salvo norma que a torne obrigat\xF3ria); exigindo, prever no edital e no contrato; n\xE3o exigindo, justificar pelos estudos preliminares e pela an\xE1lise de riscos.
{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} Ser\xE1 exigida a presta\xE7\xE3o de garantia na presente contrata\xE7\xE3o, conforme regras constantes do Termo de Refer\xEAncia.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} As regras acerca de infra\xE7\xF5es e san\xE7\xF5es administrativas referentes \xE0 execu\xE7\xE3o do contrato s\xE3o aquelas definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL

%% Mesma escolha da vig\xEAncia: objeto por escopo OU servi\xE7o continuado (a 3\xAA alternativa, emergencial do art. 75, VIII, n\xE3o entra neste template).
{#vigencia.escopo}{\xA7} O contrato ser\xE1 extinto quando cumpridas as obriga\xE7\xF5es de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{\xA7} Se as obriga\xE7\xF5es n\xE3o forem cumpridas no prazo estipulado, a vig\xEAncia ficar\xE1 prorrogada at\xE9 a conclus\xE3o do objeto, caso em que dever\xE1 a Administra\xE7\xE3o providenciar a readequa\xE7\xE3o do cronograma fixado para o contrato.

{\xA7} Quando a n\xE3o conclus\xE3o do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{\xA7\xA7} ficar\xE1 ele constitu\xEDdo em mora, sendo-lhe aplic\xE1veis as respectivas san\xE7\xF5es administrativas; e

{\xA7\xA7} poder\xE1 a Administra\xE7\xE3o optar pela extin\xE7\xE3o do contrato e, nesse caso, adotar\xE1 as medidas admitidas em lei para a continuidade da execu\xE7\xE3o contratual.{/vigencia.escopo}

%% Nota AGU (art. 106, III e \xA7 1\xBA; ON AGU 98/2025): extin\xE7\xE3o antecipada sem \xF4nus s\xF3 na data de anivers\xE1rio, com ci\xEAncia formal do contratado ao menos dois meses antes (contagem do art. 183); antes disso, s\xF3 com \xF4nus (art. 138, \xA7 2\xBA).
{#vigencia.continuada}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, mediante justificativa formal de que n\xE3o disp\xF5e de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou de que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n\xBA 14.133, de 2021.{/vigencia.continuada}

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei n\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Da rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio.

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o na licita\xE7\xE3o ou na contrata\xE7\xE3o direta, ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau.

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos arts. 124 e seguintes da Lei n\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

%% Nota AGU (Parecer 00061/2024/DECOR/CGU/AGU): supress\xE3o consensual acima de 25% \xE9 poss\xEDvel, fundamentada e respeitado o art. 5\xBA; sugere-se prev\xEA-la no edital.
{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs.

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

%% Os campos vermelhos da dota\xE7\xE3o (Gest\xE3o/unidade, Fonte, Programa, Elemento, Plano interno, Nota de empenho) recebem os dados do or\xE7amento do CFC (reserva da Gecont). No Word s\xE3o incisos I) a VI); aqui saem como subitens numerados.
{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o correr\xE3o \xE0 conta de recursos espec\xEDficos consignados no Or\xE7amento Geral da Uni\xE3o deste exerc\xEDcio, na dota\xE7\xE3o abaixo discriminada:

{\xA7\xA7} Gest\xE3o/unidade: UASG {cfc.uasg};

{\xA7\xA7} Fonte de recursos: {dotacao.fonte};

{\xA7\xA7} Programa de trabalho: Projeto n.\xBA {dotacao.projeto};

{\xA7\xA7} Elemento de despesa: conta cont\xE1bil {dotacao.conta}; e

{\xA7\xA7} Plano interno: {dotacao.plano_interno}; e

{\xA7\xA7} Nota de empenho: {dotacao.empenho};

%% Nota AGU (art. 106, II): em contrata\xE7\xE3o continuada, atestar no in\xEDcio e a cada exerc\xEDcio os cr\xE9ditos or\xE7ament\xE1rios. Reda\xE7\xE3o vermelha adaptada ao CFC com o texto do modelo Projur (n\xE3o h\xE1 Lei Or\xE7ament\xE1ria no CFC).
{#vigencia.continuada}{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.{/vigencia.continuada}

## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS

%% Nota AGU (Ac\xF3rd\xE3o TCU 2569/2018-Plen\xE1rio): a Administra\xE7\xE3o pode invocar o CDC como destinat\xE1ria final de bens e servi\xE7os.
{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl}\u2013 FORO

%% Foro vermelho fixado para o CFC: Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal ("de" preto contra\xEDdo em "do" \u2014 exce\xE7\xE3o de fidelidade).
{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n\xBA 14.133, de 2021.

{#local_data}> {local_data}{/local_data}

> **{cfc.nome|maiusculas}**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

%% Nota AGU (CPC, art. 784, \xA7 4\xBA; Nota 00013/2021/DECOR/CGU/AGU): a assinatura no SEI n\xE3o dispensa testemunhas \u2014 recomenda-se duas.
{#testemunhas}> TESTEMUNHAS:

{*testemunhas}> {._n}- {.nome}

{/testemunhas}{/testemunhas}
`,"agu-edital-credenciamento":`@requer regime=14133
@fonte agu-edital-credenciamento
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
@cabecalho

%% Capa do modelo. AGU: \xE9 admiss\xEDvel vig\xEAncia indeterminada do credenciamento (Parecer 0003/2017/CNU/CGU/AGU); o prazo de vig\xEAncia do edital (per\xEDodo para se credenciar) n\xE3o se confunde com o prazo de validade do credenciamento (art. 19, \xA7 1\xBA, do Decreto 11.878/2024).
> CREDENCIAMENTO
> {credenciamento.numero}/{credenciamento.ano}
> CONTRATANTE (UASG)
> ({cfc.uasg})
> OBJETO
> {credenciamento.objeto|maiusculas}
> VALOR TOTAL DA CONTRATA\xC7\xC3O
> R$ {valor_global}
> PRAZO DE VIG\xCANCIA DO EDITAL
> {edital.vigencia}

# CREDENCIAMENTO N\xBA {credenciamento.numero}/{credenciamento.ano}

> (Processo Administrativo n\xB0 {processo})

Torna-se p\xFAblico que o(a) {cfc.nome}, por meio do(a) {cfc.setor_licitacoes}, sediado(a) {cfc.sede}, realizar\xE1 CREDENCIAMENTO, na forma ELETR\xD4NICA, nos termos da Lei n\xBA 14.133, de 1\xBA de abril de 2021, do Decreto n\xBA 11.878, de 9 de janeiro de 2024, e demais legisla\xE7\xE3o aplic\xE1vel e, ainda, de acordo com as condi\xE7\xF5es estabelecidas neste Edital.

## {\xA7sec}. DO OBJETO

%% Escolha: "fornecer" (bens) ou "prestar servi\xE7os de" (servi\xE7os), seguido da descri\xE7\xE3o do bem ou servi\xE7o do credenciado.
{\xA7} O objeto do presente procedimento \xE9 o credenciamento de interessados em {#fornecimento}fornecer{/fornecimento}{^fornecimento}prestar servi\xE7os de{/fornecimento} {credenciamento.objeto}, conforme condi\xE7\xF5es, quantidades e exig\xEAncias estabelecidas neste Edital e seus anexos.

%% AGU: enquadrar o credenciamento em pelo menos um dos incisos do art. 3\xBA do Decreto 11.878/2024 (o modelo pode ser adaptado aos casos de calamidade da Lei 14.981/2024).
{\xA7} O presente credenciamento se enquadra na hip\xF3tese do art. 3\xBA, inciso {credenciamento.inciso}, do Decreto n\xBA 11.878, de 2024.

{\xA7} O credenciamento n\xE3o obriga a administra\xE7\xE3o p\xFAblica a contratar.

## {\xA7sec}. DA PARTICIPA\xC7\xC3O NO CREDENCIAMENTO

{\xA7} Poder\xE3o participar deste credenciamento os interessados que estiverem previamente cadastrados no Sistema de Cadastramento Unificado de Fornecedores (Sicaf) e no Sistema de Compras do Governo Federal (www.gov.br/compras).

{\xA7} O interessado responsabiliza-se exclusiva e formalmente pelas transa\xE7\xF5es efetuadas em seu nome, assume como firmes e verdadeiros os atos praticados diretamente ou por seu representante, exclu\xEDda a responsabilidade do provedor do sistema ou do \xF3rg\xE3o ou entidade promotora do credenciamento por eventuais danos decorrentes de uso indevido das credenciais de acesso, ainda que por terceiros.

{\xA7} \xC9 de responsabilidade do cadastrado conferir a exatid\xE3o dos seus dados cadastrais nos Sistemas relacionados no item anterior e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

{\xA7} N\xE3o poder\xE3o participar do credenciamento:

{\xA7\xA7} aquele que n\xE3o atenda \xE0s condi\xE7\xF5es deste Edital e seu(s) anexo(s);

{\xA7\xA7} sociedade que desempenhe atividade incompat\xEDvel com o objeto do credenciamento;

{\xA7\xA7} empresas estrangeiras que n\xE3o tenham representa\xE7\xE3o legal no Brasil com poderes expressos para receber cita\xE7\xE3o e responder administrativa ou judicialmente;

{\xA7\xA7@autor_projeto} autor do anteprojeto, do projeto b\xE1sico ou do projeto executivo, pessoa f\xEDsica ou jur\xEDdica, quando o credenciamento versar sobre servi\xE7os ou fornecimento de bens a ele relacionados;

{\xA7\xA7@empresa_projeto} empresa, isoladamente ou em cons\xF3rcio, respons\xE1vel pela elabora\xE7\xE3o do projeto b\xE1sico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, respons\xE1vel t\xE9cnico ou subcontratado, quando a licita\xE7\xE3o versar sobre servi\xE7os ou fornecimento de bens a ela necess\xE1rios;

{\xA7\xA7@sancao} pessoa f\xEDsica ou jur\xEDdica que esteja impedida de licitar ou contratar com a administra\xE7\xE3o p\xFAblica federal em decorr\xEAncia de san\xE7\xE3o que lhe foi imposta;

{\xA7\xA7} aquele que mantenha v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que desempenhe fun\xE7\xE3o no processo de contrata\xE7\xE3o ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau;

{\xA7\xA7} empresas controladoras, controladas ou coligadas, nos termos da Lei n\xBA 6.404, de 1976, concorrendo entre si;

{\xA7\xA7} pessoa f\xEDsica ou jur\xEDdica que, nos 5 (cinco) anos anteriores \xE0 divulga\xE7\xE3o do edital, tenha sido condenada judicialmente, com tr\xE2nsito em julgado, por explora\xE7\xE3o de trabalho infantil, por submiss\xE3o de trabalhadores a condi\xE7\xF5es an\xE1logas \xE0s de escravo ou por contrata\xE7\xE3o de adolescentes nos casos vedados pela legisla\xE7\xE3o trabalhista;

{\xA7\xA7} Organiza\xE7\xF5es da Sociedade Civil de Interesse P\xFAblico - OSCIP, atuando nessa condi\xE7\xE3o.

%% AGU: a veda\xE7\xE3o a cooperativas s\xF3 se aplica a servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra fora das hip\xF3teses do art. 10 da IN SEGES/MP 5/2017 (Parecer 00002/2023/DECOR/CGU/AGU).
{#vedadas_cooperativas}{\xA7\xA7} sociedades cooperativas;{/vedadas_cooperativas}

%% AGU: vedar cons\xF3rcio \xE9 exce\xE7\xE3o e deve ser justificado pela Administra\xE7\xE3o (analogia com o art. 15 da Lei 14.133/2021).
{#vedado_consorcio}{\xA7\xA7} pessoas jur\xEDdicas reunidas em cons\xF3rcio;{/vedado_consorcio}

%% AGU: pessoas f\xEDsicas s\xF3 podem ser exclu\xEDdas quando o objeto exigir capital, estrutura ou equipe incompat\xEDveis com a pessoa f\xEDsica, demonstrado no ETP (art. 4\xBA, par\xE1grafo \xFAnico, IN SEGES/ME 116/2021).
{#vedadas_pessoas_fisicas}{\xA7\xA7} pessoas f\xEDsicas.{/vedadas_pessoas_fisicas}

{\xA7@agente_publico} N\xE3o poder\xE1 participar, direta ou indiretamente, do credenciamento ou da execu\xE7\xE3o do contrato agente p\xFAblico do \xF3rg\xE3o ou entidade contratante, devendo ser observadas as situa\xE7\xF5es que possam configurar conflito de interesses no exerc\xEDcio ou ap\xF3s o exerc\xEDcio do cargo ou emprego, nos termos da legisla\xE7\xE3o que disciplina a mat\xE9ria, conforme \xA7 1\xBA do art. 9\xBA da Lei n\xBA 14.133, de 2021.

{\xA7} O impedimento de que trata o item {\xA7ref@sancao} ser\xE1 tamb\xE9m aplicado ao interessado que atue em substitui\xE7\xE3o a outra pessoa, f\xEDsica ou jur\xEDdica, com o intuito de burlar a efetividade da san\xE7\xE3o a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o il\xEDcito ou a utiliza\xE7\xE3o fraudulenta da personalidade jur\xEDdica do interessado.

{\xA7} A crit\xE9rio da Administra\xE7\xE3o e exclusivamente a seu servi\xE7o, o autor dos projetos e a empresa a que se referem os itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} poder\xE3o participar no apoio das atividades de planejamento da contrata\xE7\xE3o, de execu\xE7\xE3o da licita\xE7\xE3o ou de gest\xE3o do contrato, desde que sob supervis\xE3o exclusiva de agentes p\xFAblicos do \xF3rg\xE3o ou entidade.

{\xA7} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econ\xF4mico.

{\xA7} O disposto nos itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} n\xE3o impede a licita\xE7\xE3o ou a contrata\xE7\xE3o de servi\xE7o que inclua como encargo do contratado a elabora\xE7\xE3o do projeto b\xE1sico e do projeto executivo, nas contrata\xE7\xF5es integradas, e do projeto executivo, nos demais regimes de execu\xE7\xE3o.

{\xA7} Em contrata\xE7\xF5es realizadas no \xE2mbito de projetos e programas parcialmente financiados por ag\xEAncia oficial de coopera\xE7\xE3o estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, n\xE3o poder\xE1 participar pessoa f\xEDsica ou jur\xEDdica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inid\xF4nea nos termos da Lei n\xBA 14.133, de 2021.

{\xA7} A veda\xE7\xE3o de que trata o item {\xA7ref@agente_publico}. estende-se a terceiro que auxilie a condu\xE7\xE3o da contrata\xE7\xE3o na qualidade de integrante de equipe de apoio, profissional especializado ou funcion\xE1rio ou representante de empresa que preste assessoria t\xE9cnica.

## {\xA7sec}. DA MANIFESTA\xC7\xC3O DA INTEN\xC7\xC3O DE SE CREDENCIAR

%% AGU: nas hip\xF3teses do art. 79, I e II, a Administra\xE7\xE3o fixa o valor; em mercados fluidos (art. 79, III) o edital pode fixar percentual m\xEDnimo de desconto sobre as cota\xE7\xF5es de mercado (art. 7\xBA, \xA7 2\xBA, do Decreto 11.878/2024).
{\xA7} Os interessados dever\xE3o estar previamente cadastrados no Sicaf e encaminhar\xE3o, exclusivamente por meio eletr\xF4nico (e-mail, protocolo eletr\xF4nico, portal do \xF3rg\xE3o, entre outros), o requerimento de participa\xE7\xE3o com a indica\xE7\xE3o de sua inten\xE7\xE3o de se credenciar para o fornecimento dos bens ou para a presta\xE7\xE3o dos servi\xE7os, com as seguintes informa\xE7\xF5es:

%% Descri\xE7\xE3o com marca e fabricante: usar quando o objeto a exigir (t\xEDpico de fornecimento de bens).
{#descricao_marca_fabricante}{\xA7\xA7} Descri\xE7\xE3o detalhada do objeto contendo informa\xE7\xF5es sobre marca, fabricante etc.{/descricao_marca_fabricante}

%% AGU: com mais de um item, o interessado indica no requerimento o(s) item(ns) a que se credencia e declara cumprir os respectivos requisitos de habilita\xE7\xE3o.
{\xA7\xA7} Atestar o cumprimento dos requisitos de habilita\xE7\xE3o para fornecimento dos bens ou para a presta\xE7\xE3o dos servi\xE7os ({credenciamento.objeto})

%% S\xF3 na hip\xF3tese de mercados fluidos (art. 79, III, da Lei 14.133/2021).
{#mercados_fluidos}{\xA7\xA7} Na hip\xF3tese de contrata\xE7\xE3o em mercados fluidos, percentual m\xEDnimo de desconto sobre as cota\xE7\xF5es de mercado registradas no momento da contrata\xE7\xE3o;{/mercados_fluidos}

{\xA7} Todas as especifica\xE7\xF5es do objeto vinculam o interessado.

{\xA7} No valor da contrata\xE7\xE3o estar\xE3o inclusos todos os custos operacionais, encargos previdenci\xE1rios, trabalhistas, tribut\xE1rios, comerciais e quaisquer outros que incidam direta ou indiretamente na execu\xE7\xE3o do objeto.

{\xA7} A apresenta\xE7\xE3o do requerimento de participa\xE7\xE3o com a indica\xE7\xE3o da inten\xE7\xE3o de se credenciar implica obrigatoriedade do cumprimento das disposi\xE7\xF5es contidas no Termo de Refer\xEAncia, assumindo o credenciado o compromisso de executar o objeto nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utens\xEDlios necess\xE1rios, em quantidades e qualidades adequadas \xE0 perfeita execu\xE7\xE3o contratual, promovendo, quando requerido, sua substitui\xE7\xE3o.

{\xA7@declaracao} No requerimento de participa\xE7\xE3o com a indica\xE7\xE3o de sua inten\xE7\xE3o de se credenciar, o interessado apresentar\xE1 tamb\xE9m declara\xE7\xE3o que:

{\xA7\xA7} est\xE1 ciente e concorda com as condi\xE7\xF5es contidas no edital e seus anexos, bem como de que o valor da contrapresta\xE7\xE3o compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de sua entrega em definitivo e que cumpre plenamente os requisitos de habilita\xE7\xE3o definidos no instrumento convocat\xF3rio;

{\xA7\xA7} n\xE3o emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e n\xE3o emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condi\xE7\xE3o de aprendiz, nos termos do art. 7\xB0, inciso XXXIII, da Constitui\xE7\xE3o;

{\xA7\xA7} n\xE3o possui empregados executando trabalho degradante ou for\xE7ado, observando o disposto nos incisos III e IV do art. 1\xBA e no inciso III do art. 5\xBA da Constitui\xE7\xE3o Federal;

{\xA7\xA7} cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O descumprimento das regras supramencionadas pela Administra\xE7\xE3o ou por parte dos contratados pode ensejar a responsabiliza\xE7\xE3o pelo Tribunal de Contas da Uni\xE3o e, ap\xF3s o devido processo legal, gerar as seguintes consequ\xEAncias: assinatura de prazo para a ado\xE7\xE3o das medidas necess\xE1rias ao exato cumprimento da lei, nos termos do art. 71, inciso IX, da Constitui\xE7\xE3o; ou condena\xE7\xE3o dos agentes p\xFAblicos respons\xE1veis e da empresa contratada ao pagamento dos preju\xEDzos ao er\xE1rio, caso verificada a ocorr\xEAncia de superfaturamento por sobrepre\xE7o na execu\xE7\xE3o do contrato.

{\xA7} O interessado organizado em cooperativa dever\xE1 declarar, ainda, que cumpre os requisitos estabelecidos no art. 16 da Lei n\xBA 14.133, de 2021.

{\xA7} A falsidade da declara\xE7\xE3o de que trata o item {\xA7ref@declaracao} sujeitar\xE1 o interessado \xE0s san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021, e neste Edital.

{\xA7} Quando for o caso, o interessado dever\xE1 comunicar imediatamente ao provedor do sistema qualquer acontecimento que possa comprometer o sigilo ou a seguran\xE7a, para imediato bloqueio de acesso.

## {\xA7sec}. DA HABILITA\xC7\xC3O

{\xA7} Os documentos previstos no Termo de Refer\xEAncia, necess\xE1rios e suficientes para demonstrar a capacidade do interessado de realizar o objeto do credenciamento, ser\xE3o exigidos para fins de habilita\xE7\xE3o, nos termos dos arts. 62 a 70 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} A documenta\xE7\xE3o exigida para fins de habilita\xE7\xE3o jur\xEDdica, fiscal, social e trabalhista e econ\xF4mico-\uFB01nanceira, poder\xE1 ser substitu\xEDda pelo registro cadastral no Sicaf.

{\xA7} Quando permitida a participa\xE7\xE3o de empresas estrangeiras que n\xE3o funcionem no Pa\xEDs, as exig\xEAncias de habilita\xE7\xE3o ser\xE3o atendidas mediante documentos equivalentes, inicialmente apresentados em tradu\xE7\xE3o livre.

{\xA7} Na hip\xF3tese de o interessado ser empresa estrangeira que n\xE3o funcione no Pa\xEDs, para \uFB01ns de assinatura do contrato os documentos exigidos para a habilita\xE7\xE3o ser\xE3o traduzidos por tradutor juramentado no Pa\xEDs e apostilados nos termos do disposto no Decreto n\xBA 8.660, de 29 de janeiro de 2016, ou de outro que venha a substitu\xED-lo, ou consularizados pelos respectivos consulados ou embaixadas.

{\xA7} Quando permitida a participa\xE7\xE3o de cons\xF3rcio de empresas, a habilita\xE7\xE3o t\xE9cnica, quando exigida, ser\xE1 feita por meio do somat\xF3rio dos quantitativos de cada consorciado e, para efeito de habilita\xE7\xE3o econ\xF4mico-financeira, quando exigida, ser\xE1 observado o somat\xF3rio dos valores de cada consorciado.

{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser apresentados em original, por c\xF3pia ou por {habilitacao.outro_meio}.

%% AGU: inserir o n\xFAmero de dias \xFAteis necess\xE1rios \xE0 an\xE1lise dos documentos de habilita\xE7\xE3o.
{\xA7} O \xF3rg\xE3o credenciante ter\xE1 o prazo de {habilitacao.prazo_analise} dias \xFAteis para analisar a documenta\xE7\xE3o apresentada pelo interessado.

%% AGU: no credenciamento pelo Decreto 11.878/2024 o registro cadastral \xE9 no Sicaf; se o credenciamento seguir s\xF3 o Decreto, e n\xE3o a Lei 14.981/2024 (calamidade), retirar esta cl\xE1usula.
{#calamidade_lei_14981}{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser substitu\xEDdos por registro cadastral emitido por \xF3rg\xE3o ou entidade p\xFAblica, desde que o registro tenha sido feito em obedi\xEAncia ao disposto na Lei n\xBA 14.133, de 2021.{/calamidade_lei_14981}

%% AGU: empresa com 100 ou mais empregados deve preencher cargos com reabilitados ou pessoas com defici\xEAncia (art. 93 da Lei 8.213/1991).
{\xA7} Ser\xE1 verificado se o interessado apresentou no sistema, sob pena de inabilita\xE7\xE3o, a declara\xE7\xE3o de que cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O interessado dever\xE1 apresentar, sob pena de desclassifica\xE7\xE3o, declara\xE7\xE3o de que o valor da contrata\xE7\xE3o compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data da apresenta\xE7\xE3o do requerimento de participa\xE7\xE3o.

{\xA7} A habilita\xE7\xE3o ser\xE1 verificada por meio do Sicaf, em rela\xE7\xE3o aos documentos por ele abrangidos.

{\xA7\xA7} Somente haver\xE1 a necessidade de comprova\xE7\xE3o do preenchimento de requisitos mediante apresenta\xE7\xE3o dos documentos originais n\xE3o-digitais quando houver d\xFAvida em rela\xE7\xE3o \xE0 integridade do documento digital ou quando a lei expressamente o exigir.

{\xA7} \xC9 de responsabilidade do interessado conferir a exatid\xE3o dos seus dados cadastrais no Sicaf e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

{\xA7} A verifica\xE7\xE3o pela comiss\xE3o de contrata\xE7\xE3o, em s\xEDtios eletr\xF4nicos oficiais de \xF3rg\xE3os e entidades emissores de certid\xF5es constitui meio legal de prova, para fins de habilita\xE7\xE3o.

%% AGU (mesma nota do registro cadastral): no Decreto 11.878/2024 o registro cadastral \xE9 no Sicaf. O texto abaixo \xE9 preto no modelo e fica.
{\xA7\xA7} Os documentos exigidos para habilita\xE7\xE3o que n\xE3o estejam contemplados no Sicaf ser\xE3o enviados por meio eletr\xF4nico (e-mail, protocolo eletr\xF4nico, portal do \xF3rg\xE3o, entre outros) at\xE9 a conclus\xE3o da fase de habilita\xE7\xE3o.

%% AGU: a dilig\xEAncia para juntar documento ausente que comprove condi\xE7\xE3o preexistente s\xF3 cabe se prevista no edital, com prazo (no m\xEDnimo duas horas) e hip\xF3teses definidos (Parecer 2/2025/CNLCA/DECOR/CGU/AGU; Ac\xF3rd\xE3o TCU 1414/2023-Plen\xE1rio).
{\xA7} Encerrado o prazo para envio da documenta\xE7\xE3o, poder\xE1 ser admitida, mediante decis\xE3o fundamentada da comiss\xE3o de contrata\xE7\xE3o, a apresenta\xE7\xE3o de novos documentos de habilita\xE7\xE3o ou a complementa\xE7\xE3o de informa\xE7\xF5es acerca dos documentos j\xE1 apresentados pelos interessados, em at\xE9 {habilitacao.prazo_complementacao} horas, para:

{\xA7\xA7} a aferi\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o do interessado, desde que decorrentes de fatos existentes \xE0 \xE9poca da abertura do certame;

{\xA7\xA7} atualiza\xE7\xE3o de documentos cuja validade tenha expirado ap\xF3s a data de recebimento das propostas;

{\xA7\xA7} suprimento da aus\xEAncia de documento de cunho declarat\xF3rio emitido unilateralmente pelo interessado;

{\xA7\xA7} suprimento da aus\xEAncia de certid\xE3o e/ou documento de cunho declarat\xF3rio expedido por \xF3rg\xE3o ou entidade cujos atos gozem de presun\xE7\xE3o de veracidade e f\xE9 p\xFAblica.

{\xA7} Findo o prazo assinalado sem o envio da nova documenta\xE7\xE3o, restar\xE1 preclusa essa oportunidade conferida ao interessado, implicando sua inabilita\xE7\xE3o.

{\xA7} Na an\xE1lise dos documentos de habilita\xE7\xE3o, a comiss\xE3o de contrata\xE7\xE3o poder\xE1 sanar erros ou falhas que n\xE3o alterarem sua subst\xE2ncia ou validade jur\xEDdica.

{\xA7} A comprova\xE7\xE3o de regularidade fiscal e trabalhista das microempresas e das empresas de pequeno porte somente ser\xE1 exigida para efeito de contrata\xE7\xE3o, e n\xE3o como condi\xE7\xE3o para participa\xE7\xE3o no credenciamento.

## {\xA7sec}. DOS RECURSOS

{\xA7} A interposi\xE7\xE3o de recurso referente \xE0 habilita\xE7\xE3o ou inabilita\xE7\xE3o de interessados, \xE0 anula\xE7\xE3o ou revoga\xE7\xE3o do credenciamento, observar\xE1 o disposto no art. 17 do Decreto n\xBA 11.878, de 2024.

{\xA7} O prazo recursal \xE9 de 3 (tr\xEAs) dias \xFAteis, contados da data de publica\xE7\xE3o da decis\xE3o.

{\xA7} Quando o recurso apresentado impugnar o ato de habilita\xE7\xE3o ou inabilita\xE7\xE3o do interessado:

%% AGU: o edital define o prazo da inten\xE7\xE3o de recorrer (art. 17 do Decreto 11.878/2024), que n\xE3o pode passar de 3 (tr\xEAs) dias \xFAteis.
{\xA7\xA7} a inten\xE7\xE3o de recorrer dever\xE1 ser manifestada em {recurso.prazo_intencao} dias \xFAteis, sob pena de preclus\xE3o;

{\xA7\xA7} o prazo para apresenta\xE7\xE3o das raz\xF5es recursais ser\xE1 iniciado na data de publica\xE7\xE3o da decis\xE3o.

{\xA7} Os recursos dever\xE3o ser encaminhados por meio eletr\xF4nico (e-mail, protocolo eletr\xF4nico, portal do \xF3rg\xE3o, entre outros).

{\xA7} O recurso ser\xE1 dirigido \xE0 comiss\xE3o de contrata\xE7\xE3o, a qual poder\xE1 reconsiderar sua decis\xE3o no prazo de 3 (tr\xEAs) dias \xFAteis, ou, nesse mesmo prazo, encaminhar recurso para a autoridade superior, a qual dever\xE1 proferir sua decis\xE3o no prazo de 10 (dez) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Os recursos interpostos fora do prazo n\xE3o ser\xE3o conhecidos.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o n\xE3o ter\xE3o efeito suspensivo.

{\xA7} O acolhimento do recurso invalida t\xE3o somente os atos insuscet\xEDveis de aproveitamento.

{\xA7} Os autos do processo permanecer\xE3o com vista franqueada aos interessados no s\xEDtio eletr\xF4nico {vista_autos.sitio}.

## {\xA7sec}. DAS INFRA\xC7\xD5ES ADMINISTRATIVAS E SAN\xC7\xD5ES

%% AGU: as infra\xE7\xF5es e san\xE7\xF5es desta se\xE7\xE3o tratam do procedimento de credenciamento; as da execu\xE7\xE3o ficam no contrato.
{\xA7} Comete infra\xE7\xE3o administrativa, nos termos da lei, o interessado que, com dolo ou culpa:

{\xA7\xA7@inf_documentacao} deixar de entregar a documenta\xE7\xE3o exigida para o certame ou n\xE3o entregar qualquer documento que tenha sido solicitado pela comiss\xE3o de contrata\xE7\xE3o;

{\xA7\xA7@inf_amostra} salvo em decorr\xEAncia de fato superveniente devidamente justificado, deixar de apresentar amostra ou apresent\xE1-la em desacordo com as especifica\xE7\xF5es do edital;

{\xA7\xA7@inf_nao_celebrar} n\xE3o celebrar o contrato ou n\xE3o entregar a documenta\xE7\xE3o exigida para a contrata\xE7\xE3o, quando convocado dentro do prazo de validade do credenciamento;

{\xA7\xA7@inf_recusa} recusar-se, sem justificativa, a assinar o contrato, ou a aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o;

{\xA7\xA7@inf_declaracao_falsa} apresentar declara\xE7\xE3o ou documenta\xE7\xE3o falsa exigida para o certame ou prestar declara\xE7\xE3o falsa durante o credenciamento;

{\xA7\xA7@inf_fraudar} fraudar o credenciamento;

{\xA7\xA7@inf_inidoneo} comportar-se de modo inid\xF4neo ou cometer fraude de qualquer natureza, em especial quando:

{\xA7\xA7\xA7} agir em conluio ou em desconformidade com a lei;

{\xA7\xA7\xA7} induzir deliberadamente a erro no julgamento;

{\xA7\xA7\xA7} apresentar amostra falsificada ou deteriorada;

{\xA7\xA7@inf_atos_ilicitos} praticar atos il\xEDcitos com vistas a frustrar os objetivos do credenciamento;

{\xA7\xA7@inf_ato_lesivo} praticar ato lesivo previsto no art. 5\xBA da Lei n.\xBA 12.846, de 2013.

{\xA7} Com fulcro na Lei n\xBA 14.133, de 2021, a Administra\xE7\xE3o poder\xE1, ap\xF3s regular processo administrativo, garantida a pr\xE9via defesa, aplicar aos credenciados as seguintes san\xE7\xF5es, sem preju\xEDzo das responsabilidades civil e criminal:

{\xA7\xA7} advert\xEAncia;

{\xA7\xA7} multa;

{\xA7\xA7} impedimento de licitar e contratar; e

{\xA7\xA7} declara\xE7\xE3o de inidoneidade para licitar ou contratar, enquanto perdurarem os motivos determinantes da puni\xE7\xE3o ou at\xE9 que seja promovida sua reabilita\xE7\xE3o perante a pr\xF3pria autoridade que aplicou a penalidade.

{\xA7} Na aplica\xE7\xE3o das san\xE7\xF5es ser\xE3o considerados:

{\xA7\xA7} a natureza e a gravidade da infra\xE7\xE3o cometida;

{\xA7\xA7} as peculiaridades do caso concreto;

{\xA7\xA7} as circunst\xE2ncias agravantes ou atenuantes;

{\xA7\xA7} os danos que dela provierem para a Administra\xE7\xE3o P\xFAblica; e

{\xA7\xA7} a implanta\xE7\xE3o ou o aperfei\xE7oamento de programa de integridade, conforme normas e orienta\xE7\xF5es dos \xF3rg\xE3os de controle.

%% AGU: multa entre 0,5% e 30% do valor do contrato (art. 156, \xA7 3\xBA), proporcional \xE0 gravidade; os percentuais do modelo s\xE3o indicativos e a grada\xE7\xE3o \xE9 discricion\xE1ria.
{\xA7} A multa ser\xE1 recolhida no prazo m\xE1ximo de {multa.prazo_recolhimento} dias \xFAteis, a contar da comunica\xE7\xE3o oficia.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_amostra}, {\xA7ref@inf_nao_celebrar} e {\xA7ref@inf_recusa}, a multa ser\xE1 de {multa.faixa1_min} a {multa.faixa1_max} do valor do contrato.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf_declaracao_falsa}, {\xA7ref@inf_fraudar}, {\xA7ref@inf_inidoneo}, {\xA7ref@inf_atos_ilicitos} e {\xA7ref@inf_ato_lesivo}, a multa ser\xE1 de {multa.faixa2_min} a {multa.faixa2_max} do valor do contrato.

{\xA7} As san\xE7\xF5es de advert\xEAncia, impedimento de licitar e contratar e declara\xE7\xE3o de inidoneidade para licitar ou contratar poder\xE3o ser aplicadas, cumulativamente ou n\xE3o, \xE0 penalidade de multa.

{\xA7} Na aplica\xE7\xE3o da san\xE7\xE3o de multa ser\xE1 facultada a defesa do interessado no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o.

%% AGU: indicar o ente federativo a que pertence o \xF3rg\xE3o sancionador (art. 156, \xA7 4\xBA). O texto \xE9 preto no modelo e fica.
{\xA7} A san\xE7\xE3o de impedimento de licitar e contratar ser\xE1 aplicada ao respons\xE1vel em decorr\xEAncia das infra\xE7\xF5es administrativas relacionadas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_amostra}, {\xA7ref@inf_nao_celebrar} e {\xA7ref@inf_recusa}, quando n\xE3o se justificar a imposi\xE7\xE3o de penalidade mais grave, e impedir\xE1 o respons\xE1vel de licitar e contratar no \xE2mbito da Administra\xE7\xE3o P\xFAblica direta e indireta do ente federativo a qual pertencer o \xF3rg\xE3o ou entidade, pelo prazo m\xE1ximo de 3 (tr\xEAs) anos.

{\xA7} Poder\xE1 ser aplicada ao respons\xE1vel a san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar, em decorr\xEAncia da pr\xE1tica das infra\xE7\xF5es dispostas nos itens {\xA7ref@inf_declaracao_falsa}, {\xA7ref@inf_fraudar}, {\xA7ref@inf_inidoneo}, {\xA7ref@inf_atos_ilicitos} e {\xA7ref@inf_ato_lesivo}, bem como pelas infra\xE7\xF5es administrativas previstas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_amostra}, {\xA7ref@inf_nao_celebrar} e {\xA7ref@inf_recusa} que justifiquem a imposi\xE7\xE3o de penalidade mais grave que a san\xE7\xE3o de impedimento de licitar e contratar, cuja dura\xE7\xE3o observar\xE1 o prazo previsto no art. 156, \xA75\xBA, da Lei n.\xBA 14.133, de 2021.

{\xA7} A recusa injustificada do credenciado em assinar o contrato, ou em aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o, descrita nos itens {\xA7ref@inf_nao_celebrar} e {\xA7ref@inf_recusa}, caracterizar\xE1 o descumprimento total da obriga\xE7\xE3o assumida e o sujeitar\xE1 \xE0s penalidades e \xE0 imediata perda da garantia em favor do \xF3rg\xE3o ou entidade credenciante, nos termos do art. 45, \xA74\xBA, da IN SEGES/ME n.\xBA 73, de 30 de setembro de 2022.

%% AGU: sem servidores estatut\xE1rios, a comiss\xE3o \xE9 composta por 2 (dois) ou mais empregados p\xFAblicos dos quadros permanentes, de prefer\xEAncia com 3 (tr\xEAs) anos de servi\xE7o no \xF3rg\xE3o (art. 158, \xA7 1\xBA). O texto \xE9 preto no modelo e fica.
{\xA7} A apura\xE7\xE3o de responsabilidade relacionadas \xE0s san\xE7\xF5es de impedimento de licitar e contratar e de declara\xE7\xE3o de inidoneidade para licitar ou contratar demandar\xE1 a instaura\xE7\xE3o de processo de responsabiliza\xE7\xE3o a ser conduzido por comiss\xE3o composta por 2 (dois) ou mais servidores est\xE1veis, que avaliar\xE1 fatos e circunst\xE2ncias conhecidos e intimar\xE1 o interessado para, no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o, apresentar defesa escrita e especificar as provas que pretenda produzir.

{\xA7} Caber\xE1 recurso no prazo de 15 (quinze) dias \xFAteis da aplica\xE7\xE3o das san\xE7\xF5es de advert\xEAncia, multa e impedimento de licitar e contratar, contado da data da intima\xE7\xE3o, o qual ser\xE1 dirigido \xE0 autoridade que tiver proferido a decis\xE3o recorrida, que, se n\xE3o a reconsiderar no prazo de 5 (cinco) dias \xFAteis, encaminhar\xE1 o recurso com sua motiva\xE7\xE3o \xE0 autoridade superior, que dever\xE1 proferir sua decis\xE3o no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Caber\xE1 a apresenta\xE7\xE3o de pedido de reconsidera\xE7\xE3o da aplica\xE7\xE3o da san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar no prazo de 15 (quinze) dias \xFAteis, contado da data da intima\xE7\xE3o, e decidido no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do seu recebimento.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o ter\xE3o efeito suspensivo do ato ou da decis\xE3o recorrida at\xE9 que sobrevenha decis\xE3o final da autoridade competente.

%% AGU: indicar o ente federativo a que pertence o \xF3rg\xE3o sancionador (art. 156, \xA7 9\xBA). O texto \xE9 preto no modelo e fica.
{\xA7} A aplica\xE7\xE3o das san\xE7\xF5es previstas neste edital n\xE3o exclui, em hip\xF3tese alguma, a obriga\xE7\xE3o de repara\xE7\xE3o integral dos danos causados.

## {\xA7sec}. DA IMPUGNA\xC7\xC3O AO EDITAL E DO PEDIDO DE ESCLARECIMENTO

{\xA7} Qualquer pessoa \xE9 parte leg\xEDtima para impugnar este Edital por irregularidade ou para solicitar esclarecimento sobre os seus termos enquanto este permanecer em vigor.

%% AGU: indicar os meios de recep\xE7\xE3o das impugna\xE7\xF5es e dos pedidos de esclarecimento.
{\xA7} A impugna\xE7\xE3o e o pedido de esclarecimento poder\xE3o ser realizados por forma eletr\xF4nica, pelos seguintes meios: {impugnacao.meios}.

{\xA7} A resposta \xE0 impugna\xE7\xE3o ou ao pedido de esclarecimento ser\xE1 divulgado por meio eletr\xF4nico no prazo de at\xE9 3 (tr\xEAs) dias \xFAteis, contado da data de recebimento do pedido.

{\xA7} As impugna\xE7\xF5es e pedidos de esclarecimentos n\xE3o suspendem os prazos previstos no certame.

{\xA7} Acolhida a impugna\xE7\xE3o, o edital retificado ser\xE1 publicado no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas - PNCP.

## {\xA7sec}. DA DIVULGA\xC7\xC3O DA LISTA DE CREDENCIADOS

{\xA7} O resultado, com a lista de credenciados relacionados de acordo com o crit\xE9rio estabelecido no edital, ser\xE1 publicado e estar\xE1 permanentemente dispon\xEDvel e atualizado no PNCP.

## {\xA7sec}. DA CONTRATA\xC7\xC3O

{\xA7} Ap\xF3s divulga\xE7\xE3o da lista de credenciados, o \xF3rg\xE3o ou a entidade poder\xE1 convocar o credenciado para assinatura do instrumento contratual, emiss\xE3o de nota de empenho de despesa, autoriza\xE7\xE3o de compra ou outro instrumento h\xE1bil, conforme disposto no art. 95 da Lei n\xBA 14.133, de 2021.

{\xA7} A Administra\xE7\xE3o poder\xE1 convocar o credenciado durante todo o prazo de validade do credenciamento para assinar o contrato ou outro instrumento equivalente, sob pena de decair o direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021, e no edital de credenciamento.

{\xA7@prazo_assinatura} O prazo para assinatura do instrumento contratual pelo credenciado, ap\xF3s convoca\xE7\xE3o pela Administra\xE7\xE3o, ser\xE1 de {contratacao.prazo_assinatura} dias.

{\xA7} O prazo de que trata o item {\xA7ref@prazo_assinatura} poder\xE1 ser prorrogado uma vez, por igual per\xEDodo, mediante solicita\xE7\xE3o, devidamente justificada, do credenciado durante o seu transcurso, desde que o motivo apresentado seja aceito pela Administra\xE7\xE3o.

{\xA7} Previamente \xE0 emiss\xE3o de nota de empenho e \xE0 contrata\xE7\xE3o, a Administra\xE7\xE3o dever\xE1 realizar consulta ao Sicaf para identificar poss\xEDvel impedimento de licitar e contratar.

{\xA7} O prazo de vig\xEAncia dos contratos decorrentes do presente credenciamento ser\xE1 de {vigencia.prazo}, com in\xEDcio na data de {vigencia.inicio} e encerramento em {vigencia.fim}.

{\xA7} Os contratos decorrentes de credenciamento poder\xE3o ser alterados, observado o disposto no art. 124 da Lei n\xBA 14.133, de 2021.

{\xA7} \xC9 vedado o cometimento a terceiros do objeto contratado sem autoriza\xE7\xE3o expressa da Administra\xE7\xE3o.

%% AGU: nas contrata\xE7\xF5es paralelas e n\xE3o excludentes (art. 79, I), o edital deve prever crit\xE9rios claros de distribui\xE7\xE3o da demanda (art. 9\xBA do Decreto 11.878/2024); pontua\xE7\xE3o t\xE9cnica objetiva \xE9 admitida (Ac\xF3rd\xE3o TCU 533/2022-Plen\xE1rio). Sem essa hip\xF3tese, a se\xE7\xE3o inteira sai.
{#contratacoes_paralelas}
## {\xA7sec}. CRIT\xC9RIOS PARA DEFINI\xC7\xC3O DA ORDEM DE CONTRATA\xC7\xC3O DOS CREDENCIADOS.

{\xA7} Na hip\xF3tese de contrata\xE7\xF5es paralelas e n\xE3o excludentes, a convoca\xE7\xE3o dos credenciados para contrata\xE7\xE3o garantir\xE1 a igualdade de oportunidade entre os interessados, a partir da observ\xE2ncia dos seguintes crit\xE9rios de distribui\xE7\xE3o da demanda:

{*contratacoes_paralelas.criterios}{\xA7\xA7} {.texto}

{/contratacoes_paralelas.criterios}
{/contratacoes_paralelas}

## {\xA7sec}. DA ANULA\xC7\xC3O, DA REVOGA\xC7\xC3O E DO DESCREDENCIAMENTO

{\xA7} O edital de credenciamento poder\xE1 ser anulado, a qualquer tempo, em caso de v\xEDcio de legalidade, ou revogado, por motivos de conveni\xEAncia e de oportunidade da administra\xE7\xE3o.

{\xA7} Na hip\xF3tese de anula\xE7\xE3o do edital de credenciamento, os instrumentos que dele resultaram ficar\xE3o sujeitos ao disposto nos art. 147 ao art. 150 da Lei n\xBA 14.133, de 2021.

{\xA7} A revoga\xE7\xE3o do edital de credenciamento n\xE3o repercutir\xE1 nos instrumentos j\xE1 celebrados que dele resultaram.

{\xA7} Ser\xE1 realizado o descredenciamento quando houver:

%% AGU: o TCU admite a den\xFAncia do ajuste pelo credenciado a qualquer tempo, com a anteced\xEAncia fixada no termo (TC 016.522/95-8).
{\xA7\xA7@desc_pedido} pedido formalizado pelo credenciado, no prazo de {descredenciamento.prazo_pedido} dias;

{\xA7\xA7@desc_habilitacao} perda das condi\xE7\xF5es de habilita\xE7\xE3o do credenciado;

{\xA7\xA7@desc_descumprimento} descumprimento injustificado do contrato pelo contratado; e

{\xA7\xA7} san\xE7\xE3o de impedimento de licitar e contratar ou de declara\xE7\xE3o de inidoneidade superveniente ao credenciamento.

{\xA7} O pedido de descredenciamento de que trata o item {\xA7ref@desc_pedido} n\xE3o desincumbir\xE1 o credenciado do cumprimento de eventuais contratos assumidos e das responsabilidades deles recorrentes.

{\xA7} Nas hip\xF3teses previstas nos subitens {\xA7ref@desc_habilitacao} e {\xA7ref@desc_descumprimento} al\xE9m do descredenciamento, dever\xE1 ser aberto processo administrativo, assegurados o contradit\xF3rio e a ampla defesa, para poss\xEDvel aplica\xE7\xE3o de penalidade, na forma estabelecida na legisla\xE7\xE3o.

{\xA7} Se houver a efetiva presta\xE7\xE3o de servi\xE7os ou o fornecimento dos bens, os pagamentos ser\xE3o realizados normalmente, at\xE9 decis\xE3o no sentido de rescis\xE3o contratual, caso o fornecedor n\xE3o regularize a sua situa\xE7\xE3o.

{\xA7} Somente por motivo de economicidade, seguran\xE7a nacional ou no interesse da Administra\xE7\xE3o, devidamente justificado, em qualquer caso, pela autoridade m\xE1xima do \xF3rg\xE3o ou da entidade contratante, n\xE3o ser\xE1 rescindido o contrato em execu\xE7\xE3o com empresa ou profissional que estiver irregular.

## {\xA7sec}. DO PRAZO DE VIG\xCANCIA DO EDITAL

%% AGU: durante a vig\xEAncia do edital o credenciamento fica permanentemente aberto a novos interessados (art. 79, par\xE1grafo \xFAnico, I, da Lei 14.133/2021 c/c art. 5\xBA do Decreto 11.878/2024).
{\xA7} O presente edital ter\xE1 prazo de vig\xEAncia de {edital.vigencia}, a contar de {edital.vigencia_inicio}.

## {\xA7sec}. DISPOSI\xC7\xD5ES GERAIS

{\xA7} Na contagem dos prazos estabelecidos neste Edital e seus Anexos, excluir-se-\xE1 o dia do in\xEDcio e incluir-se-\xE1 o do vencimento. S\xF3 se iniciam e vencem os prazos em dias de expediente na Administra\xE7\xE3o.

{\xA7} O desatendimento de exig\xEAncias formais n\xE3o essenciais n\xE3o importar\xE1 o afastamento do interessado, desde que seja poss\xEDvel o aproveitamento do ato, observados os princ\xEDpios da isonomia e do interesse p\xFAblico.

{\xA7} Em caso de diverg\xEAncia entre disposi\xE7\xF5es deste Edital e de seus anexos ou demais pe\xE7as que comp\xF5em o processo, prevalecer\xE1 as deste Edital.

{\xA7} O Edital e seus anexos est\xE3o dispon\xEDveis, na \xEDntegra, no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP) e endere\xE7o eletr\xF4nico {edital.sitio_eletronico}.

{\xA7} Integram este Edital, para todos os fins e efeitos, os seguintes anexos:

{\xA7\xA7} ANEXO I - Termo de Refer\xEAncia

{\xA7\xA7\xA7} Ap\xEAndice do Anexo I \u2013 Estudo T\xE9cnico Preliminar

{\xA7\xA7} ANEXO II \u2013 Minuta de Termo de Contrato

{local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
`,"agu-edital-pregao":`@requer regime=14133
@fonte agu-edital-pregao
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
@cabecalho

%% Capa do modelo (quadro-resumo). O prazo m\xEDnimo entre a divulga\xE7\xE3o no PNCP e a sess\xE3o \xE9 o do art. 55 da Lei 14.133 (em regra 8 dias \xFAteis para bens e 10 dias \xFAteis para servi\xE7os comuns).
> {licitacao.modalidade|maiusculas}
> {licitacao.numero}/{licitacao.ano}
> CONTRATANTE/GERENCIADOR (UASG)
> ({cfc.uasg})
> OBJETO
> {#registro_precos}REGISTRO DE PRE\xC7OS PARA {/registro_precos}{objeto_curto|maiusculas}
> VALOR TOTAL DA CONTRATA\xC7\xC3O
> R$ {^orcamento_sigiloso}{valor_global}{/orcamento_sigiloso}{#orcamento_sigiloso}sigiloso{/orcamento_sigiloso}
> DATA DA SESS\xC3O P\xDABLICA
> Dia {sessao.data} \xE0s {sessao.hora}h (hor\xE1rio de Bras\xEDlia)
> Crit\xE9rio de Julgamento:
> {#maior_desconto}maior desconto{/maior_desconto}{^maior_desconto}menor pre\xE7o{/maior_desconto} {julgamento.forma}
> Modo de disputa:
> {disputa.modo}
> TRATAMENTO FAVORECIDO ME/EPP/EQUIPARADAS
> {#preferencia_me_epp}SIM{/preferencia_me_epp}{^preferencia_me_epp}N\xC3O{/preferencia_me_epp}
> MARGEM DE PREFER\xCANCIA PARA ALGUM ITEM
> {#margem_preferencia}SIM{/margem_preferencia}{^margem_preferencia}N\xC3O{/margem_preferencia}

# {licitacao.modalidade|maiusculas} N\xBA {licitacao.numero}/{licitacao.ano}

> (Processo Administrativo n\xB0 {processo})

Torna-se p\xFAblico que o(a) {cfc.nome}, por meio do(a) {cfc.setor_licitacoes}, sediado(a) {cfc.sede}, realizar\xE1 licita\xE7\xE3o, {#registro_precos}para registro de pre\xE7os, {/registro_precos}na modalidade {licitacao.modalidade|maiusculas}, na forma ELETR\xD4NICA, nos termos da Lei n\xBA 14.133, de 1\xBA de abril de 2021, {#registro_precos}do Decreto n\xBA 11.462, de 31 de mar\xE7o de 2023, {/registro_precos}e demais legisla\xE7\xE3o aplic\xE1vel e, ainda, de acordo com as condi\xE7\xF5es estabelecidas neste Edital.

## {\xA7sec}. DO OBJETO

{\xA7} O objeto da presente licita\xE7\xE3o \xE9 {licitacao.objeto}, conforme condi\xE7\xF5es, quantidades e exig\xEAncias estabelecidas neste Edital e seus anexos.

%% Nota AGU: indicar como a licita\xE7\xE3o se divide (marcar s\xF3 uma forma); em grupo \xFAnico para registro de pre\xE7os, fixar crit\xE9rio de aceitabilidade de pre\xE7os unit\xE1rios m\xE1ximos (art. 13, I, Decreto 11.462/2023).
{#divisao.itens}{\xA7} A licita\xE7\xE3o ser\xE1 dividida em itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico, facultando-se ao licitante a participa\xE7\xE3o em quantos itens forem de seu interesse.{/divisao.itens}

{#divisao.item_unico}{\xA7} A licita\xE7\xE3o ser\xE1 realizada em \xFAnico item.{/divisao.item_unico}

{#divisao.grupos}{\xA7} A licita\xE7\xE3o ser\xE1 dividida em grupos, formados por um ou mais itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico, facultando-se ao licitante a participa\xE7\xE3o em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os comp\xF5em.{/divisao.grupos}

{#divisao.grupo_unico}{\xA7} A licita\xE7\xE3o ser\xE1 realizada em grupo \xFAnico, formado por {divisao.grupo_unico.qtd_itens} itens, conforme tabela constante no Termo de Refer\xEAncia/Projeto B\xE1sico, devendo o licitante oferecer proposta para todos os itens que o comp\xF5em.{/divisao.grupo_unico}

{#divisao.itens_e_grupos}
{\xA7} A licita\xE7\xE3o ser\xE1 dividida em item(s) e grupo(s), sendo este(s) \xFAltimo(s) formado(s) por dois ou mais itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico.

{\xA7\xA7} relativamente ao(s) item(s) isolado(s), faculta-se ao licitante a participa\xE7\xE3o em quantos itens forem de seu interesse;

{\xA7\xA7} relativamente ao(s) grupo(s), faculta-se ao licitante a participa\xE7\xE3o em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os comp\xF5em.
{/divisao.itens_e_grupos}

%% Nota AGU: adotar esta se\xE7\xE3o somente se a licita\xE7\xE3o for para registro de pre\xE7os.
{#registro_precos}
## {\xA7sec}. DO REGISTRO DE PRE\xC7OS

{\xA7} As regras referentes aos \xF3rg\xE3os gerenciador e participantes, bem como a eventuais ades\xF5es s\xE3o as que constam da minuta de Ata de Registro de Pre\xE7os.
{/registro_precos}

## {\xA7sec}. DA PARTICIPA\xC7\xC3O NA LICITA\xC7\xC3O

{\xA7} Poder\xE3o participar deste certame os interessados previamente credenciados no Sistema de Cadastramento Unificado de Fornecedores - SICAF e no Sistema de Compras do Governo Federal (www.gov.br/compras).

{\xA7} Os interessados dever\xE3o atender \xE0s condi\xE7\xF5es exigidas no cadastramento no Sicaf at\xE9 o terceiro dia \xFAtil anterior \xE0 data prevista para recebimento das propostas.

{\xA7} O licitante responsabiliza-se exclusiva e formalmente pelas transa\xE7\xF5es efetuadas em seu nome, assume como firmes e verdadeiras suas propostas e seus lances, inclusive os atos praticados diretamente ou por seu representante, exclu\xEDda a responsabilidade do provedor do sistema ou do \xF3rg\xE3o ou entidade promotora da licita\xE7\xE3o por eventuais danos decorrentes de uso indevido das credenciais de acesso, ainda que por terceiros.

{\xA7} \xC9 de responsabilidade do cadastrado conferir a exatid\xE3o dos seus dados cadastrais nos Sistemas relacionados no item anterior e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

%% Nota AGU: s\xF3 se houver itens exclusivos de ME/EPP em raz\xE3o do valor (art. 48 da LC 123/2006), observados os limites do art. 4\xBA, \xA7 1\xBA, da Lei 14.133 (valor anual se a vig\xEAncia passar de 1 ano).
{#exclusiva_me_epp}
{\xA7} Para os itens {exclusiva_me_epp.itens}, a participa\xE7\xE3o \xE9 exclusiva a microempresas e empresas de pequeno porte, nos termos do art. 48 da Lei Complementar n\xBA 123, de 14 de dezembro de 2006.

{\xA7} A obten\xE7\xE3o do benef\xEDcio a que se refere o item anterior fica limitada \xE0s microempresas e \xE0s empresas de pequeno porte que, no ano-calend\xE1rio de realiza\xE7\xE3o da licita\xE7\xE3o, ainda n\xE3o tenham celebrado contratos com a Administra\xE7\xE3o P\xFAblica cujos valores somados extrapolem a receita bruta m\xE1xima admitida para fins de enquadramento como empresa de pequeno porte.
{/exclusiva_me_epp}

%% Nota AGU: ajustar conforme cada item ou lote se enquadre ou n\xE3o no limite do art. 4\xBA, \xA7 1\xBA, da Lei 14.133 para os benef\xEDcios de ME/EPP e equiparadas.
{#preferencia_me_epp}{\xA7} Ser\xE1 concedido tratamento favorecido para as microempresas e empresas de pequeno porte, para as sociedades cooperativas mencionadas no artigo 16 da Lei n\xBA 14.133, de 2021, para o agricultor familiar, o produtor rural pessoa f\xEDsica e para o microempreendedor individual - MEI, nos limites previstos da Lei Complementar n\xBA 123, de 2006 e do Decreto n\xBA 8.538, de 2015.{/preferencia_me_epp}

{#me_epp.itens_sem_tratamento}{\xA7} Nos itens {me_epp.itens_sem_tratamento} n\xE3o ser\xE1 concedido nesta Licita\xE7\xE3o tratamento favorecido para microempresas, empresas de pequeno porte e figuras equiparadas, nos termos da Lei Complementar n\xBA 123, de 2006, em raz\xE3o da incid\xEAncia, no caso, do art. 4\xBA, \xA7 1\xBA da Lei n\xBA 14.133, de 2021.{/me_epp.itens_sem_tratamento}

{\xA7@nao_disputar} N\xE3o poder\xE3o disputar esta licita\xE7\xE3o:

{\xA7\xA7} aquele que n\xE3o atenda \xE0s condi\xE7\xF5es deste Edital e seu(s) anexo(s);

{\xA7\xA7} sociedade que desempenhe atividade incompat\xEDvel com o objeto da licita\xE7\xE3o;

{\xA7\xA7} empresas estrangeiras que n\xE3o tenham representa\xE7\xE3o legal no Brasil com poderes expressos para receber cita\xE7\xE3o e responder administrativa ou judicialmente;

{\xA7\xA7@autor_projeto} autor do anteprojeto, do projeto b\xE1sico ou do projeto executivo, pessoa f\xEDsica ou jur\xEDdica, quando a licita\xE7\xE3o versar sobre servi\xE7os ou fornecimento de bens a ele relacionados;

{\xA7\xA7@empresa_projeto} empresa, isoladamente ou em cons\xF3rcio, respons\xE1vel pela elabora\xE7\xE3o do projeto b\xE1sico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, respons\xE1vel t\xE9cnico ou subcontratado, quando a licita\xE7\xE3o versar sobre servi\xE7os ou fornecimento de bens a ela necess\xE1rios;

{\xA7\xA7@sancao} pessoa f\xEDsica ou jur\xEDdica que se encontre, ao tempo da licita\xE7\xE3o, impossibilitada de participar da licita\xE7\xE3o em decorr\xEAncia de san\xE7\xE3o que lhe foi imposta;

{\xA7\xA7} aquele que mantenha v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que desempenhe fun\xE7\xE3o na licita\xE7\xE3o ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau;

{\xA7\xA7} empresas controladoras, controladas ou coligadas, nos termos da Lei n\xBA 6.404, de 15 de dezembro de 1976, concorrendo entre si;

{\xA7\xA7} pessoa f\xEDsica ou jur\xEDdica que, nos 5 (cinco) anos anteriores \xE0 divulga\xE7\xE3o do edital, tenha sido condenada judicialmente, com tr\xE2nsito em julgado, por explora\xE7\xE3o de trabalho infantil, por submiss\xE3o de trabalhadores a condi\xE7\xF5es an\xE1logas \xE0s de escravo ou por contrata\xE7\xE3o de adolescentes nos casos vedados pela legisla\xE7\xE3o trabalhista;

{\xA7\xA7} Organiza\xE7\xF5es da Sociedade Civil de Interesse P\xFAblico - OSCIP, atuando nessa condi\xE7\xE3o;

%% Nota AGU: vedar cooperativas s\xF3 em servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra fora das hip\xF3teses do art. 10 da IN SEGES 5/2017.
{#vedadas_cooperativas}{\xA7\xA7} sociedades cooperativas;{/vedadas_cooperativas}

%% Nota AGU: vedar cons\xF3rcio \xE9 exce\xE7\xE3o e deve ser justificado (art. 15, caput, da Lei 14.133).
{#vedado_consorcio}{\xA7\xA7} pessoas jur\xEDdicas reunidas em cons\xF3rcio;{/vedado_consorcio}

%% Nota AGU: ressalvar pessoas f\xEDsicas s\xF3 quando o ETP demonstrar capital, estrutura ou equipe incompat\xEDveis com a pessoa f\xEDsica (art. 4\xBA, par\xE1grafo \xFAnico, IN SEGES/ME 116/2021).
{#vedadas_pessoas_fisicas}{\xA7\xA7} pessoas f\xEDsicas.{/vedadas_pessoas_fisicas}

{\xA7@agente_publico} N\xE3o poder\xE1 participar, direta ou indiretamente, da licita\xE7\xE3o ou da execu\xE7\xE3o do contrato agente p\xFAblico do \xF3rg\xE3o ou entidade contratante, devendo ser observadas as situa\xE7\xF5es que possam configurar conflito de interesses no exerc\xEDcio ou ap\xF3s o exerc\xEDcio do cargo ou emprego, nos termos da legisla\xE7\xE3o que disciplina a mat\xE9ria, conforme \xA7 1\xBA do art. 9\xBA da Lei n\xBA 14.133, de 2021.

{\xA7} O impedimento de que trata o item {\xA7ref@sancao} ser\xE1 tamb\xE9m aplicado ao licitante que atue em substitui\xE7\xE3o a outra pessoa, f\xEDsica ou jur\xEDdica, com o intuito de burlar a efetividade da san\xE7\xE3o a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o il\xEDcito ou a utiliza\xE7\xE3o fraudulenta da personalidade jur\xEDdica do licitante.

{\xA7} A crit\xE9rio da Administra\xE7\xE3o e exclusivamente a seu servi\xE7o, o autor dos projetos e a empresa a que se referem os itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} poder\xE3o participar no apoio das atividades de planejamento da contrata\xE7\xE3o, de execu\xE7\xE3o da licita\xE7\xE3o ou de gest\xE3o do contrato, desde que sob supervis\xE3o exclusiva de agentes p\xFAblicos do \xF3rg\xE3o ou entidade.

{\xA7} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econ\xF4mico.

{\xA7} O disposto nos itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} n\xE3o impede a licita\xE7\xE3o ou a contrata\xE7\xE3o de servi\xE7o que inclua como encargo do contratado a elabora\xE7\xE3o do projeto b\xE1sico e do projeto executivo, nas contrata\xE7\xF5es integradas, e do projeto executivo, nos demais regimes de execu\xE7\xE3o.

{\xA7} Em licita\xE7\xF5es e contrata\xE7\xF5es realizadas no \xE2mbito de projetos e programas parcialmente financiados por ag\xEAncia oficial de coopera\xE7\xE3o estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, n\xE3o poder\xE1 participar pessoa f\xEDsica ou jur\xEDdica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inid\xF4nea nos termos da Lei n\xBA 14.133, de 2021.

{\xA7} A veda\xE7\xE3o de que trata o item {\xA7ref@agente_publico} estende-se a terceiro que auxilie a condu\xE7\xE3o da contrata\xE7\xE3o na qualidade de integrante de equipe de apoio, profissional especializado ou funcion\xE1rio ou representante de empresa que preste assessoria t\xE9cnica.

## {\xA7sec}. DO OR\xC7AMENTO ESTIMADO

{^orcamento_sigiloso}{\xA7} O or\xE7amento estimado da presente contrata\xE7\xE3o n\xE3o ser\xE1 de car\xE1ter sigiloso.{/orcamento_sigiloso}

{#orcamento_sigiloso}
{\xA7} O or\xE7amento estimado da presente contrata\xE7\xE3o ser\xE1 de car\xE1ter sigiloso.

{\xA7} Para fins do disposto no item anterior, o or\xE7amento estimado para a contrata\xE7\xE3o n\xE3o ser\xE1 tornado p\xFAblico antes de definido o resultado do julgamento das propostas.

{\xA7} O car\xE1ter sigiloso do or\xE7amento estimado para a contrata\xE7\xE3o n\xE3o prevalecer\xE1 para os \xF3rg\xE3os de controle interno e externo.
{/orcamento_sigiloso}

## {\xA7sec}. DA APRESENTA\xC7\xC3O DA PROPOSTA E DOS DOCUMENTOS DE HABILITA\xC7\xC3O

%% Nota AGU: a habilita\xE7\xE3o pode anteceder propostas e lances por ato motivado (art. 17, \xA7 1\xBA, da Lei 14.133), mas o sistema ainda n\xE3o oferece a funcionalidade; nesse caso a reda\xE7\xE3o passa a "anteceder\xE1 a fase de apresenta\xE7\xE3o de propostas e lances".
{\xA7} Na presente licita\xE7\xE3o, a fase de habilita\xE7\xE3o {^habilitacao.antecede}suceder\xE1 as fases de apresenta\xE7\xE3o de propostas e lances e de julgamento{/habilitacao.antecede}{#habilitacao.antecede}anteceder\xE1 a fase de apresenta\xE7\xE3o de propostas e lances{/habilitacao.antecede}.

{\xA7} Os licitantes encaminhar\xE3o, exclusivamente por meio do sistema eletr\xF4nico, a proposta com o pre\xE7o ou o percentual de desconto, conforme o crit\xE9rio de julgamento adotado neste Edital, at\xE9 a data e o hor\xE1rio estabelecidos para abertura da sess\xE3o p\xFAblica.

{\xA7} Caso a fase de habilita\xE7\xE3o anteceda as fases de apresenta\xE7\xE3o de propostas e lances, os licitantes encaminhar\xE3o, na forma e no prazo estabelecidos no item anterior, simultaneamente os documentos de habilita\xE7\xE3o e a proposta com o pre\xE7o ou o percentual de desconto, observado o disposto nos itens {\xA7ref@hab_sicaf} e {\xA7ref@hab_simultanea} deste Edital.

{\xA7@declaracoes} No cadastramento da proposta inicial, o licitante declarar\xE1, em campo pr\xF3prio do sistema, que:

{\xA7\xA7} est\xE1 ciente e concorda com as condi\xE7\xF5es contidas no edital e seus anexos, bem como de que a proposta apresentada compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de sua entrega em definitivo e que cumpre plenamente os requisitos de habilita\xE7\xE3o definidos no instrumento convocat\xF3rio;

{\xA7\xA7} n\xE3o emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e n\xE3o emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condi\xE7\xE3o de aprendiz, nos termos do artigo 7\xB0, XXXIII, da Constitui\xE7\xE3o;

{\xA7\xA7} n\xE3o possui empregados executando trabalho degradante ou for\xE7ado, observando o disposto nos incisos III e IV do art. 1\xBA e no inciso III do art. 5\xBA da Constitui\xE7\xE3o Federal;

{\xA7\xA7} cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O licitante organizado em cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 16 da Lei n\xBA 14.133, de 2021.

{\xA7} O licitante dever\xE1 declarar em campo pr\xF3prio do sistema se o produto ou servi\xE7o ofertado \xE9 manufaturado nacional beneficiado por um dos crit\xE9rios de margem de prefer\xEAncia indicados no Termo de Refer\xEAncia, quando for o caso, para usufruir do benef\xEDcio.

{\xA7} No caso das empresas que foram beneficiadas pela Lei n\xBA 12.546, de 2011, as propostas de pre\xE7os dever\xE3o ser apresentadas com as al\xEDquotas em vigor, nos termos da Lei n\xBA 14.973, de 2024, aplic\xE1veis para o ano de apresenta\xE7\xE3o da proposta.

{\xA7\xA7} A pedido da empresa contratada, o pre\xE7o do contrato poder\xE1 ser revisto, nos termos do art. 134 c/c art. 136, I, da Lei n\xBA 14.133, de 2021, ap\xF3s efetiva majora\xE7\xE3o das al\xEDquotas, conforme regime de transi\xE7\xE3o previsto no art. 9\xBAA e 9\xBA-B da Lei n\xBA 12.546, de 2011, com a reda\xE7\xE3o dada pela Lei n\xBA 14.973, de 2024.

{\xA7@declaracao_me_epp} O fornecedor enquadrado como microempresa, empresa de pequeno porte ou sociedade cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 3\xB0 da Lei Complementar n\xBA 123, de 2006, estando apto a usufruir do tratamento favorecido estabelecido em seus arts. 42 a 49, observado o disposto nos \xA7\xA7 1\xBA ao 3\xBA do art. 4\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} No item exclusivo para participa\xE7\xE3o de microempresas e empresas de pequeno porte, a assinala\xE7\xE3o do campo \u201Cn\xE3o\u201D impedir\xE1 o prosseguimento no certame, para aquele item;

{\xA7\xA7} Nos itens em que a participa\xE7\xE3o n\xE3o for exclusiva para microempresas e empresas de pequeno porte, a assinala\xE7\xE3o do campo \u201Cn\xE3o\u201D apenas produzir\xE1 o efeito de o licitante n\xE3o ter direito ao tratamento favorecido previsto na Lei Complementar n\xBA 123, de 2006, mesmo que microempresa, empresa de pequeno porte ou sociedade cooperativa.

{\xA7} N\xE3o poder\xE1 se beneficiar do tratamento jur\xEDdico diferenciado estabelecido nos arts. 42 a 49 da Lei Complementar n\xBA 123, de 2006, a pessoa jur\xEDdica:

{\xA7\xA7} de cujo capital participe outra pessoa jur\xEDdica;

{\xA7\xA7} que seja filial, sucursal, ag\xEAncia ou representa\xE7\xE3o, no Pa\xEDs, de pessoa jur\xEDdica com sede no exterior;

{\xA7\xA7} de cujo capital participe pessoa f\xEDsica que seja inscrita como empres\xE1rio ou seja s\xF3cia de outra empresa que receba tratamento jur\xEDdico diferenciado nos termos da Lei Complementar n\xBA 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} cujo titular ou s\xF3cio participe com mais de 10% (dez por cento) do capital de outra empresa n\xE3o beneficiada pela Lei Complementar n\xBA 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} cujo s\xF3cio ou titular seja administrador ou equiparado de outra pessoa jur\xEDdica com fins lucrativos, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} constitu\xEDda sob a forma de cooperativas, salvo as de consumo;

{\xA7\xA7} que participe do capital de outra pessoa jur\xEDdica;

{\xA7\xA7} que exer\xE7a atividade de banco comercial, de investimentos e de desenvolvimento, de caixa econ\xF4mica, de sociedade de cr\xE9dito, financiamento e investimento ou de cr\xE9dito imobili\xE1rio, de corretora ou de distribuidora de t\xEDtulos, valores mobili\xE1rios e c\xE2mbio, de empresa de arrendamento mercantil, de seguros privados e de capitaliza\xE7\xE3o ou de previd\xEAncia complementar;

{\xA7\xA7} resultante ou remanescente de cis\xE3o ou qualquer outra forma de desmembramento de pessoa jur\xEDdica que tenha ocorrido em um dos 5 (cinco) anos-calend\xE1rio anteriores;

{\xA7\xA7} constitu\xEDda sob a forma de sociedade por a\xE7\xF5es.

{\xA7\xA7} cujos titulares ou s\xF3cios guardem, cumulativamente, com o contratante do servi\xE7o, rela\xE7\xE3o de pessoalidade, subordina\xE7\xE3o e habitualidade.

%% Nota AGU: para o desempate do art. 60, IV, vale a declara\xE7\xE3o de programa de integridade apresentada com a proposta (art. 18 da Portaria Normativa SE/CGU 226/2025).
{#desempate.integridade}{\xA7@declaracao_integridade} O licitante dever\xE1 declarar em campo pr\xF3prio do sistema que desenvolve programa de integridade, nos termos do Decreto n\xBA 12.304, de 2024, e da Portaria Normativa SE/CGU n\xBA 226, de 9 de setembro de 2025, para fazer jus ao benef\xEDcio do crit\xE9rio de desempate previsto no art. 60, caput, inciso IV, da lei n. 14.133, de 2021.{/desempate.integridade}

{\xA7} A falsidade da declara\xE7\xE3o de que trata os itens {\xA7ref@declaracoes}{#desempate.integridade}, {\xA7ref@declaracao_me_epp} ou {\xA7ref@declaracao_integridade}{/desempate.integridade}{^desempate.integridade} ou {\xA7ref@declaracao_me_epp}{/desempate.integridade} sujeitar\xE1 o licitante \xE0s san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021, e neste Edital.

{\xA7} Os licitantes poder\xE3o retirar ou substituir a proposta ou, na hip\xF3tese de a fase de habilita\xE7\xE3o anteceder as fases de apresenta\xE7\xE3o de propostas e lances e de julgamento, os documentos de habilita\xE7\xE3o anteriormente inseridos no sistema, at\xE9 a abertura da sess\xE3o p\xFAblica.

{\xA7} N\xE3o haver\xE1 ordem de classifica\xE7\xE3o na etapa de apresenta\xE7\xE3o da proposta e dos documentos de habilita\xE7\xE3o pelo licitante, o que ocorrer\xE1 somente ap\xF3s os procedimentos de abertura da sess\xE3o p\xFAblica e da fase de envio de lances.

{\xA7} Ser\xE3o disponibilizados para acesso p\xFAblico os documentos que comp\xF5em a proposta dos licitantes convocados para apresenta\xE7\xE3o de propostas, ap\xF3s a fase de envio de lances.

{\xA7@parametrizacao} Desde que disponibilizada a funcionalidade no sistema, o licitante poder\xE1 parametrizar o seu valor final m\xEDnimo ou o seu percentual de desconto m\xE1ximo quando do cadastramento da proposta e obedecer\xE1 \xE0s seguintes regras:

{\xA7\xA7} a aplica\xE7\xE3o do intervalo m\xEDnimo de diferen\xE7a de valores ou de percentuais entre os lances, que incidir\xE1 tanto em rela\xE7\xE3o aos lances intermedi\xE1rios quanto em rela\xE7\xE3o ao lance que cobrir a melhor oferta; e

{\xA7\xA7} os lances ser\xE3o de envio autom\xE1tico pelo sistema, respeitado o valor final m\xEDnimo, caso estabelecido, e o intervalo de que trata o subitem acima.

{\xA7} O valor final m\xEDnimo ou o percentual de desconto final m\xE1ximo parametrizado no sistema poder\xE1 ser alterado pelo fornecedor durante a fase de disputa, sendo vedado:

{\xA7\xA7} valor superior a lance j\xE1 registrado pelo fornecedor no sistema, quando adotado o crit\xE9rio de julgamento por menor pre\xE7o; e

{\xA7\xA7} percentual de desconto inferior a lance j\xE1 registrado pelo fornecedor no sistema, quando adotado o crit\xE9rio de julgamento por maior desconto.

{\xA7} O valor final m\xEDnimo ou o percentual de desconto final m\xE1ximo parametrizado na forma do item {\xA7ref@parametrizacao} possuir\xE1 car\xE1ter sigiloso para os demais fornecedores e para o \xF3rg\xE3o ou entidade promotora da licita\xE7\xE3o, podendo ser disponibilizado estrita e permanentemente aos \xF3rg\xE3os de controle externo e interno.

{\xA7} Caber\xE1 ao licitante interessado em participar da licita\xE7\xE3o acompanhar as opera\xE7\xF5es no sistema eletr\xF4nico durante o processo licitat\xF3rio e se responsabilizar pelo \xF4nus decorrente da perda de neg\xF3cios diante da inobserv\xE2ncia de mensagens emitidas pela Administra\xE7\xE3o ou de sua desconex\xE3o.

{\xA7} O licitante dever\xE1 comunicar imediatamente ao provedor do sistema qualquer acontecimento que possa comprometer o sigilo ou a seguran\xE7a, para imediato bloqueio de acesso.

## {\xA7sec}. DO PREENCHIMENTO DA PROPOSTA

{\xA7} O licitante dever\xE1 enviar sua proposta mediante o preenchimento, no sistema eletr\xF4nico, dos seguintes campos:

%% Nota AGU: adequar os campos ao objeto licitado e ao crit\xE9rio de julgamento do edital.
{\xA7\xA7} {proposta.campo_valor};

{#proposta.marca}{\xA7\xA7} marca;{/proposta.marca}

{#proposta.fabricante}{\xA7\xA7} fabricante;{/proposta.fabricante}

{#proposta.quantidade_minima}{\xA7\xA7} Quantidade cotada, devendo respeitar o m\xEDnimo de {proposta.quantidade_minima}{/proposta.quantidade_minima}

{\xA7} Todas as especifica\xE7\xF5es do objeto contidas na proposta vinculam o licitante.

{#registro_precos}{\xA7\xA7} O licitante {^admite_quantitativo_inferior}n\xE3o {/admite_quantitativo_inferior}poder\xE1 oferecer proposta em quantitativo inferior ao m\xE1ximo previsto para contrata\xE7\xE3o.{/registro_precos}

{\xA7} Nos valores propostos estar\xE3o inclusos todos os custos operacionais, encargos previdenci\xE1rios, trabalhistas, tribut\xE1rios, comerciais e quaisquer outros que incidam direta ou indiretamente na execu\xE7\xE3o do objeto.

{\xA7} Os pre\xE7os ofertados, tanto na proposta inicial, quanto na etapa de lances, ser\xE3o de exclusiva responsabilidade do licitante, n\xE3o lhe assistindo o direito de pleitear qualquer altera\xE7\xE3o, sob alega\xE7\xE3o de erro, omiss\xE3o ou qualquer outro pretexto.

{\xA7} Se o regime tribut\xE1rio da empresa implicar o recolhimento de tributos em percentuais vari\xE1veis, a cota\xE7\xE3o adequada ser\xE1 a que corresponde \xE0 m\xE9dia dos efetivos recolhimentos da empresa nos \xFAltimos doze meses.

{\xA7\xA7} No regime de incid\xEAncia n\xE3o-cumulativa de PIS e COFINS, a cota\xE7\xE3o adequada ser\xE1 a que corresponde \xE0 m\xE9dia das al\xEDquotas efetivamente recolhidas pela empresa, comprovada, a qualquer tempo, por documentos de Escritura\xE7\xE3o Fiscal Digital da Contribui\xE7\xE3o (EFD-Contribui\xE7\xF5es) para o PIS/PASEP e COFINS dos \xFAltimos 12 (doze) meses anteriores \xE0 apresenta\xE7\xE3o da proposta, ou por outro meio h\xE1bil.

{\xA7} Independentemente do percentual de tributo inserido na planilha, no pagamento ser\xE3o retidos na fonte os percentuais estabelecidos na legisla\xE7\xE3o vigente.

%% Nota AGU: a primeira reda\xE7\xE3o vale para vigil\xE2ncia, limpeza ou conserva\xE7\xE3o (art. 18, \xA7 5\xBA-C, VI, c/c \xA7 5\xBA-H, da LC 123/2006) e demais hip\xF3teses em que a LC 123 admite o Simples (art. 17, \xA7 1\xBA); os autos devem conter a an\xE1lise do enquadramento.
{^simples_nacional_vedado}{\xA7} Na presente licita\xE7\xE3o, a Microempresa e a Empresa de Pequeno Porte poder\xE3o se beneficiar do regime de tributa\xE7\xE3o pelo Simples Nacional.{/simples_nacional_vedado}

{#simples_nacional_vedado}{\xA7} Na presente licita\xE7\xE3o, a Microempresa e a Empresa de Pequeno Porte n\xE3o poder\xE3o se beneficiar do regime de tributa\xE7\xE3o pelo Simples Nacional, visto que os servi\xE7os ser\xE3o prestados com disponibiliza\xE7\xE3o de trabalhadores em dedica\xE7\xE3o exclusiva de m\xE3o de obra, o que configura cess\xE3o de m\xE3o de obra para fins tribut\xE1rios, conforme art. 17, inciso XII, da Lei Complementar no 123/2006.{/simples_nacional_vedado}

{\xA7} A apresenta\xE7\xE3o das propostas implica obrigatoriedade do cumprimento das disposi\xE7\xF5es nelas contidas, em conformidade com o que disp\xF5e o Termo de Refer\xEAncia/Projeto B\xE1sico, assumindo o proponente o compromisso de executar o objeto licitado nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utens\xEDlios necess\xE1rios, em quantidades e qualidades adequadas \xE0 perfeita execu\xE7\xE3o contratual, promovendo, quando requerido, sua substitui\xE7\xE3o.

%% Nota AGU: a lei n\xE3o fixa o prazo de validade da proposta (arts. 90, \xA7 3\xBA, e 155, VI); sugere-se 60 (sessenta) dias.
{\xA7} O prazo de validade da proposta n\xE3o ser\xE1 inferior a {proposta.validade} dias, a contar da data de sua apresenta\xE7\xE3o.

{\xA7} Os licitantes devem respeitar os pre\xE7os m\xE1ximos estabelecidos nas normas de reg\xEAncia de contrata\xE7\xF5es p\xFAblicas federais, quando participarem de licita\xE7\xF5es p\xFAblicas;

{\xA7} Caso o crit\xE9rio de julgamento seja o de menor pre\xE7o, os licitantes devem respeitar os pre\xE7os m\xE1ximos previstos no Termo de Refer\xEAncia/Projeto B\xE1sico;

{\xA7} Caso o crit\xE9rio de julgamento seja o de maior desconto, o pre\xE7o j\xE1 decorrente da aplica\xE7\xE3o do desconto ofertado dever\xE1 respeitar os pre\xE7os m\xE1ximos previstos no Termo de Refer\xEAncia/Projeto B\xE1sico.

{\xA7} O descumprimento das regras supramencionadas pode ensejar a responsabiliza\xE7\xE3o pelo Tribunal de Contas da Uni\xE3o e, ap\xF3s o devido processo legal, gerar as seguintes consequ\xEAncias: assinatura de prazo para a ado\xE7\xE3o das medidas necess\xE1rias ao exato cumprimento da lei, nos termos do art. 71, inciso IX, da Constitui\xE7\xE3o; ou condena\xE7\xE3o dos agentes p\xFAblicos respons\xE1veis e da empresa contratada ao pagamento dos preju\xEDzos ao er\xE1rio, caso verificada a ocorr\xEAncia de superfaturamento por sobrepre\xE7o na execu\xE7\xE3o do contrato.

{\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva, o licitante dever\xE1 indicar os sindicatos, acordos coletivos, conven\xE7\xF5es coletivas ou senten\xE7as normativas que regem as categorias profissionais que executar\xE3o o servi\xE7o e as respectivas datas bases e vig\xEAncias, com base na Classifica\xE7\xE3o Brasileira de Ocupa\xE7\xF5es \u2013 CBO.

{\xA7} Os custos m\xEDnimos relevantes e demais informa\xE7\xF5es referentes aos benef\xEDcios trabalhistas encontram-se definidos no Termo de Refer\xEAncia.

## {\xA7sec}. DA ABERTURA DA SESS\xC3O, CLASSIFICA\xC7\xC3O DAS PROPOSTAS E FORMULA\xC7\xC3O DE LANCES

{\xA7} A abertura da presente licita\xE7\xE3o dar-se-\xE1 automaticamente em sess\xE3o p\xFAblica, por meio de sistema eletr\xF4nico, na data, hor\xE1rio e local indicados neste Edital.

{\xA7} Os licitantes poder\xE3o retirar ou substituir a proposta ou os documentos de habilita\xE7\xE3o, quando for o caso, anteriormente inseridos no sistema, at\xE9 a abertura da sess\xE3o p\xFAblica.

{\xA7} O sistema disponibilizar\xE1 campo pr\xF3prio para troca de mensagens entre o {conducao.agente} e os licitantes.

{\xA7} Iniciada a etapa competitiva, os licitantes dever\xE3o encaminhar lances exclusivamente por meio de sistema eletr\xF4nico, sendo imediatamente informados do seu recebimento e do valor consignado no registro.

{\xA7} O lance dever\xE1 ser ofertado pelo valor unit\xE1rio do item.

{\xA7} Os licitantes poder\xE3o oferecer lances sucessivos, observando o hor\xE1rio fixado para abertura da sess\xE3o e as regras estabelecidas no Edital.

{\xA7} O licitante somente poder\xE1 oferecer lance de valor inferior ou percentual de desconto superior ao \xFAltimo por ele ofertado e registrado pelo sistema.

%% Nota AGU: o intervalo m\xEDnimo de diferen\xE7a entre lances \xE9 obrigat\xF3rio (art. 22, \xA7 1\xBA, IN SEGES 73/2022).
{\xA7} O intervalo m\xEDnimo de diferen\xE7a de valores ou percentuais entre os lances, que incidir\xE1 tanto em rela\xE7\xE3o aos lances intermedi\xE1rios quanto em rela\xE7\xE3o \xE0 proposta que cobrir a melhor oferta dever\xE1 ser de {lances.intervalo_minimo}.

{\xA7} O licitante poder\xE1, uma \xFAnica vez, excluir seu \xFAltimo lance ofertado, no intervalo de quinze segundos ap\xF3s o registro no sistema, na hip\xF3tese de lance inconsistente ou inexequ\xEDvel.

{\xA7} O procedimento seguir\xE1 de acordo com o modo de disputa adotado.

{\xA7} Caso seja adotado para o envio de lances na licita\xE7\xE3o o modo de disputa \u201Caberto\u201D, os licitantes apresentar\xE3o lances p\xFAblicos e sucessivos, com prorroga\xE7\xF5es.

{\xA7\xA7} A etapa de lances da sess\xE3o p\xFAblica ter\xE1 dura\xE7\xE3o de dez minutos e, ap\xF3s isso, ser\xE1 prorrogada automaticamente pelo sistema quando houver lance ofertado nos \xFAltimos dois minutos do per\xEDodo de dura\xE7\xE3o da sess\xE3o p\xFAblica.

{\xA7\xA7} A prorroga\xE7\xE3o autom\xE1tica da etapa de lances, de que trata o subitem anterior, ser\xE1 de dois minutos e ocorrer\xE1 sucessivamente sempre que houver lances enviados nesse per\xEDodo de prorroga\xE7\xE3o, inclusive no caso de lances intermedi\xE1rios.

{\xA7\xA7} N\xE3o havendo novos lances na forma estabelecida nos itens anteriores, a sess\xE3o p\xFAblica encerrar-se-\xE1 automaticamente, e o sistema ordenar\xE1 e divulgar\xE1 os lances conforme a ordem de classifica\xE7\xE3o, sem preju\xEDzo da aplica\xE7\xE3o da margem de prefer\xEAncia e do desempate ficto, conforme disposto neste edital, quando for o caso.

{\xA7\xA7} Definida a melhor proposta, se a diferen\xE7a em rela\xE7\xE3o \xE0 proposta classificada em segundo lugar for de pelo menos 5% (cinco por cento), o {conducao.agente}, auxiliado pela equipe de apoio, poder\xE1 admitir o rein\xEDcio da disputa aberta, para a defini\xE7\xE3o das demais coloca\xE7\xF5es.

{\xA7\xA7} Ap\xF3s o rein\xEDcio previsto no item supra, os licitantes ser\xE3o convocados para apresentar lances intermedi\xE1rios.

{\xA7} Caso seja adotado para o envio de lances na licita\xE7\xE3o o modo de disputa \u201Caberto e fechado\u201D, os licitantes apresentar\xE3o lances p\xFAblicos e sucessivos, com lance final e fechado.

{\xA7\xA7} A etapa de lances da sess\xE3o p\xFAblica ter\xE1 dura\xE7\xE3o inicial de quinze minutos. Ap\xF3s esse prazo, o sistema encaminhar\xE1 aviso de fechamento iminente dos lances, ap\xF3s o que transcorrer\xE1 o per\xEDodo de at\xE9 dez minutos, aleatoriamente determinado, findo o qual ser\xE1 automaticamente encerrada a recep\xE7\xE3o de lances.

{\xA7\xA7} Encerrado o prazo previsto no subitem anterior, o sistema abrir\xE1 oportunidade para que o autor da oferta de valor mais baixo e os das ofertas com pre\xE7os at\xE9 10% (dez por cento) superiores \xE0quela possam ofertar um lance final e fechado em at\xE9 cinco minutos, o qual ser\xE1 sigiloso at\xE9 o encerramento deste prazo.

{\xA7\xA7} Caso o item em disputa envolva objeto abrangido por margem de prefer\xEAncia, o percentual referido na disposi\xE7\xE3o anterior ser\xE1 de 20%, nos termos do \xA7 6\xBA do artigo 24 da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022, inclu\xEDdo pela Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 79, de 12 de setembro de 2024.

{\xA7\xA7} No procedimento de que trata o subitem supra, o licitante poder\xE1 optar por manter o seu \xFAltimo lance da etapa aberta, ou por ofertar melhor lance.

{\xA7\xA7} N\xE3o havendo pelo menos tr\xEAs ofertas nas condi\xE7\xF5es definidas neste item, poder\xE3o os autores dos melhores lances subsequentes, na ordem de classifica\xE7\xE3o, at\xE9 o m\xE1ximo de tr\xEAs, oferecer um lance final e fechado em at\xE9 cinco minutos, o qual ser\xE1 sigiloso at\xE9 o encerramento deste prazo.

{\xA7@fechado_aberto} Caso seja adotado para o envio de lances na licita\xE7\xE3o o modo de disputa \u201Cfechado e aberto\u201D, poder\xE3o participar da etapa aberta somente os licitantes que apresentarem a proposta de menor pre\xE7o/ maior percentual de desconto e os das propostas at\xE9 10% (dez por cento) superiores/inferiores \xE0quela, em que os licitantes apresentar\xE3o lances p\xFAblicos e sucessivos, at\xE9 o encerramento da sess\xE3o e eventuais prorroga\xE7\xF5es.

{\xA7\xA7} Caso o item em disputa envolva objeto abrangido por margem de prefer\xEAncia, o percentual referido na disposi\xE7\xE3o anterior ser\xE1 de 20%, nos termos do \xA7 5\xBA do artigo 25 da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022, inclu\xEDdo pela Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 79, de 12 de setembro de 2024.

{\xA7\xA7} N\xE3o havendo pelo menos 3 (tr\xEAs) propostas nas condi\xE7\xF5es definidas no item {\xA7ref@fechado_aberto}, poder\xE3o os licitantes que apresentaram as tr\xEAs melhores propostas, consideradas as empatadas, oferecer novos lances sucessivos.

{\xA7\xA7} A etapa de lances da sess\xE3o p\xFAblica ter\xE1 dura\xE7\xE3o de dez minutos e, ap\xF3s isso, ser\xE1 prorrogada automaticamente pelo sistema quando houver lance ofertado nos \xFAltimos dois minutos do per\xEDodo de dura\xE7\xE3o da sess\xE3o p\xFAblica.

{\xA7\xA7} A prorroga\xE7\xE3o autom\xE1tica da etapa de lances, de que trata o subitem anterior, ser\xE1 de dois minutos e ocorrer\xE1 sucessivamente sempre que houver lances enviados nesse per\xEDodo de prorroga\xE7\xE3o, inclusive no caso de lances intermedi\xE1rios.

{\xA7\xA7} N\xE3o havendo novos lances na forma estabelecida nos itens anteriores, a sess\xE3o p\xFAblica encerrar-se-\xE1 automaticamente, e o sistema ordenar\xE1 e divulgar\xE1 os lances conforme a ordem final de classifica\xE7\xE3o.

{\xA7\xA7} Definida a melhor proposta, se a diferen\xE7a em rela\xE7\xE3o \xE0 proposta classificada em segundo lugar for de pelo menos 5% (cinco por cento), o {conducao.agente}, auxiliado pela equipe de apoio, poder\xE1 admitir o rein\xEDcio da disputa aberta, para a defini\xE7\xE3o das demais coloca\xE7\xF5es.

{\xA7\xA7} Ap\xF3s o rein\xEDcio previsto no subitem supra, os licitantes ser\xE3o convocados para apresentar lances intermedi\xE1rios.

{\xA7} Ap\xF3s o t\xE9rmino dos prazos estabelecidos nos subitens anteriores, o sistema ordenar\xE1 e divulgar\xE1 os lances segundo a ordem crescente de valores.

{\xA7} N\xE3o ser\xE3o aceitos dois ou mais lances de mesmo valor, prevalecendo aquele que for recebido e registrado em primeiro lugar.

{\xA7} Durante o transcurso da sess\xE3o p\xFAblica, os licitantes ser\xE3o informados, em tempo real, do valor do menor lance registrado, vedada a identifica\xE7\xE3o do licitante.

{\xA7} No caso de desconex\xE3o com o {conducao.agente}, no decorrer da etapa competitiva da licita\xE7\xE3o, o sistema eletr\xF4nico poder\xE1 permanecer acess\xEDvel aos licitantes para a recep\xE7\xE3o dos lances.

{\xA7} Quando a desconex\xE3o do sistema eletr\xF4nico para o {conducao.agente} persistir por tempo superior a dez minutos, a sess\xE3o p\xFAblica ser\xE1 suspensa e reiniciada somente ap\xF3s decorridas vinte e quatro horas da comunica\xE7\xE3o do fato pelo {conducao.agente} aos participantes, no s\xEDtio eletr\xF4nico utilizado para divulga\xE7\xE3o.

{\xA7} Caso o licitante n\xE3o apresente lances, concorrer\xE1 com o valor de sua proposta.

{\xA7} Ao final da fase de lances, ser\xE1 aplicado o benef\xEDcio da margem de prefer\xEAncia, nos termos do art. 26 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} Para produtos ou servi\xE7os abrangidos por margem de prefer\xEAncia normal ou adicional, caso a proposta de menor pre\xE7o n\xE3o tenha por objeto produto ou servi\xE7o contemplado pela referida margem, o sistema automaticamente indicar\xE1 as propostas de produtos ou servi\xE7os que fa\xE7am jus ao diferencial de pre\xE7o, pela ordem de classifica\xE7\xE3o, para fins de aceita\xE7\xE3o pelo {conducao.agente}.

{\xA7\xA7} Nestas situa\xE7\xF5es, a proposta beneficiada pela aplica\xE7\xE3o da margem de prefer\xEAncia normal ou adicional, conforme o caso, tornar-se-\xE1 a proposta classificada em primeiro lugar.

{\xA7} Em rela\xE7\xE3o a itens n\xE3o exclusivos para participa\xE7\xE3o de microempresas e empresas de pequeno porte, uma vez encerrada a etapa de lances, ser\xE1 efetivada a verifica\xE7\xE3o autom\xE1tica, junto \xE0 Receita Federal, do porte da entidade empresarial, caso a contrata\xE7\xE3o n\xE3o se enquadre nas veda\xE7\xF5es dos \xA7\xA71\xBA e 2\xBA do art. 4\xBA da Lei n\xBA 14.133, de 2021. O sistema identificar\xE1 em coluna pr\xF3pria as microempresas e empresas de pequeno porte participantes, procedendo \xE0 compara\xE7\xE3o com os valores da primeira colocada, se esta for empresa de maior porte, assim como das demais classificadas, para o fim de aplicar-se o disposto nos arts. 44 e 45 da Lei Complementar n\xBA 123, de 2006, regulamentada pelo Decreto n\xBA 8.538, de 2015.

{\xA7\xA7} Quando houver propostas beneficiadas com as margens de prefer\xEAncia, apenas poder\xE3o se valer do crit\xE9rio de desempate previsto nos arts. 44 e 45 da Lei Complementar n\xBA 123, de 2006, as propostas de microempresas e empresas de pequeno porte que tamb\xE9m fizerem jus \xE0s margens de prefer\xEAncia (art. 5\xBA, \xA79\xBA, I, do Decreto n\xBA 8538, de 2015).

{\xA7\xA7} O par\xE2metro para o empate ficto, nesse caso, consistir\xE1 no pre\xE7o ofertado pela fornecedora classificada em primeiro lugar em raz\xE3o da aplica\xE7\xE3o da margem de prefer\xEAncia.

{\xA7\xA7} Nessas condi\xE7\xF5es, as propostas de microempresas e empresas de pequeno porte que se encontrarem na faixa de at\xE9 10% (dez por cento), caso se trate de uma concorr\xEAncia, ou de at\xE9 5% (cinco por cento), caso se trate de um preg\xE3o, ser\xE3o consideradas empatadas com a primeira colocada.

{\xA7\xA7} A licitante mais bem classificada nos termos do subitem anterior ter\xE1 o direito de encaminhar uma \xFAltima oferta para desempate, obrigatoriamente em valor inferior ao da primeira colocada, no prazo de 5 (cinco) minutos controlados pelo sistema, contados ap\xF3s a comunica\xE7\xE3o autom\xE1tica para tanto.

{\xA7\xA7} Caso a microempresa ou a empresa de pequeno porte melhor classificada desista ou n\xE3o se manifeste no prazo estabelecido, ser\xE3o convocadas as demais licitantes microempresa e empresa de pequeno porte que se encontrem naquele intervalo de at\xE9 10% (dez por cento), caso se trate de uma concorr\xEAncia, ou de at\xE9 5% (cinco por cento), caso se trate de um preg\xE3o, na ordem de classifica\xE7\xE3o, para o exerc\xEDcio do mesmo direito, no prazo estabelecido no subitem anterior.

{\xA7\xA7} No caso de equival\xEAncia dos valores apresentados pelas microempresas e empresas de pequeno porte que se encontrem nos intervalos estabelecidos nos subitens anteriores, ser\xE1 realizado sorteio entre elas para que se identifique aquela que primeiro poder\xE1 apresentar melhor oferta.

{\xA7\xA7} A obten\xE7\xE3o do benef\xEDcio a que se refere o item anterior fica limitada \xE0s microempresas e \xE0s empresas de pequeno porte que, no ano-calend\xE1rio de realiza\xE7\xE3o da licita\xE7\xE3o, ainda n\xE3o tenham celebrado contratos com a Administra\xE7\xE3o P\xFAblica cujos valores somados extrapolem a receita bruta m\xE1xima admitida para fins de enquadramento como empresa de pequeno porte.

{\xA7} S\xF3 poder\xE1 haver empate entre propostas iguais (n\xE3o seguidas de lances), ou entre lances finais da fase fechada do modo de disputa aberto e fechado.

{\xA7} Havendo eventual empate entre propostas ou lances, o crit\xE9rio de desempate ser\xE1 aquele previsto no art. 60 da Lei n\xBA 14.133, de 2021, nesta ordem:

{\xA7\xA7} disputa final, hip\xF3tese em que os licitantes empatados poder\xE3o apresentar nova proposta em ato cont\xEDnuo \xE0 classifica\xE7\xE3o;

{\xA7\xA7} avalia\xE7\xE3o do desempenho contratual pr\xE9vio dos licitantes, para a qual dever\xE3o preferencialmente ser utilizados registros cadastrais para efeito de atesto de cumprimento de obriga\xE7\xF5es previstos nesta Lei;

{\xA7\xA7} desenvolvimento pelo licitante de a\xE7\xF5es de equidade entre homens e mulheres no ambiente de trabalho, nos termos do Decreto n\xBA 11.430, de 2023, e da Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 382, de 17 de setembro de 2025;

{\xA7\xA7} declara\xE7\xE3o do licitante de que desenvolve programa de integridade, conforme Decreto n\xB0 12.304, de 2024, e Portaria Normativa SE/CGU n\xB0 226, de 9 de setembro de 2025.

{\xA7} Persistindo o empate, ser\xE1 assegurada prefer\xEAncia, sucessivamente, aos bens e servi\xE7os produzidos ou prestados por:

%% Nota AGU: a prefer\xEAncia a empresas do Estado (art. 60, \xA7 1\xBA, I) n\xE3o se aplica a licita\xE7\xF5es federais (PARECER n. 00019/2025/DECOR/CGU/AGU); suprimida para o CFC.

{\xA7\xA7} empresas brasileiras;

{\xA7\xA7} empresas que invistam em pesquisa e no desenvolvimento de tecnologia no Pa\xEDs;

{\xA7\xA7} empresas que comprovem a pr\xE1tica de mitiga\xE7\xE3o, nos termos da Lei n\xBA 12.187, de 29 de dezembro de 2009.

{\xA7} Esgotados todos os demais crit\xE9rios de desempate previstos em lei, a escolha do licitante vencedor ocorrer\xE1 por sorteio, em ato p\xFAblico, para o qual todos os licitantes ser\xE3o convocados, vedado qualquer outro processo.

{\xA7} Encerrada a etapa de envio de lances da sess\xE3o p\xFAblica, na hip\xF3tese da proposta do primeiro colocado permanecer acima do pre\xE7o m\xE1ximo ou inferior ao desconto definido para a contrata\xE7\xE3o, o {conducao.agente} poder\xE1 negociar condi\xE7\xF5es mais vantajosas, ap\xF3s definido o resultado do julgamento.

%% Nota AGU: usar quando a licita\xE7\xE3o for em grupo (registro de pre\xE7os).
{#registro_precos}{^divisao.itens}{^divisao.item_unico}{\xA7\xA7} Tratando-se de licita\xE7\xE3o em grupo, a contrata\xE7\xE3o posterior de item espec\xEDfico do grupo exigir\xE1 pr\xE9via pesquisa de mercado e demonstra\xE7\xE3o de sua vantagem para o \xF3rg\xE3o ou a entidade e ser\xE3o observados como crit\xE9rio de aceitabilidade os pre\xE7os unit\xE1rios m\xE1ximos definidos no Termo de Refer\xEAncia.{/divisao.item_unico}{/divisao.itens}{/registro_precos}

{\xA7\xA7} A negocia\xE7\xE3o poder\xE1 ser feita com os demais licitantes, segundo a ordem de classifica\xE7\xE3o inicialmente estabelecida, quando o primeiro colocado, mesmo ap\xF3s a negocia\xE7\xE3o, for desclassificado em raz\xE3o de sua proposta permanecer acima do pre\xE7o m\xE1ximo definido pela Administra\xE7\xE3o.

{\xA7\xA7} A negocia\xE7\xE3o ser\xE1 realizada por meio do sistema, podendo ser acompanhada pelos demais licitantes.

{\xA7\xA7} O resultado da negocia\xE7\xE3o ser\xE1 divulgado a todos os licitantes e anexado aos autos do processo licitat\xF3rio.

%% Nota AGU: 2 (duas) horas \xE9 o prazo m\xEDnimo; pode ser aumentado (art. 29, \xA7 2\xBA, IN SEGES 73/2022).
{\xA7\xA7} O {conducao.agente} solicitar\xE1 ao licitante mais bem classificado que, no prazo de {negociacao.prazo_proposta}, envie a proposta adequada ao \xFAltimo lance ofertado ap\xF3s a negocia\xE7\xE3o realizada, acompanhada, se for o caso, dos documentos complementares, quando necess\xE1rios \xE0 confirma\xE7\xE3o daqueles exigidos neste Edital e j\xE1 apresentados.

{\xA7\xA7} \xC9 facultado ao {conducao.agente} prorrogar o prazo estabelecido, a partir de solicita\xE7\xE3o fundamentada feita no chat pelo licitante, antes de findo o prazo.

{\xA7} Ap\xF3s a negocia\xE7\xE3o do pre\xE7o, o {conducao.agente} iniciar\xE1 a fase de aceita\xE7\xE3o e julgamento da proposta.

## {\xA7sec}. DA FASE DE JULGAMENTO

{\xA7} Encerrada a etapa de negocia\xE7\xE3o, o {conducao.agente} verificar\xE1 se o licitante provisoriamente classificado em primeiro lugar atende \xE0s condi\xE7\xF5es de participa\xE7\xE3o no certame, conforme previsto no art. 14 da Lei n\xBA 14.133, de 2021, legisla\xE7\xE3o correlata e no item {\xA7ref@nao_disputar} do edital, especialmente quanto \xE0 exist\xEAncia de san\xE7\xE3o que impe\xE7a a participa\xE7\xE3o no certame ou a futura contrata\xE7\xE3o, mediante a consulta aos seguintes cadastros:

{\xA7\xA7} Sicaf;

{\xA7\xA7} Cadastro Nacional de Empresas Inid\xF4neas e Suspensas \u2013 CEIS,

{\xA7\xA7} Cadastro Nacional de Empresas Punidas \u2013 CNEP e

{\xA7\xA7} Lista de licitantes inid\xF4neos, mantida pelo Tribunal de Contas da Uni\xE3o.

{\xA7} A consulta aos cadastros ser\xE1 realizada no nome e no CNPJ da empresa licitante.

{\xA7\xA7} A consulta no CEIS quanto \xE0s san\xE7\xF5es previstas na Lei n\xBA 8.429, de 1992, tamb\xE9m ocorrer\xE1 no nome e no CPF do s\xF3cio majorit\xE1rio da empresa licitante, se houver, por for\xE7a do art. 12 da citada lei.

{\xA7} Para a consulta de licitantes pessoa jur\xEDdica poder\xE1 haver a substitui\xE7\xE3o das consultas ao CEIS, CNEP e Lista de licitantes inid\xF4neos pela Consulta Consolidada de Pessoa Jur\xEDdica do TCU.

{\xA7} Caso conste na Consulta de Situa\xE7\xE3o do licitante a exist\xEAncia de Ocorr\xEAncias Impeditivas Indiretas, o {conducao.agente} diligenciar\xE1 para verificar se houve fraude por parte das empresas apontadas no Relat\xF3rio de Ocorr\xEAncias Impeditivas Indiretas.

{\xA7\xA7} A tentativa de burla ser\xE1 verificada por meio dos v\xEDnculos societ\xE1rios, linhas de fornecimento similares, dentre outros.

{\xA7\xA7} O licitante ser\xE1 convocado para manifesta\xE7\xE3o previamente a uma eventual desclassifica\xE7\xE3o.

{\xA7\xA7} Constatada a exist\xEAncia de san\xE7\xE3o, o licitante ser\xE1 reputado inabilitado, por falta de condi\xE7\xE3o de participa\xE7\xE3o.

{\xA7} Na hip\xF3tese de invers\xE3o das fases de habilita\xE7\xE3o e julgamento, caso atendidas as condi\xE7\xF5es de participa\xE7\xE3o, ser\xE1 iniciado o procedimento de habilita\xE7\xE3o.

{\xA7} Caso o licitante provisoriamente classificado em primeiro lugar tenha se utilizado de algum tratamento favorecido \xE0s ME/EPPs ou tenha se valido da aplica\xE7\xE3o da margem de prefer\xEAncia, o {conducao.agente} verificar\xE1 se o licitante faz jus ao benef\xEDcio aplicado.

{\xA7\xA7} Caso o licitante n\xE3o venha a comprovar o atendimento dos requisitos para fazer jus ao benef\xEDcio da margem de prefer\xEAncia, as propostas ser\xE3o reclassificadas, para fins de nova aplica\xE7\xE3o da margem de prefer\xEAncia.

{\xA7} Verificadas as condi\xE7\xF5es de participa\xE7\xE3o e de utiliza\xE7\xE3o do tratamento favorecido, o {conducao.agente} examinar\xE1 a proposta classificada em primeiro lugar quanto \xE0 adequa\xE7\xE3o ao objeto e \xE0 compatibilidade do pre\xE7o em rela\xE7\xE3o ao m\xE1ximo estipulado para contrata\xE7\xE3o neste Edital e em seus anexos, observado o disposto nos arts. 29 a 35 da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022.

{#dedicacao_exclusiva}
{\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva, a fim de assegurar o tratamento ison\xF4mico entre as licitantes, informa-se que foram utilizados os seguintes acordos, diss\xEDdios ou conven\xE7\xF5es coletivas de trabalho no c\xE1lculo do valor estimado pela Administra\xE7\xE3o:

{\xA7\xA7} {convencao_coletiva.paradigma};

{\xA7} Os acordos, diss\xEDdios ou conven\xE7\xF5es coletivas indicado(s)no subitem acima n\xE3o \xE9 (s\xE3o) de utiliza\xE7\xE3o obrigat\xF3ria pelos licitantes, mas, ao longo da execu\xE7\xE3o contratual, sempre se exigir\xE1 o cumprimento dos acordos, diss\xEDdios ou conven\xE7\xF5es coletivas adotados por cada licitante/contratado, obedecidos os custos m\xEDnimos relevantes fixados pela Administra\xE7\xE3o.
{/dedicacao_exclusiva}

{\xA7} Ser\xE1 desclassificada a proposta vencedora que:

{\xA7\xA7} contiver v\xEDcios insan\xE1veis;

{\xA7\xA7} n\xE3o obedecer \xE0s especifica\xE7\xF5es t\xE9cnicas contidas no Termo de Refer\xEAncia/Projeto B\xE1sico;

{\xA7\xA7} apresentar pre\xE7os inexequ\xEDveis ou permanecerem acima do pre\xE7o m\xE1ximo definido para a contrata\xE7\xE3o;

{\xA7\xA7} n\xE3o tiver sua exequibilidade demonstrada, quando exigido pela Administra\xE7\xE3o;

{\xA7\xA7} n\xE3o cumpra os crit\xE9rios de aceitabilidade de pre\xE7os definidos no Termo de Refer\xEAncia;

{\xA7\xA7} apresentar desconformidade com quaisquer outras exig\xEAncias deste Edital ou seus anexos, desde que insan\xE1vel.

{\xA7} No caso de bens e servi\xE7os em geral, \xE9 ind\xEDcio de inexequibilidade das propostas valores inferiores a 50% (cinquenta por cento) do valor or\xE7ado pela Administra\xE7\xE3o.

{\xA7} A inexequibilidade, na hip\xF3tese de que trata o item anterior, s\xF3 ser\xE1 considerada ap\xF3s dilig\xEAncia do {conducao.agente}, que comprove:

{\xA7\xA7} que o custo do licitante ultrapassa o valor da proposta; e

{\xA7\xA7} inexistirem custos de oportunidade capazes de justificar o vulto da oferta.

%% Nota AGU: em empreitada por pre\xE7o unit\xE1rio cabe desclassificar por custo unit\xE1rio acima do or\xE7ado (arts. 59, \xA7 3\xBA, e 6\xBA, LVI); a men\xE7\xE3o aos custos unit\xE1rios relevantes \xE9 sugest\xE3o.
{#engenharia}
{\xA7} Em contrata\xE7\xE3o de obras e servi\xE7os de engenharia, al\xE9m das disposi\xE7\xF5es acima, a an\xE1lise de exequibilidade e sobrepre\xE7o considerar\xE1 o seguinte:

{\xA7\xA7} Nos regimes de execu\xE7\xE3o por tarefa, empreitada por pre\xE7o global ou empreitada integral, contrata\xE7\xE3o semi-integrada ou contrata\xE7\xE3o integrada, a caracteriza\xE7\xE3o do sobrepre\xE7o se dar\xE1 pela supera\xE7\xE3o do valor global estimado;

{\xA7\xA7} No regime de empreitada por pre\xE7o unit\xE1rio, a caracteriza\xE7\xE3o do sobrepre\xE7o se dar\xE1 pela supera\xE7\xE3o do valor global estimado e pela supera\xE7\xE3o de custo unit\xE1rio tido como relevante, conforme planilha anexa ao edital;

{\xA7\xA7} No caso de obras e servi\xE7os de engenharia, ser\xE3o consideradas inexequ\xEDveis as propostas cujos valores forem inferiores a 75% (setenta e cinco por cento) do valor or\xE7ado pela Administra\xE7\xE3o, independentemente do regime de execu\xE7\xE3o.
{/engenharia}

{\xA7} Se houver ind\xEDcios de inexequibilidade da proposta de pre\xE7o, ou em caso da necessidade de esclarecimentos complementares, poder\xE3o ser efetuadas dilig\xEAncias, para que o licitante comprove a exequibilidade da proposta.

{\xA7} Caso o custo global estimado do objeto licitado tenha sido decomposto em seus respectivos custos unit\xE1rios por meio de Planilha de Custos e Forma\xE7\xE3o de Pre\xE7os elaborada pela Administra\xE7\xE3o, o licitante classificado em primeiro lugar ser\xE1 convocado para apresentar Planilha por ele elaborada, com os respectivos valores adequados ao valor final da sua proposta, sob pena de n\xE3o aceita\xE7\xE3o da proposta.

{\xA7\xA7} Em se tratando de obras e servi\xE7os de engenharia, o licitante vencedor ser\xE1 convocado a apresentar \xE0 Administra\xE7\xE3o, por meio eletr\xF4nico, as planilhas com indica\xE7\xE3o dos quantitativos e dos custos unit\xE1rios, seguindo o modelo elaborado pela Administra\xE7\xE3o, bem como com detalhamento das Bonifica\xE7\xF5es e Despesas Indiretas (BDI) e dos Encargos Sociais (ES), com os respectivos valores adequados ao valor final da proposta vencedora, admitida a utiliza\xE7\xE3o dos pre\xE7os unit\xE1rios, no caso de empreitada por pre\xE7o global, empreitada integral, contrata\xE7\xE3o semi-integrada e contrata\xE7\xE3o integrada, exclusivamente para eventuais adequa\xE7\xF5es indispens\xE1veis no cronograma f\xEDsico-financeiro e para balizar excepcional aditamento posterior do contrato.

{\xA7\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva cuja produtividade seja mensur\xE1vel e indicada pela Administra\xE7\xE3o, o licitante dever\xE1 indicar a produtividade adotada e a quantidade de pessoal que ser\xE1 alocado na execu\xE7\xE3o contratual.

{\xA7\xA7} Caso a produtividade seja diferente daquela utilizada pela Administra\xE7\xE3o como refer\xEAncia, ou n\xE3o estiver contida na faixa referencial de produtividade, mas admitida pelo ato convocat\xF3rio, o licitante dever\xE1 apresentar a respectiva comprova\xE7\xE3o de exequibilidade;

{\xA7\xA7} Os licitantes poder\xE3o apresentar produtividades diferenciadas daquela estabelecida pela Administra\xE7\xE3o como refer\xEAncia, desde que n\xE3o alterem o objeto da contrata\xE7\xE3o, n\xE3o contrariem dispositivos legais vigentes e, caso n\xE3o estejam contidas nas faixas referenciais de produtividade, comprovem a exequibilidade da proposta.

{\xA7\xA7} Para efeito do subitem anterior, admite-se a adequa\xE7\xE3o t\xE9cnica da metodologia empregada pela contratada, visando assegurar a execu\xE7\xE3o do objeto, desde que mantidas as condi\xE7\xF5es para a justa remunera\xE7\xE3o do servi\xE7o.

{\xA7} Erros no preenchimento da planilha n\xE3o constituem motivo para a desclassifica\xE7\xE3o da proposta. A planilha poder\xE1\u0301 ser ajustada pelo licitante, no prazo indicado pelo sistema, desde que n\xE3o haja majora\xE7\xE3o do pre\xE7o e que se comprove que este \xE9 o bastante para arcar com todos os custos da contrata\xE7\xE3o;

{\xA7\xA7} O ajuste de que trata este dispositivo se limita a sanar erros ou falhas que n\xE3o alterem a subst\xE2ncia das propostas;

{\xA7\xA7} Considera-se erro no preenchimento da planilha pass\xEDvel de corre\xE7\xE3o a indica\xE7\xE3o de recolhimento de impostos e contribui\xE7\xF5es na forma do Simples Nacional, quando n\xE3o cab\xEDvel esse regime.

{\xA7} Para fins de an\xE1lise da proposta quanto ao cumprimento das especifica\xE7\xF5es do objeto, poder\xE1 ser colhida a manifesta\xE7\xE3o escrita do setor requisitante do servi\xE7o ou da \xE1rea especializada no objeto.

{\xA7} Caso o Termo de Refer\xEAncia exija a apresenta\xE7\xE3o de carta de solidariedade emitida pelo fabricante, que assegure a execu\xE7\xE3o do contrato, no caso de licitante revendedor ou distribuidor, o licitante classificado em primeiro lugar dever\xE1 apresent\xE1-la, sob pena de n\xE3o aceita\xE7\xE3o da proposta.

{\xA7} Caso o Termo de Refer\xEAncia/Projeto B\xE1sico exija a apresenta\xE7\xE3o de amostra, o licitante classificado em primeiro lugar dever\xE1 apresent\xE1-la, conforme disciplinado no Termo de Refer\xEAncia, sob pena de n\xE3o aceita\xE7\xE3o da proposta.

{\xA7} Por meio de mensagem no sistema, ser\xE1 divulgado o local e hor\xE1rio de realiza\xE7\xE3o do procedimento para a avalia\xE7\xE3o das amostras, cuja presen\xE7a ser\xE1 facultada a todos os interessados, incluindo os demais licitantes.

{\xA7} Os resultados das avalia\xE7\xF5es ser\xE3o divulgados por meio de mensagem no sistema.

{\xA7} No caso de n\xE3o haver entrega da amostra ou ocorrer atraso na entrega, sem justificativa aceita pelo {conducao.agente}, ou havendo entrega de amostra fora das especifica\xE7\xF5es previstas neste Edital, a proposta do licitante ser\xE1 recusada.

{\xA7} Se a(s) amostra(s) apresentada(s) pelo primeiro classificado n\xE3o for(em) aceita(s), o {conducao.agente} analisar\xE1 a aceitabilidade da proposta ou lance ofertado pelo segundo classificado. Seguir-se-\xE1 com a verifica\xE7\xE3o da(s) amostra(s) e, assim, sucessivamente, at\xE9 a verifica\xE7\xE3o de uma que atenda \xE0s especifica\xE7\xF5es constantes no Termo de Refer\xEAncia.

%% Nota AGU: documentos exigidos com a proposta do primeiro colocado em servi\xE7os com dedica\xE7\xE3o exclusiva (Ac\xF3rd\xE3o TCU 1.207/2024-Plen\xE1rio; IN SEGES 176/2024, art. 7\xBA); com postos em mais de uma base sindical, informar cada norma coletiva.
{#dedicacao_exclusiva}
{\xA7} No caso de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra, o licitante dever\xE1 entregar junto com sua proposta de pre\xE7os, os seguintes documentos:

{\xA7\xA7} declara\xE7\xE3o informando o enquadramento sindical da empresa, a atividade econ\xF4mica preponderante e a justificativa para ado\xE7\xE3o do instrumento coletivo do trabalho em que se baseia sua proposta;

{\xA7\xA7} c\xF3pia da carta ou registro sindical do sindicato a qual ele declara ser enquadrado, em raz\xE3o do regramento do enquadramento sindical previsto na CLT ou por for\xE7a de decis\xE3o judicial;

{\xA7\xA7} c\xF3pia do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado pelo licitante para a elabora\xE7\xE3o da planilha de custos e forma\xE7\xE3o de pre\xE7os que embasam o valor global ofertado; e

{\xA7\xA7} declara\xE7\xE3o de que se responsabiliza nas situa\xE7\xF5es de ocorr\xEAncia de erro no enquadramento sindical, ou fraude pela utiliza\xE7\xE3o de instrumento coletivo incompat\xEDvel com o enquadramento sindical declarado ou no qual a empresa n\xE3o tenha sido representada por \xF3rg\xE3o de classe de sua categoria, que da\xED tenha resultado vantagem indevida na fase de julgamento das propostas, sujeitando a contratada \xE0s san\xE7\xF5es previstas no art. 156, incisos III e IV, da Lei n\xBA 14.133, de 2021;

{\xA7} Na hip\xF3tese dos postos de trabalho licitados se distribu\xEDrem por territ\xF3rio correspondente a mais de uma base sindical da categoria profissional, dever\xE3o ser informadas cada uma das normas coletivas utilizadas para o c\xE1lculo do custo individual dos postos, a partir da base territorial de cada sindicato.

{\xA7} O {conducao.agente} realizar\xE1 a verifica\xE7\xE3o da observ\xE2ncia da proposta classificada provisoriamente em primeiro lugar quanto aos custos unit\xE1rios m\xEDnimos relevantes estabelecidos pela Administra\xE7\xE3o, al\xE9m dos demais aspectos ligados \xE0 conformidade da proposta ao objeto licitado e \xE0 compatibilidade do pre\xE7o.

{\xA7} O {conducao.agente} conceder\xE1 o prazo de no m\xEDnimo duas horas para readequa\xE7\xE3o da proposta quando esta n\xE3o observar os custos unit\xE1rios m\xEDnimos relevantes, sob pena de desclassifica\xE7\xE3o, na forma da Instru\xE7\xE3o Normativa n\xBA 73, de 30 de setembro de 2022.

{\xA7} O {conducao.agente} deve verificar se as previs\xF5es do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo indicados pela Administra\xE7\xE3o est\xE3o sendo contempladas na Planilha de Custos e Forma\xE7\xE3o de Pre\xE7os, em especial, quando o Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado pelo licitante for diferente da norma coletiva paradigma utilizada pela Administra\xE7\xE3o.

{\xA7} Dever\xE3o prevalecer os valores que forem mais ben\xE9ficos ao trabalhador, na hip\xF3tese de que o Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo indicado pelo licitante estabelecerem valores de remunera\xE7\xE3o, incluindo sal\xE1rio base e adicionais, de aux\xEDlio-alimenta\xE7\xE3o e de benef\xEDcios superiores aos do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado como paradigma.
{/dedicacao_exclusiva}

## {\xA7sec}. DA FASE DE HABILITA\xC7\xC3O

{\xA7} Os documentos previstos no Termo de Refer\xEAncia, necess\xE1rios e suficientes para demonstrar a capacidade do licitante de realizar o objeto da licita\xE7\xE3o, ser\xE3o exigidos para fins de habilita\xE7\xE3o, nos termos dos arts. 62 a 70 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7@hab_sicaf} A documenta\xE7\xE3o exigida para fins de habilita\xE7\xE3o jur\xEDdica, fiscal, social e trabalhista e econ\xF4mico-\uFB01nanceira, poder\xE1 ser substitu\xEDda pelo registro cadastral no Sicaf.

{\xA7} Quando permitida a participa\xE7\xE3o de empresas estrangeiras que n\xE3o funcionem no Pa\xEDs, as exig\xEAncias de habilita\xE7\xE3o ser\xE3o atendidas mediante documentos equivalentes, inicialmente apresentados em tradu\xE7\xE3o livre.

{\xA7} Na hip\xF3tese de o licitante vencedor ser empresa estrangeira que n\xE3o funcione no Pa\xEDs, para \uFB01ns de assinatura do contrato ou da ata de registro de pre\xE7os, os documentos exigidos para a habilita\xE7\xE3o ser\xE3o traduzidos por tradutor juramentado no Pa\xEDs e apostilados nos termos do disposto no Decreto n\xBA 8.660, de 29 de janeiro de 2016, ou de outro que venha a substitu\xED-lo, ou consularizados pelos respectivos consulados ou embaixadas.

{\xA7} Quando permitida a participa\xE7\xE3o de cons\xF3rcio de empresas, a habilita\xE7\xE3o t\xE9cnica, quando exigida, ser\xE1 feita por meio do somat\xF3rio dos quantitativos de cada consorciado e, para efeito de habilita\xE7\xE3o econ\xF4mico-financeira, quando exigida, ser\xE1 observado o somat\xF3rio dos valores de cada consorciado.

%% Nota AGU: o edital fixa acr\xE9scimo de 10% a 30% sobre o exigido do licitante individual, salvo justificativa (art. 15, \xA7 1\xBA, da Lei 14.133).
{#consorcio_permitido}{\xA7\xA7} Se o cons\xF3rcio n\xE3o for formado integralmente por microempresas ou empresas de pequeno porte e o Termo de Refer\xEAncia exigir requisitos de habilita\xE7\xE3o econ\xF4mico-financeira, haver\xE1 um acr\xE9scimo de {consorcio_permitido.acrescimo} para o cons\xF3rcio em rela\xE7\xE3o ao valor exigido para os licitantes individuais.{/consorcio_permitido}

{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser apresentados em original, por c\xF3pia ou por {habilitacao.outro_meio}.

{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser substitu\xEDdos por registro cadastral emitido por \xF3rg\xE3o ou entidade p\xFAblica, desde que o registro tenha sido feito em obedi\xEAncia ao disposto na Lei n\xBA 14.133, de 2021.

{\xA7} Ser\xE1 verificado se o licitante apresentou declara\xE7\xE3o de que atende aos requisitos de habilita\xE7\xE3o, e o declarante responder\xE1 pela veracidade das informa\xE7\xF5es prestadas, na forma da lei.

{\xA7} Ser\xE1 verificado se o licitante apresentou no sistema, sob pena de inabilita\xE7\xE3o, a declara\xE7\xE3o de que cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O licitante dever\xE1 apresentar, sob pena de desclassifica\xE7\xE3o, declara\xE7\xE3o de que suas propostas econ\xF4micas compreendem a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de entrega das propostas.

%% Nota AGU: suprimir quando o objeto independer de conhecimento do local; a vistoria \xE9 facultativa e pode ser substitu\xEDda por declara\xE7\xE3o do respons\xE1vel t\xE9cnico (art. 63, \xA7\xA7 2\xBA e 3\xBA); preferir fotografias e plantas sempre que poss\xEDvel.
{#vistoria}
{\xA7} Considerando que na presente contrata\xE7\xE3o a avalia\xE7\xE3o pr\xE9via do local de execu\xE7\xE3o \xE9 imprescind\xEDvel para o conhecimento pleno das condi\xE7\xF5es e peculiaridades do objeto a ser contratado, o licitante deve atestar, sob pena de inabilita\xE7\xE3o, que conhece o local e as condi\xE7\xF5es de realiza\xE7\xE3o do servi\xE7o, assegurado a ele o direito de realiza\xE7\xE3o de vistoria pr\xE9via.

{\xA7\xA7} O licitante que optar por realizar vistoria pr\xE9via ter\xE1 disponibilizado pela Administra\xE7\xE3o data e hor\xE1rio exclusivos, a ser agendado {vistoria.agendamento}, de modo que seu agendamento n\xE3o coincida com o agendamento de outros licitantes.

{\xA7\xA7} Caso o licitante opte por n\xE3o realizar vistoria, poder\xE1 substituir a declara\xE7\xE3o exigida no presente item por declara\xE7\xE3o formal assinada pelo seu respons\xE1vel t\xE9cnico acerca do conhecimento pleno das condi\xE7\xF5es e peculiaridades da contrata\xE7\xE3o.
{/vistoria}

{\xA7} A habilita\xE7\xE3o ser\xE1 verificada por meio do Sicaf, nos documentos por ele abrangidos.

{\xA7\xA7} Somente haver\xE1 a necessidade de comprova\xE7\xE3o do preenchimento de requisitos mediante apresenta\xE7\xE3o dos documentos originais n\xE3o-digitais quando houver d\xFAvida em rela\xE7\xE3o \xE0 integridade do documento digital ou quando a lei expressamente o exigir.

{\xA7} \xC9 de responsabilidade do licitante conferir a exatid\xE3o dos seus dados cadastrais no Sicaf e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

{\xA7} A verifica\xE7\xE3o pelo {conducao.agente}, em s\xEDtios eletr\xF4nicos oficiais de \xF3rg\xE3os e entidades emissores de certid\xF5es constitui meio legal de prova, para fins de habilita\xE7\xE3o.

{\xA7\xA7@hab_prazo_docs} Os documentos exigidos para habilita\xE7\xE3o que n\xE3o estejam contemplados no Sicaf ser\xE3o enviados por meio do sistema, em formato digital, no prazo de {habilitacao.prazo_documentos}, prorrog\xE1vel por igual per\xEDodo, contado da solicita\xE7\xE3o do {conducao.agente}.

{\xA7\xA7@hab_simultanea} Na hip\xF3tese de a fase de habilita\xE7\xE3o anteceder a fase de apresenta\xE7\xE3o de propostas e lances, os licitantes encaminhar\xE3o, por meio do sistema, simultaneamente os documentos de habilita\xE7\xE3o e a proposta com o pre\xE7o ou o percentual de desconto, observado o disposto no \xA7 1\xBA do art. 36 e no \xA7 1\xBA do art. 39 da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022.

{\xA7} A verifica\xE7\xE3o no Sicaf ou a exig\xEAncia dos documentos nele n\xE3o contidos somente ser\xE1 feita em rela\xE7\xE3o ao licitante vencedor.

{\xA7\xA7} Os documentos relativos \xE0 regularidade fiscal que constem do Termo de Refer\xEAncia somente ser\xE3o exigidos, em qualquer caso, em momento posterior ao julgamento das propostas, e apenas do licitante mais bem classificado.

{\xA7\xA7} Respeitada a exce\xE7\xE3o do subitem anterior, relativa \xE0 regularidade fiscal, quando a fase de habilita\xE7\xE3o anteceder as fases de apresenta\xE7\xE3o de propostas e lances e de julgamento, a verifica\xE7\xE3o ou exig\xEAncia do presente subitem ocorrer\xE1 em rela\xE7\xE3o a todos os licitantes.

%% Nota AGU: dilig\xEAncia para sanear habilita\xE7\xE3o ou proposta com documento que comprove condi\xE7\xE3o preexistente \xE0 sess\xE3o, com prazo fixado no edital (Parecer 2/2025/CNLCA/DECOR/CGU/AGU; Ac\xF3rd\xE3o TCU 1414/2023-Plen\xE1rio); m\xEDnimo de duas horas.
{\xA7} Encerrado o prazo para envio da documenta\xE7\xE3o de que trata o item {\xA7ref@hab_prazo_docs}, poder\xE1 ser admitida, mediante decis\xE3o fundamentada do {conducao.agente}, a apresenta\xE7\xE3o de novos documentos de habilita\xE7\xE3o ou a complementa\xE7\xE3o de informa\xE7\xF5es acerca dos documentos j\xE1 apresentados pelos licitantes, em at\xE9 {habilitacao.prazo_complementacao} horas, para:

{\xA7\xA7} a aferi\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o do licitante, desde que decorrentes de fatos existentes \xE0 \xE9poca da abertura do certame;

{\xA7\xA7} atualiza\xE7\xE3o de documentos cuja validade tenha expirado ap\xF3s a data de recebimento das propostas;

{\xA7\xA7} suprimento da aus\xEAncia de documento de cunho declarat\xF3rio emitido unilateralmente pelo licitante;

{\xA7\xA7} suprimento da aus\xEAncia de certid\xE3o e/ou documento de cunho declarat\xF3rio expedido por \xF3rg\xE3o ou entidade cujos atos gozem de presun\xE7\xE3o de veracidade e f\xE9 p\xFAblica.

{\xA7} Findo o prazo assinalado sem o envio da nova documenta\xE7\xE3o, restar\xE1 preclusa essa oportunidade conferida ao licitante, implicando sua inabilita\xE7\xE3o.

{\xA7} Na an\xE1lise dos documentos de habilita\xE7\xE3o, a comiss\xE3o de contrata\xE7\xE3o poder\xE1 sanar erros ou falhas, que n\xE3o alterem a subst\xE2ncia dos documentos e sua validade jur\xEDdica, mediante decis\xE3o fundamentada, registrada em ata e acess\xEDvel a todos, atribuindo-lhes e\uFB01c\xE1cia para fins de habilita\xE7\xE3o e classifica\xE7\xE3o.

{\xA7} Na hip\xF3tese de o licitante n\xE3o atender \xE0s exig\xEAncias para habilita\xE7\xE3o, o {conducao.agente} examinar\xE1 a proposta subsequente e assim sucessivamente, na ordem de classifica\xE7\xE3o, at\xE9 a apura\xE7\xE3o de uma proposta que atenda ao presente edital, observado o prazo disposto no subitem {\xA7ref@hab_prazo_docs}.

{\xA7} Somente ser\xE3o disponibilizados para acesso p\xFAblico os documentos de habilita\xE7\xE3o do licitante cuja proposta atenda ao edital de licita\xE7\xE3o, ap\xF3s conclu\xEDdos os procedimentos de que trata o subitem anterior.

{\xA7} A comprova\xE7\xE3o de regularidade fiscal e trabalhista das microempresas e das empresas de pequeno porte somente ser\xE1 exigida para efeito de contrata\xE7\xE3o, e n\xE3o como condi\xE7\xE3o para participa\xE7\xE3o na licita\xE7\xE3o.

{\xA7} Quando a fase de habilita\xE7\xE3o anteceder a de julgamento e j\xE1 tiver sido encerrada, n\xE3o caber\xE1 exclus\xE3o de licitante por motivo relacionado \xE0 habilita\xE7\xE3o, salvo em raz\xE3o de fatos supervenientes ou s\xF3 conhecidos ap\xF3s o julgamento.

## {\xA7sec}. DO TERMO DE CONTRATO

{\xA7} Ap\xF3s a homologa\xE7\xE3o e adjudica\xE7\xE3o, caso se conclua pela contrata\xE7\xE3o, ser\xE1 firmado termo de contrato, ou outro instrumento equivalente.

{\xA7@prazo_assinatura} O adjudicat\xE1rio ter\xE1 o prazo de {contratacao.prazo_assinatura} dias \xFAteis, contados a partir da data de sua convoca\xE7\xE3o, para assinar o termo de contrato ou instrumento equivalente, sob pena de decair o direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas neste Edital.

{\xA7@assinatura_alternativa} Alternativamente \xE0 convoca\xE7\xE3o para comparecer perante o \xF3rg\xE3o ou entidade para a assinatura do Termo de Contrato ou instrumento equivalente, a Administra\xE7\xE3o poder\xE1: a) encaminh\xE1-lo para assinatura, mediante correspond\xEAncia postal com aviso de recebimento (AR), para que seja assinado e devolvido no prazo de {contratacao.prazo_devolucao} dias \xFAteis, a contar da data de seu recebimento; b) disponibilizar acesso a sistema de processo eletr\xF4nico para que seja assinado digitalmente em at\xE9 {contratacao.prazo_assinatura_digital} dias \xFAteis; ou c) outro meio eletr\xF4nico, assegurado o prazo de {contratacao.prazo_resposta} dias \xFAteis para resposta ap\xF3s recebimento da notifica\xE7\xE3o pela Administra\xE7\xE3o.

%% S\xF3 quando a Nota de Empenho ou instrumento equivalente substituir o termo de contrato.
{#instrumento_equivalente}
{\xA7} O Aceite da Nota de Empenho ou do instrumento equivalente, emitida ao fornecedor adjudicado, implica o reconhecimento de que:

{\xA7\xA7} referida Nota est\xE1 substituindo o contrato, aplicando-se \xE0 rela\xE7\xE3o de neg\xF3cios ali estabelecida as disposi\xE7\xF5es da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} a contratada se vincula \xE0 sua proposta e \xE0s previs\xF5es contidas neste Edital;

{\xA7\xA7} a contratada reconhece que as hip\xF3teses de rescis\xE3o s\xE3o aquelas previstas nos artigos 137 e 138 da Lei n\xBA 14.133, de 2021 e reconhece os direitos da Administra\xE7\xE3o previstos nos artigos 137 a 139 da mesma Lei.
{/instrumento_equivalente}

{\xA7} Os prazos dos itens {\xA7ref@prazo_assinatura} e {\xA7ref@assinatura_alternativa} poder\xE3o ser prorrogados, por igual per\xEDodo, por solicita\xE7\xE3o justificada do adjudicat\xE1rio e aceita pela Administra\xE7\xE3o.

{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 o estabelecido no Termo de Refer\xEAncia.

{\xA7} Na assinatura do contrato ou instrumento equivalente ser\xE1 exigido o Cadastro Informativo de Cr\xE9ditos n\xE3o Quitados do Setor P\xFAblico Federal \u2013 Cadin e a comprova\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o e contrata\xE7\xE3o consignadas neste Edital, que dever\xE3o ser mantidas pelo fornecedor durante a vig\xEAncia do contrato.

{\xA7\xA7} A exist\xEAncia de registro no Cadin constitui fator impeditivo para a contrata\xE7\xE3o.

%% Nota AGU: em contrata\xE7\xE3o de grande vulto (art. 6\xBA, XXII), o vencedor apresenta programa de integridade (art. 25, \xA7 4\xBA; Decreto 12.304/2024; Portaria Normativa SE/CGU 226/2025), considerados o valor original e os aditivos.
{#grande_vulto}{\xA7} Nas contrata\xE7\xF5es de obras, servi\xE7os e fornecimentos de grande vulto, o licitante vencedor dever\xE1 apresentar programa de integridade, no prazo de 6 (seis) meses, contado da celebra\xE7\xE3o do contrato, conforme Decreto n\xBA 12.304, de 9 de dezembro de 2024, e comprovar a sua implanta\xE7\xE3o nos termos da Portaria Normativa SE/CGU n\xBA 226/2025, considerados o valor original do contrato e o valor que poder\xE1 ser alcan\xE7ado por meio de eventuais aditivos contratuais.{/grande_vulto}

{\xA7} Na contrata\xE7\xE3o de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o de capital social integralizado compat\xEDvel com o n\xFAmero de empregados, na forma do art. 4\xBA-B da Lei n\xBA 6.019/1974.

{\xA7\xA7} Caso se trate da contrata\xE7\xE3o de servi\xE7os de vigil\xE2ncia ou transporte de valores com dedica\xE7\xE3o exclusiva de m\xE3o de obra, a empresa dever\xE1 comprovar, como condi\xE7\xE3o para assinatura do contrato, que possui capital social m\xEDnimo integralizado de acordo com os valores estipulados no art. 14 da Lei n.\xBA 14.967/2024.

%% Nota AGU: em servi\xE7os com dedica\xE7\xE3o exclusiva, reservar no m\xEDnimo 8% das vagas a mulheres v\xEDtimas de viol\xEAncia dom\xE9stica (art. 3\xBA do Decreto 11.430/2023); abaixo de 25 colaboradores admite-se percentual inferior; a falta de m\xE3o de obra qualificada n\xE3o caracteriza descumprimento.
{#dedicacao_exclusiva}
{^reserva_vagas.menos_25}{\xA7} Na contrata\xE7\xE3o de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra para contratos com quantitativo igual ou superior a 25 (vinte e cinco) colaboradores, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o, nos termos do disposto no art. 6\xBA, caput, inciso XVI, da Lei n\xBA 14.133, de 1\xBA de abril de 2021, do emprego de m\xE3o de obra constitu\xEDda por mulheres v\xEDtimas de viol\xEAncia dom\xE9stica, a partir da indica\xE7\xE3o do \xF3rg\xE3o respons\xE1vel pela pol\xEDtica p\xFAblica, em percentual igual ou superior a 8% (oito por cento) das vagas.{/reserva_vagas.menos_25}

{#reserva_vagas.menos_25}{\xA7} Considerando que a presente contrata\xE7\xE3o possui quantitativo inferior a vinte e cinco colaboradores, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o, nos termos do disposto no art. 6\xBA, caput, inciso XVI, da Lei n\xBA 14.133, de 1\xBA de abril de 2021, do emprego de m\xE3o de obra constitu\xEDda por mulheres v\xEDtimas de viol\xEAncia dom\xE9stica, a partir da indica\xE7\xE3o do \xF3rg\xE3o respons\xE1vel pela pol\xEDtica p\xFAblica, no percentual de {reserva_vagas.menos_25.percentual}.{/reserva_vagas.menos_25}
{/dedicacao_exclusiva}

%% Nota AGU: se\xE7\xF5es 11 e 12 do modelo, s\xF3 para registro de pre\xE7os.
{#registro_precos}
## {\xA7sec}. DA ATA DE REGISTRO DE PRE\xC7OS

{\xA7} Homologado o resultado da licita\xE7\xE3o, o licitante mais bem classificado ter\xE1 o prazo de {ata.prazo_assinatura} dias, contados a partir da data de sua convoca\xE7\xE3o, para assinar a Ata de Registro de Pre\xE7os, cujo prazo de validade encontra-se nela fixado, sob pena de decad\xEAncia do direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021.

{\xA7} O prazo de convoca\xE7\xE3o poder\xE1 ser prorrogado uma vez, por igual per\xEDodo, mediante solicita\xE7\xE3o do licitante mais bem classificado ou do fornecedor convocado, desde que:

{\xA7\xA7} a solicita\xE7\xE3o seja devidamente justificada e apresentada dentro do prazo; e

{\xA7\xA7} a justificativa apresentada seja aceita pela Administra\xE7\xE3o.

{\xA7} A ata de registro de pre\xE7os ser\xE1 assinada por meio de assinatura digital e disponibilizada no sistema de registro de pre\xE7os.

{\xA7} Ser\xE3o formalizadas tantas Atas de Registro de Pre\xE7os quantas forem necess\xE1rias para o registro de todos os itens constantes no Termo de Refer\xEAncia/Projeto B\xE1sico, com a indica\xE7\xE3o do licitante vencedor, a descri\xE7\xE3o do(s) item(ns), as respectivas quantidades, pre\xE7os registrados e demais condi\xE7\xF5es.

{\xA7} O pre\xE7o registrado, com a indica\xE7\xE3o dos fornecedores, ser\xE1 divulgado no PNCP e disponibilizado durante a vig\xEAncia da ata de registro de pre\xE7os.

{\xA7} A exist\xEAncia de pre\xE7os registrados implicar\xE1 compromisso de fornecimento nas condi\xE7\xF5es estabelecidas, mas n\xE3o obrigar\xE1 a Administra\xE7\xE3o a contratar, facultada a realiza\xE7\xE3o de licita\xE7\xE3o espec\xEDfica para a aquisi\xE7\xE3o pretendida, desde que devidamente justificada.

{\xA7} Na hip\xF3tese de o convocado n\xE3o assinar a ata de registro de pre\xE7os no prazo e nas condi\xE7\xF5es estabelecidas, fica facultado \xE0 Administra\xE7\xE3o convocar os licitantes remanescentes do cadastro de reserva, na ordem de classifica\xE7\xE3o, para faz\xEA-lo em igual prazo e nas condi\xE7\xF5es propostas pelo primeiro classificado.

{\xA7} O prazo de vig\xEAncia da ata de registro de pre\xE7os ser\xE1 de 1 (um) ano e poder\xE1 ser prorrogado, por igual per\xEDodo, desde que comprovado o pre\xE7o vantajoso.

%% Nota AGU: renovar o quantitativo na prorroga\xE7\xE3o da ata s\xF3 com pre\xE7o vantajoso, previs\xE3o no edital e na ata, tema tratado no planejamento e termo aditivo na vig\xEAncia (Parecer 00075/2024/DECOR/CGU/AGU).
{\xA7\xA7} Em caso de prorroga\xE7\xE3o da ata, {#ata.renova_quantitativo}poder\xE1{/ata.renova_quantitativo}{^ata.renova_quantitativo}n\xE3o poder\xE1{/ata.renova_quantitativo} ser renovado o quantitativo originalmente registrado.

## {\xA7sec}. DA FORMA\xC7\xC3O DO CADASTRO DE RESERVA

{\xA7} Ap\xF3s a homologa\xE7\xE3o da licita\xE7\xE3o, ser\xE1 inclu\xEDdo na ata, na forma de anexo, o registro:

{\xA7\xA7} dos licitantes que aceitarem cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio, observada a classifica\xE7\xE3o na licita\xE7\xE3o e exclu\xEDdo o percentual referente \xE0 margem de prefer\xEAncia, quando o objeto n\xE3o atender aos requisitos previstos no art. 26 da Lei n\xBA 14.133, de 2021; e 

{\xA7\xA7} dos licitantes que mantiverem sua proposta original

{\xA7} Ser\xE1 respeitada, nas contrata\xE7\xF5es, a ordem de classifica\xE7\xE3o dos licitantes ou fornecedores registrados na ata.

{\xA7\xA7} A apresenta\xE7\xE3o de novas propostas na forma deste item n\xE3o prejudicar\xE1 o resultado do certame em rela\xE7\xE3o ao licitante mais bem classificado.

{\xA7\xA7} Para fins da ordem de classifica\xE7\xE3o, os licitantes ou fornecedores que aceitarem cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio anteceder\xE3o aqueles que mantiverem sua proposta original.

{\xA7} A habilita\xE7\xE3o dos licitantes que compor\xE3o o cadastro de reserva ser\xE1 efetuada quando houver necessidade de contrata\xE7\xE3o dos licitantes remanescentes, nas seguintes hip\xF3teses:

{\xA7\xA7} quando o licitante vencedor n\xE3o assinar a ata de registro de pre\xE7os no prazo e nas condi\xE7\xF5es estabelecidos no edital; ou

{\xA7\xA7} quando houver o cancelamento do registro do fornecedor ou do registro de pre\xE7os, nas hip\xF3teses previstas nos art. 28 e art. 29 do Decreto n\xBA 11.462, de 2023.

{\xA7} Na hip\xF3tese de nenhum dos licitantes que aceitaram cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio concordar com a contrata\xE7\xE3o nos termos em igual prazo e nas condi\xE7\xF5es propostas pelo primeiro classificado, a Administra\xE7\xE3o, observados o valor estimado e a sua eventual atualiza\xE7\xE3o na forma prevista no edital, poder\xE1:

{\xA7\xA7} convocar os licitantes que mantiveram sua proposta original para negocia\xE7\xE3o, na ordem de classifica\xE7\xE3o, com vistas \xE0 obten\xE7\xE3o de pre\xE7o melhor, mesmo que acima do pre\xE7o do adjudicat\xE1rio; ou

{\xA7\xA7} adjudicar e firmar o contrato nas condi\xE7\xF5es ofertadas pelos licitantes remanescentes, observada a ordem de classifica\xE7\xE3o, quando frustrada a negocia\xE7\xE3o de melhor condi\xE7\xE3o.
{/registro_precos}

## {\xA7sec}. DOS RECURSOS

{\xA7} A interposi\xE7\xE3o de recurso referente ao julgamento das propostas, \xE0 habilita\xE7\xE3o ou inabilita\xE7\xE3o de licitantes, \xE0 anula\xE7\xE3o ou revoga\xE7\xE3o da licita\xE7\xE3o, observar\xE1 o disposto no art. 165 da Lei n\xBA 14.133, de 2021.

{\xA7} O prazo recursal \xE9 de 3 (tr\xEAs) dias \xFAteis, contados da data de intima\xE7\xE3o ou de lavratura da ata.

{\xA7} Quando o recurso apresentado impugnar o julgamento das propostas ou o ato de habilita\xE7\xE3o ou inabilita\xE7\xE3o do licitante:

{\xA7\xA7} a inten\xE7\xE3o de recorrer dever\xE1 ser manifestada imediatamente, sob pena de preclus\xE3o;

{\xA7\xA7} o prazo para a manifesta\xE7\xE3o da inten\xE7\xE3o de recorrer n\xE3o ser\xE1 inferior a 10 (dez) minutos.

{\xA7\xA7} o prazo para apresenta\xE7\xE3o das raz\xF5es recursais ser\xE1 iniciado na data de intima\xE7\xE3o ou de lavratura da ata de habilita\xE7\xE3o ou inabilita\xE7\xE3o;

{\xA7\xA7} na hip\xF3tese de ado\xE7\xE3o da invers\xE3o de fases prevista no \xA7 1\xBA do art. 17 da Lei n\xBA 14.133, de 2021, o prazo para apresenta\xE7\xE3o das raz\xF5es recursais ser\xE1 iniciado na data de intima\xE7\xE3o da ata de julgamento.

{\xA7} Os recursos dever\xE3o ser encaminhados em campo pr\xF3prio do sistema.

{\xA7} O recurso ser\xE1 dirigido \xE0 autoridade que tiver editado o ato ou proferido a decis\xE3o recorrida, a qual poder\xE1 reconsiderar sua decis\xE3o no prazo de 3 (tr\xEAs) dias \xFAteis, ou, nesse mesmo prazo, encaminhar recurso para a autoridade superior, a qual dever\xE1 proferir sua decis\xE3o no prazo de 10 (dez) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Os recursos interpostos fora do prazo n\xE3o ser\xE3o conhecidos.

{\xA7} O prazo para apresenta\xE7\xE3o de contrarraz\xF5es ao recurso pelos demais licitantes ser\xE1 de 3 (tr\xEAs) dias \xFAteis, contados da data da intima\xE7\xE3o pessoal ou da divulga\xE7\xE3o da interposi\xE7\xE3o do recurso, assegurada a vista imediata dos elementos indispens\xE1veis \xE0 defesa de seus interesses.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o ter\xE3o efeito suspensivo do ato ou da decis\xE3o recorrida at\xE9 que sobrevenha decis\xE3o final da autoridade competente.

{\xA7} O acolhimento do recurso invalida t\xE3o somente os atos insuscet\xEDveis de aproveitamento.

{\xA7} Os autos do processo permanecer\xE3o com vista franqueada aos interessados no s\xEDtio eletr\xF4nico {licitacao.sitio_autos}.

## {\xA7sec}. DAS INFRA\xC7\xD5ES ADMINISTRATIVAS E SAN\xC7\xD5ES

{\xA7} Comete infra\xE7\xE3o administrativa, nos termos da lei, o licitante que, com dolo ou culpa:

{\xA7\xA7@inf_documentacao} deixar de entregar a documenta\xE7\xE3o exigida para o certame ou n\xE3o entregar qualquer documento que tenha sido solicitado pelo {conducao.agente} durante o certame;

{\xA7\xA7@inf_proposta} salvo em decorr\xEAncia de fato superveniente devidamente justificado, n\xE3o mantiver a proposta em especial quando:

{\xA7\xA7\xA7} n\xE3o enviar a proposta adequada ao \xFAltimo lance ofertado ou ap\xF3s a negocia\xE7\xE3o;

{\xA7\xA7\xA7} recusar-se a enviar o detalhamento da proposta quando exig\xEDvel;

{\xA7\xA7\xA7} pedir para ser desclassificado quando encerrada a etapa competitiva;

{\xA7\xA7\xA7} deixar de apresentar amostra;

{\xA7\xA7\xA7} apresentar proposta ou amostra em desacordo com as especifica\xE7\xF5es do edital.

{\xA7\xA7@inf_contrato} n\xE3o celebrar o contrato ou n\xE3o entregar a documenta\xE7\xE3o exigida para a contrata\xE7\xE3o, quando convocado dentro do prazo de validade de sua proposta;

{\xA7\xA7@inf_recusa} recusar-se, sem justificativa, a assinar o contrato ou a ata de registro de pre\xE7o, ou a aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o;

{\xA7\xA7@inf_declaracao} apresentar declara\xE7\xE3o ou documenta\xE7\xE3o falsa exigida para o certame ou prestar declara\xE7\xE3o falsa durante a licita\xE7\xE3o;

{\xA7\xA7@inf_fraude} fraudar a licita\xE7\xE3o;

{\xA7\xA7@inf_inidoneo} comportar-se de modo inid\xF4neo ou cometer fraude de qualquer natureza, em especial quando:

{\xA7\xA7\xA7} agir em conluio ou em desconformidade com a lei;

{\xA7\xA7\xA7} induzir deliberadamente a erro no julgamento;

{\xA7\xA7\xA7} apresentar amostra falsificada ou deteriorada.

{\xA7\xA7@inf_ilicito} praticar atos il\xEDcitos com vistas a frustrar os objetivos da licita\xE7\xE3o;

{\xA7\xA7@inf_ato_lesivo} praticar ato lesivo previsto no art. 5\xBA da Lei n\xBA 12.846, de 2013.

{\xA7} Com fulcro na Lei n\xBA 14.133, de 2021, a Administra\xE7\xE3o poder\xE1, ap\xF3s regular processo administrativo, garantida a pr\xE9via defesa, aplicar aos licitantes e/ou adjudicat\xE1rios as seguintes san\xE7\xF5es, sem preju\xEDzo das responsabilidades civil e criminal:

{\xA7\xA7} advert\xEAncia;

{\xA7\xA7} multa;

{\xA7\xA7} impedimento de licitar e contratar e

{\xA7\xA7} declara\xE7\xE3o de inidoneidade para licitar ou contratar, enquanto perdurarem os motivos determinantes da puni\xE7\xE3o ou at\xE9 que seja promovida sua reabilita\xE7\xE3o perante a pr\xF3pria autoridade que aplicou a penalidade.

{\xA7} Na aplica\xE7\xE3o das san\xE7\xF5es ser\xE3o considerados:

{\xA7\xA7} a natureza e a gravidade da infra\xE7\xE3o cometida;

{\xA7\xA7} as peculiaridades do caso concreto;

{\xA7\xA7} as circunst\xE2ncias agravantes ou atenuantes;

{\xA7\xA7} os danos que dela provierem para a Administra\xE7\xE3o P\xFAblica;

{\xA7\xA7} a implanta\xE7\xE3o ou o aperfei\xE7oamento de programa de integridade, conforme normas e orienta\xE7\xF5es dos \xF3rg\xE3os de controle.

%% Nota AGU: a multa fica entre 0,5% e 30% do valor do contrato licitado (art. 156, \xA7 3\xBA), proporcional \xE0 gravidade da infra\xE7\xE3o.
{\xA7} A multa ser\xE1 recolhida no prazo m\xE1ximo de {multa.prazo_recolhimento} dias \xFAteis, a contar da comunica\xE7\xE3o oficial.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_proposta} e {\xA7ref@inf_contrato}, a multa ser\xE1 de {multa.leve_min} a {multa.leve_max} do valor do contrato licitado.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf_recusa}, {\xA7ref@inf_declaracao}, {\xA7ref@inf_fraude}, {\xA7ref@inf_inidoneo}, {\xA7ref@inf_ilicito} e {\xA7ref@inf_ato_lesivo}, a multa ser\xE1 de {multa.grave_min} a {multa.grave_max} do valor do contrato licitado.

{\xA7} As san\xE7\xF5es de advert\xEAncia, impedimento de licitar e contratar e declara\xE7\xE3o de inidoneidade para licitar ou contratar poder\xE3o ser aplicadas, cumulativamente ou n\xE3o, \xE0 penalidade de multa.

{\xA7} Na aplica\xE7\xE3o da san\xE7\xE3o de multa ser\xE1 facultada a defesa do interessado no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o.

{\xA7} A san\xE7\xE3o de impedimento de licitar e contratar ser\xE1 aplicada ao respons\xE1vel em decorr\xEAncia das infra\xE7\xF5es administrativas relacionadas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_proposta}, {\xA7ref@inf_contrato} e {\xA7ref@inf_recusa}, quando n\xE3o se justificar a imposi\xE7\xE3o de penalidade mais grave, e impedir\xE1 o respons\xE1vel de licitar e contratar no \xE2mbito da Administra\xE7\xE3o P\xFAblica direta e indireta do ente federativo a qual pertencer o \xF3rg\xE3o ou entidade, pelo prazo m\xE1ximo de 3 (tr\xEAs) anos.

{\xA7} Poder\xE1 ser aplicada ao respons\xE1vel a san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar, em decorr\xEAncia da pr\xE1tica das infra\xE7\xF5es dispostas nos itens {\xA7ref@inf_declaracao}, {\xA7ref@inf_fraude}, {\xA7ref@inf_inidoneo}, {\xA7ref@inf_ilicito} e {\xA7ref@inf_ato_lesivo}, bem como pelas infra\xE7\xF5es administrativas previstas nos itens {\xA7ref@inf_documentacao}, {\xA7ref@inf_proposta}, {\xA7ref@inf_contrato} e {\xA7ref@inf_recusa} que justifiquem a imposi\xE7\xE3o de penalidade mais grave que a san\xE7\xE3o de impedimento de licitar e contratar, cuja dura\xE7\xE3o observar\xE1 o prazo previsto no art. 156, \xA75\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7} A recusa injustificada do adjudicat\xE1rio em assinar o contrato ou a ata de registro de pre\xE7o, ou em aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o, descrita no item {\xA7ref@inf_recusa}, caracterizar\xE1 o descumprimento total da obriga\xE7\xE3o assumida e o sujeitar\xE1 \xE0s penalidades e \xE0 imediata perda da garantia de proposta em favor do \xF3rg\xE3o ou entidade promotora da licita\xE7\xE3o, nos termos do art. 45, \xA74\xBA da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022.

{\xA7} A apura\xE7\xE3o de responsabilidade relacionadas \xE0s san\xE7\xF5es de impedimento de licitar e contratar e de declara\xE7\xE3o de inidoneidade para licitar ou contratar demandar\xE1 a instaura\xE7\xE3o de processo de responsabiliza\xE7\xE3o a ser conduzido por comiss\xE3o composta por 2 (dois) ou mais servidores est\xE1veis, que avaliar\xE1 fatos e circunst\xE2ncias conhecidos e intimar\xE1 o licitante ou o adjudicat\xE1rio para, no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o, apresentar defesa escrita e especificar as provas que pretenda produzir.

{\xA7} Caber\xE1 recurso no prazo de 15 (quinze) dias \xFAteis da aplica\xE7\xE3o das san\xE7\xF5es de advert\xEAncia, multa e impedimento de licitar e contratar, contado da data da intima\xE7\xE3o, o qual ser\xE1 dirigido \xE0 autoridade que tiver proferido a decis\xE3o recorrida, que, se n\xE3o a reconsiderar no prazo de 5 (cinco) dias \xFAteis, encaminhar\xE1 o recurso com sua motiva\xE7\xE3o \xE0 autoridade superior, que dever\xE1 proferir sua decis\xE3o no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Caber\xE1 a apresenta\xE7\xE3o de pedido de reconsidera\xE7\xE3o da aplica\xE7\xE3o da san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar no prazo de 15 (quinze) dias \xFAteis, contado da data da intima\xE7\xE3o, e decidido no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do seu recebimento.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o ter\xE3o efeito suspensivo do ato ou da decis\xE3o recorrida at\xE9 que sobrevenha decis\xE3o final da autoridade competente.

{\xA7} A aplica\xE7\xE3o das san\xE7\xF5es previstas neste edital n\xE3o exclui, em hip\xF3tese alguma, a obriga\xE7\xE3o de repara\xE7\xE3o integral dos danos causados.

{\xA7} Para a garantia da ampla defesa e contradit\xF3rio dos licitantes, as notifica\xE7\xF5es ser\xE3o enviadas eletronicamente para os endere\xE7os de e-mail informados na proposta comercial, bem como os cadastrados pela empresa no Sicaf.

{\xA7\xA7} Os endere\xE7os de e-mail informados na proposta comercial e/ou cadastrados no Sicaf ser\xE3o considerados de uso cont\xEDnuo da empresa, n\xE3o cabendo alega\xE7\xE3o de desconhecimento das comunica\xE7\xF5es a eles comprovadamente enviadas.

## {\xA7sec}. DA IMPUGNA\xC7\xC3O AO EDITAL E DO PEDIDO DE ESCLARECIMENTO

{\xA7} Qualquer pessoa \xE9 parte leg\xEDtima para impugnar este Edital por irregularidade na aplica\xE7\xE3o da Lei n\xBA 14.133, de 2021, devendo protocolar o pedido at\xE9 3 (tr\xEAs)\xA0dias \xFAteis antes da data da abertura do certame.

{\xA7} A resposta \xE0 impugna\xE7\xE3o ou ao pedido de esclarecimento ser\xE1 divulgado em s\xEDtio eletr\xF4nico oficial no prazo de at\xE9 3 (tr\xEAs) dias \xFAteis, limitado ao \xFAltimo dia \xFAtil anterior \xE0 data da abertura do certame.

%% Nota AGU: indicar os meios de recep\xE7\xE3o das impugna\xE7\xF5es e pedidos de esclarecimento.
{\xA7} A impugna\xE7\xE3o e o pedido de esclarecimento poder\xE3o ser realizados por forma eletr\xF4nica, pelos seguintes meios: {impugnacao.meios}.

{\xA7} As impugna\xE7\xF5es e pedidos de esclarecimentos n\xE3o suspendem os prazos previstos no certame.

{\xA7} A concess\xE3o de efeito suspensivo \xE0 impugna\xE7\xE3o \xE9 medida excepcional e dever\xE1 ser motivada pelo {conducao.agente}, nos autos do processo de licita\xE7\xE3o.

{\xA7} Acolhida a impugna\xE7\xE3o, ser\xE1 definida e publicada nova data para a realiza\xE7\xE3o do certame.

## {\xA7sec}. DAS DISPOSI\xC7\xD5ES GERAIS

{\xA7} Ser\xE1 divulgada ata da sess\xE3o p\xFAblica no sistema eletr\xF4nico.

{\xA7} N\xE3o havendo expediente ou ocorrendo qualquer fato superveniente que impe\xE7a a realiza\xE7\xE3o do certame na data marcada, a sess\xE3o ser\xE1 automaticamente transferida para o primeiro dia \xFAtil subsequente, no mesmo hor\xE1rio anteriormente estabelecido, desde que n\xE3o haja comunica\xE7\xE3o em contr\xE1rio, pelo {conducao.agente}.

{\xA7} Todas as refer\xEAncias de tempo no Edital, no aviso e durante a sess\xE3o p\xFAblica observar\xE3o o hor\xE1rio de Bras\xEDlia - DF.

{\xA7} A homologa\xE7\xE3o do resultado desta licita\xE7\xE3o n\xE3o implicar\xE1 direito \xE0 contrata\xE7\xE3o.

{\xA7} As normas disciplinadoras da licita\xE7\xE3o ser\xE3o sempre interpretadas em favor da amplia\xE7\xE3o da disputa entre os interessados, desde que n\xE3o comprometam o interesse da Administra\xE7\xE3o, o princ\xEDpio da isonomia, a finalidade e a seguran\xE7a da contrata\xE7\xE3o.

{\xA7} Os licitantes assumem todos os custos de prepara\xE7\xE3o e apresenta\xE7\xE3o de suas propostas e a Administra\xE7\xE3o n\xE3o ser\xE1, em nenhum caso, respons\xE1vel por esses custos, independentemente da condu\xE7\xE3o ou do resultado do processo licitat\xF3rio.

{\xA7} Na contagem dos prazos estabelecidos neste Edital e seus Anexos, excluir-se-\xE1 o dia do in\xEDcio e incluir-se-\xE1 o do vencimento. S\xF3 se iniciam e vencem os prazos em dias de expediente na Administra\xE7\xE3o.

{\xA7} O desatendimento de exig\xEAncias formais n\xE3o essenciais n\xE3o importar\xE1 o afastamento do licitante, desde que seja poss\xEDvel o aproveitamento do ato, observados os princ\xEDpios da isonomia e do interesse p\xFAblico.

{\xA7} Em caso de diverg\xEAncia entre disposi\xE7\xF5es deste Edital e de seus anexos ou demais pe\xE7as que comp\xF5em o processo, prevalecer\xE1 as deste Edital.

{\xA7} O Edital e seus anexos est\xE3o dispon\xEDveis, na \xEDntegra, no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP) e endere\xE7o eletr\xF4nico {licitacao.sitio_edital}.

{\xA7} Integram este Edital, para todos os fins e efeitos, os seguintes anexos:

{\xA7\xA7} Anexo I - Termo de Refer\xEAncia;

{\xA7\xA7\xA7} Ap\xEAndice do Anexo I \u2013 Estudo T\xE9cnico Preliminar;

%% Anexos conforme o caso (Projeto B\xE1sico, Minuta de Termo de Contrato, Minuta de Ata de Registro de Pre\xE7os, regras do instrumento substitutivo, Termo de Ci\xEAncia e concord\xE2ncia, Declara\xE7\xE3o de Responsabilidade pelo enquadramento sindical \u2014 Anexo VII-C da IN SEGES 176/2024, em servi\xE7os com dedica\xE7\xE3o exclusiva), numerados a partir do Anexo II.
{*edital.anexos}{\xA7\xA7} {.valor};

{/edital.anexos}
{local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
`,"agu-edital-tecnica-preco":`@requer regime=14133
@fonte agu-edital-tecnica-preco
%% Modelo AGU/CGU (Lei 14.133) \u2014 texto preto sem altera\xE7\xE3o; s\xF3 o vermelho foi adaptado ao CFC.
@cabecalho

%% Capa do modelo. AGU: prazo m\xEDnimo para propostas em t\xE9cnica e pre\xE7o de 35 dias \xFAteis (art. 55, IV, a) e de 60 dias \xFAteis na contrata\xE7\xE3o integrada (art. 55, II, d).
> CONCORR\xCANCIA
> {licitacao.numero}/{licitacao.ano}
> CONTRATANTE (UASG)
> ({cfc.uasg})
> OBJETO
> {objeto_curto|maiusculas}
> VALOR TOTAL DA CONTRATA\xC7\xC3O
> {^orcamento_sigiloso}R$ {valor_global}{/orcamento_sigiloso}{#orcamento_sigiloso}Sigiloso{/orcamento_sigiloso}
> DATA DA SESS\xC3O P\xDABLICA
> Dia {sessao.data} \xE0s {sessao.hora}h (hor\xE1rio de Bras\xEDlia)
> Crit\xE9rio de Julgamento:
> T\xE9cnica e pre\xE7o
> Modo de disputa:
> Fechado.
> PREFER\xCANCIA ME/EPP/EQUIPARADAS
> {#preferencia_me_epp}SIM{/preferencia_me_epp}{^preferencia_me_epp}N\xC3O{/preferencia_me_epp}
> MARGEM DE PREFER\xCANCIA PARA ALGUM ITEM
> {#margem_preferencia}SIM{/margem_preferencia}{^margem_preferencia}N\xC3O{/margem_preferencia}

# CONCORR\xCANCIA N\xBA {licitacao.numero}/{licitacao.ano}

> (Processo Administrativo n\xB0 {processo})

Torna-se p\xFAblico que o(a) {cfc.nome}, por meio do(a) {cfc.setor_licitacoes}, sediado(a) {cfc.sede}, realizar\xE1 licita\xE7\xE3o, na modalidade CONCORR\xCANCIA na forma ELETR\xD4NICA, nos termos da Lei n\xBA 14.133, de 1\xBA de abril de 2021 e demais legisla\xE7\xE3o aplic\xE1vel e, ainda, de acordo com as condi\xE7\xF5es estabelecidas neste Edital.

## {\xA7sec}. DO OBJETO

{\xA7} O objeto da presente licita\xE7\xE3o \xE9 {licitacao.objeto}, conforme condi\xE7\xF5es, quantidades e exig\xEAncias estabelecidas neste Edital e seus anexos.

%% AGU: indicar a divis\xE3o do objeto (itens, item \xFAnico, grupos, grupo \xFAnico ou itens e grupos); em grupo \xFAnico com registro de pre\xE7os, fixar crit\xE9rio de aceitabilidade dos pre\xE7os unit\xE1rios m\xE1ximos (art. 13, I, do Decreto 11.462/2023).
{#divisao.itens}{\xA7} A licita\xE7\xE3o ser\xE1 dividida em itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico, facultando-se ao licitante a participa\xE7\xE3o em quantos itens forem de seu interesse.{/divisao.itens}

{#divisao.item_unico}{\xA7} A licita\xE7\xE3o ser\xE1 realizada em \xFAnico item.{/divisao.item_unico}

{#divisao.grupos}{\xA7} A licita\xE7\xE3o ser\xE1 dividida em grupos, formados por um ou mais itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico, facultando-se ao licitante a participa\xE7\xE3o em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os comp\xF5em.{/divisao.grupos}

{#divisao.grupo_unico}{\xA7} A licita\xE7\xE3o ser\xE1 realizada em grupo \xFAnico, formado por {divisao.grupo_unico.qtd_itens} itens, conforme tabela constante no Termo de Refer\xEAncia/Projeto B\xE1sico, devendo o licitante oferecer proposta para todos os itens que o comp\xF5em.{/divisao.grupo_unico}

{#divisao.itens_e_grupos}{\xA7} A licita\xE7\xE3o ser\xE1 dividida em item(s) e grupo(s), sendo este(s) \xFAltimo(s) formado(s) por dois ou mais itens, conforme tabela constante do Termo de Refer\xEAncia/Projeto B\xE1sico.

{\xA7\xA7} relativamente ao(s) item(s) isolado(s), faculta-se ao licitante a participa\xE7\xE3o em quantos itens forem de seu interesse;

{\xA7\xA7} relativamente ao(s) grupo(s), faculta-se ao licitante a participa\xE7\xE3o em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os comp\xF5em.{/divisao.itens_e_grupos}

## {\xA7sec}. DA PARTICIPA\xC7\xC3O NA LICITA\xC7\xC3O

{\xA7} Poder\xE3o participar deste certame os interessados previamente credenciados no Sistema de Cadastramento Unificado de Fornecedores - SICAF e no Sistema de Compras do Governo Federal (www.gov.br/compras).

{\xA7} Os interessados dever\xE3o atender \xE0s condi\xE7\xF5es exigidas no cadastramento no Sicaf at\xE9 o terceiro dia \xFAtil anterior \xE0 data prevista para recebimento das propostas.

{\xA7} O licitante responsabiliza-se exclusiva e formalmente pelas transa\xE7\xF5es efetuadas em seu nome, assume como firmes e verdadeiras suas propostas, inclusive os atos praticados diretamente ou por seu representante, exclu\xEDda a responsabilidade do provedor do sistema ou do \xF3rg\xE3o ou entidade promotora da licita\xE7\xE3o por eventuais danos decorrentes de uso indevido das credenciais de acesso, ainda que por terceiros.

{\xA7} \xC9 de responsabilidade do cadastrado conferir a exatid\xE3o dos seus dados cadastrais nos Sistemas relacionados no item anterior e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

%% AGU: itens exclusivos ME/EPP s\xF3 em raz\xE3o do valor (art. 48 da LC 123); n\xE3o se aplica a item cujo valor supere a receita bruta m\xE1xima de EPP (art. 4\xBA, \xA7 1\xBA, da Lei 14.133; valor anual se vig\xEAncia > 1 ano).
{#exclusiva_me_epp}{\xA7} Para os itens {exclusiva_me_epp.itens}, a participa\xE7\xE3o \xE9 exclusiva a microempresas e empresas de pequeno porte, nos termos do art. 48 da Lei Complementar n\xBA 123, de 14 de dezembro de 2006.

{\xA7} A obten\xE7\xE3o do benef\xEDcio a que se refere o item anterior fica limitada \xE0s microempresas e \xE0s empresas de pequeno porte que, no ano-calend\xE1rio de realiza\xE7\xE3o da licita\xE7\xE3o, ainda n\xE3o tenham celebrado contratos com a Administra\xE7\xE3o P\xFAblica cujos valores somados extrapolem a receita bruta m\xE1xima admitida para fins de enquadramento como empresa de pequeno porte.{/exclusiva_me_epp}

%% AGU: ajustar conforme cada item/lote se enquadre ou n\xE3o no limite do art. 4\xBA, \xA7 1\xBA \u2014 tratamento favorecido (1\xBA par\xE1grafo) e/ou itens em que ele \xE9 afastado (2\xBA par\xE1grafo).
{#preferencia_me_epp}{\xA7} Ser\xE1 concedido tratamento favorecido para as microempresas e empresas de pequeno porte, para as sociedades cooperativas mencionadas no artigo 16 da Lei n\xBA 14.133, de 2021, para o agricultor familiar, o produtor rural pessoa f\xEDsica e para o microempreendedor individual - MEI, nos limites previstos da Lei Complementar n\xBA 123, de 2006 e do Decreto n\xBA 8.538, de 2015.{/preferencia_me_epp}

{#me_epp.itens_sem_tratamento}{\xA7} Nos itens {me_epp.itens_sem_tratamento} n\xE3o ser\xE1 concedido nesta Licita\xE7\xE3o tratamento favorecido para microempresas, empresas de pequeno porte e figuras equiparadas, nos termos da Lei Complementar n\xBA 123, de 2006, em raz\xE3o da incid\xEAncia, no caso, do art. 4\xBA, \xA7 1\xBA da Lei n\xBA 14.133, de 2021.{/me_epp.itens_sem_tratamento}

{\xA7@nao_disputar} N\xE3o poder\xE3o disputar esta licita\xE7\xE3o:

{\xA7\xA7} aquele que n\xE3o atenda \xE0s condi\xE7\xF5es deste Edital e seu(s) anexo(s);

{\xA7\xA7} sociedade que desempenhe atividade incompat\xEDvel com o objeto da licita\xE7\xE3o;

{\xA7\xA7} empresas estrangeiras que n\xE3o tenham representa\xE7\xE3o legal no Brasil com poderes expressos para receber cita\xE7\xE3o e responder administrativa ou judicialmente;

{\xA7\xA7@autor_projeto} autor do anteprojeto, do projeto b\xE1sico ou do projeto executivo, pessoa f\xEDsica ou jur\xEDdica, quando a licita\xE7\xE3o versar sobre servi\xE7os ou fornecimento de bens a ele relacionados;

{\xA7\xA7@empresa_projeto} empresa, isoladamente ou em cons\xF3rcio, respons\xE1vel pela elabora\xE7\xE3o do projeto b\xE1sico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, respons\xE1vel t\xE9cnico ou subcontratado, quando a licita\xE7\xE3o versar sobre servi\xE7os ou fornecimento de bens a ela necess\xE1rios;

{\xA7\xA7@sancao} pessoa f\xEDsica ou jur\xEDdica que se encontre, ao tempo da licita\xE7\xE3o, impossibilitada de participar da licita\xE7\xE3o em decorr\xEAncia de san\xE7\xE3o que lhe foi imposta;

{\xA7\xA7} aquele que mantenha v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que desempenhe fun\xE7\xE3o na licita\xE7\xE3o ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau;

{\xA7\xA7} empresas controladoras, controladas ou coligadas, nos termos da Lei n\xBA 6.404, de 1976, concorrendo entre si;

{\xA7\xA7} pessoa f\xEDsica ou jur\xEDdica que, nos 5 (cinco) anos anteriores \xE0 divulga\xE7\xE3o do edital, tenha sido condenada judicialmente, com tr\xE2nsito em julgado, por explora\xE7\xE3o de trabalho infantil, por submiss\xE3o de trabalhadores a condi\xE7\xF5es an\xE1logas \xE0s de escravo ou por contrata\xE7\xE3o de adolescentes nos casos vedados pela legisla\xE7\xE3o trabalhista;

{\xA7\xA7} Organiza\xE7\xF5es da Sociedade Civil de Interesse P\xFAblico - OSCIP, atuando nessa condi\xE7\xE3o;

%% AGU: vedar cooperativas s\xF3 em servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra fora do art. 10 da IN SEGES 5/2017 (Parecer 2/2023/DECOR/CGU/AGU).
{#vedadas_cooperativas}{\xA7\xA7} sociedades cooperativas;{/vedadas_cooperativas}

%% AGU: vedar cons\xF3rcio \xE9 exce\xE7\xE3o e exige justificativa (art. 15, caput, da Lei 14.133).
{#vedado_consorcio}{\xA7\xA7} pessoas jur\xEDdicas reunidas em cons\xF3rcio;{/vedado_consorcio}

{\xA7\xA7} pessoas f\xEDsicas.

{\xA7@agente_publico} N\xE3o poder\xE1 participar, direta ou indiretamente, da licita\xE7\xE3o ou da execu\xE7\xE3o do contrato agente p\xFAblico do \xF3rg\xE3o ou entidade contratante, devendo ser observadas as situa\xE7\xF5es que possam configurar conflito de interesses no exerc\xEDcio ou ap\xF3s o exerc\xEDcio do cargo ou emprego, nos termos da legisla\xE7\xE3o que disciplina a mat\xE9ria, conforme \xA7 1\xBA do art. 9\xBA da Lei n\xBA 14.133, de 2021.

{\xA7} O impedimento de que trata o item {\xA7ref@sancao} ser\xE1 tamb\xE9m aplicado ao licitante que atue em substitui\xE7\xE3o a outra pessoa, f\xEDsica ou jur\xEDdica, com o intuito de burlar a efetividade da san\xE7\xE3o a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o il\xEDcito ou a utiliza\xE7\xE3o fraudulenta da personalidade jur\xEDdica do licitante.

{\xA7} A crit\xE9rio da Administra\xE7\xE3o e exclusivamente a seu servi\xE7o, o autor dos projetos e a empresa a que se referem os itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} poder\xE3o participar no apoio das atividades de planejamento da contrata\xE7\xE3o, de execu\xE7\xE3o da licita\xE7\xE3o ou de gest\xE3o do contrato, desde que sob supervis\xE3o exclusiva de agentes p\xFAblicos do \xF3rg\xE3o ou entidade.

{\xA7} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econ\xF4mico.

{\xA7} O disposto nos itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} n\xE3o impede a licita\xE7\xE3o ou a contrata\xE7\xE3o de servi\xE7o que inclua como encargo do contratado a elabora\xE7\xE3o do projeto b\xE1sico e do projeto executivo, nas contrata\xE7\xF5es integradas, e do projeto executivo, nos demais regimes de execu\xE7\xE3o.

{\xA7} Em licita\xE7\xF5es e contrata\xE7\xF5es realizadas no \xE2mbito de projetos e programas parcialmente financiados por ag\xEAncia oficial de coopera\xE7\xE3o estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, n\xE3o poder\xE1 participar pessoa f\xEDsica ou jur\xEDdica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inid\xF4nea nos termos da Lei n\xBA 14.133, de 2021.

{\xA7} A veda\xE7\xE3o de que trata o item {\xA7ref@agente_publico} estende-se a terceiro que auxilie a condu\xE7\xE3o da contrata\xE7\xE3o na qualidade de integrante de equipe de apoio, profissional especializado ou funcion\xE1rio ou representante de empresa que preste assessoria t\xE9cnica.

## {\xA7sec}. DO OR\xC7AMENTO ESTIMADO

%% Or\xE7amento estimado: p\xFAblico ou sigiloso (art. 24 da Lei 14.133); a se\xE7\xE3o fica sempre, com uma das reda\xE7\xF5es.
{^orcamento_sigiloso}{\xA7} O or\xE7amento estimado da presente contrata\xE7\xE3o n\xE3o ser\xE1 de car\xE1ter sigiloso.{/orcamento_sigiloso}

{#orcamento_sigiloso}{\xA7} O or\xE7amento estimado da presente contrata\xE7\xE3o ser\xE1 de car\xE1ter sigiloso.

{\xA7} Para fins do disposto no item anterior, o or\xE7amento estimado para a contrata\xE7\xE3o n\xE3o ser\xE1 tornado p\xFAblico antes de definido o resultado do julgamento das propostas.

{\xA7} O car\xE1ter sigiloso do or\xE7amento estimado para a contrata\xE7\xE3o n\xE3o prevalecer\xE1 para os \xF3rg\xE3os de controle interno e externo.{/orcamento_sigiloso}

## {\xA7sec}. DA APRESENTA\xC7\xC3O DA PROPOSTA E DOS DOCUMENTOS DE HABILITA\xC7\xC3O

%% AGU: a habilita\xE7\xE3o pode anteceder as propostas por ato motivado (art. 17, \xA7 1\xBA); o sistema ainda n\xE3o oferece a op\xE7\xE3o.
{\xA7} {^habilitacao.antecede}Na presente licita\xE7\xE3o, a fase de habilita\xE7\xE3o suceder\xE1 as fases de apresenta\xE7\xE3o de propostas e de julgamento.{/habilitacao.antecede}{#habilitacao.antecede}Na presente licita\xE7\xE3o, a fase de habilita\xE7\xE3o anteceder\xE1 as fases de apresenta\xE7\xE3o de propostas e de julgamento.{/habilitacao.antecede}

{\xA7} Os licitantes encaminhar\xE3o, exclusivamente por meio do sistema eletr\xF4nico, as propostas de t\xE9cnica e as propostas de pre\xE7o at\xE9 a data e o hor\xE1rio estabelecidos para abertura da sess\xE3o p\xFAblica.

{\xA7} Caso a fase de habilita\xE7\xE3o anteceda as fases de apresenta\xE7\xE3o de propostas, os licitantes encaminhar\xE3o, na forma e no prazo estabelecidos no item anterior, simultaneamente os documentos de habilita\xE7\xE3o, a proposta de t\xE9cnica e a proposta de pre\xE7o, observado o disposto no item {\xA7ref@sicaf} deste Edital.

%% "Cap\xEDtulo 6" \xE9 n\xFAmero fixo do modelo: as se\xE7\xF5es 1 a 5 nunca saem do edital.
{\xA7\xA7} Na hip\xF3tese acima, n\xE3o haver\xE1 ordem de classifica\xE7\xE3o na etapa de apresenta\xE7\xE3o da proposta e dos documentos de habilita\xE7\xE3o pelo licitante, o que ocorrer\xE1 somente ap\xF3s os procedimentos de que trata o Cap\xEDtulo 6 deste Edital.

{\xA7@declaracoes} No cadastramento da proposta de t\xE9cnica e da proposta de pre\xE7o, o licitante declarar\xE1, em campo pr\xF3prio do sistema, que:

{\xA7\xA7} est\xE1 ciente e concorda com as condi\xE7\xF5es contidas no edital e seus anexos, bem como de que a proposta de t\xE9cnica e da proposta de pre\xE7o apresentadas compreendem a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de sua entrega em definitivo e que cumpre plenamente os requisitos de habilita\xE7\xE3o definidos no instrumento convocat\xF3rio;

{\xA7\xA7} n\xE3o emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e n\xE3o emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condi\xE7\xE3o de aprendiz, nos termos do artigo 7\xB0, XXXIII, da Constitui\xE7\xE3o;

{\xA7\xA7} n\xE3o possui empregados executando trabalho degradante ou for\xE7ado, observando o disposto nos incisos III e IV do art. 1\xBA e no inciso III do art. 5\xBA da Constitui\xE7\xE3o Federal;

{\xA7\xA7} cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O licitante organizado em cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 16 da Lei n\xBA 14.133, de 2021.

%% Margem de prefer\xEAncia (art. 26; Decreto 11.890/2024): aplicar se o objeto ou item estiver em resolu\xE7\xE3o da CICS; trechos em verde no modelo.
{#margem_preferencia}{\xA7} O licitante dever\xE1 declarar em campo pr\xF3prio do sistema se o produto ou servi\xE7o ofertado \xE9 manufaturado nacional beneficiado por um dos crit\xE9rios de margem de prefer\xEAncia indicados no Termo de Refer\xEAncia, quando for o caso, para usufruir do benef\xEDcio.{/margem_preferencia}

{\xA7} No caso das empresas que foram beneficiadas pela Lei n\xBA 12.546, de 2011, as propostas de pre\xE7os dever\xE3o ser apresentadas com as al\xEDquotas em vigor, nos termos da Lei n\xBA 14.973, de 2024, aplic\xE1veis para o ano de apresenta\xE7\xE3o da proposta.

{\xA7\xA7} A pedido da empresa contratada, o pre\xE7o do contrato poder\xE1 ser revisto, nos termos do art. 134 c/c art. 136, I, da Lei n\xBA 14.133, de 2021, ap\xF3s efetiva majora\xE7\xE3o das al\xEDquotas, conforme regime de transi\xE7\xE3o previsto no art. 9\xBAA e 9\xBA-B da Lei n\xBA 12.546, de 2011, com a reda\xE7\xE3o dada pela Lei n\xBA 14.973, de 2024.

{\xA7@declaracao_me_epp} O fornecedor enquadrado como microempresa, empresa de pequeno porte ou sociedade cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 3\xB0 da Lei Complementar n\xBA 123, de 2006, estando apto a usufruir do tratamento favorecido estabelecido em seus arts. 42 a 49, observado o disposto nos \xA7\xA7 1\xBA ao 3\xBA do art. 4\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} No item exclusivo para participa\xE7\xE3o de microempresas e empresas de pequeno porte, a assinala\xE7\xE3o do campo \u201Cn\xE3o\u201D impedir\xE1 o prosseguimento no certame, para aquele item;

{\xA7\xA7} Nos itens em que a participa\xE7\xE3o n\xE3o for exclusiva para microempresas e empresas de pequeno porte, a assinala\xE7\xE3o do campo \u201Cn\xE3o\u201D apenas produzir\xE1 o efeito de o licitante n\xE3o ter direito ao tratamento favorecido previsto na Lei Complementar n\xBA 123, de 2006, mesmo que microempresa, empresa de pequeno porte ou sociedade cooperativa.

{\xA7} N\xE3o poder\xE1 se beneficiar do tratamento jur\xEDdico diferenciado estabelecido nos arts. 42 a 49 da Lei Complementar n\xBA 123, de 2006, a pessoa jur\xEDdica:

{\xA7\xA7} de cujo capital participe outra pessoa jur\xEDdica;

{\xA7\xA7} que seja filial, sucursal, ag\xEAncia ou representa\xE7\xE3o, no Pa\xEDs, de pessoa jur\xEDdica com sede no exterior;

{\xA7\xA7} de cujo capital participe pessoa f\xEDsica que seja inscrita como empres\xE1rio ou seja s\xF3cia de outra empresa que receba tratamento jur\xEDdico diferenciado nos termos da Lei Complementar n\xBA 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} cujo titular ou s\xF3cio participe com mais de 10% (dez por cento) do capital de outra empresa n\xE3o beneficiada pela Lei Complementar n\xBA 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} cujo s\xF3cio ou titular seja administrador ou equiparado de outra pessoa jur\xEDdica com fins lucrativos, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3\xBA da referida lei;

{\xA7\xA7} constitu\xEDda sob a forma de cooperativas, salvo as de consumo;

{\xA7\xA7} que participe do capital de outra pessoa jur\xEDdica;

{\xA7\xA7} que exer\xE7a atividade de banco comercial, de investimentos e de desenvolvimento, de caixa econ\xF4mica, de sociedade de cr\xE9dito, financiamento e investimento ou de cr\xE9dito imobili\xE1rio, de corretora ou de distribuidora de t\xEDtulos, valores mobili\xE1rios e c\xE2mbio, de empresa de arrendamento mercantil, de seguros privados e de capitaliza\xE7\xE3o ou de previd\xEAncia complementar;

{\xA7\xA7} resultante ou remanescente de cis\xE3o ou qualquer outra forma de desmembramento de pessoa jur\xEDdica que tenha ocorrido em um dos 5 (cinco) anos-calend\xE1rio anteriores;

{\xA7\xA7} constitu\xEDda sob a forma de sociedade por a\xE7\xF5es.

{\xA7\xA7} cujos titulares ou s\xF3cios guardem, cumulativamente, com o contratante do servi\xE7o, rela\xE7\xE3o de pessoalidade, subordina\xE7\xE3o e habitualidade.

{\xA7@declaracao_integridade} O licitante dever\xE1 declarar em campo pr\xF3prio do sistema que desenvolve programa de integridade, nos termos do Decreto n\xBA 12.304, de 2024, e da Portaria Normativa SE/CGU n\xBA 226, de 9 de setembro de 2025, para fazer jus ao benef\xEDcio do crit\xE9rio de desempate previsto no art. 60, caput, inciso IV, da lei n. 14.133, de 2021.

{\xA7} A falsidade da declara\xE7\xE3o de que trata os itens {\xA7ref@declaracoes}, {\xA7ref@declaracao_me_epp} ou {\xA7ref@declaracao_integridade} sujeitar\xE1 o licitante \xE0s san\xE7\xF5es previstas na Lei n\xBA 14.133, de 2021, e neste Edital.

{\xA7} Os licitantes poder\xE3o retirar ou substituir as propostas de t\xE9cnica e as propostas de pre\xE7o ou, na hip\xF3tese de a fase de habilita\xE7\xE3o anteceder as fases de apresenta\xE7\xE3o de propostas e de julgamento, os documentos de habilita\xE7\xE3o anteriormente inseridos no sistema, at\xE9 a abertura da sess\xE3o p\xFAblica.

{\xA7} Ser\xE3o disponibilizados para acesso p\xFAblico os documentos que comp\xF5em as propostas dos licitantes convocados, ap\xF3s a fase da apresenta\xE7\xE3o de propostas.

{\xA7} Os documentos complementares \xE0 proposta de t\xE9cnica, quando necess\xE1rios \xE0 confirma\xE7\xE3o daqueles exigidos no edital de licita\xE7\xE3o e j\xE1 apresentados, ser\xE3o encaminhados pelo licitante mais bem classificado, ap\xF3s o encerramento da etapa competitiva, observado o prazo de que trata o item {\xA7ref@prazo_documentos}.

{\xA7} Caber\xE1 ao licitante interessado em participar da licita\xE7\xE3o acompanhar as opera\xE7\xF5es no sistema eletr\xF4nico durante o processo licitat\xF3rio e se responsabilizar pelo \xF4nus decorrente da perda de neg\xF3cios diante da inobserv\xE2ncia de mensagens emitidas pela Administra\xE7\xE3o ou de sua desconex\xE3o.

{\xA7} O licitante dever\xE1 comunicar imediatamente ao provedor do sistema qualquer acontecimento que possa comprometer o sigilo ou a seguran\xE7a, para imediato bloqueio de acesso.

## {\xA7sec}. DO PREENCHIMENTO DA PROPOSTA

{\xA7} O licitante dever\xE1 enviar sua proposta t\xE9cnica, atrav\xE9s do sistema eletr\xF4nico, contendo os seguintes requisitos:

%% Requisitos da proposta t\xE9cnica, um por item (o \xFAltimo termina em ponto).
{*proposta_tecnica.requisitos}{\xA7\xA7} {.valor}

{/proposta_tecnica.requisitos}

{\xA7} O licitante dever\xE1 enviar sua proposta de pre\xE7os mediante o preenchimento, no sistema eletr\xF4nico, dos seguintes campos:

%% AGU: adequar ao objeto e ao crit\xE9rio de julgamento (ex.: valor mensal e anual do item).
{\xA7\xA7} Valor {proposta.campo_valor};

{#proposta.marca}{\xA7\xA7} marca;{/proposta.marca}

{#proposta.fabricante}{\xA7\xA7} fabricante;{/proposta.fabricante}

{\xA7} Todas as especifica\xE7\xF5es do objeto contidas na proposta vinculam o licitante.

{\xA7} Nos valores propostos estar\xE3o inclusos todos os custos operacionais, encargos previdenci\xE1rios, trabalhistas, tribut\xE1rios, comerciais e quaisquer outros que incidam direta ou indiretamente na execu\xE7\xE3o do objeto.

{\xA7} Os pre\xE7os ofertados ser\xE3o de exclusiva responsabilidade do licitante, n\xE3o lhe assistindo o direito de pleitear qualquer altera\xE7\xE3o, sob alega\xE7\xE3o de erro, omiss\xE3o ou qualquer outro pretexto.

{\xA7} Se o regime tribut\xE1rio da empresa implicar o recolhimento de tributos em percentuais vari\xE1veis, a cota\xE7\xE3o adequada ser\xE1 a que corresponde \xE0 m\xE9dia dos efetivos recolhimentos da empresa nos \xFAltimos doze meses.

%% AGU: s\xF3 em servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra que n\xE3o sejam vigil\xE2ncia patrimonial (regime cumulativo \u2014 Solu\xE7\xE3o de Consulta Cosit 345/2017); trecho em rosa no modelo.
{#dedicacao_exclusiva}{^vigilancia_patrimonial}{\xA7\xA7} No regime de incid\xEAncia n\xE3o-cumulativa de PIS e COFINS, a cota\xE7\xE3o adequada ser\xE1 a que corresponde \xE0 m\xE9dia das al\xEDquotas efetivamente recolhidas pela empresa, comprovada, a qualquer tempo, por documentos de Escritura\xE7\xE3o Fiscal Digital da Contribui\xE7\xE3o (EFD-Contribui\xE7\xF5es) para o PIS/PASEP e COFINS dos \xFAltimos 12 (doze) meses anteriores \xE0 apresenta\xE7\xE3o da proposta, ou por outro meio h\xE1bil.{/vigilancia_patrimonial}{/dedicacao_exclusiva}

{\xA7} Independentemente do percentual de tributo inserido na planilha, no pagamento ser\xE3o retidos na fonte os percentuais estabelecidos na legisla\xE7\xE3o vigente.

%% AGU: 1\xAA reda\xE7\xE3o para vigil\xE2ncia, limpeza, conserva\xE7\xE3o e demais servi\xE7os admitidos no Simples (LC 123, art. 18, \xA7 5\xBA-C, VI, e art. 17, \xA7 1\xBA); 2\xAA quando houver cess\xE3o de m\xE3o de obra; justificar nos autos.
{^simples_nacional_vedado}{\xA7} Na presente licita\xE7\xE3o, a Microempresa e a Empresa de Pequeno Porte poder\xE3o se beneficiar do regime de tributa\xE7\xE3o pelo Simples Nacional.{/simples_nacional_vedado}

{#simples_nacional_vedado}{\xA7} Na presente licita\xE7\xE3o, a Microempresa e a Empresa de Pequeno Porte n\xE3o poder\xE3o se beneficiar do regime de tributa\xE7\xE3o pelo Simples Nacional, visto que os servi\xE7os ser\xE3o prestados com disponibiliza\xE7\xE3o de trabalhadores em dedica\xE7\xE3o exclusiva de m\xE3o de obra, o que configura cess\xE3o de m\xE3o de obra para fins tribut\xE1rios, conforme art. 17, inciso XII, da Lei Complementar no 123/2006.{/simples_nacional_vedado}

{\xA7} A apresenta\xE7\xE3o das propostas implica obrigatoriedade do cumprimento das disposi\xE7\xF5es nelas contidas, em conformidade com o que disp\xF5e o Termo de Refer\xEAncia/Projeto B\xE1sico, assumindo o proponente o compromisso de executar o objeto licitado nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utens\xEDlios necess\xE1rios, em quantidades e qualidades adequadas \xE0 perfeita execu\xE7\xE3o contratual, promovendo, quando requerido, sua substitui\xE7\xE3o.

%% AGU: a lei n\xE3o fixa a validade da proposta; sugest\xE3o de 60 (sessenta) dias.
{\xA7} O prazo de validade da proposta n\xE3o ser\xE1 inferior a {proposta.validade} dias, a contar da data de sua apresenta\xE7\xE3o.

{\xA7} Os licitantes devem respeitar os pre\xE7os m\xE1ximos estabelecidos nas normas de reg\xEAncia de contrata\xE7\xF5es p\xFAblicas federais, quando participarem de licita\xE7\xF5es p\xFAblicas;

{\xA7} O descumprimento das regras supramencionadas pode ensejar a responsabiliza\xE7\xE3o pelo Tribunal de Contas da Uni\xE3o e, ap\xF3s o devido processo legal, gerar as seguintes consequ\xEAncias: assinatura de prazo para a ado\xE7\xE3o das medidas necess\xE1rias ao exato cumprimento da lei, nos termos do art. 71, inciso IX, da Constitui\xE7\xE3o; ou condena\xE7\xE3o dos agentes p\xFAblicos respons\xE1veis e da empresa contratada ao pagamento dos preju\xEDzos ao er\xE1rio, caso verificada a ocorr\xEAncia de superfaturamento por sobrepre\xE7o na execu\xE7\xE3o do contrato.

{\xA7} Ser\xE1 adotado o modo de disputa fechado, em que os licitantes apresentar\xE3o propostas que permanecer\xE3o em sigilo at\xE9 o in\xEDcio da sess\xE3o p\xFAblica, sendo vedada a apresenta\xE7\xE3o de lances.

%% Trechos em rosa no modelo: servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra.
{#dedicacao_exclusiva}{\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva, o licitante dever\xE1 indicar os sindicatos, acordos coletivos, conven\xE7\xF5es coletivas ou senten\xE7as normativas que regem as categorias profissionais que executar\xE3o o servi\xE7o e as respectivas datas bases e vig\xEAncias, com base na Classifica\xE7\xE3o Brasileira de Ocupa\xE7\xF5es \u2013 CBO.

{\xA7} Os custos m\xEDnimos relevantes e demais informa\xE7\xF5es referentes aos benef\xEDcios trabalhistas encontram-se definidos no Termo de Refer\xEAncia.{/dedicacao_exclusiva}

## {\xA7sec}. DA ABERTURA DA SESS\xC3O P\xDABLICA E DA FASE DE JULGAMENTO

{\xA7} A abertura da presente licita\xE7\xE3o dar-se-\xE1 automaticamente em sess\xE3o p\xFAblica, por meio de sistema eletr\xF4nico, na data, hor\xE1rio e local indicados neste Edital.

{\xA7@prazo_notas} Iniciada a sess\xE3o p\xFAblica, {conducao.o} {conducao.agente} dever\xE1 informar no sistema o prazo para a atribui\xE7\xE3o de notas \xE0 proposta de t\xE9cnica e de pre\xE7o, e a data e o hor\xE1rio para manifesta\xE7\xE3o da inten\xE7\xE3o de recorrer do resultado do julgamento, nos termos do item {\xA7ref@recurso_julgamento} deste Edital.

{\xA7\xA7@postergacao} Eventual posterga\xE7\xE3o do prazo a que se refere o item {\xA7ref@prazo_notas} deve ser comunicada tempestivamente pel{conducao.o} {conducao.agente}, via sistema.

{\xA7} O sistema disponibilizar\xE1 campo pr\xF3prio para troca de mensagens entre {conducao.o} {conducao.agente} e os licitantes.

{\xA7} Quando a desconex\xE3o do sistema eletr\xF4nico para {conducao.o} {conducao.agente} persistir por tempo superior a dez minutos, a sess\xE3o p\xFAblica ser\xE1 suspensa e reiniciada somente ap\xF3s decorridas vinte e quatro horas da comunica\xE7\xE3o do fato pel{conducao.o} {conducao.agente} aos participantes, no s\xEDtio eletr\xF4nico utilizado para divulga\xE7\xE3o.

{\xA7} {conducao.o|cap} {conducao.agente} verificar\xE1 as condi\xE7\xF5es de participa\xE7\xE3o no certame de todos os licitantes, conforme previsto no art. 14 da Lei n\xBA 14.133, de 2021, legisla\xE7\xE3o correlata e no item {\xA7ref@nao_disputar} do edital, especialmente quanto \xE0 exist\xEAncia de san\xE7\xE3o que impe\xE7a a participa\xE7\xE3o no certame ou a futura contrata\xE7\xE3o, mediante a consulta aos seguintes cadastros:

{\xA7\xA7} SICAF;

{\xA7\xA7} Cadastro Nacional de Empresas Inid\xF4neas e Suspensas \u2013 CEIS,

{\xA7\xA7} Cadastro Nacional de Empresas Punidas \u2013 CNEP e

{\xA7\xA7} Lista de licitantes inid\xF4neos, mantida pelo Tribunal de Contas da Uni\xE3o.

{\xA7} A consulta aos cadastros ser\xE1 realizada no nome e no CNPJ da empresa licitante.

{\xA7\xA7} A consulta no CEIS quanto \xE0s san\xE7\xF5es previstas na Lei n\xBA 8.429, de 1992, tamb\xE9m ocorrer\xE1 no nome e no CPF do s\xF3cio majorit\xE1rio da empresa licitante, se houver, por for\xE7a do art. 12 da citada lei.

{\xA7} Para a consulta de licitantes pessoa jur\xEDdica poder\xE1 haver a substitui\xE7\xE3o das consultas ao CEIS, CNEP e Lista de licitantes inid\xF4neos pela Consulta Consolidada de Pessoa Jur\xEDdica do TCU.

{\xA7} Caso conste na Consulta de Situa\xE7\xE3o do licitante a exist\xEAncia de Ocorr\xEAncias Impeditivas Indiretas, {conducao.o} {conducao.agente} diligenciar\xE1 para verificar se houve fraude por parte das empresas apontadas no Relat\xF3rio de Ocorr\xEAncias Impeditivas Indiretas.

{\xA7\xA7} A tentativa de burla ser\xE1 verificada por meio dos v\xEDnculos societ\xE1rios, linhas de fornecimento similares, dentre outros.

{\xA7\xA7} O licitante ser\xE1 convocado para manifesta\xE7\xE3o previamente a uma eventual desclassifica\xE7\xE3o.

{\xA7\xA7} Constatada a exist\xEAncia de san\xE7\xE3o, o licitante ser\xE1 reputado inabilitado, por falta de condi\xE7\xE3o de participa\xE7\xE3o.

{\xA7} Na hip\xF3tese de invers\xE3o das fases de habilita\xE7\xE3o e julgamento, caso atendidas as condi\xE7\xF5es de participa\xE7\xE3o, ser\xE1 iniciado o procedimento de habilita\xE7\xE3o.

{\xA7} Caso o licitante provisoriamente classificado em primeiro lugar tenha se utilizado de algum tratamento favorecido \xE0s ME/EPPs ou tenha se valido da aplica\xE7\xE3o da margem de prefer\xEAncia, {conducao.o} {conducao.agente} verificar\xE1 se o licitante faz jus ao benef\xEDcio aplicado.

%% Margem de prefer\xEAncia (trecho em verde no modelo).
{#margem_preferencia}{\xA7\xA7} Caso o licitante n\xE3o venha a comprovar o atendimento dos requisitos para fazer jus ao benef\xEDcio da margem de prefer\xEAncia, as propostas ser\xE3o reclassificadas, para fins de nova aplica\xE7\xE3o da margem de prefer\xEAncia.{/margem_preferencia}

{\xA7} Verificadas as condi\xE7\xF5es de participa\xE7\xE3o e de utiliza\xE7\xE3o do tratamento favorecido, {conducao.o} {conducao.agente} realizar\xE1, em conjunto com a banca designada, a verifica\xE7\xE3o da conformidade das propostas.

%% Servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra (trecho em rosa no modelo).
{#dedicacao_exclusiva}{\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva, a fim de assegurar o tratamento ison\xF4mico entre as licitantes, informa-se que foram utilizados os seguintes acordos, diss\xEDdios ou conven\xE7\xF5es coletivas de trabalho no c\xE1lculo do valor estimado pela Administra\xE7\xE3o:

{\xA7\xA7} {convencao_coletiva.paradigma};

{\xA7} Os acordos, diss\xEDdios ou conven\xE7\xF5es coletivas indicado(s)no subitem acima n\xE3o \xE9 (s\xE3o) de utiliza\xE7\xE3o obrigat\xF3ria pelos licitantes, mas, ao longo da execu\xE7\xE3o contratual, sempre se exigir\xE1 o cumprimento dos acordos, diss\xEDdios ou conven\xE7\xF5es coletivas adotados por cada licitante/contratado, obedecidos os custos m\xEDnimos relevantes fixados pela Administra\xE7\xE3o.{/dedicacao_exclusiva}

{\xA7} Ser\xE3o desclassificadas as propostas que:

{\xA7\xA7} contiverem v\xEDcios insan\xE1veis;

{\xA7\xA7} n\xE3o obedecerem \xE0s especifica\xE7\xF5es t\xE9cnicas contidas no Termo de Refer\xEAncia/Projeto B\xE1sico;

{\xA7\xA7} apresentarem pre\xE7os inexequ\xEDveis ou permanecerem acima do pre\xE7o m\xE1ximo definido para a contrata\xE7\xE3o;

{\xA7\xA7} n\xE3o tiverem sua exequibilidade demonstrada, quando exigido pela Administra\xE7\xE3o;

{\xA7\xA7} n\xE3o cumpra os crit\xE9rios de aceitabilidade de pre\xE7os definidos no Termo de Refer\xEAncia;

{\xA7\xA7} apresentarem desconformidade com quaisquer outras exig\xEAncias deste Edital ou seus anexos, desde que insan\xE1vel.

{\xA7} Na avalia\xE7\xE3o de conformidade das propostas de t\xE9cnica e de pre\xE7o dever\xE3o ser indicadas as raz\xF5es de eventuais desclassifica\xE7\xF5es.

{\xA7} A an\xE1lise e avalia\xE7\xE3o da conformidade das propostas ser\xE1 iniciada pelo exame de conformidade das propostas de t\xE9cnica, observadas as regras e as condi\xE7\xF5es previstas no Anexo I deste edital.

{\xA7} A an\xE1lise dos quesitos de natureza qualitativa ser\xE1 realizada pela banca designada.

{\xA7} No julgamento das propostas t\xE9cnicas, ser\xE1 atribu\xEDda ao licitante uma Nota da Proposta T\xE9cnica (NT), de acordo com o seguinte par\xE2metro matem\xE1tico:

%% AGU: a lei n\xE3o fixa o par\xE2metro da nota t\xE9cnica; definir e justificar \u2014 sugest\xE3o: NT = 100 * T1/T2 (T1 = pontua\xE7\xE3o t\xE9cnica do licitante; T2 = maior pontua\xE7\xE3o t\xE9cnica entre os licitantes), para que a melhor proposta t\xE9cnica tenha nota 100.
{\xA7\xA7} {tecnica.parametro}

{\xA7} Conclu\xEDda a avalia\xE7\xE3o e pondera\xE7\xE3o das propostas t\xE9cnicas {conducao.o} {conducao.agente} realizar\xE1 a verifica\xE7\xE3o da conformidade das propostas de pre\xE7o.

{\xA7} No caso de bens e servi\xE7os em geral, \xE9 ind\xEDcio de inexequibilidade das propostas valores inferiores a 50% (cinquenta por cento) do valor or\xE7ado pela Administra\xE7\xE3o.

{\xA7} A inexequibilidade, na hip\xF3tese de que trata o item anterior, s\xF3 ser\xE1 considerada ap\xF3s dilig\xEAncia d{conducao.o} {conducao.agente}, que comprove:

{\xA7\xA7} que o custo do licitante ultrapassa o valor da proposta; e

{\xA7\xA7} inexistirem custos de oportunidade capazes de justificar o vulto da oferta.

%% Obras e servi\xE7os de engenharia: sobrepre\xE7o pelo valor global (tarefa, pre\xE7o global, integral, semi-integrada, integrada) ou tamb\xE9m por custo unit\xE1rio relevante (pre\xE7o unit\xE1rio \u2014 art. 59, \xA7 3\xBA, e art. 6\xBA, LVI).
{#engenharia}{\xA7} Em contrata\xE7\xE3o de obras e servi\xE7os de engenharia, al\xE9m das disposi\xE7\xF5es acima, a an\xE1lise de exequibilidade e sobrepre\xE7o considerar\xE1 o seguinte:

{^engenharia.preco_unitario}{\xA7\xA7} Nos regimes de execu\xE7\xE3o por tarefa, empreitada por pre\xE7o global ou empreitada integral, contrata\xE7\xE3o semi-integrada ou contrata\xE7\xE3o integrada, a caracteriza\xE7\xE3o do sobrepre\xE7o se dar\xE1 pela supera\xE7\xE3o do valor global estimado;{/engenharia.preco_unitario}

{#engenharia.preco_unitario}{\xA7\xA7} No regime de empreitada por pre\xE7o unit\xE1rio, a caracteriza\xE7\xE3o do sobrepre\xE7o se dar\xE1 pela supera\xE7\xE3o do valor global estimado e pela supera\xE7\xE3o de custo unit\xE1rio tido como relevante, conforme planilha anexa ao edital;{/engenharia.preco_unitario}

{\xA7\xA7} No caso de obras e servi\xE7os de engenharia, ser\xE3o consideradas inexequ\xEDveis as propostas cujos valores forem inferiores a 75% (setenta e cinco por cento) do valor or\xE7ado pela Administra\xE7\xE3o, independentemente do regime de execu\xE7\xE3o.{/engenharia}

{\xA7} Se houver ind\xEDcios de inexequibilidade da proposta de pre\xE7o, ou em caso da necessidade de esclarecimentos complementares, poder\xE3o ser efetuadas dilig\xEAncias, para que o licitante comprove a exequibilidade da proposta.

{\xA7} Caso o custo global estimado do objeto licitado tenha sido decomposto em seus respectivos custos unit\xE1rios por meio de Planilha de Custos e Forma\xE7\xE3o de Pre\xE7os elaborada pela Administra\xE7\xE3o, o licitante classificado em primeiro lugar ser\xE1 convocado para apresentar Planilha por ele elaborada, com os respectivos valores adequados ao valor final da sua proposta, sob pena de n\xE3o aceita\xE7\xE3o da proposta.

{\xA7\xA7} Em se tratando de obras e servi\xE7os de engenharia, o licitante vencedor ser\xE1 convocado a apresentar \xE0 Administra\xE7\xE3o, por meio eletr\xF4nico, as planilhas com indica\xE7\xE3o dos quantitativos e dos custos unit\xE1rios, seguindo o modelo elaborado pela Administra\xE7\xE3o, bem como com detalhamento das Bonifica\xE7\xF5es e Despesas Indiretas (BDI) e dos Encargos Sociais (ES), com os respectivos valores adequados ao valor final da proposta vencedora, admitida a utiliza\xE7\xE3o dos pre\xE7os unit\xE1rios, no caso de empreitada por pre\xE7o global, empreitada integral, contrata\xE7\xE3o semi-integrada e contrata\xE7\xE3o integrada, exclusivamente para eventuais adequa\xE7\xF5es indispens\xE1veis no cronograma f\xEDsico-financeiro e para balizar excepcional aditamento posterior do contrato.

{\xA7\xA7} Em se tratando de servi\xE7os com fornecimento de m\xE3o de obra em regime de dedica\xE7\xE3o exclusiva cuja produtividade seja mensur\xE1vel e indicada pela Administra\xE7\xE3o, o licitante dever\xE1 indicar a produtividade adotada e a quantidade de pessoal que ser\xE1 alocado na execu\xE7\xE3o contratual.

{\xA7\xA7} Caso a produtividade seja diferente daquela utilizada pela Administra\xE7\xE3o como refer\xEAncia, ou n\xE3o estiver contida na faixa referencial de produtividade, mas admitida pelo ato convocat\xF3rio, o licitante dever\xE1 apresentar a respectiva comprova\xE7\xE3o de exequibilidade.

{\xA7\xA7} Os licitantes poder\xE3o apresentar produtividades diferenciadas daquela estabelecida pela Administra\xE7\xE3o como refer\xEAncia, desde que n\xE3o alterem o objeto da contrata\xE7\xE3o, n\xE3o contrariem dispositivos legais vigentes e, caso n\xE3o estejam contidas nas faixas referenciais de produtividade, comprovem a exequibilidade da proposta.

{\xA7\xA7} Para efeito do subitem anterior, admite-se a adequa\xE7\xE3o t\xE9cnica da metodologia empregada pela contratada, visando assegurar a execu\xE7\xE3o do objeto, desde que mantidas as condi\xE7\xF5es para a justa remunera\xE7\xE3o do servi\xE7o.

{\xA7} Erros no preenchimento da planilha n\xE3o constituem motivo para a desclassifica\xE7\xE3o da proposta. A planilha poder\xE1\u0301 ser ajustada pelo licitante, no prazo indicado pelo sistema, desde que n\xE3o haja majora\xE7\xE3o do pre\xE7o e que se comprove que este \xE9 o bastante para arcar com todos os custos da contrata\xE7\xE3o.

{\xA7\xA7} O ajuste de que trata este dispositivo se limita a sanar erros ou falhas que n\xE3o alterem a subst\xE2ncia das propostas.

{\xA7\xA7} Considera-se erro no preenchimento da planilha pass\xEDvel de corre\xE7\xE3o a indica\xE7\xE3o de recolhimento de impostos e contribui\xE7\xF5es na forma do Simples Nacional, quando n\xE3o cab\xEDvel esse regime.

{\xA7} Para fins de an\xE1lise da proposta quanto ao cumprimento das especifica\xE7\xF5es do objeto, poder\xE1 ser colhida a manifesta\xE7\xE3o escrita do setor requisitante do servi\xE7o ou da \xE1rea especializada no objeto.

{\xA7@nota_preco} Ser\xE1 atribu\xEDda ao licitante uma Nota da Proposta de Pre\xE7o (NP), de acordo com o seguinte par\xE2metro matem\xE1tico:

> NP = 100 x (X1 / X2)
> NP - Nota da proposta de pre\xE7o do licitante;
> X1 - Menor valor global proposto entre os licitantes classificados; e
> X2 - Valor global proposto pelo licitante classificado.

{\xA7} Ap\xF3s an\xE1lise das propostas de t\xE9cnica e de pre\xE7o, ser\xE1 estabelecida a pontua\xE7\xE3o final dos licitantes, de acordo com a m\xE9dia ponderada das valora\xE7\xF5es de acordo com a seguinte f\xF3rmula:

%% AGU: peso da t\xE9cnica de no m\xE1ximo 70% (art. 36, \xA7 2\xBA); os dois pesos somam 100 \u2014 outra propor\xE7\xE3o muda a f\xF3rmula.
> NF = ({tecnica.peso} * NT + {preco.peso} * NP)/100
> onde:
> NF = Nota Final;
> NT = Nota da Proposta T\xE9cnica;
> NP = Nota da Proposta de Pre\xE7os.

{\xA7} Encerrados os prazos estabelecidos nos itens {\xA7ref@prazo_notas} e {\xA7ref@postergacao}, o sistema ordenar\xE1 e divulgar\xE1 as notas ponderadas das propostas de t\xE9cnica e de pre\xE7o em ordem decrescente, considerando a maior pontua\xE7\xE3o obtida, bem como informar\xE1 as notas de cada proposta por licitante.

%% Margem de prefer\xEAncia (trechos em verde no modelo).
{#margem_preferencia}{\xA7} Ser\xE1 aplicado o benef\xEDcio da margem de prefer\xEAncia, nos termos do art. 26 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7} Para produtos ou servi\xE7os abrangidos por margem de prefer\xEAncia normal ou adicional, caso a proposta de menor pre\xE7o n\xE3o tenha por objeto produto ou servi\xE7o contemplado pela referida margem, o sistema automaticamente indicar\xE1 as propostas de produtos ou servi\xE7os que fa\xE7am jus ao diferencial de pre\xE7o, pela ordem de classifica\xE7\xE3o, para fins de aceita\xE7\xE3o pel{conducao.o} {conducao.agente}.

{\xA7\xA7} Nestas situa\xE7\xF5es, a proposta beneficiada pela aplica\xE7\xE3o da margem de prefer\xEAncia normal ou adicional, conforme o caso, tornar-se-\xE1 a proposta classificada em primeiro lugar.{/margem_preferencia}

{\xA7} Em rela\xE7\xE3o a itens n\xE3o exclusivos para participa\xE7\xE3o de microempresas e empresas de pequeno porte, uma vez encerrada a etapa de an\xE1lise das propostas de t\xE9cnica e de pre\xE7o, ser\xE1 efetivada a verifica\xE7\xE3o autom\xE1tica, junto \xE0 Receita Federal, do porte da entidade empresarial. O sistema identificar\xE1 em coluna pr\xF3pria as microempresas e empresas de pequeno porte participantes, procedendo \xE0 compara\xE7\xE3o com a Nota Final da primeira colocada, se esta for empresa de maior porte, assim como das demais classificadas, para o fim de aplicar-se o disposto nos arts. 44 e 45 da Lei Complementar n\xBA 123, de 2006, regulamentada pelo Decreto n\xBA 8.538, de 2015.

{#margem_preferencia}{\xA7\xA7} Quando houver propostas beneficiadas com as margens de prefer\xEAncia, apenas poder\xE3o se valer do crit\xE9rio de desempate previsto nos arts. 44 e 45 da Lei Complementar n\xBA 123, de 2006, as propostas de microempresas e empresas de pequeno porte que tamb\xE9m fizerem jus \xE0s margens de prefer\xEAncia.

{\xA7\xA7} O par\xE2metro para o empate ficto, nesse caso, consistir\xE1 no pre\xE7o ofertado pela fornecedora classificada em primeiro lugar em raz\xE3o da aplica\xE7\xE3o da margem de prefer\xEAncia.{/margem_preferencia}

{\xA7\xA7} Nessas condi\xE7\xF5es, as propostas de microempresas e empresas de pequeno porte que se encontrarem na faixa de at\xE9 10% (dez por cento) acima da maior Nota Final ser\xE3o consideradas empatadas com a primeira colocada.

{\xA7\xA7} A melhor classificada nos termos do subitem anterior ter\xE1 o direito de encaminhar uma \xFAltima oferta para desempate, obrigatoriamente em pre\xE7o que corresponda a Nota Final superior \xE0 da primeira colocada, no prazo de 5 (cinco) minutos controlados pelo sistema, contados ap\xF3s a comunica\xE7\xE3o autom\xE1tica para tanto.

{\xA7\xA7} Caso a microempresa ou a empresa de pequeno porte melhor classificada desista ou n\xE3o se manifeste no prazo estabelecido, ser\xE3o convocadas as demais licitantes microempresa e empresa de pequeno porte que se encontrem naquele intervalo de 10% (dez por cento), na ordem de classifica\xE7\xE3o, para o exerc\xEDcio do mesmo direito, no prazo estabelecido no subitem anterior.

{\xA7\xA7} No caso de equival\xEAncia das Notas Finais atribu\xEDdas \xE0s microempresas e empresas de pequeno porte que se encontrem nos intervalos estabelecidos nos subitens anteriores, ser\xE1 realizado sorteio entre elas para que se identifique aquela que primeiro poder\xE1 apresentar melhor oferta para desempate.

{\xA7\xA7} A obten\xE7\xE3o do benef\xEDcio a que se refere o item anterior fica limitada \xE0s microempresas e \xE0s empresas de pequeno porte que, no ano-calend\xE1rio de realiza\xE7\xE3o da licita\xE7\xE3o, ainda n\xE3o tenham celebrado contratos com a Administra\xE7\xE3o P\xFAblica cujos valores somados extrapolem a receita bruta m\xE1xima admitida para fins de enquadramento como empresa de pequeno porte.

{\xA7} Havendo eventual empate entre Notas Finais, o crit\xE9rio de desempate ser\xE1 aquele previsto no art. 60 da Lei n\xBA 14.133, de 2021, nesta ordem:

{\xA7\xA7} disputa final, hip\xF3tese em que os licitantes empatados poder\xE3o apresentar nova proposta de pre\xE7o em ato cont\xEDnuo \xE0 classifica\xE7\xE3o;

{\xA7\xA7} avalia\xE7\xE3o do desempenho contratual pr\xE9vio dos licitantes, para a qual dever\xE3o preferencialmente ser utilizados registros cadastrais para efeito de atesto de cumprimento de obriga\xE7\xF5es previstos nesta Lei;

{\xA7\xA7} desenvolvimento pelo licitante de a\xE7\xF5es de equidade entre homens e mulheres no ambiente de trabalho, nos termos do Decreto n\xBA 11.430, de 2023, e da Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 382, de 17 de setembro de 2025;

{\xA7\xA7} desenvolvimento pelo licitante de programa de integridade, conforme Decreto n\xB0 12.304, de 2024, e Portaria Normativa SE/CGU n\xB0 226, de 9 de setembro de 2025.

{\xA7\xA7} Persistindo o empate, ser\xE1 assegurada prefer\xEAncia, sucessivamente, aos bens e servi\xE7os produzidos ou prestados por:

{\xA7\xA7\xA7} empresas estabelecidas no territ\xF3rio do Estado ou do Distrito Federal do \xF3rg\xE3o ou entidade da Administra\xE7\xE3o P\xFAblica estadual ou distrital licitante ou, no caso de licita\xE7\xE3o realizada por \xF3rg\xE3o ou entidade de Munic\xEDpio, no territ\xF3rio do Estado em que este se localize;

{\xA7\xA7\xA7} empresas brasileiras;

{\xA7\xA7\xA7} empresas que invistam em pesquisa e no desenvolvimento de tecnologia no Pa\xEDs;

{\xA7\xA7\xA7} empresas que comprovem a pr\xE1tica de mitiga\xE7\xE3o, nos termos da Lei n\xBA 12.187, de 29 de dezembro de 2009.

{\xA7} Esgotados todos os demais crit\xE9rios de desempate previsto em lei, a escolha do licitante vencedor ocorrer\xE1 por sorteio, em ato p\xFAblico, para o qual todos os licitantes ser\xE3o convocados, vedado qualquer outro processo.

{\xA7} Encerrada a etapa de an\xE1lise das propostas, na hip\xF3tese de a proposta de pre\xE7o do primeiro colocado permanecer acima do pre\xE7o m\xE1ximo definido para a contrata\xE7\xE3o, {conducao.o} {conducao.agente} poder\xE1 negociar condi\xE7\xF5es mais vantajosas, ap\xF3s definida a melhor Nota Final entre os licitantes.

{\xA7\xA7} A negocia\xE7\xE3o poder\xE1 ser feita com os demais licitantes, segundo a ordem de classifica\xE7\xE3o inicialmente estabelecida, quando o primeiro colocado, mesmo ap\xF3s a negocia\xE7\xE3o, for desclassificado em raz\xE3o de sua proposta permanecer acima do pre\xE7o m\xE1ximo definido pela Administra\xE7\xE3o.

{\xA7\xA7} A negocia\xE7\xE3o ser\xE1 realizada por meio do sistema, podendo ser acompanhada pelos demais licitantes.

{\xA7} O resultado da negocia\xE7\xE3o ser\xE1 registrado na ata da sess\xE3o p\xFAblica e anexado aos autos do processo licitat\xF3rio.

%% Prazo para envio da proposta adequada \xE0 negocia\xE7\xE3o (o modelo sugere 2 (duas) horas).
{\xA7} {conducao.o|cap} {conducao.agente} solicitar\xE1 ao licitante mais bem classificado que, no prazo de {negociacao.prazo_proposta}, envie a proposta adequada \xE0 negocia\xE7\xE3o realizada, acompanhada, se for o caso, dos documentos complementares.

{\xA7} Caso o Termo de Refer\xEAncia/Projeto B\xE1sico exija a apresenta\xE7\xE3o de amostra, o licitante classificado em primeiro lugar dever\xE1 apresent\xE1-la, conforme disciplinado no Termo de Refer\xEAncia/Projeto B\xE1sico, sob pena de n\xE3o aceita\xE7\xE3o da proposta.

{\xA7} Por meio de mensagem no sistema, ser\xE1 divulgado o local e hor\xE1rio de realiza\xE7\xE3o do procedimento para a avalia\xE7\xE3o das amostras, cuja presen\xE7a ser\xE1 facultada a todos os interessados, incluindo os demais licitantes.

{\xA7} Os resultados das avalia\xE7\xF5es ser\xE3o divulgados por meio de mensagem no sistema.

{\xA7} No caso de n\xE3o haver entrega da amostra ou ocorrer atraso na entrega, sem justificativa aceita pel{conducao.o} {conducao.agente}, ou havendo entrega de amostra fora das especifica\xE7\xF5es previstas neste Edital, a proposta do licitante ser\xE1 recusada.

{\xA7} Se a(s) amostra(s) apresentada(s) pelo primeiro classificado n\xE3o for(em) aceita(s), {conducao.o} {conducao.agente} analisar\xE1 a aceitabilidade da proposta ofertada pelo segundo classificado. Seguir-se-\xE1 com a verifica\xE7\xE3o da(s) amostra(s) e, assim, sucessivamente, at\xE9 a verifica\xE7\xE3o de uma que atenda \xE0s especifica\xE7\xF5es constantes no Termo de Refer\xEAncia/Projeto B\xE1sico.

{\xA7} \xC9 facultado {conducao.ao} {conducao.agente} prorrogar o prazo acima estabelecido, a partir de solicita\xE7\xE3o fundamentada feita no chat pelo licitante, antes de findo o prazo.

%% Servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra (trechos em rosa no modelo; Ac\xF3rd\xE3o TCU 1.207/2024-Plen\xE1rio e IN SEGES 176/2024).
{#dedicacao_exclusiva}{\xA7} No caso de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra, o licitante dever\xE1 entregar junto com sua proposta de pre\xE7os, os seguintes documentos:

{\xA7\xA7} declara\xE7\xE3o informando o enquadramento sindical da empresa, a atividade econ\xF4mica preponderante e a justificativa para ado\xE7\xE3o do instrumento coletivo do trabalho em que se baseia sua proposta;

{\xA7\xA7} c\xF3pia da carta ou registro sindical do sindicato a qual ele declara ser enquadrado, em raz\xE3o do regramento do enquadramento sindical previsto na CLT ou por for\xE7a de decis\xE3o judicial;

{\xA7\xA7} c\xF3pia do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado pelo licitante para a elabora\xE7\xE3o da planilha de custos e forma\xE7\xE3o de pre\xE7os que embasam o valor global ofertado; e

{\xA7\xA7} declara\xE7\xE3o de que se responsabiliza nas situa\xE7\xF5es de ocorr\xEAncia de erro no enquadramento sindical, ou fraude pela utiliza\xE7\xE3o de instrumento coletivo incompat\xEDvel com o enquadramento sindical declarado ou no qual a empresa n\xE3o tenha sido representada por \xF3rg\xE3o de classe de sua categoria, que da\xED tenha resultado vantagem indevida na fase de julgamento das propostas, sujeitando a contratada \xE0s san\xE7\xF5es previstas no art. 156, incisos III e IV, da Lei n\xBA 14.133, de 2021;

{\xA7} Na hip\xF3tese dos postos de trabalho licitados se distribu\xEDrem por territ\xF3rio correspondente a mais de uma base sindical da categoria profissional, dever\xE3o ser informadas cada uma das normas coletivas utilizadas para o c\xE1lculo do custo individual dos postos, a partir da base territorial de cada sindicato.

{\xA7} {conducao.o|cap} {conducao.agente} realizar\xE1 a verifica\xE7\xE3o da observ\xE2ncia da proposta classificada provisoriamente em primeiro lugar quanto aos custos unit\xE1rios m\xEDnimos relevantes estabelecidos pela Administra\xE7\xE3o, al\xE9m dos demais aspectos ligados \xE0 conformidade da proposta ao objeto licitado e \xE0 compatibilidade do pre\xE7o.

{\xA7} {conducao.o|cap} {conducao.agente} conceder\xE1 o prazo de no m\xEDnimo duas horas para readequa\xE7\xE3o da proposta quando esta n\xE3o observar os custos unit\xE1rios m\xEDnimos relevantes, sob pena de desclassifica\xE7\xE3o, na forma da Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 2, de 7 de fevereiro de 2023.

{\xA7} {conducao.o|cap} {conducao.agente} deve verificar se as previs\xF5es do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo indicados pela Administra\xE7\xE3o est\xE3o sendo contempladas na Planilha de Custos e Forma\xE7\xE3o de Pre\xE7os, em especial, quando o Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado pelo licitante for diferente da norma coletiva paradigma utilizada pela Administra\xE7\xE3o.

{\xA7} Dever\xE3o prevalecer os valores que forem mais ben\xE9ficos ao trabalhador, na hip\xF3tese de que o Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo indicado pelo licitante estabelecerem valores de remunera\xE7\xE3o, incluindo sal\xE1rio base e adicionais, de aux\xEDlio-alimenta\xE7\xE3o e de benef\xEDcios superiores aos do Acordo, Conven\xE7\xE3o Coletiva de Trabalho ou Diss\xEDdio Coletivo utilizado como paradigma.{/dedicacao_exclusiva}

## {\xA7sec}. DA FASE DE HABILITA\xC7\xC3O

{\xA7} Os documentos previstos no Termo de Refer\xEAncia/Projeto B\xE1sico, necess\xE1rios e suficientes para demonstrar a capacidade do licitante de realizar o objeto da licita\xE7\xE3o, ser\xE3o exigidos para fins de habilita\xE7\xE3o, nos termos dos arts. 62 a 70 da Lei n\xBA 14.133, de 2021.

{\xA7\xA7@sicaf} A documenta\xE7\xE3o exigida para fins de habilita\xE7\xE3o jur\xEDdica, fiscal, social e trabalhista e econ\xF4mico-\uFB01nanceira, poder\xE1 ser substitu\xEDda pelo registro cadastral no SICAF.

{\xA7} Quando permitida a participa\xE7\xE3o de empresas estrangeiras que n\xE3o funcionem no Pa\xEDs, as exig\xEAncias de habilita\xE7\xE3o ser\xE3o atendidas mediante documentos equivalentes, inicialmente apresentados em tradu\xE7\xE3o livre.

{\xA7} Na hip\xF3tese de o licitante vencedor ser empresa estrangeira que n\xE3o funcione no Pa\xEDs, para \uFB01ns de assinatura do contrato, os documentos exigidos para a habilita\xE7\xE3o ser\xE3o traduzidos por tradutor juramentado no Pa\xEDs e apostilados nos termos do disposto no Decreto n\xBA 8.660, de 29 de janeiro de 2016, ou de outro que venha a substitu\xED-lo, ou consularizados pelos respectivos consulados ou embaixadas.

%% Cons\xF3rcio permitido: acr\xE9scimo de 10% a 30% na habilita\xE7\xE3o econ\xF4mico-financeira, salvo justificativa (art. 15, \xA7 1\xBA).
{#consorcio_permitido}{\xA7} Quando permitida a participa\xE7\xE3o de cons\xF3rcio de empresas, a habilita\xE7\xE3o t\xE9cnica, quando exigida, ser\xE1 feita por meio do somat\xF3rio dos quantitativos de cada consorciado e, para efeito de habilita\xE7\xE3o econ\xF4mico-financeira, quando exigida, ser\xE1 observado o somat\xF3rio dos valores de cada consorciado.

{\xA7\xA7} Se o cons\xF3rcio n\xE3o for formado integralmente por microempresas ou empresas de pequeno porte e o Termo de Refer\xEAncia/Projeto B\xE1sico exigir requisitos de habilita\xE7\xE3o econ\xF4mico-financeira, haver\xE1 um acr\xE9scimo de {consorcio_permitido.acrescimo} para o cons\xF3rcio em rela\xE7\xE3o ao valor exigido para os licitantes individuais.{/consorcio_permitido}

{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser apresentados em original, por c\xF3pia ou por {habilitacao.outro_meio}.

{\xA7} Os documentos exigidos para fins de habilita\xE7\xE3o poder\xE3o ser substitu\xEDdos por registro cadastral emitido por \xF3rg\xE3o ou entidade p\xFAblica, desde que o registro tenha sido feito em obedi\xEAncia ao disposto na Lei n\xBA 14.133, de 2021.

{\xA7} Ser\xE1 verificado se o licitante apresentou declara\xE7\xE3o de que atende aos requisitos de habilita\xE7\xE3o, e o declarante responder\xE1 pela veracidade das informa\xE7\xF5es prestadas, na forma da lei.

{\xA7} Ser\xE1 verificado se o licitante apresentou no sistema, sob pena de inabilita\xE7\xE3o, a declara\xE7\xE3o de que cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, previstas em lei e em outras normas espec\xEDficas.

{\xA7} O licitante dever\xE1 apresentar, sob pena de desclassifica\xE7\xE3o, declara\xE7\xE3o de que suas propostas econ\xF4micas compreendem a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de entrega das propostas.

%% AGU: vistoria s\xF3 quando o conhecimento do local for imprescind\xEDvel (art. 63, \xA7\xA7 2\xBA e 3\xBA); suprimir em aquisi\xE7\xF5es e servi\xE7os que independem do local e, se poss\xEDvel, substituir por fotos e plantas.
{#vistoria}{\xA7} Considerando que na presente contrata\xE7\xE3o a avalia\xE7\xE3o pr\xE9via do local de execu\xE7\xE3o \xE9 imprescind\xEDvel para o conhecimento pleno das condi\xE7\xF5es e peculiaridades do objeto a ser contratado, o licitante deve atestar, sob pena de inabilita\xE7\xE3o, que conhece o local e as condi\xE7\xF5es de realiza\xE7\xE3o do servi\xE7o, assegurado a ele o direito de realiza\xE7\xE3o de vistoria pr\xE9via.

{\xA7\xA7} O licitante que optar por realizar vistoria pr\xE9via ter\xE1 disponibilizado pela Administra\xE7\xE3o data e hor\xE1rio exclusivos, a ser agendado {vistoria.agendamento}, de modo que seu agendamento n\xE3o coincida com o agendamento de outros licitantes.

{\xA7\xA7} Caso o licitante opte por n\xE3o realizar vistoria, poder\xE1 substituir a declara\xE7\xE3o exigida no presente item por declara\xE7\xE3o formal assinada pelo seu respons\xE1vel t\xE9cnico acerca do conhecimento pleno das condi\xE7\xF5es e peculiaridades da contrata\xE7\xE3o.{/vistoria}

{\xA7} A habilita\xE7\xE3o ser\xE1 verificada por meio do Sicaf, nos documentos por ele abrangidos.

{\xA7\xA7} Somente haver\xE1 a necessidade de comprova\xE7\xE3o do preenchimento de requisitos mediante apresenta\xE7\xE3o dos documentos originais n\xE3o-digitais quando houver d\xFAvida em rela\xE7\xE3o \xE0 integridade do documento digital ou quando a lei expressamente o exigir.

{\xA7} \xC9 de responsabilidade do licitante conferir a exatid\xE3o dos seus dados cadastrais no Sicaf e mant\xEA-los atualizados junto aos \xF3rg\xE3os respons\xE1veis pela informa\xE7\xE3o, devendo proceder, imediatamente, \xE0 corre\xE7\xE3o ou \xE0 altera\xE7\xE3o dos registros t\xE3o logo identifique incorre\xE7\xE3o ou aqueles se tornem desatualizados.

{\xA7\xA7} A n\xE3o observ\xE2ncia do disposto no item anterior poder\xE1 ensejar desclassifica\xE7\xE3o no momento da habilita\xE7\xE3o.

{\xA7} A verifica\xE7\xE3o pel{conducao.o} {conducao.agente}, em s\xEDtios eletr\xF4nicos oficiais de \xF3rg\xE3os e entidades emissores de certid\xF5es constitui meio legal de prova, para fins de habilita\xE7\xE3o.

{\xA7\xA7@prazo_documentos} Os documentos exigidos para habilita\xE7\xE3o que n\xE3o estejam contemplados no Sicaf ser\xE3o enviados por meio do sistema, em formato digital, no prazo de {habilitacao.prazo_documentos}, prorrog\xE1vel por igual per\xEDodo, contado da solicita\xE7\xE3o d{conducao.o} {conducao.agente}.

{\xA7} A verifica\xE7\xE3o no Sicaf ou a exig\xEAncia dos documentos nele n\xE3o contidos somente ser\xE1 feita em rela\xE7\xE3o ao licitante vencedor.

{\xA7\xA7} Os documentos relativos \xE0 regularidade fiscal que constem do Termo de Refer\xEAncia/Projeto B\xE1sico somente ser\xE3o exigidos, em qualquer caso, em momento posterior ao julgamento das propostas, e apenas do licitante mais bem classificado.

{\xA7\xA7} Respeitada a exce\xE7\xE3o do subitem anterior, relativa \xE0 regularidade fiscal, quando a fase de habilita\xE7\xE3o anteceder as fases de apresenta\xE7\xE3o de propostas e de julgamento, a verifica\xE7\xE3o ou exig\xEAncia do presente subitem ocorrer\xE1 em rela\xE7\xE3o a todos os licitantes.

%% AGU: prazo para novos documentos ou complementa\xE7\xE3o, no m\xEDnimo duas horas (Parecer 2/2025/CNLCA/DECOR/CGU/AGU).
{\xA7} Encerrado o prazo para envio da documenta\xE7\xE3o de que trata o item {\xA7ref@prazo_documentos}, poder\xE1 ser admitida, mediante decis\xE3o fundamentada d{conducao.o} {conducao.agente}, a apresenta\xE7\xE3o de novos documentos de habilita\xE7\xE3o ou a complementa\xE7\xE3o de informa\xE7\xF5es acerca dos documentos j\xE1 apresentados pelos licitantes, em at\xE9 {habilitacao.prazo_complementacao} horas, para:

{\xA7\xA7} a aferi\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o do licitante, desde que decorrentes de fatos existentes \xE0 \xE9poca da abertura do certame;

{\xA7\xA7} atualiza\xE7\xE3o de documentos cuja validade tenha expirado ap\xF3s a data de recebimento das propostas;

{\xA7\xA7} suprimento da aus\xEAncia de documento de cunho declarat\xF3rio emitido unilateralmente pelo licitante;

{\xA7\xA7} suprimento da aus\xEAncia de certid\xE3o e/ou documento de cunho declarat\xF3rio expedido por \xF3rg\xE3o ou entidade cujos atos gozem de presun\xE7\xE3o de veracidade e f\xE9 p\xFAblica.

{\xA7} Findo o prazo assinalado sem o envio da nova documenta\xE7\xE3o, restar\xE1 preclusa essa oportunidade conferida ao licitante, implicando sua inabilita\xE7\xE3o.

{\xA7} Na an\xE1lise dos documentos de habilita\xE7\xE3o, {conducao.o} {conducao.agente} poder\xE1 sanar erros ou falhas, que n\xE3o alterem a subst\xE2ncia dos documentos e sua validade jur\xEDdica, mediante decis\xE3o fundamentada, registrada em ata e acess\xEDvel a todos, atribuindo-lhes e\uFB01c\xE1cia para fins de habilita\xE7\xE3o e classifica\xE7\xE3o.

{\xA7} Na hip\xF3tese de o licitante n\xE3o atender \xE0s exig\xEAncias para habilita\xE7\xE3o, {conducao.o} {conducao.agente} examinar\xE1 a proposta subsequente e assim sucessivamente, na ordem de classifica\xE7\xE3o, at\xE9 a apura\xE7\xE3o de uma proposta que atenda ao presente edital, observado o prazo disposto no subitem {\xA7ref@prazo_documentos}.

{\xA7} Somente ser\xE3o disponibilizados para acesso p\xFAblico os documentos de habilita\xE7\xE3o do licitante cuja proposta atenda ao edital de licita\xE7\xE3o, ap\xF3s conclu\xEDdos os procedimentos de que trata o subitem anterior.

{\xA7} A comprova\xE7\xE3o de regularidade fiscal e trabalhista das microempresas e das empresas de pequeno porte somente ser\xE1 exigida para efeito de contrata\xE7\xE3o, e n\xE3o como condi\xE7\xE3o para participa\xE7\xE3o na licita\xE7\xE3o.

{\xA7} Quando a fase de habilita\xE7\xE3o anteceder a de julgamento e j\xE1 tiver sido encerrada, n\xE3o caber\xE1 exclus\xE3o de licitante por motivo relacionado \xE0 habilita\xE7\xE3o, salvo em raz\xE3o de fatos supervenientes ou s\xF3 conhecidos ap\xF3s o julgamento.

## {\xA7sec}. DO TERMO DE CONTRATO

{\xA7} Ap\xF3s a homologa\xE7\xE3o e adjudica\xE7\xE3o, caso se conclua pela contrata\xE7\xE3o, ser\xE1 firmado termo de contrato, ou outro instrumento equivalente.

{\xA7@prazo_assinatura} O adjudicat\xE1rio ter\xE1 o prazo de {contratacao.prazo_assinatura} dias \xFAteis, contados a partir da data de sua convoca\xE7\xE3o, para assinar o termo de contrato ou instrumento equivalente, sob pena de decair o direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas neste Edital.

{\xA7@assinatura_alternativa} Alternativamente \xE0 convoca\xE7\xE3o para comparecer perante o \xF3rg\xE3o ou entidade para a assinatura do Termo de Contrato ou instrumento equivalente, a Administra\xE7\xE3o poder\xE1: a) encaminh\xE1-lo para assinatura, mediante correspond\xEAncia postal com aviso de recebimento (AR), para que seja assinado e devolvido no prazo de {contratacao.prazo_devolucao} dias \xFAteis, a contar da data de seu recebimento; b) disponibilizar acesso a sistema de processo eletr\xF4nico para que seja assinado digitalmente em at\xE9 {contratacao.prazo_assinatura_digital} dias \xFAteis; ou c) outro meio eletr\xF4nico, assegurado o prazo de {contratacao.prazo_resposta} dias \xFAteis para resposta ap\xF3s recebimento da notifica\xE7\xE3o pela Administra\xE7\xE3o.

%% Usar quando a Nota de Empenho ou instrumento equivalente substituir o contrato (art. 95 da Lei 14.133).
{#instrumento_equivalente}{\xA7} O Aceite da Nota de Empenho ou do instrumento equivalente, emitida ao fornecedor adjudicado, implica o reconhecimento de que:

{\xA7\xA7} referida Nota est\xE1 substituindo o contrato, aplicando-se \xE0 rela\xE7\xE3o de neg\xF3cios ali estabelecida as disposi\xE7\xF5es da Lei n\xBA 14.133, de 2021;

{\xA7\xA7} a contratada se vincula \xE0 sua proposta e \xE0s previs\xF5es contidas neste Edital;

{\xA7\xA7} a contratada reconhece que as hip\xF3teses de rescis\xE3o s\xE3o aquelas previstas nos artigos 137 e 138 da Lei n\xBA 14.133, de 2021 e reconhece os direitos da Administra\xE7\xE3o previstos nos artigos 137 a 139 da mesma Lei.{/instrumento_equivalente}

{\xA7} Os prazos dos itens {\xA7ref@prazo_assinatura} e {\xA7ref@assinatura_alternativa} poder\xE3o ser prorrogados, por igual per\xEDodo, por solicita\xE7\xE3o justificada do adjudicat\xE1rio e aceita pela Administra\xE7\xE3o.

{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 o estabelecido no Termo de Refer\xEAncia/Projeto B\xE1sico.

{\xA7} Na assinatura do contrato ou instrumento equivalente ser\xE1 exigido o Cadastro Informativo de Cr\xE9ditos n\xE3o Quitados do Setor P\xFAblico Federal \u2013 Cadin e a comprova\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o e contrata\xE7\xE3o consignadas neste Edital, que dever\xE3o ser mantidas pelo fornecedor durante a vig\xEAncia do contrato.

{\xA7\xA7} A exist\xEAncia de registro no Cadin constitui fator impeditivo para a contrata\xE7\xE3o.

%% Servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o de obra (trechos em rosa no modelo): capital social (Tema 1118 do STF; art. 4\xBA-B da Lei 6.019/1974) e, em vigil\xE2ncia, art. 14 da Lei 14.967/2024.
{#dedicacao_exclusiva}{\xA7} Na contrata\xE7\xE3o de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o de capital social integralizado compat\xEDvel com o n\xFAmero de empregados, na forma do art. 4\xBA-B da Lei n\xBA 6.019/1974.

{\xA7\xA7} Caso se trate da contrata\xE7\xE3o de servi\xE7os de vigil\xE2ncia ou transporte de valores com dedica\xE7\xE3o exclusiva de m\xE3o de obra, a empresa dever\xE1 comprovar, como condi\xE7\xE3o para assinatura do contrato, que possui capital social m\xEDnimo integralizado de acordo com os valores estipulados no art. 14 da Lei n.\xBA 14.967/2024.{/dedicacao_exclusiva}

%% AGU: grande vulto \u2014 programa de integridade em 6 meses (art. 25, \xA7 4\xBA; Decreto 12.304/2024).
{#grande_vulto}{\xA7} Nas contrata\xE7\xF5es de obras, servi\xE7os e fornecimentos de grande vulto, o licitante vencedor dever\xE1 apresentar programa de integridade, no prazo de 6 (seis) meses, contado da celebra\xE7\xE3o do contrato, conforme Decreto n\xBA 12.304, de 9 de dezembro de 2024, e comprovar a sua implanta\xE7\xE3o nos termos da Portaria Normativa SE/CGU n\xBA 226/2025, considerados o valor original do contrato e o valor que poder\xE1 ser alcan\xE7ado por meio de eventuais aditivos contratuais.{/grande_vulto}

%% Dedica\xE7\xE3o exclusiva: mulheres v\xEDtimas de viol\xEAncia dom\xE9stica \u2014 8% das vagas com 25 ou mais colaboradores; abaixo disso, percentual definido pela Administra\xE7\xE3o.
{#dedicacao_exclusiva}{^reserva_vagas.menos_25}{\xA7} Na contrata\xE7\xE3o de servi\xE7os com dedica\xE7\xE3o exclusiva de m\xE3o-de-obra para contratos com quantitativo igual ou superior a 25 (vinte e cinco) colaboradores, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o, nos termos do disposto no art. 6\xBA, caput, inciso XVI, da Lei n\xBA 14.133, de 1\xBA de abril de 2021, do emprego de m\xE3o de obra constitu\xEDda por mulheres v\xEDtimas de viol\xEAncia dom\xE9stica, a partir da indica\xE7\xE3o do \xF3rg\xE3o respons\xE1vel pela pol\xEDtica p\xFAblica, em percentual igual ou superior a 8% (oito por cento) das vagas.{/reserva_vagas.menos_25}

{#reserva_vagas.menos_25}{\xA7} Considerando que a presente contrata\xE7\xE3o possui quantitativo inferior a vinte e cinco colaboradores, ser\xE1 exigida da empresa, como condi\xE7\xE3o para assinatura do contrato, a comprova\xE7\xE3o, nos termos do disposto no art. 6\xBA, caput, inciso XVI, da Lei n\xBA 14.133, de 1\xBA de abril de 2021, do emprego de m\xE3o de obra constitu\xEDda por mulheres v\xEDtimas de viol\xEAncia dom\xE9stica, a partir da indica\xE7\xE3o do \xF3rg\xE3o respons\xE1vel pela pol\xEDtica p\xFAblica, no percentual de {reserva_vagas.menos_25.percentual}.{/reserva_vagas.menos_25}{/dedicacao_exclusiva}

## {\xA7sec}. DOS RECURSOS

{\xA7} A interposi\xE7\xE3o de recurso referente ao julgamento das propostas, \xE0 habilita\xE7\xE3o ou inabilita\xE7\xE3o de licitantes, \xE0 anula\xE7\xE3o ou revoga\xE7\xE3o da licita\xE7\xE3o, observar\xE1 o disposto no art. 165 da Lei n\xBA 14.133, de 2021.

{\xA7} O prazo recursal \xE9 de 3 (tr\xEAs) dias \xFAteis, contados da data de intima\xE7\xE3o ou de lavratura da ata.

{\xA7@recurso_julgamento} Quando o recurso apresentado impugnar o julgamento das propostas ou o ato de habilita\xE7\xE3o ou inabilita\xE7\xE3o do licitante:

{\xA7\xA7} a inten\xE7\xE3o de recorrer dever\xE1 ser manifestada imediatamente, sob pena de preclus\xE3o;

{\xA7\xA7} o prazo para a manifesta\xE7\xE3o da inten\xE7\xE3o de recorrer n\xE3o ser\xE1 inferior a 10 (dez) minutos.

{\xA7\xA7} o prazo para apresenta\xE7\xE3o das raz\xF5es recursais ser\xE1 iniciado na data de intima\xE7\xE3o ou de lavratura da ata de habilita\xE7\xE3o ou inabilita\xE7\xE3o;

{\xA7\xA7} na hip\xF3tese de ado\xE7\xE3o da invers\xE3o de fases prevista no \xA7 1\xBA do art. 17 da Lei n\xBA 14.133, de 2021, o prazo para apresenta\xE7\xE3o das raz\xF5es recursais ser\xE1 iniciado na data de intima\xE7\xE3o da ata de julgamento.

{\xA7} Os recursos dever\xE3o ser encaminhados em campo pr\xF3prio do sistema.

{\xA7} O recurso ser\xE1 dirigido \xE0 autoridade que tiver editado o ato ou proferido a decis\xE3o recorrida, a qual poder\xE1 reconsiderar sua decis\xE3o no prazo de 3 (tr\xEAs) dias \xFAteis, ou, nesse mesmo prazo, encaminhar recurso para a autoridade superior, a qual dever\xE1 proferir sua decis\xE3o no prazo de 10 (dez) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Os recursos interpostos fora do prazo n\xE3o ser\xE3o conhecidos.

{\xA7} O prazo para apresenta\xE7\xE3o de contrarraz\xF5es ao recurso pelos demais licitantes ser\xE1 de 3 (tr\xEAs) dias \xFAteis, contados da data da intima\xE7\xE3o pessoal ou da divulga\xE7\xE3o da interposi\xE7\xE3o do recurso, assegurada a vista imediata dos elementos indispens\xE1veis \xE0 defesa de seus interesses.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o ter\xE3o efeito suspensivo do ato ou da decis\xE3o recorrida at\xE9 que sobrevenha decis\xE3o final da autoridade competente.

{\xA7} O acolhimento do recurso invalida t\xE3o somente os atos insuscet\xEDveis de aproveitamento.

{\xA7} Os autos do processo permanecer\xE3o com vista franqueada aos interessados no s\xEDtio eletr\xF4nico {licitacao.sitio_autos}.

## {\xA7sec}. DAS INFRA\xC7\xD5ES ADMINISTRATIVAS E SAN\xC7\xD5ES

{\xA7} Comete infra\xE7\xE3o administrativa, nos termos da lei, o licitante que, com dolo ou culpa:

{\xA7\xA7@inf1} deixar de entregar a documenta\xE7\xE3o exigida para o certame ou n\xE3o entregar qualquer documento que tenha sido solicitado pel{conducao.o} {conducao.agente} durante o certame;

{\xA7\xA7@inf2} salvo em decorr\xEAncia de fato superveniente devidamente justificado, n\xE3o mantiver a proposta em especial quando:

{\xA7\xA7\xA7} n\xE3o enviar a proposta ap\xF3s a negocia\xE7\xE3o;

{\xA7\xA7\xA7} recusar-se a enviar o detalhamento da proposta quando exig\xEDvel;

{\xA7\xA7\xA7} pedir para ser desclassificado quando encerrada a etapa competitiva;

{\xA7\xA7\xA7} deixar de apresentar amostra;

{\xA7\xA7\xA7} apresentar proposta ou amostra em desacordo com as especifica\xE7\xF5es do edital.

{\xA7\xA7@inf3} n\xE3o celebrar o contrato ou n\xE3o entregar a documenta\xE7\xE3o exigida para a contrata\xE7\xE3o, quando convocado dentro do prazo de validade de sua proposta;

{\xA7\xA7@inf4} recusar-se, sem justificativa, a assinar o contrato ou a aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o;

{\xA7\xA7@inf5} apresentar declara\xE7\xE3o ou documenta\xE7\xE3o falsa exigida para o certame ou prestar declara\xE7\xE3o falsa durante a licita\xE7\xE3o;

{\xA7\xA7@inf6} fraudar a licita\xE7\xE3o;

{\xA7\xA7@inf7} comportar-se de modo inid\xF4neo ou cometer fraude de qualquer natureza, em especial quando:

{\xA7\xA7\xA7} agir em conluio ou em desconformidade com a lei;

{\xA7\xA7\xA7} induzir deliberadamente a erro no julgamento;

{\xA7\xA7\xA7} apresentar amostra falsificada ou deteriorada.

{\xA7\xA7@inf8} praticar atos il\xEDcitos com vistas a frustrar os objetivos da licita\xE7\xE3o;

{\xA7\xA7@inf9} praticar ato lesivo previsto no art. 5\xBA da Lei n\xBA 12.846, de 2013.

{\xA7} Com fulcro na Lei n\xBA 14.133, de 2021, a Administra\xE7\xE3o poder\xE1, ap\xF3s regular processo administrativo, garantida a pr\xE9via defesa, aplicar aos licitantes e/ou adjudicat\xE1rios as seguintes san\xE7\xF5es, sem preju\xEDzo das responsabilidades civil e criminal:

{\xA7\xA7} advert\xEAncia;

{\xA7\xA7} multa;

{\xA7\xA7} impedimento de licitar e contratar e

{\xA7\xA7} declara\xE7\xE3o de inidoneidade para licitar ou contratar, enquanto perdurarem os motivos determinantes da puni\xE7\xE3o ou at\xE9 que seja promovida sua reabilita\xE7\xE3o perante a pr\xF3pria autoridade que aplicou a penalidade.

{\xA7} Na aplica\xE7\xE3o das san\xE7\xF5es ser\xE3o considerados:

{\xA7\xA7} a natureza e a gravidade da infra\xE7\xE3o cometida;

{\xA7\xA7} as peculiaridades do caso concreto;

{\xA7\xA7} as circunst\xE2ncias agravantes ou atenuantes;

{\xA7\xA7} os danos que dela provierem para a Administra\xE7\xE3o P\xFAblica;

{\xA7\xA7} a implanta\xE7\xE3o ou o aperfei\xE7oamento de programa de integridade, conforme normas e orienta\xE7\xF5es dos \xF3rg\xE3os de controle.

%% AGU: multa entre 0,5% e 30% do valor do contrato, proporcional \xE0 gravidade (art. 156, \xA7\xA7 1\xBA e 3\xBA).
{\xA7} A multa ser\xE1 recolhida no prazo m\xE1ximo de {multa.prazo_recolhimento} dias \xFAteis, a contar da comunica\xE7\xE3o oficial.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf1}, {\xA7ref@inf2} e {\xA7ref@inf3}, a multa ser\xE1 de {multa.leve_min} a {multa.leve_max} do valor do contrato licitado.

{\xA7\xA7} Para as infra\xE7\xF5es previstas nos itens {\xA7ref@inf4}, {\xA7ref@inf5}, {\xA7ref@inf6}, {\xA7ref@inf7}, {\xA7ref@inf8} e {\xA7ref@inf9}, a multa ser\xE1 de {multa.grave_min} a {multa.grave_max} do valor do contrato licitado.

{\xA7} As san\xE7\xF5es de advert\xEAncia, impedimento de licitar e contratar e declara\xE7\xE3o de inidoneidade para licitar ou contratar poder\xE3o ser aplicadas, cumulativamente ou n\xE3o, \xE0 penalidade de multa.

{\xA7} Na aplica\xE7\xE3o da san\xE7\xE3o de multa ser\xE1 facultada a defesa do interessado no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o.

{\xA7} A san\xE7\xE3o de impedimento de licitar e contratar ser\xE1 aplicada ao respons\xE1vel em decorr\xEAncia das infra\xE7\xF5es administrativas relacionadas nos itens {\xA7ref@inf1}, {\xA7ref@inf2}, {\xA7ref@inf3} e {\xA7ref@inf4}, quando n\xE3o se justificar a imposi\xE7\xE3o de penalidade mais grave, e impedir\xE1 o respons\xE1vel de licitar e contratar no \xE2mbito da Administra\xE7\xE3o P\xFAblica direta e indireta do ente federativo a qual pertencer o \xF3rg\xE3o ou entidade, pelo prazo m\xE1ximo de 3 (tr\xEAs) anos.

{\xA7} Poder\xE1 ser aplicada ao respons\xE1vel a san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar, em decorr\xEAncia da pr\xE1tica das infra\xE7\xF5es dispostas nos itens {\xA7ref@inf5}, {\xA7ref@inf6}, {\xA7ref@inf7}, {\xA7ref@inf8} e {\xA7ref@inf9}, bem como pelas infra\xE7\xF5es administrativas previstas nos itens {\xA7ref@inf1}, {\xA7ref@inf2}, {\xA7ref@inf3} e {\xA7ref@inf4} que justifiquem a imposi\xE7\xE3o de penalidade mais grave que a san\xE7\xE3o de impedimento de licitar e contratar, cuja dura\xE7\xE3o observar\xE1 o prazo previsto no art. 156, \xA75\xBA, da Lei n\xBA 14.133, de 2021.

{\xA7} A recusa injustificada do adjudicat\xE1rio em assinar o contrato ou em aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administra\xE7\xE3o, descrita no item {\xA7ref@inf3}, caracterizar\xE1 o descumprimento total da obriga\xE7\xE3o assumida e o sujeitar\xE1 \xE0s penalidades e \xE0 imediata perda da garantia de proposta em favor do \xF3rg\xE3o ou entidade promotora da licita\xE7\xE3o, nos termos do art. 45, \xA74\xBA da Instru\xE7\xE3o Normativa SEGES/ME n\xBA 73, de 30 de setembro de 2022.

{\xA7} A apura\xE7\xE3o de responsabilidade relacionadas \xE0s san\xE7\xF5es de impedimento de licitar e contratar e de declara\xE7\xE3o de inidoneidade para licitar ou contratar demandar\xE1 a instaura\xE7\xE3o de processo de responsabiliza\xE7\xE3o a ser conduzido por comiss\xE3o composta por 2 (dois) ou mais servidores est\xE1veis, que avaliar\xE1 fatos e circunst\xE2ncias conhecidos e intimar\xE1 o licitante ou o adjudicat\xE1rio para, no prazo de 15 (quinze) dias \xFAteis, contado da data de sua intima\xE7\xE3o, apresentar defesa escrita e especificar as provas que pretenda produzir.

{\xA7} Caber\xE1 recurso no prazo de 15 (quinze) dias \xFAteis da aplica\xE7\xE3o das san\xE7\xF5es de advert\xEAncia, multa e impedimento de licitar e contratar, contado da data da intima\xE7\xE3o, o qual ser\xE1 dirigido \xE0 autoridade que tiver proferido a decis\xE3o recorrida, que, se n\xE3o a reconsiderar no prazo de 5 (cinco) dias \xFAteis, encaminhar\xE1 o recurso com sua motiva\xE7\xE3o \xE0 autoridade superior, que dever\xE1 proferir sua decis\xE3o no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do recebimento dos autos.

{\xA7} Caber\xE1 a apresenta\xE7\xE3o de pedido de reconsidera\xE7\xE3o da aplica\xE7\xE3o da san\xE7\xE3o de declara\xE7\xE3o de inidoneidade para licitar ou contratar no prazo de 15 (quinze) dias \xFAteis, contado da data da intima\xE7\xE3o, e decidido no prazo m\xE1ximo de 20 (vinte) dias \xFAteis, contado do seu recebimento.

{\xA7} O recurso e o pedido de reconsidera\xE7\xE3o ter\xE3o efeito suspensivo do ato ou da decis\xE3o recorrida at\xE9 que sobrevenha decis\xE3o final da autoridade competente.

{\xA7} A aplica\xE7\xE3o das san\xE7\xF5es previstas neste edital n\xE3o exclui, em hip\xF3tese alguma, a obriga\xE7\xE3o de repara\xE7\xE3o integral dos danos causados.

{\xA7} Para a garantia da ampla defesa e contradit\xF3rio dos licitantes, as notifica\xE7\xF5es ser\xE3o enviadas eletronicamente para os endere\xE7os de e-mail informados na proposta comercial, bem como os cadastrados pela empresa no SICAF.

{\xA7\xA7} Os endere\xE7os de e-mail informados na proposta comercial e/ou cadastrados no Sicaf ser\xE3o considerados de uso cont\xEDnuo da empresa, n\xE3o cabendo alega\xE7\xE3o de desconhecimento das comunica\xE7\xF5es a eles comprovadamente enviadas.

## {\xA7sec}. DA IMPUGNA\xC7\xC3O AO EDITAL E DO PEDIDO DE ESCLARECIMENTO

{\xA7} Qualquer pessoa \xE9 parte leg\xEDtima para impugnar este Edital por irregularidade na aplica\xE7\xE3o da Lei n\xBA 14.133, de 2021, devendo protocolar o pedido at\xE9 3 (tr\xEAs) dias \xFAteis antes da data da abertura do certame.

{\xA7} A resposta \xE0 impugna\xE7\xE3o ou ao pedido de esclarecimento ser\xE1 divulgado em s\xEDtio eletr\xF4nico oficial no prazo de at\xE9 3 (tr\xEAs) dias \xFAteis, limitado ao \xFAltimo dia \xFAtil anterior \xE0 data da abertura do certame.

%% AGU: indicar os meios de recep\xE7\xE3o de impugna\xE7\xF5es e pedidos de esclarecimento.
{\xA7} A impugna\xE7\xE3o e o pedido de esclarecimento poder\xE3o ser realizados por forma eletr\xF4nica, pelos seguintes meios: {impugnacao.meios}.

{\xA7} As impugna\xE7\xF5es e pedidos de esclarecimentos n\xE3o suspendem os prazos previstos no certame.

{\xA7} A concess\xE3o de efeito suspensivo \xE0 impugna\xE7\xE3o \xE9 medida excepcional e dever\xE1 ser motivada pel{conducao.o} {conducao.agente}, nos autos do processo de licita\xE7\xE3o.

{\xA7} Acolhida a impugna\xE7\xE3o, ser\xE1 definida e publicada nova data para a realiza\xE7\xE3o do certame.

## {\xA7sec}. DAS DISPOSI\xC7\xD5ES GERAIS

{\xA7} Ser\xE1 divulgada ata da sess\xE3o p\xFAblica no sistema eletr\xF4nico.

{\xA7} N\xE3o havendo expediente ou ocorrendo qualquer fato superveniente que impe\xE7a a realiza\xE7\xE3o do certame na data marcada, a sess\xE3o ser\xE1 automaticamente transferida para o primeiro dia \xFAtil subsequente, no mesmo hor\xE1rio anteriormente estabelecido, desde que n\xE3o haja comunica\xE7\xE3o em contr\xE1rio, pel{conducao.o} {conducao.agente}.

{\xA7} Todas as refer\xEAncias de tempo no Edital, no aviso e durante a sess\xE3o p\xFAblica observar\xE3o o hor\xE1rio de Bras\xEDlia - DF.

{\xA7} A homologa\xE7\xE3o do resultado desta licita\xE7\xE3o n\xE3o implicar\xE1 direito \xE0 contrata\xE7\xE3o.

{\xA7} As normas disciplinadoras da licita\xE7\xE3o ser\xE3o sempre interpretadas em favor da amplia\xE7\xE3o da disputa entre os interessados, desde que n\xE3o comprometam o interesse da Administra\xE7\xE3o, o princ\xEDpio da isonomia, a finalidade e a seguran\xE7a da contrata\xE7\xE3o.

{\xA7} Os licitantes assumem todos os custos de prepara\xE7\xE3o e apresenta\xE7\xE3o de suas propostas e a Administra\xE7\xE3o n\xE3o ser\xE1, em nenhum caso, respons\xE1vel por esses custos, independentemente da condu\xE7\xE3o ou do resultado do processo licitat\xF3rio.

{\xA7} Na contagem dos prazos estabelecidos neste Edital e seus Anexos, excluir-se-\xE1 o dia do in\xEDcio e incluir-se-\xE1 o do vencimento. S\xF3 se iniciam e vencem os prazos em dias de expediente na Administra\xE7\xE3o.

{\xA7} O desatendimento de exig\xEAncias formais n\xE3o essenciais n\xE3o importar\xE1 o afastamento do licitante, desde que seja poss\xEDvel o aproveitamento do ato, observados os princ\xEDpios da isonomia e do interesse p\xFAblico.

{\xA7} Em caso de diverg\xEAncia entre disposi\xE7\xF5es deste Edital e de seus anexos ou demais pe\xE7as que comp\xF5em o processo, prevalecer\xE1 as deste Edital.

{\xA7} O Edital e seus anexos est\xE3o dispon\xEDveis, na \xEDntegra, no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP) e endere\xE7o eletr\xF4nico {licitacao.sitio_edital}.

{\xA7} Integram este Edital, para todos os fins e efeitos, os seguintes anexos:

{\xA7\xA7} Anexo I - Crit\xE9rios de Pontua\xE7\xE3o das Propostas T\xE9cnicas

{\xA7\xA7} ANEXO II \u2013Termo de Refer\xEAncia;

{\xA7\xA7\xA7} Ap\xEAndice do Anexo II \u2013 Estudo T\xE9cnico Preliminar;

%% Anexos conforme o caso, um por item com n\xFAmero e t\xEDtulo (ex.: Anexo II \u2013 Anteprojeto / Projeto B\xE1sico; Anexo III \u2013 Minuta de Termo de Contrato; Anexo IV \u2013Regras aplic\xE1veis ao instrumento substitutivo ao contrato; Anexo V \u2013 Termo de Ci\xEAncia e concord\xE2ncia; Anexo VI \u2013 Declara\xE7\xE3o de Responsabilidade pelo enquadramento sindical). AGU: em dedica\xE7\xE3o exclusiva, inserir o Anexo VII-C da IN SEGES 176/2024 (Declara\xE7\xE3o de Responsabilidade Sindical).
{*edital.anexos}{\xA7\xA7} {.valor};

{/edital.anexos}

{local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
`,"autorizacao-contratacao-direta":`@requer regime=14133
@cabecalho

# AUTORIZA\xC7\xC3O DE CONTRATA\xC7\xC3O DIRETA - {#inexigibilidade}INEX{/inexigibilidade}{^inexigibilidade}DISPENSA{/inexigibilidade} - NLL
{#inexigibilidade}INEXIGIBILIDADE{/inexigibilidade}{^inexigibilidade}DISPENSA DE LICITA\xC7\xC3O{/inexigibilidade} N\xBA {contratacao.numero}

> Processo n\xBA {processo}
> Unidade Gestora: {unidade_gestora}

## {\xA7sec}. DO OBJETO

{\xA7} {objeto|cap}

{#itens}| Item | Raz\xE3o Social (Contratada) | CNPJ | Total |
|---|---|---|---|
{*itens}| {.item} | {.razao_social} | {.cnpj} | R$ {.total} |
{/itens}{/itens}{^itens}> Empresa contratada: {contratada.razao_social}
> CNPJ/MF: {contratada.cnpj}
> Valor total da contrata\xE7\xE3o: R$ {valor_global} ({valor_global_extenso}).{/itens}

## {\xA7sec}. {#inexigibilidade}DA INEXIGIBILIDADE DE LICITA\xC7\xC3O{/inexigibilidade}{^inexigibilidade}DA DISPENSA DE LICITA\xC7\xC3O{/inexigibilidade}

{\xA7} {#hipotese.inex_exclusivo}O presente caso enquadra-se no inciso I do artigo 74 da Lei 14.133/2021, o que autoriza a contrata\xE7\xE3o direta por inexigibilidade de licita\xE7\xE3o.{/hipotese.inex_exclusivo}{#hipotese.inex_treinamento}O presente caso enquadra-se nos incisos III do artigo 74 e XVIII, al\xEDnea "f", do artigo 6\xBA, ambos da Lei 14.133/2021, o que autoriza a contrata\xE7\xE3o direta por inexigibilidade de licita\xE7\xE3o.{/hipotese.inex_treinamento}{#hipotese.dispensa_valor}O presente caso enquadra-se no inciso II do artigo 75 da Lei n\xBA 14.133/2021, com valor atualizado nos termos do art. 182 da Lei n\xBA 14.133/2021, o que autoriza a contrata\xE7\xE3o direta por dispensa de licita\xE7\xE3o.{/hipotese.dispensa_valor}

{\xA7} O processo de contrata\xE7\xE3o direta, que compreende os casos de inexigibilidade e de dispensa de licita\xE7\xE3o, exige autoriza\xE7\xE3o da autoridade competente, nos termos do art. 72, inciso VIII, da Lei n\xBA 14.133/2021.

## {\xA7sec}. DA AUTORIZA\xC7\xC3O DA CONTRATA\xC7\xC3O

{#dispensa_eletronica}{\xA7} Em decorr\xEAncia do resultado homologado da Dispensa Eletr\xF4nica n\xBA {contratacao.numero}, nos termos do relat\xF3rio SEI {dispensa_eletronica.relatorio_sei}.{/dispensa_eletronica}

{#hipotese.inex_exclusivo}{\xA7} Considerando que o caso ora em an\xE1lise aponta para a possibilidade legal de contrata\xE7\xE3o direta por inexigibilidade de licita\xE7\xE3o, em raz\xE3o da exclusividade para a presta\xE7\xE3o do servi\xE7o, conforme base legal transcrita:

> Art. 74. \xC9 inexig\xEDvel a licita\xE7\xE3o quando invi\xE1vel a competi\xE7\xE3o, em especial nos casos de:
> I - aquisi\xE7\xE3o de materiais, de equipamentos ou de g\xEAneros ou contrata\xE7\xE3o de servi\xE7os que s\xF3 possam ser fornecidos por produtor, empresa ou representante comercial exclusivos;{/hipotese.inex_exclusivo}{#hipotese.inex_treinamento}{\xA7} Considerando que o caso ora em an\xE1lise aponta para a possibilidade legal de contrata\xE7\xE3o direta por inexigibilidade de licita\xE7\xE3o, em raz\xE3o de se tratar de servi\xE7o t\xE9cnico especializado, conforme base legal transcrita:

> Art. 74. \xC9 inexig\xEDvel a licita\xE7\xE3o quando invi\xE1vel a competi\xE7\xE3o, em especial nos casos de:
> III - contrata\xE7\xE3o dos seguintes servi\xE7os t\xE9cnicos especializados de natureza predominantemente intelectual com profissionais ou empresas de not\xF3ria especializa\xE7\xE3o, vedada a inexigibilidade para servi\xE7os de publicidade e divulga\xE7\xE3o:
> [...]
> f) treinamento e aperfei\xE7oamento de pessoal;{/hipotese.inex_treinamento}{#hipotese.dispensa_valor}{\xA7} Considerando que o caso ora em an\xE1lise aponta para a possibilidade legal de contrata\xE7\xE3o direta por dispensa de licita\xE7\xE3o, em raz\xE3o do valor do objeto, conforme base legal transcrita:

> Art. 75. \xC9 dispens\xE1vel a licita\xE7\xE3o:
> II - para contrata\xE7\xE3o que envolva valores inferiores a R$ 50.000,00 (cinquenta mil reais), no caso de outros servi\xE7os e compras;
> (...)
> Art. 182. O Poder Executivo federal atualizar\xE1, a cada dia 1\xBA de janeiro, pelo \xCDndice Nacional de Pre\xE7os ao Consumidor Amplo Especial (IPCA-E) ou por \xEDndice que venha a substitu\xED-lo, os valores fixados por esta Lei, os quais ser\xE3o divulgados no PNCP.

> Valor atualizado para {limite_dispensa.exercicio}: R$ {limite_dispensa.valor}, conforme {limite_dispensa.decreto}.{/hipotese.dispensa_valor}

{\xA7} Eu, {autoridade.nome}, {autoridade.cargo}, DECLARO {#inexigibilidade}inexig\xEDvel{/inexigibilidade}{^inexigibilidade}dispens\xE1vel{/inexigibilidade} a realiza\xE7\xE3o de procedimento licitat\xF3rio e AUTORIZO a contrata\xE7\xE3o direta por {#inexigibilidade}inexigibilidade{/inexigibilidade}{^inexigibilidade}dispensa{/inexigibilidade} de licita\xE7\xE3o, nos termos do aduzido no Termo de Refer\xEAncia (SEI {tr.sei}).

## {\xA7sec}. DA PUBLICA\xC7\xC3O

{\xA7} Em aten\xE7\xE3o ao disposto no art. 72, par\xE1grafo \xFAnico e art. 94, combinado com o art. 175, todos da Lei n\xBA 14.133/2021, DETERMINO que a Ger\xEAncia de Licita\xE7\xF5es e Contratos lavre o competente instrumento de contrato e realize as publica\xE7\xF5es legais exigidas.

> **{autoridade.nome}**
> Autoridade Competente
> Assinado eletronicamente via SEI na data consignada
`,"aviso-dispensa-eletronica":`@requer regime=14133
@fonte aviso-dispensa-eletronica
@cabecalho

# AVISO DE DISPENSA ELETR\xD4NICA
# AVISO DE CONTRATA\xC7\xC3O DIRETA N.\xBA: {aviso.numero}/{aviso.ano}

> CONTRATANTE (UASG):
> CONSELHO FEDERAL DE CONTABILIDADE (383500)
> OBJETO:
> {objeto_curto|maiusculas}
> VALOR TOTAL DA CONTRATA\xC7\xC3O:
> R$ {valor_global}
> DATA DA SESS\xC3O:
> De {sessao.data}
> HOR\xC1RIO DA FASE DE LANCES:
> Das {sessao.hora_inicio} at\xE9 {sessao.hora_fim}
> CRIT\xC9RIO DE JULGAMENTO:
> {#maior_desconto}MAIOR DESCONTO{/maior_desconto}{^maior_desconto}MENOR PRE\xC7O{/maior_desconto}
> PREFER\xCANCIA ME/EPP/EQUIPARADAS
> {#preferencia_me_epp}SIM{/preferencia_me_epp}{^preferencia_me_epp}N\xC3O{/preferencia_me_epp}

> (Processo Administrativo n.\xBA {processo})

Torna-se p\xFAblico que o Conselho Federal de Contabilidade, por meio do Departamento de Licita\xE7\xF5es e Contratos, realizar\xE1 Dispensa Eletr\xF4nica, {#registro_precos}para registro de pre\xE7os, {/registro_precos}com crit\xE9rio de julgamento {#maior_desconto}maior desconto{/maior_desconto}{^maior_desconto}menor pre\xE7o{/maior_desconto}, na hip\xF3tese do art. 75, {art75_inciso}, nos termos da Lei n.\xBA 14.133, de 1\xBA de abril de 2021, da Instru\xE7\xE3o Normativa Seges/ME n.\xBA 67, de 2021, do Decreto n.\xBA 11.462, de 31 de mar\xE7o de 2023, e demais normas aplic\xE1veis.

> Data da sess\xE3o: {sessao.data}
> Hor\xE1rio da Fase de Lances: {sessao.hora_inicio} \xE0s {sessao.hora_fim}
> Link: {sessao.link}
> Crit\xE9rio de Julgamento: {#maior_desconto}maior desconto{/maior_desconto}{^maior_desconto}menor pre\xE7o{/maior_desconto}

%% UTILIZAR O T\xD3PICO ABAIXO NA CONTRATA\xC7\xC3O DE OBRAS E SERVI\xC7OS COMUNS DE ENGENHARIA
{#regime_execucao}> Regime de Execu\xE7\xE3o: {regime_execucao}.{/regime_execucao}

## {\xA7sec}. OBJETO DA CONTRATA\xC7\xC3O DIRETA

{\xA7} O objeto do presente procedimento \xE9 a escolha da proposta mais vantajosa para a contrata\xE7\xE3o, por dispensa de licita\xE7\xE3o, de {objeto_curto}, conforme condi\xE7\xF5es, quantidades e exig\xEAncias estabelecidas neste Aviso de Contrata\xE7\xE3o Direta e seus anexos.

{\xA7\xA7} Havendo mais de um item, faculta-se ao fornecedor a participa\xE7\xE3o em quantos forem de seu interesse.

{\xA7} O crit\xE9rio de julgamento adotado ser\xE1 o {#maior_desconto}maior desconto{/maior_desconto}{^maior_desconto}menor pre\xE7o{/maior_desconto}, observadas as exig\xEAncias contidas neste Aviso de Contrata\xE7\xE3o Direta e seus Anexos quanto \xE0s especifica\xE7\xF5es do objeto.

{#registro_precos}
## {\xA7sec}. REGISTRO DE PRE\xC7OS

{\xA7} As regras referentes aos \xF3rg\xE3os gerenciador e participantes, bem como a eventuais ades\xF5es s\xE3o as que constam da minuta de Ata de Registro de Pre\xE7os.
{/registro_precos}

## {\xA7sec}. PARTICIPA\xC7\xC3O NA DISPENSA ELETR\xD4NICA

{\xA7} A participa\xE7\xE3o na presente dispensa eletr\xF4nica ocorrer\xE1 por meio do Sistema de Dispensa Eletr\xF4nica, ferramenta informatizada integrante do Sistema de Compras do Governo Federal \u2013 Compras.gov.br, dispon\xEDvel no Portal de Compras do Governo Federal, no endere\xE7o eletr\xF4nico www.gov.br/compras.

{\xA7\xA7} O procedimento ser\xE1 divulgado no Compras.gov.br e no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas - PNCP, e encaminhado automaticamente aos fornecedores registrados no Sistema de Registro Cadastral Unificado - Sicaf, por mensagem eletr\xF4nica, na correspondente linha de fornecimento que pretende atender.

{\xA7\xA7} O Compras.gov.br poder\xE1 ser acessado pela web ou pelo aplicativo Compras.gov.br.

{\xA7\xA7} O fornecedor \xE9 o respons\xE1vel por qualquer transa\xE7\xE3o efetuada diretamente ou por seu representante no Sistema de Dispensa Eletr\xF4nica, n\xE3o cabendo ao provedor do Sistema ou ao \xF3rg\xE3o entidade promotor do procedimento a responsabilidade por eventuais danos decorrentes de uso indevido da senha, ainda que por terceiros n\xE3o autorizados.

%% UTILIZAR OS SUBITENS 3.2 A 3.2.2 SE A CONTRATA\xC7\xC3O FOR EXCLUSIVA PARA MICROEMPRESAS E EPP
{#exclusiva_me_epp}{\xA7} Para os itens {exclusiva_me_epp.itens}, a participa\xE7\xE3o \xE9 exclusiva a microempresas e empresas de pequeno porte, nos termos do art. 49, inciso IV, c/c o art. 48, inciso I, da Lei Complementar n.\xBA 123, de 14 de dezembro de 2006.

{\xA7\xA7} A obten\xE7\xE3o do benef\xEDcio a que se refere o item anterior fica limitada \xE0s microempresas e \xE0s empresas de pequeno porte que, no ano-calend\xE1rio de realiza\xE7\xE3o do procedimento, ainda n\xE3o tenham celebrado contratos com a Administra\xE7\xE3o P\xFAblica cujos valores somados extrapolem a receita bruta m\xE1xima admitida para fins de enquadramento como empresa de pequeno porte.

{\xA7\xA7} Ser\xE1 concedido tratamento favorecido para as microempresas e empresas de pequeno porte, para as sociedades cooperativas mencionadas no artigo 16 da Lei n.\xBA 14.133, de 2021, para o agricultor familiar, o produtor rural pessoa f\xEDsica e para o microempreendedor individual - MEI, nos limites previstos da Lei Complementar n.\xBA 123, de 2006 e do Decreto n.\xBA 8.538, de 2015.{/exclusiva_me_epp}

{\xA7@nao_participam} N\xE3o poder\xE3o participar desta dispensa de licita\xE7\xE3o:

{\xA7\xA7} aquele que n\xE3o atendam \xE0s condi\xE7\xF5es deste Aviso de Contrata\xE7\xE3o Direta e seu(s) anexo(s);

{\xA7\xA7} sociedade que desempenhem atividade incompat\xEDvel com o objeto da dispensa;

{\xA7\xA7} empresas estrangeiras que n\xE3o tenham representa\xE7\xE3o legal no Brasil com poderes expressos para receber cita\xE7\xE3o e responder administrativa ou judicialmente;

{\xA7\xA7@autor_projeto} autor do anteprojeto, do projeto b\xE1sico ou do projeto executivo, pessoa f\xEDsica ou jur\xEDdica, quando a contrata\xE7\xE3o versar sobre obra, servi\xE7os ou fornecimento de bens a ele relacionados;

{\xA7\xA7@empresa_projeto} empresa, isoladamente ou em cons\xF3rcio, respons\xE1vel pela elabora\xE7\xE3o do projeto b\xE1sico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, respons\xE1vel t\xE9cnico ou subcontratado, quando a contrata\xE7\xE3o versar sobre obra, servi\xE7os ou fornecimento de bens a ela necess\xE1rios;

{\xA7\xA7@sancao} pessoa f\xEDsica ou jur\xEDdica que se encontre, ao tempo da contrata\xE7\xE3o, impossibilitada de contratar em decorr\xEAncia de san\xE7\xE3o que lhe foi imposta;

{\xA7\xA7} aquele que mantenha v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade contratante ou com agente p\xFAblico que desempenhe fun\xE7\xE3o na dispensa de licita\xE7\xE3o ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau;

{\xA7\xA7} empresas controladoras, controladas ou coligadas, nos termos da Lei n.\xBA 6.404, de 15 de dezembro de 1976, concorrendo entre si;

{\xA7\xA7} pessoa f\xEDsica ou jur\xEDdica que, nos 5 (cinco) anos anteriores \xE0 divulga\xE7\xE3o do aviso, tenha sido condenada judicialmente, com tr\xE2nsito em julgado, por explora\xE7\xE3o de trabalho infantil, por submiss\xE3o de trabalhadores a condi\xE7\xF5es an\xE1logas \xE0s de escravo ou por contrata\xE7\xE3o de adolescentes nos casos vedados pela legisla\xE7\xE3o trabalhista;

{\xA7\xA7} Organiza\xE7\xF5es da Sociedade Civil de Interesse P\xFAblico - OSCIP, atuando nessa condi\xE7\xE3o.

%% UTILIZAR O SUBITEM ABAIXO SE FOR VEDADA A CONTRATA\xC7\xC3O DE EMPRESAS REUNIDAS EM CONS\xD3RCIO, EXCE\xC7\xC3O QUE DEVER\xC1 SER JUSTIFICADA NOS TERMOS DO ART. 15, DA LEI N\xBA 14.133/2021
{#vedado_consorcio}{\xA7\xA7} pessoas jur\xEDdicas reunidas em cons\xF3rcio.{/vedado_consorcio}

%% UTILIZAR O SUBITEM ABAIXO SE FOR VEDADA A CONTRATA\xC7\xC3O DE COOPERATIVAS
{#vedadas_cooperativas}{\xA7\xA7} sociedades cooperativas.{/vedadas_cooperativas}

{\xA7@agente_publico} N\xE3o poder\xE1 participar, direta ou indiretamente, da dispensa eletr\xF4nica ou da execu\xE7\xE3o do contrato agente p\xFAblico do \xF3rg\xE3o ou entidade contratante, devendo ser observadas as situa\xE7\xF5es que possam configurar conflito de interesses no exerc\xEDcio ou ap\xF3s o exerc\xEDcio do cargo ou emprego, nos termos da legisla\xE7\xE3o que disciplina a mat\xE9ria, conforme \xA71\xBA, do art. 9\xBA da Lei n.\xBA 14.133, de 2021.

{\xA7} O impedimento de que trata o item {\xA7ref@sancao} aplica-se tamb\xE9m ao fornecedor que atue em substitui\xE7\xE3o a outra pessoa, f\xEDsica ou jur\xEDdica, com o intuito de burlar a efetividade da san\xE7\xE3o a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o il\xEDcito ou a utiliza\xE7\xE3o fraudulenta da personalidade jur\xEDdica do fornecedor.

{\xA7} A crit\xE9rio da Administra\xE7\xE3o e exclusivamente a seu servi\xE7o, o autor dos projetos e a empresa a que se referem os itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} poder\xE3o participar no apoio das atividades de planejamento da contrata\xE7\xE3o, de execu\xE7\xE3o da dispensa ou de gest\xE3o do contrato, desde que sob supervis\xE3o exclusiva de agentes p\xFAblicos do \xF3rg\xE3o ou entidade.

{\xA7} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econ\xF4mico.

{\xA7} O disposto nos itens {\xA7ref@autor_projeto} e {\xA7ref@empresa_projeto} n\xE3o impede a dispensa ou a contrata\xE7\xE3o de servi\xE7o que inclua como encargo do contratado a elabora\xE7\xE3o do projeto b\xE1sico e do projeto executivo, nas contrata\xE7\xF5es integradas, e do projeto executivo, nos demais regimes de execu\xE7\xE3o.

{\xA7} Em dispensas e contrata\xE7\xF5es realizadas no \xE2mbito de projetos e programas parcialmente financiados por ag\xEAncia oficial de coopera\xE7\xE3o estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, n\xE3o poder\xE1 participar pessoa f\xEDsica ou jur\xEDdica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inid\xF4nea nos termos da Lei n\xBA 14.133, de 2021.

{\xA7} A veda\xE7\xE3o de que trata o item {\xA7ref@agente_publico}, estende-se a terceiro que auxilie a condu\xE7\xE3o da contrata\xE7\xE3o na qualidade de integrante de equipe de apoio, profissional especializado ou funcion\xE1rio ou representante de empresa que preste assessoria t\xE9cnica.

## {\xA7sec}. INGRESSO NA DISPENSA ELETR\xD4NICA E CADASTRAMENTO DA PROPOSTA INICIAL

{\xA7} O ingresso do fornecedor na disputa da dispensa eletr\xF4nica ocorrer\xE1 com o cadastramento de sua proposta inicial, na forma deste item.

{\xA7} O fornecedor interessado, ap\xF3s a divulga\xE7\xE3o do Aviso de Contrata\xE7\xE3o Direta, encaminhar\xE1, exclusivamente por meio do Sistema de Dispensa Eletr\xF4nica, a proposta com a descri\xE7\xE3o do objeto ofertado, a marca do produto, quando for o caso, e o pre\xE7o ou o desconto, at\xE9 a data e o hor\xE1rio estabelecidos para abertura do procedimento.

{\xA7\xA7} O fornecedor {^admite_quantitativo_inferior}n\xE3o {/admite_quantitativo_inferior}poder\xE1 oferecer proposta em quantitativo inferior ao m\xE1ximo previsto para contrata\xE7\xE3o.

{\xA7\xA7} {^precos_diferentes}N\xE3o ser\xE1 admitida a previs\xE3o de pre\xE7os diferentes em raz\xE3o de local de entrega ou de acondicionamento, tamanho de lote ou qualquer outro motivo.{/precos_diferentes}{#precos_diferentes}Ser\xE1 admitida a previs\xE3o de pre\xE7os diferentes, conforme os crit\xE9rios abaixo:{/precos_diferentes}

%% UTILIZAR O SUBITEM ABAIXO PARA DEFINI\xC7\xC3O DOS CRIT\xC9RIOS PREVISTOS NO ART. 15, INCISO III, DO DECRETO N\xBA 11.462/2023
{#precos_diferentes}{\xA7\xA7} {precos_diferentes.criterios}{/precos_diferentes}

{\xA7} Todas as especifica\xE7\xF5es do objeto contidas na proposta, em especial o pre\xE7o ou o desconto ofertado, vinculam a Contratada.

{\xA7} Nos valores propostos estar\xE3o inclusos todos os custos operacionais, encargos previdenci\xE1rios, trabalhistas, tribut\xE1rios, comerciais e quaisquer outros que incidam direta ou indiretamente na execu\xE7\xE3o do objeto.

{\xA7\xA7} A proposta dever\xE1 conter declara\xE7\xE3o de que compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constitui\xE7\xE3o Federal, nas leis trabalhistas, nas normas infralegais, nas conven\xE7\xF5es coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de entrega das propostas.

{\xA7\xA7} Os pre\xE7os ofertados, tanto na proposta inicial, quanto na etapa de lances, ser\xE3o de exclusiva responsabilidade do fornecedor, n\xE3o lhe assistindo o direito de pleitear qualquer altera\xE7\xE3o, sob alega\xE7\xE3o de erro, omiss\xE3o ou qualquer outro pretexto.

{\xA7} Se o regime tribut\xE1rio da empresa implicar o recolhimento de tributos em percentuais vari\xE1veis, a cota\xE7\xE3o adequada ser\xE1 aquela correspondente \xE0 m\xE9dia dos efetivos recolhimentos da empresa nos \xFAltimos doze meses.

{\xA7} Independentemente do percentual do tributo que constar da planilha, no pagamento ser\xE3o retidos na fonte os percentuais estabelecidos pela legisla\xE7\xE3o vigente.

%% UTILIZAR PROJETO B\xC1SICO QUANDO SE TRATAR DE CONTRATA\xC7\xC3O DE OBRAS OU SERVI\xC7OS COMUNS DE ENGENHARIA E PROJETO EXECUTIVO QUANDO A SUA ELABORA\xC7\xC3O N\xC3O FOR DELEGADA AO CONTRATADO
{\xA7} A apresenta\xE7\xE3o das propostas implica obrigatoriedade do cumprimento das disposi\xE7\xF5es nelas contidas, em conformidade com o que disp\xF5e o Termo de Refer\xEAncia, {#projeto_basico}{projeto_basico}, {/projeto_basico}assumindo o proponente o compromisso de executar os servi\xE7os nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utens\xEDlios necess\xE1rios, em quantidades e qualidades adequadas \xE0 perfeita execu\xE7\xE3o contratual, promovendo, quando requerido, sua substitui\xE7\xE3o.

{\xA7} O prazo de validade da proposta n\xE3o ser\xE1 inferior a {proposta.validade} dias, a contar da data de sua apresenta\xE7\xE3o.

{\xA7} No cadastramento da proposta inicial, o fornecedor dever\xE1, tamb\xE9m, assinalar Termo de Aceita\xE7\xE3o, em campo pr\xF3prio do sistema eletr\xF4nico, relativo \xE0s seguintes declara\xE7\xF5es:

{\xA7\xA7} que inexistem fatos impeditivos para sua habilita\xE7\xE3o no certame, ciente da obrigatoriedade de declarar ocorr\xEAncias posteriores;

{\xA7\xA7} que est\xE1 ciente e concorda com as condi\xE7\xF5es contidas no Aviso de Contrata\xE7\xE3o Direta e seus anexos;

{\xA7\xA7} que se responsabiliza pelas transa\xE7\xF5es que forem efetuadas no sistema, assumindo-as como firmes e verdadeiras;

{\xA7\xA7} que cumpre as exig\xEAncias de reserva de cargos para pessoa com defici\xEAncia e para reabilitado da Previd\xEAncia Social, de que trata o art. 93 da Lei n.\xBA 8.213, de 1991;

{\xA7\xA7} que n\xE3o emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e n\xE3o emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condi\xE7\xE3o de aprendiz, nos termos do artigo 7\xBA, XXXIII, da Constitui\xE7\xE3o;

{\xA7\xA7} n\xE3o possui empregados executando trabalho degradante ou for\xE7ado, observando o disposto nos incisos III e IV do art. 1\xBA e no inciso III do art. 5\xBA da Constitui\xE7\xE3o Federal.

{\xA7} O fornecedor organizado em cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 16 da Lei n.\xBA 14.133, de 2021.

{\xA7} O fornecedor dever\xE1 declarar em campo pr\xF3prio do sistema se o produto ou servi\xE7o ofertado \xE9 manufaturado nacional beneficiado por um dos crit\xE9rios de margem de prefer\xEAncia indicados no Termo de Refer\xEAncia, quando for o caso, para usufruir do benef\xEDcio.

{\xA7} O fornecedor enquadrado como microempresa, empresa de pequeno porte ou sociedade cooperativa dever\xE1 declarar, ainda, em campo pr\xF3prio do sistema eletr\xF4nico, que cumpre os requisitos estabelecidos no artigo 3\xBA da Lei Complementar n.\xBA 123, de 2006, estando apto a usufruir do tratamento favorecido estabelecido em seus arts. 42 a 49, observado o disposto nos \xA7\xA7 1\xBA ao 3\xBA do art. 4\xBA, da Lei n.\xBA 14.133, de 2021.

{\xA7} Desde que disponibilizada a funcionalidade no sistema, fica facultado ao fornecedor, ao cadastrar sua proposta inicial, a parametriza\xE7\xE3o de valor final m\xEDnimo, com o registro do seu lance final aceit\xE1vel (menor pre\xE7o ou maior desconto, conforme o caso).

{\xA7\xA7} Feita essa op\xE7\xE3o os lances ser\xE3o enviados automaticamente pelo sistema, respeitados os limites cadastrados pelo fornecedor e o intervalo m\xEDnimo entre lances previsto neste aviso.

{\xA7\xA7\xA7} Sem preju\xEDzo do disposto acima, os lances poder\xE3o ser enviados manualmente, na forma da se\xE7\xE3o respectiva deste Aviso de Contrata\xE7\xE3o Direta;

{\xA7\xA7} O valor final m\xEDnimo poder\xE1 ser alterado pelo fornecedor durante a fase de disputa, desde que n\xE3o assuma valor superior a lance j\xE1 registrado por ele no sistema.

{\xA7\xA7} O valor m\xEDnimo parametrizado possui car\xE1ter sigiloso aos demais participantes do certame e para o \xF3rg\xE3o ou entidade contratante. Apenas os lances efetivamente enviados poder\xE3o ser conhecidos dos fornecedores na forma da se\xE7\xE3o seguinte deste Aviso.

## {\xA7sec}. FASE DE LANCES

{\xA7} A partir da data e hor\xE1rio estabelecidos neste Aviso de Contrata\xE7\xE3o Direta, a sess\xE3o p\xFAblica ser\xE1 automaticamente aberta pelo sistema para o envio de lances p\xFAblicos e sucessivos, exclusivamente por meio do sistema eletr\xF4nico, sendo encerrado no hor\xE1rio de finaliza\xE7\xE3o de lances tamb\xE9m j\xE1 previsto neste aviso.

{\xA7} Iniciada a etapa competitiva, os fornecedores dever\xE3o encaminhar lances exclusivamente por meio de sistema eletr\xF4nico, sendo imediatamente informados do seu recebimento e do valor consignado no registro.

{\xA7\xA7} O lance dever\xE1 ser ofertado pelo {#maior_desconto}percentual de desconto do item{/maior_desconto}{^maior_desconto}valor unit\xE1rio{/maior_desconto}.

{\xA7} O fornecedor somente poder\xE1 oferecer valor inferior ou percentual de desconto superior ao \xFAltimo lance por ele ofertado e registrado pelo sistema.

{\xA7\xA7} O fornecedor poder\xE1 oferecer lances sucessivos iguais ou superiores ao lance que esteja vencendo o certame, desde que inferiores ao menor por ele ofertado e registrado pelo sistema, sendo tais lances definidos como \u201Clances intermedi\xE1rios\u201D para os fins deste Aviso de Contrata\xE7\xE3o Direta.

{\xA7\xA7} O intervalo m\xEDnimo de diferen\xE7a de valores ou percentuais entre os lances, que incidir\xE1 tanto em rela\xE7\xE3o aos lances intermedi\xE1rios quanto em rela\xE7\xE3o ao que cobrir a melhor oferta \xE9 de {lances.intervalo_minimo}.

{\xA7} Havendo lances iguais ao menor j\xE1 ofertado, prevalecer\xE1 aquele que for recebido e registrado primeiro no sistema.

{\xA7} Caso o fornecedor n\xE3o apresente lances, concorrer\xE1 com o valor de sua proposta.

{\xA7} Durante o procedimento, os fornecedores ser\xE3o informados, em tempo real, do valor do menor lance ou do maior desconto registrado, vedada a identifica\xE7\xE3o do fornecedor.

{\xA7} Imediatamente ap\xF3s o t\xE9rmino do prazo estabelecido para a fase de lances, haver\xE1 o seu encerramento, com o ordenamento e divulga\xE7\xE3o dos lances, pelo sistema, em ordem crescente de classifica\xE7\xE3o.

{\xA7\xA7} O encerramento da fase de lances ocorrer\xE1 de forma autom\xE1tica pontualmente no hor\xE1rio indicado, sem qualquer possibilidade de prorroga\xE7\xE3o e n\xE3o havendo tempo aleat\xF3rio ou mecanismo similar.

## {\xA7sec}. JULGAMENTO E ACEITA\xC7\xC3O DAS PROPOSTAS

{\xA7} Encerrada a fase de lances, quando a proposta do primeiro colocado permanecer acima do pre\xE7o m\xE1ximo ou abaixo do desconto definido para a contrata\xE7\xE3o, o pregoeiro poder\xE1 negociar condi\xE7\xF5es mais vantajosas.

{\xA7\xA7} Neste caso, ser\xE1 encaminhada contraproposta ao fornecedor que tenha apresentado o menor pre\xE7o ou o maior desconto, para que seja obtida a melhor proposta compat\xEDvel em rela\xE7\xE3o ao estipulado pela Administra\xE7\xE3o.

{\xA7\xA7} A negocia\xE7\xE3o poder\xE1 ser feita com os demais fornecedores classificados, exclusivamente por meio do sistema, respeitada a ordem de classifica\xE7\xE3o, quando o primeiro colocado, mesmo ap\xF3s a negocia\xE7\xE3o, for desclassificado em raz\xE3o de sua proposta permanecer acima do pre\xE7o m\xE1ximo ou abaixo do desconto definido para a contrata\xE7\xE3o.

{\xA7} Em qualquer caso, conclu\xEDda a negocia\xE7\xE3o, se houver, o resultado ser\xE1 divulgado a todos e registrado na ata do procedimento da dispensa eletr\xF4nica, devendo esta ser anexada aos autos do processo de contrata\xE7\xE3o.

{\xA7} Constatada a compatibilidade entre o valor da proposta e o estipulado para a contrata\xE7\xE3o, ser\xE1 solicitado ao fornecedor o envio da proposta adequada ao \xFAltimo lance ofertado ou ao valor negociado, se for o caso, acompanhada dos documentos complementares, quando necess\xE1rios.

%% UTILIZAR O SUBITEM ABAIXO SE FOR NECESS\xC1RIO A DISCRIMINA\xC7\xC3O DOS CUSTOS UNIT\xC1RIOS DO OBJETO E/OU PLANILHA DE FORMA\xC7\xC3O DE PRE\xC7OS
{#planilha_custos}{\xA7\xA7} Al\xE9m da documenta\xE7\xE3o supracitada, o fornecedor com a melhor proposta dever\xE1 encaminhar planilha com indica\xE7\xE3o de custos unit\xE1rios e forma\xE7\xE3o de pre\xE7os, conforme modelo anexo, com os valores adequados \xE0 proposta vencedora.{/planilha_custos}

{\xA7} Encerrada a etapa de negocia\xE7\xE3o, se houver, o pregoeiro verificar\xE1 se o fornecedor provisoriamente classificado em primeiro lugar atende \xE0s condi\xE7\xF5es de participa\xE7\xE3o no certame, conforme previsto no art. 14 da Lei n.\xBA 14.133, de 2021, legisla\xE7\xE3o correlata e nos itens {\xA7ref@nao_participam} e seguintes deste Aviso, especialmente quanto \xE0 exist\xEAncia de san\xE7\xE3o que impe\xE7a a participa\xE7\xE3o no processo de contrata\xE7\xE3o direta ou a futura contrata\xE7\xE3o, mediante a consulta aos seguintes cadastros:

{\xA7\xA7} SICAF;

{\xA7\xA7} Cadastro Nacional de Empresas Inid\xF4neas e Suspensas - CEIS, mantido pela Controladoria-Geral da Uni\xE3o (https://www.portaltransparencia.gov.br/sancoes/ceis); e

{\xA7\xA7} Cadastro Nacional de Empresas Punidas \u2013 CNEP, mantido pela Controladoria-Geral da Uni\xE3o (https://www.portaltransparencia.gov.br/sancoes/cnep).

{\xA7} A consulta aos cadastros ser\xE1 realizada no nome e no CNPJ da empresa fornecedora.

{\xA7} A consulta no CNEP quanto \xE0s san\xE7\xF5es previstas na Lei n\xBA 8.429, de 1992, tamb\xE9m ocorrer\xE1 no nome e no CPF do s\xF3cio majorit\xE1rio da empresa fornecedora, se houver, por for\xE7a do art. 12 da citada lei.

{\xA7} Caso conste na Consulta de Situa\xE7\xE3o do fornecedor a exist\xEAncia de Ocorr\xEAncias Impeditivas Indiretas, o \xF3rg\xE3o diligenciar\xE1 para verificar se houve fraude por parte das empresas apontadas no Relat\xF3rio de Ocorr\xEAncias Impeditivas Indiretas.

{\xA7\xA7} A tentativa de burla ser\xE1 verificada por meio dos v\xEDnculos societ\xE1rios, linhas de fornecimento similares, dentre outros.

{\xA7\xA7} O fornecedor ser\xE1 convocado para manifesta\xE7\xE3o previamente a uma eventual desclassifica\xE7\xE3o.

{\xA7\xA7} Constatada a exist\xEAncia de san\xE7\xE3o, o fornecedor ser\xE1 reputado inabilitado, por falta de condi\xE7\xE3o de participa\xE7\xE3o.

{\xA7} Verificadas as condi\xE7\xF5es de participa\xE7\xE3o, o gestor examinar\xE1 a proposta classificada em primeiro lugar quanto \xE0 adequa\xE7\xE3o ao objeto e \xE0 compatibilidade do pre\xE7o em rela\xE7\xE3o ao m\xE1ximo estipulado para contrata\xE7\xE3o neste Aviso de Contrata\xE7\xE3o Direta e em seus anexos.

{\xA7} Caso o fornecedor provisoriamente classificado em primeiro lugar tenha se utilizado de algum tratamento favorecido \xE0s ME/EPPs ou tenha se valido da aplica\xE7\xE3o da margem de prefer\xEAncia, o gestor verificar\xE1 se o fornecedor faz jus ao benef\xEDcio aplicado.

{\xA7\xA7} Caso o fornecedor n\xE3o venha a comprovar o atendimento dos requisitos para fazer jus ao benef\xEDcio da margem de prefer\xEAncia, as propostas ser\xE3o reclassificadas, para fins de nova aplica\xE7\xE3o da margem de prefer\xEAncia.

{\xA7} Verificadas as condi\xE7\xF5es de participa\xE7\xE3o e de utiliza\xE7\xE3o do tratamento favorecido, o gestor examinar\xE1 a proposta classificada em primeiro lugar quanto \xE0 adequa\xE7\xE3o ao objeto e \xE0 compatibilidade do pre\xE7o em rela\xE7\xE3o ao m\xE1ximo estipulado para contrata\xE7\xE3o neste Aviso de Contrata\xE7\xE3o Direta e em seus anexos.

{\xA7} Ser\xE1 desclassificada a proposta vencedora que:

{\xA7\xA7} contiver v\xEDcios insan\xE1veis;

{\xA7\xA7} n\xE3o obedecer \xE0s especifica\xE7\xF5es t\xE9cnicas pormenorizadas neste aviso ou em seus anexos;

{\xA7\xA7} apresentar pre\xE7os inexequ\xEDveis;

{\xA7\xA7} n\xE3o tiver sua exequibilidade demonstrada, quando exigido pela Administra\xE7\xE3o;

{\xA7\xA7} apresentar desconformidade com quaisquer outras exig\xEAncias deste aviso ou seus anexos, desde que insan\xE1vel.

{\xA7} Quando o fornecedor n\xE3o conseguir comprovar que possui ou possuir\xE1 recursos suficientes para executar a contento o objeto, ser\xE1 considerada inexequ\xEDvel a proposta de pre\xE7os ou menor lance que:

{\xA7\xA7} for insuficiente para a cobertura dos custos da contrata\xE7\xE3o, apresente pre\xE7os global ou unit\xE1rios simb\xF3licos, irris\xF3rios ou de valor zero, incompat\xEDveis com os pre\xE7os dos insumos e sal\xE1rios de mercado, acrescidos dos respectivos encargos, ainda que o ato convocat\xF3rio da dispensa n\xE3o tenha estabelecido limites m\xEDnimos, exceto quando se referirem a materiais e instala\xE7\xF5es de propriedade do pr\xF3prio fornecedor, para os quais ele renuncie a parcela ou \xE0 totalidade da remunera\xE7\xE3o.

{\xA7\xA7} apresentar um ou mais valores da planilha de custo que sejam inferiores \xE0queles fixados em instrumentos de car\xE1ter normativo obrigat\xF3rio, tais como leis, medidas provis\xF3rias e conven\xE7\xF5es coletivas de trabalho vigentes.

%% UTILIZAR OS SUBITENS 6.12 A 6.12.4 PARA CONTRATA\xC7\xC3O DE OBRAS OU SERVI\xC7OS COMUNS DE ENGENHARIA
{#engenharia}{\xA7} Em contrata\xE7\xE3o de obras ou servi\xE7os de engenharia, al\xE9m das disposi\xE7\xF5es acima, o crit\xE9rio de aceitabilidade de pre\xE7os considerar\xE1 o seguinte:

{\xA7\xA7} Ressalvado o objeto ou parte dele sujeito ao regime de empreitada por pre\xE7o unit\xE1rio, o crit\xE9rio de aceitabilidade de pre\xE7os ser\xE1 o valor global estimado para a contrata\xE7\xE3o.

{\xA7\xA7\xA7} Aquele que estiver mais bem colocado na disputa dever\xE1 apresentar \xE0 Administra\xE7\xE3o, por meio eletr\xF4nico, planilha que contenha o pre\xE7o global, os quantitativos e os pre\xE7os unit\xE1rios tidos como relevantes, conforme modelo de planilha elaborada pela Administra\xE7\xE3o, para efeito de avalia\xE7\xE3o de exequibilidade (art. 59, \xA73\xBA, da Lei n.\xBA 14.133, de 2021);

{\xA7\xA7} Para o objeto ou parte dele sujeito ao regime de empreitada por pre\xE7o unit\xE1rio o crit\xE9rio de aceitabilidade de pre\xE7os ser\xE1:

{\xA7\xA7\xA7} O valor global estimado para a contrata\xE7\xE3o.

{\xA7\xA7\xA7} Pre\xE7os unit\xE1rios: conforme Planilha de Custos elaborada pelo Contratante, anexa a este documento.

{\xA7\xA7} ser\xE3o consideradas inexequ\xEDveis as propostas cujos valores forem inferiores a 75% (setenta e cinco por cento) do valor or\xE7ado pela Administra\xE7\xE3o.

{\xA7\xA7} ser\xE1 exigida garantia adicional do fornecedor vencedor cuja proposta for inferior a 85% (oitenta e cinco por cento) do valor or\xE7ado pela Administra\xE7\xE3o, equivalente \xE0 diferen\xE7a entre este \xFAltimo e o valor da proposta, sem preju\xEDzo das demais garantias exig\xEDveis de acordo a Lei.{/engenharia}

{\xA7} Se houver ind\xEDcios de inexequibilidade da proposta de pre\xE7o, ou em caso da necessidade de esclarecimentos complementares, poder\xE3o ser efetuadas dilig\xEAncias, para que o fornecedor comprove a exequibilidade da proposta.

{\xA7} Erros no preenchimento da planilha n\xE3o constituem motivo para a desclassifica\xE7\xE3o da proposta. A planilha poder\xE1 ser ajustada pelo fornecedor, no prazo indicado pelo sistema, desde que n\xE3o haja majora\xE7\xE3o do pre\xE7o.

{\xA7\xA7} O ajuste de que trata este dispositivo se limita a sanar erros ou falhas que n\xE3o alterem a subst\xE2ncia das propostas;

{\xA7\xA7} Considera-se erro no preenchimento da planilha pass\xEDvel de corre\xE7\xE3o a indica\xE7\xE3o de recolhimento de impostos e contribui\xE7\xF5es na forma do Simples Nacional, quando n\xE3o cab\xEDvel esse regime.

{\xA7} Para fins de an\xE1lise da proposta quanto ao cumprimento das especifica\xE7\xF5es do objeto, poder\xE1 ser colhida a manifesta\xE7\xE3o escrita do setor requisitante do servi\xE7o ou da \xE1rea especializada no objeto.

{\xA7} Se a proposta ou lance vencedor for desclassificado, ser\xE1 examinada a proposta ou lance subsequente, e, assim sucessivamente, na ordem de classifica\xE7\xE3o.

{\xA7} Havendo necessidade, a sess\xE3o ser\xE1 suspensa, informando-se no \u201Cchat\u201D a nova data e hor\xE1rio para a sua continuidade.

{\xA7} Encerrada a an\xE1lise quanto \xE0 aceita\xE7\xE3o da proposta, ser\xE1 iniciada a fase de habilita\xE7\xE3o, observado o disposto neste Aviso de Contrata\xE7\xE3o Direta.

## {\xA7sec}. HABILITA\xC7\xC3O

{\xA7} Os documentos a serem exigidos para fins de habilita\xE7\xE3o, nos termos dos arts. 62 a 70 da Lei n.\xBA 14.133, de 2021, constam do Termo de Refer\xEAncia e ser\xE3o solicitados do fornecedor mais bem classificado na fase de lances.

{\xA7} A habilita\xE7\xE3o dos fornecedores ser\xE1 verificada por meio do SICAF, nos documentos por ele abrangidos.

{\xA7\xA7} \xC9 dever do fornecedor atualizar previamente as comprova\xE7\xF5es constantes do SICAF para que estejam vigentes na data da abertura da sess\xE3o p\xFAblica, ou encaminhar, quando solicitado, a respectiva documenta\xE7\xE3o atualizada.

{\xA7\xA7} O descumprimento do subitem acima implicar\xE1 a inabilita\xE7\xE3o do fornecedor, exceto se a consulta aos s\xEDtios eletr\xF4nicos oficiais emissores de certid\xF5es lograr \xEAxito em encontrar a(s) certid\xE3o(\xF5es) v\xE1lida(s).

{\xA7} Quando permitida a participa\xE7\xE3o de empresas estrangeiras que n\xE3o funcionem no Pa\xEDs, as exig\xEAncias de habilita\xE7\xE3o ser\xE3o atendidas mediante documentos equivalentes, inicialmente apresentados em tradu\xE7\xE3o livre.

{\xA7} Na hip\xF3tese de o vencedor ser empresa estrangeira que n\xE3o funcione no Pa\xEDs, para \uFB01ns de assinatura do contrato ou da ata de registro de pre\xE7os, os documentos exigidos para a habilita\xE7\xE3o ser\xE3o traduzidos por tradutor juramentado no Pa\xEDs e apostilados nos termos do disposto no Decreto n\xBA 8.660, de 29 de janeiro de 2016, ou de outro que venha a substitu\xED-lo, ou consularizados pelos respectivos consulados ou embaixadas.

%% UTILIZAR O SUBITENS 7.5 E 7.5.1 CASO SEJA PERMITIDA A CONTRATA\xC7\xC3O DE EMPRESAS REUNIDAS EM CONS\xD3RCIO, COM A DEFINI\xC7\xC3O DO PERCENTUAL, CONFORME ART. 15, \xA7 1\xB0, DA LEI N\xB0 14.133/2021
{#consorcio_permitido}{\xA7} Quando permitida a participa\xE7\xE3o de cons\xF3rcio de empresas, a habilita\xE7\xE3o t\xE9cnica, quando exigida, ser\xE1 feita por meio do somat\xF3rio dos quantitativos de cada consorciado e, para efeito de habilita\xE7\xE3o econ\xF4mico-financeira, quando exigida, ser\xE1 observado o somat\xF3rio dos valores de cada consorciado.

{\xA7\xA7} Se o cons\xF3rcio n\xE3o for formado integralmente por microempresas ou empresas de pequeno porte e o Termo de Refer\xEAncia exigir requisitos de habilita\xE7\xE3o econ\xF4mico-financeira, haver\xE1 um acr\xE9scimo de {consorcio_permitido.acrescimo} para o cons\xF3rcio em rela\xE7\xE3o ao valor exigido para os fornecedores individuais.{/consorcio_permitido}

{\xA7} Na hip\xF3tese de necessidade de envio de documentos complementares, indispens\xE1veis \xE0 confirma\xE7\xE3o dos j\xE1 apresentados para a habilita\xE7\xE3o, ou de documentos n\xE3o constantes do SICAF, o fornecedor ser\xE1 convocado a encaminh\xE1-los, em formato digital, por meio do sistema, no prazo de {habilitacao.prazo_documentos}, sob pena de inabilita\xE7\xE3o.

{\xA7} Somente haver\xE1 a necessidade de comprova\xE7\xE3o do preenchimento de requisitos mediante apresenta\xE7\xE3o dos documentos originais n\xE3o-digitais quando houver d\xFAvida em rela\xE7\xE3o \xE0 integridade do documento digital.

{\xA7} N\xE3o ser\xE3o aceitos documentos de habilita\xE7\xE3o com indica\xE7\xE3o de CNPJ/CPF diferentes, salvo aqueles legalmente permitidos.

{\xA7} Se o fornecedor for a matriz, todos os documentos dever\xE3o estar em nome da matriz, e se o fornecedor for a filial, todos os documentos dever\xE3o estar em nome da filial, exceto para atestados de capacidade t\xE9cnica, e no caso daqueles documentos que, pela pr\xF3pria natureza, comprovadamente, forem emitidos somente em nome da matriz.

{\xA7} Ser\xE3o aceitos registros de CNPJ de fornecedor matriz e filial com diferen\xE7as de n\xFAmeros de documentos pertinentes ao CND e ao CRF/FGTS, quando for comprovada a centraliza\xE7\xE3o do recolhimento dessas contribui\xE7\xF5es.

%% UTILIZAR OS SUBITENS 7.11 E 7.11.1 QUANDO A CONTRATA\xC7\xC3O DISPOR DE MAIS DE UM ITEM
{#varios_itens}{\xA7} O fornecedor provisoriamente vencedor em um item, que estiver concorrendo em outro item, ficar\xE1 obrigado a comprovar os requisitos de habilita\xE7\xE3o cumulativamente, isto \xE9, somando as exig\xEAncias do item em que venceu \xE0s do item em que estiver concorrendo, e assim sucessivamente, sob pena de inabilita\xE7\xE3o, al\xE9m da aplica\xE7\xE3o das san\xE7\xF5es cab\xEDveis.

{\xA7\xA7} N\xE3o havendo a comprova\xE7\xE3o cumulativa dos requisitos de habilita\xE7\xE3o, a inabilita\xE7\xE3o recair\xE1 sobre o(s) item(ns) de menor(es) valor(es) cuja retirada(s) seja(m) suficiente(s) para a habilita\xE7\xE3o do fornecedor nos remanescentes.{/varios_itens}

{\xA7} Havendo necessidade de analisar minuciosamente os documentos exigidos, a sess\xE3o ser\xE1 suspensa, sendo informada a nova data e hor\xE1rio para a sua continuidade.

{\xA7} Ser\xE1 inabilitado o fornecedor que n\xE3o comprovar sua habilita\xE7\xE3o, seja por n\xE3o apresentar quaisquer dos documentos exigidos, ou apresent\xE1-los em desacordo com o estabelecido neste Aviso de Contrata\xE7\xE3o Direta.

{\xA7\xA7} Na hip\xF3tese de o fornecedor n\xE3o atender \xE0s exig\xEAncias para a habilita\xE7\xE3o, o \xF3rg\xE3o ou entidade examinar\xE1 a proposta subsequente, e assim sucessivamente, na ordem de classifica\xE7\xE3o, at\xE9 a apura\xE7\xE3o de uma proposta que atenda \xE0s especifica\xE7\xF5es do objeto e as condi\xE7\xF5es de habilita\xE7\xE3o

{\xA7} Constatado o atendimento \xE0s exig\xEAncias de habilita\xE7\xE3o, o fornecedor ser\xE1 habilitado.

{#registro_precos}
## {\xA7sec}. ATA DE REGISTRO DE PRE\xC7OS

{\xA7} Homologado o resultado do procedimento, o fornecedor mais bem classificado ter\xE1 o prazo de {ata.prazo_assinatura} dias, contados a partir da data de sua convoca\xE7\xE3o, para assinar a Ata de Registro de Pre\xE7os, cujo prazo de validade encontra-se nela fixado, sob pena de decad\xEAncia do direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas na Lei n.\xBA 14.133, de 2021.

{\xA7} O prazo de convoca\xE7\xE3o poder\xE1 ser prorrogado uma vez, por igual per\xEDodo, mediante solicita\xE7\xE3o do fornecedor mais bem classificado ou convocado, desde que:

> (a) a solicita\xE7\xE3o seja devidamente justificada e apresentada dentro do prazo; e
> (b) a justificativa apresentada seja aceita pela Administra\xE7\xE3o.

{\xA7} A ata de registro de pre\xE7os ser\xE1 assinada por meio de assinatura digital e disponibilizada no sistema de registro de pre\xE7os.

{\xA7} Ser\xE3o formalizadas tantas Atas de Registro de Pre\xE7os quantas forem necess\xE1rias para o registro de todos os itens constantes no Termo de Refer\xEAncia, com a indica\xE7\xE3o do fornecedor vencedor, a descri\xE7\xE3o do(s) item(ns), as respectivas quantidades, pre\xE7os registrados e demais condi\xE7\xF5es.

{\xA7} O pre\xE7o registrado, com a indica\xE7\xE3o dos fornecedores, ser\xE1 divulgado no PNCP e disponibilizado durante a vig\xEAncia da ata de registro de pre\xE7os.

{\xA7} A exist\xEAncia de pre\xE7os registrados implicar\xE1 compromisso de fornecimento nas condi\xE7\xF5es estabelecidas, mas n\xE3o obrigar\xE1 a Administra\xE7\xE3o a contratar, facultada a realiza\xE7\xE3o de contrata\xE7\xE3o espec\xEDfica para a aquisi\xE7\xE3o pretendida, desde que devidamente justificada.

{\xA7} Na hip\xF3tese de o convocado n\xE3o assinar a ata de registro de pre\xE7os no prazo e nas condi\xE7\xF5es estabelecidas, fica facultado \xE0 Administra\xE7\xE3o convocar os fornecedores remanescentes do cadastro de reserva, na ordem de classifica\xE7\xE3o, para faz\xEA-lo em igual prazo e nas condi\xE7\xF5es propostas pelo primeiro classificado.

{\xA7} O prazo de vig\xEAncia da ata de registro de pre\xE7os ser\xE1 de 1 (um) ano e poder\xE1 ser prorrogado, por igual per\xEDodo, desde que comprovado o pre\xE7o vantajoso.

{\xA7\xA7} Em caso de prorroga\xE7\xE3o da ata, {#ata.renova_quantitativo}poder\xE1{/ata.renova_quantitativo}{^ata.renova_quantitativo}n\xE3o poder\xE1{/ata.renova_quantitativo} ser renovado o quantitativo originalmente registrado.

## {\xA7sec}. FORMA\xC7\xC3O DO CADASTRO DE RESERVA

{\xA7} Ap\xF3s a homologa\xE7\xE3o do procedimento, ser\xE1 inclu\xEDdo na ata, na forma de anexo, o registro:

{\xA7\xA7} dos fornecedores que aceitarem cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio, observada a classifica\xE7\xE3o no procedimento; e

{\xA7\xA7} dos fornecedores que mantiverem sua proposta original.

{\xA7} Ser\xE1 respeitada, nas contrata\xE7\xF5es, a ordem de classifica\xE7\xE3o dos fornecedores registrados na ata.

{\xA7} A apresenta\xE7\xE3o de novas propostas na forma deste item n\xE3o prejudicar\xE1 o resultado do procedimento em rela\xE7\xE3o ao fornecedor mais bem classificado.

{\xA7} Para fins da ordem de classifica\xE7\xE3o, os fornecedores que aceitarem cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio anteceder\xE3o aqueles que mantiverem sua proposta original.

{\xA7} A habilita\xE7\xE3o dos fornecedores que compor\xE3o o cadastro de reserva ser\xE1 efetuada quando houver necessidade de contrata\xE7\xE3o dos fornecedores remanescentes, nas seguintes hip\xF3teses:

{\xA7\xA7} quando o adjudicat\xE1rio n\xE3o assinar a ata de registro de pre\xE7os no prazo e nas condi\xE7\xF5es estabelecidos no aviso de dispensa; ou

{\xA7\xA7} quando houver o cancelamento do registro do fornecedor ou do registro de pre\xE7os, nas hip\xF3teses previstas nos art. 28 e art. 29 do Decreto n.\xBA 11.462, de 2023.

{\xA7} Na hip\xF3tese de nenhum dos fornecedores que aceitaram cotar o objeto com pre\xE7o igual ao do adjudicat\xE1rio concordar com a contrata\xE7\xE3o nos termos em igual prazo e nas condi\xE7\xF5es propostas pelo primeiro classificado, a Administra\xE7\xE3o, observados o valor estimado e a sua eventual atualiza\xE7\xE3o na forma prevista no Termo de Refer\xEAncia, poder\xE1:

{\xA7\xA7} convocar os fornecedores que mantiveram sua proposta original para negocia\xE7\xE3o, na ordem de classifica\xE7\xE3o, com vistas \xE0 obten\xE7\xE3o de pre\xE7o melhor, mesmo que acima do pre\xE7o do adjudicat\xE1rio; ou

{\xA7\xA7} adjudicar e firmar o contrato nas condi\xE7\xF5es ofertadas pelos fornecedores remanescentes, observada a ordem de classifica\xE7\xE3o, quando frustrada a negocia\xE7\xE3o de melhor condi\xE7\xE3o.
{/registro_precos}

## {\xA7sec}. CONTRATA\xC7\xC3O

{\xA7} Ap\xF3s a homologa\xE7\xE3o e adjudica\xE7\xE3o, caso se conclua pela contrata\xE7\xE3o, ser\xE1 firmado Termo de Contrato ou emitido instrumento equivalente.

{\xA7} O adjudicat\xE1rio ter\xE1 o prazo de {contratacao.prazo_assinatura} dias \xFAteis, contados a partir da data de sua convoca\xE7\xE3o, para {^instrumento_equivalente}assinar o Termo de Contrato{/instrumento_equivalente}{#instrumento_equivalente}aceitar instrumento equivalente ({instrumento_equivalente}){/instrumento_equivalente}, sob pena de decair o direito \xE0 contrata\xE7\xE3o, sem preju\xEDzo das san\xE7\xF5es previstas neste Aviso de Contrata\xE7\xE3o Direta.

{\xA7\xA7} Alternativamente \xE0 convoca\xE7\xE3o para comparecer perante o \xF3rg\xE3o ou entidade para a assinatura do Termo de Contrato, a Administra\xE7\xE3o poder\xE1 encaminh\xE1-lo para assinatura, mediante correspond\xEAncia postal com aviso de recebimento (AR), disponibiliza\xE7\xE3o de acesso \xE0 sistema de processo eletr\xF4nico para esse fim ou outro meio eletr\xF4nico, para que seja assinado e devolvido no prazo de {contratacao.prazo_devolucao} dias, a contar da data de seu recebimento ou da disponibiliza\xE7\xE3o do acesso ao sistema de processo eletr\xF4nico.

{\xA7\xA7} O prazo previsto no subitem anterior poder\xE1 ser prorrogado, por igual per\xEDodo, por solicita\xE7\xE3o justificada do adjudicat\xE1rio e aceita pela Administra\xE7\xE3o.

%% UTILIZAR OS SUBITENS 10.3 A 10.3.3 SE A NOTA DE EMPENHO OU INSTRUMENTO ASSEMELHADO SUBSTITUIR O CONTRATO
{#instrumento_equivalente}{\xA7} O Aceite da Nota de Empenho ou do instrumento equivalente, emitida ao fornecedor adjudicado, implica o reconhecimento de que:

{\xA7\xA7} referida Nota est\xE1 substituindo o contrato, aplicando-se \xE0 rela\xE7\xE3o de neg\xF3cios ali estabelecida as disposi\xE7\xF5es da Lei n.\xBA 14.133, de 2021;

{\xA7\xA7} a contratada se vincula \xE0 sua proposta e \xE0s previs\xF5es contidas no Aviso de Contrata\xE7\xE3o Direta e seus anexos;

{\xA7\xA7} a contratada reconhece que as hip\xF3teses de rescis\xE3o s\xE3o aquelas previstas nos artigos 137 e 138 da Lei n.\xBA 14.133, de 2021 e reconhece os direitos da Administra\xE7\xE3o previstos nos artigos 137 a 139 da mesma Lei.{/instrumento_equivalente}

{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 o estabelecido no Termo de Refer\xEAncia.

{\xA7} Na assinatura do contrato ou do instrumento equivalente ser\xE1 exigida a comprova\xE7\xE3o das condi\xE7\xF5es de habilita\xE7\xE3o e contrata\xE7\xE3o consignadas neste aviso, que dever\xE3o ser mantidas pelo fornecedor durante a vig\xEAncia do contrato.

## {\xA7sec}. INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} As infra\xE7\xF5es administrativas e san\xE7\xF5es est\xE3o previstas no Termo de Refer\xEAncia, observando ainda a Portaria CFC n\xBA 266/2025, dispon\xEDvel no portal da transpar\xEAncia do CFC (https://www3.cfc.org.br/spw/PortalTransparencia/Consulta.aspx), no que n\xE3o contrariar as regras espec\xEDficas fixadas para a contrata\xE7\xE3o.

## {\xA7sec}. DAS DISPOSI\xC7\xD5ES GERAIS

{\xA7} No caso de todos os fornecedores restarem desclassificados ou inabilitados (procedimento fracassado), a Administra\xE7\xE3o poder\xE1:

{\xA7\xA7@republicar} republicar o presente aviso com uma nova data;

{\xA7\xA7@proposta_pesquisa} valer-se, para a contrata\xE7\xE3o, de proposta obtida na pesquisa de pre\xE7os que serviu de base ao procedimento, se houver, privilegiando-se os menores pre\xE7os, sempre que poss\xEDvel, e desde que atendidas \xE0s condi\xE7\xF5es de habilita\xE7\xE3o exigidas;

{\xA7\xA7\xA7} No caso do subitem anterior, a contrata\xE7\xE3o ser\xE1 operacionalizada fora deste procedimento.

{\xA7\xA7} fixar prazo para que possa haver adequa\xE7\xE3o das propostas ou da documenta\xE7\xE3o de habilita\xE7\xE3o, conforme o caso.

{\xA7} As provid\xEAncias dos subitens {\xA7ref@republicar} e {\xA7ref@proposta_pesquisa} tamb\xE9m poder\xE3o ser utilizadas se n\xE3o houver o comparecimento de quaisquer fornecedores interessados (procedimento deserto).

{\xA7} Havendo a necessidade de realiza\xE7\xE3o de ato de qualquer natureza pelos fornecedores, cujo prazo n\xE3o conste deste Aviso de Contrata\xE7\xE3o Direta, dever\xE1 ser atendido o prazo indicado pelo agente competente da Administra\xE7\xE3o na respectiva notifica\xE7\xE3o.

{\xA7} Caber\xE1 ao fornecedor acompanhar as opera\xE7\xF5es, ficando respons\xE1vel pelo \xF4nus decorrente da perda do neg\xF3cio diante da inobserv\xE2ncia de quaisquer mensagens emitidas pela Administra\xE7\xE3o ou de sua desconex\xE3o.

{\xA7} N\xE3o havendo expediente ou ocorrendo qualquer fato superveniente que impe\xE7a a realiza\xE7\xE3o do certame na data marcada, a sess\xE3o ser\xE1 automaticamente transferida para o primeiro dia \xFAtil subsequente, no mesmo hor\xE1rio anteriormente estabelecido, desde que n\xE3o haja comunica\xE7\xE3o em contr\xE1rio.

{\xA7} Os hor\xE1rios estabelecidos na divulga\xE7\xE3o deste procedimento e durante o envio de lances observar\xE3o o hor\xE1rio de Bras\xEDlia-DF, inclusive para contagem de tempo e registro no Sistema e na documenta\xE7\xE3o relativa ao procedimento.

{\xA7} No julgamento das propostas e da habilita\xE7\xE3o, a Administra\xE7\xE3o poder\xE1 sanar erros ou falhas que n\xE3o alterem a subst\xE2ncia das propostas, dos documentos e sua validade jur\xEDdica, mediante despacho fundamentado, registrado em ata e acess\xEDvel a todos, atribuindo-lhes validade e efic\xE1cia para fins de habilita\xE7\xE3o e classifica\xE7\xE3o.

{\xA7} As normas disciplinadoras deste Aviso de Contrata\xE7\xE3o Direta ser\xE3o sempre interpretadas em favor da amplia\xE7\xE3o da disputa entre os interessados, desde que n\xE3o comprometam o interesse da Administra\xE7\xE3o, o princ\xEDpio da isonomia, a finalidade e a seguran\xE7a da contrata\xE7\xE3o.

{\xA7} Os fornecedores assumem todos os custos de prepara\xE7\xE3o e apresenta\xE7\xE3o de suas propostas e a Administra\xE7\xE3o n\xE3o ser\xE1, em nenhum caso, respons\xE1vel por esses custos, independentemente da condu\xE7\xE3o ou do resultado do processo de contrata\xE7\xE3o.

{\xA7} Em caso de diverg\xEAncia entre disposi\xE7\xF5es deste Aviso de Contrata\xE7\xE3o Direta e de seus anexos ou demais pe\xE7as que comp\xF5em o processo, prevalecer\xE1 as deste Aviso.

{\xA7} Da sess\xE3o p\xFAblica ser\xE1 divulgada Ata no sistema eletr\xF4nico.

{\xA7} Integram este Aviso de Contrata\xE7\xE3o Direta, para todos os fins e efeitos, os seguintes anexos:

{\xA7\xA7} ANEXO I \u2013 Termo de Refer\xEAncia;

{\xA7\xA7\xA7} Ap\xEAndice do ANEXO I \u2013 Estudo T\xE9cnico Preliminar;

{\xA7\xA7} ANEXO II \u2013 Minuta de Termo de Contrato;

{#registro_precos}{\xA7\xA7} ANEXO III \u2013 Minuta de Ata de Registro de Pre\xE7os.{/registro_precos}

{\xA7} {local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
`,"contrato-compras":`@requer regime=14133
@fonte contrato-compras
@padrao autoridade=autoridades.vp_gestao
%% Modelo PROJUR/CFC atualizado em 28/01/2026 (SEI 90796110000005.000003/2025-51) \u2014 Portaria PRES CFC 233/2025. Texto preto do modelo sem altera\xE7\xE3o; s\xF3 o vermelho \xE9 vari\xE1vel.
@cabecalho

# TERMO DE CONTRATO

> Processo n.\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: CONTRATO N.\xBA {contrato.numero}, QUE ENTRE SI CELEBRAM O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O Conselho Federal de Contabilidade, por interm\xE9dio do Departamento de Licita\xE7\xF5es e Contratos, com sede no SAUS Quadra 5, Bloco J, Ed. CFC, na cidade de Bras\xEDlia/DF, inscrito(a) no CNPJ sob o n.\xBA 33.618.570/0001-07, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, e a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n.\xBA {contratada.cnpj}, sediada na {contratada.endereco}, doravante designado CONTRATADO, neste ato representado por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}ato constitutivo da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n.\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n.\xBA 14.133, de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente {#inexigibilidade}da Inexigibilidade de Licita\xE7\xE3o n.\xBA {contratacao.numero}{/inexigibilidade}{^inexigibilidade}da Dispensa de Licita\xE7\xE3o n.\xBA {contratacao.numero}{/inexigibilidade}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO (art. 92, I e II)

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de {objeto_contratacao}, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

{\xA7} Objeto da contrata\xE7\xE3o:

| ITEM | ESPECIFICA\xC7\xC3O | CATMAT | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

{\xA7\xA7} {#dispensa_eletronica}O Aviso de Dispensa Eletr\xF4nica;{/dispensa_eletronica}{^dispensa_eletronica}A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta;{/dispensa_eletronica}

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% UTILIZAR OS SUBITENS 2.1 E 2.1.1 NA HIP\xD3TESE DE CONTRATA\xC7\xC3O COM OBJETO POR ESCOPO (ART. 105)
{#vigencia.escopo}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do art. 105 da Lei n.\xBA 14.133, de 2021.

{\xA7\xA7} O prazo de vig\xEAncia ser\xE1 automaticamente prorrogado, independentemente de termo aditivo, quando o objeto n\xE3o for conclu\xEDdo no per\xEDodo firmado acima, ressalvadas as provid\xEAncias cab\xEDveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 2.3 A 2.7 PARA CONTRATA\xC7\xC3O COM FORNECIMENTO CONTINUADO (ARTS. 106 E 107)
{#vigencia.continuada}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n.\xBA 14.133, de 2021.

{\xA7\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, bem como \xE0 inexist\xEAncia de registros no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.{/vigencia.continuada}

%% UTILIZAR O SUBITEM ABAIXO PARA CONTRATA\xC7\xD5ES EMERGENCIAIS (ART. 75, VIII)
{#vigencia.emergencial}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrog\xE1vel, na forma do art. 75, VIII da Lei n.\xBA 14.133, de 2021.{/vigencia.emergencial}

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS (art. 92, IV, VII e XVIII)

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - PRE\xC7O

{#valor_mensal}{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{\xA7} O valor total da contrata\xE7\xE3o \xE9 de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% UTILIZAR O SUBITEM ABAIXO QUANDO O VALOR DA CONTRATA\xC7\xC3O FOR DEFINIDO POR DEMANDA VARI\xC1VEL
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO (art. 92, V e VI)

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes, encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 REAJUSTE DOS PRE\xC7OS (art. 92, V)

{\xA7} As regras acerca do reajuste dos pre\xE7os encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE (art. 92, X, XI e XIV)

{\xA7} As obriga\xE7\xF5es do CONTRATANTE encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 OBRIGA\xC7\xD5ES DO CONTRATADO (art. 92, XIV, XVI e XVII)

{\xA7} As obriga\xE7\xF5es do CONTRATADO encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.

%% UTILIZAR A CL\xC1USULA ABAIXO PARA A CONTRATA\xC7\xC3O QUE ENVOLVA, DE QUALQUER FORMA, O TRATAMENTO DE DADOS PESSOAIS
{#lgpd}## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n.\xBA 13.709, de 14 de agosto de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de suboperadores e subcontratados o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA71\xBA, do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O (art. 92, XII)

{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} A contrata\xE7\xE3o conta com garantia de execu\xE7\xE3o na forma prevista no Termo de Refer\xEAncia, em aten\xE7\xE3o ao art. 96 da Lei n.\xBA 14.133, de 2021.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS (art. 92, XIV)

{\xA7} As infra\xE7\xF5es administrativas e san\xE7\xF5es est\xE3o previstas no Termo de Refer\xEAncia, observando ainda a Portaria CFC n\xBA 266/2025, dispon\xEDvel no portal da transpar\xEAncia do CFC (https://www3.cfc.org.br/spw/PortalTransparencia/Consulta.aspx), no que n\xE3o contrariar as regras espec\xEDficas fixadas para a contrata\xE7\xE3o.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL (art. 92, XIX)

%% UTILIZAR OS SUBITENS 13.1 A 13.3.2 PARA CONTRATA\xC7\xC3O COM OBJETO POR ESCOPO
{#vigencia.escopo}{\xA7} O contrato ser\xE1 extinto quando cumpridas as obriga\xE7\xF5es de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{\xA7} Se as obriga\xE7\xF5es n\xE3o forem cumpridas no prazo estipulado, a vig\xEAncia ficar\xE1 prorrogada at\xE9 a conclus\xE3o do objeto, caso em que dever\xE1 a Administra\xE7\xE3o providenciar a readequa\xE7\xE3o do cronograma fixado para o contrato.

{\xA7} Quando a n\xE3o conclus\xE3o do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{\xA7\xA7} ficar\xE1 ele constitu\xEDdo em mora, sendo-lhe aplic\xE1veis as respectivas san\xE7\xF5es administrativas; e

{\xA7\xA7} poder\xE1 a Administra\xE7\xE3o optar pela extin\xE7\xE3o do contrato e, nesse caso, adotar\xE1 as medidas admitidas em lei para a continuidade da execu\xE7\xE3o contratual.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 13.4 A 13.5.2 PARA FORNECIMENTOS CONT\xCDNUOS, ALUGUEL DE EQUIPAMENTOS E PROGRAMAS DE INFORM\xC1TICA (ART. 106)
{#vigencia.continuada}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, quando este n\xE3o dispuser de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou quando entender que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n.\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n.\xBA 14.133, de 2021.{/vigencia.continuada}

%% UTILIZAR O SUBITEM 13.6 PARA CONTRATA\xC7\xC3O DECORRENTE DA DISPENSA DO ART. 75, INC. VIII
{#vigencia.emergencial}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.\xBA 14.133, de 2021, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.{/vigencia.emergencial}

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no art. 137 da Lei n.\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do Balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Das Rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das Indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio (art. 131, caput, da Lei n.\xBA 14.133, de 2021).

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade CONTRATANTE ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o no processo de contrata\xE7\xE3o direta ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau (art. 14, inciso IV, da Lei n.\xBA 14.133, de 2021);

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos artigos 124 e seguintes da Lei n.\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato, e, nos casos de reforma de edif\xEDcio ou de equipamento, o limite para os acr\xE9scimos ser\xE1 de 50% (cinquenta por cento).

{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs (art. 132 da Lei n.\xBA 14.133, de 2021).

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n.\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA (art. 92, VIII)

{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o est\xE3o programadas em dota\xE7\xE3o or\xE7ament\xE1ria pr\xF3pria, conta cont\xE1bil {dotacao.conta}, Projeto n.\xBA {dotacao.projeto}, de acordo com Or\xE7amento Anual para {dotacao.exercicio} do CFC, aprovado pela Resolu\xE7\xE3o CFC n.\xBA {dotacao.resolucao}.

%% UTILIZAR O SUBITEM ABAIXO PARA A CONTRATA\xC7\xC3O DE FORNECIMENTO CONTINUADO (ART. 106, II)
{#vigencia.continuada}{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.{/vigencia.continuada}

## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS (art. 92, III)

{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n.\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n.\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 \xE0 CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl}\u2013 FORO (art. 92, \xA71\xBA)

{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n.\xBA 14.133, de 2021.

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
`,"contrato-servicos":`@requer regime=14133
@fonte contrato-servicos
@padrao autoridade=autoridades.vp_gestao
%% Modelo PROJUR/CFC atualizado em 28/01/2026 (SEI 90796110000005.000003/2025-51) \u2014 Portaria PRES CFC 233/2025. Texto preto do modelo sem altera\xE7\xE3o; s\xF3 o vermelho \xE9 vari\xE1vel.
@cabecalho

# TERMO DE CONTRATO

> Processo n.\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: CONTRATO N.\xBA {contrato.numero}, QUE ENTRE SI CELEBRAM O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O Conselho Federal de Contabilidade, por interm\xE9dio do Departamento de Licita\xE7\xF5es e Contratos, com sede no SAUS Quadra 5, Bloco J, Ed. CFC, na cidade de Bras\xEDlia/DF, inscrito(a) no CNPJ sob o n.\xBA 33.618.570/0001-07, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, e a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n.\xBA {contratada.cnpj}, sediada na {contratada.endereco}, doravante designado CONTRATADO, neste ato representado por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}ato constitutivo da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n.\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n.\xBA 14.133, de 2021, e demais legisla\xE7\xE3o aplic\xE1vel, resolvem celebrar o presente Termo de Contrato, decorrente {#inexigibilidade}da Inexigibilidade de Licita\xE7\xE3o n.\xBA {contratacao.numero}{/inexigibilidade}{^inexigibilidade}da Dispensa de Licita\xE7\xE3o n.\xBA {contratacao.numero}{/inexigibilidade}, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO (art. 92, I e II)

{\xA7} O objeto do presente instrumento \xE9 a contrata\xE7\xE3o de {objeto_contratacao}, nas condi\xE7\xF5es estabelecidas no Termo de Refer\xEAncia.

{\xA7} Objeto da contrata\xE7\xE3o:

| ITEM | ESPECIFICA\xC7\xC3O | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNIT\xC1RIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{\xA7} Vinculam esta contrata\xE7\xE3o, independentemente de transcri\xE7\xE3o:

{\xA7\xA7} O Termo de Refer\xEAncia;

{\xA7\xA7} {#dispensa_eletronica}O Aviso de Dispensa Eletr\xF4nica;{/dispensa_eletronica}{^dispensa_eletronica}A Autoriza\xE7\xE3o de Contrata\xE7\xE3o Direta;{/dispensa_eletronica}

{\xA7\xA7} A Proposta do CONTRATADO;

{\xA7\xA7} Eventuais anexos dos documentos supracitados.

%% UTILIZAR O SUBITEM ABAIXO SE A CONTRATA\xC7\xC3O TIVER COMO OBJETO OBRAS E SERVI\xC7OS COMUNS DE ENGENHARIA
{#regime_execucao}{\xA7} O regime de execu\xE7\xE3o \xE9 o de {regime_execucao}.{/regime_execucao}

## CL\xC1USULA {\xA7cl} \u2013 VIG\xCANCIA E PRORROGA\xC7\xC3O

%% UTILIZAR OS SUBITENS 2.1 E 2.2 NA HIP\xD3TESE DE CONTRATA\xC7\xC3O COM OBJETO POR ESCOPO (ART. 105)
{#vigencia.escopo}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do art. 105 da Lei n.\xBA 14.133, de 2021.

{\xA7} O prazo de vig\xEAncia ser\xE1 automaticamente prorrogado, independentemente de termo aditivo, quando o objeto n\xE3o for conclu\xEDdo no per\xEDodo firmado acima, ressalvadas as provid\xEAncias cab\xEDveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 2.3 A 2.8 QUANDO SE TRATAR DE CONTRATA\xC7\xC3O COM OBJETO A TERMO (SE EXTINGUE PELA CONCLUS\xC3O DO PRAZO)
{#vigencia.continuada}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrog\xE1vel sucessivamente por at\xE9 10 anos, na forma dos artigos 106 e 107 da Lei n.\xBA 14.133, de 2021.

{\xA7} A prorroga\xE7\xE3o de que trata este item \xE9 condicionada ao ateste, pela autoridade competente, de que as condi\xE7\xF5es e os pre\xE7os permanecem vantajosos para a Administra\xE7\xE3o, permitida a negocia\xE7\xE3o com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{\xA7\xA7} Estar formalmente demonstrado no processo que a forma de presta\xE7\xE3o dos servi\xE7os tem natureza continuada;

{\xA7\xA7} Seja juntado relat\xF3rio que discorra sobre a execu\xE7\xE3o do contrato, com informa\xE7\xF5es de que os servi\xE7os tenham sido prestados regularmente;

{\xA7\xA7} Seja juntada justificativa e motivo, por escrito, de que a Administra\xE7\xE3o mant\xE9m interesse na realiza\xE7\xE3o do servi\xE7o;

{\xA7\xA7} Haja manifesta\xE7\xE3o expressa do CONTRATADO informando o interesse na prorroga\xE7\xE3o;

{\xA7\xA7} Seja comprovado que o CONTRATADO mant\xE9m as condi\xE7\xF5es iniciais de habilita\xE7\xE3o;

{\xA7\xA7} N\xE3o haja registro no Cadastro Informativo de cr\xE9ditos n\xE3o quitados do setor p\xFAblico federal (Cadin).

{\xA7} O CONTRATADO n\xE3o tem direito subjetivo \xE0 prorroga\xE7\xE3o contratual.

{\xA7} A prorroga\xE7\xE3o de contrato dever\xE1 ser promovida mediante celebra\xE7\xE3o de termo aditivo.

{\xA7} Nas eventuais prorroga\xE7\xF5es contratuais, os custos n\xE3o renov\xE1veis j\xE1 pagos ou amortizados ao longo do primeiro per\xEDodo de vig\xEAncia da contrata\xE7\xE3o dever\xE3o ser reduzidos ou eliminados como condi\xE7\xE3o para a renova\xE7\xE3o.

{\xA7} O contrato n\xE3o poder\xE1 ser prorrogado quando o CONTRATADO tiver sido penalizado nas san\xE7\xF5es de declara\xE7\xE3o de inidoneidade ou impedimento de licitar e contratar com poder p\xFAblico, observadas as abrang\xEAncias de aplica\xE7\xE3o.{/vigencia.continuada}

%% UTILIZAR A REDA\xC7\xC3O DO SUBITEM ABAIXO PARA CONTRATA\xC7\xD5ES EMERGENCIAIS (ART. 75, VIII)
{#vigencia.emergencial}{\xA7} O prazo de vig\xEAncia da contrata\xE7\xE3o \xE9 de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrog\xE1vel, na forma do art. 75, inc. VIII, da Lei n.\xBA 14.133, de 2021.{/vigencia.emergencial}

## CL\xC1USULA {\xA7cl} \u2013 MODELOS DE EXECU\xC7\xC3O E GEST\xC3O CONTRATUAIS (art. 92, IV, VII e XVIII)

{\xA7} O regime de execu\xE7\xE3o contratual, os modelos de gest\xE3o e de execu\xE7\xE3o, assim como os prazos e condi\xE7\xF5es de conclus\xE3o, entrega, observa\xE7\xE3o e recebimento do objeto constam no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 SUBCONTRATA\xC7\xC3O

{\xA7} As regras sobre a subcontrata\xE7\xE3o do objeto s\xE3o aquelas estabelecidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} - PRE\xC7O

{#valor_mensal}{\xA7} O valor mensal da contrata\xE7\xE3o \xE9 de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{\xA7} O valor total da contrata\xE7\xE3o \xE9 de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% UTILIZAR O SUBITEM ABAIXO QUANDO O VALOR DA CONTRATA\xC7\xC3O FOR DEFINIDO POR DEMANDA VARI\xC1VEL
{#valor_por_demanda}{\xA7} O valor acima \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos de servi\xE7os efetivamente prestados.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - PAGAMENTO (art. 92, V e VI)

{\xA7} O prazo para pagamento ao CONTRATADO e demais condi\xE7\xF5es a ele referentes, encontram-se definidos no Termo de Refer\xEAncia, anexo a este Contrato.

%% UTILIZAR A CL\xC1USULA DE REPACTUA\xC7\xC3O PARA A CONTRATA\xC7\xC3O DE SERVI\xC7OS COM DEDICA\xC7\xC3O EXCLUSIVA DE M\xC3O DE OBRA
{^dedicacao_exclusiva}## CL\xC1USULA {\xA7cl} \u2013 REAJUSTE DOS PRE\xC7OS (art. 92, V)

{\xA7} As regras acerca do reajuste dos pre\xE7os encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.
{/dedicacao_exclusiva}{#dedicacao_exclusiva}## CL\xC1USULA {\xA7cl} - REPACTUA\xC7\xC3O DOS PRE\xC7OS (art. 92, V e X)

{\xA7} As regras acerca da repactua\xE7\xE3o dos pre\xE7os encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.
{/dedicacao_exclusiva}
## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES DO CONTRATANTE (art. 92, X, XI e XIV)

{\xA7} As obriga\xE7\xF5es do CONTRATANTE encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.

## CL\xC1USULA {\xA7cl} \u2013 OBRIGA\xC7\xD5ES DO CONTRATADO (art. 92, XIV, XVI e XVII)

{\xA7} As obriga\xE7\xF5es do CONTRATADO encontram-se definidas no Termo de Refer\xEAncia, anexo a este Contrato.

%% UTILIZAR A CL\xC1USULA ABAIXO PARA A CONTRATA\xC7\xC3O DE SERVI\xC7OS COM DEDICA\xC7\xC3O EXCLUSIVA DE M\xC3O DE OBRA
{#dedicacao_exclusiva}## CL\xC1USULA {\xA7cl} - DA COMPENSA\xC7\xC3O DA JORNADA DE TRABALHO

{\xA7} A compensa\xE7\xE3o de jornada dos trabalhadores do CONTRATADO alocados \xE0 execu\xE7\xE3o contratual em regime de dedica\xE7\xE3o exclusiva, quando compat\xEDvel com a natureza dos servi\xE7os prestados, ser\xE1 realizada de acordo com as regras constantes do Decreto n.\xBA 12.174, de 11 de setembro de 2024, da Instru\xE7\xE3o Normativa SEGES/MGI n\xBA 81, de 12 de setembro de 2024, e do Termo de Refer\xEAncia, anexo a este Contrato.

{/dedicacao_exclusiva}
%% UTILIZAR A CL\xC1USULA ABAIXO PARA A CONTRATA\xC7\xC3O QUE ENVOLVA, DE QUALQUER FORMA, O TRATAMENTO DE DADOS PESSOAIS
{#lgpd}## CL\xC1USULA {\xA7cl} - OBRIGA\xC7\xD5ES PERTINENTES \xC0 LGPD

{\xA7} As partes dever\xE3o cumprir a Lei n.\xBA 13.709, de 14 de agosto de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em raz\xE3o do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresenta\xE7\xE3o da proposta no procedimento de contrata\xE7\xE3o, independentemente de declara\xE7\xE3o ou de aceita\xE7\xE3o expressa.

{\xA7} Os dados obtidos somente poder\xE3o ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-f\xE9 e com os princ\xEDpios do art. 6\xBA da LGPD.

{\xA7} \xC9 vedado o compartilhamento com terceiros dos dados obtidos fora das hip\xF3teses permitidas em Lei.

{\xA7} A Administra\xE7\xE3o dever\xE1 ser informada no prazo de 5 (cinco) dias \xFAteis sobre todos os contratos de subopera\xE7\xE3o firmados ou que venham a ser celebrados pelo CONTRATADO.

{\xA7} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, \xE9 dever do CONTRATADO elimin\xE1-los, com exce\xE7\xE3o das hip\xF3teses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documenta\xE7\xE3o para fins de comprova\xE7\xE3o do cumprimento de obriga\xE7\xF5es legais ou contratuais e somente enquanto n\xE3o prescritas essas obriga\xE7\xF5es.

{\xA7} \xC9 dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{\xA7} O CONTRATADO dever\xE1 exigir de suboperadores e subcontratados o cumprimento dos deveres da presente cl\xE1usula, permanecendo integralmente respons\xE1vel por garantir sua observ\xE2ncia.

{\xA7} O CONTRATANTE poder\xE1 realizar dilig\xEAncia para aferir o cumprimento dessa cl\xE1usula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprova\xE7\xE3o formulados.

{\xA7} O CONTRATADO dever\xE1 prestar, no prazo fixado pelo CONTRATANTE, prorrog\xE1vel justificadamente, quaisquer informa\xE7\xF5es acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{\xA7} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastre\xE1vel de tratamentos realizados (LGPD, art. 37), com cada acesso, data, hor\xE1rio e registro da finalidade, para efeito de responsabiliza\xE7\xE3o, em caso de eventuais omiss\xF5es, desvios ou abusos.

{\xA7\xA7} Os referidos bancos de dados devem ser desenvolvidos em formato interoper\xE1vel, a fim de garantir a reutiliza\xE7\xE3o desses dados pela Administra\xE7\xE3o nas hip\xF3teses previstas na LGPD.

{\xA7} O contrato est\xE1 sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opini\xF5es t\xE9cnicas ou recomenda\xE7\xF5es, editadas na forma da LGPD.

{\xA7} Os contratos e conv\xEAnios de que trata o \xA71\xBA, do art. 26 da LGPD dever\xE3o ser comunicados \xE0 autoridade nacional.

{/lgpd}## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O (art. 92, XII)

{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} A contrata\xE7\xE3o conta com garantia de execu\xE7\xE3o na forma prevista no Termo de Refer\xEAncia, em aten\xE7\xE3o ao art. 96 da Lei n.\xBA 14.133, de 2021.{/garantia}

## CL\xC1USULA {\xA7cl} \u2013 INFRA\xC7\xD5ES E SAN\xC7\xD5ES ADMINISTRATIVAS (art. 92, XIV)

{\xA7} As infra\xE7\xF5es administrativas e san\xE7\xF5es est\xE3o previstas no Termo de Refer\xEAncia, observando ainda a Portaria CFC n\xBA 266/2025, dispon\xEDvel no portal da transpar\xEAncia do CFC (https://www3.cfc.org.br/spw/PortalTransparencia/Consulta.aspx), no que n\xE3o contrariar as regras espec\xEDficas fixadas para a contrata\xE7\xE3o.

## CL\xC1USULA {\xA7cl} \u2013 DA EXTIN\xC7\xC3O CONTRATUAL (art. 92, XIX)

%% UTILIZAR OS SUBITENS 14.1 A 14.3.2 PARA CONTRATA\xC7\xC3O COM OBJETO POR ESCOPO
{#vigencia.escopo}{\xA7} O contrato ser\xE1 extinto quando cumpridas as obriga\xE7\xF5es de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{\xA7} Se as obriga\xE7\xF5es n\xE3o forem cumpridas no prazo estipulado, a vig\xEAncia ficar\xE1 prorrogada at\xE9 a conclus\xE3o do objeto, caso em que dever\xE1 a Administra\xE7\xE3o providenciar a readequa\xE7\xE3o do cronograma fixado para o contrato.

{\xA7} Quando a n\xE3o conclus\xE3o do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{\xA7\xA7} ficar\xE1 ele constitu\xEDdo em mora, sendo-lhe aplic\xE1veis as respectivas san\xE7\xF5es administrativas; e

{\xA7\xA7} poder\xE1 a Administra\xE7\xE3o optar pela extin\xE7\xE3o do contrato e, nesse caso, adotar\xE1 as medidas admitidas em lei para a continuidade da execu\xE7\xE3o contratual.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 14.4 A 14.5.2 PARA SERVI\xC7OS CONTINUADOS COM OU SEM DEDICA\xC7\xC3O EXCLUSIVA DE M\xC3O DE OBRA (ART. 106)
{#vigencia.continuada}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.

{\xA7} O contrato poder\xE1 ser extinto antes do prazo nele fixado, sem \xF4nus para o CONTRATANTE, quando este n\xE3o dispuser de cr\xE9ditos or\xE7ament\xE1rios para sua continuidade ou quando entender que o contrato n\xE3o mais lhe oferece vantagem.

{\xA7\xA7} Nesse caso, a extin\xE7\xE3o antecipada ocorrer\xE1 na pr\xF3xima data de anivers\xE1rio do contrato, garantido um prazo m\xEDnimo de dois meses para ci\xEAncia formal do contratado, devendo ser observada a regra do art. 183 da Lei n.\xBA 14.133, de 2021 para a contagem deste prazo.

{\xA7\xA7} O contrato poder\xE1 ser extinto com fundamento na aus\xEAncia de cr\xE9ditos or\xE7ament\xE1rios ou na perda de vantagem contratual antes da data de anivers\xE1rio, desde que ocorra com \xF4nus para o CONTRATANTE, conforme previsto no art. 138, \xA72\xBA, da Lei n.\xBA 14.133, de 2021.{/vigencia.continuada}

%% UTILIZAR O SUBITEM 14.6 PARA CONTRATA\xC7\xC3O DECORRENTE DA DISPENSA DO ART. 75, INC. VIII
{#vigencia.emergencial}{\xA7} O contrato ser\xE1 extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.\xBA 14.133/2021, independentemente de terem sido cumpridas ou n\xE3o as obriga\xE7\xF5es de ambas as partes contraentes.{/vigencia.emergencial}

{\xA7} O contrato poder\xE1 ser extinto antes de cumpridas as obriga\xE7\xF5es nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no art. 137 da Lei n.\xBA 14.133, de 2021, bem como amigavelmente, assegurados o contradit\xF3rio e a ampla defesa.

{\xA7} Nesta hip\xF3tese, aplicam-se tamb\xE9m os artigos 138 e 139 da mesma Lei.

{\xA7} A altera\xE7\xE3o social ou a modifica\xE7\xE3o da finalidade ou da estrutura da empresa n\xE3o ensejar\xE1 a extin\xE7\xE3o se n\xE3o restringir sua capacidade de concluir o contrato.

{\xA7} Se a opera\xE7\xE3o implicar mudan\xE7a da pessoa jur\xEDdica contratada, dever\xE1 ser formalizado termo aditivo para altera\xE7\xE3o subjetiva.

{\xA7} O termo de extin\xE7\xE3o, sempre que poss\xEDvel, ser\xE1 precedido:

{\xA7\xA7} Do balan\xE7o dos eventos contratuais j\xE1 cumpridos ou parcialmente cumpridos;

{\xA7\xA7} Da rela\xE7\xE3o dos pagamentos j\xE1 efetuados e ainda devidos;

{\xA7\xA7} Das indeniza\xE7\xF5es e multas.

{\xA7} A extin\xE7\xE3o do contrato n\xE3o configura \xF3bice para o reconhecimento do desequil\xEDbrio econ\xF4mico-financeiro, hip\xF3tese em que ser\xE1 concedida indeniza\xE7\xE3o por meio de termo indenizat\xF3rio (art. 131, caput, da Lei n.\xBA 14.133, de 2021).

%% UTILIZAR OS SUBITENS 14.13 A 14.14 PARA TODAS AS CONTRATA\xC7\xD5ES, EXCETO SERVI\xC7OS COM DEDICA\xC7\xC3O EXCLUSIVA DE M\xC3O DE OBRA
{^dedicacao_exclusiva}{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV, do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade CONTRATANTE ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o no processo de contrata\xE7\xE3o direta ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau (art. 14, inciso IV, da Lei n.\xBA 14.133, de 2021).{/dedicacao_exclusiva}

%% UTILIZAR OS SUBITENS 14.15 A 14.22 PARA SERVI\xC7OS COM DEDICA\xC7\xC3O EXCLUSIVA DE M\xC3O DE OBRA
{#dedicacao_exclusiva}{\xA7} O n\xE3o pagamento dos sal\xE1rios e das verbas trabalhistas, e o n\xE3o recolhimento das contribui\xE7\xF5es sociais, previdenci\xE1rias e para com o FGTS poder\xE1 dar ensejo \xE0 extin\xE7\xE3o do contrato por ato unilateral e escrito do CONTRATANTE e \xE0 aplica\xE7\xE3o das penalidades cab\xEDveis.

{\xA7} O CONTRATANTE poder\xE1 conceder prazo para que o CONTRATADO regularize suas obriga\xE7\xF5es trabalhistas ou suas condi\xE7\xF5es de habilita\xE7\xE3o, sob pena de extin\xE7\xE3o contratual, quando n\xE3o identificar m\xE1-f\xE9 ou a incapacidade de corre\xE7\xE3o.

{\xA7} Quando da extin\xE7\xE3o, o fiscal administrativo dever\xE1 verificar o pagamento pelo CONTRATADO das verbas rescis\xF3rias ou os documentos que comprovem que os empregados ser\xE3o realocados em outra atividade de presta\xE7\xE3o de servi\xE7os, sem que ocorra a interrup\xE7\xE3o do contrato de trabalho.

{\xA7} At\xE9 que o CONTRATADO comprove o disposto no item anterior, o CONTRATANTE reter\xE1:

{\xA7\xA7} a garantia contratual - prestada com cobertura para os casos de descumprimento das obriga\xE7\xF5es de natureza trabalhista e previdenci\xE1ria, inclu\xEDdas as verbas rescis\xF3rias -, a qual ser\xE1 executada para reembolso dos preju\xEDzos sofridos pela Administra\xE7\xE3o, nos termos da legisla\xE7\xE3o que rege a mat\xE9ria (art. 121, \xA73\xBA, I, e art. 139, III, b, da Lei n.\xBA 14.133, de 2021); e

{\xA7\xA7} os valores das Notas fiscais ou Faturas correspondentes em valor proporcional ao inadimplemento, at\xE9 que a situa\xE7\xE3o seja regularizada.

{\xA7} Na hip\xF3tese do subitem anterior, n\xE3o havendo quita\xE7\xE3o das obriga\xE7\xF5es por parte do CONTRATADO no prazo de 15 (quinze) dias, fica o CONTRATADO obrigado a emitir as guias de recolhimento de contribui\xE7\xF5es previdenci\xE1rias e do FGTS e entreg\xE1-las ao CONTRATANTE, que poder\xE1 efetuar o pagamento das obriga\xE7\xF5es inadimplidas diretamente aos empregados que tenham participado da execu\xE7\xE3o dos servi\xE7os objeto do contrato, bem como das contribui\xE7\xF5es previdenci\xE1rias e do FGTS, deduzindo o respectivo valor do pagamento devido ao CONTRATADO (art. 121, \xA73\xBA, inciso II, da Lei n.\xBA 14.133, de 2021).

{\xA7} O CONTRATANTE poder\xE1 ainda:

{\xA7\xA7} nos casos de obriga\xE7\xE3o de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada (art. 139, III, \u201Cc\u201D, da Lei n.\xBA 14.133, de 2021), conforme legisla\xE7\xE3o que rege a mat\xE9ria; e

{\xA7\xA7} nos casos em que houver necessidade de ressarcimento de preju\xEDzos causados \xE0 Administra\xE7\xE3o, nos termos do inciso IV do art. 139 da Lei n.\xBA 14.133, de 2021, reter os eventuais cr\xE9ditos existentes em favor do CONTRATADO decorrentes do contrato.

{\xA7} O contrato poder\xE1 ser extinto caso se constate que o CONTRATADO mant\xE9m v\xEDnculo de natureza t\xE9cnica, comercial, econ\xF4mica, financeira, trabalhista ou civil com dirigente do \xF3rg\xE3o ou entidade CONTRATANTE ou com agente p\xFAblico que tenha desempenhado fun\xE7\xE3o no processo de contrata\xE7\xE3o direta ou atue na fiscaliza\xE7\xE3o ou na gest\xE3o do contrato, ou que deles seja c\xF4njuge, companheiro ou parente em linha reta, colateral ou por afinidade, at\xE9 o terceiro grau (art. 14, inciso IV, da Lei n.\xBA 14.133, de 2021).

{\xA7} O contrato poder\xE1 ser extinto em caso de altera\xE7\xE3o da conven\xE7\xE3o coletiva de trabalho em que se baseia a planilha de custos e forma\xE7\xE3o de pre\xE7os contratuais, em raz\xE3o de erro ou fraude no enquadramento sindical de que resulte a necessidade de repactua\xE7\xE3o ou imposi\xE7\xE3o de \xF4nus financeiro para a CONTRATANTE, em cumprimento de decis\xE3o judicial (art. 137, inc. I, da Lei n.\xBA 14.133, de 2021).{/dedicacao_exclusiva}

## CL\xC1USULA {\xA7cl} \u2013 ALTERA\xC7\xD5ES

{\xA7} Eventuais altera\xE7\xF5es contratuais reger-se-\xE3o pela disciplina dos artigos 124 e seguintes da Lei n.\xBA 14.133, de 2021.

{\xA7} O CONTRATADO \xE9 obrigado a aceitar, nas mesmas condi\xE7\xF5es contratuais, os acr\xE9scimos ou supress\xF5es que se fizerem necess\xE1rios, at\xE9 o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato, e, nos casos de reforma de edif\xEDcio ou de equipamento, o limite para os acr\xE9scimos ser\xE1 de 50% (cinquenta por cento).

{\xA7} As supress\xF5es resultantes de acordo celebrado entre as partes contratantes poder\xE3o exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{\xA7} As altera\xE7\xF5es contratuais dever\xE3o ser promovidas mediante celebra\xE7\xE3o de termo aditivo, submetido \xE0 pr\xE9via aprova\xE7\xE3o da consultoria jur\xEDdica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipa\xE7\xE3o de seus efeitos, hip\xF3tese em que a formaliza\xE7\xE3o do aditivo dever\xE1 ocorrer no prazo m\xE1ximo de 1 (um) m\xEAs (art. 132 da Lei n.\xBA 14.133, de 2021).

{\xA7} Registros que n\xE3o caracterizam altera\xE7\xE3o do contrato podem ser realizados por simples apostila, dispensada a celebra\xE7\xE3o de termo aditivo, na forma do art. 136 da Lei n.\xBA 14.133, de 2021.

## CL\xC1USULA {\xA7cl} \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA (art. 92, VIII)

{\xA7} As despesas decorrentes da presente contrata\xE7\xE3o est\xE3o programadas em dota\xE7\xE3o or\xE7ament\xE1ria pr\xF3pria, conta cont\xE1bil {dotacao.conta}, Projeto n.\xBA {dotacao.projeto}, de acordo com Or\xE7amento Anual para {dotacao.exercicio} do CFC, aprovado pela Resolu\xE7\xE3o CFC n.\xBA {dotacao.resolucao}.

%% UTILIZAR O SUBITEM ABAIXO PARA A CONTRATA\xC7\xC3O DE SERVI\xC7OS CONTINUADOS (ART. 106)
{#vigencia.continuada}{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.{/vigencia.continuada}

## CL\xC1USULA {\xA7cl} \u2013 DOS CASOS OMISSOS (art. 92, III)

{\xA7} Os casos omissos ser\xE3o decididos pelo CONTRATANTE, segundo as disposi\xE7\xF5es contidas na Lei n.\xBA 14.133, de 2021, e demais normas federais aplic\xE1veis e, subsidiariamente, segundo as disposi\xE7\xF5es contidas na Lei n.\xBA 8.078, de 1990 \u2013 C\xF3digo de Defesa do Consumidor \u2013 e normas e princ\xEDpios gerais dos contratos.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 \xE0 CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei n.\xBA 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n. 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n. 7.724, de 2012.

## CL\xC1USULA {\xA7cl}\u2013 FORO (art. 92, \xA71\xBA)

{\xA7} Fica eleito o Foro da Justi\xE7a Federal em Bras\xEDlia, Se\xE7\xE3o Judici\xE1ria do Distrito Federal para dirimir os lit\xEDgios que decorrerem da execu\xE7\xE3o deste Termo de Contrato que n\xE3o puderem ser compostos pela concilia\xE7\xE3o, conforme art. 92, \xA71\xBA, da Lei n.\xBA 14.133, de 2021.

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
`,"despacho-abertura-par":`@requer regime=14133
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# DESPACHO

> Processo n\xBA {processo}

> Interessados: {interessados}
> Assunto: Processo de Apura\xE7\xE3o de Responsabilidade

Vistos e examinados os autos do Processo Administrativo n\xBA {processo_origem}, e considerando o teor do {documento_base.descricao} (SEI n\xBA {documento_base.sei}){#ata} bem como as informa\xE7\xF5es constantes da {ata}{/ata}, que apontam ind\xEDcios de poss\xEDvel pr\xE1tica das infra\xE7\xF5es previstas no art. 155 da Lei n\xBA 14.133/2021 e na {norma_sancao}, atribu\xEDdas \xE0s empresas a seguir relacionadas:

{*infratores}> {._n}) {.razao_social}, CNPJ n\xBA {.cnpj}:
{*.infracoes}> {._letra}) {.texto};
{/.infracoes}
{/infratores}
DETERMINO a instaura\xE7\xE3o de processo espec\xEDfico para apura\xE7\xE3o de responsabilidade, destinado \xE0 an\xE1lise dos fatos e \xE0 verifica\xE7\xE3o da ocorr\xEAncia das infra\xE7\xF5es indicadas, asseguradas as garantias do contradit\xF3rio e da ampla defesa, para fins de eventual aplica\xE7\xE3o das san\xE7\xF5es cab\xEDveis, nos termos da Lei n\xBA 14.133/2021 e da {norma_sancao}.

> **{autoridade.nome}**
> {autoridade.cargo}
`,"despacho-gecont-reserva":`@cabecalho

# DESPACHO

> Processo n\xBA {processo}

> {gecont_destino}

Trata o presente processo de {natureza}{#contrato.numero} ao Contrato n\xBA {contrato.numero} (SEI {contrato.sei}), cujo objeto \xE9 {/contrato.numero}{^contrato.numero} para {/contrato.numero}{objeto}

O valor previsto para {natureza_valor} \xE9 de R$ {valor} ({valor_extenso}).

Dessa forma, solicitamos verificar a exist\xEAncia de disponibilidade or\xE7ament\xE1ria para cobertura da referida despesa.

> **{gelic.nome}**
> {gelic.cargo}
`,"despacho-projur":`@cabecalho

# DESPACHO

> Processo n\xBA {processo}

> {destinos.gex}

{#prorrogacao}Trata o presente processo de {objeto}

Submetemos \xE0 an\xE1lise e manifesta\xE7\xE3o dessa Procuradoria Jur\xEDdica a Minuta do {aditivo.ordinal} Termo Aditivo ao Contrato n\xBA {contrato.numero}, a ser celebrado com a empresa {contratada.razao_social}, conforme doc. SEI n\xBA {minuta.sei}.

O Gestor do Contrato e a Autoridade Competente manifestaram-se favoravelmente \xE0 prorroga\xE7\xE3o da vig\xEAncia contratual por mais {prorrogacao.prazo}, conforme doc. SEI n\xBA {manifestacao_gestor.sei}.

A empresa contratada, por sua vez, apresentou manifesta\xE7\xE3o de concord\xE2ncia com a renova\xE7\xE3o contratual, conforme doc. SEI n\xBA {manifestacao_contratada.sei}.

Em observ\xE2ncia ao disposto no {fundamento_projur}, encaminham-se os autos para an\xE1lise e emiss\xE3o de parecer quanto \xE0 legalidade da prorroga\xE7\xE3o, bem como para aprecia\xE7\xE3o da minuta e indica\xE7\xE3o de eventuais ajustes, altera\xE7\xF5es ou recomenda\xE7\xF5es que essa Procuradoria Jur\xEDdica entenda pertinentes \xE0 adequada instru\xE7\xE3o e ao regular prosseguimento do processo.{/prorrogacao}{#extincao}Trata o presente processo de extin\xE7\xE3o unilateral do Contrato n\xBA {contrato.numero}, firmado com a empresa {contratada.razao_social}, que tem como objeto {objeto}

Em obedi\xEAncia ao disposto no {fundamento_projur} e em aten\xE7\xE3o \xE0 {informacao_tecnica.descricao} (SEI {informacao_tecnica.sei}), solicitamos o encaminhamento dos autos \xE0 Procuradoria Jur\xEDdica, para emiss\xE3o de parecer quanto \xE0 legalidade da extin\xE7\xE3o unilateral pretendida, bem como para eventuais sugest\xF5es ou altera\xE7\xF5es que julgar necess\xE1rias.{/extincao}

> **{gelic.nome}**
> {gelic.cargo}

> De acordo. Encaminhe-se \xE0 Procuradoria Jur\xEDdica para an\xE1lise e manifesta\xE7\xE3o{#prazo_projur}, no prazo de {prazo_projur}{/prazo_projur}.

> **{gex.nome}**
> {gex.cargo}
`,"termo-aditivo-alteracao":`@requer regime=14133
@fonte termo-aditivo-alteracao
@padrao autoridade=autoridades.vp_gestao
%% Modelo PROJUR/CFC atualizado em 28/01/2026 (SEI 90796110000005.000003/2025-51) \u2014 Portaria PRES CFC 233/2025. Texto preto do modelo sem altera\xE7\xE3o; s\xF3 o vermelho \xE9 vari\xE1vel.
@cabecalho

# TERMO ADITIVO

> Processo n.\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: {aditivo.ordinal} TERMO ADITIVO AO CONTRATO N.\xBA {contrato.numero}, QUE ENTRE SI CELEBRAM O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O Conselho Federal de Contabilidade, por interm\xE9dio do Departamento de Licita\xE7\xF5es e Contratos, com sede no SAUS Quadra 5, Bloco J, Ed. CFC, na cidade de Bras\xEDlia/DF, inscrito(a) no CNPJ sob o n.\xBA 33.618.570/0001-07, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, e a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n.\xBA {contratada.cnpj}, sediada na {contratada.endereco}, doravante designado CONTRATADO, neste ato representado por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}ato constitutivo da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n.\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n.\xBA 14.133, de 2021, resolvem celebrar o presente Termo Aditivo contratual, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA {\xA7cl} \u2013 OBJETO

{\xA7} O presente termo aditivo tem por objeto a{#alteracao_multipla}s{/alteracao_multipla} seguinte{#alteracao_multipla}s{/alteracao_multipla} {^alteracao_multipla}altera\xE7\xE3o contratual{/alteracao_multipla}{#alteracao_multipla}altera\xE7\xF5es contratuais{/alteracao_multipla}:

{#acrescimo}{\xA7\xA7} Acr\xE9scimo quantitativo e/ou qualitativo consistente em {acrescimo.descricao}, o que equivale a {acrescimo.percentual} do valor inicial atualizado do Contrato n.\xBA {contrato.numero}, com fundamento no {acrescimo.fundamento}, da Lei n.\xBA 14.133, de 2021.{/acrescimo}

{#supressao}{\xA7\xA7} Supress\xE3o quantitativa e/ou qualitativa consistente em {supressao.descricao}, o que equivale a {supressao.percentual} do valor inicial atualizado do Contrato n.\xBA {contrato.numero}, com fundamento no {supressao.fundamento}, da Lei n.\xBA 14.133, de 2021.{/supressao}

## CL\xC1USULA {\xA7cl} \u2013 PRE\xC7O

{\xA7} Com a{#alteracao_multipla}s{/alteracao_multipla} {^alteracao_multipla}altera\xE7\xE3o{/alteracao_multipla}{#alteracao_multipla}altera\xE7\xF5es{/alteracao_multipla}, o valor mensal da contrata\xE7\xE3o passar\xE1 a ser R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor global de R$ {valor_global} ({valor_global_extenso}).

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

%% UTILIZAR O SUBITEM ABAIXO CASO A CONTRATA\xC7\xC3O SEJA DE OBJETO DEFINIDO POR DEMANDA
{#valor_por_demanda}{\xA7} O valor destacado \xE9 meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO depender\xE3o dos quantitativos efetivamente prestados.{/valor_por_demanda}

## CL\xC1USULA {\xA7cl} - DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

{\xA7} As despesas decorrentes do presente termo aditivo est\xE3o programadas em dota\xE7\xE3o or\xE7ament\xE1ria pr\xF3pria, conta cont\xE1bil {dotacao.conta}, Projeto n.\xBA {dotacao.projeto}, de acordo com Or\xE7amento Anual para {dotacao.exercicio} do CFC, aprovado pela Resolu\xE7\xE3o CFC n.\xBA {dotacao.resolucao}.

{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.

## CL\xC1USULA {\xA7cl} \u2013 GARANTIA DE EXECU\xC7\xC3O

{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} O CONTRATADO dever\xE1 renovar a garantia contratual da execu\xE7\xE3o prestada, mantendo a propor\xE7\xE3o de {garantia.percentual} em rela\xE7\xE3o ao valor global, no prazo de {garantia.prazo} dias \xFAteis, a contar da assinatura deste instrumento, prorrog\xE1vel por igual per\xEDodo, a crit\xE9rio do CONTRATANTE.{/garantia}

%% UTILIZAR O SUBITEM ABAIXO NA HIP\xD3TESE DE SUPRESS\xC3O DO OBJETO DA CONTRATA\xC7\xC3O
{#supressao}{\xA7} No caso de supress\xE3o do objeto, fica facultado ao CONTRATADO a manuten\xE7\xE3o da garantia contratual j\xE1 oferecida.{/supressao}

## CL\xC1USULA {\xA7cl} \u2013 PRODU\xC7\xC3O DOS EFEITOS

{\xA7} O presente termo aditivo produzir\xE1 efeitos a partir {#efeitos_em}de {efeitos_em}{/efeitos_em}{^efeitos_em}da data de sua assinatura{/efeitos_em}.

## CL\xC1USULA {\xA7cl} \u2013 RATIFICA\xC7\xC3O

{\xA7} Ficam mantidas e ratificadas as demais cl\xE1usulas e condi\xE7\xF5es do contrato origin\xE1rio, naquilo que n\xE3o contrariem o presente termo aditivo.

## CL\xC1USULA {\xA7cl} \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 \xE0 CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei n.\xBA 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n.\xBA 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n.\xBA 7.724, de 2012.

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
`,"termo-aditivo-prorrogacao-8666":`@requer regime=8666
@fonte termo-aditivo-prorrogacao-8666
@padrao autoridade=autoridades.vp_gestao
%% modelo CFC (8.666) \u2014 texto do 3\xBA TA ao Contrato 12/2022, SEI 1234501, Parecer Projur 65 (SEI 1234504). Texto fixo sem altera\xE7\xE3o (s\xF3 corre\xE7\xE3o de OCR); vari\xE1vel = dados do aditivo.
@cabecalho

# TERMO ADITIVO

> Processo n\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: {aditivo.ordinal} TERMO ADITIVO AO CONTRATO N\xBA {contrato.numero} QUE CELEBRAM ENTRE SI O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O CONSELHO FEDERAL DE CONTABILIDADE \u2013 CFC, inscrito no CNPJ/MF sob o n\xBA 33.618.570/0001-07, com sede no Setor de Autarquia Sul, Quadra 05, Bloco "J", Ed. CFC, Bras\xEDlia/DF, doravante denominada CONTRATANTE, por interm\xE9dio do seu {autoridade.cargo}, {autoridade.nome}, e de outro lado a empresa {contratada.razao_social|maiusculas}, inscrita no CNPJ/MF sob o n\xBA {contratada.cnpj}, estabelecida \xE0 {contratada.endereco}, doravante denominada CONTRATADA, neste ato representada {representante.tratamento} {representante.nome}, resolvem celebrar o presente Termo Aditivo de Contrato, que ser\xE1 regido pela Lei n\xBA 8.666, 21 de junho de 1993, legisla\xE7\xE3o correlata e pelo Edital e anexos do {licitacao.origem}, sob os termos e condi\xE7\xF5es a seguir estabelecidos:

## CL\xC1USULA PRIMEIRA \u2013 DA VIG\xCANCIA

{\xA7} O objeto do presente instrumento \xE9 a {contrato.objeto}, por seus representantes legais que esta subscrevem, e nos termos do art. 57, inciso II da Lei n\xBA. 8.666/93, acordam:

{\xA7\xA7} **PRORROGAR** o prazo da vig\xEAncia do Contrato n\xBA {contrato.numero}, por {prorrogacao.prazo}, contemplando-se, nesta ocasi\xE3o, o per\xEDodo de {prorrogacao.inicio} a {prorrogacao.fim}, nos termos do art. 57, (II), da Lei n.\xBA 8.666, de 1993.

%% Sem reajuste: o 3\xBA TA s\xF3 tem a variante com reajuste; "permanece em" \xE9 a adapta\xE7\xE3o m\xEDnima da frase 2.1.1 (aprovar com o usu\xE1rio).
## CL\xC1USULA SEGUNDA \u2013 {#reajuste}DO PRE\xC7O E DO REAJUSTE AO VALOR DO CONTRATO{/reajuste}{^reajuste}DO PRE\xC7O{/reajuste}

{#reajuste}{\xA7} Aos valores do contrato de presta\xE7\xE3o de servi\xE7os objeto do presente instrumento contratual, fica acrescido o percentual de {reajuste.percentual}, com base no {reajuste.indice} acumulado no per\xEDodo de {reajuste.periodo} (SEI {reajuste.sei}), com fulcro no que disp\xF5e o \xA7 8\xBA, inciso II do Art. 65 da Lei n\xBA 8.666/93, passando a vigorar com os seguintes valores:

{\xA7\xA7} O valor estimado anual do contrato passa a ser de R$ {valor_global} ({valor_global_extenso}).{/reajuste}{^reajuste}{\xA7} O valor estimado anual do contrato permanece em R$ {valor_global} ({valor_global_extenso}).{/reajuste}

## CL\xC1USULA TERCEIRA \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

{\xA7} As despesas para atender a esta licita\xE7\xE3o est\xE3o programadas em dota\xE7\xE3o or\xE7ament\xE1ria pr\xF3pria, conta cont\xE1bil {dotacao.conta} ({dotacao.conta_descricao}) no Projeto n.\xBA {dotacao.projeto} ({dotacao.projeto_descricao});

{\xA7} No(s) exerc\xEDcio(s) seguinte(s), as despesas correspondentes correr\xE3o \xE0 conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro.

%% Com garantia: o 3\xBA TA n\xE3o tem garantia; a frase vem do modelo PROJUR 14.133 (termo-aditivo-prorrogacao, cl. 4.1), com "A CONTRATADA" (aprovar com o usu\xE1rio).
## CL\xC1USULA QUARTA \u2013 GARANTIA DE EXECU\xC7\xC3O

{^garantia}{\xA7} N\xE3o h\xE1 exig\xEAncia de garantia de execu\xE7\xE3o para a presente contrata\xE7\xE3o.{/garantia}{#garantia}{\xA7} A CONTRATADA dever\xE1 renovar a garantia contratual da execu\xE7\xE3o prestada, mantendo a propor\xE7\xE3o de {garantia.percentual} em rela\xE7\xE3o ao valor global, no prazo de {garantia.prazo} dias \xFAteis, a contar da assinatura deste instrumento, prorrog\xE1vel por igual per\xEDodo, a crit\xE9rio do CONTRATANTE.{/garantia}

## CL\xC1USULA QUINTA \u2013 RATIFICA\xC7\xC3O

{\xA7} Ficam mantidas as demais cl\xE1usulas e condi\xE7\xF5es do contrato origin\xE1rio, naquilo que n\xE3o contrariem o presente termo aditivo.

## CL\xC1USULA SEXTA \u2013 DA PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 \xE0 CONTRATANTE providenciar a publica\xE7\xE3o deste instrumento, por extrato, no Di\xE1rio Oficial da Uni\xE3o, de acordo com o prescrito no artigo 61, par\xE1grafo \xFAnico, da Lei n\xBA 8.666, de 1993.

{\xA7} Para firmeza e validade do pactuado, o presente termo aditivo vai assinado eletronicamente pelos contraentes, depois de lido e achado em ordem.

> {autoridade.nome}
> {autoridade.cargo}
> Conselho Federal de Contabilidade

> {representante.nome}
> {representante.funcao}
> {contratada.razao_social}

# Anexo I
DA INTEGRIDADE DOS CONTRATANTES

Este anexo contribui para materializar o compromisso das partes para o cumprimento do exposto nas Leis n\xBA 12.846, de 01 de agosto de 2013, n\xBA 13.709, de 14 de agosto de 2018, no Decreto n\xBA 7.203, de 4 de junho de 2010, e na Norma Brasileira ABNT NBR ISO 37001, em rela\xE7\xE3o \xE0 adequa\xE7\xE3o a legisla\xE7\xE3o p\xE1tria e boas pr\xE1ticas de governan\xE7a, integridade e privacidade de dados.

O Conselho Federal de Contabilidade, por interm\xE9dio da Resolu\xE7\xE3o CFC n\xBA 1.563, de 14 de mar\xE7o de 2019, instituiu o Plano de Integridade, que define a\xE7\xF5es de promo\xE7\xE3o e fortalecimento das inst\xE2ncias de integridade, por meio de mecanismos destinados \xE0 preven\xE7\xE3o, \xE0 detec\xE7\xE3o, \xE0 puni\xE7\xE3o e \xE0 remedia\xE7\xE3o de fraudes e atos de corrup\xE7\xE3o.

As empresas licitantes dever\xE3o tomar conhecimento da Pol\xEDtica Antifraude e Anticorrup\xE7\xE3o do CFC que poder\xE1 ser acessada em seu s\xEDtio eletr\xF4nico oficial e atrav\xE9s do seguinte link: https://cfc.org.br/wp-content/uploads/2021/10/Plano_Integridade_de_2021.pdf

O CFC e a Contratada concordam que, durante a execu\xE7\xE3o deste contrato, atuar\xE3o em conformidade com ordenamento jur\xEDdico brasileiro no que tange ao combate \xE0 corrup\xE7\xE3o e \xE0 fraude, e se comprometem a cumpri-los na realiza\xE7\xE3o de suas atividades, por seus executivos, s\xF3cios, diretores, coordenadores, representantes, administradores e colaboradores, assim como, declara e garante que:

> Em rela\xE7\xE3o ao Nepotismo:

1) seus atuais s\xF3cios, administradores, controladores ou dirigentes n\xE3o ocupam cargo, emprego ou fun\xE7\xE3o no CFC ou em empresa prestadora de servi\xE7o no CFC;

2) seus atuais s\xF3cios, administradores, controladores ou dirigentes n\xE3o possuem parentesco, at\xE9 o terceiro grau, com qualquer ocupante de cargo, emprego ou fun\xE7\xE3o, mesmo que transitoriamente e sem remunera\xE7\xE3o, dentro de unidade administrativa do CFC que promova a licita\xE7\xE3o ou com ocupantes de cargo de dire\xE7\xE3o, chefia ou assessoramento;

3) nos demais casos de parentesco, at\xE9 o terceiro grau, de seus atuais s\xF3cios administradores, controladores, dirigentes com qualquer ocupante de cargo, emprego ou fun\xE7\xE3o no CFC, mesmo que transitoriamente e sem remunera\xE7\xE3o, declara que o parentesco n\xE3o teve poder de influ\xEAncia na contrata\xE7\xE3o;

4) que eventual ex-ocupante de cargo, emprego ou fun\xE7\xE3o do CFC que venha a integrar a Contratada, seja na qualidade de administrador, s\xF3cio, controlador ou dirigente, tenha rompido seu v\xEDnculo com o CFC h\xE1 pelo menos 6 (seis) meses, obrigando-se a Contratada a informar por escrito, no prazo de 3 (tr\xEAs) dias \xFAteis ao CFC qualquer nomea\xE7\xE3o de seus representantes em quaisquer das hip\xF3teses elencadas.

> Em rela\xE7\xE3o \xE0s normas anticorrup\xE7\xE3o e antissuborno:

5) n\xE3o realiza, n\xE3o oferece; e n\xE3o autoriza: qualquer pagamento ou promessa de pagamento como suborno; entrega de presente(s); concess\xE3o de entretenimento(s); fornecimento ou pagamento de refei\xE7\xE3o(\xF5es), hospitalidade(s) ou qualquer outra vantagem direta ou indireta para o uso ou benef\xEDcio de qualquer funcion\xE1rio do CFC ou seus familiares; e n\xE3o concede benef\xEDcio direto ou indireto de partido pol\xEDtico, de candidato a cargo eletivo, ou de qualquer outro indiv\xEDduo a qualquer funcion\xE1rio do CFC ou seus familiares.

> Em rela\xE7\xE3o \xE0 prote\xE7\xE3o de dados pessoais:

6) para prestar os servi\xE7os relativos a esta contrata\xE7\xE3o, deve se comprometer com a prote\xE7\xE3o dos Dados Pessoais de acordo com a Lei n\xBA 13.709/2018 ("Lei Geral de Prote\xE7\xE3o de Dados Pessoais"), bem como quaisquer outras leis relativas \xE0 prote\xE7\xE3o de dados pessoais que vierem a ser promulgadas.

7) a Contratada dever\xE1 envidar esfor\xE7os para prote\xE7\xE3o da informa\xE7\xE3o, principalmente dos Dados Pessoais e Dados Pessoais Sens\xEDveis \u2013 aplicando as medidas de prote\xE7\xE3o administrativa e t\xE9cnica necess\xE1rias e dispon\xEDveis \xE0 \xE9poca, caso haja dados pessoais que forem armazenados pelos sistemas de propriedade ou de utiliza\xE7\xE3o da Contratada.

8) durante a vig\xEAncia do contrato, o titular dos Dados Pessoais tratados tem direito a obter da Contratada, a qualquer momento e mediante requisi\xE7\xE3o, desde que em conformidade com normas legais e regulat\xF3rias:

I - confirma\xE7\xE3o da exist\xEAncia de tratamento de seus dados; II - acesso aos dados; III - corre\xE7\xE3o de dados incompletos, inexatos ou desatualizados; IV - anonimiza\xE7\xE3o, bloqueio ou elimina\xE7\xE3o de dados desnecess\xE1rios, excessivos ou tratados em desconformidade; V - portabilidade dos dados a outro fornecedor de servi\xE7o ou produto, mediante requisi\xE7\xE3o expressa, de acordo com a regulamenta\xE7\xE3o da autoridade nacional, observados os segredos comercial e industrial; VI - elimina\xE7\xE3o dos dados pessoais tratados com o consentimento do titular; VII - informa\xE7\xE3o das entidades p\xFAblicas e privadas com as quais se realizou uso compartilhado de dados; VIII - informa\xE7\xE3o sobre a possibilidade de n\xE3o fornecer consentimento e sobre as consequ\xEAncias da negativa; e IX - revoga\xE7\xE3o do consentimento para o tratamento de dados.

O n\xE3o cumprimento pela Contratada da legisla\xE7\xE3o ou disposto neste Contrato, durante a execu\xE7\xE3o deste, ser\xE1 considerado infra\xE7\xE3o e conferir\xE1 ao CFC o direto de: instaurar procedimento de apura\xE7\xE3o de responsabilidade administrativa e rescindir o Contrato, ap\xF3s o devido processo legal, sendo a Contratada respons\xE1vel por eventuais perdas e danos, nos termos da Lei Federal n\xBA 12.846/ 2013 e do Decreto n\xBA 8.420/2015, sem preju\xEDzo da aplica\xE7\xE3o das san\xE7\xF5es administrativas previstas nas leis 8.666/93 e 10.520/2002.
`,"termo-aditivo-prorrogacao":`@requer regime=14133
@fonte termo-aditivo-prorrogacao
@padrao autoridade=autoridades.vp_gestao
%% Modelo PROJUR/CFC atualizado em 28/01/2026 (SEI 90796110000005.000003/2025-51) \u2014 Portaria PRES CFC 233/2025. Texto preto do modelo sem altera\xE7\xE3o; s\xF3 o vermelho \xE9 vari\xE1vel.
@cabecalho

# TERMO ADITIVO

> Processo n.\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: {aditivo.ordinal} TERMO ADITIVO AO CONTRATO N.\xBA {contrato.numero}, QUE ENTRE SI CELEBRAM O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O Conselho Federal de Contabilidade, por interm\xE9dio do Departamento de Licita\xE7\xF5es e Contratos, com sede no SAUS Quadra 5, Bloco J, Ed. CFC, na cidade de Bras\xEDlia/DF, inscrito(a) no CNPJ sob o n.\xBA 33.618.570/0001-07, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, e a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n.\xBA {contratada.cnpj}, sediada na {contratada.endereco}, doravante designado CONTRATADO, neste ato representado por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procura\xE7\xE3o apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}ato constitutivo da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n.\xBA {processo} e em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n.\xBA 14.133, de 2021, resolvem celebrar o presente Termo Aditivo contratual, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir enunciadas.

## CL\xC1USULA PRIMEIRA \u2013 OBJETO

{^reajuste}{\xA7} O presente termo aditivo tem por objeto a prorroga\xE7\xE3o do prazo de vig\xEAncia do Contrato n.\xBA {contrato.numero} por mais {prorrogacao.prazo}, a partir de {prorrogacao.inicio} at\xE9 {prorrogacao.fim}, podendo ser prorrogado sucessivamente, respeitada a vig\xEAncia m\xE1xima decenal, na forma do artigo 107 da Lei n.\xBA 14.133, de 2021.{/reajuste}{#reajuste}{\xA7} O presente termo aditivo tem por objeto:

{\xA7\xA7} Prorrogar o prazo de vig\xEAncia do Contrato n.\xBA {contrato.numero} por mais {prorrogacao.prazo}, a partir de {prorrogacao.inicio} at\xE9 {prorrogacao.fim}, podendo ser prorrogado sucessivamente, respeitada a vig\xEAncia m\xE1xima decenal, na forma do artigo 107 da Lei n.\xBA 14.133, de 2021.

{\xA7\xA7} Reajustar o valor do Contrato n.\xBA {contrato.numero}, no percentual de {reajuste.percentual}, com base no \xEDndice {reajuste.indice}, para manuten\xE7\xE3o do equil\xEDbrio econ\xF4mico-financeiro, nos termos do art. 136, inciso I, da Lei n.\xBA 14.133, de 2021.{/reajuste}

{#acrescimo}{\xA7} Acr\xE9scimo quantitativo e/ou qualitativo consistente em {acrescimo.descricao}, o que equivale a {acrescimo.percentual} do valor inicial atualizado do Contrato n.\xBA {contrato.numero}, com fundamento no {acrescimo.fundamento}, da Lei n.\xBA 14.133, de 2021.{/acrescimo}

{#supressao}{\xA7} Supress\xE3o quantitativa e/ou qualitativa consistente em {supressao.descricao}, o que equivale a {supressao.percentual} do valor inicial atualizado do Contrato n.\xBA {contrato.numero}, com fundamento no {supressao.fundamento}, da Lei n.\xBA 14.133, de 2021.{/supressao}

## CL\xC1USULA SEGUNDA \u2013 PRE\xC7O

{\xA7} O CONTRATANTE pagar\xE1 ao CONTRATADO pela execu\xE7\xE3o do objeto deste Contrato {#valor_mensal}o valor mensal de R$ {valor_mensal} ({valor_mensal_extenso}), totalizando {/valor_mensal}o valor global de R$ {valor_global} ({valor_global_extenso}).

{\xA7} No valor acima est\xE3o inclu\xEDdas todas as despesas ordin\xE1rias diretas e indiretas decorrentes da execu\xE7\xE3o do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenci\xE1rios, fiscais e comerciais incidentes, taxa de administra\xE7\xE3o, frete, seguro e outros necess\xE1rios ao cumprimento integral do objeto da contrata\xE7\xE3o.

{#valor_por_demanda}{\xA7} O valor destacado \xE9 meramente estimativo, de forma que os pagamentos devidos ao Contratado depender\xE3o dos quantitativos efetivamente prestados.{/valor_por_demanda}

{#dedicacao_exclusiva}{\xA7} Fica assegurado ao CONTRATADO o direito \xE0 repactua\xE7\xE3o de valores ainda n\xE3o adimplidos referentes ao ciclo de vig\xEAncia imediatamente anterior \xE0 presente prorroga\xE7\xE3o, n\xE3o concedidos e/ou pendentes de solicita\xE7\xE3o referentes ao aumento de custos em raz\xE3o da homologa\xE7\xE3o de novo Acordos, Conven\xE7\xF5es ou Diss\xEDdios Coletivos de Trabalho, desde que atendidos os requisitos preceituados no termo de refer\xEAncia.{/dedicacao_exclusiva}

## CL\xC1USULA TERCEIRA \u2013 DOTA\xC7\xC3O OR\xC7AMENT\xC1RIA

{\xA7} As despesas decorrentes do presente termo aditivo est\xE3o programadas em dota\xE7\xE3o or\xE7ament\xE1ria pr\xF3pria, conta cont\xE1bil {dotacao.conta}, Projeto n.\xBA {dotacao.projeto}, de acordo com Or\xE7amento Anual para {dotacao.exercicio} do CFC, aprovado pela Resolu\xE7\xE3o CFC n.\xBA {dotacao.resolucao}.

{\xA7} A dota\xE7\xE3o relativa aos exerc\xEDcios financeiros subsequentes correr\xE1 por conta dos recursos pr\xF3prios para atender \xE0s despesas da mesma natureza, cuja aloca\xE7\xE3o ser\xE1 feita no in\xEDcio de cada exerc\xEDcio financeiro, mediante apostilamento.

## CL\xC1USULA QUARTA \u2013 GARANTIA DE EXECU\xC7\xC3O

{^garantia}{\xA7} N\xE3o haver\xE1 exig\xEAncia de garantia contratual da execu\xE7\xE3o.{/garantia}{#garantia}{\xA7} O CONTRATADO dever\xE1 renovar a garantia contratual da execu\xE7\xE3o prestada, mantendo a propor\xE7\xE3o de {garantia.percentual} em rela\xE7\xE3o ao valor global, no prazo de {garantia.prazo} dias \xFAteis, a contar da assinatura deste instrumento, prorrog\xE1vel por igual per\xEDodo, a crit\xE9rio do CONTRATANTE.{/garantia}

{#supressao}{\xA7} No caso de supress\xE3o do objeto, fica facultado ao CONTRATADO a manuten\xE7\xE3o da garantia contratual j\xE1 oferecida.{/supressao}

## CL\xC1USULA QUINTA \u2013 PRODU\xC7\xC3O DOS EFEITOS

{\xA7} O presente termo aditivo produzir\xE1 efeitos a partir {#efeitos_em}de {efeitos_em}{/efeitos_em}{^efeitos_em}da data de sua assinatura{/efeitos_em}.

## CL\xC1USULA SEXTA \u2013 RATIFICA\xC7\xC3O

{\xA7} Ficam mantidas e ratificadas as demais cl\xE1usulas e condi\xE7\xF5es do contrato origin\xE1rio, naquilo que n\xE3o contrariem o presente termo aditivo.

## CL\xC1USULA S\xC9TIMA \u2013 PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 \xE0 CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei n.\xBA 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n.\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n.\xBA 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n.\xBA 7.724, de 2012.

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
`,"termo-apostilamento-reajuste":`@requer regime=14133
@fonte termo-apostilamento-reajuste
@origem modelo CFC
@padrao autoridade=autoridades.vp_gestao
@calcula apostilamento_reajuste
%% modelo CFC (14.133) \u2014 base: 3\xBA Termo de Apostilamento ao Contrato 23/2023, SEI 1234503. Fundamento padronizado (quick 261001-ohy): art. 136, I, c/c art. 25, \xA7 7\xBA, e art. 92, V e \xA7 3\xBA. Valores reajustados, totais, extensos, ordinal e datas por extenso: calculados pelo motor (@calcula); o modelo s\xF3 informa valores atuais.
%% S\xF3 reajuste por \xEDndice. Repactua\xE7\xE3o (custos) e revis\xE3o/reequil\xEDbrio n\xE3o usam este template.
@cabecalho

# TERMO DE APOSTILAMENTO

> Processo n\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: {apostilamento.ordinal} TERMO DE APOSTILAMENTO AO CONTRATO N\xBA {contrato.numero} CELEBRADO ENTRE O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O CONSELHO FEDERAL DE CONTABILIDADE (CFC), entidade fiscalizadora do exerc\xEDcio profissional, neste ato denominado CONTRATANTE, com sede no Setor de Autarquias Sul Quadra 05, Bloco "J", Lote 03 Ed. CFC, em Bras\xEDlia - DF, inscrito no CNPJ sob o n\xBA. 33.618.570/0001-07, neste ato, representado pelo {autoridade.cargo}, {autoridade.nome}, tendo em vista o direito ao reajuste previsto na {contrato.clausula_reajuste} do Contrato n\xBA {contrato.numero}, bem como as informa\xE7\xF5es constantes do Processo CFC n\xBA {processo}, referente ao {licitacao.origem}, resolve apostilar o Contrato n\xBA {contrato.numero}, com fundamento no art. 136, inciso I, combinado com o art. 25, \xA7 7\xBA, e o art. 92, inciso V e \xA7 3\xBA, da Lei n\xBA 14.133/2021, mediante as seguintes cl\xE1usulas:

## CL\xC1USULA PRIMEIRA \u2013 DO REAJUSTE

{\xA7} O presente Termo de Apostilamento tem por objeto registrar o reajuste dos valores do Contrato n\xBA {contrato.numero}, cujo objeto consiste na {contrato.objeto}.

{\xA7} O reajuste ora formalizado decorre da aplica\xE7\xE3o do \xEDndice previsto na {contrato.clausula_reajuste} do Contrato n\xBA {contrato.numero}, em raz\xE3o da varia\xE7\xE3o acumulada do {reajuste.indice}, observado o interregno m\xEDnimo de 1 (um) ano contado da data do or\xE7amento estimado.

{\xA7} Considerando que o Mapa Comparativo de Pre\xE7os \u2014 MCP foi datado de {reajuste.data_base_extenso}, bem como a previs\xE3o contratual de reajuste anual, o presente reajuste passa a produzir efeitos financeiros a partir de {reajuste.efeitos_extenso}.

%% "(SEI ...)" depois de "autos": inser\xE7\xE3o do template (o SEI 1234503 n\xE3o cita a mem\xF3ria de c\xE1lculo).
{\xA7} Conforme mem\xF3ria de c\xE1lculo constante dos autos (SEI {reajuste.sei}), foi aplicado o percentual de {reajuste.percentual}, correspondente \xE0 varia\xE7\xE3o acumulada do {reajuste.sigla} no per\xEDodo de {reajuste.periodo}, nos termos da {contrato.clausula_reajuste} do Contrato n\xBA {contrato.numero}.

{\xA7} Em decorr\xEAncia do reajuste, os valores contratuais passam a ser os seguintes:

%% Uma al\xEDnea por parcela; mensal mostra tamb\xE9m o total anual (\xD7 12). Valores e extensos: motor.
{*reajuste.parcelas}> {._letra}) {.descricao}:
{#.mensal}> Valor mensal atual: R$ {.valor_atual} ({.valor_atual_extenso}), totalizando R$ {.anual_atual} ({.anual_atual_extenso}) anuais.
> Novo valor mensal reajustado: R$ {.valor_reajustado} ({.valor_reajustado_extenso}), totalizando R$ {.anual_reajustado} ({.anual_reajustado_extenso}) anuais, com efeitos financeiros a partir de {reajuste.efeitos_extenso}.{/.mensal}{^.mensal}> Valor anual atual: R$ {.valor_atual} ({.valor_atual_extenso}).
> Novo valor anual reajustado: R$ {.valor_reajustado} ({.valor_reajustado_extenso}), com efeitos financeiros a partir de {reajuste.efeitos_extenso}.{/.mensal}

{/reajuste.parcelas}
%% Com uma s\xF3 parcela a frase termina no total (sem "composto por").
{\xA7} Ap\xF3s o reajuste, o valor total anual atualizado da contrata\xE7\xE3o passa a ser de R$ {reajuste.total_anual} ({reajuste.total_anual_extenso}){#reajuste.composto}, composto por:{/reajuste.composto}{^reajuste.composto}.{/reajuste.composto}

{#reajuste.composto}{*reajuste.parcelas}> {._letra}) R$ {.anual_reajustado} referentes ao valor anual reajustado de {.descricao|minusculas}{.fim}
{/reajuste.parcelas}{/reajuste.composto}

## CL\xC1USULA SEGUNDA - DA RATIFICA\xC7\xC3O DAS DEMAIS CL\xC1USULAS CONTRATUAIS

{\xA7} Ficam mantidas as demais cl\xE1usulas e condi\xE7\xF5es constantes do Contrato n\xBA {contrato.numero} e dos respectivos termos aditivos e apostilamentos anteriores, naquilo que n\xE3o conflitarem com o presente Termo de Apostilamento.

E, para firmeza e validade do presente ato, lavra-se o presente Termo de Apostilamento, que ser\xE1 assinado eletronicamente pelo representante do CONTRATANTE.

> CONSELHO FEDERAL DE CONTABILIDADE
> {autoridade.nome}
> {autoridade.cargo}
`,"termo-extincao-unilateral":`@requer regime=14133
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# {#e_minuta}MINUTA DE {/e_minuta}TERMO DE EXTIN\xC7\xC3O UNILATERAL

> Processo n\xBA {processo}

> Unidade Gestora: {unidade_gestora}

::: TERMO DE EXTIN\xC7\xC3O UNILATERAL D{instrumento.o|maiusculas} {instrumento.tipo|maiusculas} N\xBA {instrumento.numero}, CELEBRAD{instrumento.o|maiusculas} ENTRE O CONSELHO FEDERAL DE CONTABILIDADE E A {contratada.razao_social|maiusculas}.

O CONSELHO FEDERAL DE CONTABILIDADE, com sede no {cfc.sede}, inscrito no CNPJ sob o n\xBA {cfc.cnpj}, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, vem extinguir unilateralmente {instrumento.o} {instrumento.tipo} n\xBA {instrumento.numero} (SEI {instrumento.sei}), celebrad{instrumento.o} com a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n\xBA {contratada.cnpj}, sediada na {contratada.endereco}, doravante denominada CONTRATADA, considerando {considerando}, em observ\xE2ncia \xE0s disposi\xE7\xF5es da Lei n\xBA 14.133/2021 e demais normas que regem a mat\xE9ria, mediante as cl\xE1usulas e condi\xE7\xF5es a seguir estabelecidas:

## CL\xC1USULA PRIMEIRA \u2013 DO OBJETO

{\xA7} O presente termo tem por objeto a extin\xE7\xE3o unilateral d{instrumento.o} {instrumento.tipo} n\xBA {instrumento.numero}, decorrente {instrumento.origem}, cujo objeto \xE9 {instrumento.objeto}, tendo em vista {motivo_resumo}.

{\xA7\xA7} {instrumento.o|cap} {instrumento.tipo} estar\xE1 administrativamente extint{instrumento.o} a partir de {extincao.data_efeito}{#extincao.ultimo_dia}, ficando estabelecido que {extincao.ultimo_dia} ser\xE1 o \xFAltimo dia de execu\xE7\xE3o contratual{/extincao.ultimo_dia}.

## CL\xC1USULA SEGUNDA \u2013 DO FUNDAMENTO LEGAL

{\xA7} Fundamenta o presente instrumento o artigo 137, inciso {fundamento.inciso_137}, c/c art. 138, inciso I e \xA7 1\xBA, da Lei n\xBA 14.133/2021{#fundamento.clausula}, e {fundamento.clausula}{/fundamento.clausula}.

## CL\xC1USULA TERCEIRA \u2013 DA MOTIVA\xC7\xC3O

{*motivacao}{\xA7} {.texto}

{/motivacao}
## CL\xC1USULA QUARTA \u2013 DAS SAN\xC7\xD5ES ADMINISTRATIVAS

{\xA7} A presente extin\xE7\xE3o unilateral n\xE3o prejudica a apura\xE7\xE3o de responsabilidade da CONTRATADA e a eventual aplica\xE7\xE3o das san\xE7\xF5es administrativas previstas no instrumento contratual, na Lei n\xBA 14.133/2021 e nas normas internas do CFC, mediante procedimento pr\xF3prio, assegurados o contradit\xF3rio e a ampla defesa.

{#reter_creditos}## CL\xC1USULA QUINTA \u2013 DOS CR\xC9DITOS DECORRENTES DO CONTRATO

{\xA7} A CONTRATANTE poder\xE1 reter os cr\xE9ditos decorrentes do contrato at\xE9 o limite dos preju\xEDzos causados \xE0 Administra\xE7\xE3o, na forma do art. 139, inciso IV, da Lei n\xBA 14.133, de 2021.

{/reter_creditos}## CL\xC1USULA {#reter_creditos}SEXTA{/reter_creditos}{^reter_creditos}QUINTA{/reter_creditos} \u2013 DA PUBLICA\xC7\xC3O

{\xA7} Incumbir\xE1 ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP), na forma prevista no art. 94 da Lei n\xBA 14.133, de 2021, bem como no respectivo s\xEDtio oficial na Internet, em aten\xE7\xE3o ao art. 91, caput, da Lei n\xBA 14.133, de 2021, e ao art. 8\xBA, \xA72\xBA, da Lei n\xBA 12.527, de 2011, c/c art. 7\xBA, \xA73\xBA, inciso V, do Decreto n\xBA 7.724, de 2012.

> Para firmeza e validade do pactuado, depois de lido e achado em ordem, \xE9 assinado eletronicamente pelo representante legal do CONTRATANTE.

> **{autoridade.nome}**
> {autoridade.cargo}
> Conselho Federal de Contabilidade
`},a={acrescimo:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"acrescimo.descricao":{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},"acrescimo.fundamento":{fonte:"agente",descricao:"fundamento proposto pelo agente, validado por voc\xEA"},"acrescimo.percentual":{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},adesao:{fonte:"regra",descricao:"admite ades\xE3o de n\xE3o participantes"},"aditivo.ordinal":{fonte:"calculo",descricao:"ordinal do aditivo = aditivos anteriores nos autos + 1 (PRIMEIRO, SEGUNDO...)"},adjudicacao_por_grupo:{fonte:"regra",descricao:"adjudica\xE7\xE3o por pre\xE7o global de grupo"},admite_quantitativo_inferior:{fonte:"regra",descricao:"fornecedor pode ofertar quantidade inferior \xE0 m\xE1xima (falso imprime 'n\xE3o poder\xE1')"},alteracao_multipla:{fonte:"regra",descricao:'mais de uma altera\xE7\xE3o no aditivo (acr\xE9scimo e supress\xE3o): plural em "a(s) seguinte(s) altera\xE7\xE3o(\xF5es)"'},"apostilamento.numero":{fonte:"autos",descricao:"n\xFAmero de ordem do apostilamento = apostilamentos anteriores nos autos + 1 (1, 2, 3...)"},"apostilamento.ordinal":{fonte:"calculo",descricao:"gerado pelo motor a partir de apostilamento.numero (PRIMEIRO, SEGUNDO...)"},arquivar_documentos:{fonte:"regra",descricao:"obriga\xE7\xE3o do CONTRATANTE de arquivar projetos e as built"},art75_inciso:{fonte:"regra",descricao:"inciso do art. 75 da hip\xF3tese (ex.: inciso II)"},ata:{fonte:"autos",descricao:"descri\xE7\xE3o do documento citado, como consta nos autos"},"ata.ano":{fonte:"calculo",descricao:"ano da ata"},"ata.numero":{fonte:"autos",descricao:"n\xFAmero da ata (sem o ano)"},"ata.prazo_assinatura":{fonte:"autos",descricao:"prazo em dias, com extenso, para assinar a ata de registro de pre\xE7os"},"ata.prorrogavel":{fonte:"regra",descricao:"ata prorrog\xE1vel por igual per\xEDodo (art. 84)"},"ata.renova_quantitativo":{fonte:"regra",descricao:"na prorroga\xE7\xE3o da ata, o quantitativo poder\xE1 (verdadeiro) ou n\xE3o (falso) ser renovado"},"ata.vias":{fonte:"autos",descricao:"n\xFAmero de vias da ata"},"ata.vias_extenso":{fonte:"calculo",descricao:"n\xFAmero de vias por extenso"},"autoridade.cargo":{fonte:"regra",descricao:"quem assina pela CONTRATANTE: padr\xE3o do template (@padrao; termos e PAR = VP de Gest\xE3o Administrativa-Financeira); na autoriza\xE7\xE3o de contrata\xE7\xE3o direta depende da al\xE7ada \u2014 informar"},"autoridade.nome":{fonte:"regra",descricao:"quem assina pela CONTRATANTE: padr\xE3o do template (@padrao; termos e PAR = VP de Gest\xE3o Administrativa-Financeira); na autoriza\xE7\xE3o de contrata\xE7\xE3o direta depende da al\xE7ada \u2014 informar"},"aviso.ano":{fonte:"calculo",descricao:"ano do aviso (4 d\xEDgitos; o modelo traz 202X)"},"aviso.numero":{fonte:"autos",descricao:"n\xFAmero do aviso de contrata\xE7\xE3o direta no Compras.gov.br (sem o ano)"},"cadastro_reserva.precos_iguais":{fonte:"autos",descricao:"fornecedores que cotaram igual ao adjudicat\xE1rio"},"cadastro_reserva.proposta_original":{fonte:"autos",descricao:"fornecedores que mantiveram a proposta original"},calamidade_lei_14981:{fonte:"regra",descricao:"credenciamento tamb\xE9m sob a Lei 14.981/2024: admite registro cadastral de outro \xF3rg\xE3o"},"certame.ano":{fonte:"autos",descricao:"ano do edital/aviso"},"certame.numero":{fonte:"autos",descricao:"n\xFAmero do edital/aviso (sem o ano)"},"certame.publicacao_data":{fonte:"autos",descricao:"data de publica\xE7\xE3o do edital/aviso"},"certame.publicacao_veiculo":{fonte:"autos",descricao:"onde o edital/aviso foi publicado"},cessao_direitos:{fonte:"regra",descricao:"cess\xE3o de direitos patrimoniais (art. 93)"},"cessao_direitos.obra_imaterial":{fonte:"regra",descricao:"obra imaterial tecnol\xF3gica (art. 93, \xA7 1\xBA)"},"cfc.cidade":{fonte:"config",descricao:"cidade da sede (constantes.json)"},"cfc.cnpj":{fonte:"config",descricao:"constante do CFC (templates/constantes.json)"},"cfc.nome":{fonte:"config",descricao:"nome do \xF3rg\xE3o (constantes.json)"},"cfc.sede":{fonte:"config",descricao:"constante do CFC (templates/constantes.json)"},"cfc.setor_licitacoes":{fonte:"config",descricao:"setor que conduz as licita\xE7\xF5es (constantes.json)"},"cfc.uasg":{fonte:"config",descricao:"UASG do CFC (constantes.json)"},"conducao.agente":{fonte:"regra",descricao:"quem conduz: preg\xE3o \u2192 Pregoeiro; concorr\xEAncia \u2192 Agente de Contrata\xE7\xE3o ou Comiss\xE3o de Contrata\xE7\xE3o"},"conducao.ao":{fonte:"regra",descricao:"contra\xE7\xE3o: ao / \xE0"},"conducao.o":{fonte:"regra",descricao:"artigo de quem conduz: o / a"},considerando:{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},consorcio_permitido:{fonte:"regra",descricao:"cons\xF3rcio permitido (art. 15, \xA7 1\xBA)"},"consorcio_permitido.acrescimo":{fonte:"autos",descricao:"acr\xE9scimo de 10% a 30% na habilita\xE7\xE3o econ\xF4mico-financeira do cons\xF3rcio"},"contratacao.numero":{fonte:"autos",descricao:"n\xFAmero do processo ou da contrata\xE7\xE3o de origem"},"contratacao.prazo_assinatura":{fonte:"autos",descricao:"prazo, com unidade e extenso, para assinar o contrato ou aceitar o instrumento (ex.: 5 (cinco) dias \xFAteis)"},"contratacao.prazo_assinatura_digital":{fonte:"autos",descricao:"dias \xFAteis, com extenso, para assinar digitalmente"},"contratacao.prazo_devolucao":{fonte:"autos",descricao:"prazo em dias, com extenso, para devolver o contrato assinado"},"contratacao.prazo_resposta":{fonte:"autos",descricao:"dias \xFAteis, com extenso, para resposta por outro meio eletr\xF4nico"},contratacao_direta:{fonte:"regra",descricao:"ata de contrata\xE7\xE3o direta (Aviso) \xD7 preg\xE3o (Edital)"},contratacoes_paralelas:{fonte:"regra",descricao:"contrata\xE7\xF5es paralelas e n\xE3o excludentes (art. 79, I): inclui a se\xE7\xE3o de crit\xE9rios de ordem de contrata\xE7\xE3o"},"contratacoes_paralelas.criterios":{fonte:"autos",descricao:"lista de {texto}: crit\xE9rios de distribui\xE7\xE3o da demanda"},"contratada.cidade":{fonte:"autos",descricao:"cidade da sede da contratada (endere\xE7o sem a cidade)"},"contratada.cnpj":{fonte:"autos",descricao:"qualifica\xE7\xE3o da contratada (contrato, SICAF, ato constitutivo)"},"contratada.endereco":{fonte:"autos",descricao:"qualifica\xE7\xE3o da contratada (contrato, SICAF, ato constitutivo)"},"contratada.razao_social":{fonte:"autos",descricao:"qualifica\xE7\xE3o da contratada (contrato, SICAF, ato constitutivo)"},"contratada.uf":{fonte:"autos",descricao:"UF da sede da contratada"},"contrato.clausula_reajuste":{fonte:"autos",descricao:"cl\xE1usula do contrato que prev\xEA o reajuste (ex.: Cl\xE1usula S\xE9tima)"},"contrato.numero":{fonte:"autos",descricao:"dados do contrato vigente"},"contrato.objeto":{fonte:"autos",descricao:"objeto do contrato sem artigo inicial e sem ponto final, completando 'O objeto do presente instrumento \xE9 a ...'"},"contrato.sei":{fonte:"autos",descricao:"dados do contrato vigente"},"convencao_coletiva.paradigma":{fonte:"autos",descricao:"acordos/conven\xE7\xF5es coletivas usados no valor estimado"},"credenciamento.ano":{fonte:"calculo",descricao:"ano do credenciamento (4 d\xEDgitos; o modelo traz 20...)"},"credenciamento.inciso":{fonte:"regra",descricao:"inciso do art. 3\xBA do Decreto 11.878/2024 em que se enquadra o credenciamento (ex.: I)"},"credenciamento.numero":{fonte:"autos",descricao:"n\xFAmero do edital de credenciamento (sem o ano)"},"credenciamento.objeto":{fonte:"autos",descricao:"bem ou servi\xE7o do credenciado, em min\xFAscula e sem ponto, completando 'fornecer ...' / 'prestar servi\xE7os de ...' (na capa sai em mai\xFAsculas)"},dedicacao_exclusiva:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"descredenciamento.prazo_pedido":{fonte:"autos",descricao:"dias, com extenso, de anteced\xEAncia do pedido de descredenciamento"},descricao_marca_fabricante:{fonte:"regra",descricao:"o requerimento exige descri\xE7\xE3o detalhada do objeto com marca e fabricante"},"desempate.integridade":{fonte:"regra",descricao:"inclui a declara\xE7\xE3o de programa de integridade para desempate (art. 60, IV)"},"destinos.gex":{fonte:"config",descricao:"constante do CFC (templates/constantes.json)"},dispensa_eletronica:{fonte:"regra",descricao:"tipo de contrata\xE7\xE3o direta e hip\xF3tese legal"},"dispensa_eletronica.relatorio_sei":{fonte:"autos",descricao:"SEI de documento citado"},"disputa.modo":{fonte:"regra",descricao:"aberto | aberto e fechado | fechado e aberto"},"divisao.grupo_unico":{fonte:"regra",descricao:"licita\xE7\xE3o em grupo \xFAnico"},"divisao.grupo_unico.qtd_itens":{fonte:"autos",descricao:"n\xFAmero de itens do grupo \xFAnico, com extenso"},"divisao.grupos":{fonte:"regra",descricao:"licita\xE7\xE3o dividida em grupos"},"divisao.item_unico":{fonte:"regra",descricao:"licita\xE7\xE3o em item \xFAnico"},"divisao.itens":{fonte:"regra",descricao:"licita\xE7\xE3o dividida em itens"},"divisao.itens_e_grupos":{fonte:"regra",descricao:"licita\xE7\xE3o com itens isolados e grupos"},"documento_base.descricao":{fonte:"autos",descricao:"descri\xE7\xE3o do documento citado, como consta nos autos"},"documento_base.sei":{fonte:"autos",descricao:"SEI de documento citado"},documentos_recebimento:{fonte:"regra",descricao:"exige as built, habite-se etc. no recebimento definitivo"},"dotacao.conta":{fonte:"autos",descricao:"dota\xE7\xE3o or\xE7ament\xE1ria (reserva da Gecont)"},"dotacao.conta_descricao":{fonte:"autos",descricao:"descri\xE7\xE3o da conta cont\xE1bil (reserva da Gecont)"},"dotacao.empenho":{fonte:"autos",descricao:"n\xFAmero da nota de empenho"},"dotacao.exercicio":{fonte:"autos",descricao:"dota\xE7\xE3o or\xE7ament\xE1ria (reserva da Gecont)"},"dotacao.fonte":{fonte:"autos",descricao:"fonte de recursos (reserva da Gecont)"},"dotacao.gestao_unidade":{fonte:"autos",descricao:"gest\xE3o/unidade da dota\xE7\xE3o (reserva da Gecont)"},"dotacao.plano_interno":{fonte:"autos",descricao:"plano interno (reserva da Gecont; 'n\xE3o se aplica' se inexistente)"},"dotacao.projeto":{fonte:"autos",descricao:"dota\xE7\xE3o or\xE7ament\xE1ria (reserva da Gecont)"},"dotacao.projeto_descricao":{fonte:"autos",descricao:"descri\xE7\xE3o do projeto (reserva da Gecont)"},"dotacao.resolucao":{fonte:"autos",descricao:"dota\xE7\xE3o or\xE7ament\xE1ria (reserva da Gecont)"},e_minuta:{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},"edital.anexos":{fonte:"autos",descricao:"anexos al\xE9m do Anexo I, j\xE1 com numeral romano"},"edital.sitio_eletronico":{fonte:"autos",descricao:"endere\xE7o eletr\xF4nico onde o edital e os anexos ficam dispon\xEDveis, al\xE9m do PNCP"},"edital.vigencia":{fonte:"autos",descricao:"prazo de vig\xEAncia do edital, com extenso e unidade (ex.: 12 (doze) meses)"},"edital.vigencia_inicio":{fonte:"autos",descricao:"data de in\xEDcio da vig\xEAncia do edital (dd/mm/aaaa)"},efeitos_em:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},engenharia:{fonte:"regra",descricao:"obras ou servi\xE7os comuns de engenharia: crit\xE9rios de aceitabilidade (art. 59)"},"engenharia.preco_unitario":{fonte:"regra",descricao:"engenharia com crit\xE9rio de pre\xE7o unit\xE1rio"},exclusiva_me_epp:{fonte:"regra",descricao:"participa\xE7\xE3o exclusiva ME/EPP (art. 48, I, LC 123) em alguns itens"},"exclusiva_me_epp.itens":{fonte:"autos",descricao:"itens exclusivos ME/EPP, como no TR (ex.: 1, 2 e 3)"},exige_marca:{fonte:"regra",descricao:"inclui a coluna Marca"},exige_modelo:{fonte:"regra",descricao:"inclui a coluna Modelo"},extincao:{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},"extincao.data_efeito":{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},"extincao.ultimo_dia":{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},fornecedores:{fonte:"autos",descricao:"fornecedores signat\xE1rios: razao_social, representante, funcao"},fornecimento:{fonte:"regra",descricao:"verdadeiro = 'fornecer' (bens); falso = 'prestar servi\xE7os de'"},"fundamento.clausula":{fonte:"autos",descricao:"cl\xE1usula do contrato que prev\xEA a extin\xE7\xE3o"},"fundamento.inciso_137":{fonte:"agente",descricao:"fundamento proposto pelo agente, validado por voc\xEA"},fundamento_projur:{fonte:"regra",descricao:"fundamento do envio \xE0 Projur pelo regime: 8666 \u2192 inciso VI e par\xE1grafo \xFAnico do art. 38 da Lei n\xBA 8.666/1993; 14133 \u2192 art. 53, \xA7 4\xBA, da Lei n\xBA 14.133/2021 (conferir)"},garantia:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"garantia.percentual":{fonte:"autos",descricao:"garantia exigida no contrato"},"garantia.prazo":{fonte:"autos",descricao:"garantia exigida no contrato"},gecont_destino:{fonte:"config",descricao:"assinaturas (assets/assinaturas.json)"},"gelic.cargo":{fonte:"config",descricao:"assinaturas (assets/assinaturas.json)"},"gelic.nome":{fonte:"config",descricao:"assinaturas (assets/assinaturas.json)"},"gex.cargo":{fonte:"config",descricao:"assinaturas (assets/assinaturas.json)"},"gex.nome":{fonte:"config",descricao:"assinaturas (assets/assinaturas.json)"},grande_vulto:{fonte:"regra",descricao:"contrata\xE7\xE3o de grande vulto (art. 6\xBA, XXII)"},"habilitacao.antecede":{fonte:"regra",descricao:"habilita\xE7\xE3o antes de propostas e lances (art. 17, \xA7 1\xBA)"},"habilitacao.outro_meio":{fonte:"autos",descricao:"outro meio admitido para apresentar os documentos de habilita\xE7\xE3o"},"habilitacao.prazo_analise":{fonte:"autos",descricao:"dias \xFAteis, com extenso, para o \xF3rg\xE3o analisar a habilita\xE7\xE3o (ex.: 5 (cinco))"},"habilitacao.prazo_complementacao":{fonte:"autos",descricao:"horas, com extenso, para complementar documentos de habilita\xE7\xE3o, no m\xEDnimo duas (ex.: 2 (duas))"},"habilitacao.prazo_documentos":{fonte:"autos",descricao:"prazo para envio de documentos complementares, com unidade e extenso"},"hipotese.dispensa_valor":{fonte:"regra",descricao:"tipo de contrata\xE7\xE3o direta e hip\xF3tese legal"},"hipotese.inex_exclusivo":{fonte:"regra",descricao:"tipo de contrata\xE7\xE3o direta e hip\xF3tese legal"},"hipotese.inex_treinamento":{fonte:"regra",descricao:"tipo de contrata\xE7\xE3o direta e hip\xF3tese legal"},"impugnacao.meios":{fonte:"autos",descricao:"meios eletr\xF4nicos de recep\xE7\xE3o de impugna\xE7\xF5es e pedidos de esclarecimento"},inexigibilidade:{fonte:"regra",descricao:"tipo de contrata\xE7\xE3o direta e hip\xF3tese legal"},"informacao_tecnica.descricao":{fonte:"autos",descricao:"descri\xE7\xE3o do documento citado, como consta nos autos"},"informacao_tecnica.sei":{fonte:"autos",descricao:"SEI de documento citado"},infratores:{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},"instrumento.numero":{fonte:"autos",descricao:"instrumento a extinguir (tipo, n\xFAmero, origem, objeto)"},"instrumento.o":{fonte:"regra",descricao:"artigo do instrumento: o (Contrato) / a (Ordem de Fornecimento)"},"instrumento.objeto":{fonte:"autos",descricao:"instrumento a extinguir (tipo, n\xFAmero, origem, objeto)"},"instrumento.origem":{fonte:"autos",descricao:"instrumento a extinguir (tipo, n\xFAmero, origem, objeto)"},"instrumento.sei":{fonte:"autos",descricao:"SEI de documento citado"},"instrumento.tipo":{fonte:"autos",descricao:"instrumento a extinguir (tipo, n\xFAmero, origem, objeto)"},instrumento_equivalente:{fonte:"regra",descricao:"instrumento que substitui o contrato (ex.: Nota de Empenho); vazio = Termo de Contrato"},interessados:{fonte:"autos",descricao:"empresas interessadas (ata/despacho do pregoeiro)"},itens:{fonte:"autos",descricao:"itens adjudicados (relat\xF3rio da dispensa eletr\xF4nica)"},"julgamento.forma":{fonte:"regra",descricao:"por item | por grupo | global"},"lances.intervalo_minimo":{fonte:"autos",descricao:"intervalo m\xEDnimo entre lances, com extenso"},lgpd:{fonte:"regra",descricao:"contrata\xE7\xE3o envolve tratamento de dados pessoais (TR) \u2192 inclui a cl\xE1usula de LGPD"},licitacao:{fonte:"regra",descricao:"contrato decorre de licita\xE7\xE3o: {concorrencia: true|false}; ausente = contrata\xE7\xE3o direta"},"licitacao.ano":{fonte:"calculo",descricao:"ano da licita\xE7\xE3o (4 d\xEDgitos)"},"licitacao.concorrencia":{fonte:"regra",descricao:"modalidade: verdadeiro = Concorr\xEAncia; falso = Preg\xE3o Eletr\xF4nico"},"licitacao.modalidade":{fonte:"regra",descricao:"preg\xE3o eletr\xF4nico | concorr\xEAncia (sai em mai\xFAsculas na capa e no t\xEDtulo)"},"licitacao.numero":{fonte:"autos",descricao:"n\xFAmero/ano da licita\xE7\xE3o de origem (ex.: 90005/2026)"},"licitacao.objeto":{fonte:"autos",descricao:"objeto do TR com artigo, completando 'O objeto da presente licita\xE7\xE3o \xE9 ...'"},"licitacao.origem":{fonte:"autos",descricao:"modalidade e n\xFAmero da licita\xE7\xE3o de origem, como no pre\xE2mbulo do contrato (ex.: Preg\xE3o Eletr\xF4nico n\xBA 15/2022)"},"licitacao.sitio_autos":{fonte:"config",descricao:"s\xEDtio com vista franqueada dos autos (candidato a constantes.json)"},"licitacao.sitio_edital":{fonte:"config",descricao:"endere\xE7o eletr\xF4nico onde o edital e os anexos ficam dispon\xEDveis (candidato a constantes.json)"},"limite_dispensa.decreto":{fonte:"config",descricao:"limite do art. 75, II, atualizado pelo decreto do exerc\xEDcio (preencher todo janeiro)"},"limite_dispensa.exercicio":{fonte:"config",descricao:"limite do art. 75, II, atualizado pelo decreto do exerc\xEDcio (preencher todo janeiro)"},"limite_dispensa.valor":{fonte:"config",descricao:"limite do art. 75, II, atualizado pelo decreto do exerc\xEDcio (preencher todo janeiro)"},local_data:{fonte:"calculo",descricao:"local e data de assinatura (ex.: Bras\xEDlia/DF, 20 de outubro de 2026.)"},maior_desconto:{fonte:"regra",descricao:"crit\xE9rio de julgamento: verdadeiro = maior desconto; falso = menor pre\xE7o (TR)"},"manifestacao_contratada.sei":{fonte:"autos",descricao:"SEI de documento citado"},"manifestacao_gestor.sei":{fonte:"autos",descricao:"SEI de documento citado"},manual_usuario:{fonte:"regra",descricao:"bem com manual e assist\xEAncia t\xE9cnica: exige manual em portugu\xEAs e rede autorizada"},manutencao:{fonte:"regra",descricao:"servi\xE7o de manuten\xE7\xE3o e assist\xEAncia t\xE9cnica (art. 47, \xA7 2\xBA)"},"manutencao.distancia":{fonte:"autos",descricao:"dist\xE2ncia m\xE1xima da unidade de servi\xE7o, com extenso"},"manutencao.locais":{fonte:"autos",descricao:"endere\xE7o(s) da manuten\xE7\xE3o"},margem_preferencia:{fonte:"regra",descricao:"algum item com margem de prefer\xEAncia (art. 26)"},matriz_risco:{fonte:"agente",descricao:"matriz de riscos; ausente = sem matriz"},"matriz_risco.compartilhados":{fonte:"agente",descricao:"riscos compartilhados [{texto}]"},"matriz_risco.contratado":{fonte:"agente",descricao:"riscos do CONTRATADO [{texto}]"},"matriz_risco.contratante":{fonte:"agente",descricao:"riscos do CONTRATANTE [{texto}]"},"matriz_risco.percentual_contratado":{fonte:"autos",descricao:"propor\xE7\xE3o do CONTRATADO nos riscos compartilhados"},"matriz_risco.percentual_contratante":{fonte:"autos",descricao:"propor\xE7\xE3o do CONTRATANTE nos riscos compartilhados"},"me_epp.itens_sem_tratamento":{fonte:"autos",descricao:"itens sem tratamento favorecido (art. 4\xBA, \xA7 1\xBA)"},mercados_fluidos:{fonte:"regra",descricao:"hip\xF3tese do art. 79, III (mercados fluidos): requerimento informa o percentual m\xEDnimo de desconto"},"minuta.sei":{fonte:"autos",descricao:"SEI de documento citado"},motivacao:{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},motivo_resumo:{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},"multa.faixa1_max":{fonte:"autos",descricao:"multa m\xE1xima da primeira faixa de infra\xE7\xF5es (ex.: 15%)"},"multa.faixa1_min":{fonte:"autos",descricao:"multa m\xEDnima da primeira faixa de infra\xE7\xF5es (ex.: 0,5%)"},"multa.faixa2_max":{fonte:"autos",descricao:"multa m\xE1xima da segunda faixa de infra\xE7\xF5es (ex.: 30%)"},"multa.faixa2_min":{fonte:"autos",descricao:"multa m\xEDnima da segunda faixa de infra\xE7\xF5es (ex.: 15%)"},"multa.grave_max":{fonte:"autos",descricao:"multa m\xE1xima das infra\xE7\xF5es graves"},"multa.grave_min":{fonte:"autos",descricao:"multa m\xEDnima das infra\xE7\xF5es graves"},"multa.leve_max":{fonte:"autos",descricao:"multa m\xE1xima das infra\xE7\xF5es leves"},"multa.leve_min":{fonte:"autos",descricao:"multa m\xEDnima das infra\xE7\xF5es leves"},"multa.prazo_recolhimento":{fonte:"autos",descricao:"dias \xFAteis, com extenso, para recolher a multa"},natureza:{fonte:"regra",descricao:"natureza da despesa no despacho de reserva (reajuste, prorroga\xE7\xE3o, contrata\xE7\xE3o...)"},natureza_intelectual:{fonte:"regra",descricao:"servi\xE7o de natureza intelectual: reuni\xE3o inicial registrada em ata"},natureza_valor:{fonte:"regra",descricao:"natureza da despesa no despacho de reserva (reajuste, prorroga\xE7\xE3o, contrata\xE7\xE3o...)"},"negociacao.prazo_proposta":{fonte:"autos",descricao:"prazo para enviar a proposta ajustada, com extenso (m\xEDnimo 2 (duas) horas)"},nomeacao:{fonte:"regra",descricao:"h\xE1 ato de nomea\xE7\xE3o da autoridade signat\xE1ria (imprime Portaria/DOU/matr\xEDcula)"},"nomeacao.data":{fonte:"config",descricao:"data da portaria de nomea\xE7\xE3o, por extenso"},"nomeacao.dou":{fonte:"config",descricao:"data de publica\xE7\xE3o da portaria de nomea\xE7\xE3o, por extenso"},"nomeacao.matricula":{fonte:"config",descricao:"matr\xEDcula funcional da autoridade signat\xE1ria"},"nomeacao.portaria":{fonte:"config",descricao:"n\xBA da portaria de nomea\xE7\xE3o da autoridade signat\xE1ria (modelo AGU; a revisar para o CFC)"},norma_sancao:{fonte:"config",descricao:"constante do CFC (templates/constantes.json)"},objeto:{fonte:"autos",descricao:"objeto copiado do contrato/TR, iniciando em min\xFAscula e terminando com ponto"},objeto_contratacao:{fonte:"autos",descricao:'objeto como no TR, completando "a contrata\xE7\xE3o de ..." (sem ponto final)'},objeto_curto:{fonte:"autos",descricao:"objeto em min\xFAscula, sem ponto final, para meio de frase (no cabe\xE7alho sai em mai\xFAsculas)"},objeto_servico:{fonte:"autos",descricao:"objeto completando 'servi\xE7os ... de ...' (min\xFAscula, sem ponto)"},orcamento_sigiloso:{fonte:"regra",descricao:"or\xE7amento estimado sigiloso (art. 24)"},participantes:{fonte:"autos",descricao:"\xF3rg\xE3os participantes (IRP); vazio = n\xE3o h\xE1"},planilha_custos:{fonte:"regra",descricao:"exige planilha de custos unit\xE1rios e forma\xE7\xE3o de pre\xE7os"},prazo_decisao:{fonte:"autos",descricao:"prazo para a Administra\xE7\xE3o decidir requerimentos (art. 123); padr\xE3o legal 1 (um) m\xEAs"},prazo_projur:{fonte:"config",descricao:"prazo padr\xE3o dado \xE0 Projur (constantes.json)"},prazo_reequilibrio:{fonte:"autos",descricao:"prazo para responder pedido de reequil\xEDbrio (art. 92, XI); em regra o mesmo do art. 123"},"preco.peso":{fonte:"calculo",descricao:"peso do pre\xE7o = 100 \u2212 tecnica.peso"},precos_diferentes:{fonte:"regra",descricao:"admite pre\xE7os diferentes (art. 15, III, Decreto 11.462/2023)"},"precos_diferentes.criterios":{fonte:"agente",descricao:"crit\xE9rios de pre\xE7os diferentes, conforme o TR"},preferencia_me_epp:{fonte:"regra",descricao:"SIM/N\xC3O no campo Prefer\xEAncia ME/EPP/Equiparadas"},processo:{fonte:"autos",descricao:"n\xFAmero do processo SEI (cabe\xE7alho de _leitura.md)"},processo_origem:{fonte:"autos",descricao:"n\xFAmero do processo ou da contrata\xE7\xE3o de origem"},projeto_basico:{fonte:"regra",descricao:"obras/engenharia: 'Projeto B\xE1sico' e/ou 'Projeto Executivo'; vazio nos demais casos"},projeto_executivo_contratado:{fonte:"regra",descricao:"o CONTRATADO elabora o projeto executivo"},"proposta.campo_valor":{fonte:"autos",descricao:"campo de valor da proposta no sistema (ex.: valor unit\xE1rio e total do item)"},"proposta.fabricante":{fonte:"regra",descricao:"proposta informa fabricante"},"proposta.marca":{fonte:"regra",descricao:"proposta informa marca"},"proposta.quantidade_minima":{fonte:"autos",descricao:"quantidade m\xEDnima a cotar, com extenso; vazio = sem o subitem"},"proposta.validade":{fonte:"autos",descricao:"validade m\xEDnima da proposta em dias, com extenso (ex.: 60 (sessenta))"},"proposta_tecnica.requisitos":{fonte:"autos",descricao:"lista de requisitos da proposta t\xE9cnica"},prorrogacao:{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},"prorrogacao.fim":{fonte:"calculo",descricao:"novo per\xEDodo = dia seguinte ao fim da vig\xEAncia atual + prazo"},"prorrogacao.inicio":{fonte:"calculo",descricao:"novo per\xEDodo = dia seguinte ao fim da vig\xEAncia atual + prazo"},"prorrogacao.prazo":{fonte:"autos",descricao:"prazo da prorroga\xE7\xE3o pedido no formul\xE1rio"},protecao_trabalho:{fonte:"regra",descricao:"execu\xE7\xE3o com trabalhadores do contratado: inclui obriga\xE7\xF5es de prote\xE7\xE3o ao trabalho"},reajuste:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"reajuste.composto":{fonte:"calculo",descricao:"mais de uma parcela"},"reajuste.data_base":{fonte:"autos",descricao:"data do or\xE7amento estimado (MCP), dd/mm/aaaa"},"reajuste.data_base_extenso":{fonte:"calculo",descricao:"data por extenso, gerada pelo motor"},"reajuste.efeitos":{fonte:"autos",descricao:"in\xEDcio dos efeitos financeiros, dd/mm/aaaa; tem de ser anivers\xE1rio da data-base"},"reajuste.efeitos_extenso":{fonte:"calculo",descricao:"data por extenso, gerada pelo motor"},"reajuste.indice":{fonte:"autos",descricao:"\xEDndice e percentual do reajuste (mem\xF3ria de c\xE1lculo)"},"reajuste.parcelas":{fonte:"autos",descricao:"lista de parcelas: descricao, periodicidade (mensal|anual), valor_atual; opcional valor_reajustado_informado (o motor confere)"},"reajuste.percentual":{fonte:"autos",descricao:"\xEDndice e percentual do reajuste (mem\xF3ria de c\xE1lculo)"},"reajuste.periodo":{fonte:"autos",descricao:"per\xEDodo acumulado do \xEDndice (mem\xF3ria de c\xE1lculo)"},"reajuste.sei":{fonte:"autos",descricao:"SEI da mem\xF3ria de c\xE1lculo do reajuste"},"reajuste.sigla":{fonte:"autos",descricao:"sigla do \xEDndice (ex.: IPCA)"},"reajuste.total_anual":{fonte:"calculo",descricao:"soma dos valores anuais reajustados, gerada pelo motor"},"reajuste.total_anual_extenso":{fonte:"calculo",descricao:"soma dos valores anuais reajustados, gerada pelo motor"},"reajuste.total_informado":{fonte:"autos",descricao:"opcional: total anual informado nos autos (o motor confere)"},"recurso.prazo_intencao":{fonte:"autos",descricao:"dias \xFAteis, com extenso, para manifestar a inten\xE7\xE3o de recorrer, no m\xE1ximo 3 (tr\xEAs)"},regime:{fonte:"regra",descricao:"regime legal do contrato (14133 ou 8666), pelo pre\xE2mbulo; o template recusa regime errado"},regime_execucao:{fonte:"autos",descricao:"obras/servi\xE7os comuns de engenharia: regime de execu\xE7\xE3o do art. 46, como no TR; vazio nos demais casos"},registro_precos:{fonte:"regra",descricao:"dispensa para registro de pre\xE7os: inclui pre\xE2mbulo SRP, se\xE7\xF5es Registro de Pre\xE7os, Ata e Cadastro de Reserva e o Anexo III"},"representante.funcao":{fonte:"autos",descricao:"representante da contratada (procura\xE7\xE3o ou ato constitutivo)"},"representante.nome":{fonte:"autos",descricao:"representante da contratada (procura\xE7\xE3o ou ato constitutivo)"},"representante.por_procuracao":{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"representante.tratamento":{fonte:"autos",descricao:"pelo Senhor | pela Senhora"},reserva_mulheres:{fonte:"regra",descricao:"reserva de vagas para mulheres v\xEDtimas de viol\xEAncia dom\xE9stica (Decreto 11.430/2023)"},"reserva_mulheres.inferior_25":{fonte:"regra",descricao:"contrato com menos de 25 colaboradores"},"reserva_mulheres.percentual":{fonte:"autos",descricao:"percentual de vagas reservadas"},"reserva_vagas.menos_25":{fonte:"regra",descricao:"contrato com menos de 25 colaboradores"},"reserva_vagas.menos_25.percentual":{fonte:"autos",descricao:"percentual de vagas reservadas a mulheres v\xEDtimas de viol\xEAncia"},reter_creditos:{fonte:"regra",descricao:"motivo do despacho \xE0 Projur / dados do termo de extin\xE7\xE3o"},seguranca_privada:{fonte:"regra",descricao:"vigil\xE2ncia/transporte de valores: capital m\xEDnimo da Lei 14.967/2024"},servico_agregado:{fonte:"regra",descricao:"compra com execu\xE7\xE3o no local (instala\xE7\xE3o/montagem): inclui obriga\xE7\xF5es de execu\xE7\xE3o do contratado"},"sessao.data":{fonte:"autos",descricao:"data da sess\xE3o da dispensa eletr\xF4nica (dd/mm/aaaa)"},"sessao.hora":{fonte:"autos",descricao:"hora da sess\xE3o sem o 'h' (ex.: 10)"},"sessao.hora_fim":{fonte:"autos",descricao:"fim da fase de lances (hh:mm)"},"sessao.hora_inicio":{fonte:"autos",descricao:"in\xEDcio da fase de lances (hh:mm)"},"sessao.link":{fonte:"config",descricao:"link do sistema (https://www.gov.br/compras/pt-br)"},simples_nacional_vedado:{fonte:"regra",descricao:"ME/EPP n\xE3o podem usar o Simples (cess\xE3o de m\xE3o de obra)"},supressao:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},"supressao.descricao":{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},"supressao.fundamento":{fonte:"agente",descricao:"fundamento proposto pelo agente, validado por voc\xEA"},"supressao.percentual":{fonte:"agente",descricao:"texto que exige leitura dos autos \u2014 marcado para valida\xE7\xE3o"},"tecnica.parametro":{fonte:"agente",descricao:"f\xF3rmula da Nota T\xE9cnica, justificada"},"tecnica.peso":{fonte:"autos",descricao:"peso da t\xE9cnica na nota final (m\xE1x. 70)"},testemunhas:{fonte:"autos",descricao:"lista de testemunhas [{nome}] (nota AGU: 2 testemunhas)"},"tr.anexo":{fonte:"autos",descricao:"n\xFAmero do anexo que \xE9 o TR"},"tr.itens":{fonte:"autos",descricao:"itens do TR que especificam o objeto"},"tr.sei":{fonte:"autos",descricao:"SEI de documento citado"},transicao_contratual:{fonte:"regra",descricao:"transi\xE7\xE3o contratual com transfer\xEAncia de conhecimento"},unidade_gestora:{fonte:"autos",descricao:"unidade gestora do contrato"},valor:{fonte:"autos",descricao:"valores como constam nos autos (formul\xE1rio, proposta, reserva)"},valor_extenso:{fonte:"calculo",descricao:"valor por extenso (gelic_lib.por_extenso_reais)"},valor_global:{fonte:"autos",descricao:"valores como constam nos autos (formul\xE1rio, proposta, reserva)"},valor_global_extenso:{fonte:"calculo",descricao:"valor por extenso (gelic_lib.por_extenso_reais)"},valor_mensal:{fonte:"autos",descricao:"valores como constam nos autos (formul\xE1rio, proposta, reserva)"},valor_mensal_extenso:{fonte:"calculo",descricao:"valor por extenso (gelic_lib.por_extenso_reais)"},valor_por_demanda:{fonte:"regra",descricao:"variantes do termo aditivo (modelo Projur JAN/2026)"},varios_itens:{fonte:"regra",descricao:"contrata\xE7\xE3o com mais de um item (habilita\xE7\xE3o cumulativa)"},vedadas_cooperativas:{fonte:"regra",descricao:"vedada a participa\xE7\xE3o de cooperativas"},vedadas_pessoas_fisicas:{fonte:"regra",descricao:"vedada a participa\xE7\xE3o de pessoas f\xEDsicas (justificar no ETP: IN SEGES/ME 116/2021, art. 4\xBA, par. \xFAnico)"},vedado_consorcio:{fonte:"regra",descricao:"vedada a participa\xE7\xE3o de cons\xF3rcio (justificar pelo art. 15)"},"vigencia.continuada":{fonte:"regra",descricao:"fornecimento/servi\xE7o continuado (arts. 106 e 107)"},"vigencia.emergencial":{fonte:"regra",descricao:"contrata\xE7\xE3o emergencial (art. 75, VIII)"},"vigencia.escopo":{fonte:"regra",descricao:"objeto por escopo (art. 105)"},"vigencia.fim":{fonte:"autos",descricao:"data de encerramento da vig\xEAncia dos contratos decorrentes (dd/mm/aaaa)"},"vigencia.inicio":{fonte:"autos",descricao:"data de in\xEDcio da vig\xEAncia dos contratos decorrentes (dd/mm/aaaa)"},"vigencia.prazo":{fonte:"autos",descricao:'prazo de vig\xEAncia do TR, por extenso ("12 (doze) meses")'},"vigencia.termo_inicial":{fonte:"autos",descricao:'termo inicial da vig\xEAncia, completando "contados ..." ("da data de assinatura")'},vigilancia_patrimonial:{fonte:"regra",descricao:"vigil\xE2ncia patrimonial: tira o subitem PIS/COFINS n\xE3o cumulativo"},"vista_autos.sitio":{fonte:"autos",descricao:"s\xEDtio eletr\xF4nico com vista franqueada dos autos"},vistoria:{fonte:"regra",descricao:"vistoria pr\xE9via (art. 63, \xA7\xA7 2\xBA e 3\xBA)"},"vistoria.agendamento":{fonte:"autos",descricao:"forma de agendamento da vistoria"}},o={cfc:{nome:"Conselho Federal de Contabilidade",sigla:"CFC",cnpj:"33.618.570/0001-07",sede:"SAUS Quadra 5, Bloco J, Ed. CFC, Bras\xEDlia/DF",uasg:"383500",setor_licitacoes:"Departamento de Licita\xE7\xF5es e Contratos",cidade:"Bras\xEDlia/DF"},destinos:{gex:"\xC0 Ger\xEAncia Executiva de Gest\xE3o de Licita\xE7\xF5es, Contratos e Servi\xE7os."},prazo_projur:"7 (sete) dias",norma_sancao:"Portaria CFC n\xBA 266/2025",autoridades:{vp_gestao:{nome:"Weberth Fernandes",cargo:"Vice-Presidente de Gest\xE3o Administrativa-Financeira"},diretora_digeo:{nome:"Adriana da Silva Guimar\xE3es",cargo:"Diretora de Gest\xE3o Estrat\xE9gica"},presidente:{nome:"A\xE9cio Prado Dantas J\xFAnior",cargo:"Presidente"}},modelos_projur:{versao:"28/01/2026",processo:"90796110000005.000003/2025-51",assinado_por:"Procurador-Chefe PROJUR/CFC"}},r={orgao:{nome:"CONSELHO FEDERAL DE CONTABILIDADE",endereco:"SAUS Quadra 05, Lote 03, Bloco J, Edif\xEDcio CFC, Bairro Asa Sul, Bras\xEDlia/DF, CEP 70070-920",contato:"Telefone: (61) 3314-9600 - www.cfc.org.br - E-mail: cfc@cfc.org.br"},gelic:{nome:"Gabriel Almeida Granja",cargo:"Gerente de Licita\xE7\xF5es e Contratos"},gex:{nome:"Eunice Rosa de Melo dos Santos",cargo:"Gerente Executiva de Gest\xE3o de Licita\xE7\xF5es, Contratos e Servi\xE7os"},gecont_destino:"\xC0 Ger\xEAncia de Contabilidade.",destino_padrao:"\xC0 unidade demandante.",observacoes:["A presente verifica\xE7\xE3o n\xE3o abordou as particularidades da execu\xE7\xE3o do objeto, as quais s\xE3o de responsabilidade da equipe de planejamento.","Visando preservar o hist\xF3rico do processo, nenhum documento submetido \xE0 an\xE1lise dever\xE1 ser cancelado pela unidade demandante em caso de reedi\xE7\xE3o ou substitui\xE7\xE3o."],observacao_etp:"No que tange ao ETP, a an\xE1lise limitou-se \xE0 verifica\xE7\xE3o dos elementos e requisitos aplic\xE1veis, sem exame do m\xE9rito t\xE9cnico ou da solu\xE7\xE3o adotada.",checklist:{titulo:"CHECK-LIST DE INSTRU\xC7\xC3O PROCESSUAL",guia_titulo:"CHECK-LIST DE INSTRU\xC7\xC3O PROCESSUAL \u2014 GUIA",legenda:{atende:"verificado nos autos, com SEI e p\xE1gina",nao_atende:"apontado no documento formal; constata\xE7\xE3o e recomenda\xE7\xE3o logo abaixo do item",nao_se_aplica:"n\xE3o cabe neste processo; justificativa na coluna Evid\xEAncia",nao_verificado:"n\xE3o examinado nesta an\xE1lise"},nota_rodape:"Documento auxiliar gerado a partir dos achados registrados pela Gelic; em caso de diverg\xEAncia, prevalece o documento formal (DVI ou despacho)."}};export{e as a,a as b,o as c,r as d};
