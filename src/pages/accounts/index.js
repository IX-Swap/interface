import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { AccountProvider } from 'context/AccountContext';
import { AssetsProvider } from 'context/assets';
import { IdentityProvider } from 'context/IdentityContext';
import PersonalBalanceListModule from 'context/balance/personal';
import BanksModule from './bank/modules';
import DepositPage from './deposit/DepositPage';
import WithdrawPage from './withdraw/WithdrawPage';
import AccountsPanel from './components/AccountsPanel';

const { PersonalBalancesListProvider } = PersonalBalanceListModule;
const { BanksListProvider } = BanksModule;

function Accounts() {
  return (
    <Grid container title="Accounts" justify="center" alignItems="center">
      <Switch>
        <BanksListProvider>
          <AssetsProvider>
            <AccountProvider>
              <IdentityProvider>
                <PersonalBalancesListProvider>
                  <AccountRoutes />
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
  return (
    <>
      <Route path="/accounts" component={() => <AccountsPanel />} />
      <Route exact path="/accounts/deposit" component={() => <DepositPage />} />
      <Route
        exact
        path="/accounts/withdraw"
        component={() => <WithdrawPage />}
      />
    </>
  );
}

export default withRouter(Accounts);
