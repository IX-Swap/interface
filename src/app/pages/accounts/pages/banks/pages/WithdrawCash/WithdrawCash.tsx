import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { RecentWithdrawals } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/RecentWithdrawals'
import { WithdrawView } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const WithdrawCash: React.FC = () => {
  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Cash Withdrawals' />
      </Grid>
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
  )
}
