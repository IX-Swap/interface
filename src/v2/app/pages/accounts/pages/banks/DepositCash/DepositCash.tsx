import React from 'react'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'
import { Grid, Paper, Typography } from '@material-ui/core'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits'

export const DepositCash: React.FC = () => {
  return (
    <Grid container direction='column' component={Paper} spacing={4}>
      <Grid item>
        <Typography variant='h5'>Deposit Cash</Typography>
        <DepositView />
      </Grid>
      <Grid item>
        <Typography variant='h5'>Recent Deposits</Typography>
        <RecentDeposits />
      </Grid>
    </Grid>
  )
}
