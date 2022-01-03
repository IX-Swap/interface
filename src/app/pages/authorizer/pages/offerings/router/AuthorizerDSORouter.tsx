import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { DSOAuthorization } from 'app/pages/authorizer/pages/offerings/DSOAuthorization'
import { Offerings } from 'app/pages/authorizer/pages/offerings/Offerings'

export const AuthorizerDSORouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Offering Details'
        path='/app/authorizer/offerings/:userId/:dsoId/view'
      >
        <DSOAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.offerings}>
        <Offerings />
      </AppRoute>
    </Switch>
  )
}
