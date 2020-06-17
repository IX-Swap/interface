import React, { Suspense } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

const SettingsLanding = React.lazy(() => import('./pages'));
const ChangPassword = React.lazy(() => import('./pages/change-password'));
const GoogleAuthenticatorSetup = React.lazy(() => import('./pages/setup-2fa'));

const routes = [
  {
    title: 'Security',
    route: '/security',
    component: SettingsLanding,
  },
  {
    title: 'Change Password',
    route: '/security/change-password',
    component: ChangPassword,
  },
  {
    title: 'Google Authenticator Setup',
    route: '/security/setup-2fa',
    component: GoogleAuthenticatorSetup,
  },
];

const SettingsRoutes = () => (
  <Container>
    <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        {routes.map((route, index) => (
          <Route
            exact={index === 0}
            key={route.title}
            path={route.route}
            component={route.component}
          />
        ))}
      </Suspense>
    </Switch>
  </Container>
);

export default withRouter(SettingsRoutes);
