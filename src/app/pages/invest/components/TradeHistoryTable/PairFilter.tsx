import { PairSelect } from 'app/pages/invest/components/PairSelect/PairSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const PairFilter = () => {
  return (
    <SearchQueryFilter name='pair'>
      {({ value, onChange }) => (
        <PairSelect
          style={{ minWidth: 150 }}
          value={value}
          onChange={event => {
            console.log({ value, event })
            onChange(event.target.value as string)
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
