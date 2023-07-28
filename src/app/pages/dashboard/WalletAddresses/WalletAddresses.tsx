import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'

export const WalletAddresses = () => {
  return (
    <FieldContainer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <Typography variant='h5' display='inline-flex' alignItems='center'>
              Wallet Address
            </Typography>
            <Typography color={'text.secondary'} mt={2}>
              When making an investment, the tokens will be sent to a designated
              wallet.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              variant='outlined'
              to={WithdrawalAddressesRoute.list}
              data-testid='invest-link'
              // sx={{ px: 0 }}
            >
              View All Wallet Address
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <WithdrawalAddressesTable limitRows={3} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
