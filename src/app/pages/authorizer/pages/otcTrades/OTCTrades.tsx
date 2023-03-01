import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WideContainer } from 'app/components/WideContainer/WideContainer'
import React from 'react'
import { MatchedOrders } from './matched/MatchedOrders'
import { UnmatchedOrders } from './unmatched/UnmatchedOrders'

export const OTCTrades = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Authorize OTC Trades' />
      </Grid>

      <WideContainer>
        <Grid item container direction='column' gap={6}>
          <Grid item container direction='column' gap={2}>
            <Typography variant='h4' fontWeight={600}>
              Matched Orders
            </Typography>
            <MatchedOrders />
          </Grid>
          <Grid item container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <UnmatchedOrders side='BUY' title={'Unmatched Buy Orders'} />
            <UnmatchedOrders side='SELL' title={'Unmatched Sell Orders'} />
          </Grid>
        </Grid>
      </WideContainer>
    </Grid>
  )
}
