# Como contribuir

Obrigado pelo interesse. O SEI CFC e o SEI CFC Gelic são extensões do Conselho Federal de Contabilidade para o SEI,
feitas sobre o [SEI Pro](https://github.com/SEI-Pro/sei-pro) e publicadas sob a AGPL-3.0, a mesma licença dele.

## Como o projeto funciona

- **Este repositório é a cópia pública de cada versão.** O desenvolvimento acontece num repositório interno do CFC, e
  cada versão publicada substitui o conteúdo daqui.
- **Por isso, o pull request não é juntado aqui.** A mudança é aplicada no repositório interno, com você como coautor
  (`Co-authored-by`), e chega aqui na versão seguinte. O PR é fechado com o número dessa versão.
- **Correção que vale para o SEI Pro em geral vai para o [SEI Pro](https://github.com/SEI-Pro/sei-pro).** Aqui só
  entra o que é das extensões do CFC.

## Antes de começar

- Para mudança grande ou ideia nova, **abra uma issue antes**, com o problema que você quer resolver. Correção pequena,
  como erro de texto ou bug óbvio com teste, pode ir direto num PR.
- Escreva em português: issues, PRs, comentários no código e textos da tela.

## Regras do código

1. **O código das extensões fica em `gelic/`**, `skills-gelic/` e `scripts/gelic-*`. Fora dali, só os pontos de
   ligação listados em `docs/gelic/GANCHOS.md`. Não edite o código do SEI Pro (os outros módulos, o `dist/`, o legado):
   ele é atualizado sozinho a cada versão do original.
2. **Nada é gravado no SEI sem prévia e confirmação** da pessoa. A extensão nunca assina documento.
3. **Processo sigiloso nunca é lido.**
4. **Local primeiro.** O que dá para fazer com código determinístico é feito em código; a IA só raciocina, e é sempre
   opcional. Tudo tem de funcionar sem chave de IA.
5. **A chave de IA nunca chega à página do SEI** (content script). Ela fica nas páginas da própria extensão.
6. **Texto de fora (SEI, PCA, IA) entra na tela como texto, nunca como HTML.**
7. **Nenhum dado real:** número de processo, nome de pessoa ou empresa, CPF, CNPJ, e-mail. Use os dados fictícios dos
   testes. A publicação tem uma trava que recusa dado real.
8. **Prefixos:** storage `gelic_*`, CSS `.gelic-*`, atributos `data-gelic*`.

## Testes

- **Toda mudança de comportamento vem com teste**, e o teste falha sem a mudança.
- Antes do PR, com Node 22:

  ```bash
  cd gelic && npm install
  npm run tipos && npm run verificar
  npm run build && npm run e2e:todos   # quando a mudança aparece na tela (precisa do Chromium)
  ```

- PR com teste vermelho não é aplicado.

## Documentação

A documentação faz parte da mudança. Se muda o que a pessoa vê ou faz, atualize `gelic/site/docs/`: a página da
extensão (`sei-cfc.md` ou `sei-cfc-gelic.md`) e, se for o caso, o tutorial. O site é https://sei-cfc.github.io.

## Pull request

- Um assunto por PR, de preferência pequeno.
- Diga qual é o problema, o que mudou e como você testou. Para mudança de tela, mande um print.
- Assine os commits com `git commit -s`. O `Signed-off-by` declara que você tem o direito de enviar esse código sob a
  AGPL-3.0, nos termos do [Developer Certificate of Origin 1.1](https://developercertificate.org/).

## Segurança

Falha de segurança ou vazamento de dado **não vai em issue pública**. Use "Report a vulnerability", na aba Security
deste repositório.

## Outros órgãos

As extensões só entram em `sei.cfc.org.br` (`gelic/src/empacotamento/manifesto.ts`). Adaptações para outro órgão são
bem-vindas, desde que o padrão do CFC continue igual. Abra uma issue para combinar o jeito.

## Convivência

Trate todo mundo com respeito. Crítica é ao código, nunca à pessoa.
