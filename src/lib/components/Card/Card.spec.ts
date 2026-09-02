import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('Card', () => {
  it('renderiza el contenido por defecto en el body', () => {
    const wrapper = mount(Card, { slots: { default: 'Contenido' } })
    expect(wrapper.get('.gmz-card__body').text()).toBe('Contenido')
  })

  it('usa elevated/md por defecto', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('gmz-card--elevated')
    expect(wrapper.classes()).toContain('gmz-card--pad-md')
  })

  it('aplica las clases de variant y padding', () => {
    const wrapper = mount(Card, {
      props: { variant: 'outlined', padding: 'none' },
    })
    expect(wrapper.classes()).toContain('gmz-card--outlined')
    expect(wrapper.classes()).toContain('gmz-card--pad-none')
  })

  it('muestra el título con el prop title cuando no hay slot header', () => {
    const wrapper = mount(Card, { props: { title: 'Resumen' } })
    expect(wrapper.get('.gmz-card__header .gmz-card__title').text()).toBe(
      'Resumen',
    )
  })

  it('el slot header sustituye al prop title', () => {
    const wrapper = mount(Card, {
      props: { title: 'ignorado' },
      slots: { header: '<div data-test="h">Custom</div>' },
    })
    expect(wrapper.find('[data-test="h"]').exists()).toBe(true)
    expect(wrapper.find('.gmz-card__title').exists()).toBe(false)
  })

  it('el footer solo se renderiza si hay slot', () => {
    expect(mount(Card).find('.gmz-card__footer').exists()).toBe(false)
    const wrapper = mount(Card, { slots: { footer: 'pie' } })
    expect(wrapper.get('.gmz-card__footer').text()).toBe('pie')
  })
})
