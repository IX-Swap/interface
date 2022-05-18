import React from 'react'
import { Grid } from '@mui/material'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Digital Security Deposit' />
      </Grid>

      <RootContainer>
        <Grid item xs={12}>
          <DepositForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
