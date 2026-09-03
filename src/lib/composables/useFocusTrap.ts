import { nextTick, type Ref } from 'vue'

const canUseDom = typeof document !== 'undefined'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),' +
  'input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Atrapa el foco dentro de `containerRef` mientras un overlay está abierto.
 *
 * - `activate()`: guarda el elemento con foco y mueve el foco al primer elemento
 *   enfocable del contenedor (o al propio contenedor).
 * - `deactivate()`: devuelve el foco al elemento previo.
 * - `onKeydown(e)`: engánchalo al `@keydown` del contenedor para ciclar con Tab.
 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  let lastFocused: HTMLElement | null = null

  function focusables(): HTMLElement[] {
    if (!containerRef.value) return []
    return Array.from(
      containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE),
    )
  }

  function activate() {
    if (canUseDom) lastFocused = document.activeElement as HTMLElement
    nextTick(() => {
      const els = focusables()
      ;(els[0] ?? containerRef.value)?.focus()
    })
  }

  function deactivate() {
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    }
    lastFocused = null
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    const els = focusables()
    if (els.length === 0) {
      e.preventDefault()
      containerRef.value?.focus()
      return
    }
    const first = els[0]
    const last = els[els.length - 1]
    const active = (
      canUseDom ? document.activeElement : null
    ) as HTMLElement | null
    if (e.shiftKey) {
      if (active === first || !containerRef.value?.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else if (active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return { activate, deactivate, onKeydown }
}
