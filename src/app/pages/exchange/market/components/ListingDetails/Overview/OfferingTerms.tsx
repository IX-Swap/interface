import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export const OfferingTerms = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Offering Terms' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Investment Period' value='12' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Dividend Yield' value='12' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Investment Structure' value='Equity' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Gross IRR (%)' value='5' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Equity Multiple' value='2' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Distribution Frequency' value='Quaterly' />
      </Grid>
    </Grid>
  )
}
