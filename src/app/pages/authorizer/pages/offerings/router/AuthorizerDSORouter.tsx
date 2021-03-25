import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { DSOAuthorization } from 'app/pages/authorizer/pages/offerings/DSOAuthorization'
import { Offerings } from 'app/pages/authorizer/pages/offerings/Offerings'

export const AuthorizerDSORouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Offering Details'
        path='/app/authorizer/offerings/:userId/:dsoId/view'
      >
        <DSOAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.offerings}>
        <Offerings />
      </NewAppRoute>
    </Switch>
  )
}
