import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renderiza el contenido del slot por defecto', () => {
    const wrapper = mount(Button, { slots: { default: 'Guardar' } })
    expect(wrapper.text()).toContain('Guardar')
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('aplica las clases de variant y size', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger', size: 'lg' },
    })
    expect(wrapper.classes()).toContain('gmz-btn--danger')
    expect(wrapper.classes()).toContain('gmz-btn--lg')
  })

  it('usa primary/md por defecto', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('gmz-btn--primary')
    expect(wrapper.classes()).toContain('gmz-btn--md')
  })

  it('emite click al pulsar', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('no emite click cuando está disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('no emite click cuando está loading y expone aria-busy', async () => {
    const wrapper = mount(Button, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.gmz-btn__spinner').exists()).toBe(true)
  })

  it('refleja el prop type en el atributo del button', () => {
    const wrapper = mount(Button, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('renderiza el slot icon cuando no está loading', () => {
    const wrapper = mount(Button, {
      slots: { icon: '<svg data-test="ico" />', default: 'Con icono' },
    })
    expect(wrapper.find('.gmz-btn__icon [data-test="ico"]').exists()).toBe(true)
  })
})
