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

export interface CheckboxProps {
  /** Estado marcado (`v-model`). */
  modelValue?: boolean
  /** Etiqueta junto a la casilla (alternativa al slot por defecto). */
  label?: string
  /** Texto de ayuda bajo el control. */
  hint?: string
  /** Mensaje de error; su presencia marca el control como inválido. */
  error?: string
  /** Tamaño del control. */
  size?: Size
  /** Deshabilita el control. */
  disabled?: boolean
  /** Marca el control como obligatorio. */
  required?: boolean
  /** Muestra el estado indeterminado (visual y en el DOM). */
  indeterminate?: boolean
  /** `id` del `<input>`; si se omite se genera uno estable. */
  id?: string
}

export interface SwitchProps {
  /** Estado activado (`v-model`). */
  modelValue?: boolean
  /** Etiqueta junto al interruptor (alternativa al slot por defecto). */
  label?: string
  /** Texto de ayuda bajo el control. */
  hint?: string
  /** Mensaje de error; su presencia marca el control como inválido. */
  error?: string
  /** Tamaño del control. */
  size?: Size
  /** Deshabilita el control. */
  disabled?: boolean
  /** Marca el control como obligatorio. */
  required?: boolean
  /** `id` del `<input>`; si se omite se genera uno estable. */
  id?: string
}

export type TextareaResize = 'none' | 'vertical' | 'both'

export interface TextareaProps {
  /** Valor del campo (`v-model`). */
  modelValue?: string
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
  /** Número de filas visibles. */
  rows?: number
  /** Dirección de redimensionado permitida. */
  resize?: TextareaResize
  /** Deshabilita el campo. */
  disabled?: boolean
  /** Campo de solo lectura. */
  readonly?: boolean
  /** Marca el campo como obligatorio. */
  required?: boolean
  /** `id` del `<textarea>`; si se omite se genera uno estable. */
  id?: string
}

export interface SelectOptionObject {
  /** Texto visible de la opción. */
  label: string
  /** Valor asociado a la opción. */
  value: string | number
  /** Deshabilita esta opción. */
  disabled?: boolean
}

export type SelectOption = string | number | SelectOptionObject

export interface SelectProps {
  /** Valor seleccionado (`v-model`). */
  modelValue?: string | number
  /** Opciones: strings/números sueltos u objetos `{ label, value, disabled }`. */
  options?: SelectOption[]
  /** Etiqueta visible asociada al campo. */
  label?: string
  /** Texto mostrado cuando no hay selección. */
  placeholder?: string
  /** Texto de ayuda bajo el campo. */
  hint?: string
  /** Mensaje de error; su presencia marca el campo como inválido. */
  error?: string
  /** Tamaño del campo. */
  size?: Size
  /** Deshabilita el campo. */
  disabled?: boolean
  /** Marca el campo como obligatorio. */
  required?: boolean
  /** `id` del `<select>`; si se omite se genera uno estable. */
  id?: string
}

export interface RadioOptionObject {
  /** Texto visible de la opción. */
  label: string
  /** Valor asociado a la opción. */
  value: string | number
  /** Deshabilita esta opción. */
  disabled?: boolean
}

export type RadioOption = string | number | RadioOptionObject

export type RadioGroupOrientation = 'vertical' | 'horizontal'

export interface RadioGroupProps {
  /** Valor seleccionado (`v-model`). */
  modelValue?: string | number
  /** Opciones: strings/números sueltos u objetos `{ label, value, disabled }`. */
  options?: RadioOption[]
  /** Atributo `name` compartido; si se omite se genera uno estable. */
  name?: string
  /** Etiqueta del grupo. */
  label?: string
  /** Texto de ayuda bajo el grupo. */
  hint?: string
  /** Mensaje de error; su presencia marca el grupo como inválido. */
  error?: string
  /** Tamaño de los radios del grupo. */
  size?: Size
  /** Deshabilita todo el grupo. */
  disabled?: boolean
  /** Marca el grupo como obligatorio. */
  required?: boolean
  /** Disposición de las opciones. */
  orientation?: RadioGroupOrientation
}

export interface RadioProps {
  /** Valor que representa este radio. */
  value: string | number
  /** Valor seleccionado cuando se usa suelto (`v-model`). */
  modelValue?: string | number
  /** Texto junto al radio (alternativa al slot por defecto). */
  label?: string
  /** Atributo `name`; lo hereda del `RadioGroup` si está dentro de uno. */
  name?: string
  /** Tamaño; lo hereda del `RadioGroup` si está dentro de uno. */
  size?: Size
  /** Deshabilita el radio. */
  disabled?: boolean
}

export type BadgeVariant =
  'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export type BadgePlacement =
  'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'

export interface BadgeProps {
  /** Contenido numérico o textual del badge. */
  content?: string | number
  /** Color del badge. */
  variant?: BadgeVariant
  /** Muestra solo un punto, sin contenido. */
  dot?: boolean
  /** Tope numérico: por encima se muestra `max+`. */
  max?: number
  /** Controla la visibilidad. */
  show?: boolean
  /** Posición cuando envuelve contenido (slot por defecto). */
  placement?: BadgePlacement
}

