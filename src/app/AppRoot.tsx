import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Grid } from '@mui/material'
import { AppError } from 'app/components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { OnboardingContentWrapper } from 'app/components/OnboardingPanel/OnboardingContentWrapper'
import { AppRouter } from 'app/router/AppRouter'
import { IdleDialog } from 'app/components/IdleDialog'
import { useIdleTimers } from 'app/hooks/useIdleTimers'
import { HeaderWrapper } from 'app/components/Header/HeaderWrapper'

export const AppRoot = () => {
  const { open, logoutTimer, resetLogoutTimer, closeDialog, reset, logout } =
    useIdleTimers()

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <Grid container direction='column'>
        <Grid item>
          <HeaderWrapper isNewTheme />
        </Grid>
        <SidebarContainer />
        <AppContentWrapper item container>
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
