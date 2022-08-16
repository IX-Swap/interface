import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { ListItemText, SelectChangeEvent } from '@mui/material'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

const CURRENCIES = ['SGD', 'USD']

export const CurrencyFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const currency = getFilterValue('currency')

  const handleChange = (event: SelectChangeEvent<any>) => {
    updateFilter(
      'currency',
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    )
  }

  const value = currency !== '' ? currency?.split(',') ?? [] : []

  return (
    <Select
      placeholder='Currency'
      multiple
      value={value}
      onChange={handleChange}
      displayEmpty
    >
      {CURRENCIES.map(label => (
        <SelectItem key={label} value={label} withCheckbox>
          <UICheckbox checked={value.includes(label)} />
          <ListItemText primary={label} />
        </SelectItem>
      ))}
    </Select>
  )
}
