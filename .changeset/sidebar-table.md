---
'gomez-ui': minor
---

- `Sidebar`: navegación lateral (`<nav>`) con un nivel de grupos plegables
  (`aria-expanded`/`[hidden]`), modo raíl (`v-model:collapsed`), `badge` por item, items con
  `href` como `<a>`, `aria-current="page"` en el activo. `v-model` para el item activo,
  eventos `update:modelValue`/`select`, slots `icon` (scoped `{ item, active }`),
  `header` y `footer` (`{ collapsed }`).
- `Table`: tabla con ordenación (ciclo asc→desc→sin orden, `aria-sort`, orden interno de
  números y texto o `manualSort`), `v-model:sort`, estados `loading` (filas skeleton) y
  vacío (`emptyText`/slot `empty`), `striped`/`hoverable`/`stickyHeader`, densidad por
  `size`, `rowKey` string o función, `row-click`, y slots `cell-<key>` / `header-<key>`.
