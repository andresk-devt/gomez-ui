import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioGroup from './RadioGroup.vue'
import Radio from '../Radio/Radio.vue'

const options = [
  { label: 'Uno', value: 1 },
  { label: 'Dos', value: 2 },
  { label: 'Tres', value: 3, disabled: true },
]

describe('RadioGroup', () => {
  it('expone role="radiogroup" y enlaza el label', () => {
    const wrapper = mount(RadioGroup, { props: { label: 'Número', options } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
    const labelledby = wrapper.attributes('aria-labelledby')
    expect(wrapper.get(`#${labelledby}`).text()).toContain('Número')
  })

  it('renderiza un radio por opción y respeta disabled por opción', () => {
    const wrapper = mount(RadioGroup, { props: { options } })
    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios).toHaveLength(3)
    expect(radios[2].attributes('disabled')).toBeDefined()
  })

  it('marca la opción cuyo value coincide con modelValue', () => {
    const wrapper = mount(RadioGroup, { props: { options, modelValue: 2 } })
    const radios = wrapper.findAll('input')
    expect((radios[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('al seleccionar una opción emite update:modelValue en el grupo', async () => {
    const wrapper = mount(RadioGroup, { props: { options, modelValue: 1 } })
    await wrapper.findAll('input')[1].trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('comparte name entre todos los radios', () => {
    const wrapper = mount(RadioGroup, { props: { options } })
    const names = wrapper.findAll('input').map((r) => r.attributes('name'))
    expect(new Set(names).size).toBe(1)
  })

  it('propaga size y disabled a los <Radio> hijos del slot', async () => {
    const wrapper = mount(RadioGroup, {
      props: { size: 'lg', disabled: true },
      slots: {
        default: '<Radio value="x" label="X" />',
      },
      global: { components: { Radio } },
    })
    const radio = wrapper.getComponent(Radio)
    expect(radio.classes()).toContain('gmz-radio--lg')
    expect(radio.classes()).toContain('gmz-radio--disabled')
    await radio.get('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('muestra el mensaje de error con role=alert', () => {
    const wrapper = mount(RadioGroup, {
      props: { options, error: 'Elige una opción' },
    })
    const msg = wrapper.get('.gmz-radio-group__message')
    expect(msg.text()).toBe('Elige una opción')
    expect(msg.attributes('role')).toBe('alert')
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })
})
