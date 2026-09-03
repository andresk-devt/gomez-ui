<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from '../../types'

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  size: 'md',
  variant: 'accent',
  showValue: false,
})

const indeterminate = computed(
  () => props.value === undefined || props.value === null,
)

const clamped = computed(() =>
  indeterminate.value
    ? 0
    : Math.min(props.max, Math.max(0, props.value as number)),
)

const pct = computed(() =>
  props.max <= 0 ? 0 : (clamped.value / props.max) * 100,
)

const classes = computed(() => [
  'gmz-progress',
  `gmz-progress--${props.size}`,
  `gmz-progress--${props.variant}`,
  { 'gmz-progress--indeterminate': indeterminate.value },
])
</script>

<template>
  <div class="gmz-progress-wrap">
    <div
      :class="classes"
      role="progressbar"
      :aria-label="label"
      :aria-valuemin="indeterminate ? undefined : 0"
      :aria-valuemax="indeterminate ? undefined : max"
      :aria-valuenow="indeterminate ? undefined : clamped"
    >
      <div
        class="gmz-progress__bar"
        :style="indeterminate ? undefined : { width: `${pct}%` }"
      />
    </div>
    <span
      v-if="showValue && !indeterminate"
      class="gmz-progress__value"
      aria-hidden="true"
    >
      {{ Math.round(pct) }}%
    </span>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-progress-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--gmz-font);
}

.gmz-progress {
  --_h: 8px;
  --_c: var(--gmz-color-accent);

  position: relative;
  flex: 1;
  height: var(--_h);
  overflow: hidden;
  background: var(--gmz-color-surface-2);
  border-radius: var(--gmz-radius-full);
}

.gmz-progress--sm {
  --_h: 5px;
}

.gmz-progress--lg {
  --_h: 12px;
}

.gmz-progress--success {
  --_c: var(--gmz-color-success);
}

.gmz-progress--warning {
  --_c: var(--gmz-color-warning);
}

.gmz-progress--danger {
  --_c: var(--gmz-color-danger);
}

.gmz-progress__bar {
  height: 100%;
  background: var(--_c);
  border-radius: inherit;
  transition: width var(--gmz-transition);
}

.gmz-progress--indeterminate .gmz-progress__bar {
  width: 40%;
  animation: gmz-progress-slide 1.1s ease-in-out infinite;
}

.gmz-progress__value {
  min-width: 3ch;
  font-size: 12px;
  font-weight: 600;
  color: var(--gmz-color-fg-muted);
  text-align: right;
}

@keyframes gmz-progress-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gmz-progress__bar {
    transition: none;
  }
  .gmz-progress--indeterminate .gmz-progress__bar {
    animation-duration: 2.2s;
  }
}
</style>
