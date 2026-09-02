<script setup lang="ts">
import { computed, useId } from 'vue'
import type { SelectOptionObject, SelectProps } from '../../types'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  size: 'md',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const uid = useId()
const fieldId = computed(() => props.id ?? `gmz-select-${uid}`)
const messageId = computed(() => `${fieldId.value}-msg`)
const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const normalized = computed<SelectOptionObject[]>(() =>
  props.options.map((opt) =>
    typeof opt === 'object' ? opt : { label: String(opt), value: opt },
  ),
)

const currentValue = computed(() =>
  props.modelValue === undefined || props.modelValue === null
    ? ''
    : String(props.modelValue),
)

const classes = computed(() => [
  'gmz-select',
  `gmz-select--${props.size}`,
  {
    'gmz-select--invalid': invalid.value,
    'gmz-select--disabled': props.disabled,
    'gmz-select--placeholder': currentValue.value === '',
  },
])

function onChange(event: Event) {
  const raw = (event.target as HTMLSelectElement).value
  const match = normalized.value.find((o) => String(o.value) === raw)
  const value = match ? match.value : raw
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div :class="classes">
    <label v-if="label" :for="fieldId" class="gmz-select__label">
      {{ label }}
      <span v-if="required" class="gmz-select__required" aria-hidden="true">
        *
      </span>
    </label>

    <div class="gmz-select__control">
      <select
        :id="fieldId"
        class="gmz-select__field"
        :value="currentValue"
        :disabled="disabled"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="message ? messageId : undefined"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="opt in normalized"
          :key="String(opt.value)"
          :value="String(opt.value)"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>

      <span class="gmz-select__chevron" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>

    <p
      v-if="message"
      :id="messageId"
      class="gmz-select__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-select {
  --_pad-y: 8px;
  --_pad-x: 12px;
  --_font-size: 15px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-select--sm {
  --_pad-y: 5px;
  --_pad-x: 10px;
  --_font-size: 13px;
}

.gmz-select--lg {
  --_pad-y: 11px;
  --_pad-x: 14px;
  --_font-size: 17px;
}

.gmz-select__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--gmz-color-fg-muted);
}

.gmz-select__required {
  color: var(--gmz-color-danger);
}

.gmz-select__control {
  position: relative;
  display: flex;
  align-items: center;
}

.gmz-select__field {
  width: 100%;
  padding: var(--_pad-y) calc(var(--_pad-x) + 24px) var(--_pad-y) var(--_pad-x);
  font: inherit;
  font-size: var(--_font-size);
  color: inherit;
  background: var(--gmz-color-surface);
  border: 1px solid var(--gmz-color-border);
  border-radius: var(--gmz-radius);
  outline: none;
  cursor: pointer;
  appearance: none;
  transition:
    border-color var(--gmz-transition),
    box-shadow var(--gmz-transition);
}

.gmz-select__field:focus-visible {
  border-color: var(--gmz-color-accent);
  box-shadow: 0 0 0 3px var(--gmz-color-accent-soft);
}

.gmz-select--invalid .gmz-select__field {
  border-color: var(--gmz-color-danger);
}

.gmz-select--invalid .gmz-select__field:focus-visible {
  box-shadow: 0 0 0 3px var(--gmz-color-danger-soft);
}

.gmz-select--disabled .gmz-select__field {
  background: var(--gmz-color-surface-2);
  opacity: 0.7;
  cursor: not-allowed;
}

.gmz-select--placeholder .gmz-select__field {
  color: var(--gmz-color-fg-subtle);
}

.gmz-select__chevron {
  position: absolute;
  right: var(--_pad-x);
  display: inline-flex;
  color: var(--gmz-color-fg-subtle);
  pointer-events: none;
}

.gmz-select__message {
  margin: 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-select--invalid .gmz-select__message {
  color: var(--gmz-color-danger);
}

@media (prefers-reduced-motion: reduce) {
  .gmz-select__field {
    transition: none;
  }
}
</style>
