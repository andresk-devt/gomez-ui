import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ToastContainer from './ToastContainer.vue'
import { useToast } from '../../composables/useToast'

const mountContainer = (props = {}) =>
  mount(ToastContainer, { props, global: { stubs: { teleport: true } } })

afterEach(() => {
  useToast().clear()
  vi.useRealTimers()
})

describe('ToastContainer', () => {
  it('renderiza los toasts activos con role según la variante', async () => {
    const { toast } = useToast()
    const wrapper = mountContainer()
    toast.success('Guardado')
    toast.error('Falló')
    await nextTick()
    const items = wrapper.findAll('.gmz-toast')
    expect(items).toHaveLength(2)
    expect(items[0].attributes('role')).toBe('status')
    expect(items[1].attributes('role')).toBe('alert')
  })

  it('el botón de cerrar descarta el toast', async () => {
    const { toast, toasts } = useToast()
    const wrapper = mountContainer()
    toast('Hola')
    await nextTick()
    await wrapper.get('.gmz-toast__close').trigger('click')
    expect(toasts.value).toHaveLength(0)
  })

  it('auto-descarta tras la duración', async () => {
    vi.useFakeTimers()
    const { toast, toasts } = useToast()
    const wrapper = mountContainer()
    toast({ message: 'temporal', duration: 3000 })
    await nextTick()
    expect(wrapper.findAll('.gmz-toast')).toHaveLength(1)
    vi.advanceTimersByTime(3000)
    await nextTick()
    expect(toasts.value).toHaveLength(0)
  })

  it('duration 0 no auto-descarta', async () => {
    vi.useFakeTimers()
    const { toast, toasts } = useToast()
    mountContainer()
    toast({ message: 'fijo', duration: 0 })
    await nextTick()
    vi.advanceTimersByTime(10000)
    await nextTick()
    expect(toasts.value).toHaveLength(1)
  })

  it('respeta max mostrando los más recientes y aplica placement', async () => {
    const { toast } = useToast()
    const wrapper = mountContainer({ max: 2, placement: 'bottom-start' })
    toast('1')
    toast('2')
    toast('3')
    await nextTick()
    const msgs = wrapper.findAll('.gmz-toast__message').map((n) => n.text())
    expect(msgs).toEqual(['2', '3'])
    expect(wrapper.get('.gmz-toasts').classes()).toContain(
      'gmz-toasts--bottom-start',
    )
  })
})
