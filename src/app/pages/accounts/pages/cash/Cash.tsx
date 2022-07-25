import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'

export const Cash = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Cash' />
      </Grid>
      <RootContainer>
        <CashTable />
      </RootContainer>
    </Grid>
  )
}
