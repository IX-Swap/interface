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
  violet: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        alternative: 'rgb(41, 17, 61)'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#9b00ed',
        bgContainedHover: '#8300ea!important',
        bgContainedDisabled: '#49148c'
      },
      input: {
        ...defaultPalette.input,
        bgBase: '#49148c',
        boxShadowBase: '0 0 0 100px #49148c inset!important',
        boxShadowOutline: '0 0 0 100px #691b9a inset !important'
      }
    }
  },
  orange: {
    palette: {
      ...defaultPalette,
      backgrounds: {
        ...defaultPalette.backgrounds,
        alternative: '#e65200'
      },
      button: {
        ...defaultPalette.button,
        bgContained: '#f57d00',
        bgContainedHover: '#ffa200!important',
        bgContainedDisabled: '#ef6d00'
      },
      input: {
        ...defaultPalette.input,
        bgBase: '#ef6d00',
        boxShadowBase: '0 0 0 100px #ef6d00 inset!important',
        boxShadowOutline: '0 0 0 100px #fb8d00 inset !important'
      }
    }
  }
}
