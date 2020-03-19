import React from 'react'
import { Switch, Route } from 'react-router-dom'
import InvestDashboard from './pages/invest-dashboard/InvestDashboard'
import InvestAsset from './pages/invest-asset'

import { InvestProvider } from 'context/IdentityContext'

export default function Invest () {
  return (
    // <InvestProvider>
    <Switch>
      <Route path='/app/invest' exact component={InvestDashboard} />
      <Route path='/app/invest/:assetId' exact component={InvestAsset} />
    </Switch>
    // </InvestProvider>
  )
}
