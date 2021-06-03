import React from 'react'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { useCreateOrder } from 'app/pages/exchange/hooks/useCreateOrder'
import { Box, Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/pages/market/Market.style'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { Trades } from 'app/pages/invest/components/Trades/Trades'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import {
  IBasicDataFeed,
  IChartingLibraryWidget
} from 'charting_library/charting_library'
import { generatePath, Redirect, useParams } from 'react-router'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { isMarketDataFalsy, isPairIdFalsy } from '../../utils'
import { useSymbol } from '../../hooks/useSymbol'

export const Market = () => {
  const classes = useStyles()
  const [placeOrder] = useCreateOrder()
  const [
    tvWidget,
    setTradingChart
  ] = React.useState<IChartingLibraryWidget | null>(null)
  const [datafeed] = React.useState<IBasicDataFeed>(() => getDataFeed())
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useMarketList()
  const { symbol } = useSymbol(pairId, data)

  if ((isMarketDataFalsy(data), isLoading)) {
    return null
  }

  if (isPairIdFalsy(pairId)) {
    return (
      <Redirect
        to={generatePath(OTCMarketRoute.market, { pairId: data?.list[0]._id })}
      />
    )
  }

  return (
    <Box className={classes.container}>
      <Grid item xs={12} className={classes.colorGrid}>
        <FinancialSummary />
      </Grid>

      <Box my={2} />

      <Grid container direction={'column'} className={classes.wrapper}>
        <Grid item className={classes.colorGrid}>
          <InvestorLiveOrderBook currency='SGD' tokenSymbol='EUR' />
        </Grid>

        <Grid item container>
          <Grid item className={classes.middleBlock} xs={12}>
            {symbol.length > 0 && (
              <TVChartContainer
                tvWidget={tvWidget}
                setTradingChart={setTradingChart}
                datafeed={datafeed}
                symbol={symbol}
              />
            )}
          </Grid>
          <Grid item className={classes.colorGrid} xs={12}>
            <MyOrders />
          </Grid>
        </Grid>

        <Grid item container>
          <PlaceOrderForm
            currencyLabel={'SGD'}
            tokenLabel={'IXPS'}
            currencyBalance={15000}
            tokenBalance={300}
            onSubmit={placeOrder}
          />
          <Trades />
        </Grid>
      </Grid>
    </Box>
  )
}
