# Publicar na Chrome Web Store: passo a passo

Os textos estão em `FICHA.md`, e as imagens em `imagens/`. **Antes do passo 4, o código-fonte tem de estar público**
(`https://github.com/sei-cfc/sei-cfc`), porque a AGPL exige e as descrições já trazem o link.

## Uma vez só

1. **Conta Google nova:** crie um Gmail só para as extensões (por exemplo, `extensoes.sei.cfc@gmail.com`) e ligue a
   verificação em duas etapas, que a loja exige.
2. **Cadastro de desenvolvedor:** entre em https://chrome.google.com/webstore/devconsole com essa conta.
   - Aceite o contrato e pague a taxa única de US$ 5.
   - Em **Conta**, informe:
     - o nome do publicador: `Conselho Federal de Contabilidade`, ou `SEI CFC`;
     - o e-mail de contato, que precisa ser confirmado;
     - a situação de comerciante: escolha "não comerciante" (extensão gratuita, de órgão público).
   - A verificação de identidade pode levar alguns dias. A publicação só sai depois dela.

## Para cada extensão (SEI CFC e SEI CFC Gelic)

3. **Novo item:** no painel, clique em **Novo item** e envie o zip:
   - `build/sei-pro-cfc-3.2.2.22.zip` (SEI CFC);
   - `build/sei-pro-gelic-3.2.2.22.zip` (SEI CFC Gelic).
4. **Ficha da loja:**
   - cole a descrição detalhada;
   - escolha a categoria e o idioma;
   - envie o ícone, as 3 capturas e o bloco promocional;
   - informe o site e o suporte (`FICHA.md`).
5. **Práticas de privacidade:**
   - cole a finalidade única e a justificativa de cada permissão;
   - marque os tipos de dados e as três certificações;
   - informe a URL da política (`https://sei-cfc.github.io/privacidade/`);
   - responda "não" para código remoto.
6. **Distribuição:** gratuita, pública, país Brasil.
7. **Enviar para revisão.** O Google costuma levar de alguns dias a duas semanas. Se recusar, o e-mail diz o motivo:
   traga para cá.

## Depois de publicadas

- Anote os links da loja no site (página Instalar) e no `CONTINUAR.md`.
- Cada versão nova é um zip novo. No mesmo item, use **Pacote › Enviar novo pacote**. A versão do manifest tem de
  subir, e a rotina dos zips já cuida disso.
