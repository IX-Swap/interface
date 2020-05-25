import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

const SettingsLanding = React.lazy(() => import('./pages'));
const ChangPassword = React.lazy(() => import('./pages/change-password'));
const GoogleAuthenticatorSetup = React.lazy(() => import('./pages/setup-2fa'));

const routes = [
  {
    route: '/security',
    component: (props) => <SettingsLanding {...props} />,
  },
  {
    route: '/security/change-password',
    component: (props) => <ChangPassword {...props} />,
  },
  {
    route: '/security/setup-2fa',
    component: (props) => <GoogleAuthenticatorSetup {...props} />,
  },
];

const SettingsRoutes = () => (
  <Container>
    <Suspense fallback={<div>Loading...</div>}>
      {routes.map((route, index) => (
        <Route
          key={route.route}
          exact={index === 0}
          path={route.route}
          component={route.component}
        />
      ))}
    </Suspense>
  </Container>
);

export default SettingsRoutes;
