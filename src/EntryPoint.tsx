import React, { Suspense } from 'react'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { BreadcrumbsProvider } from 'hooks/useBreadcrumbs'
import { SentryRoute } from 'components/SentryRoute'
import { useAppInit } from 'hooks/useAppInit'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Redirect, Switch } from 'react-router-dom'
import { Page404 } from 'components/Page404'
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics'
import { OnboardingDialogStateProvider } from 'app/components/OnboardingDialog/useOnboardingDialogState'

const AuthRoot = React.lazy(
  async () =>
    await import('auth/AuthRoot').then(({ AuthRoot }) => ({
      default: AuthRoot
    }))
)
const AppRoot = React.lazy(
  async () =>
    await import('app/AppRoot').then(({ AppRoot }) => ({ default: AppRoot }))
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
        <OnboardingDialogStateProvider>
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
        </OnboardingDialogStateProvider>
      </BreadcrumbsProvider>
    </Suspense>
  )
}
