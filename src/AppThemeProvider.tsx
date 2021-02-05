import React, { createContext } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { useAppTheme } from 'hooks/useAppTheme'

export const AppThemeContext = createContext<ReturnType<
  typeof useAppTheme
> | null>(null)

export interface AppThemeProviderProps {
  children: (theme: Theme) => JSX.Element
}

export const AppThemeProvider = (props: AppThemeProviderProps) => {
  const { children } = props
  const appTheme = useAppTheme()

  return (
    <AppThemeContext.Provider value={appTheme}>
      {children(appTheme.theme)}
    </AppThemeContext.Provider>
  )
}
