import React from 'react'
import { useStyles } from 'app/components/Header/Header.styles'
import { Toolbar, Box, AppBar } from '@mui/material'
import { AppLogo } from 'app/components/Header/components/AppLogo/AppLogo'
import { Navigation } from 'app/components/Header/components/Navigation/Navigation'
import { UserDropdown } from 'app/components/Header/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/components/Header/components/Notifications/NotificationsDropdown/NotificationsDropdown'
import { NavDrawerToggle } from 'app/components/Header/components/Navigation/NavDrawerToggle/NavDrawerToggle'
import { TwoFADropdown } from 'app/components/Header/components/TwoFADropdown/TwoFADropdown'
import { useAuth } from 'hooks/auth/useAuth'
import { isUpdatedAtMoreThanAYear } from 'hooks/utils'

export const Header = () => {
  const classes = useStyles()
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa, updatedAt } = user
  const hasEnabled = enable2Fa ?? false
  const isMoreThanAYear = isUpdatedAtMoreThanAYear(updatedAt)

  return (
    <AppBar position='fixed' elevation={0} className={classes.wrapper}>
      <w3m-button />
      <w3m-network-button />
      <w3m-connect-button />
      <w3m-account-button />
      <Toolbar className={classes.toolbar}>
        <NavDrawerToggle />
        <AppLogo />
        <Box className={classes.emptySpace} />
        <Navigation />
        <Box className={classes.emptySpace} />
        {(!hasEnabled || isMoreThanAYear) && <TwoFADropdown />}
        <NotificationsDropdown />
        <UserDropdown />
      </Toolbar>
    </AppBar>
  )
}
