import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DsoBoard from 'pages/invest/pages/dso-board';
import DsoView from 'pages/invest/pages/dso-view';
import AddCommitment from 'pages/invest/pages/add';
import { InvestProvider } from './modules';

const Invest = () => (
  <InvestProvider>
    <Switch>
      <Route path="/invest" exact component={DsoBoard} />
      <Route path="/invest/view" exact component={DsoView} />
      <Route path="/invest/add" exact component={AddCommitment} />
    </Switch>
  </InvestProvider>
);

export default Invest;
