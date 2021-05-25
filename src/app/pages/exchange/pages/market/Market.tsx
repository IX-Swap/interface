import React from 'react'
import { useCreateOrder } from 'app/pages/exchange/hooks/useCreateOrder'
import { Box, Grid } from '@material-ui/core'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Trades } from 'app/pages/invest/components/Trades/Trades'
import { useStyles } from 'app/pages/exchange/pages/market/Market.style'

export const Market = () => {
  const classes = useStyles()
  const [placeOrder] = useCreateOrder()

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
            <TVChartContainer />
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
