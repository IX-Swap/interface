import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { DepositView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'
import { VSpacer } from 'v2/components/VSpacer'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <DepositView />
      </Grid>

      <Grid item>
        <VSpacer size='medium' />
      </Grid>

      <Grid item>
        <Typography variant='h5'>Recent Deposits</Typography>
        <VSpacer size='small' />
        <RecentDeposits />
      </Grid>
    </Grid>
  )
}
