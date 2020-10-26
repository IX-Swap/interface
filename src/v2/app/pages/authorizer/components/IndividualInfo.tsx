import React from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import { Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'v2/components/LabelledValue'
import { renderName } from 'v2/helpers/tables'
import { AuthorizerIdentityLink } from 'v2/app/components/AuthorizerIdentityLink'
import { Avatar } from 'v2/components/Avatar'

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
        <Avatar documentId={data.photo} ownerId={data.user._id} />
      </Grid>

      <Grid item>
        <AuthorizerIdentityLink identityId={data._id} type='individual' />
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
