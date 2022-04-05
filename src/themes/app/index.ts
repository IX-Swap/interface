import { createTheme } from '@mui/material/styles'
import { darkTheme } from 'themes/app/dark'
import { getThemeOverrides } from 'themes/app/overrides'
import { typography } from 'themes/app/typography'

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

  const theme = createTheme({ ...darkTheme, typography })

  theme.components = {
    ...getThemeOverrides(theme),
    MuiSwitch: {
      ...getThemeOverrides(theme)?.MuiSwitch,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiRadio: {
      ...getThemeOverrides(theme)?.MuiRadio,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiCheckbox: {
      ...getThemeOverrides(theme)?.MuiCheckbox,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiButton: {
      ...getThemeOverrides(theme)?.MuiButton,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiIconButton: {
      ...getThemeOverrides(theme)?.MuiIconButton,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiFab: {
      ...getThemeOverrides(theme)?.MuiFab,
      defaultProps: {
        disableTouchRipple: true
      }
    }
  }

  return theme
}
