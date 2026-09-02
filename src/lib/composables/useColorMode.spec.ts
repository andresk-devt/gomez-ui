import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useColorMode } from './useColorMode'

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('useColorMode', () => {
  beforeEach(() => {
    stubMatchMedia(false)
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    useColorMode().setMode('system')
  })

  it('arranca en "system" y sin atributo data-theme', () => {
    const { mode } = useColorMode()
    expect(mode.value).toBe('system')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })

  it('setMode("dark") pone data-theme="dark", isDark y persiste', () => {
    const { setMode, isDark, mode } = useColorMode()
    setMode('dark')
    expect(mode.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(isDark.value).toBe(true)
    expect(localStorage.getItem('gmz-color-mode')).toBe('dark')
  })

  it('setMode("light") fuerza claro aunque el sistema prefiera oscuro', () => {
    stubMatchMedia(true)
    const { setMode, isDark } = useColorMode()
    setMode('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(isDark.value).toBe(false)
  })

  it('setMode("system") quita el atributo y resuelve según el sistema', () => {
    stubMatchMedia(true)
    const { setMode, resolved } = useColorMode()
    setMode('dark')
    setMode('system')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    expect(resolved.value).toBe('dark')
  })

  it('toggle recorre light -> dark -> system', () => {
    const { setMode, toggle, mode } = useColorMode()
    setMode('light')
    toggle()
    expect(mode.value).toBe('dark')
    toggle()
    expect(mode.value).toBe('system')
    toggle()
    expect(mode.value).toBe('light')
  })
})
