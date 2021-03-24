import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'app/components/Header/Header'
import { Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { useLocation } from 'react-router-dom'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { AppRouter } from 'app/router/AppRouter'

export const AppRoot = () => {
  const location = useLocation()
  const theme = useTheme()
  const isDSOOverview = location.pathname.includes('overview') // this is very bad solution to the problem, I'll do some refactoring so we can avoid this kind of hacking
  const backgroundColor = isDSOOverview
    ? theme.palette.backgrounds.secondary
    : theme.palette.backgrounds.main

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <Grid container direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <SidebarContainer />
        <AppContentWrapper item container style={{ backgroundColor }}>
          <OnboardingContentWrapper>
            <AppRouter />
          </OnboardingContentWrapper>
        </AppContentWrapper>
      </Grid>
    </ErrorBoundary>
  )
}
