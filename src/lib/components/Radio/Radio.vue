<script setup lang="ts">
import { computed, inject, useId } from 'vue'
import type { RadioProps } from '../../types'
import { radioGroupKey } from '../RadioGroup/context'

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const group = inject(radioGroupKey, null)

const uid = useId()
const fieldId = computed(() => `gmz-radio-${uid}`)

const checked = computed(() =>
  group
    ? group.modelValue.value === props.value
    : props.modelValue === props.value,
)

const name = computed(
  () => group?.name.value ?? props.name ?? `gmz-radio-${uid}`,
)
const size = computed(() => props.size ?? group?.size.value ?? 'md')
const disabled = computed(
  () => props.disabled || (group?.disabled.value ?? false),
)

function onChange() {
  if (disabled.value) return
  if (group) group.select(props.value)
  else emit('update:modelValue', props.value)
}

const classes = computed(() => [
  'gmz-radio',
  `gmz-radio--${size.value}`,
  {
    'gmz-radio--checked': checked.value,
    'gmz-radio--disabled': disabled.value,
  },
])
</script>

<template>
  <label :class="classes" :for="fieldId">
    <input
      :id="fieldId"
      class="gmz-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="gmz-radio__dot" aria-hidden="true" />
    <span v-if="label || $slots.default" class="gmz-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-radio {
  --_size: 18px;
  --_font: 15px;

  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
  cursor: pointer;
}

.gmz-radio--sm {
  --_size: 16px;
  --_font: 13px;
}

.gmz-radio--lg {
  --_size: 22px;
  --_font: 17px;
}

.gmz-radio--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.gmz-radio__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}

.gmz-radio__dot {
  position: relative;
  flex-shrink: 0;
  width: var(--_size);
  height: var(--_size);
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border-strong);
  border-radius: 50%;
  transition:
    border-color var(--gmz-transition),
    box-shadow var(--gmz-transition);
}

.gmz-radio__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  background: var(--gmz-color-fg-on-accent);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity var(--gmz-transition),
    transform var(--gmz-transition);
}

.gmz-radio--checked .gmz-radio__dot {
  background: var(--gmz-color-accent);
  border-color: var(--gmz-color-accent);
}

.gmz-radio--checked .gmz-radio__dot::after {
  opacity: 1;
  transform: scale(1);
}

.gmz-radio__input:focus-visible + .gmz-radio__dot {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-radio__label {
  font-size: var(--_font);
  line-height: 1.3;
}

@media (prefers-reduced-motion: reduce) {
  .gmz-radio__dot,
  .gmz-radio__dot::after {
    transition: none;
  }
}
</style>
