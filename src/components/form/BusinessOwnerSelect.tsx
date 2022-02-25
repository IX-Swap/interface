import React from 'react'
import { MenuItem, Select } from '@mui/material'

export const BusinessOwnerSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Business owners
      </MenuItem>
      <MenuItem value='1'>1</MenuItem>
      <MenuItem value='2'>2</MenuItem>
      <MenuItem value='3 OR MORE'>3 OR MORE</MenuItem>
      <MenuItem value='UNKNOWN'>Unknown</MenuItem>
    </Select>
  )
}
