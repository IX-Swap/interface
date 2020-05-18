// @flow
import React, { Suspense } from 'react';
import { withRouter, Route } from 'react-router-dom';

const BankDepositComponent = React.lazy(() => import('./BankDepositComponent'));
const BankWithrawComponent = React.lazy(() => import('./BankWithrawComponent'));
const BankCreateComponent = React.lazy(() => import('./BankCreateComponent'));
const BankListComponent = React.lazy(() => import('./BankListComponent'));

function BankRoutes() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          exact
          path="/accounts/banks"
          component={() => <BankListComponent />}
        />
        <Route
          path="/accounts/banks/deposit/:bankId"
          component={BankDepositComponent}
        />
        <Route
          path="/accounts/banks/withdraw/:bankId"
          component={BankWithrawComponent}
        />
        <Route
          exact
          path="/accounts/banks/bank-create"
          component={() => <BankCreateComponent />}
        />
      </Suspense>
    </>
  );
}

export default withRouter(BankRoutes);
