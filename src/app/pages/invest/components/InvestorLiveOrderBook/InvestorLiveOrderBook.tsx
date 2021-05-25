import { Box, Grid, Typography } from '@material-ui/core'
import { LiveTrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import { OrderBook } from 'app/pages/invest/components/OrderBook/OrderBook'
import { ValidCurrency } from 'helpers/types'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderBook } from '../../hooks/useOrderBook'

export interface InvestorLiveOrderBookProps {
  tokenSymbol: string
  currency: ValidCurrency
}

export const InvestorLiveOrderBook = ({
  tokenSymbol,
  currency
}: InvestorLiveOrderBookProps) => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { data: orderBookData } = useOrderBook(dsoId)

  if (orderBookData === undefined) {
    return null
  }

  const bids = orderBookData.bids
  const asks = orderBookData.asks

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box px={2}>
          <Typography variant='subtitle1'>Market Order</Typography>
        </Box>
      </Grid>
      <Grid item>
        <OrderBook
          data={bids}
          currency={currency}
          tokenSymbol={tokenSymbol}
          transaction='sell'
          showHeader
        />
      </Grid>
      <Grid item>
        <LiveTrackingPrice />
      </Grid>
      <Grid item>
        <OrderBook
          data={asks}
          currency={currency}
          tokenSymbol={tokenSymbol}
          transaction='buy'
        />
      </Grid>
    </Grid>
  )
}
