import React from 'react'
import { AppBar, Box, Toolbar } from '@material-ui/core'
import useStyles from './Header.styles'
import { UserDropdown } from 'app/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/pages/notifications/components/NotificationsDropdown'
import { AppLogo } from 'app/components/AppLogo/AppLogo'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <AppLogo />
        <Box className={classes.grow} />
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
