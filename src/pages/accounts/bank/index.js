// @flow
import React, { Suspense } from 'react';
import { withRouter, Route } from 'react-router-dom';

const BankDepositComponent = React.lazy(() => import('./deposit'));
const BankWithrawComponent = React.lazy(() => import('./withdraw'));
const BankCreateComponent = React.lazy(() => import('./BankCreateComponent'));
const BankListComponent = React.lazy(() => import('./BankListComponent'));

const routes = [
  {
    route: '/accounts/banks',
    component: <BankListComponent />
  },
  {
    route: '/accounts/banks/deposit/:bankId',
    component: <BankDepositComponent />
  },
  {
    route: '/accounts/banks/withdraw/:bankId',
    component: <BankWithrawComponent />
  },
  {
    route: '/accounts/banks/bank-create',
    component: <BankCreateComponent />
  },
];

function BankRoutes() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {routes.map((route, index) => 
          <Route
            exact={index === 0}
            path={route.route}
            component={() => route.component}
          />
        )}
      </Suspense>
    </>
  );
}

export default withRouter(BankRoutes);
