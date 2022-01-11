import { ThemeOptions } from '@material-ui/core'
import tinycolor from 'tinycolor2'

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#132a57',
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
      default: '#132a57',
      light: tinycolor('#132a57').lighten(10),
      lighter: tinycolor('#132a57').lighten(20),
      alternative: tinycolor('#132a57').lighten(10),
      alternativeLight: tinycolor('#132a57').lighten(20)
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
      primary: '#132a57'
    }
  }
}
