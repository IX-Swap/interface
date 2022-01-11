import React, { Suspense } from 'react'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { BreadcrumbsProvider } from 'hooks/useBreadcrumbs'
import { SentryRoute } from 'components/SentryRoute'
import { useAppInit } from 'hooks/useAppInit'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Redirect, Switch, useLocation } from 'react-router-dom'
import { Page404 } from 'components/Page404/Page404'
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics'

const AuthRoot = React.lazy(
  async () =>
    await import('auth/AuthRootWrapper').then(({ AuthRootWrapper }) => ({
      default: AuthRootWrapper
    }))
)
const AppRoot = React.lazy(
  async () =>
    await import('app/AppRoot').then(({ AppRoot }) => ({ default: AppRoot }))
)

export const EntryPoint = () => {
  const { isSuccess, isFinished } = useAppInit()

  useGoogleAnalytics()
  const location = useLocation()

  if (!isFinished) {
    return <LoadingFullScreen />
  }

  return (
    <Suspense fallback={<LoadingFullScreen />}>
      <BreadcrumbsProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Switch>
          <SentryRoute
            path='/app'
            exact={false}
            component={
              isSuccess
                ? AppRoot
                : () => (
                    <Redirect
                      to={{
                        pathname: '/auth/sign-in',
                        state: { from: location.pathname }
                      }}
                    />
                  )
            }
          />
          <SentryRoute path='/auth' exact={false} component={AuthRoot} />
          <SentryRoute
            exact
            path='/'
            render={() => <Redirect to={isSuccess ? '/app' : '/auth'} />}
          />
          <SentryRoute component={Page404} />
        </Switch>
      </BreadcrumbsProvider>
    </Suspense>
  )
}
