import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('renderiza un input y enlaza el label con for/id', () => {
    const wrapper = mount(Input, { props: { label: 'Correo' } })
    const input = wrapper.get('input')
    const label = wrapper.get('label')
    expect(label.text()).toContain('Correo')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('emite update:modelValue al escribir', async () => {
    const wrapper = mount(Input)
    await wrapper.get('input').setValue('hola')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hola'])
  })

  it('refleja el prop type y usa text/md por defecto', () => {
    expect(mount(Input).get('input').attributes('type')).toBe('text')
    expect(mount(Input).classes()).toContain('gmz-input--md')
    const pwd = mount(Input, { props: { type: 'password' } })
    expect(pwd.get('input').attributes('type')).toBe('password')
  })

  it('con error marca aria-invalid, muestra el mensaje con role=alert y lo describe', () => {
    const wrapper = mount(Input, { props: { error: 'Campo obligatorio' } })
    const input = wrapper.get('input')
    const msg = wrapper.get('.gmz-input__message')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(msg.text()).toBe('Campo obligatorio')
    expect(msg.attributes('role')).toBe('alert')
    expect(input.attributes('aria-describedby')).toBe(msg.attributes('id'))
    expect(wrapper.classes()).toContain('gmz-input--invalid')
  })

  it('muestra el hint solo cuando no hay error', () => {
    const hint = mount(Input, {
      props: { hint: 'Usaremos esto para avisarte' },
    })
    expect(hint.get('.gmz-input__message').text()).toBe(
      'Usaremos esto para avisarte',
    )
    const both = mount(Input, { props: { hint: 'pista', error: 'error' } })
    expect(both.get('.gmz-input__message').text()).toBe('error')
  })

  it('propaga disabled y readonly al input nativo', () => {
    const wrapper = mount(Input, { props: { disabled: true, readonly: true } })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.get('input').attributes('readonly')).toBeDefined()
    expect(wrapper.classes()).toContain('gmz-input--disabled')
  })

  it('aplica la clase de size y renderiza los slots prepend/append', () => {
    const wrapper = mount(Input, {
      props: { size: 'lg' },
      slots: {
        prepend: '<i data-test="pre" />',
        append: '<i data-test="post" />',
      },
    })
    expect(wrapper.classes()).toContain('gmz-input--lg')
    expect(wrapper.find('.gmz-input__affix [data-test="pre"]').exists()).toBe(
      true,
    )
    expect(wrapper.find('.gmz-input__affix [data-test="post"]').exists()).toBe(
      true,
    )
  })
})
