import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { WithdrawForm } from 'v2/app/pages/accounts/pages/digital-securities/DSWithdraw/WithdrawForm'
import { WithdrawView } from 'v2/app/pages/accounts/pages/digital-securities/DSWithdraw/WithdrawView'

export const DSWithdraw: React.FC = () => {
  return (
    <WithdrawForm>
      <Grid container direction='column' component={Paper} spacing={4}>
        <Grid item>
          <Typography variant='h5'>Withdraw Digital Security</Typography>
          <WithdrawView />
        </Grid>
        <Grid item>
          <Typography variant='h5'>Recent Withdrawals</Typography>
        </Grid>
      </Grid>
    </WithdrawForm>
  )
}
