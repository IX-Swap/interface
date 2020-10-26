import React from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'

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
        <LabelledValue
          value={data.walletAddress}
          label='Digital Security Wallet Address'
        />
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
      <Grid item xs={5}>
        <LabelledValue
          value={data.toArrangeCustody}
          label='I would like InvestaX to arrange digital security custody'
        />
      </Grid>
    </Grid>
  )
}
