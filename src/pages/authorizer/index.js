// @flow
import React, { Suspense } from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Banks = React.lazy(() => import('./banks'));
const Deposits = React.lazy(() => import('./deposits'));
const Withdrawals = React.lazy(() => import('./withdrawals'));

const Links = () => (
  <>
    <Link to="/authorizer/banks">Banks</Link>
    <Link to="/authorizer/deposits">Deposits</Link>
    <Link to="/authorizer/withrawals">Withdrawals</Link>
  </>
);

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    <Route path="/authorizer/banks" component={Banks} />
    <Route path="/authorizer/deposits" component={Deposits} />
    <Route path="/authorizer/withrawals" component={Withdrawals} />
  </Suspense>
);

function Authorizer() {
  return (
    <>
      <Links />
      <br />
      <Grid container title="Accounts" justify="center" alignItems="center">
        <Routes />
      </Grid>
    </>
  );
}

export default withRouter(Authorizer);
