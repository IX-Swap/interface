import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PlaceOrderForm } from 'app/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { useCreateOrder } from 'app/exchange/market/hooks/useCreateOrder'
import { Box, Grid } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { MyOrders } from 'app/pages/exchange/market/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'

export const MarketRoot = () => {
  const [placeOrder] = useCreateOrder()
  const { isMobile } = useAppBreakpoints()

  return (
    <RootContainer
      maxWidth={'xl'}
      style={{ backgroundColor: 'rgb(249, 259, 249)' }}
    >
      <Grid container direction={'column'}>
        <Grid item container>
          <Grid item xs={12} style={{ backgroundColor: '#fff' }}>
            <FinancialSummary />
          </Grid>
        </Grid>
        <Box my={1} />
        <Grid
          item
          container
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
        >
          <Grid item container xs={12} md={3}>
            <Grid style={{ backgroundColor: '#fff' }} xs={12}>
              Market Order
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6} direction={'row'} spacing={2}>
            <Grid item container xs={12}>
              <Grid item style={{ backgroundColor: '#fff' }} xs={12}>
                TradingView
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item style={{ backgroundColor: '#fff' }} xs={12}>
                <MyOrders />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3}>
            <PlaceOrderForm onSubmit={placeOrder} />
          </Grid>
        </Grid>
      </Grid>
    </RootContainer>
  )
}
