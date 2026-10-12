# Checklist — alterações contratuais (prorrogação, reajuste, repactuação, apostila, aditivo)

Cada item tem um id e um grau. Cite o id no campo `checklist` do achado: o grau decide sozinho se o
achado impede o prosseguimento — você não precisa (nem deve) julgar isso.

- **[I] impeditivo**: descumprimento objetivo de contrato/TR/lei, ausência de peça essencial da etapa ou
  incompatibilidade relevante entre documentos. Leva a DVI/devolução.
- **[R] recomendação**: escolha discricionária sem motivação suficiente, erro formal sem efeito no valor
  ou na legalidade, ou sugestão de melhoria. Não impede o envio à Gecont.

Confira primeiro sob qual lei o contrato foi celebrado (art. 190 da Lei nº 14.133/2021 preserva o regime
antigo). O que rege a alteração é o contrato, o TR/edital e os aditivos — cite a cláusula.

## Limite da etapa

Não aponte como pendência: nota de reserva/empenho do novo período, minuta do termo ou apostila,
parecer jurídico, autorização final, assinatura ou publicação do instrumento. São etapas posteriores.

## G — comum a qualquer alteração

| Id | Verificar | Grau |
|---|---|---|
| [G01][I] | Regime jurídico misturado (cláusulas da Lei nº 8.666/1993 em contrato da Lei nº 14.133/2021 ou vice-versa) | I |
| [G02][I] | Contrato já expirado na data da análise, ou prazo restante incompatível com o fluxo (aditivo tem de ser assinado dentro da vigência) | I |
| [G03][I] | Vigência, valor ou objeto informados de forma divergente entre formulário, contrato, publicação (PNCP), proposta ou pesquisa | I |
| [G04][I] | Manifestação da contratada (anuência/interesse/proposta) ausente, ou que identifica outro contrato/valor/objeto | I |
| [G05][I] | Certidão ou registro de regularidade vencido na data da análise, ou ausente quando exigido pelo contrato (SICAF, FGTS, CNDT, fazendas, TCU, CGU/CEIS, CNJ, falência) | I |
| [G06][I] | Signatário indicado pela contratada sem poder de representação demonstrado nos autos (estatuto/contrato social/procuração: quem assina, se em conjunto, prazo do mandato) | I |
| [G07][R] | Ocorrência ou registro em cadastro (SICAF "Consta", sanção não impeditiva) sem esclarecimento nos autos | R |
| [G08][R] | Manifestação do gestor/fiscais genérica, sem fatos da execução (ocorrências, glosas, atrasos, quantitativos) | R |
| [G09][R] | Portaria de gestão/fiscalização desatualizada ou com dado incorreto (modalidade, objeto), sem afetar a competência dos signatários | R |
| [G10][I] | Documento essencial ilegível ou sem conteúdo (página em branco, imagem sem OCR) quando dele depende a verificação — registrar como não examinado | I |
| [G11][R] | Garantia contratual, quando exigida, sem comprovação de cobertura do novo prazo/valor | R |

## B — prorrogação de serviço ou fornecimento contínuo

Base de busca: Lei nº 14.133/2021, arts. 6º, XV, e 105 a 107; contrato e TR.

| Id | Verificar | Grau |
|---|---|---|
| [B01][I] | Prorrogação não prevista no contrato/TR, ou limite total de vigência ultrapassado | I |
| [B02][R] | Natureza continuada do serviço não demonstrada formalmente (o contrato costuma exigir) | R |
| [B03][R] | Relatório/avaliação de execução ausente ou sem atestar prestação regular | R |
| [B04][I] | Vantajosidade não demonstrada: pesquisa sem fonte, sem método declarado, ou conclusão que não decorre dos dados | I |
| [B05][R] | Pesquisa que descarta fontes públicas comparáveis (PNCP, contratos similares) sem reavaliar por preço unitário ou proporção | R |
| [B06][I] | Método estatístico rotulado de forma diversa do cálculo feito (ex.: "mediana" que é média) ou conta errada | I |
| [B07][I] | Proposta/preço de fornecedor identificado pelo próprio mapa e não incorporado à comparação | I |
| [B08][R] | Custos não renováveis do primeiro período mantidos sem justificativa | R |
| [B09][I] | Reajuste, repactuação ou reequilíbrio pendente tratado como concedido sem ato nos autos, ou omitido | I |

## C — reajuste por índice, repactuação, apostila

Base de busca: Lei nº 14.133/2021, arts. 25, §§ 7º e 8º, 92, 123, 135 e 136; TR/contrato.

| Id | Verificar | Grau |
|---|---|---|
| [C01][I] | Data-base do cálculo diferente da fixada no TR/contrato (orçamento estimado, proposta ou outra) | I |
| [C02][I] | Interregno mínimo de um ano não cumprido a partir do marco contratual correto | I |
| [C03][I] | Índice diverso do contratual, período acumulado errado, fórmula não aplicada ou conta que não fecha (refaça com `gelic.py calc indice`) | I |
| [C04][I] | Memória de cálculo ausente (índices inicial e final, fonte, período) | I |
| [C05][R] | Reajuste apresentado como concedido em data que é a da proposta, sem ato formal (TR costuma prever apostilamento) | R |
| [C06][I] | Repactuação sem CCT/acordo vigente, sem planilha original × nova ou com itens vedados | I |
| [C07][R] | Preclusão/ressalva de repactuação em prorrogação anterior não examinada | R |
| [C08][I] | Instrumento errado: apostila para o que exige aditivo (prorrogação, alteração de objeto, reequilíbrio) ou vice-versa | I |

## D — aditivo quantitativo ou qualitativo

Base de busca: Lei nº 14.133/2021, arts. 124 a 130.

| Id | Verificar | Grau |
|---|---|---|
| [D01][I] | Justificativa técnica ausente ou alteração que transfigura o objeto | I |
| [D02][I] | Acréscimos/supressões acima do limite legal, ou calculados sobre base errada (devem incidir sobre o valor inicial atualizado, acumulando aditivos anteriores), ou compensados entre si | I |
| [D03][I] | Preço novo sem aferição de mercado; em obras, desconto global não preservado | I |
| [D04][R] | Impacto em prazo, riscos, quantitativos ou garantia não analisado | R |
| [D05][I] | Execução antecipada sem cobertura contratual, salvo hipótese legal demonstrada | I |

## E — reequilíbrio econômico-financeiro

Base de busca: Lei nº 14.133/2021, arts. 103, 124, II, "d", 131 e 134.

| Id | Verificar | Grau |
|---|---|---|
| [E01][I] | Fato superveniente, imprevisível ou de consequência incalculável não identificado, ou risco alocado à requerente pela matriz de riscos | I |
| [E02][I] | Impacto sem demonstração analítica (inclui álea ordinária ou inflação já coberta pelo reajuste) | I |
| [E03][R] | Pedido feito após a prorrogação sem ressalva, quando o contrato exigia ressalva | R |

## Compatibilidade final (vai no bloco `compatibilidade`)

Compare entre si: vigência atual, novo período, valor atual e pretendido, objeto, quantidades,
percentual, índice/data-base, CNPJ do contratado, anuência, regularidade, manifestações de gestor e
fiscais, regime jurídico. Divergência entre documentos → G03 ou G04.
