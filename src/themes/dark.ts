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
      main: '#ffffff'
    },
    background: {
      default: '#121212',
      paper: '#121212'
    },
    backgrounds: {
      default: '#121212',
      light: '#2D2D2D',
      lighter: 'rgba(255, 255, 255, 0.08)',
      alternative: '#56AA82',
      alternativeLight: 'rgba(86, 170, 130, 0.06)'
    },
    sidebar: {
      activeBackground: 'rgba(137, 149, 252, 0.11)',
      activeColor: '#8995FC'
    },
    slider: {
      background: '#C6D9FF',
      activeColor: '#ffffff',
      activeBackground: '#0c469c'
    },
    text: {
      primary: '#ffffff'
    }
  }
}
