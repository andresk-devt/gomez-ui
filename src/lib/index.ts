import type { App, Plugin } from 'vue'
import { Button } from './components/Button'
import { ThemeSwitcher } from './components/ThemeSwitcher'

export { Button, ThemeSwitcher }
export { useColorMode } from './composables/useColorMode'
export type { ColorMode, ResolvedColorMode } from './composables/useColorMode'
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  Size,
  ThemeSwitcherProps,
} from './types'

export interface GomezUIOptions {
  /** Prefijo para los componentes registrados globalmente. Por defecto `'Gmz'`. */
  prefix?: string
}

/**
 * Plugin de Vue: `app.use(GomezUI)` registra `<GmzButton>`, `<GmzThemeSwitcher>`…
 * de forma global. Pásale `{ prefix }` para cambiar el prefijo.
 */
const GomezUI: Plugin<[GomezUIOptions?]> = {
  install(app: App, options: GomezUIOptions = {}) {
    const prefix = options.prefix ?? 'Gmz'
    app.component(`${prefix}Button`, Button)
    app.component(`${prefix}ThemeSwitcher`, ThemeSwitcher)
  },
}

export default GomezUI
