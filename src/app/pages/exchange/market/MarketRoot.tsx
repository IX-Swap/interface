import React from 'react'
import { PlaceOrderForm } from 'app/pages/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { useCreateOrder } from 'app/pages/exchange/market/hooks/useCreateOrder'
import { Box, Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/market/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/market/MarketRoot.style'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { Trades } from 'app/pages/invest/components/Trades/Trades'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import {
  IBasicDataFeed,
  IChartingLibraryWidget
} from 'charting-library/charting_library'

export const MarketRoot = () => {
  const classes = useStyles()
  const [placeOrder] = useCreateOrder()
  const [
    tvWidget,
    setTradingChart
  ] = React.useState<IChartingLibraryWidget | null>(null)
  const [datafeed] = React.useState<IBasicDataFeed>(() => getDataFeed())
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
            <TVChartContainer
              tvWidget={tvWidget}
              setTradingChart={setTradingChart}
              datafeed={datafeed}
              symbol='EUR/SGD'
            />
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
