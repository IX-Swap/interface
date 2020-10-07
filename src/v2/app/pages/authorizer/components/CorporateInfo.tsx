import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Grid, Typography } from '@material-ui/core'
import { convertAddressToString } from './utils'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface CorporateInfoProps {
  data: CorporateIdentity
}

export const CorporateInfo = (props: CorporateInfoProps) => {
  const { data } = props

  return (
    <Grid container item direction='column' spacing={3}>
      <Grid item>
        <Typography variant='h3'>{data.companyLegalName}</Typography>
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
