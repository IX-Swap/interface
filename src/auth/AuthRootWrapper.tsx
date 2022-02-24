import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { getAppTheme } from 'themes/auth'
import { AuthRoot } from 'auth/AuthRoot'

// TODO It here because we have auth module design in corporate website style. Needs to do smth with it in future.
export const AuthRootWrapper: React.FC = () => {
  return (
    <ThemeProvider theme={getAppTheme()}>
      <AuthRoot />
    </ThemeProvider>
  )
}
