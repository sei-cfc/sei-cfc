/* GERADO por gelic/gerar.ts a partir das fontes em texto. NAO EDITE: rode "npm run gerar". */
export type TipoPerguntaCfc = 'texto' | 'texto_longo' | 'data' | 'escolha' | 'tabela_itens' | 'lista_pessoas' | 'somente_leitura';
/** Uma pergunta do <modelo>.yaml do gera (o dataclass Pergunta de apps/gera/documentos/modelos.py). */
export interface PerguntaCfc {
  id: string;
  texto: string;
  tipo: TipoPerguntaCfc;
  /** Só no tipo escolha. */
  opcoes: string[] | null;
  obrigatoria: boolean;
  /** Nota (i) explicativa ('' se não há). */
  nota: string;
  check_list_id: string | null;
  /** Chave do cadastro único da contratação de onde a resposta vem e para onde vai (null = só deste documento). */
  le_do_cadastro: string | null;
  /** "nao <var>" | "<var> in (v1, v2)" | null (sempre aparece). */
  quando_aparece: string | null;
}
export interface ModeloCfcDados { md: string; constantes: Readonly<Record<string, unknown>>; perguntas: readonly PerguntaCfc[] }
/** Um documento da sequência do demandante no gera (regras.py::SEQUENCIA_DOCUMENTOS); `modelo` = há modelo pronto. */
export interface DocumentoSequenciaCfc { chave: string; rotulo: string; nota: string; check_list_id: string | null; modelo: boolean }

