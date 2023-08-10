import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { Grid } from '@mui/material'
import { AppError } from 'components/AppError'
import { useDataFromURL } from 'hooks/location/useDataFromURL'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { AppRouter } from 'app/router/AppRouter'
import { IdleDialog } from 'app/components/IdleDialog'
import { useIdleTimers } from 'app/hooks/useIdleTimers'
import { Header } from 'app/components/Header/Header'
import Web3ReactManager from 'components/Web3ReactManager/Web3ReactManager'

export const AppRoot = () => {
  const { open, logoutTimer, resetLogoutTimer, closeDialog, reset, logout } =
    useIdleTimers()

  useDataFromURL()

  return (
    <ErrorBoundary fallback={AppError}>
      <Grid container direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <AppContentWrapper item container>
          <Web3ReactManager>
            <AppRouter />
          </Web3ReactManager>
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
