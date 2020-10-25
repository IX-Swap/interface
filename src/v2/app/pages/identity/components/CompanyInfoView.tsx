import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { CorporateIdentity } from 'v2/types/identity'
import { LabelledValue } from 'v2/components/LabelledValue'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'

export interface CompanyInfoViewProps {
  data: CorporateIdentity
}

export const CompanyInfoView = (props: CompanyInfoViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ViewDocument documentId={data.logo} ownerId={data.user._id}>
          {url => <Avatar src={url} style={{ width: 80, height: 80 }} />}
        </ViewDocument>
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
        <LabelledValue
          value={data.walletAddress}
          label='Digital Security Wallet Address'
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <LabelledValue value={data.email} label='Email Address' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.contactNumber} label='Contact Number' />
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
