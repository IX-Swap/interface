import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'
import { Box, Button } from '@mui/material'

export interface UIKitThemeWrapperProps {
  children: JSX.Element
}

export const UIKitThemeWrapper = ({ children }: UIKitThemeWrapperProps) => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)
  const currentNewTheme = isDarkThemeOn ? darkTheme : lightTheme
  const newTheme = createTheme({ ...currentNewTheme, typography })
  newTheme.components = getThemeOverrides(newTheme)

  return (
    <ThemeProvider theme={newTheme}>
      {children}
      <Box marginTop={10}>
        <Button
          variant={'contained'}
          onClick={() => setIsDarkThemeOn(!isDarkThemeOn)}
        >
          {isDarkThemeOn ? 'Switch to Light theme' : 'Switch to Dark theme'}
        </Button>
      </Box>
    </ThemeProvider>
  )
}
