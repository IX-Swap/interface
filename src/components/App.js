/* global $Shape */
// @flow
import React, { useMemo, useState, useEffect } from 'react'
import type { Node } from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import classnames from 'classnames'

import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'services/acl'
import useRedirectTo2faSetup from 'hooks/useRedirectTo2faSetup'
import { _subscribeToSocket } from 'services/socket'
import Auth from '../pages/auth'

import Header from './Header'
import Sidebar from './Sidebar'
import useStyles from './Layout/styles'

import Accounts from '../pages/accounts'
import Identity from '../pages/identity'
import Invest from '../pages/invest'
import Users from '../pages/users'
import Security from '../pages/security'
import Authorizer from '../v2/pages/app/pages/authorizer'
import TradeHistoryTable from '../pages/exchange/components/ExchangeTable/TradeHistoryTable'
import TableMyOrders from '../pages/exchange/components/ExchangeTable/OrdersTable'
import TableMarketListings from '../pages/exchange/components/ExchangeTable/MarketListingTable'
import TableListings from '../pages/exchange/components/ExchangeTable/ListingTable'
import OverviewExchange from '../pages/exchange/components/TradingTerminal'
import ListingView from '../pages/exchange/components/ExchangeTable/ListingView'
import Issuance from '../v2/pages/app/pages/issuance'

import { LayoutProvider } from '../context/LayoutContext'
import { useUserState, useUserDispatch } from '../context/user'
import { getUser } from '../context/user/actions'
import NoAccessDialog from './NoAccessDialog'
import Commitments from '../pages/authorizer/commitments/components/Commitments'

type Location = $Shape<{ pathname: string }>;

type RouteProps = $Shape<{
  location: Location,
}>;

function App () {
  const { isAuthenticated } = useUserState()
  const [hasSocket, setHasSocket] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    (async () => {
      await _subscribeToSocket()
      setHasSocket(true)
    })()
  }, [isAuthenticated])

  function PublicRoute ({
    component,
    path,
    ...rest
  }: {
    component: Node,
    path: string,
  }) {
    return (
      <Route
        {...rest}
        path={path}
        render={(props: RouteProps) =>
          isAuthenticated ? <Redirect to={{ pathname: '/identity' }} /> : React.createElement(component, props)}
      />
    )
  }

  if (!hasSocket && isAuthenticated) {
    return <span>loading</span>
  }

  return (
    <HashRouter>
      <Switch>
        <PublicRoute path='/auth' component={Auth} />
        <LayoutProvider>
          <Authenticated />
        </LayoutProvider>
      </Switch>
    </HashRouter>
  )

  function Authenticated () {
    const userDispatch = useUserDispatch()
    const { isSidebarOpened } = { isSidebarOpened: true }
    const { status } = useUserState()
    const isAdmin = useIsAdmin()
    const isAuthorizer = useIsAuthorizer()
    const isIssuer = useIsIssuer()
    useMemo(() => {
      if (status === 'INIT') getUser(userDispatch)
    }, [status, userDispatch])

    const privateRoutes = [
      {
        route: '/identity',
        component: Identity
      },
      {
        route: '/accounts',
        component: Accounts
      },
      {
        route: '/invest',
        component: Invest
      },
      {
        route: '/security',
        component: Security
      },
      {
        route: '/market-list/:id',
        component: OverviewExchange,
        exact: true
      },
      {
        route: '/exchange',
        component: () => <TableMarketListings />,
        exact: true
      },
      {
        route: '/trade-history',
        component: () => <TradeHistoryTable />
      },
      {
        route: '/order-history',
        component: () => <TableMyOrders />
      },
      {
        route: '/markets',
        component: () => <TableMarketListings />
      },
      {
        route: '/listings',
        component: () => <TableListings />
      },
      {
        route: '/listings-view/:id',
        component: () => <ListingView title='Listing View' />
      },
      // Show only when user has issuer role
      ...(isIssuer
        ? [
          {
            route: '/issuance',
            component: Issuance
          }
        ]
        : []),
      // Show only when user has admin role
      ...(isAdmin
        ? [
          {
            route: '/users',
            component: Users
          }
        ]
        : []),
      // Show only when user has authorizer role
      ...(isAuthorizer
        ? [
          {
            route: '/authorizer',
            component: Authorizer
          },
          {
            route: '/authorizer/commitments/view',
            component: Commitments
          }
        ]
        : [])
    ]

    function GotoDashboard ({ location }: { location: Location }) {
      return (
        <Redirect
          to={{
            pathname: '/identity',
            state: { from: location }
          }}
        />
      )
    }

    function PrivateRoute ({ component, ...rest }) {
      const redirect = useRedirectTo2faSetup()

      if (redirect) {
        return (
          <Route
            {...rest}
            render={(props: RouteProps) => (
              <Redirect
                to={{
                  pathname: '/security',
                  state: { from: props.location }
                }}
              />
            )}
          />
        )
      }

      return (
        <Route
          {...rest}
          render={(props: RouteProps) => {
            const redirectView = (
              <Redirect
                to={{
                  pathname: '/auth/sign-in',
                  state: { from: props.location }
                }}
              />
            )
            return isAuthenticated
              ? React.createElement(component, props)
              : redirectView
          }}
        />
      )
    }

    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        {status === 'IDLE' && (
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: isSidebarOpened
            })}
          >
            <div className={classes.fakeToolbar} />
            <Route exact path='/' render={GotoDashboard} />
            {privateRoutes.map((route, i) => (
              <PrivateRoute
                key={i}
                path={route.route}
                component={route.component}
              />
            ))}
          </div>
        )}

        {/** Modal showing invalid access when user is not yet accredited */}
        <NoAccessDialog />
      </div>
    )
  }
}

export default App
