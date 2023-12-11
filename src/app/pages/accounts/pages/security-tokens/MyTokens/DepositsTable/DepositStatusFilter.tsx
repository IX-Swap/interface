import { DepositStatusSelect } from './DepositStatusSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const DepositStatusFilter = () => {
  return (
    <SearchQueryFilter name='status'>
      {({ value, onChange }) => (
        <DepositStatusSelect
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
