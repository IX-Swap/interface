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
import { useUserStore } from '../../context/user'
import useStyles from './styles'

import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Copyright from './components/Copyright'
import AuthTabs from './components/AuthTabs'

const AuthEntryPoint = () => {
  const match = useRouteMatch()
  const location = useLocation()
  const classes = useStyles()
  const userState = useUserStore()
  const history = useHistory()

  const routes = [`${match.path}/login`, `${match.path}/register`]

  useEffect(() => {
    if (match && routes.includes(location.pathname)) {
      userState.setActiveTab(routes.indexOf(location.pathname))
    }
  }, [location, match, userState, routes])

  useEffect(() => {
    if (userState.user && userState.user._id) {
      history.replace('/app')
    }
  }, [userState, routes, history])

  return (
    <Grid container className={classes.container}>
      <div className={classes.form}>
        <AuthTabs />
        <Switch>
          <Route exact path={match.path + '/login'} component={Login} />
          <Route exact path={match.path + '/register'} component={Register} />
          <Redirect to={match.path + '/login'} />
        </Switch>
      </div>
      <Copyright />
    </Grid>
  )
}

export default observer(AuthEntryPoint)
