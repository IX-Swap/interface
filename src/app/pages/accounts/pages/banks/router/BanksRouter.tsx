import { BanksList } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList'
import { CreateBank } from 'app/pages/accounts/pages/banks/pages/CreateBank/CreateBank'
import { EditBank } from 'app/pages/accounts/pages/banks/pages/EditBank/EditBank'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'

export const BanksRouter = () => {
  return (
    <Switch>
      <AppRoute path={AccountsRoute.banks} exact>
        <BanksList />
      </AppRoute>
      <AppRoute breadcrumb='Edit Bank Details' exact path={BanksRoute.edit}>
        <EditBank />
      </AppRoute>
      <AppRoute breadcrumb='Add Bank Account' exact path={BanksRoute.create}>
        <CreateBank />
      </AppRoute>
    </Switch>
  )
}
