import { createTheme, DeprecatedThemeOptions } from '@mui/material'
import { themeColors } from 'themes/old/colors'
import tinycolor from 'tinycolor2'

const { palette } = createTheme()

export const lightTheme: DeprecatedThemeOptions = {
  palette: {
    primary: {
      main: themeColors.primary
    },
    secondary: {
      main: tinycolor(themeColors.primary).lighten(5).toHexString()
    },
    action: {
      selected: tinycolor(themeColors.primary).lighten(64).toHexString()
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    backgrounds: {
      default: '#ffffff',
      light: '#fafafa',
      lighter: '#e3e3e3',
      alternative: '#56AA82',
      alternativeLight: 'rgba(86, 170, 130, 0.06)'
    },
    slider: {
      background: '#C6D9FF',
      activeColor: '#ffffff',
      activeBackground: '#0c469c'
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary)
        .lighten(64)
        .toHexString(),
      activeColor: themeColors.primary
    },
    divider: '#dddddd',
    text: {
      primary: '#444444'
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
