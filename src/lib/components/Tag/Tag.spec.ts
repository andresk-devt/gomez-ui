import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from './Tag.vue'

describe('Tag', () => {
  it('renderiza el slot dentro de un span', () => {
    const wrapper = mount(Tag, { slots: { default: 'Nuevo' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.get('.gmz-tag__label').text()).toBe('Nuevo')
  })

  it('usa neutral/md/soft por defecto', () => {
    const wrapper = mount(Tag)
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'gmz-tag--neutral',
        'gmz-tag--md',
        'gmz-tag--soft',
      ]),
    )
  })

  it('aplica variant, size y appearance', () => {
    const wrapper = mount(Tag, {
      props: { variant: 'success', size: 'lg', appearance: 'outline' },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'gmz-tag--success',
        'gmz-tag--lg',
        'gmz-tag--outline',
      ]),
    )
  })

  it('muestra el punto con dot', () => {
    expect(mount(Tag).find('.gmz-tag__dot').exists()).toBe(false)
    expect(
      mount(Tag, { props: { dot: true } })
        .find('.gmz-tag__dot')
        .exists(),
    ).toBe(true)
  })

  it('renderiza el slot icon', () => {
    const wrapper = mount(Tag, { slots: { icon: '<i data-test="i" />' } })
    expect(wrapper.find('.gmz-tag__icon [data-test="i"]').exists()).toBe(true)
  })

  it('con closable expone un botón accesible que emite close', async () => {
    expect(mount(Tag).find('.gmz-tag__close').exists()).toBe(false)
    const wrapper = mount(Tag, { props: { closable: true } })
    const btn = wrapper.get('.gmz-tag__close')
    expect(btn.attributes('aria-label')).toBe('Quitar')
    await btn.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
