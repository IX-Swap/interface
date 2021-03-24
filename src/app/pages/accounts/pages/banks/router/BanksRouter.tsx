import React from 'react'
import { BanksList } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList'
import ViewBank from 'app/pages/accounts/pages/banks/pages/ViewBank/ViewBank'
import { Switch } from 'react-router-dom'
import { EditBank } from 'app/pages/accounts/pages/banks/pages/EditBank/EditBank'
import { CreateBank } from 'app/pages/accounts/pages/banks/pages/CreateBank/CreateBank'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { NewAppRoute } from 'components/NewAppRoute'

export const BanksRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='View Bank' exact path={BanksRoute.view}>
        <ViewBank />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Edit Bank Details' exact path={BanksRoute.edit}>
        <EditBank />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Add Bank Account' exact path={BanksRoute.create}>
        <CreateBank />
      </NewAppRoute>

      <NewAppRoute path={BanksRoute.list}>
        <BanksList />
      </NewAppRoute>
    </Switch>
  )
}
