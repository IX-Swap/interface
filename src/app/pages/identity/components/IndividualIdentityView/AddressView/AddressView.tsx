import React from 'react'
import { Grid, useTheme } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface AddressViewProps {
  data: IndividualIdentity['address']
}

export const AddressView = (props: AddressViewProps) => {
  const { data } = props
  const theme = useTheme()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.line1}
          label='Line 1'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.line2}
          label='Line 2'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.city}
          label='City'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.state}
          label='State'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.country}
          label='Country'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LabelledValue
          labelWeight='thin'
          labelFontSize={14}
          valueColor={theme.palette.text.secondary}
          value={data.postalCode}
          label='Postal Code'
        />
      </Grid>
    </Grid>
  )
}
