// @flow
import React, { useRef, useEffect } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { Grid, Container } from '@material-ui/core';
import { AccountProvider } from 'context/AccountContext';
import * as AssetsModule from 'context/assets';
import { IdentityProvider } from 'context/IdentityContext';
import PersonalBalanceListModule from 'context/balance/personal';

import * as AssetActions from 'context/assets/actions';

import { ASSETS_STATUS } from 'context/assets/types';
import BanksModule from './bank/modules';
import TransactionsModule from './transactions/modules';
import AccountsPanel from './components/AccountsPanel';

const { AssetsProvider, useAssetsState, useAssetsDispatch } = AssetsModule;
const { getAssets } = AssetActions;
const { PersonalBalancesListProvider } = PersonalBalanceListModule;
const { TransactionsListProvider } = TransactionsModule;
const { BanksListProvider } = BanksModule;

const useAssetsGetter = () => {
  const mountedRef = useRef(true);
  const aDispatch = useAssetsDispatch();
  const { status, type } = useAssetsState();

  useEffect(() => {
    if (status === ASSETS_STATUS.INIT) {
      getAssets(aDispatch, {
        ref: mountedRef,
        type,
      });
    }
  }, [aDispatch, status, type]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return { status };
};

function Accounts() {
  return (
    <Grid container title="Accounts" justify="center" alignItems="center">
      <Switch>
        <BanksListProvider>
          <AssetsProvider>
            <AccountProvider>
              <IdentityProvider>
                <PersonalBalancesListProvider>
                  <TransactionsListProvider>
                    <AccountRoutes />
                  </TransactionsListProvider>
                </PersonalBalancesListProvider>
              </IdentityProvider>
            </AccountProvider>
          </AssetsProvider>
        </BanksListProvider>
      </Switch>
    </Grid>
  );
}

function AccountRoutes() {
  const { status } = useAssetsGetter();

  return (
    status === ASSETS_STATUS.IDLE && (
      <Container>
        <Route path="/accounts" component={() => <AccountsPanel />} />
      </Container>
    )
  );
}

export default withRouter(Accounts);
