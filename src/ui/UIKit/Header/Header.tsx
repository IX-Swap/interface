import React from 'react'
import { useStyles } from './Header.styles'
import { Toolbar, Box, AppBar } from '@mui/material'
import { AppLogo } from 'ui/UIKit/Header/components/AppLogo'
import { Navigation } from 'ui/UIKit/Header/components/Navigation'
import { UserDropdown } from 'ui/UIKit/Header/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'ui/UIKit/Header/components/NotificationsDropdown'
import { NavDrawerToggle } from 'ui/UIKit/Header/components/NavDrawerToggle/NavDrawerToggle'

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
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
