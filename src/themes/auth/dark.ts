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
  background: {
    default: '#11254C',
    paper: '#132A57'
  },
  backgrounds: {
    default: '#0E1F42',
    light: '#1c3e81',
    lighter: tinycolor('#132a57').lighten(20).toHex(),
    // alternative: '#0E1A32',
    alternative:
      'radial-gradient(140.5% 224.8% at 149.5% 9.6%, rgba(65, 128, 255, 0.4) 1.56%, rgba(31, 106, 255, 0.4) 38.45%, rgba(0, 85, 255, 0) 100%), #0E1A32',
    alternativeLight: tinycolor('#132a57').lighten(20).toHex()
  },
  button: {
    bgContained: '#0055FF',
    bgContainedHover: '#4080ff!important',
    bgContainedDisabled: '#0055FF20'
  },
  input: {
    bgBase: '#1a397c40',
    boxShadowBase: '0 0 0 100px #1a397c40 inset!important',
    boxShadowOutline: '0 0 0 100px #1a397c inset !important'
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

export const darkTheme: ThemesSet = {
  default: {
    palette: defaultPalette
  },
  red: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#700913',
        alternative: '#A41523'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#EA4600',
        bgContainedHover: '#FF7033!important',
        bgContainedDisabled: '#B33D0A'
      },
      input: {
        bgBase: '#70091340',
        boxShadowBase: '0 0 0 100px #70091340 inset!important',
        boxShadowOutline: '0 0 0 100px #700913 inset !important'
      }
    }
  },
  orange: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#7B3B00',
        alternative: '#E56E00'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#A65000',
        bgContainedHover: '#C25D00!important',
        bgContainedDisabled: '#9F5007'
      },
      input: {
        bgBase: '#7B3B0040',
        boxShadowBase: '0 0 0 100px #7B3B0040 inset!important',
        boxShadowOutline: '0 0 0 100px #7B3B00 inset !important'
      }
    }
  },
  yellow: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#007336',
        alternative: '#10BA73'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#8ABA05',
        bgContainedHover: '#9BD106!important',
        bgContainedDisabled: '#749C05'
      },
      input: {
        bgBase: '#00733640',
        boxShadowBase: '0 0 0 100px #00733640 inset!important',
        boxShadowOutline: '0 0 0 100px #007336 inset !important'
      }
    }
  },
  green: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#1A2B5D',
        alternative: '#059CA1'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#03BDC9',
        bgContainedHover: '#04E3F1!important',
        bgContainedDisabled: '#05ACB6'
      },
      input: {
        bgBase: '#1A2B5D40',
        boxShadowBase: '0 0 0 100px #1A2B5D40 inset!important',
        boxShadowOutline: '0 0 0 100px #1A2B5D inset !important'
      }
    }
  },
  indigo: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#54233A',
        alternative: '#1E000E'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#FF268B',
        bgContainedHover: '#FF57A5!important',
        bgContainedDisabled: '#811044'
      },
      input: {
        bgBase: '#54233A40',
        boxShadowBase: '0 0 0 100px #54233A40 inset!important',
        boxShadowOutline: '0 0 0 100px #54233A inset !important'
      }
    }
  },
  violet: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        default: '#3C0E83',
        alternative: '#6622CC'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#C000FF',
        bgContainedHover: '#D966FF!important',
        bgContainedDisabled: '#7B3A90'
      },
      input: {
        bgBase: '#3C0E8340',
        boxShadowBase: '0 0 0 100px #3C0E8340 inset!important',
        boxShadowOutline: '0 0 0 100px #3C0E83 inset !important'
      }
    }
  }
}
