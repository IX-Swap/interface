import { createTheme, Theme } from '@material-ui/core/styles'
import { darkTheme } from 'themes/old/dark'
import { lightTheme } from 'themes/old/light'
import { getThemeOverrides } from 'themes/old/overrides'
import { typography } from 'themes/old/typography'

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
