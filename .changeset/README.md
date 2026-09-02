# Changesets

Esta carpeta la gestiona [Changesets](https://github.com/changesets/changesets).
Cada Pull Request que cambie algo publicable debe incluir un changeset.

## Cómo añadir uno

```bash
npm run changeset
```

Responde:

1. Tipo de cambio: `patch` (fix), `minor` (feat nuevo, retrocompatible), `major` (breaking).
2. Un resumen en una línea (irá al CHANGELOG).

Esto crea un archivo `.md` en esta carpeta. Commítealo junto con tu código.

## Qué pasa al hacer merge a `main`

El workflow `release.yml`:

- Junta los changesets pendientes en un PR **"Version Packages"** (sube la versión + actualiza el CHANGELOG).
- Al mergear ese PR, publica la nueva versión en npm.
