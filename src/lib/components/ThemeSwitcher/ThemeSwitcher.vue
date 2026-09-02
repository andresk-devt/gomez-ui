<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '../../composables/useColorMode'
import type { ThemeSwitcherProps } from '../../types'

const props = withDefaults(defineProps<ThemeSwitcherProps>(), {
  size: 'md',
})

const { mode, toggle } = useColorMode()

const LABEL: Record<string, string> = {
  light: 'Tema claro',
  dark: 'Tema oscuro',
  system: 'Tema del sistema',
}

const label = computed(() => LABEL[mode.value])
const classes = computed(() => [
  'gmz-theme-switcher',
  `gmz-theme-switcher--${props.size}`,
])
</script>

<template>
  <button
    type="button"
    :class="classes"
    :title="label"
    :aria-label="`${label}. Pulsa para cambiar.`"
    @click="toggle"
  >
    <!-- light -->
    <svg
      v-if="mode === 'light'"
      class="gmz-theme-switcher__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"
      />
    </svg>

    <!-- dark -->
    <svg
      v-else-if="mode === 'dark'"
      class="gmz-theme-switcher__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>

    <!-- system -->
    <svg
      v-else
      class="gmz-theme-switcher__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  </button>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-theme-switcher {
  --_size: 36px;
  --_icon: 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_size);
  height: var(--_size);
  padding: 0;
  color: var(--gmz-color-fg-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--gmz-radius);
  cursor: pointer;
  transition:
    background-color var(--gmz-transition),
    color var(--gmz-transition),
    border-color var(--gmz-transition);
}

.gmz-theme-switcher:hover {
  color: var(--gmz-color-accent);
  background: var(--gmz-color-accent-soft);
}

.gmz-theme-switcher:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-theme-switcher--sm {
  --_size: 30px;
  --_icon: 16px;
}

.gmz-theme-switcher--lg {
  --_size: 44px;
  --_icon: 24px;
}

.gmz-theme-switcher__icon {
  width: var(--_icon);
  height: var(--_icon);
}
</style>
