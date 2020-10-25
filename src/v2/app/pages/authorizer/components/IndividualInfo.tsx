import React from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { LabelledValue } from 'v2/components/LabelledValue'
import { renderName } from 'v2/helpers/tables'
import { AuthorizerIdentityLink } from 'v2/app/components/AuthorizerIdentityLink'

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
        <ViewDocument documentId={data.photo} ownerId={data.user._id}>
          {image => (
            <Avatar
              src={image}
              variant='rounded'
              style={{ width: 200, height: 200 }}
            />
          )}
        </ViewDocument>
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
