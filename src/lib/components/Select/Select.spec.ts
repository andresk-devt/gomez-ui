import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from './Select.vue'

const options = [
  { label: 'Uno', value: 1 },
  { label: 'Dos', value: 2 },
  { label: 'Tres', value: 3, disabled: true },
]

describe('Select', () => {
  it('renderiza una opción por entrada y admite strings sueltos', () => {
    const wrapper = mount(Select, { props: { options: ['a', 'b'] } })
    const opts = wrapper.findAll('option')
    expect(opts).toHaveLength(2)
    expect(opts[0].text()).toBe('a')
  })

  it('enlaza el label y marca la opción disabled', () => {
    const wrapper = mount(Select, { props: { label: 'Número', options } })
    const select = wrapper.get('select')
    expect(wrapper.get('label').attributes('for')).toBe(select.attributes('id'))
    expect(wrapper.findAll('option')[2].attributes('disabled')).toBeDefined()
  })

  it('preselecciona el modelValue', () => {
    const wrapper = mount(Select, { props: { options, modelValue: 2 } })
    expect((wrapper.get('select').element as HTMLSelectElement).value).toBe('2')
  })

  it('emite update:modelValue y change con el valor original tipado', async () => {
    const wrapper = mount(Select, { props: { options } })
    await wrapper.get('select').setValue('2')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')?.[0]).toEqual([2])
  })

  it('muestra el placeholder como opción deshabilitada y estado placeholder', () => {
    const wrapper = mount(Select, {
      props: { options, placeholder: 'Elige…' },
    })
    const first = wrapper.findAll('option')[0]
    expect(first.text()).toBe('Elige…')
    expect(first.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('gmz-select--placeholder')
  })

  it('con error marca aria-invalid y muestra el mensaje con role=alert', () => {
    const wrapper = mount(Select, { props: { options, error: 'Requerido' } })
    expect(wrapper.get('select').attributes('aria-invalid')).toBe('true')
    const msg = wrapper.get('.gmz-select__message')
    expect(msg.text()).toBe('Requerido')
    expect(msg.attributes('role')).toBe('alert')
  })

  it('aplica la clase de size y propaga disabled', () => {
    const wrapper = mount(Select, {
      props: { options, size: 'sm', disabled: true },
    })
    expect(wrapper.classes()).toContain('gmz-select--sm')
    expect(wrapper.get('select').attributes('disabled')).toBeDefined()
  })
})
