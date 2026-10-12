# SEI CFC

!!! tip "Primeira vez?"
    Comece pelo [passo a passo de uma dispensa eletrônica](tutorial.md): do item no PCA ao contrato assinado.

Para as unidades demandantes: quem pede a contratação e monta a instrução do processo.

## Primeiros passos

1. [Instale a extensão](instalar.md).
2. Abra um processo no SEI do CFC. O selo aparece no alto da árvore, com a etapa da contratação e o roteiro das peças.
3. Para ligar ao PCA: no PCA, gere o seu token em **Meu perfil**. No SEI, abra o detalhe do selo, clique em
   **Ligar ao PCA…**, cole o token e use **Testar e guardar**.

## O selo e o roteiro da instrução

O selo mostra as peças da instrução, na ordem, e o que já está pronto. Peça interna só conta assinada; documento
externo, quando tem arquivo. A próxima peça aparece com **Preencher**, que abre o formulário dela.

- **Gerar documento** lista as peças com formulário.
- **Verificar antes de enviar** confere a instrução pelos critérios da Gelic (veja abaixo).
- **Próximo passo** mostra o que fazer agora, sem IA.

## Iniciar processo

No Controle de Processos, **Iniciar processo** cria o processo e a árvore inicial da instrução. O diálogo pergunta:

- o objeto, a via e o item do PCA (com **Buscar no PCA**, se a extensão estiver ligada ao PCA);
- o valor e a data;
- quantos termos de cientificação e quantas cotações;
- o tipo de processo.

Depois mostra a prévia da árvore. **Criar no SEI** cria o processo e as peças em branco.

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

Antes de mandar o processo à Gelic, confira a instrução pelos **mesmos critérios do DVI da Gelic**. Assim o processo
chega pronto e não volta.

1. No selo, clique em **Verificar antes de enviar**. Quando a próxima peça do roteiro é o Checklist de Conformidade, o
   botão **Verificar** também aparece na linha do roteiro. A verificação abre numa aba própria.
2. Clique em **Verificar**. A extensão lê os autos, faz as checagens que não dependem de IA e manda à IA só o que pede
   análise. Cada item pendente aparece com o documento (nº SEI), o que foi encontrado e **o que corrigir**.
3. Para cada pendência, faça uma de duas coisas:
   - **corrija** nos autos e clique em **Verificar de novo**. A nova rodada só reexamina os itens pendentes e os que
     dependem de documento que mudou; o que já atendia não muda;
   - ou **justifique** o item, por exemplo "ETP dispensado, art. …", e clique em **Justificar**. A justificativa vai no
     checklist, e a Gelic a avalia.
4. Com todos os itens atendidos ou justificados, confira a **Prévia do checklist** e use **Gravar Checklist de
   Conformidade**. O tipo de documento "Checklist de Conformidade" vem escolhido quando existe no SEI. Se não existir,
   escolha outro tipo, e o nome na árvore sai "Checklist de Conformidade". O documento não é assinado: quem assina é
   você, no SEI.

Se entrar documento no processo depois da verificação, a gravação pede uma nova rodada antes.

A IA é a do **painel do agente**, com a chave de IA de cada pessoa. O gasto de cada rodada aparece na janela. Sem chave
configurada, a verificação é **parcial**: mostra só as checagens que não dependem de IA, e o checklist não é gravado. O
botão **Configurar a IA** abre o painel do agente.

!!! example "Espaço para print"
    Verificação prévia com um item pendente.

## Dados da contratação

O que você digita numa peça vale para as outras e para os colegas da unidade. Com o PCA ligado, **Salvar dados da
contratação** guarda tudo no PCA. Sem o PCA, os dados ficam neste navegador e sobem depois, com a sua confirmação.

## Funções do SEI Pro

As funções do SEI Pro continuam disponíveis. Em instalação nova, e para quem nunca salvou as Configurações do SEI Pro,
**Demandas** e **Gerenciar Projetos** vêm desligadas. Para ligar: Configurações do SEI Pro, aba **Geral**, seção
**Controle de Processos**.
