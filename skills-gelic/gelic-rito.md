---
name: gelic-rito
description: Referência do rito da Gelic (CFC) — etapas do processo de contratação em ordem, o documento ou a ação de cada etapa, as regras de limite da análise e a regra que decide entre DVI, devolução e despacho à Gecont. Leia quando outra skill Gelic mandar ou quando o usuário perguntar como funciona o fluxo.
---

# Rito da Gelic (Gerência de Licitações e Contratos do CFC)

Esta skill é consulta. Ela não manda chamar ferramentas; quem age são as outras skills Gelic.

## Quem decide a etapa

A etapa é calculada pela ferramenta `gelic_etapa`, de forma determinística, a partir dos **títulos dos
documentos**, da **ordem** em que aparecem na árvore e de **marcas** no título (prorrogação,
acréscimo/supressão, reajuste, registro de preços, inexigibilidade, dispensa eletrônica). Você não
deduz nem corrige a etapa. Se os autos parecerem contradizer o resultado (ex.: documento com título
genérico que, pelo conteúdo, é um DVI), relate a divergência ao usuário com os nºs SEI e siga a etapa
da ferramenta, salvo decisão expressa do usuário.

Como a ferramenta reconhece cada peça pelo título (sem diferenciar maiúsculas e acentos):

| Tipo | Título contém |
|---|---|
| DVI | "verificação inicial" ou "DVI" (na Gelic: tipo de documento **DVI**) |
| despacho de devolução | "despacho" + "devolu…", "ajuste" ou "reexame". Devolução da própria Gelic não conta como documento novo da unidade: só o que vier depois dela leva ao reexame |
| despacho à Gecont (reserva) | "despacho" + "reserva", "Gecont" ou "disponibilidade" (na Gelic: Despacho "Solicitação Reserva Gecont") |
| nota de reserva | "nota de reserva", "pré-empenho" |
| despacho à Projur | "despacho" + "Projur", ou "envio à Projur" |
| parecer | "parecer" |
| autorização | "autorização de contratação", "autorização" + dispensa/inexigibilidade |
| aviso de dispensa | "aviso de dispensa", "aviso de contratação direta" |
| edital · homologação | "edital" · "homologação" ou "adjudicação" |
| minuta de contrato · contrato | "minuta de contrato" · título que começa com "Contrato" ou "Termo de Contrato" |
| nota de empenho · publicação | "empenho" · "publicação", "PNCP", "extrato" |
| formulário de alteração | "formulário" + prorroga/reajuste/repactua/altera, ou "pedido de prorrogação/reajuste/repactuação" |
| minuta de aditivo · termo aditivo · apostila | "minuta…aditivo" · começa com "Termo Aditivo" · "apostil…" |
| informação de inexecução · notificação | "informação técnica", "inexecução", "relatório de fiscalização" · "notificação" |
| termo de extinção · abertura de PAR | termo/minuta + extinção/rescisão · "apuração de responsabilidade", "abertura de PAR" |
| ETP · TR · DFD | "estudo técnico preliminar"/"ETP" · "termo de referência"/"TR" · "DFD"/"documento de formalização" |

Consequência prática: um documento da Gelic só move o rito se o título dele trouxer essas palavras.
Ao criar DVI, devolução ou despacho à Gecont, o título (nome na árvore) precisa ser reconhecível.

## Etapas, na ordem em que são avaliadas (a primeira que vale é a etapa)

