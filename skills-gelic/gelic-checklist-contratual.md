---
name: gelic-checklist-contratual
description: Check-list da Gelic para alterações contratuais (prorrogação, reajuste, repactuação, apostila, aditivo de acréscimo/supressão, reequilíbrio) — ids, o que verificar e o grau [I]/[R] (séries G, B, C, D, E). Leia quando gelic-analisar-processo, gelic-verificar-pendencias ou gelic-gerar-dvi mandarem.
---

# Check-list — alterações contratuais

Cada item tem id e grau. Cite o id no achado: **o grau decide sozinho** se o achado impede o
prosseguimento — você não julga isso.

- **[I] impeditivo**: descumprimento objetivo de contrato/TR/lei, ausência de peça essencial da etapa
  ou incompatibilidade relevante entre documentos. Leva a DVI/devolução.
- **[R] recomendação**: escolha discricionária sem motivação suficiente, erro formal sem efeito no
  valor ou na legalidade, ou melhoria. Não impede o envio à Gecont.

Confira primeiro sob qual lei o contrato foi celebrado (o art. 190 da Lei nº 14.133/2021 preserva o
regime da Lei nº 8.666/1993). O que rege a alteração é o contrato, o TR/edital e os aditivos — cite a
cláusula.

## Séries por pedido

| Pedido | Séries |
|---|---|
| prorrogação (ou aditivo de prazo) | G + B; + C quando há reajuste nos autos |
| reajuste, repactuação, apostila | G + C |
| acréscimo/supressão | G + D |
| reequilíbrio | G + E |

## Limite da etapa

Não aponte como pendência: nota de reserva/empenho do novo período, minuta do termo ou apostila,
parecer jurídico, autorização final, assinatura ou publicação do instrumento. São etapas posteriores.

## O que ler (custo)

Leia por inteiro o contrato e o formulário/pedido; do último TR, só as cláusulas de vigência,
prorrogação, reajuste/data-base, garantia e habilitação; de estatuto/contrato social/procuração, só o
trecho de representação (quem assina, se em conjunto, prazo do mandato). O que antecede o contrato
(DFD, ETP, pesquisa da licitação) não se lê, salvo se a análise exigir.

## G — comum a qualquer alteração

| Id | Verificar | Grau |
|---|---|---|
| G01 | Regime jurídico misturado (cláusulas da Lei nº 8.666/1993 em contrato da Lei nº 14.133/2021 ou vice-versa) | I |
| G02 | Contrato já expirado na data da análise, ou prazo restante incompatível com o fluxo (aditivo tem de ser assinado dentro da vigência) | I |
| G03 | Vigência, valor ou objeto informados de forma divergente entre formulário, contrato, publicação (PNCP), proposta ou pesquisa | I |
| G04 | Manifestação da contratada (anuência/interesse/proposta) ausente, ou que identifica outro contrato, valor ou objeto | I |
| G05 | Certidão ou registro de regularidade vencido na data da análise, ou ausente quando exigido pelo contrato (SICAF, FGTS, CNDT, fazendas, TCU, CGU/CEIS, CNJ, falência) | I |
| G06 | Signatário indicado pela contratada sem poder de representação demonstrado nos autos (estatuto, contrato social, procuração: quem assina, se em conjunto, prazo do mandato) | I |
| G07 | Ocorrência ou registro em cadastro (SICAF "Consta", sanção não impeditiva) sem esclarecimento nos autos | R |
| G08 | Manifestação do gestor/fiscais genérica, sem fatos da execução (ocorrências, glosas, atrasos, quantitativos) | R |
| G09 | Portaria de gestão/fiscalização desatualizada ou com dado incorreto, sem afetar a competência dos signatários | R |
| G10 | Documento essencial ilegível ou sem conteúdo nos autos (página em branco) quando dele depende a verificação — registrar como não examinado | I |
| G11 | Garantia contratual, quando exigida, sem comprovação de cobertura do novo prazo/valor | R |

"Data da análise" é a data de hoje. G10 é fato dos autos; documento que a ferramenta não conseguiu ler
(PDF digitalizado sem texto) **não** é G10: é limitação sua, informada ao usuário.

## B — prorrogação de serviço ou fornecimento contínuo

Base de busca: Lei nº 14.133/2021, arts. 6º, XV, e 105 a 107; contrato e TR.

