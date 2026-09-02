# gomez-ui

Librería de componentes para **Vue 3**. Componentes: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Radio`/`RadioGroup`, `Card`, `Alert`, `Tag`, `Badge`, `Avatar`, `Spinner`, `Tooltip`, `ThemeSwitcher`; en camino: `Sidebar`, `Dialog`, `Menu`, …

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
// <GmzButton>, <GmzInput>, <GmzSelect>, <GmzRadioGroup>, <GmzBadge>, <GmzAvatar>, <GmzTooltip>…
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

## `Checkbox`

Casilla con label, estado indeterminado y validación. Soporta `v-model` (`boolean`).

```vue
<template>
  <Checkbox v-model="acepta" label="Acepto los términos" required />
</template>
```

| Prop            | Tipo                   | Default | Descripción                                  |
| --------------- | ---------------------- | ------- | -------------------------------------------- |
| `modelValue`    | `boolean`              | `false` | Estado marcado (`v-model`).                  |
| `label`         | `string`               | —       | Texto junto a la casilla (o usa el slot).    |
| `hint`          | `string`               | —       | Texto de ayuda; se oculta si hay `error`.    |
| `error`         | `string`               | —       | Mensaje de error; marca el control inválido. |
| `size`          | `'sm' \| 'md' \| 'lg'` | `'md'`  | Tamaño.                                      |
| `disabled`      | `boolean`              | `false` | Deshabilita el control.                      |
| `required`      | `boolean`              | `false` | Marca el control como obligatorio.           |
| `indeterminate` | `boolean`              | `false` | Estado indeterminado (visual y en el DOM).   |
| `id`            | `string`               | auto    | `id` del `<input>`.                          |

| Evento              | Payload   | Descripción           |
| ------------------- | --------- | --------------------- |
| `update:modelValue` | `boolean` | Al cambiar el estado. |

| Slot      | Descripción                      |
| --------- | -------------------------------- |
| `default` | Contenido del label (o `label`). |

## `Switch`

Interruptor on/off. Mismas props que `Checkbox` salvo `indeterminate`. Soporta `v-model`
(`boolean`) y expone `role="switch"`.

```vue
<template>
  <Switch v-model="notificar" label="Recibir notificaciones" />
</template>
```

| Prop         | Tipo                   | Default | Descripción                   |
| ------------ | ---------------------- | ------- | ----------------------------- |
| `modelValue` | `boolean`              | `false` | Estado activado (`v-model`).  |
| `label`      | `string`               | —       | Texto junto al interruptor.   |
| `hint`       | `string`               | —       | Texto de ayuda.               |
| `error`      | `string`               | —       | Mensaje de error.             |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | Tamaño.                       |
| `disabled`   | `boolean`              | `false` | Deshabilita el control.       |
| `required`   | `boolean`              | `false` | Marca el control obligatorio. |
| `id`         | `string`               | auto    | `id` del `<input>`.           |

| Evento              | Payload   | Descripción  |
| ------------------- | --------- | ------------ |
| `update:modelValue` | `boolean` | Al alternar. |

## `Textarea`

Área de texto multilínea con label, ayuda y error. Soporta `v-model`.

```vue
<template>
  <Textarea v-model="bio" label="Biografía" :rows="4" />
</template>
```

| Prop          | Tipo                             | Default      | Descripción                                |
| ------------- | -------------------------------- | ------------ | ------------------------------------------ |
| `modelValue`  | `string`                         | —            | Valor del campo (`v-model`).               |
| `label`       | `string`                         | —            | Etiqueta visible.                          |
| `placeholder` | `string`                         | —            | Placeholder.                               |
| `hint`        | `string`                         | —            | Texto de ayuda; se oculta si hay `error`.  |
| `error`       | `string`                         | —            | Mensaje de error; marca el campo inválido. |
| `size`        | `'sm' \| 'md' \| 'lg'`           | `'md'`       | Tamaño.                                    |
| `rows`        | `number`                         | `3`          | Filas visibles.                            |
| `resize`      | `'none' \| 'vertical' \| 'both'` | `'vertical'` | Dirección de redimensionado.               |
| `disabled`    | `boolean`                        | `false`      | Deshabilita el campo.                      |
| `readonly`    | `boolean`                        | `false`      | Solo lectura.                              |
| `required`    | `boolean`                        | `false`      | Marca el campo como obligatorio.           |
| `id`          | `string`                         | auto         | `id` del `<textarea>`.                     |

| Evento              | Payload      | Descripción                    |
| ------------------- | ------------ | ------------------------------ |
| `update:modelValue` | `string`     | Al escribir.                   |
| `focus` / `blur`    | `FocusEvent` | Passthrough del evento nativo. |

## `Select`

Desplegable sobre `<select>` nativo. Acepta opciones como strings/números u objetos
`{ label, value, disabled }`. Soporta `v-model` (`string | number`) y conserva el tipo
original del valor al emitir.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Select } from 'gomez-ui'

const country = ref('')
const options = [
  { label: 'España', value: 'es' },
  { label: 'México', value: 'mx' },
]
</script>

<template>
  <Select
    v-model="country"
    label="País"
    placeholder="Elige…"
    :options="options"
  />
</template>
```

