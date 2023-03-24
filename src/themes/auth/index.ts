// @ts-nocheck
import { createTheme } from '@mui/material/styles'
import { darkTheme } from 'themes/auth/dark'
import { getThemeOverrides } from 'themes/auth/overrides'
import { typography } from 'themes/app/typography'

export enum AppTheme {
  Dark = 'Dark'
}

export const getAppTheme = () => {
  const tenantThemeName =
    localStorage.getItem('tenantThemeName') !== 'undefined'
      ? JSON.parse(localStorage.getItem('tenantThemeName'))
      : 'default'

  console.log(tenantThemeName in darkTheme)

  const theme = createTheme({
    ...darkTheme[tenantThemeName in darkTheme ? tenantThemeName : 'default'],
    typography
  })

  theme.components = getThemeOverrides(theme)

  return theme
}
