# gomez-ui

Librería de componentes para **Vue 3**. Componentes: `Button`, `Input`, `Card`, `Alert`, `Tag`, `ThemeSwitcher`; en camino: `Sidebar`, `Select`, `Dialog`, …

- Tipos incluidos (`.d.ts`).
- Estilos **auto-inyectados**: no hace falta importar ningún CSS.
- **Modo claro/oscuro** integrado (`useColorMode`), tematizable con custom properties `--gmz-*`.
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
// <GmzButton>, <GmzInput>, <GmzCard>, <GmzAlert>, <GmzTag>, <GmzThemeSwitcher>…
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

## `Input`

Campo de texto con label, ayuda y estado de error. Soporta `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input } from 'gomez-ui'

const email = ref('')
</script>

<template>
  <Input
    v-model="email"
    label="Correo"
    type="email"
    hint="No lo compartiremos."
    :error="email && !email.includes('@') ? 'Correo no válido' : undefined"
  />
</template>
```

| Prop          | Tipo                                                                        | Default  | Descripción                                     |
| ------------- | --------------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `modelValue`  | `string \| number`                                                          | —        | Valor del campo (`v-model`).                    |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Tipo nativo del `<input>`.                      |
| `label`       | `string`                                                                    | —        | Etiqueta visible (enlazada con `for`/`id`).     |
| `placeholder` | `string`                                                                    | —        | Placeholder.                                    |
| `hint`        | `string`                                                                    | —        | Texto de ayuda; se oculta si hay `error`.       |
| `error`       | `string`                                                                    | —        | Mensaje de error; marca el campo como inválido. |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`   | Tamaño.                                         |
| `disabled`    | `boolean`                                                                   | `false`  | Deshabilita el campo.                           |
| `readonly`    | `boolean`                                                                   | `false`  | Solo lectura.                                   |
| `required`    | `boolean`                                                                   | `false`  | Marca el campo como obligatorio.                |
| `id`          | `string`                                                                    | auto     | `id` del `<input>`; si se omite se genera uno.  |

| Evento              | Payload      | Descripción                    |
| ------------------- | ------------ | ------------------------------ |
| `update:modelValue` | `string`     | Al escribir en el campo.       |
| `focus`             | `FocusEvent` | Passthrough del evento nativo. |
| `blur`              | `FocusEvent` | Passthrough del evento nativo. |

| Slot      | Descripción                    |
| --------- | ------------------------------ |
| `prepend` | Contenido al inicio del campo. |
| `append`  | Contenido al final del campo.  |

## `Card`

Contenedor con `header`, cuerpo y `footer` opcionales.

```vue
<template>
  <Card variant="outlined" title="Resumen">
    Contenido de la tarjeta.
    <template #footer>
      <Button size="sm">Ver más</Button>
    </template>
  </Card>
</template>
```

| Prop      | Tipo                                   | Default      | Descripción                                         |
| --------- | -------------------------------------- | ------------ | --------------------------------------------------- |
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Sombra, borde o fondo secundario.                   |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'`       | `'md'`       | Padding de header, body y footer.                   |
| `title`   | `string`                               | —            | Título de conveniencia; lo ignora el slot `header`. |

| Slot      | Descripción                       |
| --------- | --------------------------------- |
| `default` | Cuerpo de la tarjeta.             |
| `header`  | Cabecera; sustituye a `title`.    |
| `footer`  | Pie; solo se renderiza si se usa. |

## `Alert`

Mensaje contextual con icono, título y cierre opcional.

```vue
<template>
  <Alert variant="success" title="Guardado" closable @close="onClose">
    Los cambios se guardaron correctamente.
  </Alert>
</template>
```

| Prop       | Tipo                                           | Default  | Descripción                      |
| ---------- | ---------------------------------------------- | -------- | -------------------------------- |
| `variant`  | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Color e icono por defecto.       |
| `title`    | `string`                                       | —        | Título en negrita.               |
| `closable` | `boolean`                                      | `false`  | Muestra el botón de cierre.      |
| `hideIcon` | `boolean`                                      | `false`  | Oculta el icono de la izquierda. |

| Evento  | Payload | Descripción                                         |
| ------- | ------- | --------------------------------------------------- |
| `close` | —       | Al pulsar el cierre; el aviso se oculta a sí mismo. |

| Slot      | Descripción                     |
| --------- | ------------------------------- |
| `default` | Contenido del mensaje.          |
| `icon`    | Sustituye el icono por defecto. |

## `Tag`

Etiqueta compacta para estados, categorías o filtros.

```vue
<template>
  <Tag variant="success" dot>Activo</Tag>
  <Tag variant="danger" closable @close="remove">Borrador</Tag>
</template>
```

| Prop         | Tipo                                                                    | Default     | Descripción                       |
| ------------ | ----------------------------------------------------------------------- | ----------- | --------------------------------- |
| `variant`    | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Color del tag.                    |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                  | `'md'`      | Tamaño.                           |
| `appearance` | `'soft' \| 'outline' \| 'solid'`                                        | `'soft'`    | Relleno suave, contorno o sólido. |
| `closable`   | `boolean`                                                               | `false`     | Muestra el botón para quitarlo.   |
| `dot`        | `boolean`                                                               | `false`     | Punto de color al inicio.         |

| Evento  | Payload | Descripción                   |
| ------- | ------- | ----------------------------- |
| `close` | —       | Al pulsar el botón de quitar. |

| Slot      | Descripción            |
| --------- | ---------------------- |
| `default` | Texto del tag.         |
| `icon`    | Icono antes del texto. |

## `ThemeSwitcher`

Botón que recorre `claro → oscuro → sistema`. No necesita props ni configuración; usa
`useColorMode` por debajo.

```vue
<script setup lang="ts">
import { ThemeSwitcher } from 'gomez-ui'
</script>

<template>
  <ThemeSwitcher size="md" />
</template>
```

| Prop   | Tipo                   | Default | Descripción      |
| ------ | ---------------------- | ------- | ---------------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Tamaño del botón |

## Modo claro/oscuro — `useColorMode`

```ts
import { useColorMode } from 'gomez-ui'

const { mode, resolved, isDark, setMode, toggle } = useColorMode()

setMode('dark') // fuerza oscuro
setMode('system') // vuelve a seguir la preferencia del SO
toggle() // claro → oscuro → sistema → …
```

- **`mode`** (`Ref<'light' | 'dark' | 'system'>`, solo lectura): preferencia elegida.
- **`resolved`** (`Ref<'light' | 'dark'>`): tema efectivo tras resolver `'system'`.
- **`isDark`** (`Ref<boolean>`).
- Persiste en `localStorage` (`gmz-color-mode`) y se sincroniza entre pestañas.

### Cómo funciona

- Sin `data-theme` en `<html>` → se sigue `prefers-color-scheme`.
- `useColorMode` pone `data-theme="light" | "dark"` en `<html>` cuando fuerzas un tema, y lo
  quita al volver a `'system'`. El override manual **siempre gana**.
- Para evitar el parpadeo inicial en SSR/carga, puedes fijar el atributo antes de montar Vue:
  ```html
  <script>
    const m = localStorage.getItem('gmz-color-mode')
    if (m === 'light' || m === 'dark')
      document.documentElement.dataset.theme = m
  </script>
  ```

## Tema (tokens)

Sobreescribe cualquier `--gmz-*` en tu CSS global (afecta a claro y oscuro):

```css
:root {
  --gmz-color-accent: #2563eb;
  --gmz-color-accent-hover: #1d4ed8;
  --gmz-radius: 6px;
}
:root[data-theme='dark'] {
  --gmz-color-accent: #60a5fa;
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
