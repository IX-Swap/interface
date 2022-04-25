import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import React from 'react'

export interface PricingOverviewProps {
  minTradeAmount: number
  maxTradeAmount: number
  raisedAmount: number
}

export const PricingOverview = ({
  minTradeAmount,
  maxTradeAmount,
  raisedAmount
}: PricingOverviewProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Pricing' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Min Trade Amount'
          value={formatAmount(minTradeAmount)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue
          label='Max Trade Amount'
          value={formatAmount(maxTradeAmount)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Raised Amount'
          value={formatAmount(raisedAmount)}
        />
      </Grid>
    </Grid>
  )
}
