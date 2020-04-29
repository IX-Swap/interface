import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import BankCreateComponent from './bank/BankCreateComponent'
import BankListComponent from './bank/BankListComponent'
import { AccountProvider } from 'context/AccountContext'
import { AssetsProvider } from 'context/AssetsContext'
import { IdentityProvider } from 'context/IdentityContext'

function Accounts (props) {
  return (
    <Grid container title='Accounts' justify='center' alignItems='center'>
      <Switch>
        <AssetsProvider>
          <AccountProvider>
            <IdentityProvider>
              <AccountRoutes />
            </IdentityProvider>
          </AccountProvider>
        </AssetsProvider>
      </Switch>
    </Grid>
  )
}

function AccountRoutes ({ props }) {
  return (
    <>
      <Route exact path='/accounts' component={() => <BankListComponent />} />
      <Route
        exact
        path='/accounts/bank-create'
        component={BankCreateComponent}
      />
    </>
  )
}

export default withRouter(Accounts)
