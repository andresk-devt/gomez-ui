import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from './Skeleton.vue'

describe('Skeleton', () => {
  it('es decorativo (aria-hidden) y usa variant text animado por defecto', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.classes()).toContain('gmz-skeleton--text')
    expect(wrapper.classes()).toContain('gmz-skeleton--animated')
  })

  it('animated=false quita la clase de animación', () => {
    const wrapper = mount(Skeleton, { props: { animated: false } })
    expect(wrapper.classes()).not.toContain('gmz-skeleton--animated')
  })

  it('aplica width/height/radius numéricos como píxeles', () => {
    const wrapper = mount(Skeleton, {
      props: { variant: 'rect', width: 200, height: 80, radius: 12 },
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('width: 200px')
    expect(style).toContain('height: 80px')
    expect(style).toContain('border-radius: 12px')
  })

  it('acepta unidades CSS en string', () => {
    const wrapper = mount(Skeleton, { props: { width: '50%' } })
    expect(wrapper.attributes('style')).toContain('width: 50%')
  })

  it('variant text con lines>1 renderiza N barras y acorta la última', () => {
    const wrapper = mount(Skeleton, { props: { lines: 3 } })
    const bars = wrapper.findAll('.gmz-skeleton')
    expect(bars).toHaveLength(3)
    expect(bars[2].attributes('style')).toContain('width: 65%')
  })

  it('variant circle', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'circle' } })
    expect(wrapper.classes()).toContain('gmz-skeleton--circle')
  })
})
