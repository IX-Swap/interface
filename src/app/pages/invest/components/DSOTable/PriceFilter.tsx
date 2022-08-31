import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import { PriceSelect } from 'app/pages/invest/components/DSOTable/PriceSelect'

export const PriceFilter = () => {
  const { getFilterValue, removeFilters, updateFilters } = useQueryFilter()
  const value = getFilterValue('sortOrder')

  const handleChange = (event: SelectChangeEvent<any>) => {
    if (value === 'price') {
      removeFilters(['sortField', 'sortOrder'])
      // removeFilters({
      //   'sortField': 'price',
      //   'sortOrder': event.target.value
      // })
    } else {
      updateFilters({
        sortField: 'price',
        sortOrder: event.target.value
      })
    }
  }

  return (
    <PriceSelect
      displayEmpty
      placeholder='Price'
      value={value}
      onChange={event => handleChange(event)}
    />
  )
}
