import React, { Suspense } from 'react'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'
import { BreadcrumbsProvider } from 'v2/hooks/useBreadcrumbs'
import { SentryRoute } from 'v2/components/SentryRoute'
import { useAppInit } from 'v2/hooks/useAppInit'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Redirect, Switch } from 'react-router-dom'
import { Page404 } from 'v2/components/Page404'
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics'

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
  const { isSuccess, isFinished } = useAppInit()

  useGoogleAnalytics()

  if (!isFinished) {
    return <LoadingFullScreen />
  }

  return (
    <Suspense fallback={<LoadingFullScreen />}>
      <BreadcrumbsProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Switch>
          {isSuccess ? (
            <SentryRoute path='/app' exact={false} component={AppRoot} />
          ) : (
            <SentryRoute path='/auth' exact={false} component={AuthRoot} />
          )}
          <SentryRoute
            exact
            path='/'
            render={() => <Redirect to={isSuccess ? '/app' : '/auth'} />}
          />
          <SentryRoute path='*' component={Page404} />
        </Switch>
      </BreadcrumbsProvider>
    </Suspense>
  )
}
