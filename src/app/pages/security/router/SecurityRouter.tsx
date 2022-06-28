import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { Landing } from 'app/pages/security/pages/landing/Landing'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'
import { Setup2FAGuide } from 'app/pages/security/pages/setup2faguide/Setup2FAGuide'
import { Update2fa } from 'app/pages/security/pages/update2fa/Update2fa'
import { SecurityRoute } from 'app/pages/security/router/config'
import { AppRoute } from 'components/AppRoute'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { RootContainer } from 'ui/RootContainer'

export const SecurityRouter = () => {
  return (
    <Switch>
      <AppRoute path={SecurityRoute.setup2fa}>
        <RootContainer className={privateClassNames()}>
          <Setup2fa />
        </RootContainer>
      </AppRoute>

      <AppRoute path={SecurityRoute.guide}>
        <RootContainer className={privateClassNames()}>
          <Setup2FAGuide />
        </RootContainer>
      </AppRoute>

      <Route path={SecurityRoute.changePassword}>
        <AppContentWrapper container>
          <ChangePassword />
        </AppContentWrapper>
      </Route>

      <AppRoute path={SecurityRoute.change2fa}>
        <RootContainer className={privateClassNames()}>
          <Update2fa />
        </RootContainer>
      </AppRoute>

      <AppRoute path={SecurityRoute.landing}>
        <AppContentWrapper container>
          <Landing />
        </AppContentWrapper>
      </AppRoute>
    </Switch>
  )
}
