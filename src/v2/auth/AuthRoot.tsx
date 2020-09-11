import React, { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useUserStore } from 'v2/auth/context'
import useStyles from './styles'
import { Copyright } from 'v2/auth/components/Copyright'
import { AuthTabs } from 'v2/auth/components/AuthTabs'
import { useAuthRouter } from 'v2/auth/router'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const AuthRoot: React.FC = observer(() => {
  const classes = useStyles()
  const { setActiveTab } = useUserStore()
  const { isAuthenticated } = useAuth()
  const history = useHistory()
  const { renderRoutes, routes, current } = useAuthRouter()
  const tabbedRoutes = useMemo(() => [routes.login, routes.signup], [routes])
  const isLoginOrSignup = tabbedRoutes.includes(current.path)

  useEffect(() => {
    if (isLoginOrSignup) {
      const tabIndex = tabbedRoutes.indexOf(current.path)
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
})
