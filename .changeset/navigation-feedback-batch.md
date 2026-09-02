---
'gomez-ui': minor
---

Nuevos componentes de navegación y feedback, con modo claro/oscuro y tokens `--gmz-*`:

- `Tabs`: pestañas con `role="tablist"`/`tab`/`tabpanel`, navegación por teclado
  (←/→/Home/End saltando deshabilitadas), `v-model`, variantes `line`/`pill`, `fitted`.
  El contenido de cada panel va en un slot con nombre igual al `value`.
- `Accordion`: paneles plegables accesibles; `v-model` con un value (modo simple, `null` =
  cerrado) o array (`multiple`). Slots con nombre igual al `value`.
- `Progress`: barra `role="progressbar"` determinada (recorta a `[0, max]`) o indeterminada
  sin `value`; variantes de color, `showValue`.
- `Skeleton`: bloque de carga decorativo (`aria-hidden`); variantes `text`/`rect`/`circle`,
  `lines`, tamaños y radio configurables, shimmer opcional.
- `Breadcrumb`: `<nav>` + `<ol>` con `aria-current="page"` en el último; items con `href`
  como enlace o botón que emite `select`, separador por prop o slot.
