<script setup lang="ts">
import { computed, provide, toRef, useId } from 'vue'
import type { RadioGroupProps, RadioOptionObject } from '../../types'
import { Radio } from '../Radio'
import { radioGroupKey } from './context'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
  size: 'md',
  disabled: false,
  required: false,
  orientation: 'vertical',
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const uid = useId()
const groupName = computed(() => props.name ?? `gmz-radio-group-${uid}`)
const labelId = computed(() => `${groupName.value}-label`)
const messageId = computed(() => `${groupName.value}-msg`)
const invalid = computed(() => Boolean(props.error))
const message = computed(() => props.error || props.hint || '')

const normalized = computed<RadioOptionObject[]>(() =>
  props.options.map((o) =>
    typeof o === 'object' ? o : { label: String(o), value: o },
  ),
)

function select(value: string | number) {
  emit('update:modelValue', value)
}

provide(radioGroupKey, {
  name: groupName,
  modelValue: toRef(props, 'modelValue'),
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled'),
  select,
})

const classes = computed(() => [
  'gmz-radio-group',
  `gmz-radio-group--${props.orientation}`,
  { 'gmz-radio-group--invalid': invalid.value },
])
</script>

<template>
  <div
    :class="classes"
    role="radiogroup"
    :aria-labelledby="label ? labelId : undefined"
    :aria-describedby="message ? messageId : undefined"
    :aria-invalid="invalid || undefined"
  >
    <span v-if="label" :id="labelId" class="gmz-radio-group__label">
      {{ label }}
      <span
        v-if="required"
        class="gmz-radio-group__required"
        aria-hidden="true"
      >
        *
      </span>
    </span>

    <div class="gmz-radio-group__options">
      <slot>
        <Radio
          v-for="opt in normalized"
          :key="String(opt.value)"
          :value="opt.value"
          :label="opt.label"
          :disabled="opt.disabled"
        />
      </slot>
    </div>

    <p
      v-if="message"
      :id="messageId"
      class="gmz-radio-group__message"
      :role="invalid ? 'alert' : undefined"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--gmz-font);
  color: var(--gmz-color-fg);
}

.gmz-radio-group__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--gmz-color-fg-muted);
}

.gmz-radio-group__required {
  color: var(--gmz-color-danger);
}

.gmz-radio-group__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gmz-radio-group--horizontal .gmz-radio-group__options {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.gmz-radio-group__message {
  margin: 0;
  font-size: 12px;
  color: var(--gmz-color-fg-muted);
}

.gmz-radio-group--invalid .gmz-radio-group__message {
  color: var(--gmz-color-danger);
}
</style>
