import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { FundStatusSelect } from 'app/pages/issuance/components/Commitments/FundStatusSelect'
import { FormControl, InputLabel } from '@material-ui/core'

export const FundStatusFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const value = getFilterValue('fundStatus')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    updateFilter('fundStatus', event.target.value)
  }

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel htmlFor='sortBy'>Sort By</InputLabel>
      <FundStatusSelect
        includeAll
        valueBetweenAll={''}
        inputProps={{ id: 'sortBy', 'data-testid': 'select' }}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  )
}
