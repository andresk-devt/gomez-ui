import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from './Radio.vue'

describe('Radio (suelto)', () => {
  it('renderiza un input radio con label y name propio', () => {
    const wrapper = mount(Radio, { props: { value: 'a', label: 'Opción A' } })
    const input = wrapper.get('input[type="radio"]')
    expect(input.attributes('name')).toBeTruthy()
    expect(wrapper.get('.gmz-radio__label').text()).toBe('Opción A')
  })

  it('marca checked cuando modelValue coincide con value', () => {
    const wrapper = mount(Radio, { props: { value: 'a', modelValue: 'a' } })
    expect(wrapper.classes()).toContain('gmz-radio--checked')
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(
      true,
    )
  })

  it('al cambiar emite update:modelValue con su value', async () => {
    const wrapper = mount(Radio, { props: { value: 'b', modelValue: 'a' } })
    await wrapper.get('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('disabled bloquea el cambio y aplica la clase', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'b', modelValue: 'a', disabled: true },
    })
    await wrapper.get('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('gmz-radio--disabled')
  })

  it('aplica la clase de size', () => {
    const wrapper = mount(Radio, { props: { value: 'a', size: 'lg' } })
    expect(wrapper.classes()).toContain('gmz-radio--lg')
  })
})
