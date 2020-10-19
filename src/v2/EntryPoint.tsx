import React, { Suspense, useEffect } from 'react'
import { Router, Redirect, Switch } from 'react-router-dom'
import { history } from 'v2/history'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'
import { BreadcrumbsProvider } from 'v2/hooks/useBreadcrumbs'
import { SentryRoute } from 'v2/components/SentryRoute'
import { useAppInit } from 'v2/hooks/useAppInit'

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
  const { isAuthenticated, isLoading } = useAppInit()

  useEffect(() => {
    history.listen((location, action) => {
      if (action === 'PUSH') {
        window.history.replaceState(location.state, 'history')
      }
    })
  }, [])

  if (isLoading) {
    return <LoadingFullScreen />
  }

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
