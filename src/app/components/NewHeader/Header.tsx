import React from 'react'
import { useStyles } from 'app/components/NewHeader/Header.styles'
import { Toolbar, Box, AppBar } from '@mui/material'
import { AppLogo } from 'app/components/NewHeader/components/AppLogo'
import { Navigation } from 'app/components/NewHeader/components/Navigation'
import { UserDropdown } from 'app/components/NewHeader/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/components/NewHeader/components/NotificationsDropdown'
import { NavDrawerToggle } from 'app/components/NewHeader/components/NavDrawerToggle/NavDrawerToggle'

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
