import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface AddressSectionProps {
  address: CorporateIdentity['companyAddress']
}

export const AddressSection = ({ address }: AddressSectionProps) => {
  if (address === undefined) {
    return null
  }

  const { line1, line2, city, postalCode, state, country } = address

  return (
    <Grid
      item
      sx={{
        display: 'grid',
        gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
      }}
      container
      spacing={5}
    >
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue isRedesigned value={line1} label='Line 1' />
        </Grid>
        <Grid item>
          <LabelledValue isRedesigned value={city} label='City' />
        </Grid>
        <Grid item>
          <LabelledValue isRedesigned value={country} label='Country' />
        </Grid>
      </Grid>

      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue isRedesigned value={line2} label='Line 2' />
        </Grid>
        <Grid item>
          <LabelledValue isRedesigned value={state} label='State' />
        </Grid>
        <Grid item>
          <LabelledValue isRedesigned value={postalCode} label='Postal Code' />
        </Grid>
      </Grid>
    </Grid>
  )
}
