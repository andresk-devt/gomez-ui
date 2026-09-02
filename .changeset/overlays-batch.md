---
'gomez-ui': minor
---

Nuevos componentes de overlay:

- `Dialog`: modal con `v-model`, `Teleport` al `<body>`, foco atrapado y devuelto al cerrar,
  bloqueo del scroll del `body` (con recuento para diálogos anidados), cierre por overlay y
  Escape configurables, tamaños `sm/md/lg/full` y slots `header`/`footer` (el footer recibe
  `close()`). `role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-describedby`.
- `Dropdown`: menú con `role="menu"`/`menuitem`, navegación por teclado (↑/↓/Home/End,
  Enter/Espacio, Escape), cierre al hacer clic fuera y foco devuelto al trigger. Acepta
  `items` (con `{ divider: true }`, `disabled`, `danger`) o composición por slot; `trigger`
  con slot scoped `{ open, toggle }`, `placement` y `closeOnSelect`.
