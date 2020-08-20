import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useUserStore } from 'v2/auth/context'
import useStyles from './styles'
import Copyright from 'v2/auth/components/Copyright'
import AuthTabs from 'v2/auth/components/AuthTabs'
import { useAuthRouter } from 'v2/auth/router'

const AuthRoot: React.FC = () => {
  const classes = useStyles()
  const { setActiveTab, isAuthenticated } = useUserStore()
  const history = useHistory()
  const { renderRoutes, routes, current } = useAuthRouter()
  const tabbedRoutes = [routes.login, routes.signup]
  const isLoginOrSignup = tabbedRoutes.includes(current)

  useEffect(() => {
    if (isLoginOrSignup) {
      const tabIndex = tabbedRoutes.indexOf(current)
      setActiveTab(tabIndex)
    }
  }, [setActiveTab, current, tabbedRoutes, isLoginOrSignup])

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/app')
    }
  }, [isAuthenticated, history])

  return (
    <Grid container className={classes.container}>
      <div className={classes.form}>
        {isLoginOrSignup && <AuthTabs />}
        {renderRoutes()}
      </div>
      <Copyright />
    </Grid>
  )
}

export default observer(AuthRoot)
