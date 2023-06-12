import React, { Fragment } from 'react'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useLogout } from 'auth/hooks/useLogout'
import { useIsAdmin, useIsClient, useIsAuthorizer } from 'helpers/acl'
import {
  AccountCircleOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@mui/icons-material'
import { Box, List } from '@mui/material'
import { UserDropdownItem } from 'app/components/Header/components/UserDropdown/UserDropdownItem/UserDropdownItem'
import { UserDropdownInfo } from 'app/components/Header/components/UserDropdown/UserDropdownInfo/UserDropdownInfo'
import { DropdownContentProps } from 'app/components/Header/components/Dropdown/Dropdown'
import { useStyles } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent.styles'
import { AppRoute } from 'app/router/config'

export const UserDropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const isClient = useIsClient()
  const isAuthorizer = useIsAuthorizer()
  const handleClose = props.injectedProps.close
  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <UserDropdownInfo />
        <List className={classes.list}>
          <Box className={classes.border} />
          <UserDropdownItem
            icon={AccountCircleOutlined}
            label='Profile'
            link={IdentityRoute.list}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          {isAdmin && (
            <>
              <UserDropdownItem
                icon={AccountCircleOutlined}
                label='Admin'
                link={AdminRoute.landing}
                onClose={handleClose}
              />
              <Box className={classes.border} />
            </>
          )}
          {isAdmin || isClient || isAuthorizer ? (
            <>
              <Box className={classes.border} />
              <UserDropdownItem
                icon={AccountCircleOutlined}
                label='Client Space'
                link={AppRoute.editClientSpace}
                onClose={handleClose}
              />
            </>
          ) : (
            ''
          )}
          <UserDropdownItem
            icon={SettingsOutlined}
            label='Settings'
            link={SecurityRoute.landing}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={PowerSettingsNewOutlined}
            label='Sign Out'
            onClick={logout}
            onClose={handleClose}
          />
        </List>
      </Box>
    </Fragment>
  )
}
