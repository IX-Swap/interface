import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'
import { NoCashButtons } from 'app/pages/accounts/pages/cash/components/NoCashButtons'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { KnowYourCustomer } from 'app/pages/dashboard/AccountActions/KnowYourCustomer'

export const CashAccounts = () => {
  const {
    isLoadingIdentities,
    identity,
    identityType,
    hasStartedKYC,
    hasSubmittedKYC,
    hasApprovedKYC
  } = useGetIdentities()

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  return (
    <FieldContainer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            justifyContent: 'space-between',
            rowGap: 3
          }}
        >
          <Grid
            item
            sx={{
              width: {
                xs: '100%',
                md: 'auto'
              }
            }}
          >
            <Typography variant='h5' display='inline-flex' alignItems='center'>
              Cash Accounts
            </Typography>
            <Typography color={'text.secondary'} mt={2}>
              Set up USD and SGD cash accounts for cash deposits and
              withdrawals.
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              width: {
                xs: '100%',
                md: 'auto'
              }
            }}
          >
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              variant='outlined'
              to={AccountsRoute.cash}
              fullWidth
            >
              View All Cash Accounts
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {!hasApprovedKYC ? (
            <Grid item xs>
              <KnowYourCustomer
                hasStarted={hasStartedKYC}
                hasSubmitted={hasSubmittedKYC}
                identityType={identityType}
                identityId={identity?._id}
                userId={identity?.user._id}
              />
            </Grid>
          ) : (
            <>
              <CashTable />
              <NoCashButtons />
            </>
          )}
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
