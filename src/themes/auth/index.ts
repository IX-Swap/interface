// @ts-nocheck
import { createTheme } from '@mui/material/styles'
import { darkTheme } from 'themes/auth/dark'
import { getThemeOverrides } from 'themes/auth/overrides'
import { typography } from 'themes/app/typography'

export enum AppTheme {
  Dark = 'Dark'
}

export const getAppTheme = () => {
  const tenantThemeName = localStorage.getItem('tenantThemeName')
  const themeName =
    tenantThemeName !== 'undefined' && JSON.parse(tenantThemeName) in darkTheme
      ? JSON.parse(tenantThemeName)
      : 'default'

  const theme = createTheme({
    ...darkTheme[themeName],
    typography
  })

  theme.components = getThemeOverrides(theme)

  return theme
}
