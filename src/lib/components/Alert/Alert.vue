<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AlertProps } from '../../types'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  closable: false,
  hideIcon: false,
})

const emit = defineEmits<{ close: [] }>()

const dismissed = ref(false)

const classes = computed(() => ['gmz-alert', `gmz-alert--${props.variant}`])

function close() {
  dismissed.value = true
  emit('close')
}
</script>

<template>
  <div v-if="!dismissed" :class="classes" role="alert">
    <span v-if="!hideIcon" class="gmz-alert__icon" aria-hidden="true">
      <slot name="icon">
        <svg
          v-if="variant === 'success'"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m22 4-10 10.01-3-3" />
        </svg>
        <svg
          v-else-if="variant === 'warning'"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
          />
          <path d="M12 9v4M12 17h.01" />
        </svg>
        <svg
          v-else-if="variant === 'danger'"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9l6 6" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </slot>
    </span>

    <div class="gmz-alert__content">
      <p v-if="title" class="gmz-alert__title">{{ title }}</p>
      <div class="gmz-alert__message"><slot /></div>
    </div>

    <button
      v-if="closable"
      type="button"
      class="gmz-alert__close"
      aria-label="Cerrar"
      @click="close"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-alert {
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  font-family: var(--gmz-font);
  font-size: 14px;
  line-height: 1.45;
  color: var(--gmz-color-fg);
  background: var(--_bg);
  border: 1px solid transparent;
  border-radius: var(--gmz-radius);
}

.gmz-alert--info {
  --_c: var(--gmz-color-info);
  --_bg: var(--gmz-color-info-soft);
}

.gmz-alert--success {
  --_c: var(--gmz-color-success);
  --_bg: var(--gmz-color-success-soft);
}

.gmz-alert--warning {
  --_c: var(--gmz-color-warning);
  --_bg: var(--gmz-color-warning-soft);
}

.gmz-alert--danger {
  --_c: var(--gmz-color-danger);
  --_bg: var(--gmz-color-danger-soft);
}

.gmz-alert__icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--_c);
}

.gmz-alert__content {
  flex: 1;
  min-width: 0;
}

.gmz-alert__title {
  margin: 0 0 2px;
  font-weight: 600;
  color: var(--_c);
}

.gmz-alert__message {
  margin: 0;
}

.gmz-alert__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: -2px -4px -2px 0;
  padding: 0;
  color: var(--gmz-color-fg-muted);
  background: transparent;
  border: 0;
  border-radius: var(--gmz-radius-sm);
  cursor: pointer;
  transition:
    background-color var(--gmz-transition),
    color var(--gmz-transition);
}

.gmz-alert__close:hover {
  color: var(--gmz-color-fg);
  background: var(--gmz-color-accent-soft);
}

.gmz-alert__close:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}
</style>
