# Ficha das extensões na Chrome Web Store (textos para colar)

Versão 3.2.2.24. Zips em `build/sei-pro-cfc-3.2.2.24.zip` (SEI CFC) e `build/sei-pro-gelic-3.2.2.24.zip` (SEI CFC
Gelic). As imagens ficam em `gelic/loja/imagens/`. O passo a passo da publicação está em `PUBLICAR.md`.

O nome e a descrição curta vêm do manifest do zip, e a loja os mostra sozinha.

## Comum às duas

| Campo | Valor |
|---|---|
| Categoria | Produtividade › Fluxo de trabalho e planejamento |
| Idioma | Português (Brasil) |
| Site | https://sei-cfc.github.io/ |
| Suporte | https://sei-cfc.github.io/ |
| Política de privacidade | https://sei-cfc.github.io/privacidade/ |
| Código remoto | Não, não uso código remoto |
| Preço e distribuição | Gratuita; pública; países: Brasil |

### Justificativas das permissões

- **storage:** guarda, no navegador, as configurações da extensão (token do PCA, preferências), os rascunhos das peças e
  as etapas já calculadas.
- **sidePanel:** abre o painel lateral do SEI Pro, onde ficam os Processos Monitorados, o Histórico e o agente de IA.
- **alarms:** agenda as rotinas do SEI Pro (lembretes e conferências periódicas) que rodam com o painel aberto.
- **notifications (opcional):** só quando a pessoa liga os avisos de prazos e lembretes do SEI Pro.
- **Acesso aos sites (sei.cfc.org.br e sip.cfc.org.br; no SEI CFC, também pca.sistemascfc.org):** a extensão só atua no
  SEI do Conselho Federal de Contabilidade e no sistema do PCA do CFC, onde mostra a etapa da contratação, preenche as
  peças e põe o botão "Iniciar processo".
- **Acesso opcional a outros sites (https://\*/\*, localhost):** pedido em tempo de execução, só quando a pessoa
  configura no agente de IA o provedor que ela escolheu (OpenRouter, Anthropic ou OpenAI) ou um servidor MCP. Nenhum
  site é acessado sem essa escolha e o consentimento do navegador.

### Dados (aba "Práticas de privacidade")

Marque:
- **Conteúdo do site:** a extensão lê as páginas do SEI que a pessoa abre.
- **Informações de identificação pessoal:** os documentos do SEI podem ter nomes de pessoas. Eles só saem do navegador
  para o PCA do CFC e para o provedor de IA escolhido pela pessoa; por padrão, os nomes vão trocados por pseudônimos.
- **Informações de autenticação:** o token do PCA e a chave do provedor de IA ficam no navegador e só vão ao próprio
  serviço.

Certifique as três afirmações: os dados não são vendidos, não são usados para fins alheios à função da extensão e não
servem para avaliar crédito.

## SEI CFC

**Finalidade única:** ajudar as unidades do Conselho Federal de Contabilidade a instruir processos de contratação no
SEI do CFC, do item do PCA ao envio à Gerência de Licitações.

**Descrição detalhada:**

```
Extensão do Conselho Federal de Contabilidade (CFC) para as unidades que pedem contratações. Funciona só no SEI do CFC (sei.cfc.org.br) e no sistema do PCA do CFC.

O que ela faz:
• Mostra, no alto da árvore de cada processo, a etapa da contratação e o roteiro das peças da instrução, com o que já está pronto e o que falta.
• Verificar antes de enviar: confere a instrução pelos critérios da Gelic, sem IA (presença dos requisitos) ou com IA (julgamento do conteúdo, à sua escolha), e grava o Checklist de Conformidade no processo, só com a sua aprovação; a extensão nunca assina.
• "Iniciar processo": cria no SEI o processo e a árvore inicial da instrução, a partir do item do PCA.
• Formulários das peças (DFD, termos de cientificação, mapa comparativo de preços, despacho de envio à Gelic), que aproveitam o que já está nos autos e no PCA. A gravação no processo só acontece depois da prévia e da sua confirmação; a extensão nunca assina.
• Os dados da contratação ficam guardados no PCA, para os colegas da unidade não digitarem de novo.

Processo sigiloso nunca é lido.

Documentação e novidades: https://sei-cfc.github.io/
Código-fonte (AGPL-3.0): https://github.com/sei-cfc/sei-cfc

Feita sobre o SEI Pro (https://seipro.app), extensão livre sob a AGPL-3.0. Todas as funções do SEI Pro continuam disponíveis.
```

**Imagens:** `imagens/icone-sei-cfc.png` (ícone da loja, 128×128), `imagens/sei-cfc-1.png` a `-3.png` (capturas
1280×800) e `imagens/bloco-sei-cfc.png` (bloco promocional pequeno, 440×280).

## SEI CFC Gelic

**Finalidade única:** apoiar a Gerência de Licitações e Contratos (Gelic) do Conselho Federal de Contabilidade na análise
dos processos de contratação no SEI do CFC.

**Descrição detalhada:**

```
Extensão do Conselho Federal de Contabilidade (CFC) para a Gerência de Licitações e Contratos (Gelic). Funciona só no SEI do CFC (sei.cfc.org.br).

O que ela faz:
• Mostra, no alto da árvore de cada processo, a etapa da contratação, calculada pelos títulos e pela ordem dos documentos, com o próximo passo e os documentos reconhecidos.
• No Controle de Processos, põe a etapa em cada linha ("Calcular etapas") e mantém o PCA do CFC em dia ("Atualizar PCA").
• "Gerar documento": DVI, despachos e minutas pelos modelos PROJUR, AGU e CFC. A IA só preenche as variáveis; o texto fixo dos modelos nunca passa por ela. A gravação no processo só acontece depois da prévia e da sua aprovação; a extensão nunca assina.
• "Pendências" e "Próximo passo", sem IA.

Processo sigiloso nunca é lido.

Documentação e novidades: https://sei-cfc.github.io/
Código-fonte (AGPL-3.0): https://github.com/sei-cfc/sei-cfc

Feita sobre o SEI Pro (https://seipro.app), extensão livre sob a AGPL-3.0. Todas as funções do SEI Pro continuam disponíveis.
```

**Imagens:** `imagens/icone-sei-cfc-gelic.png`, `imagens/sei-cfc-gelic-1.png` a `-3.png` e
`imagens/bloco-sei-cfc-gelic.png`.
