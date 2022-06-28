import { createTheme } from '@mui/material/styles'
import { darkTheme } from 'themes/auth/dark'
import { getThemeOverrides } from 'themes/auth/overrides'
import { typography } from 'themes/app/typography'

export enum AppTheme {
  Dark = 'Dark'
}

export const getAppTheme = () => {
  const theme = createTheme({ ...darkTheme, typography })

  theme.components = getThemeOverrides(theme)

  return theme
}
