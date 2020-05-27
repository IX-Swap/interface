import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DeployToken from './deploy';

const Issuance = () => (
  <Switch>
    <Route path="/issuance/:id/deploy" exact component={DeployToken} />
  </Switch>
);

export default Issuance;
