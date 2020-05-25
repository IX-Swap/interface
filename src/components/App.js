import React, { useMemo } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import classnames from 'classnames';

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

import { useLayoutState, LayoutProvider } from '../context/LayoutContext';
import { useUserState, useUserDispatch } from '../context/user';
import { getUser } from '../context/user/actions';

function App() {
  const { isAuthenticated } = useUserState();
  const classes = useStyles();

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
        route: '/users',
        component: Users,
      },
      {
        route: '/authorizer',
        component: Authorizer,
      },
    ];

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

  function GotoDashboard(props) {
    return (
      <Redirect
        to={{
          pathname: '/trade',
          state: { from: props.location },
        }}
      />
    );
  }

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
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

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect to={{ pathname: '/trade' }} />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}

export default App;
