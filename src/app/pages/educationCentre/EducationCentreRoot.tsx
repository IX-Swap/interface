import React from 'react'
import { Reports } from 'app/pages/educationCentre/pages/Reports'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
// import { News } from 'app/pages/educationCentre/pages/News'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'
// import { SecuritiesMarketsRouter } from 'app/pages/educationCentre/router/SecuritiesMarketsRouter'

export const EducationCentreRoot = () => {
  return (
    <Switch>
      {/* <AppRoute path={EducationCentreRoute.news}>
        <News />
      </AppRoute> */}
      <AppRoute path={EducationCentreRoute.reports}>
        <Reports />
      </AppRoute>
      {/* <AppRoute path={EducationCentreRoute.securitiesMarkets}>
        <SecuritiesMarketsRouter />
      </AppRoute> */}
    </Switch>
  )
}
