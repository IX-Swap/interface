import { DeprecatedThemeOptions } from '@mui/material'
import tinycolor from 'tinycolor2'

export const darkTheme: DeprecatedThemeOptions = {
  palette: {
    mode: 'dark',
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
    background: {
      default: '#11254C',
      paper: '#132A57'
    },
    backgrounds: {
      default: '#0E1F42',
      light: tinycolor('#132a57').lighten(10).toHex(),
      lighter: tinycolor('#132a57').lighten(20).toHex(),
      alternative: '#0E1A32',
      alternativeLight: tinycolor('#132a57').lighten(20).toHex()
    },
    sidebar: {
      activeBackground: 'rgba(137, 149, 252, 0.11)',
      activeColor: '#8995FC'
    },
    breadcrumbs: {
      link: '#89A1CE',
      color: '#FFFFFF'
    },
    slider: {
      background: '#C6D9FF',
      activeColor: '#132a57',
      activeBackground: '#0c469c'
    },
    tab: {
      contained: {
        border: tinycolor('#4C88FF').setAlpha(0.3).toRgbString(),
        color: undefined
      }
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#496396'
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
