import React from 'react'
import { Grid } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { formatMoney } from 'helpers/numbers'

export interface DSOInvestorOverviewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorOverview = (props: DSOInvestorOverviewProps) => {
  const { dso } = props
  const totalUnits = (dso.totalFundraisingAmount ?? 0) / dso.pricePerUnit
  const minimumTokenInvestment = (dso.minimumInvestment ?? 0) / dso.pricePerUnit

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3}>
        <OverviewValue
          label='Total Units'
          value={`${totalUnits} ${dso.tokenSymbol}` ?? ''}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <OverviewValue
          label='Total Fundraising Amount'
          value={formatMoney(
            dso.totalFundraisingAmount,
            dso.currency.symbol,
            true
          )}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <OverviewValue
          label='Minimum Amount'
          value={formatMoney(dso.minimumInvestment, dso.currency.symbol, true)}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <OverviewValue
          label='Minimum Units'
          value={`${minimumTokenInvestment ?? ''} ${dso.tokenSymbol}` ?? ''}
        />
      </Grid>
    </Grid>
  )
}
