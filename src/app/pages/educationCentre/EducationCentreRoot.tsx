import React from 'react'
import { Reports } from 'app/pages/educationCentre/pages/Reports'
import { Switch } from 'react-router-dom'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'
import { AppRoute } from 'components/AppRoute'
import { SecuritiesMarketsRouter } from 'app/pages/educationCentre/router/SecuritiesMarketsRouter'
import { News } from 'app/pages/educationCentre/pages/News'

export const EducationCentreRoot = () => {
  return (
    <Switch>
      <AppRoute path={EducationCentreRoute.securitiesMarkets}>
        <SecuritiesMarketsRouter />
      </AppRoute>
      <AppRoute path={EducationCentreRoute.reports}>
        <Reports />
      </AppRoute>
      <AppRoute path={EducationCentreRoute.news}>
        <News />
      </AppRoute>
    </Switch>
  )
}
