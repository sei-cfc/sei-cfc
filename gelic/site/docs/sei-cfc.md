# SEI CFC

!!! tip "Primeira vez?"
    Comece pelo [passo a passo de uma dispensa eletrônica](tutorial.md): do item no PCA ao contrato assinado.

Para as unidades demandantes: quem pede a contratação e monta a instrução do processo.

## Primeiros passos

1. [Instale a extensão](instalar.md).
2. Abra um processo no SEI do CFC. O selo aparece no alto da árvore, com a etapa da contratação e o roteiro das peças.
3. Para ligar ao PCA: no PCA, gere o seu token em **Meu perfil**. No SEI, abra um processo e clique no selo (a caixa
   com o símbolo do CFC e a setinha ▾, acima da árvore). No fim da parte que abre, clique em **Ligar ao PCA…**, cole o
   token em **Token pessoal** e use **Testar e guardar**. Outro caminho: no PCA, o **Iniciar processo** da ficha do item
   abre essa mesma tela enquanto a extensão não tem o token.

Ligado ao PCA, o selo mostra se o número do processo está vinculado a um item do PCA: **✓** verde com o item e a
situação dele, ou **✗** âmbar quando não há item vinculado.

## O selo e o roteiro da instrução

O selo mostra as peças da instrução, na ordem, e o que já está pronto. Peça interna só conta assinada; documento
externo, quando tem arquivo. A próxima peça aparece com **Preencher**, que abre o formulário dela.

- **Gerar documento** lista as peças com formulário.
- **Verificar antes de enviar** confere a instrução pelos critérios da Gelic, com ou sem IA (veja abaixo).
- **Próximo passo** mostra o que fazer agora, sem IA.

## Iniciar processo

No Controle de Processos, **Iniciar processo** cria o processo e a árvore inicial da instrução. O diálogo pergunta:

- o objeto, a via e o item do PCA (com **Buscar no PCA**, se a extensão estiver ligada ao PCA);
- o valor e a data;
- quantos termos de cientificação e quantas cotações;
- o tipo de processo e a **classificação por assunto**.

O SEI exige a classificação por assunto. Quando o tipo de processo não traz uma, comece a digitar o código ou uma
palavra (por exemplo, `CFP.422` ou `eventos`): as opções aparecem logo abaixo do campo, como no próprio SEI. Clique na
certa, ou use as setas e Enter. A extensão lembra o assunto de cada tipo de
processo e o traz preenchido da próxima vez.

Depois mostra a prévia da árvore, com o assunto. **Criar no SEI** cria o processo e as peças em branco. Se o SEI recusar
a criação, o diálogo mostra a mensagem do próprio SEI.

O botão fica no alto do Controle de Processos, tanto na lista do SEI quanto no **Novo Controle de Processos** (a grade
do SEI Pro, que abre pelo botão ao lado do título).

Pelo PCA: na ficha do item, o botão **Iniciar processo**, ao lado de **Editar**, abre o SEI numa aba nova, com o item já
escolhido.

## As peças

Os formulários abrem numa aba própria. Cada um aproveita o que já está nos autos e no PCA, mostra a prévia e grava no
processo com **Confirmar e gravar**. O documento não é assinado: quem assina é você, no SEI.

| Peça | Onde se faz |
|---|---|
| DFD, termos de cientificação, mapa comparativo de preços, despacho de envio à Gelic | formulário da extensão |
| ETP, TR e mapa de riscos | no Compras.gov.br; junte ao processo o PDF exportado de lá |

## Verificar antes de enviar

Antes de mandar o processo à Gelic, confira a instrução pelos **critérios do DVI da Gelic**. Assim o processo chega
pronto e não volta. A verificação é **opcional**, e a IA também: há dois modos, à sua escolha.

