---
'gomez-ui': minor
---

Overlays y navegación adicionales, más composables auxiliares:

- `Drawer`: panel lateral (`side` left/right/top/bottom) con la mecánica de `Dialog` (foco
  atrapado y devuelto, bloqueo de scroll con recuento, `Teleport`, cierre por overlay/Escape
  configurables), `size` por prop y slots `header`/`footer`.
- `Pagination`: `<nav>` con anterior/siguiente, rango de páginas con elipsis (`siblingCount`),
  `aria-current="page"`, `v-model:page`; deriva las páginas de `total`/`pageSize` o
  `pageCount` y recorta el valor a `[1, pageCount]`.
- `ToastContainer` + `useToast()`: API imperativa de notificaciones (`toast`, `toast.success/
  error/warning/info`, `dismiss`, `clear`), auto-cierre por `duration` (`0` = permanente),
  `placement`, `max`, `role` alert/status según variante.
- `useScrollLock()` y `useFocusTrap(containerRef)` como composables públicos para overlays
  propios.
