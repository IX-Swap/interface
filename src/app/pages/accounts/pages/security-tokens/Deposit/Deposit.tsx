import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { DepositForm } from 'app/pages/accounts/pages/security-tokens/Deposit/DepositForm'

export const Deposit: React.FC = () => {
  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Deposit My Tokens' />
      </Grid>

      <RootContainer>
        <Grid container justifyContent={'center'}>
          <Grid item xs md={10} lg={7}>
            <FieldContainer>
              <DepositForm />
            </FieldContainer>
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
