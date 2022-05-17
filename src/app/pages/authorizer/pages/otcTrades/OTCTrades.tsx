import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WideContainer } from 'app/components/WideContainer/WideContainer'
import React from 'react'
import { MatchedOrders } from './matched/MatchedOrders'
import { UnmatchedOrders } from './unmatched/UnmatchedOrders'

export const OTCTrades = () => {
  return (
    <WideContainer>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader title='Authorize OTC Trades' />
        </Grid>
        <Grid item container direction='column' gap={6}>
          <Grid item container direction='column' gap={2}>
            <Typography variant='h4' fontWeight={600}>
              Matched Orders
            </Typography>
            <MatchedOrders />
          </Grid>
          <Grid
            item
            columnGap={6}
            display='grid'
            gridTemplateColumns='repeat(2, 1fr)'
          >
            <Grid item container direction='column' gap={2}>
              <Typography variant='h4' fontWeight={600}>
                Unmatched Buy Orders
              </Typography>

              <UnmatchedOrders side='BUY' />
            </Grid>
            <Grid item container direction='column' gap={2}>
              <Typography variant='h4' fontWeight={600}>
                Unmatched Sell Orders
              </Typography>
              <UnmatchedOrders side='SELL' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WideContainer>
  )
}
