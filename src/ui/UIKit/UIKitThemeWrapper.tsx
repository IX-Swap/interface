import React, { ReactElement } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { AppTheme, getAppTheme } from 'themes/app'
import { ThemeProvider } from '@mui/material/styles'
import { getThemeOverrides } from 'themes/app/overrides'
import { Theme } from '@mui/material'

export interface ChildrenProps {
  theme: Theme
}

export interface UIKitThemeWrapperProps {
  children: ReactElement | ReactElement[] | ((theme: Theme) => ReactElement)
}

export const UIKitThemeWrapper = ({ children }: UIKitThemeWrapperProps) => {
  const themeModeFromStorybook = useDarkMode() ? AppTheme.Dark : AppTheme.Light
  const theme = getAppTheme(themeModeFromStorybook, false)

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
    MuiButtonBase: {
      ...getThemeOverrides(theme)?.MuiButtonBase,
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

  return (
    <ThemeProvider theme={theme}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeProvider>
  )
}
