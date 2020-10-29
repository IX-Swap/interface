import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'v2/components/LabelledValue'
import { Avatar } from 'v2/components/Avatar'
import { AuthorizerIdentityLink } from 'v2/app/components/AuthorizerIdentityLink'
import { getDataroomFileId } from 'v2/helpers/dataroom'

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
        <Avatar
          documentId={data.logo}
          ownerId={getDataroomFileId(data.user)}
          size={[200, 130]}
          variant='rounded'
        />
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
