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
    checkbox: {
      fill: '#132A57',
      bg: '#132A57',
      border: '1px solid #89A1CE',
      borderHover: '1px solid #78A5FF',
      boxShadow: 'none',
      opacity: 0.3
    },

    radio: {
      fill: '#132A57',
      fillCheckedDisabled: '#11254C',
      bg: '#132A57',
      bgChecked: '#4C88FF',
      bgDisabled: '#132A57',
      bgCheckedDisabled: '#3D5689',
      border: '1px solid #4C88FF',
      borderChecked: '1px solid transparent',
      borderDisabled: '1px solid #89A1CE',
      borderCheckedDisabled: '1px solid transparent',
      boxShadow: '0px 4px 4px transparent'
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
    slider: {
      background: '#C6D9FF',
      activeColor: '#132a57',
      activeBackground: '#0c469c'
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
