import { Box, Grid, Typography } from '@material-ui/core'
import { LiveTrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import {
  OrderBook,
  OrderBookProps
} from 'app/pages/invest/components/OrderBook/OrderBook'
import React from 'react'

const orderBookPropsMock: OrderBookProps = {
  data: [
    {
      price: 123.14,
      amount: 1500.14,
      total: 3000.14
    },
    {
      price: 456.14,
      amount: 1200.14,
      total: 3000.14
    },
    {
      price: 789.14,
      amount: 2500.14,
      total: 3000.14
    },
    {
      price: 789.14,
      amount: 2900.14,
      total: 3000.14
    }
  ],
  currency: 'SGD',
  tokenSymbol: 'IXPS',
  transaction: 'sell',
  showHeader: true
}
export const InvestorLiveOrderBook = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box px={2}>
          <Typography variant='subtitle1'>Market Order</Typography>
        </Box>
      </Grid>
      <Grid item>
        <OrderBook {...orderBookPropsMock} />
      </Grid>
      <Grid item>
        <LiveTrackingPrice price={3421.56} trend='down' />
      </Grid>
      <Grid item>
        <OrderBook
          {...{
            ...orderBookPropsMock,
            transaction: 'buy',
            showHeader: false
          }}
        />
      </Grid>
    </Grid>
  )
}
