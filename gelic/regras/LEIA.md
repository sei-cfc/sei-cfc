# Regras do rito da Gelic

`etapas.json` e `fatos-etapa.json` são **cópias** de `~/.claude/skills/gelic/references/`, a fonte
única do rito. Não edite aqui: mude na skill e sincronize. `ORIGEM` guarda o commit da skill
copiado.

```bash
npm run regras      # copia da skill, regenera paridade.json e grava ORIGEM
npm run verificar   # a paridade confere o motor TS contra o etapa.py da skill
```

`paridade.json` é gerado por `tests/paridade/gerar.py`, que roda o `etapa.py` da própria skill
sobre os casos de `evals/test_etapa.py`, alguns extras e 600 sequências sintéticas. São só títulos
inventados, nunca autos reais. O teste exige as 28 etapas cobertas.

## Lacuna conhecida na regra da skill (2026-10-09)

O tipo `formulario_alteracao` só reconhece títulos com "prorroga", "reajuste", "repactua" ou
"altera". "Formulário de acréscimo contratual" fica como `outro`, e as etapas de
acréscimo/supressão só aparecem se o título também disser "alteração". A correção é na skill
(regex de `tipos.formulario_alteracao`), seguida de `npm run regras`.
