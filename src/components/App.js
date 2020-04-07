import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

// components
import Layout from './Layout'

// pages
import Error from '../pages/error'
import Login from '../pages/login'

// context
import { useUserState } from '../context/UserContext'

export default function App () {
  // global
  var { isAuthenticated } = useUserState()

  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/app/dashboard' />} />
        <PrivateRoute path='/app' component={Layout} />
        <PublicRoute exact path='/login/:token?' component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  )

  // #######################################################################

  function PrivateRoute ({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }

  function PublicRoute ({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect to={{ pathname: '/app/dashboard' }} />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    )
  }
}
