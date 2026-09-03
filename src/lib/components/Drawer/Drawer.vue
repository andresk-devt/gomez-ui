<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { DrawerProps } from '../../types'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useScrollLock } from '../../composables/useScrollLock'

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  side: 'right',
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
const titleId = computed(() => `gmz-drawer-title-${uid}`)

const panelRef = ref<HTMLElement | null>(null)
const { activate, deactivate, onKeydown: trapKeydown } = useFocusTrap(panelRef)
const { lock, unlock } = useScrollLock()

function onOpened() {
  lock()
  activate()
  emit('open')
}

function onClosed() {
  unlock()
  deactivate()
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

if (props.modelValue) onOpened()

onBeforeUnmount(() => {
  if (props.modelValue) unlock()
})

function requestClose() {
  if (props.closable) emit('update:modelValue', false)
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
  trapKeydown(e)
}

const isHorizontal = computed(
  () => props.side === 'left' || props.side === 'right',
)

const panelStyle = computed(() => {
  if (props.size === undefined) return undefined
  const v = typeof props.size === 'number' ? `${props.size}px` : props.size
  return { '--_size': v }
})

const rootClasses = computed(() => ['gmz-drawer', `gmz-drawer--${props.side}`])
</script>

<template>
  <Teleport to="body">
    <Transition name="gmz-drawer">
      <div v-if="modelValue" :class="rootClasses" @keydown="onKeydown">
        <div class="gmz-drawer__overlay" @click="onOverlayClick" />
        <div
          ref="panelRef"
          class="gmz-drawer__panel"
          :class="{ 'gmz-drawer__panel--h': isHorizontal }"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          tabindex="-1"
        >
          <header
            v-if="title || $slots.header || closable"
            class="gmz-drawer__header"
          >
            <slot name="header">
              <h2 v-if="title" :id="titleId" class="gmz-drawer__title">
                {{ title }}
              </h2>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="gmz-drawer__close"
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

          <div class="gmz-drawer__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="gmz-drawer__footer">
            <slot name="footer" :close="requestClose" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-drawer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  font-family: var(--gmz-font);
}

.gmz-drawer__overlay {
  position: absolute;
  inset: 0;
  background: var(--gmz-color-overlay);
}

.gmz-drawer__panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface);
  box-shadow: var(--gmz-shadow-lg);
}

.gmz-drawer__panel--h {
  top: 0;
  bottom: 0;
  width: var(--_size, 320px);
  max-width: 100vw;
}

.gmz-drawer--right .gmz-drawer__panel {
  right: 0;
}

.gmz-drawer--left .gmz-drawer__panel {
  left: 0;
}

.gmz-drawer--top .gmz-drawer__panel,
.gmz-drawer--bottom .gmz-drawer__panel {
  left: 0;
  right: 0;
  height: var(--_size, 40vh);
  max-height: 100vh;
}

.gmz-drawer--top .gmz-drawer__panel {
  top: 0;
}

.gmz-drawer--bottom .gmz-drawer__panel {
  bottom: 0;
}

.gmz-drawer__header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: var(--gmz-space-4) var(--gmz-space-5);
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-drawer__title {
  flex: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.gmz-drawer__close {
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

.gmz-drawer__close:hover {
  color: var(--gmz-color-fg);
  background: var(--gmz-color-accent-soft);
}

.gmz-drawer__close:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-drawer__body {
  flex: 1;
  padding: var(--gmz-space-5);
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
}

.gmz-drawer__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: var(--gmz-space-4) var(--gmz-space-5);
  border-top: 1px solid var(--gmz-color-border);
}

.gmz-drawer-enter-active,
.gmz-drawer-leave-active {
  transition: opacity var(--gmz-transition);
}

.gmz-drawer-enter-active .gmz-drawer__panel,
.gmz-drawer-leave-active .gmz-drawer__panel {
  transition: transform var(--gmz-transition);
}

.gmz-drawer-enter-from,
.gmz-drawer-leave-to {
  opacity: 0;
}

.gmz-drawer-enter-from.gmz-drawer--right .gmz-drawer__panel,
.gmz-drawer-leave-to.gmz-drawer--right .gmz-drawer__panel {
  transform: translateX(100%);
}

.gmz-drawer-enter-from.gmz-drawer--left .gmz-drawer__panel,
.gmz-drawer-leave-to.gmz-drawer--left .gmz-drawer__panel {
  transform: translateX(-100%);
}

.gmz-drawer-enter-from.gmz-drawer--top .gmz-drawer__panel,
.gmz-drawer-leave-to.gmz-drawer--top .gmz-drawer__panel {
  transform: translateY(-100%);
}

.gmz-drawer-enter-from.gmz-drawer--bottom .gmz-drawer__panel,
.gmz-drawer-leave-to.gmz-drawer--bottom .gmz-drawer__panel {
  transform: translateY(100%);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-drawer-enter-active,
  .gmz-drawer-leave-active,
  .gmz-drawer-enter-active .gmz-drawer__panel,
  .gmz-drawer-leave-active .gmz-drawer__panel {
    transition: none;
  }
}
</style>
