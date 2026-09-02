---
'gomez-ui': minor
---

Añade modo claro/oscuro: composable `useColorMode` (light/dark/system, persistencia en
`localStorage` y sync entre pestañas) y componente `ThemeSwitcher`. La paleta de
`tokens.css` se amplía con superficies, estados (success/warning/danger/info), sombras y
escala de espaciado, todo con variante oscura vía `prefers-color-scheme` y override manual
`data-theme`.
