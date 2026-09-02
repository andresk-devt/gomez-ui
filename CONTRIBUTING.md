# Contribuir a gomez-ui

El flujo completo (para IA y humanos) está en [`CLAUDE.md`](./CLAUDE.md). Resumen:

## Puesta en marcha

```bash
npm install        # instala deps y configura los hooks de git (husky)
npm run dev         # playground
```

## Añadir un componente

Con Claude Code: `/new-component <Nombre>`.

A mano: sigue "Cómo añadir un componente" y la _Definition of Done_ de `CLAUDE.md`.

En corto:

1. Rama `feat/component-<kebab>` desde `main`.
2. `src/lib/components/<Nombre>/` con `.vue` + `index.ts` + `.spec.ts`.
3. Tipos en `src/lib/types.ts`; export en `src/lib/index.ts` + alta en `install()`.
4. Sección en `src/App.vue` y tablas en `README.md`.
5. `npm run changeset`.
6. `npm run check` en verde.
7. Commit [Conventional Commits](https://www.conventionalcommits.org/) → push → PR contra `main`.

## Reglas

- Nunca commits directos a `main`. Un componente = una rama = un PR (squash merge).
- No edites `dist/` ni `package.json > version` (lo gestiona Changesets).
- Prettier + ESLint corren solos en el pre-commit; CI los vuelve a verificar en el PR.

## Publicar

Automático: al mergear PRs con changesets a `main`, el workflow `release.yml` abre un PR
"Version Packages"; al mergearlo, publica en npm.

Manual (si hiciera falta): `npm run release`.
