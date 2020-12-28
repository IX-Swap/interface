import { ThemeOptions } from '@material-ui/core'
import { themeColors } from 'themes/colors'
import tinycolor from 'tinycolor2'

export const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: themeColors.primary
    },
    action: {
      selected: tinycolor(themeColors.primary).lighten(64).toHexString()
    },
    backgrounds: {
      main: '#ffffff',
      secondary: '#fafafa'
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary)
        .lighten(64)
        .toHexString(),
      activeColor: themeColors.primary
    }
  }
}
