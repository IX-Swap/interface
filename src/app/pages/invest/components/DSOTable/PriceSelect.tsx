import { ListItemText, SelectProps } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const PriceSelect = (props: SelectProps) => {
  const { getFilterValue } = useQueryFilter()
  const sortValue = getFilterValue('sortOrder')
  const render = (value: any) => {
    if (sortValue === '' || sortValue === undefined) {
      return 'Price'
    }

    if (value === '1') {
      return 'Low - High'
    }

    if (value === '-1') {
      return 'High - Low'
    }

    return 'Default'
  }
  return (
    <>
      <Select
        {...props}
        label={undefined}
        displayEmpty={true}
        renderValue={render}
        value={sortValue ?? 'Default'}
      >
        {/* <SelectItem disabled value={undefined}>
          Default
        </SelectItem> */}
        <SelectItem value={'1'}>
          <ListItemText primary='Low - High' />
        </SelectItem>
        <SelectItem value={'-1'}>
          <ListItemText primary='High - Low' />
        </SelectItem>
      </Select>
    </>
  )
}
