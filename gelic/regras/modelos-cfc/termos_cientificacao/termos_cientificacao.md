%% Modelo Termos de cientificação do Gera CFC — Quick 261003-k9t.
%% Fonte do texto fixo: Termo de Cientificação, SEI 0000000 (anonimizado em
%% `.planning/gera/notes/2026-10-03-processo-000000-0000/006_0000000.txt`).
%% Decisão (CONTEXT LOCKED): um termo por pessoa de `cadastro["pessoas"]` (equipe de
%% planejamento/gestores/fiscais, D-14, já cadastrados em "Dados da contratação"), gerados em
%% sequência no mesmo documento. "pessoas_termo" (nome/matrícula/papel por extenso/apto) é
%% derivado em `apps.gera.documentos.respostas.contexto_documento` a partir de
%% `cadastro["pessoas"]` + da resposta livre "pessoas_sem_treinamento" (um nome por linha) —
%% nenhum tipo de pergunta "tabela" editável novo (TIPOS_SEM_CAMPO continua sem campo para
%% isso; ver nota em `forms_documento.py`).

@cabecalho

# TERMO DE CIENTIFICAÇÃO

{*pessoas_termo}
## Termo de Cientificação — {.nome}

Em conformidade com o previsto no §1º do art. 8º do Decreto nº 11.246, de 27 de outubro de 2022, eu, {.nome}, {vinculo_padrao}, sob a matrícula nº {.matricula}, registro minha cientificação quanto a indicação para {.papel}, conforme Portaria(s) de Designação acostada ao presente processo.

Nos termos do que estabelece o art. 10 do Decreto nº 11.246/2022, informo que:

( {#.apto}X {/.apto}{^.apto} {/.apto}) Encontro-me apto para a atribuição a mim conferida

( {^.apto}X {/.apto}{#.apto} {/.apto}) Necessito de treinamento para a atribuição a mim conferida, considerando a especificidade dos serviços objeto do presente processo.

Declaro pleno conhecimento das disposições previstas no Decreto nº 11.246, de 27 de outubro de 2022.

{.nome}
Assinado eletronicamente via SEI na data consignada

{/pessoas_termo}
