// @ts-nocheck
import { DeprecatedThemeOptions } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeColors } from 'themes/app/colors'
import tinycolor from 'tinycolor2'

const { palette } = createTheme()

interface ThemesSet {
  default: DeprecatedThemeOptions
  violet: DeprecatedThemeOptions
}

const defaultPalette = {
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
    bgContained: '#4C88FF',
    bgContainedHover: '#78A5FF',
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
    borderAlternateHover: tinycolor('#4c88ff').setAlpha(0.3).toRgbString(),
    bgLight: tinycolor('#4c88ff').setAlpha(0.16).toRgbString()
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
    activeBackground: tinycolor(themeColors.primary).lighten(64).toHexString(),
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
  table: {
    color: '#778194',
    rowBg: '#FFFFFF',
    rowColor: '#778194',
    boxShadow: `0px 32px 64px ${tinycolor('#3b4251')
      .setAlpha(0.08)
      .toRgbString()}`,
    border: '#DBE2EC',
    headerColor: '#343A47',
    headerShadow: `0px -4px 4px ${tinycolor('#a2acbf')
      .setAlpha(0.08)
      .toRgbString()}`
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
    label: '#3B4251',
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
  otpInput: {
    bg: '#FFFFFF',
    color: '#3B4251',
    colorError: '#F56283',
    border: tinycolor('#d3d9e5').setAlpha(0.6).toRgbString(),
    borderFocus: '#78A5FF',
    borderError: tinycolor('#f56283').setAlpha(0.6).toRgbString(),
    placeholder: '#DBE2EC',
    placeholderFocus: '#77A5FE',
    placeholderError: '#F56283',
    boxShadow: tinycolor('#3b4251').setAlpha(0.04).toRgbString()
  },
  success: {
    main: '#7DD320',
    light: tinycolor('#7DD320').setAlpha(0.16).toRgbString()
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
    main: '#4C88FF',
    light: '#ABB8CF',
    dark: tinycolor('#ABB8CF').setAlpha(0.2).toRgbString()
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
  }),
  header: {
    bg: 'rgba(255, 255, 255, 0.75)'
  },
  dialog: {
    color: '#343A47',
    content: '#778194'
  }
}

export const lightTheme: ThemesSet = {
  default: {
    palette: defaultPalette
  },
  red: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#EA4600'
      },
      info: {
        ...defaultPalette.info,
        main: '#EA4600'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#EA4600',
        bgContainedHover: '#FF7033',
        bgContainedDisabled: '#B33D0A'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#EA4600',
        borderHover: '#EA460020',
        bgActive: '#EA4600',
        borderActive: '#EA4600'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#EA4600').setAlpha(0.1).toRgbString(),
        colorActive: '#EA4600',
        borderActive: tinycolor('#EA4600').setAlpha(0.5).toRgbString()
      }
    }
  },
  orange: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#A65000'
      },
      info: {
        ...defaultPalette.info,
        main: '#A65000'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#A65000',
        bgContainedHover: '#C25D00',
        bgContainedDisabled: '#9F5007'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#A65000',
        borderHover: '#A6500020',
        bgActive: '#A65000',
        borderActive: '#A65000'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#A65000').setAlpha(0.1).toRgbString(),
        colorActive: '#A65000',
        borderActive: tinycolor('#A65000').setAlpha(0.5).toRgbString()
      }
    }
  },
  yellow: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#8ABA05'
      },
      info: {
        ...defaultPalette.info,
        main: '#8ABA05'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#8ABA05',
        bgContainedHover: '#9BD106',
        bgContainedDisabled: '#749C05'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#8ABA05',
        borderHover: '#8ABA0520',
        bgActive: '#8ABA05',
        borderActive: '#8ABA05'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#8ABA05').setAlpha(0.1).toRgbString(),
        colorActive: '#8ABA05',
        borderActive: tinycolor('#8ABA05').setAlpha(0.5).toRgbString()
      }
    }
  },
  green: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#03BDC9'
      },
      info: {
        ...defaultPalette.info,
        main: '#03BDC9'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#03BDC9',
        bgContainedHover: '#04E3F1',
        bgContainedDisabled: '#05ACB6'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#03BDC9',
        borderHover: '#03BDC920',
        bgActive: '#03BDC9',
        borderActive: '#03BDC9'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#03BDC9').setAlpha(0.1).toRgbString(),
        colorActive: '#03BDC9',
        borderActive: tinycolor('#03BDC9').setAlpha(0.5).toRgbString()
      }
    }
  },
  indigo: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#FF268B'
      },
      info: {
        ...defaultPalette.info,
        main: '#FF268B'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#FF268B',
        bgContainedHover: '#FF57A5',
        bgContainedDisabled: '#811044'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#FF268B',
        borderHover: '#FF268B20',
        bgActive: '#FF268B',
        borderActive: '#FF268B'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#FF268B').setAlpha(0.1).toRgbString(),
        colorActive: '#FF268B',
        borderActive: tinycolor('#FF268B').setAlpha(0.5).toRgbString()
      }
    }
  },
  violet: {
    palette: {
      ...defaultPalette,
      primary: {
        ...defaultPalette.primary,
        main: '#C000FF'
      },
      info: {
        ...defaultPalette.info,
        main: '#C000FF'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#C000FF',
        bgContainedHover: '#D966FF',
        bgContainedDisabled: '#7B3A90'
      },
      paginationItem: {
        ...defaultPalette.paginationItem,
        colorHover: '#C000FF',
        borderHover: '#C000FF20',
        bgActive: '#C000FF',
        borderActive: '#C000FF'
      },
      stepIcon: {
        ...defaultPalette.stepIcon,
        bgActive: tinycolor('#C000FF').setAlpha(0.1).toRgbString(),
        colorActive: '#C000FF',
        borderActive: tinycolor('#C000FF').setAlpha(0.5).toRgbString()
      }
    }
  }
}
