import React from 'react'
import {
  Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  BrowserRouter
} from 'react-router-dom'

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
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/app/dashboard' />} />
        <PrivateRoute path='/app' component={Layout} />
        <PublicRoute path='/login/:token?' component={Login} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
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
