<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumn, TableProps, TableRow, TableSort } from '../../types'
import Skeleton from '../Skeleton/Skeleton.vue'

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  rows: () => [],
  rowKey: 'id',
  sort: null,
  manualSort: false,
  loading: false,
  loadingRows: 4,
  emptyText: 'Sin datos',
  size: 'md',
  striped: false,
  hoverable: false,
  stickyHeader: false,
})

const emit = defineEmits<{
  'update:sort': [value: TableSort | null]
  'row-click': [row: TableRow, index: number]
}>()

const sortedRows = computed(() => {
  const s = props.sort
  if (!s || props.manualSort) return props.rows
  if (!props.columns.some((c) => c.key === s.key)) return props.rows
  const dir = s.order === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const av = a[s.key]
    const bv = b[s.key]
    if (av == null && bv == null) return 0
    if (av == null) return -dir
    if (bv == null) return dir
    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * dir
    }
    return String(av).localeCompare(String(bv)) * dir
  })
})

function keyFor(row: TableRow, i: number): string | number {
  if (typeof props.rowKey === 'function') return props.rowKey(row, i)
  const k = row[props.rowKey]
  return k === undefined || k === null ? i : (k as string | number)
}

function ariaSort(col: TableColumn) {
  if (!col.sortable) return undefined
  if (props.sort?.key !== col.key) return 'none'
  return props.sort.order === 'asc' ? 'ascending' : 'descending'
}

function toggleSort(col: TableColumn) {
  if (!col.sortable) return
  const s = props.sort
  let next: TableSort | null
  if (!s || s.key !== col.key) next = { key: col.key, order: 'asc' }
  else if (s.order === 'asc') next = { key: col.key, order: 'desc' }
  else next = null
  emit('update:sort', next)
}

function cellStyle(col: TableColumn) {
  const style: Record<string, string> = {}
  if (col.align) style.textAlign = col.align
  if (col.width !== undefined) {
    style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
  }
  return style
}

const wrapClasses = computed(() => [
  'gmz-table-wrap',
  { 'gmz-table-wrap--sticky': props.stickyHeader },
])

const tableClasses = computed(() => [
  'gmz-table',
  `gmz-table--${props.size}`,
  {
    'gmz-table--striped': props.striped,
    'gmz-table--hoverable': props.hoverable,
  },
])
</script>

<template>
  <div :class="wrapClasses">
    <table :class="tableClasses">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :style="cellStyle(col)"
            :aria-sort="ariaSort(col)"
          >
            <slot :name="`header-${col.key}`" :column="col">
              <button
                v-if="col.sortable"
                type="button"
                class="gmz-table__sort"
                @click="toggleSort(col)"
              >
                {{ col.label ?? col.key }}
                <span class="gmz-table__sort-icon" aria-hidden="true">
                  <template v-if="sort?.key === col.key">
                    {{ sort.order === 'asc' ? '▲' : '▼' }}
                  </template>
                  <template v-else>↕</template>
                </span>
              </button>
              <template v-else>{{ col.label ?? col.key }}</template>
            </slot>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="loading">
          <tr v-for="n in loadingRows" :key="`sk-${n}`" class="gmz-table__row">
            <td v-for="col in columns" :key="col.key">
              <Skeleton />
            </td>
          </tr>
        </template>

        <tr v-else-if="sortedRows.length === 0" class="gmz-table__empty-row">
          <td :colspan="columns.length" class="gmz-table__empty">
            <slot name="empty">{{ emptyText }}</slot>
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="(row, i) in sortedRows"
            :key="keyFor(row, i)"
            class="gmz-table__row"
            @click="emit('row-click', row, i)"
          >
            <td v-for="col in columns" :key="col.key" :style="cellStyle(col)">
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :column="col"
                :index="i"
              >
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--gmz-color-border);
  border-radius: var(--gmz-radius);
}

.gmz-table-wrap--sticky {
  max-height: 420px;
  overflow-y: auto;
}

.gmz-table {
  --_pad-y: 10px;
  --_pad-x: 14px;

  width: 100%;
  border-collapse: collapse;
  font-family: var(--gmz-font);
  font-size: 14px;
  color: var(--gmz-color-fg);
}

.gmz-table--sm {
  --_pad-y: 6px;
  --_pad-x: 10px;
  font-size: 13px;
}

.gmz-table--lg {
  --_pad-y: 14px;
  --_pad-x: 18px;
  font-size: 15px;
}

.gmz-table th,
.gmz-table td {
  padding: var(--_pad-y) var(--_pad-x);
  text-align: left;
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-table thead th {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--gmz-color-fg-muted);
  background: var(--gmz-color-surface-2);
}

.gmz-table-wrap--sticky .gmz-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

.gmz-table tbody tr:last-child td {
  border-bottom: 0;
}

.gmz-table--striped tbody tr:nth-child(even) td {
  background: var(--gmz-color-surface-2);
}

.gmz-table--hoverable tbody tr:hover td {
  background: var(--gmz-color-accent-soft);
}

.gmz-table__sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.gmz-table__sort:hover {
  color: var(--gmz-color-fg);
}

.gmz-table__sort:focus-visible {
  outline: var(--gmz-focus-ring);
  outline-offset: 2px;
}

.gmz-table__sort-icon {
  font-size: 10px;
  color: var(--gmz-color-fg-subtle);
}

.gmz-table__empty {
  padding: var(--gmz-space-6) var(--_pad-x);
  text-align: center;
  color: var(--gmz-color-fg-muted);
}
</style>
