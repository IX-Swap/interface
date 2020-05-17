// @flow
import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import BankDepositComponent from './BankDepositComponent';
import BankCreateComponent from './BankCreateComponent';
import BankListComponent from './BankListComponent';

function BankRoutes() {
  return (
    <>
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
        exact
        path="/accounts/banks/bank-create"
        component={() => <BankCreateComponent />}
      />
    </>
  );
}

export default withRouter(BankRoutes);
