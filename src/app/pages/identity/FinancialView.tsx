import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/_identity/types/forms'

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
