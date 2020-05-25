// @flow
import React, { Suspense } from 'react';
import { withRouter, Route } from 'react-router-dom';

import DSModule from './deposit/modules/index';

const { DSDepositsListProvider } = DSModule;

const DSDeposit = React.lazy(() => import('./deposit/'));
const DSList = React.lazy(() => import('./list'));

const routes = [
  {
    route: '/accounts/wallets',
    component: (props) => <DSList {...props} />,
  },
  {
    route: '/accounts/wallets/deposit/:assetId',
    component: (props) => <DSDeposit {...props} />,
  },
  /* {
    route: "/accounts/wallets/withdraw/:assetId",
    component: (props) => <BankWithrawComponent {...props} />,
  },
  {
    route: "/accounts/banks/bank-create",
    component: (props) => <BankCreateComponent {...props} />,
  }, */
];

function DigitalSecurities() {
  return (
    <DSDepositsListProvider>
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
    </DSDepositsListProvider>
  );
}

export default withRouter(DigitalSecurities);
