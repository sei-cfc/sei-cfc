/* GERADO por gelic/gerar.ts a partir das fontes em texto. NAO EDITE: rode "npm run gerar". */
export const GRAUS: Readonly<Record<string, 'I' | 'R'>> = {"G01":"I","G02":"I","G03":"I","G04":"I","G05":"I","G06":"I","G07":"R","G08":"R","G09":"R","G10":"I","G11":"R","B01":"I","B02":"R","B03":"R","B04":"I","B05":"R","B06":"I","B07":"I","B08":"R","B09":"I","C01":"I","C02":"I","C03":"I","C04":"I","C05":"R","C06":"I","C07":"R","C08":"I","D01":"I","D02":"I","D03":"I","D04":"R","D05":"I","E01":"I","E02":"I","E03":"R","A01":"I","A02":"I","A03":"I","A04":"R","A05":"I","A06":"R","A07":"I","A08":"R","A09":"R","F01":"I","F02":"I","T01":"I","T02":"I","T03":"R","T04":"I","T05":"R","T06":"R","T07":"I","R01":"I","R02":"I","R03":"I","R04":"I","R05":"I","R06":"R","R07":"I","R08":"R","R09":"I","P01":"I","P02":"R","P03":"I","P04":"I","P05":"I","P06":"I","K01":"R","K02":"R","K03":"R","K04":"R","M01":"I","M02":"I","M03":"I","M04":"I","M05":"I","M06":"I","J01":"I","J02":"I","J03":"R","J04":"I","J05":"I","J06":"I","J07":"I","J08":"I","J09":"I","J10":"I"};

