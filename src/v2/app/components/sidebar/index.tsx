import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'

import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import HelpIcon from '@material-ui/icons/Help'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SecurityIcon from '@material-ui/icons/Security'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PieChartIcon from '@material-ui/icons/PieChart'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import { useTheme } from '@material-ui/core/styles'
import classNames from 'classnames'

import { useLocation, withRouter } from 'react-router-dom'
import { useIsAdmin, useIsAuthorizer, useIsIssuer } from '../../../helpers/acl'
import useStyles from './styles'
import SidebarLink from './components/sidebarlink'

import { useAuthorizerRouter } from 'v2/app/authorizer/router'
import { useAccountsRouter } from 'v2/app/accounts/router'

// PasswordReset
import { useStore as useLayoutStore } from '../../../context/layout'

const authorizerRoot = '/app/authorizer'
const accountsRoot = '/app/accounts'
const issuanceRoot = '/app/issuance'
const investRoot = '/app/invest'
const adminRoot = '/app/admin'

function Sidebar () {
  const location = useLocation()
  const classes = useStyles()
  const theme = useTheme()
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const { routes: authorizerRoutes } = useAuthorizerRouter()
  const { routes: accountRoutes } = useAccountsRouter()

  const structure = [
    {
      id: 'identity',
      label: 'Identity',
      link: '/app/identity',
      icon: <PersonIcon />
    },
    {
      id: 'invest',
      label: 'Invest',
      link: investRoot,
      icon: <PieChartIcon />
    },
    {
      id: 'accounts',
      label: 'Accounts',
      link: accountsRoot,
      icon: <AccountBalanceIcon />,
      children: [
        ...Object.entries(accountRoutes).map(([label, link]) => ({
          label,
          link
        }))
      ]
    },
    {
      id: 'exchange',
      label: 'Exchange',
      link: '/exchange',
      icon: <TrendingUpIcon />,
      children: [
        {
          label: 'Markets',
          link: '/markets'
        },
        {
          label: 'Trade History',
          link: '/trade-history'
        },
        {
          label: 'Order History',
          link: '/order-history'
        }
      ]
    },
    // Show only when user has issuer role
    ...(isIssuer
      ? [
        {
          id: 'issuance',
          label: 'Issuance',
          link: issuanceRoot,
          icon: <LocalAtmIcon />
        }
      ]
      : []),
    // Show only when user has authorizer role
    ...(isAuthorizer
      ? [
        {
          id: 'authorizer',
          label: 'Authorizer',
          link: authorizerRoot,
          icon: <AccountBoxIcon />,
          children: [
            ...Object.entries(authorizerRoutes).map(([label, link]) => ({
              label,
              link
            }))
          ]
        }
      ]
      : []),
    // Show only when user has admin role
    ...(isAdmin
      ? [
        {
          id: 'users',
          label: 'User Management',
          link: adminRoot,
          icon: <PeopleIcon />
        }
      ]
      : []),
    { id: 6, type: 'divider' },
    {
      id: 'security',
      label: 'Security',
      link: '/security',
      icon: <SecurityIcon />
    },
    {
      id: 5,
      label: 'Support',
      link: '/primary',
      icon: <HelpIcon />
    }
  ]

  // global
  const layoutStore = useLayoutStore()

  // local
  const [isPermanent, setPermanent] = useState(true)

  const handleWindowWidthChange = () => {
    const windowWidth = window.innerWidth
    const breakpointWidth = theme.breakpoints.values.md
    const isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }

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
        [classes.drawerOpen]: layoutStore.isSidebarOpened,
        [classes.drawerClose]: !layoutStore.isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: layoutStore.isSidebarOpened,
          [classes.drawerClose]: !layoutStore.isSidebarOpened
        })
      }}
      open={layoutStore.isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => layoutStore.toggleSidebar()}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List>
        {structure.map(({ link, ...others }) => (
          <SidebarLink
            link={link}
            key={others.id}
            nested={others.children && others.children.length > 0}
            location={location}
            isSidebarOpened={layoutStore.isSidebarOpened}
            {...others} // eslint-disable-line react/jsx-props-no-spreading
          />
        ))}
      </List>
    </Drawer>
  )
}

export default withRouter(Sidebar)
