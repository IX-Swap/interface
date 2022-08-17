import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'

export const CapitalStructureFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('capitalStructure')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    if (value === '') {
      removeFilter('capitalStructure')
    } else {
      updateFilter('capitalStructure', event.target.value)
    }
  }

  return (
    <CapitalStructureSelect
      fullWidth
      inputProps={{ 'data-testid': 'select' }}
      variant='outlined'
      showLabel={false}
      value={value}
      onChange={handleChange}
      label='Capital Structure'
      placeholder='Capital Structure'
    />
  )
}
