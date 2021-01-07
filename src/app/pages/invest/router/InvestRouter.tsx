import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { DSORouter } from 'app/pages/invest/router/DSORouter'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'

export const InvestRouter = () => {
  return (
    <Switch>
      <Route path={InvestRoute.commitments}>
        <CommitmentsRouter />
      </Route>

      <Route path={InvestRoute.dso}>
        <DSORouter />
      </Route>

      <Route path={InvestRoute.landing}>
        <InvestLanding />
      </Route>
    </Switch>
  )
}
