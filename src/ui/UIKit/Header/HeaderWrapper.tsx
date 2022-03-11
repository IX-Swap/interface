import React, { useState } from 'react'
import { Header as NewHeader } from 'ui/UIKit/Header/Header'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { getThemeOverrides } from 'themes/new/overrides'
import { Box, Button } from '@mui/material'

export const HeaderWrapper = () => {
  // TODO Remove this after demo
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)
  // TODO Uncomment this after demo
  // const theme = useTheme()
  // const currentNewTheme =
  //   theme.palette.mode === 'light' ? lightTheme : darkTheme
  const currentNewTheme = isDarkThemeOn ? darkTheme : lightTheme
  const newTheme = createTheme({ ...currentNewTheme, typography })
  newTheme.components = getThemeOverrides(newTheme)

  return (
    <Box>
      <ThemeProvider theme={newTheme}>
        {/* TODO Remove Box component with content after demo */}
        <Box marginTop={10}>
          <Button
            variant={'contained'}
            onClick={() => setIsDarkThemeOn(!isDarkThemeOn)}
          >
            {isDarkThemeOn ? 'Switch to Light theme' : 'Switch to Dark theme'}
          </Button>
        </Box>
        <NewHeader />
      </ThemeProvider>
    </Box>
  )
}
