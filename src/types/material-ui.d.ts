import * as createPalette from '@mui/material' //eslint-disable-line
import { Theme } from '@mui/material/styles' //eslint-disable-line
import { CSSProperties } from '@mui/material'

export interface AppBackgrounds {
  default: string
  light: string
  lighter: string
  alternativeLight: string
  alternative: string
}
// it could be your App.tsx file or theme file that is included in your tsconfig.json

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  export interface PaletteOptions {
    backgrounds: AppBackgrounds
    slider: {
      activeColor: CSSProperties['color']
      color: CSSProperties['color']
      label: CSSProperties['color']
      disabledLabel: CSSProperties['color']
      border: string
      boxShadow: string
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
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    slider: {
      activeColor: CSSProperties['color']
      color: CSSProperties['color']
      label: CSSProperties['color']
      disabledLabel: CSSProperties['color']
      border: string
      boxShadow: string
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
