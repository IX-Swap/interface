import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals'
import { WithdrawView } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawView'
import { VSpacer } from '../../../../../../components/VSpacer'

export const WithdrawCash: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <WithdrawView />
      </Grid>
      <Grid item>
        <Typography variant='h5'>Recent Withdrawals</Typography>
        <VSpacer size='small' />
        <RecentWithdrawals />
      </Grid>
    </Grid>
  )
}
