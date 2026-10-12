@requer regime=14133
@fonte contrato-servicos
@padrao autoridade=autoridades.vp_gestao
%% Modelo PROJUR/CFC atualizado em 28/01/2026 (SEI 90796110000005.000003/2025-51) — Portaria PRES CFC 233/2025. Texto preto do modelo sem alteração; só o vermelho é variável.
@cabecalho

# TERMO DE CONTRATO

> Processo n.º {processo}

> Unidade Gestora: {unidade_gestora}

::: CONTRATO N.º {contrato.numero}, QUE ENTRE SI CELEBRAM O CONSELHO FEDERAL DE CONTABILIDADE E A EMPRESA {contratada.razao_social|maiusculas}.

O Conselho Federal de Contabilidade, por intermédio do Departamento de Licitações e Contratos, com sede no SAUS Quadra 5, Bloco J, Ed. CFC, na cidade de Brasília/DF, inscrito(a) no CNPJ sob o n.º 33.618.570/0001-07, neste ato representado pelo {autoridade.cargo}, {autoridade.nome}, doravante denominado CONTRATANTE, e a empresa {contratada.razao_social}, inscrita no CNPJ/MF sob o n.º {contratada.cnpj}, sediada na {contratada.endereco}, doravante designado CONTRATADO, neste ato representado por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procuração apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}ato constitutivo da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo n.º {processo} e em observância às disposições da Lei n.º 14.133, de 2021, e demais legislação aplicável, resolvem celebrar o presente Termo de Contrato, decorrente {#inexigibilidade}da Inexigibilidade de Licitação n.º {contratacao.numero}{/inexigibilidade}{^inexigibilidade}da Dispensa de Licitação n.º {contratacao.numero}{/inexigibilidade}, mediante as cláusulas e condições a seguir enunciadas.

## CLÁUSULA {§cl} – OBJETO (art. 92, I e II)

{§} O objeto do presente instrumento é a contratação de {objeto_contratacao}, nas condições estabelecidas no Termo de Referência.

{§} Objeto da contratação:

| ITEM | ESPECIFICAÇÃO | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNITÁRIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{§} Vinculam esta contratação, independentemente de transcrição:

{§§} O Termo de Referência;

{§§} {#dispensa_eletronica}O Aviso de Dispensa Eletrônica;{/dispensa_eletronica}{^dispensa_eletronica}A Autorização de Contratação Direta;{/dispensa_eletronica}

{§§} A Proposta do CONTRATADO;

{§§} Eventuais anexos dos documentos supracitados.

%% UTILIZAR O SUBITEM ABAIXO SE A CONTRATAÇÃO TIVER COMO OBJETO OBRAS E SERVIÇOS COMUNS DE ENGENHARIA
{#regime_execucao}{§} O regime de execução é o de {regime_execucao}.{/regime_execucao}

## CLÁUSULA {§cl} – VIGÊNCIA E PRORROGAÇÃO

%% UTILIZAR OS SUBITENS 2.1 E 2.2 NA HIPÓTESE DE CONTRATAÇÃO COM OBJETO POR ESCOPO (ART. 105)
{#vigencia.escopo}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do art. 105 da Lei n.º 14.133, de 2021.

{§} O prazo de vigência será automaticamente prorrogado, independentemente de termo aditivo, quando o objeto não for concluído no período firmado acima, ressalvadas as providências cabíveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 2.3 A 2.8 QUANDO SE TRATAR DE CONTRATAÇÃO COM OBJETO A TERMO (SE EXTINGUE PELA CONCLUSÃO DO PRAZO)
{#vigencia.continuada}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrogável sucessivamente por até 10 anos, na forma dos artigos 106 e 107 da Lei n.º 14.133, de 2021.

{§} A prorrogação de que trata este item é condicionada ao ateste, pela autoridade competente, de que as condições e os preços permanecem vantajosos para a Administração, permitida a negociação com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{§§} Estar formalmente demonstrado no processo que a forma de prestação dos serviços tem natureza continuada;

{§§} Seja juntado relatório que discorra sobre a execução do contrato, com informações de que os serviços tenham sido prestados regularmente;

{§§} Seja juntada justificativa e motivo, por escrito, de que a Administração mantém interesse na realização do serviço;

{§§} Haja manifestação expressa do CONTRATADO informando o interesse na prorrogação;

{§§} Seja comprovado que o CONTRATADO mantém as condições iniciais de habilitação;

{§§} Não haja registro no Cadastro Informativo de créditos não quitados do setor público federal (Cadin).

{§} O CONTRATADO não tem direito subjetivo à prorrogação contratual.

{§} A prorrogação de contrato deverá ser promovida mediante celebração de termo aditivo.

{§} Nas eventuais prorrogações contratuais, os custos não renováveis já pagos ou amortizados ao longo do primeiro período de vigência da contratação deverão ser reduzidos ou eliminados como condição para a renovação.

{§} O contrato não poderá ser prorrogado quando o CONTRATADO tiver sido penalizado nas sanções de declaração de inidoneidade ou impedimento de licitar e contratar com poder público, observadas as abrangências de aplicação.{/vigencia.continuada}

%% UTILIZAR A REDAÇÃO DO SUBITEM ABAIXO PARA CONTRATAÇÕES EMERGENCIAIS (ART. 75, VIII)
{#vigencia.emergencial}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrogável, na forma do art. 75, inc. VIII, da Lei n.º 14.133, de 2021.{/vigencia.emergencial}

## CLÁUSULA {§cl} – MODELOS DE EXECUÇÃO E GESTÃO CONTRATUAIS (art. 92, IV, VII e XVIII)

{§} O regime de execução contratual, os modelos de gestão e de execução, assim como os prazos e condições de conclusão, entrega, observação e recebimento do objeto constam no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – SUBCONTRATAÇÃO

{§} As regras sobre a subcontratação do objeto são aquelas estabelecidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} - PREÇO

{#valor_mensal}{§} O valor mensal da contratação é de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{§} O valor total da contratação é de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{§} No valor acima estão incluídas todas as despesas ordinárias diretas e indiretas decorrentes da execução do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenciários, fiscais e comerciais incidentes, taxa de administração, frete, seguro e outros necessários ao cumprimento integral do objeto da contratação.

%% UTILIZAR O SUBITEM ABAIXO QUANDO O VALOR DA CONTRATAÇÃO FOR DEFINIDO POR DEMANDA VARIÁVEL
{#valor_por_demanda}{§} O valor acima é meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO dependerão dos quantitativos de serviços efetivamente prestados.{/valor_por_demanda}

## CLÁUSULA {§cl} - PAGAMENTO (art. 92, V e VI)

{§} O prazo para pagamento ao CONTRATADO e demais condições a ele referentes, encontram-se definidos no Termo de Referência, anexo a este Contrato.

%% UTILIZAR A CLÁUSULA DE REPACTUAÇÃO PARA A CONTRATAÇÃO DE SERVIÇOS COM DEDICAÇÃO EXCLUSIVA DE MÃO DE OBRA
{^dedicacao_exclusiva}## CLÁUSULA {§cl} – REAJUSTE DOS PREÇOS (art. 92, V)

{§} As regras acerca do reajuste dos preços encontram-se definidas no Termo de Referência, anexo a este Contrato.
{/dedicacao_exclusiva}{#dedicacao_exclusiva}## CLÁUSULA {§cl} - REPACTUAÇÃO DOS PREÇOS (art. 92, V e X)

{§} As regras acerca da repactuação dos preços encontram-se definidas no Termo de Referência, anexo a este Contrato.
{/dedicacao_exclusiva}
## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATANTE (art. 92, X, XI e XIV)

{§} As obrigações do CONTRATANTE encontram-se definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – OBRIGAÇÕES DO CONTRATADO (art. 92, XIV, XVI e XVII)

{§} As obrigações do CONTRATADO encontram-se definidas no Termo de Referência, anexo a este Contrato.

%% UTILIZAR A CLÁUSULA ABAIXO PARA A CONTRATAÇÃO DE SERVIÇOS COM DEDICAÇÃO EXCLUSIVA DE MÃO DE OBRA
{#dedicacao_exclusiva}## CLÁUSULA {§cl} - DA COMPENSAÇÃO DA JORNADA DE TRABALHO

{§} A compensação de jornada dos trabalhadores do CONTRATADO alocados à execução contratual em regime de dedicação exclusiva, quando compatível com a natureza dos serviços prestados, será realizada de acordo com as regras constantes do Decreto n.º 12.174, de 11 de setembro de 2024, da Instrução Normativa SEGES/MGI nº 81, de 12 de setembro de 2024, e do Termo de Referência, anexo a este Contrato.

{/dedicacao_exclusiva}
%% UTILIZAR A CLÁUSULA ABAIXO PARA A CONTRATAÇÃO QUE ENVOLVA, DE QUALQUER FORMA, O TRATAMENTO DE DADOS PESSOAIS
{#lgpd}## CLÁUSULA {§cl} - OBRIGAÇÕES PERTINENTES À LGPD

{§} As partes deverão cumprir a Lei n.º 13.709, de 14 de agosto de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em razão do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresentação da proposta no procedimento de contratação, independentemente de declaração ou de aceitação expressa.

{§} Os dados obtidos somente poderão ser utilizados para as finalidades que justificaram seu acesso e de acordo com a boa-fé e com os princípios do art. 6º da LGPD.

{§} É vedado o compartilhamento com terceiros dos dados obtidos fora das hipóteses permitidas em Lei.

{§} A Administração deverá ser informada no prazo de 5 (cinco) dias úteis sobre todos os contratos de suboperação firmados ou que venham a ser celebrados pelo CONTRATADO.

{§} Terminado o tratamento dos dados nos termos do art. 15 da LGPD, é dever do CONTRATADO eliminá-los, com exceção das hipóteses do art. 16 da LGPD, incluindo aquelas em que houver necessidade de guarda de documentação para fins de comprovação do cumprimento de obrigações legais ou contratuais e somente enquanto não prescritas essas obrigações.

{§} É dever do CONTRATADO orientar e treinar seus empregados sobre os deveres, requisitos e responsabilidades decorrentes da LGPD.

{§} O CONTRATADO deverá exigir de suboperadores e subcontratados o cumprimento dos deveres da presente cláusula, permanecendo integralmente responsável por garantir sua observância.

{§} O CONTRATANTE poderá realizar diligência para aferir o cumprimento dessa cláusula, devendo o CONTRATADO atender prontamente eventuais pedidos de comprovação formulados.

{§} O CONTRATADO deverá prestar, no prazo fixado pelo CONTRATANTE, prorrogável justificadamente, quaisquer informações acerca dos dados pessoais para cumprimento da LGPD, inclusive quanto a eventual descarte realizado.

{§} Bancos de dados formados a partir de contratos administrativos, notadamente aqueles que se proponham a armazenar dados pessoais, devem ser mantidos em ambiente virtual controlado, com registro individual rastreável de tratamentos realizados (LGPD, art. 37), com cada acesso, data, horário e registro da finalidade, para efeito de responsabilização, em caso de eventuais omissões, desvios ou abusos.

{§§} Os referidos bancos de dados devem ser desenvolvidos em formato interoperável, a fim de garantir a reutilização desses dados pela Administração nas hipóteses previstas na LGPD.

{§} O contrato está sujeito a ser alterado nos procedimentos pertinentes ao tratamento de dados pessoais, quando indicado pela autoridade competente, em especial a ANPD por meio de opiniões técnicas ou recomendações, editadas na forma da LGPD.

{§} Os contratos e convênios de que trata o §1º, do art. 26 da LGPD deverão ser comunicados à autoridade nacional.

{/lgpd}## CLÁUSULA {§cl} – GARANTIA DE EXECUÇÃO (art. 92, XII)

{^garantia}{§} Não haverá exigência de garantia contratual da execução.{/garantia}{#garantia}{§} A contratação conta com garantia de execução na forma prevista no Termo de Referência, em atenção ao art. 96 da Lei n.º 14.133, de 2021.{/garantia}

## CLÁUSULA {§cl} – INFRAÇÕES E SANÇÕES ADMINISTRATIVAS (art. 92, XIV)

{§} As infrações administrativas e sanções estão previstas no Termo de Referência, observando ainda a Portaria CFC nº 266/2025, disponível no portal da transparência do CFC (https://www3.cfc.org.br/spw/PortalTransparencia/Consulta.aspx), no que não contrariar as regras específicas fixadas para a contratação.

## CLÁUSULA {§cl} – DA EXTINÇÃO CONTRATUAL (art. 92, XIX)

%% UTILIZAR OS SUBITENS 14.1 A 14.3.2 PARA CONTRATAÇÃO COM OBJETO POR ESCOPO
{#vigencia.escopo}{§} O contrato será extinto quando cumpridas as obrigações de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{§} Se as obrigações não forem cumpridas no prazo estipulado, a vigência ficará prorrogada até a conclusão do objeto, caso em que deverá a Administração providenciar a readequação do cronograma fixado para o contrato.

{§} Quando a não conclusão do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{§§} ficará ele constituído em mora, sendo-lhe aplicáveis as respectivas sanções administrativas; e

{§§} poderá a Administração optar pela extinção do contrato e, nesse caso, adotará as medidas admitidas em lei para a continuidade da execução contratual.{/vigencia.escopo}

%% UTILIZAR OS SUBITENS 14.4 A 14.5.2 PARA SERVIÇOS CONTINUADOS COM OU SEM DEDICAÇÃO EXCLUSIVA DE MÃO DE OBRA (ART. 106)
{#vigencia.continuada}{§} O contrato será extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.

{§} O contrato poderá ser extinto antes do prazo nele fixado, sem ônus para o CONTRATANTE, quando este não dispuser de créditos orçamentários para sua continuidade ou quando entender que o contrato não mais lhe oferece vantagem.

{§§} Nesse caso, a extinção antecipada ocorrerá na próxima data de aniversário do contrato, garantido um prazo mínimo de dois meses para ciência formal do contratado, devendo ser observada a regra do art. 183 da Lei n.º 14.133, de 2021 para a contagem deste prazo.

{§§} O contrato poderá ser extinto com fundamento na ausência de créditos orçamentários ou na perda de vantagem contratual antes da data de aniversário, desde que ocorra com ônus para o CONTRATANTE, conforme previsto no art. 138, §2º, da Lei n.º 14.133, de 2021.{/vigencia.continuada}

%% UTILIZAR O SUBITEM 14.6 PARA CONTRATAÇÃO DECORRENTE DA DISPENSA DO ART. 75, INC. VIII
{#vigencia.emergencial}{§} O contrato será extinto quando vencido o prazo nele estipulado, observado o art. 75, inciso VIII, da Lei n.º 14.133/2021, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.{/vigencia.emergencial}

{§} O contrato poderá ser extinto antes de cumpridas as obrigações nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no art. 137 da Lei n.º 14.133, de 2021, bem como amigavelmente, assegurados o contraditório e a ampla defesa.

{§} Nesta hipótese, aplicam-se também os artigos 138 e 139 da mesma Lei.

{§} A alteração social ou a modificação da finalidade ou da estrutura da empresa não ensejará a extinção se não restringir sua capacidade de concluir o contrato.

{§} Se a operação implicar mudança da pessoa jurídica contratada, deverá ser formalizado termo aditivo para alteração subjetiva.

{§} O termo de extinção, sempre que possível, será precedido:

{§§} Do balanço dos eventos contratuais já cumpridos ou parcialmente cumpridos;

{§§} Da relação dos pagamentos já efetuados e ainda devidos;

{§§} Das indenizações e multas.

{§} A extinção do contrato não configura óbice para o reconhecimento do desequilíbrio econômico-financeiro, hipótese em que será concedida indenização por meio de termo indenizatório (art. 131, caput, da Lei n.º 14.133, de 2021).

%% UTILIZAR OS SUBITENS 14.13 A 14.14 PARA TODAS AS CONTRATAÇÕES, EXCETO SERVIÇOS COM DEDICAÇÃO EXCLUSIVA DE MÃO DE OBRA
{^dedicacao_exclusiva}{§} O CONTRATANTE poderá ainda:

{§§} nos casos de obrigação de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legislação que rege a matéria; e

{§§} nos casos em que houver necessidade de ressarcimento de prejuízos causados à Administração, nos termos do inciso IV, do art. 139 da Lei n.º 14.133, de 2021, reter os eventuais créditos existentes em favor do CONTRATADO decorrentes do contrato.

{§} O contrato poderá ser extinto caso se constate que o CONTRATADO mantém vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade CONTRATANTE ou com agente público que tenha desempenhado função no processo de contratação direta ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau (art. 14, inciso IV, da Lei n.º 14.133, de 2021).{/dedicacao_exclusiva}

%% UTILIZAR OS SUBITENS 14.15 A 14.22 PARA SERVIÇOS COM DEDICAÇÃO EXCLUSIVA DE MÃO DE OBRA
{#dedicacao_exclusiva}{§} O não pagamento dos salários e das verbas trabalhistas, e o não recolhimento das contribuições sociais, previdenciárias e para com o FGTS poderá dar ensejo à extinção do contrato por ato unilateral e escrito do CONTRATANTE e à aplicação das penalidades cabíveis.

{§} O CONTRATANTE poderá conceder prazo para que o CONTRATADO regularize suas obrigações trabalhistas ou suas condições de habilitação, sob pena de extinção contratual, quando não identificar má-fé ou a incapacidade de correção.

{§} Quando da extinção, o fiscal administrativo deverá verificar o pagamento pelo CONTRATADO das verbas rescisórias ou os documentos que comprovem que os empregados serão realocados em outra atividade de prestação de serviços, sem que ocorra a interrupção do contrato de trabalho.

{§} Até que o CONTRATADO comprove o disposto no item anterior, o CONTRATANTE reterá:

{§§} a garantia contratual - prestada com cobertura para os casos de descumprimento das obrigações de natureza trabalhista e previdenciária, incluídas as verbas rescisórias -, a qual será executada para reembolso dos prejuízos sofridos pela Administração, nos termos da legislação que rege a matéria (art. 121, §3º, I, e art. 139, III, b, da Lei n.º 14.133, de 2021); e

{§§} os valores das Notas fiscais ou Faturas correspondentes em valor proporcional ao inadimplemento, até que a situação seja regularizada.

{§} Na hipótese do subitem anterior, não havendo quitação das obrigações por parte do CONTRATADO no prazo de 15 (quinze) dias, fica o CONTRATADO obrigado a emitir as guias de recolhimento de contribuições previdenciárias e do FGTS e entregá-las ao CONTRATANTE, que poderá efetuar o pagamento das obrigações inadimplidas diretamente aos empregados que tenham participado da execução dos serviços objeto do contrato, bem como das contribuições previdenciárias e do FGTS, deduzindo o respectivo valor do pagamento devido ao CONTRATADO (art. 121, §3º, inciso II, da Lei n.º 14.133, de 2021).

{§} O CONTRATANTE poderá ainda:

{§§} nos casos de obrigação de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada (art. 139, III, “c”, da Lei n.º 14.133, de 2021), conforme legislação que rege a matéria; e

{§§} nos casos em que houver necessidade de ressarcimento de prejuízos causados à Administração, nos termos do inciso IV do art. 139 da Lei n.º 14.133, de 2021, reter os eventuais créditos existentes em favor do CONTRATADO decorrentes do contrato.

{§} O contrato poderá ser extinto caso se constate que o CONTRATADO mantém vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade CONTRATANTE ou com agente público que tenha desempenhado função no processo de contratação direta ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau (art. 14, inciso IV, da Lei n.º 14.133, de 2021).

{§} O contrato poderá ser extinto em caso de alteração da convenção coletiva de trabalho em que se baseia a planilha de custos e formação de preços contratuais, em razão de erro ou fraude no enquadramento sindical de que resulte a necessidade de repactuação ou imposição de ônus financeiro para a CONTRATANTE, em cumprimento de decisão judicial (art. 137, inc. I, da Lei n.º 14.133, de 2021).{/dedicacao_exclusiva}

## CLÁUSULA {§cl} – ALTERAÇÕES

{§} Eventuais alterações contratuais reger-se-ão pela disciplina dos artigos 124 e seguintes da Lei n.º 14.133, de 2021.

{§} O CONTRATADO é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato, e, nos casos de reforma de edifício ou de equipamento, o limite para os acréscimos será de 50% (cinquenta por cento).

{§} As supressões resultantes de acordo celebrado entre as partes contratantes poderão exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{§} As alterações contratuais deverão ser promovidas mediante celebração de termo aditivo, submetido à prévia aprovação da consultoria jurídica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipação de seus efeitos, hipótese em que a formalização do aditivo deverá ocorrer no prazo máximo de 1 (um) mês (art. 132 da Lei n.º 14.133, de 2021).

{§} Registros que não caracterizam alteração do contrato podem ser realizados por simples apostila, dispensada a celebração de termo aditivo, na forma do art. 136 da Lei n.º 14.133, de 2021.

## CLÁUSULA {§cl} – DOTAÇÃO ORÇAMENTÁRIA (art. 92, VIII)

{§} As despesas decorrentes da presente contratação estão programadas em dotação orçamentária própria, conta contábil {dotacao.conta}, Projeto n.º {dotacao.projeto}, de acordo com Orçamento Anual para {dotacao.exercicio} do CFC, aprovado pela Resolução CFC n.º {dotacao.resolucao}.

%% UTILIZAR O SUBITEM ABAIXO PARA A CONTRATAÇÃO DE SERVIÇOS CONTINUADOS (ART. 106)
{#vigencia.continuada}{§} A dotação relativa aos exercícios financeiros subsequentes correrá por conta dos recursos próprios para atender às despesas da mesma natureza, cuja alocação será feita no início de cada exercício financeiro, mediante apostilamento.{/vigencia.continuada}

## CLÁUSULA {§cl} – DOS CASOS OMISSOS (art. 92, III)

{§} Os casos omissos serão decididos pelo CONTRATANTE, segundo as disposições contidas na Lei n.º 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei n.º 8.078, de 1990 – Código de Defesa do Consumidor – e normas e princípios gerais dos contratos.

## CLÁUSULA {§cl} – PUBLICAÇÃO

{§} Incumbirá à CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contratações Públicas (PNCP), na forma prevista no art. 94 da Lei n.º 14.133, de 2021, bem como no respectivo sítio oficial na Internet, em atenção ao art. 91, caput, da Lei n.º 14.133, de 2021, e ao art. 8º, §2º, da Lei n. 12.527, de 2011, c/c art. 7º, §3º, inciso V, do Decreto n. 7.724, de 2012.

## CLÁUSULA {§cl}– FORO (art. 92, §1º)

{§} Fica eleito o Foro da Justiça Federal em Brasília, Seção Judiciária do Distrito Federal para dirimir os litígios que decorrerem da execução deste Termo de Contrato que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei n.º 14.133, de 2021.

> **CONSELHO FEDERAL DE CONTABILIDADE**
> {autoridade.nome}
> {autoridade.cargo}

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
