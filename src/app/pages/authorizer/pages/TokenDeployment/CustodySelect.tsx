import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'

export const CustodySelect = (props: SelectProps): JSX.Element => {
  return (
    <Select {...props} style={{ minWidth: 70 }} label='Select Custody'>
      <MenuItem disabled value={undefined}>
        Select Custody
      </MenuItem>
      <MenuItem value='HEX'>HEX</MenuItem>
    </Select>
  )
}
