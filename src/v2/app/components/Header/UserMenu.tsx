import React from 'react'
import { Grid, IconButton, Menu } from '@material-ui/core'
import { useLogout } from '../../../auth/hooks/useLogout'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { SecurityRoute } from 'v2/app/pages/security/router'
import { AdminRoute } from 'v2/app/pages/admin/router'
import { ReactComponent as UsersIcon } from 'assets/icons/navigation/users.svg'
import { ReactComponent as IdentityIcon } from 'assets/icons/navigation/identity.svg'
import { ReactComponent as SignoutIcon } from 'assets/icons/navigation/logout.svg'
import { ReactComponent as SecurityIcon } from 'assets/icons/navigation/security.svg'
import { ReactComponent as UserIcon } from 'assets/icons/navigation/user.svg'
import { UserMenuItem } from './UserMenuItem'

export const UserMenu = () => {
  const logout = useLogout()

  return (
    <Grid item style={{ position: 'relative' }}>
      <PopupState variant='popper'>
        {popupState => (
          <>
            <IconButton
              {...bindTrigger(popupState)}
              color='inherit'
              aria-haspopup='true'
              aria-controls='profile-menu'
            >
              <UserIcon />
            </IconButton>

            <Menu
              {...bindMenu(popupState)}
              id='profile-menu'
              style={{ top: popupState.anchorEl?.offsetWidth ?? 0 }}
            >
              <UserMenuItem
                icon={IdentityIcon}
                label='Identity'
                link={IdentityRoute.list}
                onClose={popupState.close}
              />
              <UserMenuItem
                icon={SecurityIcon}
                label='Security'
                link={SecurityRoute.landing}
                onClose={popupState.close}
              />
              <UserMenuItem
                icon={UsersIcon}
                label='Users'
                link={AdminRoute.users}
                onClose={popupState.close}
              />
              <UserMenuItem
                icon={SignoutIcon}
                label='Sign Out'
                onClick={logout}
                onClose={popupState.close}
              />
            </Menu>
          </>
        )}
      </PopupState>
    </Grid>
  )
}
