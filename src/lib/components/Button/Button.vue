<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '../../types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() => [
  'gmz-btn',
  `gmz-btn--${props.variant}`,
  `gmz-btn--${props.size}`,
  {
    'gmz-btn--block': props.block,
    'gmz-btn--loading': props.loading,
  },
])

function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="gmz-btn__spinner" aria-hidden="true" />
    <span v-else-if="$slots.icon" class="gmz-btn__icon">
      <slot name="icon" />
    </span>
    <span class="gmz-btn__label"><slot /></span>
  </button>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-btn {
  --_pad-y: 8px;
  --_pad-x: 16px;
  --_font-size: 15px;
  --_gap: 8px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--_gap);
  box-sizing: border-box;
  margin: 0;
  padding: var(--_pad-y) var(--_pad-x);
  font-family: var(--gmz-font);
  font-size: var(--_font-size);
  font-weight: 500;
  line-height: 1.2;
  border: 1px solid transparent;
  border-radius: var(--gmz-radius);
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition:
    background-color var(--gmz-transition),
    border-color var(--gmz-transition),
    color var(--gmz-transition),
    opacity var(--gmz-transition);
}

.gmz-btn:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.gmz-btn--block {
  width: 100%;
}

.gmz-btn--loading {
  cursor: progress;
}

/* Tamaños */
.gmz-btn--sm {
  --_pad-y: 5px;
  --_pad-x: 12px;
  --_font-size: 13px;
  --_gap: 6px;
}

.gmz-btn--lg {
  --_pad-y: 11px;
  --_pad-x: 22px;
  --_font-size: 17px;
  --_gap: 10px;
}

/* Variantes */
.gmz-btn--primary {
  background-color: var(--gmz-color-accent);
  color: var(--gmz-color-fg-on-accent);
}
.gmz-btn--primary:hover:not(:disabled) {
  background-color: var(--gmz-color-accent-hover);
}

.gmz-btn--secondary {
  background-color: var(--gmz-color-accent-soft);
  color: var(--gmz-color-accent);
}
.gmz-btn--secondary:hover:not(:disabled) {
  background-color: var(--gmz-color-accent-soft-hover);
}

.gmz-btn--ghost {
  background-color: transparent;
  color: var(--gmz-color-fg);
  border-color: var(--gmz-color-border);
}
.gmz-btn--ghost:hover:not(:disabled) {
  background-color: var(--gmz-color-accent-soft);
  border-color: var(--gmz-color-accent);
  color: var(--gmz-color-accent);
}

.gmz-btn--danger {
  background-color: var(--gmz-color-danger);
  color: var(--gmz-color-fg-on-accent);
}
.gmz-btn--danger:hover:not(:disabled) {
  background-color: var(--gmz-color-danger-hover);
}

/* Piezas internas */
.gmz-btn__icon {
  display: inline-flex;
  align-items: center;
}

.gmz-btn__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: gmz-btn-spin 0.6s linear infinite;
}

@keyframes gmz-btn-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gmz-btn,
  .gmz-btn__spinner {
    transition: none;
    animation-duration: 1.2s;
  }
}
</style>
