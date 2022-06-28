import { Grid } from '@mui/material'
import { MyOrders } from 'app/pages/invest/components/MyOrders/MyOrders'
import { MarketViewProps } from 'app/pages/invest/components/Market/MarketGridView'
import { TopSection } from 'app/pages/invest/components/Market/MarketTabbedView/TopSection'
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
