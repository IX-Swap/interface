// @flow
import React, { Suspense } from 'react';
import { withRouter, Route, Link, RouteProps } from 'react-router-dom';
import { Grid, Box, Typography } from '@material-ui/core';
import PageTitle from 'components/PageTitle';

const Banks = React.lazy(() => import('./banks'));
const Deposits = React.lazy(() => import('./deposits'));
const Withdrawals = React.lazy(() => import('./withdrawals'));
const IndividualIdentities = React.lazy(() =>
  import('./individual-identities')
);
const CorporateIdentities = React.lazy(() => import('./corporate-identities'));

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
    route: '/authorizer/withdrawals',
    title: 'Withdrawals',
    component: Withdrawals,
  },
  {
    route: '/authorizer/individual-identities',
    title: 'Individual Identities',
    component: IndividualIdentities,
  },
  {
    route: '/authorizer/corporate-identities',
    title: 'Corporate Identities',
    component: CorporateIdentities,
  },
];

const Links = () => (
  <>
    {routes.map((route) => (
      <Link key={route.title} to={route.route}>
        {route.title}
      </Link>
    ))}
  </>
);

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    {routes.map((route) => (
      <Route key={route.title} path={route.route} component={route.component} />
    ))}
  </Suspense>
);

const getTitle = (path: string): string => {
  switch (path) {
    case '/authorizer/banks':
      return 'Banks';
    case '/authorizer/deposits':
      return 'Deposits';
    case '/authorizer/withdrawals':
      return 'Withdrawals';
    case '/authorizer/individual-identities':
      return 'Individual Identities';
    case '/authorizer/corporate-identities':
      return 'Corporate Identities';
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
            {location && <PageTitle title={getTitle(location.pathname)} />}
          </Box>
        </Grid>
        <Routes />
      </Grid>
    </>
  );
}

export default withRouter(Authorizer);
