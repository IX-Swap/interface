import { createTheme, Theme } from '@material-ui/core/styles'
import { darkTheme } from 'themes/dark'
import { lightTheme } from 'themes/light'
import { getThemeOverrides } from 'themes/overrides'
import { typography } from 'themes/typography'

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System'
}

export const getAppTheme = (themeType: AppTheme, prefersDarkMode: boolean) => {
  const baseTheme =
    themeType === AppTheme.System
      ? prefersDarkMode
        ? darkTheme
        : lightTheme
      : themeType === AppTheme.Dark
      ? darkTheme
      : lightTheme

  return createTheme({
    ...baseTheme,
    typography,
    overrides: getThemeOverrides(baseTheme as Theme)
  })
}
