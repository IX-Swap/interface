// @flow
import React, { Suspense } from 'react';
import { withRouter, Route, RouteProps } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PageTitle from 'components/PageTitle';

const Banks = React.lazy(() => import('./banks'));
const Deposits = React.lazy(() => import('./deposits'));
const Withdrawals = React.lazy(() => import('./withdrawals'));
const DSWithdrawals = React.lazy(() => import('./ds-withdrawals'));
const DSOs = React.lazy(() => import('./digital-securities'));
const DSOView = React.lazy(() => import('./digital-securities/view'));
const IndividualIdentities = React.lazy(() =>
  import('./individual-identities')
);
const CorporateIdentities = React.lazy(() => import('./corporate-identities'));

const routes = [
  {
    route: "/authorizer/banks",
    title: "Banks",
    component: Banks,
  },
  {
    route: "/authorizer/deposits",
    title: "Deposits",
    component: Deposits,
  },
  {
    route: "/authorizer/withdrawals",
    title: "Withdrawals",
    component: Withdrawals,
  },
  {
    route: "/authorizer/ds-withdrawals",
    title: "DS Withdrawals",
    component: DSWithdrawals,
  },
  {
    route: "/authorizer/individual-identities",
    title: "Individual Identities",
    component: IndividualIdentities,
  },
  {
    route: "/authorizer/corporate-identities",
    title: "Corporate Identities",
    component: CorporateIdentities,
  },
  {
    route: "/authorizer/digital-securities/:id",
    title: "View Digital Security",
    component: DSOView,
  },
  {
    route: "/authorizer/digital-securities",
    title: "Digital Securities",
    component: DSOs,
  },
];

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    {routes.map((route, index) => (
      <Route
        key={route.title}
        path={route.route}
        component={route.component}
        exact={index === routes.length - 1}
      />
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
    case '/authorizer/ds-withdrawals':
      return 'DS Withdrawals';
    case '/authorizer/digital-securities':
      return 'Digital Securities';
    default:
      return '';
  }
};

function Authorizer(props: RouteProps) {
  const { location } = props;

  return (
    <>
      <Grid container title="Accounts" justify="center" alignItems="center">
        <Grid item xs={12}>
          {location && <PageTitle title={getTitle(location.pathname)} />}
        </Grid>
        <Routes />
      </Grid>
    </>
  );
}

export default withRouter(Authorizer);
