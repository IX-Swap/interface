import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { typography } from 'themes/typography'
import { getThemeOverrides } from 'themes/overrides'
import { rte } from 'themes/rte'

export const createAppTheme = (options: ThemeOptions) => {
  return createMuiTheme({
    ...options,
    typography,
    overrides: {
      ...rte,
      ...getThemeOverrides(options)
    }
  })
}
