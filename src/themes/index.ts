import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { typography } from 'themes/typography'

export const createAppTheme = (options: ThemeOptions) => {
  return createMuiTheme({
    ...options,
    typography
  })
}
