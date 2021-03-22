import React, { Fragment } from 'react'
import { UserDropdownItem } from 'app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { AdminRoute } from 'app/pages/admin/router/config'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { useLogout } from 'auth/hooks/useLogout'
import { useIsAdmin } from 'helpers/acl'
import {
  AccountCircleOutlined,
  GroupOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined,
  Security,
  PostAdd
} from '@material-ui/icons'
import { List } from '@material-ui/core'
import { UserDropdownInfo } from 'app/components/UserDropdown/UserDropdownInfo'
import { UserDropdownGroup } from 'app/components/UserDropdown/UserDropdownGroup'

export const LIST_HORIZONTAL_PADDING = 32

export const UserDropdownContent = (props: DropdownContentProps) => {
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const handleClose = props.injectedProps.close

  return (
    <Fragment>
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
          <UserDropdownGroup label='Admin' icon={Security}>
            <UserDropdownItem
              icon={GroupOutlined}
              label='Users'
              link={AdminRoute.users}
              onClose={handleClose}
              level={1}
            />
            <UserDropdownItem
              icon={PostAdd}
              label='Access Reports'
              link={AdminRoute.accessReports}
              onClose={handleClose}
              level={1}
            />
          </UserDropdownGroup>
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
