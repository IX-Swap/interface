import React from 'react'
import { Grid } from '@material-ui/core'
import { CorporateIdentity } from 'v2/types/identity'
import { LabelledValue } from 'v2/components/LabelledValue'
import { Avatar } from 'v2/components/Avatar'

export interface CompanyInfoViewProps {
  data: CorporateIdentity
}

export const CompanyInfoView = (props: CompanyInfoViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Avatar documentId={data.logo} ownerId={data.user._id} />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.companyLegalName} label='Company Name' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.registrationNumber}
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.countryOfFormation}
          label='Country of Formation'
        />
      </Grid>
      <Grid item xs={4}>
        {/* @ts-ignore */}
        <LabelledValue
          value={data.dateOfIncorporation}
          label='Date of Incorporation'
        />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.email} label='Email Address' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.contactNumber} label='Contact Number' />
      </Grid>
    </Grid>
  )
}
