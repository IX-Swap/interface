import React from 'react'
import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DigitalSecurityOffering } from 'types/dso'
import { addSymbol, formatMoney } from 'helpers/numbers'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOPricingViewProps {
  dso: DigitalSecurityOffering
}

export const DSOPricingView = ({ dso }: DSOPricingViewProps) => {
  const currency = dso.currency.symbol
  const totalFundraisingAmount =
    dso.totalFundraisingAmount !== null
      ? addSymbol(dso.totalFundraisingAmount.toLocaleString(), currency, true)
      : ''
  const minimumInvestment =
    dso.minimumInvestment !== null
      ? addSymbol(dso.minimumInvestment.toLocaleString(), dso.tokenSymbol, true)
      : ''
  const totalUnits =
    dso.totalFundraisingAmount !== null
      ? (dso.totalFundraisingAmount / dso.pricePerUnit).toLocaleString()
      : 0
  const minimumInvestmentPrice =
    dso.minimumInvestment !== null
      ? addSymbol(
          (dso.minimumInvestment * dso.pricePerUnit).toLocaleString(),
          currency,
          true
        )
      : 0
  return (
    <Grid container spacing={3} direction='column'>
      <Grid item>
        <FormSectionHeader title='Pricing' />
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <LabelledValue
              label='Unit Price'
              value={formatMoney(dso.pricePerUnit, currency, true)}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <LabelledValue
              label='Total Fundraising Amount'
              value={totalFundraisingAmount}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <LabelledValue
              label='Minimum Investment'
              value={minimumInvestment}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <LabelledValue label='Total Units' value={totalUnits} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <LabelledValue
              label='Minimum Investment'
              value={minimumInvestmentPrice}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
