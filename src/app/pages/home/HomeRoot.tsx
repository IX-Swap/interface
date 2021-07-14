import React from 'react'
import { Onboarding } from 'app/pages/home/pages/Onboarding'
import { Switch } from 'react-router-dom'
import { HomeRoute } from 'app/pages/home/router/config'
import { AppRoute } from 'components/AppRoute'
import { SecuritiesMarkets } from 'app/pages/home/pages/SecurtiesMarkets'

export const HomeRoot = () => {
  return (
    <Switch>
      <AppRoute path={HomeRoute.securitiesMarkets}>
        <SecuritiesMarkets />
      </AppRoute>
      <AppRoute path={HomeRoute.landing}>
        <Onboarding />
      </AppRoute>
    </Switch>
  )
}
