import React from 'react'
import { ExtendedIdentityProfile } from 'v2/types/identity'
import { Avatar, Grid } from '@material-ui/core'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface IndividualInfoViewProps {
  data: ExtendedIdentityProfile
}

export const IndividualInfoView = (props: IndividualInfoViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ViewDocument documentId={data.photo} ownerId={data.user._id}>
          {url => <Avatar src={url} style={{ width: 80, height: 80 }} />}
        </ViewDocument>
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.firstName} label='First Name' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.middleName} label='Middle Name' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.lastName} label='Last Name' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue label='Date of Birth' value={data.dob} />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.nationality} label='Nationality' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue
          value={data.countryOfResidence}
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.email} label='Email' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.contactNumber} label='Contact Number' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.gender} label='Gender' />
      </Grid>
      <Grid item xs={4}>
        <LabelledValue value={data.maritalStatus} label='Marital Status' />
      </Grid>
    </Grid>
  )
}
