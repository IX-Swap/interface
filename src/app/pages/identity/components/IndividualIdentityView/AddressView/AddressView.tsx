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
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.line1} label='Line 1' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.line2} label='Line 2' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.city} label='City' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.state} label='State' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.country} label='Country' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue value={data.postalCode} label='Postal Code' />
      </Grid>
    </Grid>
  )
}
