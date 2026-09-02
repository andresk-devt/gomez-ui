import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'

describe('Alert', () => {
  it('renderiza el slot con role="alert" y variant info por defecto', () => {
    const wrapper = mount(Alert, { slots: { default: 'Algo pasó' } })
    expect(wrapper.get('[role="alert"]').text()).toContain('Algo pasó')
    expect(wrapper.classes()).toContain('gmz-alert--info')
  })

  it('aplica la clase de variant', () => {
    const wrapper = mount(Alert, { props: { variant: 'danger' } })
    expect(wrapper.classes()).toContain('gmz-alert--danger')
  })

  it('muestra el título cuando se pasa el prop', () => {
    const wrapper = mount(Alert, { props: { title: 'Atención' } })
    expect(wrapper.get('.gmz-alert__title').text()).toBe('Atención')
  })

  it('oculta el icono con hideIcon', () => {
    expect(mount(Alert).find('.gmz-alert__icon').exists()).toBe(true)
    const wrapper = mount(Alert, { props: { hideIcon: true } })
    expect(wrapper.find('.gmz-alert__icon').exists()).toBe(false)
  })

  it('sin closable no hay botón de cierre', () => {
    expect(mount(Alert).find('.gmz-alert__close').exists()).toBe(false)
  })

  it('con closable, al pulsar cierra el aviso y emite close', async () => {
    const wrapper = mount(Alert, {
      props: { closable: true },
      slots: { default: 'texto' },
    })
    const btn = wrapper.get('.gmz-alert__close')
    expect(btn.attributes('aria-label')).toBe('Cerrar')
    await btn.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
