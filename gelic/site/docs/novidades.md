# Novidades

## 3.3.0.30 — 16/10/2026 {#v3-3-0-30}

Base atualizada para o **SEI Pro 3.3** (atualização automática). Nas extensões do CFC, nada muda além da base.

O que chega do SEI Pro:

**SEI Pro 3.3**

**Novo — Estilo Avançado refeito do zero** (*SEI Pro Lab*, Chrome e Edge). O visual novo do SEI, no mesmo estilo dos painéis do SEI Pro, com **cor da barra superior à sua escolha** e um **modo escuro feito do jeito certo**. **Vem desligado**: ligue pela chave do canto superior direito do SEI, ou pelo ícone de paleta ao lado dela, que abre a janela **Aparência do SEI**. Onde o novo existe, o estilo anterior fica desativado.

- **Cor da barra superior:** 18 cores prontas (inclusive **Rosa**, Magenta, Índigo, Turquesa, Terracota, Oliva, Cobre e Azul-petróleo) e **cor livre**. A cor ajusta o texto para continuar legível. A janela tem prévia ao vivo e as mesmas opções ficam nas Configurações, na seção **Aparência**, sincronizadas.
- **Claro, Escuro e Automático.** O modo escuro cobre o sistema inteiro (menu, tabelas, formulários, janelas, árvore do processo, painéis do SEI Pro) e, opcionalmente, o **texto dos documentos**, com um botão **Ver original** para conferir antes de assinar.
- **Ligar o Estilo Avançado liga também o Novo Controle de Processos**, e a grade abre na hora se você estiver no Controle de Processos.
- **Barra superior com duas alturas:** mais alta no topo, **compacta ao rolar**, com transição suave. Compacta, o nome do órgão passa para **junto da logo do SEI**, e a barra de ações fixa gruda logo abaixo.
- **Barra de ações:** os ícones nativos do SEI ficam como sempre; os botões do SEI Pro (monitorar, PDF, ação e documentos em lote, comparar, histórico, certidão) ganharam desenho próprio, colorido como os nativos. O **Agente de IA**, o **Estúdio de Fluxo** e o **Monitorados** mantêm o ícone de sempre.
- **Novo botão de Histórico de Processos Visitados** na barra de ações, ao lado do Estúdio de Fluxo (no Controle e dentro do processo).
- **Documento numa caixa só**, em formato de página, com o botão **Largura total** (alterna entre a página estreita e a largura inteira; o navegador lembra), e os botões **Abrir em nova aba**, **Baixar HTML** e **Baixar DOCX** agora com **rótulo** e no mesmo estilo. Ao rolar o documento, ficam só os ícones, à direita.
- **Árvore do processo:** divisor vertical com alça, selo da unidade em pílula alinhado aos ícones de copiar, respiro acima do número do processo, divisores de seção suaves e menu suspenso dos documentos sem quebra de texto.
- **Mais respiro** no campo *Pesquisar no Menu* e entre rótulos e campos dos formulários internos; tooltips próprios nos botões; transições suaves nos botões e estados de hover.
- **Tudo é só visual:** nada é gravado nos documentos e o editor não é adaptado.

**SEI Pro 3.2.4**

- **Corrigido — Agente de IA:** ao enviar um documento a conector em outro computador, o caminho de outro arquivo baixado que aparecesse no mesmo pedido ia sem máscara. Agora só o próprio documento enviado deixa de ser mascarado; o resto do pedido segue mascarado como em qualquer conector.

**SEI Pro 3.2.3**

- **Novo — Agente de IA entrega documentos a conector em outro computador.** Antes, o agente baixava o documento e passava ao conector só o caminho do arquivo, que um servidor em outra máquina não consegue abrir. Agora, quando o conector aceita receber o arquivo, o SEI Pro confere se é o mesmo documento aprovado no download e envia o conteúdo, com o nome aprovado. **Você aprova cada envio**, mesmo com "Sempre permitir", e o cartão mostra o documento, o tamanho e o servidor. Ideia e primeira versão de Tavares (ANTAQ), para o conector do Sistema de Arrendamento.
- **Nome legível no download.** O agente escolhe o nome do arquivo a partir do documento (por exemplo, *Contrato de Cessão de Uso - Porto de Itaqui*), sempre com a extensão original e o número SEI.
- **Corrigido — Demandas:** editar uma demanda que já tinha processo vinculado reabria o diálogo em vez de salvar.
- **Ajuste — Novo Controle de Processos:** os marcadores e o prazo ficam com a mesma altura e alinhados na linha.

## 3.2.2.29 — 13/10/2026 {#v3-2-2-29}

- **Selo, PCA:** a linha do PCA ganha um check à vista. **✓** verde quando o número do processo está vinculado a um item
  do PCA (com o item e a situação), **✗** âmbar quando não está. Antes era um texto pequeno e cinza.
- O site explica melhor onde fica o **Ligar ao PCA…**: no fim do selo aberto, acima da árvore do processo.

## 3.2.2.28 — 13/10/2026 {#v3-2-2-28}

- **SEI CFC, Iniciar processo:** a classificação por assunto agora funciona como a do próprio SEI. Enquanto você digita,
  as opções aparecem logo abaixo do campo. Clique na certa, ou use as setas e Enter. Não há mais o botão **Buscar**.

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
