<script setup lang="ts">
import { computed } from 'vue'
import type { TagProps } from '../../types'

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'neutral',
  size: 'md',
  appearance: 'soft',
  closable: false,
  dot: false,
})

const emit = defineEmits<{ close: [] }>()

const classes = computed(() => [
  'gmz-tag',
  `gmz-tag--${props.variant}`,
  `gmz-tag--${props.size}`,
  `gmz-tag--${props.appearance}`,
])
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="gmz-tag__dot" aria-hidden="true" />
    <span v-if="$slots.icon" class="gmz-tag__icon">
      <slot name="icon" />
    </span>
    <span class="gmz-tag__label"><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="gmz-tag__close"
      aria-label="Quitar"
      @click="emit('close')"
    >
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-tag {
  --_c: var(--gmz-color-fg-muted);
  --_soft: var(--gmz-color-surface-2);
  --_pad-x: 8px;
  --_font: 12px;
  --_gap: 4px;

  display: inline-flex;
  align-items: center;
  gap: var(--_gap);
  padding: 2px var(--_pad-x);
  font-family: var(--gmz-font);
  font-size: var(--_font);
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--gmz-radius-full);
}

.gmz-tag--sm {
  --_pad-x: 6px;
  --_font: 11px;
}

.gmz-tag--lg {
  --_pad-x: 10px;
  --_font: 13px;
  --_gap: 6px;
}

.gmz-tag--accent {
  --_c: var(--gmz-color-accent);
  --_soft: var(--gmz-color-accent-soft);
}

.gmz-tag--success {
  --_c: var(--gmz-color-success);
  --_soft: var(--gmz-color-success-soft);
}

.gmz-tag--warning {
  --_c: var(--gmz-color-warning);
  --_soft: var(--gmz-color-warning-soft);
}

.gmz-tag--danger {
  --_c: var(--gmz-color-danger);
  --_soft: var(--gmz-color-danger-soft);
}

.gmz-tag--info {
  --_c: var(--gmz-color-info);
  --_soft: var(--gmz-color-info-soft);
}

.gmz-tag--soft {
  color: var(--_c);
  background: var(--_soft);
}

.gmz-tag--outline {
  color: var(--_c);
  background: transparent;
  border-color: var(--_c);
}

.gmz-tag--solid {
  color: var(--gmz-color-fg-on-accent);
  background: var(--_c);
}

.gmz-tag__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.gmz-tag__icon {
  display: inline-flex;
}

.gmz-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-right: -2px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  transition:
    background-color var(--gmz-transition),
    opacity var(--gmz-transition);
}

.gmz-tag__close:hover {
  opacity: 1;
  background: var(--gmz-color-accent-soft);
}

.gmz-tag__close:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: 1px;
}
</style>
