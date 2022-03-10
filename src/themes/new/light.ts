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
      main: '#78A5FF',
      dark: '#F0F2F7',
      light: '#EDF2FA'
    },
    checkbox: {
      fill: '#FFFFFF',
      bg: '#FFFFFF',
      border: '1px solid #78A5FF',
      borderDisabled: '1px solid #DBE2EC',
      borderChecked: '1px solid transparent',
      boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)'
    },
    radio: {
      fill: '#FFFFFF',
      fillCheckedDisabled: '#F7F9FA',
      bg: '#FFFFFF',
      bgChecked: '#4C88FF',
      bgDisabled: '#DBE2EC',
      bgCheckedDisabled: '#DBE2EC',
      border: '1px solid #78A5FF',
      borderChecked: '1px solid transparent',
      borderDisabled: '1px solid #DBE2EC',
      borderCheckedDisabled: '1px solid transparent',
      boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)'
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
    slider: {
      background: '#C6D9FF',
      activeColor: '#ffffff',
      activeBackground: '#0C469C'
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary)
        .lighten(64)
        .toHexString(),
      activeColor: themeColors.primary
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
