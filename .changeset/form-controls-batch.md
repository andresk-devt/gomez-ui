---
'gomez-ui': minor
---

Nuevos controles de formulario, con el mismo patrón que `Input` (label, hint, error,
tamaños, modo claro/oscuro y a11y con `aria-invalid` / `aria-describedby` / `role="alert"`):

- `Checkbox`: casilla con `v-model` booleano, estado `indeterminate` (visual y en el DOM) y
  label por prop o slot.
- `Switch`: interruptor on/off con `v-model` booleano y `role="switch"`.
- `Textarea`: área multilínea con `v-model`, `rows` y `resize` configurable.
- `Select`: desplegable sobre `<select>` nativo; opciones como strings/números u objetos
  `{ label, value, disabled }`, `placeholder` y conserva el tipo original del valor al emitir
  `update:modelValue` / `change`.
