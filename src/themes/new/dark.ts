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
    toggledInputs: {
      fill: '#132A57',
      bg: '#132A57',
      border: '#89A1CE',
      borderHover: '#78A5FF',
      boxShadow: '#a2acbf',
      opacity: 0.3
    },
    switch: {
      bg: '#89A1CE',
      bgDisabled: '#1D3667',
      bgChecked: '#4C88FF',
      bgCheckedDisabled: '#1D3667',
      color: '#ffffff',
      colorDisabled: '#11254C'
    },
    background: {
      default: '#11254C',
      paper: '#152D5F'
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
    newSlider: {
      activeColor: '#4C88FF',
      disabledColor: '#DBE2EC',
      color: '#89A1CE',
      label: '#496396',
      disabledLabel: '#496396',
      border: '#ffffff',
      boxShadow: tinycolor('#4c88ff').setAlpha(0.2).toRgbString()
    },
    button: {
      bgContainedDisabled: '#132A57',
      colorContainedDisabled: '#496396',
      bgOutlined: '#132A57',
      borderOutlined: '#78A5FF',
      bgTextHover: '#1D3667',
      colorTextDisabled: '#496396',
      bgAlternate: '#132A57',
      bgAlternateHover: '#132A57',
      colorAlternate: '#FFFFFF',
      colorAlternateHover: '#4C88FF',
      borderAlternateHover: '#4C88FF'
    },
    buttonGroup: {
      bg: '#132A57',
      bgHover: '#78A5FF',
      colorHover: '#EDF2FA'
    },
    iconButton: {
      fill: '#496396',
      fillDisabled: '#1D3667',
      bgHover: '#1D3667'
    },
    fab: {
      fill: '#496396',
      bg: '#132A57',
      fillDisabled: '#1D3667',
      bgDisabled: 'transparent'
    },
    menu: {
      border: '#1D3667',
      boxShadow: tinycolor('#0e1f3f').setAlpha(0.3).toRgbString()
    },
    tab: {
      contained: {
        border: tinycolor('#4C88FF').setAlpha(0.3).toRgbString(),
        color: undefined
      }
    },
    alerts: {
      bg: '#152D5F',
      color: '#89A1CE',
      border: '#1D3667',
      boxShadow: `0px 24px 24px ${tinycolor('#0e1f3f')
        .setAlpha(0.3)
        .toRgbString()}`
    },
    paginationItem: {
      color: '#89A1CE',
      bg: '#152D5F',
      border: '#152D5F',
      colorHover: '#4C88FF',
      bgHover: '#152D5F',
      borderHover: '#4C88FF',
      colorDisabled: '#496396',
      bgDisabled: '#132A57',
      borderDisabled: '#132A57',
      colorActive: '#FFFFFF',
      bgActive: '#4C88FF',
      borderActive: '#4C88FF'
    },
    tablePagination: {
      main: '#496396',
      selectColor: '#FFFFFF',
      selectHoverBg: '#496396',
      menuItemColor: tinycolor('#FFFFFF').setAlpha(0.7).toRgbString(),
      menuItemBorder: '#1D3667'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#496396'
    },
    table: {
      color: '#89A1CE',
      rowBg: '#152D5F',
      rowColor: '#89A1CE',
      boxShadow: `0px 80px 80px ${tinycolor('#0e1f3f')
        .setAlpha(0.3)
        .toRgbString()}`
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
