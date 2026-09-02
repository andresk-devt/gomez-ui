<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from '../../types'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'danger',
  dot: false,
  show: true,
  placement: 'top-end',
})

const displayContent = computed(() => {
  if (props.dot) return ''
  const c = props.content
  if (c === undefined || c === null || c === '') return ''
  if (typeof c === 'number' && props.max !== undefined && c > props.max) {
    return `${props.max}+`
  }
  return String(c)
})

const visible = computed(
  () => props.show && (props.dot || displayContent.value !== ''),
)

const badgeClasses = computed(() => [
  'gmz-badge',
  `gmz-badge--${props.variant}`,
  `gmz-badge--${props.placement}`,
  { 'gmz-badge--dot': props.dot },
])
</script>

<template>
  <span v-if="$slots.default" class="gmz-badge-wrap">
    <slot />
    <span v-if="visible" :class="badgeClasses" aria-hidden="true">
      {{ displayContent }}
    </span>
  </span>
  <span v-else-if="visible" :class="[badgeClasses, 'gmz-badge--inline']">
    {{ displayContent }}
  </span>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-badge-wrap {
  position: relative;
  display: inline-flex;
}

.gmz-badge {
  --_c: var(--gmz-color-danger);

  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-family: var(--gmz-font);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: var(--gmz-color-fg-on-accent);
  background: var(--_c);
  border: 2px solid var(--gmz-color-bg);
  border-radius: var(--gmz-radius-full);
}

.gmz-badge--accent {
  --_c: var(--gmz-color-accent);
}

.gmz-badge--neutral {
  --_c: var(--gmz-color-fg-muted);
}

.gmz-badge--success {
  --_c: var(--gmz-color-success);
}

.gmz-badge--warning {
  --_c: var(--gmz-color-warning);
}

.gmz-badge--info {
  --_c: var(--gmz-color-info);
}

.gmz-badge--dot {
  min-width: 0;
  width: 10px;
  height: 10px;
  padding: 0;
}

.gmz-badge--top-end {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.gmz-badge--top-start {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.gmz-badge--bottom-end {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.gmz-badge--bottom-start {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

.gmz-badge--inline {
  position: static;
  transform: none;
  border: 0;
}
</style>
