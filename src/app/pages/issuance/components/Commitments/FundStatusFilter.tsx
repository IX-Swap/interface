import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'
import { FormControl } from '@mui/material'

export const FundStatusFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const value = getFilterValue('fundStatus')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    updateFilter('fundStatus', event.target.value)
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <FundStatusSelect
        includeAll
        valueBetweenAll={''}
        inputProps={{ id: 'sortBy', 'data-testid': 'select' }}
        value={value}
        onChange={handleChange}
        label='Sort By'
      />
    </FormControl>
  )
}
