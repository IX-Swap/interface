import * as createPalette from '@mui/material' //eslint-disable-line
import { CSSProperties } from '@mui/material'

export interface AppBackgrounds {
  default: string
  light: string
  lighter: string
  alternativeLight: string
  alternative: string
}

declare module '@mui/material/styles' {
  export interface PaletteOptions {
    backgrounds: AppBackgrounds
    slider: {
      activeColor: CSSProperties['color']
      background: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
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
      background: CSSProperties['color']
      activeBackground: CSSProperties['color']
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
    zIndex: ZIndex
  }
}
