import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface AddressViewProps {
  data: IndividualIdentity['address']
}

export const AddressView = (props: AddressViewProps) => {
  const { data } = props
  return (
    <Grid
      item
      sx={{
        display: 'grid',
        gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
      }}
      container
    >
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue isRedesigned value={data?.line1} label='Line 1' />
        </Grid>

        <Grid item>
          <LabelledValue isRedesigned value={data?.city} label='City' />
        </Grid>

        <Grid item>
          <LabelledValue isRedesigned value={data?.country} label='Country' />
        </Grid>
      </Grid>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue isRedesigned value={data?.line2} label='Line 2' />
        </Grid>

        <Grid item>
          <LabelledValue isRedesigned value={data?.state} label='State' />
        </Grid>

        <Grid item>
          <LabelledValue
            isRedesigned
            value={data?.postalCode}
            label='Postal Code'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
