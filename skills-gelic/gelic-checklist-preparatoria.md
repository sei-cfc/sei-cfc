---
name: gelic-checklist-preparatoria
description: Check-list da Gelic para a fase preparatória (pregão, dispensa, inexigibilidade, concorrência, adesão, credenciamento) — ids, o que verificar e o grau [I]/[R] de cada item (séries A, F, T, R, P, K, M e J). Leia quando gelic-analisar-processo, gelic-verificar-pendencias ou gelic-gerar-dvi mandarem.
---

# Check-list — fase preparatória

Cada item tem id e grau. Cite o id no achado: **o grau decide sozinho** se o achado impede o
prosseguimento.

- **[I] impeditivo**: descumprimento objetivo, ausência de peça essencial da etapa ou
  incompatibilidade relevante entre documentos. Leva a DVI/devolução.
- **[R] recomendação**: escolha discricionária sem motivação suficiente, erro formal ou melhoria. Não
  impede o envio à Gecont.

É rede de verificação, não presunção de erro. Cite o item do documento e a norma ou cláusula.

## Limite da etapa

Não aponte como ausentes: reserva orçamentária, minuta preparada pela Gelic, parecer da Projur, aviso,
edital, autorização final, contrato, publicação ou documentos de habilitação do futuro fornecedor.

## Um fato, um id

Cada fato vai num só id (o mais específico abaixo) e num só lugar: no documento em que o fato está
escrito, ou em "compatibilidade" quando o fato é a diferença entre documentos. O item vizinho recebe o
status do que ele próprio exige.

| Fato | Id |
|---|---|
| Objeto, natureza, quantidade ou vigência do TR diferente do ETP (mesmo que o DFD acompanhe um dos lados) | R01 |
| Prazo de execução ou de entrega ausente no TR, ou remetido à ordem de serviço | R09 |
| DFD diferente do ETP e do TR, quando os dois concordam entre si | F02 |
| Valor estimado do ETP diferente do MCP ou do TR | T04 |
| MCP diferente do DFD, do ETP ou do TR | P06 |
| Número do processo, unidade ou modalidade diferentes entre as peças | A01 |
| Fonte da pesquisa de preços declarada juntada e ausente (relatório, comprovante de consulta, proposta, orçamento) | P01 |
| Outro anexo ou documento citado e ausente; título do SEI diferente do conteúdo | A08 |
| Documento interno sem assinatura | o id de assinatura do documento: A02 (geral), T07 (ETP), R07 (TR), P06 (MCP), K03 (mapa de riscos) |
| Cronologia invertida | A09 |

## A — instrução geral

| Id | Verificar | Grau |
|---|---|---|
| A01 | Número do processo, objeto, modalidade, valor ou unidade divergentes entre as peças | I |
| A02 | Peça assinada/aprovada por quem não detém competência, ou sem assinatura | I |
| A03 | Portarias de equipe de planejamento / gestão e termos de cientificação ausentes quando exigíveis | I |
| A04 | Demanda fora do PCA vigente sem justificativa formal | R |
| A05 | Indício de divisão artificial da contratação (fracionamento) sem justificativa | I |
| A06 | Documento substituído sem que se saiba qual versão prevalece | R |
| A07 | Documento essencial ilegível ou sem conteúdo nos autos — registrar como não examinado | I |
| A08 | Encaminhamento sem identificar objeto, finalidade ou anexos; anexo declarado inexistente | R |
| A09 | Cronologia invertida: DFD posterior ao ETP/TR, peça assinada depois do despacho de encaminhamento, ou termo de cientificação anterior à portaria de designação | R |

A07 é fato dos autos (página em branco, documento vazio). Documento que a ferramenta não conseguiu
ler (PDF digitalizado sem texto) **não** é A07: é limitação sua, informada ao usuário.

## F — DFD

Base: Lei nº 14.133/2021, arts. 12, VII, 18 e 72, I; Decreto nº 10.947/2022 se adotado.