export type AvatarShape = 'circle' | 'rounded' | 'square'

export interface AvatarProps {
  /** URL de la imagen. */
  src?: string
  /** Texto alternativo; por defecto usa `name`. */
  alt?: string
  /** Nombre para derivar iniciales cuando no hay imagen. */
  name?: string
  /** Tamaño: `sm`/`md`/`lg` o un número de píxeles. */
  size?: Size | number
  /** Forma del avatar. */
  shape?: AvatarShape
  /** Color de la superficie de respaldo (iniciales/icono). */
  variant?: BadgeVariant
}

export type SpinnerColor = 'accent' | 'current' | 'fg'

export interface SpinnerProps {
  /** Tamaño: `sm`/`md`/`lg` o un número de píxeles. */
  size?: Size | number
  /** Color del anillo. */
  color?: SpinnerColor
  /** Etiqueta accesible (oculta visualmente). */
  label?: string
}

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** Texto del tooltip (alternativa al slot `content`). */
  content?: string
  /** Posición respecto al trigger. */
  placement?: TooltipPlacement
  /** Desactiva el tooltip. */
  disabled?: boolean
  /** Retardo en ms antes de mostrarlo. */
  openDelay?: number
}

export type DialogSize = 'sm' | 'md' | 'lg' | 'full'

export interface DialogProps {
  /** Estado abierto (`v-model`). */
  modelValue?: boolean
  /** Título del diálogo (usado como `aria-labelledby`). */
  title?: string
  /** Descripción corta bajo el título (usada como `aria-describedby`). */
  description?: string
  /** Ancho del panel. */
  size?: DialogSize
  /** Muestra el botón de cerrar y habilita el cierre por overlay/Escape. */
  closable?: boolean
  /** Cerrar al hacer clic en el overlay. */
  closeOnOverlay?: boolean
  /** Cerrar al pulsar Escape. */
  closeOnEsc?: boolean
}

export interface DropdownItemObject {
  /** Texto visible del item. */
  label: string
  /** Valor emitido al elegirlo; por defecto el `label`. */
  value?: string | number
  /** Deshabilita el item. */
  disabled?: boolean
  /** Estilo destructivo. */
  danger?: boolean
}

export interface DropdownDivider {
  /** Marca una línea separadora en el menú. */
  divider: true
}

export type DropdownItem = DropdownItemObject | DropdownDivider

export type DropdownPlacement =
  'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownProps {
  /** Items del menú (alternativa a componer el slot por defecto). */
  items?: DropdownItem[]
  /** Posición del menú respecto al trigger. */
  placement?: DropdownPlacement
  /** Deshabilita el trigger. */
  disabled?: boolean
  /** Cerrar el menú al elegir un item. */
  closeOnSelect?: boolean
}

export interface TabItem {
  /** Texto visible de la pestaña. */
  label: string
  /** Valor único de la pestaña. */
  value: string | number
  /** Deshabilita la pestaña. */
  disabled?: boolean
}

export type TabsVariant = 'line' | 'pill'

export interface TabsProps {
  /** Valor de la pestaña activa (`v-model`). */
  modelValue?: string | number
  /** Pestañas del componente. */
  items?: TabItem[]
  /** Estilo: subrayado (`line`) o pastilla (`pill`). */
  variant?: TabsVariant
  /** Tamaño. */
  size?: Size
  /** Reparte las pestañas a lo ancho por igual. */
  fitted?: boolean
}

export interface AccordionItem {
  /** Texto de la cabecera. */
  label: string
  /** Valor único del panel. */
  value: string | number
  /** Deshabilita el panel. */
  disabled?: boolean
}

export type AccordionModelValue =
  string | number | Array<string | number> | null

export interface AccordionProps {
  /** Panel(es) abierto(s) (`v-model`). Array si `multiple`. */
  modelValue?: AccordionModelValue
  /** Paneles del acordeón. */
  items?: AccordionItem[]
  /** Permite varios paneles abiertos a la vez. */
  multiple?: boolean
  /** Tamaño. */
  size?: Size
}

export type ProgressVariant = 'accent' | 'success' | 'warning' | 'danger'

export interface ProgressProps {
  /** Valor actual (0..`max`). Si se omite, la barra es indeterminada. */
  value?: number
  /** Valor máximo. */
  max?: number
  /** Grosor de la barra. */
  size?: Size
  /** Color de la barra. */
  variant?: ProgressVariant
  /** Etiqueta accesible. */
  label?: string
  /** Muestra el porcentaje como texto. */
  showValue?: boolean
}

export type SkeletonVariant = 'text' | 'rect' | 'circle'

