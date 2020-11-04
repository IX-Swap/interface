import React from 'react'
import { UserDropdownItem } from 'v2/app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { SecurityRoute } from 'v2/app/pages/security/router'
import { AdminRoute } from 'v2/app/pages/admin/router'
import { DropdownContentProps } from 'v2/app/components/Dropdown/Dropdown'
import { useLogout } from 'v2/auth/hooks/useLogout'
import { useIsAdmin } from 'v2/helpers/acl'
import {
  AccountCircleOutlined,
  GroupOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@material-ui/icons'

export const UserDropdownContent = (props: DropdownContentProps) => {
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const handleClose = props.injectedProps.close

  return (
    <>
      <UserDropdownItem
        icon={AccountCircleOutlined}
        label='Identity'
        link={IdentityRoute.list}
        onClose={handleClose}
      />
      {isAdmin && (
        <UserDropdownItem
          icon={GroupOutlined}
          label='Users'
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
    </>
  )
}
