import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { SourceSelect } from './SourceSelect'

export const SourceFilter = () => {
  return (
    <SearchQueryFilter name='tokenTransactionSource'>
      {({ value, onChange }) => (
        <SourceSelect
          style={{ minWidth: 150 }}
          value={value}
          onChange={event => {
            onChange(event.target.value as string)
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
