import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

import { useUserDispatch } from 'context/user'
import { signOut } from 'context/user/actions'
import useStyles from './styles'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from '../../context/LayoutContext'

export default function Header (props) {
  const classes = useStyles()
  const history = useHistory()

  const layoutState = useLayoutState()
  const layoutDispatch = useLayoutDispatch()
  const userDispatch = useUserDispatch()

  const [profileMenu, setProfileMenu] = useState(null)

  return (
    <AppBar position='fixed' elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          )}
        </IconButton>
        <Typography variant='h6' weight='medium' className={classes.logotype}>
          DIGITAL SECURITIES
        </Typography>
        <div className={classes.grow} />

        <IconButton
          aria-haspopup='true'
          color='inherit'
          className={classes.headerMenuButton}
          aria-controls='profile-menu'
          onClick={e => setProfileMenu(e.currentTarget)}
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
              onClick={() => signOut(userDispatch, history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
