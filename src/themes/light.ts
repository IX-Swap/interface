import { ThemeOptions } from '@material-ui/core'
import { themeColors } from 'themes/colors'
import tinycolor from 'tinycolor2'

export const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: themeColors.primary
    },
    secondary: {
      main: '#444444'
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
      lighter: '#e3e3e3'
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
