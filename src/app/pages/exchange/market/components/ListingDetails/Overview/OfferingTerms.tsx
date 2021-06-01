import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export interface OfferingTermsProps {
  investmentPeriod: number
  dividendYield: number
  investmentStructure: string
  grssIrr: number
  equityMultiple: number
  distributionFrequency: string
}

export const OfferingTerms = ({
  investmentPeriod,
  dividendYield,
  investmentStructure,
  grssIrr,
  equityMultiple,
  distributionFrequency
}: OfferingTermsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Offering Terms' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Investment Period' value={investmentPeriod} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Dividend Yield' value={dividendYield} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Investment Structure'
          value={investmentStructure}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Gross IRR (%)' value={grssIrr} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Equity Multiple' value={equityMultiple} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue
          label='Distribution Frequency'
          value={distributionFrequency}
        />
      </Grid>
    </Grid>
  )
}
