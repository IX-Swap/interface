import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DealBoard from './pages/deal-board'
import DealView from './pages/deal-view'
import CreateDeal from './pages/create-deal'
import { InvestProvider } from 'context/InvestContext'

export default function Invest () {
  return (
    <InvestProvider>
      <Switch>
        <Route path='/app/invest' exact component={DealBoard} />
        <Route path='/app/invest/:dealId' exact component={DealView} />
        <Route path='/app/invest/create-deal' exact component={CreateDeal} />
      </Switch>
    </InvestProvider>
  )
}
