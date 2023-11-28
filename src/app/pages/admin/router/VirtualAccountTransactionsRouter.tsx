import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { VirtualAccountsRoute } from 'app/pages/admin/router/config'
import { VirtualAccountTransactions } from '../pages/VirtualAccountTransactions/VirtualAccountTransactions'
import { CreateVirtualAccountTransaction } from '../pages/VirtualAccountTransactions/CreateVirtualAccountTransaction'

export const VirtualAccountTransactionsRouter = () => {
  return (
    <Switch>
      <Route path={VirtualAccountsRoute.transactions.list}>
        <VirtualAccountTransactions />

        <Route path={VirtualAccountsRoute.transactions.create}>
          <CreateVirtualAccountTransaction />
        </Route>
      </Route>
    </Switch>
  )
}
