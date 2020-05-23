import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DsoEdit from 'pages/invest/pages/dso-edit';
import { InvestProvider } from 'context/InvestContext';
import DsoView from './pages/dso-view/DsoView';
import NewProduct from './pages/new-product/NewProduct';
import ExchangeTable from 'pages/exchange/components/ExchangeTable';
import Table from './pages/overview-exchange/TableOrders';

export default function Invest() {
  return (
    <InvestProvider>
      <Switch>
        <Route path="/invest" exact component={ExchangeTable} />
        <Route path="/invest/new-product" exact component={NewProduct} />
        <Route path="/invest/:dsoId" exact component={DsoView} />
        <Route path="/invest/:dsoId/edit" exact component={DsoEdit} />
      </Switch>
    </InvestProvider>
  );
}
