<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationProps } from '../../types'

const props = withDefaults(defineProps<PaginationProps>(), {
  page: 1,
  pageSize: 10,
  siblingCount: 1,
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{ 'update:page': [value: number] }>()

const pageCount = computed(() => {
  if (props.pageCount !== undefined) return Math.max(1, props.pageCount)
  if (props.total !== undefined) {
    return Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize)))
  }
  return 1
})

const current = computed(() =>
  Math.min(pageCount.value, Math.max(1, props.page)),
)

/** Lista de páginas y elipsis (`'…'`) a mostrar. */
const pages = computed<Array<number | '...'>>(() => {
  const count = pageCount.value
  const sib = Math.max(0, props.siblingCount)
  const first = 1
  const last = count

  const start = Math.max(current.value - sib, first)
  const end = Math.min(current.value + sib, last)

  const out: Array<number | '...'> = []

  if (start > first) {
    out.push(first)
    if (start > first + 1) out.push('...')
  }
  for (let p = start; p <= end; p++) out.push(p)
  if (end < last) {
    if (end < last - 1) out.push('...')
    out.push(last)
  }
  return out
})

function go(p: number) {
  if (props.disabled) return
  const next = Math.min(pageCount.value, Math.max(1, p))
  if (next !== current.value) emit('update:page', next)
}

const classes = computed(() => [
  'gmz-pagination',
  `gmz-pagination--${props.size}`,
  { 'gmz-pagination--disabled': props.disabled },
])
</script>

<template>
  <nav :class="classes" aria-label="Paginación">
    <button
      type="button"
      class="gmz-pagination__btn gmz-pagination__btn--nav"
      :disabled="disabled || current === 1"
      aria-label="Página anterior"
      @click="go(current - 1)"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <template v-for="(p, i) in pages" :key="i">
      <span
        v-if="p === '...'"
        class="gmz-pagination__ellipsis"
        aria-hidden="true"
      >
        …
      </span>
      <button
        v-else
        type="button"
        class="gmz-pagination__btn"
        :class="{ 'is-active': p === current }"
        :disabled="disabled"
        :aria-current="p === current ? 'page' : undefined"
        :aria-label="`Página ${p}`"
        @click="go(p)"
      >
        {{ p }}
      </button>
    </template>

    <button
      type="button"
      class="gmz-pagination__btn gmz-pagination__btn--nav"
      :disabled="disabled || current === pageCount"
      aria-label="Página siguiente"
      @click="go(current + 1)"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-pagination {
  --_size: 34px;
  --_font: 14px;

  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--gmz-font);
}

.gmz-pagination--sm {
  --_size: 28px;
  --_font: 13px;
}

.gmz-pagination--lg {
  --_size: 40px;
  --_font: 15px;
}

.gmz-pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--_size);
  height: var(--_size);
  padding: 0 6px;
  font: inherit;
  font-size: var(--_font);
  font-weight: 500;
  color: var(--gmz-color-fg);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--gmz-radius-sm);
  cursor: pointer;
  transition:
    background-color var(--gmz-transition),
    border-color var(--gmz-transition),
    color var(--gmz-transition);
}

.gmz-pagination__btn:hover:not(:disabled):not(.is-active) {
  background: var(--gmz-color-surface-2);
}

.gmz-pagination__btn.is-active {
  color: var(--gmz-color-fg-on-accent);
  background: var(--gmz-color-accent);
}

.gmz-pagination__btn:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: 1px;
}

.gmz-pagination__btn:disabled {
  color: var(--gmz-color-fg-subtle);
  cursor: not-allowed;
}

.gmz-pagination__btn--nav:disabled {
  opacity: 0.5;
}

.gmz-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--_size);
  height: var(--_size);
  color: var(--gmz-color-fg-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-pagination__btn {
    transition: none;
  }
}
</style>
