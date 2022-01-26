import { DeprecatedThemeOptions } from '@mui/material'
import tinycolor from 'tinycolor2'

// TODO Need to do some refactoring in future
export const darkTheme: DeprecatedThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#0055FF',
      light: tinycolor('#132a57').lighten(25).toHexString(),
      dark: tinycolor('#132a57').darken(10).toHexString()
    },
    secondary: {
      main: '#132a57'
    },
    background: {
      default: '#132a57',
      paper: '#132a57'
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
      primary: '#ffffff'
    }
  }
}
