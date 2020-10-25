import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'v2/components/LabelledValue'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { AuthorizerIdentityLink } from 'v2/app/components/AuthorizerIdentityLink'

export interface CorporateInfoProps {
  data: CorporateIdentity
}

export const CorporateInfo = (props: CorporateInfoProps) => {
  const { data } = props

  return (
    <Grid
      container
      item
      direction='column'
      spacing={3}
      style={{ marginBottom: 70 }}
    >
      <Grid item>
        <Typography variant='h3'>{data.companyLegalName}</Typography>
      </Grid>

      <Grid item>
        <ViewDocument documentId={data.logo} ownerId={data.user._id}>
          {image => (
            <Avatar
              src={image}
              variant='rounded'
              style={{ width: 200, height: 'auto' }}
            />
          )}
        </ViewDocument>
      </Grid>

      <Grid item>
        <AuthorizerIdentityLink identityId={data._id} type='corporate' />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Address'
          value={convertAddressToString(data.companyAddress)}
        />
      </Grid>

      <Grid item>
        <LabelledValue label='Contact' value={data.contactNumber} />
      </Grid>

      <Grid item>
        <LabelledValue label='Email Address' value={data.email} />
      </Grid>
    </Grid>
  )
}
