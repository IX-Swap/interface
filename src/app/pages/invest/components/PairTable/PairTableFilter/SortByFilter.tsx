import { Box, Button } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/PairTable/PairTableFilter/SortByFilter.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
export interface SortByFilterProps {
  label: string
  filterValue: string
}

export const SortByFilter = ({ label, filterValue }: SortByFilterProps) => {
  const { updateFilters, getFilterValue } = useQueryFilter()
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')
  const { sortIcon } = useStyles({
    descending: orderBy === 'DESC'
  })
  const handleFilterChange = () => {
    if (sortBy === filterValue && orderBy === 'ASC') {
      updateFilters({ orderBy: 'DESC' })
    } else {
      updateFilters({ sortBy: filterValue, orderBy: 'ASC' })
    }
  }

  return (
    <Button onClick={handleFilterChange}>
      <>{label}</>
      {filterValue === sortBy && (
        <Box className={sortIcon}>
          <Icon name='arrow-up' size={24} />
        </Box>
      )}
    </Button>
  )
}
