import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import classnames from 'classnames'
import { HashRouter } from 'react-router-dom'

import ErrorPage from '../pages/error'
import Login from '../pages/login'

import Header from './Header'
import Sidebar from './Sidebar'
import useStyles from './Layout/styles'

import Dashboard from '../pages/dashboard'
import Exchange from '../pages/exchange'
import Accounts from '../pages/accounts'
import Identity from '../pages/identity'
import Invest from '../pages/invest'
import Security from '../pages/security'

import { useLayoutState } from '../context/LayoutContext'
import { useUserState, useUserDispatch, getUser } from '../context/UserContext'
import { LayoutProvider } from '../context/LayoutContext'

function App () {
  const { isAuthenticated } = useUserState()
  const classes = useStyles()
  return (
    <HashRouter>
      <Switch>
        <PublicRoute path='/login/:token?' component={Login} />
        <LayoutProvider>
          <Authenticated />
        </LayoutProvider>
        <PrivateRoute exact path='/error' component={ErrorPage} />
      </Switch>
    </HashRouter>
  )

  function Authenticated () {
    const userDispatch = useUserDispatch()
    const { isSidebarOpened } = useLayoutState()
    const { status } = useUserState()

    if (status === 'INIT') getUser(userDispatch)
    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: isSidebarOpened
          })}
        >
          <div className={classes.fakeToolbar} />
          <Route exact path='/' render={GotoDashboard} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/trade' component={Exchange} />
          <PrivateRoute path='/accounts' component={Accounts} />
          <PrivateRoute path='/identity' component={Identity} />
          <PrivateRoute path='/invest' component={Invest} />
          <PrivateRoute path='/security' component={Security} />
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
