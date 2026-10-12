@requer regime=14133
@fonte agu-edital-tecnica-preco
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
@cabecalho

%% Capa do modelo. AGU: prazo mínimo para propostas em técnica e preço de 35 dias úteis (art. 55, IV, a) e de 60 dias úteis na contratação integrada (art. 55, II, d).
> CONCORRÊNCIA
> {licitacao.numero}/{licitacao.ano}
> CONTRATANTE (UASG)
> ({cfc.uasg})
> OBJETO
> {objeto_curto|maiusculas}
> VALOR TOTAL DA CONTRATAÇÃO
> {^orcamento_sigiloso}R$ {valor_global}{/orcamento_sigiloso}{#orcamento_sigiloso}Sigiloso{/orcamento_sigiloso}
> DATA DA SESSÃO PÚBLICA
> Dia {sessao.data} às {sessao.hora}h (horário de Brasília)
> Critério de Julgamento:
> Técnica e preço
> Modo de disputa:
> Fechado.
> PREFERÊNCIA ME/EPP/EQUIPARADAS
> {#preferencia_me_epp}SIM{/preferencia_me_epp}{^preferencia_me_epp}NÃO{/preferencia_me_epp}
> MARGEM DE PREFERÊNCIA PARA ALGUM ITEM
> {#margem_preferencia}SIM{/margem_preferencia}{^margem_preferencia}NÃO{/margem_preferencia}

# CONCORRÊNCIA Nº {licitacao.numero}/{licitacao.ano}

> (Processo Administrativo n° {processo})

Torna-se público que o(a) {cfc.nome}, por meio do(a) {cfc.setor_licitacoes}, sediado(a) {cfc.sede}, realizará licitação, na modalidade CONCORRÊNCIA na forma ELETRÔNICA, nos termos da Lei nº 14.133, de 1º de abril de 2021 e demais legislação aplicável e, ainda, de acordo com as condições estabelecidas neste Edital.

## {§sec}. DO OBJETO

{§} O objeto da presente licitação é {licitacao.objeto}, conforme condições, quantidades e exigências estabelecidas neste Edital e seus anexos.

%% AGU: indicar a divisão do objeto (itens, item único, grupos, grupo único ou itens e grupos); em grupo único com registro de preços, fixar critério de aceitabilidade dos preços unitários máximos (art. 13, I, do Decreto 11.462/2023).
{#divisao.itens}{§} A licitação será dividida em itens, conforme tabela constante do Termo de Referência/Projeto Básico, facultando-se ao licitante a participação em quantos itens forem de seu interesse.{/divisao.itens}

{#divisao.item_unico}{§} A licitação será realizada em único item.{/divisao.item_unico}

{#divisao.grupos}{§} A licitação será dividida em grupos, formados por um ou mais itens, conforme tabela constante do Termo de Referência/Projeto Básico, facultando-se ao licitante a participação em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os compõem.{/divisao.grupos}

{#divisao.grupo_unico}{§} A licitação será realizada em grupo único, formado por {divisao.grupo_unico.qtd_itens} itens, conforme tabela constante no Termo de Referência/Projeto Básico, devendo o licitante oferecer proposta para todos os itens que o compõem.{/divisao.grupo_unico}

{#divisao.itens_e_grupos}{§} A licitação será dividida em item(s) e grupo(s), sendo este(s) último(s) formado(s) por dois ou mais itens, conforme tabela constante do Termo de Referência/Projeto Básico.

{§§} relativamente ao(s) item(s) isolado(s), faculta-se ao licitante a participação em quantos itens forem de seu interesse;

{§§} relativamente ao(s) grupo(s), faculta-se ao licitante a participação em quantos grupos forem de seu interesse, devendo oferecer proposta para todos os itens que os compõem.{/divisao.itens_e_grupos}

## {§sec}. DA PARTICIPAÇÃO NA LICITAÇÃO

{§} Poderão participar deste certame os interessados previamente credenciados no Sistema de Cadastramento Unificado de Fornecedores - SICAF e no Sistema de Compras do Governo Federal (www.gov.br/compras).

{§} Os interessados deverão atender às condições exigidas no cadastramento no Sicaf até o terceiro dia útil anterior à data prevista para recebimento das propostas.

{§} O licitante responsabiliza-se exclusiva e formalmente pelas transações efetuadas em seu nome, assume como firmes e verdadeiras suas propostas, inclusive os atos praticados diretamente ou por seu representante, excluída a responsabilidade do provedor do sistema ou do órgão ou entidade promotora da licitação por eventuais danos decorrentes de uso indevido das credenciais de acesso, ainda que por terceiros.

{§} É de responsabilidade do cadastrado conferir a exatidão dos seus dados cadastrais nos Sistemas relacionados no item anterior e mantê-los atualizados junto aos órgãos responsáveis pela informação, devendo proceder, imediatamente, à correção ou à alteração dos registros tão logo identifique incorreção ou aqueles se tornem desatualizados.

{§} A não observância do disposto no item anterior poderá ensejar desclassificação no momento da habilitação.

%% AGU: itens exclusivos ME/EPP só em razão do valor (art. 48 da LC 123); não se aplica a item cujo valor supere a receita bruta máxima de EPP (art. 4º, § 1º, da Lei 14.133; valor anual se vigência > 1 ano).
{#exclusiva_me_epp}{§} Para os itens {exclusiva_me_epp.itens}, a participação é exclusiva a microempresas e empresas de pequeno porte, nos termos do art. 48 da Lei Complementar nº 123, de 14 de dezembro de 2006.

{§} A obtenção do benefício a que se refere o item anterior fica limitada às microempresas e às empresas de pequeno porte que, no ano-calendário de realização da licitação, ainda não tenham celebrado contratos com a Administração Pública cujos valores somados extrapolem a receita bruta máxima admitida para fins de enquadramento como empresa de pequeno porte.{/exclusiva_me_epp}

%% AGU: ajustar conforme cada item/lote se enquadre ou não no limite do art. 4º, § 1º — tratamento favorecido (1º parágrafo) e/ou itens em que ele é afastado (2º parágrafo).
{#preferencia_me_epp}{§} Será concedido tratamento favorecido para as microempresas e empresas de pequeno porte, para as sociedades cooperativas mencionadas no artigo 16 da Lei nº 14.133, de 2021, para o agricultor familiar, o produtor rural pessoa física e para o microempreendedor individual - MEI, nos limites previstos da Lei Complementar nº 123, de 2006 e do Decreto nº 8.538, de 2015.{/preferencia_me_epp}

{#me_epp.itens_sem_tratamento}{§} Nos itens {me_epp.itens_sem_tratamento} não será concedido nesta Licitação tratamento favorecido para microempresas, empresas de pequeno porte e figuras equiparadas, nos termos da Lei Complementar nº 123, de 2006, em razão da incidência, no caso, do art. 4º, § 1º da Lei nº 14.133, de 2021.{/me_epp.itens_sem_tratamento}

{§@nao_disputar} Não poderão disputar esta licitação:

{§§} aquele que não atenda às condições deste Edital e seu(s) anexo(s);

{§§} sociedade que desempenhe atividade incompatível com o objeto da licitação;

{§§} empresas estrangeiras que não tenham representação legal no Brasil com poderes expressos para receber citação e responder administrativa ou judicialmente;

{§§@autor_projeto} autor do anteprojeto, do projeto básico ou do projeto executivo, pessoa física ou jurídica, quando a licitação versar sobre serviços ou fornecimento de bens a ele relacionados;

{§§@empresa_projeto} empresa, isoladamente ou em consórcio, responsável pela elaboração do projeto básico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, responsável técnico ou subcontratado, quando a licitação versar sobre serviços ou fornecimento de bens a ela necessários;

{§§@sancao} pessoa física ou jurídica que se encontre, ao tempo da licitação, impossibilitada de participar da licitação em decorrência de sanção que lhe foi imposta;

{§§} aquele que mantenha vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade contratante ou com agente público que desempenhe função na licitação ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau;

{§§} empresas controladoras, controladas ou coligadas, nos termos da Lei nº 6.404, de 1976, concorrendo entre si;

{§§} pessoa física ou jurídica que, nos 5 (cinco) anos anteriores à divulgação do edital, tenha sido condenada judicialmente, com trânsito em julgado, por exploração de trabalho infantil, por submissão de trabalhadores a condições análogas às de escravo ou por contratação de adolescentes nos casos vedados pela legislação trabalhista;

{§§} Organizações da Sociedade Civil de Interesse Público - OSCIP, atuando nessa condição;

%% AGU: vedar cooperativas só em serviços com dedicação exclusiva de mão de obra fora do art. 10 da IN SEGES 5/2017 (Parecer 2/2023/DECOR/CGU/AGU).
{#vedadas_cooperativas}{§§} sociedades cooperativas;{/vedadas_cooperativas}

%% AGU: vedar consórcio é exceção e exige justificativa (art. 15, caput, da Lei 14.133).
{#vedado_consorcio}{§§} pessoas jurídicas reunidas em consórcio;{/vedado_consorcio}

{§§} pessoas físicas.

{§@agente_publico} Não poderá participar, direta ou indiretamente, da licitação ou da execução do contrato agente público do órgão ou entidade contratante, devendo ser observadas as situações que possam configurar conflito de interesses no exercício ou após o exercício do cargo ou emprego, nos termos da legislação que disciplina a matéria, conforme § 1º do art. 9º da Lei nº 14.133, de 2021.

{§} O impedimento de que trata o item {§ref@sancao} será também aplicado ao licitante que atue em substituição a outra pessoa, física ou jurídica, com o intuito de burlar a efetividade da sanção a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o ilícito ou a utilização fraudulenta da personalidade jurídica do licitante.

{§} A critério da Administração e exclusivamente a seu serviço, o autor dos projetos e a empresa a que se referem os itens {§ref@autor_projeto} e {§ref@empresa_projeto} poderão participar no apoio das atividades de planejamento da contratação, de execução da licitação ou de gestão do contrato, desde que sob supervisão exclusiva de agentes públicos do órgão ou entidade.

{§} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econômico.

{§} O disposto nos itens {§ref@autor_projeto} e {§ref@empresa_projeto} não impede a licitação ou a contratação de serviço que inclua como encargo do contratado a elaboração do projeto básico e do projeto executivo, nas contratações integradas, e do projeto executivo, nos demais regimes de execução.

{§} Em licitações e contratações realizadas no âmbito de projetos e programas parcialmente financiados por agência oficial de cooperação estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, não poderá participar pessoa física ou jurídica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inidônea nos termos da Lei nº 14.133, de 2021.

{§} A vedação de que trata o item {§ref@agente_publico} estende-se a terceiro que auxilie a condução da contratação na qualidade de integrante de equipe de apoio, profissional especializado ou funcionário ou representante de empresa que preste assessoria técnica.

## {§sec}. DO ORÇAMENTO ESTIMADO

%% Orçamento estimado: público ou sigiloso (art. 24 da Lei 14.133); a seção fica sempre, com uma das redações.
{^orcamento_sigiloso}{§} O orçamento estimado da presente contratação não será de caráter sigiloso.{/orcamento_sigiloso}

{#orcamento_sigiloso}{§} O orçamento estimado da presente contratação será de caráter sigiloso.

{§} Para fins do disposto no item anterior, o orçamento estimado para a contratação não será tornado público antes de definido o resultado do julgamento das propostas.

{§} O caráter sigiloso do orçamento estimado para a contratação não prevalecerá para os órgãos de controle interno e externo.{/orcamento_sigiloso}

## {§sec}. DA APRESENTAÇÃO DA PROPOSTA E DOS DOCUMENTOS DE HABILITAÇÃO

%% AGU: a habilitação pode anteceder as propostas por ato motivado (art. 17, § 1º); o sistema ainda não oferece a opção.
{§} {^habilitacao.antecede}Na presente licitação, a fase de habilitação sucederá as fases de apresentação de propostas e de julgamento.{/habilitacao.antecede}{#habilitacao.antecede}Na presente licitação, a fase de habilitação antecederá as fases de apresentação de propostas e de julgamento.{/habilitacao.antecede}

{§} Os licitantes encaminharão, exclusivamente por meio do sistema eletrônico, as propostas de técnica e as propostas de preço até a data e o horário estabelecidos para abertura da sessão pública.

{§} Caso a fase de habilitação anteceda as fases de apresentação de propostas, os licitantes encaminharão, na forma e no prazo estabelecidos no item anterior, simultaneamente os documentos de habilitação, a proposta de técnica e a proposta de preço, observado o disposto no item {§ref@sicaf} deste Edital.

%% "Capítulo 6" é número fixo do modelo: as seções 1 a 5 nunca saem do edital.
{§§} Na hipótese acima, não haverá ordem de classificação na etapa de apresentação da proposta e dos documentos de habilitação pelo licitante, o que ocorrerá somente após os procedimentos de que trata o Capítulo 6 deste Edital.

{§@declaracoes} No cadastramento da proposta de técnica e da proposta de preço, o licitante declarará, em campo próprio do sistema, que:

{§§} está ciente e concorda com as condições contidas no edital e seus anexos, bem como de que a proposta de técnica e da proposta de preço apresentadas compreendem a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constituição Federal, nas leis trabalhistas, nas normas infralegais, nas convenções coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de sua entrega em definitivo e que cumpre plenamente os requisitos de habilitação definidos no instrumento convocatório;

{§§} não emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e não emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condição de aprendiz, nos termos do artigo 7°, XXXIII, da Constituição;

{§§} não possui empregados executando trabalho degradante ou forçado, observando o disposto nos incisos III e IV do art. 1º e no inciso III do art. 5º da Constituição Federal;

{§§} cumpre as exigências de reserva de cargos para pessoa com deficiência e para reabilitado da Previdência Social, previstas em lei e em outras normas específicas.

{§} O licitante organizado em cooperativa deverá declarar, ainda, em campo próprio do sistema eletrônico, que cumpre os requisitos estabelecidos no artigo 16 da Lei nº 14.133, de 2021.

%% Margem de preferência (art. 26; Decreto 11.890/2024): aplicar se o objeto ou item estiver em resolução da CICS; trechos em verde no modelo.
{#margem_preferencia}{§} O licitante deverá declarar em campo próprio do sistema se o produto ou serviço ofertado é manufaturado nacional beneficiado por um dos critérios de margem de preferência indicados no Termo de Referência, quando for o caso, para usufruir do benefício.{/margem_preferencia}

{§} No caso das empresas que foram beneficiadas pela Lei nº 12.546, de 2011, as propostas de preços deverão ser apresentadas com as alíquotas em vigor, nos termos da Lei nº 14.973, de 2024, aplicáveis para o ano de apresentação da proposta.

{§§} A pedido da empresa contratada, o preço do contrato poderá ser revisto, nos termos do art. 134 c/c art. 136, I, da Lei nº 14.133, de 2021, após efetiva majoração das alíquotas, conforme regime de transição previsto no art. 9ºA e 9º-B da Lei nº 12.546, de 2011, com a redação dada pela Lei nº 14.973, de 2024.

{§@declaracao_me_epp} O fornecedor enquadrado como microempresa, empresa de pequeno porte ou sociedade cooperativa deverá declarar, ainda, em campo próprio do sistema eletrônico, que cumpre os requisitos estabelecidos no artigo 3° da Lei Complementar nº 123, de 2006, estando apto a usufruir do tratamento favorecido estabelecido em seus arts. 42 a 49, observado o disposto nos §§ 1º ao 3º do art. 4º, da Lei nº 14.133, de 2021.

{§§} No item exclusivo para participação de microempresas e empresas de pequeno porte, a assinalação do campo “não” impedirá o prosseguimento no certame, para aquele item;

{§§} Nos itens em que a participação não for exclusiva para microempresas e empresas de pequeno porte, a assinalação do campo “não” apenas produzirá o efeito de o licitante não ter direito ao tratamento favorecido previsto na Lei Complementar nº 123, de 2006, mesmo que microempresa, empresa de pequeno porte ou sociedade cooperativa.

{§} Não poderá se beneficiar do tratamento jurídico diferenciado estabelecido nos arts. 42 a 49 da Lei Complementar nº 123, de 2006, a pessoa jurídica:

{§§} de cujo capital participe outra pessoa jurídica;

{§§} que seja filial, sucursal, agência ou representação, no País, de pessoa jurídica com sede no exterior;

{§§} de cujo capital participe pessoa física que seja inscrita como empresário ou seja sócia de outra empresa que receba tratamento jurídico diferenciado nos termos da Lei Complementar nº 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3º da referida lei;

{§§} cujo titular ou sócio participe com mais de 10% (dez por cento) do capital de outra empresa não beneficiada pela Lei Complementar nº 123, de 2006, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3º da referida lei;

{§§} cujo sócio ou titular seja administrador ou equiparado de outra pessoa jurídica com fins lucrativos, desde que a receita bruta global ultrapasse o limite de que trata o inciso II do art. 3º da referida lei;

{§§} constituída sob a forma de cooperativas, salvo as de consumo;

{§§} que participe do capital de outra pessoa jurídica;

{§§} que exerça atividade de banco comercial, de investimentos e de desenvolvimento, de caixa econômica, de sociedade de crédito, financiamento e investimento ou de crédito imobiliário, de corretora ou de distribuidora de títulos, valores mobiliários e câmbio, de empresa de arrendamento mercantil, de seguros privados e de capitalização ou de previdência complementar;

{§§} resultante ou remanescente de cisão ou qualquer outra forma de desmembramento de pessoa jurídica que tenha ocorrido em um dos 5 (cinco) anos-calendário anteriores;

{§§} constituída sob a forma de sociedade por ações.

{§§} cujos titulares ou sócios guardem, cumulativamente, com o contratante do serviço, relação de pessoalidade, subordinação e habitualidade.

{§@declaracao_integridade} O licitante deverá declarar em campo próprio do sistema que desenvolve programa de integridade, nos termos do Decreto nº 12.304, de 2024, e da Portaria Normativa SE/CGU nº 226, de 9 de setembro de 2025, para fazer jus ao benefício do critério de desempate previsto no art. 60, caput, inciso IV, da lei n. 14.133, de 2021.

{§} A falsidade da declaração de que trata os itens {§ref@declaracoes}, {§ref@declaracao_me_epp} ou {§ref@declaracao_integridade} sujeitará o licitante às sanções previstas na Lei nº 14.133, de 2021, e neste Edital.

{§} Os licitantes poderão retirar ou substituir as propostas de técnica e as propostas de preço ou, na hipótese de a fase de habilitação anteceder as fases de apresentação de propostas e de julgamento, os documentos de habilitação anteriormente inseridos no sistema, até a abertura da sessão pública.

{§} Serão disponibilizados para acesso público os documentos que compõem as propostas dos licitantes convocados, após a fase da apresentação de propostas.

{§} Os documentos complementares à proposta de técnica, quando necessários à confirmação daqueles exigidos no edital de licitação e já apresentados, serão encaminhados pelo licitante mais bem classificado, após o encerramento da etapa competitiva, observado o prazo de que trata o item {§ref@prazo_documentos}.

{§} Caberá ao licitante interessado em participar da licitação acompanhar as operações no sistema eletrônico durante o processo licitatório e se responsabilizar pelo ônus decorrente da perda de negócios diante da inobservância de mensagens emitidas pela Administração ou de sua desconexão.

{§} O licitante deverá comunicar imediatamente ao provedor do sistema qualquer acontecimento que possa comprometer o sigilo ou a segurança, para imediato bloqueio de acesso.

## {§sec}. DO PREENCHIMENTO DA PROPOSTA

{§} O licitante deverá enviar sua proposta técnica, através do sistema eletrônico, contendo os seguintes requisitos:

%% Requisitos da proposta técnica, um por item (o último termina em ponto).
{*proposta_tecnica.requisitos}{§§} {.valor}

{/proposta_tecnica.requisitos}

{§} O licitante deverá enviar sua proposta de preços mediante o preenchimento, no sistema eletrônico, dos seguintes campos:

%% AGU: adequar ao objeto e ao critério de julgamento (ex.: valor mensal e anual do item).
{§§} Valor {proposta.campo_valor};

{#proposta.marca}{§§} marca;{/proposta.marca}

{#proposta.fabricante}{§§} fabricante;{/proposta.fabricante}

{§} Todas as especificações do objeto contidas na proposta vinculam o licitante.

{§} Nos valores propostos estarão inclusos todos os custos operacionais, encargos previdenciários, trabalhistas, tributários, comerciais e quaisquer outros que incidam direta ou indiretamente na execução do objeto.

{§} Os preços ofertados serão de exclusiva responsabilidade do licitante, não lhe assistindo o direito de pleitear qualquer alteração, sob alegação de erro, omissão ou qualquer outro pretexto.

{§} Se o regime tributário da empresa implicar o recolhimento de tributos em percentuais variáveis, a cotação adequada será a que corresponde à média dos efetivos recolhimentos da empresa nos últimos doze meses.

%% AGU: só em serviços com dedicação exclusiva de mão de obra que não sejam vigilância patrimonial (regime cumulativo — Solução de Consulta Cosit 345/2017); trecho em rosa no modelo.
{#dedicacao_exclusiva}{^vigilancia_patrimonial}{§§} No regime de incidência não-cumulativa de PIS e COFINS, a cotação adequada será a que corresponde à média das alíquotas efetivamente recolhidas pela empresa, comprovada, a qualquer tempo, por documentos de Escrituração Fiscal Digital da Contribuição (EFD-Contribuições) para o PIS/PASEP e COFINS dos últimos 12 (doze) meses anteriores à apresentação da proposta, ou por outro meio hábil.{/vigilancia_patrimonial}{/dedicacao_exclusiva}

{§} Independentemente do percentual de tributo inserido na planilha, no pagamento serão retidos na fonte os percentuais estabelecidos na legislação vigente.

%% AGU: 1ª redação para vigilância, limpeza, conservação e demais serviços admitidos no Simples (LC 123, art. 18, § 5º-C, VI, e art. 17, § 1º); 2ª quando houver cessão de mão de obra; justificar nos autos.
{^simples_nacional_vedado}{§} Na presente licitação, a Microempresa e a Empresa de Pequeno Porte poderão se beneficiar do regime de tributação pelo Simples Nacional.{/simples_nacional_vedado}

{#simples_nacional_vedado}{§} Na presente licitação, a Microempresa e a Empresa de Pequeno Porte não poderão se beneficiar do regime de tributação pelo Simples Nacional, visto que os serviços serão prestados com disponibilização de trabalhadores em dedicação exclusiva de mão de obra, o que configura cessão de mão de obra para fins tributários, conforme art. 17, inciso XII, da Lei Complementar no 123/2006.{/simples_nacional_vedado}

{§} A apresentação das propostas implica obrigatoriedade do cumprimento das disposições nelas contidas, em conformidade com o que dispõe o Termo de Referência/Projeto Básico, assumindo o proponente o compromisso de executar o objeto licitado nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utensílios necessários, em quantidades e qualidades adequadas à perfeita execução contratual, promovendo, quando requerido, sua substituição.

%% AGU: a lei não fixa a validade da proposta; sugestão de 60 (sessenta) dias.
{§} O prazo de validade da proposta não será inferior a {proposta.validade} dias, a contar da data de sua apresentação.

{§} Os licitantes devem respeitar os preços máximos estabelecidos nas normas de regência de contratações públicas federais, quando participarem de licitações públicas;

{§} O descumprimento das regras supramencionadas pode ensejar a responsabilização pelo Tribunal de Contas da União e, após o devido processo legal, gerar as seguintes consequências: assinatura de prazo para a adoção das medidas necessárias ao exato cumprimento da lei, nos termos do art. 71, inciso IX, da Constituição; ou condenação dos agentes públicos responsáveis e da empresa contratada ao pagamento dos prejuízos ao erário, caso verificada a ocorrência de superfaturamento por sobrepreço na execução do contrato.

{§} Será adotado o modo de disputa fechado, em que os licitantes apresentarão propostas que permanecerão em sigilo até o início da sessão pública, sendo vedada a apresentação de lances.

%% Trechos em rosa no modelo: serviços com dedicação exclusiva de mão de obra.
{#dedicacao_exclusiva}{§} Em se tratando de serviços com fornecimento de mão de obra em regime de dedicação exclusiva, o licitante deverá indicar os sindicatos, acordos coletivos, convenções coletivas ou sentenças normativas que regem as categorias profissionais que executarão o serviço e as respectivas datas bases e vigências, com base na Classificação Brasileira de Ocupações – CBO.

{§} Os custos mínimos relevantes e demais informações referentes aos benefícios trabalhistas encontram-se definidos no Termo de Referência.{/dedicacao_exclusiva}

## {§sec}. DA ABERTURA DA SESSÃO PÚBLICA E DA FASE DE JULGAMENTO

{§} A abertura da presente licitação dar-se-á automaticamente em sessão pública, por meio de sistema eletrônico, na data, horário e local indicados neste Edital.

{§@prazo_notas} Iniciada a sessão pública, {conducao.o} {conducao.agente} deverá informar no sistema o prazo para a atribuição de notas à proposta de técnica e de preço, e a data e o horário para manifestação da intenção de recorrer do resultado do julgamento, nos termos do item {§ref@recurso_julgamento} deste Edital.

{§§@postergacao} Eventual postergação do prazo a que se refere o item {§ref@prazo_notas} deve ser comunicada tempestivamente pel{conducao.o} {conducao.agente}, via sistema.

{§} O sistema disponibilizará campo próprio para troca de mensagens entre {conducao.o} {conducao.agente} e os licitantes.

{§} Quando a desconexão do sistema eletrônico para {conducao.o} {conducao.agente} persistir por tempo superior a dez minutos, a sessão pública será suspensa e reiniciada somente após decorridas vinte e quatro horas da comunicação do fato pel{conducao.o} {conducao.agente} aos participantes, no sítio eletrônico utilizado para divulgação.

{§} {conducao.o|cap} {conducao.agente} verificará as condições de participação no certame de todos os licitantes, conforme previsto no art. 14 da Lei nº 14.133, de 2021, legislação correlata e no item {§ref@nao_disputar} do edital, especialmente quanto à existência de sanção que impeça a participação no certame ou a futura contratação, mediante a consulta aos seguintes cadastros:

{§§} SICAF;

{§§} Cadastro Nacional de Empresas Inidôneas e Suspensas – CEIS,

{§§} Cadastro Nacional de Empresas Punidas – CNEP e

{§§} Lista de licitantes inidôneos, mantida pelo Tribunal de Contas da União.

{§} A consulta aos cadastros será realizada no nome e no CNPJ da empresa licitante.

{§§} A consulta no CEIS quanto às sanções previstas na Lei nº 8.429, de 1992, também ocorrerá no nome e no CPF do sócio majoritário da empresa licitante, se houver, por força do art. 12 da citada lei.

{§} Para a consulta de licitantes pessoa jurídica poderá haver a substituição das consultas ao CEIS, CNEP e Lista de licitantes inidôneos pela Consulta Consolidada de Pessoa Jurídica do TCU.

{§} Caso conste na Consulta de Situação do licitante a existência de Ocorrências Impeditivas Indiretas, {conducao.o} {conducao.agente} diligenciará para verificar se houve fraude por parte das empresas apontadas no Relatório de Ocorrências Impeditivas Indiretas.

{§§} A tentativa de burla será verificada por meio dos vínculos societários, linhas de fornecimento similares, dentre outros.

{§§} O licitante será convocado para manifestação previamente a uma eventual desclassificação.

{§§} Constatada a existência de sanção, o licitante será reputado inabilitado, por falta de condição de participação.

{§} Na hipótese de inversão das fases de habilitação e julgamento, caso atendidas as condições de participação, será iniciado o procedimento de habilitação.

{§} Caso o licitante provisoriamente classificado em primeiro lugar tenha se utilizado de algum tratamento favorecido às ME/EPPs ou tenha se valido da aplicação da margem de preferência, {conducao.o} {conducao.agente} verificará se o licitante faz jus ao benefício aplicado.

%% Margem de preferência (trecho em verde no modelo).
{#margem_preferencia}{§§} Caso o licitante não venha a comprovar o atendimento dos requisitos para fazer jus ao benefício da margem de preferência, as propostas serão reclassificadas, para fins de nova aplicação da margem de preferência.{/margem_preferencia}

{§} Verificadas as condições de participação e de utilização do tratamento favorecido, {conducao.o} {conducao.agente} realizará, em conjunto com a banca designada, a verificação da conformidade das propostas.

%% Serviços com dedicação exclusiva de mão de obra (trecho em rosa no modelo).
{#dedicacao_exclusiva}{§} Em se tratando de serviços com fornecimento de mão de obra em regime de dedicação exclusiva, a fim de assegurar o tratamento isonômico entre as licitantes, informa-se que foram utilizados os seguintes acordos, dissídios ou convenções coletivas de trabalho no cálculo do valor estimado pela Administração:

{§§} {convencao_coletiva.paradigma};

{§} Os acordos, dissídios ou convenções coletivas indicado(s)no subitem acima não é (são) de utilização obrigatória pelos licitantes, mas, ao longo da execução contratual, sempre se exigirá o cumprimento dos acordos, dissídios ou convenções coletivas adotados por cada licitante/contratado, obedecidos os custos mínimos relevantes fixados pela Administração.{/dedicacao_exclusiva}

{§} Serão desclassificadas as propostas que:

{§§} contiverem vícios insanáveis;

{§§} não obedecerem às especificações técnicas contidas no Termo de Referência/Projeto Básico;

{§§} apresentarem preços inexequíveis ou permanecerem acima do preço máximo definido para a contratação;

{§§} não tiverem sua exequibilidade demonstrada, quando exigido pela Administração;

{§§} não cumpra os critérios de aceitabilidade de preços definidos no Termo de Referência;

{§§} apresentarem desconformidade com quaisquer outras exigências deste Edital ou seus anexos, desde que insanável.

{§} Na avaliação de conformidade das propostas de técnica e de preço deverão ser indicadas as razões de eventuais desclassificações.

{§} A análise e avaliação da conformidade das propostas será iniciada pelo exame de conformidade das propostas de técnica, observadas as regras e as condições previstas no Anexo I deste edital.

{§} A análise dos quesitos de natureza qualitativa será realizada pela banca designada.

{§} No julgamento das propostas técnicas, será atribuída ao licitante uma Nota da Proposta Técnica (NT), de acordo com o seguinte parâmetro matemático:

%% AGU: a lei não fixa o parâmetro da nota técnica; definir e justificar — sugestão: NT = 100 * T1/T2 (T1 = pontuação técnica do licitante; T2 = maior pontuação técnica entre os licitantes), para que a melhor proposta técnica tenha nota 100.
{§§} {tecnica.parametro}

{§} Concluída a avaliação e ponderação das propostas técnicas {conducao.o} {conducao.agente} realizará a verificação da conformidade das propostas de preço.

{§} No caso de bens e serviços em geral, é indício de inexequibilidade das propostas valores inferiores a 50% (cinquenta por cento) do valor orçado pela Administração.

{§} A inexequibilidade, na hipótese de que trata o item anterior, só será considerada após diligência d{conducao.o} {conducao.agente}, que comprove:

{§§} que o custo do licitante ultrapassa o valor da proposta; e

{§§} inexistirem custos de oportunidade capazes de justificar o vulto da oferta.

%% Obras e serviços de engenharia: sobrepreço pelo valor global (tarefa, preço global, integral, semi-integrada, integrada) ou também por custo unitário relevante (preço unitário — art. 59, § 3º, e art. 6º, LVI).
{#engenharia}{§} Em contratação de obras e serviços de engenharia, além das disposições acima, a análise de exequibilidade e sobrepreço considerará o seguinte:

{^engenharia.preco_unitario}{§§} Nos regimes de execução por tarefa, empreitada por preço global ou empreitada integral, contratação semi-integrada ou contratação integrada, a caracterização do sobrepreço se dará pela superação do valor global estimado;{/engenharia.preco_unitario}

{#engenharia.preco_unitario}{§§} No regime de empreitada por preço unitário, a caracterização do sobrepreço se dará pela superação do valor global estimado e pela superação de custo unitário tido como relevante, conforme planilha anexa ao edital;{/engenharia.preco_unitario}

{§§} No caso de obras e serviços de engenharia, serão consideradas inexequíveis as propostas cujos valores forem inferiores a 75% (setenta e cinco por cento) do valor orçado pela Administração, independentemente do regime de execução.{/engenharia}

{§} Se houver indícios de inexequibilidade da proposta de preço, ou em caso da necessidade de esclarecimentos complementares, poderão ser efetuadas diligências, para que o licitante comprove a exequibilidade da proposta.

{§} Caso o custo global estimado do objeto licitado tenha sido decomposto em seus respectivos custos unitários por meio de Planilha de Custos e Formação de Preços elaborada pela Administração, o licitante classificado em primeiro lugar será convocado para apresentar Planilha por ele elaborada, com os respectivos valores adequados ao valor final da sua proposta, sob pena de não aceitação da proposta.

{§§} Em se tratando de obras e serviços de engenharia, o licitante vencedor será convocado a apresentar à Administração, por meio eletrônico, as planilhas com indicação dos quantitativos e dos custos unitários, seguindo o modelo elaborado pela Administração, bem como com detalhamento das Bonificações e Despesas Indiretas (BDI) e dos Encargos Sociais (ES), com os respectivos valores adequados ao valor final da proposta vencedora, admitida a utilização dos preços unitários, no caso de empreitada por preço global, empreitada integral, contratação semi-integrada e contratação integrada, exclusivamente para eventuais adequações indispensáveis no cronograma físico-financeiro e para balizar excepcional aditamento posterior do contrato.

{§§} Em se tratando de serviços com fornecimento de mão de obra em regime de dedicação exclusiva cuja produtividade seja mensurável e indicada pela Administração, o licitante deverá indicar a produtividade adotada e a quantidade de pessoal que será alocado na execução contratual.

{§§} Caso a produtividade seja diferente daquela utilizada pela Administração como referência, ou não estiver contida na faixa referencial de produtividade, mas admitida pelo ato convocatório, o licitante deverá apresentar a respectiva comprovação de exequibilidade.

{§§} Os licitantes poderão apresentar produtividades diferenciadas daquela estabelecida pela Administração como referência, desde que não alterem o objeto da contratação, não contrariem dispositivos legais vigentes e, caso não estejam contidas nas faixas referenciais de produtividade, comprovem a exequibilidade da proposta.

{§§} Para efeito do subitem anterior, admite-se a adequação técnica da metodologia empregada pela contratada, visando assegurar a execução do objeto, desde que mantidas as condições para a justa remuneração do serviço.

{§} Erros no preenchimento da planilha não constituem motivo para a desclassificação da proposta. A planilha poderá́ ser ajustada pelo licitante, no prazo indicado pelo sistema, desde que não haja majoração do preço e que se comprove que este é o bastante para arcar com todos os custos da contratação.

{§§} O ajuste de que trata este dispositivo se limita a sanar erros ou falhas que não alterem a substância das propostas.

{§§} Considera-se erro no preenchimento da planilha passível de correção a indicação de recolhimento de impostos e contribuições na forma do Simples Nacional, quando não cabível esse regime.

{§} Para fins de análise da proposta quanto ao cumprimento das especificações do objeto, poderá ser colhida a manifestação escrita do setor requisitante do serviço ou da área especializada no objeto.

{§@nota_preco} Será atribuída ao licitante uma Nota da Proposta de Preço (NP), de acordo com o seguinte parâmetro matemático:

> NP = 100 x (X1 / X2)
> NP - Nota da proposta de preço do licitante;
> X1 - Menor valor global proposto entre os licitantes classificados; e
> X2 - Valor global proposto pelo licitante classificado.

{§} Após análise das propostas de técnica e de preço, será estabelecida a pontuação final dos licitantes, de acordo com a média ponderada das valorações de acordo com a seguinte fórmula:

%% AGU: peso da técnica de no máximo 70% (art. 36, § 2º); os dois pesos somam 100 — outra proporção muda a fórmula.
> NF = ({tecnica.peso} * NT + {preco.peso} * NP)/100
> onde:
> NF = Nota Final;
> NT = Nota da Proposta Técnica;
> NP = Nota da Proposta de Preços.

{§} Encerrados os prazos estabelecidos nos itens {§ref@prazo_notas} e {§ref@postergacao}, o sistema ordenará e divulgará as notas ponderadas das propostas de técnica e de preço em ordem decrescente, considerando a maior pontuação obtida, bem como informará as notas de cada proposta por licitante.

%% Margem de preferência (trechos em verde no modelo).
{#margem_preferencia}{§} Será aplicado o benefício da margem de preferência, nos termos do art. 26 da Lei nº 14.133, de 2021.

{§§} Para produtos ou serviços abrangidos por margem de preferência normal ou adicional, caso a proposta de menor preço não tenha por objeto produto ou serviço contemplado pela referida margem, o sistema automaticamente indicará as propostas de produtos ou serviços que façam jus ao diferencial de preço, pela ordem de classificação, para fins de aceitação pel{conducao.o} {conducao.agente}.

{§§} Nestas situações, a proposta beneficiada pela aplicação da margem de preferência normal ou adicional, conforme o caso, tornar-se-á a proposta classificada em primeiro lugar.{/margem_preferencia}

{§} Em relação a itens não exclusivos para participação de microempresas e empresas de pequeno porte, uma vez encerrada a etapa de análise das propostas de técnica e de preço, será efetivada a verificação automática, junto à Receita Federal, do porte da entidade empresarial. O sistema identificará em coluna própria as microempresas e empresas de pequeno porte participantes, procedendo à comparação com a Nota Final da primeira colocada, se esta for empresa de maior porte, assim como das demais classificadas, para o fim de aplicar-se o disposto nos arts. 44 e 45 da Lei Complementar nº 123, de 2006, regulamentada pelo Decreto nº 8.538, de 2015.

{#margem_preferencia}{§§} Quando houver propostas beneficiadas com as margens de preferência, apenas poderão se valer do critério de desempate previsto nos arts. 44 e 45 da Lei Complementar nº 123, de 2006, as propostas de microempresas e empresas de pequeno porte que também fizerem jus às margens de preferência.

{§§} O parâmetro para o empate ficto, nesse caso, consistirá no preço ofertado pela fornecedora classificada em primeiro lugar em razão da aplicação da margem de preferência.{/margem_preferencia}

{§§} Nessas condições, as propostas de microempresas e empresas de pequeno porte que se encontrarem na faixa de até 10% (dez por cento) acima da maior Nota Final serão consideradas empatadas com a primeira colocada.

{§§} A melhor classificada nos termos do subitem anterior terá o direito de encaminhar uma última oferta para desempate, obrigatoriamente em preço que corresponda a Nota Final superior à da primeira colocada, no prazo de 5 (cinco) minutos controlados pelo sistema, contados após a comunicação automática para tanto.

{§§} Caso a microempresa ou a empresa de pequeno porte melhor classificada desista ou não se manifeste no prazo estabelecido, serão convocadas as demais licitantes microempresa e empresa de pequeno porte que se encontrem naquele intervalo de 10% (dez por cento), na ordem de classificação, para o exercício do mesmo direito, no prazo estabelecido no subitem anterior.

{§§} No caso de equivalência das Notas Finais atribuídas às microempresas e empresas de pequeno porte que se encontrem nos intervalos estabelecidos nos subitens anteriores, será realizado sorteio entre elas para que se identifique aquela que primeiro poderá apresentar melhor oferta para desempate.

{§§} A obtenção do benefício a que se refere o item anterior fica limitada às microempresas e às empresas de pequeno porte que, no ano-calendário de realização da licitação, ainda não tenham celebrado contratos com a Administração Pública cujos valores somados extrapolem a receita bruta máxima admitida para fins de enquadramento como empresa de pequeno porte.

{§} Havendo eventual empate entre Notas Finais, o critério de desempate será aquele previsto no art. 60 da Lei nº 14.133, de 2021, nesta ordem:

{§§} disputa final, hipótese em que os licitantes empatados poderão apresentar nova proposta de preço em ato contínuo à classificação;

{§§} avaliação do desempenho contratual prévio dos licitantes, para a qual deverão preferencialmente ser utilizados registros cadastrais para efeito de atesto de cumprimento de obrigações previstos nesta Lei;

{§§} desenvolvimento pelo licitante de ações de equidade entre homens e mulheres no ambiente de trabalho, nos termos do Decreto nº 11.430, de 2023, e da Instrução Normativa SEGES/MGI nº 382, de 17 de setembro de 2025;

{§§} desenvolvimento pelo licitante de programa de integridade, conforme Decreto n° 12.304, de 2024, e Portaria Normativa SE/CGU n° 226, de 9 de setembro de 2025.

{§§} Persistindo o empate, será assegurada preferência, sucessivamente, aos bens e serviços produzidos ou prestados por:

{§§§} empresas estabelecidas no território do Estado ou do Distrito Federal do órgão ou entidade da Administração Pública estadual ou distrital licitante ou, no caso de licitação realizada por órgão ou entidade de Município, no território do Estado em que este se localize;

{§§§} empresas brasileiras;

{§§§} empresas que invistam em pesquisa e no desenvolvimento de tecnologia no País;

{§§§} empresas que comprovem a prática de mitigação, nos termos da Lei nº 12.187, de 29 de dezembro de 2009.

{§} Esgotados todos os demais critérios de desempate previsto em lei, a escolha do licitante vencedor ocorrerá por sorteio, em ato público, para o qual todos os licitantes serão convocados, vedado qualquer outro processo.

{§} Encerrada a etapa de análise das propostas, na hipótese de a proposta de preço do primeiro colocado permanecer acima do preço máximo definido para a contratação, {conducao.o} {conducao.agente} poderá negociar condições mais vantajosas, após definida a melhor Nota Final entre os licitantes.

{§§} A negociação poderá ser feita com os demais licitantes, segundo a ordem de classificação inicialmente estabelecida, quando o primeiro colocado, mesmo após a negociação, for desclassificado em razão de sua proposta permanecer acima do preço máximo definido pela Administração.

{§§} A negociação será realizada por meio do sistema, podendo ser acompanhada pelos demais licitantes.

{§} O resultado da negociação será registrado na ata da sessão pública e anexado aos autos do processo licitatório.

%% Prazo para envio da proposta adequada à negociação (o modelo sugere 2 (duas) horas).
{§} {conducao.o|cap} {conducao.agente} solicitará ao licitante mais bem classificado que, no prazo de {negociacao.prazo_proposta}, envie a proposta adequada à negociação realizada, acompanhada, se for o caso, dos documentos complementares.

{§} Caso o Termo de Referência/Projeto Básico exija a apresentação de amostra, o licitante classificado em primeiro lugar deverá apresentá-la, conforme disciplinado no Termo de Referência/Projeto Básico, sob pena de não aceitação da proposta.

{§} Por meio de mensagem no sistema, será divulgado o local e horário de realização do procedimento para a avaliação das amostras, cuja presença será facultada a todos os interessados, incluindo os demais licitantes.

{§} Os resultados das avaliações serão divulgados por meio de mensagem no sistema.

{§} No caso de não haver entrega da amostra ou ocorrer atraso na entrega, sem justificativa aceita pel{conducao.o} {conducao.agente}, ou havendo entrega de amostra fora das especificações previstas neste Edital, a proposta do licitante será recusada.

{§} Se a(s) amostra(s) apresentada(s) pelo primeiro classificado não for(em) aceita(s), {conducao.o} {conducao.agente} analisará a aceitabilidade da proposta ofertada pelo segundo classificado. Seguir-se-á com a verificação da(s) amostra(s) e, assim, sucessivamente, até a verificação de uma que atenda às especificações constantes no Termo de Referência/Projeto Básico.

{§} É facultado {conducao.ao} {conducao.agente} prorrogar o prazo acima estabelecido, a partir de solicitação fundamentada feita no chat pelo licitante, antes de findo o prazo.

%% Serviços com dedicação exclusiva de mão de obra (trechos em rosa no modelo; Acórdão TCU 1.207/2024-Plenário e IN SEGES 176/2024).
{#dedicacao_exclusiva}{§} No caso de serviços com dedicação exclusiva de mão-de-obra, o licitante deverá entregar junto com sua proposta de preços, os seguintes documentos:

{§§} declaração informando o enquadramento sindical da empresa, a atividade econômica preponderante e a justificativa para adoção do instrumento coletivo do trabalho em que se baseia sua proposta;

{§§} cópia da carta ou registro sindical do sindicato a qual ele declara ser enquadrado, em razão do regramento do enquadramento sindical previsto na CLT ou por força de decisão judicial;

{§§} cópia do Acordo, Convenção Coletiva de Trabalho ou Dissídio Coletivo utilizado pelo licitante para a elaboração da planilha de custos e formação de preços que embasam o valor global ofertado; e

{§§} declaração de que se responsabiliza nas situações de ocorrência de erro no enquadramento sindical, ou fraude pela utilização de instrumento coletivo incompatível com o enquadramento sindical declarado ou no qual a empresa não tenha sido representada por órgão de classe de sua categoria, que daí tenha resultado vantagem indevida na fase de julgamento das propostas, sujeitando a contratada às sanções previstas no art. 156, incisos III e IV, da Lei nº 14.133, de 2021;

{§} Na hipótese dos postos de trabalho licitados se distribuírem por território correspondente a mais de uma base sindical da categoria profissional, deverão ser informadas cada uma das normas coletivas utilizadas para o cálculo do custo individual dos postos, a partir da base territorial de cada sindicato.

{§} {conducao.o|cap} {conducao.agente} realizará a verificação da observância da proposta classificada provisoriamente em primeiro lugar quanto aos custos unitários mínimos relevantes estabelecidos pela Administração, além dos demais aspectos ligados à conformidade da proposta ao objeto licitado e à compatibilidade do preço.

{§} {conducao.o|cap} {conducao.agente} concederá o prazo de no mínimo duas horas para readequação da proposta quando esta não observar os custos unitários mínimos relevantes, sob pena de desclassificação, na forma da Instrução Normativa SEGES/MGI nº 2, de 7 de fevereiro de 2023.

{§} {conducao.o|cap} {conducao.agente} deve verificar se as previsões do Acordo, Convenção Coletiva de Trabalho ou Dissídio Coletivo indicados pela Administração estão sendo contempladas na Planilha de Custos e Formação de Preços, em especial, quando o Acordo, Convenção Coletiva de Trabalho ou Dissídio Coletivo utilizado pelo licitante for diferente da norma coletiva paradigma utilizada pela Administração.

{§} Deverão prevalecer os valores que forem mais benéficos ao trabalhador, na hipótese de que o Acordo, Convenção Coletiva de Trabalho ou Dissídio Coletivo indicado pelo licitante estabelecerem valores de remuneração, incluindo salário base e adicionais, de auxílio-alimentação e de benefícios superiores aos do Acordo, Convenção Coletiva de Trabalho ou Dissídio Coletivo utilizado como paradigma.{/dedicacao_exclusiva}

## {§sec}. DA FASE DE HABILITAÇÃO

{§} Os documentos previstos no Termo de Referência/Projeto Básico, necessários e suficientes para demonstrar a capacidade do licitante de realizar o objeto da licitação, serão exigidos para fins de habilitação, nos termos dos arts. 62 a 70 da Lei nº 14.133, de 2021.

{§§@sicaf} A documentação exigida para fins de habilitação jurídica, fiscal, social e trabalhista e econômico-ﬁnanceira, poderá ser substituída pelo registro cadastral no SICAF.

{§} Quando permitida a participação de empresas estrangeiras que não funcionem no País, as exigências de habilitação serão atendidas mediante documentos equivalentes, inicialmente apresentados em tradução livre.

{§} Na hipótese de o licitante vencedor ser empresa estrangeira que não funcione no País, para ﬁns de assinatura do contrato, os documentos exigidos para a habilitação serão traduzidos por tradutor juramentado no País e apostilados nos termos do disposto no Decreto nº 8.660, de 29 de janeiro de 2016, ou de outro que venha a substituí-lo, ou consularizados pelos respectivos consulados ou embaixadas.

%% Consórcio permitido: acréscimo de 10% a 30% na habilitação econômico-financeira, salvo justificativa (art. 15, § 1º).
{#consorcio_permitido}{§} Quando permitida a participação de consórcio de empresas, a habilitação técnica, quando exigida, será feita por meio do somatório dos quantitativos de cada consorciado e, para efeito de habilitação econômico-financeira, quando exigida, será observado o somatório dos valores de cada consorciado.

{§§} Se o consórcio não for formado integralmente por microempresas ou empresas de pequeno porte e o Termo de Referência/Projeto Básico exigir requisitos de habilitação econômico-financeira, haverá um acréscimo de {consorcio_permitido.acrescimo} para o consórcio em relação ao valor exigido para os licitantes individuais.{/consorcio_permitido}

{§} Os documentos exigidos para fins de habilitação poderão ser apresentados em original, por cópia ou por {habilitacao.outro_meio}.

{§} Os documentos exigidos para fins de habilitação poderão ser substituídos por registro cadastral emitido por órgão ou entidade pública, desde que o registro tenha sido feito em obediência ao disposto na Lei nº 14.133, de 2021.

{§} Será verificado se o licitante apresentou declaração de que atende aos requisitos de habilitação, e o declarante responderá pela veracidade das informações prestadas, na forma da lei.

{§} Será verificado se o licitante apresentou no sistema, sob pena de inabilitação, a declaração de que cumpre as exigências de reserva de cargos para pessoa com deficiência e para reabilitado da Previdência Social, previstas em lei e em outras normas específicas.

{§} O licitante deverá apresentar, sob pena de desclassificação, declaração de que suas propostas econômicas compreendem a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constituição Federal, nas leis trabalhistas, nas normas infralegais, nas convenções coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de entrega das propostas.

%% AGU: vistoria só quando o conhecimento do local for imprescindível (art. 63, §§ 2º e 3º); suprimir em aquisições e serviços que independem do local e, se possível, substituir por fotos e plantas.
{#vistoria}{§} Considerando que na presente contratação a avaliação prévia do local de execução é imprescindível para o conhecimento pleno das condições e peculiaridades do objeto a ser contratado, o licitante deve atestar, sob pena de inabilitação, que conhece o local e as condições de realização do serviço, assegurado a ele o direito de realização de vistoria prévia.

{§§} O licitante que optar por realizar vistoria prévia terá disponibilizado pela Administração data e horário exclusivos, a ser agendado {vistoria.agendamento}, de modo que seu agendamento não coincida com o agendamento de outros licitantes.

{§§} Caso o licitante opte por não realizar vistoria, poderá substituir a declaração exigida no presente item por declaração formal assinada pelo seu responsável técnico acerca do conhecimento pleno das condições e peculiaridades da contratação.{/vistoria}

{§} A habilitação será verificada por meio do Sicaf, nos documentos por ele abrangidos.

{§§} Somente haverá a necessidade de comprovação do preenchimento de requisitos mediante apresentação dos documentos originais não-digitais quando houver dúvida em relação à integridade do documento digital ou quando a lei expressamente o exigir.

{§} É de responsabilidade do licitante conferir a exatidão dos seus dados cadastrais no Sicaf e mantê-los atualizados junto aos órgãos responsáveis pela informação, devendo proceder, imediatamente, à correção ou à alteração dos registros tão logo identifique incorreção ou aqueles se tornem desatualizados.

{§§} A não observância do disposto no item anterior poderá ensejar desclassificação no momento da habilitação.

{§} A verificação pel{conducao.o} {conducao.agente}, em sítios eletrônicos oficiais de órgãos e entidades emissores de certidões constitui meio legal de prova, para fins de habilitação.

{§§@prazo_documentos} Os documentos exigidos para habilitação que não estejam contemplados no Sicaf serão enviados por meio do sistema, em formato digital, no prazo de {habilitacao.prazo_documentos}, prorrogável por igual período, contado da solicitação d{conducao.o} {conducao.agente}.

{§} A verificação no Sicaf ou a exigência dos documentos nele não contidos somente será feita em relação ao licitante vencedor.

{§§} Os documentos relativos à regularidade fiscal que constem do Termo de Referência/Projeto Básico somente serão exigidos, em qualquer caso, em momento posterior ao julgamento das propostas, e apenas do licitante mais bem classificado.

{§§} Respeitada a exceção do subitem anterior, relativa à regularidade fiscal, quando a fase de habilitação anteceder as fases de apresentação de propostas e de julgamento, a verificação ou exigência do presente subitem ocorrerá em relação a todos os licitantes.

%% AGU: prazo para novos documentos ou complementação, no mínimo duas horas (Parecer 2/2025/CNLCA/DECOR/CGU/AGU).
{§} Encerrado o prazo para envio da documentação de que trata o item {§ref@prazo_documentos}, poderá ser admitida, mediante decisão fundamentada d{conducao.o} {conducao.agente}, a apresentação de novos documentos de habilitação ou a complementação de informações acerca dos documentos já apresentados pelos licitantes, em até {habilitacao.prazo_complementacao} horas, para:

{§§} a aferição das condições de habilitação do licitante, desde que decorrentes de fatos existentes à época da abertura do certame;

{§§} atualização de documentos cuja validade tenha expirado após a data de recebimento das propostas;

{§§} suprimento da ausência de documento de cunho declaratório emitido unilateralmente pelo licitante;

{§§} suprimento da ausência de certidão e/ou documento de cunho declaratório expedido por órgão ou entidade cujos atos gozem de presunção de veracidade e fé pública.

{§} Findo o prazo assinalado sem o envio da nova documentação, restará preclusa essa oportunidade conferida ao licitante, implicando sua inabilitação.

{§} Na análise dos documentos de habilitação, {conducao.o} {conducao.agente} poderá sanar erros ou falhas, que não alterem a substância dos documentos e sua validade jurídica, mediante decisão fundamentada, registrada em ata e acessível a todos, atribuindo-lhes eﬁcácia para fins de habilitação e classificação.

{§} Na hipótese de o licitante não atender às exigências para habilitação, {conducao.o} {conducao.agente} examinará a proposta subsequente e assim sucessivamente, na ordem de classificação, até a apuração de uma proposta que atenda ao presente edital, observado o prazo disposto no subitem {§ref@prazo_documentos}.

{§} Somente serão disponibilizados para acesso público os documentos de habilitação do licitante cuja proposta atenda ao edital de licitação, após concluídos os procedimentos de que trata o subitem anterior.

{§} A comprovação de regularidade fiscal e trabalhista das microempresas e das empresas de pequeno porte somente será exigida para efeito de contratação, e não como condição para participação na licitação.

{§} Quando a fase de habilitação anteceder a de julgamento e já tiver sido encerrada, não caberá exclusão de licitante por motivo relacionado à habilitação, salvo em razão de fatos supervenientes ou só conhecidos após o julgamento.

## {§sec}. DO TERMO DE CONTRATO

{§} Após a homologação e adjudicação, caso se conclua pela contratação, será firmado termo de contrato, ou outro instrumento equivalente.

{§@prazo_assinatura} O adjudicatário terá o prazo de {contratacao.prazo_assinatura} dias úteis, contados a partir da data de sua convocação, para assinar o termo de contrato ou instrumento equivalente, sob pena de decair o direito à contratação, sem prejuízo das sanções previstas neste Edital.

{§@assinatura_alternativa} Alternativamente à convocação para comparecer perante o órgão ou entidade para a assinatura do Termo de Contrato ou instrumento equivalente, a Administração poderá: a) encaminhá-lo para assinatura, mediante correspondência postal com aviso de recebimento (AR), para que seja assinado e devolvido no prazo de {contratacao.prazo_devolucao} dias úteis, a contar da data de seu recebimento; b) disponibilizar acesso a sistema de processo eletrônico para que seja assinado digitalmente em até {contratacao.prazo_assinatura_digital} dias úteis; ou c) outro meio eletrônico, assegurado o prazo de {contratacao.prazo_resposta} dias úteis para resposta após recebimento da notificação pela Administração.

%% Usar quando a Nota de Empenho ou instrumento equivalente substituir o contrato (art. 95 da Lei 14.133).
{#instrumento_equivalente}{§} O Aceite da Nota de Empenho ou do instrumento equivalente, emitida ao fornecedor adjudicado, implica o reconhecimento de que:

{§§} referida Nota está substituindo o contrato, aplicando-se à relação de negócios ali estabelecida as disposições da Lei nº 14.133, de 2021;

{§§} a contratada se vincula à sua proposta e às previsões contidas neste Edital;

{§§} a contratada reconhece que as hipóteses de rescisão são aquelas previstas nos artigos 137 e 138 da Lei nº 14.133, de 2021 e reconhece os direitos da Administração previstos nos artigos 137 a 139 da mesma Lei.{/instrumento_equivalente}

{§} Os prazos dos itens {§ref@prazo_assinatura} e {§ref@assinatura_alternativa} poderão ser prorrogados, por igual período, por solicitação justificada do adjudicatário e aceita pela Administração.

{§} O prazo de vigência da contratação é o estabelecido no Termo de Referência/Projeto Básico.

{§} Na assinatura do contrato ou instrumento equivalente será exigido o Cadastro Informativo de Créditos não Quitados do Setor Público Federal – Cadin e a comprovação das condições de habilitação e contratação consignadas neste Edital, que deverão ser mantidas pelo fornecedor durante a vigência do contrato.

{§§} A existência de registro no Cadin constitui fator impeditivo para a contratação.

%% Serviços com dedicação exclusiva de mão de obra (trechos em rosa no modelo): capital social (Tema 1118 do STF; art. 4º-B da Lei 6.019/1974) e, em vigilância, art. 14 da Lei 14.967/2024.
{#dedicacao_exclusiva}{§} Na contratação de serviços com dedicação exclusiva de mão-de-obra, será exigida da empresa, como condição para assinatura do contrato, a comprovação de capital social integralizado compatível com o número de empregados, na forma do art. 4º-B da Lei nº 6.019/1974.

{§§} Caso se trate da contratação de serviços de vigilância ou transporte de valores com dedicação exclusiva de mão de obra, a empresa deverá comprovar, como condição para assinatura do contrato, que possui capital social mínimo integralizado de acordo com os valores estipulados no art. 14 da Lei n.º 14.967/2024.{/dedicacao_exclusiva}

%% AGU: grande vulto — programa de integridade em 6 meses (art. 25, § 4º; Decreto 12.304/2024).
{#grande_vulto}{§} Nas contratações de obras, serviços e fornecimentos de grande vulto, o licitante vencedor deverá apresentar programa de integridade, no prazo de 6 (seis) meses, contado da celebração do contrato, conforme Decreto nº 12.304, de 9 de dezembro de 2024, e comprovar a sua implantação nos termos da Portaria Normativa SE/CGU nº 226/2025, considerados o valor original do contrato e o valor que poderá ser alcançado por meio de eventuais aditivos contratuais.{/grande_vulto}

%% Dedicação exclusiva: mulheres vítimas de violência doméstica — 8% das vagas com 25 ou mais colaboradores; abaixo disso, percentual definido pela Administração.
{#dedicacao_exclusiva}{^reserva_vagas.menos_25}{§} Na contratação de serviços com dedicação exclusiva de mão-de-obra para contratos com quantitativo igual ou superior a 25 (vinte e cinco) colaboradores, será exigida da empresa, como condição para assinatura do contrato, a comprovação, nos termos do disposto no art. 6º, caput, inciso XVI, da Lei nº 14.133, de 1º de abril de 2021, do emprego de mão de obra constituída por mulheres vítimas de violência doméstica, a partir da indicação do órgão responsável pela política pública, em percentual igual ou superior a 8% (oito por cento) das vagas.{/reserva_vagas.menos_25}

{#reserva_vagas.menos_25}{§} Considerando que a presente contratação possui quantitativo inferior a vinte e cinco colaboradores, será exigida da empresa, como condição para assinatura do contrato, a comprovação, nos termos do disposto no art. 6º, caput, inciso XVI, da Lei nº 14.133, de 1º de abril de 2021, do emprego de mão de obra constituída por mulheres vítimas de violência doméstica, a partir da indicação do órgão responsável pela política pública, no percentual de {reserva_vagas.menos_25.percentual}.{/reserva_vagas.menos_25}{/dedicacao_exclusiva}

## {§sec}. DOS RECURSOS

{§} A interposição de recurso referente ao julgamento das propostas, à habilitação ou inabilitação de licitantes, à anulação ou revogação da licitação, observará o disposto no art. 165 da Lei nº 14.133, de 2021.

{§} O prazo recursal é de 3 (três) dias úteis, contados da data de intimação ou de lavratura da ata.

{§@recurso_julgamento} Quando o recurso apresentado impugnar o julgamento das propostas ou o ato de habilitação ou inabilitação do licitante:

{§§} a intenção de recorrer deverá ser manifestada imediatamente, sob pena de preclusão;

{§§} o prazo para a manifestação da intenção de recorrer não será inferior a 10 (dez) minutos.

{§§} o prazo para apresentação das razões recursais será iniciado na data de intimação ou de lavratura da ata de habilitação ou inabilitação;

{§§} na hipótese de adoção da inversão de fases prevista no § 1º do art. 17 da Lei nº 14.133, de 2021, o prazo para apresentação das razões recursais será iniciado na data de intimação da ata de julgamento.

{§} Os recursos deverão ser encaminhados em campo próprio do sistema.

{§} O recurso será dirigido à autoridade que tiver editado o ato ou proferido a decisão recorrida, a qual poderá reconsiderar sua decisão no prazo de 3 (três) dias úteis, ou, nesse mesmo prazo, encaminhar recurso para a autoridade superior, a qual deverá proferir sua decisão no prazo de 10 (dez) dias úteis, contado do recebimento dos autos.

{§} Os recursos interpostos fora do prazo não serão conhecidos.

{§} O prazo para apresentação de contrarrazões ao recurso pelos demais licitantes será de 3 (três) dias úteis, contados da data da intimação pessoal ou da divulgação da interposição do recurso, assegurada a vista imediata dos elementos indispensáveis à defesa de seus interesses.

{§} O recurso e o pedido de reconsideração terão efeito suspensivo do ato ou da decisão recorrida até que sobrevenha decisão final da autoridade competente.

{§} O acolhimento do recurso invalida tão somente os atos insuscetíveis de aproveitamento.

{§} Os autos do processo permanecerão com vista franqueada aos interessados no sítio eletrônico {licitacao.sitio_autos}.

## {§sec}. DAS INFRAÇÕES ADMINISTRATIVAS E SANÇÕES

{§} Comete infração administrativa, nos termos da lei, o licitante que, com dolo ou culpa:

{§§@inf1} deixar de entregar a documentação exigida para o certame ou não entregar qualquer documento que tenha sido solicitado pel{conducao.o} {conducao.agente} durante o certame;

{§§@inf2} salvo em decorrência de fato superveniente devidamente justificado, não mantiver a proposta em especial quando:

{§§§} não enviar a proposta após a negociação;

{§§§} recusar-se a enviar o detalhamento da proposta quando exigível;

{§§§} pedir para ser desclassificado quando encerrada a etapa competitiva;

{§§§} deixar de apresentar amostra;

{§§§} apresentar proposta ou amostra em desacordo com as especificações do edital.

{§§@inf3} não celebrar o contrato ou não entregar a documentação exigida para a contratação, quando convocado dentro do prazo de validade de sua proposta;

{§§@inf4} recusar-se, sem justificativa, a assinar o contrato ou a aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administração;

{§§@inf5} apresentar declaração ou documentação falsa exigida para o certame ou prestar declaração falsa durante a licitação;

{§§@inf6} fraudar a licitação;

{§§@inf7} comportar-se de modo inidôneo ou cometer fraude de qualquer natureza, em especial quando:

{§§§} agir em conluio ou em desconformidade com a lei;

{§§§} induzir deliberadamente a erro no julgamento;

{§§§} apresentar amostra falsificada ou deteriorada.

{§§@inf8} praticar atos ilícitos com vistas a frustrar os objetivos da licitação;

{§§@inf9} praticar ato lesivo previsto no art. 5º da Lei nº 12.846, de 2013.

{§} Com fulcro na Lei nº 14.133, de 2021, a Administração poderá, após regular processo administrativo, garantida a prévia defesa, aplicar aos licitantes e/ou adjudicatários as seguintes sanções, sem prejuízo das responsabilidades civil e criminal:

{§§} advertência;

{§§} multa;

{§§} impedimento de licitar e contratar e

{§§} declaração de inidoneidade para licitar ou contratar, enquanto perdurarem os motivos determinantes da punição ou até que seja promovida sua reabilitação perante a própria autoridade que aplicou a penalidade.

{§} Na aplicação das sanções serão considerados:

{§§} a natureza e a gravidade da infração cometida;

{§§} as peculiaridades do caso concreto;

{§§} as circunstâncias agravantes ou atenuantes;

{§§} os danos que dela provierem para a Administração Pública;

{§§} a implantação ou o aperfeiçoamento de programa de integridade, conforme normas e orientações dos órgãos de controle.

%% AGU: multa entre 0,5% e 30% do valor do contrato, proporcional à gravidade (art. 156, §§ 1º e 3º).
{§} A multa será recolhida no prazo máximo de {multa.prazo_recolhimento} dias úteis, a contar da comunicação oficial.

{§§} Para as infrações previstas nos itens {§ref@inf1}, {§ref@inf2} e {§ref@inf3}, a multa será de {multa.leve_min} a {multa.leve_max} do valor do contrato licitado.

{§§} Para as infrações previstas nos itens {§ref@inf4}, {§ref@inf5}, {§ref@inf6}, {§ref@inf7}, {§ref@inf8} e {§ref@inf9}, a multa será de {multa.grave_min} a {multa.grave_max} do valor do contrato licitado.

{§} As sanções de advertência, impedimento de licitar e contratar e declaração de inidoneidade para licitar ou contratar poderão ser aplicadas, cumulativamente ou não, à penalidade de multa.

{§} Na aplicação da sanção de multa será facultada a defesa do interessado no prazo de 15 (quinze) dias úteis, contado da data de sua intimação.

{§} A sanção de impedimento de licitar e contratar será aplicada ao responsável em decorrência das infrações administrativas relacionadas nos itens {§ref@inf1}, {§ref@inf2}, {§ref@inf3} e {§ref@inf4}, quando não se justificar a imposição de penalidade mais grave, e impedirá o responsável de licitar e contratar no âmbito da Administração Pública direta e indireta do ente federativo a qual pertencer o órgão ou entidade, pelo prazo máximo de 3 (três) anos.

{§} Poderá ser aplicada ao responsável a sanção de declaração de inidoneidade para licitar ou contratar, em decorrência da prática das infrações dispostas nos itens {§ref@inf5}, {§ref@inf6}, {§ref@inf7}, {§ref@inf8} e {§ref@inf9}, bem como pelas infrações administrativas previstas nos itens {§ref@inf1}, {§ref@inf2}, {§ref@inf3} e {§ref@inf4} que justifiquem a imposição de penalidade mais grave que a sanção de impedimento de licitar e contratar, cuja duração observará o prazo previsto no art. 156, §5º, da Lei nº 14.133, de 2021.

{§} A recusa injustificada do adjudicatário em assinar o contrato ou em aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administração, descrita no item {§ref@inf3}, caracterizará o descumprimento total da obrigação assumida e o sujeitará às penalidades e à imediata perda da garantia de proposta em favor do órgão ou entidade promotora da licitação, nos termos do art. 45, §4º da Instrução Normativa SEGES/ME nº 73, de 30 de setembro de 2022.

{§} A apuração de responsabilidade relacionadas às sanções de impedimento de licitar e contratar e de declaração de inidoneidade para licitar ou contratar demandará a instauração de processo de responsabilização a ser conduzido por comissão composta por 2 (dois) ou mais servidores estáveis, que avaliará fatos e circunstâncias conhecidos e intimará o licitante ou o adjudicatário para, no prazo de 15 (quinze) dias úteis, contado da data de sua intimação, apresentar defesa escrita e especificar as provas que pretenda produzir.

{§} Caberá recurso no prazo de 15 (quinze) dias úteis da aplicação das sanções de advertência, multa e impedimento de licitar e contratar, contado da data da intimação, o qual será dirigido à autoridade que tiver proferido a decisão recorrida, que, se não a reconsiderar no prazo de 5 (cinco) dias úteis, encaminhará o recurso com sua motivação à autoridade superior, que deverá proferir sua decisão no prazo máximo de 20 (vinte) dias úteis, contado do recebimento dos autos.

{§} Caberá a apresentação de pedido de reconsideração da aplicação da sanção de declaração de inidoneidade para licitar ou contratar no prazo de 15 (quinze) dias úteis, contado da data da intimação, e decidido no prazo máximo de 20 (vinte) dias úteis, contado do seu recebimento.

{§} O recurso e o pedido de reconsideração terão efeito suspensivo do ato ou da decisão recorrida até que sobrevenha decisão final da autoridade competente.

{§} A aplicação das sanções previstas neste edital não exclui, em hipótese alguma, a obrigação de reparação integral dos danos causados.

{§} Para a garantia da ampla defesa e contraditório dos licitantes, as notificações serão enviadas eletronicamente para os endereços de e-mail informados na proposta comercial, bem como os cadastrados pela empresa no SICAF.

{§§} Os endereços de e-mail informados na proposta comercial e/ou cadastrados no Sicaf serão considerados de uso contínuo da empresa, não cabendo alegação de desconhecimento das comunicações a eles comprovadamente enviadas.

## {§sec}. DA IMPUGNAÇÃO AO EDITAL E DO PEDIDO DE ESCLARECIMENTO

{§} Qualquer pessoa é parte legítima para impugnar este Edital por irregularidade na aplicação da Lei nº 14.133, de 2021, devendo protocolar o pedido até 3 (três) dias úteis antes da data da abertura do certame.

{§} A resposta à impugnação ou ao pedido de esclarecimento será divulgado em sítio eletrônico oficial no prazo de até 3 (três) dias úteis, limitado ao último dia útil anterior à data da abertura do certame.

%% AGU: indicar os meios de recepção de impugnações e pedidos de esclarecimento.
{§} A impugnação e o pedido de esclarecimento poderão ser realizados por forma eletrônica, pelos seguintes meios: {impugnacao.meios}.

{§} As impugnações e pedidos de esclarecimentos não suspendem os prazos previstos no certame.

{§} A concessão de efeito suspensivo à impugnação é medida excepcional e deverá ser motivada pel{conducao.o} {conducao.agente}, nos autos do processo de licitação.

{§} Acolhida a impugnação, será definida e publicada nova data para a realização do certame.

## {§sec}. DAS DISPOSIÇÕES GERAIS

{§} Será divulgada ata da sessão pública no sistema eletrônico.

{§} Não havendo expediente ou ocorrendo qualquer fato superveniente que impeça a realização do certame na data marcada, a sessão será automaticamente transferida para o primeiro dia útil subsequente, no mesmo horário anteriormente estabelecido, desde que não haja comunicação em contrário, pel{conducao.o} {conducao.agente}.

{§} Todas as referências de tempo no Edital, no aviso e durante a sessão pública observarão o horário de Brasília - DF.

{§} A homologação do resultado desta licitação não implicará direito à contratação.

{§} As normas disciplinadoras da licitação serão sempre interpretadas em favor da ampliação da disputa entre os interessados, desde que não comprometam o interesse da Administração, o princípio da isonomia, a finalidade e a segurança da contratação.

{§} Os licitantes assumem todos os custos de preparação e apresentação de suas propostas e a Administração não será, em nenhum caso, responsável por esses custos, independentemente da condução ou do resultado do processo licitatório.

{§} Na contagem dos prazos estabelecidos neste Edital e seus Anexos, excluir-se-á o dia do início e incluir-se-á o do vencimento. Só se iniciam e vencem os prazos em dias de expediente na Administração.

{§} O desatendimento de exigências formais não essenciais não importará o afastamento do licitante, desde que seja possível o aproveitamento do ato, observados os princípios da isonomia e do interesse público.

{§} Em caso de divergência entre disposições deste Edital e de seus anexos ou demais peças que compõem o processo, prevalecerá as deste Edital.

{§} O Edital e seus anexos estão disponíveis, na íntegra, no Portal Nacional de Contratações Públicas (PNCP) e endereço eletrônico {licitacao.sitio_edital}.

{§} Integram este Edital, para todos os fins e efeitos, os seguintes anexos:

{§§} Anexo I - Critérios de Pontuação das Propostas Técnicas

{§§} ANEXO II –Termo de Referência;

{§§§} Apêndice do Anexo II – Estudo Técnico Preliminar;

%% Anexos conforme o caso, um por item com número e título (ex.: Anexo II – Anteprojeto / Projeto Básico; Anexo III – Minuta de Termo de Contrato; Anexo IV –Regras aplicáveis ao instrumento substitutivo ao contrato; Anexo V – Termo de Ciência e concordância; Anexo VI – Declaração de Responsabilidade pelo enquadramento sindical). AGU: em dedicação exclusiva, inserir o Anexo VII-C da IN SEGES 176/2024 (Declaração de Responsabilidade Sindical).
{*edital.anexos}{§§} {.valor};

{/edital.anexos}

{local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
