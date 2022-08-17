import { ListItemText, SelectProps } from '@mui/material'
import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const PriceSelect = (props: SelectProps) => {
  const render = (value: any) => {
    if (value === 'yes') {
      return 'Low - High'
    }

    if (value === 'no') {
      return 'High - Low'
    }

    return 'Default'
  }
  return (
    <>
      <Select {...props} label={undefined} displayEmpty renderValue={render}>
        <SelectItem disabled value={undefined}>
          Default
        </SelectItem>
        <SelectItem value='yes'>
          <ListItemText primary='Low - High' />
        </SelectItem>
        <SelectItem value='no'>
          <ListItemText primary='High - Low' />
        </SelectItem>
      </Select>
    </>
  )
}
