import { createTheme, Theme } from '@material-ui/core/styles'
import { darkTheme } from 'themes/new/dark'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System'
}

export const getAppTheme = (themeType: AppTheme, prefersDarkMode: boolean) => {
  // const baseTheme =
  //   themeType === AppTheme.System
  //     ? prefersDarkMode
  //       ? darkTheme
  //       : lightTheme
  //     : themeType === AppTheme.Dark
  //     ? darkTheme
  //     : lightTheme

  return createTheme({
    ...darkTheme,
    typography,
    overrides: getThemeOverrides(darkTheme as Theme)
  })
}
