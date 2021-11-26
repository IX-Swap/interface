import React from 'react'
import { Reports } from 'app/pages/home/pages/Reports'
import { Switch } from 'react-router-dom'
import { HomeRoute } from 'app/pages/home/router/config'
import { AppRoute } from 'components/AppRoute'
import { SecuritiesMarketsRouter } from 'app/pages/home/router/SecuritiesMarketsRouter'
import { News } from 'app/pages/home/pages/News'

export const HomeRoot = () => {
  return (
    <Switch>
      <AppRoute path={HomeRoute.securitiesMarkets}>
        <SecuritiesMarketsRouter />
      </AppRoute>
      <AppRoute path={HomeRoute.landing} exact>
        <Reports />
      </AppRoute>
      <AppRoute path={HomeRoute.news}>
        <News />
      </AppRoute>
    </Switch>
  )
}
