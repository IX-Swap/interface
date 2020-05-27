import React, { useMemo } from 'react';
import type { Node } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import classnames from 'classnames';

import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'services/acl';
import Auth from '../pages/auth';

import Header from './Header';
import Sidebar from './Sidebar';
import useStyles from './Layout/styles';

import Exchange from '../pages/exchange';
import Accounts from '../pages/accounts';
import Identity from '../pages/identity';
import Invest from '../pages/invest';
import Users from '../pages/users';
import Security from '../pages/security';
import Authorizer from '../pages/authorizer';
import TableMyTrades from '../pages/exchange/components/ExchangeTable/TableMyTrades';
import TableMyOrders from '../pages/exchange/components/ExchangeTable/OrdersTable';
import TableMarketListings from '../pages/exchange/components/ExchangeTable/MarketListingTable';
import TableListings from '../pages/exchange/components/ExchangeTable/ListingTable/';
import OverviewExchange from '../pages/exchange/components/OverviewExchange';
import ListingView from '../pages/exchange/components/OverviewExchange/ListingView';
import Issuance from '../pages/issuance';

import { useLayoutState, LayoutProvider } from '../context/LayoutContext';
import { useUserState, useUserDispatch } from '../context/user';
import { getUser } from '../context/user/actions';

type Location = $Shape<{ pathname: string }>;

type RouteProps = $Shape<{
  location: Location,
}>;

function App() {
  const { isAuthenticated } = useUserState();
  const classes = useStyles();

  function PublicRoute({ component, ...rest }: { component: Node }) {
    return (
      <Route
        {...rest}
        render={(props: RouteProps) =>
          isAuthenticated ? (
            <Redirect to={{ pathname: '/trade' }} />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  return (
    <HashRouter>
      <Switch>
        <PublicRoute path="/auth" component={Auth} />
        <LayoutProvider>
          <Authenticated />
        </LayoutProvider>
      </Switch>
    </HashRouter>
  );

  function Authenticated() {
    const userDispatch = useUserDispatch();
    const { isSidebarOpened } = useLayoutState();
    const { status } = useUserState();
    const isAdmin = useIsAdmin();
    const isAuthorizer = useIsAuthorizer();
    const isIssuer = useIsIssuer();

    useMemo(() => {
      if (status === 'INIT') getUser(userDispatch);
    }, [status, userDispatch]);

    const privateRoutes = [
      {
        route: '/trade',
        component: Exchange,
      },
      {
        route: '/accounts',
        component: Accounts,
      },
      {
        route: '/identity',
        component: Identity,
      },
      {
        route: '/invest',
        component: Invest,
      },
      {
        route: '/security',
        component: Security,
      },
      {
        route: `/market-list/:id`,
        component: OverviewExchange,
        exact: true,
      },
      {
        route: '/exchange',
        component: () => <TableMarketListings />,
      },
      {
        route: '/trade-history',
        component: () => <TableMyTrades title='My Trades'/>,
      },
      {
        route: '/order-history',
        component: () => <TableMyOrders />,
      },
      {
        route: '/markets',
        component: () => <TableMarketListings />,
      },
      {
        route: '/listings',
        component: () => <TableListings />,
      },
      {
        route: '/listings-view/:id',
        component: () => <ListingView title='Listing View'/>,
      },
      // Show only when user has issuer role
      ...(isIssuer
        ? [
            {
              route: '/issuance',
              component: Issuance,
            },
          ]
        : []),
      // Show only when user has admin role
      ...(isAdmin
        ? [
            {
              route: '/users',
              component: Users,
            },
          ]
        : []),
      // Show only when user has authorizer role
      ...(isAuthorizer
        ? [
            {
              route: '/authorizer',
              component: Authorizer,
            },
          ]
        : []),
    ];

    function GotoDashboard({ location }: { location: Location }) {
      return (
        <Redirect
          to={{
            pathname: '/trade',
            state: { from: location },
          }}
        />
      );
    }

    function PrivateRoute({ component, ...rest }) {
      return (
        <Route
          {...rest}
          render={(props: RouteProps) =>
            isAuthenticated ? (
              React.createElement(component, props)
            ) : (
              <Redirect
                to={{
                  pathname: '/auth/sign-in',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      );
    }

    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Route exact path="/" render={GotoDashboard} />
          {privateRoutes.map((route, i) => (
            <PrivateRoute
              key={i}
              exact={i === 0}
              path={route.route}
              component={route.component}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
