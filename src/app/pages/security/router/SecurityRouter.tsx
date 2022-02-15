import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { Landing } from 'app/pages/security/pages/landing/Landing'
import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'
import { Setup2FAGuide } from 'app/pages/security/pages/setup2faguide/Setup2FAGuide'
import { Update2fa } from 'app/pages/security/pages/update2fa/Update2fa'
import { AppRoute } from 'components/AppRoute'

export const SecurityRouter = () => {
  return (
    <Switch>
      <AppRoute path={SecurityRoute.setup2fa}>
        <Setup2fa />
      </AppRoute>

      <AppRoute path={SecurityRoute.guide}>
        <Setup2FAGuide />
      </AppRoute>

      <Route path={SecurityRoute.changePassword}>
        <ChangePassword />
      </Route>

      <AppRoute path={SecurityRoute.change2fa}>
        <Update2fa />
      </AppRoute>

      <AppRoute path={SecurityRoute.landing}>
        <Landing />
      </AppRoute>
    </Switch>
  )
}
