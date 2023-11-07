import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { WithdrawForm } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawForm'

export const Withdraw = () => {
  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Withdraw My Tokens' />
      </Grid>

      <RootContainer>
        <Grid container justifyContent={'center'}>
          <Grid item xs md={7}>
            <FieldContainer>
              <WithdrawForm />
            </FieldContainer>
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
