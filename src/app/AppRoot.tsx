import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'app/components/Header/Header'
import { useAppRouter } from 'app/router'
import { Grid } from '@material-ui/core'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { AppStateProvider } from 'app/hooks/useAppState'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { AppOuterWrapper } from 'ui/AppOuterWrapper'

export const AppRoot: React.FC = () => {
  const { renderRoutes } = useAppRouter()

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <AppStateProvider>
        <Grid container direction='column'>
          <Grid item>
            <Header />
          </Grid>
          <SidebarContainer />
          <AppOuterWrapper item container>
            {renderRoutes()}
          </AppOuterWrapper>
        </Grid>
      </AppStateProvider>
    </ErrorBoundary>
  )
}
