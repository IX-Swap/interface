import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import classnames from 'classnames'
import useStyles from './Layout/styles'
import { BrowserRouter } from 'react-router-dom'

import ErrorPage from '../pages/error'
import Login from '../pages/login'

import { useUserState } from '../context/UserContext'
import Header from './Header'
import Sidebar from './Sidebar'

import Dashboard from '../pages/dashboard'
import Exchange from '../pages/exchange'
import Accounts from '../pages/accounts'
import Identity from '../pages/identity'
import Invest from '../pages/invest'
import Security from '../pages/security'

import { useLayoutState } from '../context/LayoutContext'

function App () {
  const { isAuthenticated } = useUserState()
  const layoutState = useLayoutState()
  const classes = useStyles()

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/login/:token?' component={Login} />
        <Authenticated />
        <PrivateRoute exact path='/error' component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )

  function Authenticated (props) {
    return (
      <div>
        <div className={classes.root}>
          <Header />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened
            })}
          >
            <div className={classes.fakeToolbar} />
            <Route exact path='/' render={GotoDashboard} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/exchange' component={Exchange} />
            <PrivateRoute path='/accounts' component={Accounts} />
            <PrivateRoute path='/identity' component={Identity} />
            <PrivateRoute path='/invest' component={Invest} />
            <PrivateRoute path='/security' component={Security} />
          </div>
        </div>
      </div>
    )
  }
  function GotoDashboard (props) {
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
          state: { from: props.location }
        }}
      />
    )
  }
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
            <Redirect to={{ pathname: '/dashboard' }} />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    )
  }
}

export default App
