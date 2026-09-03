import { readonly, ref } from 'vue'
import type { ToastOptions, ToastRecord, ToastVariant } from '../types'

let seq = 0
const items = ref<ToastRecord[]>([])

function push(variant: ToastVariant, input: string | ToastOptions): string {
  const opts: ToastOptions =
    typeof input === 'string' ? { message: input } : input
  const id = `gmz-toast-${++seq}`
  items.value = [
    ...items.value,
    {
      id,
      message: opts.message,
      title: opts.title,
      variant: opts.variant ?? variant,
      duration: opts.duration ?? 4000,
    },
  ]
  return id
}

function dismiss(id: string) {
  items.value = items.value.filter((t) => t.id !== id)
}

function clear() {
  items.value = []
}

/** Lanza un toast neutro; usa `.success` / `.error` / `.warning` / `.info` para variantes. */
function toast(input: string | ToastOptions) {
  return push('info', input)
}
toast.info = (input: string | ToastOptions) => push('info', input)
toast.success = (input: string | ToastOptions) => push('success', input)
toast.warning = (input: string | ToastOptions) => push('warning', input)
toast.error = (input: string | ToastOptions) => push('danger', input)

/**
 * API imperativa de notificaciones. Monta un `<ToastContainer />` una vez en la
 * raíz de la app y llama a `toast(...)` desde cualquier sitio.
 *
 * ```ts
 * const { toast } = useToast()
 * toast.success('Guardado')
 * toast({ title: 'Error', message: 'Reintenta', variant: 'danger', duration: 0 })
 * ```
 */
export function useToast() {
  return {
    toasts: readonly(items),
    toast,
    dismiss,
    clear,
  }
}
