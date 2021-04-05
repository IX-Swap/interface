import { Grid, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export interface IssuerDetailsViewProps {
  data: DetailsOfIssuance
}

export const IssuerDetailsView = ({ data }: IssuerDetailsViewProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>Please review the summary details.</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue value={data.fullName} label='Full Name' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue value={data.companyName} label='Company Name' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue value={data.email} label='Email Address' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue
          value={data.contactNumber}
          label='Contact Number - (optional)'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue value={data.industry} label='Industry' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelledValue
          value={data.fundRaisingAmount}
          label='Fundraising Amount'
        />
      </Grid>
      <Grid item xs={12}>
        <LabelledValue value={data.detail} label='Details of Issuance' />
      </Grid>
    </Grid>
  )
}
