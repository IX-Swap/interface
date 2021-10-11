import React from 'react'
import { Onboarding } from 'app/pages/home/pages/Onboarding'
import { Switch } from 'react-router-dom'
import { HomeRoute } from 'app/pages/home/router/config'
import { AppRoute } from 'components/AppRoute'
import { SecuritiesMarketsRouter } from 'app/pages/home/router/SecuritiesMarketsRouter'

export const HomeRoot = () => {
  return (
    <Switch>
      <AppRoute path={HomeRoute.securitiesMarkets}>
        <SecuritiesMarketsRouter />
      </AppRoute>
      <AppRoute path={HomeRoute.landing}>
        <Onboarding />
      </AppRoute>
    </Switch>
  )
}
