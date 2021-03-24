import React from 'react'
import { Switch } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { NewAppRoute } from 'components/NewAppRoute'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'

export const InvestRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='My Commitments' path={InvestRoute.commitments}>
        <CommitmentsRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='View Digital Security Offering'
        path={InvestRoute.view}
      >
        <InvestDSORouter />
      </NewAppRoute>

      <NewAppRoute path={InvestRoute.landing}>
        <InvestLanding />
      </NewAppRoute>
    </Switch>
  )
}
