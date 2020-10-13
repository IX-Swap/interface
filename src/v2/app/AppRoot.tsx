import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'v2/app/components/Header/Header'
import { Sidebar } from 'v2/app/components/Sidebar/Sidebar'
import useStyles from './AppRoot.styles'
import { useAppRouter } from 'v2/app/router'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Grid } from '@material-ui/core'
import { NotificationsProvider } from 'v2/app/pages/notifications/components/NotificationsProvider'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { AppError } from 'v2/app/components/AppError'
import { useDataFromURL } from 'v2/hooks/location/useDataFromURL'

export const AppRoot: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const history = useHistory()
  const classes = useStyles()
  const { renderRoutes } = useAppRouter()

  useDataFromURL()

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/auth')
    }
  }, [isAuthenticated, history])

  return (
    <NotificationsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Grid container direction='column' className={classes.container}>
        <Grid item>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item container className={classes.content}>
          <ErrorBoundary
            FallbackComponent={AppError}
            onError={error => console.error(error)}
          >
            {renderRoutes()}
          </ErrorBoundary>
        </Grid>
      </Grid>
    </NotificationsProvider>
  )
}
