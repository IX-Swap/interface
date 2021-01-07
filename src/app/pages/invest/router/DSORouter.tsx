import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { DSORoute } from 'app/pages/invest/router/config'

export const DSORouter = () => {
  return (
    <Switch>
      <Route path={DSORoute.makeInvestment}>
        <CommitmentFormWrapper />
      </Route>

      <Route path={DSORoute.view}>
        <ViewDSO />
      </Route>
    </Switch>
  )
}
