import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from './Accordion.vue'

const items = [
  { label: 'Uno', value: 'a' },
  { label: 'Dos', value: 'b' },
  { label: 'Tres', value: 'c', disabled: true },
]

const slots = {
  a: '<p data-test="a">Contenido A</p>',
  b: '<p data-test="b">Contenido B</p>',
}

describe('Accordion', () => {
  it('renderiza una cabecera-botón por item con aria-expanded y panel enlazado', () => {
    const wrapper = mount(Accordion, { props: { items }, slots })
    const triggers = wrapper.findAll('.gmz-accordion__trigger')
    expect(triggers).toHaveLength(3)
    expect(triggers[0].attributes('aria-expanded')).toBe('false')
    expect(triggers[2].attributes('disabled')).toBeDefined()
    const panel = wrapper.get(`#${triggers[0].attributes('aria-controls')}`)
    expect(panel.attributes('aria-labelledby')).toBe(
      triggers[0].attributes('id'),
    )
  })

  it('oculta los paneles cerrados con [hidden]', () => {
    const wrapper = mount(Accordion, { props: { items }, slots })
    expect(
      wrapper.get('.gmz-accordion__panel').attributes('hidden'),
    ).toBeDefined()
  })

  it('al abrir un item emite el value; al reabrir emite null (modo simple)', async () => {
    const wrapper = mount(Accordion, {
      props: { items, modelValue: null },
      slots,
    })
    await wrapper.findAll('.gmz-accordion__trigger')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])

    await wrapper.setProps({ modelValue: 'a' })
    await wrapper.findAll('.gmz-accordion__trigger')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([null])
  })

  it('modo simple: solo un panel abierto refleja aria-expanded', () => {
    const wrapper = mount(Accordion, {
      props: { items, modelValue: 'b' },
      slots,
    })
    const triggers = wrapper.findAll('.gmz-accordion__trigger')
    expect(triggers[0].attributes('aria-expanded')).toBe('false')
    expect(triggers[1].attributes('aria-expanded')).toBe('true')
    expect(
      wrapper.findAll('.gmz-accordion__panel')[1].attributes('hidden'),
    ).toBeUndefined()
  })

  it('multiple: alterna sobre un array de values', async () => {
    const wrapper = mount(Accordion, {
      props: { items, multiple: true, modelValue: ['a'] },
      slots,
    })
    await wrapper.findAll('.gmz-accordion__trigger')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b']])
  })

  it('aplica la clase de size', () => {
    const wrapper = mount(Accordion, { props: { items, size: 'lg' }, slots })
    expect(wrapper.classes()).toContain('gmz-accordion--lg')
  })
})
