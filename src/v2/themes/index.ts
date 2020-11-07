import { createMuiTheme, Theme } from '@material-ui/core/styles'
import defaultTheme from 'v2/themes/default'
import { typography } from 'v2/themes/typography'
import { overrides } from 'v2/themes/overrides'
import { rte } from 'v2/themes/rte'

interface Themes {
  [key: string]: Theme
}

const base = {
  typography,
  overrides: {
    ...overrides,
    ...rte
  }
}

const themes: Themes = {
  default: createMuiTheme({
    ...defaultTheme,
    ...base
  }),
  dark: createMuiTheme({
    ...base,
    palette: {
      type: 'dark'
    }
  })
}

export default themes
