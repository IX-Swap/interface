import React from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import App from './app'
import Auth from './auth'
import { useStore } from '../context/user'

const EntryPoint = () => {
  const { isAuthenticated } = useStore()

  return (
    <Router>
      <Redirect to={isAuthenticated ? '/app' : 'auth'} />
      <Route path='/app' component={App} />
      <Route path='/auth' component={Auth} />
    </Router>
  )
}

export default EntryPoint
