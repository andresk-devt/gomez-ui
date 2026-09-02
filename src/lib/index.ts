import type { App, Plugin } from 'vue'
import { Button } from './components/Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize } from './types'

export interface GomezUIOptions {
  /** Prefijo para los componentes registrados globalmente. Por defecto `'Gmz'`. */
  prefix?: string
}

/**
 * Plugin de Vue: `app.use(GomezUI)` registra `<GmzButton>` de forma global.
 * Pásale `{ prefix }` para cambiar el prefijo.
 */
const GomezUI: Plugin<[GomezUIOptions?]> = {
  install(app: App, options: GomezUIOptions = {}) {
    const prefix = options.prefix ?? 'Gmz'
    app.component(`${prefix}Button`, Button)
  },
}

export default GomezUI
