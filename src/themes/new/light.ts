import { DeprecatedThemeOptions } from '@mui/material'
import { themeColors } from 'themes/new/colors'
import tinycolor from 'tinycolor2'

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
    }
  }
}
