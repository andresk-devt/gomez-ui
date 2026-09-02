<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import type { TabsProps } from '../../types'

const props = withDefaults(defineProps<TabsProps>(), {
  items: () => [],
  variant: 'line',
  size: 'md',
  fitted: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const uid = useId()
const tablistRef = ref<HTMLElement | null>(null)

const enabled = computed(() => props.items.filter((i) => !i.disabled))
const active = computed(() =>
  props.modelValue !== undefined && props.modelValue !== null
    ? props.modelValue
    : enabled.value[0]?.value,
)

const tabId = (v: string | number) => `gmz-tab-${uid}-${v}`
const panelId = (v: string | number) => `gmz-tabpanel-${uid}-${v}`

function select(v: string | number) {
  emit('update:modelValue', v)
}

function onKeydown(e: KeyboardEvent) {
  const usable = enabled.value
  if (usable.length === 0) return
  const idx = usable.findIndex((i) => i.value === active.value)
  let next: number
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      next = (idx + 1) % usable.length
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      next = (idx - 1 + usable.length) % usable.length
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = usable.length - 1
      break
    default:
      return
  }
  e.preventDefault()
  const v = usable[next].value
  select(v)
  nextTick(() => {
    tablistRef.value?.querySelector<HTMLElement>(`[data-value="${v}"]`)?.focus()
  })
}

const classes = computed(() => [
  'gmz-tabs',
  `gmz-tabs--${props.variant}`,
  `gmz-tabs--${props.size}`,
  { 'gmz-tabs--fitted': props.fitted },
])
</script>

<template>
  <div :class="classes">
    <div
      ref="tablistRef"
      class="gmz-tabs__list"
      role="tablist"
      @keydown="onKeydown"
    >
      <button
        v-for="item in items"
        :id="tabId(item.value)"
        :key="String(item.value)"
        type="button"
        role="tab"
        class="gmz-tabs__tab"
        :class="{ 'is-active': item.value === active }"
        :data-value="item.value"
        :aria-selected="item.value === active"
        :aria-controls="panelId(item.value)"
        :tabindex="item.value === active ? 0 : -1"
        :disabled="item.disabled"
        @click="select(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div
      v-if="active !== undefined"
      :id="panelId(active)"
      class="gmz-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(active)"
      tabindex="0"
    >
      <slot :name="String(active)" :value="active" />
    </div>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-tabs {
  --_pad-y: 10px;
  --_pad-x: 14px;
  --_font: 15px;

  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-tabs--sm {
  --_pad-y: 7px;
  --_pad-x: 10px;
  --_font: 13px;
}

.gmz-tabs--lg {
  --_pad-y: 12px;
  --_pad-x: 18px;
  --_font: 17px;
}

.gmz-tabs__list {
  display: flex;
  gap: 4px;
}

.gmz-tabs--line .gmz-tabs__list {
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-tabs--fitted .gmz-tabs__tab {
  flex: 1;
}

.gmz-tabs__tab {
  padding: var(--_pad-y) var(--_pad-x);
  font: inherit;
  font-size: var(--_font);
  font-weight: 500;
  color: var(--gmz-color-fg-muted);
  background: transparent;
  border: 0;
  border-radius: var(--gmz-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition:
    color var(--gmz-transition),
    background-color var(--gmz-transition),
    box-shadow var(--gmz-transition);
}

.gmz-tabs__tab:hover:not(:disabled):not(.is-active) {
  color: var(--gmz-color-fg);
}

.gmz-tabs__tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gmz-tabs__tab:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: -2px;
}

.gmz-tabs--line .gmz-tabs__tab {
  border-radius: 0;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent;
}

.gmz-tabs--line .gmz-tabs__tab.is-active {
  color: var(--gmz-color-accent);
  border-bottom-color: var(--gmz-color-accent);
}

.gmz-tabs--pill .gmz-tabs__tab.is-active {
  color: var(--gmz-color-accent);
  background: var(--gmz-color-accent-soft);
}

.gmz-tabs__panel {
  padding: var(--gmz-space-4) 0;
  font-size: 14px;
  line-height: 1.5;
}

.gmz-tabs__panel:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .gmz-tabs__tab {
    transition: none;
  }
}
</style>
