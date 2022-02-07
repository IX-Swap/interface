import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'
import useStyles from './Header.styles'
import { UserDropdown } from 'app/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/pages/notifications/components/NotificationsDropdown'
import { AppLogo } from 'app/components/AppLogo/AppLogo'
import { NavDrawerToggle } from 'app/components/Header/components/NavDrawerToggle'
import { TopbarContainer } from 'app/components/TopbarContainer/TopbarContainer'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <NavDrawerToggle />
        <AppLogo />
        <Box className={classes.small} />
        <TopbarContainer />
        <Box className={classes.grow} />
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
