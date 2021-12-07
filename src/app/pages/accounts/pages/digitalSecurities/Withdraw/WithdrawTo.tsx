import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { AddressType } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressType'
import { Network } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Network'
import { AddressField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressField'

export const WithdrawTo = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant='body1' align='right'>
          <Box component='span' fontWeight='bold'>
            Withdrawal To:
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={6} style={{ marginTop: `-10px` }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddressType />
          </Grid>
          <Grid item xs={12}>
            <AddressField />
          </Grid>
          <Grid item xs={12}>
            <Network />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
