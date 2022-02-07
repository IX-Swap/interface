import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { Avatar } from 'components/Avatar'
import { privateClassNames } from 'helpers/classnames'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

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
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.companyLegalName} label='Company Name' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          className={privateClassNames()}
          value={data.registrationNumber}
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.email} label='Email Address' />
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
