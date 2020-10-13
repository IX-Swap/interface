import React from 'react'
import { UserDropdownItem } from 'v2/app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { SecurityRoute } from 'v2/app/pages/security/router'
import { AdminRoute } from 'v2/app/pages/admin/router'
import { ReactComponent as IdentityIcon } from 'assets/icons/navigation/identity.svg'
import { ReactComponent as SecurityIcon } from 'assets/icons/navigation/security.svg'
import { ReactComponent as UsersIcon } from 'assets/icons/navigation/users.svg'
import { ReactComponent as SignoutIcon } from 'assets/icons/navigation/logout.svg'
import { DropdownContentProps } from 'v2/app/components/Dropdown/Dropdown'
import { useLogout } from 'v2/auth/hooks/useLogout'

export const UserDropdownContent = (props: DropdownContentProps) => {
  const logout = useLogout()
  const handleClose = props.injectedProps.close

  return (
    <>
      <UserDropdownItem
        icon={IdentityIcon}
        label='Identity'
        link={IdentityRoute.list}
        onClose={handleClose}
      />
      <UserDropdownItem
        icon={SecurityIcon}
        label='Settings'
        link={SecurityRoute.landing}
        onClose={handleClose}
      />
      <UserDropdownItem
        icon={UsersIcon}
        label='Users'
        link={AdminRoute.users}
        onClose={handleClose}
      />
      <UserDropdownItem
        icon={SignoutIcon}
        label='Sign Out'
        onClick={logout}
        onClose={handleClose}
      />
    </>
  )
}
