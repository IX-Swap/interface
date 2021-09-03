import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Header } from 'app/components/Header/Header'
import { Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { AppRouter } from 'app/router/AppRouter'
import { IdleDialog } from 'app/components/IdleDialog'
import { useIdleTimers } from 'app/hooks/useIdleTimers'

export const AppRoot = () => {
  const theme = useTheme()
  const backgroundColor = theme.palette.backgrounds.default

  const {
    open,
    logoutTimer,
    resetLogoutTimer,
    closeDialog,
    reset,
    logout
  } = useIdleTimers()

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
      <IdleDialog
        open={open}
        reset={reset}
        closeDialog={closeDialog}
        logout={logout}
        logoutTimer={logoutTimer}
        resetLogoutTimer={resetLogoutTimer}
      />
    </ErrorBoundary>
  )
}
