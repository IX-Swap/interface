import { Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { MarketViewProps } from 'app/pages/exchange/components/Market/MarketGridView'
import { TopSection } from 'app/pages/exchange/components/Market/MarketTabbedView/TopSection'
import React from 'react'

export const MarketTabbedView = (props: MarketViewProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TopSection {...props} />
      </Grid>
      <Grid item xs={12}>
        <MyOrders showMyTrades />
      </Grid>
    </Grid>
  )
}
