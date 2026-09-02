<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonProps } from '../../types'

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  lines: 1,
  animated: true,
})

const toCss = (v?: string | number) =>
  v === undefined ? undefined : typeof v === 'number' ? `${v}px` : v

const baseStyle = computed(() => ({
  width: toCss(props.width),
  height: toCss(props.height),
  borderRadius: toCss(props.radius),
}))

const classes = computed(() => [
  'gmz-skeleton',
  `gmz-skeleton--${props.variant}`,
  { 'gmz-skeleton--animated': props.animated },
])

const isMultiline = computed(() => props.variant === 'text' && props.lines > 1)
</script>

<template>
  <span v-if="isMultiline" class="gmz-skeleton-lines" aria-hidden="true">
    <span
      v-for="n in lines"
      :key="n"
      :class="classes"
      :style="
        n === lines
          ? { ...baseStyle, width: baseStyle.width ?? '65%' }
          : baseStyle
      "
    />
  </span>
  <span v-else :class="classes" :style="baseStyle" aria-hidden="true" />
</template>

<style>
@import '../../styles/tokens.css';

.gmz-skeleton {
  display: block;
  background: var(--gmz-color-surface-2);
}

.gmz-skeleton--animated {
  position: relative;
  overflow: hidden;
}

.gmz-skeleton--animated::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    var(--gmz-color-border) 50%,
    transparent
  );
  animation: gmz-skeleton-shimmer 1.4s ease-in-out infinite;
}

.gmz-skeleton--text {
  width: 100%;
  height: 0.8em;
  margin: 0.15em 0;
  border-radius: var(--gmz-radius-sm);
}

.gmz-skeleton--rect {
  width: 100%;
  height: 120px;
  border-radius: var(--gmz-radius);
}

.gmz-skeleton--circle {
  width: 40px;
  height: 40px;
  border-radius: var(--gmz-radius-full);
}

.gmz-skeleton-lines {
  display: block;
}

@keyframes gmz-skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gmz-skeleton--animated::after {
    animation: none;
  }
}
</style>
