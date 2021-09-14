import React, { ChangeEvent } from 'react'
import { FormControl, InputLabel } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ClosedDSOSelect } from 'app/pages/authorizer/components/ClosedDSOSelect'

export const ClosedDSOsFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('commitmentDSO')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    if (value !== undefined) {
      updateFilter('commitmentDSO', event.target.value)
    } else {
      removeFilter('commitmentDSO')
    }
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel htmlFor='closedDSO'>Closed DSO</InputLabel>
      <ClosedDSOSelect value={value} onChange={handleChange} />
    </FormControl>
  )
}
