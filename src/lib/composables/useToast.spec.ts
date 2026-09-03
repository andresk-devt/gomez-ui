import { afterEach, describe, expect, it } from 'vitest'
import { useToast } from './useToast'

afterEach(() => useToast().clear())

describe('useToast', () => {
  it('toast() añade una notificación y devuelve su id', () => {
    const { toast, toasts } = useToast()
    const id = toast('Hola')
    expect(id).toMatch(/^gmz-toast-/)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toMatchObject({
      message: 'Hola',
      variant: 'info',
      duration: 4000,
    })
  })

  it('los helpers fijan la variante', () => {
    const { toast, toasts } = useToast()
    toast.success('ok')
    toast.error('mal')
    toast.warning('ojo')
    expect(toasts.value.map((t) => t.variant)).toEqual([
      'success',
      'danger',
      'warning',
    ])
  })

  it('acepta un objeto de opciones con title y duration', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Guardado', message: 'Todo bien', duration: 0 })
    expect(toasts.value[0]).toMatchObject({
      title: 'Guardado',
      message: 'Todo bien',
      duration: 0,
    })
  })

  it('dismiss(id) quita una; clear() las quita todas', () => {
    const { toast, dismiss, clear, toasts } = useToast()
    const a = toast('a')
    toast('b')
    dismiss(a)
    expect(toasts.value.map((t) => t.message)).toEqual(['b'])
    clear()
    expect(toasts.value).toHaveLength(0)
  })

  it('el estado es compartido entre invocaciones del composable', () => {
    useToast().toast('compartido')
    expect(useToast().toasts.value).toHaveLength(1)
  })
})
