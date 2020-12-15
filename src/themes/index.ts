import { createMuiTheme, Theme } from '@material-ui/core/styles'
import defaultTheme from 'themes/default'
import { typography } from 'themes/typography'
import { overrides } from 'themes/overrides'
import { rte } from 'themes/rte'

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
