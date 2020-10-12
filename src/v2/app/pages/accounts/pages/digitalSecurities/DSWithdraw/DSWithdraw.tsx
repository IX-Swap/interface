import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { WithdrawForm } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { WithdrawView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/RecentWithdrawals'
import { VSpacer } from 'v2/components/VSpacer'

export const DSWithdraw: React.FC = () => {
  return (
    <WithdrawForm>
      <Grid container direction='column'>
        <Grid item>
          <WithdrawView />
        </Grid>
        <Grid item>
          <VSpacer size='medium' />
        </Grid>
        <Grid item>
          <Typography variant='h5'>Recent Withdrawals</Typography>
          <VSpacer size='small' />
          <RecentWithdrawals />
        </Grid>
      </Grid>
    </WithdrawForm>
  )
}
