<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from '../../types'

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'elevated',
  padding: 'md',
})

const classes = computed(() => [
  'gmz-card',
  `gmz-card--${props.variant}`,
  `gmz-card--pad-${props.padding}`,
])
</script>

<template>
  <div :class="classes">
    <header v-if="$slots.header || title" class="gmz-card__header">
      <slot name="header">
        <h3 class="gmz-card__title">{{ title }}</h3>
      </slot>
    </header>

    <div class="gmz-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="gmz-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-card {
  --_pad: var(--gmz-space-4);

  display: flex;
  flex-direction: column;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
  background: var(--gmz-color-surface);
  border: 1px solid transparent;
  border-radius: var(--gmz-radius-lg);
  overflow: hidden;
}

.gmz-card--pad-none {
  --_pad: 0;
}

.gmz-card--pad-sm {
  --_pad: var(--gmz-space-3);
}

.gmz-card--pad-lg {
  --_pad: var(--gmz-space-5);
}

.gmz-card--elevated {
  box-shadow: var(--gmz-shadow);
}

.gmz-card--outlined {
  border-color: var(--gmz-color-border);
}

.gmz-card--filled {
  background: var(--gmz-color-surface-2);
}

.gmz-card__header {
  padding: var(--_pad);
  border-bottom: 1px solid var(--gmz-color-border);
}

.gmz-card__body {
  flex: 1;
  padding: var(--_pad);
}

.gmz-card__footer {
  padding: var(--_pad);
  border-top: 1px solid var(--gmz-color-border);
}

.gmz-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
