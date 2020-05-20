import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DsoEdit from 'pages/invest/pages/dso-edit';
import { InvestProvider } from 'context/InvestContext';
import DsoView from './pages/dso-view';
import NewProduct from './pages/new-product';
import OverviewExchange from './pages/overview-exchange/OverviewExchange';

export default function Invest() {
  return (
    <InvestProvider>
      <Switch>
        <Route path="/invest" exact component={OverviewExchange} />
        <Route path="/invest/new-product" exact component={NewProduct} />
        <Route path="/invest/:dsoId" exact component={DsoView} />
        <Route path="/invest/:dsoId/edit" exact component={DsoEdit} />
      </Switch>
    </InvestProvider>
  );
}
