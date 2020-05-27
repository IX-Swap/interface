// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IssuanceList from './pages/issuance-list';
import IssuanceView from './pages/issuance-view';
import { IssuanceProvider } from './modules';

const Issuance = () => (
  <IssuanceProvider>
    <Switch>
      <Route path="/issuance" exact component={IssuanceList} />
      <Route path="/issuance/view" exact component={IssuanceView} />
    </Switch>
  </IssuanceProvider>
);

export default Issuance;