| Modo | O que faz | Custo |
|---|---|---|
| **Verificar sem IA** | Confere só a **presença** dos requisitos: peças da etapa, assinaturas, ordem das datas, número do processo, documentos citados, valores e validades. Não faz juízo sobre o conteúdo. | Nenhum |
| **Verificar com IA** | O modelo de IA **julga o conteúdo** de cada item do checklist da Gelic e diz o que corrigir. | O da sua chave de IA |

1. No selo, clique em **Verificar antes de enviar**. Quando a próxima peça do roteiro é o Checklist de Conformidade, o
   botão **Verificar** também aparece na linha do roteiro. A verificação abre numa aba própria.
2. Clique em **Verificar sem IA** ou em **Verificar com IA**. Cada item pendente aparece com o documento (nº SEI) e, com
   IA, o que foi encontrado e **o que corrigir**.
3. Para cada pendência, faça uma de duas coisas:
   - **corrija** nos autos e verifique de novo. Com IA, a nova rodada só reexamina os itens pendentes e os que dependem
     de documento que mudou; o que já atendia não muda;
   - ou **justifique** o item, por exemplo "ETP dispensado, art. …", e clique em **Justificar**. A justificativa vai no
     checklist, e a Gelic a avalia.
4. Com todos os itens atendidos ou justificados, confira a **Prévia do checklist** e use **Gravar Checklist de
   Conformidade**. O documento diz se a verificação usou IA ou não. Ele não é assinado: quem assina é você, no SEI.

**Tipo no SEI:** até o tipo "Checklist de Conformidade" ser criado pelo administrador do SEI, o checklist vai como
**Despacho**, e a árvore mostra "Despacho de Conformidade". Quando o tipo existir, ele já vem escolhido.

Se entrar documento no processo depois da verificação, a gravação pede uma nova rodada antes.

A IA usa a chave de cada pessoa (veja **Configurar a IA**, abaixo), e o gasto aparece na janela. Sem chave, só o botão
**Verificar sem IA** fica disponível.

!!! example "Espaço para print"
    Verificação prévia com um item pendente.

## Configurar a IA (opcional)

A IA é opcional no SEI CFC: a verificação sem IA e os formulários funcionam sem ela. Com ela, a verificação julga o
conteúdo e os formulários preenchem o que falta.

O selo mostra a linha **IA (opcional)**, com o serviço, a data do teste e o limite de gasto. **Configurar** (ou
**Trocar**) abre a página **Configurar a IA**, que também abre pelo botão das janelas das peças e da verificação. Nela,
o **OpenRouter** e a **Anthropic** aparecem lado a lado, cada um com o passo a passo. Escolha um dos dois.

| Passo | OpenRouter | Anthropic |
|---|---|---|
| Criar a conta | você marca | você marca |
| Pôr crédito | você marca | você marca |
| Limite de gasto | a extensão confere na chave | você marca (limite da organização, no console) |
| Colar a chave e **Testar** | a extensão confere | a extensão confere (o navegador pede permissão na primeira vez) |
| Escolher o modelo | você escolhe (a lista vem do serviço, depois do teste) | você escolhe |

Depois do teste, **Usar este serviço** grava a escolha. A chave fica só neste navegador e vai só ao serviço escolhido;
a página do SEI nunca a lê. Se o painel do agente estiver aberto, feche e abra de novo.

**Recomendação:** no OpenRouter, crie a chave com **limite de gasto** (Credit limit). Assim, o gasto nunca passa do
que você definiu.

## Dados da contratação

O que você digita numa peça vale para as outras e para os colegas da unidade. Com o PCA ligado, **Salvar dados da
contratação** guarda tudo no PCA. Sem o PCA, os dados ficam neste navegador e sobem depois, com a sua confirmação.

## Funções do SEI Pro

As funções do SEI Pro continuam disponíveis. Em instalação nova, e para quem nunca salvou as Configurações do SEI Pro,
**Demandas** e **Gerenciar Projetos** vêm desligadas. Para ligar: Configurações do SEI Pro, aba **Geral**, seção
**Controle de Processos**.
