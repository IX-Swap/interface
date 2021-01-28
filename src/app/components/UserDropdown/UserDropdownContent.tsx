import React, { Fragment } from 'react'
import { UserDropdownItem } from 'app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'app/pages/identity/router'
import { SecurityRoute } from 'app/pages/security/router'
import { AdminRoute } from 'app/pages/admin/router'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { useLogout } from 'auth/hooks/useLogout'
import { useIsAdmin } from 'helpers/acl'
import {
  AccountCircleOutlined,
  GroupOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@material-ui/icons'
import { List } from '@material-ui/core'
import { UserDropdownInfo } from 'app/components/UserDropdown/UserDropdownInfo'

export const UserDropdownContent = (props: DropdownContentProps) => {
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const handleClose = props.injectedProps.close

  return (
    <Fragment>
      <UserDropdownInfo />
      <List style={{ minWidth: 260 }}>
        <UserDropdownItem
          icon={AccountCircleOutlined}
          label='Identity'
          link={IdentityRoute.list}
          onClose={handleClose}
        />
        {isAdmin && (
          <UserDropdownItem
            icon={GroupOutlined}
            label='Admin'
            link={AdminRoute.users}
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
    </Fragment>
  )
}
