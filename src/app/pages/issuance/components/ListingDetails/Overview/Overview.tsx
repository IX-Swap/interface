import { Grid } from '@mui/material'
import { BasicOverview } from 'app/pages/issuance/components/ListingDetails/Overview/BasicOverview'
import { MarketOverview } from 'app/pages/issuance/components/ListingDetails/Overview/MarketOverview'
import { OfferingTerms } from 'app/pages/issuance/components/ListingDetails/Overview/OfferingTerms'
import { PricingOverview } from 'app/pages/issuance/components/ListingDetails/Overview/PricingOverview'
import React from 'react'
import { ListingView } from 'types/listing'

export interface OverviewProps {
  data: ListingView
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <Grid container spacing={5} direction='column'>
      <Grid item xs={12}>
        <BasicOverview
          networkName={data.network?.name}
          capitalStructure={data.capitalStructure}
          launchDate={data.launchDate}
          completionDate={data.completionDate}
          releaseDate={data.dso?.releaseDate ?? ''}
          decimals={data.decimals}
          tokenAddress={data.dso?.deploymentInfo?.token ?? ''}
          classification={data.dso?.classification ?? ''}
        />
      </Grid>
      <Grid item xs={12}>
        <MarketOverview
          availableMarket={data?.listingType ?? ''}
          markets={data.exchange.markets}
          productType={data?.productType ?? ''}
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
