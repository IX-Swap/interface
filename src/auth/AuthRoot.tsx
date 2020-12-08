import React, { useEffect, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useUserStore } from 'auth/context'
import { Copyright } from 'auth/components/Copyright'
import { AuthTabs } from 'auth/components/AuthTabs'
import { useAuthRouter } from 'auth/router'
import { AuthWrapper } from 'ui/AuthWrapper'

export const AuthRoot: React.FC = observer(() => {
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
    <AuthWrapper container direction='column' justify='center'>
      <Grid item>
        {isLoginOrSignup && <AuthTabs />}
        {renderRoutes()}
      </Grid>
      <Grid item>
        <Copyright />
      </Grid>
    </AuthWrapper>
  )
})
