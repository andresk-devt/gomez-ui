<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { DialogProps } from '../../types'

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const uid = useId()
const titleId = computed(() => `gmz-dialog-title-${uid}`)
const descId = computed(() => `gmz-dialog-desc-${uid}`)

const panelRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

const canUseDom = typeof document !== 'undefined'

function lockScroll() {
  if (!canUseDom) return
  const n = Number(document.body.dataset.gmzDialogLocks || '0') + 1
  document.body.dataset.gmzDialogLocks = String(n)
  if (n === 1) document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  if (!canUseDom) return
  const n = Math.max(0, Number(document.body.dataset.gmzDialogLocks || '0') - 1)
  document.body.dataset.gmzDialogLocks = String(n)
  if (n === 0) document.body.style.overflow = ''
}

function focusables(): HTMLElement[] {
  if (!panelRef.value) return []
  const sel =
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(sel))
}

function focusFirst() {
  const els = focusables()
  ;(els[0] ?? panelRef.value)?.focus()
}

function onOpened() {
  if (canUseDom) lastFocused = document.activeElement as HTMLElement
  lockScroll()
  nextTick(focusFirst)
  emit('open')
}

function onClosed() {
  unlockScroll()
  if (lastFocused && typeof lastFocused.focus === 'function')
    lastFocused.focus()
  lastFocused = null
  emit('close')
}

watch(
  () => props.modelValue,
  (open, prev) => {
    if (open === prev) return
    if (open) onOpened()
    else onClosed()
  },
)

if (props.modelValue) nextTick(onOpened)

onBeforeUnmount(() => {
  if (props.modelValue) unlockScroll()
})

function requestClose() {
  if (!props.closable) return
  emit('update:modelValue', false)
}

function onOverlayClick() {
  if (props.closeOnOverlay) requestClose()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEsc) {
    e.preventDefault()
    requestClose()
    return
  }
  if (e.key !== 'Tab') return
  const els = focusables()
  if (els.length === 0) {
    e.preventDefault()
    panelRef.value?.focus()
    return
  }
  const first = els[0]
  const last = els[els.length - 1]
  const active = (
    canUseDom ? document.activeElement : null
  ) as HTMLElement | null
  if (e.shiftKey) {
    if (active === first || !panelRef.value?.contains(active)) {
      e.preventDefault()
      last.focus()
    }
  } else if (active === last) {
    e.preventDefault()
    first.focus()
  }
}

const panelClasses = computed(() => [
  'gmz-dialog__panel',
  `gmz-dialog__panel--${props.size}`,
])
</script>

<template>
  <Teleport to="body">
    <Transition name="gmz-dialog">
      <div v-if="modelValue" class="gmz-dialog" @keydown="onKeydown">
        <div class="gmz-dialog__overlay" @click="onOverlayClick" />
        <div
          ref="panelRef"
          :class="panelClasses"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          :aria-describedby="description ? descId : undefined"
          tabindex="-1"
        >
          <header
            v-if="title || $slots.header || closable"
            class="gmz-dialog__header"
          >
            <slot name="header">
              <h2 v-if="title" :id="titleId" class="gmz-dialog__title">
                {{ title }}
              </h2>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="gmz-dialog__close"
              aria-label="Cerrar"
              @click="requestClose"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div class="gmz-dialog__body">
            <p v-if="description" :id="descId" class="gmz-dialog__description">
              {{ description }}
            </p>
            <slot />
          </div>

          <footer v-if="$slots.footer" class="gmz-dialog__footer">
            <slot name="footer" :close="requestClose" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: var(--gmz-font);
}

.gmz-dialog__overlay {
  position: absolute;
  inset: 0;
  background: var(--gmz-color-overlay);
}

.gmz-dialog__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 48px);
  overflow: hidden;
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface);
  border-radius: var(--gmz-radius-lg);
  box-shadow: var(--gmz-shadow-lg);
}

.gmz-dialog__panel--sm {
  max-width: 360px;
}

.gmz-dialog__panel--lg {
  max-width: 640px;
}

.gmz-dialog__panel--full {
  max-width: 960px;
  max-height: calc(100vh - 48px);
  flex: 1;
}

.gmz-dialog__header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: var(--gmz-space-4) var(--gmz-space-5);
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-dialog__title {
  flex: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.gmz-dialog__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: -4px -8px -4px 0;
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

.gmz-dialog__close:hover {
  color: var(--gmz-color-fg);
  background: var(--gmz-color-accent-soft);
}

.gmz-dialog__close:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-dialog__body {
  flex: 1;
  padding: var(--gmz-space-5);
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
}

.gmz-dialog__description {
  margin: 0 0 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: var(--gmz-space-4) var(--gmz-space-5);
  border-top: 1px solid var(--gmz-color-border);
}

.gmz-dialog-enter-active,
.gmz-dialog-leave-active {
  transition: opacity var(--gmz-transition);
}

.gmz-dialog-enter-active .gmz-dialog__panel,
.gmz-dialog-leave-active .gmz-dialog__panel {
  transition:
    transform var(--gmz-transition),
    opacity var(--gmz-transition);
}

.gmz-dialog-enter-from,
.gmz-dialog-leave-to {
  opacity: 0;
}

.gmz-dialog-enter-from .gmz-dialog__panel,
.gmz-dialog-leave-to .gmz-dialog__panel {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-dialog-enter-active,
  .gmz-dialog-leave-active,
  .gmz-dialog-enter-active .gmz-dialog__panel,
  .gmz-dialog-leave-active .gmz-dialog__panel {
    transition: none;
  }
}
</style>
