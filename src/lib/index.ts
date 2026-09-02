import type { App, Plugin } from 'vue'
import { Button } from './components/Button'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { Input } from './components/Input'
import { Card } from './components/Card'
import { Alert } from './components/Alert'
import { Tag } from './components/Tag'
import { Checkbox } from './components/Checkbox'
import { Switch } from './components/Switch'
import { Textarea } from './components/Textarea'
import { Select } from './components/Select'

export {
  Button,
  ThemeSwitcher,
  Input,
  Card,
  Alert,
  Tag,
  Checkbox,
  Switch,
  Textarea,
  Select,
}
export { useColorMode } from './composables/useColorMode'
export type { ColorMode, ResolvedColorMode } from './composables/useColorMode'
export type {
  Size,
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ThemeSwitcherProps,
  InputProps,
  InputType,
  CardProps,
  CardVariant,
  CardPadding,
  AlertProps,
  AlertVariant,
  TagProps,
  TagVariant,
  TagAppearance,
  CheckboxProps,
  SwitchProps,
  TextareaProps,
  TextareaResize,
  SelectProps,
  SelectOption,
  SelectOptionObject,
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
    app.component(`${prefix}Input`, Input)
    app.component(`${prefix}Card`, Card)
    app.component(`${prefix}Alert`, Alert)
    app.component(`${prefix}Tag`, Tag)
    app.component(`${prefix}Checkbox`, Checkbox)
    app.component(`${prefix}Switch`, Switch)
    app.component(`${prefix}Textarea`, Textarea)
    app.component(`${prefix}Select`, Select)
  },
}

export default GomezUI
