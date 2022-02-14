import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppTheme, getAppTheme } from 'themes/new'
import { AuthRoot } from 'auth/AuthRoot'

// TODO Remove this component after redesign will be completed, it needs only for use new theme context in Auth module
export const AuthRootWrapper: React.FC = () => {
  return (
    <ThemeProvider theme={getAppTheme(AppTheme.Dark, true)}>
      <AuthRoot />
    </ThemeProvider>
  )
}
