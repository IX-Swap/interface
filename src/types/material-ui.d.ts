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
// it could be your App.tsx file or theme file that is included in your tsconfig.json

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  export interface PaletteOptions {
    backgrounds: AppBackgrounds
    toggledInputs?: ToggledInputsColorOptions
    switch?: SwitchColorOptions
    slider: {
      activeColor: CSSProperties['color']
      background: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    tab?: {
      contained: {
        border: CSSProperties['color']
        color?: CSSProperties['color']
      }
    }
  }

  export interface Palette {
    backgrounds: AppBackgrounds
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
    tab?: {
      contained: {
        border: CSSProperties['color']
        color?: CSSProperties['color']
      }
    }
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
