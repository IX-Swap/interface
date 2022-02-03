import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

export const IdentityTypeFilter = () => {
  return (
    <SearchQueryFilter<'identityType'> name='identityType' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 207 }}>
          <InputLabel shrink>Identity Type</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: SelectChangeEvent<unknown>) => {
              onChange(event.target.value as string)
            }}
            label='Identity Type'
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='individual'>Individual Identity</MenuItem>
            <MenuItem value='issuer'>Issuer Identity</MenuItem>
            <MenuItem value='corporate'>Corporate Identity</MenuItem>
            <MenuItem value='issuer_corporate'>Issuer and Corporate</MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
