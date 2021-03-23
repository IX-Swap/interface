import React from 'react'
import { BanksList } from 'app/pages/accounts/pages/banks/pages/BanksList/BanksList'
import ViewBank from 'app/pages/accounts/pages/banks/pages/ViewBank/ViewBank'
import { Route, Switch } from 'react-router-dom'
import { EditBank } from 'app/pages/accounts/pages/banks/pages/EditBank/EditBank'
import { CreateBank } from 'app/pages/accounts/pages/banks/pages/CreateBank/CreateBank'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

export const BanksRouter = () => {
  return (
    <Switch>
      <Route exact path={BanksRoute.view}>
        <ViewBank />
      </Route>

      <Route exact path={BanksRoute.edit}>
        <EditBank />
      </Route>

      <Route exact path={BanksRoute.create}>
        <CreateBank />
      </Route>

      <Route path={BanksRoute.list}>
        <BanksList />
      </Route>
    </Switch>
  )
}
