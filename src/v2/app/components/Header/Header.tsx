import React from 'react'
import { AppBar, Box, Toolbar } from '@material-ui/core'
import useStyles from './Header.styles'
import { UserDropdown } from 'v2/app/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'v2/app/pages/notifications/components/NotificationsDropdown'
import { AppLogo } from 'v2/app/components/AppLogo/AppLogo'

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
