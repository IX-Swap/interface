import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { AppTheme, getAppTheme } from 'themes/app'
import { ThemeProvider } from '@mui/material/styles'

export interface UIKitThemeWrapperProps {
  children: JSX.Element | JSX.Element[]
}

export const UIKitThemeWrapper = ({ children }: UIKitThemeWrapperProps) => {
  const themeModeFromStorybook = useDarkMode() ? AppTheme.Dark : AppTheme.Light
  const theme = getAppTheme(themeModeFromStorybook, false)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
