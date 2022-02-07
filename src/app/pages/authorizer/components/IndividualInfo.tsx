import React from 'react'
import { Grid, Typography } from '@mui/material'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'components/LabelledValue'
import { renderName } from 'helpers/tables'
import { AuthorizerIdentityLink } from 'app/components/AuthorizerIdentityLink'
import { Avatar } from 'components/Avatar'
import { getDataroomFileId } from 'helpers/dataroom'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface IndividualInfoProps {
  data: IndividualIdentity
}

export const IndividualInfo = (props: IndividualInfoProps) => {
  const { data } = props

  return (
    <Grid container item direction='column' spacing={3}>
      <Grid item>
        <Typography variant='h3'>{renderName('', data)}</Typography>
      </Grid>

      <Grid item>
        <Avatar
          documentId={data.photo}
          ownerId={getDataroomFileId(data.user)}
          variant='rounded'
          size={200}
        />
      </Grid>

      <Grid item>
        <AuthorizerIdentityLink
          userId={getDataroomFileId(data.user)}
          identityId={data._id}
          type='individual'
        />
      </Grid>

      <Grid item>
        <LabelledValue label='Name' value={renderName('', data)} />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Address'
          value={convertAddressToString(data.address)}
        />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Country of Residence'
          value={data.countryOfResidence}
        />
      </Grid>

      <Grid item>
        <LabelledValue label='Nationality' value={data.nationality} />
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
