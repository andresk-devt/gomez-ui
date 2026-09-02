<script setup lang="ts">
import { ref } from 'vue'
import { Button, ThemeSwitcher, useColorMode } from './lib'
import type { ButtonSize, ButtonVariant } from './lib'

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']

const { mode, resolved } = useColorMode()
const clicks = ref(0)
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

    <footer>Clicks registrados: {{ clicks }}</footer>
  </main>
</template>
