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
    component: (props) => <BankListComponent {...props} />,
  },
  {
    route: '/accounts/banks/deposit/:bankId',
    component: (props) => <BankDepositComponent {...props} />,
  },
  {
    route: '/accounts/banks/withdraw/:bankId',
    component: (props) => <BankWithrawComponent {...props} />,
  },
  {
    route: '/accounts/banks/bank-create',
    component: (props) => <BankCreateComponent {...props} />,
  },
];

function BankRoutes() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {routes.map((route, index) => (
          <Route
            key={route.route}
            exact={index === 0}
            path={route.route}
            component={route.component}
          />
        ))}
      </Suspense>
    </>
  );
}

export default withRouter(BankRoutes);
