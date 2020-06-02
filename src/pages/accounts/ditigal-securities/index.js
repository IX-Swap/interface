// @flow
import React, { Suspense } from 'react';
import { withRouter, Route } from 'react-router-dom';

import DSModule from './deposit/modules/index';
import WSModule from './withdraw/modules/index';

const { DSDepositsListProvider } = DSModule;
const { DSWithdrawalsListProvider } = WSModule;

const DSDeposit = React.lazy(() => import('./deposit/'));
const DSWithdraw = React.lazy(() => import('./withdraw/'));
const DSList = React.lazy(() => import('./list'));
const Summary = React.lazy(() => import('components/Summary'));

const routes = [
  {
    route: '/accounts/wallets',
    component: (props) => <DSList {...props} />,
  },
  {
    route: '/accounts/wallets/deposit/:assetId',
    component: (props) => <DSDeposit {...props} />,
  },
  {
    route: '/accounts/wallets/withdraw-view',
    component: (props) => <Summary {...props} hasBack />,
  },
  {
    route: '/accounts/wallets/withdraw/:assetId',
    component: (props) => <DSWithdraw {...props} />,
  },
  /* {
    route: "/accounts/banks/bank-create",
    component: (props) => <BankCreateComponent {...props} />,
  }, */
];

function DigitalSecurities() {
  return (
    <DSDepositsListProvider>
      <DSWithdrawalsListProvider>
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
      </DSWithdrawalsListProvider>
    </DSDepositsListProvider>
  );
}

export default withRouter(DigitalSecurities);