export interface SkeletonProps {
  /** Forma del bloque. */
  variant?: SkeletonVariant
  /** Ancho (`number` = píxeles). */
  width?: string | number
  /** Alto (`number` = píxeles). */
  height?: string | number
  /** Radio de las esquinas (`number` = píxeles). */
  radius?: string | number
  /** Nº de líneas para `variant="text"`. */
  lines?: number
  /** Anima el brillo. */
  animated?: boolean
}

export interface BreadcrumbItem {
  /** Texto visible. */
  label: string
  /** Enlace; si se omite y no es el último, se emite `select`. */
  href?: string
  /** Deshabilita el item. */
  disabled?: boolean
}

export interface BreadcrumbProps {
  /** Ruta de navegación; el último item es la página actual. */
  items?: BreadcrumbItem[]
  /** Separador entre items. */
  separator?: string
}

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  /** Estado abierto (`v-model`). */
  modelValue?: boolean
  /** Borde desde el que aparece el panel. */
  side?: DrawerSide
  /** Título del panel (usado como `aria-labelledby`). */
  title?: string
  /** Ancho (left/right) o alto (top/bottom) del panel. `number` = píxeles. */
  size?: string | number
  /** Muestra el botón de cerrar y habilita el cierre por overlay/Escape. */
  closable?: boolean
  /** Cerrar al hacer clic en el overlay. */
  closeOnOverlay?: boolean
  /** Cerrar al pulsar Escape. */
  closeOnEsc?: boolean
}

export interface PaginationProps {
  /** Página actual, 1-based (`v-model:page`). */
  page?: number
  /** Nº total de elementos (con `pageSize` calcula las páginas). */
  total?: number
  /** Elementos por página. */
  pageSize?: number
  /** Nº de páginas explícito; tiene prioridad sobre `total`/`pageSize`. */
  pageCount?: number
  /** Páginas mostradas a cada lado de la actual. */
  siblingCount?: number
  /** Tamaño. */
  size?: Size
  /** Deshabilita toda la interacción. */
  disabled?: boolean
}

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastOptions {
  /** Cuerpo del mensaje. */
  message: string
  /** Título en negrita opcional. */
  title?: string
  /** Color/rol; por defecto según el helper usado. */
  variant?: ToastVariant
  /** Milisegundos hasta el auto-cierre; `0` = permanente. */
  duration?: number
}

export interface ToastRecord {
  id: string
  message: string
  title?: string
  variant: ToastVariant
  duration: number
}

export type ToastPlacement =
  'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'

export interface ToastContainerProps {
  /** Esquina donde se apilan los toasts. */
  placement?: ToastPlacement
  /** Máximo de toasts visibles a la vez (se muestran los más recientes). */
  max?: number
}

export interface SidebarItem {
  /** Texto visible. */
  label: string
  /** Valor único; su coincidencia con `modelValue` marca el item activo. */
  value?: string | number
  /** Enlace; si se define, el item se renderiza como `<a>`. */
  href?: string
  /** Deshabilita el item. */
  disabled?: boolean
  /** Contador o etiqueta a la derecha. */
  badge?: string | number
  /** Subitems; convierten el item en un grupo plegable. */
  children?: SidebarItem[]
}

export interface SidebarProps {
  /** Árbol de navegación (1 nivel de anidamiento). */
  items?: SidebarItem[]
  /** Valor del item activo (`v-model`). */
  modelValue?: string | number
  /** Modo raíl: solo iconos (`v-model:collapsed`). */
  collapsed?: boolean
  /** Título en la cabecera. */
  title?: string
  /** `aria-label` del `<nav>`. */
  ariaLabel?: string
}

export type TableAlign = 'left' | 'center' | 'right'
export type TableSortOrder = 'asc' | 'desc'

export interface TableColumn {
  /** Clave del campo en cada fila. */
  key: string
  /** Encabezado visible; por defecto la `key`. */
  label?: string
  /** Alineación del contenido. */
  align?: TableAlign
  /** Ancho de la columna (`number` = píxeles). */
  width?: string | number
  /** Habilita la ordenación por esta columna. */
  sortable?: boolean
}

export interface TableSort {
  key: string
  order: TableSortOrder
}

export type TableRow = Record<string, unknown>

export interface TableProps {
  /** Definición de columnas. */
  columns?: TableColumn[]
  /** Filas de datos. */
  rows?: TableRow[]
  /** Campo o función para la `key` de cada fila. */
  rowKey?: string | ((row: TableRow, index: number) => string | number)
  /** Orden actual (`v-model:sort`). */
  sort?: TableSort | null
  /** No ordenar internamente (ordenación gestionada por el padre). */
  manualSort?: boolean
  /** Muestra filas de carga (skeleton). */
  loading?: boolean
  /** Nº de filas skeleton mientras `loading`. */
  loadingRows?: number
  /** Texto cuando no hay filas. */
  emptyText?: string
  /** Tamaño (densidad). */
  size?: Size
  /** Filas alternas con fondo. */
  striped?: boolean
  /** Resalta la fila al pasar el ratón. */
  hoverable?: boolean
  /** Cabecera fija al hacer scroll vertical. */
  stickyHeader?: boolean
}
