@requer regime=14133
@fonte agu-edital-credenciamento
%% Modelo AGU/CGU (Lei 14.133) — texto preto sem alteração; só o vermelho foi adaptado ao CFC.
@cabecalho

%% Capa do modelo. AGU: é admissível vigência indeterminada do credenciamento (Parecer 0003/2017/CNU/CGU/AGU); o prazo de vigência do edital (período para se credenciar) não se confunde com o prazo de validade do credenciamento (art. 19, § 1º, do Decreto 11.878/2024).
> CREDENCIAMENTO
> {credenciamento.numero}/{credenciamento.ano}
> CONTRATANTE (UASG)
> ({cfc.uasg})
> OBJETO
> {credenciamento.objeto|maiusculas}
> VALOR TOTAL DA CONTRATAÇÃO
> R$ {valor_global}
> PRAZO DE VIGÊNCIA DO EDITAL
> {edital.vigencia}

# CREDENCIAMENTO Nº {credenciamento.numero}/{credenciamento.ano}

> (Processo Administrativo n° {processo})

Torna-se público que o(a) {cfc.nome}, por meio do(a) {cfc.setor_licitacoes}, sediado(a) {cfc.sede}, realizará CREDENCIAMENTO, na forma ELETRÔNICA, nos termos da Lei nº 14.133, de 1º de abril de 2021, do Decreto nº 11.878, de 9 de janeiro de 2024, e demais legislação aplicável e, ainda, de acordo com as condições estabelecidas neste Edital.

## {§sec}. DO OBJETO

