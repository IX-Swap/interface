// @ts-nocheck
import { DeprecatedThemeOptions } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import tinycolor from 'tinycolor2'

const { palette } = createTheme()

interface ThemesSet {
  default: DeprecatedThemeOptions
  violet: DeprecatedThemeOptions
}

const defaultPalette = {
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
  tooltip: {
    color: '#89A1CE',
    bg: '#1D3667'
  },
  chip: {
    fill: '#496396',
    bg: '#1D3667',
    opacity: 1,
    color: '#89A1CE',
    bgBasic: '#1D3667',
    bgSpecial: '#152D5F'
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
    activeBackground: tinycolor('#8995fc').setAlpha(0.1).toRgbString(),
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
    bgContained: '#4C88FF',
    bgContainedHover: '#78A5FF',
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
    borderAlternateHover: '#4C88FF',
    bgLight: tinycolor('#4c88ff').setAlpha(0.16).toRgbString()
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
  divider: '#89A1CE',
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
      .toRgbString()}`,
    border: '#23407A',
    headerColor: '#FFFFFF',
    headerShadow: `0px -4px 4px ${tinycolor('#0e1f3f')
      .setAlpha(0.08)
      .toRgbString()}`
  },
  skeleton: {
    bg: '#1D3667'
  },
  input: {
    placeholder: '#89A1CE',
    border: '#1D3667',
    disabledBg: '#11254C'
  },
  stepIcon: {
    bg: tinycolor('#BEC4CF').setAlpha(0.1).toRgbString(),
    color: '#BEC4CF',
    border: tinycolor('#BEC4CF').setAlpha(0.5).toRgbString(),
    bgActive: tinycolor('#4C88FF').setAlpha(0.1).toRgbString(),
    colorActive: '#4C88FF',
    borderActive: tinycolor('#4C88FF').setAlpha(0.5).toRgbString(),
    bgCompleted: tinycolor('#7DD320').setAlpha(0.1).toRgbString(),
    colorCompleted: '#7DD320',
    borderCompleted: tinycolor('#7DD320').setAlpha(0.5).toRgbString(),
    bgError: tinycolor('#F56283').setAlpha(0.1).toRgbString(),
    colorError: '#F56283',
    borderError: tinycolor('#F56283').setAlpha(0.5).toRgbString()
  },
  navigationLink: {
    color: '#FFFFFF',
    activeColor: '#4C88FF'
  },
  select: {
    bg: '#152D5F',
    bgDisabled: '#11254C',
    itemBorder: '#1D3667',
    placeholder: '#89A1CE',
    label: '#89A1CE',
    color: '#496396',
    colorDisabled: '#496396',
    labelDisabled: '#496396',
    border: '#1D3667'
  },
  dropdownLink: {
    boxShadow: tinycolor('#0e1f3f').setAlpha(0.3).toRgbString(),
    border: '#1D3667'
  },
  notificationsDropdown: {
    bg: '#11254C',
    message: '#778194',
    divider: '#1D3667',
    bgHover: tinycolor('#152D5F').setAlpha(0.4).toRgbString()
  },
  otpInput: {
    bg: '#152D5F',
    color: '#FFFFFF',
    colorError: '#F56283',
    border: '#1D3667',
    borderFocus: '#78A5FF',
    borderError: tinycolor('#f56283').setAlpha(0.6).toRgbString(),
    placeholder: '#1D3667',
    placeholderFocus: '#77A5FE',
    placeholderError: '#F56283',
    boxShadow: tinycolor('#0e1f3f').setAlpha(0.2).toRgbString()
  },
  success: {
    main: '#7DD320'
  },
  warning: {
    main: '#FFC900',
    dark: '#D3A701',
    light: tinycolor('#FFC900').setAlpha(0.2).toRgbString()
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
    bg: '#132A57'
  },
  dialog: {
    color: '#FFFFFF',
    content: '#89A1CE'
  }
}

export const darkTheme: ThemesSet = {
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
