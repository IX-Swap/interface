import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import { IdentityTypeSelect } from 'components/form/IdentityTypeSelect'

export const IdentityTypeFilter = () => {
  return (
    <SearchQueryFilter<'identityType'> name='identityType' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 207 }}>
          <InputLabel shrink>Identity Type</InputLabel>
          <IdentityTypeSelect
            withAll
            displayEmpty
            value={value ?? ''}
            onChange={(event: SelectChangeEvent<unknown>) => {
              onChange(event.target.value as string)
            }}
            label='Identity Type'
          />
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
