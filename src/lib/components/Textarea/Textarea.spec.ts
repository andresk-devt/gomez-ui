import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from './Textarea.vue'

describe('Textarea', () => {
  it('renderiza un textarea con el label enlazado y rows por defecto', () => {
    const wrapper = mount(Textarea, { props: { label: 'Notas' } })
    const field = wrapper.get('textarea')
    expect(wrapper.get('label').attributes('for')).toBe(field.attributes('id'))
    expect(field.attributes('rows')).toBe('3')
  })

  it('emite update:modelValue al escribir', async () => {
    const wrapper = mount(Textarea)
    await wrapper.get('textarea').setValue('hola mundo')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hola mundo'])
  })

  it('con error marca aria-invalid y muestra el mensaje con role=alert', () => {
    const wrapper = mount(Textarea, { props: { error: 'Campo obligatorio' } })
    const field = wrapper.get('textarea')
    expect(field.attributes('aria-invalid')).toBe('true')
    const msg = wrapper.get('.gmz-textarea__message')
    expect(msg.text()).toBe('Campo obligatorio')
    expect(msg.attributes('role')).toBe('alert')
    expect(field.attributes('aria-describedby')).toBe(msg.attributes('id'))
  })

  it('muestra el hint solo cuando no hay error', () => {
    const both = mount(Textarea, { props: { hint: 'pista', error: 'error' } })
    expect(both.get('.gmz-textarea__message').text()).toBe('error')
  })

  it('aplica las clases de size y resize y propaga disabled/readonly', () => {
    const wrapper = mount(Textarea, {
      props: { size: 'lg', resize: 'none', disabled: true, readonly: true },
    })
    expect(wrapper.classes()).toContain('gmz-textarea--lg')
    expect(wrapper.classes()).toContain('gmz-textarea--resize-none')
    expect(wrapper.get('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.get('textarea').attributes('readonly')).toBeDefined()
  })
})
