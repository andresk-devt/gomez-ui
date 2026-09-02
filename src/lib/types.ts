/** Escala de tamaño compartida por los componentes. */
export type Size = 'sm' | 'md' | 'lg'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = Size

export interface ButtonProps {
  /** Estilo visual del botón. */
  variant?: ButtonVariant
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Deshabilita el botón e impide el evento `click`. */
  disabled?: boolean
  /** Muestra un spinner e impide el evento `click`. */
  loading?: boolean
  /** Atributo `type` nativo del `<button>`. */
  type?: 'button' | 'submit' | 'reset'
  /** Ocupa todo el ancho disponible. */
  block?: boolean
}

export interface ThemeSwitcherProps {
  /** Tamaño del botón. */
  size?: Size
}

export type InputType =
  'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

export interface InputProps {
  /** Valor del campo (`v-model`). */
  modelValue?: string | number
  /** Tipo nativo del `<input>`. */
  type?: InputType
  /** Etiqueta visible asociada al campo. */
  label?: string
  /** Texto de placeholder. */
  placeholder?: string
  /** Texto de ayuda bajo el campo. */
  hint?: string
  /** Mensaje de error; su presencia marca el campo como inválido. */
  error?: string
  /** Tamaño del campo. */
  size?: Size
  /** Deshabilita el campo. */
  disabled?: boolean
  /** Campo de solo lectura. */
  readonly?: boolean
  /** Marca el campo como obligatorio. */
  required?: boolean
  /** `id` del `<input>`; si se omite se genera uno estable. */
  id?: string
}

export type CardVariant = 'elevated' | 'outlined' | 'filled'
export type CardPadding = Size | 'none'

export interface CardProps {
  /** Estilo del contenedor. */
  variant?: CardVariant
  /** Padding interno de header, body y footer. */
  padding?: CardPadding
  /** Título de conveniencia; se ignora si se usa el slot `header`. */
  title?: string
}

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  /** Color e icono por defecto. */
  variant?: AlertVariant
  /** Título en negrita sobre el contenido. */
  title?: string
  /** Muestra el botón de cierre. */
  closable?: boolean
  /** Oculta el icono de la izquierda. */
  hideIcon?: boolean
}

export type TagVariant =
  'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type TagAppearance = 'soft' | 'outline' | 'solid'

export interface TagProps {
  /** Color del tag. */
  variant?: TagVariant
  /** Tamaño del tag. */
  size?: Size
  /** Relleno suave, contorno o sólido. */
  appearance?: TagAppearance
  /** Muestra un botón para quitar el tag. */
  closable?: boolean
  /** Punto de color al inicio. */
  dot?: boolean
}
