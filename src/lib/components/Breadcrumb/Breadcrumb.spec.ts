import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumb from './Breadcrumb.vue'

const items = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Camisa azul' },
]

describe('Breadcrumb', () => {
  it('usa <nav aria-label> + <ol> y marca el último como página actual', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.findAll('li')).toHaveLength(3)
    const current = wrapper.get('.gmz-breadcrumb__current')
    expect(current.text()).toBe('Camisa azul')
    expect(current.attributes('aria-current')).toBe('page')
  })

  it('los items con href previos al último son enlaces', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    const links = wrapper.findAll('a.gmz-breadcrumb__link')
    expect(links).toHaveLength(2)
    expect(links[1].attributes('href')).toBe('/productos')
  })

  it('un item intermedio sin href es un botón que emite select', async () => {
    const wrapper = mount(Breadcrumb, {
      props: {
        items: [{ label: 'Raíz' }, { label: 'Sección' }, { label: 'Hoja' }],
      },
    })
    const buttons = wrapper.findAll('button.gmz-breadcrumb__link')
    expect(buttons).toHaveLength(2)
    await buttons[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ label: 'Raíz' })
    expect(wrapper.emitted('select')?.[0]?.[1]).toBe(0)
  })

  it('renderiza el separador entre items pero no tras el último', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    expect(wrapper.findAll('.gmz-breadcrumb__sep')).toHaveLength(2)
  })

  it('permite personalizar el separador con el slot', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
      slots: { separator: '›' },
    })
    expect(wrapper.get('.gmz-breadcrumb__sep').text()).toBe('›')
  })
})
