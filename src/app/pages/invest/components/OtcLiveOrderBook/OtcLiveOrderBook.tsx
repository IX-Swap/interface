import { Box, Grid, Typography, Table, Hidden } from '@mui/material'
import { LiveTrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import { OrderBook } from 'app/pages/invest/components/OrderBook/OrderBook'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderBook } from 'app/pages/invest/hooks/useOrderBook'
import { useMarket } from 'app/pages/invest/hooks/useMarket'
import { OrderBookHeader } from 'app/pages/invest/components/OrderBook/OrderBookHeader'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useOTCMarket } from '../../hooks/useOTCMarket'
import { useOTCOrderBook } from '../../hooks/useOTCOrderBook'

export const OtcLiveOrderBook = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data: orderBookData } = useOrderBook(pairId)
  const { data: tradingPair } = useMarket(pairId)
  const { data: marketData } = useOTCMarket(pairId)
  const { data: otcOrderBookData } = useOTCOrderBook(pairId)
  const { isMiniLaptop } = useAppBreakpoints()

  if (orderBookData === undefined) {
    return null
  }

  const buys = otcOrderBookData?.buys
  const sells = otcOrderBookData?.sells
  console.log(marketData, tradingPair, otcOrderBookData, ',marketData')
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
              tokenSymbol={marketData?.otc?.tokenSymbol}
              currency={marketData?.otc?.markets[0]?.currency}
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
              data={buys?.slice(0, 15)}
              currency={marketData?.otc?.markets[0]?.currency}
              tokenSymbol={marketData?.otc?.tokenSymbol}
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
              data={sells?.slice(0, 15)}
              currency={marketData?.otc?.markets[0]?.currency}
              tokenSymbol={marketData?.otc?.tokenSymbol}
              transaction='buy'
              barOrigin={isMiniLaptop ? 'left' : 'right'}
              showHeader={isMiniLaptop}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
