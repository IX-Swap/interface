import React from 'react'
import { Grid } from '@mui/material'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export const DSDeposit: React.FC = () => {
  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Deposit My Tokens' />
      </Grid>

      <RootContainer>
        <Grid container justifyContent={'center'}>
          <Grid item xs md={7}>
            <FieldContainer>
              <DepositForm />
            </FieldContainer>
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
