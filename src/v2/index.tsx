import React from 'react'
import { Router, Route, Redirect } from 'react-router-dom'

import AppRoot from './app'
import AuthRoot from './auth'
import { useUserStore } from 'v2/auth/context'
import history from './history'

const EntryPoint = () => {
  const { isAuthenticated } = useUserStore()

  return (
    <Router history={history}>
      <Redirect to={isAuthenticated ? '/app' : 'auth'} />
      <Route path='/app' component={AppRoot} />
      <Route path='/auth' component={AuthRoot} />
    </Router>
  )
}

export default EntryPoint
