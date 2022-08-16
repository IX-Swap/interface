import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import { PriceSelect } from 'app/pages/invest/components/DSOTable/PriceSelect'

export const PriceFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const value = getFilterValue('isPriceAscending')

  const handleChange = (event: SelectChangeEvent<any>) => {
    updateFilter('isPriceAscending', event.target.value)
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
