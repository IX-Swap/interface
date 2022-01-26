import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'

const CURRENCIES = [
  {
    label: 'SGD',
    value: 'SGD'
  },
  {
    label: 'USD',
    value: 'USD'
  }
]

export const CurrencySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Currency
      </MenuItem>
      {renderMenuItems(CURRENCIES)}
    </Select>
  )
}
