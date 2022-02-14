import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { Landing } from 'app/pages/security/pages/landing/Landing'
import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'
import { Setup2FAGuide } from 'app/pages/security/pages/setup2faguide/Setup2FAGuide'

export const SecurityRouter = () => {
  return (
    <Switch>
      <Route path={SecurityRoute.setup2fa}>
        <Setup2fa />
      </Route>

      <Route path={SecurityRoute.guide}>
        <Setup2FAGuide />
      </Route>

      <Route path={SecurityRoute.changePassword}>
        <ChangePassword />
      </Route>

      <Route path={SecurityRoute.landing}>
        <Landing />
      </Route>
    </Switch>
  )
}
