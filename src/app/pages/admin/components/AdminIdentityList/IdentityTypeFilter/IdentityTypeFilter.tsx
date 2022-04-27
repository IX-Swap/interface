import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl, SelectChangeEvent } from '@mui/material'
import { IdentityTypeSelect } from 'components/form/IdentityTypeSelect'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

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
            label={undefined}
          />
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
