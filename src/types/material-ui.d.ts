import * as createPalette from '@mui/material' //eslint-disable-line
import { alpha, Theme } from '@mui/material/styles' //eslint-disable-line
import { CSSProperties } from '@mui/material'

export interface AppBackgrounds {
  default: string
  light: string
  lighter: string
  alternativeLight: string
  alternative: string
}
// it could be your App.tsx file or theme file that is included in your tsconfig.json

export interface SliderPaletteOptions {
  color: CSSProperties['color']
  disabledColor: CSSProperties['color']
  activeColor: CSSProperties['color']
  label: CSSProperties['color']
  disabledLabel: CSSProperties['color']
  border: string
  boxShadow: string
}

export interface SwitchColorOptions {
  color: string
  colorDisabled: string
  bg: string
  bgChecked: string
  bgDisabled: string
  bgCheckedDisabled: string
}

export interface ToggledInputsColorOptions {
  fill: string
  bg: string
  border: string
  borderHover: string
  boxShadow: string
  opacity: number
}

export interface BreadCrumbsPaletteOptions {
  link: CSSProperties['color']
  color: CSSProperties['color']
}

export interface ButtonPaletteOptions {
  bgContainedDisabled: CSSProperties['color']
  colorContainedDisabled: CSSProperties['color']
  bgOutlined: CSSProperties['color']
  borderOutlined: string
  bgTextHover: CSSProperties['color']
  colorTextDisabled: CSSProperties['color']
  bgAlternate: CSSProperties['color']
  bgAlternateHover: CSSProperties['color']
  colorAlternate: CSSProperties['color']
  colorAlternateHover: CSSProperties['color']
  borderAlternateHover: string
}

export interface ButtonGroupPalette {
  bg: CSSProperties['color']
  bgHover: CSSProperties['color']
  colorHover: CSSProperties['color']
}

export interface IconButtonPalette {
  fill: CSSProperties['color']
  fillDisabled: CSSProperties['color']
  bgHover: CSSProperties['color']
}

export interface FABPalette {
  fill: CSSProperties['color']
  bg: CSSProperties['color']
  bgDisabled: string
  fillDisabled: CSSProperties['color']
}

export interface MenuPalette {
  border: string
  boxShadow: string
}

export interface SkeletonPalette {
  bg: string
}

export interface Alerts {
  bg: CSSProperties['color']
  color: CSSProperties['color']
  boxShadow: string
  border: string
}

export interface PaginationItem {
  color: CSSProperties['color']
  bg: CSSProperties['color']
  border: string
  colorHover: CSSProperties['color']
  bgHover: CSSProperties['color']
  borderHover: string
  colorDisabled: CSSProperties['color']
  bgDisabled: CSSProperties['color']
  borderDisabled: string
  colorActive: CSSProperties['color']
  bgActive: CSSProperties['color']
  borderActive: string
}

export interface TablePagination {
  main: CSSProperties['color']
  selectColor: CSSProperties['color']
  selectHoverBg: CSSProperties['color']
  menuItemBorder: string
  menuItemColor: CSSProperties['color']
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  export interface PaletteOptions {
    backgrounds: AppBackgrounds
    skeleton?: SkeletonPalette
    toggledInputs?: ToggledInputsColorOptions
    switch?: SwitchColorOptions
    slider: {
      activeColor: CSSProperties['color']
      background: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    newSlider?: SliderPaletteOptions
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    button?: ButtonPaletteOptions
    buttonGroup?: ButtonGroupPalette
    iconButton?: IconButtonPalette
    fab?: FABPalette
    menu?: MenuPalette
    breadcrumbs?: BreadCrumbsPaletteOptions
    tab?: {
      contained: {
        border: CSSProperties['color']
        color?: CSSProperties['color']
      }
    }
    paginationItem?: PaginationItem
    tablePagination?: TablePagination
    alerts?: Alerts
  }

  export interface Palette {
    backgrounds: AppBackgrounds
    skeleton?: SkeletonPalette
    toggledInputs?: ToggledInputsColorOptions
    switch?: SwitchColorOptions
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    slider: {
      activeColor: CSSProperties['color']
      background: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    newSlider?: SliderPaletteOptions
    button?: ButtonPaletteOptions
    buttonGroup?: ButtonGroupPalette
    iconButton?: IconButtonPalette
    fab?: FABPalette
    menu?: MenuPalette
    breadcrumbs?: BreadCrumbsPaletteOptions
    tab?: {
      contained: {
        border: CSSProperties['color']
        color?: CSSProperties['color']
      }
    }
    paginationItem?: PaginationItem
    tablePagination?: TablePagination
    alerts?: Alerts
  }

  export interface Theme {
    shape: Shape
    breakpoints: Breakpoints
    direction: Direction
    mixins: Mixins
    overrides?: Overrides
    palette: Palette
    props?: ComponentsProps
    shadows: Shadows
    spacing: Spacing
    transitions: Transitions
    typography: Typography
    // TODO fix any
    zIndex: any
  }
}
