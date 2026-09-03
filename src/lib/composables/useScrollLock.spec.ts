import { afterEach, describe, expect, it } from 'vitest'
import { useScrollLock } from './useScrollLock'

afterEach(() => {
  document.body.style.overflow = ''
  delete document.body.dataset.gmzScrollLocks
})

describe('useScrollLock', () => {
  it('bloquea y libera el overflow del body', () => {
    const { lock, unlock } = useScrollLock()
    lock()
    expect(document.body.style.overflow).toBe('hidden')
    unlock()
    expect(document.body.style.overflow).toBe('')
  })

  it('usa recuento: el overflow solo se libera cuando se cierran todos', () => {
    const a = useScrollLock()
    const b = useScrollLock()
    a.lock()
    b.lock()
    expect(document.body.style.overflow).toBe('hidden')
    a.unlock()
    expect(document.body.style.overflow).toBe('hidden')
    b.unlock()
    expect(document.body.style.overflow).toBe('')
  })

  it('unlock de más no baja el contador por debajo de 0', () => {
    const { unlock } = useScrollLock()
    unlock()
    unlock()
    expect(document.body.dataset.gmzScrollLocks).toBe('0')
  })
})
