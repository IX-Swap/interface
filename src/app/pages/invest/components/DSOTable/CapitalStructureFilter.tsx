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

    if (value === 'All') {
      removeFilter('capitalStructure')
    } else {
      updateFilter('capitalStructure', event.target.value)
    }
  }

  return (
    <CapitalStructureSelect
      includeAll
      fullWidth
      variant='outlined'
      defaultValue='All'
      value={value ?? 'All'}
      onChange={handleChange}
    />
  )
}
