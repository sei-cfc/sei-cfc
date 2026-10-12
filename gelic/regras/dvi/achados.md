# achados.json — o único texto que o modelo escreve

O renderizador transforma este arquivo no DVI, na devolução, no despacho à Gecont ou no comparativo.
Você não escolhe o formato nem escreve HTML: preenche fatos. Cada campo de texto vai para o documento
como está, então escreva já em linguagem institucional, impessoal e curta.

## Esquema

```json
{
  "processo": "12345670000034.000002/2025-69",
  "objeto": "prorrogação do Contrato n.º 45/2025, ... (copie o objeto dos autos; termine com ponto)",
  "remetente": {"unidade": "SEXEMP", "documento": "Despacho", "sei": "1234567", "destino": "Ao Setor Exemplo."},
  "valor": "R$ 3.098,75",
  "natureza_valor": "prorrogação contratual",
  "tem_etp": false,
  "verificacao_legal": false,
  "fontes_nao_verificadas": ["Lei nº 14.133/2021, art. 25, § 8º"],
  "blocos": [
    {
      "documento": "Formulário de prorrogação contratual n.º 4/2026",
      "sei": "1234511",
      "achados": [
        {
          "item": "3, p. 191",
          "constatacao": "O reajuste foi apurado com data inicial em 06/2025 (SEI 1234512).",
          "recomendacao": "Refazer o cálculo com índice inicial de março/2025, data-base fixada na cláusula 6.15.2 do TR (SEI 1234513).",
          "checklist": "C01"
        }
      ]
    }
  ],
  "compatibilidade": [
    {"item": "Valor da prorrogação", "constatacao": "...", "recomendacao": "...", "checklist": "G03"}
  ],
  "checklist_status": {
    "G01": {"status": "atende", "sei": "1234513", "p": 14, "nota": "cláusula 1.1 — Lei nº 14.133/2021"},
    "G03": {"status": "nao_atende", "sei": "1234511", "p": 191},
    "B08": {"status": "nao_se_aplica", "nota": "não há custos não renováveis na planilha"},
    "B02": {"status": "nao_verificado"}
  },
  "ausencias": ["Verificou-se, ainda, a ausência de ... nos autos, documento necessário para ..., conforme ..."],
  "limitacoes": ["A certidão X (SEI ...) não pôde ser examinada por não apresentar conteúdo legível."],
  "de_acordo": false
}
```

| Campo | Obrigatório | Regra |
|---|---|---|
| `processo` | sim | igual ao dos autos (cabeçalho de `_leitura.md`) |
| `objeto` | sim | copiado dos autos, sem parafrasear; em alteração contratual: "prorrogação do Contrato n.º X, celebrado com Y, cujo objeto é ..." |
| `remetente` | não | só se houver documento de encaminhamento à Gelic; `destino` opcional (a unidade, nunca a pessoa: "À Gerência de ...", sem vocativo). Sem ele o DVI usa "À unidade demandante." |
| `valor` | só p/ Gecont | valor a reservar, como aparece nos autos; o script escreve por extenso |
| `tem_etp` | não | `true` só se há ETP nos autos e ele foi examinado (adiciona a observação padrão) |
| `verificacao_legal` | sim | `true` só se você conferiu os dispositivos citados na fonte oficial nesta sessão; `false` imprime faixa de aviso |
| `fontes_nao_verificadas` | não | lista dos dispositivos citados sem conferência |
| `blocos[].sei` | sim | número SEI existente no índice (o script recusa SEI inexistente). A ordem dos blocos é do script (SEI crescente); não é preciso ordenar |
| `achados[].item` | sim | item/cláusula/campo do documento; acrescente `p. N` (página do processo) |
| `achados[].constatacao` | sim | o fato, verificável no documento: número, data, valor, trecho curto entre aspas. Sem juízo, sem ordem. Cite "SEI n" ou "SEI n, item x" — página só em `item`/`p` |
| `achados[].recomendacao` | sim | o que a unidade deve refazer ou reavaliar + fundamento (cláusula, item de TR, artigo). Não redija o texto substitutivo. Mesma citação: "SEI n[, item x]", sem página |
| `achados[].checklist` | recomendado | id do checklist ([G05], [C01]...). Decide se impede. Sem id, use `impede: true/false` |
| `compatibilidade[]` | não | divergências entre dois ou mais documentos; cite os SEIs e valores de cada lado |
| `checklist_status` | sim | mapa id → `{status, sei, p, nota}`; um item por id das séries indicadas no cabeçalho de `_leitura.md` (ver seção abaixo). Não vale para o comparativo |
| `ausencias[]` | não | documentos que deveriam existir nesta etapa e não existem — frase completa, com fundamento |
| `limitacoes[]` | não | o que você não conseguiu examinar (página sem texto, arquivo corrompido) — nunca finja ter lido |
| `de_acordo` | não | `true` só quando o encaminhamento depender da Gerência Executiva (acrescenta bloco "De acordo") |
| `descartados[]` | não | `{"tema", "motivo"}` para cada ponto que você avaliou e **não** apontou (ex.: hipótese legal que não se aplica). Aparece no resumo do passo 4, para o usuário poder discordar; não vai para o documento |

**Versão de revisão** (padrão do render) × **final** (`--final`): as marcas saem por regra, não por escolha
sua — a única marca é o grifo em todo texto que você escreveu.

## Regras de redação (valem para todo campo de texto)

