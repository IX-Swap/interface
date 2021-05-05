import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { RecentDeposits } from 'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import { CashDepositButton } from 'app/pages/accounts/components/CashDepositButton/CashDepositButton'

export const DepositCash: React.FC = () => {
  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <PageHeader title='Cash Deposits' />
      </Grid>
      <Grid item>
        <VirtualAccountDetails />
      </Grid>
      <Grid item>
        <CashDepositButton />
      </Grid>
      <Grid item>
        <Typography variant='h5'>Recent Deposits</Typography>
        <VSpacer size='small' />
        <RecentDeposits />
      </Grid>
    </Grid>
  )
}
