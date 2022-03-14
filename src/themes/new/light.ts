import { DeprecatedThemeOptions } from '@mui/material'
import { themeColors } from 'themes/new/colors'
import tinycolor from 'tinycolor2'

export const lightTheme: DeprecatedThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4C88FF',
      dark: '#3E70D2',
      light: '#78A5FF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#DBE2EC',
      dark: '#F0F2F7',
      light: '#EDF2FA'
    },
    action: {
      selected: tinycolor(themeColors.primary).lighten(64).toHexString()
    },
    background: {
      default: '#F7F9FA',
      paper: '#FFFFFF'
    },
    backgrounds: {
      default: '#F7F9FA',
      light: '#ffffff',
      lighter: '#e3e3e3',
      alternative: '#56AA82',
      alternativeLight: 'rgba(86, 170, 130, 0.06)'
    },
    // TODO Remove old slider after delete old theme
    slider: {
      background: '#C6D9FF',
      activeColor: '#ffffff',
      activeBackground: '#0C469C'
    },
    newSlider: {
      activeColor: '#4C88FF',
      disabledColor: '#DBE2EC',
      color: '#DBE2EC',
      label: '#778194',
      disabledLabel: '#DBE2EC',
      border: '#ffffff',
      boxShadow: `${tinycolor('#4c88ff').setAlpha(0.2).toRgbString()}`
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary)
        .lighten(64)
        .toHexString(),
      activeColor: themeColors.primary
    },
    tab: {
      contained: {
        border: '#EDF2FA',
        color: '#A2ACBF'
      }
    },
    divider: '#DBE2EC',
    text: {
      primary: '#3B4251',
      secondary: '#778194'
    },
    success: {
      main: '#7DD320'
    },
    warning: {
      main: '#FFC900'
    },
    error: {
      main: '#F56283'
    },
    info: {
      main: '#4C88FF'
    }
  }
}
