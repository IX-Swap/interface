import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  Redirect
} from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useUserStore } from 'v2/auth/context'
import useStyles from './styles'

import Login from './pages/login'
import Register from './pages/register'
import Copyright from './components/copyright'
import AuthTabs from './components/auth-tabs'
import ResetPassword from './pages/password-reset'

const AuthEntryPoint = () => {
  const location = useLocation()
  const classes = useStyles()
  const userState = useUserStore()
  const history = useHistory()

  const routes = ['/auth/login', '/auth/register']

  useEffect(() => {
    if (routes.includes(location.pathname)) {
      userState.setActiveTab(routes.indexOf(location.pathname))
    }
  }, [location, userState, routes])

  useEffect(() => {
    if (userState.isAuthenticated) {
      history.replace('/app')
    }
  }, [userState.isAuthenticated, history])

  return (
    <Grid container className={classes.container}>
      <div className={classes.form}>
        {routes.includes(location.pathname) ? <AuthTabs /> : null}
        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/register' component={Register} />
          <Route exact path='/auth/password-reset' component={ResetPassword} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
      <Copyright />
    </Grid>
  )
}

export default observer(AuthEntryPoint)
