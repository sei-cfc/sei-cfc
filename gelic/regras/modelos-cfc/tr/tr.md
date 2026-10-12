%% Modelo TR (Termo de Referência) do Gera CFC — Quick 261003-kwp.
%% Fonte do texto fixo: AGU, "Modelo de Termo de Referência — Serviços e Obras — Lei nº 14.133"
%% versão mai/26 (`apps/gera/modelos/agu/pregao-e-concorrencia/modelo-de-termo-de-referencia-
%% servicos-e-obras-lei-no-14-133-mai-26.docx`), extraído com python-docx (887 parágrafos).
%% Decisão (CONTEXT LOCKED, 03/10/2026): o texto fixo é o da AGU, fiel — nada de reescrever. As
%% "Nota explicativa" do modelo AGU (instruções em amarelo) NUNCA entram no documento: viram a
%% nota (i) da pergunta correspondente em `tr.yaml`. Trechos entre colchetes/opcionais do modelo
%% viram perguntas ou blocos condicionais `{#var}...{/var}`.
%%
%% Escopo desta versão: serviços SEM dedicação exclusiva de mão de obra (o caso mais comum dos
%% 110 itens de serviço do PCA 2026 — SPEC §4). Ficam FORA desta versão (entram depois como
%% condicionais, quando o CFC tiver um caso real de obra ou de mão de obra exclusiva):
%%   - Exclusivo de obras/serviços de engenharia: classificação quanto à natureza de obra,
%%     garantia adicional do fornecedor (85% do valor orçado), vistoria com "as built"/habite-se,
%%     disposições de contratação integrada/semi-integrada e desapropriação, diário de obra,
%%     gestão de resíduos da construção civil (CONAMA), procedência de matéria-prima florestal
%%     (DOF/IBAMA), emissões atmosféricas/ruído (CONAMA), empreitada por preço unitário/global,
%%     garantia adicional de 5 anos por vício de construção.
%%   - Exclusivo de dedicação exclusiva de mão de obra: uniformes, conta-depósito vinculada
%%     (Anexo XII IN SEGES/MP nº 5/2017), pagamento pelo fato gerador, repactuação de custos de
%%     mão de obra (Acordo/Convenção/Dissídio Coletivo), programação de férias e compensação de
%%     jornada de colaboradores terceirizados, gestor/fiscal setorial de terceirização, habilitação
%%     por custos unitários mínimos relevantes (planilha de custos vinculada a CCT/ACT/DC),
%%     garantia com cobertura de verbas rescisórias, responsabilidade solidária por subcontratação
%%     de serviço contínuo com mão de obra exclusiva.
%%   - O "ANEXO I — Regras aplicáveis ao instrumento substitutivo ao contrato" (contratações de
%%     pequeno valor, Nota de Empenho/Carta Contrato) não é tratado como seção isolada: suas
%%     cláusulas de obrigações do Contratante/Contratado, LGPD, extinção, casos omissos, alterações
%%     e foro entram condensadas no corpo deste TR (seções 12 a 14), sem o enquadramento específico
%%     de instrumento substitutivo de pequeno valor — qualquer Termo de Contrato formal do CFC
%%     usa as mesmas cláusulas.
%%   - Habilitação jurídica: mantida só a enumeração padrão (CNPJ/CPF, regularidade fiscal/FGTS/
%%     trabalhista, econômico-financeira, qualificação técnica geral); omitidas as variantes raras
%%     para este órgão (cooperativas, consórcio, sociedade empresária estrangeira).
%%
%% Reaproveita do ctx já montado por `apps.gera.documentos.respostas.contexto_documento` (D-14):
%% "objeto" (cadastro único), "valor_estimado_fmt"/"valor_estimado_extenso" (derivadas do
%% cadastro), "vigencia_meses" (cadastro), "projetos_contas" (cadastro, mesmo uso do DFD/Mapa de
%% preços), "tem_item_pca"/"ano_exercicio" (PCA vinculado).

@cabecalho

# TERMO DE REFERÊNCIA

## 1. Condições gerais da contratação

Objeto da contratação: {objeto}

