import React from 'react'
import { Grid, Box, Typography, Paper } from '@material-ui/core'
import { RecentWithdrawals } from 'v2/app/accounts/banks/WithdrawCash/RecentWithdrawals'
import { WithdrawView } from 'v2/app/accounts/banks/WithdrawCash/WithdrawView'

export const WithdrawCash: React.FC = () => {
  return (
    <Grid container direction='column' component={Paper} spacing={4}>
      <Grid item>
        <Box px={4}>
          <Typography variant='h5'>Withdraw Cash</Typography>
          <WithdrawView />
        </Box>
      </Grid>
      <Grid item>
        <Box px={4}>
          <Typography variant='h5'>Recent Withdrawals</Typography>
          <RecentWithdrawals />
        </Box>
      </Grid>
    </Grid>
  )
}
