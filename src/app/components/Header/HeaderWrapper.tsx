import React from 'react'
import { Header as NewHeader } from 'ui/UIKit/Header/Header'
import { Header } from 'app/components/Header/Header'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'
import { useTheme } from '@mui/material'

export interface HeaderWrapperProps {
  isNewTheme?: boolean
}

export const HeaderWrapper = ({ isNewTheme }: HeaderWrapperProps) => {
  // TODO Needs to remove it in future
  const theme = useTheme()
  const currentNewTheme =
    theme.palette.mode === 'light' ? lightTheme : darkTheme
  const newTheme = createTheme({ ...currentNewTheme, typography })
  newTheme.components = getThemeOverrides(newTheme)

  if (isNewTheme !== undefined && isNewTheme) {
    return (
      <ThemeProvider theme={newTheme}>
        <NewHeader />
      </ThemeProvider>
    )
  }
  return <Header />
}
