# CLAUDE.md — harness de gomez-ui

Reglas de trabajo para agentes de IA (y humanos) en este repo. Léelo entero antes de tocar código.

## Qué es esto

`gomez-ui` es una **librería de componentes Vue 3** publicable en npm. Distribuye ESM + CJS con
tipos, CSS **auto-inyectado por JS** (el consumidor no importa ningún `.css`) y `vue` como
`peerDependency`.

## Layout

| Ruta                                          | Qué es                             | ¿Se publica?     |
| --------------------------------------------- | ---------------------------------- | ---------------- |
| `src/lib/`                                    | Fuente de la librería              | Sí (vía `dist/`) |
| `src/lib/index.ts`                            | Entry público + plugin `install()` | Sí               |
| `src/lib/components/*/`                       | Un directorio por componente       | Sí               |
| `src/lib/styles/tokens.css`                   | Tokens de tema `--gmz-*`           | Sí (inline)      |
| `src/App.vue`, `src/main.ts`, `src/style.css` | Playground / showcase              | **No**           |
| `dist/`                                       | Build. **Nunca se edita a mano.**  | Es el paquete    |

## Comandos

| Comando             | Para qué                                           |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Playground con HMR                                 |
| `npm run test`      | Vitest (una pasada)                                |
| `npm run typecheck` | `vue-tsc --noEmit` sobre `src/**`                  |
| `npm run lint`      | ESLint                                             |
| `npm run format`    | Prettier `--write`                                 |
| `npm run build`     | Genera `dist/` (JS + CJS + `.d.ts`)                |
| `npm run check`     | typecheck + lint + test + build (el gate completo) |
| `npm run changeset` | Añade la nota de cambio de tu PR                   |

## Cómo añadir un componente

Usa `/new-component <Nombre>` (hace todo esto). Si lo haces a mano, el orden es:

1. **Rama** `feat/component-<kebab>` desde `main`. Nunca commitees en `main`.
2. **Carpeta** `src/lib/components/<Nombre>/` con:
   - `<Nombre>.vue` — `<script setup lang="ts">`, props tipadas con `defineProps<XProps>()` +
     `withDefaults`, clases `gmz-<kebab>` (sin `scoped`), estilos vía custom properties de
     `tokens.css` (`@import '../../styles/tokens.css'` al inicio del `<style>`).
   - `index.ts` — `export { default as <Nombre> } from './<Nombre>.vue'`.
   - `<Nombre>.spec.ts` — render + props + eventos + accesibilidad. Todo en verde.
3. **Tipos** en `src/lib/types.ts` (`<Nombre>Props`, uniones…), estilo `ButtonProps`.
4. **Registro** en `src/lib/index.ts`: re-export + alta en `install()` como `${prefix}<Nombre>`.
5. **Playground**: `<section>` en `src/App.vue` mostrando variantes y estados.
6. **Docs**: subsección `## <Nombre>` en `README.md` con tablas props/eventos/slots.
7. **Changeset**: `npm run changeset` (normalmente `minor`).
8. **`npm run check`** en verde.
9. **Commit** Conventional Commits, **push**, **PR** contra `main` con el checklist de abajo.

## Definition of Done (un componente no está listo sin esto)

- [ ] `src/lib/components/<Nombre>/{<Nombre>.vue,index.ts,<Nombre>.spec.ts}` creados.
- [ ] Props tipadas (`withDefaults`), clases `gmz-<kebab>`, tema desde `tokens.css`.
- [ ] Tests: render, cada prop relevante, cada evento, y accesibilidad (roles/aria/foco). Verdes.
- [ ] Exportado en `src/lib/index.ts` y registrado en `install()`.
- [ ] Sección en `src/App.vue`.
- [ ] Tablas en `README.md`.
- [ ] Changeset añadido.
- [ ] `npm run check` en verde; `.d.ts` del componente presentes en `dist/`.
- [ ] Rama `feat/component-<kebab>`, commit convencional, PR abierto.

## Git

- **Ramas**: `feat/…`, `fix/…`, `chore/…`, `docs/…`, `refactor/…`. Un componente = una rama = un PR.
- **Nunca** commits directos a `main` (el harness lo bloquea).
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/), p.ej.
  `feat(tag): add Tag component`, `fix(button): no emitir click en loading`.
- **PRs**: se mergean con _squash_. El título del PR también en formato convencional.
- **Prohibido**: `git push --force`, `git reset --hard`, editar `dist/`.
- **Versionado/publicación**: vía Changesets. No subas `version` en `package.json` a mano.

## Guardarraíles automáticos (ya configurados)

- **Al guardar** `*.ts`/`*.vue`/… → Prettier + `eslint --fix` (hook `PostToolUse`).
- **Antes de `git commit`** → se bloquea si estás en `main` o si los tests fallan (hook `PreToolUse`).
  `pre-commit` de git corre además `lint-staged`; `pre-push` corre typecheck + test + build.
- **Al terminar el turno** → resumen de typecheck + tests (hook `Stop`, informativo).
- **CI** (`.github/workflows/ci.yml`) repite lint + typecheck + test + build en cada PR. Es el
  gate que no se puede saltar.

## Convenciones de código

- SFC `<script setup lang="ts">`, sin `;` (Prettier: `semi: false`, comillas simples, ancho 80).
- Prefijo CSS `gmz-`; nada de `<style scoped>` en la librería (romper eso rompe el bundle único de CSS).
- Colores/espaciado siempre desde `--gmz-*`; si falta un token, añádelo a `tokens.css` (claro + `prefers-color-scheme: dark`).
- No añadas dependencias `runtime`. `vue` es `peer`. Nada que obligue al consumidor a importar CSS.
- No toques `dist/`, `package.json > version`, ni la config de build sin una razón explícita en el PR.
