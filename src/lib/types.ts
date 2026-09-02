export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

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
