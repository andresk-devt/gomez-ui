import { computed, ref } from 'vue'

export type ColorMode = 'light' | 'dark' | 'system'
export type ResolvedColorMode = 'light' | 'dark'

const STORAGE_KEY = 'gmz-color-mode'
const MODES: ColorMode[] = ['light', 'dark', 'system']

const canUseDom =
  typeof window !== 'undefined' && typeof document !== 'undefined'

function readStored(): ColorMode {
  if (!canUseDom) return 'system'
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* localStorage bloqueado */
  }
  return 'system'
}

function darkMediaQuery(): MediaQueryList | null {
  if (!canUseDom || typeof window.matchMedia !== 'function') return null
  return window.matchMedia('(prefers-color-scheme: dark)')
}

function systemPrefersDark(): boolean {
  return darkMediaQuery()?.matches ?? false
}

/** Estado compartido por toda la app (singleton a nivel de módulo). */
const mode = ref<ColorMode>(readStored())
const systemDark = ref(systemPrefersDark())

let initialized = false

function apply() {
  // Relee la preferencia del sistema por si cambió sin disparar el listener
  // (p. ej. en tests que re-stubbean `matchMedia`).
  systemDark.value = systemPrefersDark()
  if (!canUseDom) return
  const root = document.documentElement
  if (mode.value === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', mode.value)
}

function initListeners() {
  if (initialized || !canUseDom) return
  initialized = true
  darkMediaQuery()?.addEventListener('change', (e) => {
    systemDark.value = e.matches
  })
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) mode.value = readStored()
  })
  apply()
}

/**
 * Modo de color con persistencia y sincronización entre pestañas.
 *
 * ```ts
 * const { mode, resolved, isDark, setMode, toggle } = useColorMode()
 * setMode('dark')      // fuerza oscuro (data-theme="dark" en <html>)
 * setMode('system')    // vuelve a seguir al sistema
 * toggle()             // light -> dark -> system -> light
 * ```
 */
export function useColorMode() {
  initListeners()

  const resolved = computed<ResolvedColorMode>(() =>
    mode.value === 'system'
      ? systemDark.value
        ? 'dark'
        : 'light'
      : mode.value,
  )

  const isDark = computed(() => resolved.value === 'dark')

  /** Vista de solo lectura; usa `setMode` / `toggle` para cambiarlo. */
  const currentMode = computed(() => mode.value)

  function setMode(next: ColorMode) {
    mode.value = next
    if (canUseDom) {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* localStorage bloqueado */
      }
    }
    apply()
  }

  function toggle() {
    const i = MODES.indexOf(mode.value)
    setMode(MODES[(i + 1) % MODES.length])
  }

  return {
    mode: currentMode,
    resolved,
    isDark,
    setMode,
    toggle,
    modes: MODES,
  }
}
