import { createTheme, Theme, adaptV4Theme } from '@mui/material/styles';
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

  return createTheme(adaptV4Theme({
    ...baseTheme,
    typography,
    overrides: getThemeOverrides(baseTheme as Theme)
  }));
}
