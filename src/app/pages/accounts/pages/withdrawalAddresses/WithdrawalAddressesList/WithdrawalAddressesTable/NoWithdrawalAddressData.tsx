import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ReactComponent as AddWalletAddressImage } from 'assets/add-wallet-address.svg'
import { AddWalletAddressButton } from '../WithdrawalAddressesList'

export const NoWithdrawalAddressData = () => {
  return (
    <Grid container flexDirection={'column'} pt={8}>
      <Grid item xs>
        <AddWalletAddressImage />
      </Grid>
      <Grid item xs container flexDirection={'column'} spacing={3} pt={5}>
        <Grid item xs>
          <Typography variant='h5' align='center'>
            Add Wallet
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body1'>
            You have no existing wallet address yet.
          </Typography>
        </Grid>
        <Grid item xs>
          <AddWalletAddressButton />
        </Grid>
      </Grid>
    </Grid>
  )
}
