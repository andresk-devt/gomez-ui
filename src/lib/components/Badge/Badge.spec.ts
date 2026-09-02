import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  it('sin slot renderiza un badge inline con el contenido', () => {
    const wrapper = mount(Badge, { props: { content: 5 } })
    expect(wrapper.classes()).toContain('gmz-badge--inline')
    expect(wrapper.text()).toBe('5')
  })

  it('recorta los números que superan max', () => {
    const wrapper = mount(Badge, { props: { content: 120, max: 99 } })
    expect(wrapper.text()).toBe('99+')
  })

  it('con dot no muestra texto y añade la clase dot', () => {
    const wrapper = mount(Badge, { props: { dot: true, content: 9 } })
    expect(wrapper.text()).toBe('')
    expect(wrapper.get('.gmz-badge').classes()).toContain('gmz-badge--dot')
  })

  it('con slot envuelve el contenido y posiciona el badge', () => {
    const wrapper = mount(Badge, {
      props: { content: 3, placement: 'bottom-start' },
      slots: { default: '<button data-test="t">x</button>' },
    })
    expect(wrapper.classes()).toContain('gmz-badge-wrap')
    expect(wrapper.find('[data-test="t"]').exists()).toBe(true)
    expect(wrapper.get('.gmz-badge').classes()).toContain(
      'gmz-badge--bottom-start',
    )
  })

  it('show=false oculta el badge', () => {
    const bare = mount(Badge, { props: { content: 1, show: false } })
    expect(bare.find('.gmz-badge').exists()).toBe(false)
    const wrapped = mount(Badge, {
      props: { content: 1, show: false },
      slots: { default: '<i />' },
    })
    expect(wrapped.find('.gmz-badge').exists()).toBe(false)
  })

  it('sin contenido y sin dot no renderiza nada visible', () => {
    const wrapper = mount(Badge)
    expect(wrapper.find('.gmz-badge').exists()).toBe(false)
  })
})
