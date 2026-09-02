import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

describe('Checkbox', () => {
  it('renderiza un checkbox nativo con el label enlazado', () => {
    const wrapper = mount(Checkbox, { props: { label: 'Acepto' } })
    const input = wrapper.get('input[type="checkbox"]')
    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
    expect(wrapper.get('.gmz-checkbox__label').text()).toContain('Acepto')
  })

  it('emite update:modelValue con el nuevo estado', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('refleja checked e indeterminate', async () => {
    const checked = mount(Checkbox, { props: { modelValue: true } })
    expect(checked.classes()).toContain('gmz-checkbox--checked')
    expect((checked.get('input').element as HTMLInputElement).checked).toBe(
      true,
    )

    const ind = mount(Checkbox, { props: { indeterminate: true } })
    expect(ind.classes()).toContain('gmz-checkbox--indeterminate')
    expect((ind.get('input').element as HTMLInputElement).indeterminate).toBe(
      true,
    )
  })

  it('con error marca aria-invalid y muestra el mensaje con role=alert', () => {
    const wrapper = mount(Checkbox, { props: { error: 'Debes aceptar' } })
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    const msg = wrapper.get('.gmz-checkbox__message')
    expect(msg.text()).toBe('Debes aceptar')
    expect(msg.attributes('role')).toBe('alert')
  })

  it('aplica la clase de size y propaga disabled', () => {
    const wrapper = mount(Checkbox, { props: { size: 'lg', disabled: true } })
    expect(wrapper.classes()).toContain('gmz-checkbox--lg')
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('gmz-checkbox--disabled')
  })
})
