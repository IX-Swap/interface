import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'app/components/Header/Header'
import { Sidebar } from 'app/components/Sidebar/Sidebar'
import useStyles from './AppRoot.styles'
import { useAppRouter } from 'app/router'
import { Grid } from '@material-ui/core'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { AppStateProvider } from 'app/hooks/useAppState'

export const AppRoot: React.FC = () => {
  const classes = useStyles()
  const { renderRoutes } = useAppRouter()

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <AppStateProvider>
        <Grid container direction='column' className={classes.container}>
          <Grid item>
            <Header />
          </Grid>
          <Sidebar />
          <Grid item container className={classes.content}>
            {renderRoutes()}
          </Grid>
        </Grid>
      </AppStateProvider>
    </ErrorBoundary>
  )
}
