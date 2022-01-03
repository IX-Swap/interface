import React from 'react'
import { Grid } from '@material-ui/core'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader title='Digital Security Deposit' />
      </Grid>

      <Grid item xs={12}>
        <DepositForm />
      </Grid>
    </Grid>
  )
}
