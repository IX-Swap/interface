import { SecurityView } from 'app/pages/home/pages/SecurityView'
import { SecuritiesMarkets } from 'app/pages/home/pages/SecurtiesMarkets'
import { HomeRoute } from 'app/pages/home/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'

export const SecuritiesMarketsRouter = () => {
  return (
    <Switch>
      <AppRoute exact path={HomeRoute.security}>
        <SecurityView />
      </AppRoute>
      <AppRoute path={HomeRoute.securitiesMarkets}>
        <SecuritiesMarkets />
      </AppRoute>
    </Switch>
  )
}
