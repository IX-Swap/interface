import { ThemeOptions } from '@material-ui/core'
import tinycolor from 'tinycolor2'

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#7F89E5',
      light: tinycolor('#7F89E5').lighten(25).toHexString(),
      dark: tinycolor('#7F89E5').darken(10).toHexString()
    },
    secondary: {
      main: '#0c469c'
    },
    background: {
      default: '#121212',
      paper: '#121212'
    },
    backgrounds: {
      default: '#121212',
      light: '#2D2D2D',
      lighter: 'rgba(255, 255, 255, 0.08)'
    },
    sidebar: {
      activeBackground: 'rgba(137, 149, 252, 0.11)',
      activeColor: '#8995FC'
    },
    text: {
      primary: '#ffffff'
    }
  }
}