| Id | Verificar | Grau |
|---|---|---|
| F01 | Falta necessidade, objeto, quantidade, estimativa preliminar, data pretendida ou responsável | I |
| F02 | Objeto, quantidade ou valor incompatíveis com ETP, TR ou MCP | I |

## T — ETP

Base: Lei nº 14.133/2021, art. 18, §§ 1º a 3º; IN Seges nº 58/2022 como norma ou parâmetro. Antes de
apontar ETP ausente, verifique se é facultativo ou dispensado no caso.

| Id | Verificar | Grau |
|---|---|---|
| T01 | Necessidade genérica, sem problema concreto de interesse público | I |
| T02 | Quantidades sem memória de cálculo | I |
| T03 | Alternativas de mercado não comparadas ou razão da solução não explicada | R |
| T04 | Estimativa de valor sem fonte/memória ou incoerente com MCP/TR | I |
| T05 | Parcelamento (ou não) sem justificativa | R |
| T06 | Ciclo de vida, resultados, providências, contratações correlatas ou impactos ambientais omitidos quando cabíveis | R |
| T07 | Sem conclusão de viabilidade, assinatura ou aprovação competente | I |

## R — TR ou projeto básico

Base: Lei nº 14.133/2021, arts. 6º, XXIII, 18 e 40; IN Seges/ME nº 81/2022 como norma ou parâmetro.

| Id | Verificar | Grau |
|---|---|---|
| R01 | Objeto, natureza, quantidades, vigência ou prorrogação ausentes ou incoerentes com o ETP (prazo de execução/entrega: R09) | I |
| R02 | Especificação com direcionamento indevido (marca, característica exclusiva sem justificativa) | I |
| R03 | Modelo de execução/gestão, recebimento, medição ou pagamento ausentes | I |
| R04 | Habilitação/atestados desproporcionais ou não limitados às parcelas relevantes | I |
| R05 | Reajuste sem índice, data-base ou periodicidade, ou incompatíveis com a lei e o objeto | I |
| R06 | Garantia, sanções, sustentabilidade, CATMAT/CATSER ou obrigações omitidos quando cabíveis | R |
| R07 | Sem assinatura/aprovação competente, ou incoerente com DFD, ETP, MCP e riscos | I |
| R08 | Instrumento contratual longo para compra pontual quando a lei admite substitutivo | R |
| R09 | Prazo de execução ou de entrega (por etapa, parcela ou onda) ausente, ou remetido à ordem de serviço sem parâmetro no TR | I |

## P — pesquisa de preços e Mapa Comparativo (MCP)

Base: Lei nº 14.133/2021, art. 23; IN Seges/ME nº 65/2021 como norma ou parâmetro. Média, mediana e
menor valor são métodos possíveis; o apontamento decorre dos dados, não de preferência.

| Id | Verificar | Grau |
|---|---|---|
| P01 | Falta responsável, objeto, fontes, datas, condições comerciais, série de preços ou método declarado | I |
| P02 | Fontes públicas e contratações similares não priorizadas, ou pesquisa direta sem justificar a escolha dos fornecedores | R |
| P03 | Preços desatualizados ou não comparáveis (especificação, escala, prazo, frete, local) sem tratamento | I |
| P04 | Média, mediana, total ou quantidade × unitário errados, ou método rotulado diverso do cálculo | I |
| P05 | Preço inexequível, inconsistente ou excessivo mantido sem análise crítica motivada | I |
| P06 | Sem assinatura ou incoerente com DFD, ETP e TR | I |

P04: mostre a conta ao usuário no chat (valores e operação), linha a linha, antes de afirmar erro.

## K — análise/mapa de riscos

Base: Lei nº 14.133/2021, arts. 18, X, 22 e 103.

| Id | Verificar | Grau |
|---|---|---|
| K01 | Mapa genérico: riscos sem probabilidade, impacto, prevenção, contingência ou responsável | R |
| K02 | Confusão entre mapa de riscos do planejamento e matriz de alocação contratual | R |
| K03 | Sem assinatura da equipe competente | R |
| K04 | Análise de riscos ausente quando cabível (art. 18, X; art. 72, I, "se for o caso"): valor ou complexidade relevante sem mapa nem justificativa | R |

