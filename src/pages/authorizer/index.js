// @flow
import React, { Suspense } from 'react';
import { withRouter, Route, Link, RouteProps } from 'react-router-dom';
import { Grid, Box, Typography } from '@material-ui/core';

const Banks = React.lazy(() => import('./banks'));
const Deposits = React.lazy(() => import('./deposits'));
const Withdrawals = React.lazy(() => import('./withdrawals'));

const routes = [
  {
    route: '/authorizer/banks',
    title: 'Banks',
    component: Banks,
  },
  {
    route: '/authorizer/deposits',
    title: 'Deposits',
    component: Deposits,
  },
  {
    route: '/authorizer/withrawals',
    title: 'Withdrawals',
    component: Withdrawals,
  },
]

const Links = () => (
  <React.Fragment>
    {routes.map(route => 
      <Link 
        key={route.title}
        to={route.route}
      >
        {route.title}
      </Link>
    )}
  </React.Fragment>
);

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    {routes.map(route => 
      <Route 
        key={route.title}
        path={route.route}
        component={route.component} 
      />
    )}  
  </Suspense>
);

const getTitle = (path: string): string => {
  switch (path) {
    case '/authorizer/banks':
      return 'Banks';
    case '/authorizer/deposits':
      return 'Deposits';
    case '/authorizer/withrawals':
      return 'Withdrawals';
    default:
      return '';
  }
};

function Authorizer(props: RouteProps) {
  const { location } = props;

  return (
    <>
      <Links />
      <br />
      <Grid container title="Accounts" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Box my={4}>
            {location && (
              <Typography variant="h2">
                {getTitle(location.pathname)}
              </Typography>
            )}
          </Box>
        </Grid>
        <Routes />
      </Grid>
    </>
  );
}

export default withRouter(Authorizer);
