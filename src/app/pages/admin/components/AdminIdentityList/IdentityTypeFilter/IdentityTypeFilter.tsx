import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const IdentityTypeFilter = () => {
  return (
    <SearchQueryFilter<'identityType'> name='identityType' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 207 }}>
          <InputLabel shrink>Identity Type</InputLabel>
          <TextFieldSelect
            label='Identity Type'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='individual'>Individual Identity</MenuItem>
            <MenuItem value='issuer'>Issuer Identity</MenuItem>
            <MenuItem value='corporate'>Corporate Identity</MenuItem>
            <MenuItem value='issuer_corporate'>Issuer and Corporate</MenuItem>
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
