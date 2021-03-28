import * as createPalette from '@material-ui/core/styles/createPalette' // eslint-disable-line
import { CSSProperties } from '@material-ui/core/styles'

export interface AppBackgrounds {
  default: CSSProperties['color']
  light: CSSProperties['color']
  lighter: CSSProperties['color']
}

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    backgrounds: AppBackgrounds
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