1. Só o que está nos autos. Cada número, data, valor e SEI da constatação tem de existir no documento
   citado; o validador confere e recusa SEI inexistente.
2. Documento com achado → um bloco: o documento em que o fato está escrito (o que contém, declara ou cita);
   diferença entre documentos → `compatibilidade`. Documento sem achado → não aparece. Não force ausência em tabela.
3. Consolide achados da mesma causa numa linha; não omita achado material para encurtar.
4. Grau: cite o id do checklist e deixe o grau com ele. Se não há id que sirva, `impede: true` só para
   descumprimento objetivo, ausência essencial ou incompatibilidade relevante.
5. Fundamento: prefira cláusula do contrato/TR/edital (está nos autos). Artigo de lei só com número e
   parágrafo exatos; se não conferiu na fonte oficial, `verificacao_legal: false` e liste em
   `fontes_nao_verificadas`. Norma interna do CFC só se estiver nos autos ou em `legislacao.md`.
6. Não trate como ausência: reserva, minuta, parecer jurídico, aviso, edital, autorização, contrato,
   empenho, publicação — pertencem a etapas posteriores.
7. Em reexame (há DVI anterior desta etapa): inclua apenas o que não foi sanado; achado novo só se
   material, com `item` iniciado por "Ponto adicional identificado no reexame".
8. Nada de elogio, doutrina, emoji, linguagem de parecer, ou reprodução longa do documento.

## checklist_status — um status por item da família

O check-list HTML (`Checklist-<pasta>.html`) sai deste mapa. O DVI não muda por causa dele.

1. Vocabulário, exato e sem acento: `atende`, `nao_atende`, `nao_se_aplica`, `nao_verificado`.
2. Quais séries: prorrogação → G + B (+ C quando há reajuste nos autos); reajuste → G + C;
   preparatória → A F T R P K M (+ J na inexigibilidade/dispensa ou com justificativa de contratação direta
   nos autos). O cabeçalho de `_leitura.md` ("Séries do check-list: ...") diz quais
   valem para o processo; séries fora da família não entram no mapa (o validador recusa D01 numa
   prorrogação, por exemplo).
3. Todo item das séries indicadas precisa de status explícito. `nao_verificado` é escolha consciente
   ("não examinei"); item faltando é erro do validador — nada é preenchido por omissão.
4. `atende` e `nao_atende` exigem `sei` (string, número existente nos autos) e `p` (inteiro, página do
   processo); `nota` opcional, de uma linha (cláusula, campo, trecho). SEI inexistente é erro; página fora
   do intervalo do documento é aviso.
5. `nao_se_aplica` exige `nota` com a justificativa de uma linha.
6. `nao_verificado` não leva campo nenhum.
7. `nao_atende` ⇄ achado: todo `nao_atende` exige um achado em `blocos[]` ou `compatibilidade[]` com o
   mesmo `checklist` id, e todo achado com id exige o item marcado `nao_atende`. Os dois sentidos são erro.
   Não repita a recomendação na `nota`: o check-list HTML puxa a recomendação do achado (a constatação fica no DVI)
   e mostra só o número SEI como evidência — a página continua obrigatória aqui, para o validador.
8. Numa prorrogação, citar qualquer id C em um achado inclui a série C inteira em `checklist_status`
   (C01–C08, todos com status), mesmo que o cabeçalho de `_leitura.md` tenha listado só G, B — o
   cabeçalho é calculado antes dos achados.
9. Custo: cerca de uma linha por item. Não redija parágrafos; a evidência é SEI + página.
10. Checagens × status: `atende` em A02/T07/R07/P06/K03 apontando documento sem assinatura eletrônica
    (`_checagens.md`) é erro; `atende` em A01/A08/A09/P01 contra fato listado em `_checagens.md` é aviso —
    releia antes de manter.
11. `atende` × `nao_se_aplica`: examinou e não achou problema → `atende`, com o SEI examinado (ex.: A05 sem
    indício de fracionamento). `nao_se_aplica` só quando o item não cabe no processo (M01 numa inexigibilidade;
    J03 para parecer jurídico).
12. Um fato, um id (tabela do checklist): o fato apontado num id não rebaixa o item vizinho. O vizinho recebe o
    status do que ele mesmo exige no documento; se a peça traz o elemento exigido, é `atende`, ainda que a fonte
    dele esteja apontada em outro id (ex.: J02 com a estimativa calculada, fontes ausentes já em P01).
    `nao_verificado` só quando você não examinou o documento que o item exige. Conferência externa que não foi
    possível (norma, sistema, site) vai em `limitacoes`, não muda o status.

## Exemplos de linha

| item | constatacao | recomendacao |
|---|---|---|
| Certidão TCU (SEI 1234514), p. 232 | A certidão negativa de licitantes inidôneos foi emitida em 30/07/2026 e consigna validade até 29/08/2026, encontrando-se vencida. | Juntar certidão vigente antes da celebração do termo aditivo, conforme cláusula 2.1.5 do Contrato n.º 45/2025 (manutenção das condições de habilitação). |
| Quadro comparativo, p. 224 | O quadro registra R$ 3.358,00 sob a rubrica "VALOR MEDIANA"; o valor corresponde à média aritmética das três notas fiscais (R$ 3.099,50; R$ 3.099,50; R$ 3.875,00). A mediana é R$ 3.099,50. | Corrigir a rubrica ou o cálculo e declarar o método adotado, conforme art. 3º, V, da IN Seges/ME n.º 65/2021, invocada no próprio documento. |
