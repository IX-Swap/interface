import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import useStyles from './Header.styles'
import { UserMenu } from './UserMenu'
import { NotificationsDropdown } from './NotificationsDropdown'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' className={classes.logotype}>
          DIGITAL SECURITIES
        </Typography>
        <Box className={classes.grow} />
        <NotificationsDropdown />
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}
