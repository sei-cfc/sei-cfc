@requer regime=14133
@fonte agu-contrato-compras
@padrao autoridade=autoridades.vp_gestao
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
%% Modelo de Termo de Contrato — Aquisições (AGU, dez/2025). Uso no CFC: contrato decorrente de LICITAÇÃO (pregão ou concorrência); contratação direta usa contrato-compras (modelo Projur).
@cabecalho

> (Processo Administrativo n° {processo})

%% Nota AGU: a menção à União só cabe a órgão da Administração Direta; nos demais casos, o nome da autarquia ou fundação.
::: CONTRATO ADMINISTRATIVO Nº {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas} E {contratada.razao_social|maiusculas}

%% Nota AGU (Parecer 4/2022/CNMLC): sem números de documentos pessoais — autoridade identificada pela matrícula funcional; representante da contratada, só pelo nome.
A Autarquia {cfc.nome}, por intermédio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o nº {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}, nomeado(a) pela Portaria nº {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matrícula Funcional nº {nomeacao.matricula}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o nº {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}/{contratada.uf}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}{#representante.por_procuracao}procuração apresentada nos autos{/representante.por_procuracao}, tendo em vista o que consta no Processo nº {processo} e em observância às disposições da Lei nº 14.133, de 1º de abril de 2021, e demais legislação aplicável, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao.concorrencia}Concorrência{/licitacao.concorrencia}{^licitacao.concorrencia}Pregão Eletrônico{/licitacao.concorrencia} nº {licitacao.numero}, mediante as cláusulas e condições a seguir enunciadas.

## CLÁUSULA {§cl} – OBJETO

{§} O objeto do presente instrumento é a contratação de {objeto_contratacao}, nas condições estabelecidas no Termo de Referência.

{§} Objeto da contratação:

%% Nota AGU: tabela meramente ilustrativa, ajustada ao caso concreto.
| ITEM | ESPECIFICAÇÃO | CATMAT | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNITÁRIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{§} Vinculam esta contratação, independentemente de transcrição:

{§§} O Termo de Referência;

%% Contrato decorrente de licitação: das alternativas do modelo, vale "O Edital da Licitação".
{§§} O Edital da Licitação;

{§§} A Proposta do CONTRATADO;

{§§} Eventuais anexos dos documentos supracitados.

## CLÁUSULA {§cl} – VIGÊNCIA E PRORROGAÇÃO

%% Nota AGU: redação para contratos de escopo (art. 105).
{#vigencia.escopo}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do artigo 105 da Lei n° 14.133, de 2021.

{§§} O prazo de vigência será automaticamente prorrogado, independentemente de termo aditivo, quando o objeto não for concluído no período firmado acima, ressalvadas as providências cabíveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% Nota AGU: redação para fornecimentos contínuos (arts. 106 e 107; art. 6º, XV); prazo inicial de no máximo 5 anos; consulta prévia ao Cadin obrigatória (Lei 10.522/2002, art. 6º).
{#vigencia.continuada}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrogável sucessivamente por até 10 anos, na forma dos artigos 106 e 107 da Lei n° 14.133, de 2021.

{§§} A prorrogação de que trata este item é condicionada ao ateste, pela autoridade competente, de que as condições e os preços permanecem vantajosos para a Administração, permitida a negociação com o CONTRATADO, bem como à inexistência de registros no Cadastro Informativo de créditos não quitados do setor público federal (Cadin).

{§} O CONTRATADO não tem direito subjetivo à prorrogação contratual.

{§} A prorrogação de contrato deverá ser promovida mediante celebração de termo aditivo.

{§} O contrato não poderá ser prorrogado quando o CONTRATADO tiver sido penalizado nas sanções de declaração de inidoneidade ou impedimento de licitar e contratar com poder público, observadas as abrangências de aplicação.{/vigencia.continuada}

%% Nota AGU: redação para contratações emergenciais (art. 75, VIII), qualquer que seja a natureza do objeto; prazo máximo de um ano.
{#vigencia.emergencial}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrogável, na forma do art. 75, VIII, da Lei n° 14.133/2021.{/vigencia.emergencial}

## CLÁUSULA {§cl} – MODELOS DE EXECUÇÃO E GESTÃO CONTRATUAIS

{§} O regime de execução contratual, os modelos de gestão e de execução, assim como os prazos e condições de conclusão, entrega, observação e recebimento do objeto constam no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – SUBCONTRATAÇÃO

{§} As regras sobre a subcontratação do objeto são aquelas estabelecidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – PREÇO

%% Nota AGU: o valor total considera o período inicial de vigência.
{#valor_mensal}{§} O valor mensal da contratação é de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{§} O valor total da contratação é de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{§} No valor acima estão incluídas todas as despesas ordinárias diretas e indiretas decorrentes da execução do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenciários, fiscais e comerciais incidentes, taxa de administração, frete, seguro e outros necessários ao cumprimento integral do objeto da contratação.

%% Nota AGU: inserir quando o contrato for de valor estimativo, com demanda variável.
{#valor_por_demanda}{§} O valor acima é meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO dependerão dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CLÁUSULA {§cl} - PAGAMENTO

{§} O prazo para pagamento ao CONTRATADO e demais condições a ele referentes encontram-se definidos no Termo de Referência, anexo a este Contrato.

%% Nota AGU: o contrato deve prever índice de reajuste com data-base vinculada à data do orçamento estimado (art. 25, § 7º).
## CLÁUSULA {§cl} - REAJUSTE

{§} As regras acerca do reajuste do valor contratual são aquelas definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATANTE

{§} São obrigações do CONTRATANTE:

{§§} Exigir o cumprimento de todas as obrigações assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{§§} Receber o objeto no prazo e condições estabelecidas no Termo de Referência;

{§§} Notificar o CONTRATADO, por escrito, sobre vícios, defeitos incorreções, imperfeições, falhas ou irregularidades verificadas na execução do objeto contratual, fixando prazo para que seja substituído, reparado ou corrigido, total ou parcialmente, às suas expensas, certificando-se de que as soluções por ele propostas sejam as mais adequadas;

{§§} Acompanhar e fiscalizar a execução do contrato e o cumprimento das obrigações pelo CONTRATADO;

{§§} Efetuar o pagamento ao CONTRATADO do valor correspondente ao fornecimento do objeto, no prazo, forma e condições estabelecidos no presente Contrato e no Termo de Referência.

{§§} Aplicar ao CONTRATADO as sanções previstas na lei e neste Contrato;

{§§} Cientificar o órgão de representação judicial da Advocacia-Geral da União para adoção das medidas cabíveis quando do descumprimento de obrigações pelo CONTRATADO;

{§§} Explicitamente emitir decisão sobre todas as solicitações e reclamações relacionadas à execução do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelatórios ou de nenhum interesse para a boa execução do ajuste.

%% Nota AGU: prazo definido pela Administração conforme a complexidade do objeto; sem especificação, é de um mês (art. 123, parágrafo único; Decreto 11.246/2022, art. 28).
{§§§} A Administração terá o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorrogação motivada, por igual período.

%% Nota AGU: cláusula necessária (art. 92, XI); pode-se adotar o mesmo prazo do art. 123.
{§§} Responder eventuais pedidos de reestabelecimento do equilíbrio econômico-financeiro feitos pelo CONTRATADO no prazo máximo de {prazo_reequilibrio};

%% Nota AGU: disposição do art. 137, § 4º — só cabe quando houver garantia de execução.
{#garantia}{§§} Notificar os emitentes das garantias quanto ao início de processo administrativo para apuração de descumprimento de cláusulas contratuais.{/garantia}

{§} A Administração não responderá por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados à execução do contrato, bem como por qualquer dano causado a terceiros em decorrência de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

%% Nota AGU: obrigações gerais; o órgão inclui, modifica ou exclui itens conforme as especificidades do objeto.
## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATADO

{§} O CONTRATADO deve cumprir todas as obrigações constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execução do objeto, observando, ainda, as obrigações a seguir dispostas:

{§} Atender às determinações regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informação por eles solicitados;

%% Nota AGU: o prazo de correção é fixado pelo fiscal conforme o caso concreto, não em prazo único.
{§} Reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e serviços nos quais se verificarem vícios, defeitos ou incorreções resultantes da execução ou dos materiais empregados;

{§} Responsabilizar-se pelos vícios e danos decorrentes da execução do objeto, bem como por todo e qualquer dano causado à Administração ou terceiros, não reduzindo essa responsabilidade a fiscalização ou o acompanhamento da execução contratual pelo CONTRATANTE, que ficará autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

{§} Quando não for possível a verificação da regularidade no Sistema de Cadastro de Fornecedores – SICAF, o CONTRATADO deverá entregar ao setor responsável pela fiscalização do contrato, junto com a Nota Fiscal para fins de pagamento, os seguintes documentos:

{§§} prova de regularidade relativa à Seguridade Social;

{§§} certidão conjunta relativa aos tributos federais e à Dívida Ativa da União;

{§§} certidões que comprovem a regularidade perante a Fazenda Estadual ou Distrital do domicílio ou sede do CONTRATADO;

{§§} Certidão de Regularidade do FGTS – CRF; e

{§§} Certidão Negativa de Débitos Trabalhistas – CNDT.

{§} Responsabilizar-se pelo cumprimento de todas as obrigações trabalhistas, sociais, previdenciárias, tributárias, fiscais, comerciais e as demais previstas em legislação específica, cuja inadimplência não transfere a responsabilidade ao CONTRATANTE e não poderá onerar o objeto do contrato;

{§} Comunicar ao Fiscal do contrato tempestivamente, observada a urgência da situação, qualquer ocorrência anormal ou acidente que se verifique no local da execução do objeto contratual, não ultrapassando o prazo de 24 (vinte e quatro) horas;

{§} Paralisar, por determinação do CONTRATANTE, qualquer atividade que não esteja sendo executada de acordo com a boa técnica ou que ponha em risco a segurança de pessoas ou bens de terceiros;

{§} Manter, durante toda a vigência do contrato, em compatibilidade com as obrigações assumidas, todas as condições exigidas para habilitação na licitação ou para qualificação na contratação direta;

{§} Cumprir, durante todo o período de execução do contrato, a reserva de cargos prevista em lei para pessoa com deficiência, para reabilitado da Previdência Social ou para aprendiz, bem como as reservas de cargos previstas na legislação;

{§} Comprovar a reserva de cargos a que se refere a cláusula acima, no prazo fixado pelo fiscal do contrato, com a indicação dos empregados que preencheram as referidas vagas;

{§} Guardar sigilo sobre todas as informações obtidas em decorrência do cumprimento do contrato;

{§} Arcar com o ônus decorrente de eventual equívoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos variáveis decorrentes de fatores futuros e incertos, devendo complementá-los, caso o previsto inicialmente em sua proposta não seja satisfatório para o atendimento do objeto da contratação, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei nº 14.133, de 2021;

{§} Cumprir, além dos postulados legais vigentes de âmbito federal, estadual ou municipal, as normas de segurança do CONTRATANTE;

%% Obrigações em vermelho para compra com execução acessória no local (instalação, montagem, serviço agregado ao fornecimento).
{#servico_agregado}{§} Alocar os empregados necessários ao perfeito cumprimento das cláusulas deste contrato, com habilitação e conhecimento adequados;

{§} Prestar os serviços dentro dos parâmetros e rotinas estabelecidos;

{§} Fornecer todos os materiais, equipamentos, ferramentas e utensílios demandados, em quantidade, qualidade e tecnologia adequadas, com a observância às recomendações aceitas pela boa técnica, normas e legislação de regência;

{§} Conduzir os trabalhos com estrita observância às normas da legislação pertinente, cumprindo as determinações dos Poderes Públicos, mantendo sempre limpo o local de execução do objeto e nas melhores condições de segurança, higiene e disciplina;

{§} Submeter previamente, por escrito, ao CONTRATANTE, para análise e aprovação, quaisquer mudanças nos métodos executivos que fujam às especificações do memorial descritivo ou instrumento congênere;{/servico_agregado}

%% Obrigações em vermelho de proteção ao trabalho: quando a execução envolver trabalhadores do CONTRATADO.
{#protecao_trabalho}{§} Cumprir as normas de proteção ao trabalho, inclusive aquelas relativas à segurança e à saúde no trabalho;

{§} Não submeter os trabalhadores a condições degradantes de trabalho, jornadas exaustivas, servidão por dívida ou trabalhos forçados;

{§} Não permitir a utilização de qualquer trabalho do menor de dezesseis anos de idade, exceto na condição de aprendiz para os maiores de quatorze anos de idade, observada a legislação pertinente;

{§} Não submeter o menor de dezoito anos de idade à realização de trabalho noturno e em condições perigosas e insalubres e à realização de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto nº 6.481, de 12 de junho de 2008;

{§} Receber e dar o tratamento adequado a denúncias de discriminação, violência e assédio no ambiente de trabalho;{/protecao_trabalho}

%% Obrigação em vermelho para bens com manual e assistência técnica (equipamentos).
{#manual_usuario}{§} Entregar o objeto acompanhado do manual do usuário, com uma versão em português, e da relação da rede de assistência técnica autorizada;{/manual_usuario}

{§} Responsabilizar-se pelos vícios e danos decorrentes do objeto, de acordo com o Código de Defesa do Consumidor (Lei nº 8.078, de 1990);

{§} Comunicar ao CONTRATANTE, no prazo máximo de 24 (vinte e quatro) horas que antecede a data da entrega, os motivos que impossibilitem o cumprimento do prazo previsto, com a devida comprovação;

%% Nota AGU: aquisições raramente envolvem dados pessoais; havendo tratamento, inserir esta obrigação e a cláusula da LGPD.
{#lgpd}{§} Orientar e treinar seus empregados sobre os deveres previstos na Lei nº 13.709, de 14 de agosto de 2018, adotando medidas eficazes para proteção de dados pessoais a que tenha acesso por força da execução deste contrato;{/lgpd}

%% Nota AGU: cláusula necessária quando a contratação envolver, de qualquer forma, tratamento de dados pessoais (LGPD); disposições indicativas, ajustáveis ao objeto.
{#lgpd}## CLÁUSULA {§cl} - OBRIGAÇÕES PERTINENTES À LGPD

{§} As partes deverão cumprir a Lei nº 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em razão do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresentação da proposta no procedimento de contratação, independentemente de declaração ou de aceitação expressa.

{§} Os dados obtidos somente poderão ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-fé e com os princípios do art. 6º da LGPD.

{§} É vedado o compartilhamento com terceiros dos dados obtidos fora das hipóteses permitidas em Lei.

{§} A Administração deverá ser informada no prazo de 5 (cinco) dias úteis sobre todos os contratos de suboperação firmados ou que venham a ser celebrados pelo CONTRATADO.

{§} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, é dever do CONTRATADO eliminá-los, com exceção das hipóteses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documentação para fins de comprovação do cumprimento de obrigações legais ou contratuais e somente enquanto não prescritas essas obrigações.

{§} É dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{§} O CONTRATADO deverá exigir de SUBOPERADORES e SUBCONTRATADOS o cumprimento dos deveres da presente cláusula, permanecendo integralmente responsável por garantir sua observância.

{§} O CONTRATANTE poderá realizar diligência para aferir o cumprimento dessa cláusula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprovação formulados.

{§} O CONTRATADO deverá prestar, no prazo fixado pelo CONTRATANTE, prorrogável justificadamente, quaisquer informações acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{§} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastreável de tratamentos realizados (LGPD, art. 37), com cada acesso, data, horário e registro da finalidade, para efeito de responsabilização, em caso de eventuais omissões, desvios ou abusos.

{§§} Os referidos bancos de dados devem ser desenvolvidos em formato interoperável, a fim de garantir a reutilização desses dados pela Administração nas hipóteses previstas na LGPD.

{§} O contrato está sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opiniões técnicas ou recomendações, editadas na forma da LGPD.

{§} Os contratos e convênios de que trata o § 1º do art. 26 da LGPD deverão ser comunicados à autoridade nacional.

{/lgpd}## CLÁUSULA {§cl} – GARANTIA DE EXECUÇÃO

%% Nota AGU: exigir garantia é critério da Administração; exigindo, prever no edital e no contrato; não exigindo, justificar com base nos estudos preliminares e na análise de riscos.
{^garantia}{§} Não haverá exigência de garantia contratual da execução.{/garantia}{#garantia}{§} Será exigida a prestação de garantia na presente contratação, conforme regras constantes do Termo de Referência.{/garantia}

## CLÁUSULA {§cl} – INFRAÇÕES E SANÇÕES ADMINISTRATIVAS

{§} As regras acerca de infrações e sanções administrativas referentes à execução do contrato são aquelas definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – DA EXTINÇÃO CONTRATUAL

%% Nota AGU: redação para contratos por escopo (objeto prestado em determinado prazo — ex.: compra pontual de sofás, aquisição e instalação de servidores).
{#vigencia.escopo}{§} O contrato será extinto quando cumpridas as obrigações de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{§} Se as obrigações não forem cumpridas no prazo estipulado, a vigência ficará prorrogada até a conclusão do objeto, caso em que deverá a Administração providenciar a readequação do cronograma fixado para o contrato.

{§§} Quando a não conclusão do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{§§§} ficará ele constituído em mora, sendo-lhe aplicáveis as respectivas sanções administrativas; e

{§§§} poderá a Administração optar pela extinção do contrato e, nesse caso, adotará as medidas admitidas em lei para a continuidade da execução contratual.{/vigencia.escopo}

%% Nota AGU: redação para fornecimentos contínuos, aluguel de equipamentos e uso de programas de informática (art. 106); extinção antecipada com ou sem ônus, justificada formalmente (ON AGU nº 98/2025).
{#vigencia.continuada}{§} O contrato será extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.

{§} O contrato poderá ser extinto antes do prazo nele fixado, sem ônus para o CONTRATANTE, mediante justificativa formal de que não dispõe de créditos orçamentários para sua continuidade ou de que o contrato não mais lhe oferece vantagem.

{§§} Nesse caso, a extinção antecipada ocorrerá na próxima data de aniversário do contrato, garantido um prazo mínimo de dois meses para ciência formal do contratado, devendo ser observada a regra do art. 183 da Lei nº 14.133, de 2021 para a contagem deste prazo.

{§} O contrato poderá ser extinto com fundamento na ausência de créditos orçamentários ou na perda de vantagem contratual antes da data de aniversário, desde que ocorra com ônus para o CONTRATANTE, conforme previsto no art. 138, §2º, da Lei nº 14.133, de 2021.{/vigencia.continuada}

%% Nota AGU: redação para contratos decorrentes da dispensa do art. 75, VIII.
{#vigencia.emergencial}{§} O contrato será extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.º 14.133/2021, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.{/vigencia.emergencial}

{§} O contrato poderá ser extinto antes de cumpridas as obrigações nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei nº 14.133, de 2021, bem como amigavelmente, assegurados o contraditório e a ampla defesa.

{§} Nesta hipótese, aplicam-se também os artigos 138 e 139 da mesma Lei.

{§} A alteração social ou a modificação da finalidade ou da estrutura da empresa não ensejará a extinção se não restringir sua capacidade de concluir o contrato.

{§} Se a operação implicar mudança da pessoa jurídica contratada, deverá ser formalizado termo aditivo para alteração subjetiva.

{§} O termo de extinção, sempre que possível, será precedido:

{§§} Do balanço dos eventos contratuais já cumpridos ou parcialmente cumpridos;

{§§} Da relação dos pagamentos já efetuados e ainda devidos;

{§§} Das indenizações e multas.

{§} A extinção do contrato não configura óbice para o reconhecimento do desequilíbrio econômico-financeiro, hipótese em que será concedida indenização por meio de termo indenizatório.

{§} O CONTRATANTE poderá ainda:

{§§} nos casos de obrigação de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legislação que rege a matéria; e

{§§} nos casos em que houver necessidade de ressarcimento de prejuízos causados à Administração, nos termos do inciso IV do art. 139 da Lei n.º 14.133, de 2021, reter os eventuais créditos existentes em favor do CONTRATADO decorrentes do contrato.

{§} O contrato poderá ser extinto caso se constate que o CONTRATADO mantém vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade contratante ou com agente público que tenha desempenhado função na licitação ou na contratação direta, ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau.

## CLÁUSULA {§cl} – ALTERAÇÕES

{§} Eventuais alterações contratuais reger-se-ão pela disciplina dos arts. 124 e seguintes da Lei nº 14.133, de 2021.

{§} O CONTRATADO é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

%% Nota AGU: supressão consensual acima de 25% admitida (Parecer 61/2024/DECOR/CGU/AGU).
{§} As supressões resultantes de acordo celebrado entre as partes contratantes poderão exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{§} As alterações contratuais deverão ser promovidas mediante celebração de termo aditivo, submetido à prévia aprovação da consultoria jurídica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipação de seus efeitos, hipótese em que a formalização do aditivo deverá ocorrer no prazo máximo de 1 (um) mês.

{§} Registros que não caracterizam alteração do contrato podem ser realizados por simples apostila, dispensada a celebração de termo aditivo, na forma do art. 136 da Lei nº 14.133, de 2021.

## CLÁUSULA {§cl} – DOTAÇÃO ORÇAMENTÁRIA

{§} As despesas decorrentes da presente contratação correrão à conta de recursos específicos consignados no Orçamento Geral da União deste exercício, na dotação abaixo discriminada:

{§§} Gestão/unidade: {dotacao.gestao_unidade};

{§§} Fonte de recursos: {dotacao.fonte};

{§§} Programa de trabalho: {dotacao.projeto};

{§§} Elemento de despesa: {dotacao.conta}; e

{§§} Plano interno: {dotacao.plano_interno}; e

{§§} Nota de empenho: {dotacao.empenho};

%% Nota AGU: em fornecimento contínuo, a Administração atesta no início de cada exercício a existência de créditos (art. 106, II).
{#vigencia.continuada}{§} A dotação relativa aos exercícios financeiros subsequentes será indicada após aprovação da Lei Orçamentária respectiva e liberação dos créditos correspondentes, mediante apostilamento.{/vigencia.continuada}

%% Nota AGU: a Administração pode invocar o CDC como destinatária final quando suas prerrogativas forem insuficientes (TCU, Acórdão 2569/2018-Plenário).
## CLÁUSULA {§cl} – DOS CASOS OMISSOS

{§} Os casos omissos serão decididos pelo CONTRATANTE, segundo as disposições contidas na Lei nº 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei nº 8.078, de 1990 – Código de Defesa do Consumidor – e normas e princípios gerais dos contratos.

## CLÁUSULA {§cl} – PUBLICAÇÃO

{§} Incumbirá ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contratações Públicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo sítio oficial na Internet, em atenção ao art. 91, caput, da Lei n.º 14.133, de 2021, e ao art. 8º, §2º, da Lei n. 12.527, de 2011, c/c art. 7º, §3º, inciso V, do Decreto n. 7.724, de 2012.

## CLÁUSULA {§cl} – FORO

{§} Fica eleito o Foro da Justiça Federal em Brasília, Seção Judiciária do Distrito Federal para dirimir os litígios que decorrerem da execução deste Termo de Contrato que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei nº 14.133, de 2021.

{#local_data}> {local_data}{/local_data}

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

%% Nota AGU: a assinatura eletrônica do SEI não dispensa as testemunhas (CPC, art. 784, § 4º); mantida a recomendação de duas testemunhas (Nota 13/2021/DECOR/CGU/AGU).
{#testemunhas}> TESTEMUNHAS:
{*testemunhas}> {._n}- {.nome}
{/testemunhas}{/testemunhas}
