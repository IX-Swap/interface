import React, { ReactElement } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { AppTheme, getAppTheme } from 'themes/app'
import { ThemeProvider } from '@mui/material/styles'
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

  return (
    <ThemeProvider theme={theme}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeProvider>
  )
}
