// @flow
import React, { Suspense, useRef, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';

import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';

const { setAssetType } = AssetsActions;

const BankDepositComponent = React.lazy(() => import('./deposit'));
const BankWithrawComponent = React.lazy(() => import('./withdraw'));
const BankCreateComponent = React.lazy(() => import('./BankCreateComponent'));
const BankListComponent = React.lazy(() => import('./BankListComponent'));
const BankDepositView = React.lazy(() => import('./deposit/view'));
const BankWithdrawalView = React.lazy(() => import('./withdraw/view'));
const Summary = React.lazy(() => import('components/Summary'));

const routes = [
  {
    route: '/accounts/banks/view',
    exact: true,
    component: (props) => <Summary {...props} hasBack />,
  },
  {
    route: '/accounts/banks',
    exact: true,
    component: (props) => <BankListComponent {...props} />,
  },
  {
    route: '/accounts/banks/deposit-view',
    exact: true,
    component: (props) => <BankDepositView {...props} />,
  },
  {
    route: '/accounts/banks/deposit',
    exact: true,
    component: (props) => <BankDepositComponent {...props} />,
  },
  {
    route: '/accounts/banks/withdrawal-view',
    exact: true,
    component: (props) => <BankWithdrawalView {...props} />,
  },
  {
    route: '/accounts/banks/withdraw',
    exact: true,
    component: (props) => <BankWithrawComponent {...props} />,
  },
  {
    route: '/accounts/banks/bank-create',
    exact: true,
    component: (props) => <BankCreateComponent {...props} />,
  },
];

const useUpdateAssets = () => {
  const mountedRef = useRef(true);
  const { status: assetsStatus, type } = useAssetsState();
  const aDispatch = useAssetsDispatch();

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT || type !== 'Currency') {
      setAssetType(aDispatch, { ref: mountedRef, type: 'Currency' });
    }
  }, [aDispatch, assetsStatus, type]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return { assetsStatus, type };
};

function BankRoutes() {
  const { assetsStatus } = useUpdateAssets();

  return (
    assetsStatus === ASSETS_STATUS.IDLE && (
      <Suspense fallback={<div>Loading...</div>}>
        {routes.map((route, index) => (
          <Route
            key={route.route}
            exact={route.exact || index === 0}
            path={route.route}
            component={route.component}
          />
        ))}
      </Suspense>
    )
  );
}

export default withRouter(BankRoutes);
