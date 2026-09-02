<script setup lang="ts">
import { ref } from 'vue'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Switch,
  Tag,
  Textarea,
  ThemeSwitcher,
  useColorMode,
} from './lib'
import type { ButtonSize, ButtonVariant, TagVariant } from './lib'

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const tagVariants: TagVariant[] = [
  'neutral',
  'accent',
  'success',
  'warning',
  'danger',
  'info',
]

const { mode, resolved } = useColorMode()
const clicks = ref(0)
const email = ref('')
const bio = ref('')
const terms = ref(false)
const notify = ref(true)
const country = ref('')
const countries = [
  { label: 'España', value: 'es' },
  { label: 'México', value: 'mx' },
  { label: 'Colombia', value: 'co' },
  { label: 'Argentina', value: 'ar' },
]
</script>

<template>
  <main class="page">
    <header class="page__header">
      <div>
        <h1>gomez-ui</h1>
        <p>
          Playground · modo <code>{{ mode }}</code> → resuelto
          <code>{{ resolved }}</code>
        </p>
      </div>
      <ThemeSwitcher />
    </header>

    <section>
      <h2>ThemeSwitcher</h2>
      <div class="row">
        <ThemeSwitcher size="sm" />
        <ThemeSwitcher size="md" />
        <ThemeSwitcher size="lg" />
      </div>
      <p class="hint">
        Cicla claro → oscuro → sistema · modo <code>{{ mode }}</code> · resuelto
        <code>{{ resolved }}</code>
      </p>
    </section>

    <section>
      <h2>Variantes × tamaños</h2>
      <div class="grid">
        <div v-for="variant in variants" :key="variant" class="row">
          <Button
            v-for="size in sizes"
            :key="size"
            :variant="variant"
            :size="size"
            @click="clicks++"
          >
            {{ variant }} / {{ size }}
          </Button>
        </div>
      </div>
    </section>

    <section>
      <h2>Estados</h2>
      <div class="row">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button variant="secondary" loading>Guardando</Button>
      </div>
    </section>

    <section>
      <h2>Con icono</h2>
      <div class="row">
        <Button variant="ghost">
          <template #icon>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
            </svg>
          </template>
          Con slot icon
        </Button>
      </div>
    </section>

    <section>
      <h2>Bloque</h2>
      <Button block @click="clicks++">Ancho completo</Button>
    </section>

    <section>
      <h2>Input</h2>
      <div class="grid">
        <Input
          v-model="email"
          label="Correo"
          type="email"
          placeholder="tu@correo.com"
          hint="No lo compartiremos con nadie."
          required
        />
        <Input
          label="Con error"
          model-value="no-es-un-correo"
          error="Introduce un correo válido."
        />
        <div class="row">
          <Input size="sm" placeholder="sm" />
          <Input size="md" placeholder="md" />
          <Input size="lg" placeholder="lg" />
        </div>
        <Input label="Deshabilitado" model-value="bloqueado" disabled />
      </div>
      <p class="hint">
        Valor de v-model: <code>{{ email || '—' }}</code>
      </p>
    </section>

    <section>
      <h2>Card</h2>
      <div class="grid">
        <Card variant="elevated" title="Elevated">
          Sombra sutil sobre la superficie.
          <template #footer>
            <Button size="sm">Acción</Button>
          </template>
        </Card>
        <Card variant="outlined" title="Outlined">Solo borde, sin sombra.</Card>
        <Card variant="filled" title="Filled">Fondo secundario.</Card>
      </div>
    </section>

    <section>
      <h2>Alert</h2>
      <div class="grid">
        <Alert variant="info" title="Información">Un aviso informativo.</Alert>
        <Alert variant="success" title="Guardado">Todo fue bien.</Alert>
        <Alert variant="warning">Revisa este detalle antes de continuar.</Alert>
        <Alert variant="danger" title="Error" closable>
          Algo falló y puedes cerrar este aviso.
        </Alert>
      </div>
    </section>

    <section>
      <h2>Tag</h2>
      <div class="row">
        <Tag v-for="v in tagVariants" :key="v" :variant="v">{{ v }}</Tag>
      </div>
      <div class="row">
        <Tag appearance="outline" variant="accent">outline</Tag>
        <Tag appearance="solid" variant="accent">solid</Tag>
        <Tag variant="success" dot>con punto</Tag>
        <Tag variant="danger" closable>closable</Tag>
        <Tag size="sm">sm</Tag>
        <Tag size="lg">lg</Tag>
      </div>
    </section>

    <section>
      <h2>Checkbox &amp; Switch</h2>
      <div class="grid">
        <Checkbox v-model="terms" label="Acepto los términos" required />
        <Checkbox :indeterminate="true" label="Selección parcial" />
        <Checkbox label="Deshabilitado" disabled />
        <Switch v-model="notify" label="Recibir notificaciones" />
        <Switch label="Modo beta" hint="Funciones experimentales." />
        <Switch label="Bloqueado" disabled />
      </div>
      <p class="hint">
        terms: <code>{{ terms }}</code> · notify: <code>{{ notify }}</code>
      </p>
    </section>

    <section>
      <h2>Textarea</h2>
      <Textarea
        v-model="bio"
        label="Biografía"
        placeholder="Cuéntanos algo sobre ti…"
        hint="Máximo unas pocas líneas."
        :rows="4"
      />
      <p class="hint">
        Longitud: <code>{{ bio.length }}</code>
      </p>
    </section>

    <section>
      <h2>Select</h2>
      <div class="grid">
        <Select
          v-model="country"
          label="País"
          placeholder="Elige un país…"
          :options="countries"
        />
        <div class="row">
          <Select size="sm" :options="['sm', 'md', 'lg']" model-value="sm" />
          <Select size="lg" :options="['sm', 'md', 'lg']" model-value="lg" />
        </div>
        <Select
          label="Con error"
          :options="countries"
          error="Selecciona un país."
        />
      </div>
      <p class="hint">
        Valor: <code>{{ country || '—' }}</code>
      </p>
    </section>

    <footer>Clicks registrados: {{ clicks }}</footer>
  </main>
</template>
