import React from 'react'
import { SelectProps } from '@mui/material'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const CustodySelect = (props: SelectProps): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        style={{ minWidth: 70 }}
        label={undefined}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Select Custody
        </SelectItem>
        <SelectItem value='HEX'>HEX</SelectItem>
      </Select>
    </>
  )
}
