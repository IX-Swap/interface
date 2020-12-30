import React from 'react'
import { ExtendedIdentityProfile } from 'types/identity'
import { Grid } from '@material-ui/core'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateToMMDDYY } from 'helpers/dates'
import { privateClassNames } from 'helpers/classnames'

export interface IndividualInfoViewProps {
  data: ExtendedIdentityProfile
}

export const IndividualInfoView = (props: IndividualInfoViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Avatar documentId={data.photo} ownerId={data.user._id} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.firstName} label='First Name' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.middleName} label='Middle Name' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.lastName} label='Last Name' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          className={privateClassNames()}
          label='Date of Birth'
          value={formatDateToMMDDYY(data.dob)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.nationality} label='Nationality' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          value={data.countryOfResidence}
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.email} label='Email' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          className={privateClassNames()}
          value={data.contactNumber}
          label='Contact Number'
        />
      </Grid>
    </Grid>
  )
}
