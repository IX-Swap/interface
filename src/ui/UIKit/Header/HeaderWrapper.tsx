import React, { useState } from 'react'
import { Header } from 'ui/UIKit/Header/Header'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'
import { Box, Button } from '@mui/material'

export const HeaderWrapper = () => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)
  const currentNewTheme = isDarkThemeOn ? darkTheme : lightTheme
  const newTheme = createTheme({ ...currentNewTheme, typography })
  newTheme.components = getThemeOverrides(newTheme)

  return (
    <Box>
      <ThemeProvider theme={newTheme}>
        <Box marginTop={10}>
          <Button
            variant={'contained'}
            onClick={() => setIsDarkThemeOn(!isDarkThemeOn)}
          >
            {isDarkThemeOn ? 'Switch to Light theme' : 'Switch to Dark theme'}
          </Button>
        </Box>
        <Header />
      </ThemeProvider>
    </Box>
  )
}
