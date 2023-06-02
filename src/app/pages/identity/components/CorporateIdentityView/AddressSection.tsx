import React from 'react'
import { Grid } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface AddressSectionProps {
  address: CorporateIdentity['companyAddress']
}

export const AddressSection = ({ address }: AddressSectionProps) => {
  if (address === undefined) {
    return null
  }

  const { line1, line2, city, postalCode, state, country } = address

  const items = [
    {
      label: 'Line 1',
      value: line1
    },
    {
      label: 'Line 2',
      value: line2
    },
    {
      label: 'City',
      value: city
    },
    {
      label: 'State',
      value: state
    },
    {
      label: 'Postal Code',
      value: postalCode
    },
    {
      label: 'Country',
      value: country
    }
  ]

  return (
    <Grid item container>
      <FieldGrid items={items} columns={2} gridOnly />
    </Grid>
  )
}
