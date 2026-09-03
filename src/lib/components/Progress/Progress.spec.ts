import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from './Progress.vue'

describe('Progress', () => {
  it('expone role=progressbar con aria-valuenow/min/max', () => {
    const wrapper = mount(Progress, { props: { value: 30 } })
    const bar = wrapper.get('[role="progressbar"]')
    expect(bar.attributes('aria-valuenow')).toBe('30')
    expect(bar.attributes('aria-valuemin')).toBe('0')
    expect(bar.attributes('aria-valuemax')).toBe('100')
    expect(wrapper.get('.gmz-progress__bar').attributes('style')).toContain(
      'width: 30%',
    )
  })

  it('recorta el valor al rango [0, max] y calcula el porcentaje sobre max', () => {
    const over = mount(Progress, { props: { value: 250, max: 200 } })
    expect(over.get('[role="progressbar"]').attributes('aria-valuenow')).toBe(
      '200',
    )
    expect(over.get('.gmz-progress__bar').attributes('style')).toContain(
      'width: 100%',
    )
    const under = mount(Progress, { props: { value: -5 } })
    expect(under.get('.gmz-progress__bar').attributes('style')).toContain(
      'width: 0%',
    )
  })

  it('sin value es indeterminada: sin aria-valuenow y con la clase', () => {
    const wrapper = mount(Progress)
    const bar = wrapper.get('[role="progressbar"]')
    expect(bar.attributes('aria-valuenow')).toBeUndefined()
    expect(bar.classes()).toContain('gmz-progress--indeterminate')
  })

  it('showValue muestra el porcentaje redondeado', () => {
    const wrapper = mount(Progress, {
      props: { value: 1, max: 3, showValue: true },
    })
    expect(wrapper.get('.gmz-progress__value').text()).toBe('33%')
  })

  it('aplica clases de size y variant y refleja aria-label', () => {
    const wrapper = mount(Progress, {
      props: { value: 50, size: 'lg', variant: 'success', label: 'Carga' },
    })
    const bar = wrapper.get('[role="progressbar"]')
    expect(bar.classes()).toContain('gmz-progress--lg')
    expect(bar.classes()).toContain('gmz-progress--success')
    expect(bar.attributes('aria-label')).toBe('Carga')
  })
})
