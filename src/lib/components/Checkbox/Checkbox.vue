<script setup lang="ts">
import { computed, ref, useId, watchPostEffect } from 'vue'
import type { CheckboxProps } from '../../types'

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  size: 'md',
  disabled: false,
  required: false,
  indeterminate: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const uid = useId()
const fieldId = computed(() => props.id ?? `gmz-checkbox-${uid}`)
const messageId = computed(() => `${fieldId.value}-msg`)
const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const inputEl = ref<HTMLInputElement | null>(null)
watchPostEffect(() => {
  if (inputEl.value) inputEl.value.indeterminate = props.indeterminate
})

const classes = computed(() => [
  'gmz-checkbox',
  `gmz-checkbox--${props.size}`,
  {
    'gmz-checkbox--checked': props.modelValue,
    'gmz-checkbox--indeterminate': props.indeterminate,
    'gmz-checkbox--invalid': invalid.value,
    'gmz-checkbox--disabled': props.disabled,
  },
])

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <div :class="classes">
    <label class="gmz-checkbox__row" :for="fieldId">
      <input
        :id="fieldId"
        ref="inputEl"
        class="gmz-checkbox__input"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="message ? messageId : undefined"
        @change="onChange"
      />
      <span class="gmz-checkbox__box" aria-hidden="true">
        <svg
          v-if="indeterminate"
          class="gmz-checkbox__mark"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <path d="M4 8h8" />
        </svg>
        <svg
          v-else
          class="gmz-checkbox__mark"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m3 8.5 3.2 3.2L13 5" />
        </svg>
      </span>
      <span v-if="label || $slots.default" class="gmz-checkbox__label">
        <slot>{{ label }}</slot>
        <span v-if="required" class="gmz-checkbox__required" aria-hidden="true">
          *
        </span>
      </span>
    </label>

    <p
      v-if="message"
      :id="messageId"
      class="gmz-checkbox__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-checkbox {
  --_size: 18px;
  --_font: 15px;

  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-checkbox--sm {
  --_size: 16px;
  --_font: 13px;
}

.gmz-checkbox--lg {
  --_size: 22px;
  --_font: 17px;
}

.gmz-checkbox__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.gmz-checkbox--disabled .gmz-checkbox__row {
  cursor: not-allowed;
  opacity: 0.6;
}

.gmz-checkbox__input {
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

.gmz-checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--_size);
  height: var(--_size);
  color: var(--gmz-color-fg-on-accent);
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border-strong);
  border-radius: var(--gmz-radius-sm);
  transition:
    background-color var(--gmz-transition),
    border-color var(--gmz-transition);
}

.gmz-checkbox__mark {
  width: 80%;
  height: 80%;
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity var(--gmz-transition),
    transform var(--gmz-transition);
}

.gmz-checkbox--checked .gmz-checkbox__box,
.gmz-checkbox--indeterminate .gmz-checkbox__box {
  background: var(--gmz-color-accent);
  border-color: var(--gmz-color-accent);
}

.gmz-checkbox--checked .gmz-checkbox__mark,
.gmz-checkbox--indeterminate .gmz-checkbox__mark {
  opacity: 1;
  transform: scale(1);
}

.gmz-checkbox--invalid .gmz-checkbox__box {
  border-color: var(--gmz-color-danger);
}

.gmz-checkbox__input:focus-visible + .gmz-checkbox__box {
  outline: var(--gmz-focus-ring);
  outline-offset: var(--gmz-focus-offset);
}

.gmz-checkbox__label {
  font-size: var(--_font);
  line-height: 1.3;
}

.gmz-checkbox__required {
  color: var(--gmz-color-danger);
}

.gmz-checkbox__message {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-checkbox--invalid .gmz-checkbox__message {
  color: var(--gmz-color-danger);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-checkbox__box,
  .gmz-checkbox__mark {
    transition: none;
  }
}
</style>