| Id | Situação nos autos | Leva a |
|---|---|---|
| `extincao_termo` | inexecução informada, despacho à Projur e parecer posterior, sem termo de extinção | termo de extinção unilateral (modelo) |
| `extincao_projur` | contrato, inexecução informada e contratada notificada, sem envio à Projur depois da informação | despacho à Projur, bloco extinção (modelo PROJUR) |
| `aguarda_parecer` | despacho à Projur posterior ao último parecer | aguardar o parecer da Projur |
| `concluido` | contrato/aditivo/apostila assinado, publicado e empenhado depois do último pedido | nada a fazer: arquivar ou devolver ao gestor |
| `aditivo_assinado` | termo aditivo posterior ao formulário, sem publicação/empenho | publicar extrato no PNCP e pedir empenho à Gecont (redigir à mão) |
| `aditivo_termo_prorrogacao` | prorrogação com minuta, envio à Projur e parecer | termo aditivo de prorrogação, com os ajustes do parecer (modelo) |
| `aditivo_termo_alteracao` | acréscimo/supressão com minuta, envio à Projur e parecer | termo aditivo de alteração (modelo) |
| `aditivo_projur_prorrogacao` | prorrogação com minuta de aditivo depois do DVI/reserva, sem envio à Projur | despacho à Projur, bloco prorrogação (modelo PROJUR) |
| `aditivo_projur_alteracao` | idem, acréscimo/supressão | enviar à Projur — sem modelo; redigir à mão |
| `aditivo_minuta_prorrogacao` | prorrogação analisada, sem impeditivo, com despacho de reserva | minutar termo aditivo de prorrogação (modelo) |
| `aditivo_minuta_alteracao` | acréscimo/supressão analisado, com reserva | minutar termo aditivo de alteração (modelo) |
| `aditivo_instrumento_indefinido` | pedido analisado e com reserva, título não diz prorrogação nem acréscimo/supressão | escolher: apostila de reajuste, aditivo de prorrogação ou de alteração (perguntar) |
| `alteracao_reexame` | contrato + formulário + DVI, com documentos novos depois do DVI | reexame → devolução ou despacho à Gecont; se o instrumento for apostila, termo de apostilamento |
| `alteracao_aguarda_unidade` | contrato + formulário + DVI, nada novo depois do DVI | aguardar a unidade |
| `alteracao_analise` | contrato com formulário posterior, sem DVI depois do contrato | analisar o pedido e emitir o DVI |
| `empenho` | contrato sem nota de empenho e sem formulário de alteração | pedir empenho à Gecont (redigir à mão) |
| `dispensa_autorizacao` | aviso de dispensa e homologação, sem autorização nem contrato | autorização de contratação direta (modelo) |
| `dispensa_em_andamento` | aviso de dispensa publicado, sem homologação | aguardar sessão e homologação |
| `contrato_direta` | autorização sem contrato | contrato PROJUR de compras ou de serviços (perguntar qual) |
| `ata_registro_precos` | edital de registro de preços homologado, sem ata/contrato | ata de registro de preços (modelo AGU) |
| `contrato_licitacao` | licitação homologada, sem contrato | contrato AGU: compras, serviços sem/com mão de obra exclusiva, obras (perguntar) |
| `contratacao_projur` | reserva + minuta de contrato ou edital, sem envio à Projur | enviar à Projur — sem modelo; redigir à mão |
| `licitacao_em_andamento` | edital com parecer posterior ao envio à Projur, sem homologação | aguardar publicação, sessão e homologação |
| `direta_pos_parecer` | direta com reserva e parecer, sem autorização nem aviso | autorização de contratação direta ou aviso de dispensa eletrônica (perguntar) |
| `autorizacao` | reserva, sem minuta, edital, Projur, autorização ou aviso | pela Portaria PRES CFC 233/2025 e limites do art. 75: autorização, aviso de dispensa ou envio à Projur (perguntar) |
| `preparatoria_reexame` | DVI na fase preparatória e documentos novos depois dele | reexame → devolução ou despacho à Gecont para reserva |
| `preparatoria_aguarda_unidade` | DVI na fase preparatória, nada novo depois | aguardar a unidade |
| `preparatoria_analise` | DFD, ETP ou TR, sem DVI nem contrato | analisar a fase preparatória e emitir o DVI |

Processo que não casa com nenhuma etapa está "fora do rito da Gelic": diga isso, sem inventar etapa.

Quando a etapa tem opções e a ferramenta não decidiu (`proximo.opcoes`), **pergunte ao usuário** qual
opção, mostrando o motivo. Não escolha por conta própria.

