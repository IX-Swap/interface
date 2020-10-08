import React from 'react'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'
import { Grid, Typography } from '@material-ui/core'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits'
import { VSpacer } from 'v2/components/VSpacer'

export const DepositCash: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <DepositView />
      </Grid>
      <Grid item>
        <Typography variant='h5'>Recent Deposits</Typography>
        <VSpacer size='small' />
        <RecentDeposits />
      </Grid>
    </Grid>
  )
}
