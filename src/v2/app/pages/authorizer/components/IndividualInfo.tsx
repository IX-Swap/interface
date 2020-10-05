import React from 'react'
import { IndividualIdentity } from '../../../../types/identity'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { ViewDocument } from '../../../components/DSO/components/ViewDocument'
import { LabelledValue } from '../../../../components/LabelledValue'
import { renderName } from '../../../../helpers/tables'

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
        <ViewDocument documentId={data.photo} ownerId={data.user}>
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
