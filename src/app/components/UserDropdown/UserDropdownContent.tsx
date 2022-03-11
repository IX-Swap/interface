import React, { Fragment } from 'react'
import { UserDropdownItem } from 'app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { AdminRoute } from 'app/pages/admin/router/config'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { useLogout } from 'auth/hooks/useLogout'
import { useIsAdmin } from 'helpers/acl'
import {
  AccountCircleOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@mui/icons-material'
import { Box, List } from '@mui/material'
import { UserDropdownInfo } from 'app/components/UserDropdown/UserDropdownInfo'
import { useTheme } from '@mui/material/styles'

export const LIST_HORIZONTAL_PADDING = 32

export const UserDropdownContent = (props: DropdownContentProps) => {
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const theme = useTheme()
  const handleClose = props.injectedProps.close

  return (
    <Fragment>
      <Box
        bgcolor={
          theme.palette.mode === 'light'
            ? theme.palette.backgrounds.default
            : theme.palette.backgrounds.light
        }
      >
        <UserDropdownInfo />
        <List
          style={{
            minWidth: 260,
            paddingLeft: LIST_HORIZONTAL_PADDING,
            paddingRight: LIST_HORIZONTAL_PADDING
          }}
        >
          <UserDropdownItem
            icon={AccountCircleOutlined}
            label='Identity'
            link={IdentityRoute.list}
            onClose={handleClose}
          />
          {isAdmin && (
            <UserDropdownItem
              icon={AccountCircleOutlined}
              label='Admin'
              link={AdminRoute.landing}
              onClose={handleClose}
            />
          )}
          <UserDropdownItem
            icon={SettingsOutlined}
            label='Settings'
            link={SecurityRoute.landing}
            onClose={handleClose}
          />
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
