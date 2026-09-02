import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from './Spinner.vue'

describe('Spinner', () => {
  it('expone role="status" y una etiqueta accesible por defecto', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.get('.gmz-spinner__label').text()).toBe('Cargando')
  })

  it('permite personalizar la etiqueta', () => {
    const wrapper = mount(Spinner, { props: { label: 'Procesando' } })
    expect(wrapper.get('.gmz-spinner__label').text()).toBe('Procesando')
  })

  it('aplica la clase de size y color', () => {
    const wrapper = mount(Spinner, { props: { size: 'lg', color: 'fg' } })
    expect(wrapper.classes()).toContain('gmz-spinner--lg')
    expect(wrapper.classes()).toContain('gmz-spinner--fg')
  })

  it('acepta un size numérico como custom property', () => {
    const wrapper = mount(Spinner, { props: { size: 20 } })
    expect(wrapper.attributes('style')).toContain('--_size: 20px')
    expect(wrapper.classes().some((c) => c.startsWith('gmz-spinner--sm'))).toBe(
      false,
    )
  })
})
