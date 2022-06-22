import React from 'react'
import { Grid } from '@mui/material'
import { WithdrawView } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const WithdrawCash: React.FC = () => {
  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Cash Withdrawals' />
      </Grid>
      <RootContainer>
        <Grid item pl={2}>
          <WithdrawView />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
