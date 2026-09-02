---
'gomez-ui': minor
---

Nuevos componentes de presentación e interacción, con modo claro/oscuro y tokens `--gmz-*`:

- `RadioGroup` + `Radio`: el grupo gestiona `v-model` y el `name` compartido; acepta
  `options` o `<Radio>` compuestos en el slot (les propaga `name`/`size`/`disabled`).
  `Radio` también funciona suelto con su propio `v-model`. `role="radiogroup"` y estado de
  error accesible.
- `Badge`: contador/punto que envuelve contenido y se posiciona en una esquina, o inline sin
  slot; `max` recorta a `max+`, `dot`, `show` y `placement`.
- `Avatar`: imagen con respaldo a iniciales (de `name`) y luego a icono; `size` `sm/md/lg` o
  numérico, `shape` y `variant` de color.
- `Spinner`: indicador de carga con `role="status"` y etiqueta accesible oculta.
- `Tooltip`: mensaje en hover/foco con posicionamiento por CSS (sin dependencias), `openDelay`
  y `placement`.
