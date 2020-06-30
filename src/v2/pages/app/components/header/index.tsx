import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon
} from '@material-ui/icons'
import classNames from 'classnames'

import useStyles from './styles'
import { useObserver } from 'mobx-react'

import {
  useStore as useLayoutStore
} from '../../../../context/layout'

import {
  useStore as useUserStore
} from '../../../../context/user'

export default function Header () {
  const classes = useStyles()

  const layoutState = useLayoutStore()

  const userStore = useUserStore()

  const [profileMenu, setProfileMenu] = useState < Element | null >(null)

  return useObserver(() => (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          onClick={() => layoutState.toggleSidebar()}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                )
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                )
              }}
            />
          )}
        </IconButton>
        <Typography variant='h6' className={classes.logotype}>
          DIGITAL SECURITIES
        </Typography>
        <div className={classes.grow} />

        <IconButton
          aria-haspopup='true'
          color='inherit'
          className={classes.headerMenuButton}
          aria-controls='profile-menu'
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>

        <Menu
          id='profile-menu'
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              onClick={() => userStore.logout()}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  ))
}
