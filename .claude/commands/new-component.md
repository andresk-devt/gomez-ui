---
description: Scaffold, test, document y PR de un componente nuevo siguiendo el harness
argument-hint: <NombreComponente> (PascalCase, p.ej. Tag)
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Vas a añadir el componente **$ARGUMENTS** a la librería `gomez-ui`, respetando `CLAUDE.md`.

Nombre en PascalCase: `$ARGUMENTS`. Deriva el kebab-case (p.ej. `Tag` → `tag`, `SidebarItem` → `sidebar-item`) y úsalo para la rama, las clases CSS (`gmz-<kebab>`) y el commit.

Ejecuta en orden y **para si algún paso falla**:

1. **Rama.** Desde `main` actualizado: `git switch main && git pull --ff-only` (si hay remoto) y luego `git switch -c feat/component-<kebab>`. Nunca trabajes en `main`.

2. **Scaffold.** Crea `src/lib/components/$ARGUMENTS/`:
   - `$ARGUMENTS.vue` a partir de `.claude/templates/Component.vue.tmpl` (sustituye `__NAME__`, `__KEBAB__`).
   - `index.ts` a partir de `.claude/templates/index.ts.tmpl`.
   - `$ARGUMENTS.spec.ts` a partir de `.claude/templates/Component.spec.ts.tmpl`.
     Ajusta props/slots/eventos a lo que el componente necesite de verdad; no dejes el placeholder tal cual.

3. **Tipos.** Añade en `src/lib/types.ts` las interfaces/uniones del componente (`${ARGUMENTS}Props`, etc.), siguiendo el estilo de `ButtonProps`.

4. **Registro.** En `src/lib/index.ts`:
   - re-exporta el componente y sus tipos,
   - regístralo en `install()` como `${prefix}$ARGUMENTS`.

5. **Playground.** Añade una `<section>` en `src/App.vue` que muestre las variantes/estados del componente.

6. **Docs.** Añade a `README.md` una subsección `## $ARGUMENTS` con tablas de props, eventos y slots (mismo formato que `Button`).

7. **Changeset.** `npm run changeset` → tipo `minor`, resumen `add $ARGUMENTS component`. Si el prompt no es interactivo, crea el `.md` a mano en `.changeset/`.

8. **Verifica.** `npm run check` (typecheck + lint + test + build) en verde. Comprueba que se emiten los `.d.ts` del componente en `dist/`.

9. **Commit.** `git add -A && git commit -m "feat(<kebab>): add $ARGUMENTS component"` (Conventional Commits). El hook del harness correrá los tests.

10. **PR.** `git push -u origin feat/component-<kebab>` y `gh pr create --fill --base main`. Pega en el cuerpo el checklist de _Definition of Done_ de `CLAUDE.md` marcado.

Al terminar, resume: archivos creados, resultado de `npm run check`, y enlace del PR.
