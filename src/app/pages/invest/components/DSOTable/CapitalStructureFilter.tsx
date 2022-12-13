import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'

interface FiltersFavProps {
  setPage?: (page: number)=>void
}

export const CapitalStructureFilter = (props:FiltersFavProps) => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('capitalStructure')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    props.setPage && props.setPage(0);
    const {
      target: { value }
    } = event

    if (value === '' || value === undefined) {
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
      value={value ?? 'Capital Structure'}
      onChange={handleChange}
      label='Capital Structure'
      placeholder='Capital Structure'
    />
  )
}
