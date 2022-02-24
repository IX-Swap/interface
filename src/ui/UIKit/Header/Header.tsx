import { Toolbar, Box, AppBar } from '@mui/material'
import React from 'react'
import { NavDrawerToggle } from 'app/components/Header/components/NavDrawerToggle'
import { AppLogo } from 'ui/UIKit/Header/AppLogo'
import { TopbarContainer } from 'ui/UIKit/Header/TopbarContainer'
import { UserDropdown } from 'ui/UIKit/Header/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'ui/UIKit/Header/NotificationsDropdown'
import { useStyles } from './Header.styles'

export const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position='fixed' elevation={0} className={classes.wrapper}>
      <Toolbar>
        <NavDrawerToggle />
        <AppLogo />
        <Box className={classes.emptySpace} />
        <TopbarContainer />
        <Box className={classes.emptySpace} />
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