| Prop          | Tipo                                                  | Default | Descripción                                |
| ------------- | ----------------------------------------------------- | ------- | ------------------------------------------ |
| `modelValue`  | `string \| number`                                    | —       | Valor seleccionado (`v-model`).            |
| `options`     | `(string \| number \| { label; value; disabled? })[]` | `[]`    | Opciones del desplegable.                  |
| `label`       | `string`                                              | —       | Etiqueta visible.                          |
| `placeholder` | `string`                                              | —       | Texto cuando no hay selección.             |
| `hint`        | `string`                                              | —       | Texto de ayuda; se oculta si hay `error`.  |
| `error`       | `string`                                              | —       | Mensaje de error; marca el campo inválido. |
| `size`        | `'sm' \| 'md' \| 'lg'`                                | `'md'`  | Tamaño.                                    |
| `disabled`    | `boolean`                                             | `false` | Deshabilita el campo.                      |
| `required`    | `boolean`                                             | `false` | Marca el campo como obligatorio.           |
| `id`          | `string`                                              | auto    | `id` del `<select>`.                       |

| Evento              | Payload            | Descripción                          |
| ------------------- | ------------------ | ------------------------------------ |
| `update:modelValue` | `string \| number` | Al elegir una opción.                |
| `change`            | `string \| number` | Igual que arriba, para conveniencia. |

## `RadioGroup` + `Radio`

`RadioGroup` gestiona el `v-model` y el `name` compartido. Puedes pasarle `options` o
componer `<Radio>` en el slot por defecto — `RadioGroup` les propaga `name`, `size` y
`disabled`. `Radio` también funciona suelto con su propio `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Radio, RadioGroup } from 'gomez-ui'

const plan = ref('pro')
</script>

<template>
  <RadioGroup v-model="plan" label="Plan" orientation="horizontal">
    <Radio value="basic" label="Básico" />
    <Radio value="pro" label="Pro" />
    <Radio value="ent" label="Enterprise" disabled />
  </RadioGroup>
</template>
```

### `RadioGroup`

| Prop          | Tipo                                                  | Default      | Descripción                                  |
| ------------- | ----------------------------------------------------- | ------------ | -------------------------------------------- |
| `modelValue`  | `string \| number`                                    | —            | Valor seleccionado (`v-model`).              |
| `options`     | `(string \| number \| { label; value; disabled? })[]` | `[]`         | Opciones (alternativa a componer `<Radio>`). |
| `name`        | `string`                                              | auto         | `name` compartido por los radios.            |
| `label`       | `string`                                              | —            | Etiqueta del grupo (`aria-labelledby`).      |
| `hint`        | `string`                                              | —            | Texto de ayuda; se oculta si hay `error`.    |
| `error`       | `string`                                              | —            | Mensaje de error; marca el grupo inválido.   |
| `size`        | `'sm' \| 'md' \| 'lg'`                                | `'md'`       | Tamaño de los radios.                        |
| `disabled`    | `boolean`                                             | `false`      | Deshabilita todo el grupo.                   |
| `required`    | `boolean`                                             | `false`      | Marca el grupo como obligatorio.             |
| `orientation` | `'vertical' \| 'horizontal'`                          | `'vertical'` | Disposición de las opciones.                 |

| Evento              | Payload            | Descripción           |
| ------------------- | ------------------ | --------------------- |
| `update:modelValue` | `string \| number` | Al elegir una opción. |

### `Radio`

