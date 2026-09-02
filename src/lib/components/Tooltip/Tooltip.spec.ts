import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('Tooltip', () => {
  it('renderiza el trigger del slot por defecto y oculta el bubble al inicio', () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Ayuda' },
      slots: { default: '<button>?</button>' },
    })
    expect(wrapper.get('button').text()).toBe('?')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('muestra el bubble tras mouseenter y el retardo, y lo oculta con mouseleave', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Ayuda', openDelay: 100 },
      slots: { default: '<button>?</button>' },
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    const bubble = wrapper.get('[role="tooltip"]')
    expect(bubble.text()).toBe('Ayuda')
    expect(bubble.classes()).toContain('gmz-tooltip__bubble--top')

    await wrapper.trigger('mouseleave')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('también aparece al recibir foco (focusin)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Ayuda', openDelay: 0 },
      slots: { default: '<button>?</button>' },
    })
    await wrapper.trigger('focusin')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
  })

  it('con disabled nunca se muestra', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Ayuda', disabled: true, openDelay: 0 },
      slots: { default: '<button>?</button>' },
    })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(50)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('aplica la clase de placement', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Ayuda', placement: 'right', openDelay: 0 },
      slots: { default: '<button>?</button>' },
    })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.get('[role="tooltip"]').classes()).toContain(
      'gmz-tooltip__bubble--right',
    )
  })
})
