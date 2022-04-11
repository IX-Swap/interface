import { DeprecatedThemeOptions } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeColors } from 'themes/app/colors'
import tinycolor from 'tinycolor2'

const { palette } = createTheme()

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
    tooltip: {
      color: '#778194',
      bg: '#EDF2FA'
    },
    chip: {
      fill: '#DBE2EC',
      bg: '#EEF1F4',
      opacity: 0.5,
      color: '#0A1326',
      bgBasic: '#F7F9FA',
      bgSpecial: '#FFFFFF'
    },
    toggledInputs: {
      fill: '#FFFFFF',
      bg: '#FFFFFF',
      border: '#DBE2EC',
      borderHover: '#78A5FF',
      boxShadow: '#a2acbf',
      opacity: 0.6
    },
    switch: {
      bg: '#778194',
      bgDisabled: '#D3D9E5',
      bgChecked: '#4C88FF',
      bgCheckedDisabled: '#D3D9E5',
      color: '#ffffff',
      colorDisabled: '#ffffff'
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
      alternativeLight: tinycolor('#56aa82').setAlpha(0.06).toRgbString()
    },
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
      boxShadow: tinycolor('#4c88ff').setAlpha(0.2).toRgbString()
    },
    button: {
      bgContainedDisabled: '#EDF2FA',
      colorContainedDisabled: '#778194',
      bgOutlined: '#FFFFFF',
      borderOutlined: tinycolor('#4c88ff').setAlpha(0.3).toRgbString(),
      bgTextHover: '#EDF2FA',
      colorTextDisabled: '#89A1CE',
      bgAlternate: '#FFFFFF',
      bgAlternateHover: '#78A5FF',
      colorAlternate: '#778194',
      colorAlternateHover: '#FFFFFF',
      borderAlternateHover: tinycolor('#4c88ff').setAlpha(0.3).toRgbString()
    },
    buttonGroup: {
      bg: '#FFFFFF',
      bgHover: '#EDF2FA',
      colorHover: '#4C88FF'
    },
    iconButton: {
      fill: '#778194',
      fillDisabled: '#DBE2EC',
      bgHover: '#EDF2FA'
    },
    fab: {
      fill: '#778194',
      bg: '#FFFFFF',
      fillDisabled: '#DBE2EC',
      bgDisabled: '#EDF2FA'
    },
    menu: {
      border: '#DBE2EC',
      boxShadow: tinycolor('#a2acbf').setAlpha(0.16).toRgbString()
    },
    sidebar: {
      activeBackground: tinycolor(themeColors.primary)
        .lighten(64)
        .toHexString(),
      activeColor: themeColors.primary
    },
    breadcrumbs: {
      link: '#3B4251',
      color: '#778194'
    },
    alerts: {
      bg: '#FFFFFF',
      color: '#778194',
      border: '#E6EBF3',
      boxShadow: `0px 24px 24px ${tinycolor('#0a1326')
        .setAlpha(0.08)
        .toRgbString()}`
    },
    tab: {
      contained: {
        border: '#EDF2FA',
        color: '#A2ACBF'
      }
    },
    paginationItem: {
      color: '#778194',
      bg: '#FFFFFF',
      border: '#FFFFFF',
      colorHover: '#4C88FF',
      bgHover: '#FFFFFF',
      borderHover: '#4C88FF20',
      colorDisabled: '#89A1CE',
      bgDisabled: '#EDF2FA',
      borderDisabled: '#EDF2FA',
      colorActive: '#FFFFFF',
      bgActive: '#4C88FF',
      borderActive: '#4C88FF'
    },
    tablePagination: {
      main: '#778194',
      selectColor: '#0A1326',
      selectHoverBg: '#F0F2F7',
      menuItemColor: tinycolor('#0A1326').setAlpha(0.7).toRgbString(),
      menuItemBorder: '#EDF2FA'
    },
    divider: '#DBE2EC',
    text: {
      primary: '#3B4251',
      secondary: '#778194'
    },
    skeleton: {
      bg: '#EDF2FA'
    },
    input: {
      placeholder: '#778194',
      border: '#DBE2EC',
      disabledBg: '#F0F2F7'
    },
    stepIcon: {
      bg: tinycolor('#BEC4CF1A').setAlpha(0.1).toRgbString(),
      color: '#BEC4CF',
      border: tinycolor('#BEC4CF1A').setAlpha(0.5).toRgbString(),
      bgActive: tinycolor('#4C88FF').setAlpha(0.1).toRgbString(),
      colorActive: '#4C88FF',
      borderActive: tinycolor('#4C88FF').setAlpha(0.5).toRgbString(),
      bgCompleted: tinycolor('#7DD32080').setAlpha(0.1).toRgbString(),
      colorCompleted: '#7DD32080',
      borderCompleted: tinycolor('#7DD32080').setAlpha(0.5).toRgbString(),
      bgError: tinycolor('#F56283').setAlpha(0.1).toRgbString(),
      colorError: '#F56283',
      borderError: tinycolor('#F56283').setAlpha(0.5).toRgbString()
    },
    navigationLink: {
      color: '#778194',
      activeColor: '#3B4251'
    },
    select: {
      bg: '#FFFFFF',
      bgDisabled: '#F0F2F7',
      itemBorder: '#EDF2FA',
      placeholder: '#778194',
      label: '#0A1326',
      color: '#778194',
      colorDisabled: '#778194',
      labelDisabled: '#778194',
      border: '#DBE2EC'
    },
    dropdownLink: {
      boxShadow: tinycolor('#a2acbf16').setAlpha(0.16).toRgbString(),
      border: '#EDF2FA'
    },
    notificationsDropdown: {
      bg: '#FFFFFF',
      message: '#778194',
      divider: '#EDF2FA',
      bgHover: tinycolor('#EDF2FA').setAlpha(0.4).toRgbString()
    },
    success: {
      main: '#7DD320'
    },
    warning: {
      main: '#FFC900',
      dark: '#D3A701',
      light: tinycolor('#ffc900').setAlpha(0.2).toRgbString()
    },
    error: {
      main: '#F56283',
      dark: '#FF8080',
      light: tinycolor('#FF8080').setAlpha(0.2).toRgbString()
    },
    info: {
      main: '#4C88FF'
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