| Prop         | Tipo                   | Default | Descripción                                       |
| ------------ | ---------------------- | ------- | ------------------------------------------------- |
| `value`      | `string \| number`     | —       | **Requerido.** Valor que representa este radio.   |
| `modelValue` | `string \| number`     | —       | `v-model` cuando se usa fuera de un `RadioGroup`. |
| `label`      | `string`               | —       | Texto junto al radio (o usa el slot).             |
| `name`       | `string`               | auto    | Lo hereda del `RadioGroup` si está dentro de uno. |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | Lo hereda del `RadioGroup` si está dentro de uno. |
| `disabled`   | `boolean`              | `false` | Deshabilita el radio.                             |

## `Badge`

Contador o punto de estado. Con slot por defecto envuelve el contenido y se posiciona en una
esquina; sin slot se renderiza inline.

```vue
<template>
  <Badge :content="8" :max="9">
    <Button variant="ghost">Bandeja</Button>
  </Badge>
  <Badge dot variant="success"><Avatar name="En línea" /></Badge>
</template>
```

| Prop        | Tipo                                                                    | Default     | Descripción                                  |
| ----------- | ----------------------------------------------------------------------- | ----------- | -------------------------------------------- |
| `content`   | `string \| number`                                                      | —           | Contenido del badge.                         |
| `variant`   | `'accent' \| 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`  | Color.                                       |
| `dot`       | `boolean`                                                               | `false`     | Muestra solo un punto, sin texto.            |
| `max`       | `number`                                                                | —           | Tope numérico: por encima se muestra `max+`. |
| `show`      | `boolean`                                                               | `true`      | Controla la visibilidad.                     |
| `placement` | `'top-end' \| 'top-start' \| 'bottom-end' \| 'bottom-start'`            | `'top-end'` | Posición cuando envuelve contenido.          |

| Slot      | Descripción                                  |
| --------- | -------------------------------------------- |
| `default` | Elemento sobre el que se posiciona el badge. |

## `Avatar`

Imagen de usuario con respaldo a iniciales (de `name`) y luego a un icono.

```vue
<template>
  <Avatar src="/me.jpg" name="Ada Lovelace" />
  <Avatar name="Grace Hopper" variant="accent" size="lg" />
</template>
```

| Prop      | Tipo                                                                    | Default     | Descripción                         |
| --------- | ----------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `src`     | `string`                                                                | —           | URL de la imagen.                   |
| `alt`     | `string`                                                                | `name`      | Texto alternativo.                  |
| `name`    | `string`                                                                | —           | Nombre para derivar iniciales.      |
| `size`    | `'sm' \| 'md' \| 'lg' \| number`                                        | `'md'`      | Tamaño (`number` = píxeles).        |
| `shape`   | `'circle' \| 'rounded' \| 'square'`                                     | `'circle'`  | Forma.                              |
| `variant` | `'accent' \| 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Color de la superficie de respaldo. |

| Slot      | Descripción                                           |
| --------- | ----------------------------------------------------- |
| `default` | Sustituye al contenido de respaldo (iniciales/icono). |

## `Spinner`

Indicador de carga. Expone `role="status"` y una etiqueta oculta para lectores de pantalla.

```vue
<template>
  <Spinner />
  <Spinner size="lg" color="fg" label="Procesando" />
</template>
```

| Prop    | Tipo                             | Default      | Descripción                              |
| ------- | -------------------------------- | ------------ | ---------------------------------------- |
| `size`  | `'sm' \| 'md' \| 'lg' \| number` | `'md'`       | Tamaño (`number` = píxeles).             |
| `color` | `'accent' \| 'current' \| 'fg'`  | `'accent'`   | Color del anillo.                        |
| `label` | `string`                         | `'Cargando'` | Etiqueta accesible (oculta visualmente). |

## `Tooltip`

Muestra un mensaje al pasar el ratón o al enfocar el contenido. Posicionamiento por CSS (sin
dependencias). El trigger debe ser un elemento enfocable para el acceso por teclado.

```vue
<template>
  <Tooltip content="Guardar cambios" placement="bottom">
    <Button>Guardar</Button>
  </Tooltip>
</template>
```

| Prop        | Tipo                                     | Default | Descripción                       |
| ----------- | ---------------------------------------- | ------- | --------------------------------- |
| `content`   | `string`                                 | —       | Texto (o usa el slot `content`).  |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posición respecto al trigger.     |
| `disabled`  | `boolean`                                | `false` | Desactiva el tooltip.             |
| `openDelay` | `number`                                 | `100`   | Retardo en ms antes de mostrarlo. |

| Slot      | Descripción                                      |
| --------- | ------------------------------------------------ |
| `default` | El elemento que activa el tooltip.               |
| `content` | Contenido del tooltip (alternativa a `content`). |

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
