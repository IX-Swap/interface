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
      <Grid item xs={4}>
        <LabelledValue value={data.occupation} label='Occupation' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.employer} label='Employer' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.employmentStatus}
          label='Employment Status'
        />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.industryOfEmployment} label='Industry' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.annualIncome} label='Annual Income' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.houseHoldIncome} label='Household Income' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.sourceOfWealth} label='Source of Income' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.bankName} label='Bank Name' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.bankAccountName}
          label='Name of Bank Account'
        />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.bankAccountNumber}
          label='Bank Account Number'
        />
      </Grid>
    </Grid>
  )
}
