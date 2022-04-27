import { FormControl } from '@mui/material'
import { ClosedDSOSelect } from 'app/pages/authorizer/components/ClosedDSOSelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'

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
      <ClosedDSOSelect
        value={value}
        onChange={handleChange}
        label={'Closed DSO'}
      />
    </FormControl>
  )
}
