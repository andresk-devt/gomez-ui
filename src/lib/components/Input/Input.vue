<script setup lang="ts">
import { computed, useId } from 'vue'
import type { InputProps } from '../../types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const uid = useId()
const fieldId = computed(() => props.id ?? `gmz-input-${uid}`)
const messageId = computed(() => `${fieldId.value}-msg`)

const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const classes = computed(() => [
  'gmz-input',
  `gmz-input--${props.size}`,
  {
    'gmz-input--invalid': invalid.value,
    'gmz-input--disabled': props.disabled,
  },
])

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="classes">
    <label v-if="label" :for="fieldId" class="gmz-input__label">
      {{ label }}
      <span v-if="required" class="gmz-input__required" aria-hidden="true">
        *
      </span>
    </label>

    <div class="gmz-input__control">
      <span v-if="$slots.prepend" class="gmz-input__affix">
        <slot name="prepend" />
      </span>

      <input
        :id="fieldId"
        class="gmz-input__field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="message ? messageId : undefined"
        @input="onInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <span v-if="$slots.append" class="gmz-input__affix">
        <slot name="append" />
      </span>
    </div>

    <p
      v-if="message"
      :id="messageId"
      class="gmz-input__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-input {
  --_pad-y: 8px;
  --_pad-x: 12px;
  --_font-size: 15px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-input--sm {
  --_pad-y: 5px;
  --_pad-x: 10px;
  --_font-size: 13px;
}

.gmz-input--lg {
  --_pad-y: 11px;
  --_pad-x: 14px;
  --_font-size: 17px;
}

.gmz-input__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--gmz-color-fg-muted);
}

.gmz-input__required {
  color: var(--gmz-color-danger);
}

.gmz-input__control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 var(--_pad-x);
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border);
  border-radius: var(--gmz-radius);
  transition:
    border-color var(--gmz-transition),
    box-shadow var(--gmz-transition);
}

.gmz-input__control:focus-within {
  border-color: var(--gmz-color-accent);
  box-shadow: 0 0 0 3px var(--gmz-color-accent-soft);
}

.gmz-input--invalid .gmz-input__control {
  border-color: var(--gmz-color-danger);
}

.gmz-input--invalid .gmz-input__control:focus-within {
  box-shadow: 0 0 0 3px var(--gmz-color-danger-soft);
}

.gmz-input--disabled .gmz-input__control {
  background: var(--gmz-color-surface-2);
  opacity: 0.7;
  cursor: not-allowed;
}

.gmz-input__field {
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: var(--_pad-y) 0;
  font: inherit;
  font-size: var(--_font-size);
  color: inherit;
  background: transparent;
  border: 0;
  outline: none;
}

.gmz-input__field::placeholder {
  color: var(--gmz-color-fg-subtle);
}

.gmz-input__field:disabled {
  cursor: not-allowed;
}

.gmz-input__affix {
  display: inline-flex;
  align-items: center;
  color: var(--gmz-color-fg-subtle);
}

.gmz-input__message {
  margin: 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-input--invalid .gmz-input__message {
  color: var(--gmz-color-danger);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-input__control {
    transition: none;
  }
}
</style>
