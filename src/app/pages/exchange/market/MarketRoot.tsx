import React from 'react'
import { PlaceOrderForm } from 'app/pages/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { useCreateOrder } from 'app/pages/exchange/market/hooks/useCreateOrder'
import { Box, Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/market/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/market/MarketRoot.style'

export const MarketRoot = () => {
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
          Market Order
        </Grid>

        <Grid item container>
          <Grid item className={classes.middleBlock} xs={12}>
            TradingView
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
        </Grid>
      </Grid>
    </Box>
  )
}
