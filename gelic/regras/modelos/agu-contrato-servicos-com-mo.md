@requer regime=14133
@fonte agu-contrato-servicos-com-mo
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
%% Termo de contrato de serviços contínuos com regime de dedicação exclusiva de mão de obra, versão dez/2025. Uso no CFC: contrato decorrente de LICITAÇÃO (pregão eletrônico ou concorrência). Contratação direta (inclusive emergencial, art. 75, VIII) usa o modelo da Projur (contrato-servicos).
@padrao autoridade=autoridades.vp_gestao
@cabecalho

# TERMO DE CONTRATO

> (Processo Administrativo n° {processo})

%% Ementa: o preto do modelo diz "A UNIÃO, POR INTERMÉDIO DO (A)"; o CFC é autarquia e é ele a parte (exceção de fidelidade).
::: CONTRATO ADMINISTRATIVO Nº {contrato.numero}, QUE FAZEM ENTRE SI O {cfc.nome|maiusculas} E A EMPRESA {contratada.razao_social|maiusculas}.

%% Nota AGU (Parecer 00004/2022/CNMLC/CGU/AGU — LGPD): não constam números de documentos pessoais; a autoridade é identificada pela matrícula funcional e o representante da contratada só pelo nome.
%% Nota AGU: "União" só para a Administração Direta; autarquia/fundação põe o próprio nome — no CFC, a alternativa vermelha "[Autarquia XXXXX]" (mantém o "A" preto).
%% Alternativa vermelha da modalidade: [Pregão Eletrônico] OU [Concorrência] (Dispensa/Inexigibilidade → template Projur contrato-servicos).
%% O trecho do ato de nomeação (Portaria, DOU, matrícula) só sai se os dados trouxerem "nomeacao".
A Autarquia {cfc.nome}, por intermédio do(a) {cfc.setor_licitacoes}, com sede no(a) {cfc.sede}, na cidade de {cfc.cidade}, inscrito(a) no CNPJ sob o nº {cfc.cnpj}, neste ato representado(a) pelo(a) {autoridade.cargo}, {autoridade.nome}{#nomeacao}, nomeado(a) pela Portaria nº {nomeacao.portaria}, de {nomeacao.data}, publicada no DOU de {nomeacao.dou}, portador da Matrícula Funcional nº {nomeacao.matricula}{/nomeacao}, doravante denominado CONTRATANTE, e o(a) {contratada.razao_social}, inscrito(a) no CNPJ/MF sob o nº {contratada.cnpj}, sediado(a) na {contratada.endereco}, na cidade de {contratada.cidade}, doravante designado CONTRATADO, neste ato representado(a) por {representante.nome}, {representante.funcao}, conforme {^representante.por_procuracao}atos constitutivos da empresa{/representante.por_procuracao}{#representante.por_procuracao}procuração apresentada nos autos{/representante.por_procuracao}, tendo em vista o que consta no Processo nº {processo} e em observância às disposições da Lei nº 14.133, de 1º de abril de 2021, e demais legislação aplicável, resolvem celebrar o presente Termo de Contrato, decorrente do(a) {#licitacao.concorrencia}Concorrência{/licitacao.concorrencia}{^licitacao.concorrencia}Pregão Eletrônico{/licitacao.concorrencia} nº {licitacao.numero}, mediante as cláusulas e condições a seguir enunciadas.

## CLÁUSULA {§cl} – OBJETO

{§} O objeto do presente instrumento é a contratação de serviços contínuos de {objeto_servico}, a serem executados com regime de dedicação exclusiva de mão de obra, nas condições estabelecidas no Termo de Referência.

{§} Objeto da contratação:

%% Nota AGU: a tabela é meramente ilustrativa, devendo ser ajustada conforme o caso concreto.
| ITEM | ESPECIFICAÇÃO | CATSER | UNIDADE DE MEDIDA | QUANTIDADE | VALOR UNITÁRIO | VALOR TOTAL |
|---|---|---|---|---|---|---|
{*itens}| {.item} | {.especificacao} | {.codigo} | {.unidade} | {.quantidade} | R$ {.valor_unitario} | R$ {.valor_total} |
{/itens}
{§} Vinculam esta contratação, independentemente de transcrição:

{§§} O Termo de Referência;

%% Modelo: [O Edital da Licitação] OU [A Autorização de Contratação Direta] OU [O Aviso de Dispensa Eletrônica] — este template só atende contrato decorrente de licitação.
{§§} O Edital da Licitação;

{§§} A Proposta do CONTRATADO;

{§§} Eventuais anexos dos documentos supracitados.

## CLÁUSULA {§cl} – VIGÊNCIA E PRORROGAÇÃO

%% Nota AGU: as disposições decorrem dos arts. 106 e 107 da Lei 14.133 e da IN SEGES/MP 5/2017 (aplicação autorizada pela IN SEGES/ME 98/2022).
%% A alternativa do modelo para contratação emergencial (art. 75, VIII — vigência improrrogável de até um ano) não se aplica a contrato decorrente de licitação.
{§} O prazo de vigência da contratação é de {vigencia.prazo} contados {vigencia.termo_inicial}, prorrogável sucessivamente por até 10 anos, na forma dos artigos 106 e 107 da Lei n° 14.133, de 2021.

{§} A prorrogação de que trata este item é condicionada ao ateste, pela autoridade competente, de que as condições e os preços permanecem vantajosos para a Administração, permitida a negociação com o CONTRATADO, atentando, ainda, para o cumprimento dos seguintes requisitos:

{§§} Estar formalmente demonstrado no processo que a forma de prestação dos serviços tem natureza continuada;

{§§} Seja juntado relatório que discorra sobre a execução do contrato, com informações de que os serviços tenham sido prestados regularmente;

{§§} Seja juntada justificativa e motivo, por escrito, de que a Administração mantém interesse na realização do serviço;

{§§} Haja manifestação expressa do CONTRATADO informando o interesse na prorrogação;

{§§} Seja comprovado que o CONTRATADO mantém as condições iniciais de habilitação; e

%% Nota AGU: Lei 10.522/2002, art. 6º-A (Lei 14.973/2024) — registro no Cadin impede o aditamento dos contratos firmados a partir de 16/09/2024 (Parecer 00063/2024/DECOR/CGU/AGU).
{§§} Não haja registro no Cadastro Informativo de créditos não quitados do setor público federal (Cadin).

{§} O CONTRATADO não tem direito subjetivo à prorrogação contratual.

{§} A prorrogação de contrato deverá ser promovida mediante celebração de termo aditivo.

{§} Nas eventuais prorrogações contratuais, os custos não renováveis já pagos ou amortizados ao longo do primeiro período de vigência da contratação deverão ser reduzidos ou eliminados como condição para a renovação.

{§} O contrato não poderá ser prorrogado quando o CONTRATADO tiver sido penalizado nas sanções de declaração de inidoneidade ou impedimento de licitar e contratar com poder público, observadas as abrangências de aplicação.

{§} Sujeitando-se o CONTRATADO ao regime de incidência não-cumulativa de PIS e COFINS, a comprovação das alíquotas médias efetivas de recolhimento deverá ser feita no momento da prorrogação contratual ou da repactuação de preços, a fim de que sejam promovidos os ajustes necessários decorrentes das oscilações dos custos efetivos dessas contribuições.

## CLÁUSULA {§cl} – MODELOS DE EXECUÇÃO E GESTÃO CONTRATUAIS

{§} O regime de execução contratual, os modelos de gestão e de execução, assim como os prazos e condições de conclusão, entrega, observação e recebimento do objeto constam no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – SUBCONTRATAÇÃO

{§} As regras sobre a subcontratação do objeto são aquelas estabelecidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – PREÇO

{§} O valor mensal da contratação é de R$ {valor_mensal} ({valor_mensal_extenso}), perfazendo o valor total de R$ {valor_global} ({valor_global_extenso}).

{§} No valor acima estão incluídas todas as despesas ordinárias diretas e indiretas decorrentes da execução do objeto, inclusive tributos e/ou impostos, encargos sociais, trabalhistas, previdenciários, fiscais e comerciais incidentes, taxa de administração, frete, seguro e outros necessários ao cumprimento integral do objeto da contratação.

%% Nota AGU: contrato de valor estimativo, em que a própria demanda é variável → incluir o subitem abaixo.
{#valor_por_demanda}{§} O valor acima é meramente estimativo, de forma que os pagamentos devidos ao CONTRATADO dependerão dos quantitativos efetivamente fornecidos.{/valor_por_demanda}

## CLÁUSULA {§cl} - PAGAMENTO

{§} O prazo para pagamento ao CONTRATADO e demais condições a ele referentes, inclusive quanto à utilização da Conta-Depósito Vinculada - bloqueada para movimentação ou do Pagamento pelo Fato Gerador, encontram-se definidos no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} - REPACTUAÇÃO DOS PREÇOS CONTRATADOS

{§} As regras acerca da repactuação dos preços contratados são aquelas definidas no Termo de Referência, anexo a este Contrato.

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

{§§§} indicar pessoas expressamente nominadas para executar direta ou indiretamente o objeto contratado;

{§§§} fixar salário inferior ao definido em lei ou em ato normativo a ser pago pelo CONTRATADO;

{§§§} estabelecer vínculo de subordinação com funcionário do CONTRATADO;

{§§§} definir forma de pagamento mediante exclusivo reembolso dos salários pagos;

{§§§} demandar a funcionário do CONTRATADO a execução de tarefas fora do escopo do objeto da contratação; e

{§§§} prever exigências que constituam intervenção indevida da Administração na gestão interna do CONTRATADO.

{§§} Cientificar o órgão de representação judicial da Advocacia-Geral da União para adoção das medidas cabíveis quando do descumprimento de obrigações pelo CONTRATADO;

{§§} Explicitamente emitir decisão sobre todas as solicitações e reclamações relacionadas à execução do presente Contrato, ressalvados os requerimentos manifestamente impertinentes, meramente protelatórios ou de nenhum interesse para a boa execução do ajuste;

%% Nota AGU: art. 123 da Lei 14.133 — dever de decidir; sem prazo especificado, vale um mês (art. 123, parágrafo único, e art. 28 do Decreto 11.246/2022).
{§§§} A Administração terá o prazo de {prazo_decisao}, a contar da data do protocolo do requerimento para decidir, admitida a prorrogação motivada, por igual período.

%% Nota AGU: art. 92, XI — prazo de resposta ao pedido de reequilíbrio; a lei não o fixa, pode-se adotar o mesmo prazo do art. 123.
{§§} Responder eventuais pedidos de reestabelecimento do equilíbrio econômico-financeiro feitos pelo CONTRATADO no prazo máximo de {prazo_reequilibrio};

%% Nota AGU: decorre do art. 137, § 4º, da Lei 14.133 (só cabe quando há garantia).
{#garantia}{§§} Notificar os emitentes das garantias quanto ao início de processo administrativo para apuração de descumprimento de cláusulas contratuais;{/garantia}

{§§} Comunicar o CONTRATADO na hipótese de posterior alteração do projeto pelo CONTRATANTE, no caso do art. 93, §2º, da Lei nº 14.133, de 2021.

{§} A Administração não responderá por quaisquer compromissos assumidos pelo CONTRATADO com terceiros, ainda que vinculados à execução do contrato, bem como por qualquer dano causado a terceiros em decorrência de ato do CONTRATADO, de seus empregados, prepostos ou subordinados.

## CLÁUSULA {§cl} - OBRIGAÇÕES DO CONTRATADO

%% Nota AGU: obrigações gerais; o órgão verifica as peculiaridades do objeto para incluir, modificar ou excluir itens. Cada vício tem prazo de correção próprio, fixado pelo fiscal.
{§} O CONTRATADO deve cumprir todas as obrigações constantes deste Contrato e de seus anexos, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execução do objeto, observando, ainda, as obrigações a seguir dispostas:

{§} Atender às determinações regulares emitidas pelo fiscal ou gestor do contrato ou autoridade superior e prestar todo esclarecimento ou informação por eles solicitados;

{§} Reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no total ou em parte, no prazo fixado pelo fiscal do contrato, os bens e serviços nos quais se verificarem vícios, defeitos ou incorreções resultantes da execução ou dos materiais empregados;

{§} Responsabilizar-se pelos vícios e danos decorrentes da execução do objeto, bem como por todo e qualquer dano causado à Administração ou terceiros, não reduzindo essa responsabilidade a fiscalização ou o acompanhamento da execução contratual pelo CONTRATANTE, que ficará autorizado a descontar dos pagamentos devidos ou da garantia, caso exigida, o valor correspondente aos danos sofridos;

%% Nota AGU: a regularidade fiscal considera a natureza da atividade (em regra ISSQN municipal; ICMS em transporte interestadual/intermunicipal e comunicação).
{§} Quando não for possível a verificação da regularidade no Sistema de Cadastro de Fornecedores – SICAF, o CONTRATADO deverá entregar ao setor responsável pela fiscalização do contrato, até o dia trinta do mês seguinte ao da prestação dos serviços, os seguintes documentos:

{§§} prova de regularidade relativa à Seguridade Social;

{§§} certidão conjunta relativa aos tributos federais e à Dívida Ativa da União;

{§§} certidões que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domicílio ou sede do CONTRATADO;

{§§} Certidão de Regularidade do FGTS – CRF; e

{§§} Certidão Negativa de Débitos Trabalhistas – CNDT.

{§} Responsabilizar-se pelo cumprimento das obrigações previstas em Acordo, Convenção, Dissídio Coletivo de Trabalho ou equivalentes das categorias abrangidas pelo contrato, por todas as obrigações trabalhistas, sociais, previdenciárias, tributárias, fiscais, comerciais e as demais previstas em legislação específica, cuja inadimplência não transfere a responsabilidade ao CONTRATANTE e não poderá onerar o objeto do contrato;

{§} Comunicar ao Fiscal do contrato tempestivamente, observada a urgência da situação, qualquer ocorrência anormal ou acidente que se verifique no local da execução do objeto contratual, não ultrapassando o prazo de 24 (vinte e quatro) horas;

{§} Paralisar, por determinação do CONTRATANTE, qualquer atividade que não esteja sendo executada de acordo com a boa técnica ou que ponha em risco a segurança de pessoas ou bens de terceiros;

{§} Manter durante toda a vigência do contrato, em compatibilidade com as obrigações assumidas, todas as condições exigidas para habilitação na licitação ou para qualificação na contratação direta;

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

{§} Vedar a utilização, na execução dos serviços, de empregado que seja familiar de agente público ocupante de cargo em comissão ou função de confiança no órgão contratante, nos termos do artigo 7° do Decreto n° 7.203, de 2010;

{§} Disponibilizar ao CONTRATANTE os empregados devidamente uniformizados e identificados por meio de crachá, além de provê-los com os Equipamentos de Proteção Individual - EPI, quando for o caso;

{§} Fornecer os uniformes a serem utilizados por seus empregados, conforme disposto no Termo de Referência, sem repassar quaisquer custos a estes;

{§} Apresentar relação mensal dos empregados que expressamente optarem por não receber o vale-transporte;

{§} Efetuar o pagamento dos salários dos empregados alocados na execução contratual mediante depósito na conta bancária de titularidade do trabalhador, em agência situada na localidade ou região metropolitana em que ocorre a prestação dos serviços, de modo a possibilitar a conferência do pagamento por parte do CONTRATANTE. Em caso de impossibilidade de cumprimento desta disposição, o CONTRATADO deverá apresentar justificativa, a fim de que a Administração analise sua plausibilidade e possa verificar a realização do pagamento.

{§} Autorizar o CONTRATANTE, no momento da assinatura do contrato, a fazer o desconto nas faturas e realizar os pagamentos dos salários e demais verbas trabalhistas diretamente aos trabalhadores, bem como das contribuições previdenciárias e do FGTS, quando não demonstrado o cumprimento tempestivo e regular dessas obrigações, até o momento da regularização, sem prejuízo das sanções cabíveis;

{§} Não permitir que o empregado designado para trabalhar em um turno preste seus serviços no turno imediatamente subsequente;

{§} Realizar o planejamento das férias dos colaboradores terceirizados, desde o início do contrato administrativo, a fim de viabilizar a previsibilidade das férias, estabelecida no inciso I do art. 3º do Decreto n.º 12.174, de 11 de setembro de 2024, e permitir o acompanhamento pela fiscalização do contrato, observando integralmente o disposto na Instrução Normativa Seges/MGI nº 213, de 29 de maio de 2025;

{§} Desenvolver e implementar políticas institucionais de enfrentamento do assédio e da discriminação em suas relações de trabalho e na sua gestão, observando as diretrizes estabelecidas na Portaria MGI nº 6.719, de 13 de setembro de 2024, e promovendo práticas respeitosas e humanizadas no ambiente laboral;

{§} Implementar ações de formação e capacitação para todas as suas empregadas e empregados sobre prevenção e combate ao assédio moral, sexual e à discriminação, garantindo ambiente de trabalho seguro e respeitoso;

{§} Estabelecer canais de denúncia e procedimentos claros para recebimento, apuração e tratamento de casos de assédio e discriminação, assegurando a proteção dos denunciantes contra retaliações;

{§} Promover a divulgação das políticas de combate ao assédio e discriminação para todos os trabalhadores alocados na execução contratual, mediante campanhas educativas e informativos específicos;

{§} Apresentar ao CONTRATANTE, quando solicitado, relatórios sobre as medidas adotadas e os resultados alcançados na implementação das políticas de enfrentamento ao assédio e discriminação;

{§} Comunicar ao CONTRATANTE, no prazo máximo de 48 (quarenta e oito) horas, qualquer ocorrência de assédio ou discriminação envolvendo trabalhadores alocados na execução contratual, informando as medidas adotadas para apuração e correção;

{§} Garantir que as políticas de combate ao assédio e discriminação sejam extensivas a eventuais subcontratados, quando permitida a subcontratação.

{§} Atender às solicitações do CONTRATANTE quanto à substituição dos empregados alocados, no prazo fixado pelo fiscal do contrato, nos casos em que ficar constatado descumprimento das obrigações relativas à execução do serviço, conforme descrito neste Termo de Referência;

{§} Instruir seus empregados, no início da execução contratual, quanto à obtenção das informações de seus interesses junto aos órgãos públicos, relativas ao contrato de trabalho e obrigações a ele inerentes, adotando, entre outras, as seguintes medidas:

{§} Viabilizar o acesso de seus empregados, via internet, por meio de senha própria, aos sistemas da Previdência Social e da Receita do Brasil, com o objetivo de verificar se as suas contribuições previdenciárias foram recolhidas, no prazo máximo de 60 (sessenta) dias, contados do início da prestação dos serviços ou da admissão do empregado;

{§} Viabilizar a emissão do cartão cidadão pela Caixa Econômica Federal para todos os empregados, no prazo máximo de 60 (sessenta) dias, contados do início da prestação dos serviços ou da admissão do empregado;

{§} Oferecer todos os meios necessários aos seus empregados para a obtenção de extratos de recolhimentos de seus direitos sociais, preferencialmente por meio eletrônico, quando disponível.

{§} Não se beneficiar da condição de optante pelo Simples Nacional, salvo quando se tratar das exceções previstas no § 5º-C do art. 18 da Lei Complementar nº 123, de 14 de dezembro de 2006;

{§§} Comunicar formalmente à Receita Federal a assinatura do contrato de prestação de serviços mediante cessão de mão de obra, para fins de exclusão obrigatória do Simples Nacional, a contar do mês seguinte ao da contratação, conforme previsão do art.17, XII, art. 30, §1º, II, e do art. 31, II, todos da Lei Complementar nº 123/2006, salvo quando se tratar das exceções previstas no § 5º-C do art. 18 do mesmo diploma legal;

{§§} Para efeito de comprovação da comunicação, o CONTRATADO deverá apresentar cópia do ofício enviado à Receita Federal do Brasil, com comprovante de entrega e recebimento, comunicando a assinatura do contrato de prestação de serviços mediante cessão de mão de obra, até o último dia útil do mês subsequente ao da ocorrência da situação de vedação.

%% Nota AGU: serviços de manutenção e assistência técnica → incluir os dois itens abaixo (art. 47, § 2º, da Lei 14.133).
{#manutencao}{§} Realizar os serviços de manutenção e assistência técnica no(s) seguinte(s) local(is) {manutencao.locais};

{§} O técnico deverá se deslocar ao local da repartição, salvo se o CONTRATADO tiver unidade de prestação de serviços em distância de {manutencao.distancia} do local demandado.{/manutencao}

%% Nota AGU (art. 93): projetos ou serviços técnicos especializados, inclusive software → transição contratual e cessão dos direitos patrimoniais; o § 2º do art. 93 admite dispensar a cessão em pesquisa e desenvolvimento (Lei 10.973/2004); o subitem da obra imaterial de caráter tecnológico, insuscetível de privilégio, vem do art. 93, § 1º.
{#transicao_contratual}{§} Realizar a transição contratual com transferência de conhecimento, tecnologia e técnicas empregadas, sem perda de informações, podendo exigir, inclusive, a capacitação dos técnicos do CONTRATANTE ou da nova empresa que continuará a execução dos serviços;{/transicao_contratual}

{#cessao_direitos}{§} Ceder ao CONTRATANTE todos os direitos patrimoniais relativos ao objeto contratado, o qual poderá ser livremente utilizado e/ou alterado em outras ocasiões, sem necessidade de nova autorização do CONTRATADO.

{#cessao_direitos.obra_imaterial}{§§} Considerando que o projeto contratado se refere a obra imaterial de caráter tecnológico, insuscetível de privilégio, a cessão dos direitos a que se refere o subitem acima inclui o fornecimento de todos os dados, documentos e elementos de informação pertinentes à tecnologia de concepção, desenvolvimento, fixação em suporte físico de qualquer natureza e aplicação da obra.{/cessao_direitos.obra_imaterial}{/cessao_direitos}

%% Nota AGU (Decreto 11.430/2023): reserva de vagas para mulheres vítimas de violência doméstica — 8% com 25 ou mais colaboradores; abaixo de 25, percentual inferior admitido (art. 3º, § 1º-A). É obrigação contratual (não requisito de habilitação), só para novas contratações; sem mulheres elegíveis a empresa contrata livremente, mas consulta a Administração a cada desligamento.
{#reserva_mulheres}{^reserva_mulheres.inferior_25}{§} Nos casos em que haja um número mínimo de vinte e cinco colaboradores alocados no contrato, destinar 8% das vagas exclusivamente para mulheres vítimas de violência doméstica;{/reserva_mulheres.inferior_25}{#reserva_mulheres.inferior_25}{§} Considerando que se trata de contrato com número inferior a vinte e cinco colaboradores, a previsão do percentual para o emprego de mão de obra constituída por mulheres vítimas de violência doméstica será de {reserva_mulheres.percentual}%{/reserva_mulheres.inferior_25}

{§§} As vagas serão destinadas às mulheres indicadas pelas unidades responsáveis pela política pública, signatárias do acordo de adesão de que trata o art. 4º do Decreto nº 11.430, de 2023, vedada a exigência, pelas empresas contratadas e pelos órgãos contratantes, de apresentação, pelas candidatas, de quaisquer outros documentos para fins de comprovação da situação de violência.

{§§} Sempre que houver um desligamento, o CONTRATADO deverá buscar atender ao percentual mínimo de {reserva_mulheres.percentual}% com a nova contratação.

{§§@mulheres_nao_elegiveis} Se não houver mulheres elegíveis em número suficiente para preencher as vagas reservadas, a empresa poderá contratar livremente.

{§§} Para cálculo do percentual de vagas reservadas serão considerados todos os empregados alocados no contrato, incluindo folguistas e substitutos.

{§§} O percentual de mão-de-obra de que trata este item deverá ser mantido durante toda a execução contratual, ressalvado o subitem {§ref@mulheres_nao_elegiveis}.

{§§} O CONTRATADO deve manter o sigilo da condição de violência doméstica da profissional que será alocada para a prestação do serviço.{/reserva_mulheres}

%% Nota AGU (STF, Tema 1118): capital social integralizado compatível com o número de empregados (art. 4º-B da Lei 6.019/1974), mantido durante toda a vigência. Vigilância e transporte de valores → segunda redação (art. 14 da Lei 14.967/2024, Estatuto da Segurança Privada).
{^seguranca_privada}{§} Manter, durante toda a vigência do contrato, capital social integralizado compatível com o número de empregados, na forma do art. 4º-B da Lei nº 6.019/1974, apresentando, quando solicitada, a respectiva documentação comprobatória, no prazo fixado pela fiscalização contratual.{/seguranca_privada}{#seguranca_privada}{§} Manter, durante toda a vigência do contrato, capital social mínimo integralizado de acordo com os valores estipulados no art. 14 da Lei n.º 14.967/2024, apresentando, quando solicitada, a respectiva documentação comprobatória, no prazo fixado pela fiscalização contratual.{/seguranca_privada}

## CLAÚSULA {§cl} - DA COMPENSAÇÃO DA JORNADA DE TRABALHO

{§} A compensação de jornada dos trabalhadores do CONTRATADO alocados à execução contratual em regime de dedicação exclusiva, quando compatível com a natureza dos serviços prestados, será realizada de acordo com as regras constantes do Decreto n.º 12.174, de 11 de setembro de 2024, da Instrução Normativa SEGES/MGI nº 81, de 12 de setembro de 2024, e do Termo de Referência, anexo a este Contrato.

%% Nota AGU: cláusula necessária se a contratação envolver, de qualquer forma, tratamento de dados pessoais (Lei 13.709/2018); disposições indicativas, ajustáveis ao objeto. Admite declaração de capacitação dos empregados (Parecer 00004/2022/CNMLC/CGU/AGU); transferência internacional de dados → cláusulas-padrão da Resolução CD/ANPD 19/2024 como anexo.
{#lgpd}## CLÁUSULA {§cl}- OBRIGAÇÕES PERTINENTES À LGPD

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

%% Nota AGU: exigir ou não a garantia fica a critério da Administração (salvo norma que a torne obrigatória); exigindo, prever no edital e no contrato; não exigindo, justificar nos autos com base no ETP e na análise de riscos.
{^garantia}{§} Não haverá exigência de garantia contratual da execução.{/garantia}{#garantia}{§} Será exigida a prestação de garantia na presente contratação, conforme regras constantes do Termo de Referência.{/garantia}

## CLÁUSULA {§cl} – INFRAÇÕES E SANÇÕES ADMINISTRATIVAS

{§} As regras acerca de infrações e sanções administrativas referentes à execução do contrato são aquelas definidas no Termo de Referência, anexo a este Contrato.

## CLÁUSULA {§cl} – DA EXTINÇÃO CONTRATUAL

%% Nota AGU: redação para contratos contínuos (art. 106). A alternativa do modelo para a dispensa emergencial (art. 75, VIII) não se aplica a contrato decorrente de licitação.
{§} O contrato será extinto quando vencido o prazo nele estipulado, independentemente de terem sido cumpridas ou não as obrigações de ambas as partes contraentes.

%% Nota AGU: sistemática do art. 106, III e § 1º, conforme a Orientação Normativa AGU nº 98/2025 — extinção sem ônus na data de aniversário com ciência mínima de dois meses; antes disso, só com ônus (art. 138, § 2º).
{§} O contrato poderá ser extinto antes do prazo nele fixado, sem ônus para o CONTRATANTE, mediante justificativa formal de que não dispõe de créditos orçamentários para sua continuidade ou de que o contrato não mais lhe oferece vantagem.

{§§} Nesse caso, a extinção antecipada ocorrerá na próxima data de aniversário do contrato, garantido um prazo mínimo de dois meses para ciência formal do contratado, devendo ser observada a regra do art. 183 da Lei nº 14.133, de 2021 para a contagem deste prazo.

{§} O contrato poderá ser extinto com fundamento na ausência de créditos orçamentários ou na perda de vantagem contratual antes da data de aniversário, desde que ocorra com ônus para o CONTRATANTE, conforme previsto no art. 138, §2º, da Lei nº 14.133, de 2021.

{§} O contrato poderá ser extinto antes de cumpridas as obrigações nele estipuladas, ou antes do prazo nele fixado, por algum dos motivos previstos no artigo 137 da Lei nº 14.133, de 2021, bem como amigavelmente, assegurados o contraditório e a ampla defesa.

{§} Nesta hipótese, aplicam-se também os artigos 138 e 139 da mesma Lei.

{§} A alteração social ou a modificação da finalidade ou da estrutura da empresa não ensejará a extinção se não restringir sua capacidade de concluir o contrato.

{§} Se a operação implicar mudança da pessoa jurídica contratada, deverá ser formalizado termo aditivo para alteração subjetiva.

{§} O termo de extinção, sempre que possível, será precedido:

{§§} Do balanço dos eventos contratuais já cumpridos ou parcialmente cumpridos;

{§§} Da relação dos pagamentos já efetuados e ainda devidos;

{§§} Das indenizações e multas.

{§} A extinção do contrato não configura óbice para o reconhecimento do desequilíbrio econômico-financeiro, hipótese em que será concedida indenização por meio de termo indenizatório.

%% Nota AGU: arts. 50 e 121, § 3º, da Lei 14.133 e IN SEGES/MP 5/2017 — medidas acautelatórias contra a responsabilidade subsidiária trabalhista (conta vinculada, pagamento direto), inclusive a extinção do contrato.
{§} O não pagamento dos salários e das verbas trabalhistas, e o não recolhimento das contribuições sociais, previdenciárias e para com o FGTS poderá dar ensejo à extinção do contrato por ato unilateral e escrito do CONTRATANTE e à aplicação das penalidades cabíveis.

{§} O CONTRATANTE poderá conceder prazo para que o CONTRATADO regularize suas obrigações trabalhistas ou suas condições de habilitação, sob pena de extinção contratual, quando não identificar má-fé ou a incapacidade de correção.

{§} Quando da extinção, o fiscal administrativo deverá verificar o pagamento pelo CONTRATADO das verbas rescisórias ou os documentos que comprovem que os empregados serão realocados em outra atividade de prestação de serviços, sem que ocorra a interrupção do contrato de trabalho.

{§} Até que o CONTRATADO comprove o disposto no item anterior, o CONTRATANTE reterá:

{§§} a garantia contratual - prestada com cobertura para os casos de descumprimento das obrigações de natureza trabalhista e previdenciária, incluídas as verbas rescisórias -, a qual será executada para reembolso dos prejuízos sofridos pela Administração, nos termos da legislação que rege a matéria; e

{§§} os valores das Notas fiscais ou Faturas correspondentes em valor proporcional ao inadimplemento, até que a situação seja regularizada.

{§} Na hipótese do subitem anterior, não havendo quitação das obrigações por parte do contratado no prazo de 15 (quinze) dias, fica o CONTRATADO obrigado a emitir as guias de recolhimento de contribuições previdenciárias e do FGTS e entregá-las ao CONTRATANTE, que poderá efetuar o pagamento das obrigações inadimplidas diretamente aos empregados que tenham participado da execução dos serviços objeto do contrato, bem como das contribuições previdenciárias e do FGTS, deduzindo o respectivo valor do pagamento devido ao contratado.

{§} O CONTRATANTE poderá ainda:

{§§} nos casos de obrigação de pagamento de multa pelo CONTRATADO, reter a garantia prestada a ser executada, conforme legislação que rege a matéria; e

{§§} nos casos em que houver necessidade de ressarcimento de prejuízos causados à Administração, nos termos do inciso IV do art. 139 da Lei n.º 14.133, de 2021, reter os eventuais créditos existentes em favor do CONTRATADO decorrentes do contrato.

{§} O contrato poderá ser extinto caso se constate que o CONTRATADO mantém vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade contratante ou com agente público que tenha desempenhado função na licitação ou na contratação direta, ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau.

%% Nota AGU: Acórdão 1207/2024-TCU-Plenário, item 9.2.4 — erro ou fraude no enquadramento sindical que imponha repactuação ou ônus por decisão judicial é motivo de extinção (art. 137, I).
{§} O contrato poderá ser extinto em caso de alteração da convenção coletiva de trabalho em que se baseia a planilha de custos e formação de preços contratuais, em razão de erro ou fraude no enquadramento sindical de que resulte a necessidade de repactuação ou imposição de ônus financeiro para a Administração Contratante, em cumprimento de decisão judicial.

## CLÁUSULA {§cl} – ALTERAÇÕES

{§} Eventuais alterações contratuais reger-se-ão pela disciplina dos arts. 124 e seguintes da Lei nº 14.133, de 2021.

{§} O CONTRATADO é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

%% Nota AGU: Parecer 00061/2024/DECOR/CGU/AGU — supressão consensual acima de 25% é possível, fundamentada; sugere-se prevê-la no edital.
{§} As supressões resultantes de acordo celebrado entre as partes contratantes poderão exceder o limite de 25% (vinte e cinco por cento) do valor inicial atualizado do contrato.

{§} As alterações contratuais deverão ser promovidas mediante celebração de termo aditivo, submetido à prévia aprovação da consultoria jurídica do CONTRATANTE, salvo nos casos de justificada necessidade de antecipação de seus efeitos, hipótese em que a formalização do aditivo deverá ocorrer no prazo máximo de 1 (um) mês.

{§} Registros que não caracterizam alteração do contrato podem ser realizados por simples apostila, dispensada a celebração de termo aditivo, na forma do art. 136 da Lei nº 14.133, de 2021.

## CLÁUSULA {§cl} – DOTAÇÃO ORÇAMENTÁRIA

%% Preto do modelo: "Orçamento Geral da União" (mantido literal; ver relatório). No CFC: Gestão/unidade = UASG; Programa de trabalho = projeto; Elemento de despesa = conta contábil.
{§} As despesas decorrentes da presente contratação correrão à conta de recursos específicos consignados no Orçamento Geral da União deste exercício, na dotação abaixo discriminada:

{§§} Gestão/unidade: UASG {cfc.uasg};

{§§} Fonte de recursos: {dotacao.fonte};

{§§} Programa de trabalho: Projeto n.º {dotacao.projeto};

{§§} Elemento de despesa: conta contábil {dotacao.conta}; e

{§§} Plano interno: {dotacao.plano_interno}; e

{§§} Nota de empenho: {dotacao.empenho};

%% Nota AGU (art. 106, II): em contratação continuada, atestar no início e a cada exercício os créditos orçamentários. Redação vermelha adaptada ao CFC com o texto do modelo Projur (não há Lei Orçamentária no CFC).
{§} A dotação relativa aos exercícios financeiros subsequentes correrá por conta dos recursos próprios para atender às despesas da mesma natureza, cuja alocação será feita no início de cada exercício financeiro, mediante apostilamento.

## CLÁUSULA {§cl} – DOS CASOS OMISSOS

%% Nota AGU: Acórdão 2569/2018-TCU-Plenário — a Administração, destinatária final, pode invocar o CDC quando suas prerrogativas forem insuficientes.
{§} Os casos omissos serão decididos pelo CONTRATANTE, segundo as disposições contidas na Lei nº 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei nº 8.078, de 1990 – Código de Defesa do Consumidor – e normas e princípios gerais dos contratos.

## CLÁUSULA {§cl} – PUBLICAÇÃO

{§} Incumbirá ao CONTRATANTE divulgar o presente instrumento no Portal Nacional de Contratações Públicas (PNCP), na forma prevista no art. 94 da Lei 14.133, de 2021, bem como no respectivo sítio oficial na Internet, em atenção ao art. 91, caput, da Lei n.º 14.133, de 2021, e ao art. 8º, §2º, da Lei n. 12.527, de 2011, c/c art. 7º, §3º, inciso V, do Decreto n. 7.724, de 2012.

## CLÁUSULA {§cl}– FORO

%% Foro do CFC: Justiça Federal em Brasília, Seção Judiciária do Distrito Federal ("de" do modelo contraído em "do"; ver relatório).
{§} Fica eleito o Foro da Justiça Federal em Brasília, Seção Judiciária do Distrito Federal para dirimir os litígios que decorrerem da execução deste Termo de Contrato que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei nº 14.133, de 2021.

{#local_data}> {local_data}{/local_data}

> **{cfc.nome|maiusculas}**
> {autoridade.nome}
> {autoridade.cargo}
> Representante legal do CONTRATANTE

> **{contratada.razao_social|maiusculas}**
> {representante.nome}
> {representante.funcao}
> Representante legal do CONTRATADO

%% Nota AGU: a assinatura eletrônica do SEI não dispensa testemunhas (art. 784, § 4º, do CPC; Nota 00013/2021/DECOR/CGU/AGU) — recomenda-se que o termo seja assinado por duas testemunhas.
{#testemunhas}> TESTEMUNHAS:
{*testemunhas}> {._n}- {.nome}
{/testemunhas}{/testemunhas}
