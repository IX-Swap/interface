import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import { PriceSelect } from 'app/pages/invest/components/DSOTable/PriceSelect'

interface FiltersFavProps {
  setPage?: (page: number)=>void
}

export const PriceFilter = (props:FiltersFavProps) => {
  const { getFilterValue, updateFilters } = useQueryFilter()
  const value = getFilterValue('sortOrder')

  const handleChange = (event: SelectChangeEvent<any>) => {
    props.setPage && props.setPage(0);
    updateFilters({
      sortField: 'price',
      sortOrder: event.target.value
    })
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
