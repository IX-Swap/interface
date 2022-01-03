import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawForm } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawForm'
import React from 'react'

export const Withdraw = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Digital Securities' />
      </Grid>
      <Grid item xs={12}>
        <WithdrawForm />
      </Grid>
    </Grid>
  )
}
