import { Box, Grid, Typography, Table, Hidden } from '@mui/material'
import { LiveTrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/LiveTrackingPrice'
import { OrderBook } from 'app/pages/exchange/components/OrderBook/OrderBook'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderBook } from 'app/pages/exchange/hooks/useOrderBook'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { OrderBookHeader } from 'app/pages/exchange/components/OrderBook/OrderBookHeader'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const InvestorLiveOrderBook = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data: orderBookData } = useOrderBook(pairId)
  const { data: tradingPair } = useMarket(pairId)
  const { isMiniLaptop } = useAppBreakpoints()

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

      <Hidden lgDown>
        <Grid item>
          <Table>
            <OrderBookHeader
              tokenSymbol={tradingPair?.listing.tokenSymbol}
              currency={tradingPair?.listing.markets[0].currency}
            />
          </Table>
        </Grid>
      </Hidden>

      <Grid item style={{ flexGrow: 1 }}>
        <Box
          display='flex'
          flexDirection={{ xs: 'row', md: 'column' }}
          height='100%'
          flexWrap='nowrap'
          justifyContent='flex-start'
          alignContent='space-between'
        >
          <Box
            height={{ xs: 'auto', md: 'calc(50% - 26px)' }}
            overflow='hidden'
            flexShrink={1}
            flexGrow={1}
            mr={{ xs: 1, md: 0 }}
          >
            <OrderBook
              data={asks.slice(0, 15)}
              currency={tradingPair?.listing.markets[0].currency}
              tokenSymbol={tradingPair?.listing.tokenSymbol}
              transaction='sell'
              showHeader={isMiniLaptop}
            />
          </Box>

          <Hidden lgDown>
            <Box py={2}>
              <LiveTrackingPrice />
            </Box>
          </Hidden>

          <Box
            height={{ xs: 'auto', md: 'calc(50% - 26px)' }}
            overflow='hidden'
            flexGrow={0}
            flexShrink={1}
            ml={{ xs: 1, md: 0 }}
          >
            <OrderBook
              data={bids.slice(0, 15)}
              currency={tradingPair?.listing.markets[0].currency}
              tokenSymbol={tradingPair?.listing.tokenSymbol}
              transaction='buy'
              barOrigin={isMiniLaptop ? 'left' : 'right'}
              showHeader={isMiniLaptop}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
