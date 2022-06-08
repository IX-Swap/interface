import { createTheme } from '@mui/material/styles'
import { darkTheme } from 'themes/app/dark'
import { getThemeOverrides } from 'themes/app/overrides'
import { typography } from 'themes/app/typography'
import { lightTheme } from 'themes/app/light'

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System'
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1248,
    xl: 1536
  }
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

  const theme = createTheme({ ...baseTheme, typography, breakpoints })

  const defaultProps = {
    defaultProps: {
      disableTouchRipple: true
    }
  }

  theme.components = {
    ...getThemeOverrides(theme),
    MuiSwitch: {
      ...getThemeOverrides(theme)?.MuiSwitch,
      ...defaultProps
    },
    MuiRadio: {
      ...getThemeOverrides(theme)?.MuiRadio,
      ...defaultProps
    },
    MuiCheckbox: {
      ...getThemeOverrides(theme)?.MuiCheckbox,
      ...defaultProps
    },
    MuiButton: {
      ...getThemeOverrides(theme)?.MuiButton,
      ...defaultProps
    },
    MuiButtonBase: {
      ...getThemeOverrides(theme)?.MuiButtonBase,
      ...defaultProps
    },
    MuiIconButton: {
      ...getThemeOverrides(theme)?.MuiIconButton,
      ...defaultProps
    },
    MuiFab: {
      ...getThemeOverrides(theme)?.MuiFab,
      ...defaultProps
    }
  }

  return theme
}
