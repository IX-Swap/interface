import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'
import { NoCashButtons } from './components/NoCashButtons'
import { CashBalance } from 'app/pages/accounts/components/CashBalance'

export const Cash = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Cash' />
      </Grid>
      <RootContainer>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12}>
            <CashBalance />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              display={'inline-flex'}
              alignItems={'center'}
              mb={3}
            >
              Cash
            </Typography>
            <CashTable />
            <NoCashButtons />
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
