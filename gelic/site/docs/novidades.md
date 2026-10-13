# Novidades

## 3.2.2.27 — 13/10/2026 {#v3-2-2-27}

- **SEI CFC, Iniciar processo:** o diálogo pede a **classificação por assunto**, que o SEI exige e que alguns tipos de
  processo do CFC não trazem. Busque pelo código ou por uma palavra e escolha na lista. O assunto fica lembrado para o
  tipo de processo.
- Se o SEI recusar a criação do processo, o diálogo mostra a mensagem do próprio SEI.
- Trocar no diálogo uma escolha que veio preenchida (o tipo de processo lembrado, a via trazida do PCA) passa a valer
  na criação. Antes, a escolha preenchida podia continuar valendo.

## 3.2.2.26 — 13/10/2026 {#v3-2-2-26}

- **SEI CFC, Iniciar processo:** a lista de tipos de processo carrega no SEI do CFC, que escolhe o tipo por um
  formulário, e não por link. Os campos do diálogo ficam alinhados.

## 3.2.2.25 — 13/10/2026 {#v3-2-2-25}

- **SEI CFC:** o **Iniciar processo** aparece também com o Controle de Processos na visão detalhada do SEI.

## 3.2.2.24 — 13/10/2026 {#v3-2-2-24}

- **SEI CFC:** o botão **Iniciar processo** passa a ficar ao lado do título "Controle de Processos". Antes, com a grade
  nova do SEI Pro aberta, ele ficava escondido no SEI do CFC.

## 3.2.2.23 — 12/10/2026 {#v3-2-2-23}

- **SEI CFC: Configurar a IA (opcional).** Uma página própria com o OpenRouter e a Anthropic lado a lado, cada um com
  o passo a passo (conta, crédito, limite de gasto, chave e modelo). O que a extensão consegue conferir, ela confere:
  a chave, o modelo e, no OpenRouter, o limite de gasto da chave.
- O selo do SEI CFC ganha a linha **IA (opcional)**, com o serviço, a data do teste e o limite. O **Configurar** dessa
  linha e o das janelas das peças e da verificação abrem a página.

## 3.2.2.22 — 12/10/2026 {#v3-2-2-22}

**Base nova: SEI Pro 3.2.2** (era a 2.9). O que chega do SEI Pro:

- **Novo Controle de Processos:** uma grade no lugar da lista do SEI, com busca com operadores, filtros rápidos,
  agrupamento, quadro (Kanban), edição na linha e ações em lote de qualquer página. A opção vem ligada, mas a grade
  **só abre quando você clica no botão ao lado do título**. Clicar de novo volta à lista, e o navegador lembra a
  escolha.
- **Agente de IA:** conector MCP no próprio computador, download de documento para o conector (cada download com a
  sua aprovação, só documentos e imagens) e botão de copiar a resposta.

Nas extensões do CFC:

- Com a grade nova aberta, o **Iniciar processo** continua no alto do Controle de Processos.
- No **SEI CFC Gelic**, a etapa de cada processo, o **Calcular etapas**, os filtros por etapa e o **Atualizar PCA**
  aparecem na lista do SEI. Com a grade aberta, a barra da Gelic avisa para voltar à lista.
- A partir desta versão, o número da versão segue o do SEI Pro (3.2.2), mais a revisão das extensões do CFC (22).

## 2.9.0.21 — 12/10/2026 {#v2-9-0-21}

- **Verificar antes de enviar, com ou sem IA.** A IA passa a ser opcional:
  - **Verificar sem IA** confere só a presença dos requisitos (peças, assinaturas, datas, números, valores e
    validades), sem juízo sobre o conteúdo, e não custa nada;
  - **Verificar com IA** julga o conteúdo de cada item.

  Os dois modos gravam o checklist, e o documento diz se a verificação usou IA.
- Enquanto o tipo "Checklist de Conformidade" não existe no SEI do CFC, o checklist vai como **Despacho**, e a árvore
  mostra "Despacho de Conformidade". O roteiro reconhece esse título.

## 2.9.0.20 — 12/10/2026 {#v2-9-0-20}

- **SEI CFC: Verificar antes de enviar.** Antes de mandar o processo à Gelic, a unidade confere a instrução pelos mesmos
  critérios do DVI. A janela mostra cada item pendente com o que corrigir. Corrija nos autos e verifique de novo, ou
  justifique o item. Com tudo atendido ou justificado, grave no processo o **Checklist de Conformidade** (não
  assinado). Sem chave de IA, a verificação é parcial: só as checagens que não dependem de IA.

## 2.9.0.19 — 12/10/2026 {#v2-9-0-19}

- Primeira versão preparada para a Chrome Web Store. O código-fonte passa a ser público:
  https://github.com/sei-cfc/sei-cfc.
- Os exemplos que acompanham os modelos de documento passam a usar dados fictícios.

## 2.9.0.18 — 12/10/2026 {#v2-9-0-18}

Primeira versão com este site.

- **Base nova: SEI Pro 2.9.** Chegam o painel lateral com abas, os Processos Monitorados (os antigos Favoritos), o
  Controle de Prazos gravando no prazo do próprio SEI, a pesquisa rápida que filtra a página e o retorno de bloco de
  assinatura.
- **Demandas e Gerenciar Projetos do SEI Pro vêm desligadas** em instalação nova e para quem nunca salvou as
  Configurações do SEI Pro. Para ligar: Configurações do SEI Pro, aba Geral, seção Controle de Processos.
- **SEI CFC Gelic:** "Calcular etapas" e "Atualizar PCA" agem só sobre os processos à vista (filtro de etapa e
  pesquisa rápida).
- **No selo:** o link **Ajuda** leva a este site, e depois de cada atualização aparece **Novidades da versão**.
- Ao instalar, abre a página da extensão neste site, e não mais a do SEI Pro.
