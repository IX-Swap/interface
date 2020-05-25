import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DsoBoard from 'pages/invest/pages/dso-board';
import DsoEdit from 'pages/invest/pages/dso-edit';
import { InvestProvider } from 'context/InvestContext';
import DsoView from './pages/dso-view/DsoView';
import NewProduct from './pages/new-product/NewProduct';
export default function Invest() {
  return (
    <InvestProvider>
      <Switch>
        <Route path="/invest" exact component={DsoBoard} />
        <Route path="/invest/new-product" exact component={NewProduct} />
        <Route path="/invest/:dsoId" exact component={DsoView} />
        <Route path="/invest/:dsoId/edit" exact component={DsoEdit} />
      </Switch>
    </InvestProvider>
  );
}
