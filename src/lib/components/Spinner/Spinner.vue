<script setup lang="ts">
import { computed } from 'vue'
import type { SpinnerProps } from '../../types'

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  color: 'accent',
  label: 'Cargando',
})

const style = computed(() =>
  typeof props.size === 'number' ? { '--_size': `${props.size}px` } : undefined,
)

const classes = computed(() => [
  'gmz-spinner',
  typeof props.size === 'string' ? `gmz-spinner--${props.size}` : null,
  `gmz-spinner--${props.color}`,
])
</script>

<template>
  <span :class="classes" :style="style" role="status">
    <span class="gmz-spinner__ring" aria-hidden="true" />
    <span class="gmz-spinner__label">{{ label }}</span>
  </span>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-spinner {
  --_size: 24px;
  --_border: 2.5px;

  display: inline-flex;
  vertical-align: middle;
}

.gmz-spinner--sm {
  --_size: 16px;
  --_border: 2px;
}

.gmz-spinner--lg {
  --_size: 36px;
  --_border: 3px;
}

.gmz-spinner--accent {
  color: var(--gmz-color-accent);
}

.gmz-spinner--fg {
  color: var(--gmz-color-fg);
}

.gmz-spinner--current {
  color: currentColor;
}

.gmz-spinner__ring {
  width: var(--_size);
  height: var(--_size);
  border: var(--_border) solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: gmz-spinner-spin 0.6s linear infinite;
}

.gmz-spinner__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}

@keyframes gmz-spinner-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gmz-spinner__ring {
    animation-duration: 1.4s;
  }
}
</style>
