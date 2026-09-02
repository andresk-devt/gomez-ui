<script setup lang="ts">
import { computed, useId } from 'vue'
import type { TextareaProps } from '../../types'

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  rows: 3,
  resize: 'vertical',
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
const fieldId = computed(() => props.id ?? `gmz-textarea-${uid}`)
const messageId = computed(() => `${fieldId.value}-msg`)
const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const classes = computed(() => [
  'gmz-textarea',
  `gmz-textarea--${props.size}`,
  `gmz-textarea--resize-${props.resize}`,
  {
    'gmz-textarea--invalid': invalid.value,
    'gmz-textarea--disabled': props.disabled,
  },
])

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <div :class="classes">
    <label v-if="label" :for="fieldId" class="gmz-textarea__label">
      {{ label }}
      <span v-if="required" class="gmz-textarea__required" aria-hidden="true">
        *
      </span>
    </label>

    <textarea
      :id="fieldId"
      class="gmz-textarea__field"
      :value="modelValue"
      :rows="rows"
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

    <p
      v-if="message"
      :id="messageId"
      class="gmz-textarea__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-textarea {
  --_pad-y: 8px;
  --_pad-x: 12px;
  --_font-size: 15px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-textarea--sm {
  --_pad-y: 6px;
  --_pad-x: 10px;
  --_font-size: 13px;
}

.gmz-textarea--lg {
  --_pad-y: 10px;
  --_pad-x: 14px;
  --_font-size: 17px;
}

.gmz-textarea__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--gmz-color-fg-muted);
}

.gmz-textarea__required {
  color: var(--gmz-color-danger);
}

.gmz-textarea__field {
  width: 100%;
  padding: var(--_pad-y) var(--_pad-x);
  font: inherit;
  font-size: var(--_font-size);
  line-height: 1.5;
  color: inherit;
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border);
  border-radius: var(--gmz-radius);
  outline: none;
  transition:
    border-color var(--gmz-transition),
    box-shadow var(--gmz-transition);
}

.gmz-textarea__field::placeholder {
  color: var(--gmz-color-fg-subtle);
}

.gmz-textarea__field:focus-visible {
  border-color: var(--gmz-color-accent);
  box-shadow: 0 0 0 3px var(--gmz-color-accent-soft);
}

.gmz-textarea--invalid .gmz-textarea__field {
  border-color: var(--gmz-color-danger);
}

.gmz-textarea--invalid .gmz-textarea__field:focus-visible {
  box-shadow: 0 0 0 3px var(--gmz-color-danger-soft);
}

.gmz-textarea--disabled .gmz-textarea__field {
  background: var(--gmz-color-surface-2);
  opacity: 0.7;
  cursor: not-allowed;
}

.gmz-textarea--resize-none .gmz-textarea__field {
  resize: none;
}

.gmz-textarea--resize-vertical .gmz-textarea__field {
  resize: vertical;
}

.gmz-textarea--resize-both .gmz-textarea__field {
  resize: both;
}

.gmz-textarea__message {
  margin: 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-textarea--invalid .gmz-textarea__message {
  color: var(--gmz-color-danger);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-textarea__field {
    transition: none;
  }
}
</style>
