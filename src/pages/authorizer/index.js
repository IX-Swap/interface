// @flow
import React, { Suspense } from 'react';
import { withRouter, Route, RouteProps } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Grid, Button } from '@material-ui/core';
import PageTitle from 'components/PageTitle';

const Banks = React.lazy(() => import('./banks'));
const Deposits = React.lazy(() => import('./deposits'));
const DepositsView = React.lazy(() => import('./deposits/view'));
const Withdrawals = React.lazy(() => import('./withdrawals'));
const WithdrawalsView = React.lazy(() => import('./withdrawals/view'));
const DSWithdrawals = React.lazy(() => import('./ds-withdrawals'));
const DSOs = React.lazy(() => import('./digital-securities'));
const DSOView = React.lazy(() => import('./digital-securities/view'));
const IndividualIdentities = React.lazy(() =>
  import('./individual-identities')
);
const CorporateIdentities = React.lazy(() => import('./corporate-identities'));

const Summary = React.lazy(() => import('components/Summary'));

const routes = [
  {
    route: '/authorizer/banks',
    title: 'Banks',
    component: Banks,
  },
  {
    route: '/authorizer/deposits',
    title: 'Deposits',
    exact: true,
    component: Deposits,
  },
  {
    route: '/authorizer/deposits/view',
    title: 'View Deposit',
    component: DepositsView,
    hasBack: true,
  },
  {
    route: '/authorizer/withdrawals',
    title: 'Withdrawals',
    exact: true,
    component: Withdrawals,
  },
  {
    route: '/authorizer/withdrawals/view',
    title: 'View Withdrawal',
    component: WithdrawalsView,
    hasBack: true,
  },
  {
    route: '/authorizer/ds-withdrawals',
    title: 'DS Withdrawals',
    component: DSWithdrawals,
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
  {
    route: '/authorizer/digital-securities/:id',
    title: 'View Digital Security',
    component: DSOView,
  },
  {
    route: '/authorizer/digital-securities',
    title: 'Digital Securities',
    exact: true,
    component: DSOs,
  },
  {
    route: '/authorizer/summary',
    title: 'Summary',
    component: Summary,
    hasBack: true,
  },
];

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    {routes.map((route, index) => (
      <Route
        key={route.title}
        path={route.route}
        component={route.component}
        exact={route.exact || index === routes.length - 1}
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
    case '/authorizer/summary':
      return 'Summary';
    case '/authorizer/deposits/view':
      return 'View Deposit';
    case '/authorizer/withdrawals/view':
      return 'View Withdrawal';
    default:
      return '';
  }
};

function Authorizer(props: RouteProps) {
  const { location, history } = props;

  const hasBack = (a: string) =>
    [
      '/authorizer/withdrawals/view',
      '/authorizer/deposits/view',
      '/authorizer/summary',
    ].includes(a);

  return (
    <>
      <Grid container title="Accounts" justify="center" alignItems="center">
        <Grid container item xs={12} alignItems="center">
          <Grid item>
            {hasBack(location.pathname) && (
              <Button type="button" onClick={() => history.goBack()}>
                <ArrowBackIosIcon />
              </Button>
            )}
          </Grid>
          <Grid item>
            {location && <PageTitle title={getTitle(location.pathname)} />}
          </Grid>
        </Grid>
        <Routes />
      </Grid>
    </>
  );
}

export default withRouter(Authorizer);
