import React, { Suspense, useEffect } from 'react'
import { Router, Redirect, Switch } from 'react-router-dom'
import { history } from 'v2/history'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { BreadcrumbsProvider } from 'v2/hooks/useBreadcrumbs'
import { SentryRoute } from 'v2/components/SentryRoute'

const AuthRoot = React.lazy(
  async () =>
    await import('v2/auth/AuthRoot').then(({ AuthRoot }) => ({
      default: AuthRoot
    }))
)
const AppRoot = React.lazy(
  async () =>
    await import('v2/app/AppRoot').then(({ AppRoot }) => ({ default: AppRoot }))
)

export const EntryPoint = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'PUSH') {
        window.history.replaceState(location.state, 'history')
      }
    })
  }, [])

  return (
    <Suspense fallback={<LoadingFullScreen />}>
      <BreadcrumbsProvider>
        <Router history={history}>
          <Switch>
            <SentryRoute path='/app' exact={false} component={AppRoot} />
            <SentryRoute path='/auth' exact={false} component={AuthRoot} />
            <SentryRoute
              render={() => (
                <Redirect to={isAuthenticated ? '/app' : '/auth'} />
              )}
            />
          </Switch>
        </Router>
      </BreadcrumbsProvider>
    </Suspense>
  )
}
