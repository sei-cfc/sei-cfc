/* GERADO por agente-ia/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
import{a as p,b as E,r as P,s as A}from"./chunk-CWEJDRMD.js";var D={"checklist-contratual.md":`# Checklist \u2014 altera\xE7\xF5es contratuais (prorroga\xE7\xE3o, reajuste, repactua\xE7\xE3o, apostila, aditivo)

Cada item tem um id e um grau. Cite o id no campo \`checklist\` do achado: o grau decide sozinho se o
achado impede o prosseguimento \u2014 voc\xEA n\xE3o precisa (nem deve) julgar isso.

- **[I] impeditivo**: descumprimento objetivo de contrato/TR/lei, aus\xEAncia de pe\xE7a essencial da etapa ou
  incompatibilidade relevante entre documentos. Leva a DVI/devolu\xE7\xE3o.
- **[R] recomenda\xE7\xE3o**: escolha discricion\xE1ria sem motiva\xE7\xE3o suficiente, erro formal sem efeito no valor
  ou na legalidade, ou sugest\xE3o de melhoria. N\xE3o impede o envio \xE0 Gecont.

Confira primeiro sob qual lei o contrato foi celebrado (art. 190 da Lei n\xBA 14.133/2021 preserva o regime
antigo). O que rege a altera\xE7\xE3o \xE9 o contrato, o TR/edital e os aditivos \u2014 cite a cl\xE1usula.

## Limite da etapa

N\xE3o aponte como pend\xEAncia: nota de reserva/empenho do novo per\xEDodo, minuta do termo ou apostila,
parecer jur\xEDdico, autoriza\xE7\xE3o final, assinatura ou publica\xE7\xE3o do instrumento. S\xE3o etapas posteriores.

## G \u2014 comum a qualquer altera\xE7\xE3o

| Id | Verificar | Grau |
|---|---|---|
| [G01][I] | Regime jur\xEDdico misturado (cl\xE1usulas da Lei n\xBA 8.666/1993 em contrato da Lei n\xBA 14.133/2021 ou vice-versa) | I |
| [G02][I] | Contrato j\xE1 expirado na data da an\xE1lise, ou prazo restante incompat\xEDvel com o fluxo (aditivo tem de ser assinado dentro da vig\xEAncia) | I |
| [G03][I] | Vig\xEAncia, valor ou objeto informados de forma divergente entre formul\xE1rio, contrato, publica\xE7\xE3o (PNCP), proposta ou pesquisa | I |
| [G04][I] | Manifesta\xE7\xE3o da contratada (anu\xEAncia/interesse/proposta) ausente, ou que identifica outro contrato/valor/objeto | I |
| [G05][I] | Certid\xE3o ou registro de regularidade vencido na data da an\xE1lise, ou ausente quando exigido pelo contrato (SICAF, FGTS, CNDT, fazendas, TCU, CGU/CEIS, CNJ, fal\xEAncia) | I |
| [G06][I] | Signat\xE1rio indicado pela contratada sem poder de representa\xE7\xE3o demonstrado nos autos (estatuto/contrato social/procura\xE7\xE3o: quem assina, se em conjunto, prazo do mandato) | I |
| [G07][R] | Ocorr\xEAncia ou registro em cadastro (SICAF "Consta", san\xE7\xE3o n\xE3o impeditiva) sem esclarecimento nos autos | R |
| [G08][R] | Manifesta\xE7\xE3o do gestor/fiscais gen\xE9rica, sem fatos da execu\xE7\xE3o (ocorr\xEAncias, glosas, atrasos, quantitativos) | R |
| [G09][R] | Portaria de gest\xE3o/fiscaliza\xE7\xE3o desatualizada ou com dado incorreto (modalidade, objeto), sem afetar a compet\xEAncia dos signat\xE1rios | R |
| [G10][I] | Documento essencial ileg\xEDvel ou sem conte\xFAdo (p\xE1gina em branco, imagem sem OCR) quando dele depende a verifica\xE7\xE3o \u2014 registrar como n\xE3o examinado | I |
| [G11][R] | Garantia contratual, quando exigida, sem comprova\xE7\xE3o de cobertura do novo prazo/valor | R |

## B \u2014 prorroga\xE7\xE3o de servi\xE7o ou fornecimento cont\xEDnuo

Base de busca: Lei n\xBA 14.133/2021, arts. 6\xBA, XV, e 105 a 107; contrato e TR.

| Id | Verificar | Grau |
|---|---|---|
| [B01][I] | Prorroga\xE7\xE3o n\xE3o prevista no contrato/TR, ou limite total de vig\xEAncia ultrapassado | I |
| [B02][R] | Natureza continuada do servi\xE7o n\xE3o demonstrada formalmente (o contrato costuma exigir) | R |
| [B03][R] | Relat\xF3rio/avalia\xE7\xE3o de execu\xE7\xE3o ausente ou sem atestar presta\xE7\xE3o regular | R |
| [B04][I] | Vantajosidade n\xE3o demonstrada: pesquisa sem fonte, sem m\xE9todo declarado, ou conclus\xE3o que n\xE3o decorre dos dados | I |
| [B05][R] | Pesquisa que descarta fontes p\xFAblicas compar\xE1veis (PNCP, contratos similares) sem reavaliar por pre\xE7o unit\xE1rio ou propor\xE7\xE3o | R |
| [B06][I] | M\xE9todo estat\xEDstico rotulado de forma diversa do c\xE1lculo feito (ex.: "mediana" que \xE9 m\xE9dia) ou conta errada | I |
| [B07][I] | Proposta/pre\xE7o de fornecedor identificado pelo pr\xF3prio mapa e n\xE3o incorporado \xE0 compara\xE7\xE3o | I |
| [B08][R] | Custos n\xE3o renov\xE1veis do primeiro per\xEDodo mantidos sem justificativa | R |
| [B09][I] | Reajuste, repactua\xE7\xE3o ou reequil\xEDbrio pendente tratado como concedido sem ato nos autos, ou omitido | I |

## C \u2014 reajuste por \xEDndice, repactua\xE7\xE3o, apostila

Base de busca: Lei n\xBA 14.133/2021, arts. 25, \xA7\xA7 7\xBA e 8\xBA, 92, 123, 135 e 136; TR/contrato.

| Id | Verificar | Grau |
|---|---|---|
| [C01][I] | Data-base do c\xE1lculo diferente da fixada no TR/contrato (or\xE7amento estimado, proposta ou outra) | I |
| [C02][I] | Interregno m\xEDnimo de um ano n\xE3o cumprido a partir do marco contratual correto | I |
| [C03][I] | \xCDndice diverso do contratual, per\xEDodo acumulado errado, f\xF3rmula n\xE3o aplicada ou conta que n\xE3o fecha (refa\xE7a com \`gelic.py calc indice\`) | I |
| [C04][I] | Mem\xF3ria de c\xE1lculo ausente (\xEDndices inicial e final, fonte, per\xEDodo) | I |
| [C05][R] | Reajuste apresentado como concedido em data que \xE9 a da proposta, sem ato formal (TR costuma prever apostilamento) | R |
| [C06][I] | Repactua\xE7\xE3o sem CCT/acordo vigente, sem planilha original \xD7 nova ou com itens vedados | I |
| [C07][R] | Preclus\xE3o/ressalva de repactua\xE7\xE3o em prorroga\xE7\xE3o anterior n\xE3o examinada | R |
| [C08][I] | Instrumento errado: apostila para o que exige aditivo (prorroga\xE7\xE3o, altera\xE7\xE3o de objeto, reequil\xEDbrio) ou vice-versa | I |

## D \u2014 aditivo quantitativo ou qualitativo

Base de busca: Lei n\xBA 14.133/2021, arts. 124 a 130.

| Id | Verificar | Grau |
|---|---|---|
| [D01][I] | Justificativa t\xE9cnica ausente ou altera\xE7\xE3o que transfigura o objeto | I |
| [D02][I] | Acr\xE9scimos/supress\xF5es acima do limite legal, ou calculados sobre base errada (devem incidir sobre o valor inicial atualizado, acumulando aditivos anteriores), ou compensados entre si | I |
| [D03][I] | Pre\xE7o novo sem aferi\xE7\xE3o de mercado; em obras, desconto global n\xE3o preservado | I |
| [D04][R] | Impacto em prazo, riscos, quantitativos ou garantia n\xE3o analisado | R |
| [D05][I] | Execu\xE7\xE3o antecipada sem cobertura contratual, salvo hip\xF3tese legal demonstrada | I |

## E \u2014 reequil\xEDbrio econ\xF4mico-financeiro

Base de busca: Lei n\xBA 14.133/2021, arts. 103, 124, II, "d", 131 e 134.

| Id | Verificar | Grau |
|---|---|---|
| [E01][I] | Fato superveniente, imprevis\xEDvel ou de consequ\xEAncia incalcul\xE1vel n\xE3o identificado, ou risco alocado \xE0 requerente pela matriz de riscos | I |
| [E02][I] | Impacto sem demonstra\xE7\xE3o anal\xEDtica (inclui \xE1lea ordin\xE1ria ou infla\xE7\xE3o j\xE1 coberta pelo reajuste) | I |
| [E03][R] | Pedido feito ap\xF3s a prorroga\xE7\xE3o sem ressalva, quando o contrato exigia ressalva | R |

## Compatibilidade final (vai no bloco \`compatibilidade\`)

Compare entre si: vig\xEAncia atual, novo per\xEDodo, valor atual e pretendido, objeto, quantidades,
percentual, \xEDndice/data-base, CNPJ do contratado, anu\xEAncia, regularidade, manifesta\xE7\xF5es de gestor e
fiscais, regime jur\xEDdico. Diverg\xEAncia entre documentos \u2192 G03 ou G04.
`,"checklist-preparatoria.md":`# Checklist \u2014 fase preparat\xF3ria (preg\xE3o, dispensa, inexigibilidade, concorr\xEAncia, ades\xE3o, credenciamento)

Cada item tem um id e um grau. Cite o id no campo \`checklist\` do achado: o grau decide sozinho se o
achado impede o prosseguimento.

- **[I] impeditivo**: descumprimento objetivo, aus\xEAncia de pe\xE7a essencial da etapa ou incompatibilidade
  relevante entre documentos. Leva a DVI/devolu\xE7\xE3o.
- **[R] recomenda\xE7\xE3o**: escolha discricion\xE1ria sem motiva\xE7\xE3o suficiente, erro formal ou melhoria. N\xE3o
  impede o envio \xE0 Gecont.

\xC9 uma rede de verifica\xE7\xE3o, n\xE3o presun\xE7\xE3o de erro. Cite o item do documento e a norma ou cl\xE1usula.

## Limite da etapa

N\xE3o aponte como ausentes: reserva or\xE7ament\xE1ria, minuta preparada pela Gelic, parecer da Projur, aviso,
edital, autoriza\xE7\xE3o final, contrato, publica\xE7\xE3o ou documentos de habilita\xE7\xE3o do futuro fornecedor.

## Um fato, um id

Cada fato vai num s\xF3 id, o mais espec\xEDfico da tabela abaixo, e num s\xF3 lugar: no bloco do documento em que o
fato est\xE1 escrito (o que cont\xE9m, declara ou cita), ou em \`compatibilidade\` quando o fato \xE9 a diferen\xE7a entre
documentos. N\xE3o repita o fato em outro id. O item vizinho recebe o status do que ele pr\xF3prio exige.

| Fato | Id |
|---|---|
| Objeto, natureza, quantidade ou vig\xEAncia do TR diferente do ETP (mesmo que o DFD acompanhe um dos lados) | R01 |
| Prazo de execu\xE7\xE3o ou de entrega ausente no TR, ou remetido \xE0 ordem de servi\xE7o | R09 |
| DFD diferente do ETP e do TR, quando os dois concordam entre si | F02 |
| Valor estimado do ETP diferente do MCP ou do TR | T04 |
| MCP diferente do DFD, do ETP ou do TR | P06 |
| N\xFAmero do processo, unidade ou modalidade diferentes entre as pe\xE7as | A01 |
| Fonte da pesquisa de pre\xE7os declarada juntada e ausente (relat\xF3rio de pesquisa, comprovante de consulta, proposta, or\xE7amento) | P01 |
| Outro anexo ou documento citado e ausente; t\xEDtulo do SEI diferente do conte\xFAdo | A08 |

## A \u2014 instru\xE7\xE3o geral

| Id | Verificar | Grau |
|---|---|---|
| [A01][I] | N\xFAmero do processo, objeto, modalidade, valor ou unidade divergentes entre as pe\xE7as | I |
| [A02][I] | Pe\xE7a assinada/aprovada por quem n\xE3o det\xE9m compet\xEAncia, ou sem assinatura | I |
| [A03][I] | Portarias de equipe de planejamento / gest\xE3o e termos de cientifica\xE7\xE3o ausentes quando exig\xEDveis | I |
| [A04][R] | Demanda fora do PCA vigente sem justificativa formal | R |
| [A05][I] | Ind\xEDcio de divis\xE3o artificial da contrata\xE7\xE3o (fracionamento) sem justificativa | I |
| [A06][R] | Documento substitu\xEDdo sem que se saiba qual vers\xE3o prevalece | R |
| [A07][I] | Documento essencial ileg\xEDvel ou sem conte\xFAdo \u2014 registrar como n\xE3o examinado | I |
| [A08][R] | Encaminhamento sem identificar objeto, finalidade ou anexos; anexo declarado inexistente | R |
| [A09][R] | Cronologia invertida: DFD posterior ao ETP/TR, pe\xE7a assinada depois do despacho de encaminhamento ou termo de cientifica\xE7\xE3o anterior \xE0 portaria de designa\xE7\xE3o (ver _checagens.md) | R |

## F \u2014 DFD

Base: Lei n\xBA 14.133/2021, arts. 12, VII, 18 e 72, I; Decreto n\xBA 10.947/2022 se adotado.

| Id | Verificar | Grau |
|---|---|---|
| [F01][I] | Falta necessidade, objeto, quantidade, estimativa preliminar, data pretendida ou respons\xE1vel | I |
| [F02][I] | Objeto, quantidade ou valor incompat\xEDveis com ETP, TR ou MCP | I |

## T \u2014 ETP

Base: Lei n\xBA 14.133/2021, art. 18, \xA7\xA7 1\xBA a 3\xBA; IN Seges n\xBA 58/2022 como norma ou par\xE2metro. Antes de
apontar ETP ausente, verifique se \xE9 facultativo ou dispensado no caso.

| Id | Verificar | Grau |
|---|---|---|
| [T01][I] | Necessidade gen\xE9rica, sem problema concreto de interesse p\xFAblico | I |
| [T02][I] | Quantidades sem mem\xF3ria de c\xE1lculo | I |
| [T03][R] | Alternativas de mercado n\xE3o comparadas ou raz\xE3o da solu\xE7\xE3o n\xE3o explicada | R |
| [T04][I] | Estimativa de valor sem fonte/mem\xF3ria ou incoerente com MCP/TR | I |
| [T05][R] | Parcelamento (ou n\xE3o) sem justificativa | R |
| [T06][R] | Ciclo de vida, resultados, provid\xEAncias, contrata\xE7\xF5es correlatas ou impactos ambientais omitidos quando cab\xEDveis | R |
| [T07][I] | Sem conclus\xE3o de viabilidade, assinatura ou aprova\xE7\xE3o competente | I |

## R \u2014 TR ou projeto

Base: Lei n\xBA 14.133/2021, arts. 6\xBA, XXIII, 18 e 40; IN Seges/ME n\xBA 81/2022 como norma ou par\xE2metro.

| Id | Verificar | Grau |
|---|---|---|
| [R01][I] | Objeto, natureza, quantidades, vig\xEAncia ou prorroga\xE7\xE3o ausentes ou incoerentes com o ETP (prazo de execu\xE7\xE3o/entrega: R09) | I |
| [R02][I] | Especifica\xE7\xE3o com direcionamento indevido (marca, caracter\xEDstica exclusiva sem justificativa) | I |
| [R03][I] | Modelo de execu\xE7\xE3o/gest\xE3o, recebimento, medi\xE7\xE3o ou pagamento ausentes | I |
| [R04][I] | Habilita\xE7\xE3o/atestados desproporcionais ou n\xE3o limitados \xE0s parcelas relevantes | I |
| [R05][I] | Reajuste sem \xEDndice, data-base ou periodicidade, ou incompat\xEDveis com a lei e o objeto | I |
| [R06][R] | Garantia, san\xE7\xF5es, sustentabilidade, CATMAT/CATSER ou obriga\xE7\xF5es omitidos quando cab\xEDveis | R |
| [R07][I] | Sem assinatura/aprova\xE7\xE3o competente, ou incoerente com DFD, ETP, MCP e riscos | I |
| [R08][R] | Instrumento contratual longo para compra pontual quando a lei admite substitutivo | R |
| [R09][I] | Prazo de execu\xE7\xE3o ou de entrega (por etapa, parcela ou onda) ausente, ou remetido \xE0 ordem de servi\xE7o sem par\xE2metro no TR | I |

## P \u2014 pesquisa de pre\xE7os e Mapa Comparativo

Base: Lei n\xBA 14.133/2021, art. 23; IN Seges/ME n\xBA 65/2021 como norma ou par\xE2metro. M\xE9dia, mediana e
menor valor s\xE3o m\xE9todos poss\xEDveis; o apontamento decorre dos dados, n\xE3o de prefer\xEAncia autom\xE1tica.

| Id | Verificar | Grau |
|---|---|---|
| [P01][I] | Falta respons\xE1vel, objeto, fontes, datas, condi\xE7\xF5es comerciais, s\xE9rie de pre\xE7os ou m\xE9todo declarado | I |
| [P02][R] | Fontes p\xFAblicas e contrata\xE7\xF5es similares n\xE3o priorizadas, ou pesquisa direta sem justificar a escolha dos fornecedores | R |
| [P03][I] | Pre\xE7os desatualizados ou n\xE3o compar\xE1veis (especifica\xE7\xE3o, escala, prazo, frete, local) sem tratamento | I |
| [P04][I] | M\xE9dia, mediana, total ou quantidade \xD7 unit\xE1rio errados, ou m\xE9todo rotulado diverso do c\xE1lculo (refa\xE7a com \`gelic.py calc\`) | I |
| [P05][I] | Pre\xE7o inexequ\xEDvel, inconsistente ou excessivo mantido sem an\xE1lise cr\xEDtica motivada | I |
| [P06][I] | Sem assinatura ou incoerente com DFD, ETP e TR | I |

## K \u2014 an\xE1lise/mapa de riscos

Base: Lei n\xBA 14.133/2021, arts. 18, X, 22 e 103.

| Id | Verificar | Grau |
|---|---|---|
| [K01][R] | Mapa gen\xE9rico: riscos sem probabilidade, impacto, preven\xE7\xE3o, conting\xEAncia ou respons\xE1vel | R |
| [K02][R] | Confus\xE3o entre mapa de riscos do planejamento e matriz de aloca\xE7\xE3o contratual | R |
| [K03][R] | Sem assinatura da equipe competente | R |
| [K04][R] | An\xE1lise de riscos ausente quando cab\xEDvel (art. 18, X; art. 72, I, "se for o caso"): contrata\xE7\xE3o de valor ou complexidade relevante sem mapa nem justificativa da dispensa da an\xE1lise | R |

## M \u2014 particularidades do enquadramento

Conferir se os autos demonstram a hip\xF3tese legal invocada (inviabilidade de competi\xE7\xE3o, exclusividade,
not\xF3ria especializa\xE7\xE3o, inciso do art. 75) \xE9 exame de fundamento, n\xE3o de m\xE9rito t\xE9cnico: aponte quando faltar.

| Id | Tipo | Verificar | Grau |
|---|---|---|---|
| [M01][I] | Preg\xE3o | Objeto n\xE3o comum, crit\xE9rio/modo incoerentes, SRP sem justificativa | I |
| [M02][I] | Concorr\xEAncia | Projetos, responsabilidade t\xE9cnica, regime, custos de refer\xEAncia, licen\xE7as ou matriz obrigat\xF3ria ausentes | I |
| [M03][I] | Dispensa | Enquadramento no art. 75 n\xE3o indicado ou incompat\xEDvel com o objeto, ou fracionamento (requisitos da hip\xF3tese: s\xE9rie J) | I |
| [M04][I] | Inexigibilidade | Inviabilidade de competi\xE7\xE3o n\xE3o demonstrada ou hip\xF3tese do art. 74 incompat\xEDvel com o objeto (requisitos da hip\xF3tese: s\xE9rie J); n\xE3o demonstrada quando os autos trazem propostas, cota\xE7\xF5es ou pesquisa de mercado de mais de um prestador para o mesmo objeto e a justificativa n\xE3o explica por que a competi\xE7\xE3o \xE9 invi\xE1vel | I |
| [M05][I] | Ades\xE3o | TR/ETP pr\xF3prios, exata compatibilidade, vig\xEAncia/quantitativos da ata, vantajosidade ou aceite ausentes | I |
| [M06][I] | Credenciamento | Hip\xF3tese legal, crit\xE9rio objetivo de distribui\xE7\xE3o ou condi\xE7\xF5es padronizadas ausentes | I |

## J \u2014 contrata\xE7\xE3o direta (inexigibilidade e dispensa)

Base: Lei n\xBA 14.133/2021, arts. 72, 74 e 75. Entra no check-list quando o tipo \xE9 inexigibilidade ou dispensa, ou quando h\xE1 justificativa de contrata\xE7\xE3o direta nos autos. Os incisos III, IV e VIII do art. 72 (parecer jur\xEDdico, recursos or\xE7ament\xE1rios, autoriza\xE7\xE3o) pertencem a etapas posteriores ao envio \xE0 Gecont: n\xE3o aponte a aus\xEAncia deles (J03).

| Id | Verificar | Grau |
|---|---|---|
| [J01][I] | Art. 72, I \u2014 DFD e, conforme o caso, ETP, an\xE1lise de riscos e TR ou projeto b\xE1sico ausentes | I |
| [J02][I] | Art. 72, II \u2014 estimativa de despesa ausente ou n\xE3o calculada na forma do art. 23 | I |
| [J03][R] | Art. 72, III, IV e VIII \u2014 parecer t\xE9cnico citado e n\xE3o juntado (parecer jur\xEDdico, recursos or\xE7ament\xE1rios e autoriza\xE7\xE3o s\xE3o etapa posterior: nao_se_aplica) | R |
| [J04][I] | Art. 72, V \u2014 requisitos de habilita\xE7\xE3o e de qualifica\xE7\xE3o m\xEDnima do contratado n\xE3o definidos, ou documentos do contratado j\xE1 juntados vencidos ou em nome de outro CNPJ | I |
| [J05][I] | Art. 72, VI \u2014 raz\xE3o da escolha do contratado ausente ou gen\xE9rica | I |
| [J06][I] | Art. 72, VII, e art. 23, \xA7 4\xBA \u2014 justificativa de pre\xE7o ausente; ou, quando o valor n\xE3o p\xF4de ser estimado na forma do art. 23, \xA7\xA7 1\xBA a 3\xBA, sem compara\xE7\xE3o com pre\xE7os praticados pelo contratado em contrata\xE7\xF5es semelhantes (notas fiscais de outros contratantes ou outro meio id\xF4neo) | I |
| [J07][I] | Art. 74, III, e \xA7 3\xBA \u2014 not\xF3ria especializa\xE7\xE3o n\xE3o demonstrada (desempenho anterior, estudos, experi\xEAncia, publica\xE7\xF5es, equipe t\xE9cnica) ou servi\xE7o sem natureza predominantemente intelectual | I |
| [J08][I] | Art. 74, \xA7 4\xBA \u2014 profissionais cuja qualifica\xE7\xE3o justifica a inexigibilidade n\xE3o identificados, ou TR que admite subcontrata\xE7\xE3o ou substitui\xE7\xE3o por profissionais distintos | I |
| [J09][I] | Art. 74, I, e \xA7 1\xBA \u2014 exclusividade sem atestado, contrato de exclusividade, declara\xE7\xE3o do fabricante ou outro documento id\xF4neo | I |
| [J10][I] | Art. 75 \u2014 requisitos f\xE1ticos do inciso invocado n\xE3o demonstrados (valor: somat\xF3rio no exerc\xEDcio, \xA7 1\xBA; emerg\xEAncia: situa\xE7\xE3o e prazo) | I |

## Compatibilidade final (vai no bloco \`compatibilidade\`)

Compare, no m\xEDnimo: objeto, itens e quantidades, unidade, valor, prazos, vig\xEAncia, parcelamento,
modalidade/fundamento, reajuste, garantia, habilita\xE7\xE3o, assinaturas e vers\xF5es. Diverg\xEAncia \u2192 o id da tabela
"Um fato, um id"; A01 s\xF3 para n\xFAmero do processo, unidade ou modalidade, ou quando nenhuma linha dela serve.
`};var S={preparatoria:["preparatoria","pregao","dispensa","inexigibilidade","concorrencia","adesao","credenciamento"],prorrogacao:["prorrogacao","aditivo"],reajuste:["reajuste","repactuacao","apostilamento"]},N={preparatoria:"checklist-preparatoria.md",prorrogacao:"checklist-contratual.md",reajuste:"checklist-contratual.md"},b=/^contrato\b|termo aditivo|apostila|termo de contrato/;function ve(e,a){if(a){let n=p(a);for(let[r,s]of Object.entries(S))if(s.includes(n))return{familia:r,tipo:n};throw new Error(`tipo desconhecido: ${a}. Use um de: ${Object.values(S).flat().join(", ")}`)}return e.some(n=>b.test(p(n)))?{familia:"prorrogacao",tipo:"prorrogacao (inferido)"}:{familia:"preparatoria",tipo:"preparatoria (inferido)"}}var V={preparatoria:["A","F","T","R","P","K","M"],prorrogacao:["G","B"],reajuste:["G","C"]},B=/indice|ipca|inpc|igp|reajust|repactua|apostila/,y=/inexigibilidade|dispensa de licitacao|contratacao direta|dispensa eletronica/,J=["inexigibilidade","dispensa"];function G(e,a,t,n=[]){let r=[...V[e]??[]];if(e==="preparatoria"&&!r.includes("J")){let s=J.includes(p(t??"").trim());s||=a.some(i=>y.test(p(i))),(s||n.some(i=>i.startsWith("J")))&&r.push("J")}return e==="prorrogacao"&&!r.includes("C")&&(a.some(i=>B.test(p(i)))||n.some(i=>i.startsWith("C")))&&r.splice(r.indexOf("B")+1,0,"C"),r}var $=/^## ([A-Z]) — (.+?)\s*$/gm,w=/^\|\s*\[(?<id>[A-Z]\d{2})\]\s*\[(?<grau>[IR])\]\s*\|(?<meio>.*)\|\s*[IR]\s*\|\s*$/gm;function H(e,a="checklist"){let t={};for(let s of e.matchAll($))t[s[1]]=s[2];let n=[],r={};for(let s of e.matchAll(w)){let{id:i,grau:m,meio:f}=s.groups,g=f.split("|").map(h=>h.trim()).filter(Boolean),v={id:i,serie:i[0],grau:m,texto:g.join(" \u2014 "),ordem:n.length};if(!(v.serie in t))throw new Error(`${a}: item ${i} fora de qualquer s\xE9rie '## X \u2014 ...'`);if(i in r)throw new Error(`${a}: id repetido ${i}`);n.push(v),r[i]=v}return{series:t,itens:n,porId:r}}var U={};function K(e){let a=D[e];if(a===void 0)throw new Error(`checklist desconhecido: ${e}`);return U[e]??=H(a,e)}function Ie(e,a){return K(N[e]).itens.filter(t=>a.includes(t.serie)).map(({id:t,texto:n,grau:r})=>({id:t,texto:n,grau:r}))}var j=/verificacao inicial|\bdvi\b|^despacho|encaminh|memorando/,M=/termo de referencia|\btr\b|projeto basico/,X={preparatoria:[j,b,M,/\bdfd\b|formalizacao de demanda|formalizacao da demanda/,/estudo tecnico|\betp\b/,/mapa comparativo|\bmcp\b|pesquisa de pre|justificativa de pre|banco de pre|cotac|proposta|orcamento/,/risco/,/portaria|cientifica|declaracao/,/\bpca\b|plano de contrata/,/autorizac|aviso|edital|minuta/],prorrogacao:[j,b,/prorroga|renova|formulario/,/proposta|oficio|manifesta|anuencia|interesse|e-mail|email/,/mapa comparativo|\bmcp\b|pesquisa de pre|justificativa de pre|banco de pre|cotac|nota fiscal|\bnf\b/,/certid|sicaf|\bcnd\b|cndt|fgts|regularidade|\btcu\b|\bcnj\b|\bcgu\b|ceis/,/procura|estatuto|contrato social|ata\b|representa|alteracao/,/garantia|seguro|fianca|apolice/,/relatorio|fiscaliza|execucao|ocorrencia/,/indice|ipca|inpc|igp|reajust|repactua|planilha|\bcct\b|convencao/,/portaria/],reajuste:[j,b,/reajust|repactua|apostila|revisao|reequilibrio|pedido|requerimento|solicita/,/indice|ipca|inpc|igp|planilha|\bcct\b|convencao|dissidio|memoria/,/proposta|oficio|manifesta|e-mail|email/,/certid|sicaf|regularidade/,/portaria|relatorio|fiscaliza/,/formulario|prorroga/,/procura|estatuto|contrato social|ata\b|representa|alteracao/,/garantia|seguro|fianca|apolice/]},Q=new RegExp("vig[e\xEA]ncia|prorroga|reajust|repactua|data-base|[\xEDi]ndice|ipca|inpc|igp|habilita|regularidade|garantia|san\xE7|penalidad|extin|rescis|dota[\xE7c]|apostil|aditivo|natureza continuada|cont\xEDnu","iu"),W=new RegExp("representa[r\xE7]|assinar|em conjunto|isoladamente|procura[\xE7d]|mandato|poderes para|compete ao (presidente|diretor|vice)|substitui o presidente|responsabilidade financeira","iu"),Z=/estatuto|contrato social|ata\b|alteracao contratual|requerimento de empresario/,Y={preparatoria:25,prorrogacao:8,reajuste:8},k=new RegExp("termo de referencia|\\btr\\b|projeto basico|estudo tecnico|\\betp\\b|\\bdfd\\b|formalizacao d[ae] demanda|inexigibilidade|dispensa|justificativa|escolha d[oa] (contratad|fornecedor)|mapa comparativo|\\bmcp\\b|pesquisa de (mercado|precos)|parametros prioritarios"),ee=/verificacao inicial|\bdvi\b/,x=3e3,oe={preparatoria:12e4,prorrogacao:6e4,reajuste:6e4},ae=/Documento assinado eletronicamente por\s+(?<nome>.+?)\s*,\s*(?<cargo>.+?)\s*,\s*em\s*(?<data>\d{2}\/\d{2}\/\d{4}).*?10\.543,?\s*de\s*13\s*de\s*novembro\s*de\s*2020\s*\.?/gs,ne=/A autenticidade deste documento pode ser conferida.*?c[óo]digo CRC\s*[0-9A-F]{6,10}\s*\.?/gs,te=/Refer[êe]ncia:\s*Processo n[ºo°]\s*[\d./-]+\s*SEI n[ºo°]\s*\d+/g,ie=/SAUS Quadra 05.*?cfc@cfc\.org\.br/gs,re=new RegExp("^\\s*(?:.*\\(?\\d{6,8}\\)?\\s+SEI\\s+\\d{5,20}\\.\\d{6}/\\d{4}-\\d{2}\\s*/\\s*pg\\.\\s*\\d+.*|\\d+\\s+de\\s+\\d+|Assinado eletronicamente via SEI na data consignada|\\s*)$");function se(e){let a=n=>n.replace(/\s+/g," ").trim();e=e.replace(ae,(...n)=>{let r=n[n.length-1];return`[assinado eletronicamente: ${a(r.nome)}, ${a(r.cargo)}, ${r.data}]`}),e=e.replace(ne,"").replace(te,"").replace(ie,"");let t=[];for(let n of E(e))if(!(re.test(n)&&!n.startsWith("[[p."))){if(n=n.trimEnd(),t.length&&/^\s*[,.;:)]\s*$/.test(n)){t[t.length-1]+=n.trim();continue}t.push(n)}return t.join(`
`)}function ce(e,a,t=1){let n=E(e),r=new Set;n.forEach((m,f)=>{if(m.startsWith("[[p.")||a.test(m))for(let g=Math.max(0,f-t);g<Math.min(n.length,f+t+1);g++)r.add(g)});let s=[],i=-2;for(let m of[...r].sort((f,g)=>f-g))m!==i+1&&s.push("[...]"),s.push(n[m]),i=m;return s.join(`
`)}var F=/^\[\[p\. \d+\]\]/gm;function L(e){return e.nPags?e.nPags:A(F,e.texto??"").length||Math.max(1,Math.ceil((e.texto??"").length/x))}function de(e){let a=A(F,e);if(a.length>=2)return e.slice(0,a[1].index);if(a.length||e.length<=x)return e;let t=e.lastIndexOf(`
`,x);return e.slice(0,t>x/2?t:x)}var z=(e,a)=>{let t=null;return e.forEach((n,r)=>{a.test(p(n.titulo))&&(t=r)}),t};function ue(e,a,t){let n=G(a,e.map(c=>c.titulo),t),r=X[a],s=z(e,b),i=z(s!==null?e.slice(0,s):e,M),m=Y[a],f={};for(let c of e){let o=P(c.titulo,c.texto??"");o&&(f[c.seq]=o)}let g=c=>f[c.seq]?p(`${c.titulo} ${f[c.seq]}`):p(c.titulo),v={};e.forEach((c,o)=>{let d=b.test(p(c.titulo)),l;a!=="preparatoria"&&s!==null&&o<s?l=d?"integral":o===i?"recorte":"nao_lido":d||a==="preparatoria"&&k.test(g(c))?l="integral":r.some(I=>I.test(g(c)))?l=L(c)<=m?"integral":"recorte":L(c)<=2?l="integral":l="primeira_pagina",v[c.seq]=l});let h=null;return e.forEach((c,o)=>{ee.test(p(c.titulo))&&(a==="preparatoria"||s===null||o>s)&&(h=c.seq)}),{familia:a,series:n,modos:v,rotulos:f,contrato:s!==null?e[s].seq:null,dviAnterior:h}}function T(e,a){let t=e.texto??"",n;if(a==="recorte")n=ce(t,Z.test(p(e.titulo))?W:Q);else if(a==="primeira_pagina")n=de(t);else if(a==="integral")n=t;else return"";return se(n).trim()}var me=1500,O=e=>`
[... ${e} caracteres cortados pelo limite do pacote; leia com documento_ler se precisar]`;function le(e,a,t){let n=new Map(e.map(o=>[o.seq,o])),r=o=>o.seq===a.contrato||a.familia==="preparatoria"&&k.test(a.rotulos[o.seq]?p(`${o.titulo} ${a.rotulos[o.seq]}`):p(o.titulo)),s=e.filter(o=>a.modos[o.seq]!=="nao_lido"),i=new Map(s.map(o=>[o.seq,{seq:o.seq,modo:a.modos[o.seq],texto:T(o,a.modos[o.seq]),cortado:0}])),m=()=>[...i.values()].reduce((o,d)=>o+d.texto.length,0),f=[],g=o=>o.sort((d,l)=>l.texto.length-d.texto.length||d.seq-l.seq),v=(o,d)=>{for(;;){if(m()<=t)return;let l=g([...i.values()].filter(u=>o(n.get(u.seq))&&d[u.modo])),I=!1;for(let u of l){let R=d[u.modo],q=T(n.get(u.seq),R);if(q.length<u.texto.length){i.set(u.seq,{...u,modo:R,texto:q}),I=!0;break}let C=d[R];if(C){let _=T(n.get(u.seq),C);if(_.length<u.texto.length){i.set(u.seq,{...u,modo:C,texto:_}),I=!0;break}}}if(!I)return}};v(o=>!r(o),{integral:"recorte",recorte:"primeira_pagina"}),v(r,{integral:"recorte"});let h=new Map([...i.values()].map(o=>[o.seq,o.texto])),c=new Set;for(;m()>t;){let o=g([...i.values()]).find(q=>!c.has(q.seq));if(!o)break;let d=h.get(o.seq),l=Math.max(me,o.texto.length-(m()-t)-O(d.length).length),I=d.lastIndexOf(`
`,l),u=Math.min(l,I>l*.8?I:l),R=d.slice(0,u)+O(d.length-u);if(u>=d.length||R.length>=o.texto.length){c.add(o.seq);continue}i.set(o.seq,{...o,texto:R,cortado:d.length-u})}for(let o of[...s].reverse()){if(m()<=t)break;r(o)||(i.delete(o.seq),f.push(o.seq))}return{selecao:a,documentos:s.filter(o=>i.has(o.seq)).map(o=>i.get(o.seq)),orcamento:t,total:m(),foraPeloOrcamento:f.sort((o,d)=>o-d)}}function xe(e,a,t={}){return le(e,ue(e,a,t.tipo),t.orcamento??oe[a])}export{b as a,ve as b,G as c,Ie as d,oe as e,se as f,ce as g,de as h,ue as i,le as j,xe as k};
