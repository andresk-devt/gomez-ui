# gomez-ui

Librería de componentes para **Vue 3**. Empieza con `Button`; en camino: `Sidebar`, `Tag`, `Alert`, …

- Tipos incluidos (`.d.ts`).
- Estilos **auto-inyectados**: no hace falta importar ningún CSS.
- Tematizable con custom properties `--gmz-*`.
- Distribución ESM + CJS. `vue` es `peerDependency`.

## Instalación

```bash
npm install gomez-ui vue
```

## Uso

### Import puntual

```vue
<script setup lang="ts">
import { Button } from 'gomez-ui'
</script>

<template>
  <Button variant="primary" @click="onSave">Guardar</Button>
</template>
```

### Como plugin (registro global)

```ts
import { createApp } from 'vue'
import GomezUI from 'gomez-ui'
import App from './App.vue'

createApp(App).use(GomezUI).mount('#app')
// <GmzButton> disponible en toda la app.
// Prefijo personalizable: app.use(GomezUI, { prefix: 'G' }) -> <GButton>
```

## `Button`

| Prop       | Tipo                                              | Default     | Descripción                                  |
| ---------- | ------------------------------------------------- | ----------- | -------------------------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Estilo visual.                               |
| `size`     | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Tamaño.                                      |
| `disabled` | `boolean`                                         | `false`     | Deshabilita y bloquea el evento `click`.     |
| `loading`  | `boolean`                                         | `false`     | Muestra spinner y bloquea el evento `click`. |
| `type`     | `'button' \| 'submit' \| 'reset'`                 | `'button'`  | Atributo `type` nativo.                      |
| `block`    | `boolean`                                         | `false`     | Ocupa todo el ancho.                         |

| Evento  | Payload      | Descripción                                          |
| ------- | ------------ | ---------------------------------------------------- |
| `click` | `MouseEvent` | No se emite si el botón está `disabled` o `loading`. |

| Slot      | Descripción                                  |
| --------- | -------------------------------------------- |
| `default` | Contenido del botón.                         |
| `icon`    | Icono antes del texto (oculto en `loading`). |

## Tema

Sobreescribe las custom properties en tu CSS global:

```css
:root {
  --gmz-color-accent: #2563eb;
  --gmz-color-accent-hover: #1d4ed8;
  --gmz-radius: 6px;
}
```

Lista completa en [`src/lib/styles/tokens.css`](./src/lib/styles/tokens.css).

## Desarrollo

```bash
npm install
npm run dev     # playground (src/App.vue)
npm run test    # tests con Vitest
npm run build   # genera dist/ (JS + .d.ts)
```

## Publicación

```bash
npm run build
npm publish     # access public ya configurado en package.json
```

## Licencia

MIT © Andres Gomez
