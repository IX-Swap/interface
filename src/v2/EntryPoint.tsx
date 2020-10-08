import React, { Suspense, useEffect } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { history } from 'v2/history'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'
import { useAuth } from 'v2/hooks/auth/useAuth'

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

export const EntryPoint: React.FC = observer(() => {
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
      <Router history={history}>
        <Route path='/app' component={AppRoot} />
        <Route path='/auth' component={AuthRoot} />
        <Route
          exact
          path='*'
          render={() => <Redirect to={isAuthenticated ? '/app' : '/auth'} />}
        />
      </Router>
    </Suspense>
  )
})
