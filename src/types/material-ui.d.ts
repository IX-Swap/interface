import * as createPalette from '@material-ui/core/styles/createPalette' // eslint-disable-line
import { CSSProperties } from '@material-ui/styles'

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    backgrounds: {
      main: CSSProperties['color']
      secondary: CSSProperties['color']
    }
    sidebar: {
      activeColor: CSSProperties['color']
      activeBackground: CSSProperties['color']
    }
  }

  export interface Palette {
    backgrounds: {
      main: CSSProperties['color']
      secondary: CSSProperties['color']
    }
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
