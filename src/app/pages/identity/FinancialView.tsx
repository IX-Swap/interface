import React from 'react'
import { IndividualIdentity } from 'types/identity'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'

export interface FinancialViewProps {
  data: IndividualIdentity
}

export const FinancialView = (props: FinancialViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.occupation} label='Occupation' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.employer} label='Employer' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          value={data.employmentStatus}
          label='Employment Status'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.annualIncome} label='Annual Income' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.sourceOfWealth} label='Source of Income' />
      </Grid>
    </Grid>
  )
}
