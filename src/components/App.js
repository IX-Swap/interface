import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  useHistory
} from 'react-router-dom'
import classnames from 'classnames'
import useStyles from './Layout/styles'

import Error from '../pages/error'
import Login from '../pages/login'

import { useUserState } from '../context/UserContext'
import Header from './Header'
import Sidebar from './Sidebar'

import Dashboard from '../pages/dashboard'
import DeveloperPanel from '../pages/developer-panel'
import Tokens from '../pages/tokens'
import Exchange from '../pages/exchange'
import Explorer from '../pages/explorer'
import Accounts from '../pages/accounts'
import Identity from '../pages/identity'
import Invest from '../pages/invest'
import Security from '../pages/security'

import { useLayoutState } from '../context/LayoutContext'

function App () {
  // global
  const { isAuthenticated } = useUserState()
  const layoutState = useLayoutState()
  const classes = useStyles()
  const history = useHistory()

  return (
    <BrowserRouter>
      return (
      <div className={classes.root}>
        <Header history={history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/developer-panel' component={DeveloperPanel} />
            <PrivateRoute path='/exchange' component={Exchange} />
            <PrivateRoute path='/explorer' component={Explorer} />
            <PrivateRoute path='/accounts' component={Accounts} />
            <PrivateRoute path='/tokens' component={Tokens} />
            <PrivateRoute path='/identity' component={Identity} />
            <PrivateRoute path='/invest' component={Invest} />
            <PrivateRoute path='/security' component={Security} />
          </Switch>
        </div>
      </div>
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
