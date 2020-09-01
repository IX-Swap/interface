import React, { useEffect } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppRoot from 'v2/app/AppRoot'
import AuthRoot from 'v2/auth/AuthRoot'
import { useUserStore } from 'v2/auth/context'
import { history } from 'v2/history'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'

export const EntryPoint: React.FC = observer(() => {
  const { isAuthenticated, getUser, isLoading } = useUserStore()

  useEffect(() => {
    // eslint-disable-next-line no-void
    void getUser()
  }, [getUser])

  if (!isAuthenticated && isLoading) {
    return <LoadingFullScreen />
  }

  return (
    <Router history={history}>
      <Route path='/app' component={AppRoot} />
      <Route path='/auth' component={AuthRoot} />
      <Route
        exact
        path='/'
        render={() => <Redirect to={isAuthenticated ? '/app' : '/auth'} />}
      />
    </Router>
  )
})
