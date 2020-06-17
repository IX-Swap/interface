import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './pages/sign-in';
import Reset from './pages/reset';

const Confirm = React.lazy(() => import('./pages/confirm'));

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/auth/sign-in" exact component={SignIn} />
        <Route path="/auth/reset" exact component={Reset} />
        <Route path="/auth/confirm" exact component={Confirm} />

        <Route path="/auth" render={() => <Redirect to="/auth/sign-in" />} />
      </Switch>
    </Suspense>
  );
}
