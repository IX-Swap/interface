import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './pages/sign-in';
import Reset from './pages/reset';
import Confirm from './pages/confirm';

export default function Auth() {
  return (
    <Switch>
      <Route path="/auth/sign-in" exact component={SignIn} />
      <Route path="/auth/reset" exact component={Reset} />
      <Route path="/auth/confirm" exact component={Confirm} />

      <Route path="/auth" render={() => <Redirect to="/auth/sign-in" />} />
    </Switch>
  );
}
