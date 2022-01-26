import React from 'react'
import { Grid, Typography } from '@mui/material'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'components/LabelledValue'
import { Avatar } from 'components/Avatar'
import { AuthorizerIdentityLink } from 'app/components/AuthorizerIdentityLink'
import { getDataroomFileId } from 'helpers/dataroom'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

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
        <AuthorizerIdentityLink
          userId={getDataroomFileId(data.user)}
          identityId={data._id}
          type='corporate'
        />
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
