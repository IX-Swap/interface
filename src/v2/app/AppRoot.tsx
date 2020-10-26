import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'v2/app/components/Header/Header'
import { Sidebar } from 'v2/app/components/Sidebar/Sidebar'
import useStyles from './AppRoot.styles'
import { useAppRouter } from 'v2/app/router'
import { Grid } from '@material-ui/core'
import { AppError } from 'v2/app/components/AppError'
import { useDataFromURL } from 'v2/hooks/location/useDataFromURL'

export const AppRoot: React.FC = () => {
  const classes = useStyles()
  const { renderRoutes } = useAppRouter()

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <Grid container direction='column' className={classes.container}>
        <Grid item>
          <Header />
        </Grid>
        <Sidebar />
        <Grid item container className={classes.content}>
          {renderRoutes()}
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}
