import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface FinancialViewProps {
  data: IndividualIdentity
}

export const FinancialView = (props: FinancialViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={6}>
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
        <Grid item xs={12} sm={6} md={12}>
          <LabelledValue
            value={data.annualIncome}
            label='Annual Net Income (SGD)'
          />
        </Grid>
      </Grid>

      <Grid item container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue value={data.sourceOfFund} label='Source of fund' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            value={data?.otherSourceOfFund}
            label='Other source of fund'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
