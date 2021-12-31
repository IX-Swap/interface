import React from 'react'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import AddressEmptyState from 'assets/address-empty-state.svg'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'

export const NoWithdrawalAddressData = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={5}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Box py={8}>
          <AddressEmptyState />
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box p={8} height='100%' display='flex'>
          <Grid container alignItems='center' spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                You have not added any withdrawal address yet.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>
                All the blockchain addresses added by you or assigned to you
                will be displayed here. Let’s add your first address.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={AppRouterLinkComponent}
                to={WithdrawalAddressesRoute.create}
                color='primary'
              >
                Add Withdrawal Address
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
