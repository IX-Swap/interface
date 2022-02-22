import { Toolbar, Box, AppBar } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lightTheme } from 'themes/new/light'
// import { darkTheme } from 'themes/new/dark'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'
import { NavDrawerToggle } from 'app/components/Header/components/NavDrawerToggle'

import { AppLogo } from 'ui/UIKit/Header/AppLogo'
import { TopbarContainer } from 'ui/UIKit/Header/TopbarContainer'
import { UserDropdown } from 'ui/UIKit/Header/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'ui/UIKit/Header/NotificationsDropdown'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

export const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='fixed'
        elevation={0}
        style={{
          background: `linear-gradient(180deg, rgba(237, 242, 250, 0) 98.71%, ${theme.palette.secondary.light} 98.71%), ${theme.palette.backgrounds.light}`
        }}
      >
        <Toolbar>
          <NavDrawerToggle />
          <AppLogo />
          <Box style={{ flexGrow: 1 }} />
          <TopbarContainer />
          <Box style={{ flexGrow: 1 }} />
          <NotificationsDropdown />
          <UserDropdown />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
