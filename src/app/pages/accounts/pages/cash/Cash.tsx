import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { CashBalance } from 'app/pages/accounts/components/CashBalance'

export const Cash = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Cash' />
      </Grid>
      <RootContainer>
        <CashBalance />
      </RootContainer>
    </Grid>
  )
}
