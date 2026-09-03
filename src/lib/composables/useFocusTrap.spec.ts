import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useFocusTrap } from './useFocusTrap'

function setup(html: string) {
  const host = document.createElement('div')
  host.innerHTML = html
  document.body.appendChild(host)
  const container = ref<HTMLElement | null>(host)
  return { host, container, trap: useFocusTrap(container) }
}

describe('useFocusTrap', () => {
  it('activate enfoca el primer elemento enfocable y deactivate devuelve el foco', async () => {
    const outside = document.createElement('button')
    document.body.appendChild(outside)
    outside.focus()

    const { host, trap } = setup(
      '<button id="a">A</button><button id="b">B</button>',
    )
    trap.activate()
    await Promise.resolve()
    expect(document.activeElement?.id).toBe('a')

    trap.deactivate()
    expect(document.activeElement).toBe(outside)

    host.remove()
    outside.remove()
  })

  it('Tab desde el último elemento vuelve al primero', () => {
    const { host, container, trap } = setup(
      '<button id="a">A</button><button id="b">B</button>',
    )
    const b = host.querySelector<HTMLElement>('#b')!
    b.focus()
    const e = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
    trap.onKeydown(e)
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement?.id).toBe('a')
    void container
    host.remove()
  })

  it('Shift+Tab desde el primero salta al último', () => {
    const { host, trap } = setup(
      '<button id="a">A</button><button id="b">B</button>',
    )
    const a = host.querySelector<HTMLElement>('#a')!
    a.focus()
    const e = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      cancelable: true,
    })
    trap.onKeydown(e)
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement?.id).toBe('b')
    host.remove()
  })

  it('ignora teclas que no son Tab', () => {
    const { host, trap } = setup('<button id="a">A</button>')
    const e = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true })
    trap.onKeydown(e)
    expect(e.defaultPrevented).toBe(false)
    host.remove()
  })
})
