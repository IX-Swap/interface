import { SecurityView } from 'app/pages/educationCentre/pages/SecurityView'
import { SecuritiesMarkets } from 'app/pages/educationCentre/pages/SecurtiesMarkets'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'

export const SecuritiesMarketsRouter = () => {
  return (
    <Switch>
      <AppRoute path={EducationCentreRoute.security}>
        <SecurityView />
      </AppRoute>
      <AppRoute path={EducationCentreRoute.securitiesMarkets}>
        <SecuritiesMarkets />
      </AppRoute>
    </Switch>
  )
}
