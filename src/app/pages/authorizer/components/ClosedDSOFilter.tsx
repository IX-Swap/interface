import React, { ChangeEvent } from 'react'
import { FormControl, InputLabel } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ClosedDSOSelect } from 'app/pages/authorizer/components/ClosedDSOSelect'

export const ClosedDSOsFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('dso')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    if (value !== undefined) {
      updateFilter('dso', event.target.value)
    } else {
      removeFilter('dso')
    }
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel htmlFor='closedDSO'>Closed DSO</InputLabel>
      <ClosedDSOSelect value={value} onChange={handleChange} />
    </FormControl>
  )
}
