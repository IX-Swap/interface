import { Grid } from '@material-ui/core'
import { BasicOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/BasicOverview'
import { MarketOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/MarketOverview'
import { OfferingTerms } from 'app/pages/exchange/market/components/ListingDetails/Overview/OfferingTerms'
import { PricingOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/PricingOverview'
import React from 'react'

export const Overview = () => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item xs={12}>
        <BasicOverview />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: -50 }}>
        <MarketOverview />
      </Grid>
      <Grid item xs={12}>
        <PricingOverview />
      </Grid>
      <Grid item xs={12}>
        <OfferingTerms />
      </Grid>
    </Grid>
  )
}
