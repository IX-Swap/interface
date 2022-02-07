import { Grid } from '@mui/material'
import { BasicOverview } from 'app/pages/exchange/components/ListingDetails/Overview/BasicOverview'
import { MarketOverview } from 'app/pages/exchange/components/ListingDetails/Overview/MarketOverview'
import { OfferingTerms } from 'app/pages/exchange/components/ListingDetails/Overview/OfferingTerms'
import { PricingOverview } from 'app/pages/exchange/components/ListingDetails/Overview/PricingOverview'
import React from 'react'
import { ListingView } from 'types/listing'

export interface OverviewProps {
  data: ListingView
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item xs={12}>
        <BasicOverview
          networkName={data.network.name}
          capitalStructure={data.capitalStructure}
          launchDate={data.launchDate}
          completionDate={data.completionDate}
          decimalPlaces={data.decimalPlaces}
          tokenAddress={data.dso?.deploymentInfo?.token ?? ''}
        />
      </Grid>
      <Grid item xs={12}>
        <MarketOverview
          availableMarket={data.marketType}
          markets={data.exchange.markets}
        />
      </Grid>
      <Grid item xs={12}>
        <PricingOverview
          minTradeAmount={data.minimumTradeUnits}
          maxTradeAmount={data.maximumTradeUnits}
          raisedAmount={data.raisedAmount}
        />
      </Grid>
      <Grid item xs={12}>
        <OfferingTerms
          investmentPeriod={data.investmentPeriod}
          dividendYield={data.dividendYield}
          investmentStructure={data.investmentStructure}
          grossIrr={data.grossIRR}
          equityMultiple={data.equityMultiple}
          distributionFrequency={data.distributionFrequency}
          leverage={data.leverage}
          interestRate={data.interestRate}
          capitalStructure={data.capitalStructure}
        />
      </Grid>
    </Grid>
  )
}
