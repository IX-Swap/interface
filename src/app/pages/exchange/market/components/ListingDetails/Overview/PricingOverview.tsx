import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export const PricingOverview = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Pricing' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Min Trade Amount' value='2.00 USD' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Max Trade Amount' value='500,000.00 USD' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Raised Amount' value='2,300,000 USD' />
      </Grid>
    </Grid>
  )
}
