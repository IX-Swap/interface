import React, { useEffect, useCallback } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect
} from 'react-router-dom'
import { useObserver } from 'mobx-react'
import classnames from 'classnames'

import Header from './components/header'
import Sidebar from './components/sidebar'
import useStyles from './styles'

import Authorizer from './pages/authorizer'
import Issuance from './pages/issuance'
import Accounts from './pages/accounts'
import Identity from './pages/identity'
import Invest from './pages/invest'
import Admin from './pages/admin'

import { useUserStore } from '../../context/user'
import { useStore as useLayoutStore } from '../../context/layout'

const Routes = React.memo(({ path }: { path: string }) => (
  <Switch>
    <Route
      exact
      path={path + '/'}
      component={() => <Redirect to={path + '/identity'} />}
    />
    <Route path={path + '/authorizer'} component={Authorizer} />
    <Route path={path + '/identity'} component={Identity} />
    <Route path={path + '/accounts'} component={Accounts} />
    <Route path={path + '/issuance'} component={Issuance} />
    <Route path={path + '/invest'} component={Invest} />
    <Route path={path + '/admin'} component={Admin} />
  </Switch>
))

const AppIndex = () => {
  const userState = useUserStore()
  const layoutState = useLayoutStore()
  const history = useHistory()
  const match = useRouteMatch()
  const classes = useStyles()

  const updateAppAuthStatus = useCallback(() => {
    if (!userState.user || !userState.user._id) {
      history.replace('/auth')
    }
  }, [history, userState.user])

  useEffect(() => {
    updateAppAuthStatus()
  }, [userState.user, updateAppAuthStatus])

  useObserver(() => {
    updateAppAuthStatus()
  })

  return useObserver(() => (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened
        })}
      >
        <Routes path={match.path} />
      </div>
    </div>
  ))
}

export default AppIndex
