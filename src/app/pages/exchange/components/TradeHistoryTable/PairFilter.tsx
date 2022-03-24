import { PairSelect } from 'app/pages/exchange/components/PairSelect/PairSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const PairFilter = () => {
  return (
    <SearchQueryFilter name='pair'>
      {({ value, onChange }) => (
        <PairSelect
          style={{ minWidth: 150 }}
          value={value}
          label='Pair'
          onChange={event => {
            onChange(event.target.value)
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
