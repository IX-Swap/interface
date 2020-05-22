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
};

function BankRoutes() {
  useUpdateAssets();

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
