<script setup lang="ts">
import { computed, useId } from 'vue'
import type { SwitchProps } from '../../types'

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'md',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const uid = useId()
const fieldId = computed(() => props.id ?? `gmz-switch-${uid}`)
const messageId = computed(() => `${fieldId.value}-msg`)
const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const classes = computed(() => [
  'gmz-switch',
  `gmz-switch--${props.size}`,
  {
    'gmz-switch--checked': props.modelValue,
    'gmz-switch--invalid': invalid.value,
    'gmz-switch--disabled': props.disabled,
  },
])

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <div :class="classes">
    <label class="gmz-switch__row" :for="fieldId">
      <input
        :id="fieldId"
        class="gmz-switch__input"
        type="checkbox"
        role="switch"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="message ? messageId : undefined"
        @change="onChange"
      />
      <span class="gmz-switch__track" aria-hidden="true">
        <span class="gmz-switch__thumb" />
      </span>
      <span v-if="label || $slots.default" class="gmz-switch__label">
        <slot>{{ label }}</slot>
        <span v-if="required" class="gmz-switch__required" aria-hidden="true">
          *
        </span>
      </span>
    </label>

    <p
      v-if="message"
      :id="messageId"
      class="gmz-switch__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-switch {
  --_w: 40px;
  --_h: 22px;
  --_font: 15px;

  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-switch--sm {
  --_w: 34px;
  --_h: 18px;
  --_font: 13px;
}

.gmz-switch--lg {
  --_w: 48px;
  --_h: 26px;
  --_font: 17px;
}

.gmz-switch__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.gmz-switch--disabled .gmz-switch__row {
  cursor: not-allowed;
  opacity: 0.6;
}

.gmz-switch__input {
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

.gmz-switch__track {
  position: relative;
  flex-shrink: 0;
  width: var(--_w);
  height: var(--_h);
  background: var(--gmz-color-border-strong);
  border-radius: var(--gmz-radius-full);
  transition: background-color var(--gmz-transition);
}

.gmz-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(var(--_h) - 4px);
  height: calc(var(--_h) - 4px);
  background: var(--gmz-color-fg-on-accent);
  border-radius: 50%;
  box-shadow: var(--gmz-shadow-sm);
  transition: transform var(--gmz-transition);
}

.gmz-switch--checked .gmz-switch__track {
  background: var(--gmz-color-accent);
}

.gmz-switch--checked .gmz-switch__thumb {
  transform: translateX(calc(var(--_w) - var(--_h)));
}

.gmz-switch--invalid .gmz-switch__track {
  outline: 1px solid var(--gmz-color-danger);
}

.gmz-switch__input:focus-visible + .gmz-switch__track {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-switch__label {
  font-size: var(--_font);
  line-height: 1.3;
}

.gmz-switch__required {
  color: var(--gmz-color-danger);
}

.gmz-switch__message {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-switch--invalid .gmz-switch__message {
  color: var(--gmz-color-danger);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-switch__track,
  .gmz-switch__thumb {
    transition: none;
  }
}
</style>
