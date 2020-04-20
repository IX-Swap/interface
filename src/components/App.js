import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import useStyles from './Layout/styles'
import { BrowserRouter } from 'react-router-dom'

import Error from '../pages/error'
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
        <PublicRoute path='/login' component={Login} />
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
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/exchange' component={Exchange} />
              <PrivateRoute path='/accounts' component={Accounts} />
              <PrivateRoute path='/identity' component={Identity} />
              <PrivateRoute path='/invest' component={Invest} />
              <PrivateRoute path='/security' component={Security} />
            </div>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  )

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
