import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import HelpIcon from '@material-ui/icons/Help'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SecurityIcon from '@material-ui/icons/Security'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PieChartIcon from '@material-ui/icons/PieChart'

import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// styles
import useStyles from './styles'

// components
import SidebarLink from './components/SidebarLink/SidebarLink'
// import Dot from './components/Dot'

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from '../../context/LayoutContext'

const structure = [
  {
    id: 0,
    label: 'Dashboard',
    link: '/app/dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 1,
    label: 'Invest',
    link: '/app/invest',
    icon: <PieChartIcon />
  },
  {
    id: 2,
    label: 'Trade',
    link: '/app/trade',
    icon: <ShowChartIcon />
  },
  // { id: 2, label: 'Secondary', link: '/app/secondary', icon: <ChartIcon /> },
  // {
  //   id: 3,
  //   label: 'Custody',
  //   link: '/app/notifications',
  //   icon: <LockIcon />
  // },
  {
    id: 3,
    label: 'Accounts',
    link: '/app/accounts',
    icon: <AccountBalanceIcon />,
    children: [
      { label: 'Cash', link: '/app/cash' },
      { label: 'Assets', link: '/app/assets' },
      { label: 'Reports', link: '/app/reports' }
    ]
  },

  {
    id: 4,
    label: 'Settings',
    link: '/app/settings',
    icon: <SettingsIcon />,
    children: [
      { label: 'Identity', link: '/app/identity', icon: <PermIdentityIcon /> },
      { label: 'Security', link: '/app/security', icon: <SecurityIcon /> }
    ]
  },
  {
    id: 5,
    label: 'Support',
    link: '/app/primary',
    icon: <HelpIcon />
  },
  { id: 6, type: 'divider' }
  // { id: 6, type: 'title', label: 'HELP' },
  // { id: 7, label: 'Documentation', link: '', icon: <LibraryIcon /> },
  // { id: 8, label: 'Support', link: '', icon: <SupportIcon /> },
  // { id: 9, label: 'FAQ', link: '', icon: <FAQIcon /> }
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="large" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="large" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="large" color="secondary" />,
  // },
]

function Sidebar ({ location }) {
  var classes = useStyles()
  var theme = useTheme()

  // global
  var { isSidebarOpened } = useLayoutState()
  var layoutDispatch = useLayoutDispatch()

  // local
  var [isPermanent, setPermanent] = useState(true)

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup () {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )

  // ##################################################################
  function handleWindowWidthChange () {
    var windowWidth = window.innerWidth
    var breakpointWidth = theme.breakpoints.values.md
    var isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }
}

export default withRouter(Sidebar)