export const MODELOS_CFC: Readonly<Record<string, ModeloCfcDados>> = {
 "despacho_delic": {
  "md": "%% Modelo Despacho de envio à Gelic (era ao Delic no Gera CFC — Quick 261003-k9t).\n%% Mantido no SEI Pro CFC desde 2026-10-10: vai à Gerência de Licitações e Contratos, como o memorando real\n%% das unidades (ex.: Memorando nº 27/2026/GEX-DPROF/DGFIN, \"Para: Gerência de Licitações e Contratos\").\n%% Fonte do texto fixo: Memorando 00/2026/UNIDADE/DIRETORIA/PRES, SEI 0000000 (anonimizado em\n%% `.planning/gera/notes/2026-10-03-processo-000000-0000/019_0000000.txt`).\n%% \"destinatario\" (constantes.json) é fixo — todo despacho desta etapa vai para a Gelic; \"objeto\"\n%% reaproveita o cadastro único (D-14). Desde 2026-10-10 é DESPACHO, não memorando: entre unidades, o\n%% padrão do CFC é o despacho (decisão do usuário), no formato dos despachos da Gelic (skill gelic,\n%% templates/despacho-*.md). O SEI numera o despacho: sem número nem assunto, sem saudação.\n\n@cabecalho\n\n# DESPACHO\n\nÀ {destinatario}\n\nEncaminhamos a essa Gerência o presente processo, relativo à contratação a seguir especificada, para análise e adoção das providências pertinentes.\n\n## Objeto:\n\n{objeto}\n\n## Fundamento da contratação:\n\n{fundamento_contratacao}\n\n## Documentos encaminhados:\n\n{documentos_encaminhados}\n\n{responsavel_nome}\n{signatario_cargo}\nAssinado eletronicamente pelo SEI\n",
  "constantes": {
   "versao": "1.0",
   "destinatario": "Gerência de Licitações e Contratos"
  },
  "perguntas": [
   {
    "id": "objeto",
    "texto": "Objeto da contratação",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": "objeto",
    "quando_aparece": null
   },
   {
    "id": "fundamento_contratacao",
    "texto": "Fundamento da contratação",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"dispensa de licitação, nos termos do artigo 75, XV, da Lei 14.133/2021\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "documentos_encaminhados",
    "texto": "Documentos encaminhados",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Um documento por linha.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "signatario_cargo",
    "texto": "Cargo de quem assina o despacho",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   }
  ]
 },
 "dfd": {
  "md": "%% Modelo DFD (Documento de Formalização de Demanda) do Gera CFC — Fase 43 Plan 03.\n%% Fonte do texto fixo: DFD 2026 preenchido, SEI 0000000 (anonimizado em\n%% 43-DFD-REFERENCIA-SEI-0000000.txt), modelo em branco SEI 0000000 (D-01).\n%% Decisão de arquitetura (D-01/D-14/D-16/D-17 da Fase 43): \"valor_estimado_fmt\"/\n%% \"valor_estimado_extenso\" (item 4) e \"data_pretendida_extenso\" (item 5) são\n%% calculados por QUEM MONTA o ctx (apps/gera/documentos, Plan 04), reaproveitando\n%% calculos.brl/fmt_brl/extenso/data_extenso do motor — NÃO via @calcula genérico\n%% novo, para não acrescentar uma diretiva ao motor só para estes dois casos\n%% isolados (preencher.py da Plan 01 já cobre @calcula numerar_paragrafos, que\n%% segue sendo o único @calcula deste modelo). \"prioridade_baixo\"/\"_medio\"/\"_alto\"\n%% (item 6), \"portaria_pca\"/\"ano_exercicio\" (item 8) e \"contratacao_direta\"\n%% (trecho após o item 1) são booleanos/strings igualmente montados por quem\n%% chama o motor, a partir de grau_prioridade/processo_pca/via (Contratacao).\n%% O bloco \"@cabecalho\" (linha literal, sem chaves) é um marcador para\n%% para_html: sobrevive à renderização em texto puro e só ganha o timbre do\n%% CFC (nome/endereço/telefone) quando convertido para HTML — por isso o golden\n%% test (D-01) não traz o timbre: ele não existe no texto puro, só na prévia.\n%% \"vinculacao\" (item 7) e \"autoridade_nome\"/\"autoridade_cargo\" (assinaturas)\n%% também são montados por quem chama o motor, SEM `@padrao`: a diretiva\n%% `@padrao ALVO=origem` faz `formulario_variaveis()` excluir ALVO da lista de\n%% variáveis do formulário (tratado como valor sempre derivável), o que\n%% esconderia \"vinculacao\"/\"autoridade_nome\" do formulário dinâmico da Plan 05\n%% mesmo sendo perguntas reais de `dfd.yaml` — por isso o padrão \"Não se\n%% aplica\" (vinculacao) e o nome/cargo das constantes (autoridade) são\n%% aplicados no `ctx` antes de chamar `preencher_texto`, não no `.md`.\n%% Quick 261003-k9t (03/10/2026, CONTEXT LOCKED) — o item 8 passou a exigir \"item_pca\" (nº do\n%% item do PCA, lido de `Processo.item_pca`) e perdeu o ramo \"não consta do PCA\": sem\n%% contratação vinculada, \"item_pca\"/\"ano_exercicio\"/\"portaria_pca\" saem ⟦...⟧ (pendência\n%% obrigatória; a faixa RASCUNHO já existente cobre o aviso), nunca uma frase alternativa.\n\n@cabecalho\n\nÁrea Requisitante ou Técnica: {area_nome}\nResponsável pela Demanda: {responsavel_nome}\nE-mail: {responsavel_email}  |  Matrícula: {responsavel_matricula}\n\n# DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA\n\n@calcula numerar_paragrafos:justificativa\n\n## 1. Justificativa da necessidade da contratação, considerando o Planejamento Estratégico:\n\n{justificativa}\n\n{#contratacao_direta}\n\n## Fundamento da contratação direta:\n\n{fundamento_contratacao_direta}\n\n{/contratacao_direta}\n\n## 2. Descrição sucinta do objeto:\n\n{objeto}\n\n## 3. Quantidade a ser contratada, quando couber, considerada a expectativa de consumo anual:\n\n| ITEM | Descrição | Unidade | Quantidade | Período |\n| --- | --- | --- | --- | --- |\n{*itens}| {._n} | {.descricao} | {.unidade_medida} | {.quantidade} | {vigencia_meses} meses |\n{/itens}\n\n## 4. Estimativa preliminar do valor da contratação, por meio de procedimento simplificado:\n\nO valor preliminar estimado para a contratação é de R$ {valor_estimado_fmt} ({valor_estimado_extenso}).\n\n## 5. Indicação da data pretendida para a conclusão da contratação, a fim de não gerar prejuízos ou descontinuidade das atividades da instituição:\n\n{data_pretendida_extenso}\n\n## 6. Grau de prioridade da compra ou da contratação:\n\n( {#prioridade_baixo}X {/prioridade_baixo}{^prioridade_baixo} {/prioridade_baixo}) Baixo   ( {#prioridade_medio}X {/prioridade_medio}{^prioridade_medio} {/prioridade_medio}) Médio   ( {#prioridade_alto}X {/prioridade_alto}{^prioridade_alto} {/prioridade_alto}) Alto\n\n## 7. Indicação da vinculação ou dependência com o objeto de outro documento de formalização de demanda para a sua execução, com vistas a determinar a sequência em que as contratações serão realizadas:\n\n{vinculacao}\n\n## 8. Plano de Contratações Anual (PCA) / Plano Diretor de Tecnologia da Informação (PDTI):\n\nItem nº {item_pca} do Plano de Contratações Anual (PCA) do CFC para o exercício de {ano_exercicio}, aprovado pela {portaria_pca}.{#pdtic} {pdtic}{/pdtic}\n\n## 9. Projeto do Plano de Trabalho e Conta contábil:\n\n{*projetos_contas}{.projeto}\n{.conta}\n{/projetos_contas}\n\n## 10. Indicação do membro da equipe de planejamento (identificar o Integrante Requisitante, conforme o caso):\n\n{*equipe_planejamento}{.nome}\n{/equipe_planejamento}\n\n{responsavel_nome}\nResponsável pela Formalização da Demanda\nAssinado eletronicamente via SEI na data consignada\n\nDe acordo. Para manifestação do {autoridade_cargo}.\n\n{diretor_nome}\n{diretor_cargo}\nAssinado eletronicamente via SEI na data consignada\n\nAutorizo a abertura do respectivo processo conforme preconiza a legislação e demais normas aplicáveis.\n\n{autoridade_nome}\n{autoridade_cargo}\nAssinado eletronicamente via SEI na data consignada\n",
  "constantes": {
   "versao": "1.0",
   "portarias_pca": {
    "2026": "Portaria PRES/CFC nº 285, de 18 de dezembro de 2025"
   },
   "vinculacao_padrao": "Não se aplica",
   "autoridade": {
    "nome": "[A PREENCHER PELO ADMINISTRADOR]",
    "cargo": "Vice-Presidente Administrativo"
   }
  },
  "perguntas": [
   {
    "id": "justificativa",
    "texto": "Justificativa da necessidade da contratação, considerando o Planejamento Estratégico",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Cada parágrafo (separado por linha em branco) recebe numeração automática no documento (D-15).",
    "check_list_id": "[F01]",
    "le_do_cadastro": "justificativa",
    "quando_aparece": null
   },
   {
    "id": "objeto",
    "texto": "Descrição sucinta do objeto",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": "[F01]",
    "le_do_cadastro": "objeto",
    "quando_aparece": null
   },
   {
    "id": "data_pretendida",
    "texto": "Indicação da data pretendida para a conclusão da contratação",
    "tipo": "data",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Pré-preenchida com o último dia do mês previsto do cadastro e editável (D-16).",
    "check_list_id": "[F01]",
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "grau_prioridade",
    "texto": "Grau de prioridade da compra ou da contratação",
    "tipo": "escolha",
    "opcoes": [
     "Baixo",
     "Médio",
     "Alto"
    ],
    "obrigatoria": true,
    "nota": "Com item do PCA vinculado, o grau vem do PCA e esta pergunta não aparece.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": "nao tem_item_pca"
   },
   {
    "id": "vinculacao",
    "texto": "Indicação da vinculação ou dependência com o objeto de outro DFD",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "Padrão \"Não se aplica\" quando em branco.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "pdtic",
    "texto": "Alinhamento ao Plano Diretor de Tecnologia da Informação (PDTI)",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "Sugerida para contratações de TIC.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "diretor_nome",
    "texto": "Nome do diretor da área (assinatura \"De acordo\")",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "diretor_cargo",
    "texto": "Cargo do diretor da área",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "autoridade_nome",
    "texto": "Nome da autoridade que autoriza a abertura do processo",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Valor inicial vem das constantes do modelo (cargo fixo: Vice-Presidente Administrativo).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fundamento_contratacao_direta",
    "texto": "Fundamento da contratação direta",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Só aparece nas vias de dispensa ou inexigibilidade (D-06).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": "via in (dispensa, inexigibilidade)"
   }
  ]
 },
 "mapa_precos": {
  "md": "%% Modelo Mapa de preços (MCP + Justificativa de preços) do Gera CFC — Quick 261003-k9t.\n%% Mantido no SEI Pro CFC desde 2026-10-10: a justificativa da pesquisa (seção 4) fica abaixo da tabela das\n%% contratações pesquisadas, e não vira documento próprio na árvore (decisão do usuário).\n%% Fonte do texto fixo: Mapa Comparativo de Preços, SEI 0000000, e Justificativa de Preços do\n%% MCP, SEI 0000000 (anonimizados em `.planning/gera/notes/2026-10-03-processo-000000-0000/\n%% 038_0000000.txt` e `039_0000000.txt`).\n%% Decisão (CONTEXT LOCKED): 3 referências pesquisadas fixas (\"fonte_1_\"/\"fonte_2_\"/\n%% \"fonte_3_\", mesmo número do processo real) + a proposta do fornecedor. Total/média/mediana\n%% são calculados por `apps.gera.motor.calculos.estatistica_mcp` (`@calcula` abaixo), nunca\n%% digitados — \"media_fmt\"/\"mediana_fmt\"/\"economia_pct_fmt\" são variáveis DERIVADAS do cálculo,\n%% não perguntas de `mapa_precos.yaml`.\n\n@cabecalho\n\n# MAPA COMPARATIVO DE PREÇOS\n\n@calcula estatistica_mcp:fonte_1_valor_unitario,fonte_2_valor_unitario,fonte_3_valor_unitario\n\n## 1. Objeto\n\n{objeto}\n\n## 2. Proposta apresentada\n\nEmpresa: {proposta_instituicao}.\n\nValor global estimado: R$ {proposta_valor_global}, considerando {quantidade_estimada}.\n\nValor unitário: R$ {proposta_valor_unitario}.\n\n## 3. Contratações pesquisadas (Portal Nacional de Contratações Públicas)\n\n| Referência | Objeto | Valor unitário |\n| --- | --- | --- |\n| {fonte_1_instituicao} | {fonte_1_objeto} | R$ {fonte_1_valor_unitario} |\n| {fonte_2_instituicao} | {fonte_2_objeto} | R$ {fonte_2_valor_unitario} |\n| {fonte_3_instituicao} | {fonte_3_objeto} | R$ {fonte_3_valor_unitario} |\n\n## 4. Pesquisa de preços e pertinência das referências\n\n{justificativa_pesquisa}\n\n## 5. Comparação dos valores\n\nOs valores pesquisados resultam na média de R$ {media_fmt} e na mediana de R$ {mediana_fmt}. O preço completo proposto, de R$ {proposta_valor_unitario} por unidade, é aproximadamente {economia_pct_fmt}% inferior à média pesquisada.\n\n## 6. Conclusão\n\n{conclusao}\n\n## 7. Previsão orçamentária e adequação da proposta\n\n{*projetos_contas}Declaramos que o custeio da presente contratação está previsto no {.projeto}.\n{/projetos_contas}\n\nDeclaramos, ainda, que as especificações da proposta apresentada foram analisadas e atendem aos requisitos do Termo de Referência da contratação.\n\nElaboração do mapa comparativo:\n\n{*equipe_planejamento}{.nome}\n{/equipe_planejamento}\n",
  "constantes": {
   "versao": "1.0"
  },
  "perguntas": [
   {
    "id": "objeto",
    "texto": "Descrição sucinta do objeto",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": "objeto",
    "quando_aparece": null
   },
   {
    "id": "justificativa_pesquisa",
    "texto": "Pesquisa de preços e pertinência das referências utilizadas",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Parâmetros da IN SEGES/ME nº 65/2021 (art. 5º) usados e por que as referências pesquisadas são pertinentes ao objeto.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "proposta_instituicao",
    "texto": "Instituição/empresa da proposta analisada",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "proposta_valor_unitario",
    "texto": "Valor unitário da proposta (R$)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato 138,50 (sem R$).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "proposta_valor_global",
    "texto": "Valor global estimado da proposta (R$)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato 27.700.000,00 (sem R$).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "quantidade_estimada",
    "texto": "Quantitativo estimado para a contratação",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"até 200.000 inscrições homologadas\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_1_instituicao",
    "texto": "Referência 1 — órgão/empresa contratada",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_1_objeto",
    "texto": "Referência 1 — objeto da contratação pesquisada",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_1_valor_unitario",
    "texto": "Referência 1 — valor unitário considerado na pesquisa (R$)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato 173,00 (sem R$).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_2_instituicao",
    "texto": "Referência 2 — órgão/empresa contratada",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_2_objeto",
    "texto": "Referência 2 — objeto da contratação pesquisada",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_2_valor_unitario",
    "texto": "Referência 2 — valor unitário considerado na pesquisa (R$)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato 180,00 (sem R$).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_3_instituicao",
    "texto": "Referência 3 — órgão/empresa contratada",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_3_objeto",
    "texto": "Referência 3 — objeto da contratação pesquisada",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "fonte_3_valor_unitario",
    "texto": "Referência 3 — valor unitário considerado na pesquisa (R$)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato 134,30 (sem R$).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "conclusao",
    "texto": "Conclusão sobre a compatibilidade do preço proposto",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   }
  ]
 },
 "termos_cientificacao": {
  "md": "%% Modelo Termos de cientificação do Gera CFC — Quick 261003-k9t.\n%% Fonte do texto fixo: Termo de Cientificação, SEI 0000000 (anonimizado em\n%% `.planning/gera/notes/2026-10-03-processo-000000-0000/006_0000000.txt`).\n%% Decisão (CONTEXT LOCKED): um termo por pessoa de `cadastro[\"pessoas\"]` (equipe de\n%% planejamento/gestores/fiscais, D-14, já cadastrados em \"Dados da contratação\"), gerados em\n%% sequência no mesmo documento. \"pessoas_termo\" (nome/matrícula/papel por extenso/apto) é\n%% derivado em `apps.gera.documentos.respostas.contexto_documento` a partir de\n%% `cadastro[\"pessoas\"]` + da resposta livre \"pessoas_sem_treinamento\" (um nome por linha) —\n%% nenhum tipo de pergunta \"tabela\" editável novo (TIPOS_SEM_CAMPO continua sem campo para\n%% isso; ver nota em `forms_documento.py`).\n\n@cabecalho\n\n# TERMO DE CIENTIFICAÇÃO\n\n{*pessoas_termo}\n## Termo de Cientificação — {.nome}\n\nEm conformidade com o previsto no §1º do art. 8º do Decreto nº 11.246, de 27 de outubro de 2022, eu, {.nome}, {vinculo_padrao}, sob a matrícula nº {.matricula}, registro minha cientificação quanto a indicação para {.papel}, conforme Portaria(s) de Designação acostada ao presente processo.\n\nNos termos do que estabelece o art. 10 do Decreto nº 11.246/2022, informo que:\n\n( {#.apto}X {/.apto}{^.apto} {/.apto}) Encontro-me apto para a atribuição a mim conferida\n\n( {^.apto}X {/.apto}{#.apto} {/.apto}) Necessito de treinamento para a atribuição a mim conferida, considerando a especificidade dos serviços objeto do presente processo.\n\nDeclaro pleno conhecimento das disposições previstas no Decreto nº 11.246, de 27 de outubro de 2022.\n\n{.nome}\nAssinado eletronicamente via SEI na data consignada\n\n{/pessoas_termo}\n",
  "constantes": {
   "versao": "1.0",
   "vinculo_padrao": "empregado efetivo deste Conselho Federal de Contabilidade"
  },
  "perguntas": [
   {
    "id": "pessoas_sem_treinamento",
    "texto": "Pessoas que necessitam de treinamento para a atribuição conferida",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "Um nome por linha, EXATAMENTE como está em \"Dados da contratação\" (equipe de planejamento/gestores/fiscais). Em branco, todos saem marcados aptos.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   }
  ]
 },
 "tr": {
  "md": "%% Modelo TR (Termo de Referência) do Gera CFC — Quick 261003-kwp.\n%% Fonte do texto fixo: AGU, \"Modelo de Termo de Referência — Serviços e Obras — Lei nº 14.133\"\n%% versão mai/26 (`apps/gera/modelos/agu/pregao-e-concorrencia/modelo-de-termo-de-referencia-\n%% servicos-e-obras-lei-no-14-133-mai-26.docx`), extraído com python-docx (887 parágrafos).\n%% Decisão (CONTEXT LOCKED, 03/10/2026): o texto fixo é o da AGU, fiel — nada de reescrever. As\n%% \"Nota explicativa\" do modelo AGU (instruções em amarelo) NUNCA entram no documento: viram a\n%% nota (i) da pergunta correspondente em `tr.yaml`. Trechos entre colchetes/opcionais do modelo\n%% viram perguntas ou blocos condicionais `{#var}...{/var}`.\n%%\n%% Escopo desta versão: serviços SEM dedicação exclusiva de mão de obra (o caso mais comum dos\n%% 110 itens de serviço do PCA 2026 — SPEC §4). Ficam FORA desta versão (entram depois como\n%% condicionais, quando o CFC tiver um caso real de obra ou de mão de obra exclusiva):\n%%   - Exclusivo de obras/serviços de engenharia: classificação quanto à natureza de obra,\n%%     garantia adicional do fornecedor (85% do valor orçado), vistoria com \"as built\"/habite-se,\n%%     disposições de contratação integrada/semi-integrada e desapropriação, diário de obra,\n%%     gestão de resíduos da construção civil (CONAMA), procedência de matéria-prima florestal\n%%     (DOF/IBAMA), emissões atmosféricas/ruído (CONAMA), empreitada por preço unitário/global,\n%%     garantia adicional de 5 anos por vício de construção.\n%%   - Exclusivo de dedicação exclusiva de mão de obra: uniformes, conta-depósito vinculada\n%%     (Anexo XII IN SEGES/MP nº 5/2017), pagamento pelo fato gerador, repactuação de custos de\n%%     mão de obra (Acordo/Convenção/Dissídio Coletivo), programação de férias e compensação de\n%%     jornada de colaboradores terceirizados, gestor/fiscal setorial de terceirização, habilitação\n%%     por custos unitários mínimos relevantes (planilha de custos vinculada a CCT/ACT/DC),\n%%     garantia com cobertura de verbas rescisórias, responsabilidade solidária por subcontratação\n%%     de serviço contínuo com mão de obra exclusiva.\n%%   - O \"ANEXO I — Regras aplicáveis ao instrumento substitutivo ao contrato\" (contratações de\n%%     pequeno valor, Nota de Empenho/Carta Contrato) não é tratado como seção isolada: suas\n%%     cláusulas de obrigações do Contratante/Contratado, LGPD, extinção, casos omissos, alterações\n%%     e foro entram condensadas no corpo deste TR (seções 12 a 14), sem o enquadramento específico\n%%     de instrumento substitutivo de pequeno valor — qualquer Termo de Contrato formal do CFC\n%%     usa as mesmas cláusulas.\n%%   - Habilitação jurídica: mantida só a enumeração padrão (CNPJ/CPF, regularidade fiscal/FGTS/\n%%     trabalhista, econômico-financeira, qualificação técnica geral); omitidas as variantes raras\n%%     para este órgão (cooperativas, consórcio, sociedade empresária estrangeira).\n%%\n%% Reaproveita do ctx já montado por `apps.gera.documentos.respostas.contexto_documento` (D-14):\n%% \"objeto\" (cadastro único), \"valor_estimado_fmt\"/\"valor_estimado_extenso\" (derivadas do\n%% cadastro), \"vigencia_meses\" (cadastro), \"projetos_contas\" (cadastro, mesmo uso do DFD/Mapa de\n%% preços), \"tem_item_pca\"/\"ano_exercicio\" (PCA vinculado).\n\n@cabecalho\n\n# TERMO DE REFERÊNCIA\n\n## 1. Condições gerais da contratação\n\nObjeto da contratação: {objeto}\n\nA contratação tem caráter {#justificativa_continuidade}contínuo{/justificativa_continuidade}{^justificativa_continuidade}não contínuo{/justificativa_continuidade}, conforme condições e exigências estabelecidas neste instrumento.\n\nO(s) serviço(s) objeto desta contratação são caracterizados como {natureza_classificacao}, conforme justificativa constante do Estudo Técnico Preliminar.\n\n{#justificativa_continuidade}\n\nO serviço é enquadrado como continuado, tendo em vista que {justificativa_continuidade}, sendo a vigência plurianual mais vantajosa considerando o Estudo Técnico Preliminar.\n\n{/justificativa_continuidade}\n{^justificativa_continuidade}\n\nO serviço é enquadrado como não contínuo ou contratado por escopo.\n\n{/justificativa_continuidade}\n\nO prazo de vigência da contratação é de {vigencia_meses} meses contados {termo_inicial_vigencia}, prorrogável por até 10 (dez) anos, na forma dos artigos 106 e 107 da Lei n° 14.133, de 2021. O contrato ou outro instrumento hábil que o substitua oferece maior detalhamento das regras que serão aplicadas em relação à vigência da contratação.\n\n## 2. Fundamentação e descrição da necessidade da contratação\n\nA Fundamentação da Contratação e de seus quantitativos encontra-se pormenorizada em tópico específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.\n\n{#tem_item_pca}\n\nO objeto da contratação está previsto no Plano de Contratações Anual {ano_exercicio}, conforme consta das informações básicas desse Termo de Referência.\n\n{/tem_item_pca}\n\n## 3. Descrição da solução como um todo considerado o ciclo de vida do objeto\n\nA descrição da solução como um todo encontra-se pormenorizada em tópico específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.\n\n## 4. Requisitos da contratação\n\n{#sustentabilidade}\n\nAlém dos critérios de sustentabilidade eventualmente inseridos na descrição do objeto, devem ser atendidos os seguintes requisitos, que se baseiam no Guia Nacional de Contratações Sustentáveis: {sustentabilidade}.\n\n{/sustentabilidade}\n\n{#marcas_admitidas}\n\nNa presente contratação será admitida a indicação da(s) seguinte(s) marca(s), característica(s) ou modelo(s), de acordo com as justificativas contidas nos Estudos Técnicos Preliminares: {marcas_admitidas}.\n\n{/marcas_admitidas}\n\n{#subcontratacao_limite_pct}\n\nÉ permitida a subcontratação parcial do objeto, até o limite de {subcontratacao_limite_pct}% do valor total do contrato, permanecendo a responsabilidade integral do Contratado pela perfeita execução contratual, cabendo-lhe realizar a supervisão e coordenação das atividades do subcontratado, bem como responder perante o Contratante pelo rigoroso cumprimento das obrigações contratuais correspondentes ao objeto da subcontratação. A subcontratação depende de autorização prévia do Contratante, a quem incumbe avaliar se o subcontratado cumpre os requisitos de qualificação técnica necessários para a execução do objeto.\n\n{/subcontratacao_limite_pct}\n{^subcontratacao_limite_pct}\n\nNão será admitida a subcontratação do objeto contratual.\n\n{/subcontratacao_limite_pct}\n\n{#garantia_percentual}\n\nSerá exigida a garantia da contratação de que tratam os arts. 96 e seguintes da Lei nº 14.133, de 2021, com validade durante a execução do contrato e 90 (noventa) dias após término da vigência contratual, podendo o Contratado optar pela caução em dinheiro ou em títulos da dívida pública, seguro-garantia, fiança bancária ou título de capitalização, em valor correspondente a {garantia_percentual}% do valor total da contratação. A garantia somente será liberada ou restituída após a fiel execução do contrato ou após a sua extinção por culpa exclusiva da Administração e, quando em dinheiro, será atualizada monetariamente.\n\n{/garantia_percentual}\n{^garantia_percentual}\n\nNão haverá exigência da garantia da contratação dos art. 96 e seguintes da Lei nº 14.133, de 2021, pelas razões constantes do Estudo Técnico Preliminar.\n\n{/garantia_percentual}\n\n{#vistoria_horario}\n\nA avaliação prévia do local de execução dos serviços é imprescindível para o conhecimento pleno das condições e peculiaridades do objeto a ser contratado, sendo assegurado ao interessado o direito de realização de vistoria prévia, acompanhado por servidor designado para esse fim, de segunda à sexta-feira, das {vistoria_horario}. Caso o interessado opte por não realizar a vistoria, deverá prestar declaração formal assinada pelo seu responsável técnico acerca do conhecimento pleno das condições e peculiaridades da contratação.\n\n{/vistoria_horario}\n{^vistoria_horario}\n\nNão há necessidade de realização de avaliação prévia do local de execução dos serviços.\n\n{/vistoria_horario}\n\n## 5. Modelo de execução do objeto\n\nA execução do objeto seguirá a seguinte dinâmica: início da execução em {prazo_inicio_execucao}, contado da assinatura do contrato ou da emissão da ordem de serviço. {metodo_execucao}\n\nOs serviços serão prestados no seguinte endereço: {local_execucao}. Os serviços serão prestados no seguinte horário: {horario_execucao}.\n\n{#materiais_disponibilizados}\n\nPara a perfeita execução dos serviços, o Contratado deverá disponibilizar os materiais, equipamentos, ferramentas e utensílios necessários, nas quantidades estimadas e qualidades a seguir estabelecidas, promovendo sua substituição quando necessário: {materiais_disponibilizados}.\n\n{/materiais_disponibilizados}\n\n{#dimensionamento_proposta}\n\nA demanda do órgão tem como base as seguintes características: {dimensionamento_proposta}.\n\n{/dimensionamento_proposta}\n\nO prazo de garantia dos serviços é aquele estabelecido na Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor).\n\n{#procedimentos_transicao}\n\nOs procedimentos de transição e finalização do contrato constituem-se das seguintes etapas: {procedimentos_transicao}.\n\n{/procedimentos_transicao}\n{^procedimentos_transicao}\n\nNão serão necessários procedimentos de transição e finalização do contrato devido às características do objeto.\n\n{/procedimentos_transicao}\n\n## 6. Modelo de gestão do contrato\n\nO contrato deverá ser executado fielmente pelas partes, de acordo com as cláusulas avençadas e as normas da Lei nº 14.133, de 2021, e cada parte responderá pelas consequências de sua inexecução total ou parcial. As comunicações entre o órgão ou entidade e o Contratado devem ser realizadas por escrito sempre que o ato exigir tal formalidade, admitindo-se o uso de mensagem eletrônica para esse fim. O órgão ou entidade poderá convocar o preposto da empresa para adoção de providências que devam ser cumpridas de imediato.\n\nO Contratado designará formalmente o preposto da empresa, antes do início da prestação dos serviços, indicando no instrumento os poderes e deveres em relação à execução do objeto Contratado. O Contratante poderá recusar, desde que justificadamente, a indicação ou a manutenção do preposto da empresa, hipótese em que o Contratado designará outro para o exercício da atividade.\n\nA execução do contrato deverá ser acompanhada e fiscalizada pelo(s) fiscal(is) do contrato, ou pelos respectivos substitutos. O fiscal técnico do contrato acompanhará a execução do contrato, para que sejam cumpridas todas as condições estabelecidas no contrato, de modo a assegurar os melhores resultados para a Administração, anotando no histórico de gerenciamento do contrato todas as ocorrências relacionadas à execução do contrato. O fiscal administrativo do contrato verificará a manutenção das condições de habilitação da contratada, acompanhará o empenho, o pagamento, as garantias, as glosas e a formalização de apostilamento e termos aditivos.\n\nA fiscalização de que trata esta cláusula não exclui nem reduz a responsabilidade do Contratado, inclusive perante terceiros, por qualquer irregularidade, ainda que resultante de imperfeições técnicas, vícios redibitórios, ou emprego de material inadequado ou de qualidade inferior.\n\n## 7. Critérios de medição e pagamento\n\nOs serviços serão recebidos provisoriamente, no prazo de {prazo_recebimento_provisorio} dias, pelos fiscais técnico e administrativo, mediante termos detalhados, quando verificado o cumprimento das exigências de caráter técnico e administrativo. O Contratado fica obrigado a reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no todo ou em parte, o objeto em que se verificarem vícios, defeitos ou incorreções resultantes da execução ou materiais empregados.\n\nOs serviços serão recebidos definitivamente no prazo de {prazo_recebimento_definitivo} dias, contados do recebimento provisório, por servidor ou comissão designada pela autoridade competente, após a verificação da qualidade e quantidade do serviço e consequente aceitação mediante termo detalhado.\n\nRecebida a Nota Fiscal ou documento de cobrança equivalente, correrá o prazo de dez dias úteis para fins de liquidação, prorrogáveis por igual período, nos termos do art. 7º, §3º da Instrução Normativa SEGES/ME nº 77/2022. A Nota Fiscal ou Fatura deverá ser obrigatoriamente acompanhada da comprovação da regularidade fiscal, constatada por meio de consulta on-line ao SICAF.\n\nO pagamento será efetuado no prazo máximo de até dez dias úteis, contados da finalização da liquidação da despesa, nos termos da Instrução Normativa SEGES/ME nº 77, de 2022, por meio de ordem bancária, para crédito em banco, agência e conta corrente indicados pelo Contratado.\n\nOs preços inicialmente contratados são fixos e irreajustáveis no prazo de um ano contado da data do orçamento estimado. Após o interregno de um ano, e independentemente de pedido do Contratado, os preços iniciais serão reajustados, mediante a aplicação, pelo Contratante, do {indice_reajuste}, exclusivamente para as obrigações iniciadas e concluídas após a ocorrência da anualidade. O reajuste será realizado por apostilamento.\n\n## 8. Infrações e sanções administrativas\n\nComete infração administrativa, nos termos da Lei nº 14.133, de 2021, o Contratado que der causa à inexecução parcial ou total do contrato, ensejar o retardamento da execução ou da entrega do objeto da contratação sem motivo justificado, apresentar documentação falsa ou prestar declaração falsa durante a execução do contrato, praticar ato fraudulento na execução do contrato, comportar-se de modo inidôneo ou cometer fraude de qualquer natureza, ou praticar ato lesivo previsto no art. 5º da Lei nº 12.846, de 1º de agosto de 2013.\n\nSerão aplicadas ao Contratado que incorrer nas infrações acima descritas as seguintes sanções: advertência, quando o Contratado der causa à inexecução parcial do contrato, sempre que não se justificar a imposição de penalidade mais grave; impedimento de licitar e contratar ou declaração de inidoneidade, conforme a gravidade da conduta; e multa moratória de {multa_moratoria_pct}% por dia de atraso injustificado sobre o valor da parcela inadimplida, ou multa compensatória de {multa_compensatoria_min_pct}% a {multa_compensatoria_max_pct}% do valor da contratação, conforme a infração.\n\nA aplicação das sanções previstas neste Termo de Referência não exclui, em hipótese alguma, a obrigação de reparação integral do dano causado ao Contratante. Antes da aplicação da multa será facultada a defesa do interessado no prazo de 15 (quinze) dias úteis, contado da data de sua intimação, observando-se o procedimento previsto no caput e parágrafos do art. 158 da Lei nº 14.133, de 2021.\n\n## 9. Forma e critérios de seleção do fornecedor e regime de execução\n\n{^contratacao_direta}\n\nO fornecedor será selecionado por meio da realização de procedimento de LICITAÇÃO, na modalidade {modalidade_licitacao}, sob a forma ELETRÔNICA, com adoção do critério de julgamento pelo {criterio_julgamento}.\n\n{/contratacao_direta}\n{#contratacao_direta}\n\nO fornecedor será selecionado por meio de contratação direta com fundamento no {fundamento_contratacao_direta}.\n\n{/contratacao_direta}\n\nO regime de execução do objeto será de {regime_execucao}.\n\nO critério de aceitabilidade de preços será o valor {criterio_preco} estimado para a contratação.\n\nPara fins de habilitação, deverá o interessado comprovar os seguintes requisitos: prova de inscrição no Cadastro Nacional de Pessoas Jurídicas ou no Cadastro de Pessoas Físicas, conforme o caso; prova de regularidade fiscal perante a Fazenda Nacional, mediante apresentação de certidão expedida conjuntamente pela Secretaria da Receita Federal do Brasil (RFB) e pela Procuradoria-Geral da Fazenda Nacional (PGFN); prova de regularidade com o Fundo de Garantia do Tempo de Serviço (FGTS); prova de inexistência de débitos inadimplidos perante a Justiça do Trabalho (CNDT); prova de inscrição no cadastro de contribuintes Distrital ou Municipal relativo ao domicílio ou sede do fornecedor; e prova de regularidade com a Fazenda Distrital ou Municipal do domicílio ou sede do fornecedor.\n\nPara fins de qualificação econômico-financeira: certidão negativa de falência expedida pelo distribuidor da sede do fornecedor; e balanço patrimonial, demonstração de resultado de exercício e demais demonstrações contábeis do último exercício social, já exigíveis e apresentados na forma da lei, comprovando índices de Liquidez Geral (LG), Liquidez Corrente (LC) e Solvência Geral (SG) superiores a 1 (um).\n\nPara fins de qualificação técnica: {qualificacao_tecnica}.\n\n## 10. Estimativas do valor da contratação\n\nO custo estimado total da contratação, que é o máximo aceitável, é de R$ {valor_estimado_fmt} ({valor_estimado_extenso}). A estimativa de custo levou em consideração o risco envolvido na contratação e sua alocação entre Contratante e Contratado, conforme especificado na matriz de risco constante do Contrato.\n\n## 11. Adequação orçamentária\n\n{*projetos_contas}Declaramos que o custeio da presente contratação está previsto no {.projeto}.\n{/projetos_contas}\n\n## 12. Disposições finais\n\nAs informações contidas neste Termo de Referência não são classificadas como sigilosas, exceto o custo estimado da contratação, que possui caráter sigiloso até o julgamento das propostas, quando esse for o caso.\n\n## 13. Obrigações do Contratante e do Contratado\n\nSão obrigações do Contratante: exigir o cumprimento de todas as obrigações assumidas pelo Contratado, de acordo com o Termo de Referência e seus anexos; receber o objeto no prazo e condições estabelecidas; notificar o Contratado, por escrito, sobre vícios, defeitos, incorreções, imperfeições, falhas ou irregularidades verificadas na execução do objeto contratual; acompanhar e fiscalizar a execução contratual e o cumprimento das obrigações pelo Contratado; efetuar o pagamento ao Contratado do valor correspondente à execução do objeto, no prazo, forma e condições estabelecidos; e aplicar ao Contratado as sanções previstas na lei e neste Termo de Referência. A Administração não responderá por quaisquer compromissos assumidos pelo Contratado com terceiros, ainda que vinculados à execução do objeto contratual.\n\nO Contratado deve cumprir todas as obrigações constantes do Termo de Referência, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita execução do objeto, observando ainda: atender às determinações regulares emitidas pelo fiscal contratual e prestar todo esclarecimento ou informação solicitados; alocar os empregados necessários ao perfeito cumprimento das disposições do Termo de Referência, com habilitação e conhecimento adequados; reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, os serviços nos quais se verificarem vícios, defeitos ou incorreções; responsabilizar-se pelos vícios e danos decorrentes da execução do objeto, de acordo com o Código de Defesa do Consumidor; não contratar, durante a vigência da contratação, cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, de dirigente do Contratante ou do fiscal ou gestor contratuais; responsabilizar-se pelo cumprimento das obrigações trabalhistas, sociais, previdenciárias, tributárias e as demais previstas em legislação específica, cuja inadimplência não transfere a responsabilidade ao Contratante; manter, durante toda a vigência da contratação, todas as condições exigidas para habilitação; e guardar sigilo sobre todas as informações obtidas em decorrência da execução do objeto.\n\n## 14. Obrigações pertinentes à LGPD, extinção contratual, casos omissos, alterações e foro\n\nAs partes deverão cumprir a Lei nº 13.709, de 14 de agosto de 2018 (LGPD), quanto a todos os dados pessoais a que tenham acesso em razão da licitação ou da contratação. Os dados obtidos somente poderão ser utilizados para as finalidades que justificaram seu acesso, sendo vedado o compartilhamento com terceiros fora das hipóteses permitidas em lei.\n\nA contratação será extinta quando cumpridas as obrigações de ambas as partes, ainda que isso ocorra antes do prazo estipulado para tanto, ou poderá ser extinta antes de cumpridas as obrigações nela estipuladas por algum dos motivos previstos no artigo 137 da Lei nº 14.133/2021, bem como amigavelmente, assegurados o contraditório e a ampla defesa.\n\nOs casos omissos serão decididos pelo Contratante, segundo as disposições contidas na Lei nº 14.133, de 2021, e demais normas federais aplicáveis e, subsidiariamente, segundo as disposições contidas na Lei nº 8.078, de 1990 (Código de Defesa do Consumidor) e normas e princípios gerais dos contratos.\n\nEventuais alterações contratuais reger-se-ão pela disciplina dos arts. 124 e seguintes da Lei nº 14.133, de 2021. O Contratado é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos ou supressões que se fizerem necessários, até o limite de 25% (vinte e cinco por cento) do valor inicial atualizado da contratação.\n\nFica definido o Foro da Justiça Federal em {foro}, Seção Judiciária de {foro}, para dirimir os litígios que decorrerem da execução contratual que não puderem ser compostos pela conciliação, conforme art. 92, §1º, da Lei nº 14.133, de 2021.\n",
  "constantes": {
   "versao": "1.0",
   "origem": "AGU — Modelo de Termo de Referência, serviços e obras, Lei nº 14.133, mai/26"
  },
  "perguntas": [
   {
    "id": "objeto",
    "texto": "Descrição sucinta do objeto",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": "objeto",
    "quando_aparece": null
   },
   {
    "id": "natureza_classificacao",
    "texto": "Classificação do objeto quanto à heterogeneidade ou complexidade",
    "tipo": "escolha",
    "opcoes": [
     "comum(ns)",
     "especiais"
    ],
    "obrigatoria": true,
    "nota": "Serviço comum = especificação usual de mercado; especial = exige justificativa técnica própria no ETP.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "justificativa_continuidade",
    "texto": "Justificativa da continuidade do serviço (em branco = serviço não contínuo/por escopo)",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "Só preencher quando o serviço for contínuo (vigência plurianual mais vantajosa); em branco, o TR sai como \"não contínuo ou contratado por escopo\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "termo_inicial_vigencia",
    "texto": "Termo inicial da vigência do contrato",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"da assinatura do contrato\" ou \"do recebimento da ordem de serviço\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "sustentabilidade",
    "texto": "Requisitos de sustentabilidade (Guia Nacional de Contratações Sustentáveis)",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "marcas_admitidas",
    "texto": "Marcas, características ou modelos admitidos na indicação",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "subcontratacao_limite_pct",
    "texto": "Limite de subcontratação permitido, em % do valor do contrato (em branco = não permitida)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "garantia_percentual",
    "texto": "Percentual exigido de garantia da contratação (em branco = sem exigência de garantia)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "vistoria_horario",
    "texto": "Horário de realização da vistoria prévia, ex.: \"9h às 12h\" (em branco = vistoria não obrigatória)",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "prazo_inicio_execucao",
    "texto": "Prazo para início da execução do objeto",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"10 (dez) dias\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "metodo_execucao",
    "texto": "Descrição detalhada dos métodos, rotinas, etapas e periodicidade de execução do trabalho",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "local_execucao",
    "texto": "Local de prestação dos serviços",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "horario_execucao",
    "texto": "Horário de prestação dos serviços",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "materiais_disponibilizados",
    "texto": "Materiais, equipamentos, ferramentas e utensílios que o Contratado deve disponibilizar",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "dimensionamento_proposta",
    "texto": "Informações relevantes para o dimensionamento da proposta",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "procedimentos_transicao",
    "texto": "Procedimentos de transição e finalização do contrato (em branco = não necessários)",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": false,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "prazo_recebimento_provisorio",
    "texto": "Prazo para recebimento provisório, em dias",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "prazo_recebimento_definitivo",
    "texto": "Prazo para recebimento definitivo, em dias, contados do recebimento provisório",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "indice_reajuste",
    "texto": "Índice de reajuste a ser aplicado após o interregno de um ano",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"IPCA\", \"INPC\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "multa_moratoria_pct",
    "texto": "Percentual da multa moratória, por dia de atraso injustificado",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Formato \"0,5\" (sem o símbolo %).",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "multa_compensatoria_min_pct",
    "texto": "Percentual mínimo da multa compensatória",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "multa_compensatoria_max_pct",
    "texto": "Percentual máximo da multa compensatória",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "modalidade_licitacao",
    "texto": "Modalidade da licitação",
    "tipo": "escolha",
    "opcoes": [
     "PREGÃO",
     "CONCORRÊNCIA"
    ],
    "obrigatoria": true,
    "nota": "Só aparece quando a via da contratação (capa) não é dispensa/inexigibilidade.",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": "nao contratacao_direta"
   },
   {
    "id": "criterio_julgamento",
    "texto": "Critério de julgamento da proposta",
    "tipo": "escolha",
    "opcoes": [
     "MENOR PREÇO",
     "MAIOR DESCONTO",
     "TÉCNICA E PREÇO"
    ],
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": "nao contratacao_direta"
   },
   {
    "id": "fundamento_contratacao_direta",
    "texto": "Fundamento legal e enquadramento da contratação direta",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"art. 75, inciso II, da Lei nº 14.133, de 2021\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": "via in (dispensa, inexigibilidade)"
   },
   {
    "id": "regime_execucao",
    "texto": "Regime de execução do objeto",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"fornecimento e prestação de serviço associado\" ou \"empreitada por preço global\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "criterio_preco",
    "texto": "Critério de aceitabilidade de preços",
    "tipo": "escolha",
    "opcoes": [
     "global",
     "unitário"
    ],
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "qualificacao_tecnica",
    "texto": "Exigências de qualificação técnica (atestados de capacidade, registro em conselho, etc.)",
    "tipo": "texto_longo",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   },
   {
    "id": "foro",
    "texto": "Município e Seção Judiciária do foro da Justiça Federal",
    "tipo": "texto",
    "opcoes": null,
    "obrigatoria": true,
    "nota": "Ex.: \"Brasília/DF\".",
    "check_list_id": null,
    "le_do_cadastro": null,
    "quando_aparece": null
   }
  ]
 }
} as Readonly<Record<string, ModeloCfcDados>>;

export const SEQUENCIA_CFC: readonly DocumentoSequenciaCfc[] = [
 {
  "chave": "dfd",
  "rotulo": "DFD",
  "nota": "Documento de Formalização de Demanda: necessidade, objeto, quantidade, estimativa preliminar de valor, data pretendida e responsável (lista de verificação AGU: \"Consta documento de formalização de demanda?\").",
  "check_list_id": "[F01]",
  "modelo": true
 },
 {
  "chave": "termos_cientificacao",
  "rotulo": "Termos de cientificação",
  "nota": "Ciência expressa de cada pessoa chamada a participar do processo (equipe de planejamento, gestores, fiscais) quanto à indicação e às atribuições. Quatro, por padrão.",
  "check_list_id": null,
  "modelo": true
 },
 {
  "chave": "portaria_planejamento",
  "rotulo": "Portaria - Equipe de Planejamento",
  "nota": "Ato da autoridade que institui a equipe de planejamento da contratação. Título na árvore: \"Portaria nº <n> - Equipe de Planejamento\".",
  "check_list_id": null,
  "modelo": false
 },
 {
  "chave": "portaria_gestores",
  "rotulo": "Portaria - Gestores de Contrato",
  "nota": "Ato da autoridade que designa os gestores e fiscais do contrato. Título na árvore: \"Portaria nº <n> - Gestores de Contrato\".",
  "check_list_id": null,
  "modelo": false
 },
 {
  "chave": "etp",
  "rotulo": "ETP",
  "nota": "Estudo Técnico Preliminar: necessidade, estimativa de quantitativo e de valor, manifestação sobre parcelamento e sobre a viabilidade, no mínimo (lista de verificação AGU: \"O Estudo Técnico Preliminar contempla ao menos...?\").",
  "check_list_id": "[T01]",
  "modelo": false
 },
 {
  "chave": "pesquisa_banco_precos",
  "rotulo": "Pesquisa de preços - Banco de Preços",
  "nota": "Relatório da pesquisa nos bancos públicos de preços (Banco de Preços, contratações similares), documento externo.",
  "check_list_id": null,
  "modelo": false
 },
 {
  "chave": "cotacoes",
  "rotulo": "Cotações de fornecedores",
  "nota": "Cotações enviadas pelos fornecedores, em PDF (três ou quatro, por padrão), documentos externos.",
  "check_list_id": null,
  "modelo": false
 },
 {
  "chave": "mapa_precos",
  "rotulo": "Mapa de preços",
  "nota": "Mapa Comparativo de Preços (documento do SEI): série de preços coletados, método estatístico e memória de cálculo do valor estimado, com a justificativa da pesquisa abaixo da tabela — contas refeitas pelo sistema, nunca digitadas.",
  "check_list_id": null,
  "modelo": true
 },
 {
  "chave": "tr",
  "rotulo": "TR",
  "nota": "Termo de Referência: objeto, fundamentação da contratação, descrição da solução, requisitos, modelo de execução, modelo de gestão, critérios de medição e de pagamento, forma de seleção do fornecedor e estimativa de valor.",
  "check_list_id": "[R01]",
  "modelo": true
 },
 {
  "chave": "mapa_riscos",
  "rotulo": "Mapa de riscos",
  "nota": "Análise/Mapa de riscos com probabilidade, impacto, prevenção, contingência e responsável, assinado pela equipe de planejamento (lista de verificação AGU: \"Há Análise de Riscos?\").",
  "check_list_id": "[K01]",
  "modelo": false
 },
 {
  "chave": "checklist_conformidade",
  "rotulo": "Checklist de Conformidade",
  "nota": "Verificação prévia da unidade, pelos mesmos critérios do DVI da Gelic, antes do envio (gerada pela verificação prévia).",
  "check_list_id": null,
  "modelo": false
 },
 {
  "chave": "despacho_delic",
  "rotulo": "Despacho de envio à Gelic",
  "nota": "Despacho de encaminhamento do processo à Gerência de Licitações e Contratos (Gelic), identificando objeto, fundamento e as peças encaminhadas.",
  "check_list_id": null,
  "modelo": true
 }
];
