<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { DropdownItemObject, DropdownProps } from '../../types'
import { Button } from '../Button'

const props = withDefaults(defineProps<DropdownProps>(), {
  items: () => [],
  placement: 'bottom-start',
  disabled: false,
  closeOnSelect: true,
})

const emit = defineEmits<{
  select: [value: string | number, item: DropdownItemObject]
  'update:open': [value: boolean]
}>()

const uid = useId()
const menuId = computed(() => `gmz-dropdown-${uid}`)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const internalOpen = ref(false)
const isOpen = computed(() => internalOpen.value)

const activeIndex = ref(-1)

const enabledIndexes = computed(() =>
  props.items
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => !('divider' in it) && !it.disabled)
    .map(({ i }) => i),
)

function setOpen(value: boolean) {
  internalOpen.value = value
  emit('update:open', value)
  activeIndex.value = value ? (enabledIndexes.value[0] ?? -1) : -1
}

function toggle() {
  if (props.disabled) return
  setOpen(!isOpen.value)
}

function focusTrigger() {
  triggerRef.value
    ?.querySelector<HTMLElement>('button, [href], [tabindex]')
    ?.focus()
}

function close(returnFocus = true) {
  setOpen(false)
  if (returnFocus) focusTrigger()
}

function focusActive() {
  nextTick(() => {
    menuRef.value
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex.value}"]`)
      ?.focus()
  })
}

function move(dir: 1 | -1) {
  const list = enabledIndexes.value
  if (list.length === 0) return
  const pos = list.indexOf(activeIndex.value)
  const next = pos === -1 ? 0 : (pos + dir + list.length) % list.length
  activeIndex.value = list[next]
  focusActive()
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (!isOpen.value) setOpen(true)
    activeIndex.value = enabledIndexes.value[0] ?? -1
    focusActive()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!isOpen.value) setOpen(true)
    activeIndex.value = enabledIndexes.value.at(-1) ?? -1
    focusActive()
  }
}

function onMenuKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      move(-1)
      break
    case 'Home':
      e.preventDefault()
      activeIndex.value = enabledIndexes.value[0] ?? -1
      focusActive()
      break
    case 'End':
      e.preventDefault()
      activeIndex.value = enabledIndexes.value.at(-1) ?? -1
      focusActive()
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Tab':
      close(false)
      break
    case 'Enter':
    case ' ': {
      e.preventDefault()
      const item = props.items[activeIndex.value]
      if (item && !('divider' in item)) onSelect(item)
      break
    }
  }
}

function onSelect(item: DropdownItemObject) {
  if (item.disabled) return
  emit('select', item.value ?? item.label, item)
  if (props.closeOnSelect) close()
}

function onDocPointer(e: Event) {
  if (!isOpen.value) return
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) close(false)
}

watch(isOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) document.addEventListener('pointerdown', onDocPointer)
  else document.removeEventListener('pointerdown', onDocPointer)
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined')
    document.removeEventListener('pointerdown', onDocPointer)
})

const menuClasses = computed(() => [
  'gmz-dropdown__menu',
  `gmz-dropdown__menu--${props.placement}`,
])
</script>

<template>
  <div ref="rootRef" class="gmz-dropdown">
    <span
      ref="triggerRef"
      class="gmz-dropdown__trigger"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger" :open="isOpen" :toggle="toggle">
        <Button variant="ghost" :disabled="disabled" @click="toggle">
          Opciones
        </Button>
      </slot>
    </span>

    <Transition name="gmz-dropdown">
      <ul
        v-if="isOpen"
        :id="menuId"
        ref="menuRef"
        :class="menuClasses"
        role="menu"
        @keydown="onMenuKeydown"
      >
        <template v-for="(item, i) in items" :key="i">
          <li
            v-if="'divider' in item"
            class="gmz-dropdown__divider"
            role="separator"
          />
          <li v-else role="none">
            <button
              type="button"
              role="menuitem"
              class="gmz-dropdown__item"
              :class="{
                'gmz-dropdown__item--danger': item.danger,
                'is-active': i === activeIndex,
              }"
              :data-index="i"
              :disabled="item.disabled"
              :tabindex="i === activeIndex ? 0 : -1"
              @click="onSelect(item)"
              @mousemove="activeIndex = i"
            >
              {{ item.label }}
            </button>
          </li>
        </template>
        <slot :close="close" />
      </ul>
    </Transition>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-dropdown {
  position: relative;
  display: inline-flex;
}

.gmz-dropdown__trigger {
  display: inline-flex;
}

.gmz-dropdown__menu {
  position: absolute;
  z-index: 100;
  min-width: 180px;
  max-width: 280px;
  margin: 0;
  padding: 4px;
  list-style: none;
  font-family: var(--gmz-font);
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border);
  border-radius: var(--gmz-radius);
  box-shadow: var(--gmz-shadow);
}

.gmz-dropdown__menu--bottom-start {
  top: 100%;
  left: 0;
  margin-top: 6px;
}

.gmz-dropdown__menu--bottom-end {
  top: 100%;
  right: 0;
  margin-top: 6px;
}

.gmz-dropdown__menu--top-start {
  bottom: 100%;
  left: 0;
  margin-bottom: 6px;
}

.gmz-dropdown__menu--top-end {
  bottom: 100%;
  right: 0;
  margin-bottom: 6px;
}

.gmz-dropdown__item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 10px;
  font: inherit;
  font-size: 14px;
  text-align: left;
  color: var(--gmz-color-fg);
  background: transparent;
  border: 0;
  border-radius: var(--gmz-radius-sm);
  cursor: pointer;
}

.gmz-dropdown__item:hover:not(:disabled),
.gmz-dropdown__item.is-active:not(:disabled) {
  background: var(--gmz-color-accent-soft);
  color: var(--gmz-color-accent);
}

.gmz-dropdown__item:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: -2px;
}

.gmz-dropdown__item:disabled {
  color: var(--gmz-color-fg-subtle);
  cursor: not-allowed;
}

.gmz-dropdown__item--danger {
  color: var(--gmz-color-danger);
}

.gmz-dropdown__item--danger:hover:not(:disabled),
.gmz-dropdown__item--danger.is-active:not(:disabled) {
  background: var(--gmz-color-danger-soft);
  color: var(--gmz-color-danger);
}

.gmz-dropdown__divider {
  height: 1px;
  margin: 4px 0;
  background: var(--gmz-color-border);
}

.gmz-dropdown-enter-active,
.gmz-dropdown-leave-active {
  transition:
    opacity var(--gmz-transition),
    transform var(--gmz-transition);
}

.gmz-dropdown-enter-from,
.gmz-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-dropdown-enter-active,
  .gmz-dropdown-leave-active {
    transition: none;
  }
}
</style>
