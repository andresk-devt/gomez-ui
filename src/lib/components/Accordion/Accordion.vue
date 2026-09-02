<script setup lang="ts">
import { computed, useId } from 'vue'
import type { AccordionModelValue, AccordionProps } from '../../types'

const props = withDefaults(defineProps<AccordionProps>(), {
  items: () => [],
  multiple: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: AccordionModelValue]
}>()

const uid = useId()

const openSet = computed<Set<string | number>>(() => {
  const mv = props.modelValue
  if (Array.isArray(mv)) return new Set(mv)
  if (mv === undefined || mv === null) return new Set()
  return new Set([mv])
})

function isOpen(v: string | number) {
  return openSet.value.has(v)
}

function toggle(v: string | number) {
  if (props.multiple) {
    const next = new Set(openSet.value)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    emit('update:modelValue', [...next])
  } else {
    emit('update:modelValue', isOpen(v) ? null : v)
  }
}

const headerId = (v: string | number) => `gmz-acc-h-${uid}-${v}`
const panelId = (v: string | number) => `gmz-acc-p-${uid}-${v}`

const classes = computed(() => [
  'gmz-accordion',
  `gmz-accordion--${props.size}`,
])
</script>

<template>
  <div :class="classes">
    <div
      v-for="item in items"
      :key="String(item.value)"
      class="gmz-accordion__item"
      :class="{ 'is-open': isOpen(item.value) }"
    >
      <h3 class="gmz-accordion__heading">
        <button
          :id="headerId(item.value)"
          type="button"
          class="gmz-accordion__trigger"
          :aria-expanded="isOpen(item.value)"
          :aria-controls="panelId(item.value)"
          :disabled="item.disabled"
          @click="toggle(item.value)"
        >
          <span class="gmz-accordion__label">{{ item.label }}</span>
          <svg
            class="gmz-accordion__chevron"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>

      <div
        :id="panelId(item.value)"
        class="gmz-accordion__panel"
        role="region"
        :aria-labelledby="headerId(item.value)"
        :hidden="!isOpen(item.value)"
      >
        <div class="gmz-accordion__content">
          <slot :name="String(item.value)" :value="item.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-accordion {
  --_pad-y: 14px;
  --_pad-x: 4px;
  --_font: 15px;

  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
  border-top: 1px solid var(--gmz-color-border);
}

.gmz-accordion--sm {
  --_pad-y: 10px;
  --_font: 13px;
}

.gmz-accordion--lg {
  --_pad-y: 18px;
  --_font: 17px;
}

.gmz-accordion__item {
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-accordion__heading {
  margin: 0;
  font: inherit;
}

.gmz-accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: var(--_pad-y) var(--_pad-x);
  font: inherit;
  font-size: var(--_font);
  font-weight: 500;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.gmz-accordion__trigger:hover:not(:disabled) {
  color: var(--gmz-color-accent);
}

.gmz-accordion__trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gmz-accordion__trigger:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: -2px;
}

.gmz-accordion__chevron {
  flex-shrink: 0;
  color: var(--gmz-color-fg-subtle);
  transition: transform var(--gmz-transition);
}

.gmz-accordion__item.is-open .gmz-accordion__chevron {
  transform: rotate(180deg);
}

.gmz-accordion__content {
  padding: 0 var(--_pad-x) var(--_pad-y);
  font-size: 14px;
  line-height: 1.5;
  color: var(--gmz-color-fg-muted);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-accordion__chevron {
    transition: none;
  }
}
</style>
