import type { InjectionKey, Ref } from 'vue'
import type { Size } from '../../types'

export interface RadioGroupContext {
  name: Ref<string>
  modelValue: Ref<string | number | undefined>
  size: Ref<Size>
  disabled: Ref<boolean>
  select: (value: string | number) => void
}

/** Clave de inyección que `RadioGroup` provee y `Radio` consume. */
export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol('gmz-radio-group')
