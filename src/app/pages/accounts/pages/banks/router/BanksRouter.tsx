import React from 'react'
import { BanksList } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList'
import ViewBank from 'app/pages/accounts/pages/banks/pages/ViewBank/ViewBank'
import { Switch } from 'react-router-dom'
import { EditBank } from 'app/pages/accounts/pages/banks/pages/EditBank/EditBank'
import { CreateBank } from 'app/pages/accounts/pages/banks/pages/CreateBank/CreateBank'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AppRoute } from 'components/AppRoute'

export const BanksRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='View Bank' exact path={BanksRoute.view}>
        <ViewBank />
      </AppRoute>

      <AppRoute breadcrumb='Edit Bank Details' exact path={BanksRoute.edit}>
        <EditBank />
      </AppRoute>

      <AppRoute breadcrumb='Add Bank Account' exact path={BanksRoute.create}>
        <CreateBank />
      </AppRoute>

      <AppRoute path={BanksRoute.list}>
        <BanksList />
      </AppRoute>
    </Switch>
  )
}