export const CHECKLISTS: Readonly<Record<string, { series: Record<string, string>; itens: { id: string; serie: string; grau: 'I' | 'R'; texto: string }[] }>> = {
 "checklist-contratual.md": {
  "series": {
   "G": "comum a qualquer alteração",
   "B": "prorrogação de serviço ou fornecimento contínuo",
   "C": "reajuste por índice, repactuação, apostila",
   "D": "aditivo quantitativo ou qualitativo",
   "E": "reequilíbrio econômico-financeiro"
  },
  "itens": [
   {
    "id": "G01",
    "serie": "G",
    "grau": "I",
    "texto": "Regime jurídico misturado (cláusulas da Lei nº 8.666/1993 em contrato da Lei nº 14.133/2021 ou vice-versa)"
   },
   {
    "id": "G02",
    "serie": "G",
    "grau": "I",
    "texto": "Contrato já expirado na data da análise, ou prazo restante incompatível com o fluxo (aditivo tem de ser assinado dentro da vigência)"
   },
   {
    "id": "G03",
    "serie": "G",
    "grau": "I",
    "texto": "Vigência, valor ou objeto informados de forma divergente entre formulário, contrato, publicação (PNCP), proposta ou pesquisa"
   },
   {
    "id": "G04",
    "serie": "G",
    "grau": "I",
    "texto": "Manifestação da contratada (anuência/interesse/proposta) ausente, ou que identifica outro contrato/valor/objeto"
   },
   {
    "id": "G05",
    "serie": "G",
    "grau": "I",
    "texto": "Certidão ou registro de regularidade vencido na data da análise, ou ausente quando exigido pelo contrato (SICAF, FGTS, CNDT, fazendas, TCU, CGU/CEIS, CNJ, falência)"
   },
   {
    "id": "G06",
    "serie": "G",
    "grau": "I",
    "texto": "Signatário indicado pela contratada sem poder de representação demonstrado nos autos (estatuto/contrato social/procuração: quem assina, se em conjunto, prazo do mandato)"
   },
   {
    "id": "G07",
    "serie": "G",
    "grau": "R",
    "texto": "Ocorrência ou registro em cadastro (SICAF \"Consta\", sanção não impeditiva) sem esclarecimento nos autos"
   },
   {
    "id": "G08",
    "serie": "G",
    "grau": "R",
    "texto": "Manifestação do gestor/fiscais genérica, sem fatos da execução (ocorrências, glosas, atrasos, quantitativos)"
   },
   {
    "id": "G09",
    "serie": "G",
    "grau": "R",
    "texto": "Portaria de gestão/fiscalização desatualizada ou com dado incorreto (modalidade, objeto), sem afetar a competência dos signatários"
   },
   {
    "id": "G10",
    "serie": "G",
    "grau": "I",
    "texto": "Documento essencial ilegível ou sem conteúdo (página em branco, imagem sem OCR) quando dele depende a verificação — registrar como não examinado"
   },
   {
    "id": "G11",
    "serie": "G",
    "grau": "R",
    "texto": "Garantia contratual, quando exigida, sem comprovação de cobertura do novo prazo/valor"
   },
   {
    "id": "B01",
    "serie": "B",
    "grau": "I",
    "texto": "Prorrogação não prevista no contrato/TR, ou limite total de vigência ultrapassado"
   },
   {
    "id": "B02",
    "serie": "B",
    "grau": "R",
    "texto": "Natureza continuada do serviço não demonstrada formalmente (o contrato costuma exigir)"
   },
   {
    "id": "B03",
    "serie": "B",
    "grau": "R",
    "texto": "Relatório/avaliação de execução ausente ou sem atestar prestação regular"
   },
   {
    "id": "B04",
    "serie": "B",
    "grau": "I",
    "texto": "Vantajosidade não demonstrada: pesquisa sem fonte, sem método declarado, ou conclusão que não decorre dos dados"
   },
   {
    "id": "B05",
    "serie": "B",
    "grau": "R",
    "texto": "Pesquisa que descarta fontes públicas comparáveis (PNCP, contratos similares) sem reavaliar por preço unitário ou proporção"
   },
   {
    "id": "B06",
    "serie": "B",
    "grau": "I",
    "texto": "Método estatístico rotulado de forma diversa do cálculo feito (ex.: \"mediana\" que é média) ou conta errada"
   },
   {
    "id": "B07",
    "serie": "B",
    "grau": "I",
    "texto": "Proposta/preço de fornecedor identificado pelo próprio mapa e não incorporado à comparação"
   },
   {
    "id": "B08",
    "serie": "B",
    "grau": "R",
    "texto": "Custos não renováveis do primeiro período mantidos sem justificativa"
   },
   {
    "id": "B09",
    "serie": "B",
    "grau": "I",
    "texto": "Reajuste, repactuação ou reequilíbrio pendente tratado como concedido sem ato nos autos, ou omitido"
   },
   {
    "id": "C01",
    "serie": "C",
    "grau": "I",
    "texto": "Data-base do cálculo diferente da fixada no TR/contrato (orçamento estimado, proposta ou outra)"
   },
   {
    "id": "C02",
    "serie": "C",
    "grau": "I",
    "texto": "Interregno mínimo de um ano não cumprido a partir do marco contratual correto"
   },
   {
    "id": "C03",
    "serie": "C",
    "grau": "I",
    "texto": "Índice diverso do contratual, período acumulado errado, fórmula não aplicada ou conta que não fecha (refaça com `gelic.py calc indice`)"
   },
   {
    "id": "C04",
    "serie": "C",
    "grau": "I",
    "texto": "Memória de cálculo ausente (índices inicial e final, fonte, período)"
   },
   {
    "id": "C05",
    "serie": "C",
    "grau": "R",
    "texto": "Reajuste apresentado como concedido em data que é a da proposta, sem ato formal (TR costuma prever apostilamento)"
   },
   {
    "id": "C06",
    "serie": "C",
    "grau": "I",
    "texto": "Repactuação sem CCT/acordo vigente, sem planilha original × nova ou com itens vedados"
   },
   {
    "id": "C07",
    "serie": "C",
    "grau": "R",
    "texto": "Preclusão/ressalva de repactuação em prorrogação anterior não examinada"
   },
   {
    "id": "C08",
    "serie": "C",
    "grau": "I",
    "texto": "Instrumento errado: apostila para o que exige aditivo (prorrogação, alteração de objeto, reequilíbrio) ou vice-versa"
   },
   {
    "id": "D01",
    "serie": "D",
    "grau": "I",
    "texto": "Justificativa técnica ausente ou alteração que transfigura o objeto"
   },
   {
    "id": "D02",
    "serie": "D",
    "grau": "I",
    "texto": "Acréscimos/supressões acima do limite legal, ou calculados sobre base errada (devem incidir sobre o valor inicial atualizado, acumulando aditivos anteriores), ou compensados entre si"
   },
   {
    "id": "D03",
    "serie": "D",
    "grau": "I",
    "texto": "Preço novo sem aferição de mercado; em obras, desconto global não preservado"
   },
   {
    "id": "D04",
    "serie": "D",
    "grau": "R",
    "texto": "Impacto em prazo, riscos, quantitativos ou garantia não analisado"
   },
   {
    "id": "D05",
    "serie": "D",
    "grau": "I",
    "texto": "Execução antecipada sem cobertura contratual, salvo hipótese legal demonstrada"
   },
   {
    "id": "E01",
    "serie": "E",
    "grau": "I",
    "texto": "Fato superveniente, imprevisível ou de consequência incalculável não identificado, ou risco alocado à requerente pela matriz de riscos"
   },
   {
    "id": "E02",
    "serie": "E",
    "grau": "I",
    "texto": "Impacto sem demonstração analítica (inclui álea ordinária ou inflação já coberta pelo reajuste)"
   },
   {
    "id": "E03",
    "serie": "E",
    "grau": "R",
    "texto": "Pedido feito após a prorrogação sem ressalva, quando o contrato exigia ressalva"
   }
  ]
 },
 "checklist-preparatoria.md": {
  "series": {
   "A": "instrução geral",
   "F": "DFD",
   "T": "ETP",
   "R": "TR ou projeto",
   "P": "pesquisa de preços e Mapa Comparativo",
   "K": "análise/mapa de riscos",
   "M": "particularidades do enquadramento",
   "J": "contratação direta (inexigibilidade e dispensa)"
  },
  "itens": [
   {
    "id": "A01",
    "serie": "A",
    "grau": "I",
    "texto": "Número do processo, objeto, modalidade, valor ou unidade divergentes entre as peças"
   },
   {
    "id": "A02",
    "serie": "A",
    "grau": "I",
    "texto": "Peça assinada/aprovada por quem não detém competência, ou sem assinatura"
   },
   {
    "id": "A03",
    "serie": "A",
    "grau": "I",
    "texto": "Portarias de equipe de planejamento / gestão e termos de cientificação ausentes quando exigíveis"
   },
   {
    "id": "A04",
    "serie": "A",
    "grau": "R",
    "texto": "Demanda fora do PCA vigente sem justificativa formal"
   },
   {
    "id": "A05",
    "serie": "A",
    "grau": "I",
    "texto": "Indício de divisão artificial da contratação (fracionamento) sem justificativa"
   },
   {
    "id": "A06",
    "serie": "A",
    "grau": "R",
    "texto": "Documento substituído sem que se saiba qual versão prevalece"
   },
   {
    "id": "A07",
    "serie": "A",
    "grau": "I",
    "texto": "Documento essencial ilegível ou sem conteúdo — registrar como não examinado"
   },
   {
    "id": "A08",
    "serie": "A",
    "grau": "R",
    "texto": "Encaminhamento sem identificar objeto, finalidade ou anexos; anexo declarado inexistente"
   },
   {
    "id": "A09",
    "serie": "A",
    "grau": "R",
    "texto": "Cronologia invertida: DFD posterior ao ETP/TR, peça assinada depois do despacho de encaminhamento ou termo de cientificação anterior à portaria de designação (ver _checagens.md)"
   },
   {
    "id": "F01",
    "serie": "F",
    "grau": "I",
    "texto": "Falta necessidade, objeto, quantidade, estimativa preliminar, data pretendida ou responsável"
   },
   {
    "id": "F02",
    "serie": "F",
    "grau": "I",
    "texto": "Objeto, quantidade ou valor incompatíveis com ETP, TR ou MCP"
   },
   {
    "id": "T01",
    "serie": "T",
    "grau": "I",
    "texto": "Necessidade genérica, sem problema concreto de interesse público"
   },
   {
    "id": "T02",
    "serie": "T",
    "grau": "I",
    "texto": "Quantidades sem memória de cálculo"
   },
   {
    "id": "T03",
    "serie": "T",
    "grau": "R",
    "texto": "Alternativas de mercado não comparadas ou razão da solução não explicada"
   },
   {
    "id": "T04",
    "serie": "T",
    "grau": "I",
    "texto": "Estimativa de valor sem fonte/memória ou incoerente com MCP/TR"
   },
   {
    "id": "T05",
    "serie": "T",
    "grau": "R",
    "texto": "Parcelamento (ou não) sem justificativa"
   },
   {
    "id": "T06",
    "serie": "T",
    "grau": "R",
    "texto": "Ciclo de vida, resultados, providências, contratações correlatas ou impactos ambientais omitidos quando cabíveis"
   },
   {
    "id": "T07",
    "serie": "T",
    "grau": "I",
    "texto": "Sem conclusão de viabilidade, assinatura ou aprovação competente"
   },
   {
    "id": "R01",
    "serie": "R",
    "grau": "I",
    "texto": "Objeto, natureza, quantidades, vigência ou prorrogação ausentes ou incoerentes com o ETP (prazo de execução/entrega: R09)"
   },
   {
    "id": "R02",
    "serie": "R",
    "grau": "I",
    "texto": "Especificação com direcionamento indevido (marca, característica exclusiva sem justificativa)"
   },
   {
    "id": "R03",
    "serie": "R",
    "grau": "I",
    "texto": "Modelo de execução/gestão, recebimento, medição ou pagamento ausentes"
   },
   {
    "id": "R04",
    "serie": "R",
    "grau": "I",
    "texto": "Habilitação/atestados desproporcionais ou não limitados às parcelas relevantes"
   },
   {
    "id": "R05",
    "serie": "R",
    "grau": "I",
    "texto": "Reajuste sem índice, data-base ou periodicidade, ou incompatíveis com a lei e o objeto"
   },
   {
    "id": "R06",
    "serie": "R",
    "grau": "R",
    "texto": "Garantia, sanções, sustentabilidade, CATMAT/CATSER ou obrigações omitidos quando cabíveis"
   },
   {
    "id": "R07",
    "serie": "R",
    "grau": "I",
    "texto": "Sem assinatura/aprovação competente, ou incoerente com DFD, ETP, MCP e riscos"
   },
   {
    "id": "R08",
    "serie": "R",
    "grau": "R",
    "texto": "Instrumento contratual longo para compra pontual quando a lei admite substitutivo"
   },
   {
    "id": "R09",
    "serie": "R",
    "grau": "I",
    "texto": "Prazo de execução ou de entrega (por etapa, parcela ou onda) ausente, ou remetido à ordem de serviço sem parâmetro no TR"
   },
   {
    "id": "P01",
    "serie": "P",
    "grau": "I",
    "texto": "Falta responsável, objeto, fontes, datas, condições comerciais, série de preços ou método declarado"
   },
   {
    "id": "P02",
    "serie": "P",
    "grau": "R",
    "texto": "Fontes públicas e contratações similares não priorizadas, ou pesquisa direta sem justificar a escolha dos fornecedores"
   },
   {
    "id": "P03",
    "serie": "P",
    "grau": "I",
    "texto": "Preços desatualizados ou não comparáveis (especificação, escala, prazo, frete, local) sem tratamento"
   },
   {
    "id": "P04",
    "serie": "P",
    "grau": "I",
    "texto": "Média, mediana, total ou quantidade × unitário errados, ou método rotulado diverso do cálculo (refaça com `gelic.py calc`)"
   },
   {
    "id": "P05",
    "serie": "P",
    "grau": "I",
    "texto": "Preço inexequível, inconsistente ou excessivo mantido sem análise crítica motivada"
   },
   {
    "id": "P06",
    "serie": "P",
    "grau": "I",
    "texto": "Sem assinatura ou incoerente com DFD, ETP e TR"
   },
   {
    "id": "K01",
    "serie": "K",
    "grau": "R",
    "texto": "Mapa genérico: riscos sem probabilidade, impacto, prevenção, contingência ou responsável"
   },
   {
    "id": "K02",
    "serie": "K",
    "grau": "R",
    "texto": "Confusão entre mapa de riscos do planejamento e matriz de alocação contratual"
   },
   {
    "id": "K03",
    "serie": "K",
    "grau": "R",
    "texto": "Sem assinatura da equipe competente"
   },
   {
    "id": "K04",
    "serie": "K",
    "grau": "R",
    "texto": "Análise de riscos ausente quando cabível (art. 18, X; art. 72, I, \"se for o caso\"): contratação de valor ou complexidade relevante sem mapa nem justificativa da dispensa da análise"
   },
   {
    "id": "M01",
    "serie": "M",
    "grau": "I",
    "texto": "Pregão — Objeto não comum, critério/modo incoerentes, SRP sem justificativa"
   },
   {
    "id": "M02",
    "serie": "M",
    "grau": "I",
    "texto": "Concorrência — Projetos, responsabilidade técnica, regime, custos de referência, licenças ou matriz obrigatória ausentes"
   },
   {
    "id": "M03",
    "serie": "M",
    "grau": "I",
    "texto": "Dispensa — Enquadramento no art. 75 não indicado ou incompatível com o objeto, ou fracionamento (requisitos da hipótese: série J)"
   },
   {
    "id": "M04",
    "serie": "M",
    "grau": "I",
    "texto": "Inexigibilidade — Inviabilidade de competição não demonstrada ou hipótese do art. 74 incompatível com o objeto (requisitos da hipótese: série J); não demonstrada quando os autos trazem propostas, cotações ou pesquisa de mercado de mais de um prestador para o mesmo objeto e a justificativa não explica por que a competição é inviável"
   },
   {
    "id": "M05",
    "serie": "M",
    "grau": "I",
    "texto": "Adesão — TR/ETP próprios, exata compatibilidade, vigência/quantitativos da ata, vantajosidade ou aceite ausentes"
   },
   {
    "id": "M06",
    "serie": "M",
    "grau": "I",
    "texto": "Credenciamento — Hipótese legal, critério objetivo de distribuição ou condições padronizadas ausentes"
   },
   {
    "id": "J01",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 72, I — DFD e, conforme o caso, ETP, análise de riscos e TR ou projeto básico ausentes"
   },
   {
    "id": "J02",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 72, II — estimativa de despesa ausente ou não calculada na forma do art. 23"
   },
   {
    "id": "J03",
    "serie": "J",
    "grau": "R",
    "texto": "Art. 72, III, IV e VIII — parecer técnico citado e não juntado (parecer jurídico, recursos orçamentários e autorização são etapa posterior: nao_se_aplica)"
   },
   {
    "id": "J04",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 72, V — requisitos de habilitação e de qualificação mínima do contratado não definidos, ou documentos do contratado já juntados vencidos ou em nome de outro CNPJ"
   },
   {
    "id": "J05",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 72, VI — razão da escolha do contratado ausente ou genérica"
   },
   {
    "id": "J06",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 72, VII, e art. 23, § 4º — justificativa de preço ausente; ou, quando o valor não pôde ser estimado na forma do art. 23, §§ 1º a 3º, sem comparação com preços praticados pelo contratado em contratações semelhantes (notas fiscais de outros contratantes ou outro meio idôneo)"
   },
   {
    "id": "J07",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 74, III, e § 3º — notória especialização não demonstrada (desempenho anterior, estudos, experiência, publicações, equipe técnica) ou serviço sem natureza predominantemente intelectual"
   },
   {
    "id": "J08",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 74, § 4º — profissionais cuja qualificação justifica a inexigibilidade não identificados, ou TR que admite subcontratação ou substituição por profissionais distintos"
   },
   {
    "id": "J09",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 74, I, e § 1º — exclusividade sem atestado, contrato de exclusividade, declaração do fabricante ou outro documento idôneo"
   },
   {
    "id": "J10",
    "serie": "J",
    "grau": "I",
    "texto": "Art. 75 — requisitos fáticos do inciso invocado não demonstrados (valor: somatório no exercício, § 1º; emergência: situação e prazo)"
   }
  ]
 }
};

export const TEXTOS_FIXOS: { destino_padrao: string; observacoes: string[]; observacao_etp: string } = {
 "destino_padrao": "À unidade demandante.",
 "observacoes": [
  "A presente verificação não abordou as particularidades da execução do objeto, as quais são de responsabilidade da equipe de planejamento.",
  "Visando preservar o histórico do processo, nenhum documento submetido à análise deverá ser cancelado pela unidade demandante em caso de reedição ou substituição."
 ],
 "observacao_etp": "No que tange ao ETP, a análise limitou-se à verificação dos elementos e requisitos aplicáveis, sem exame do mérito técnico ou da solução adotada."
};
