import React from 'react'
import { useStyles } from 'app/components/Header/Header.styles'
import { Toolbar, Box, AppBar } from '@mui/material'
import { AppLogo } from 'app/components/Header/components/AppLogo/AppLogo'
import { Navigation } from 'app/components/Header/components/Navigation/Navigation'
import { UserDropdown } from 'app/components/Header/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/components/Header/components/Notifications/NotificationsDropdown/NotificationsDropdown'
import { NavDrawerToggle } from 'app/components/Header/components/Navigation/NavDrawerToggle/NavDrawerToggle'
import { TwoFADropdown } from 'app/components/Header/components/TwoFADropdown/TwoFADropdown'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' elevation={0} className={classes.wrapper}>
      <Toolbar className={classes.toolbar}>
        <NavDrawerToggle />
        <AppLogo />
        <Box className={classes.emptySpace} />
        <Navigation />
        <Box className={classes.emptySpace} />
        <TwoFADropdown />
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
