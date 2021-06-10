import { Box, Grid, Typography } from '@material-ui/core'
import { LiveTrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/LiveTrackingPrice'
import { OrderBook } from 'app/pages/exchange/components/OrderBook/OrderBook'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderBook } from 'app/pages/exchange/hooks/useOrderBook'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'

export const InvestorLiveOrderBook = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data: orderBookData } = useOrderBook(pairId)
  const { data: tradingPair } = useMarket(pairId)

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
          data={asks}
          currency={tradingPair?.listing.markets[0].currency}
          tokenSymbol={tradingPair?.listing.tokenSymbol}
          transaction='sell'
          showHeader
        />
      </Grid>
      <Grid item>
        <LiveTrackingPrice />
      </Grid>
      <Grid item>
        <OrderBook
          data={bids}
          currency={tradingPair?.listing.markets[0].currency}
          tokenSymbol={tradingPair?.listing.tokenSymbol}
          transaction='buy'
        />
      </Grid>
    </Grid>
  )
}
