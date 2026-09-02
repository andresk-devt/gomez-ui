<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { AvatarProps } from '../../types'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  shape: 'circle',
  variant: 'neutral',
})

const failed = ref(false)
watch(
  () => props.src,
  () => {
    failed.value = false
  },
)

const showImg = computed(() => Boolean(props.src) && !failed.value)

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
})

const style = computed(() =>
  typeof props.size === 'number' ? { '--_size': `${props.size}px` } : undefined,
)

const classes = computed(() => [
  'gmz-avatar',
  typeof props.size === 'string' ? `gmz-avatar--${props.size}` : null,
  `gmz-avatar--${props.shape}`,
  `gmz-avatar--${props.variant}`,
])
</script>

<template>
  <span :class="classes" :style="style">
    <img
      v-if="showImg"
      class="gmz-avatar__img"
      :src="src"
      :alt="alt ?? name ?? ''"
      @error="failed = true"
    />
    <slot v-else>
      <span v-if="initials" class="gmz-avatar__initials">{{ initials }}</span>
      <svg
        v-else
        class="gmz-avatar__icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z"
        />
      </svg>
    </slot>
  </span>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-avatar {
  --_size: 36px;
  --_font: 14px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--_size);
  height: var(--_size);
  overflow: hidden;
  font-family: var(--gmz-font);
  font-size: var(--_font);
  font-weight: 600;
  line-height: 1;
  color: var(--_c, var(--gmz-color-fg-muted));
  background: var(--_bg, var(--gmz-color-surface-2));
  user-select: none;
}

.gmz-avatar--sm {
  --_size: 28px;
  --_font: 12px;
}

.gmz-avatar--lg {
  --_size: 48px;
  --_font: 18px;
}

.gmz-avatar--circle {
  border-radius: var(--gmz-radius-full);
}

.gmz-avatar--rounded {
  border-radius: var(--gmz-radius);
}

.gmz-avatar--square {
  border-radius: 0;
}

.gmz-avatar--accent {
  --_c: var(--gmz-color-accent);
  --_bg: var(--gmz-color-accent-soft);
}

.gmz-avatar--success {
  --_c: var(--gmz-color-success);
  --_bg: var(--gmz-color-success-soft);
}

.gmz-avatar--warning {
  --_c: var(--gmz-color-warning);
  --_bg: var(--gmz-color-warning-soft);
}

.gmz-avatar--danger {
  --_c: var(--gmz-color-danger);
  --_bg: var(--gmz-color-danger-soft);
}

.gmz-avatar--info {
  --_c: var(--gmz-color-info);
  --_bg: var(--gmz-color-info-soft);
}

.gmz-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gmz-avatar__icon {
  width: 70%;
  height: 70%;
}
</style>
