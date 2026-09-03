const KEY = 'gmzScrollLocks'
const canUseDom = typeof document !== 'undefined'

/**
 * Bloqueo del scroll del `<body>` con recuento: varios overlays abiertos a la vez
 * comparten el bloqueo y solo el último en cerrarse lo libera.
 *
 * ```ts
 * const { lock, unlock } = useScrollLock()
 * lock() // en onOpen
 * unlock() // en onClose / onBeforeUnmount
 * ```
 */
export function useScrollLock() {
  function count() {
    return Number(document.body.dataset[KEY] || '0')
  }

  function lock() {
    if (!canUseDom) return
    const n = count() + 1
    document.body.dataset[KEY] = String(n)
    if (n === 1) document.body.style.overflow = 'hidden'
  }

  function unlock() {
    if (!canUseDom) return
    const n = Math.max(0, count() - 1)
    document.body.dataset[KEY] = String(n)
    if (n === 0) document.body.style.overflow = ''
  }

  return { lock, unlock }
}
