import { createTheme, DeprecatedThemeOptions } from '@mui/material'
import tinycolor from 'tinycolor2'

const { palette } = createTheme()

export const darkTheme: DeprecatedThemeOptions = {
  palette: {
    mode: 'dark',
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
    },
    'special-red': palette.augmentColor({
      color: {
        main: '#F56283',
        light: '#F58FA6',
        contrastText: '#FFF'
      }
    }),
    'special-green': palette.augmentColor({
      color: {
        main: '#7DD320',
        light: '#AADF70',
        contrastText: '#FFF'
      }
    })
  }
}
