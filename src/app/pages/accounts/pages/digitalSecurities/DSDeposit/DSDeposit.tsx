import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { RecentDeposits } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { DepositView } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Digital Security Deposit' />
      </Grid>

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
