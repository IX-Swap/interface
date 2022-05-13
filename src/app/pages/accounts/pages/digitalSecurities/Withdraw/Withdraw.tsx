import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawForm } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawForm'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const Withdraw = () => {
  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Digital Securities' />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <WithdrawForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