A contratação tem caráter {#justificativa_continuidade}contínuo{/justificativa_continuidade}{^justificativa_continuidade}não contínuo{/justificativa_continuidade}, conforme condições e exigências estabelecidas neste instrumento.

O(s) serviço(s) objeto desta contratação são caracterizados como {natureza_classificacao}, conforme justificativa constante do Estudo Técnico Preliminar.

{#justificativa_continuidade}

O serviço é enquadrado como continuado, tendo em vista que {justificativa_continuidade}, sendo a vigência plurianual mais vantajosa considerando o Estudo Técnico Preliminar.

{/justificativa_continuidade}
{^justificativa_continuidade}

O serviço é enquadrado como não contínuo ou contratado por escopo.

{/justificativa_continuidade}

O prazo de vigência da contratação é de {vigencia_meses} meses contados {termo_inicial_vigencia}, prorrogável por até 10 (dez) anos, na forma dos artigos 106 e 107 da Lei n° 14.133, de 2021. O contrato ou outro instrumento hábil que o substitua oferece maior detalhamento das regras que serão aplicadas em relação à vigência da contratação.

## 2. Fundamentação e descrição da necessidade da contratação

A Fundamentação da Contratação e de seus quantitativos encontra-se pormenorizada em tópico específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.

{#tem_item_pca}

O objeto da contratação está previsto no Plano de Contratações Anual {ano_exercicio}, conforme consta das informações básicas desse Termo de Referência.

{/tem_item_pca}

## 3. Descrição da solução como um todo considerado o ciclo de vida do objeto

A descrição da solução como um todo encontra-se pormenorizada em tópico específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.

## 4. Requisitos da contratação

{#sustentabilidade}

Além dos critérios de sustentabilidade eventualmente inseridos na descrição do objeto, devem ser atendidos os seguintes requisitos, que se baseiam no Guia Nacional de Contratações Sustentáveis: {sustentabilidade}.

{/sustentabilidade}

{#marcas_admitidas}

Na presente contratação será admitida a indicação da(s) seguinte(s) marca(s), característica(s) ou modelo(s), de acordo com as justificativas contidas nos Estudos Técnicos Preliminares: {marcas_admitidas}.

{/marcas_admitidas}

{#subcontratacao_limite_pct}

É permitida a subcontratação parcial do objeto, até o limite de {subcontratacao_limite_pct}% do valor total do contrato, permanecendo a responsabilidade integral do Contratado pela perfeita execução contratual, cabendo-lhe realizar a supervisão e coordenação das atividades do subcontratado, bem como responder perante o Contratante pelo rigoroso cumprimento das obrigações contratuais correspondentes ao objeto da subcontratação. A subcontratação depende de autorização prévia do Contratante, a quem incumbe avaliar se o subcontratado cumpre os requisitos de qualificação técnica necessários para a execução do objeto.

{/subcontratacao_limite_pct}
{^subcontratacao_limite_pct}

Não será admitida a subcontratação do objeto contratual.

{/subcontratacao_limite_pct}

{#garantia_percentual}

Será exigida a garantia da contratação de que tratam os arts. 96 e seguintes da Lei nº 14.133, de 2021, com validade durante a execução do contrato e 90 (noventa) dias após término da vigência contratual, podendo o Contratado optar pela caução em dinheiro ou em títulos da dívida pública, seguro-garantia, fiança bancária ou título de capitalização, em valor correspondente a {garantia_percentual}% do valor total da contratação. A garantia somente será liberada ou restituída após a fiel execução do contrato ou após a sua extinção por culpa exclusiva da Administração e, quando em dinheiro, será atualizada monetariamente.

{/garantia_percentual}
{^garantia_percentual}

Não haverá exigência da garantia da contratação dos art. 96 e seguintes da Lei nº 14.133, de 2021, pelas razões constantes do Estudo Técnico Preliminar.

{/garantia_percentual}

{#vistoria_horario}

A avaliação prévia do local de execução dos serviços é imprescindível para o conhecimento pleno das condições e peculiaridades do objeto a ser contratado, sendo assegurado ao interessado o direito de realização de vistoria prévia, acompanhado por servidor designado para esse fim, de segunda à sexta-feira, das {vistoria_horario}. Caso o interessado opte por não realizar a vistoria, deverá prestar declaração formal assinada pelo seu responsável técnico acerca do conhecimento pleno das condições e peculiaridades da contratação.

{/vistoria_horario}
{^vistoria_horario}

Não há necessidade de realização de avaliação prévia do local de execução dos serviços.

{/vistoria_horario}

## 5. Modelo de execução do objeto

A execução do objeto seguirá a seguinte dinâmica: início da execução em {prazo_inicio_execucao}, contado da assinatura do contrato ou da emissão da ordem de serviço. {metodo_execucao}

Os serviços serão prestados no seguinte endereço: {local_execucao}. Os serviços serão prestados no seguinte horário: {horario_execucao}.

{#materiais_disponibilizados}

Para a perfeita execução dos serviços, o Contratado deverá disponibilizar os materiais, equipamentos, ferramentas e utensílios necessários, nas quantidades estimadas e qualidades a seguir estabelecidas, promovendo sua substituição quando necessário: {materiais_disponibilizados}.

{/materiais_disponibilizados}

{#dimensionamento_proposta}

A demanda do órgão tem como base as seguintes características: {dimensionamento_proposta}.

{/dimensionamento_proposta}

O prazo de garantia dos serviços é aquele estabelecido na Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor).

{#procedimentos_transicao}

Os procedimentos de transição e finalização do contrato constituem-se das seguintes etapas: {procedimentos_transicao}.

{/procedimentos_transicao}
{^procedimentos_transicao}

Não serão necessários procedimentos de transição e finalização do contrato devido às características do objeto.

{/procedimentos_transicao}

## 6. Modelo de gestão do contrato

O contrato deverá ser executado fielmente pelas partes, de acordo com as cláusulas avençadas e as normas da Lei nº 14.133, de 2021, e cada parte responderá pelas consequências de sua inexecução total ou parcial. As comunicações entre o órgão ou entidade e o Contratado devem ser realizadas por escrito sempre que o ato exigir tal formalidade, admitindo-se o uso de mensagem eletrônica para esse fim. O órgão ou entidade poderá convocar o preposto da empresa para adoção de providências que devam ser cumpridas de imediato.

O Contratado designará formalmente o preposto da empresa, antes do início da prestação dos serviços, indicando no instrumento os poderes e deveres em relação à execução do objeto Contratado. O Contratante poderá recusar, desde que justificadamente, a indicação ou a manutenção do preposto da empresa, hipótese em que o Contratado designará outro para o exercício da atividade.

A execução do contrato deverá ser acompanhada e fiscalizada pelo(s) fiscal(is) do contrato, ou pelos respectivos substitutos. O fiscal técnico do contrato acompanhará a execução do contrato, para que sejam cumpridas todas as condições estabelecidas no contrato, de modo a assegurar os melhores resultados para a Administração, anotando no histórico de gerenciamento do contrato todas as ocorrências relacionadas à execução do contrato. O fiscal administrativo do contrato verificará a manutenção das condições de habilitação da contratada, acompanhará o empenho, o pagamento, as garantias, as glosas e a formalização de apostilamento e termos aditivos.

A fiscalização de que trata esta cláusula não exclui nem reduz a responsabilidade do Contratado, inclusive perante terceiros, por qualquer irregularidade, ainda que resultante de imperfeições técnicas, vícios redibitórios, ou emprego de material inadequado ou de qualidade inferior.

## 7. Critérios de medição e pagamento

Os serviços serão recebidos provisoriamente, no prazo de {prazo_recebimento_provisorio} dias, pelos fiscais técnico e administrativo, mediante termos detalhados, quando verificado o cumprimento das exigências de caráter técnico e administrativo. O Contratado fica obrigado a reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no todo ou em parte, o objeto em que se verificarem vícios, defeitos ou incorreções resultantes da execução ou materiais empregados.

Os serviços serão recebidos definitivamente no prazo de {prazo_recebimento_definitivo} dias, contados do recebimento provisório, por servidor ou comissão designada pela autoridade competente, após a verificação da qualidade e quantidade do serviço e consequente aceitação mediante termo detalhado.

Recebida a Nota Fiscal ou documento de cobrança equivalente, correrá o prazo de dez dias úteis para fins de liquidação, prorrogáveis por igual período, nos termos do art. 7º, §3º da Instrução Normativa SEGES/ME nº 77/2022. A Nota Fiscal ou Fatura deverá ser obrigatoriamente acompanhada da comprovação da regularidade fiscal, constatada por meio de consulta on-line ao SICAF.

O pagamento será efetuado no prazo máximo de até dez dias úteis, contados da finalização da liquidação da despesa, nos termos da Instrução Normativa SEGES/ME nº 77, de 2022, por meio de ordem bancária, para crédito em banco, agência e conta corrente indicados pelo Contratado.

Os preços inicialmente contratados são fixos e irreajustáveis no prazo de um ano contado da data do orçamento estimado. Após o interregno de um ano, e independentemente de pedido do Contratado, os preços iniciais serão reajustados, mediante a aplicação, pelo Contratante, do {indice_reajuste}, exclusivamente para as obrigações iniciadas e concluídas após a ocorrência da anualidade. O reajuste será realizado por apostilamento.

## 8. Infrações e sanções administrativas

Comete infração administrativa, nos termos da Lei nº 14.133, de 2021, o Contratado que der causa à inexecução parcial ou total do contrato, ensejar o retardamento da execução ou da entrega do objeto da contratação sem motivo justificado, apresentar documentação falsa ou prestar declaração falsa durante a execução do contrato, praticar ato fraudulento na execução do contrato, comportar-se de modo inidôneo ou cometer fraude de qualquer natureza, ou praticar ato lesivo previsto no art. 5º da Lei nº 12.846, de 1º de agosto de 2013.

Serão aplicadas ao Contratado que incorrer nas infrações acima descritas as seguintes sanções: advertência, quando o Contratado der causa à inexecução parcial do contrato, sempre que não se justificar a imposição de penalidade mais grave; impedimento de licitar e contratar ou declaração de inidoneidade, conforme a gravidade da conduta; e multa moratória de {multa_moratoria_pct}% por dia de atraso injustificado sobre o valor da parcela inadimplida, ou multa compensatória de {multa_compensatoria_min_pct}% a {multa_compensatoria_max_pct}% do valor da contratação, conforme a infração.

A aplicação das sanções previstas neste Termo de Referência não exclui, em hipótese alguma, a obrigação de reparação integral do dano causado ao Contratante. Antes da aplicação da multa será facultada a defesa do interessado no prazo de 15 (quinze) dias úteis, contado da data de sua intimação, observando-se o procedimento previsto no caput e parágrafos do art. 158 da Lei nº 14.133, de 2021.

## 9. Forma e critérios de seleção do fornecedor e regime de execução

{^contratacao_direta}

O fornecedor será selecionado por meio da realização de procedimento de LICITAÇÃO, na modalidade {modalidade_licitacao}, sob a forma ELETRÔNICA, com adoção do critério de julgamento pelo {criterio_julgamento}.

{/contratacao_direta}
{#contratacao_direta}

O fornecedor será selecionado por meio de contratação direta com fundamento no {fundamento_contratacao_direta}.

{/contratacao_direta}

O regime de execução do objeto será de {regime_execucao}.

O critério de aceitabilidade de preços será o valor {criterio_preco} estimado para a contratação.

Para fins de habilitação, deverá o interessado comprovar os seguintes requisitos: prova de inscrição no Cadastro Nacional de Pessoas Jurídicas ou no Cadastro de Pessoas Físicas, conforme o caso; prova de regularidade fiscal perante a Fazenda Nacional, mediante apresentação de certidão expedida conjuntamente pela Secretaria da Receita Federal do Brasil (RFB) e pela Procuradoria-Geral da Fazenda Nacional (PGFN); prova de regularidade com o Fundo de Garantia do Tempo de Serviço (FGTS); prova de inexistência de débitos inadimplidos perante a Justiça do Trabalho (CNDT); prova de inscrição no cadastro de contribuintes Distrital ou Municipal relativo ao domicílio ou sede do fornecedor; e prova de regularidade com a Fazenda Distrital ou Municipal do domicílio ou sede do fornecedor.

Para fins de qualificação econômico-financeira: certidão negativa de falência expedida pelo distribuidor da sede do fornecedor; e balanço patrimonial, demonstração de resultado de exercício e demais demonstrações contábeis do último exercício social, já exigíveis e apresentados na forma da lei, comprovando índices de Liquidez Geral (LG), Liquidez Corrente (LC) e Solvência Geral (SG) superiores a 1 (um).

Para fins de qualificação técnica: {qualificacao_tecnica}.

## 10. Estimativas do valor da contratação

O custo estimado total da contratação, que é o máximo aceitável, é de R$ {valor_estimado_fmt} ({valor_estimado_extenso}). A estimativa de custo levou em consideração o risco envolvido na contratação e sua alocação entre Contratante e Contratado, conforme especificado na matriz de risco constante do Contrato.

## 11. Adequação orçamentária

{*projetos_contas}Declaramos que o custeio da presente contratação está previsto no {.projeto}.
{/projetos_contas}

## 12. Disposições finais

As informações contidas neste Termo de Referência não são classificadas como sigilosas, exceto o custo estimado da contratação, que possui caráter sigiloso até o julgamento das propostas, quando esse for o caso.

## 13. Obrigações do Contratante e do Contratado

São obrigações do Contratante: exigir o cumprimento de todas as obrigações assumidas pelo Contratado, de acordo com o Termo de Referência e seus anexos; receber o objeto no prazo e condições estabelecidas; notificar o Contratado, por escrito, sobre vícios, defeitos, incorreções, imperfeições, falhas ou irregularidades verificadas na execução do objeto contratual; acompanhar e fiscalizar a execução contratual e o cumprimento das obrigações pelo Contratado; efetuar o pagamento ao Contratado do valor correspondente à execução do objeto, no prazo, forma e condições estabelecidos; e aplicar ao Contratado as sanções previstas na lei e neste Termo de Referência. A Administração não responderá por quaisquer compromissos assumidos pelo Contratado com terceiros, ainda que vinculados à execução do objeto contratual.

O Contratado deve cumprir todas as obrigações constantes do Termo de Referência, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execução do objeto, observando ainda: atender às determinações regulares emitidas pelo fiscal contratual e prestar todo esclarecimento ou informação solicitados; alocar os empregados necessários ao perfeito cumprimento das disposições do Termo de Referência, com habilitação e conhecimento adequados; reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, os serviços nos quais se verificarem vícios, defeitos ou incorreções; responsabilizar-se pelos vícios e danos decorrentes da execução do objeto, de acordo com o Código de Defesa do Consumidor; não contratar, durante a vigência da contratação, cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, de dirigente do Contratante ou do fiscal ou gestor contratuais; responsabilizar-se pelo cumprimento das obrigações trabalhistas, sociais, previdenciárias, tributárias e as demais previstas em legislação específica, cuja inadimplência não transfere a responsabilidade ao Contratante; manter, durante toda a vigência da contratação, todas as condições exigidas para habilitação; e guardar sigilo sobre todas as informações obtidas em decorrência da execução do objeto.

## 14. Obrigações pertinentes à LGPD, extinção contratual, casos omissos, alterações e foro

As partes deverão cumprir a Lei nº 13.709, de 14 de agosto de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em razão da licitação ou da contratação. Os dados obtidos somente poderão ser utilizados para as finalidades que justificaram seu acesso, sendo vedado o compartilhamento com terceiros fora das hipóteses permitidas em lei.

A contratação será extinta quando cumpridas as obrigações de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto, ou poderá ser extinta antes de cumpridas as obrigações nela estipuladas por algum dos motivos previstos no artigo 137 da Lei nº 14.133/2021, bem como amigavelmente, assegurados o contraditório e a ampla defesa.

Os casos omissos serão decididos pelo Contratante, segundo as disposições contidas na Lei nº 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei nº 8.078, de 1990 (Código de Defesa do Consumidor) e normas e princípios gerais dos contratos.

Eventuais alterações contratuais reger-se-ão pela disciplina dos arts. 124 e seguintes da Lei nº 14.133, de 2021. O Contratado é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado da contratação.

Fica definido o Foro da Justiça Federal em {foro}, Seção Judiciária de {foro}, para dirimir os litígios que decorrerem da execução contratual que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei nº 14.133, de 2021.
