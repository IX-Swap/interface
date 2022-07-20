import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawForm } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawForm'
import { Setup } from 'app/pages/accounts/pages/withdraw/components/Setup'
import React from 'react'
export const Withdraw = () => {
  return (
    <Grid container direction='column' spacing={3} paddingBottom={3}>
      <Grid item>
        <PageHeader title='Cash Withdrawal' />
      </Grid>
      <Grid item container justifyContent={'center'}>
        <Grid item>
          <WithdrawForm>
            <Setup />
          </WithdrawForm>
        </Grid>
      </Grid>
    </Grid>
  )
}
