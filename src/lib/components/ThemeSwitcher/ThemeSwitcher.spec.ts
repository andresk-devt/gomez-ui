import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useColorMode } from '../../composables/useColorMode'

beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  useColorMode().setMode('light')
})

describe('ThemeSwitcher', () => {
  it('renderiza un button accesible', () => {
    const wrapper = mount(ThemeSwitcher)
    const btn = wrapper.get('button')
    expect(btn.attributes('type')).toBe('button')
    expect(btn.attributes('aria-label')).toContain('Tema claro')
  })

  it('al hacer click recorre los modos y cambia el icono', async () => {
    const wrapper = mount(ThemeSwitcher)
    const { mode } = useColorMode()

    expect(wrapper.get('svg').attributes('class')).toContain(
      'gmz-theme-switcher__icon',
    )
    await wrapper.get('button').trigger('click')
    expect(mode.value).toBe('dark')
    await wrapper.get('button').trigger('click')
    expect(mode.value).toBe('system')
  })

  it('aplica la clase de size', () => {
    const wrapper = mount(ThemeSwitcher, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('gmz-theme-switcher--lg')
  })
})