%% Escolha: "fornecer" (bens) ou "prestar serviços de" (serviços), seguido da descrição do bem ou serviço do credenciado.
{§} O objeto do presente procedimento é o credenciamento de interessados em {#fornecimento}fornecer{/fornecimento}{^fornecimento}prestar serviços de{/fornecimento} {credenciamento.objeto}, conforme condições, quantidades e exigências estabelecidas neste Edital e seus anexos.

%% AGU: enquadrar o credenciamento em pelo menos um dos incisos do art. 3º do Decreto 11.878/2024 (o modelo pode ser adaptado aos casos de calamidade da Lei 14.981/2024).
{§} O presente credenciamento se enquadra na hipótese do art. 3º, inciso {credenciamento.inciso}, do Decreto nº 11.878, de 2024.

{§} O credenciamento não obriga a administração pública a contratar.

## {§sec}. DA PARTICIPAÇÃO NO CREDENCIAMENTO

{§} Poderão participar deste credenciamento os interessados que estiverem previamente cadastrados no Sistema de Cadastramento Unificado de Fornecedores (Sicaf) e no Sistema de Compras do Governo Federal (www.gov.br/compras).

{§} O interessado responsabiliza-se exclusiva e formalmente pelas transações efetuadas em seu nome, assume como firmes e verdadeiros os atos praticados diretamente ou por seu representante, excluída a responsabilidade do provedor do sistema ou do órgão ou entidade promotora do credenciamento por eventuais danos decorrentes de uso indevido das credenciais de acesso, ainda que por terceiros.

{§} É de responsabilidade do cadastrado conferir a exatidão dos seus dados cadastrais nos Sistemas relacionados no item anterior e mantê-los atualizados junto aos órgãos responsáveis pela informação, devendo proceder, imediatamente, à correção ou à alteração dos registros tão logo identifique incorreção ou aqueles se tornem desatualizados.

{§} A não observância do disposto no item anterior poderá ensejar desclassificação no momento da habilitação.

{§} Não poderão participar do credenciamento:

{§§} aquele que não atenda às condições deste Edital e seu(s) anexo(s);

{§§} sociedade que desempenhe atividade incompatível com o objeto do credenciamento;

{§§} empresas estrangeiras que não tenham representação legal no Brasil com poderes expressos para receber citação e responder administrativa ou judicialmente;

{§§@autor_projeto} autor do anteprojeto, do projeto básico ou do projeto executivo, pessoa física ou jurídica, quando o credenciamento versar sobre serviços ou fornecimento de bens a ele relacionados;

{§§@empresa_projeto} empresa, isoladamente ou em consórcio, responsável pela elaboração do projeto básico ou do projeto executivo, ou empresa da qual o autor do projeto seja dirigente, gerente, controlador, acionista ou detentor de mais de 5% (cinco por cento) do capital com direito a voto, responsável técnico ou subcontratado, quando a licitação versar sobre serviços ou fornecimento de bens a ela necessários;

{§§@sancao} pessoa física ou jurídica que esteja impedida de licitar ou contratar com a administração pública federal em decorrência de sanção que lhe foi imposta;

{§§} aquele que mantenha vínculo de natureza técnica, comercial, econômica, financeira, trabalhista ou civil com dirigente do órgão ou entidade contratante ou com agente público que desempenhe função no processo de contratação ou atue na fiscalização ou na gestão do contrato, ou que deles seja cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau;

{§§} empresas controladoras, controladas ou coligadas, nos termos da Lei nº 6.404, de 1976, concorrendo entre si;

{§§} pessoa física ou jurídica que, nos 5 (cinco) anos anteriores à divulgação do edital, tenha sido condenada judicialmente, com trânsito em julgado, por exploração de trabalho infantil, por submissão de trabalhadores a condições análogas às de escravo ou por contratação de adolescentes nos casos vedados pela legislação trabalhista;

{§§} Organizações da Sociedade Civil de Interesse Público - OSCIP, atuando nessa condição.

%% AGU: a vedação a cooperativas só se aplica a serviços com dedicação exclusiva de mão de obra fora das hipóteses do art. 10 da IN SEGES/MP 5/2017 (Parecer 00002/2023/DECOR/CGU/AGU).
{#vedadas_cooperativas}{§§} sociedades cooperativas;{/vedadas_cooperativas}

%% AGU: vedar consórcio é exceção e deve ser justificado pela Administração (analogia com o art. 15 da Lei 14.133/2021).
{#vedado_consorcio}{§§} pessoas jurídicas reunidas em consórcio;{/vedado_consorcio}

%% AGU: pessoas físicas só podem ser excluídas quando o objeto exigir capital, estrutura ou equipe incompatíveis com a pessoa física, demonstrado no ETP (art. 4º, parágrafo único, IN SEGES/ME 116/2021).
{#vedadas_pessoas_fisicas}{§§} pessoas físicas.{/vedadas_pessoas_fisicas}

{§@agente_publico} Não poderá participar, direta ou indiretamente, do credenciamento ou da execução do contrato agente público do órgão ou entidade contratante, devendo ser observadas as situações que possam configurar conflito de interesses no exercício ou após o exercício do cargo ou emprego, nos termos da legislação que disciplina a matéria, conforme § 1º do art. 9º da Lei nº 14.133, de 2021.

{§} O impedimento de que trata o item {§ref@sancao} será também aplicado ao interessado que atue em substituição a outra pessoa, física ou jurídica, com o intuito de burlar a efetividade da sanção a ela aplicada, inclusive a sua controladora, controlada ou coligada, desde que devidamente comprovado o ilícito ou a utilização fraudulenta da personalidade jurídica do interessado.

{§} A critério da Administração e exclusivamente a seu serviço, o autor dos projetos e a empresa a que se referem os itens {§ref@autor_projeto} e {§ref@empresa_projeto} poderão participar no apoio das atividades de planejamento da contratação, de execução da licitação ou de gestão do contrato, desde que sob supervisão exclusiva de agentes públicos do órgão ou entidade.

{§} Equiparam-se aos autores do projeto as empresas integrantes do mesmo grupo econômico.

{§} O disposto nos itens {§ref@autor_projeto} e {§ref@empresa_projeto} não impede a licitação ou a contratação de serviço que inclua como encargo do contratado a elaboração do projeto básico e do projeto executivo, nas contratações integradas, e do projeto executivo, nos demais regimes de execução.

{§} Em contratações realizadas no âmbito de projetos e programas parcialmente financiados por agência oficial de cooperação estrangeira ou por organismo financeiro internacional com recursos do financiamento ou da contrapartida nacional, não poderá participar pessoa física ou jurídica que integre o rol de pessoas sancionadas por essas entidades ou que seja declarada inidônea nos termos da Lei nº 14.133, de 2021.

{§} A vedação de que trata o item {§ref@agente_publico}. estende-se a terceiro que auxilie a condução da contratação na qualidade de integrante de equipe de apoio, profissional especializado ou funcionário ou representante de empresa que preste assessoria técnica.

## {§sec}. DA MANIFESTAÇÃO DA INTENÇÃO DE SE CREDENCIAR

%% AGU: nas hipóteses do art. 79, I e II, a Administração fixa o valor; em mercados fluidos (art. 79, III) o edital pode fixar percentual mínimo de desconto sobre as cotações de mercado (art. 7º, § 2º, do Decreto 11.878/2024).
{§} Os interessados deverão estar previamente cadastrados no Sicaf e encaminharão, exclusivamente por meio eletrônico (e-mail, protocolo eletrônico, portal do órgão, entre outros), o requerimento de participação com a indicação de sua intenção de se credenciar para o fornecimento dos bens ou para a prestação dos serviços, com as seguintes informações:

%% Descrição com marca e fabricante: usar quando o objeto a exigir (típico de fornecimento de bens).
{#descricao_marca_fabricante}{§§} Descrição detalhada do objeto contendo informações sobre marca, fabricante etc.{/descricao_marca_fabricante}

%% AGU: com mais de um item, o interessado indica no requerimento o(s) item(ns) a que se credencia e declara cumprir os respectivos requisitos de habilitação.
{§§} Atestar o cumprimento dos requisitos de habilitação para fornecimento dos bens ou para a prestação dos serviços ({credenciamento.objeto})

%% Só na hipótese de mercados fluidos (art. 79, III, da Lei 14.133/2021).
{#mercados_fluidos}{§§} Na hipótese de contratação em mercados fluidos, percentual mínimo de desconto sobre as cotações de mercado registradas no momento da contratação;{/mercados_fluidos}

{§} Todas as especificações do objeto vinculam o interessado.

{§} No valor da contratação estarão inclusos todos os custos operacionais, encargos previdenciários, trabalhistas, tributários, comerciais e quaisquer outros que incidam direta ou indiretamente na execução do objeto.

{§} A apresentação do requerimento de participação com a indicação da intenção de se credenciar implica obrigatoriedade do cumprimento das disposições contidas no Termo de Referência, assumindo o credenciado o compromisso de executar o objeto nos seus termos, bem como de fornecer os materiais, equipamentos, ferramentas e utensílios necessários, em quantidades e qualidades adequadas à perfeita execução contratual, promovendo, quando requerido, sua substituição.

{§@declaracao} No requerimento de participação com a indicação de sua intenção de se credenciar, o interessado apresentará também declaração que:

{§§} está ciente e concorda com as condições contidas no edital e seus anexos, bem como de que o valor da contraprestação compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constituição Federal, nas leis trabalhistas, nas normas infralegais, nas convenções coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data de sua entrega em definitivo e que cumpre plenamente os requisitos de habilitação definidos no instrumento convocatório;

{§§} não emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre e não emprega menor de 16 anos, salvo menor, a partir de 14 anos, na condição de aprendiz, nos termos do art. 7°, inciso XXXIII, da Constituição;

{§§} não possui empregados executando trabalho degradante ou forçado, observando o disposto nos incisos III e IV do art. 1º e no inciso III do art. 5º da Constituição Federal;

{§§} cumpre as exigências de reserva de cargos para pessoa com deficiência e para reabilitado da Previdência Social, previstas em lei e em outras normas específicas.

{§} O descumprimento das regras supramencionadas pela Administração ou por parte dos contratados pode ensejar a responsabilização pelo Tribunal de Contas da União e, após o devido processo legal, gerar as seguintes consequências: assinatura de prazo para a adoção das medidas necessárias ao exato cumprimento da lei, nos termos do art. 71, inciso IX, da Constituição; ou condenação dos agentes públicos responsáveis e da empresa contratada ao pagamento dos prejuízos ao erário, caso verificada a ocorrência de superfaturamento por sobrepreço na execução do contrato.

{§} O interessado organizado em cooperativa deverá declarar, ainda, que cumpre os requisitos estabelecidos no art. 16 da Lei nº 14.133, de 2021.

{§} A falsidade da declaração de que trata o item {§ref@declaracao} sujeitará o interessado às sanções previstas na Lei nº 14.133, de 2021, e neste Edital.

{§} Quando for o caso, o interessado deverá comunicar imediatamente ao provedor do sistema qualquer acontecimento que possa comprometer o sigilo ou a segurança, para imediato bloqueio de acesso.

## {§sec}. DA HABILITAÇÃO

{§} Os documentos previstos no Termo de Referência, necessários e suficientes para demonstrar a capacidade do interessado de realizar o objeto do credenciamento, serão exigidos para fins de habilitação, nos termos dos arts. 62 a 70 da Lei nº 14.133, de 2021.

{§§} A documentação exigida para fins de habilitação jurídica, fiscal, social e trabalhista e econômico-ﬁnanceira, poderá ser substituída pelo registro cadastral no Sicaf.

{§} Quando permitida a participação de empresas estrangeiras que não funcionem no País, as exigências de habilitação serão atendidas mediante documentos equivalentes, inicialmente apresentados em tradução livre.

{§} Na hipótese de o interessado ser empresa estrangeira que não funcione no País, para ﬁns de assinatura do contrato os documentos exigidos para a habilitação serão traduzidos por tradutor juramentado no País e apostilados nos termos do disposto no Decreto nº 8.660, de 29 de janeiro de 2016, ou de outro que venha a substituí-lo, ou consularizados pelos respectivos consulados ou embaixadas.

{§} Quando permitida a participação de consórcio de empresas, a habilitação técnica, quando exigida, será feita por meio do somatório dos quantitativos de cada consorciado e, para efeito de habilitação econômico-financeira, quando exigida, será observado o somatório dos valores de cada consorciado.

{§} Os documentos exigidos para fins de habilitação poderão ser apresentados em original, por cópia ou por {habilitacao.outro_meio}.

%% AGU: inserir o número de dias úteis necessários à análise dos documentos de habilitação.
{§} O órgão credenciante terá o prazo de {habilitacao.prazo_analise} dias úteis para analisar a documentação apresentada pelo interessado.

%% AGU: no credenciamento pelo Decreto 11.878/2024 o registro cadastral é no Sicaf; se o credenciamento seguir só o Decreto, e não a Lei 14.981/2024 (calamidade), retirar esta cláusula.
{#calamidade_lei_14981}{§} Os documentos exigidos para fins de habilitação poderão ser substituídos por registro cadastral emitido por órgão ou entidade pública, desde que o registro tenha sido feito em obediência ao disposto na Lei nº 14.133, de 2021.{/calamidade_lei_14981}

%% AGU: empresa com 100 ou mais empregados deve preencher cargos com reabilitados ou pessoas com deficiência (art. 93 da Lei 8.213/1991).
{§} Será verificado se o interessado apresentou no sistema, sob pena de inabilitação, a declaração de que cumpre as exigências de reserva de cargos para pessoa com deficiência e para reabilitado da Previdência Social, previstas em lei e em outras normas específicas.

{§} O interessado deverá apresentar, sob pena de desclassificação, declaração de que o valor da contratação compreende a integralidade dos custos para atendimento dos direitos trabalhistas assegurados na Constituição Federal, nas leis trabalhistas, nas normas infralegais, nas convenções coletivas de trabalho e nos termos de ajustamento de conduta vigentes na data da apresentação do requerimento de participação.

{§} A habilitação será verificada por meio do Sicaf, em relação aos documentos por ele abrangidos.

{§§} Somente haverá a necessidade de comprovação do preenchimento de requisitos mediante apresentação dos documentos originais não-digitais quando houver dúvida em relação à integridade do documento digital ou quando a lei expressamente o exigir.

{§} É de responsabilidade do interessado conferir a exatidão dos seus dados cadastrais no Sicaf e mantê-los atualizados junto aos órgãos responsáveis pela informação, devendo proceder, imediatamente, à correção ou à alteração dos registros tão logo identifique incorreção ou aqueles se tornem desatualizados.

{§§} A não observância do disposto no item anterior poderá ensejar desclassificação no momento da habilitação.

{§} A verificação pela comissão de contratação, em sítios eletrônicos oficiais de órgãos e entidades emissores de certidões constitui meio legal de prova, para fins de habilitação.

%% AGU (mesma nota do registro cadastral): no Decreto 11.878/2024 o registro cadastral é no Sicaf. O texto abaixo é preto no modelo e fica.
{§§} Os documentos exigidos para habilitação que não estejam contemplados no Sicaf serão enviados por meio eletrônico (e-mail, protocolo eletrônico, portal do órgão, entre outros) até a conclusão da fase de habilitação.

%% AGU: a diligência para juntar documento ausente que comprove condição preexistente só cabe se prevista no edital, com prazo (no mínimo duas horas) e hipóteses definidos (Parecer 2/2025/CNLCA/DECOR/CGU/AGU; Acórdão TCU 1414/2023-Plenário).
{§} Encerrado o prazo para envio da documentação, poderá ser admitida, mediante decisão fundamentada da comissão de contratação, a apresentação de novos documentos de habilitação ou a complementação de informações acerca dos documentos já apresentados pelos interessados, em até {habilitacao.prazo_complementacao} horas, para:

{§§} a aferição das condições de habilitação do interessado, desde que decorrentes de fatos existentes à época da abertura do certame;

{§§} atualização de documentos cuja validade tenha expirado após a data de recebimento das propostas;

{§§} suprimento da ausência de documento de cunho declaratório emitido unilateralmente pelo interessado;

{§§} suprimento da ausência de certidão e/ou documento de cunho declaratório expedido por órgão ou entidade cujos atos gozem de presunção de veracidade e fé pública.

{§} Findo o prazo assinalado sem o envio da nova documentação, restará preclusa essa oportunidade conferida ao interessado, implicando sua inabilitação.

{§} Na análise dos documentos de habilitação, a comissão de contratação poderá sanar erros ou falhas que não alterarem sua substância ou validade jurídica.

{§} A comprovação de regularidade fiscal e trabalhista das microempresas e das empresas de pequeno porte somente será exigida para efeito de contratação, e não como condição para participação no credenciamento.

## {§sec}. DOS RECURSOS

{§} A interposição de recurso referente à habilitação ou inabilitação de interessados, à anulação ou revogação do credenciamento, observará o disposto no art. 17 do Decreto nº 11.878, de 2024.

{§} O prazo recursal é de 3 (três) dias úteis, contados da data de publicação da decisão.

{§} Quando o recurso apresentado impugnar o ato de habilitação ou inabilitação do interessado:

%% AGU: o edital define o prazo da intenção de recorrer (art. 17 do Decreto 11.878/2024), que não pode passar de 3 (três) dias úteis.
{§§} a intenção de recorrer deverá ser manifestada em {recurso.prazo_intencao} dias úteis, sob pena de preclusão;

{§§} o prazo para apresentação das razões recursais será iniciado na data de publicação da decisão.

{§} Os recursos deverão ser encaminhados por meio eletrônico (e-mail, protocolo eletrônico, portal do órgão, entre outros).

{§} O recurso será dirigido à comissão de contratação, a qual poderá reconsiderar sua decisão no prazo de 3 (três) dias úteis, ou, nesse mesmo prazo, encaminhar recurso para a autoridade superior, a qual deverá proferir sua decisão no prazo de 10 (dez) dias úteis, contado do recebimento dos autos.

{§} Os recursos interpostos fora do prazo não serão conhecidos.

{§} O recurso e o pedido de reconsideração não terão efeito suspensivo.

{§} O acolhimento do recurso invalida tão somente os atos insuscetíveis de aproveitamento.

{§} Os autos do processo permanecerão com vista franqueada aos interessados no sítio eletrônico {vista_autos.sitio}.

## {§sec}. DAS INFRAÇÕES ADMINISTRATIVAS E SANÇÕES

%% AGU: as infrações e sanções desta seção tratam do procedimento de credenciamento; as da execução ficam no contrato.
{§} Comete infração administrativa, nos termos da lei, o interessado que, com dolo ou culpa:

{§§@inf_documentacao} deixar de entregar a documentação exigida para o certame ou não entregar qualquer documento que tenha sido solicitado pela comissão de contratação;

{§§@inf_amostra} salvo em decorrência de fato superveniente devidamente justificado, deixar de apresentar amostra ou apresentá-la em desacordo com as especificações do edital;

{§§@inf_nao_celebrar} não celebrar o contrato ou não entregar a documentação exigida para a contratação, quando convocado dentro do prazo de validade do credenciamento;

{§§@inf_recusa} recusar-se, sem justificativa, a assinar o contrato, ou a aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administração;

{§§@inf_declaracao_falsa} apresentar declaração ou documentação falsa exigida para o certame ou prestar declaração falsa durante o credenciamento;

{§§@inf_fraudar} fraudar o credenciamento;

{§§@inf_inidoneo} comportar-se de modo inidôneo ou cometer fraude de qualquer natureza, em especial quando:

{§§§} agir em conluio ou em desconformidade com a lei;

{§§§} induzir deliberadamente a erro no julgamento;

{§§§} apresentar amostra falsificada ou deteriorada;

{§§@inf_atos_ilicitos} praticar atos ilícitos com vistas a frustrar os objetivos do credenciamento;

{§§@inf_ato_lesivo} praticar ato lesivo previsto no art. 5º da Lei n.º 12.846, de 2013.

{§} Com fulcro na Lei nº 14.133, de 2021, a Administração poderá, após regular processo administrativo, garantida a prévia defesa, aplicar aos credenciados as seguintes sanções, sem prejuízo das responsabilidades civil e criminal:

{§§} advertência;

{§§} multa;

{§§} impedimento de licitar e contratar; e

{§§} declaração de inidoneidade para licitar ou contratar, enquanto perdurarem os motivos determinantes da punição ou até que seja promovida sua reabilitação perante a própria autoridade que aplicou a penalidade.

{§} Na aplicação das sanções serão considerados:

{§§} a natureza e a gravidade da infração cometida;

{§§} as peculiaridades do caso concreto;

{§§} as circunstâncias agravantes ou atenuantes;

{§§} os danos que dela provierem para a Administração Pública; e

{§§} a implantação ou o aperfeiçoamento de programa de integridade, conforme normas e orientações dos órgãos de controle.

%% AGU: multa entre 0,5% e 30% do valor do contrato (art. 156, § 3º), proporcional à gravidade; os percentuais do modelo são indicativos e a gradação é discricionária.
{§} A multa será recolhida no prazo máximo de {multa.prazo_recolhimento} dias úteis, a contar da comunicação oficia.

{§§} Para as infrações previstas nos itens {§ref@inf_documentacao}, {§ref@inf_amostra}, {§ref@inf_nao_celebrar} e {§ref@inf_recusa}, a multa será de {multa.faixa1_min} a {multa.faixa1_max} do valor do contrato.

{§§} Para as infrações previstas nos itens {§ref@inf_declaracao_falsa}, {§ref@inf_fraudar}, {§ref@inf_inidoneo}, {§ref@inf_atos_ilicitos} e {§ref@inf_ato_lesivo}, a multa será de {multa.faixa2_min} a {multa.faixa2_max} do valor do contrato.

{§} As sanções de advertência, impedimento de licitar e contratar e declaração de inidoneidade para licitar ou contratar poderão ser aplicadas, cumulativamente ou não, à penalidade de multa.

{§} Na aplicação da sanção de multa será facultada a defesa do interessado no prazo de 15 (quinze) dias úteis, contado da data de sua intimação.

%% AGU: indicar o ente federativo a que pertence o órgão sancionador (art. 156, § 4º). O texto é preto no modelo e fica.
{§} A sanção de impedimento de licitar e contratar será aplicada ao responsável em decorrência das infrações administrativas relacionadas nos itens {§ref@inf_documentacao}, {§ref@inf_amostra}, {§ref@inf_nao_celebrar} e {§ref@inf_recusa}, quando não se justificar a imposição de penalidade mais grave, e impedirá o responsável de licitar e contratar no âmbito da Administração Pública direta e indireta do ente federativo a qual pertencer o órgão ou entidade, pelo prazo máximo de 3 (três) anos.

{§} Poderá ser aplicada ao responsável a sanção de declaração de inidoneidade para licitar ou contratar, em decorrência da prática das infrações dispostas nos itens {§ref@inf_declaracao_falsa}, {§ref@inf_fraudar}, {§ref@inf_inidoneo}, {§ref@inf_atos_ilicitos} e {§ref@inf_ato_lesivo}, bem como pelas infrações administrativas previstas nos itens {§ref@inf_documentacao}, {§ref@inf_amostra}, {§ref@inf_nao_celebrar} e {§ref@inf_recusa} que justifiquem a imposição de penalidade mais grave que a sanção de impedimento de licitar e contratar, cuja duração observará o prazo previsto no art. 156, §5º, da Lei n.º 14.133, de 2021.

{§} A recusa injustificada do credenciado em assinar o contrato, ou em aceitar ou retirar o instrumento equivalente no prazo estabelecido pela Administração, descrita nos itens {§ref@inf_nao_celebrar} e {§ref@inf_recusa}, caracterizará o descumprimento total da obrigação assumida e o sujeitará às penalidades e à imediata perda da garantia em favor do órgão ou entidade credenciante, nos termos do art. 45, §4º, da IN SEGES/ME n.º 73, de 30 de setembro de 2022.

%% AGU: sem servidores estatutários, a comissão é composta por 2 (dois) ou mais empregados públicos dos quadros permanentes, de preferência com 3 (três) anos de serviço no órgão (art. 158, § 1º). O texto é preto no modelo e fica.
{§} A apuração de responsabilidade relacionadas às sanções de impedimento de licitar e contratar e de declaração de inidoneidade para licitar ou contratar demandará a instauração de processo de responsabilização a ser conduzido por comissão composta por 2 (dois) ou mais servidores estáveis, que avaliará fatos e circunstâncias conhecidos e intimará o interessado para, no prazo de 15 (quinze) dias úteis, contado da data de sua intimação, apresentar defesa escrita e especificar as provas que pretenda produzir.

{§} Caberá recurso no prazo de 15 (quinze) dias úteis da aplicação das sanções de advertência, multa e impedimento de licitar e contratar, contado da data da intimação, o qual será dirigido à autoridade que tiver proferido a decisão recorrida, que, se não a reconsiderar no prazo de 5 (cinco) dias úteis, encaminhará o recurso com sua motivação à autoridade superior, que deverá proferir sua decisão no prazo máximo de 20 (vinte) dias úteis, contado do recebimento dos autos.

{§} Caberá a apresentação de pedido de reconsideração da aplicação da sanção de declaração de inidoneidade para licitar ou contratar no prazo de 15 (quinze) dias úteis, contado da data da intimação, e decidido no prazo máximo de 20 (vinte) dias úteis, contado do seu recebimento.

{§} O recurso e o pedido de reconsideração terão efeito suspensivo do ato ou da decisão recorrida até que sobrevenha decisão final da autoridade competente.

%% AGU: indicar o ente federativo a que pertence o órgão sancionador (art. 156, § 9º). O texto é preto no modelo e fica.
{§} A aplicação das sanções previstas neste edital não exclui, em hipótese alguma, a obrigação de reparação integral dos danos causados.

## {§sec}. DA IMPUGNAÇÃO AO EDITAL E DO PEDIDO DE ESCLARECIMENTO

{§} Qualquer pessoa é parte legítima para impugnar este Edital por irregularidade ou para solicitar esclarecimento sobre os seus termos enquanto este permanecer em vigor.

%% AGU: indicar os meios de recepção das impugnações e dos pedidos de esclarecimento.
{§} A impugnação e o pedido de esclarecimento poderão ser realizados por forma eletrônica, pelos seguintes meios: {impugnacao.meios}.

{§} A resposta à impugnação ou ao pedido de esclarecimento será divulgado por meio eletrônico no prazo de até 3 (três) dias úteis, contado da data de recebimento do pedido.

{§} As impugnações e pedidos de esclarecimentos não suspendem os prazos previstos no certame.

{§} Acolhida a impugnação, o edital retificado será publicado no Portal Nacional de Contratações Públicas - PNCP.

## {§sec}. DA DIVULGAÇÃO DA LISTA DE CREDENCIADOS

{§} O resultado, com a lista de credenciados relacionados de acordo com o critério estabelecido no edital, será publicado e estará permanentemente disponível e atualizado no PNCP.

## {§sec}. DA CONTRATAÇÃO

{§} Após divulgação da lista de credenciados, o órgão ou a entidade poderá convocar o credenciado para assinatura do instrumento contratual, emissão de nota de empenho de despesa, autorização de compra ou outro instrumento hábil, conforme disposto no art. 95 da Lei nº 14.133, de 2021.

{§} A Administração poderá convocar o credenciado durante todo o prazo de validade do credenciamento para assinar o contrato ou outro instrumento equivalente, sob pena de decair o direito à contratação, sem prejuízo das sanções previstas na Lei nº 14.133, de 2021, e no edital de credenciamento.

{§@prazo_assinatura} O prazo para assinatura do instrumento contratual pelo credenciado, após convocação pela Administração, será de {contratacao.prazo_assinatura} dias.

{§} O prazo de que trata o item {§ref@prazo_assinatura} poderá ser prorrogado uma vez, por igual período, mediante solicitação, devidamente justificada, do credenciado durante o seu transcurso, desde que o motivo apresentado seja aceito pela Administração.

{§} Previamente à emissão de nota de empenho e à contratação, a Administração deverá realizar consulta ao Sicaf para identificar possível impedimento de licitar e contratar.

{§} O prazo de vigência dos contratos decorrentes do presente credenciamento será de {vigencia.prazo}, com início na data de {vigencia.inicio} e encerramento em {vigencia.fim}.

{§} Os contratos decorrentes de credenciamento poderão ser alterados, observado o disposto no art. 124 da Lei nº 14.133, de 2021.

{§} É vedado o cometimento a terceiros do objeto contratado sem autorização expressa da Administração.

%% AGU: nas contratações paralelas e não excludentes (art. 79, I), o edital deve prever critérios claros de distribuição da demanda (art. 9º do Decreto 11.878/2024); pontuação técnica objetiva é admitida (Acórdão TCU 533/2022-Plenário). Sem essa hipótese, a seção inteira sai.
{#contratacoes_paralelas}
## {§sec}. CRITÉRIOS PARA DEFINIÇÃO DA ORDEM DE CONTRATAÇÃO DOS CREDENCIADOS.

{§} Na hipótese de contratações paralelas e não excludentes, a convocação dos credenciados para contratação garantirá a igualdade de oportunidade entre os interessados, a partir da observância dos seguintes critérios de distribuição da demanda:

{*contratacoes_paralelas.criterios}{§§} {.texto}

{/contratacoes_paralelas.criterios}
{/contratacoes_paralelas}

## {§sec}. DA ANULAÇÃO, DA REVOGAÇÃO E DO DESCREDENCIAMENTO

{§} O edital de credenciamento poderá ser anulado, a qualquer tempo, em caso de vício de legalidade, ou revogado, por motivos de conveniência e de oportunidade da administração.

{§} Na hipótese de anulação do edital de credenciamento, os instrumentos que dele resultaram ficarão sujeitos ao disposto nos art. 147 ao art. 150 da Lei nº 14.133, de 2021.

{§} A revogação do edital de credenciamento não repercutirá nos instrumentos já celebrados que dele resultaram.

{§} Será realizado o descredenciamento quando houver:

%% AGU: o TCU admite a denúncia do ajuste pelo credenciado a qualquer tempo, com a antecedência fixada no termo (TC 016.522/95-8).
{§§@desc_pedido} pedido formalizado pelo credenciado, no prazo de {descredenciamento.prazo_pedido} dias;

{§§@desc_habilitacao} perda das condições de habilitação do credenciado;

{§§@desc_descumprimento} descumprimento injustificado do contrato pelo contratado; e

{§§} sanção de impedimento de licitar e contratar ou de declaração de inidoneidade superveniente ao credenciamento.

{§} O pedido de descredenciamento de que trata o item {§ref@desc_pedido} não desincumbirá o credenciado do cumprimento de eventuais contratos assumidos e das responsabilidades deles recorrentes.

{§} Nas hipóteses previstas nos subitens {§ref@desc_habilitacao} e {§ref@desc_descumprimento} além do descredenciamento, deverá ser aberto processo administrativo, assegurados o contraditório e a ampla defesa, para possível aplicação de penalidade, na forma estabelecida na legislação.

{§} Se houver a efetiva prestação de serviços ou o fornecimento dos bens, os pagamentos serão realizados normalmente, até decisão no sentido de rescisão contratual, caso o fornecedor não regularize a sua situação.

{§} Somente por motivo de economicidade, segurança nacional ou no interesse da Administração, devidamente justificado, em qualquer caso, pela autoridade máxima do órgão ou da entidade contratante, não será rescindido o contrato em execução com empresa ou profissional que estiver irregular.

## {§sec}. DO PRAZO DE VIGÊNCIA DO EDITAL

%% AGU: durante a vigência do edital o credenciamento fica permanentemente aberto a novos interessados (art. 79, parágrafo único, I, da Lei 14.133/2021 c/c art. 5º do Decreto 11.878/2024).
{§} O presente edital terá prazo de vigência de {edital.vigencia}, a contar de {edital.vigencia_inicio}.

## {§sec}. DISPOSIÇÕES GERAIS

{§} Na contagem dos prazos estabelecidos neste Edital e seus Anexos, excluir-se-á o dia do início e incluir-se-á o do vencimento. Só se iniciam e vencem os prazos em dias de expediente na Administração.

{§} O desatendimento de exigências formais não essenciais não importará o afastamento do interessado, desde que seja possível o aproveitamento do ato, observados os princípios da isonomia e do interesse público.

{§} Em caso de divergência entre disposições deste Edital e de seus anexos ou demais peças que compõem o processo, prevalecerá as deste Edital.

{§} O Edital e seus anexos estão disponíveis, na íntegra, no Portal Nacional de Contratações Públicas (PNCP) e endereço eletrônico {edital.sitio_eletronico}.

{§} Integram este Edital, para todos os fins e efeitos, os seguintes anexos:

{§§} ANEXO I - Termo de Referência

{§§§} Apêndice do Anexo I – Estudo Técnico Preliminar

{§§} ANEXO II – Minuta de Termo de Contrato

{local_data}

> **{autoridade.nome}**
> {autoridade.cargo}
