<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { SidebarItem, SidebarProps } from '../../types'

const props = withDefaults(defineProps<SidebarProps>(), {
  items: () => [],
  collapsed: false,
  ariaLabel: 'Navegación',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  select: [item: SidebarItem]
}>()

const uid = useId()

function groupKey(item: SidebarItem) {
  return item.value ?? item.label
}

function hasActiveChild(item: SidebarItem): boolean {
  return Boolean(
    item.children?.some(
      (c) => c.value === props.modelValue || hasActiveChild(c),
    ),
  )
}

const expanded = ref<Set<string | number>>(
  new Set(
    props.items.filter((it) => it.children && hasActiveChild(it)).map(groupKey),
  ),
)

function isExpanded(item: SidebarItem) {
  return expanded.value.has(groupKey(item))
}

function toggleGroup(item: SidebarItem) {
  if (item.disabled) return
  const k = groupKey(item)
  const next = new Set(expanded.value)
  if (next.has(k)) next.delete(k)
  else next.add(k)
  expanded.value = next
}

function isActive(item: SidebarItem) {
  return item.value !== undefined && item.value === props.modelValue
}

function selectItem(item: SidebarItem) {
  if (item.disabled) return
  if (item.value !== undefined) emit('update:modelValue', item.value)
  emit('select', item)
}

const rootClasses = computed(() => [
  'gmz-sidebar',
  { 'gmz-sidebar--collapsed': props.collapsed },
])
</script>

<template>
  <nav :class="rootClasses" :aria-label="ariaLabel">
    <div v-if="title || $slots.header" class="gmz-sidebar__header">
      <slot name="header">
        <span class="gmz-sidebar__title">{{ title }}</span>
      </slot>
    </div>

    <ul class="gmz-sidebar__list">
      <li v-for="item in items" :key="String(groupKey(item))">
        <!-- Grupo plegable -->
        <template v-if="item.children && item.children.length && !collapsed">
          <button
            :id="`gmz-sb-${uid}-${groupKey(item)}`"
            type="button"
            class="gmz-sidebar__link gmz-sidebar__group"
            :class="{ 'is-open': isExpanded(item) }"
            :aria-expanded="isExpanded(item)"
            :aria-controls="`gmz-sb-panel-${uid}-${groupKey(item)}`"
            :disabled="item.disabled"
            @click="toggleGroup(item)"
          >
            <span class="gmz-sidebar__icon">
              <slot name="icon" :item="item" :active="false" />
            </span>
            <span class="gmz-sidebar__label">{{ item.label }}</span>
            <svg
              class="gmz-sidebar__chevron"
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <ul
            :id="`gmz-sb-panel-${uid}-${groupKey(item)}`"
            class="gmz-sidebar__sublist"
            :hidden="!isExpanded(item)"
          >
            <li v-for="child in item.children" :key="String(groupKey(child))">
              <component
                :is="child.href ? 'a' : 'button'"
                :type="child.href ? undefined : 'button'"
                :href="child.href"
                class="gmz-sidebar__link gmz-sidebar__link--child"
                :class="{ 'is-active': isActive(child) }"
                :aria-current="isActive(child) ? 'page' : undefined"
                :disabled="child.href ? undefined : child.disabled"
                @click="selectItem(child)"
              >
                <span class="gmz-sidebar__label">{{ child.label }}</span>
                <span
                  v-if="child.badge !== undefined"
                  class="gmz-sidebar__badge"
                >
                  {{ child.badge }}
                </span>
              </component>
            </li>
          </ul>
        </template>

        <!-- Item simple (o grupo colapsado a raíl) -->
        <component
          :is="item.href ? 'a' : 'button'"
          v-else
          :type="item.href ? undefined : 'button'"
          :href="item.href"
          class="gmz-sidebar__link"
          :class="{ 'is-active': isActive(item) }"
          :aria-current="isActive(item) ? 'page' : undefined"
          :title="collapsed ? item.label : undefined"
          :disabled="item.href ? undefined : item.disabled"
          @click="selectItem(item)"
        >
          <span class="gmz-sidebar__icon">
            <slot name="icon" :item="item" :active="isActive(item)" />
          </span>
          <span class="gmz-sidebar__label">{{ item.label }}</span>
          <span v-if="item.badge !== undefined" class="gmz-sidebar__badge">
            {{ item.badge }}
          </span>
        </component>
      </li>
    </ul>

    <div v-if="$slots.footer" class="gmz-sidebar__footer">
      <slot name="footer" :collapsed="collapsed" />
    </div>
  </nav>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-sidebar {
  --_w: 248px;

  display: flex;
  flex-direction: column;
  width: var(--_w);
  height: 100%;
  padding: var(--gmz-space-3);
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface);
  border-right: 1px solid var(--gmz-color-border);
  transition: width var(--gmz-transition);
}

.gmz-sidebar--collapsed {
  --_w: 64px;
}

.gmz-sidebar__header {
  padding: var(--gmz-space-2) var(--gmz-space-3) var(--gmz-space-3);
}

.gmz-sidebar__title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gmz-color-fg-subtle);
}

.gmz-sidebar--collapsed .gmz-sidebar__header {
  display: none;
}

.gmz-sidebar__list,
.gmz-sidebar__sublist {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gmz-sidebar__sublist {
  margin: 2px 0 2px 30px;
}

.gmz-sidebar__list {
  flex: 1;
  overflow-y: auto;
}

.gmz-sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  color: var(--gmz-color-fg-muted);
  background: transparent;
  border: 0;
  border-radius: var(--gmz-radius);
  cursor: pointer;
  transition:
    background-color var(--gmz-transition),
    color var(--gmz-transition);
}

.gmz-sidebar__link:hover:not(:disabled):not(.is-active) {
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface-2);
}

.gmz-sidebar__link.is-active {
  color: var(--gmz-color-accent);
  background: var(--gmz-color-accent-soft);
}

.gmz-sidebar__link:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: -2px;
}

.gmz-sidebar__link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gmz-sidebar__link--child {
  font-weight: 400;
  padding-left: 12px;
}

.gmz-sidebar__icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.gmz-sidebar__icon:empty {
  display: none;
}

.gmz-sidebar__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gmz-sidebar--collapsed .gmz-sidebar__label,
.gmz-sidebar--collapsed .gmz-sidebar__badge {
  display: none;
}

.gmz-sidebar--collapsed .gmz-sidebar__link {
  justify-content: center;
  padding: 10px;
}

.gmz-sidebar__badge {
  flex-shrink: 0;
  min-width: 18px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  color: var(--gmz-color-fg-muted);
  background: var(--gmz-color-surface-2);
  border-radius: var(--gmz-radius-full);
}

.gmz-sidebar__chevron {
  flex-shrink: 0;
  color: var(--gmz-color-fg-subtle);
  transition: transform var(--gmz-transition);
}

.gmz-sidebar__group.is-open .gmz-sidebar__chevron {
  transform: rotate(180deg);
}

.gmz-sidebar__footer {
  margin-top: auto;
  padding-top: var(--gmz-space-3);
  border-top: 1px solid var(--gmz-color-border);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-sidebar,
  .gmz-sidebar__link,
  .gmz-sidebar__chevron {
    transition: none;
  }
}
</style>
