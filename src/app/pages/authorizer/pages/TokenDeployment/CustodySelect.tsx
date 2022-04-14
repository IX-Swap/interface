import React from 'react'
import { SelectProps } from '@mui/material'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const CustodySelect = (props: SelectProps): JSX.Element => {
  return (
    <Select {...props} style={{ minWidth: 70 }} label='Select Custody'>
      <SelectItem disabled value={undefined}>
        Select Custody
      </SelectItem>
      <SelectItem value='HEX'>HEX</SelectItem>
    </Select>
  )
}
