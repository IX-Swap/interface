import { Box, Grid, Typography, Table } from '@material-ui/core'
import { LiveTrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/LiveTrackingPrice'
import { OrderBook } from 'app/pages/exchange/components/OrderBook/OrderBook'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderBook } from 'app/pages/exchange/hooks/useOrderBook'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { OrderBookHeader } from 'app/pages/exchange/components/OrderBook/OrderBookHeader'

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
    <Grid
      container
      direction='column'
      spacing={2}
      style={{ height: '100%' }}
      wrap='nowrap'
    >
      <Grid item>
        <Box px={2} py={2}>
          <Typography variant='subtitle1'>Market Order</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Table>
          <OrderBookHeader
            tokenSymbol={tradingPair?.listing.tokenSymbol}
            currency={tradingPair?.listing.markets[0].currency}
          />
        </Table>
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          flexWrap='nowrap'
          justifyContent='flex-start'
          alignContent='space-between'
        >
          <Box
            height='calc(50% - 26px)'
            overflow='hidden'
            flexShrink={1}
            flexGrow={1}
          >
            <OrderBook
              data={asks.slice(0, 15)}
              currency={tradingPair?.listing.markets[0].currency}
              tokenSymbol={tradingPair?.listing.tokenSymbol}
              transaction='sell'
            />
          </Box>
          <Box py={2}>
            <LiveTrackingPrice />
          </Box>
          <Box
            height='calc(50% - 26px)'
            overflow='hidden'
            flexGrow={0}
            flexShrink={1}
          >
            <OrderBook
              data={bids.slice(0, 15)}
              currency={tradingPair?.listing.markets[0].currency}
              tokenSymbol={tradingPair?.listing.tokenSymbol}
              transaction='buy'
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
