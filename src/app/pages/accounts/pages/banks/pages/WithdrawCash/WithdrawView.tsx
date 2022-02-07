import React from 'react'
import { Grid } from '@mui/material'
import { WithdrawForm } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawForm'
import { Setup } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Setup'
import { RecentWithdrawals } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/RecentWithdrawals'

export const WithdrawView: React.FC = () => {
  return (
    <WithdrawForm>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <Setup />
        </Grid>
        <Grid item>
          <RecentWithdrawals />
        </Grid>
      </Grid>
    </WithdrawForm>
  )
}
