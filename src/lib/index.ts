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
import { Radio } from './components/Radio'
import { RadioGroup } from './components/RadioGroup'
import { Badge } from './components/Badge'
import { Avatar } from './components/Avatar'
import { Spinner } from './components/Spinner'
import { Tooltip } from './components/Tooltip'
import { Dialog } from './components/Dialog'
import { Dropdown } from './components/Dropdown'
import { Tabs } from './components/Tabs'
import { Accordion } from './components/Accordion'
import { Progress } from './components/Progress'
import { Skeleton } from './components/Skeleton'
import { Breadcrumb } from './components/Breadcrumb'

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
  Radio,
  RadioGroup,
  Badge,
  Avatar,
  Spinner,
  Tooltip,
  Dialog,
  Dropdown,
  Tabs,
  Accordion,
  Progress,
  Skeleton,
  Breadcrumb,
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
  RadioProps,
  RadioGroupProps,
  RadioOption,
  RadioOptionObject,
  RadioGroupOrientation,
  BadgeProps,
  BadgeVariant,
  BadgePlacement,
  AvatarProps,
  AvatarShape,
  SpinnerProps,
  SpinnerColor,
  TooltipProps,
  TooltipPlacement,
  DialogProps,
  DialogSize,
  DropdownProps,
  DropdownItem,
  DropdownItemObject,
  DropdownDivider,
  DropdownPlacement,
  TabsProps,
  TabItem,
  TabsVariant,
  AccordionProps,
  AccordionItem,
  AccordionModelValue,
  ProgressProps,
  ProgressVariant,
  SkeletonProps,
  SkeletonVariant,
  BreadcrumbProps,
  BreadcrumbItem,
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
    app.component(`${prefix}Radio`, Radio)
    app.component(`${prefix}RadioGroup`, RadioGroup)
    app.component(`${prefix}Badge`, Badge)
    app.component(`${prefix}Avatar`, Avatar)
    app.component(`${prefix}Spinner`, Spinner)
    app.component(`${prefix}Tooltip`, Tooltip)
    app.component(`${prefix}Dialog`, Dialog)
    app.component(`${prefix}Dropdown`, Dropdown)
    app.component(`${prefix}Tabs`, Tabs)
    app.component(`${prefix}Accordion`, Accordion)
    app.component(`${prefix}Progress`, Progress)
    app.component(`${prefix}Skeleton`, Skeleton)
    app.component(`${prefix}Breadcrumb`, Breadcrumb)
  },
}

export default GomezUI
