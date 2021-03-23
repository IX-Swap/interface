import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'app/components/Header/Header'
import { useAppRouter } from 'app/router'
import { Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'

export const AppRoot = () => {
  const theme = useTheme()
  const { renderRoutes } = useAppRouter()
  const backgroundColor = theme.palette.backgrounds.default

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <Grid container direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <SidebarContainer />
        <AppContentWrapper item container style={{ backgroundColor }}>
          <OnboardingContentWrapper>{renderRoutes()}</OnboardingContentWrapper>
        </AppContentWrapper>
      </Grid>
    </ErrorBoundary>
  )
}
