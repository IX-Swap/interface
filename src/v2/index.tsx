import React, { useEffect } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppRoot from 'v2/app/AppRoot'
import AuthRoot from 'v2/auth/AuthRoot'
import { useUserStore } from 'v2/auth/context'
import history from './history'
import { UserLoadingPlaceholder } from 'v2/auth/components/UserLoadingPlaceholder'

const EntryPoint: React.FC = () => {
  const { isAuthenticated, getUser, isLoading } = useUserStore()

  useEffect(() => {
    // eslint-disable-next-line no-void
    void getUser()
  }, [getUser])

  if (!isAuthenticated && isLoading) {
    return <UserLoadingPlaceholder />
  }

  return (
    <Router history={history}>
      <Redirect to={isAuthenticated ? '/app' : 'auth'} />
      <Route path='/app' component={AppRoot} />
      <Route path='/auth' component={AuthRoot} />
    </Router>
  )
}

export default observer(EntryPoint)
