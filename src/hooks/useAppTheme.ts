import { useMediaQuery } from '@material-ui/core'
import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { isDevEnv } from 'config'
import { useMemo } from 'react'
import { darkTheme } from 'themes/dark'
import { lightTheme } from 'themes/light'
import { getThemeOverrides } from 'themes/overrides'
import { typography } from 'themes/typography'

export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const baseTheme = prefersDarkMode ? darkTheme : lightTheme
  const theme = useMemo(
    () =>
      createMuiTheme({
        ...baseTheme,
        typography,
        overrides: getThemeOverrides(baseTheme as Theme)
      }),
    [prefersDarkMode] // eslint-disable-line
  )

  return isDevEnv ? theme : lightTheme
}
