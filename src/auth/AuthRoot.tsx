import React, { useEffect, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useUserStore } from 'auth/context'
import useStyles from './styles'
import { Copyright } from 'auth/components/Copyright'
import { AuthTabs } from 'auth/components/AuthTabs'
import { useAuthRouter } from 'auth/router'

export const AuthRoot: React.FC = observer(() => {
  const classes = useStyles()
  const { setActiveTab } = useUserStore()
  const { renderRoutes, paths, current } = useAuthRouter()
  const tabbedRoutes = useMemo(() => [paths.login, paths.signup], [paths])
  const isLoginOrSignup = tabbedRoutes.includes(current.path)

  useEffect(() => {
    if (isLoginOrSignup) {
      const tabIndex = tabbedRoutes.indexOf(current.path)
      setActiveTab(tabIndex)
    }
  }, [setActiveTab, current, tabbedRoutes, isLoginOrSignup])

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
