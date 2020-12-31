import { ThemeOptions } from '@material-ui/core'
import { themeColors } from 'themes/colors'
import tinycolor from 'tinycolor2'

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: themeColors.primary,
      light: tinycolor(themeColors.primary).lighten(25).toHexString(),
      dark: tinycolor(themeColors.primary).darken(10).toHexString()
    },
    secondary: {
      main: themeColors.secondary
    },
    background: {
      default: tinycolor(themeColors.primary).darken(15).toHexString(),
      paper: tinycolor(themeColors.primary).darken(15).toHexString()
    },
    backgrounds: {
      main: tinycolor(themeColors.primary).darken(15).toHexString(),
      secondary: tinycolor(themeColors.primary).darken(17).toHexString()
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary).darken(20).toHexString(),
      activeColor: '#ffffff'
    }
  }
}
