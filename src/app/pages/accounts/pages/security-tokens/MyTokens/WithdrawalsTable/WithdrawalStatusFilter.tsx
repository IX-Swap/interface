import { WithdrawalStatusSelect } from './WithdrawalStatusSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const WithdrawalStatusFilter = () => {
  return (
    <SearchQueryFilter name='status'>
      {({ value, onChange }) => (
        <WithdrawalStatusSelect
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
