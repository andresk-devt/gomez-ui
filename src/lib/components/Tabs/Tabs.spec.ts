import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from './Tabs.vue'

const items = [
  { label: 'General', value: 'general' },
  { label: 'Seguridad', value: 'security' },
  { label: 'Facturación', value: 'billing', disabled: true },
]

const slots = {
  general: '<p data-test="p">Panel general</p>',
  security: '<p data-test="p">Panel seguridad</p>',
}

describe('Tabs', () => {
  it('renderiza un tab por item con roles y aria', () => {
    const wrapper = mount(Tabs, { props: { items }, slots })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(3)
    expect(tabs[2].attributes('disabled')).toBeDefined()
    const panel = wrapper.get('[role="tabpanel"]')
    expect(panel.attributes('aria-labelledby')).toBe(tabs[0].attributes('id'))
  })

  it('sin modelValue activa el primer item habilitado y muestra su panel', () => {
    const wrapper = mount(Tabs, { props: { items }, slots })
    expect(wrapper.get('[role="tab"]').attributes('aria-selected')).toBe('true')
    expect(wrapper.get('[data-test="p"]').text()).toBe('Panel general')
  })

  it('al hacer clic en un tab emite update:modelValue', async () => {
    const wrapper = mount(Tabs, { props: { items }, slots })
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['security'])
  })

  it('respeta el modelValue controlado', () => {
    const wrapper = mount(Tabs, {
      props: { items, modelValue: 'security' },
      slots,
    })
    expect(wrapper.get('[data-test="p"]').text()).toBe('Panel seguridad')
    expect(wrapper.findAll('[role="tab"]')[1].attributes('aria-selected')).toBe(
      'true',
    )
  })

  it('ArrowRight mueve al siguiente tab habilitado (saltando disabled)', async () => {
    const wrapper = mount(Tabs, {
      props: { items, modelValue: 'security' },
      slots,
    })
    await wrapper
      .get('[role="tablist"]')
      .trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['general'])
  })

  it('aplica clases de variant, size y fitted', () => {
    const wrapper = mount(Tabs, {
      props: { items, variant: 'pill', size: 'lg', fitted: true },
      slots,
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'gmz-tabs--pill',
        'gmz-tabs--lg',
        'gmz-tabs--fitted',
      ]),
    )
  })
})