## M — particularidades do enquadramento

Conferir se os autos demonstram a hipótese legal invocada é exame de fundamento, não de mérito.

| Id | Tipo | Verificar | Grau |
|---|---|---|---|
| M01 | Pregão | Objeto não comum, critério/modo incoerentes, SRP sem justificativa | I |
| M02 | Concorrência | Projetos, responsabilidade técnica, regime, custos de referência, licenças ou matriz obrigatória ausentes | I |
| M03 | Dispensa | Enquadramento no art. 75 não indicado ou incompatível com o objeto, ou fracionamento (requisitos da hipótese: série J) | I |
| M04 | Inexigibilidade | Inviabilidade de competição não demonstrada ou hipótese do art. 74 incompatível com o objeto (requisitos: série J); não demonstrada quando os autos trazem propostas ou pesquisa de mais de um prestador para o mesmo objeto e a justificativa não explica por que a competição é inviável | I |
| M05 | Adesão | TR/ETP próprios, exata compatibilidade, vigência/quantitativos da ata, vantajosidade ou aceite ausentes | I |
| M06 | Credenciamento | Hipótese legal, critério objetivo de distribuição ou condições padronizadas ausentes | I |

Itens M que não correspondem ao tipo do processo: "não se aplica".

## J — contratação direta (inexigibilidade e dispensa)

Base: Lei nº 14.133/2021, arts. 72, 74 e 75. Entra quando o processo é inexigibilidade ou dispensa,
ou há justificativa de contratação direta nos autos. Parecer jurídico, recursos orçamentários e
autorização (art. 72, III, IV e VIII) são etapa posterior: não aponte a ausência deles.

| Id | Verificar | Grau |
|---|---|---|
| J01 | Art. 72, I — DFD e, conforme o caso, ETP, análise de riscos e TR ou projeto básico ausentes | I |
| J02 | Art. 72, II — estimativa de despesa ausente ou não calculada na forma do art. 23 | I |
| J03 | Art. 72, III, IV e VIII — parecer técnico citado e não juntado (parecer jurídico, recursos e autorização: não se aplica) | R |
| J04 | Art. 72, V — requisitos de habilitação e qualificação mínima não definidos, ou documentos do contratado já juntados vencidos ou em nome de outro CNPJ | I |
| J05 | Art. 72, VI — razão da escolha do contratado ausente ou genérica | I |
| J06 | Art. 72, VII, e art. 23, § 4º — justificativa de preço ausente; ou, quando o valor não pôde ser estimado pelo art. 23, §§ 1º a 3º, sem comparação com preços praticados pelo contratado em contratações semelhantes | I |
| J07 | Art. 74, III, e § 3º — notória especialização não demonstrada, ou serviço sem natureza predominantemente intelectual | I |
| J08 | Art. 74, § 4º — profissionais que justificam a inexigibilidade não identificados, ou TR que admite subcontratação/substituição | I |
| J09 | Art. 74, I, e § 1º — exclusividade sem atestado, contrato de exclusividade, declaração do fabricante ou outro documento idôneo | I |
| J10 | Art. 75 — requisitos fáticos do inciso invocado não demonstrados (valor: somatório no exercício, § 1º; emergência: situação e prazo) | I |

## Compatibilidade final

Compare, no mínimo: objeto, itens e quantidades, unidade, valor, prazos, vigência, parcelamento,
modalidade/fundamento, reajuste, garantia, habilitação, assinaturas e versões. Divergência → o id da
tabela "Um fato, um id"; A01 só para número do processo, unidade ou modalidade, ou quando nenhuma
linha serve.

## Status de cada item

`atende` (examinou e cumpre; cite o SEI) · `não atende` (há achado com o mesmo id) · `não se aplica`
(o item não cabe no processo; justifique em uma linha) · `não verificado` (você não examinou o
documento que o item exige). Examinou e não achou problema é `atende`, não `não se aplica`.
