<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from 'vue'
import type { TooltipProps } from '../../types'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  disabled: false,
  openDelay: 100,
})

const uid = useId()
const tooltipId = computed(() => `gmz-tooltip-${uid}`)
const open = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function show() {
  if (props.disabled) return
  clearTimeout(timer)
  timer = setTimeout(() => {
    open.value = true
  }, props.openDelay)
}

function hide() {
  clearTimeout(timer)
  open.value = false
}

onBeforeUnmount(() => clearTimeout(timer))

const bubbleClasses = computed(() => [
  'gmz-tooltip__bubble',
  `gmz-tooltip__bubble--${props.placement}`,
])
</script>

<template>
  <span
    class="gmz-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <span
      v-if="open && (content || $slots.content)"
      :id="tooltipId"
      :class="bubbleClasses"
      role="tooltip"
    >
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-tooltip {
  position: relative;
  display: inline-flex;
}

.gmz-tooltip__bubble {
  position: absolute;
  z-index: 10;
  max-width: 240px;
  padding: 6px 10px;
  font-family: var(--gmz-font);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  color: var(--gmz-color-bg);
  background: var(--gmz-color-fg);
  border-radius: var(--gmz-radius-sm);
  box-shadow: var(--gmz-shadow-sm);
  pointer-events: none;
}

.gmz-tooltip__bubble--top {
  bottom: 100%;
  left: 50%;
  margin-bottom: 8px;
  transform: translateX(-50%);
}

.gmz-tooltip__bubble--bottom {
  top: 100%;
  left: 50%;
  margin-top: 8px;
  transform: translateX(-50%);
}

.gmz-tooltip__bubble--left {
  right: 100%;
  top: 50%;
  margin-right: 8px;
  transform: translateY(-50%);
}

.gmz-tooltip__bubble--right {
  left: 100%;
  top: 50%;
  margin-left: 8px;
  transform: translateY(-50%);
}
</style>
