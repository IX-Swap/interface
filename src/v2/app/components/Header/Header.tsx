import React from 'react'
import { AppBar, Box, Toolbar } from '@material-ui/core'
import useStyles from './Header.styles'
import { UserMenu } from './UserMenu'
import { NotificationsDropdown } from './NotificationsDropdown'
import { AppLogo } from './AppLogo'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <AppLogo />
        <Box className={classes.grow} />
        <NotificationsDropdown />
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}
