import React from 'react'
import { Router, Route, Redirect } from 'react-router-dom'

import AppRoot from './App'
import AuthRoot from 'v2/Auth/AuthRoot'
import { useUserStore } from 'v2/Auth/context'
import history from './history'

const EntryPoint: React.FC = () => {
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
