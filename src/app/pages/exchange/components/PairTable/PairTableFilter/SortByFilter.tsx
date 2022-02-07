import { Button } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export interface SortByFilterProps {
  label: string
  filterValue: string
}

export const SortByFilter = ({ label, filterValue }: SortByFilterProps) => {
  const { updateFilters, getFilterValue } = useQueryFilter()
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')

  const handleFilterChange = () => {
    if (sortBy === filterValue && orderBy === 'ASC') {
      updateFilters({ orderBy: 'DSC' })
    } else {
      updateFilters({ sortBy: filterValue, orderBy: 'ASC' })
    }
  }

  return <Button onClick={handleFilterChange}>{label}</Button>
}
