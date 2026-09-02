import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from './Switch.vue'

describe('Switch', () => {
  it('renderiza un input role="switch" con el label enlazado', () => {
    const wrapper = mount(Switch, { props: { label: 'Notificaciones' } })
    const input = wrapper.get('input')
    expect(input.attributes('role')).toBe('switch')
    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
    expect(wrapper.get('.gmz-switch__label').text()).toContain('Notificaciones')
  })

  it('emite update:modelValue al alternar', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('refleja el estado checked', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('gmz-switch--checked')
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(
      true,
    )
  })

  it('con error marca aria-invalid y muestra el mensaje con role=alert', () => {
    const wrapper = mount(Switch, { props: { error: 'Obligatorio' } })
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    const msg = wrapper.get('.gmz-switch__message')
    expect(msg.text()).toBe('Obligatorio')
    expect(msg.attributes('role')).toBe('alert')
  })

  it('aplica la clase de size y propaga disabled', () => {
    const wrapper = mount(Switch, { props: { size: 'sm', disabled: true } })
    expect(wrapper.classes()).toContain('gmz-switch--sm')
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('gmz-switch--disabled')
  })
})