**Documentos "por modelo"** (termos aditivos, apostilamento, contratos, ata, aviso, autorização,
despacho à Projur, termo de extinção, PAR): o texto fixo é da Projur (Portaria PRES CFC 233/2025) ou
da AGU adaptado ao CFC e não pode ser alterado sem parecer. Enquanto o agente não tiver a ferramenta
de modelos, **não redija esses documentos de memória**: informe qual modelo a etapa pede e que ele
deve ser gerado pelo modelo oficial.

## Famílias e séries do check-list

| Família | Quando | Séries (skills de checklist) |
|---|---|---|
| preparatória | etapas `preparatoria_*` (pregão, dispensa, inexigibilidade, concorrência, adesão, credenciamento) | A F T R P K M, e J na contratação direta (`gelic-checklist-preparatoria`) |
| prorrogação | etapas `alteracao_*` com formulário de prorrogação ou aditivo | G B, e C quando há reajuste nos autos (`gelic-checklist-contratual`) |
| reajuste | `alteracao_*` com pedido de reajuste, repactuação ou apostila | G C (`gelic-checklist-contratual`) |

Acréscimo/supressão usa também a série D; reequilíbrio, a série E (mesma skill contratual).

## Regra do formato (DVI × devolução × despacho à Gecont)

O formato não é escolha sua; sai desta regra:

| Situação | Formato |
|---|---|
| não há DVI anterior desta etapa | **DVI** (Despacho de Verificação Inicial) |
| há DVI anterior e ao menos um achado impeditivo [I] | **despacho de devolução** — só as pendências [I] |
| há DVI anterior e nenhum achado impeditivo | **despacho à Gecont** — pedido de disponibilidade orçamentária |

- "DVI anterior desta etapa": na preparatória, qualquer DVI nos autos; nas alterações contratuais,
  só DVI posterior ao último Contrato/Termo Aditivo (o DVI da fase preparatória não conta).
- Impeditivo é o achado cujo id do checklist é [I]. O grau vem do id, não da sua opinião.
- Pedido do usuário incompatível com a regra: devolução sem DVI anterior e despacho à Gecont com
  achado [I] são **recusados** (o texto afirmaria algo falso); explique e não gere. Novo DVI quando
  já há DVI, ou devolução sem nada [I], só com confirmação expressa do usuário.

## Regras que continuam suas

- **Limite da etapa.** Não trate como falha a ausência de reserva orçamentária, minuta, parecer
  jurídico, aviso, edital, autorização, contrato, empenho ou publicação: pertencem a etapas
  posteriores ao envio à Gecont. Nas alterações contratuais, idem para nota de reserva/empenho do novo
  período, minuta do termo ou apostila, parecer, autorização, assinatura e publicação do instrumento.
- **Sem mérito técnico.** Aponte forma, coerência entre documentos, cálculo e fundamento. Conferir se
  os autos demonstram a hipótese legal invocada (inviabilidade de competição, exclusividade, notória
  especialização, inciso do art. 75) é fundamento: confira.
- **Nunca invente** nº SEI, valor, data, artigo, cláusula ou fato. O que você não conseguiu ler é
  limitação, informada ao usuário — nunca finja ter lido.
- **Um fato, um id, um lugar**: no documento em que o fato está escrito, ou em "compatibilidade"
  quando o fato é a diferença entre documentos.
- **Concisão** é norte, não teto: consolide achados da mesma causa; não omita achado material.
- **Reexame**: inclua só o que não foi sanado; ponto novo só se material, iniciado por "Ponto
  adicional identificado no reexame".
- **Fundamento**: prefira a cláusula do contrato, TR ou edital (está nos autos). Artigo de lei só com
  número e parágrafo exatos. Decreto ou IN dirigida ao SISG é "parâmetro adotado pelo CFC", salvo
  prova de incorporação. Contrato da Lei nº 8.666/1993 continua nesse regime (art. 190 da Lei nº
  14.133/2021). Norma interna do CFC só se estiver nos autos.
- **Despachos da Gelic** são endereçados à unidade ("À unidade demandante.", "À Gerência de …"),
  sem vocativo a pessoa e sem "Atenciosamente". Assinatura é do SEI.