| Id | Verificar | Grau |
|---|---|---|
| B01 | Prorrogação não prevista no contrato/TR, ou limite total de vigência ultrapassado | I |
| B02 | Natureza continuada do serviço não demonstrada formalmente (o contrato costuma exigir) | R |
| B03 | Relatório/avaliação de execução ausente ou sem atestar prestação regular | R |
| B04 | Vantajosidade não demonstrada: pesquisa sem fonte, sem método declarado, ou conclusão que não decorre dos dados | I |
| B05 | Pesquisa que descarta fontes públicas comparáveis (PNCP, contratos similares) sem reavaliar por preço unitário ou proporção | R |
| B06 | Método estatístico rotulado de forma diversa do cálculo (ex.: "mediana" que é média) ou conta errada | I |
| B07 | Proposta/preço de fornecedor identificado pelo próprio mapa e não incorporado à comparação | I |
| B08 | Custos não renováveis do primeiro período mantidos sem justificativa | R |
| B09 | Reajuste, repactuação ou reequilíbrio pendente tratado como concedido sem ato nos autos, ou omitido | I |

## C — reajuste por índice, repactuação, apostila

Base de busca: Lei nº 14.133/2021, arts. 25, §§ 7º e 8º, 92, 123, 135 e 136; TR/contrato.

| Id | Verificar | Grau |
|---|---|---|
| C01 | Data-base do cálculo diferente da fixada no TR/contrato (orçamento estimado, proposta ou outra) | I |
| C02 | Interregno mínimo de um ano não cumprido a partir do marco contratual correto | I |
| C03 | Índice diverso do contratual, período acumulado errado, fórmula não aplicada ou conta que não fecha | I |
| C04 | Memória de cálculo ausente (índices inicial e final, fonte, período) | I |
| C05 | Reajuste apresentado como concedido em data que é a da proposta, sem ato formal (TR costuma prever apostilamento) | R |
| C06 | Repactuação sem CCT/acordo vigente, sem planilha original × nova ou com itens vedados | I |
| C07 | Preclusão/ressalva de repactuação em prorrogação anterior não examinada | R |
| C08 | Instrumento errado: apostila para o que exige aditivo (prorrogação, alteração de objeto, reequilíbrio) ou vice-versa | I |

Na prorrogação, citar qualquer id C num achado põe a série C inteira no check-list.

## D — aditivo quantitativo ou qualitativo

Base de busca: Lei nº 14.133/2021, arts. 124 a 130.

| Id | Verificar | Grau |
|---|---|---|
| D01 | Justificativa técnica ausente ou alteração que transfigura o objeto | I |
| D02 | Acréscimos/supressões acima do limite legal, ou calculados sobre base errada (incidem sobre o valor inicial atualizado, acumulando aditivos anteriores), ou compensados entre si | I |
| D03 | Preço novo sem aferição de mercado; em obras, desconto global não preservado | I |
| D04 | Impacto em prazo, riscos, quantitativos ou garantia não analisado | R |
| D05 | Execução antecipada sem cobertura contratual, salvo hipótese legal demonstrada | I |

## E — reequilíbrio econômico-financeiro

Base de busca: Lei nº 14.133/2021, arts. 103, 124, II, "d", 131 e 134.

| Id | Verificar | Grau |
|---|---|---|
| E01 | Fato superveniente, imprevisível ou de consequência incalculável não identificado, ou risco alocado à requerente pela matriz de riscos | I |
| E02 | Impacto sem demonstração analítica (inclui álea ordinária ou inflação já coberta pelo reajuste) | I |
| E03 | Pedido feito após a prorrogação sem ressalva, quando o contrato exigia ressalva | R |

## Contas

Médias, medianas, índices acumulados, percentuais e dias: mostre a conta ao usuário no chat (valores
de origem, operação, resultado) antes de afirmar erro. Na dúvida, registre "conta a conferir" — nunca
ponha no documento número que você não demonstrou.

## Compatibilidade final

Compare entre si: vigência atual, novo período, valor atual e pretendido, objeto, quantidades,
percentual, índice/data-base, CNPJ do contratado, anuência, regularidade, manifestações de gestor e
fiscais, regime jurídico. Divergência entre documentos → G03 ou G04.

## Status de cada item

`atende` (examinou e cumpre; cite o SEI) · `não atende` (há achado com o mesmo id) · `não se aplica`
(o item não cabe; justifique em uma linha) · `não verificado` (você não examinou o documento que o
item exige).
