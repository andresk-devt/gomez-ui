<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import type { ToastRecord } from '../../types'

const props = defineProps<{ toast: ToastRecord }>()
const emit = defineEmits<{ dismiss: [] }>()

let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (props.toast.duration && props.toast.duration > 0) {
    timer = setTimeout(() => emit('dismiss'), props.toast.duration)
  }
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div
    class="gmz-toast"
    :class="`gmz-toast--${toast.variant}`"
    :role="toast.variant === 'danger' ? 'alert' : 'status'"
    :aria-live="toast.variant === 'danger' ? 'assertive' : 'polite'"
  >
    <div class="gmz-toast__content">
      <p v-if="toast.title" class="gmz-toast__title">{{ toast.title }}</p>
      <p class="gmz-toast__message">{{ toast.message }}</p>
    </div>
    <button
      type="button"
      class="gmz-toast__close"
      aria-label="Cerrar"
      @click="emit('dismiss')"
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

.gmz-toast {
  --_c: var(--gmz-color-info);

  display: flex;
  gap: 10px;
  width: 100%;
  padding: 12px 12px 12px 14px;
  font-family: var(--gmz-font);
  font-size: 14px;
  line-height: 1.4;
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border);
  border-left: 3px solid var(--_c);
  border-radius: var(--gmz-radius);
  box-shadow: var(--gmz-shadow);
  pointer-events: auto;
}

.gmz-toast--info {
  --_c: var(--gmz-color-info);
}

.gmz-toast--success {
  --_c: var(--gmz-color-success);
}

.gmz-toast--warning {
  --_c: var(--gmz-color-warning);
}

.gmz-toast--danger {
  --_c: var(--gmz-color-danger);
}

.gmz-toast__content {
  flex: 1;
  min-width: 0;
}

.gmz-toast__title {
  margin: 0 0 2px;
  font-weight: 600;
  color: var(--_c);
}

.gmz-toast__message {
  margin: 0;
}

.gmz-toast__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: -2px -2px auto auto;
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

.gmz-toast__close:hover {
  color: var(--gmz-color-fg);
  background: var(--gmz-color-accent-soft);
}

.gmz-toast__close:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}
</style>
