<script setup lang="ts">
import type { BreadcrumbItem, BreadcrumbProps } from '../../types'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  separator: '/',
})

const emit = defineEmits<{ select: [item: BreadcrumbItem, index: number] }>()

const isLast = (i: number) => i === props.items.length - 1
</script>

<template>
  <nav class="gmz-breadcrumb" aria-label="Breadcrumb">
    <ol class="gmz-breadcrumb__list">
      <li v-for="(item, i) in items" :key="i" class="gmz-breadcrumb__item">
        <a
          v-if="item.href && !isLast(i) && !item.disabled"
          class="gmz-breadcrumb__link"
          :href="item.href"
        >
          {{ item.label }}
        </a>
        <button
          v-else-if="!isLast(i) && !item.disabled"
          type="button"
          class="gmz-breadcrumb__link gmz-breadcrumb__link--button"
          @click="emit('select', item, i)"
        >
          {{ item.label }}
        </button>
        <span
          v-else
          class="gmz-breadcrumb__current"
          :aria-current="isLast(i) ? 'page' : undefined"
        >
          {{ item.label }}
        </span>

        <span v-if="!isLast(i)" class="gmz-breadcrumb__sep" aria-hidden="true">
          <slot name="separator">{{ separator }}</slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-breadcrumb {
  font-family: var(--gmz-font);
  font-size: 14px;
}

.gmz-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gmz-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.gmz-breadcrumb__link {
  color: var(--gmz-color-fg-muted);
  text-decoration: none;
  border-radius: var(--gmz-radius-sm);
}

.gmz-breadcrumb__link:hover {
  color: var(--gmz-color-accent);
  text-decoration: underline;
}

.gmz-breadcrumb__link:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: 2px;
}

.gmz-breadcrumb__link--button {
  padding: 0;
  font: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.gmz-breadcrumb__current {
  color: var(--gmz-color-fg);
  font-weight: 500;
}

.gmz-breadcrumb__sep {
  color: var(--gmz-color-fg-subtle);
  user-select: none;
}
</style>
