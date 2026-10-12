@requer regime=14133
@fonte agu-contrato-obras
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
%% Modelo de Termo de Contrato — Obras e Serviços de Engenharia — Licitação e Contratação Direta (AGU, dez/2025).
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# TERMO DE CONTRATO

> (Processo Administrativo n° {processo})

%% Nota AGU: "A UNIÃO" só para órgão da Administração Direta; nos demais casos, o nome da autarquia ou fundação.
::: CONTRATO ADMINISTRATIVO Nº {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas}, POR INTERMÉDIO DO (A) {cfc.setor_licitacoes|maiusculas} E {contratada.razao_social|maiusculas}.

%% Nota AGU (Parecer 4/2022/CNMLC): representantes identificados só pelo nome; o da Administração, também pela matrícula funcional.
%% Nota AGU: se exigido seguro-garantia com cláusula de retomada, qualificar a seguradora no preâmbulo como INTERVENIENTE ANUENTE.
%% nomeacao: ato de nomeação da autoridade signatária (Portaria, data, DOU, matrícula) — sem ele o trecho sai inteiro.
%% Origem: licitacao = {"concorrencia": true|false} (Concorrência OU Pregão Eletrônico); sem licitacao → inexigibilidade (Inexigibilidade) OU Dispensa de Licitação (dispensa_eletronica escolhe o Aviso na vinculação).
O {cfc.nome}, por intermédio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o nº {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}{#nomeacao}, nomeado(a) pela Portaria nº {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matrícula Funcional nº {nomeacao.matricula}{/nomeacao}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o nº {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {#representante.por_procuracao}procuração apresentada nos autos{/representante.por_procuracao}{^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}, tendo em vista o que consta no Processo nº {processo} e em observância às disposições da Lei nº 14.133, de 1º de abril de 2021, e demais legislação aplicável, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao}{#licitacao.concorrencia}Concorrência{/licitacao.concorrencia}{^licitacao.concorrencia}Pregão Eletrônico{/licitacao.concorrencia}{/licitacao}{^licitacao}{#inexigibilidade}Inexigibilidade de Licitação{/inexigibilidade}{^inexigibilidade}Dispensa de Licitação{/inexigibilidade}{/licitacao} nº {contratacao.numero}, mediante as cláusulas e condições a seguir enunciadas.

## CLÁUSULA {§cl} – OBJETO

{§} O objeto do presente instrumento é a contratação de {objeto_contratacao}, nas condições estabelecidas no Termo de Referência.

%% Nota AGU: a tabela é meramente ilustrativa, ajustar ao caso concreto.
{§} Objeto da contratação:

| ITEM | ESPECIFICAÇÃO | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNITÁRIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{§} Vinculam esta contratação, independentemente de transcrição:

{§§} O Termo de Referência;

%% O Edital da Licitação (licitação) OU A Autorização de Contratação Direta OU O Aviso de Dispensa Eletrônica.
{§§} {#licitacao}O Edital da Licitação;{/licitacao}{^licitacao}{#dispensa_eletronica}O Aviso de Dispensa Eletrônica;{/dispensa_eletronica}{^dispensa_eletronica}A Autorização de Contratação Direta;{/dispensa_eletronica}{/licitacao}

{§§} A Proposta do CONTRATADO;

{§§} Eventuais anexos dos documentos supracitados.

%% Regime do art. 46: empreitada por preço global OU por preço unitário OU empreitada integral OU contratação por tarefa OU contratação integrada OU semi-integrada OU fornecimento e prestação de serviço associado.
%% Nota AGU: objeto com parte em preço global e parte em preço unitário (sob demanda) → ajustar a cláusula.
{§} O regime de execução é o de {regime_execucao}.

## CLÁUSULA {§cl} – VIGÊNCIA E PRORROGAÇÃO

%% Nota AGU: subitens 2.1 e 2.2 para contratos de escopo (art. 105).
{#vigencia.escopo}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, na forma do artigo 105 da Lei n° 14.133, de 2021.

{§} O prazo de vigência será automaticamente prorrogado, independentemente de termo aditivo, quando o objeto não for concluído no período firmado acima, ressalvadas as providências cabíveis no caso de culpa do CONTRATADO, previstas neste instrumento.{/vigencia.escopo}

%% OU — Nota AGU: arts. 106 e 107 e IN SEGES/MP 5/2017 (serviços continuados); Cadin impede aditamento de contratos firmados desde 16/09/2024 (Lei 10.522, art. 6º-A).
{#vigencia.continuada}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrogável sucessivamente por até 10 anos, na forma dos artigos 106 e 107 da Lei n° 14.133, de 2021.

{§} A prorrogação de que trata este item é condicionada ao ateste, pela autoridade competente, de que as condições e os preços permanecem vantajosos para a Administração, permitida a negociação com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{§§} Estar formalmente demonstrado no processo que a forma de prestação dos serviços tem natureza continuada;

{§§} Seja juntado relatório que discorra sobre a execução do contrato, com informações de que os serviços tenham sido prestados regularmente;

{§§} Seja juntada justificativa e motivo, por escrito, de que a Administração mantém interesse na realização do serviço;

{§§} Haja manifestação expressa do CONTRATADO informando o interesse na prorrogação;

{§§} Seja comprovado que o CONTRATADO mantém as condições iniciais de habilitação; e

{§§} Não haja registro no Cadastro Informativo de créditos não quitados do setor público federal (Cadin).

{§} O CONTRATADO não tem direito subjetivo à prorrogação contratual.

{§} A prorrogação de contrato deverá ser promovida mediante celebração de termo aditivo.

{§} Nas eventuais prorrogações contratuais, os custos não renováveis já pagos ou amortizados ao longo do primeiro período de vigência da contratação deverão ser reduzidos ou eliminados como condição para a renovação.

{§} O contrato não poderá ser prorrogado quando o CONTRATADO tiver sido penalizado nas sanções de declaração de inidoneidade ou impedimento de licitar e contratar com poder público, observadas as abrangências de aplicação.{/vigencia.continuada}

%% OU — Nota AGU: contratações emergenciais (art. 75, VIII), seja o objeto de escopo ou continuado; prazo máximo de um ano.
{#vigencia.emergencial}{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, improrrogável, na forma do art. 75, VIII, da Lei n° 14.133/2021.{/vigencia.emergencial}

## CLÁUSULA {§cl} – MODELOS DE EXECUÇÃO E GESTÃO CONTRATUAIS

{§} O regime de execução contratual, os modelos de gestão e de execução, assim como os prazos e condições de conclusão, entrega, observação e recebimento do objeto constam no Termo de Referência, anexo a este Contrato.

%% Nota AGU: matriz de risco (art. 6º, XXVII) obrigatória em obras e serviços de grande vulto e nos regimes de contratação integrada e semi-integrada (art. 22, §3º); nos demais casos, opcional (arts. 22 e 103).
{#matriz_risco}Matriz de risco:

{#matriz_risco.contratante}{§§} Constituem riscos a serem suportados pelo CONTRATANTE:

{*matriz_risco.contratante}{§§§} {.texto}

{/matriz_risco.contratante}{/matriz_risco.contratante}{#matriz_risco.contratado}{§§} Constituem riscos a serem suportados pelo CONTRATADO:

{*matriz_risco.contratado}{§§§} {.texto}

{/matriz_risco.contratado}{/matriz_risco.contratado}{#matriz_risco.compartilhados}{§§} Constituem riscos a serem compartilhados pelas partes, na proporção de {matriz_risco.percentual_contratante} para o CONTRATANTE e {matriz_risco.percentual_contratado} para o CONTRATADO:

{*matriz_risco.compartilhados}{§§§} {.texto}

{/matriz_risco.compartilhados}{/matriz_risco.compartilhados}{/matriz_risco}
## CLÁUSULA {§cl} – SUBCONTRATAÇÃO

{§} As regras sobre a subcontratação do objeto são aquelas estabelecidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – PREÇO

%% Valor mensal com valor total OU só o valor total.
{#valor_mensal}{§} O valor mensal da contratação é de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}{^valor_mensal}{§} O valor total da contratação é de R$ {valor_global} ({valor_global_extenso}).{/valor_mensal}

{§} No valor acima estão incluídas todas as despesas ordinárias diretas e indiretas decorrentes da execução do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenciários, fiscais e comerciais incidentes, taxa de administração, frete, seguro e outros necessários ao cumprimento integral do objeto da contratação.

%% Nota AGU: inserir se o contrato for de valor estimativo, com demanda variável.
{#valor_por_demanda}{§} O valor acima é meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO dependerão dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CLÁUSULA {§cl} - PAGAMENTO

{§} O prazo para pagamento ao CONTRATADO e demais condições a ele referentes encontram-se definidos no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} - REAJUSTE

{§} As regras acerca do reajuste do valor contratual são aquelas definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATANTE

{§} São obrigações do CONTRATANTE:

{§§} Exigir o cumprimento de todas as obrigações assumidas pelo CONTRATADO, de acordo com o contrato e seus anexos;

{§§} Receber o objeto no prazo e condições estabelecidas no Termo de Referência;

{§§} Notificar o CONTRATADO, por escrito, sobre vícios, defeitos incorreções, imperfeições, falhas ou irregularidades verificadas na execução do objeto contratual, fixando prazo para que seja substituído, reparado ou corrigido, total ou parcialmente, às suas expensas, certificando-se de que as soluções por ele propostas sejam as mais adequadas;

{§§} Acompanhar e fiscalizar a execução do contrato e o cumprimento das obrigações pelo CONTRATADO;

{§§} Comunicar a empresa para emissão de Nota Fiscal relativa à parcela incontroversa da execução do objeto, para efeito de liquidação e pagamento, quando houver controvérsia sobre a execução do objeto, quanto à dimensão, qualidade e quantidade, conforme o art. 143 da Lei nº 14.133, de 2021;

{§§} Efetuar o pagamento ao CONTRATADO do valor correspondente à execução do objeto, no prazo, forma e condições estabelecidos no presente Contrato e no Termo de Referência;

{§§} Aplicar ao CONTRATADO as sanções previstas na lei e neste Contrato;

{§§} Não praticar atos de ingerência na administração do CONTRATADO, tais como:

{§§§} indicar pessoas expressamente nominadas para executar direta ou indiretamente o objeto CONTRATADO;

{§§§} fixar salário inferior ao definido em lei ou em ato normativo a ser pago pelo CONTRATADO;

{§§§} estabelecer vínculo de subordinação com funcionário do CONTRATADO;

{§§§} definir forma de pagamento mediante exclusivo reembolso dos salários pagos;

{§§§} demandar a funcionário do CONTRATADO a execução de tarefas fora do escopo do objeto da contratação; e

{§§§} prever exigências que constituam intervenção indevida da Administração na gestão interna do CONTRATADO.

{§§} Cientificar o órgão de representação judicial da Advocacia-Geral da União para adoção das medidas cabíveis quando do descumprimento de obrigações pelo CONTRATADO;

{§§} Explicitamente emitir decisão sobre todas as solicitações e reclamações relacionadas à execução do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelatórios ou de nenhum interesse para a boa execução do ajuste;

%% Nota AGU: dever de decidir (art. 123); sem prazo específico, vale um mês (art. 123, parágrafo único; Decreto 11.246/2022, art. 28).
{§§§} A Administração terá o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorrogação motivada, por igual período.

%% Nota AGU: prazo de resposta ao pedido de reequilíbrio (art. 92, XI); pode ser o mesmo do art. 123.
{§§} Responder eventuais pedidos de reestabelecimento do equilíbrio econômico-financeiro feitos pelo CONTRATADO no prazo máximo de {prazo_reequilibrio};

%% Nota AGU: decorre do art. 137, §4º — só quando houver garantia.
{#garantia}{§§} Notificar os emitentes das garantias quanto ao início de processo administrativo para apuração de descumprimento de cláusulas contratuais;{/garantia}

{§§} Comunicar o CONTRATADO na hipótese de posterior alteração do projeto pelo CONTRATANTE, no caso do art. 93, §2º, da Lei nº 14.133, de 2021;

{§§} Fornecer por escrito as informações necessárias para o desenvolvimento dos serviços objeto do contrato;

{§§} Realizar avaliações periódicas da qualidade dos serviços, após seu recebimento;

{§§} Assegurar que o ambiente de trabalho, inclusive seus equipamentos e instalações, apresentem condições adequadas ao cumprimento, pelo CONTRATADO, das normas de segurança e saúde no trabalho, quando o serviço for executado em suas dependências, ou em local por ela designado;

{§§} Previamente à expedição da ordem de serviço, verificar pendências, liberar áreas e/ou adotar providências cabíveis para a regularidade do início da sua execução.

%% Opcional (vermelho): documentação exigida para o recebimento definitivo da obra.
{#documentos_recebimento}{§§} Exigir do CONTRATADO que providencie a seguinte documentação como condição indispensável para o recebimento definitivo de objeto, quando for o caso:

{§§§} "As built", elaborado pelo responsável por sua execução;

{§§§} Comprovação das ligações definitivas de energia, água, telefone e gás;

{§§§} Laudo de vistoria do corpo de bombeiros aprovando o serviço;

{§§§} Carta "habite-se", emitida pela prefeitura; e

{§§§} Certidão negativa de débitos previdenciários específica para o registro da obra junto ao Cartório de Registro de Imóveis;{/documentos_recebimento}

%% Opcional (vermelho): arquivamento da documentação da obra.
{#arquivar_documentos}{§§} Arquivar, entre outros documentos, de projetos, "as built", especificações técnicas, orçamentos, termos de recebimento, contratos e aditamentos, relatórios de inspeções técnicas após o recebimento do serviço e notificações expedidas.{/arquivar_documentos}

{§} A Administração não responderá por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados à execução do contrato, bem como por qualquer dano causado a terceiros em decorrência de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

%% Nota AGU: obrigações gerais — o órgão verifica quais se aplicam ao objeto (pode incluir, modificar ou excluir, justificando nos autos).
## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATADO

{§} O CONTRATADO deve cumprir todas as obrigações constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execução do objeto, observando, ainda, as obrigações a seguir dispostas:

{§} Atender às determinações regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informação por eles solicitados;

{§} Reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e serviços nos quais se verificarem vícios, defeitos ou incorreções resultantes da execução ou dos materiais empregados;

{§} Responsabilizar-se pelos vícios e danos decorrentes da execução do objeto, bem como por todo e qualquer dano causado à Administração ou terceiros, não reduzindo essa responsabilidade a fiscalização ou o acompanhamento da execução contratual pelo CONTRATANTE, que ficará autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

{§} Quando não for possível a verificação da regularidade no Sistema de Cadastro de Fornecedores – SICAF, o CONTRATADO deverá entregar ao setor responsável pela fiscalização do contrato, até o dia trinta do mês seguinte ao da prestação dos serviços, os seguintes documentos:

{§§} prova de regularidade relativa à Seguridade Social;

{§§} certidão conjunta relativa aos tributos federais e à Dívida Ativa da União;

{§§} certidões que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domicílio ou sede do CONTRATADO;

{§§} Certidão de Regularidade do FGTS – CRF; e

{§§} Certidão Negativa de Débitos Trabalhistas – CNDT.

{§} Responsabilizar-se pelo cumprimento das obrigações previstas em Acordo, Convenção, Dissídio Coletivo de Trabalho ou equivalentes das categorias abrangidas pelo contrato, por todas as obrigações trabalhistas, sociais, previdenciárias, tributárias, fiscais, comerciais e as demais previstas em legislação específica, cuja inadimplência não transfere a responsabilidade ao CONTRATANTE e não poderá onerar o objeto do contrato;

{§} Comunicar ao Fiscal do contrato tempestivamente, observada a urgência da situação, qualquer ocorrência anormal ou acidente que se verifique no local da execução do objeto contratual, não ultrapassando o prazo de 24 (vinte e quatro) horas;

{§} Paralisar, por determinação do CONTRATANTE, qualquer atividade que não esteja sendo executada de acordo com a boa técnica ou que ponha em risco a segurança de pessoas ou bens de terceiros;

{§} Manter, durante toda a vigência do contrato, em compatibilidade com as obrigações assumidas, todas as condições exigidas para habilitação na licitação ou para qualificação na contratação direta;

{§} Cumprir, durante todo o período de execução do contrato, a reserva de cargos prevista em lei para pessoa com deficiência, para reabilitado da Previdência Social ou para aprendiz, bem como as reservas de cargos previstas na legislação;

{§} Comprovar a reserva de cargos a que se refere a cláusula acima, no prazo fixado pelo fiscal do contrato, com a indicação dos empregados que preencheram as referidas vagas;

{§} Guardar sigilo sobre todas as informações obtidas em decorrência do cumprimento do contrato;

{§} Arcar com o ônus decorrente de eventual equívoco no dimensionamento dos quantitativos de sua proposta, inclusive quanto aos custos variáveis decorrentes de fatores futuros e incertos, devendo complementá-los, caso o previsto inicialmente em sua proposta não seja satisfatório para o atendimento do objeto da contratação, exceto quando ocorrer algum dos eventos arrolados no art. 124, II, d, da Lei nº 14.133, de 2021;

{§} Cumprir, além dos postulados legais vigentes de âmbito federal, estadual ou municipal, as normas de segurança do CONTRATANTE;

{§} Alocar os empregados necessários ao perfeito cumprimento das cláusulas deste contrato, com habilitação e conhecimento adequados;

{§} Prestar os serviços dentro dos parâmetros e rotinas estabelecidos;

{§} Fornecer todos os materiais, equipamentos, ferramentas e utensílios demandados, em quantidade, qualidade e tecnologia adequadas, com a observância às recomendações aceitas pela boa técnica, normas e legislação de regência;

{§} Conduzir os trabalhos com estrita observância às normas da legislação pertinente, cumprindo as determinações dos Poderes Públicos, mantendo sempre limpo o local de execução do objeto e nas melhores condições de segurança, higiene e disciplina;

{§} Submeter previamente, por escrito, ao CONTRATANTE, para análise e aprovação, quaisquer mudanças nos métodos executivos que fujam às especificações do memorial descritivo ou instrumento congênere;

{§} Cumprir as normas de proteção ao trabalho, inclusive aquelas relativas à segurança e à saúde no trabalho;

{§} Não submeter os trabalhadores a condições degradantes de trabalho, jornadas exaustivas, servidão por dívida ou trabalhos forçados;

{§} Não permitir a utilização de qualquer trabalho do menor de dezesseis anos de idade, exceto na condição de aprendiz para os maiores de quatorze anos de idade, observada a legislação pertinente;

{§} Não submeter o menor de dezoito anos de idade à realização de trabalho noturno e em condições perigosas e insalubres e à realização de atividades constantes na Lista de Piores Formas de Trabalho Infantil, aprovada pelo Decreto nº 6.481, de 12 de junho de 2008;

{§} Receber e dar o tratamento adequado a denúncias de discriminação, violência e assédio no ambiente de trabalho;

{§} Manter preposto aceito pela Administração no local da obra ou do serviço para representá-lo na execução do contrato;

{§§} A indicação ou a manutenção do preposto da empresa poderá ser recusada pelo órgão ou entidade, desde que devidamente justificada, devendo a empresa designar outro para o exercício da atividade.

{§} Não contratar, durante a vigência do contrato, cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, de dirigente do CONTRATANTE ou de agente público que tenha desempenhado função na licitação ou que atue na fiscalização ou gestão do contrato, nos termos do artigo 48, parágrafo único, da Lei nº 14.133, de 2021;

{§} Prestar todo esclarecimento ou informação solicitada pelo CONTRATANTE ou por seus prepostos, garantindo-lhes o acesso, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos à execução do contrato;

{§} Promover a guarda, manutenção e vigilância de materiais, ferramentas, e tudo o que for necessário à execução do objeto, durante a vigência do contrato;

{§} Assegurar aos seus trabalhadores ambiente de trabalho e instalações em condições adequadas ao cumprimento das normas de saúde, segurança e bem-estar no trabalho;

{§} Fornecer equipamentos de proteção individual (EPI) e equipamentos de proteção coletiva (EPC),quando for o caso;

{§} Garantir o acesso do CONTRATANTE, a qualquer tempo, ao local dos trabalhos, bem como aos documentos relativos à execução do contrato;

{§} Promover a organização técnica e administrativa dos serviços, de modo a conduzi-los eficaz e eficientemente, de acordo com os documentos e especificações que integram o Termo de Referência, no prazo determinado;

{§} Instruir seus empregados quanto à necessidade de acatar as normas internas da Administração;

{§} Instruir seus empregados a respeito das atividades a serem desempenhadas, alertando-os a não executar atividades não abrangidas pelo contrato, devendo o CONTRATADO relatar ao CONTRATANTE toda e qualquer ocorrência neste sentido, a fim de evitar desvio de função;

{§} Efetuar comunicação ao CONTRATANTE, assim que tiver ciência da impossibilidade de realização ou finalização do serviço no prazo estabelecido, para adoção de ações de contingência cabíveis.

%% Nota AGU: serviços de manutenção e assistência técnica → incluir estes itens (art. 47, §2º).
{#manutencao}{§} Realizar os serviços de manutenção e assistência técnica no(s) seguinte(s) local(is) {manutencao.locais};

{§} O técnico deverá se deslocar ao local da repartição, salvo se o CONTRATADO tiver unidade de prestação de serviços em distância de {manutencao.distancia} do local demandado.{/manutencao}

%% Nota AGU: itens para objeto de elaboração de projetos ou serviços técnicos especializados, inclusive software (art. 93, caput).
{#transicao_contratual}{§} Realizar a transição contratual com transferência de conhecimento, tecnologia e técnicas empregadas, sem perda de informações, podendo exigir, inclusive, a capacitação dos técnicos do CONTRATANTE ou da nova empresa que continuará a execução dos serviços;{/transicao_contratual}

%% Cessão de direitos patrimoniais (art. 93, caput); o §2º admite dispensá-la em pesquisa e desenvolvimento (Lei 10.973/2004).
{#cessao_direitos}{§} Ceder ao CONTRATANTE todos os direitos patrimoniais relativos ao objeto contratado, o qual poderá ser livremente utilizado e/ou alterado em outras ocasiões, sem necessidade de nova autorização do CONTRATADO.

%% Nota AGU: projeto de obra imaterial de caráter tecnológico, insuscetível de privilégio (art. 93, §1º).
{#cessao_direitos.obra_imaterial}{§§} Considerando que o projeto contratado se refere a obra imaterial de caráter tecnológico, insuscetível de privilégio, a cessão dos direitos a que se refere o subitem acima inclui o fornecimento de todos os dados, documentos e elementos de informação pertinentes à tecnologia de concepção, desenvolvimento, fixação em suporte físico de qualquer natureza e aplicação da obra.{/cessao_direitos.obra_imaterial}{/cessao_direitos}

{§} Manter os empregados nos horários predeterminados pelo CONTRATANTE;

{§} Apresentar os empregados devidamente identificados por meio de crachá;

{§} Apresentar ao CONTRATANTE, quando for o caso, a relação nominal dos empregados que adentrarão no órgão para a execução do serviço;

{§} Observar os preceitos da legislação sobre a jornada de trabalho, conforme a categoria profissional;

{§} Atender às solicitações do CONTRATANTE quanto à substituição dos empregados alocados, no prazo fixado pela fiscalização do contrato, nos casos em que ficar constatado descumprimento das obrigações relativas à execução do serviço, conforme descrito nas especificações do objeto;

{§} Instruir os seus empregados, quanto à prevenção de incêndios nas áreas do CONTRATANTE;

{§} Adotar as providências e precauções necessárias, inclusive consulta nos respectivos órgãos, se necessário for, a fim de que não venham a ser danificadas as redes hidrossanitárias, elétricas e de comunicação;

%% Nota AGU: o TR define os profissionais e, com isso, os conselhos (em engenharia, normalmente CREA, CAU e CFT).
{§} Estar registrada ou inscrita no Conselho Profissional competente, conforme as áreas de atuação previstas no Termo de Referência, em plena validade;

{§} Obter junto aos órgãos competentes, conforme o caso, as licenças necessárias e demais documentos e autorizações exigíveis, na forma da legislação aplicável;

{§} Elaborar o Diário de Obra, incluindo diariamente, pelo Engenheiro preposto responsável, as informações sobre o andamento do empreendimento, tais como, número de funcionários, de equipamentos, condições de trabalho, condições meteorológicas, serviços executados, registro de ocorrências e outros fatos relacionados, bem como os comunicados à Fiscalização e situação das atividades em relação ao cronograma previsto;

{§} Refazer, às suas expensas, os trabalhos executados em desacordo com o estabelecido nas especificações, bem como substituir aqueles realizados com materiais defeituosos ou com vício de construção, pelo prazo de 05 (cinco) anos, contado da data de emissão do Termo de Recebimento Definitivo;

{§} Utilizar somente matéria-prima florestal procedente, nos termos do artigo 11 do Decreto n° 5.975, de 2006, de:

{§§} manejo florestal, realizado por meio de Plano de Manejo Florestal Sustentável - PMFS devidamente aprovado pelo órgão competente do Sistema Nacional do Meio Ambiente - SISNAMA;

{§§} supressão da vegetação natural, devidamente autorizada pelo órgão competente do Sistema Nacional do Meio Ambiente - SISNAMA;

{§§} florestas plantadas; e

{§§} outras fontes de biomassa florestal, definidas em normas específicas do órgão ambiental competente.

{§} Comprovar a procedência legal dos produtos ou subprodutos florestais utilizados em cada etapa da execução contratual, nos termos do artigo 4°, inciso IX, da Instrução Normativa SLTI/MP n° 1, de 19/01/2010, por ocasião da respectiva medição, mediante a apresentação dos seguintes documentos, conforme o caso:

{§§} Cópias autenticadas das notas fiscais de aquisição dos produtos ou subprodutos florestais;

{§§} Cópia dos Comprovantes de Registro do fornecedor e do transportador dos produtos ou subprodutos florestais junto ao Cadastro Técnico Federal de Atividades Potencialmente Poluidoras ou Utilizadoras de Recursos Ambientais - CTF, mantido pelo IBAMA, quando tal inscrição for obrigatória, acompanhados dos respectivos Certificados de Regularidade válidos, conforme artigo 17, inciso II, da Lei n° 6.938, de 1981, e legislação correlata;

{§§} Documento de Origem Florestal – DOF, instituído pela Portaria n° 253, de 18/08/2006, do Ministério do Meio Ambiente, e Instrução Normativa IBAMA n° 21, de 24/12/2014, quando se tratar de produtos ou subprodutos florestais de origem nativa cujo transporte e armazenamento exijam a emissão de tal licença obrigatória; e

{§§} Caso os produtos ou subprodutos florestais utilizados na execução contratual tenham origem em Estado que possua documento de controle próprio, o CONTRATADO deverá apresentá-lo, em complementação ao DOF, a fim de demonstrar a regularidade do transporte e armazenamento nos limites do território estadual.

{§} Observar as diretrizes, critérios e procedimentos para a gestão dos resíduos da construção civil estabelecidos na Resolução nº 307, de 05/07/2002, com as alterações posteriores, do Conselho Nacional de Meio Ambiente - CONAMA, conforme artigo 4°, §§ 2° e 3°, da Instrução Normativa SLTI/MP n° 1, de 2010, nos seguintes termos:

{§§} O gerenciamento dos resíduos originários da contratação deverá obedecer às diretrizes técnicas e procedimentos do Programa Municipal de Gerenciamento de Resíduos da Construção Civil, ou do Projeto de Gerenciamento de Resíduos da Construção Civil apresentado ao órgão competente, conforme o caso.

{§§} Nos termos dos artigos 3° e 10° da Resolução CONAMA n° 307, de 2002, o CONTRATADO deverá providenciar a destinação ambientalmente adequada dos resíduos da construção civil originários da contratação, obedecendo, no que couber, aos seguintes procedimentos:

{§§§} resíduos Classe A (reutilizáveis ou recicláveis como agregados): deverão ser reutilizados ou reciclados na forma de agregados, ou encaminhados a aterros de resíduos classe A de preservação de material para usos futuros.

{§§§} resíduos Classe B (recicláveis para outras destinações): deverão ser reutilizados, reciclados ou encaminhados a áreas de armazenamento temporário, sendo dispostos de modo a permitir a sua utilização ou reciclagem futura.

{§§§} resíduos Classe C (para os quais não foram desenvolvidas tecnologias ou aplicações economicamente viáveis que permitam a sua reciclagem/recuperação): deverão ser armazenados, transportados e destinados em conformidade com as normas técnicas específicas.

{§§§} resíduos Classe D (perigosos, contaminados ou prejudiciais à saúde): deverão ser armazenados, transportados, reutilizados e destinados em conformidade com as normas técnicas específicas.

{§§} Em nenhuma hipótese o CONTRATADO poderá dispor os resíduos originários da contratação em aterros de resíduos sólidos urbanos, áreas de “bota fora”, encostas, corpos d´água, lotes vagos e áreas protegidas por Lei, bem como em áreas não licenciadas.

{§§} Para fins de fiscalização do fiel cumprimento do Programa Municipal de Gerenciamento de Resíduos da Construção Civil, ou do Projeto de Gerenciamento de Resíduos da Construção Civil, conforme o caso, o CONTRATADO comprovará, sob pena de multa, que todos os resíduos removidos estão acompanhados de Controle de Transporte de Resíduos, em conformidade com as normas da Agência Brasileira de Normas Técnicas - ABNT, ABNT NBR ns. 15.112, 15.113, 15.114, 15.115 e 15.116, de 2004.

{§} Observar as seguintes diretrizes de caráter ambiental:

{§§} Qualquer instalação, equipamento ou processo, situado em local fixo, que libere ou emita matéria para a atmosfera, por emissão pontual ou fugitiva, utilizado na execução contratual, deverá respeitar os limites máximos de emissão de poluentes admitidos na Resolução CONAMA n° 382, de 2006, e legislação correlata, de acordo com o poluente e o tipo de fonte.

{§§} Na execução contratual, conforme o caso, a emissão de ruídos não poderá ultrapassar os níveis considerados aceitáveis pela Norma NBR-10.151 - Avaliação do Ruído em Áreas Habitadas visando o conforto da comunidade, da Associação Brasileira de Normas Técnicas - ABNT, ou aqueles estabelecidos na NBR-10.152 - Níveis de Ruído para conforto acústico, da Associação Brasileira de Normas Técnicas - ABNT, nos termos da Resolução CONAMA n° 01, de 1990, e legislação correlata.

{§} Nos termos do artigo 4°, § 3°, da Instrução Normativa SLTI/MP n° 1, de 2010, deverão ser utilizados, na execução contratual, agregados reciclados, sempre que existir a oferta de tais materiais, capacidade de suprimento e custo inferior em relação aos agregados naturais, inserindo-se na planilha de formação de preços os custos correspondentes.

{§} Responder por qualquer acidente de trabalho na execução dos serviços, por uso indevido de patentes registradas em nome de terceiros, por danos resultantes de defeitos ou incorreções dos serviços ou dos bens do CONTRATANTE, de seus funcionários ou de terceiros, ainda que ocorridos em via pública junto ao serviço de engenharia.

{§} Realizar, conforme o caso, por meio de laboratórios previamente aprovados pela fiscalização e sob suas custas, os testes, ensaios, exames e provas que lhe caibam necessárias ao controle de qualidade dos materiais, serviços e equipamentos a serem aplicados nos trabalhos, conforme procedimento previsto nas especificações.

{§} Providenciar, conforme o caso, as ligações definitivas das utilidades previstas no projeto (água, esgoto, gás, energia elétrica, telefone etc.), bem como atuar junto aos órgãos federais, estaduais e municipais e concessionárias de serviços públicos para a obtenção de licenças e regularização dos serviços e atividades concluídas (ex.: Habite-se, Licença Ambiental de Operação etc.).

%% Nota AGU: incluir se o CONTRATANTE atribuiu ao CONTRATADO a elaboração do projeto executivo.
{#projeto_executivo_contratado}{§} Fornecer os projetos executivos desenvolvidos pelo CONTRATADO, que formarão um conjunto de documentos técnicos, gráficos e descritivos referentes aos segmentos especializados de engenharia, previamente e devidamente compatibilizados, de modo a considerar todas as possíveis interferências capazes de oferecer impedimento total ou parcial, permanente ou temporário, à execução do empreendimento, de maneira a abrangê-la em seu todo, compreendendo a completa caracterização e entendimento de todas as suas especificações técnicas, para posterior execução e implantação do objeto garantindo a plena compreensão das informações prestadas, bem como sua aplicação correta nos trabalhos;

{§§} A elaboração dos projetos executivos deverá partir das soluções desenvolvidas nos anteprojetos constantes neste Termo de Referência e seus anexos (Caderno de Encargos e Especificações Técnicas) e apresentar o detalhamento dos elementos construtivos e especificações técnicas, incorporando as alterações exigidas pelas mútuas interferências entre os diversos projetos.{/projeto_executivo_contratado}

%% Opcional (vermelho): serviços de natureza intelectual → reunião inicial registrada em ata.
{#natureza_intelectual}{§} Em se tratando de atividades que envolvam serviços de natureza intelectual, após a assinatura do contrato, o CONTRATADO deverá participar de reunião inicial, devidamente registrada em Ata, para dar início à execução do serviço, com o esclarecimento das obrigações contratuais, em que estejam presentes os técnicos responsáveis pela elaboração do termo de referência, o gestor do contrato, o fiscal técnico do contrato, o fiscal administrativo do contrato, se houver, os técnicos da área requisitante, o preposto da empresa e os gerentes das áreas que executarão os serviços contratados.{/natureza_intelectual}

%% Nota AGU: cláusula necessária se a contratação envolver, de qualquer forma, tratamento de dados pessoais (LGPD); disposições indicativas, ajustáveis ao objeto.
{#lgpd}## CLÁUSULA {§cl} – OBRIGAÇÕES PERTINENTES À LGPD

{§} As partes deverão cumprir a Lei nº 13.709, de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em razão do certame ou do contrato administrativo que eventualmente venha a ser firmado, a partir da apresentação da proposta no procedimento de contratação, independentemente de declaração ou de aceitação expressa.

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

{§} Os contratos e convênios de que trata o § 1º do art. 26 da LGPD deverão ser comunicados à autoridade nacional.

{/lgpd}## CLÁUSULA {§cl} – GARANTIA DE EXECUÇÃO

%% Nota AGU: exigir ou não a garantia é critério da Administração (salvo norma que a obrigue); não exigindo, justificar nos autos (ETP e riscos).
{^garantia}{§} Não haverá exigência de garantia contratual da execução.{/garantia}{#garantia}{§} Será exigida a prestação de garantia na presente contratação, conforme regras constantes do Termo de Referência.{/garantia}

## CLÁUSULA {§cl} – INFRAÇÕES E SANÇÕES ADMINISTRATIVAS

{§} As regras acerca de infrações e sanções administrativas referentes à execução do contrato são aquelas definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – DA EXTINÇÃO CONTRATUAL

%% Contratos de escopo (art. 105).
{#vigencia.escopo}{§} O contrato será extinto quando cumpridas as obrigações de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto.

{§} Se as obrigações não forem cumpridas no prazo estipulado, a vigência ficará prorrogada até a conclusão do objeto, caso em que deverá a Administração providenciar a readequação do cronograma fixado para o contrato.

{§} Quando a não conclusão do contrato referida no item anterior decorrer de culpa do CONTRATADO:

{§§} ficará ele constituído em mora, sendo-lhe aplicáveis as respectivas sanções administrativas; e

{§§} poderá a Administração optar pela extinção do contrato e, nesse caso, adotará as medidas admitidas em lei para a continuidade da execução contratual.{/vigencia.escopo}

%% OU — Nota AGU: contratos contínuos (art. 106); extinção antecipada conforme art. 106, III e §1º, e ON AGU nº 98/2025.
{#vigencia.continuada}{§} O contrato será extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.

{§} O contrato poderá ser extinto antes do prazo nele fixado, sem ônus para o CONTRATANTE, mediante justificativa formal de que não dispõe de créditos orçamentários para sua continuidade ou de que o contrato não mais lhe oferece vantagem.

{§§} Nesse caso, a extinção antecipada ocorrerá na próxima data de aniversário do contrato, garantido um prazo mínimo de dois meses para ciência formal do contratado, devendo ser observada a regra do art. 183 da Lei nº 14.133, de 2021 para a contagem deste prazo.

{§} O contrato poderá ser extinto com fundamento na ausência de créditos orçamentários ou na perda de vantagem contratual antes da data de aniversário, desde que ocorra com ônus para o CONTRATANTE, conforme previsto no art. 138, §2º, da Lei nº 14.133, de 2021.{/vigencia.continuada}

%% OU — Nota AGU: contratos decorrentes da dispensa do art. 75, VIII.
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

{§} O CONTRATADO é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato, e, no caso de reforma de edifício ou de equipamento, o limite para os acréscimos será de 50% (cinquenta por cento).

%% Nota AGU: Parecer 61/2024/DECOR/CGU — supressão consensual acima de 25% é possível, fundamentada.
{§} As supressões resultantes de acordo celebrado entre as partes contratantes poderão exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{§} As alterações contratuais deverão ser promovidas mediante celebração de termo aditivo, submetido à prévia aprovação da consultoria jurídica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipação de seus efeitos, hipótese em que a formalização do aditivo deverá ocorrer no prazo máximo de 1 (um) mês.

{§} Registros que não caracterizam alteração do contrato podem ser realizados por simples apostila, dispensada a celebração de termo aditivo, na forma do art. 136 da Lei nº 14.133, de 2021.

## CLÁUSULA {§cl} – DOTAÇÃO ORÇAMENTÁRIA

%% Os itens abaixo são numerados I) a VI) no modelo (lista automática do Word); o motor não tem numeração romana.
{§} As despesas decorrentes da presente contratação correrão à conta de recursos específicos consignados no Orçamento Geral da União deste exercício, na dotação abaixo discriminada:

> Gestão/unidade: {cfc.uasg};
> Fonte de recursos: {dotacao.fonte};
> Programa de trabalho: {dotacao.projeto};
> Elemento de despesa: {dotacao.conta}; e
> Plano interno: {dotacao.plano_interno}; e
> Nota de empenho: {dotacao.empenho};

%% Nota AGU: art. 106, II — contratos continuados: atestar créditos no início de cada exercício.
{#vigencia.continuada}{§} A dotação relativa aos exercícios financeiros subsequentes será indicada após aprovação da Lei Orçamentária respectiva e liberação dos créditos correspondentes, mediante apostilamento.{/vigencia.continuada}

%% Nota AGU: TCU, Acórdão 2569/2018-Plenário — CDC aplicável à Administração como destinatária final.
## CLÁUSULA {§cl} – DOS CASOS OMISSOS

{§} Os casos omissos serão decididos pelo CONTRATANTE, segundo as disposições contidas na Lei nº 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei nº 8.078, de 1990 – Código de Defesa do Consumidor – e normas e princípios gerais dos contratos.

## CLÁUSULA {§cl} – PUBLICAÇÃO

{§} Incumbirá ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contratações Públicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo sítio oficial na Internet, em atenção ao art. 91, caput, da Lei n.º 14.133, de 2021, e ao art. 8º, §2º, da Lei n. 12.527, de 2011, c/c art. 7º, §3º, inciso V, do Decreto n. 7.724, de 2012.

## CLÁUSULA {§cl}– FORO

{§} Fica eleito o Foro da Justiça Federal em Brasília, Seção Judiciária do Distrito Federal para dirimir os litígios que decorrerem da execução deste Termo de Contrato que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei nº 14.133, de 2021.

%% Local e data (vermelho): opcional — no SEI a data sai da assinatura eletrônica.
{#local_data}> {local_data}{/local_data}

%% Nota AGU: a assinatura no SEI não dispensa as testemunhas (CPC, art. 784, §4º; Nota 13/2021/DECOR/CGU) — recomenda-se duas.
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
