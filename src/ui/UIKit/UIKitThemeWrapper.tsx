import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'
import { useDarkMode } from 'storybook-dark-mode'

export interface UIKitThemeWrapperProps {
  children: JSX.Element | JSX.Element[]
}

export const UIKitThemeWrapper = ({ children }: UIKitThemeWrapperProps) => {
  const currentNewTheme = useDarkMode() ? darkTheme : lightTheme
  const newTheme = createTheme({ ...currentNewTheme, typography })

  newTheme.components = {
    ...getThemeOverrides(newTheme),
    MuiSwitch: {
      ...getThemeOverrides(newTheme)?.MuiSwitch,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiRadio: {
      ...getThemeOverrides(newTheme)?.MuiRadio,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiCheckbox: {
      ...getThemeOverrides(newTheme)?.MuiCheckbox,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiButton: {
      ...getThemeOverrides(newTheme)?.MuiButton,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiButtonBase: {
      ...getThemeOverrides(newTheme)?.MuiButtonBase,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiIconButton: {
      ...getThemeOverrides(newTheme)?.MuiIconButton,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiFab: {
      ...getThemeOverrides(newTheme)?.MuiFab,
      defaultProps: {
        disableTouchRipple: true
      }
    }
  }

  return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
}
