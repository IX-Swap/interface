import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { RecentDeposits } from 'v2/app/accounts/digital-securities/DSDeposit/RecentDeposits'
import { DepositView } from 'v2/app/accounts/digital-securities/DSDeposit/DepositView'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column' component={Paper} spacing={4}>
      <Grid item>
        <Typography variant='h5'>Deposit Digital Security</Typography>
        <DepositView />
      </Grid>

      <Grid item>
        <Typography variant='h5'>Recent Deposits</Typography>
        <RecentDeposits />
      </Grid>
    </Grid>
  )
}
